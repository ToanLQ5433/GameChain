import Phaser from 'phaser';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted, resolveDailyQuest, claimDailyQuestReward } from '../utils/storage.js';
import { resolveLives, msUntilNextLife, formatMs, LIVES_MAX } from '../utils/lives.js';
import { getFlatLevels, firstIncompleteGlobalIndex } from '../utils/progression.js';
import { getDifficulty, DIFFICULTY_STYLE } from '../utils/difficulty.js';
import { COLORS, makeStatChip } from '../utils/theme.js';
import { buildSettingsModal } from '../utils/settingsModal.js';

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
    resolveLives(this.save);

    // Coins Chip
    this.coinChip = makeStatChip(this, 14 + 70, 12, '🟡', this.save.coins, COLORS.gold);

    // Lives Pill
    const heartsX = 170, heartsY = 12, heartsW = 75, heartsH = 30;
    const hg = this.add.graphics();
    hg.fillStyle(0xffffff, 1).fillRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    hg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    this.add.text(heartsX + 15, heartsY + heartsH / 2, '❤️', { fontSize: '12px' }).setOrigin(0.5);
    this.livesLabel = this.add.text(heartsX + 32, heartsY + heartsH / 2, `${this.save.lives.count}/${LIVES_MAX}`, {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);
    this.livesTimerLabel = this.add.text(heartsX + heartsW / 2, heartsY + heartsH + 2, '', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#0369a1'
    }).setOrigin(0.5, 0);
    this.refreshLivesDisplay();
    this.time.addEvent({ delay: 1000, loop: true, callback: () => this.refreshLivesDisplay() });

    // Settings Square Button (Bo góc, viền dày)
    const gearX = width - 26, gearY = 27;
    const gearBtn = this.add.graphics();
    gearBtn.fillStyle(COLORS.teal, 1).fillRoundedRect(gearX - 18, gearY - 18, 36, 36, 10);
    gearBtn.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(gearX - 18, gearY - 18, 36, 36, 10);
    this.add.text(gearX, gearY, '⚙️', { fontSize: '18px' }).setOrigin(0.5);
    const gearHit = this.add.rectangle(gearX, gearY, 38, 38, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    gearHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      this.settingsOverlay.setVisible(true);
    });
  }

  refreshLivesDisplay() {
    resolveLives(this.save);
    this.livesLabel.setText(`${this.save.lives.count}/${LIVES_MAX}`);
    const remaining = msUntilNextLife(this.save);
    this.livesTimerLabel.setText(remaining > 0 ? `+1 in ${formatMs(remaining)}` : '');
  }

  // ---------------- Daily Quest event bar ----------------

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
    this.mapViewTop = 92;
    this.mapViewBottom = height - 150;
    this.mapCenterX = width / 2;

    this.mapMaskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.mapMaskShape.fillStyle(0xffffff).fillRect(0, this.mapViewTop, width, this.mapViewBottom - this.mapViewTop);

    this.pathContainer = this.add.container(0, this.mapViewTop);
    this.pathContainer.setMask(this.mapMaskShape.createGeometryMask());

    this.rebuildMapContent();
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
      const pos = total - 1 - i;
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
      group.add(this.add.text(0, 16, String(item.globalIndex + 1), { fontFamily: 'Cinzel', fontSize: '12px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5));
    } else {
      group.add(this.add.text(0, 0, String(item.globalIndex + 1), { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#2b1e16' }).setOrigin(0.5));
    }

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

  // ---------------- Floating side-menu (Offers) ----------------

  buildSideMenu(width) {
    const startY = this.mapViewTop + 30;

    // Starter Offer (Trái)
    const starterX = 36;
    const starterY = startY;
    const starterBox = this.add.container(starterX, starterY);

    const starterBg = this.add.graphics();
    starterBg.fillStyle(COLORS.gold, 1).fillRoundedRect(-20, -20, 40, 40, 10);
    starterBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(-20, -20, 40, 40, 10);
    const starterIcon = this.add.text(0, -3, '🎁', { fontSize: '20px' }).setOrigin(0.5);
    const starterTagBg = this.add.graphics();
    starterTagBg.fillStyle(COLORS.woodDark, 0.95).fillRoundedRect(-24, 12, 48, 14, 7);
    const starterTagTxt = this.add.text(0, 19, 'Starter', {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: 'bold', color: '#ffffff'
    }).setOrigin(0.5);

    starterBox.add([starterBg, starterIcon, starterTagBg, starterTagTxt]);
    const starterHit = this.add.rectangle(0, 0, 48, 48, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    starterBox.add(starterHit);
    starterHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      this.showToast('🎁 Starter Offer: Special starter pack coming soon!');
    });

    // No Ads Floating Offer (Phải)
    const owned = !!this.save.adsRemoved;
    const adsX = width - 36;
    const adsY = startY;
    const adsBox = this.add.container(adsX, adsY);

    const adsBg = this.add.graphics();
    adsBg.fillStyle(owned ? COLORS.teal : 0xf43f5e, 1).fillRoundedRect(-20, -20, 40, 40, 10);
    adsBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(-20, -20, 40, 40, 10);
    const adsIcon = this.add.text(0, -3, owned ? '✓' : '🚫', { fontSize: '18px' }).setOrigin(0.5);

    const adsTagBg = this.add.graphics();
    adsTagBg.fillStyle(COLORS.woodDark, 0.95).fillRoundedRect(-24, 12, 48, 14, 7);
    const adsTagTxt = this.add.text(0, 19, owned ? 'Owned' : 'No Ads', {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: 'bold', color: '#ffffff'
    }).setOrigin(0.5);

    adsBox.add([adsBg, adsIcon, adsTagBg, adsTagTxt]);

    const adsHit = this.add.rectangle(0, 0, 48, 48, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    adsBox.add(adsHit);
    adsHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      if (owned) {
        this.showToast('✓ Ads already removed — thanks for your support!');
        return;
      }
      this.scene.start('Shop');
    });
  }

  // ---------------- CTA / Play Level Button (Chỉnh theo đúng Yêu cầu Mockup) ----------------

  buildCTA(width, height) {
    this.ctaY = this.mapViewBottom + 36;
    const btnW = Math.min(width * 0.8, 260);
    const btnH = 58;
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

    // 2. Thân nút chính (Main Button Body)
    const btnBg = this.add.graphics();
    btnBg.fillStyle(bgColor, 1);
    btnBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 20);
    btnBg.lineStyle(4, 0xffffff, 0.95);
    btnBg.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 20);
    this.ctaContainer.add(btnBg);

    // 3. Hiệu ứng viền sáng/Highlight mặt trên nút
    const shine = this.add.graphics();
    shine.fillStyle(0xffffff, 0.25);
    shine.fillRoundedRect(-btnW / 2 + 6, -btnH / 2 + 4, btnW - 12, btnH / 2 - 2, { tl: 14, tr: 14, bl: 4, br: 4 });
    this.ctaContainer.add(shine);

    // 4. Nhãn Level
    const levelLabel = this.add.text(0, diffTagText ? -7 : 0, `Level ${levelNum}`, {
      fontFamily: 'Cinzel',
      fontSize: '22px',
      fontStyle: '900',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    this.ctaContainer.add(levelLabel);

    // 5. Badge/Tag Thể hiện Độ khó (khi là Hard hoặc Super Hard)
    if (diffTagText) {
      const tagContainer = this.add.container(0, 16);
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

  buildBottomNav(width, height) {
    const barH = 64;
    const barY = height - barH - 8;
    const bar = this.add.graphics();
    bar.fillStyle(COLORS.teal, 1).fillRoundedRect(12, barY, width - 24, barH, 22);
    bar.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(12, barY, width - 24, barH, 22);

    const items = [
      { key: 'shop', icon: '🏪', label: 'CỬA HÀNG' },
      { key: 'journey', icon: '🧭', label: 'HẢI TRÌNH' },
      { key: 'lock', icon: '🔒', label: 'SẮP CÓ' }
    ];
    const step = (width - 24) / items.length;
    const baseY = barY + barH / 2;

    items.forEach((item, i) => {
      const cx = 12 + step * i + step / 2;
      const active = item.key === 'journey';
      const size = active ? 52 : 44;
      const cy = baseY - (active ? 10 : 0);

      const btnBg = this.add.graphics();
      btnBg.fillStyle(active ? COLORS.gold : 0xffffff, 1).fillRoundedRect(cx - size / 2, cy - size / 2, size, size, 14);
      btnBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(cx - size / 2, cy - size / 2, size, size, 14);
      this.add.text(cx, cy, item.icon, { fontSize: active ? '22px' : '18px' }).setOrigin(0.5);

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