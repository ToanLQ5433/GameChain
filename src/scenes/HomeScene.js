import Phaser from 'phaser';
import { CATEGORIES, getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted } from '../utils/storage.js';
import { COLORS, makeButton } from '../utils/theme.js';

// Bản đồ "Hải Trình" dạng đường đi dọc zíc-zắc (kiểu Candy Crush/Coin Master)
// theo đúng thiết kế Figma người dùng cung cấp — thay cho lưới category cũ.
// Node cao (idx lớn) nằm TRÊN — càng lên cao càng xa/chưa mở; cuộn xuống dưới
// là các màn đã qua.

const MAP_BG = 0xd9c49a;
const MAP_BG_DARK = 0xc7ae7c;
const MAP_BORDER = 0x5c3a21;
const OCEAN = 0x0d3b3c;
const LOCK_BG = 0x241a12;
const CURRENT_BG = 0xf6ecd8;
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
    this.buildCategorySwitcher(width);
    this.buildMap(width, height);
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

  drawBackground(width, height) {
    this.add.rectangle(0, 0, width, height, COLORS.bgDeep).setOrigin(0);
  }

  // ---------------- HUD trên cùng ----------------

  buildTopBar(width) {
    const rank = playerRank(this.save);
    const rankChip = this.add.container(14, 14);
    const rb = this.add.graphics();
    rb.fillStyle(COLORS.woodDark, 1).fillRoundedRect(0, 0, 58, 30, 8);
    rb.lineStyle(2, COLORS.gold, 1).strokeRoundedRect(0, 0, 58, 30, 8);
    const star = this.add.text(29, 9, '★', { fontSize: '10px', color: '#f3c64f' }).setOrigin(0.5);
    const rankTxt = this.add.text(29, 21, `CẤP ${rank}`, {
      fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5);
    rankChip.add([rb, star, rankTxt]);

    this.coinChip = this.makeStatChip(width - 12, 14, '🟡', this.save.coins, COLORS.gold, 1);
    this.gemChip = this.makeStatChip(width - 12, 14, '💎', this.save.gems, COLORS.teal, 2);
  }

  makeStatChip(rightX, y, icon, value, borderColor, order) {
    const w = 64, h = 30;
    const x = rightX - w / 2 - (order === 2 ? w + 8 : 0);
    const g = this.add.graphics();
    g.fillStyle(COLORS.woodDark, 1).fillRoundedRect(x - w / 2, y, w, h, 15);
    g.lineStyle(2, borderColor, 1).strokeRoundedRect(x - w / 2, y, w, h, 15);
    const iconTxt = this.add.text(x - w / 2 + 16, y + h / 2, icon, { fontSize: '13px' }).setOrigin(0.5);
    const valTxt = this.add.text(x + 6, y + h / 2, String(value), {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5);
    return { setValue: (v) => valTxt.setText(String(v)) };
  }

  // ---------------- Bộ chuyển Category ----------------

  buildCategorySwitcher(width) {
    this.switcherY = 56;
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
    this.mapViewTop = 84;
    this.mapViewBottom = height - 150;
    const mapH = this.mapViewBottom - this.mapViewTop;
    const mapX = 14, mapW = width - 28;

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
    const compass = this.add.text(mapX + mapW - 30, this.mapViewTop + 26, '✳', { fontSize: '16px', color: '#5c3a21' }).setAlpha(0.5);

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
        line.lineStyle(5, locked ? 0x8a7550 : COLORS.teal, locked ? 0.5 : 0.85);
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

    const fill = isCurrent ? CURRENT_BG : done ? COLORS.tealDim : LOCK_BG;
    const border = isCurrent ? COLORS.teal : done ? COLORS.teal : COLORS.goldDim;
    const circle = this.add.circle(0, 0, r, fill).setStrokeStyle(isCurrent ? 4 : 3, border);
    group.add(circle);

    if (done) {
      group.add(this.add.text(0, 0, '✓', { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#7fe9de' }).setOrigin(0.5));
    } else if (locked) {
      group.add(this.add.text(0, -2, '🔒', { fontSize: '16px' }).setOrigin(0.5));
      group.add(this.add.text(0, 15, String(idx + 1), { fontFamily: 'Cinzel', fontSize: '9px', color: '#8a7550' }).setOrigin(0.5));
    } else {
      group.add(this.add.text(0, 0, String(idx + 1), { fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#2b1e16' }).setOrigin(0.5));
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

  // ---------------- CTA + Nav dưới ----------------

  buildCTA(width, height) {
    this.ctaY = this.mapViewBottom + 34;
    this.ctaBtn = makeButton(this, width / 2, this.ctaY, this.ctaLabel(), {
      variant: 'gold', fontSize: '14px', onClick: () => this.onNodeTap({ idx: this.currentLevelIdx, locked: false })
    });
  }

  ctaLabel() {
    const isFirst = this.currentLevelIdx === 0 && totalCompleted(this.save) === 0;
    return isFirst ? 'GIẢI MÃ HẢI HÀNH' : `VÀO MÀN ${this.currentLevelIdx + 1}`;
  }

  updateCTA() {
    this.ctaBtn.destroy();
    this.ctaBtn = makeButton(this, this.scale.width / 2, this.ctaY, this.ctaLabel(), {
      variant: 'gold', fontSize: '14px', onClick: () => this.onNodeTap({ idx: this.currentLevelIdx, locked: false })
    });
  }

  buildBottomNav(width, height) {
    const y = height - 34;
    const items = [
      { key: 'journey', icon: '🧭', label: 'Hải Trình' },
      { key: 'shop', icon: '🏪', label: 'Cửa Hàng' },
      { key: 'bag', icon: '🎒', label: 'Hành Trang' },
      { key: 'settings', icon: '⚙️', label: 'Thiết Lập' }
    ];
    const barH = 56;
    const bar = this.add.graphics();
    bar.fillStyle(COLORS.woodDark, 1).fillRoundedRect(10, height - barH - 6, width - 20, barH, 18);
    bar.lineStyle(2, COLORS.tealDim, 1).strokeRoundedRect(10, height - barH - 6, width - 20, barH, 18);

    const step = (width - 20) / items.length;
    items.forEach((item, i) => {
      const x = 10 + step * i + step / 2;
      const active = item.key === 'journey';
      if (active) this.add.circle(x, y - 6, 20, COLORS.teal, 0.3);
      this.add.text(x, y - 10, item.icon, { fontSize: '16px' }).setOrigin(0.5);
      this.add.text(x, y + 12, item.label, {
        fontFamily: 'Cinzel', fontSize: '7px', color: active ? '#7fe9de' : '#8a99a8'
      }).setOrigin(0.5);
      const hit = this.add.rectangle(x, y, step - 6, barH, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => this.onNavTap(item.key));
    });
  }

  onNavTap(key) {
    if (key === 'journey') return;
    if (key === 'settings') { this.settingsOverlay.setVisible(true); return; }
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
