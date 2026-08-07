import Phaser from 'phaser';
import { getCategory } from '../data/levels.js';
import { isLevelCompleted } from '../utils/storage.js';
import { COLORS, drawChartBackground, makeButton } from '../utils/theme.js';

// Lưới số màn dạng "level map" quen thuộc của game mobile (Candy Crush,
// Two Dots...) thay cho danh sách tên dài — với 30 màn/thể loại, dạng lưới
// số + cuộn dọc gọn và dễ quét mắt hơn nhiều so với 30 hàng chữ.
const COLS = 4;
const CELL = 80;
const BADGE_R = 26;

export default class LevelSelectScene extends Phaser.Scene {
  constructor() { super('LevelSelect'); }

  init(data) { this.categoryId = data.categoryId; }

  create() {
    const { width, height } = this.scale;
    const category = getCategory(this.categoryId);
    const save = this.registry.get('save');

    drawChartBackground(this, width, height);

    makeButton(this, 16, 24, '← Trang chủ', { variant: 'ink', fontSize: '11px', originX: 0 })
      .on('pointerdown', () => this.scene.start('Home'));

    this.add.text(width / 2, 20, `${category.icon} ${category.title}`, {
      fontFamily: 'Cinzel', fontSize: '17px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0.5, 0);

    const doneCount = category.levels.filter((_, i) => isLevelCompleted(save, category.id, i)).length;
    this.add.text(width / 2, 48, `${category.desc}`, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#6fa8c9', align: 'center',
      wordWrap: { width: width - 50 }
    }).setOrigin(0.5, 0);

    const progressChip = this.add.text(width / 2, 76, `${doneCount}/${category.levels.length} hoàn thành`, {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#f3c64f',
      backgroundColor: '#1c2f42', padding: { x: 10, y: 3 }
    }).setOrigin(0.5, 0);
    void progressChip;

    this.add.line(0, 0, 0, 96, width, 96, COLORS.teal, 0.25).setOrigin(0);

    // ---- Lưới số màn (cuộn dọc) ----
    const viewTop = 100, viewBottom = height - 10, viewH = viewBottom - viewTop;
    const rows = Math.ceil(category.levels.length / COLS);
    const gridW = COLS * CELL;
    const startX = (width - gridW) / 2 + CELL / 2;
    const contentH = rows * CELL + 10;

    const firstUndone = category.levels.findIndex((_, i) => !isLevelCompleted(save, category.id, i));

    const listContainer = this.add.container(0, viewTop);
    category.levels.forEach((lvl, idx) => {
      const col = idx % COLS, row = Math.floor(idx / COLS);
      const x = startX + col * CELL;
      const y = row * CELL + CELL / 2;
      const done = isLevelCompleted(save, category.id, idx);
      const isNext = idx === firstUndone;

      const ringColor = isNext ? COLORS.gold : done ? COLORS.teal : 0x2f4a5e;
      const fillColor = isNext ? 0x3a2a05 : COLORS.cardBg;
      const badge = this.add.circle(x, y, BADGE_R, fillColor, 0.95).setStrokeStyle(isNext ? 3 : 2, ringColor);
      const label = this.add.text(x, y, done ? '✓' : String(idx + 1), {
        fontFamily: 'Cinzel', fontSize: done ? '20px' : '16px', fontStyle: '900',
        color: done ? '#7fe9de' : isNext ? '#f3c64f' : '#f4e8cf'
      }).setOrigin(0.5);
      if (isNext) {
        this.tweens.add({ targets: badge, scale: { from: 1, to: 1.1 }, yoyo: true, repeat: -1, duration: 650 });
      }
      listContainer.add([badge, label]);

      const hit = this.add.circle(x, y, BADGE_R + 4, 0xffffff, 0.001);
      listContainer.add(hit);
      hit.levelIdx = idx;
    });

    // Mặt nạ để danh sách chỉ hiển thị trong khung nhìn, không đè lên header.
    const maskG = this.make.graphics({ x: 0, y: 0 }, false);
    maskG.fillStyle(0xffffff).fillRect(0, viewTop, width, viewH);
    listContainer.setMask(maskG.createGeometryMask());

    // ---- Kéo để cuộn (phân biệt với chạm chọn màn bằng ngưỡng di chuyển) ----
    const minY = Math.min(viewTop, viewTop + viewH - contentH);
    const maxY = viewTop;
    let pressY = 0, pressContainerY = viewTop, moved = false, pressedIdx = null, isPressed = false;

    this.input.on('pointerdown', (p) => {
      if (p.y < viewTop) return;
      isPressed = true;
      pressY = p.y; pressContainerY = listContainer.y; moved = false;
      // Container chỉ dịch theo trục y (x luôn 0) nên toạ độ cục bộ chỉ cần
      // trừ đi listContainer.y — không cần API getLocalPoint của Container.
      const localX = p.x, localY = p.y - listContainer.y;
      const hitObj = category.levels.map((_, i) => i).find(i => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const cx = startX + col * CELL, cy = row * CELL + CELL / 2;
        return Phaser.Math.Distance.Between(localX, localY, cx, cy) <= BADGE_R + 4;
      });
      pressedIdx = hitObj !== undefined ? hitObj : null;
    });
    this.input.on('pointermove', (p) => {
      // QUAN TRỌNG: chỉ xử lý khi con trỏ đang THỰC SỰ giữ xuống (kéo), không
      // phải mọi lần rê chuột/ngón tay. Thiếu cờ này, một lần rê KHÔNG giữ tay
      // (VD: browser tự phát sinh trước một cú chạm mới) vẫn bị coi là kéo,
      // dùng nhầm pressY/pressContainerY còn cũ từ lần kéo trước để tính cuộn
      // — khiến danh sách nhảy lệch vị trí ngay trước khi người chơi thực sự
      // chạm, làm cú chạm tiếp theo bấm trượt không trúng màn nào.
      if (!isPressed) return;
      const dy = p.y - pressY;
      if (Math.abs(dy) > 8) moved = true;
      if (moved && contentH > viewH) {
        listContainer.y = Phaser.Math.Clamp(pressContainerY + dy, minY, maxY);
      }
    });
    const endPress = () => {
      isPressed = false;
      if (!moved && pressedIdx !== null) {
        this.scene.start('Game', { categoryId: category.id, levelIndex: pressedIdx });
      }
      pressedIdx = null;
    };
    this.input.on('pointerup', endPress);
    this.input.on('pointerupoutside', endPress);

    // Gợi ý có thể cuộn nếu nội dung dài hơn khung nhìn.
    if (contentH > viewH) {
      this.add.text(width / 2, height - 10, '↕ Vuốt để xem thêm', {
        fontFamily: 'Cinzel', fontSize: '9px', color: '#2f4a5e'
      }).setOrigin(0.5, 1);
    }
  }
}
