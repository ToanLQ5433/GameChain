import Phaser from 'phaser';
import { ChainEngine } from '../engine/ChainEngine.js';
import { getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { haptics, setHapticsEnabled } from '../utils/haptics.js';
import { saveState, markLevelCompleted, registerNewLevelClear } from '../utils/storage.js';
import { getNextLevel, findFlatIndex } from '../utils/progression.js';
import { getDifficulty, getDifficultyTier, DIFFICULTY_STYLE } from '../utils/difficulty.js';
import { resolveLives, loseLife } from '../utils/lives.js';
import { buildSettingsModal, buildLifeCostConfirm } from '../utils/settingsModal.js';
import {
  getTimeLimit, getTimerColor, MAX_TIMEOUT_AD_USES_PER_ATTEMPT, TIMEOUT_AD_BONUS_RATIO,
  TIMEOUT_COIN_COST, COIN_SPEED_MAX, COIN_SPEED_NO_BUFF_BONUS
} from '../utils/levelTimer.js';
import { COLORS, drawPanel, makeButton, makeIconButton, makeStatChip } from '../utils/theme.js';

// Touch Offset (mobile UX): the recognized cell is sampled this many px
// ABOVE the raw finger position, not at it — otherwise the fingertip sits
// directly on top of the cell it's choosing, hiding the one piece of
// information the player needs most at that instant. Applied to every
// touch->cell lookup while dragging.
const TOUCH_OFFSET_Y = 26;

// Bright parchment/teal palette — matches Home & Shop instead of the old
// dark navy "chart" theme, so the whole app reads as one consistently
// cheerful game instead of a bright menu bookending a gloomy board screen.
const TILE = {
  cellBg: 0xfdf6e3,
  cellBgLight: 0xffffff,
  cellBorder: 0xd9c49a,
  rock: 0x8a7259,
  rockBorder: 0x4a2c11,
  pushRock: 0xc9a876,
  bombBg: 0xffe0dc,
  bombBorder: 0xee4343,
  gateClosedBg: 0xffe0dc,
  gateOpenBg: 0xdcf7e3,
  switchDot: COLORS.gold,
  wall: COLORS.woodDark,
  prismRed: 0xee4343,
  prismBlue: 0x2a8bf2,
  prismGreen: 0x1db99b
};

const COLOR_HEX = { red: TILE.prismRed, blue: TILE.prismBlue, green: TILE.prismGreen };
const ICE_COLOR = 0x7dd3fc;
const ICE_COLOR_DARK = 0x0284c7;

// One small boat icon per chain id (A-E) — purely cosmetic, shown at the
// moving head of a chain once it has left its anchor, echoing the reference
// mockup's "ship sailing along the route" without changing any game logic.
const SHIP_ICONS = { A: '⛵', B: '🚢', C: '🛶', D: '🛥️', E: '⚓' };

export default class GameScene extends Phaser.Scene {
  constructor() { super('Game'); }

  init(data) {
    this.categoryId = data.categoryId;
    this.levelIndex = data.levelIndex;
  }

  create() {
    const { width, height } = this.scale;
    this.category = getCategory(this.categoryId);
    this.levelDef = this.category.levels[this.levelIndex];
    this.save = this.registry.get('save');
    this.save.lastCategoryId = this.categoryId;
    this.save.lastLevelIndex = this.levelIndex;
    saveState(this.save);
    setHapticsEnabled(this.save.hapticsEnabled);

    this.drawBackground(width, height);

    this.buildTopBar(width);
    this.buildDifficultyChip(width);
    this.buildBuffBar(width, height);

    // Tách hẳn lớp tĩnh (nền ô, tường, mũi tên, lăng kính, mốc số — không đổi
    // trong suốt màn) khỏi lớp động (đá đẩy, bom, cổng, dây xích — đổi mỗi
    // bước kéo). Trước đây MỌI thứ bị xoá-vẽ-lại toàn bộ mỗi lần rê tay, gây
    // giật khi board lớn; giờ mỗi bước kéo chỉ chạm tới vài chục object động
    // thay vì toàn bộ lưới ô.
    this.boardFrameContainer = this.add.container(0, 0);
    this.boardStaticContainer = this.add.container(0, 0);
    this.boardDynamicContainer = this.add.container(0, 0);
    this.chainContainer = this.add.container(0, 0);
    this.fxContainer = this.add.container(0, 0);
    this.overlayContainer = this.add.container(0, 0).setVisible(false);

    this.dragging = false;
    this.chainLengths = {};
    this.loadLevel();

    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerup', this.onPointerUp, this);
    this.input.on('pointerupoutside', this.onPointerUp, this);
  }

  // ---------------- Sky background (matches Home/Shop) ----------------

  drawBackground(width, height) {
    const bg = this.add.graphics();
    bg.fillGradientStyle(0xfff3d6, 0xfff3d6, 0xf3e3b8, 0xf3e3b8, 1);
    bg.fillRect(0, 0, width, height);
    const grid = this.add.graphics();
    grid.lineStyle(1, COLORS.woodDark, 0.05);
    for (let x = 0; x < width; x += 32) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y < height; y += 32) grid.lineBetween(0, y, width, y);
  }

  // ---------------- UI khung ngoài ----------------
  // Redesigned to be icon/number-only, no instructional prose: Coins (left)
  // / Level number + difficulty tag (center) / Settings gear (right). The
  // old title banner + description paragraph + status line are gone — that
  // vertical space now goes straight to a bigger, more touch-friendly board.
  // Leaving mid-level (Quit) or restarting now only happens through the
  // Settings modal (see openSettings()), both behind a Life-cost confirm.

  buildTopBar(width) {
    const topY = 10, rowH = 52;
    const cy = topY + rowH / 2;  // vertical center of the bar

    // ── LEFT: gold coin pill (icon + number) ────────────────────────────────
    // Pill shape: white bg, gold circle icon on left, number bold on right
    const pillH = 38, pillW = 110;
    const pillX = 10;
    const pillBg = this.add.graphics();
    pillBg.fillStyle(0xffffff, 1).fillRoundedRect(pillX, cy - pillH / 2, pillW, pillH, pillH / 2);
    pillBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(pillX, cy - pillH / 2, pillW, pillH, pillH / 2);
    this.add.circle(pillX + pillH / 2, cy, pillH / 2 - 3, COLORS.gold).setStrokeStyle(2, COLORS.woodDark);
    this.add.text(pillX + pillH / 2, cy, '🪙', { fontSize: '16px' }).setOrigin(0.5);
    const coinValTxt = this.add.text(pillX + pillH + 6, cy, String(this.save.coins), {
      fontFamily: 'Cinzel', fontSize: '16px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);
    this.coinChip = { setValue: (v) => coinValTxt.setText(String(v)) };

    // ── CENTER: "Level X" banner pill ───────────────────────────────────────
    const bannerW = 120, bannerH = 38, bannerX = width / 2 - bannerW / 2;
    const bannerBg = this.add.graphics();
    bannerBg.fillStyle(0x5c3a21, 1).fillRoundedRect(bannerX, cy - bannerH / 2, bannerW, bannerH, bannerH / 2);
    bannerBg.lineStyle(3, COLORS.gold, 1).strokeRoundedRect(bannerX, cy - bannerH / 2, bannerW, bannerH, bannerH / 2);
    this.add.text(width / 2, cy - 6, 'LEVEL', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#f3c64f', letterSpacing: 2
    }).setOrigin(0.5);
    this.levelNumberText = this.add.text(width / 2, cy + 8, '', {
      fontFamily: 'Cinzel', fontSize: '16px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
    this.levelBadgeBottom = cy + bannerH / 2;

    // ── RIGHT: Settings gear (blue rounded square, ref image 2 style) ───────
    const gearSize = 50;
    const gearX = width - 10 - gearSize / 2;
    const gearBg = this.add.graphics();
    gearBg.fillStyle(0x0284c7, 1).fillRoundedRect(gearX - gearSize / 2, cy - gearSize / 2, gearSize, gearSize, 14);
    gearBg.lineStyle(3, 0x0369a1, 1).strokeRoundedRect(gearX - gearSize / 2, cy - gearSize / 2, gearSize, gearSize, 14);
    // 3D shadow
    const gearShadow = this.add.graphics();
    gearShadow.fillStyle(0x0369a1, 1).fillRoundedRect(gearX - gearSize / 2, cy - gearSize / 2 + 4, gearSize, gearSize, 14);
    gearShadow.setDepth(-1);
    const gearIcon = this.add.text(gearX, cy, '⚙️', { fontSize: '26px' }).setOrigin(0.5);
    const gearHit = this.add.rectangle(gearX, cy, gearSize + 8, gearSize + 8, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    gearHit.on('pointerdown', () => {
      this.tweens.add({ targets: [gearBg, gearIcon], scale: 0.92, duration: 60, yoyo: true });
      this.openSettings();
    });

    // ── TIMER pill (GDD 3.8) — below coins pill; hidden on Easy ─────────────
    const timerY = topY + rowH + 6, timerW = 100, timerH = 28;
    const timerBg = this.add.graphics();
    timerBg.fillStyle(0xffffff, 1).fillRoundedRect(pillX, timerY, timerW, timerH, 14);
    timerBg.lineStyle(2.5, COLORS.woodDark, 1).strokeRoundedRect(pillX, timerY, timerW, timerH, 14);
    const timerIcon = this.add.text(pillX + 18, timerY + timerH / 2, '⏱️', { fontSize: '14px' }).setOrigin(0.5);
    this.timerPillLabel = this.add.text(pillX + timerW - 10, timerY + timerH / 2, '0:00', {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(1, 0.5);
    this.timerPillGroup = this.add.container(0, 0, [timerBg, timerIcon, this.timerPillLabel]).setVisible(false);

    this.headerBottom = Math.max(this.levelBadgeBottom, timerY + timerH) + 8;
  }

  // Only rendered for "hard"/"superhard" levels — easy/normal levels show no
  // tag at all. Sits directly under the level-number badge now (was stamped
  // on the removed title banner).
  buildDifficultyChip(width) {
    if (this.difficultyChip) { this.difficultyChip.destroy(); this.difficultyChip = null; }
    const difficulty = getDifficulty(this.categoryId, this.levelIndex);
    if (!difficulty) return;
    const style = DIFFICULTY_STYLE[difficulty];
    const w = style.label.length * 8 + 28, h = 20;
    const x = width / 2 - w / 2, y = this.levelBadgeBottom + 4;
    const g = this.add.graphics();
    g.fillStyle(style.color, 1).fillRoundedRect(x, y, w, h, 10);
    g.lineStyle(2, 0x2b1e16, 1).strokeRoundedRect(x, y, w, h, 10);
    const t = this.add.text(x + w / 2, y + h / 2, `${style.icon} ${style.label}`, {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
    this.difficultyChip = this.add.container(0, 0, [g, t]);
    this.headerBottom = Math.max(this.headerBottom, y + h + 8);
  }

  // ---------------- Settings (Sound/Music/Haptic, Quit, Restart Level) ----

  openSettings() {
    if (this.overlayContainer.visible) return; // never stack over Win/Lose/Timeout
    playSound('switch', this.save.soundMuted);
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const { items } = buildSettingsModal(this, width, height, {
      onClose: () => { this.overlayContainer.setVisible(false); this.overlayContainer.removeAll(true); },
      onRestartLevel: () => this.confirmRestart(),
      onQuitToHome: () => this.confirmQuit()
    });
    this.overlayContainer.add(items);
    this.overlayContainer.setVisible(true);
  }

  // Shared "-1 Life" flow for both Quit and Restart — voluntarily abandoning
  // an in-progress attempt costs a Life, same as the reference design.
  // Losing to a Bomb is unaffected and stays free-retry (see showLose()).
  confirmRestart() {
    resolveLives(this.save);
    const cost = Math.min(1, this.save.lives.count);
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const { items } = buildLifeCostConfirm(this, width, height, {
      icon: '💔', title: 'Restart Level?', cost,
      message: cost > 0
        ? 'Restarting this attempt from scratch costs 1 Life.'
        : 'No Lives left — this restart is free.',
      actionLabel: cost > 0 ? 'Restart (-1 ❤️)' : 'Restart', actionVariant: 'gold',
      onConfirm: () => { loseLife(this.save); saveState(this.save); this.loadLevel(); },
      onCancel: () => this.openSettings()
    });
    this.overlayContainer.add(items);
    this.overlayContainer.setVisible(true);
  }

  confirmQuit() {
    resolveLives(this.save);
    const cost = Math.min(1, this.save.lives.count);
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const { items } = buildLifeCostConfirm(this, width, height, {
      icon: '💔', title: 'Quit to Home?', cost,
      message: cost > 0
        ? 'Leaving this level unfinished costs 1 Life.'
        : 'No Lives left — leaving is free right now.',
      actionLabel: cost > 0 ? 'Quit (-1 ❤️)' : 'Quit', actionVariant: 'ruby',
      onConfirm: () => { loseLife(this.save); saveState(this.save); this.scene.start('Home'); },
      onCancel: () => this.openSettings()
    });
    this.overlayContainer.add(items);
    this.overlayContainer.setVisible(true);
  }

  // ---------------- Buff bar (GDD 3.1: "Use Buffs — Hint/Freeze/Skip...") ----------------
  // Only the 3 buffs officially listed in the GDD; no buffs beyond that scope.

  buildBuffBar(width, height) {
    const items = [
      { key: 'hint', icon: '💡', name: 'Hint', cost: 30 },
      { key: 'freeze', icon: '⏸️', name: 'Freeze', cost: 25 },
      { key: 'skip', icon: '⏩', name: 'Skip', cost: 50 }
    ];
    // Buff bar sits at the very bottom — large thumb-friendly chips
    // matching reference image 2's bottom-button style.
    const barH = 100;  // total height reserved for buff bar
    const cy = height - barH / 2 - 6;  // vertical center of chips
    const gap = 10;
    const chipW = (width - 24 - gap * (items.length - 1)) / items.length;
    this.buffChips = {};
    this.buffState = { freezeUsed: false };
    items.forEach((item, i) => {
      const x = 12 + chipW / 2 + i * (chipW + gap);
      this.buffChips[item.key] = this.createBuffChip(x, cy, chipW, item);
    });
  }

  createBuffChip(x, y, w, item) {
    const h = 88;  // taller chips — easier to tap on mobile
    const g = this.add.graphics();
    const drawBg = (enabled) => {
      g.clear();
      // Shadow
      g.fillStyle(COLORS.woodDark, enabled ? 0.5 : 0.2).fillRoundedRect(-w / 2, -h / 2 + 5, w, h, 16);
      // Main face
      g.fillStyle(0xfff8eb, enabled ? 1 : 0.55).fillRoundedRect(-w / 2, -h / 2, w, h, 16);
      g.lineStyle(3, COLORS.woodDark, enabled ? 1 : 0.3).strokeRoundedRect(-w / 2, -h / 2, w, h, 16);
    };
    drawBg(true);
    const icon = this.add.text(0, -22, item.icon, { fontSize: '30px' }).setOrigin(0.5);
    const name = this.add.text(0, 12, item.name, {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#42281d'
    }).setOrigin(0.5);
    const costText = this.add.text(0, 30, '', {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#ee4343'
    }).setOrigin(0.5);

    const container = this.add.container(x, y, [g, icon, name, costText]);
    container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
    container.input.cursor = 'pointer';
    container.on('pointerdown', () => {
      this.tweens.add({ targets: container, scale: 0.94, duration: 60, yoyo: true });
      haptics.tap();
      this.useBuff(item.key, item.cost);
    });
    container.drawBg = drawBg;
    container.setEnabledLook = (enabled) => { drawBg(enabled); [icon, name, costText].forEach(t => t.setAlpha(enabled ? 1 : 0.45)); };
    container.updateCost = () => {
      const count = this.save.buffs[item.key] || 0;
      costText.setText(count > 0 ? `Miễn Phí x${count}` : `${item.cost} Xu`);
      costText.setColor(count > 0 ? '#12826c' : '#ee4343');
    };
    container.updateCost();
    return container;
  }

  refreshBuffChips() {
    if (!this.buffChips) return;
    Object.entries(this.buffChips).forEach(([key, chip]) => {
      const usable = key !== 'freeze' || !this.buffState.freezeUsed;
      chip.setEnabledLook(usable);
      chip.updateCost();
    });
  }

  useBuff(key, cost) {
    if (this.overlayContainer.visible) return;
    if (key === 'freeze' && this.buffState.freezeUsed) {
      this.showToast('⏸️ Already used Freeze this run!');
      playSound('error', this.save.soundMuted);
      return;
    }
    if (key === 'hint') { this.useHint(cost); return; }
    if (key === 'freeze') this.useFreeze(cost);
    else if (key === 'skip') this.useSkip(cost);
  }

  spendCoins(cost) {
    this.save.coins -= cost;
    saveState(this.save);
    this.coinChip.setValue(this.save.coins);
    this.refreshBuffChips();
  }

  // Spends 1 unit of a Shop-granted buff if the player has any in inventory
  // (free) — otherwise falls back to paying `cost` Coins as before. Returns
  // false (after toasting) if neither is available.
  spendBuff(key, cost, insufficientMessage) {
    if ((this.save.buffs[key] || 0) > 0) {
      this.save.buffs[key] -= 1;
      saveState(this.save);
      this.refreshBuffChips();
      this.usedBuffThisAttempt = true;
      return true;
    }
    if (this.save.coins < cost) {
      this.showToast(insufficientMessage);
      playSound('error', this.save.soundMuted);
      return false;
    }
    this.spendCoins(cost);
    this.usedBuffThisAttempt = true;
    return true;
  }

  useHint(cost) {
    const chain = Object.values(this.engine.chains).find(c => !c.locked);
    if (!chain) {
      this.showToast('Every chain is already locked!');
      return;
    }
    const sol = this.levelDef.solution && this.levelDef.solution[chain.id];
    if (!sol || chain.path.length >= sol.length) {
      this.showToast('No hint available for this step.');
      return;
    }
    if (!this.spendBuff('hint', cost, '🟡 Not enough Coins for a Hint!')) return;
    const [r, c] = sol[chain.path.length];
    this.showHintAt(r, c);
  }

  showHintAt(r, c) {
    const { x: cx, y: cy } = this.cellCenter(r, c);
    const ring = this.add.circle(cx, cy, this.cellSize * 0.24, COLORS.gold, 0.35).setStrokeStyle(2, COLORS.gold, 1);
    this.fxContainer.add(ring);
    this.tweens.add({ targets: ring, scale: { from: 0.8, to: 1.3 }, alpha: { from: 0.9, to: 0.2 }, yoyo: true, repeat: 3, duration: 380, onComplete: () => ring.destroy() });
    playSound('lock', this.save.soundMuted);
  }

  useFreeze(cost) {
    if (!this.levelDef.walls || !this.levelDef.walls.length) {
      this.showToast('This level has no Walls to freeze.');
      return;
    }
    if (!this.spendBuff('freeze', cost, '🟡 Not enough Coins for this Buff!')) return;
    this.buffState.freezeUsed = true;
    this.engine.freezeWalls = true;
    this.drawStaticBoard();
    this.refreshBuffChips();
    playSound('freeze', this.save.soundMuted);
    this.spawnFreezeEffect();
    this.showToast('⏸️❄️ Walls are frozen for this run!');
  }

  // One-time frost burst on activation (screen-wide cold flash + a handful
  // of drifting snowflakes from each wall) plus a persistent "Frozen" badge
  // that stays up for the rest of the level — Freeze used to just quietly
  // dim the walls with no feedback that anything actually happened.
  spawnFreezeEffect() {
    const { width, height } = this.scale;
    const flash = this.add.rectangle(0, 0, width, height, ICE_COLOR, 0.22).setOrigin(0);
    this.fxContainer.add(flash);
    this.tweens.add({ targets: flash, alpha: 0, duration: 500, onComplete: () => flash.destroy() });

    this.engine.walls.forEach(w => {
      const p1 = this.cellToPixel(w.r1, w.c1);
      const p2 = this.cellToPixel(w.r2, w.c2);
      const cx = (p1.x + p2.x) / 2 + this.cellSize / 2, cy = (p1.y + p2.y) / 2 + this.cellSize / 2;
      for (let i = 0; i < 6; i++) {
        const flake = this.add.text(cx, cy, '❄️', { fontSize: Math.round(this.cellSize * 0.28) + 'px' }).setOrigin(0.5).setAlpha(0.9);
        this.fxContainer.add(flake);
        const angle = Math.random() * Math.PI * 2, dist = this.cellSize * (0.6 + Math.random() * 0.8);
        this.tweens.add({
          targets: flake, x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist - 10,
          alpha: 0, angle: Math.random() * 180, duration: 600 + Math.random() * 300, ease: 'Cubic.Out',
          onComplete: () => flake.destroy()
        });
      }
    });

    if (this.freezeBadge) this.freezeBadge.destroy();
    const badgeW = 84, badgeH = 22;
    const bx = this.boardOriginX + (this.cellSize * this.engine.cols) / 2 - badgeW / 2;
    const by = this.boardOriginY - Math.max(12, Math.round(this.cellSize * 0.18)) - badgeH - 4;
    const bg = this.add.graphics();
    bg.fillStyle(ICE_COLOR, 1).fillRoundedRect(0, 0, badgeW, badgeH, 11);
    bg.lineStyle(2, ICE_COLOR_DARK, 1).strokeRoundedRect(0, 0, badgeW, badgeH, 11);
    const label = this.add.text(badgeW / 2, badgeH / 2, '❄️ FROZEN', {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#0c4a6e'
    }).setOrigin(0.5);
    this.freezeBadge = this.add.container(bx, by, [bg, label]);
    this.fxContainer.add(this.freezeBadge);
    this.tweens.add({ targets: this.freezeBadge, scale: { from: 1, to: 1.06 }, duration: 700, yoyo: true, repeat: -1 });
  }

  useSkip(cost) {
    if (!this.spendBuff('skip', cost, '🟡 Not enough Coins for this Buff!')) return;
    this.completeLevel(true);
  }

  showToast(text) {
    if (this.toastText) this.toastText.destroy();
    const { width } = this.scale;
    this.toastText = this.add.text(width / 2, this.headerBottom + 6, text, {
      fontFamily: 'Crimson Pro', fontSize: '13px', color: '#f3c64f',
      backgroundColor: '#2b1e16', padding: { x: 12, y: 6 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 0).setDepth(50);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }

  // ---------------- Level Timer System (GDD 3.8) ----------------
  // A layer bolted ON TOP of the 5 core mechanics — nothing here ever
  // touches ChainEngine, so the core rules stay 100% deterministic (Pillar
  // P4) regardless of whether a Timer is running. update() is Phaser's own
  // per-frame scene hook, called automatically every tick once defined.

  update(time, delta) {
    if (!this.timeLimit || this.timerPaused || this.overlayContainer.visible) return;
    this.timeRemaining = Math.max(0, this.timeRemaining - delta / 1000);
    this.updateTimerDisplay();

    const ratio = this.timeRemaining / this.timeLimit;
    [0.5, 0.2, 0.05].forEach(t => {
      if (ratio <= t && !this.timerThresholdsFired.has(t)) {
        this.timerThresholdsFired.add(t);
        haptics.tap();
      }
    });
    if (ratio < 0.2 && this.timeRemaining > 0) {
      const whole = Math.ceil(this.timeRemaining);
      if (whole !== this.lastTickWholeSecond) {
        this.lastTickWholeSecond = whole;
        playSound('timerTick', this.save.soundMuted);
      }
    }
    if (this.timeRemaining <= 0) this.onTimerReachZero();
  }

  updateTimerDisplay() {
    if (!this.timerPillLabel) return;
    const secs = Math.ceil(this.timeRemaining);
    const m = Math.floor(secs / 60), s = secs % 60;
    this.timerPillLabel.setText(`${m}:${String(s).padStart(2, '0')}`);
    this.timerPillLabel.setColor(getTimerColor(this.timeRemaining / this.timeLimit));
  }

  onTimerReachZero() {
    this.timerPaused = true;
    playSound('timeout', this.save.soundMuted);
    haptics.fail();
    this.showTimeoutChoices();
  }

  // Time-Out is explicitly NOT "thua có phạt" per GDD 3.8 — the board just
  // pauses (reusing overlayContainer, which already blocks drag/buff input
  // while visible) and offers 3 equal-weight ways to keep going.
  showTimeoutChoices() {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);

    const panelW = width - 56, panelH = 300;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 18, fill: 0xfff0ee, border: COLORS.ruby, borderWidth: 3 });

    const title = this.add.text(width / 2, panelY + 34, '⏰ TIME OUT!', {
      fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#b91c1c'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, panelY + 66, 'Out of time! Your board is safe —\nchoose how to keep going.', {
      fontFamily: 'Crimson Pro', fontSize: '10.5px', color: '#42281d', align: 'center', wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5);

    const items = [bg, panel, title, sub];
    const btnW = panelW - 40, btnH = 40, btnGap = 14;
    let btnY = panelY + 128;

    const canWatchAd = this.timeoutAdUsesThisAttempt < MAX_TIMEOUT_AD_USES_PER_ATTEMPT;
    if (canWatchAd) {
      const adBtn = makeButton(this, width / 2, btnY, `📺 Watch Ad (+${Math.round(TIMEOUT_AD_BONUS_RATIO * 100)}% Time)`, {
        variant: 'gold', fontSize: '11px', width: btnW, shadow: true
      });
      adBtn.on('pointerdown', () => this.onWatchAdForTime());
      items.push(adBtn);
      btnY += btnH + btnGap;
    }

    const coinBtn = makeButton(this, width / 2, btnY, `🟡 ${TIMEOUT_COIN_COST} Coins (+${Math.round(TIMEOUT_AD_BONUS_RATIO * 100)}% Time)`, {
      variant: 'tealSolid', fontSize: '11px', width: btnW
    });
    coinBtn.on('pointerdown', () => this.onSpendCurrencyForTime());
    items.push(coinBtn);
    btnY += btnH + btnGap;

    const retryBtn = makeButton(this, width / 2, btnY, '🔄 Retry Now (Free)', { variant: 'ink', fontSize: '11px', width: btnW });
    retryBtn.on('pointerdown', () => this.loadLevel());
    items.push(retryBtn);

    this.overlayContainer.add(items);
    this.overlayContainer.setVisible(true);
  }

  // Mocked rewarded-ad flow — same "processing → done" shape as the Shop's
  // purchase modal, since this demo has no real ad SDK to call.
  onWatchAdForTime() {
    this.timeoutAdUsesThisAttempt += 1;
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);
    const panelW = width - 80, panelH = 150;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 16, fill: COLORS.parchment, border: COLORS.gold, borderWidth: 3 });
    const label = this.add.text(width / 2, panelY + panelH / 2 - 20, '📺 Watching ad…', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#42281d'
    }).setOrigin(0.5);
    const spinner = this.add.graphics().setPosition(width / 2, panelY + panelH / 2 + 20);
    spinner.lineStyle(4, COLORS.gold, 1);
    spinner.beginPath();
    spinner.arc(0, 0, 14, 0, Math.PI * 1.4, false);
    spinner.strokePath();
    this.tweens.add({ targets: spinner, angle: 360, duration: 700, repeat: -1 });
    this.overlayContainer.add([bg, panel, label, spinner]);
    this.overlayContainer.setVisible(true);
    this.time.delayedCall(900, () => this.grantTimeoutBonus());
  }

  onSpendCurrencyForTime() {
    if (this.save.coins < TIMEOUT_COIN_COST) {
      this.showToast('🟡 Not enough Coins!');
      playSound('error', this.save.soundMuted);
      return;
    }
    this.save.coins -= TIMEOUT_COIN_COST;
    saveState(this.save);
    this.coinChip.setValue(this.save.coins);
    this.grantTimeoutBonus();
  }

  grantTimeoutBonus() {
    const bonusSec = this.timeLimit * TIMEOUT_AD_BONUS_RATIO;
    this.timeRemaining += bonusSec;
    this.timerPaused = false;
    this.timerThresholdsFired = new Set();
    this.lastTickWholeSecond = null;
    this.updateTimerDisplay();
    this.overlayContainer.removeAll(true);
    this.overlayContainer.setVisible(false);
    playSound('switch', this.save.soundMuted);
    this.showToast(`⏱️ +${Math.round(bonusSec)}s added — keep going!`);
  }

  // ---------------- Vòng đời level ----------------

  loadLevel() {
    this.engine = new ChainEngine(this.levelDef);
    this.dragging = false;
    this.chainLengths = {};
    this.overlayContainer.setVisible(false);
    this.overlayContainer.removeAll(true);
    this.fxContainer.removeAll(true);
    this.freezeBadge = null;
    if (this.toastText) { this.toastText.destroy(); this.toastText = null; }
    this.buffState = { freezeUsed: false };
    this.usedBuffThisAttempt = false;
    this.refreshBuffChips();

    // Level Timer System (GDD 3.8) — a layer on top of the 5 core mechanics,
    // never touching ChainEngine. null timeLimit means Easy/Unlimited.
    this.timerTier = getDifficultyTier(this.categoryId, this.levelIndex);
    this.timeLimit = getTimeLimit(this.timerTier);
    this.timeRemaining = this.timeLimit;
    this.timerPaused = false;
    this.timeoutAdUsesThisAttempt = 0;
    this.timerThresholdsFired = new Set();
    this.lastTickWholeSecond = null;
    if (this.timerPillGroup) {
      this.timerPillGroup.setVisible(!!this.timeLimit);
      if (this.timeLimit) this.updateTimerDisplay();
    }

    // Numbers only, no descriptive title/hint prose — matches the "Level N"
    // badge convention (Home's map nodes use the same global numbering).
    const globalIdx = findFlatIndex(this.categoryId, this.levelIndex);
    this.levelNumberText.setText(String(globalIdx + 1));

    this.computeBoardMetrics();
    this.drawBoardFrame();
    this.drawStaticBoard();
    this.redrawDynamic();
    this.redrawChains();

    // Expose cho debug/QA thủ công qua console — vô hại trong bản demo.
    window.__engine = this.engine;
    window.__scene = this;
  }

  computeBoardMetrics() {
    const { width, height } = this.scale;
    const topOffset = this.headerBottom + 6;
    // Reserve enough vertical room for the tall buff chips (88px) + padding
    const bottomOffset = 116;
    const marginX = 14;
    const { rows, cols } = this.engine;

    const areaW = width - marginX * 2;
    const areaH = height - topOffset - bottomOffset;
    // Fitts's Law floor: cells never under 44px so they remain draggable.
    // Also cap cell size so very small grids don't balloon and crowd other UI.
    const cell = Math.max(44, Math.min(72, Math.floor(Math.min(areaW / cols, areaH / rows))));

    this.cellSize = cell;
    this.boardOriginX = Math.round((width - cell * cols) / 2);
    this.boardOriginY = Math.round(topOffset + Math.max(0, areaH - cell * rows) / 2);
  }

  cellToPixel(r, c) {
    return { x: this.boardOriginX + c * this.cellSize, y: this.boardOriginY + r * this.cellSize };
  }

  cellCenter(r, c) {
    const { x, y } = this.cellToPixel(r, c);
    return { x: x + this.cellSize / 2, y: y + this.cellSize / 2 };
  }

  cellFromPointer(x, y) {
    const c = Math.floor((x - this.boardOriginX) / this.cellSize);
    const r = Math.floor((y - this.boardOriginY) / this.cellSize);
    return { r, c };
  }

  // ---------------- Khung gỗ quanh bàn cờ (theo style guide) ----------------

  drawBoardFrame() {
    this.boardFrameContainer.removeAll(true);
    const pad = Math.max(10, Math.round(this.cellSize * 0.18));
    const boardW = this.cellSize * this.engine.cols, boardH = this.cellSize * this.engine.rows;
    const frame = drawPanel(this, this.boardOriginX - pad, this.boardOriginY - pad, boardW + pad * 2, boardH + pad * 2, {
      radius: 16, fill: COLORS.wood, border: COLORS.gold, borderWidth: 3
    });
    this.boardFrameContainer.add(frame);
  }

  // ---------------- Lớp TĨNH: nền ô, tường, mũi tên, lăng kính, mốc số ----

  drawStaticBoard() {
    this.boardStaticContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const radius = Math.max(3, Math.round(cs * 0.12));

    const tiles = this.add.graphics();
    this.boardStaticContainer.add(tiles);

    for (let r = 0; r < e.rows; r++) {
      for (let c = 0; c < e.cols; c++) {
        if (e.isVoid(r, c)) continue; // Ẩn hẳn ô ngoài hình dạng bàn cờ (trái tim, sao...)
        const { x, y } = this.cellToPixel(r, c);
        const isRock = e.isRock(r, c);
        const fill = isRock ? TILE.rock : TILE.cellBg;
        const border = isRock ? TILE.rockBorder : TILE.cellBorder;

        tiles.fillStyle(fill, 1).fillRoundedRect(x + 1, y + 1, cs - 2, cs - 2, radius);
        // Dải sáng mỏng phía trên mỗi ô — gợi cảm giác nổi khối (depth) nhẹ.
        tiles.fillStyle(TILE.cellBgLight, isRock ? 0 : 0.6)
          .fillRoundedRect(x + 2, y + 2, cs - 4, Math.max(2, cs * 0.16), radius * 0.6);
        tiles.lineStyle(1, border, 0.9).strokeRoundedRect(x + 1, y + 1, cs - 2, cs - 2, radius);

        if (isRock) {
          this.boardStaticContainer.add(
            this.add.text(x + cs / 2, y + cs / 2, '🪨', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5)
          );
        }

        const arrow = e.arrows.find(a => a.r === r && a.c === c);
        if (arrow) {
          const icons = { UP: '⬆️', DOWN: '⬇️', LEFT: '⬅️', RIGHT: '➡️' };
          this.boardStaticContainer.add(
            this.add.text(x + cs / 2, y + cs / 2, icons[arrow.dir], { fontSize: Math.round(cs * 0.4) + 'px' }).setOrigin(0.5)
          );
        }

        const prism = e.prisms.find(p => p.r === r && p.c === c);
        const colorGate = e.colorGates.find(g => g.r === r && g.c === c);
        if (prism || colorGate) {
          const tint = COLOR_HEX[(prism || colorGate).color] || 0xffffff;
          // Cổng Màu chỉ là 1 ô mang màu quy định — bản thân màu đã nói lên
          // đủ ý nghĩa (đi qua đúng màu mới lọt), không cần thêm icon nào
          // (icon 🚧 trước đây gây hiểu lầm giống biển "khoá/chặn"). Chỉ Lăng
          // Kính (🎨, ô chủ động đổi màu dây) mới cần icon vì nó là 1 HÀNH
          // ĐỘNG, còn Cổng là ĐIỀU KIỆN thụ động.
          tiles.fillStyle(tint, colorGate ? 0.22 : 0).fillRoundedRect(x + 2, y + 2, cs - 4, cs - 4, radius);
          tiles.lineStyle(2.5, tint, 1).strokeRoundedRect(x + 2, y + 2, cs - 4, cs - 4, radius);
          if (prism) {
            this.boardStaticContainer.add(
              this.add.text(x + cs / 2, y + cs / 2, '🎨', { fontSize: Math.round(cs * 0.4) + 'px' }).setOrigin(0.5)
            );
          }
        }

        Object.values(e.waypoints).forEach(list => {
          const idx = list.findIndex(w => w.r === r && w.c === c);
          if (idx !== -1) {
            const badge = this.add.circle(x + cs / 2, y + cs / 2, cs * 0.32, COLORS.gold).setStrokeStyle(2, COLORS.goldDim);
            const num = this.add.text(x + cs / 2, y + cs / 2, String(idx + 1), {
              fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.32) + 'px', fontStyle: '900', color: '#2b1e16'
            }).setOrigin(0.5);
            this.boardStaticContainer.add([badge, num]);
          }
        });
      }
    }

    e.walls.forEach(w => {
      const p1 = this.cellToPixel(w.r1, w.c1);
      const p2 = this.cellToPixel(w.r2, w.c2);
      const glow = this.add.graphics();
      const line = this.add.graphics();
      const drawAt = (g, width, color, alpha) => {
        g.lineStyle(width, color, alpha);
        if (w.r1 === w.r2) {
          const x = Math.max(p1.x, p2.x);
          g.lineBetween(x, p1.y, x, p1.y + cs);
        } else {
          const y = Math.max(p1.y, p2.y);
          g.lineBetween(p1.x, y, p1.x + cs, y);
        }
      };
      // Buff "Đóng Băng" đang bật -> vẽ Vách Ngăn dạng "đóng đá" (viền băng
      // xanh nhạt, đứt đoạn) thay vì chỉ làm mờ màu gỗ như trước — rõ ràng
      // là ĐANG bị đóng băng, không phải chỉ mờ đi vô nghĩa.
      const frozen = !!e.freezeWalls;
      if (frozen) {
        drawAt(glow, 10, ICE_COLOR, 0.35);
        // Nét đứt để gợi cảm giác "vách nứt đông đá" — vẽ từng đoạn nhỏ.
        const dashLen = 5, gapLen = 4;
        const dist = w.r1 === w.r2 ? cs : cs;
        let d = 0;
        while (d < dist) {
          const ed = Math.min(d + dashLen, dist);
          if (w.r1 === w.r2) {
            const x = Math.max(p1.x, p2.x);
            line.lineStyle(3, ICE_COLOR_DARK, 0.9).lineBetween(x, p1.y + d, x, p1.y + ed);
          } else {
            const y = Math.max(p1.y, p2.y);
            line.lineStyle(3, ICE_COLOR_DARK, 0.9).lineBetween(p1.x + d, y, p1.x + ed, y);
          }
          d += dashLen + gapLen;
        }
      } else {
        drawAt(glow, 8, TILE.wall, 0.25);
        drawAt(line, 3, TILE.wall, 1);
      }
      this.boardStaticContainer.add([glow, line]);
    });
  }

  // ---------------- Lớp ĐỘNG: đá đẩy, bom, cổng công tắc ----------------

  redrawDynamic() {
    this.boardDynamicContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const radius = Math.max(3, Math.round(cs * 0.12));

    e.switches.forEach(sw => {
      const { x, y } = this.cellToPixel(sw.r, sw.c);
      const dot = this.add.circle(x + cs / 2, y + cs / 2, cs * 0.22, TILE.switchDot).setStrokeStyle(2, COLORS.goldDim);
      // 🔌 = công tắc thường, 📌 = biến thể Latch (giữ mở vĩnh viễn sau 1 lần) — đúng cặp icon tham khảo.
      const icon = this.add.text(x + cs / 2, y + cs / 2, sw.latch ? '📌' : '🔌', { fontSize: Math.round(cs * 0.3) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([dot, icon]);

      const { x: gx, y: gy } = this.cellToPixel(sw.gateR, sw.gateC);
      const open = e.isGateOpenAt(sw.gateR, sw.gateC);
      const g = this.add.graphics();
      g.fillStyle(open ? TILE.gateOpenBg : TILE.gateClosedBg, 0.9)
        .fillRoundedRect(gx + 3, gy + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, open ? COLORS.emerald : COLORS.ruby, 1).strokeRoundedRect(gx + 3, gy + 3, cs - 6, cs - 6, radius);
      const gicon = this.add.text(gx + cs / 2, gy + cs / 2, open ? '🔓' : '🔒', { fontSize: Math.round(cs * 0.38) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, gicon]);
    });

    e.pushRocks.forEach(pr => {
      const { x, y } = this.cellToPixel(pr.r, pr.c);
      const g = this.add.graphics();
      g.fillStyle(TILE.pushRock, 1).fillRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, 0x5c4a3e, 1).strokeRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      const icon = this.add.text(x + cs / 2, y + cs / 2, '🪨', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, icon]);
    });

    e.bombs.forEach(b => {
      if (b.destroyed) return;
      const { x, y } = this.cellToPixel(b.r, b.c);
      const cx = x + cs / 2, cy = y + cs / 2;
      const g = this.add.graphics();
      g.fillStyle(TILE.bombBg, 1).fillRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, TILE.bombBorder, 1).strokeRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      const icon = this.add.text(cx, cy, '💣', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, icon]);
      // Nhịp "tim đập" nhẹ trên bom còn nguyên — nhắc người chơi đây là hiểm hoạ,
      // không phải trang trí vô cảm.
      this.tweens.add({ targets: icon, scale: { from: 1, to: 1.14 }, yoyo: true, repeat: -1, duration: 620 });
    });
  }

  // ---------------- Lớp XÍCH: connectors + beads ----------------

  redrawChains() {
    this.chainContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const inset = Math.round(cs * 0.16);
    const thickness = cs - inset * 2;
    const newBeads = [];

    e.getAllChains().forEach(chain => {
      const displayColor = chain.colorTag ? (COLOR_HEX[chain.colorTag] || Phaser.Display.Color.HexStringToColor(chain.color).color)
        : Phaser.Display.Color.HexStringToColor(chain.color).color;

      for (let i = 1; i < chain.path.length; i++) {
        const a = this.cellCenter(chain.path[i - 1].r, chain.path[i - 1].c);
        const b = this.cellCenter(chain.path[i].r, chain.path[i].c);
        const line = this.add.graphics();
        line.lineStyle(thickness, displayColor, 0.92);
        line.lineBetween(a.x, a.y, b.x, b.y);
        this.chainContainer.add(line);
      }

      const prevLen = this.chainLengths[chain.id] || 1;
      chain.path.forEach((p, i) => {
        const { x, y: cy } = this.cellCenter(p.r, p.c);
        const isHead = i === chain.path.length - 1;
        // Pop & Lift: the actively-dragged head bead scales up and floats
        // above its true cell so it stays visible past the fingertip that's
        // covering it — pairs with the Touch Offset in cellFromTouch().
        const isActiveHead = this.dragging && chain.id === e.activeId && isHead && !chain.locked;
        const y = isActiveHead ? cy - Math.round(cs * 0.32) : cy;
        const liftScale = isActiveHead ? 1.28 : 1;

        // Glow mềm phía sau hạt xích — cho cảm giác "phát sáng" như game
        // mobile hiện đại, thay vì hình tròn viền trắng phẳng lì. Widened
        // further than the bead itself on the active head so a halo stays
        // visible even where the fingertip still overlaps it.
        const glow = this.add.circle(x, y, (thickness / 2 + 4) * (isActiveHead ? 1.4 : 1), displayColor, isActiveHead ? 0.4 : 0.28);
        const bead = this.add.circle(x, y, (thickness / 2) * liftScale, displayColor)
          .setStrokeStyle(chain.locked ? 3 : (isActiveHead ? 3 : 1.5), chain.locked ? COLORS.gold : (isActiveHead ? COLORS.gold : 0xffffff), chain.locked ? 1 : 0.85);
        this.chainContainer.add([glow, bead]);
        if (i === 0) {
          const remaining = chain.length - chain.path.length;
          const txt = this.add.text(x, y, chain.locked ? '✓' : String(Math.max(0, remaining)), {
            fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.3) + 'px', fontStyle: '900', color: '#ffffff'
          }).setOrigin(0.5);
          this.chainContainer.add(txt);
        } else if (isHead && !chain.locked) {
          // Cosmetic-only: a small boat rides the moving head while a chain
          // is still sailing toward its length, echoing the reference
          // mockup's "ship" — no gameplay logic involved.
          const ship = this.add.text(x, y, SHIP_ICONS[chain.id] || '⛵', {
            fontSize: Math.round(cs * (isActiveHead ? 0.4 : 0.32)) + 'px'
          }).setOrigin(0.5);
          this.chainContainer.add(ship);
        }
        // Hạt vừa mới thêm ở cuối dây trong lượt kéo này -> nảy nhẹ (juice).
        // Skipped on the active (already lifted/scaled) head to avoid
        // fighting the Pop & Lift transform above.
        if (isHead && chain.path.length > prevLen && !isActiveHead) {
          newBeads.push(glow, bead);
        }
      });
      this.chainLengths[chain.id] = chain.path.length;
    });

    newBeads.forEach(obj => {
      const targetScale = obj.scale || 1;
      obj.setScale(0.3);
      this.tweens.add({ targets: obj, scale: targetScale * 1.25, duration: 90, ease: 'Back.Out', onComplete: () => {
        this.tweens.add({ targets: obj, scale: targetScale, duration: 90 });
      } });
    });
  }

  // ---------------- Input kéo dây ----------------

  // Touch Offset — samples the cell ABOVE the raw finger, not under it, so
  // the fingertip never sits directly on top of the cell it's choosing.
  cellFromTouch(pointer) {
    return this.cellFromPointer(pointer.x, pointer.y - TOUCH_OFFSET_Y);
  }

  onPointerDown(pointer) {
    if (this.overlayContainer.visible) return;
    const pos = this.cellFromTouch(pointer);
    if (!this.engine.inBounds(pos.r, pos.c)) return;
    const chain = this.engine.startDrag(pos.r, pos.c);
    if (!chain) return;
    this.dragging = true;
    this.chainLengths[chain.id] = chain.path.length;
    playSound('step', this.save.soundMuted);
    haptics.step();
    this.redrawChains();
  }

  onPointerMove(pointer) {
    if (!this.dragging) return;
    const pos = this.cellFromTouch(pointer);
    if (!this.engine.inBounds(pos.r, pos.c)) return;

    const chain = this.engine.getChain(this.engine.activeId);
    const last = chain.path[chain.path.length - 1];
    if (pos.r === last.r && pos.c === last.c) return;

    // Cho phép lùi dây lại 1 bước nếu kéo ngược về ô liền trước.
    if (chain.path.length > 1) {
      const prev = chain.path[chain.path.length - 2];
      if (pos.r === prev.r && pos.c === prev.c) {
        this.engine.backtrackTo(chain.path.length - 2);
        this.chainLengths[chain.id] = chain.path.length;
        playSound('step', this.save.soundMuted);
        haptics.step();
        this.redrawChains();
        return;
      }
    }

    const aliveBefore = this.engine.bombs.filter(b => !b.destroyed).map(b => `${b.r},${b.c}`);
    const res = this.engine.step(pos.r, pos.c);

    if (res.result === 'OK') {
      const newlyDestroyed = this.engine.bombs.filter(b => b.destroyed && aliveBefore.includes(`${b.r},${b.c}`));
      newlyDestroyed.forEach(b => this.triggerExplosion(b.r, b.c, false));
      if (newlyDestroyed.length) this.redrawDynamic();
      playSound('step', this.save.soundMuted);
      haptics.step();
      this.redrawChains();
    } else if (res.result === 'LOSE') {
      this.dragging = false;
      this.triggerExplosion(pos.r, pos.c, true);
      this.redrawChains();
      this.time.delayedCall(480, () => {
        this.showLose('💥 You touched an armed Bomb! Next time, push a Push Rock into the Bomb before running a chain through it.');
      });
    } else {
      // Không rung camera ở đây: BLOCKED xảy ra liên tục khi ngón tay lướt qua
      // các ô không hợp lệ trong lúc kéo — rung camera dù rất nhẹ vẫn dồn dập
      // thành cảm giác "rè rè" khó chịu suốt quá trình kéo. Chỉ cần âm thanh
      // là đủ phản hồi "bị chặn".
      playSound('error', this.save.soundMuted);
    }
  }

  onPointerUp() {
    if (!this.dragging) return;
    this.dragging = false;
    const res = this.engine.endDrag();
    if (res.locked) {
      playSound('lock', this.save.soundMuted);
      haptics.lock();
      this.pulseLockedChain();
      if (res.win) {
        this.completeLevel(false);
        return;
      }
    } else if (res.error) {
      playSound('error', this.save.soundMuted);
    }
    this.redrawChains();
  }

  pulseLockedChain() {
    const chain = this.engine.getChain(this.engine.activeId);
    if (!chain) return;
    const { x, y } = this.cellCenter(chain.row, chain.col);
    const ring = this.add.circle(x, y, this.cellSize * 0.3, COLORS.gold, 0.5);
    this.fxContainer.add(ring);
    this.tweens.add({
      targets: ring, scale: 2.6, alpha: 0, duration: 420, ease: 'Cubic.Out',
      onComplete: () => ring.destroy()
    });
  }

  // ---------------- Hiệu ứng Bom nổ ----------------

  triggerExplosion(r, c, big) {
    const { x: cx, y: cy } = this.cellCenter(r, c);
    const cs = this.cellSize;

    if (big) {
      playSound('explode', this.save.soundMuted);
      haptics.fail();
      this.cameras.main.shake(260, 0.014);
      const flash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff, 0.55).setOrigin(0);
      this.fxContainer.add(flash);
      this.tweens.add({ targets: flash, alpha: 0, duration: 220, onComplete: () => flash.destroy() });
      const vignette = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xa82e2e, 0.28).setOrigin(0);
      this.fxContainer.add(vignette);
      this.tweens.add({ targets: vignette, alpha: 0, duration: 480, delay: 120, onComplete: () => vignette.destroy() });
    } else {
      playSound('crack', this.save.soundMuted);
      this.cameras.main.shake(140, 0.006);
    }

    const ring = this.add.circle(cx, cy, cs * 0.3, COLORS.gold, 0.4).setStrokeStyle(2, COLORS.gold, 0.9);
    this.fxContainer.add(ring);
    this.tweens.add({
      targets: ring, scale: big ? 3.2 : 2.2, alpha: 0, duration: big ? 460 : 340, ease: 'Cubic.Out',
      onComplete: () => ring.destroy()
    });

    const chipCount = big ? 12 : 7;
    for (let i = 0; i < chipCount; i++) {
      const angle = (i / chipCount) * Math.PI * 2 + Math.random() * 0.4;
      const dist = cs * (big ? 1.6 : 1.1) * (0.6 + Math.random() * 0.5);
      const chip = this.add.circle(cx, cy, 2.5 + Math.random() * (big ? 4 : 2.5), big ? 0xff6a3d : COLORS.gold, 0.95);
      this.fxContainer.add(chip);
      this.tweens.add({
        targets: chip,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        alpha: 0,
        scale: 0.2,
        duration: 380 + Math.random() * 220,
        ease: 'Cubic.Out',
        onComplete: () => chip.destroy()
      });
    }

    const emoji = this.add.text(cx, cy, big ? '💥' : '✨', { fontSize: Math.round(cs * 0.6) + 'px' }).setOrigin(0.5).setScale(0.4);
    this.fxContainer.add(emoji);
    this.tweens.add({
      targets: emoji, scale: big ? 1.3 : 1, alpha: 0, duration: big ? 420 : 320, ease: 'Cubic.Out',
      onComplete: () => emoji.destroy()
    });
  }

  // ---------------- Thắng / Thua ----------------

  completeLevel(isSkip) {
    playSound('win', this.save.soundMuted);
    haptics.win();
    const already = (this.save.completedLevels[this.categoryId] || []).includes(this.levelIndex);

    // Coin Tốc Độ (GDD 2.5) — first-clear only, one-way flag enforced by
    // `already` above so replaying never re-earns it. Time-based when this
    // level had a Timer running, otherwise the "didn't use a Buff" bonus.
    let speedBonus = 0;
    if (!already && !isSkip) {
      if (this.timeLimit) {
        const ratio = Phaser.Math.Clamp(this.timeRemaining / this.timeLimit, 0, 1);
        speedBonus = Math.round(COIN_SPEED_MAX * ratio);
      } else if (!this.usedBuffThisAttempt) {
        speedBonus = COIN_SPEED_NO_BUFF_BONUS;
      }
      this.save.coins += 20 + speedBonus;
    }
    if (!already) registerNewLevelClear(this.save);
    markLevelCompleted(this.save, this.categoryId, this.levelIndex);
    saveState(this.save);

    // Nếu lần khoá dây này vừa lấp đầy trọn Đảo (category) — báo cho HomeScene
    // để chớp sáng Mảnh Bản Đồ khi người chơi quay lại (Haptic & Juice, GDD P2).
    const doneCount = (this.save.completedLevels[this.categoryId] || []).length;
    if (!already && doneCount === this.category.levels.length) {
      this.registry.set('justCompletedCategory', this.categoryId);
    }
    this.coinChip.setValue(this.save.coins);
    this.showWin(isSkip, speedBonus);
  }

  showWin(isSkip, speedBonus = 0) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);

    const panelW = width - 56, panelH = 300;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 18, fill: COLORS.parchment, border: COLORS.gold, borderWidth: 3 });

    const eyebrow = this.add.text(width / 2, panelY + 22, isSkip ? 'SKIPPED' : 'VICTORY!', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#12826c', letterSpacing: 2
    }).setOrigin(0.5);
    const title = this.add.text(width / 2, panelY + 40, this.levelDef.name, {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#42281d', align: 'center',
      wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5, 0);

    const starsY = panelY + 92;
    const stars = [];
    for (let i = 0; i < 3; i++) {
      const s = this.add.text(width / 2 + (i - 1) * 32, starsY, isSkip ? '☆' : '★', {
        fontSize: '26px', color: '#ffc200', stroke: '#4a2c11', strokeThickness: 2
      }).setOrigin(0.5).setScale(0);
      stars.push(s);
      this.tweens.add({ targets: s, scale: 1, duration: 260, delay: 200 + i * 130, ease: 'Back.Out' });
    }

    // Thẻ phần thưởng phát sáng — cùng ngôn ngữ "mảnh bản đồ" với Home.
    const cardW = 96, cardH = 96, cardX = width / 2 - cardW / 2, cardY = starsY + 34;
    const rewardFrame = drawPanel(this, cardX, cardY, cardW, cardH, { radius: 10, fill: 0xffffff, border: COLORS.gold, borderWidth: 2 });
    const rewardIcon = this.add.text(width / 2, cardY + cardH / 2, isSkip ? '📦' : this.category.icon, { fontSize: '40px' }).setOrigin(0.5);
    if (!isSkip) {
      this.tweens.add({ targets: [rewardFrame, rewardIcon], alpha: { from: 0.6, to: 1 }, yoyo: true, repeat: -1, duration: 700 });
    }

    // Speed bonus (GDD 2.5 "Coin Tốc Độ") folded into the same line rather
    // than a second text element, so the reward card's fixed height never
    // has to grow/collide with the buttons below it.
    const rewardAmount = isSkip ? '' : `+${20 + speedBonus} Coins${speedBonus > 0 ? ` (⚡+${speedBonus})` : ''}`;
    const rewardText = this.add.text(width / 2, cardY + cardH + 12, rewardAmount, {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#c68a00'
    }).setOrigin(0.5);

    const next = getNextLevel(this.categoryId, this.levelIndex);
    const nextBtn = makeButton(this, width / 2, panelY + panelH - 72, next ? 'TIẾP TỤC ⏩' : 'VỀ TRANG CHỦ 🏠', {
      variant: 'gold', fontSize: '16px', minHeight: 48, width: panelW - 48
    });
    nextBtn.on('pointerdown', () => {
      if (next) {
        this.scene.start('Game', { categoryId: next.categoryId, levelIndex: next.levelIndex });
      } else {
        this.scene.start('Home');
      }
    });

    const homeBtn = makeButton(this, width / 2, panelY + panelH - 20, 'TRANG CHỦ 🏠', {
      variant: 'ink', fontSize: '14px', minHeight: 40, width: panelW - 48
    });
    homeBtn.on('pointerdown', () => this.scene.start('Home'));

    this.overlayContainer.add([bg, panel, eyebrow, title, ...stars, rewardFrame, rewardIcon, rewardText, nextBtn, homeBtn]);
    this.overlayContainer.setVisible(true);

    if (!isSkip) {
      this.spawnVictoryCelebration(width, height);
      this.playCoinCountUp();
    }
  }

  spawnVictoryCelebration(width, height) {
    const confettiColors = [COLORS.gold, COLORS.teal, 0xee4343, 0x22c55e, 0x9333ea];
    for (let i = 0; i < 32; i++) {
      const x = Math.random() * width;
      const color = confettiColors[i % confettiColors.length];
      const piece = this.add.rectangle(x, -20 - Math.random() * 80, 7 + Math.random() * 5, 12 + Math.random() * 6, color)
        .setAngle(Math.random() * 360);
      this.overlayContainer.add(piece);
      this.tweens.add({
        targets: piece,
        y: height + 30,
        x: x + (Math.random() - 0.5) * 90,
        angle: piece.angle + (Math.random() > 0.5 ? 360 : -360),
        alpha: { from: 1, to: 0.2 },
        delay: Math.random() * 400,
        duration: 1400 + Math.random() * 700,
        ease: 'Cubic.In',
        onComplete: () => piece.destroy()
      });
    }

    for (let i = 0; i < 12; i++) {
      const x = Math.random() * width;
      const coin = this.add.text(x, -20 - Math.random() * 100, '🪙', { fontSize: (16 + Math.random() * 8) + 'px' }).setOrigin(0.5);
      this.overlayContainer.add(coin);
      this.tweens.add({
        targets: coin,
        y: height + 30,
        x: x + (Math.random() - 0.5) * 50,
        angle: Math.random() * 180 - 90,
        delay: 150 + Math.random() * 500,
        duration: 1300 + Math.random() * 600,
        ease: 'Cubic.In',
        onComplete: () => coin.destroy()
      });
    }

    for (let i = 0; i < 14; i++) {
      const x = Math.random() * width;
      const star = this.add.text(x, -10 - Math.random() * 60, '✨', { fontSize: (10 + Math.random() * 10) + 'px' }).setOrigin(0.5).setAlpha(0);
      this.overlayContainer.add(star);
      this.tweens.add({
        targets: star, y: star.y + 220 + Math.random() * 100, alpha: { from: 1, to: 0 }, angle: Math.random() * 180,
        delay: i * 40, duration: 900 + Math.random() * 300, ease: 'Cubic.In'
      });
    }
  }

  playCoinCountUp() {
    for (let i = 0; i < 5; i++) {
      this.time.delayedCall(150 + i * 90, () => playSound('coin', this.save.soundMuted));
    }
  }

  showLose(text) {
    playSound('lose', this.save.soundMuted);

    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);

    const panelW = width - 50, panelH = 240;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 18, fill: 0xfff0ee, border: COLORS.ruby, borderWidth: 3 });

    const title = this.add.text(width / 2, panelY + 36, '💥 BẠN ĐÃ THUA!', {
      fontFamily: 'Cinzel', fontSize: '22px', fontStyle: '900', color: '#b91c1c'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, panelY + 84, text, {
      fontFamily: 'Crimson Pro', fontSize: '13px', color: '#42281d', align: 'center',
      wordWrap: { width: panelW - 36 }
    }).setOrigin(0.5);

    const retryBtn = makeButton(this, width / 2, panelY + panelH - 42, 'THỬ LẠI MÀN NÀY 🔄', {
      variant: 'gold', fontSize: '16px', minHeight: 48, width: panelW - 48
    });
    retryBtn.on('pointerdown', () => this.loadLevel());

    this.overlayContainer.add([bg, panel, title, sub, retryBtn]);
    this.overlayContainer.setVisible(true);

    title.setPosition(width / 2, panelY + 36);
    this.tweens.add({ targets: title, x: { from: width / 2 - 8, to: width / 2 + 8 }, duration: 60, repeat: 4, yoyo: true, onComplete: () => title.setX(width / 2) });
  }
}
