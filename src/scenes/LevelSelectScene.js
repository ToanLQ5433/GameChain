import Phaser from 'phaser';
import { getCategory } from '../data/levels.js';
import { isLevelCompleted } from '../utils/storage.js';
import { COLORS, drawChartBackground, makeButton } from '../utils/theme.js';

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

    this.add.text(width / 2, 50, category.desc, {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#6fa8c9', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.add.line(0, 0, 0, 92, width, 92, COLORS.teal, 0.25).setOrigin(0);

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
        g.lineStyle(2, done ? COLORS.teal : 0x2f4a5e, 1).strokeRoundedRect(-w / 2, -rowH / 2, w, rowH, radius);
      };
      drawRow(COLORS.cardBg);
      const rowContainer = this.add.container(width / 2, y, [g]);

      const numBadge = this.add.circle(-w / 2 + 26, 0, 15, done ? COLORS.tealDim : 0x1c3348)
        .setStrokeStyle(2, done ? COLORS.teal : 0x2f4a5e);
      const numText = this.add.text(-w / 2 + 26, 0, done ? '✓' : String(idx + 1), {
        fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: done ? '#7fe9de' : '#f4e8cf'
      }).setOrigin(0.5);

      const nameText = this.add.text(-w / 2 + 52, 0, lvl.name, {
        fontFamily: 'Cinzel', fontSize: '12px', fontStyle: 'bold', color: '#f4e8cf',
        wordWrap: { width: w - 90 }
      }).setOrigin(0, 0.5);

      rowContainer.add([numBadge, numText, nameText]);
      rowContainer.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -rowH / 2, w, rowH), Phaser.Geom.Rectangle.Contains);
      rowContainer.input.cursor = 'pointer';

      rowContainer.on('pointerover', () => drawRow(COLORS.cardBgHover));
      rowContainer.on('pointerout', () => drawRow(COLORS.cardBg));
      rowContainer.on('pointerdown', () => {
        this.tweens.add({ targets: rowContainer, scale: 0.97, duration: 70, yoyo: true });
        this.time.delayedCall(90, () => this.scene.start('Game', { categoryId: category.id, levelIndex: idx }));
      });
    });
  }
}
