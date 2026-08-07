import Phaser from 'phaser';
import { getCategory } from '../data/levels.js';
import { isLevelCompleted } from '../utils/storage.js';

const NAVY_DEEP = 0x0a1622;
const CHART_LINE = 0x3a5f78;
const GOLD = 0xd4af37;
const GOLD_BRIGHT = 0xffd700;
const CARD_BG = 0x122536;
const CARD_BG_HOVER = 0x1a3448;
const DONE_GREEN = 0x2a7b4c;

export default class LevelSelectScene extends Phaser.Scene {
  constructor() { super('LevelSelect'); }

  init(data) { this.categoryId = data.categoryId; }

  create() {
    const { width, height } = this.scale;
    const category = getCategory(this.categoryId);
    const save = this.registry.get('save');

    // Nền hải đồ đồng bộ với Home/Game — trước đây là nâu/đen phẳng lạc
    // phong cách so với 2 scene còn lại.
    this.add.rectangle(0, 0, width, height, NAVY_DEEP).setOrigin(0);
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x6fa8c9, 0.05);
    for (let x = 0; x < width; x += 32) grid.lineBetween(x, 0, x, height);
    for (let y = 0; y < height; y += 32) grid.lineBetween(0, y, width, y);

    // ---- Back button ----
    const backBtn = this.buildPill(16, 18, '← Trang chủ', { originX: 0, fontSize: '12px' });
    backBtn.on('pointerdown', () => this.scene.start('Home'));

    this.add.text(width / 2, 20, `${category.icon} ${category.title}`, {
      fontFamily: 'Cinzel', fontSize: '17px', fontStyle: '900', color: '#ffd700'
    }).setOrigin(0.5, 0);

    this.add.text(width / 2, 50, category.desc, {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#6fa8c9', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.add.line(0, 0, 0, 92, width, 92, CHART_LINE, 0.6).setOrigin(0);

    // ---- Danh sách level ----
    const startY = 118, rowH = 62, marginX = 20, radius = 12;
    category.levels.forEach((lvl, idx) => {
      const y = startY + idx * (rowH + 12);
      const done = isLevelCompleted(save, category.id, idx);
      const w = width - marginX * 2;

      const g = this.add.graphics();
      const drawRow = (fill) => {
        g.clear();
        g.fillStyle(fill, 1).fillRoundedRect(-w / 2, -rowH / 2, w, rowH, radius);
        g.lineStyle(2, done ? DONE_GREEN : CHART_LINE, 1).strokeRoundedRect(-w / 2, -rowH / 2, w, rowH, radius);
      };
      drawRow(CARD_BG);
      const rowContainer = this.add.container(width / 2, y, [g]);

      const numBadge = this.add.circle(-w / 2 + 26, 0, 15, done ? DONE_GREEN : 0x1c3348)
        .setStrokeStyle(2, done ? GOLD : CHART_LINE);
      const numText = this.add.text(-w / 2 + 26, 0, done ? '✓' : String(idx + 1), {
        fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: done ? '#0f1c14' : '#f4e8cf'
      }).setOrigin(0.5);

      const nameText = this.add.text(-w / 2 + 52, 0, lvl.name, {
        fontFamily: 'Cinzel', fontSize: '12px', fontStyle: 'bold', color: '#f4e8cf',
        wordWrap: { width: w - 90 }
      }).setOrigin(0, 0.5);

      rowContainer.add([numBadge, numText, nameText]);
      rowContainer.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -rowH / 2, w, rowH), Phaser.Geom.Rectangle.Contains);
      rowContainer.input.cursor = 'pointer';

      rowContainer.on('pointerover', () => drawRow(CARD_BG_HOVER));
      rowContainer.on('pointerout', () => drawRow(CARD_BG));
      rowContainer.on('pointerdown', () => {
        this.tweens.add({ targets: rowContainer, scale: 0.97, duration: 70, yoyo: true });
        this.time.delayedCall(90, () => this.scene.start('Game', { categoryId: category.id, levelIndex: idx }));
      });
    });
  }

  buildPill(x, y, label, opts = {}) {
    const { fontSize = '12px', originX = 0.5 } = opts;
    const txt = this.add.text(0, 0, label, {
      fontFamily: 'Cinzel', fontSize, fontStyle: 'bold', color: '#f4e8cf'
    }).setOrigin(0.5);
    const w = txt.width + 24, h = txt.height + 14;
    const bgShape = this.add.graphics();
    bgShape.fillStyle(0x2b1e16, 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
    bgShape.lineStyle(1.5, CHART_LINE, 0.9).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
    const container = this.add.container(x - (originX - 0.5) * w, y, [bgShape, txt]);
    container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
    container.input.cursor = 'pointer';
    container.on('pointerover', () => { bgShape.clear(); bgShape.fillStyle(0x3d2b1f, 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2); bgShape.lineStyle(1.5, GOLD_BRIGHT, 0.9).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2); });
    container.on('pointerout', () => { bgShape.clear(); bgShape.fillStyle(0x2b1e16, 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2); bgShape.lineStyle(1.5, CHART_LINE, 0.9).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2); });
    container.on('pointerdown', () => this.tweens.add({ targets: container, scale: 0.92, duration: 60, yoyo: true }));
    return container;
  }
}
