import Phaser from 'phaser';
import { CATEGORIES, getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, isLevelCompleted, claimDailyQuestReward } from '../utils/storage.js';
import { COLORS, drawChartBackground, drawPanel, makeButton, makeHudChip } from '../utils/theme.js';

// Đúng 3 Buff được liệt kê trong GDD 3.1 ("Dùng Buff (Hint/Freeze/Skip...)") —
// không thêm buff ngoài phạm vi tài liệu (VD "Mở Chuỗi Đã Vẽ" của bản demo
// tham khảo Testgame.html không nằm trong GDD nên không đưa vào).
const BUFF_ICONS = [
  { icon: '💡', name: 'Gợi Ý' },
  { icon: '⏸️', name: 'Đóng Băng' },
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

// Đường nối giữa các Đảo trên "hải trình" — vẽ dạng chấm chấm như hải đồ vẽ
// tay, thay vì 1 vạch liền vô hồn.
function drawDottedPath(scene, x1, y1, x2, y2, color, alpha) {
  const g = scene.add.graphics();
  g.fillStyle(color, alpha);
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const step = 7;
  const count = Math.max(1, Math.floor(dist / step));
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    g.fillCircle(x1 + dx * t, y1 + dy * t, 1.4);
  }
  return g;
}

export default class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const save = this.registry.get('save');
    this.save = save;

    drawChartBackground(this, width, height);

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

  buildTopBar(width, target) {
    // Khu vực người chơi (trái)
    this.add.circle(28, 28, 18, COLORS.gold).setStrokeStyle(2, COLORS.goldBorder);
    this.add.text(28, 28, '🧭', { fontSize: '18px' }).setOrigin(0.5);
    this.add.text(50, 16, this.save.playerName, {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#f3c64f',
      wordWrap: { width: 90 }
    }).setOrigin(0, 0);
    this.add.text(50, 36, 'Tân Thuỷ Thủ', {
      fontFamily: 'Crimson Pro', fontSize: '9px', fontStyle: 'italic', color: '#6fa8c9'
    }).setOrigin(0, 0);

    // Tiến trình Đảo (giữa) + Ví Coin (phải) — dạng HUD chip viền theo style guide.
    const doneInCat = categoryDoneCount(this.save, target.category);
    const pct = Math.round((doneInCat / target.category.levels.length) * 100);
    makeHudChip(this, width / 2, 28, 'TIẾN TRÌNH ĐẢO', `${pct}%`, { variant: 'teal', minWidth: 90 });
    this.coinChip = makeHudChip(this, width - 12, 28, 'XU', `🟡 ${this.save.coins}`, { variant: 'gold', originX: 1 });

    this.add.line(0, 0, 0, 58, width, 58, COLORS.teal, 0.25).setOrigin(0);
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
    this.fragmentBox = drawPanel(this, width / 2 - 48, 97, 96, 96, {
      radius: 10, fill: COLORS.cardBg, border: COLORS.gold, borderWidth: 3
    });
    this.fragmentIcon = this.add.text(width / 2, 145, target.category.icon, { fontSize: '42px' }).setOrigin(0.5);
    this.add.text(width / 2, 145 + 60, target.category.title, {
      fontFamily: 'Cinzel', fontSize: '10px', color: '#6fa8c9'
    }).setOrigin(0.5, 0);

    const ctaLabel = target.isResume
      ? `CHƠI TIẾP MÀN ${target.levelIndex + 1}`
      : `VÀO HẢI TRÌNH (MÀN ${target.levelIndex + 1})`;
    makeButton(this, width / 2, 232, ctaLabel, { variant: 'gold', fontSize: '13px', onClick: () => {
      playSound('lock', this.save.soundMuted);
      this.scene.start('Game', { categoryId: target.category.id, levelIndex: target.levelIndex });
    } });
  }

  playFragmentGlow() {
    this.tweens.add({
      targets: this.fragmentBox,
      alpha: { from: 1, to: 0.3 },
      yoyo: true,
      repeat: 3,
      duration: 160
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
      // Không khoá cứng Đảo chưa tới: dự án hiện tổ chức level theo Category
      // (mỗi category = 1 cơ chế lõi, độc lập), không phải cấu trúc "Đảo 8-10
      // màn tổng hợp" của GDD 2.5 — nên không có căn cứ để chặn truy cập.
      // Chỉ dùng màu/độ mờ để GỢI Ý thứ tự nên đi, luôn cho chạm vào bất kỳ
      // Category nào để xem danh sách màn.

      if (idx > 0) {
        const prevX = marginX + step * (idx - 1);
        const lineColor = idx <= targetIdx ? COLORS.gold : COLORS.teal;
        drawDottedPath(this, prevX + 20, y, x - 20, y, lineColor, idx <= targetIdx ? 0.9 : 0.35);
      }

      if (isActive) {
        const halo = this.add.circle(x, y, 24, COLORS.gold, 0.18);
        this.tweens.add({ targets: halo, scale: { from: 1, to: 1.4 }, alpha: { from: 0.22, to: 0 }, duration: 1100, repeat: -1 });
      }

      const ringColor = isActive ? COLORS.gold : (isDone ? COLORS.teal : COLORS.tealDim);
      const circle = this.add.circle(x, y, 18, isActive ? 0x3a2a05 : COLORS.cardBg, 0.9)
        .setStrokeStyle(2, ringColor);
      const iconTxt = this.add.text(x, y, cat.icon, { fontSize: '16px' }).setOrigin(0.5);
      if (!isDone && !isActive) { circle.setAlpha(0.55); iconTxt.setAlpha(0.55); }
      if (isDone && !isActive) {
        this.add.text(x + 13, y - 13, '🚩', { fontSize: '11px' }).setOrigin(0.5);
      }

      this.add.text(x, y + 24, cat.title, {
        fontFamily: 'Cinzel', fontSize: '7px', color: (!isDone && !isActive) ? '#4a7186' : '#7fe9de', align: 'center',
        wordWrap: { width: step - 4 }
      }).setOrigin(0.5, 0);

      if (isActive) {
        this.tweens.add({
          targets: circle, scale: { from: 1, to: 1.12 }, yoyo: true, repeat: -1, duration: 700
        });
      }

      const hitZone = this.add.circle(x, y, 20, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hitZone.on('pointerdown', () => this.scene.start('LevelSelect', { categoryId: cat.id }));
    });
  }

  buildSecondaryArea(width, height) {
    const panelY = 318;
    this.add.line(0, 0, 0, panelY, width, panelY, COLORS.teal, 0.25).setOrigin(0);

    // ---- Nhiệm Vụ Ngày ----
    const q = this.save.dailyQuest;
    this.add.text(16, panelY + 10, 'NHIỆM VỤ NGÀY', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#f3c64f'
    }).setOrigin(0, 0);
    this.questLine = this.add.text(16, panelY + 26, this.questLineText(q), {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#f4e8cf', wordWrap: { width: width - 32 }
    }).setOrigin(0, 0);

    const canClaim = q.newClearsToday >= q.target && !q.claimed;
    this.claimBtn = makeButton(this, width - 16, panelY + 26, canClaim ? 'Nhận +50 Xu' : (q.claimed ? 'Đã Nhận' : 'Chưa Đủ'), {
      variant: canClaim ? 'gold' : 'ink', fontSize: '9px', originX: 1,
      onClick: () => this.claimQuest(width)
    });
    if (!canClaim) this.claimBtn.disableInteractive();

    // ---- Bổ Trợ (Buffs) — xem nhanh, dùng thật trong màn chơi ----
    const buffY = panelY + 58;
    this.add.text(16, buffY, 'BỔ TRỢ', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#f3c64f'
    }).setOrigin(0, 0);
    const chipW = (width - 32) / BUFF_ICONS.length;
    BUFF_ICONS.forEach((b, i) => {
      const x = 16 + chipW * i + chipW / 2;
      const y = buffY + 30;
      const g = this.add.graphics();
      g.fillStyle(COLORS.cardBg, 0.9).fillRoundedRect(x - chipW / 2 + 3, y - 22, chipW - 6, 44, 8);
      g.lineStyle(1.5, COLORS.teal, 0.7).strokeRoundedRect(x - chipW / 2 + 3, y - 22, chipW - 6, 44, 8);
      const hit = this.add.rectangle(x, y, chipW - 6, 44, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      this.add.text(x, y - 8, b.icon, { fontSize: '16px' }).setOrigin(0.5);
      this.add.text(x, y + 12, b.name, { fontFamily: 'Cinzel', fontSize: '7px', color: '#7fe9de' }).setOrigin(0.5);
      hit.on('pointerdown', () => this.showToast(width, `${b.icon} Dùng "${b.name}" trực tiếp trong màn chơi bằng thanh Bổ Trợ ở đáy bàn cờ.`));
    });

    // ---- Quảng cáo thưởng ----
    const adY = buffY + 68;
    makeButton(this, width / 2, adY, '🎬 Xem QC Thưởng (+30 Xu)', {
      variant: 'teal', fontSize: '11px', onClick: () => this.watchAd()
    });

    this.add.text(width / 2, height - 14, 'Chạm 1 Đảo để xem danh sách màn chơi', {
      fontFamily: 'Cinzel', fontSize: '9px', color: '#2f4a5e'
    }).setOrigin(0.5, 1);
  }

  questLineText(q) {
    return `Clear ${Math.min(q.newClearsToday, q.target)}/${q.target} màn MỚI hôm nay`;
  }

  claimQuest(width) {
    const granted = claimDailyQuestReward(this.save);
    if (!granted) {
      playSound('error', this.save.soundMuted);
      return;
    }
    saveState(this.save);
    playSound('win', this.save.soundMuted);
    this.coinChip.setValueText(`🟡 ${this.save.coins}`);
    this.claimBtn.disableInteractive();
    this.showToast(width, '🟡 Đã nhận +50 Xu từ Nhiệm Vụ Ngày!');
  }

  watchAd() {
    playSound('switch', this.save.soundMuted);
    this.showToast(this.scale.width, '🎬 Đang chiếu Quảng Cáo ngắn...');
    this.time.delayedCall(700, () => {
      this.save.coins += 30;
      saveState(this.save);
      this.coinChip.setValueText(`🟡 ${this.save.coins}`);
      playSound('lock', this.save.soundMuted);
      this.showToast(this.scale.width, '🟡 Bạn nhận được +30 Xu!');
    });
  }

  showToast(width, text) {
    if (this.toastText) this.toastText.destroy();
    this.toastText = this.add.text(width / 2, 68, text, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f3c64f',
      backgroundColor: '#2b1e16', padding: { x: 10, y: 6 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 0).setDepth(50);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }
}
