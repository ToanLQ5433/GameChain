import Phaser from 'phaser';
import { getCategory } from '../data/levels.js';
import { isLevelCompleted } from '../utils/storage.js';

export default class LevelSelectScene extends Phaser.Scene {
  constructor() { super('LevelSelect'); }

  init(data) { this.categoryId = data.categoryId; }

  create() {
    const { width, height } = this.scale;
    const category = getCategory(this.categoryId);
    const save = this.registry.get('save');

    this.add.rectangle(0, 0, width, height, 0x0f0b08).setOrigin(0);

    // ---- Back button ----
    const backBtn = this.add.text(16, 18, '← Trang chủ', {
      fontFamily: 'Cinzel', fontSize: '13px', color: '#f4e8cf', backgroundColor: '#2b1e16',
      padding: { x: 10, y: 6 }
    }).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('Home'));

    this.add.text(width / 2, 20, `${category.icon} ${category.title}`, {
      fontFamily: 'Cinzel', fontSize: '18px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5, 0);

    this.add.text(width / 2, 52, category.desc, {
      fontFamily: 'Cinzel', fontSize: '11px', color: '#b8860b', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    // ---- Danh sách level ----
    const startY = 120, rowH = 60, marginX = 20;
    category.levels.forEach((lvl, idx) => {
      const y = startY + idx * (rowH + 10);
      const done = isLevelCompleted(save, category.id, idx);

      const row = this.add.rectangle(width / 2, y, width - marginX * 2, rowH, 0x241a12)
        .setStrokeStyle(2, done ? 0x2a7b4c : 0x5c4a3e)
        .setInteractive({ useHandCursor: true });

      this.add.text(marginX + 14, y, `${idx + 1}. ${lvl.name}`, {
        fontFamily: 'Cinzel', fontSize: '13px', color: '#f4e8cf',
        wordWrap: { width: width - marginX * 2 - 70 }
      }).setOrigin(0, 0.5);

      if (done) {
        this.add.text(width - marginX - 16, y, '✓', {
          fontFamily: 'Cinzel', fontSize: '20px', color: '#2a7b4c'
        }).setOrigin(1, 0.5);
      }

      row.on('pointerover', () => row.setFillStyle(0x33251a));
      row.on('pointerout', () => row.setFillStyle(0x241a12));
      row.on('pointerdown', () => {
        this.scene.start('Game', { categoryId: category.id, levelIndex: idx });
      });
    });
  }
}
