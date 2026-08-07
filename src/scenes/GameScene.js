import Phaser from 'phaser';
import { ChainEngine } from '../engine/ChainEngine.js';
import { getCategory } from '../data/levels.js';
import { playSound } from '../utils/audio.js';
import { saveState, markLevelCompleted, registerNewLevelClear } from '../utils/storage.js';
import { COLORS, drawChartBackground, drawPanel, makeButton, makeHudChip } from '../utils/theme.js';

const TILE = {
  cellBg: 0x0a1d33,
  cellBgLight: 0x123049,
  cellBorder: 0x1c3a52,
  rock: 0x5c4a3e,
  rockBorder: 0x3d2b1f,
  pushRock: 0x8a7259,
  bombBg: 0x3a1414,
  bombBorder: 0xa82e2e,
  gateClosedBg: 0x4a1414,
  gateOpenBg: 0x123a24,
  switchDot: COLORS.gold,
  wall: COLORS.gold,
  prismRed: 0xa82e2e,
  prismBlue: 0x1b5e8a,
  prismGreen: 0x2a7b4c
};

const COLOR_HEX = { red: TILE.prismRed, blue: TILE.prismBlue, green: TILE.prismGreen };

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
    this.save.lastCategoryId = this.categoryId;
    this.save.lastLevelIndex = this.levelIndex;
    saveState(this.save);

    drawChartBackground(this, width, height);

    this.buildTopBar(width);
    this.buildBottomBar(width, height);

    // Tách hẳn lớp tĩnh (nền ô, tường, mũi tên, lăng kính, mốc số — không đổi
    // trong suốt màn) khỏi lớp động (đá đẩy, bom, cổng, dây xích — đổi mỗi
    // bước kéo). Trước đây MỌI thứ bị xoá-vẽ-lại toàn bộ mỗi lần rê tay, gây
    // giật khi board lớn; giờ mỗi bước kéo chỉ chạm tới vài chục object động
    // thay vì toàn bộ lưới ô.
    this.boardFrameContainer = this.add.container(0, 0);
    this.boardStaticContainer = this.add.container(0, 0);
    this.boardDynamicContainer = this.add.container(0, 0);
    this.chainContainer = this.add.container(0, 0);
    this.fxContainer = this.add.container(0, 0);
    this.overlayContainer = this.add.container(0, 0).setVisible(false);

    this.dragging = false;
    this.chainLengths = {};
    this.loadLevel();

    this.input.on('pointerdown', this.onPointerDown, this);
    this.input.on('pointermove', this.onPointerMove, this);
    this.input.on('pointerup', this.onPointerUp, this);
    this.input.on('pointerupoutside', this.onPointerUp, this);
  }

  // ---------------- UI khung ngoài ----------------

  buildTopBar(width) {
    makeButton(this, 12, 24, '← Danh sách', { variant: 'ink', fontSize: '10px', originX: 0 })
      .on('pointerdown', () => this.scene.start('LevelSelect', { categoryId: this.categoryId }));

    this.coinChip = makeHudChip(this, width - 12, 24, 'XU', `🟡 ${this.save.coins}`, { variant: 'gold', originX: 1 });

    this.levelNameText = this.add.text(width / 2, 54, '', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: 'bold', color: '#f4e8cf', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.mechDescText = this.add.text(width / 2, 76, '', {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#b8860b', align: 'center',
      wordWrap: { width: width - 40 }
    }).setOrigin(0.5, 0);

    this.statusText = this.add.text(width / 2, 106, '', {
      fontFamily: 'Cinzel', fontSize: '11px', fontStyle: 'italic', color: '#d3be97'
    }).setOrigin(0.5, 0);

    this.add.line(0, 0, 0, 118, width, 118, COLORS.teal, 0.25).setOrigin(0);
  }

  buildBottomBar(width, height) {
    const y = height - 30;
    makeButton(this, width / 2 - 74, y, 'Chơi Lại', { variant: 'teal', fontSize: '11px' })
      .on('pointerdown', () => this.loadLevel());
    makeButton(this, width / 2 + 74, y, 'Bỏ Qua (Demo)', { variant: 'teal', fontSize: '11px' })
      .on('pointerdown', () => this.completeLevel(true));
  }

  // ---------------- Vòng đời level ----------------

  loadLevel() {
    this.engine = new ChainEngine(this.levelDef);
    this.dragging = false;
    this.chainLengths = {};
    this.overlayContainer.setVisible(false);
    this.overlayContainer.removeAll(true);
    this.fxContainer.removeAll(true);

    this.levelNameText.setText(this.levelDef.name);
    this.mechDescText.setText(this.category.desc);
    this.statusText.setText('Chạm vào 1 số và kéo qua các ô liền kề.');

    this.computeBoardMetrics();
    this.drawBoardFrame();
    this.drawStaticBoard();
    this.redrawDynamic();
    this.redrawChains();

    // Expose cho debug/QA thủ công qua console — vô hại trong bản demo.
    window.__engine = this.engine;
    window.__scene = this;
  }

  computeBoardMetrics() {
    const { width, height } = this.scale;
    const topOffset = 128;
    const bottomOffset = 100;
    const marginX = 30;
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

  cellCenter(r, c) {
    const { x, y } = this.cellToPixel(r, c);
    return { x: x + this.cellSize / 2, y: y + this.cellSize / 2 };
  }

  cellFromPointer(x, y) {
    const c = Math.floor((x - this.boardOriginX) / this.cellSize);
    const r = Math.floor((y - this.boardOriginY) / this.cellSize);
    return { r, c };
  }

  // ---------------- Khung gỗ quanh bàn cờ (theo style guide) ----------------

  drawBoardFrame() {
    this.boardFrameContainer.removeAll(true);
    const pad = Math.max(10, Math.round(this.cellSize * 0.18));
    const boardW = this.cellSize * this.engine.size, boardH = boardW;
    const frame = drawPanel(this, this.boardOriginX - pad, this.boardOriginY - pad, boardW + pad * 2, boardH + pad * 2, {
      radius: 16, fill: COLORS.wood, border: COLORS.gold, borderWidth: 3
    });
    this.boardFrameContainer.add(frame);
  }

  // ---------------- Lớp TĨNH: nền ô, tường, mũi tên, lăng kính, mốc số ----

  drawStaticBoard() {
    this.boardStaticContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const radius = Math.max(3, Math.round(cs * 0.12));

    const tiles = this.add.graphics();
    this.boardStaticContainer.add(tiles);

    for (let r = 0; r < e.size; r++) {
      for (let c = 0; c < e.size; c++) {
        const { x, y } = this.cellToPixel(r, c);
        const isRock = e.isRock(r, c);
        const fill = isRock ? TILE.rock : TILE.cellBg;
        const border = isRock ? TILE.rockBorder : TILE.cellBorder;

        tiles.fillStyle(fill, 1).fillRoundedRect(x + 1, y + 1, cs - 2, cs - 2, radius);
        // Dải sáng mỏng phía trên mỗi ô — gợi cảm giác nổi khối (depth) nhẹ.
        tiles.fillStyle(TILE.cellBgLight, isRock ? 0 : 0.6)
          .fillRoundedRect(x + 2, y + 2, cs - 4, Math.max(2, cs * 0.16), radius * 0.6);
        tiles.lineStyle(1, border, 0.9).strokeRoundedRect(x + 1, y + 1, cs - 2, cs - 2, radius);

        if (isRock) {
          this.boardStaticContainer.add(
            this.add.text(x + cs / 2, y + cs / 2, '🪨', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5)
          );
        }

        const arrow = e.arrows.find(a => a.r === r && a.c === c);
        if (arrow) {
          const icons = { UP: '⬆️', DOWN: '⬇️', LEFT: '⬅️', RIGHT: '➡️' };
          this.boardStaticContainer.add(
            this.add.text(x + cs / 2, y + cs / 2, icons[arrow.dir], { fontSize: Math.round(cs * 0.4) + 'px' }).setOrigin(0.5)
          );
        }

        const prism = e.prisms.find(p => p.r === r && p.c === c);
        const colorGate = e.colorGates.find(g => g.r === r && g.c === c);
        if (prism || colorGate) {
          const tint = COLOR_HEX[(prism || colorGate).color] || 0xffffff;
          tiles.lineStyle(2.5, tint, 1).strokeRoundedRect(x + 2, y + 2, cs - 4, cs - 4, radius);
          this.boardStaticContainer.add(
            this.add.text(x + cs / 2, y + cs / 2, prism ? '🎨' : '🚧', { fontSize: Math.round(cs * 0.4) + 'px' }).setOrigin(0.5)
          );
        }

        Object.values(e.waypoints).forEach(list => {
          const idx = list.findIndex(w => w.r === r && w.c === c);
          if (idx !== -1) {
            const badge = this.add.circle(x + cs / 2, y + cs / 2, cs * 0.32, COLORS.gold).setStrokeStyle(2, COLORS.goldDim);
            const num = this.add.text(x + cs / 2, y + cs / 2, String(idx + 1), {
              fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.32) + 'px', fontStyle: '900', color: '#2b1e16'
            }).setOrigin(0.5);
            this.boardStaticContainer.add([badge, num]);
          }
        });
      }
    }

    e.walls.forEach(w => {
      const p1 = this.cellToPixel(w.r1, w.c1);
      const p2 = this.cellToPixel(w.r2, w.c2);
      const glow = this.add.graphics();
      const line = this.add.graphics();
      const drawAt = (g, width, alpha) => {
        g.lineStyle(width, TILE.wall, alpha);
        if (w.r1 === w.r2) {
          const x = Math.max(p1.x, p2.x);
          g.lineBetween(x, p1.y, x, p1.y + cs);
        } else {
          const y = Math.max(p1.y, p2.y);
          g.lineBetween(p1.x, y, p1.x + cs, y);
        }
      };
      drawAt(glow, 8, 0.25);
      drawAt(line, 3, 1);
      this.boardStaticContainer.add([glow, line]);
    });
  }

  // ---------------- Lớp ĐỘNG: đá đẩy, bom, cổng công tắc ----------------

  redrawDynamic() {
    this.boardDynamicContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const radius = Math.max(3, Math.round(cs * 0.12));

    e.switches.forEach(sw => {
      const { x, y } = this.cellToPixel(sw.r, sw.c);
      const dot = this.add.circle(x + cs / 2, y + cs / 2, cs * 0.22, TILE.switchDot).setStrokeStyle(2, COLORS.goldDim);
      const icon = this.add.text(x + cs / 2, y + cs / 2, sw.latch ? '📌' : '🔘', { fontSize: Math.round(cs * 0.3) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([dot, icon]);

      const { x: gx, y: gy } = this.cellToPixel(sw.gateR, sw.gateC);
      const open = e.isGateOpenAt(sw.gateR, sw.gateC);
      const g = this.add.graphics();
      g.fillStyle(open ? TILE.gateOpenBg : TILE.gateClosedBg, 0.9)
        .fillRoundedRect(gx + 3, gy + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, open ? COLORS.emerald : COLORS.ruby, 1).strokeRoundedRect(gx + 3, gy + 3, cs - 6, cs - 6, radius);
      const gicon = this.add.text(gx + cs / 2, gy + cs / 2, open ? '🔓' : '🔒', { fontSize: Math.round(cs * 0.38) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, gicon]);
    });

    e.pushRocks.forEach(pr => {
      const { x, y } = this.cellToPixel(pr.r, pr.c);
      const g = this.add.graphics();
      g.fillStyle(TILE.pushRock, 1).fillRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, 0x5c4a3e, 1).strokeRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      const icon = this.add.text(x + cs / 2, y + cs / 2, '🪨', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, icon]);
    });

    e.bombs.forEach(b => {
      if (b.destroyed) return;
      const { x, y } = this.cellToPixel(b.r, b.c);
      const cx = x + cs / 2, cy = y + cs / 2;
      const g = this.add.graphics();
      g.fillStyle(TILE.bombBg, 1).fillRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      g.lineStyle(2, TILE.bombBorder, 1).strokeRoundedRect(x + 3, y + 3, cs - 6, cs - 6, radius);
      const icon = this.add.text(cx, cy, '💣', { fontSize: Math.round(cs * 0.42) + 'px' }).setOrigin(0.5);
      this.boardDynamicContainer.add([g, icon]);
      // Nhịp "tim đập" nhẹ trên bom còn nguyên — nhắc người chơi đây là hiểm hoạ,
      // không phải trang trí vô cảm.
      this.tweens.add({ targets: icon, scale: { from: 1, to: 1.14 }, yoyo: true, repeat: -1, duration: 620 });
    });
  }

  // ---------------- Lớp XÍCH: connectors + beads ----------------

  redrawChains() {
    this.chainContainer.removeAll(true);
    const e = this.engine;
    const cs = this.cellSize;
    const inset = Math.round(cs * 0.16);
    const thickness = cs - inset * 2;
    const newBeads = [];

    e.getAllChains().forEach(chain => {
      const displayColor = chain.colorTag ? (COLOR_HEX[chain.colorTag] || Phaser.Display.Color.HexStringToColor(chain.color).color)
        : Phaser.Display.Color.HexStringToColor(chain.color).color;

      for (let i = 1; i < chain.path.length; i++) {
        const a = this.cellCenter(chain.path[i - 1].r, chain.path[i - 1].c);
        const b = this.cellCenter(chain.path[i].r, chain.path[i].c);
        const line = this.add.graphics();
        line.lineStyle(thickness, displayColor, 0.92);
        line.lineBetween(a.x, a.y, b.x, b.y);
        this.chainContainer.add(line);
      }

      const prevLen = this.chainLengths[chain.id] || 1;
      chain.path.forEach((p, i) => {
        const { x, y } = this.cellCenter(p.r, p.c);
        // Glow mềm phía sau hạt xích — cho cảm giác "phát sáng" như game
        // mobile hiện đại, thay vì hình tròn viền trắng phẳng lì.
        const glow = this.add.circle(x, y, thickness / 2 + 4, displayColor, 0.28);
        const bead = this.add.circle(x, y, thickness / 2, displayColor)
          .setStrokeStyle(chain.locked ? 3 : 1.5, chain.locked ? COLORS.gold : 0xffffff, chain.locked ? 1 : 0.85);
        this.chainContainer.add([glow, bead]);
        if (i === 0) {
          const remaining = chain.length - chain.path.length;
          const txt = this.add.text(x, y, chain.locked ? '✓' : String(Math.max(0, remaining)), {
            fontFamily: 'Cinzel', fontSize: Math.round(cs * 0.3) + 'px', fontStyle: '900', color: '#ffffff'
          }).setOrigin(0.5);
          this.chainContainer.add(txt);
        }
        // Hạt vừa mới thêm ở cuối dây trong lượt kéo này -> nảy nhẹ (juice).
        if (i === chain.path.length - 1 && chain.path.length > prevLen) {
          newBeads.push(glow, bead);
        }
      });
      this.chainLengths[chain.id] = chain.path.length;
    });

    newBeads.forEach(obj => {
      const targetScale = obj.scale || 1;
      obj.setScale(0.3);
      this.tweens.add({ targets: obj, scale: targetScale * 1.25, duration: 90, ease: 'Back.Out', onComplete: () => {
        this.tweens.add({ targets: obj, scale: targetScale, duration: 90 });
      } });
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
    this.chainLengths[chain.id] = chain.path.length;
    playSound('step', this.save.soundMuted);
    this.redrawChains();
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
        this.chainLengths[chain.id] = chain.path.length;
        playSound('step', this.save.soundMuted);
        this.redrawChains();
        this.updateStatus();
        return;
      }
    }

    const aliveBefore = this.engine.bombs.filter(b => !b.destroyed).map(b => `${b.r},${b.c}`);
    const res = this.engine.step(pos.r, pos.c);

    if (res.result === 'OK') {
      const newlyDestroyed = this.engine.bombs.filter(b => b.destroyed && aliveBefore.includes(`${b.r},${b.c}`));
      newlyDestroyed.forEach(b => this.triggerExplosion(b.r, b.c, false));
      if (newlyDestroyed.length) this.redrawDynamic();
      playSound('step', this.save.soundMuted);
      this.redrawChains();
      this.updateStatus();
    } else if (res.result === 'LOSE') {
      this.dragging = false;
      this.triggerExplosion(pos.r, pos.c, true);
      this.redrawChains();
      this.statusText.setText('💥 Bom nổ!');
      this.time.delayedCall(480, () => {
        this.showLose('💥 Bạn đã chạm vào Bom còn nguyên vẹn! Lần sau hãy đẩy Push Rock vào Bom trước khi cho dây đi qua.');
      });
    } else {
      playSound('error', this.save.soundMuted);
      this.cameras.main.shake(60, 0.0025);
    }
  }

  onPointerUp() {
    if (!this.dragging) return;
    this.dragging = false;
    const res = this.engine.endDrag();
    if (res.locked) {
      playSound('lock', this.save.soundMuted);
      this.pulseLockedChain();
      if (res.win) {
        this.completeLevel(false);
        return;
      }
    } else if (res.error) {
      playSound('error', this.save.soundMuted);
    }
    this.redrawChains();
    this.updateStatus();
  }

  pulseLockedChain() {
    const chain = this.engine.getChain(this.engine.activeId);
    if (!chain) return;
    const { x, y } = this.cellCenter(chain.row, chain.col);
    const ring = this.add.circle(x, y, this.cellSize * 0.3, COLORS.gold, 0.5);
    this.fxContainer.add(ring);
    this.tweens.add({
      targets: ring, scale: 2.6, alpha: 0, duration: 420, ease: 'Cubic.Out',
      onComplete: () => ring.destroy()
    });
  }

  updateStatus() {
    if (!this.dragging) {
      this.statusText.setText('Chạm vào 1 số và kéo qua các ô liền kề.');
      return;
    }
    const chain = this.engine.getChain(this.engine.activeId);
    this.statusText.setText(`Xích ${chain.id}: ${chain.path.length}/${chain.length} bước`);
  }

  // ---------------- Hiệu ứng Bom nổ ----------------

  triggerExplosion(r, c, big) {
    const { x: cx, y: cy } = this.cellCenter(r, c);
    const cs = this.cellSize;

    if (big) {
      playSound('explode', this.save.soundMuted);
      this.cameras.main.shake(260, 0.014);
      const flash = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff, 0.55).setOrigin(0);
      this.fxContainer.add(flash);
      this.tweens.add({ targets: flash, alpha: 0, duration: 220, onComplete: () => flash.destroy() });
      const vignette = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xa82e2e, 0.28).setOrigin(0);
      this.fxContainer.add(vignette);
      this.tweens.add({ targets: vignette, alpha: 0, duration: 480, delay: 120, onComplete: () => vignette.destroy() });
    } else {
      playSound('crack', this.save.soundMuted);
      this.cameras.main.shake(140, 0.006);
    }

    const ring = this.add.circle(cx, cy, cs * 0.3, COLORS.gold, 0.4).setStrokeStyle(2, COLORS.gold, 0.9);
    this.fxContainer.add(ring);
    this.tweens.add({
      targets: ring, scale: big ? 3.2 : 2.2, alpha: 0, duration: big ? 460 : 340, ease: 'Cubic.Out',
      onComplete: () => ring.destroy()
    });

    const chipCount = big ? 12 : 7;
    for (let i = 0; i < chipCount; i++) {
      const angle = (i / chipCount) * Math.PI * 2 + Math.random() * 0.4;
      const dist = cs * (big ? 1.6 : 1.1) * (0.6 + Math.random() * 0.5);
      const chip = this.add.circle(cx, cy, 2.5 + Math.random() * (big ? 4 : 2.5), big ? 0xff6a3d : COLORS.gold, 0.95);
      this.fxContainer.add(chip);
      this.tweens.add({
        targets: chip,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        alpha: 0,
        scale: 0.2,
        duration: 380 + Math.random() * 220,
        ease: 'Cubic.Out',
        onComplete: () => chip.destroy()
      });
    }

    const emoji = this.add.text(cx, cy, big ? '💥' : '✨', { fontSize: Math.round(cs * 0.6) + 'px' }).setOrigin(0.5).setScale(0.4);
    this.fxContainer.add(emoji);
    this.tweens.add({
      targets: emoji, scale: big ? 1.3 : 1, alpha: 0, duration: big ? 420 : 320, ease: 'Cubic.Out',
      onComplete: () => emoji.destroy()
    });
  }

  // ---------------- Thắng / Thua ----------------

  completeLevel(isSkip) {
    playSound('win', this.save.soundMuted);
    const already = (this.save.completedLevels[this.categoryId] || []).includes(this.levelIndex);
    if (!already && !isSkip) this.save.coins += 20;
    if (!already) registerNewLevelClear(this.save);
    markLevelCompleted(this.save, this.categoryId, this.levelIndex);
    saveState(this.save);

    // Nếu lần khoá dây này vừa lấp đầy trọn Đảo (category) — báo cho HomeScene
    // để chớp sáng Mảnh Bản Đồ khi người chơi quay lại (Haptic & Juice, GDD P2).
    const doneCount = (this.save.completedLevels[this.categoryId] || []).length;
    if (!already && doneCount === this.category.levels.length) {
      this.registry.set('justCompletedCategory', this.categoryId);
    }
    this.coinChip.setValueText(`🟡 ${this.save.coins}`);
    this.showWin(isSkip);
  }

  showWin(isSkip) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.94).setOrigin(0);

    const panelW = width - 56, panelH = 300;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 18, fill: COLORS.cardBg, border: COLORS.gold, borderWidth: 3 });

    const eyebrow = this.add.text(width / 2, panelY + 22, isSkip ? 'ĐÃ BỎ QUA' : 'CHIẾN THẮNG!', {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: 'bold', color: '#f3c64f', letterSpacing: 2
    }).setOrigin(0.5);
    const title = this.add.text(width / 2, panelY + 40, this.levelDef.name, {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#f4e8cf', align: 'center',
      wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5, 0);

    const starsY = panelY + 92;
    const stars = [];
    for (let i = 0; i < 3; i++) {
      const s = this.add.text(width / 2 + (i - 1) * 32, starsY, isSkip ? '☆' : '★', {
        fontSize: '26px', color: '#f3c64f'
      }).setOrigin(0.5).setScale(0);
      stars.push(s);
      this.tweens.add({ targets: s, scale: 1, duration: 260, delay: 200 + i * 130, ease: 'Back.Out' });
    }

    // Thẻ phần thưởng phát sáng — cùng ngôn ngữ "mảnh bản đồ" với Home.
    const cardW = 96, cardH = 96, cardX = width / 2 - cardW / 2, cardY = starsY + 34;
    const rewardFrame = drawPanel(this, cardX, cardY, cardW, cardH, { radius: 10, fill: COLORS.cardBgLight, border: COLORS.gold, borderWidth: 2 });
    const rewardIcon = this.add.text(width / 2, cardY + cardH / 2, isSkip ? '📦' : this.category.icon, { fontSize: '40px' }).setOrigin(0.5);
    if (!isSkip) {
      this.tweens.add({ targets: [rewardFrame, rewardIcon], alpha: { from: 0.6, to: 1 }, yoyo: true, repeat: -1, duration: 700 });
    }

    const rewardText = this.add.text(width / 2, cardY + cardH + 12, isSkip ? '' : '+20 Xu', {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0.5);

    const hasNext = this.levelIndex + 1 < this.category.levels.length;
    const nextBtn = makeButton(this, width / 2, panelY + panelH - 46, hasNext ? 'Màn Tiếp Theo' : 'Về Danh Sách', {
      variant: 'gold', fontSize: '13px'
    });
    nextBtn.on('pointerdown', () => {
      if (hasNext) {
        this.scene.start('Game', { categoryId: this.categoryId, levelIndex: this.levelIndex + 1 });
      } else {
        this.scene.start('LevelSelect', { categoryId: this.categoryId });
      }
    });

    const homeBtn = makeButton(this, width / 2, panelY + panelH - 12, 'Trang Chủ', { variant: 'ink', fontSize: '10px' });
    homeBtn.on('pointerdown', () => this.scene.start('Home'));

    this.overlayContainer.add([bg, panel, eyebrow, title, ...stars, rewardFrame, rewardIcon, rewardText, nextBtn, homeBtn]);
    this.overlayContainer.setVisible(true);

    if (!isSkip) {
      playSound('win', false);
      for (let i = 0; i < 16; i++) {
        const x = width / 2 + (Math.random() - 0.5) * panelW;
        const star = this.add.text(x, panelY - 10, '✨', { fontSize: (10 + Math.random() * 10) + 'px' }).setOrigin(0.5).setAlpha(0);
        this.overlayContainer.add(star);
        this.tweens.add({
          targets: star, y: star.y + 140 + Math.random() * 80, alpha: { from: 1, to: 0 }, angle: Math.random() * 180,
          delay: i * 40, duration: 900 + Math.random() * 300, ease: 'Cubic.In'
        });
      }
    }
  }

  showLose(text) {
    this.overlayContainer.removeAll(true);
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.94).setOrigin(0);

    const panelW = width - 60, panelH = 220;
    const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
    const panel = drawPanel(this, panelX, panelY, panelW, panelH, { radius: 16, fill: 0x2a1414, border: COLORS.ruby, borderWidth: 3 });

    const title = this.add.text(width / 2, panelY + 40, '💥 Bạn Đã Thua!', {
      fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#e0605a'
    }).setOrigin(0.5);
    const sub = this.add.text(width / 2, panelY + 86, text, {
      fontFamily: 'Crimson Pro', fontSize: '11px', color: '#f4e8cf', align: 'center',
      wordWrap: { width: panelW - 30 }
    }).setOrigin(0.5);

    const retryBtn = makeButton(this, width / 2, panelY + panelH - 40, 'Chơi Lại Màn Này', { variant: 'gold', fontSize: '13px' });
    retryBtn.on('pointerdown', () => this.loadLevel());

    this.overlayContainer.add([bg, panel, title, sub, retryBtn]);
    this.overlayContainer.setVisible(true);
  }
}
