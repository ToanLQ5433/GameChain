import Phaser from 'phaser';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted, resolveDailyQuest, claimDailyQuestReward } from '../utils/storage.js';
import { getFlatLevels, firstIncompleteGlobalIndex } from '../utils/progression.js';
import { getDifficulty, DIFFICULTY_STYLE } from '../utils/difficulty.js';
import { COLORS, makeButton } from '../utils/theme.js';

// Single continuous "Voyage" path across ALL 210 levels (all categories
// merged into one track, per product decision — the player never picks a
// category explicitly anymore). Node index 0 = level 1 at the BOTTOM;
// higher levels stack upward, matching the reference mockup's map.

const LOCK_BG = 0x7a5230;
const LOCK_BORDER = 0x442711;
const CURRENT_BG = 0xffc200;
const CURRENT_BORDER = 0xc68a00;
const PASSED_BG = 0x22c55e;
const PASSED_BORDER = 0x15803d;
const ROAD_COLOR = 0x4a2c11;
const ROAD_COLOR_LOCKED = 0x6b4423;
const ROAD_STRIPE = 0xfef08a;
const ROAD_STRIPE_LOCKED = 0x8a7550;
const NODE_SPACING = 84;
const NODE_R = 27;

function totalCompleted(save) {
  return Object.values(save.completedLevels || {}).reduce((s, arr) => s + arr.length, 0);
}

export default class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const save = this.registry.get('save');
    this.save = save;
    this.flatLevels = getFlatLevels();

    this.drawBackground(width, height);
    this.buildTopBar(width);
    this.buildEventBar(width);
    this.buildMap(width, height);
    this.buildSideMenu(width);
    this.buildCTA(width, height);
    this.buildBottomNav(width, height);
    this.buildSettingsOverlay(width, height);
  }

  // ---------------- Sky/ocean background + decorative islands/clouds ----------------

  drawBackground(width, height) {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x5fc4f0, 0x5fc4f0, 0x0b4f78, 0x0b4f78, 1);
    sky.fillRect(0, 0, width, height);

    const deco = this.add.graphics();
    const island = (cx, cy, w, h, rot) => {
      deco.save();
      deco.translateCanvas(cx, cy);
      deco.rotateCanvas(rot);
      deco.fillStyle(0x4ade80, 0.85).fillEllipse(0, 0, w, h);
      deco.lineStyle(3, COLORS.woodDark, 0.85).strokeEllipse(0, 0, w, h);
      deco.restore();
    };
    const cloud = (cx, cy, w, h) => {
      deco.fillStyle(0xffffff, 0.85).fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
      deco.lineStyle(2, 0xcbd5e1, 0.9).strokeRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
    };
    island(width * 0.12, height * 0.16, 90, 56, -0.15);
    island(width * 0.92, height * 0.4, 100, 60, 0.2);
    island(width * 0.08, height * 0.82, 74, 46, 0);
    cloud(width * 0.82, height * 0.08, 70, 24);
    cloud(width * 0.1, height * 0.34, 84, 26);
    cloud(width * 0.9, height * 0.66, 60, 20);
  }

  // ---------------- Top HUD ----------------

  buildTopBar(width) {
    // Lives (❤️ 5/5) — decorative only, matching the reference mockup; this
    // demo has no life-loss/regeneration mechanic so the number never changes.
    const heartsX = 14, heartsY = 14, heartsW = 64, heartsH = 30;
    const hg = this.add.graphics();
    hg.fillStyle(0xffffff, 1).fillRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    hg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    this.add.text(heartsX + 15, heartsY + heartsH / 2, '❤️', { fontSize: '11px' }).setOrigin(0.5);
    this.add.text(heartsX + 33, heartsY + heartsH / 2, '5/5', {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);

    const gearSize = 34, gearX = width - 14 - gearSize, gearY = 14;
    const gearBg = this.add.graphics();
    gearBg.fillStyle(COLORS.teal, 1).fillRoundedRect(gearX, gearY, gearSize, gearSize, 10);
    gearBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(gearX, gearY, gearSize, gearSize, 10);
    this.add.text(gearX + gearSize / 2, gearY + gearSize / 2, '⚙️', { fontSize: '15px' }).setOrigin(0.5);
    const gearHit = this.add.rectangle(gearX + gearSize / 2, gearY + gearSize / 2, gearSize, gearSize, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true });
    gearHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      this.settingsOverlay.setVisible(true);
    });

    const gemRightEdge = gearX - 8;
    this.gemChip = this.makeStatChip(gemRightEdge, 14, '💎', this.save.gems, COLORS.teal);
    const coinRightEdge = this.gemChip.rightEdge - 8;
    this.coinChip = this.makeStatChip(coinRightEdge, 14, '🟡', this.save.coins, COLORS.gold);
  }

  // rightEdgeX: right edge of the chip, so chips can be laid out right-to-left without overlapping.
  makeStatChip(rightEdgeX, y, icon, value, accentColor) {
    const w = 64, h = 30;
    const xLeft = rightEdgeX - w;
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1).fillRoundedRect(xLeft, y, w, h, 15);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(xLeft, y, w, h, 15);
    this.add.circle(xLeft + 15, y + h / 2, 11, accentColor).setStrokeStyle(2, COLORS.woodDark);
    this.add.text(xLeft + 15, y + h / 2, icon, { fontSize: '11px' }).setOrigin(0.5);
    const valTxt = this.add.text(xLeft + 33, y + h / 2, String(value), {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);
    return { setValue: (v) => valTxt.setText(String(v)), rightEdge: xLeft };
  }

  // ---------------- Daily Quest event bar ----------------
  // Surfaces `dailyQuest` (newClearsToday/target/claimed) which already lived
  // in storage.js but previously had no UI reading or claiming it.

  buildEventBar(width) {
    const x = 14, y = 54, w = width - 28, h = 26;
    const g = this.add.graphics();
    g.fillStyle(COLORS.parchment, 1).fillRoundedRect(x, y, w, h, 13);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(x, y, w, h, 13);
    this.add.text(x + 15, y + h / 2, '🏆', { fontSize: '13px' }).setOrigin(0.5);

    this.eventTrackX = x + 28;
    this.eventTrackW = w - 28 - 44;
    this.eventTrackY = y + 6;
    this.eventTrackH = h - 12;
    const trackBg = this.add.graphics();
    trackBg.fillStyle(0xe2e8f0, 1).fillRoundedRect(this.eventTrackX, this.eventTrackY, this.eventTrackW, this.eventTrackH, this.eventTrackH / 2);
    trackBg.lineStyle(1.5, COLORS.woodDark, 0.6).strokeRoundedRect(this.eventTrackX, this.eventTrackY, this.eventTrackW, this.eventTrackH, this.eventTrackH / 2);
    this.eventFill = this.add.graphics();
    this.eventLabel = this.add.text(x + w - 8, y + h / 2, '', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(1, 0.5);

    const hit = this.add.rectangle(x + w / 2, y + h / 2, w, h, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerdown', () => this.onEventBarTap());

    this.updateEventBar();
  }

  updateEventBar() {
    resolveDailyQuest(this.save);
    const q = this.save.dailyQuest;
    const pct = q.claimed ? 1 : Phaser.Math.Clamp(q.newClearsToday / q.target, 0, 1);
    this.eventFill.clear();
    const fillW = Math.max(this.eventTrackH, this.eventTrackW * pct);
    this.eventFill.fillStyle(q.claimed ? COLORS.goldDim : COLORS.teal, 1)
      .fillRoundedRect(this.eventTrackX, this.eventTrackY, fillW, this.eventTrackH, this.eventTrackH / 2);
    this.eventLabel.setText(q.claimed ? '✓ Claimed' : `${Math.min(q.newClearsToday, q.target)}/${q.target}`);
  }

  onEventBarTap() {
    const q = this.save.dailyQuest;
    if (q.claimed) {
      playSound('switch', this.save.soundMuted);
      this.showToast('🏆 Today\'s quest reward is already claimed — come back tomorrow!');
      return;
    }
    if (q.newClearsToday >= q.target) {
      claimDailyQuestReward(this.save);
      saveState(this.save);
      playSound('win', this.save.soundMuted);
      this.coinChip.setValue(this.save.coins);
      this.updateEventBar();
      this.showToast('🎉 Daily Quest reward claimed!');
      return;
    }
    playSound('switch', this.save.soundMuted);
    this.showToast(`🏆 Clear ${q.target - q.newClearsToday} more level${q.target - q.newClearsToday > 1 ? 's' : ''} to earn the reward!`);
  }

  // ---------------- Voyage path (all levels, one continuous track) ----------------
  // Full-bleed like the reference mockup and most modern mobile saga maps —
  // the path sits directly on the sky/ocean background, edge to edge, rather
  // than inside a bordered card floating in the middle of the screen.

  buildMap(width, height) {
    this.mapViewTop = 92;
    this.mapViewBottom = height - 150;
    this.mapCenterX = width / 2;

    // Clip nodes to the area between the HUD and the bottom nav/CTA so
    // scrolled-off content doesn't show through those bars — plain full-width
    // rectangle now, no rounded "card" shape to match.
    this.mapMaskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.mapMaskShape.fillStyle(0xffffff).fillRect(0, this.mapViewTop, width, this.mapViewBottom - this.mapViewTop);

    this.pathContainer = this.add.container(0, this.mapViewTop);
    this.pathContainer.setMask(this.mapMaskShape.createGeometryMask());

    this.rebuildMapContent();
    // Input bounds stay narrower than the full-width visuals so drags don't
    // steal taps meant for the floating side-menu/ADS buttons, which sit
    // just outside the node lane's swing range.
    this.setupMapScroll(52, width - 104);
  }

  laneX(globalIndex) { return this.mapCenterX + 0.24 * (this.mapCenterX - 28) * Math.sin(globalIndex * 1.15); }

  rebuildMapContent() {
    this.pathContainer.removeAll(true);
    const flat = this.flatLevels;
    const total = flat.length;
    const currentGlobalIdx = firstIncompleteGlobalIndex(this.save);
    this.currentGlobalIdx = currentGlobalIdx;
    this.nodeHit = [];

    for (let i = total - 1; i >= 0; i--) {
      const item = flat[i];
      const pos = total - 1 - i; // 0 = topmost (highest level)
      const y = pos * NODE_SPACING + 50;
      const x = this.laneX(i);
      const done = isLevelCompleted(this.save, item.categoryId, item.levelIndex);
      const isCurrent = i === currentGlobalIdx;
      const locked = !done && !isCurrent;

      if (pos > 0) {
        const prevItem = flat[i + 1];
        const py = (pos - 1) * NODE_SPACING + 50;
        const px = this.laneX(prevItem.globalIndex);
        this.drawRoadSegment(px, py, x, y, locked);
      }

      this.pathContainer.add(this.buildNode(x, y, item, { done, isCurrent, locked }));
    }

    this.totalPathHeight = total * NODE_SPACING + 40;
    this.scrollToCurrent();
  }

  drawRoadSegment(px, py, x, y, locked) {
    const base = this.add.graphics();
    base.lineStyle(11, locked ? ROAD_COLOR_LOCKED : ROAD_COLOR, locked ? 0.55 : 1);
    base.lineBetween(px, py, x, y);
    this.pathContainer.add(base);

    // Dashed centre stripe on top of the solid road base — mirrors the
    // reference mockup's road (thick base + dashed line), not a bare line.
    const dash = this.add.graphics();
    dash.lineStyle(4, locked ? ROAD_STRIPE_LOCKED : ROAD_STRIPE, locked ? 0.35 : 0.9);
    const dist = Phaser.Math.Distance.Between(px, py, x, y);
    const dx = dist > 0 ? (x - px) / dist : 0, dy = dist > 0 ? (y - py) / dist : 0;
    const segLen = 7, gapLen = 6;
    let d = 0;
    while (d < dist) {
      const ed = Math.min(d + segLen, dist);
      dash.lineBetween(px + dx * d, py + dy * d, px + dx * ed, py + dy * ed);
      d += segLen + gapLen;
    }
    this.pathContainer.add(dash);
  }

  buildNode(x, y, item, { done, isCurrent, locked }) {
    const group = this.add.container(x, y);
    const r = isCurrent ? NODE_R + 6 : NODE_R;

    if (isCurrent) {
      const halo = this.add.circle(0, 0, r + 10, COLORS.gold, 0.25);
      this.tweens.add({ targets: halo, scale: { from: 1, to: 1.3 }, alpha: { from: 0.3, to: 0 }, duration: 1000, repeat: -1 });
      group.add(halo);
    }

    const fill = isCurrent ? CURRENT_BG : done ? PASSED_BG : LOCK_BG;
    const border = isCurrent ? CURRENT_BORDER : done ? PASSED_BORDER : LOCK_BORDER;
    const circle = this.add.circle(0, 0, r, fill).setStrokeStyle(isCurrent ? 4 : 3, border);
    group.add(circle);

    if (done) {
      group.add(this.add.text(0, 0, '✓', { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#ffffff' }).setOrigin(0.5));
    } else if (locked) {
      group.add(this.drawLockIcon());
      group.add(this.add.text(0, 15, String(item.globalIndex + 1), { fontFamily: 'Cinzel', fontSize: '9px', color: '#d6d3d1' }).setOrigin(0.5));
    } else {
      group.add(this.add.text(0, 0, String(item.globalIndex + 1), { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#2b1e16' }).setOrigin(0.5));
    }

    // Difficulty badge — only "hard"/"superhard" levels get a callout; easy
    // and normal levels stay unmarked so the tag actually means something.
    const difficulty = getDifficulty(item.categoryId, item.levelIndex);
    if (difficulty) {
      const style = DIFFICULTY_STYLE[difficulty];
      const bx = r * 0.66, by = -r * 0.66;
      const badgeBg = this.add.circle(bx, by, 10, style.color).setStrokeStyle(2, 0xffffff);
      const badgeIcon = this.add.text(bx, by, style.icon, { fontSize: '11px' }).setOrigin(0.5);
      group.add([badgeBg, badgeIcon]);
    }

    if (isCurrent) {
      const avatar = this.add.text(0, -r - 16, '⛵', { fontSize: '22px' }).setOrigin(0.5);
      this.tweens.add({ targets: avatar, y: { from: -r - 20, to: -r - 12 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      group.add(avatar);
    }

    this.nodeHit.push({ item, x, y, r: r + 6, done, isCurrent, locked });
    return group;
  }

  // Small vector padlock (instead of the 🔒 emoji) so locked nodes render
  // identically across platforms/fonts instead of depending on emoji glyphs.
  drawLockIcon() {
    const lock = this.add.graphics();
    const s = 16;
    lock.fillStyle(0xf4e8cf, 1).fillRoundedRect(-s / 2, 0, s, s * 0.68, 3);
    lock.lineStyle(2.5, 0xf4e8cf, 1);
    lock.beginPath();
    lock.arc(0, 0, s * 0.32, Math.PI, 0, false);
    lock.strokePath();
    lock.fillStyle(0x442711, 1).fillCircle(0, s * 0.32, 2.2);
    lock.setPosition(0, -8);
    return lock;
  }

  scrollToCurrent() {
    const total = this.flatLevels.length;
    const pos = total - 1 - this.currentGlobalIdx;
    const targetY = pos * NODE_SPACING + 50;
    const viewH = this.mapViewBottom - this.mapViewTop - 16;
    let offset = viewH * 0.62 - targetY;
    const minY = Math.min(0, viewH - this.totalPathHeight);
    offset = Phaser.Math.Clamp(offset, minY, 0);
    this.pathContainer.y = this.mapViewTop + offset;
  }

  setupMapScroll(mapX, mapW) {
    let pressY = 0, pressContainerY = 0, moved = false, isPressed = false, pressedIdx = null;
    const viewH = this.mapViewBottom - this.mapViewTop - 16;

    this.input.on('pointerdown', (p) => {
      if (p.y < this.mapViewTop || p.y > this.mapViewBottom || p.x < mapX || p.x > mapX + mapW) return;
      isPressed = true; moved = false;
      pressY = p.y; pressContainerY = this.pathContainer.y;
      const localX = p.x, localY = p.y - this.pathContainer.y;
      const hit = this.nodeHit.find(n => Phaser.Math.Distance.Between(localX, localY, n.x, n.y) <= n.r);
      pressedIdx = hit || null;
    });
    this.input.on('pointermove', (p) => {
      if (!isPressed) return;
      const dy = p.y - pressY;
      if (Math.abs(dy) > 8) moved = true;
      if (moved && this.totalPathHeight > viewH) {
        const minY = Math.min(this.mapViewTop, this.mapViewTop + viewH - this.totalPathHeight);
        this.pathContainer.y = Phaser.Math.Clamp(pressContainerY + dy, minY, this.mapViewTop);
      }
    });
    const endPress = () => {
      isPressed = false;
      if (!moved && pressedIdx) this.onNodeTap(pressedIdx);
      pressedIdx = null;
    };
    this.input.on('pointerup', endPress);
    this.input.on('pointerupoutside', endPress);
  }

  onNodeTap(node) {
    if (node.locked) {
      playSound('error', this.save.soundMuted);
      this.showToast(`🔒 Complete Level ${this.currentGlobalIdx + 1} first to unlock this one!`);
      return;
    }
    playSound('lock', this.save.soundMuted);
    this.scene.start('Game', { categoryId: node.item.categoryId, levelIndex: node.item.levelIndex });
  }

  // ---------------- Floating side-menu (decorative, matches the reference mockup) ----------------
  // None of these buttons are wired to a real feature in this demo (there's
  // no leaderboard, gift chest, purchasable hint, or ad system) — they only
  // exist to match the reference layout; tapping shows a "coming soon" toast
  // so it never claims to do something it doesn't.

  buildSideMenu(width) {
    const startY = this.mapViewTop + 26;
    const btnSize = 36;
    const leftX = 30;
    const leftItems = [
      { icon: '🎯', badge: true },
      { icon: '🎁', badge: false },
      { icon: '💡', badge: false }
    ];
    leftItems.forEach((item, i) => {
      const y = startY + i * 46;
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1).fillRoundedRect(leftX - btnSize / 2, y - btnSize / 2, btnSize, btnSize, 10);
      g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(leftX - btnSize / 2, y - btnSize / 2, btnSize, btnSize, 10);
      this.add.text(leftX, y, item.icon, { fontSize: '16px' }).setOrigin(0.5);
      if (item.badge) {
        this.add.circle(leftX + btnSize / 2 - 5, y - btnSize / 2 + 5, 5, 0xef4444).setStrokeStyle(1.5, 0xffffff);
      }
      const hit = this.add.rectangle(leftX, y, btnSize + 6, btnSize + 6, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => {
        playSound('switch', this.save.soundMuted);
        this.showToast('🚧 This feature is coming soon!');
      });
    });

    // "Remove Ads" shortcut — the diagonal slash over the icon is what marks
    // it as "no ads", not just the red colour. Tapping it opens the real
    // Shop scene (Remove Ads section); once purchased it turns into an
    // "owned" badge instead of a shortcut.
    const owned = !!this.save.adsRemoved;
    const adsSize = 42;
    const adsX = width - 30;
    const adsY = startY;
    const adsBg = this.add.graphics();
    adsBg.fillStyle(owned ? COLORS.teal : 0xf43f5e, 1).fillRoundedRect(adsX - adsSize / 2, adsY - adsSize / 2, adsSize, adsSize, 12);
    adsBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(adsX - adsSize / 2, adsY - adsSize / 2, adsSize, adsSize, 12);
    this.add.text(adsX, adsY - 6, owned ? '✓' : '📺', { fontSize: owned ? '18px' : '15px', color: '#ffffff' }).setOrigin(0.5);
    this.add.text(adsX, adsY + 11, 'ADS', {
      fontFamily: 'Cinzel', fontSize: '7px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
    if (!owned) {
      const slashInset = adsSize / 2 - 5;
      const slash = this.add.graphics();
      slash.lineStyle(4.5, 0x2b1e16, 0.9);
      slash.lineBetween(adsX - slashInset, adsY - slashInset, adsX + slashInset, adsY + slashInset);
      slash.lineStyle(2.5, 0xffffff, 1);
      slash.lineBetween(adsX - slashInset, adsY - slashInset, adsX + slashInset, adsY + slashInset);
    }
    const adsHit = this.add.rectangle(adsX, adsY, adsSize + 6, adsSize + 6, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    adsHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      if (owned) { this.showToast('✓ Ads already removed — thanks for your support!'); return; }
      this.scene.start('Shop');
    });
  }

  // ---------------- CTA + bottom nav ----------------

  buildCTA(width, height) {
    this.ctaY = this.mapViewBottom + 34;
    this.ctaBtn = makeButton(this, width / 2, this.ctaY, this.ctaLabel(), {
      variant: 'gold', fontSize: '14px', shadow: true, width: width * 0.82,
      onClick: () => this.onNodeTap(this.currentNode())
    });
  }

  currentNode() {
    const item = this.flatLevels[this.currentGlobalIdx];
    return { item, locked: false };
  }

  ctaLabel() {
    const isFirst = this.currentGlobalIdx === 0 && totalCompleted(this.save) === 0;
    return isFirst ? 'START THE VOYAGE' : `LEVEL ${this.currentGlobalIdx + 1}`;
  }

  buildBottomNav(width, height) {
    const barH = 60;
    const barY = height - barH - 6;
    const bar = this.add.graphics();
    bar.fillStyle(COLORS.teal, 1).fillRoundedRect(10, barY, width - 20, barH, 20);
    bar.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(10, barY, width - 20, barH, 20);

    const items = [
      { key: 'shop', icon: '🏪' },
      { key: 'journey', icon: '🧭' },
      { key: 'lock', icon: '🔒' }
    ];
    const step = (width - 20) / items.length;
    const baseY = barY + barH / 2;

    items.forEach((item, i) => {
      const cx = 10 + step * i + step / 2;
      const active = item.key === 'journey';
      const size = active ? 50 : 42;
      const cy = baseY - (active ? 10 : 0);

      const btnBg = this.add.graphics();
      btnBg.fillStyle(active ? COLORS.gold : 0xffffff, 1).fillRoundedRect(cx - size / 2, cy - size / 2, size, size, 12);
      btnBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(cx - size / 2, cy - size / 2, size, size, 12);
      this.add.text(cx, cy, item.icon, { fontSize: active ? '18px' : '15px' }).setOrigin(0.5);

      const hit = this.add.rectangle(cx, baseY, step - 6, barH, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => this.onNavTap(item.key));
    });
  }

  onNavTap(key) {
    if (key === 'journey') return;
    if (key === 'shop') { playSound('switch', this.save.soundMuted); this.scene.start('Shop'); return; }
    if (key === 'lock') { this.showToast('🔒 More content is coming soon!'); return; }
  }

  // ---------------- Settings overlay ----------------

  buildSettingsOverlay(width, height) {
    const bg = this.add.rectangle(0, 0, width, height, 0x04070d, 0.92).setOrigin(0).setInteractive();
    const panelW = width - 60, panelH = 200, px = width / 2 - panelW / 2, py = height / 2 - panelH / 2;
    const g = this.add.graphics();
    g.fillStyle(COLORS.cardBg, 1).fillRoundedRect(px, py, panelW, panelH, 16);
    g.lineStyle(2, COLORS.gold, 1).strokeRoundedRect(px, py, panelW, panelH, 16);
    const title = this.add.text(width / 2, py + 20, 'SETTINGS', {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0.5, 0);

    const soundBtn = makeButton(this, width / 2, py + 80, this.soundLabel(), {
      variant: 'teal', fontSize: '12px', onClick: () => {
        this.save.soundMuted = !this.save.soundMuted;
        saveState(this.save);
        soundBtn.list[1].setText(this.soundLabel());
      }
    });
    const closeBtn = makeButton(this, width / 2, py + panelH - 30, 'Close', {
      variant: 'ink', fontSize: '11px', onClick: () => this.settingsOverlay.setVisible(false)
    });

    this.settingsOverlay = this.add.container(0, 0, [bg, g, title, soundBtn, closeBtn]).setDepth(100).setVisible(false);
  }

  soundLabel() { return this.save.soundMuted ? '🔇 Sound Off' : '🔊 Sound On'; }

  // ---------------- Toast ----------------

  showToast(text) {
    if (this.toastText) this.toastText.destroy();
    const { width } = this.scale;
    this.toastText = this.add.text(width / 2, this.mapViewTop - 8, text, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f3c64f',
      backgroundColor: '#2b1e16', padding: { x: 10, y: 5 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 1).setDepth(60);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }
}
