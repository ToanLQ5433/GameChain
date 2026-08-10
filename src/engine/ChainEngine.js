// ChainEngine — logic thuần túy (không đụng DOM/Phaser) cho 5 cơ chế lõi:
//   MEC-01 Vật Cản   : rocks (chặn cứng), walls (chặn theo cạnh), pushRocks (đẩy được)
//   MEC-02 Định Hướng & Màu : arrows (ép hướng), prisms (đổi màu), colorGates (cổng màu)
//   MEC-03 Mật Mã Số : waypoints (thứ tự mốc số)
//   MEC-04 Công Tắc  : switches -> gates (± latch)
//   MEC-05 Bom Tĩnh  : bombs (chạm trực tiếp = thua; chỉ phá bằng pushRock)
//
// Tham chiếu logic 1-1 với các khối "Code Logic" trong GDD (Mục 3.4).

export class ChainEngine {
  constructor(levelDef) {
    // Bàn cờ không bắt buộc là hình vuông: `rows`/`cols` cho khung chữ nhật,
    // và `shape` (mảng chuỗi '0'/'1') để khoét thành hình bất kỳ (trái tim,
    // ngôi sao, chữ thập...) bên trong khung đó. `size` vẫn được nhận cho
    // tương thích ngược (khung vuông cũ, không shape).
    this.rows = levelDef.rows || levelDef.size;
    this.cols = levelDef.cols || levelDef.size;
    this.size = Math.max(this.rows, this.cols); // dùng cho code cũ còn tham chiếu .size
    this.shape = levelDef.shape || null;
    this.rocks = (levelDef.rocks || []).map(r => ({ ...r }));
    this.walls = levelDef.walls || [];
    this.pushRocks = (levelDef.pushRocks || []).map(r => ({ ...r }));
    this.switches = levelDef.switches || [];
    this.arrows = levelDef.arrows || [];
    this.prisms = levelDef.prisms || [];
    this.colorGates = levelDef.colorGates || [];
    this.waypoints = levelDef.waypoints || {};
    this.bombs = (levelDef.bombs || []).map(b => ({ ...b, destroyed: false }));

    this._latched = new Set();

    this.chains = {};
    levelDef.anchors.forEach(a => {
      this.chains[a.id] = {
        id: a.id,
        row: a.row,
        col: a.col,
        length: a.length,
        color: a.color,
        path: [{ r: a.row, c: a.col }],
        locked: false,
        colorTag: null,
        waypointProgress: 0
      };
    });

    this.activeId = null;
  }

  // ---------- Truy vấn trạng thái ----------

  getChain(id) { return this.chains[id]; }
  getAllChains() { return Object.values(this.chains); }
  isWon() { return this.getAllChains().every(c => c.locked); }
  inBounds(r, c) { return r >= 0 && r < this.rows && c >= 0 && c < this.cols; }
  isVoid(r, c) {
    if (!this.shape) return false;
    if (r < 0 || r >= this.shape.length) return true;
    const row = this.shape[r];
    if (c < 0 || c >= row.length) return true;
    return row[c] === '0';
  }
  isRock(r, c) { return this.rocks.some(p => p.r === r && p.c === c); }
  isPushRock(r, c) { return this.pushRocks.some(p => p.r === r && p.c === c); }
  isBombAlive(r, c) { return this.bombs.some(b => b.r === r && b.c === c && !b.destroyed); }
  isGateCell(r, c) { return this.switches.some(s => s.gateR === r && s.gateC === c); }

  hasWallBetween(r1, c1, r2, c2) {
    // Buff "Đóng Băng" (GDD 3.1: Freeze — "khoá tạm 1 cơ chế") vô hiệu hoá
    // Vách Ngăn trong phần còn lại của lượt chơi này.
    if (this.freezeWalls) return false;
    return this.walls.some(w =>
      (w.r1 === r1 && w.c1 === c1 && w.r2 === r2 && w.c2 === c2) ||
      (w.r1 === r2 && w.c1 === c2 && w.r2 === r1 && w.c1 === c1)
    );
  }

  isSwitchLive(sw) {
    return this.getAllChains().some(c => c.path.some(p => p.r === sw.r && p.c === sw.c));
  }

  updateLatches() {
    this.switches.forEach(sw => {
      if (sw.latch && this.isSwitchLive(sw)) this._latched.add(sw.r + '_' + sw.c);
    });
  }

  isGateOpenAt(r, c) {
    const controllers = this.switches.filter(s => s.gateR === r && s.gateC === c);
    if (!controllers.length) return true;
    return controllers.every(sw =>
      sw.latch ? (this._latched.has(sw.r + '_' + sw.c) || this.isSwitchLive(sw)) : this.isSwitchLive(sw)
    );
  }

  // Ô có bị chặn với chain đang hoạt động hay không (KHÔNG xử lý bomb ở đây —
  // bomb được xử lý riêng ở step() vì chạm bomb là LOSE chứ không đơn thuần BLOCKED).
  isOccupied(r, c, activeChainId) {
    if (!this.inBounds(r, c)) return true;
    if (this.isVoid(r, c)) return true;
    if (this.isRock(r, c)) return true;
    if (this.isPushRock(r, c)) return true;
    if (this.isGateCell(r, c) && !this.isGateOpenAt(r, c)) return true;

    const colorGate = this.colorGates.find(g => g.r === r && g.c === c);
    if (colorGate) {
      const chain = this.chains[activeChainId];
      if (!chain || chain.colorTag !== colorGate.color) return true;
    }

    for (const id in this.chains) {
      if (id === activeChainId) continue;
      if (this.chains[id].path.some(p => p.r === r && p.c === c)) return true;
    }
    return false;
  }

  // ---------- Điều khiển kéo dây ----------

  findChainByTail(r, c) {
    return this.getAllChains().find(ch => !ch.locked &&
      ch.path[ch.path.length - 1].r === r && ch.path[ch.path.length - 1].c === c);
  }
  findChainByAnchor(r, c) {
    return this.getAllChains().find(ch => !ch.locked && ch.row === r && ch.col === c);
  }

  startDrag(r, c) {
    let chain = this.findChainByTail(r, c);
    if (!chain) {
      chain = this.findChainByAnchor(r, c);
      if (chain) {
        chain.path = [{ r: chain.row, c: chain.col }];
        chain.colorTag = null;
        chain.waypointProgress = 0;
      }
    }
    if (!chain) return null;
    this.activeId = chain.id;
    return chain;
  }

  // Thử bước 1 ô từ đầu dây hiện tại sang (r,c).
  // Trả về { result: 'OK' | 'BLOCKED' | 'LOSE', reason? }
  step(r, c) {
    this.updateLatches();
    const chain = this.chains[this.activeId];
    if (!chain || chain.locked) return { result: 'BLOCKED' };

    const last = chain.path[chain.path.length - 1];
    const dr = r - last.r, dc = c - last.c;
    if (Math.abs(dr) + Math.abs(dc) !== 1) return { result: 'BLOCKED' };
    if (this.hasWallBetween(last.r, last.c, r, c)) return { result: 'BLOCKED' };
    if (chain.path.some(p => p.r === r && p.c === c)) return { result: 'BLOCKED' };
    if (chain.path.length >= chain.length) return { result: 'BLOCKED' };

    // MEC-02: Mũi Tên ép hướng bước kế tiếp
    const arrow = this.arrows.find(a => a.r === last.r && a.c === last.c);
    if (arrow) {
      const forced = { UP: [-1, 0], DOWN: [1, 0], LEFT: [0, -1], RIGHT: [0, 1] }[arrow.dir];
      if (dr !== forced[0] || dc !== forced[1]) return { result: 'BLOCKED' };
    }

    // MEC-03: Mật Mã Số — chạm đúng thứ tự
    const wpList = this.waypoints[chain.id];
    if (wpList) {
      const hitIdx = wpList.findIndex(w => w.r === r && w.c === c);
      if (hitIdx !== -1 && hitIdx !== chain.waypointProgress) return { result: 'BLOCKED' };
    }

    // MEC-05: chạm trực tiếp vào Bom còn nguyên vẹn = THUA NGAY
    if (this.isBombAlive(r, c)) {
      return { result: 'LOSE', reason: 'bomb' };
    }

    // MEC-01: Push Rock (Sokoban) — có thể phá Bom nếu đẩy trúng
    if (this.isPushRock(r, c)) {
      const beyondR = r + dr, beyondC = c + dc;
      if (!this.inBounds(beyondR, beyondC)) return { result: 'BLOCKED' };
      if (this.hasWallBetween(r, c, beyondR, beyondC)) return { result: 'BLOCKED' };

      if (this.isBombAlive(beyondR, beyondC)) {
        const rockIdx = this.pushRocks.findIndex(p => p.r === r && p.c === c);
        this.pushRocks.splice(rockIdx, 1);
        const bomb = this.bombs.find(b => b.r === beyondR && b.c === beyondC);
        bomb.destroyed = true;
      } else if (this.isOccupied(beyondR, beyondC, this.activeId)) {
        return { result: 'BLOCKED' };
      } else {
        const rock = this.pushRocks.find(p => p.r === r && p.c === c);
        rock.r = beyondR; rock.c = beyondC;
      }
    } else if (this.isOccupied(r, c, this.activeId)) {
      return { result: 'BLOCKED' };
    }

    chain.path.push({ r, c });

    // MEC-02: Lăng Kính đổi màu
    const prism = this.prisms.find(p => p.r === r && p.c === c);
    if (prism) chain.colorTag = prism.color;

    // MEC-03: tăng tiến độ nếu đúng mốc kế tiếp
    if (wpList && wpList[chain.waypointProgress] &&
        wpList[chain.waypointProgress].r === r && wpList[chain.waypointProgress].c === c) {
      chain.waypointProgress += 1;
    }

    return { result: 'OK' };
  }

  // Lùi dây về đúng vị trí index trong path (dùng khi người chơi kéo ngược lại).
  backtrackTo(index) {
    const chain = this.chains[this.activeId];
    if (!chain) return;
    chain.path = chain.path.slice(0, Math.max(0, index) + 1);

    // QUAN TRỌNG: phải tính lại waypointProgress/colorTag theo ĐÚNG path mới
    // sau khi cắt — nếu không, 2 cờ này vẫn giữ giá trị ứng với path DÀI HƠN
    // trước khi lùi. VD: đã chạm mốc số 3 (waypointProgress=3) rồi lùi dây
    // qua khỏi mốc số 1, waypointProgress vẫn kẹt ở 3, nên step() từ chối
    // ngay khi chạm lại mốc số 1 vì tưởng "sai thứ tự" (0 !== 3) — trong khi
    // thực tế dây đã lùi hẳn về trước cả mốc đó. Tương tự với colorTag nếu
    // lùi qua khỏi ô Lăng Kính đã đổi màu.
    const wpList = this.waypoints[chain.id];
    if (wpList) {
      let progress = 0;
      for (const p of chain.path) {
        if (wpList[progress] && wpList[progress].r === p.r && wpList[progress].c === p.c) progress++;
      }
      chain.waypointProgress = progress;
    }

    let colorTag = null;
    for (const p of chain.path) {
      const prism = this.prisms.find(pr => pr.r === p.r && pr.c === p.c);
      if (prism) colorTag = prism.color;
    }
    chain.colorTag = colorTag;
  }

  endDrag() {
    const chain = this.chains[this.activeId];
    if (!chain) return { locked: false };
    if (chain.path.length !== chain.length) return { locked: false };

    const wpList = this.waypoints[chain.id];
    if (wpList) {
      if (chain.waypointProgress < wpList.length) return { locked: false, error: 'waypoint-incomplete' };
      const lastWp = wpList[wpList.length - 1];
      const tail = chain.path[chain.path.length - 1];
      if (tail.r !== lastWp.r || tail.c !== lastWp.c) return { locked: false, error: 'waypoint-end-mismatch' };
    }

    chain.locked = true;
    // updateLatches() otherwise only runs at the top of step() — meaning a
    // chain's LAST cell (placed by the step() call right before this one)
    // never got a chance to register as a live Latch Switch, since no
    // further step() happens after it before the chain locks here. Without
    // this, a Latch Switch sitting exactly on a chain's final cell would
    // silently fail to latch.
    this.updateLatches();
    return { locked: true, win: this.isWon() };
  }
}
