import Phaser from 'phaser';
import { CATEGORIES, getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted, resolveDailyQuest, claimDailyQuestReward } from '../utils/storage.js';
import { COLORS, makeButton } from '../utils/theme.js';

// Bản đồ "Hải Trình" dạng đường đi dọc zíc-zắc (kiểu Candy Crush/Coin Master)
// theo đúng thiết kế Figma người dùng cung cấp — thay cho lưới category cũ.
// Node cao (idx lớn) nằm TRÊN — càng lên cao càng xa/chưa mở; cuộn xuống dưới
// là các màn đã qua.
//
// Bảng màu "trời/biển" tươi sáng (tham khảo mockup "Nautical Chains") thay cho
// nền navy tối trước đây — chỉ áp dụng cho Home, không đổi theme.js dùng chung.

const MAP_BG = 0xf3e3b8;
const MAP_BG_DARK = 0xe0c98a;
const MAP_BORDER = 0x4a2c11;
const OCEAN = 0x0f766e;
const LOCK_BG = 0x7a5230;
const LOCK_BORDER = 0x442711;
const CURRENT_BG = 0xffc200;
const CURRENT_BORDER = 0xc68a00;
const PASSED_BG = 0x22c55e;
const PASSED_BORDER = 0x15803d;
const NODE_SPACING = 84;
const NODE_R = 27;

function totalCompleted(save) {
  return Object.values(save.completedLevels || {}).reduce((s, arr) => s + arr.length, 0);
}
function playerRank(save) { return 1 + Math.floor(totalCompleted(save) / 10); }

function firstIncompleteIndex(save, category) {
  const idx = category.levels.findIndex((_, i) => !isLevelCompleted(save, category.id, i));
  return idx === -1 ? category.levels.length - 1 : idx;
}

export default class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const save = this.registry.get('save');
    this.save = save;

    if (!save.viewedCategoryId || !getCategory(save.viewedCategoryId)) {
      save.viewedCategoryId = save.lastCategoryId || CATEGORIES[0].id;
    }
    this.categoryIdx = Math.max(0, CATEGORIES.findIndex(c => c.id === save.viewedCategoryId));

    this.drawBackground(width, height);
    this.buildTopBar(width);
    this.buildEventBar(width);
    this.buildCategorySwitcher(width);
    this.buildMap(width, height);
    this.buildSideMenu(width);
    this.buildCTA(width, height);
    this.buildBottomNav(width, height);
    this.buildSettingsOverlay(width, height);

    const justCompleted = this.registry.get('justCompletedCategory');
    if (justCompleted) {
      this.registry.set('justCompletedCategory', null);
      playSound('win', save.soundMuted);
    }
  }

  get category() { return CATEGORIES[this.categoryIdx]; }

  // ---------------- Nền trời/biển + đảo/mây trang trí ----------------

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

  // ---------------- HUD trên cùng ----------------

  buildTopBar(width) {
    // Mạng chơi (❤️ 5/5) — chỉ trang trí theo đúng mockup tham khảo, bản demo
    // chưa có cơ chế mất mạng/hồi mạng nên số liệu này cố định, không đổi.
    const heartsX = 14, heartsY = 14, heartsW = 64, heartsH = 30;
    const hg = this.add.graphics();
    hg.fillStyle(0xffffff, 1).fillRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    hg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(heartsX, heartsY, heartsW, heartsH, 15);
    this.add.text(heartsX + 15, heartsY + heartsH / 2, '❤️', { fontSize: '11px' }).setOrigin(0.5);
    this.add.text(heartsX + 33, heartsY + heartsH / 2, '5/5', {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);

    const rank = playerRank(this.save);
    const rankChip = this.add.container(86, 14);
    const rb = this.add.graphics();
    rb.fillStyle(COLORS.woodDark, 1).fillRoundedRect(0, 0, 58, 30, 8);
    rb.lineStyle(2, COLORS.gold, 1).strokeRoundedRect(0, 0, 58, 30, 8);
    const star = this.add.text(29, 9, '★', { fontSize: '10px', color: '#f3c64f' }).setOrigin(0.5);
    const rankTxt = this.add.text(29, 21, `CẤP ${rank}`, {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5);
    rankChip.add([rb, star, rankTxt]);

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

  // rightEdgeX: toạ độ mép phải của chip (để xếp các chip từ phải sang trái không đè nhau).
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

  // ---------------- Thanh Nhiệm Vụ Ngày (event bar) ----------------
  // Bề mặt hiển thị cho dailyQuest — dữ liệu này đã tồn tại trong storage.js
  // (newClearsToday/target/claimed) nhưng trước đây chưa có UI nào đọc/nhận
  // thưởng. Nhấn vào thanh này để xem tiến độ hoặc nhận thưởng khi đủ điều kiện.

  buildEventBar(width) {
    const x = 14, y = 54, w = width - 28, h = 26;
    const g = this.add.graphics();
    g.fillStyle(COLORS.parchment, 1).fillRoundedRect(x, y, w, h, 13);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(x, y, w, h, 13);
    this.add.text(x + 15, y + h / 2, '📜', { fontSize: '13px' }).setOrigin(0.5);

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
    this.eventLabel.setText(q.claimed ? '✓ Đã nhận' : `${Math.min(q.newClearsToday, q.target)}/${q.target}`);
  }

  onEventBarTap() {
    const q = this.save.dailyQuest;
    if (q.claimed) {
      playSound('switch', this.save.soundMuted);
      this.showToast('📜 Nhiệm vụ hôm nay đã nhận thưởng, mai quay lại nhé!');
      return;
    }
    if (q.newClearsToday >= q.target) {
      claimDailyQuestReward(this.save);
      saveState(this.save);
      playSound('win', this.save.soundMuted);
      this.coinChip.setValue(this.save.coins);
      this.updateEventBar();
      this.showToast('🎉 Nhận thưởng Nhiệm Vụ Ngày thành công!');
      return;
    }
    playSound('switch', this.save.soundMuted);
    this.showToast(`📜 Hoàn thành ${q.target - q.newClearsToday} màn mới nữa để nhận thưởng!`);
  }

  // ---------------- Bộ chuyển Category ----------------

  buildCategorySwitcher(width) {
    this.switcherY = 94;
    this.switcherContainer = this.add.container(0, 0);
    this.redrawSwitcher(width);

    const arrowL = this.add.text(20, this.switcherY, '‹', { fontFamily: 'Cinzel', fontSize: '22px', color: '#f3c64f' })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    const arrowR = this.add.text(width - 20, this.switcherY, '›', { fontFamily: 'Cinzel', fontSize: '22px', color: '#f3c64f' })
      .setOrigin(0.5).setInteractive({ useHandCursor: true });
    arrowL.on('pointerdown', () => this.switchCategory(-1, width));
    arrowR.on('pointerdown', () => this.switchCategory(1, width));
  }

  redrawSwitcher(width) {
    this.switcherContainer.removeAll(true);
    const cat = this.category;
    const label = this.add.text(width / 2, this.switcherY, `${cat.icon}  ${cat.title}`, {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5);
    const dots = this.add.text(width / 2, this.switcherY + 16, `Đảo ${this.categoryIdx + 1}/${CATEGORIES.length}`, {
      fontFamily: 'Crimson Pro', fontSize: '9px', color: '#6fa8c9'
    }).setOrigin(0.5);
    this.switcherContainer.add([label, dots]);
  }

  switchCategory(dir, width) {
    this.categoryIdx = (this.categoryIdx + dir + CATEGORIES.length) % CATEGORIES.length;
    this.save.viewedCategoryId = this.category.id;
    saveState(this.save);
    playSound('switch', this.save.soundMuted);
    this.redrawSwitcher(width);
    this.rebuildMapContent();
    this.updateCTA();
  }

  // ---------------- Bản đồ đường đi ----------------

  buildMap(width, height) {
    this.mapViewTop = 122;
    this.mapViewBottom = height - 150;
    const mapH = this.mapViewBottom - this.mapViewTop;
    // Hẹp hơn bản gốc (14/width-28) để chừa 2 cột trống bên trái/phải cho
    // side-menu (giống layout nút nổi cạnh khung bản đồ trong mockup).
    const mapX = 58, mapW = width - 116;
    this.mapX = mapX; this.mapW = mapW;

    const mapBg = this.add.graphics();
    mapBg.fillStyle(OCEAN, 1).fillRoundedRect(mapX, this.mapViewTop, mapW, mapH, 20);
    mapBg.fillStyle(MAP_BG, 1).fillRoundedRect(mapX + 8, this.mapViewTop + 8, mapW - 16, mapH - 16, 16);
    // Vệt "đảo" bên trong đậm hơn 1 chút để gợi cảm giác địa hình, không phẳng lì.
    mapBg.fillStyle(MAP_BG_DARK, 0.5);
    for (let i = 0; i < 5; i++) {
      const cx = mapX + 20 + (i * 37) % (mapW - 40);
      const cy = this.mapViewTop + 30 + (i * 97) % (mapH - 60);
      mapBg.fillEllipse(cx, cy, 46, 30);
    }
    mapBg.lineStyle(4, MAP_BORDER, 1).strokeRoundedRect(mapX, this.mapViewTop, mapW, mapH, 20);
    this.add.text(mapX + mapW - 30, this.mapViewTop + 26, '✳', { fontSize: '16px', color: '#4a2c11' }).setAlpha(0.5);

    this.mapMaskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.mapMaskShape.fillStyle(0xffffff).fillRoundedRect(mapX + 8, this.mapViewTop + 8, mapW - 16, mapH - 16, 16);

    this.pathContainer = this.add.container(0, this.mapViewTop);
    this.pathContainer.setMask(this.mapMaskShape.createGeometryMask());
    this.mapCenterX = mapX + mapW / 2;

    this.rebuildMapContent();
    this.setupMapScroll(mapX, mapW);
  }

  laneX(idx) { return this.mapCenterX + 0.24 * (this.mapCenterX - 28) * Math.sin(idx * 1.15); }

  rebuildMapContent() {
    this.pathContainer.removeAll(true);
    const cat = this.category;
    const total = cat.levels.length;
    const currentIdx = firstIncompleteIndex(this.save, cat);
    this.currentLevelIdx = currentIdx;
    this.nodeHit = [];

    for (let idx = total - 1; idx >= 0; idx--) {
      const pos = total - 1 - idx; // 0 = trên cùng (idx lớn nhất)
      const y = pos * NODE_SPACING + 50;
      const x = this.laneX(idx);
      const done = isLevelCompleted(this.save, cat.id, idx);
      const isCurrent = idx === currentIdx;
      const locked = !done && !isCurrent;

      if (pos > 0) {
        const prevIdx = idx + 1;
        const py = (pos - 1) * NODE_SPACING + 50;
        const px = this.laneX(prevIdx);
        const line = this.add.graphics();
        line.lineStyle(5, locked ? 0x6b4423 : COLORS.teal, locked ? 0.5 : 0.85);
        line.lineBetween(px, py, x, y);
        this.pathContainer.add(line);
      }

      this.pathContainer.add(this.buildNode(x, y, idx, { done, isCurrent, locked }));
    }

    this.totalPathHeight = total * NODE_SPACING + 40;
    this.scrollToCurrent();
  }

  buildNode(x, y, idx, { done, isCurrent, locked }) {
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
      group.add(this.add.text(0, -2, '🔒', { fontSize: '16px' }).setOrigin(0.5));
      group.add(this.add.text(0, 15, String(idx + 1), { fontFamily: 'Cinzel', fontSize: '9px', color: '#d6d3d1' }).setOrigin(0.5));
    } else {
      group.add(this.add.text(0, 0, String(idx + 1), { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#2b1e16' }).setOrigin(0.5));
    }

    if (isCurrent) {
      const avatar = this.add.text(0, -r - 16, '⛵', { fontSize: '22px' }).setOrigin(0.5);
      this.tweens.add({ targets: avatar, y: { from: -r - 20, to: -r - 12 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      group.add(avatar);
    }

    this.nodeHit.push({ idx, x, y, r: r + 6, done, isCurrent, locked });
    return group;
  }

  scrollToCurrent() {
    const total = this.category.levels.length;
    const pos = total - 1 - this.currentLevelIdx;
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
      this.showToast(`🔒 Hoàn thành màn ${node.idx} trước để mở khoá!`);
      return;
    }
    playSound('lock', this.save.soundMuted);
    this.scene.start('Game', { categoryId: this.category.id, levelIndex: node.idx });
  }

  // ---------------- Side-menu nổi cạnh bản đồ (trang trí theo mockup) ----------------
  // Các nút này KHÔNG gắn với tính năng thật nào trong bản demo (không có
  // bảng xếp hạng, rương quà, gợi ý mua hay quảng cáo) — chỉ dựng cho giống
  // bố cục tham khảo; chạm vào sẽ báo "sắp ra mắt" để không gây hiểu nhầm.

  buildSideMenu(width) {
    const startY = this.mapViewTop + 26;
    const btnSize = 36;
    const leftX = this.mapX / 2 + 7;
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
        this.showToast('🚧 Tính năng này sẽ sớm ra mắt!');
      });
    });

    const adsSize = 42;
    const adsX = width - this.mapX / 2 - 7;
    const adsY = startY;
    const adsBg = this.add.graphics();
    adsBg.fillStyle(0xf43f5e, 1).fillRoundedRect(adsX - adsSize / 2, adsY - adsSize / 2, adsSize, adsSize, 12);
    adsBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(adsX - adsSize / 2, adsY - adsSize / 2, adsSize, adsSize, 12);
    this.add.text(adsX, adsY - 6, '🎬', { fontSize: '15px' }).setOrigin(0.5);
    this.add.text(adsX, adsY + 11, 'ADS', {
      fontFamily: 'Cinzel', fontSize: '7px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
    const adsHit = this.add.rectangle(adsX, adsY, adsSize + 6, adsSize + 6, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    adsHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      this.showToast('🎬 Bản demo chưa hỗ trợ quảng cáo.');
    });
  }

  // ---------------- CTA + Nav dưới ----------------

  buildCTA(width, height) {
    this.ctaY = this.mapViewBottom + 34;
    this.ctaBtn = makeButton(this, width / 2, this.ctaY, this.ctaLabel(), {
      variant: 'gold', fontSize: '14px', shadow: true,
      onClick: () => this.onNodeTap({ idx: this.currentLevelIdx, locked: false })
    });
  }

  ctaLabel() {
    const isFirst = this.currentLevelIdx === 0 && totalCompleted(this.save) === 0;
    return isFirst ? 'GIẢI MÃ HẢI HÀNH' : `VÀO MÀN ${this.currentLevelIdx + 1}`;
  }

  updateCTA() {
    this.ctaBtn.destroy();
    this.ctaBtn = makeButton(this, this.scale.width / 2, this.ctaY, this.ctaLabel(), {
      variant: 'gold', fontSize: '14px', shadow: true,
      onClick: () => this.onNodeTap({ idx: this.currentLevelIdx, locked: false })
    });
  }

  buildBottomNav(width, height) {
    const barH = 60;
    const barY = height - barH - 6;
    const bar = this.add.graphics();
    bar.fillStyle(COLORS.teal, 1).fillRoundedRect(10, barY, width - 20, barH, 20);
    bar.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(10, barY, width - 20, barH, 20);

    const items = [
      { key: 'journey', icon: '🧭', label: 'Hải Trình' },
      { key: 'shop', icon: '🏪', label: 'Cửa Hàng' },
      { key: 'quest', icon: '📜', label: 'Nhiệm Vụ' },
      { key: 'bag', icon: '🎒', label: 'Hành Trang' }
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
      if (!active) {
        this.add.text(cx, cy + size / 2 + 7, item.label, {
          fontFamily: 'Cinzel', fontSize: '6.5px', color: '#f4e8cf'
        }).setOrigin(0.5);
      }

      const hit = this.add.rectangle(cx, baseY, step - 6, barH, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => this.onNavTap(item.key));
    });
  }

  onNavTap(key) {
    if (key === 'journey') return;
    if (key === 'quest') { this.onEventBarTap(); return; }
    if (key === 'shop') { this.showToast('🏪 Cửa Hàng sẽ sớm ra mắt!'); return; }
    if (key === 'bag') { this.showToast('🎒 Bổ Trợ được mua trực tiếp trong màn chơi bằng Xu.'); return; }
  }

  // ---------------- Thiết Lập (overlay đơn giản) ----------------

  buildSettingsOverlay(width, height) {
    const bg = this.add.rectangle(0, 0, width, height, 0x04070d, 0.92).setOrigin(0).setInteractive();
    const panelW = width - 60, panelH = 200, px = width / 2 - panelW / 2, py = height / 2 - panelH / 2;
    const g = this.add.graphics();
    g.fillStyle(COLORS.cardBg, 1).fillRoundedRect(px, py, panelW, panelH, 16);
    g.lineStyle(2, COLORS.gold, 1).strokeRoundedRect(px, py, panelW, panelH, 16);
    const title = this.add.text(width / 2, py + 20, 'THIẾT LẬP', {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0.5, 0);

    const soundBtn = makeButton(this, width / 2, py + 80, this.soundLabel(), {
      variant: 'teal', fontSize: '12px', onClick: () => {
        this.save.soundMuted = !this.save.soundMuted;
        saveState(this.save);
        soundBtn.list[1].setText(this.soundLabel());
      }
    });
    const closeBtn = makeButton(this, width / 2, py + panelH - 30, 'Đóng', {
      variant: 'ink', fontSize: '11px', onClick: () => this.settingsOverlay.setVisible(false)
    });

    this.settingsOverlay = this.add.container(0, 0, [bg, g, title, soundBtn, closeBtn]).setDepth(100).setVisible(false);
  }

  soundLabel() { return this.save.soundMuted ? '🔇 Đã Tắt Âm Thanh' : '🔊 Đang Bật Âm Thanh'; }

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
