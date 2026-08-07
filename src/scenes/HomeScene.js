import Phaser from 'phaser';
import { CATEGORIES, getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted, claimDailyQuestReward } from '../utils/storage.js';

const GOLD = 0xd4af37;
const GOLD_BRIGHT = 0xffd700;
const NAVY_DEEP = 0x0a1622;
const CHART_LINE = 0x3a5f78;
const CHART_LINE_BRIGHT = 0x6fa8c9;
const CARD_BG = 0x122536;

const BUFF_ICONS = [
  { icon: '💡', name: 'Gợi Ý' },
  { icon: '⏸️', name: 'Mở Tạm' },
  { icon: '⏪', name: 'Mở Chuỗi' },
  { icon: '⏩', name: 'Bỏ Qua' }
];

// Tìm màn để CTA đưa người chơi vào: ưu tiên resume đúng màn đang chơi dở,
// nếu không thì tìm màn MỚI (chưa hoàn thành) đầu tiên theo thứ tự category —
// đúng tinh thần "luôn ưu tiên highlight màn MỚI" (GDD retention D1).
function computeTarget(save) {
  if (save.lastCategoryId && save.lastLevelIndex != null) {
    const cat = getCategory(save.lastCategoryId);
    if (cat && !isLevelCompleted(save, cat.id, save.lastLevelIndex)) {
      return { category: cat, levelIndex: save.lastLevelIndex, isResume: true };
    }
  }
  for (const cat of CATEGORIES) {
    const idx = cat.levels.findIndex((_, i) => !isLevelCompleted(save, cat.id, i));
    if (idx !== -1) return { category: cat, levelIndex: idx, isResume: false };
  }
  return { category: CATEGORIES[0], levelIndex: 0, isResume: false };
}

function categoryDoneCount(save, cat) {
  return cat.levels.filter((_, i) => isLevelCompleted(save, cat.id, i)).length;
}

// Cảnh báo soft-lock (GDD 3.7 MEC-05): nếu màn có Bom Tĩnh nhưng không có
// Push Rock nào để phá, người chơi dễ tưởng bị kẹt cứng khi chạm bom.
function softlockWarningFor(levelDef) {
  if (levelDef.bombs && levelDef.bombs.length && !(levelDef.pushRocks && levelDef.pushRocks.length)) {
    return '⚠️ Màn này có Bom Tĩnh (💣) — nhớ đọc kỹ mô tả cơ chế, chạm trực tiếp vào Bom sẽ THUA ngay!';
  }
  return null;
}

export default class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const save = this.registry.get('save');
    this.save = save;

    this.drawChartBackground(width, height);

    const target = computeTarget(save);
    this.target = target;

    this.buildTopBar(width, target);
    this.buildPrimaryAction(width, target);
    this.buildIslandRow(width, target);
    this.buildSecondaryArea(width, height);

    // Nếu vừa hoàn thành trọn 1 Đảo ở màn chơi trước, phát hiệu ứng "chớp sáng"
    // + âm thanh mở khoá ngay khi quay lại Home (Haptic & Juice, GDD P2).
    const justCompleted = this.registry.get('justCompletedCategory');
    if (justCompleted) {
      this.registry.set('justCompletedCategory', null);
      this.time.delayedCall(150, () => this.playFragmentGlow());
      playSound('win', save.soundMuted);
    }
  }

  drawChartBackground(width, height) {
    this.add.rectangle(0, 0, width, height, NAVY_DEEP).setOrigin(0);
    const g = this.add.graphics();
    g.lineStyle(1, CHART_LINE_BRIGHT, 0.06);
    for (let x = 0; x < width; x += 34) g.lineBetween(x, 0, x, height);
    for (let y = 0; y < height; y += 34) g.lineBetween(0, y, width, y);
  }

  buildTopBar(width, target) {
    // Khu vực người chơi (trái)
    this.add.circle(28, 28, 18, GOLD).setStrokeStyle(2, GOLD_BRIGHT);
    this.add.text(28, 28, '🧭', { fontSize: '18px' }).setOrigin(0.5);
    this.add.text(50, 16, this.save.playerName, {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#ffd700',
      wordWrap: { width: 110 }
    }).setOrigin(0, 0);
    this.add.text(50, 36, 'Tân Thuỷ Thủ', {
      fontFamily: 'Crimson Pro', fontSize: '9px', fontStyle: 'italic', color: '#6fa8c9'
    }).setOrigin(0, 0);

    // Thống kê tiến trình (giữa)
    const doneInCat = categoryDoneCount(this.save, target.category);
    const pct = Math.round((doneInCat / target.category.levels.length) * 100);
    this.add.text(width / 2, 14, 'TIẾN TRÌNH ĐẢO', {
      fontFamily: 'Cinzel', fontSize: '8px', color: '#6fa8c9'
    }).setOrigin(0.5, 0);
    this.add.text(width / 2, 26, `${pct}%`, {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#ffd700'
    }).setOrigin(0.5, 0);

    // Ví Coin + nút +Xu (phải)
    this.coinText = this.add.text(width - 12, 10, `🟡 ${this.save.coins}`, {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#ffd700',
      backgroundColor: '#2b1e16', padding: { x: 8, y: 4 }
    }).setOrigin(1, 0);
    const shopBtn = this.add.text(width - 12, 34, '+ Xu', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#eafff1',
      backgroundColor: '#2a7b4c', padding: { x: 8, y: 3 }
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true });
    shopBtn.on('pointerdown', () => this.watchAd());

    this.add.line(0, 0, 0, 58, width, 58, CHART_LINE, 0.6).setOrigin(0);
  }

  buildPrimaryAction(width, target) {
    const warning = softlockWarningFor(target.category.levels[target.levelIndex]);
    if (warning) {
      this.add.text(width / 2, 68, warning, {
        fontFamily: 'Crimson Pro', fontSize: '10px', color: '#ffd6d6', align: 'center',
        backgroundColor: '#3a1414', padding: { x: 10, y: 5 },
        wordWrap: { width: width - 40 }
      }).setOrigin(0.5, 0);
    }

    // Mảnh Bản Đồ — khung mờ ảo đại diện Đảo đang mở khoá.
    this.fragmentBox = this.add.rectangle(width / 2, 145, 96, 96, CARD_BG, 0.9)
      .setStrokeStyle(3, GOLD);
    this.fragmentIcon = this.add.text(width / 2, 145, target.category.icon, { fontSize: '42px' }).setOrigin(0.5);
    this.add.text(width / 2, 145 + 60, target.category.title, {
      fontFamily: 'Cinzel', fontSize: '10px', color: '#6fa8c9'
    }).setOrigin(0.5, 0);

    const ctaLabel = target.isResume
      ? `CHƠI TIẾP MÀN ${target.levelIndex + 1}`
      : `VÀO HẢI TRÌNH (MÀN ${target.levelIndex + 1})`;
    const cta = this.add.text(width / 2, 232, ctaLabel, {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#2b1e16',
      backgroundColor: '#ffd700', padding: { x: 20, y: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    cta.on('pointerover', () => cta.setBackgroundColor('#fff0a8'));
    cta.on('pointerout', () => cta.setBackgroundColor('#ffd700'));
    cta.on('pointerdown', () => {
      playSound('lock', this.save.soundMuted);
      this.scene.start('Game', { categoryId: target.category.id, levelIndex: target.levelIndex });
    });
  }

  playFragmentGlow() {
    this.tweens.add({
      targets: this.fragmentBox,
      alpha: { from: 1, to: 0.3 },
      yoyo: true,
      repeat: 3,
      duration: 160,
      onUpdate: () => this.fragmentBox.setStrokeStyle(3, GOLD_BRIGHT)
    });
  }

  buildIslandRow(width, target) {
    const targetIdx = CATEGORIES.findIndex(c => c.id === target.category.id);
    const total = CATEGORIES.length;
    const marginX = 24;
    const step = (width - marginX * 2) / (total - 1);
    const y = 280;

    CATEGORIES.forEach((cat, idx) => {
      const x = marginX + step * idx;
      const doneCount = categoryDoneCount(this.save, cat);
      const isDone = doneCount === cat.levels.length;
      const isActive = cat.id === target.category.id;
      const isLocked = !isDone && !isActive && idx > targetIdx;

      if (idx > 0) {
        const prevX = marginX + step * (idx - 1);
        const lineColor = idx <= targetIdx ? GOLD : CHART_LINE;
        this.add.line(0, 0, prevX + 20, y, x - 20, y, lineColor, idx <= targetIdx ? 0.9 : 0.5)
          .setOrigin(0).setLineWidth(2);
      }

      const ringColor = isActive ? GOLD_BRIGHT : (isDone ? GOLD : CHART_LINE);
      const fillAlpha = isLocked ? 0.15 : 0.35;
      const circle = this.add.circle(x, y, 18, isActive ? 0x3a2a05 : CARD_BG, fillAlpha)
        .setStrokeStyle(2, ringColor);
      const iconTxt = this.add.text(x, y, isLocked ? '🔒' : cat.icon, {
        fontSize: isLocked ? '13px' : '16px'
      }).setOrigin(0.5);
      if (isLocked) { circle.setAlpha(0.6); iconTxt.setAlpha(0.6); }

      this.add.text(x, y + 24, cat.title, {
        fontFamily: 'Cinzel', fontSize: '7px', color: isLocked ? '#3a5f78' : '#6fa8c9', align: 'center',
        wordWrap: { width: step - 4 }
      }).setOrigin(0.5, 0);

      if (isActive) {
        this.tweens.add({
          targets: circle, scale: { from: 1, to: 1.12 }, yoyo: true, repeat: -1, duration: 700
        });
      }

      const hitZone = this.add.circle(x, y, 20, 0xffffff, 0.001).setInteractive({ useHandCursor: !isLocked });
      hitZone.on('pointerdown', () => {
        if (isLocked) {
          this.showToast(width, `🔒 Đảo "${cat.title}" chưa mở — hoàn thành Đảo hiện tại trước đã!`);
          playSound('error', this.save.soundMuted);
          return;
        }
        this.scene.start('LevelSelect', { categoryId: cat.id });
      });
    });
  }

  buildSecondaryArea(width, height) {
    const panelY = 318;
    this.add.line(0, 0, 0, panelY, width, panelY, CHART_LINE, 0.6).setOrigin(0);

    // ---- Nhiệm Vụ Ngày ----
    const q = this.save.dailyQuest;
    this.add.text(16, panelY + 10, 'NHIỆM VỤ NGÀY', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#ffd700'
    }).setOrigin(0, 0);
    this.questLine = this.add.text(16, panelY + 26, this.questLineText(q), {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#f4e8cf', wordWrap: { width: width - 32 }
    }).setOrigin(0, 0);

    const canClaim = q.newClearsToday >= q.target && !q.claimed;
    this.claimBtn = this.add.text(width - 16, panelY + 26, canClaim ? 'Nhận +50 Xu' : (q.claimed ? 'Đã Nhận' : 'Chưa Đủ'), {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold',
      color: canClaim ? '#2b1e16' : '#6fa8c9',
      backgroundColor: canClaim ? '#ffd700' : '#122536',
      padding: { x: 8, y: 4 }
    }).setOrigin(1, 0).setInteractive({ useHandCursor: canClaim });
    this.claimBtn.on('pointerdown', () => this.claimQuest(width, panelY));

    // ---- Bổ Trợ (Buffs) — xem nhanh, dùng thật trong màn chơi ----
    const buffY = panelY + 58;
    this.add.text(16, buffY, 'BỔ TRỢ', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#ffd700'
    }).setOrigin(0, 0);
    const chipW = (width - 32) / BUFF_ICONS.length;
    BUFF_ICONS.forEach((b, i) => {
      const x = 16 + chipW * i + chipW / 2;
      const y = buffY + 30;
      const chip = this.add.rectangle(x, y, chipW - 6, 44, CARD_BG, 0.7).setStrokeStyle(1, CHART_LINE)
        .setInteractive({ useHandCursor: true });
      this.add.text(x, y - 8, b.icon, { fontSize: '16px' }).setOrigin(0.5);
      this.add.text(x, y + 12, b.name, { fontFamily: 'Cinzel', fontSize: '7px', color: '#6fa8c9' }).setOrigin(0.5);
      chip.on('pointerdown', () => this.showToast(width, `${b.icon} Dùng "${b.name}" trực tiếp trong màn chơi bằng thanh Bổ Trợ ở đáy bàn cờ.`));
    });

    // ---- Quảng cáo thưởng ----
    const adY = buffY + 62;
    const adBtn = this.add.text(width / 2, adY, '🎬 Xem QC Thưởng (+30 Xu)', {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: 'bold', color: '#eafff1',
      backgroundColor: '#2a7b4c', padding: { x: 14, y: 8 }
    }).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
    adBtn.on('pointerdown', () => this.watchAd());

    this.add.text(width / 2, height - 14, 'Chạm 1 Đảo để xem danh sách màn chơi', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#3a5f78'
    }).setOrigin(0.5, 1);
  }

  questLineText(q) {
    return `Clear ${Math.min(q.newClearsToday, q.target)}/${q.target} màn MỚI hôm nay`;
  }

  claimQuest(width, panelY) {
    const granted = claimDailyQuestReward(this.save);
    if (!granted) {
      playSound('error', this.save.soundMuted);
      return;
    }
    saveState(this.save);
    playSound('win', this.save.soundMuted);
    this.coinText.setText(`🟡 ${this.save.coins}`);
    this.claimBtn.setText('Đã Nhận').setColor('#6fa8c9').setBackgroundColor('#122536').disableInteractive();
    this.showToast(width, '🟡 Đã nhận +50 Xu từ Nhiệm Vụ Ngày!');
  }

  watchAd() {
    playSound('switch', this.save.soundMuted);
    this.showToast(this.scale.width, '🎬 Đang chiếu Quảng Cáo ngắn...');
    this.time.delayedCall(700, () => {
      this.save.coins += 30;
      saveState(this.save);
      this.coinText.setText(`🟡 ${this.save.coins}`);
      playSound('lock', this.save.soundMuted);
      this.showToast(this.scale.width, '🟡 Bạn nhận được +30 Xu!');
    });
  }

  showToast(width, text) {
    if (this.toastText) this.toastText.destroy();
    this.toastText = this.add.text(width / 2, 68, text, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#ffd700',
      backgroundColor: '#2b1e16', padding: { x: 10, y: 6 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 0).setDepth(50);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }
}
