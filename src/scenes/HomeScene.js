import Phaser from 'phaser';
import { CATEGORIES } from '../data/levels.js';

const GOLD = 0xd4af37;
const PAPER = 0xf4e8cf;
const INK = 0x2b1e16;
const CARD_BG = 0x241a12;
const CARD_BORDER = 0x5c4a3e;

export default class HomeScene extends Phaser.Scene {
  constructor() { super('Home'); }

  create() {
    const { width, height } = this.scale;
    const save = this.registry.get('save');

    this.add.rectangle(0, 0, width, height, 0x0f0b08).setOrigin(0);

    // ---- Top bar ----
    this.add.text(width / 2, 34, 'PIRATE TRAILS', {
      fontFamily: 'Cinzel', fontSize: '26px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5);
    this.add.text(width / 2, 60, 'Logic Chains — Home', {
      fontFamily: 'Cinzel', fontSize: '12px', color: '#b8860b'
    }).setOrigin(0.5);

    this.coinText = this.add.text(width - 16, 16, `🟡 ${save.coins}`, {
      fontFamily: 'Cinzel', fontSize: '16px', color: '#ffd700'
    }).setOrigin(1, 0);

    // ---- Category grid: 2 cột x 3 hàng ----
    const cols = 2;
    const marginX = 20, marginTop = 96, gap = 14;
    const cardW = (width - marginX * 2 - gap) / cols;
    const cardH = 158;

    CATEGORIES.forEach((cat, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = marginX + col * (cardW + gap) + cardW / 2;
      const y = marginTop + row * (cardH + gap) + cardH / 2;
      this.createCategoryCard(cat, x, y, cardW, cardH, save);
    });

    this.add.text(width / 2, height - 18, 'Chạm 1 thể loại để chọn màn chơi', {
      fontFamily: 'Cinzel', fontSize: '11px', color: '#6e5d4f'
    }).setOrigin(0.5);
  }

  createCategoryCard(cat, x, y, w, h, save) {
    const container = this.add.container(x, y);

    const bg = this.add.rectangle(0, 0, w, h, CARD_BG).setStrokeStyle(2, CARD_BORDER);
    bg.setInteractive({ useHandCursor: true });

    const icon = this.add.text(0, -h / 2 + 34, cat.icon, { fontSize: '34px' }).setOrigin(0.5);
    const title = this.add.text(0, -h / 2 + 70, cat.title, {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: 'bold', color: '#f4e8cf', align: 'center',
      wordWrap: { width: w - 16 }
    }).setOrigin(0.5);
    const mechTag = this.add.text(0, -h / 2 + 92, cat.mechanic, {
      fontFamily: 'Cinzel', fontSize: '10px', color: '#b8860b'
    }).setOrigin(0.5);

    const done = (save.completedLevels[cat.id] || []).length;
    const total = cat.levels.length;
    const progress = this.add.text(0, h / 2 - 16, `${done}/${total} hoàn thành`, {
      fontFamily: 'Cinzel', fontSize: '11px', color: done === total ? '#2a7b4c' : '#6e5d4f'
    }).setOrigin(0.5);

    container.add([bg, icon, title, mechTag, progress]);

    bg.on('pointerover', () => bg.setFillStyle(0x33251a));
    bg.on('pointerout', () => bg.setFillStyle(CARD_BG));
    bg.on('pointerdown', () => {
      this.scene.start('LevelSelect', { categoryId: cat.id });
    });

    return container;
  }
}
