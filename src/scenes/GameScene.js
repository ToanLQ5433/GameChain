import Phaser from 'phaser';
import { ChainEngine } from '../engine/ChainEngine.js';
import { getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, markLevelCompleted, registerNewLevelClear } from '../utils/storage.js';
import { getNextLevel } from '../utils/progression.js';
import { getDifficulty, DIFFICULTY_STYLE } from '../utils/difficulty.js';
import { COLORS, drawPanel, makeButton, makeStatChip } from '../utils/theme.js';

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

    this.drawBackground(width, height);

    this.buildTopBar(width);
    this.buildDifficultyChip(width);
    this.buildBuffBar(width, height);
    this.buildBottomBar(width, height);

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

  buildTopBar(width) {
    const backSize = 34, backY = 10;
    const backBg = this.add.graphics();
    backBg.fillStyle(COLORS.teal, 1).fillRoundedRect(12, backY, backSize, backSize, 10);
    backBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(12, backY, backSize, backSize, 10);
    this.add.text(12 + backSize / 2, backY + backSize / 2, '🏠', { fontSize: '16px' }).setOrigin(0.5);
    this.add.rectangle(12 + backSize / 2, backY + backSize / 2, backSize + 6, backSize + 6, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Home'));

    // Lives (❤️ 5/5) — decorative, matching Home's HUD; this demo has no
    // life-loss mechanic, so the number is fixed on every screen that shows it.
    const heartsX = 12 + backSize + 8, heartsW = 56;
    const hg = this.add.graphics();
    hg.fillStyle(0xffffff, 1).fillRoundedRect(heartsX, backY, heartsW, backSize, 15);
    hg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(heartsX, backY, heartsW, backSize, 15);
    this.add.text(heartsX + 13, backY + backSize / 2, '❤️', { fontSize: '10px' }).setOrigin(0.5);
    this.add.text(heartsX + 27, backY + backSize / 2, '5/5', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);

    this.coinChip = makeStatChip(this, width - 12, backY, '🟡', this.save.coins, COLORS.gold);

    this.bannerY = backY + backSize + 8;
    const bannerH = 30;
    const banner = this.add.graphics();
    banner.fillStyle(COLORS.gold, 1).fillRoundedRect(12, this.bannerY, width - 24, bannerH, 14);
    banner.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(12, this.bannerY, width - 24, bannerH, 14);
    this.levelNameText = this.add.text(width / 2, this.bannerY + bannerH / 2, '', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#2b1e16', align: 'center',
      wordWrap: { width: width - 56 }
    }).setOrigin(0.5);

    const hintY = this.bannerY + bannerH + 6, hintH = 34;
    const hintBg = this.add.graphics();
    hintBg.fillStyle(COLORS.parchment, 1).fillRoundedRect(12, hintY, width - 24, hintH, 12);
    hintBg.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(12, hintY, width - 24, hintH, 12);
    this.mechDescText = this.add.text(width / 2, hintY + hintH / 2, '', {
      fontFamily: 'Crimson Pro', fontSize: '9.5px', color: '#42281d', align: 'center',
      wordWrap: { width: width - 44 }
    }).setOrigin(0.5);

    const statusY = hintY + hintH + 8;
    this.statusText = this.add.text(width / 2, statusY, '', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'italic', color: '#78350f'
    }).setOrigin(0.5, 0);

    this.headerBottom = statusY + 16;
  }

  // Only rendered for "hard"/"superhard" levels — easy/normal levels show no
  // tag at all. Stamped like a ribbon across the top-right of the level
  // banner, same visual language as the Shop's pack ribbons.
  buildDifficultyChip(width) {
    if (this.difficultyChip) { this.difficultyChip.destroy(); this.difficultyChip = null; }
    const difficulty = getDifficulty(this.categoryId, this.levelIndex);
    if (!difficulty) return;
    const style = DIFFICULTY_STYLE[difficulty];
    const w = style.label.length * 6 + 22, h = 16;
    const x = width - 12 - w, y = this.bannerY - 6;
    const g = this.add.graphics();
    g.fillStyle(style.color, 1).fillRoundedRect(x, y, w, h, 8);
    g.lineStyle(1.5, 0x2b1e16, 1).strokeRoundedRect(x, y, w, h, 8);
    const t = this.add.text(x + w / 2, y + h / 2, `${style.icon} ${style.label}`, {
      fontFamily: 'Cinzel', fontSize: '7px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
    this.difficultyChip = this.add.container(0, 0, [g, t]);
  }

  buildBottomBar(width, height) {
    makeButton(this, width / 2, height - 16, 'Replay', { variant: 'tealSolid', fontSize: '11px', shadow: true })
      .on('pointerdown', () => this.loadLevel());
  }

  // ---------------- Buff bar (GDD 3.1: "Use Buffs — Hint/Freeze/Skip...") ----------------
  // Only the 3 buffs officially listed in the GDD; no buffs beyond that scope.

  buildBuffBar(width, height) {
    const items = [
      { key: 'hint', icon: '💡', name: 'Hint', cost: 30 },
      { key: 'freeze', icon: '⏸️', name: 'Freeze', cost: 25 },
      { key: 'skip', icon: '⏩', name: 'Skip', cost: 50 }
    ];
    const y = height - 78;
    const gap = 8;
    const chipW = (width - 24 - gap * (items.length - 1)) / items.length;
    this.buffChips = {};
    this.buffState = { freezeUsed: false };
    items.forEach((item, i) => {
      const x = 12 + chipW / 2 + i * (chipW + gap);
      this.buffChips[item.key] = this.createBuffChip(x, y, chipW, item);
    });
  }

  createBuffChip(x, y, w, item) {
    const h = 52;
    const g = this.add.graphics();
    const drawBg = (enabled) => {
      g.clear();
      g.fillStyle(0xffffff, enabled ? 1 : 0.5).fillRoundedRect(-w / 2, -h / 2, w, h, 10);
      g.lineStyle(2, COLORS.woodDark, enabled ? 1 : 0.3).strokeRoundedRect(-w / 2, -h / 2, w, h, 10);
    };
    drawBg(true);
    const icon = this.add.text(0, -13, item.icon, { fontSize: '17px' }).setOrigin(0.5);
    const name = this.add.text(0, 8, item.name, {
      fontFamily: 'Cinzel', fontSize: '8px', fontStyle: 'bold', color: '#42281d'
    }).setOrigin(0.5);
    const costText = this.add.text(0, 20, '', {
      fontFamily: 'Cinzel', fontSize: '8px', color: '#ee4343'
    }).setOrigin(0.5);

    const container = this.add.container(x, y, [g, icon, name, costText]);
    container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
    container.input.cursor = 'pointer';
    container.on('pointerdown', () => {
      this.tweens.add({ targets: container, scale: 0.94, duration: 60, yoyo: true });
      this.useBuff(item.key, item.cost);
    });
    container.drawBg = drawBg;
    container.setEnabledLook = (enabled) => { drawBg(enabled); [icon, name, costText].forEach(t => t.setAlpha(enabled ? 1 : 0.45)); };
    // Shop-granted inventory is spent before Coins — show "Free ×N" while
    // any is left so the player can see the pack they bought is actually
    // being used, not just decorative.
    container.updateCost = () => {
      const count = this.save.buffs[item.key] || 0;
      costText.setText(count > 0 ? `Free ×${count}` : `${item.cost} Coins`);
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
      return true;
    }
    if (this.save.coins < cost) {
      this.showToast(insufficientMessage);
      playSound('error', this.save.soundMuted);
      return false;
    }
    this.spendCoins(cost);
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
    this.showHintAt(r, c, chain.id);
  }

  showHintAt(r, c, chainId) {
    const { x: cx, y: cy } = this.cellCenter(r, c);
    const ring = this.add.circle(cx, cy, this.cellSize * 0.24, COLORS.gold, 0.35).setStrokeStyle(2, COLORS.gold, 1);
    this.fxContainer.add(ring);
    this.tweens.add({ targets: ring, scale: { from: 0.8, to: 1.3 }, alpha: { from: 0.9, to: 0.2 }, yoyo: true, repeat: 3, duration: 380, onComplete: () => ring.destroy() });
    playSound('lock', this.save.soundMuted);
    this.statusText.setText(`💡 Hint for chain ${chainId}: next step at cell (${r + 1}, ${c + 1})`);
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
    playSound('switch', this.save.soundMuted);
    this.showToast('⏸️ Walls are temporarily disabled for this run!');
  }

  useSkip(cost) {
    if (!this.spendBuff('skip', cost, '🟡 Not enough Coins for this Buff!')) return;
    this.completeLevel(true);
  }

  showToast(text) {
    if (this.toastText) this.toastText.destroy();
    const { width } = this.scale;
    this.toastText = this.add.text(width / 2, 106, text, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f3c64f',
      backgroundColor: '#2b1e16', padding: { x: 10, y: 5 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 0.5).setDepth(50);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }

  // ---------------- Vòng đời level ----------------

  loadLevel() {
    this.engine = new ChainEngine(this.levelDef);
    this.dragging = false;
    this.chainLengths = {};
    this.overlayContainer.setVisible(false);
    this.overlayContainer.removeAll(true);
    this.fxContainer.removeAll(true);
    if (this.toastText) { this.toastText.destroy(); this.toastText = null; }
    this.buffState = { freezeUsed: false };
    this.refreshBuffChips();

    this.levelNameText.setText(this.levelDef.name);
    this.mechDescText.setText(this.category.desc);
    this.statusText.setText('Touch a number and drag through adjacent cells.');

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
    const bottomOffset = 132;
    const marginX = 30;
    const { rows, cols } = this.engine;

    const areaW = width - marginX * 2;
    const areaH = height - topOffset - bottomOffset;
    const cell = Math.floor(Math.min(areaW / cols, areaH / rows));

    this.cellSize = cell;
    this.boardOriginX = Math.round((width - cell * cols) / 2);
    this.boardOriginY = Math.round(topOffset + (areaH - cell * rows) / 2);
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
      const drawAt = (g, width, alpha) => {
        g.lineStyle(width, TILE.wall, alpha);
        if (w.r1 === w.r2) {
          const x = Math.max(p1.x, p2.x);
          g.lineBetween(x, p1.y, x, p1.y + cs);
        } else {
          const y = Math.max(p1.y, p2.y);
          g.lineBetween(p1.x, y, p1.x + cs, y);
        }
      };
      // Buff "Đóng Băng" đang bật -> vẽ Vách Ngăn mờ hẳn để báo đang vô hiệu hoá.
      const frozen = !!e.freezeWalls;
      drawAt(glow, 8, frozen ? 0.05 : 0.25);
      drawAt(line, 3, frozen ? 0.2 : 1);
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
        const { x, y } = this.cellCenter(p.r, p.c);
        // Glow mềm phía sau hạt xích — cho cảm giác "phát sáng" như game
        // mobile hiện đại, thay vì hình tròn viền trắng phẳng lì.
        const glow = this.add.circle(x, y, thickness / 2 + 4, displayColor, 0.28);
        const bead = this.add.circle(x, y, thickness / 2, displayColor)
          .setStrokeStyle(chain.locked ? 3 : 1.5, chain.locked ? COLORS.gold : 0xffffff, chain.locked ? 1 : 0.85);
        this.chainContainer.add([glow, bead]);
        if (i === 0) {
          const remaining = chain.length - chain.path.length;
          const txt = this.add.text(x, y, chain.locked ? '✓' : String(Math.max(0, remaining)), {
            fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.3) + 'px', fontStyle: '900', color: '#ffffff'
          }).setOrigin(0.5);
          this.chainContainer.add(txt);
        } else if (i === chain.path.length - 1 && !chain.locked) {
          // Cosmetic-only: a small boat rides the moving head while a chain
          // is still sailing toward its length, echoing the reference
          // mockup's "ship" — no gameplay logic involved.
          const ship = this.add.text(x, y, SHIP_ICONS[chain.id] || '⛵', {
            fontSize: Math.round(cs * 0.32) + 'px'
          }).setOrigin(0.5);
          this.chainContainer.add(ship);
        }
        // Hạt vừa mới thêm ở cuối dây trong lượt kéo này -> nảy nhẹ (juice).
        if (i === chain.path.length - 1 && chain.path.length > prevLen) {
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

  onPointerDown(pointer) {
    if (this.overlayContainer.visible) return;
    const pos = this.cellFromPointer(pointer.x, pointer.y);
    if (!this.engine.inBounds(pos.r, pos.c)) return;
    const chain = this.engine.startDrag(pos.r, pos.c);
    if (!chain) return;
    this.dragging = true;
    this.chainLengths[chain.id] = chain.path.length;
    playSound('step', this.save.soundMuted);
    this.redrawChains();
    this.updateStatus();
  }

  onPointerMove(pointer) {
    if (!this.dragging) return;
    const pos = this.cellFromPointer(pointer.x, pointer.y);
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
        this.redrawChains();
        this.updateStatus();
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
      this.redrawChains();
      this.updateStatus();
    } else if (res.result === 'LOSE') {
      this.dragging = false;
      this.triggerExplosion(pos.r, pos.c, true);
      this.redrawChains();
      this.statusText.setText('💥 Bomb exploded!');
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
      this.pulseLockedChain();
      if (res.win) {
        this.completeLevel(false);
        return;
      }
    } else if (res.error) {
      playSound('error', this.save.soundMuted);
    }
    this.redrawChains();
    this.updateStatus();
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

  updateStatus() {
    if (!this.dragging) {
      this.statusText.setText('Touch a number and drag through adjacent cells.');
      return;
    }
    const chain = this.engine.getChain(this.engine.activeId);
    this.statusText.setText(`Chain ${chain.id}: ${chain.path.length}/${chain.length} steps`);
  }

  // ---------------- Hiệu ứng Bom nổ ----------------

  triggerExplosion(r, c, big) {
    const { x: cx, y: cy } = this.cellCenter(r, c);
    const cs = this.cellSize;

    if (big) {
      playSound('explode', this.save.soundMuted);
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
    const already = (this.save.completedLevels[this.categoryId] || []).includes(this.levelIndex);
    if (!already && !isSkip) this.save.coins += 20;
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
    this.showWin(isSkip);
  }

  showWin(isSkip) {
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

    const rewardText = this.add.text(width / 2, cardY + cardH + 12, isSkip ? '' : '+20 Coins', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#c68a00'
    }).setOrigin(0.5);

    const next = getNextLevel(this.categoryId, this.levelIndex);
    const nextBtn = makeButton(this, width / 2, panelY + panelH - 46, next ? 'Next Level' : 'Back to Home', {
      variant: 'gold', fontSize: '13px'
    });
    nextBtn.on('pointerdown', () => {
      if (next) {
        this.scene.start('Game', { categoryId: next.categoryId, levelIndex: next.levelIndex });
      } else {
        this.scene.start('Home');
      }
    });

    const homeBtn = makeButton(this, width / 2, panelY + panelH - 12, 'Home', { variant: 'ink', fontSize: '10px' });
    homeBtn.on('pointerdown', () => this.scene.start('Home'));

    this.overlayContainer.add([bg, panel, eyebrow, title, ...stars, rewardFrame, rewardIcon, rewardText, nextBtn, homeBtn]);
    this.overlayContainer.setVisible(true);

    if (!isSkip) {
      playSound('win', false);
      for (let i = 0; i < 16; i++) {
        const x = width / 2 + (Math.random() - 0.5) * panelW;
        const star = this.add.text(x, panelY - 10, '✨', { fontSize: (10 + Math.random() * 10) + 'px' }).setOrigin(0.5).setAlpha(0);
        this.overlayContainer.add(star);
        this.tweens.add({
          targets: star, y: star.y + 140 + Math.random() * 80, alpha: { from: 1, to: 0 }, angle: Math.random() * 180,
          delay: i * 40, duration: 900 + Math.random() * 300, ease: 'Cubic.In'
        });
      }
    }
  }

  showLose(text) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);

    const panelW = width - 60, panelH = 220;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 16, fill: 0xfff0ee, border: COLORS.ruby, borderWidth: 3 });

    const title = this.add.text(width / 2, panelY + 40, '💥 You Lost!', {
      fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#b91c1c'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, panelY + 86, text, {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#42281d', align: 'center',
      wordWrap: { width: panelW - 30 }
    }).setOrigin(0.5);

    const retryBtn = makeButton(this, width / 2, panelY + panelH - 40, 'Retry This Level', { variant: 'gold', fontSize: '13px' });
    retryBtn.on('pointerdown', () => this.loadLevel());

    this.overlayContainer.add([bg, panel, title, sub, retryBtn]);
    this.overlayContainer.setVisible(true);
  }
}
