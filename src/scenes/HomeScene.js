import Phaser from 'phaser';
import { playSound } from '../utils/audio.js';
import {
  saveState, isLevelCompleted, resolveDailyQuest, claimDailyQuestReward,
  resolveDailyCheckIn, claimDailyCheckIn
} from '../utils/storage.js';
import { resolveLives, msUntilNextLife, formatMs, LIVES_MAX } from '../utils/lives.js';
import { getFlatLevels, firstIncompleteGlobalIndex } from '../utils/progression.js';
import { getDifficulty, DIFFICULTY_STYLE } from '../utils/difficulty.js';
import { COLORS, makeStatChip, makeIconButton, buildStatCluster } from '../utils/theme.js';
import { buildSettingsModal } from '../utils/settingsModal.js';
import { showOutOfLives } from '../utils/livesModal.js';
import { showMockedAdOverlay } from '../utils/mockAd.js';
import { buildBottomDock, DOCK_HOME_H } from '../utils/dock.js';

const AD_COINS_REWARD = 50;

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
const NODE_SPACING = 150;
const NODE_R = 42;
const NODE_R_CURRENT = 52;
const NODE_TOP_PAD = 70;

// Shared bottom-of-screen geometry — the dock's raised center "Home" podium
// is the TALLEST thing at the bottom of the screen (taller than its own
// side panels), so both the map mask and the CTA button anchor off its top
// edge (DOCK_HOME_H), not the shorter side panels, or the CTA's rounded
// corners get clipped by the podium sitting in front of it. CTA_DOCK_GAP
// also has to cover the CTA's own drop-shadow, which extends 6px BELOW the
// button's nominal bottom edge — without that, the gap looks fine on paper
// but the shadow still visibly touches the dock.
const CTA_H = 62;
const CTA_SHADOW_BLEED = 6;
const CTA_DOCK_GAP = 26;
const MAP_CTA_GAP = 8;

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
    this.livesOverlay = this.add.container(0, 0).setDepth(105).setVisible(false);
  }

  // ---------------- Sky/ocean background + decorative islands/clouds ----------------

  drawBackground(width, height) {
    const sky = this.add.graphics();
    sky.fillGradientStyle(0x4cb3ec, 0x4cb3ec, 0x1c7dc4, 0x1c7dc4, 1);
    sky.fillRect(0, 0, width, height);

    // Soft, low-opacity background haze — no outline at all, since even a
    // faint stroke around a flat ellipse still reads as a "drawn shape"
    // placeholder rather than atmosphere. Each blob is also layered from a
    // wider/fainter pass to a smaller/denser one, a cheap stand-in for a
    // real blur.
    const deco = this.add.graphics();
    const island = (cx, cy, w, h, rot) => {
      deco.save();
      deco.translateCanvas(cx, cy);
      deco.rotateCanvas(rot);
      deco.fillStyle(0x4ade80, 0.14).fillEllipse(0, 0, w * 1.3, h * 1.3);
      deco.fillStyle(0x4ade80, 0.22).fillEllipse(0, 0, w, h);
      deco.restore();
    };
    const cloud = (cx, cy, w, h) => {
      deco.fillStyle(0xffffff, 0.2).fillRoundedRect(cx - w * 0.65, cy - h * 0.65, w * 1.3, h * 1.3, h * 0.65);
      deco.fillStyle(0xffffff, 0.35).fillRoundedRect(cx - w / 2, cy - h / 2, w, h, h / 2);
    };
    island(width * 0.12, height * 0.16, 62, 38, -0.15);
    island(width * 0.92, height * 0.4, 70, 42, 0.2);
    island(width * 0.08, height * 0.82, 52, 32, 0);
    cloud(width * 0.82, height * 0.08, 56, 20);
    cloud(width * 0.1, height * 0.34, 66, 22);
    cloud(width * 0.9, height * 0.66, 48, 16);
  }

  // ---------------- Top HUD ----------------

  buildTopBar(width) {
    resolveLives(this.save);

    // Coins + Lives — big icon-in-circle bleeding into a blue-bordered cream
    // pill, with a small green "+" quick-earn button on the end. Sizes are
    // fixed but positions chain off each other's rightEdge, so the whole
    // cluster self-adjusts across the 320-480px width range without ever
    // needing per-breakpoint tuning.
    this.coinChip = buildStatCluster(this, 6, 8, {
      icon: '🪙', iconBg: 0xffd94d, iconBorder: 0xc9971f,
      value: this.save.coins, onBuy: () => this.watchAdForCoins()
    });

    // Lives cluster matches the reference exactly: the count sits as a
    // small red badge ON the heart icon itself, and the pill next to it
    // shows the regen countdown ("19:19") instead of repeating the count.
    const remaining = msUntilNextLife(this.save);
    this.livesCluster = buildStatCluster(this, this.coinChip.rightEdge + 18, 8, {
      icon: '❤️', iconBg: 0xff8a8a, iconBorder: 0xc23b3b, valueColor: '#0369a1',
      value: remaining > 0 ? formatMs(remaining) : 'FULL', measureText: '20:00',
      badge: this.save.lives.count, badgeColor: 0xef4444,
      onBuy: () => this.addLifeViaAd()
    });
    this.time.addEvent({ delay: 1000, loop: true, callback: () => this.refreshLivesDisplay() });

    // Settings — the shared chunky 3D icon button (blue, matches the
    // reference's blue rounded-square gear button).
    const gearSize = 48;
    const gearX = width - 10 - gearSize / 2, gearY = 8 + gearSize / 2;
    makeIconButton(this, gearX, gearY, '⚙️', {
      size: gearSize, variant: 'blue', iconSize: '22px',
      onClick: () => { playSound('switch', this.save.soundMuted); this.settingsOverlay.setVisible(true); }
    });
  }

  refreshLivesDisplay() {
    resolveLives(this.save);
    this.livesCluster.setBadge(this.save.lives.count);
    const remaining = msUntilNextLife(this.save);
    this.livesCluster.setValue(remaining > 0 ? formatMs(remaining) : 'FULL');
  }

  addLifeViaAd() {
    resolveLives(this.save);
    if (this.save.lives.count >= LIVES_MAX) {
      playSound('switch', this.save.soundMuted);
      this.showToast('❤️ Lives are already full!');
      return;
    }
    playSound('switch', this.save.soundMuted);
    showMockedAdOverlay(this, {
      onDone: () => {
        this.save.lives.count = Math.min(LIVES_MAX, this.save.lives.count + 1);
        saveState(this.save);
        this.refreshLivesDisplay();
        playSound('win', this.save.soundMuted);
        this.showToast('📺 +1 Life!');
      }
    });
  }

  // ---------------- Daily Quest event bar ----------------

  buildEventBar(width) {
    const x = 14, y = 58, w = width - 28, h = 26;
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
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
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

  buildMap(width, height) {
    // Ngay dưới Quest Bar, và ngay trên đỉnh nút Play CTA — mask cắt gọn
    // đường đi/level node để khi vuốt cuộn, chúng KHÔNG BAO GIỜ trượt lòi ra
    // che Top HUD hay chèn xuống dưới CTA/Nav Bar.
    this.mapViewTop = 90;
    this.mapViewBottom = height - DOCK_HOME_H - CTA_DOCK_GAP - CTA_H - MAP_CTA_GAP;
    this.mapCenterX = width / 2;

    this.mapMaskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.mapMaskShape.fillStyle(0xffffff).fillRect(0, this.mapViewTop, width, this.mapViewBottom - this.mapViewTop);

    this.pathContainer = this.add.container(0, this.mapViewTop);
    this.pathContainer.setMask(this.mapMaskShape.createGeometryMask());

    this.rebuildMapContent();
    this.setupMapScroll(64, width - 128);
  }

  // Biên độ uốn lượn bị khống chế cứng ở ±90px (dải trung tâm rộng 180px)
  // để đường đi không bao giờ tràn sang đè lên nút Daily Check-in / No Ads
  // ở 2 bên màn hình, dù màn hình có rộng tới đâu.
  laneX(globalIndex) {
    const amplitude = Math.min(90, 0.15 * (this.mapCenterX - 28));
    return this.mapCenterX + amplitude * Math.sin(globalIndex * 1.15);
  }

  // Two passes, not one interleaved pass: every road segment gets added to
  // the display list BEFORE any node. A single per-i loop that draws "this
  // node's incoming road, then this node" put each segment ABOVE the node
  // above it but BELOW the node below it (added order = render order in
  // Phaser) — the classic z-fighting bug where the dashed road visibly cut
  // across the level number of the node just above it.
  rebuildMapContent() {
    this.pathContainer.removeAll(true);
    const flat = this.flatLevels;
    const total = flat.length;
    const currentGlobalIdx = firstIncompleteGlobalIndex(this.save);
    this.currentGlobalIdx = currentGlobalIdx;
    this.nodeHit = [];

    const laid = [];
    for (let i = total - 1; i >= 0; i--) {
      const item = flat[i];
      const pos = total - 1 - i;
      const y = pos * NODE_SPACING + NODE_TOP_PAD;
      const x = this.laneX(i);
      const done = isLevelCompleted(this.save, item.categoryId, item.levelIndex);
      const isCurrent = i === currentGlobalIdx;
      const locked = !done && !isCurrent;
      laid.push({ item, pos, x, y, done, isCurrent, locked });
    }

    // Pass 1 — every road segment (roadLayer), always behind every node.
    laid.forEach((n, idx) => {
      if (n.pos === 0) return;
      const prev = laid[idx - 1];
      this.drawRoadSegment(prev.x, prev.y, n.x, n.y, n.locked);
    });

    // Pass 2 — every node (nodeLayer), always in front of every road segment.
    laid.forEach((n) => {
      this.pathContainer.add(this.buildNode(n.x, n.y, n.item, n));
    });

    this.totalPathHeight = total * NODE_SPACING + NODE_TOP_PAD;
    this.scrollToCurrent();
  }

  drawRoadSegment(px, py, x, y, locked) {
    const base = this.add.graphics();
    base.lineStyle(18, locked ? ROAD_COLOR_LOCKED : ROAD_COLOR, locked ? 0.55 : 1);
    base.lineBetween(px, py, x, y);
    this.pathContainer.add(base);

    const dash = this.add.graphics();
    dash.lineStyle(6, locked ? ROAD_STRIPE_LOCKED : ROAD_STRIPE, locked ? 0.35 : 0.9);
    const dist = Phaser.Math.Distance.Between(px, py, x, y);
    const dx = dist > 0 ? (x - px) / dist : 0, dy = dist > 0 ? (y - py) / dist : 0;
    const segLen = 10, gapLen = 8;
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
    const r = isCurrent ? NODE_R_CURRENT : NODE_R;

    if (isCurrent) {
      const halo = this.add.circle(0, 0, r + 12, COLORS.gold, 0.25);
      this.tweens.add({ targets: halo, scale: { from: 1, to: 1.3 }, alpha: { from: 0.3, to: 0 }, duration: 1000, repeat: -1 });
      group.add(halo);
    }

    const fill = isCurrent ? CURRENT_BG : done ? PASSED_BG : LOCK_BG;
    const border = isCurrent ? CURRENT_BORDER : done ? PASSED_BORDER : LOCK_BORDER;
    const circle = this.add.circle(0, 0, r, fill).setStrokeStyle(isCurrent ? 5 : 4, border);
    group.add(circle);

    if (done) {
      group.add(this.add.text(0, 0, '✓', {
        fontFamily: 'Cinzel', fontSize: '32px', fontStyle: '900', color: '#ffffff'
      }).setOrigin(0.5));
    } else if (locked) {
      // Locked nodes show ONLY the lock icon, big and centered — no level
      // number at all, so there's nothing for it to collide with.
      group.add(this.add.text(0, 0, '🔒', { fontSize: Math.round(r * 0.62) + 'px' }).setOrigin(0.5));
    } else {
      // Unlocked/current nodes show ONLY the level number — no lock icon.
      group.add(this.add.text(0, 0, String(item.globalIndex + 1), {
        fontFamily: 'Cinzel', fontSize: '26px', fontStyle: '900', color: '#2b1e16'
      }).setOrigin(0.5));
    }

    const difficulty = getDifficulty(item.categoryId, item.levelIndex);
    if (difficulty) {
      const style = DIFFICULTY_STYLE[difficulty];
      const bx = r * 0.7, by = -r * 0.7;
      const badgeBg = this.add.circle(bx, by, 12, style.color).setStrokeStyle(2, 0xffffff);
      const badgeIcon = this.add.text(bx, by, style.icon, { fontSize: '13px' }).setOrigin(0.5);
      group.add([badgeBg, badgeIcon]);
    }

    if (isCurrent) {
      // Bigger and closer to the node — big enough to actually read as an
      // icon at a glance, and close enough that it clearly marks THIS node
      // rather than reading as floating debris further up the path.
      const avatar = this.add.text(0, -r - 26, '⛵', { fontSize: '30px' }).setOrigin(0.5);
      this.tweens.add({ targets: avatar, y: { from: -r - 30, to: -r - 22 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      group.add(avatar);
    }

    this.nodeHit.push({ item, x, y, r: r + 8, done, isCurrent, locked });
    return group;
  }

  scrollToCurrent() {
    const total = this.flatLevels.length;
    const pos = total - 1 - this.currentGlobalIdx;
    const targetY = pos * NODE_SPACING + NODE_TOP_PAD;
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
    resolveLives(this.save);
    if (this.save.lives.count <= 0) {
      playSound('error', this.save.soundMuted);
      showOutOfLives(this, this.livesOverlay, {
        onGranted: () => { this.refreshLivesDisplay(); this.onNodeTap(node); }
      });
      return;
    }
    playSound('lock', this.save.soundMuted);
    this.scene.start('Game', { categoryId: node.item.categoryId, levelIndex: node.item.levelIndex });
  }

  // ---------------- Floating side-menu (Offers) ----------------

  buildSideMenu(width) {
    const dailyX = 36, dailyY = this.mapViewTop + 130;
    this.buildDailyCheckInButton(dailyX, dailyY);

    // No Ads Floating Offer (Phải) — cùng hàng Y với nút Daily bên trái. A
    // big diagonal "ADS" stamp reads as a "banned/no-ads" sticker once
    // owned==false; flips to a plain ✓ once bought.
    const owned = !!this.save.adsRemoved;
    const cardSize = 68;
    this.buildOfferCard(width - 14 - cardSize / 2, dailyY, cardSize, {
      bg: owned ? COLORS.teal : 0xf43f5e,
      icon: owned ? '✓' : null,
      stamp: owned ? null : 'ADS',
      label: owned ? 'Owned' : 'No Ads',
      onClick: () => {
        playSound('switch', this.save.soundMuted);
        if (owned) { this.showToast('✓ Ads already removed — thanks for your support!'); return; }
        this.scene.start('Shop');
      }
    });
  }

  // "Điểm danh hàng ngày" — icon lịch 44x44px, viền gỗ tối, tag "Daily" bên
  // dưới, và một chấm đỏ báo chưa nhận thưởng hôm nay ở góc trên-phải icon.
  buildDailyCheckInButton(x, y) {
    resolveDailyCheckIn(this.save);
    const size = 44;
    const box = this.add.container(x, y);

    const shadow = this.add.graphics();
    shadow.fillStyle(0x2b1e16, 0.35).fillRoundedRect(-size / 2, -size / 2 + 4, size, size, 12);
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.wood, 1).fillRoundedRect(-size / 2, -size / 2, size, size, 12);
    bg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(-size / 2, -size / 2, size, size, 12);
    box.add([shadow, bg]);
    box.add(this.add.text(0, -2, '📅', { fontSize: '22px' }).setOrigin(0.5));

    const chipW = size, chipH = 18, chipY = size / 2 + 4;
    const chip = this.add.graphics();
    chip.fillStyle(0x36324c, 1).fillRoundedRect(-chipW / 2, chipY, chipW, chipH, 8);
    chip.lineStyle(2, 0x975e55, 1).strokeRoundedRect(-chipW / 2, chipY, chipW, chipH, 8);
    box.add(chip);
    box.add(this.add.text(0, chipY + chipH / 2, 'Daily', {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5));

    const dot = this.add.circle(size / 2 - 4, -size / 2 + 4, 5, 0xef4444).setStrokeStyle(1.5, 0xffffff);
    box.add(dot);
    this.dailyCheckInDot = dot;
    dot.setVisible(!this.save.dailyCheckIn.claimed);

    const hit = this.add.rectangle(0, chipH / 2, size + 12, size + chipH + 12, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    box.add(hit);
    hit.on('pointerdown', () => {
      this.tweens.add({ targets: box, scale: 0.94, duration: 60, yoyo: true });
      this.claimDailyLoginReward();
    });
  }

  claimDailyLoginReward() {
    resolveDailyCheckIn(this.save);
    if (this.save.dailyCheckIn.claimed) {
      playSound('switch', this.save.soundMuted);
      this.showToast('📅 You already checked in today — come back tomorrow!');
      return;
    }
    if (!claimDailyCheckIn(this.save)) return;
    saveState(this.save);
    this.coinChip.setValue(this.save.coins);
    if (this.dailyCheckInDot) this.dailyCheckInDot.setVisible(false);
    playSound('win', this.save.soundMuted);
    this.showToast('🎉 Daily Check-in reward claimed!');
  }

  // Square icon card + navy label chip below — shared shape for the two
  // floating Home offers (Watch-Ad-for-Coins, No Ads). `stamp` renders a
  // big rotated word across the icon area instead of an emoji (used for the
  // "ADS" no-ads-yet sticker look).
  buildOfferCard(x, y, size, { bg, icon, stamp, label, onClick }) {
    const box = this.add.container(x, y);
    const shadow = this.add.graphics();
    shadow.fillStyle(0x2b1e16, 0.35).fillRoundedRect(-size / 2, -size / 2 + 5, size, size, 16);
    const bgG = this.add.graphics();
    bgG.fillStyle(bg, 1).fillRoundedRect(-size / 2, -size / 2, size, size, 16);
    bgG.lineStyle(4, 0xffffff, 0.85).strokeRoundedRect(-size / 2, -size / 2, size, size, 16);
    box.add([shadow, bgG]);

    if (icon) box.add(this.add.text(0, -4, icon, { fontSize: Math.round(size * 0.42) + 'px' }).setOrigin(0.5));
    if (stamp) {
      const stampTxt = this.add.text(0, -4, stamp, {
        fontFamily: 'Cinzel', fontSize: Math.round(size * 0.32) + 'px', fontStyle: '900', color: '#fff1de'
      }).setOrigin(0.5).setAngle(-14).setShadow(0, 3, '#00000055', 4);
      box.add(stampTxt);
    }

    const chipW = size - 2, chipH = 22, chipY = size / 2 + 4;
    const chip = this.add.graphics();
    chip.fillStyle(0x36324c, 1).fillRoundedRect(-chipW / 2, chipY, chipW, chipH, 10);
    chip.lineStyle(2, 0x975e55, 1).strokeRoundedRect(-chipW / 2, chipY, chipW, chipH, 10);
    box.add(chip);
    box.add(this.add.text(0, chipY + chipH / 2, label, {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#fff9f4'
    }).setOrigin(0.5));

    const hit = this.add.rectangle(0, chipH / 2, size + 10, size + chipH + 10, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    box.add(hit);
    hit.on('pointerdown', () => {
      this.tweens.add({ targets: box, scale: 0.94, duration: 60, yoyo: true });
      onClick();
    });
    return box;
  }

  watchAdForCoins() {
    showMockedAdOverlay(this, {
      onDone: () => {
        this.save.coins += AD_COINS_REWARD;
        saveState(this.save);
        this.coinChip.setValue(this.save.coins);
        playSound('win', this.save.soundMuted);
        this.showToast(`📺 +${AD_COINS_REWARD} Coins!`);
      }
    });
  }

  // ---------------- CTA / Play Level Button (Chỉnh theo đúng Yêu cầu Mockup) ----------------

  buildCTA(width, height) {
    // Anchored off the dock's podium height (not mapViewBottom) so its
    // rounded bottom corners always clear the Home podium sitting in front
    // of it, with a fixed CTA_DOCK_GAP breathing room in between.
    this.ctaY = height - DOCK_HOME_H - CTA_DOCK_GAP - CTA_H / 2;
    const btnW = Math.min(width * 0.8, 260);
    const btnH = CTA_H;
    const x = width / 2;
    const y = this.ctaY;

    // Thông tin level hiện tại
    const currentItem = this.flatLevels[this.currentGlobalIdx];
    const levelNum = this.currentGlobalIdx + 1;
    const diff = currentItem ? getDifficulty(currentItem.categoryId, currentItem.levelIndex) : null;

    // Thiết lập màu sắc theo độ khó quy định trong hướng dẫn thiết kế:
    // Normal: Màu xanh lá (0x22c55e)
    // Hard: Màu Tím/Hồng đậm (0xc026d3) + Tag HARD
    // Super Hard: Màu Đỏ/Cam (0xea580c) + Tag SUPER HARD
    let bgColor = 0x22c55e;
    let borderColor = 0x15803d;
    let shadowColor = 0x14532d;
    let diffTagText = null;

    if (diff === 'hard') {
      bgColor = 0xc026d3;
      borderColor = 0x86198f;
      shadowColor = 0x4a044e;
      diffTagText = 'HARD';
    } else if (diff === 'superhard' || diff === 'extreme') {
      bgColor = 0xea580c;
      borderColor = 0x9a3412;
      shadowColor = 0x431407;
      diffTagText = 'SUPER HARD';
    }

    this.ctaContainer = this.add.container(x, y);

    // 1. Bóng đổ (Shadow) bên dưới
    const shadow = this.add.graphics();
    shadow.fillStyle(shadowColor, 0.8);
    shadow.fillRoundedRect(-btnW / 2, -btnH / 2 + 6, btnW, btnH, 20);
    this.ctaContainer.add(shadow);

    // 2. Thân nút chính (Main Button Body) — cream trim ties it visually to
    // the bottom dock right below it, instead of a plain white outline.
    const btnBg = this.add.graphics();
    btnBg.fillStyle(bgColor, 1);
    btnBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 20);
    btnBg.lineStyle(6, 0xe7ccb1, 1);
    btnBg.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 20);
    this.ctaContainer.add(btnBg);

    // 3. Hiệu ứng viền sáng/Highlight mặt trên nút
    const shine = this.add.graphics();
    shine.fillStyle(0xffffff, 0.25);
    shine.fillRoundedRect(-btnW / 2 + 6, -btnH / 2 + 4, btnW - 12, btnH / 2 - 2, { tl: 14, tr: 14, bl: 4, br: 4 });
    this.ctaContainer.add(shine);

    // 4. Nhãn Level — level thường: giữa nút (y:0, 22px). Có Tag độ khó: đẩy
    // lên (y:-8, 20px) để chừa chỗ cho pill Tag ngay dưới, không đè lên nhau.
    const strokeColor = '#' + shadowColor.toString(16).padStart(6, '0');
    const levelLabel = this.add.text(0, diffTagText ? -8 : 0, `Level ${levelNum}`, {
      fontFamily: 'Cinzel',
      fontSize: diffTagText ? '20px' : '22px',
      fontStyle: '900',
      color: '#fef2d4',
      stroke: strokeColor,
      strokeThickness: 4
    }).setOrigin(0.5);
    this.ctaContainer.add(levelLabel);

    // 5. Badge/Tag Thể hiện Độ khó (khi là Hard hoặc Super Hard) — pill nhỏ
    // ngay dưới Level label (y:12), không chồng lấp vì Level đã được đẩy lên.
    if (diffTagText) {
      const tagContainer = this.add.container(0, 12);
      const tagW = diffTagText.length * 8 + 16;
      const tagH = 15;
      const tagBg = this.add.graphics();
      tagBg.fillStyle(0x000000, 0.45);
      tagBg.fillRoundedRect(-tagW / 2, -tagH / 2, tagW, tagH, 7);
      const tagTxt = this.add.text(0, 0, diffTagText, {
        fontFamily: 'Cinzel',
        fontSize: '10px',
        fontStyle: '900',
        color: '#ffedd5'
      }).setOrigin(0.5);
      tagContainer.add([tagBg, tagTxt]);
      this.ctaContainer.add(tagContainer);
    }

    // Tương tác bấm nút
    const hitRect = this.add.rectangle(0, 0, btnW, btnH, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    this.ctaContainer.add(hitRect);

    hitRect.on('pointerdown', () => {
      this.onNodeTap(this.currentNode());
    });

    // Hiệu ứng mạch đập (Pulse animation)
    this.tweens.add({
      targets: this.ctaContainer,
      scaleX: 1.04,
      scaleY: 1.04,
      duration: 850,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  currentNode() {
    const item = this.flatLevels[this.currentGlobalIdx];
    if (!item) return { item: null, locked: true };
    const done = isLevelCompleted(this.save, item.categoryId, item.levelIndex);
    const isCurrent = this.currentGlobalIdx === firstIncompleteGlobalIndex(this.save);
    const locked = !done && !isCurrent;
    return { item, locked };
  }

  // ---------------- Bottom Navigation ----------------

  // Shared with Shop (utils/dock.js) so both screens' nav bar is pixel-for-
  // pixel the same chrome instead of two independently-drawn look-alikes.
  buildBottomNav(width, height) {
    buildBottomDock(this, width, height, {
      active: 'home',
      onShop: () => { playSound('switch', this.save.soundMuted); this.scene.start('Shop'); },
      onHome: () => {},
      onLock: () => this.showToast('🔒 More content is coming soon!')
    });
  }

  // ---------------- Settings overlay ----------------

  buildSettingsOverlay(width, height) {
    const { items } = buildSettingsModal(this, width, height, {
      onClose: () => this.settingsOverlay.setVisible(false)
    });
    this.settingsOverlay = this.add.container(0, 0, items).setDepth(100).setVisible(false);
  }

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