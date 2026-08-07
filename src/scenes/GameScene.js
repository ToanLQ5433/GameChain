import Phaser from 'phaser';
import { ChainEngine } from '../engine/ChainEngine.js';
import { getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, markLevelCompleted } from '../utils/storage.js';

const COLORS = {
  cellBg: 0x2a1f16,
  cellBorder: 0x4a3728,
  rock: 0x5c4a3e,
  pushRock: 0x8a7259,
  bomb: 0x7a1f1f,
  bombDim: 0x3a1a1a,
  gateClosed: 0x6b2020,
  gateOpen: 0x1f5c33,
  switchDot: 0xb8860b,
  wall: 0xf4e8cf,
  prismRed: 0xa82e2e,
  prismBlue: 0x1b5e8a,
  prismGreen: 0x2a7b4c
};

const COLOR_HEX = { red: COLORS.prismRed, blue: COLORS.prismBlue, green: COLORS.prismGreen };

export default class GameScene extends Phaser.Scene {
  constructor() { super('Game'); }

  init(data) {
    this.categoryId = data.categoryId;
    this.levelIndex = data.levelIndex;
  }

  create() {
    const { width, height } = this.scale;
    this.category = getCategory(this.categoryId);
    this.levelDef = this.category.levels[this.levelIndex];
    this.save = this.registry.get('save');

    this.add.rectangle(0, 0, width, height, 0x0f0b08).setOrigin(0);

    this.buildTopBar(width);
    this.buildBottomBar(width, height);

    this.boardContainer = this.add.container(0, 0);
    this.overlayContainer = this.add.container(0, 0).setVisible(false);

    this.dragging = false;
    this.loadLevel();

    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerup', this.onPointerUp, this);
    this.input.on('pointerupoutside', this.onPointerUp, this);
  }

  // ---------------- UI khung ngoài ----------------

  buildTopBar(width) {
    const backBtn = this.add.text(12, 14, '← Danh sách', {
      fontFamily: 'Cinzel', fontSize: '12px', color: '#f4e8cf', backgroundColor: '#2b1e16',
      padding: { x: 8, y: 5 }
    }).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => this.scene.start('LevelSelect', { categoryId: this.categoryId }));

    this.coinText = this.add.text(width - 12, 14, `🟡 ${this.save.coins}`, {
      fontFamily: 'Cinzel', fontSize: '13px', color: '#ffd700', backgroundColor: '#2b1e16',
      padding: { x: 8, y: 5 }
    }).setOrigin(1, 0);

    this.levelNameText = this.add.text(width / 2, 44, '', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: 'bold', color: '#f4e8cf', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.mechDescText = this.add.text(width / 2, 66, '', {
      fontFamily: 'Cinzel', fontSize: '10px', color: '#b8860b', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.statusText = this.add.text(width / 2, 96, '', {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: 'italic', color: '#d3be97'
    }).setOrigin(0.5, 0);
  }

  buildBottomBar(width, height) {
    const y = height - 30;
    const resetBtn = this.add.text(width / 2 - 70, y, 'Chơi Lại', {
      fontFamily: 'Cinzel', fontSize: '12px', color: '#f4e8cf', backgroundColor: '#2b1e16',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    resetBtn.on('pointerdown', () => this.loadLevel());

    const skipBtn = this.add.text(width / 2 + 70, y, 'Bỏ Qua (Demo)', {
      fontFamily: 'Cinzel', fontSize: '12px', color: '#f4e8cf', backgroundColor: '#2b1e16',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    skipBtn.on('pointerdown', () => this.completeLevel(true));
  }

  // ---------------- Vòng đời level ----------------

  loadLevel() {
    this.engine = new ChainEngine(this.levelDef);
    this.dragging = false;
    this.overlayContainer.setVisible(false);
    this.overlayContainer.removeAll(true);

    this.levelNameText.setText(this.levelDef.name);
    this.mechDescText.setText(this.category.desc);
    this.statusText.setText('Chạm vào 1 số và kéo qua các ô liền kề.');

    this.computeBoardMetrics();
    this.redrawBoard();

    // Expose cho debug/QA thủ công qua console — vô hại trong bản demo.
    window.__engine = this.engine;
    window.__scene = this;
  }

  computeBoardMetrics() {
    const { width, height } = this.scale;
    const topOffset = 116;
    const bottomOffset = 96;
    const marginX = 24;
    const size = this.engine.size;

    const areaW = width - marginX * 2;
    const areaH = height - topOffset - bottomOffset;
    const cell = Math.floor(Math.min(areaW / size, areaH / size));

    this.cellSize = cell;
    this.boardOriginX = Math.round((width - cell * size) / 2);
    this.boardOriginY = Math.round(topOffset + (areaH - cell * size) / 2);
  }

  cellToPixel(r, c) {
    return { x: this.boardOriginX + c * this.cellSize, y: this.boardOriginY + r * this.cellSize };
  }

  cellFromPointer(x, y) {
    const c = Math.floor((x - this.boardOriginX) / this.cellSize);
    const r = Math.floor((y - this.boardOriginY) / this.cellSize);
    return { r, c };
  }

  // ---------------- Render bàn cờ ----------------

  redrawBoard() {
    this.boardContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const inset = Math.round(cs * 0.14);
    const thickness = cs - inset * 2;

    // Nền + lưới ô
    for (let r = 0; r < e.size; r++) {
      for (let c = 0; c < e.size; c++) {
        const { x, y } = this.cellToPixel(r, c);
        let fill = COLORS.cellBg;

        if (e.isRock(r, c)) fill = COLORS.rock;
        else if (e.isPushRock(r, c)) fill = COLORS.pushRock;
        else if (e.isBombAlive(r, c)) fill = COLORS.bomb;

        const gateHere = e.switches.find(s => s.gateR === r && s.gateC === c);
        if (gateHere) fill = e.isGateOpenAt(r, c) ? COLORS.gateOpen : COLORS.gateClosed;

        const rect = this.add.rectangle(x + cs / 2, y + cs / 2, cs - 2, cs - 2, fill)
          .setStrokeStyle(1, COLORS.cellBorder);
        this.boardContainer.add(rect);

        // Icon / label lớp trên
        let label = '';
        if (e.isRock(r, c)) label = '🪨';
        else if (e.isPushRock(r, c)) label = '🪨';
        else if (e.isBombAlive(r, c)) label = '💣';
        if (gateHere) label = e.isGateOpenAt(r, c) ? '🔓' : '🔒';

        const sw = e.switches.find(s => s.r === r && s.c === c);
        if (sw) label = sw.latch ? '📌' : '🔘';

        const arrow = e.arrows.find(a => a.r === r && a.c === c);
        if (arrow) {
          const icons = { UP: '⬆️', DOWN: '⬇️', LEFT: '⬅️', RIGHT: '➡️' };
          label = icons[arrow.dir];
        }

        const prism = e.prisms.find(p => p.r === r && p.c === c);
        const colorGate = e.colorGates.find(g => g.r === r && g.c === c);
        if (prism) label = '🎨';
        if (colorGate) label = '🚧';

        if (label) {
          const t = this.add.text(x + cs / 2, y + cs / 2, label, { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5);
          this.boardContainer.add(t);
        }

        if (prism || colorGate) {
          const tint = COLOR_HEX[(prism || colorGate).color] || 0xffffff;
          rect.setStrokeStyle(2, tint);
        }

        // Waypoint badge
        Object.values(e.waypoints).forEach(list => {
          const idx = list.findIndex(w => w.r === r && w.c === c);
          if (idx !== -1) {
            const badge = this.add.circle(x + cs / 2, y + cs / 2, cs * 0.32, 0xffd700).setStrokeStyle(2, 0x5c4314);
            const num = this.add.text(x + cs / 2, y + cs / 2, String(idx + 1), {
              fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.32) + 'px', fontStyle: '900', color: '#2b1e16'
            }).setOrigin(0.5);
            this.boardContainer.add([badge, num]);
          }
        });
      }
    }

    // Walls (vách ngăn theo cạnh)
    e.walls.forEach(w => {
      const p1 = this.cellToPixel(w.r1, w.c1);
      const p2 = this.cellToPixel(w.r2, w.c2);
      const line = this.add.graphics();
      line.lineStyle(4, COLORS.wall, 1);
      if (w.r1 === w.r2) {
        // cạnh dọc giữa 2 cột
        const x = Math.max(p1.x, p2.x);
        line.lineBetween(x, p1.y, x, p1.y + cs);
      } else {
        const y = Math.max(p1.y, p2.y);
        line.lineBetween(p1.x, y, p1.x + cs, y);
      }
      this.boardContainer.add(line);
    });

    // Chains: connectors + beads
    e.getAllChains().forEach(chain => {
      const displayColor = chain.colorTag ? (COLOR_HEX[chain.colorTag] || Phaser.Display.Color.HexStringToColor(chain.color).color)
        : Phaser.Display.Color.HexStringToColor(chain.color).color;

      for (let i = 1; i < chain.path.length; i++) {
        const a = this.cellToPixel(chain.path[i - 1].r, chain.path[i - 1].c);
        const b = this.cellToPixel(chain.path[i].r, chain.path[i].c);
        const line = this.add.graphics();
        line.lineStyle(thickness, displayColor, 0.9);
        line.lineBetween(a.x + cs / 2, a.y + cs / 2, b.x + cs / 2, b.y + cs / 2);
        this.boardContainer.add(line);
      }

      chain.path.forEach((p, i) => {
        const { x, y } = this.cellToPixel(p.r, p.c);
        const bead = this.add.circle(x + cs / 2, y + cs / 2, thickness / 2, displayColor)
          .setStrokeStyle(chain.locked ? 3 : 1, 0xffffff);
        this.boardContainer.add(bead);
        if (i === 0) {
          const remaining = chain.length - chain.path.length;
          const txt = this.add.text(x + cs / 2, y + cs / 2, chain.locked ? '✓' : String(Math.max(0, remaining)), {
            fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.3) + 'px', fontStyle: '900', color: '#ffffff'
          }).setOrigin(0.5);
          this.boardContainer.add(txt);
        }
      });
    });
  }

  // ---------------- Input kéo dây ----------------

  onPointerDown(pointer) {
    if (this.overlayContainer.visible) return;
    const pos = this.cellFromPointer(pointer.x, pointer.y);
    if (!this.engine.inBounds(pos.r, pos.c)) return;
    const chain = this.engine.startDrag(pos.r, pos.c);
    if (!chain) return;
    this.dragging = true;
    playSound('step', this.save.soundMuted);
    this.redrawBoard();
    this.updateStatus();
  }

  onPointerMove(pointer) {
    if (!this.dragging) return;
    const pos = this.cellFromPointer(pointer.x, pointer.y);
    if (!this.engine.inBounds(pos.r, pos.c)) return;

    const chain = this.engine.getChain(this.engine.activeId);
    const last = chain.path[chain.path.length - 1];
    if (pos.r === last.r && pos.c === last.c) return;

    // Cho phép lùi dây lại 1 bước nếu kéo ngược về ô liền trước.
    if (chain.path.length > 1) {
      const prev = chain.path[chain.path.length - 2];
      if (pos.r === prev.r && pos.c === prev.c) {
        this.engine.backtrackTo(chain.path.length - 2);
        playSound('step', this.save.soundMuted);
        this.redrawBoard();
        this.updateStatus();
        return;
      }
    }

    const res = this.engine.step(pos.r, pos.c);
    if (res.result === 'OK') {
      playSound('step', this.save.soundMuted);
      this.redrawBoard();
      this.updateStatus();
    } else if (res.result === 'LOSE') {
      this.dragging = false;
      playSound('bomb', this.save.soundMuted);
      this.redrawBoard();
      this.showLose('💥 Bạn đã chạm vào Bom còn nguyên vẹn! Lần sau hãy đẩy Push Rock vào Bom trước khi cho dây đi qua.');
    } else {
      playSound('error', this.save.soundMuted);
    }
  }

  onPointerUp() {
    if (!this.dragging) return;
    this.dragging = false;
    const res = this.engine.endDrag();
    if (res.locked) {
      playSound('lock', this.save.soundMuted);
      if (res.win) {
        this.completeLevel(false);
        return;
      }
    } else if (res.error) {
      playSound('error', this.save.soundMuted);
    }
    this.redrawBoard();
    this.updateStatus();
  }

  updateStatus() {
    if (!this.dragging) {
      this.statusText.setText('Chạm vào 1 số và kéo qua các ô liền kề.');
      return;
    }
    const chain = this.engine.getChain(this.engine.activeId);
    this.statusText.setText(`Xích ${chain.id}: ${chain.path.length}/${chain.length} bước`);
  }

  // ---------------- Thắng / Thua ----------------

  completeLevel(isSkip) {
    playSound('win', this.save.soundMuted);
    const already = (this.save.completedLevels[this.categoryId] || []).includes(this.levelIndex);
    if (!already && !isSkip) this.save.coins += 20;
    markLevelCompleted(this.save, this.categoryId, this.levelIndex);
    saveState(this.save);
    this.coinText.setText(`🟡 ${this.save.coins}`);
    this.showWin(isSkip);
  }

  showWin(isSkip) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, 0x0f0b08, 0.92).setOrigin(0);
    const title = this.add.text(width / 2, height / 2 - 60, isSkip ? 'Đã Bỏ Qua Màn' : 'Giải Mã Thành Công!', {
      fontFamily: 'Cinzel', fontSize: '24px', fontStyle: '900', color: '#ffd700'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, height / 2 - 20, isSkip ? '' : '+20 Xu', {
      fontFamily: 'Cinzel', fontSize: '14px', color: '#f4e8cf'
    }).setOrigin(0.5);

    const hasNext = this.levelIndex + 1 < this.category.levels.length;
    const nextBtn = this.add.text(width / 2, height / 2 + 30, hasNext ? 'Màn Tiếp Theo' : 'Về Danh Sách', {
      fontFamily: 'Cinzel', fontSize: '14px', color: '#0f0b08', backgroundColor: '#ffd700',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    nextBtn.on('pointerdown', () => {
      if (hasNext) {
        this.scene.start('Game', { categoryId: this.categoryId, levelIndex: this.levelIndex + 1 });
      } else {
        this.scene.start('LevelSelect', { categoryId: this.categoryId });
      }
    });

    const homeBtn = this.add.text(width / 2, height / 2 + 76, 'Trang Chủ', {
      fontFamily: 'Cinzel', fontSize: '12px', color: '#f4e8cf', backgroundColor: '#2b1e16',
      padding: { x: 14, y: 6 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    homeBtn.on('pointerdown', () => this.scene.start('Home'));

    this.overlayContainer.add([bg, title, sub, nextBtn, homeBtn]);
    this.overlayContainer.setVisible(true);
  }

  showLose(text) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, 0x0f0b08, 0.92).setOrigin(0);
    const title = this.add.text(width / 2, height / 2 - 60, '💥 Bạn Đã Thua!', {
      fontFamily: 'Cinzel', fontSize: '22px', fontStyle: '900', color: '#a82e2e'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, height / 2 - 20, text, {
      fontFamily: 'Cinzel', fontSize: '11px', color: '#f4e8cf', align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5);

    const retryBtn = this.add.text(width / 2, height / 2 + 46, 'Chơi Lại Màn Này', {
      fontFamily: 'Cinzel', fontSize: '14px', color: '#0f0b08', backgroundColor: '#ffd700',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    retryBtn.on('pointerdown', () => this.loadLevel());

    this.overlayContainer.add([bg, title, sub, retryBtn]);
    this.overlayContainer.setVisible(true);
  }
}
