// Generator sinh 30 màn/thể loại (7 thể loại = 210 màn), đảm bảo BẰNG THUẬT
// TOÁN (không phải dò tay) rằng mỗi màn phủ kín 100% ô khả dụng: sinh 1 đường
// đi Hamilton duy nhất qua toàn bộ ô trống của bàn cờ, rồi CẮT đường đó thành
// N đoạn liên tiếp cho N xích — vì đường Hamilton đi qua mỗi ô đúng 1 lần,
// việc cắt nó thành các đoạn liên tiếp tự động đảm bảo N xích phủ kín toàn bộ
// ô, không chồng lấn, không dư ô — và bản thân đường đi CHÍNH LÀ lời giải nên
// luôn giải được. Các cơ chế (mũi tên, waypoint, công tắc, bom...) được gắn
// TRÊN đường đi đã biết, nên tự động nhất quán với lời giải.
//
// Chạy: node scripts/gen-levels.mjs > /tmp/levels-body.js (rồi ghép thủ công),
// hoặc (mặc định) ghi thẳng đè lên src/data/levels.js.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ChainEngine } from '../src/engine/ChainEngine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '../src/data/levels.js');

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const DIR_NAME = (dr, dc) => (dr === -1 ? 'UP' : dr === 1 ? 'DOWN' : dc === -1 ? 'LEFT' : 'RIGHT');
const key = (r, c) => r + '_' + c;

// ---------------- Hamiltonian path finder (DFS + Warnsdorff) ----------------

function findHamPath(size, holeSet, start, forcedPrefix) {
  const total = size * size - holeSet.size;
  const visited = new Set();
  const path = [];

  function nbrs(r, c) {
    const out = [];
    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      const k = key(nr, nc);
      if (holeSet.has(k) || visited.has(k)) continue;
      out.push([nr, nc]);
    }
    return out;
  }

  let steps = 0;
  const LIMIT = 200000;
  function dfs(r, c) {
    if (++steps > LIMIT) return false;
    if (path.length === total) return true;
    let options = nbrs(r, c).map(([nr, nc]) => [nr, nc, nbrs(nr, nc).length]);
    options.sort((a, b) => a[2] - b[2]);
    for (const [nr, nc] of options) {
      visited.add(key(nr, nc));
      path.push([nr, nc]);
      if (dfs(nr, nc)) return true;
      visited.delete(key(nr, nc));
      path.pop();
    }
    return path.length === total;
  }

  if (holeSet.has(key(start[0], start[1]))) return null;
  visited.add(key(start[0], start[1]));
  path.push(start);
  if (forcedPrefix) {
    for (const [r, c] of forcedPrefix) {
      const k = key(r, c);
      if (holeSet.has(k) || visited.has(k)) return null;
      visited.add(k);
      path.push([r, c]);
    }
  }
  const [lr, lc] = path[path.length - 1];
  if (path.length === total) return path;
  return dfs(lr, lc) ? path : null;
}

function cornerStarts(size) {
  return [[0, 0], [0, size - 1], [size - 1, 0], [size - 1, size - 1]];
}

// ---------------- Cắt đường Hamilton thành N xích ----------------

function cutPath(path, chainCount) {
  const total = path.length;
  const base = Math.floor(total / chainCount);
  const lens = new Array(chainCount).fill(base);
  let rem = total - base * chainCount;
  for (let i = 0; i < rem; i++) lens[i % chainCount]++;
  const segs = [];
  let idx = 0;
  for (const len of lens) { segs.push(path.slice(idx, idx + len)); idx += len; }
  return segs;
}

const PALETTE = ['#1b5e8a', '#a82e2e', '#2a7b4c', '#8a6a10', '#6a4fb3'];
const IDS = ['A', 'B', 'C', 'D', 'E'];

function segsToAnchorsAndSolution(segs) {
  const anchors = [];
  const solution = {};
  segs.forEach((seg, i) => {
    const id = IDS[i];
    anchors.push({ id, row: seg[0][0], col: seg[0][1], length: seg.length, color: PALETTE[i % PALETTE.length] });
    solution[id] = seg.map(([r, c]) => [r, c]);
  });
  return { anchors, solution };
}

// Tìm 1 đường Hamilton hợp lệ trên lưới size x size trừ các ô hole, thử nhiều
// điểm xuất phát tới khi thành công (hoặc hết lượt thử).
function generatePath(size, holeSet, forcedPrefix) {
  const starts = forcedPrefix ? [forcedPrefix[0]] : [...cornerStarts(size), [Math.floor(size / 2), Math.floor(size / 2)]];
  for (const start of starts) {
    const rest = forcedPrefix ? forcedPrefix.slice(1) : null;
    const p = findHamPath(size, holeSet, start, rest);
    if (p) return p;
  }
  return null;
}

// ---------------- Kiến tạo cặp Push Rock -> Bom/hố (ép hướng đẩy thẳng) -----

// Chọn 1 ô "hole" H nằm sâu trong lưới (không viền) cùng 2 ô O,N thẳng hàng
// với H sao cho O->N->H thẳng hàng; ép đường Hamilton XUẤT PHÁT đúng tại O rồi
// bước ngay sang N — nhờ vậy N luôn có "hướng đi vào" đã biết trước, trùng
// đúng hướng cần đẩy đá vào H.
function planPushInto(size) {
  const mid = Math.floor(size / 2);
  const candidates = [];
  for (const [axis, sign] of [['row', 1], ['row', -1], ['col', 1], ['col', -1]]) {
    const h = axis === 'row' ? [mid, mid] : [mid, mid];
    candidates.push({ axis, sign, h: [mid, mid] });
  }
  // Thử vài vị trí H khác nhau quanh trung tâm để có phương án dự phòng.
  const hCells = [];
  for (let r = 1; r < size - 1; r++) for (let c = 1; c < size - 1; c++) hCells.push([r, c]);
  const plans = [];
  for (const h of hCells) {
    for (const [dr, dc] of DIRS) {
      const n = [h[0] - dr, h[1] - dc];
      const o = [h[0] - 2 * dr, h[1] - 2 * dc];
      if (o[0] < 0 || o[0] >= size || o[1] < 0 || o[1] >= size) continue;
      if (n[0] < 0 || n[0] >= size || n[1] < 0 || n[1] >= size) continue;
      plans.push({ h, n, o });
    }
  }
  return plans;
}

function buildWithPushInto(size, chainCount, extraHoles = []) {
  const plans = planPushInto(size);
  for (const plan of plans) {
    const holeSet = new Set([key(...plan.h), ...extraHoles.map(([r, c]) => key(r, c))]);
    const path = generatePath(size, holeSet, [plan.o, plan.n]);
    if (path) return { path, pushSource: plan.n, holeCell: plan.h };
  }
  return null;
}

// Thử nhiều phương án (size, số xích) trước khi bỏ cuộc — để KHÔNG BAO GIỜ
// phải rơi vào cơ chế khác (VD Vật Cản) chỉ vì 1 tổ hợp (size, chains) cụ thể
// không tìm được đường ép đẩy. Ưu tiên giữ đúng size/chains đề nghị trước,
// rồi mới nới lỏng dần.
function buildWithPushIntoRobust(size, chains) {
  const attempts = [
    [size, chains],
    [size, Math.max(2, chains - 1)],
    [size - 1, chains],
    [size - 1, Math.max(2, chains - 1)],
    [size + 1, chains]
  ];
  for (const [s, c] of attempts) {
    if (s < 4) continue;
    const built = buildWithPushInto(s, c);
    if (built) return { ...built, size: s, chains: c };
  }
  return null;
}

// ---------------- Tên & mô tả tự sinh ----------------

function chainWord(n) { return n === 2 ? 'Song Xích' : n === 3 ? 'Tam Xích' : n === 4 ? 'Tứ Xích' : `${n} Xích`; }

// ================= 1. NHẬP MÔN (không cơ chế) =================

function genNhapMon(idx) {
  const plan = [
    ...Array(6).fill({ size: 3, chains: 2 }),
    ...Array(6).fill({ size: 4, chains: 2 }),
    ...Array(6).fill({ size: 4, chains: 3 }),
    ...Array(6).fill({ size: 5, chains: 3 }),
    ...Array(4).fill({ size: 5, chains: 4 }),
    ...Array(2).fill({ size: 6, chains: 4 })
  ][idx];
  const { size, chains } = plan;
  const path = generatePath(size, new Set());
  const segs = cutPath(path, chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return {
    name: `Nhập Môn ${idx + 1}: ${chainWord(chains)} ${size}x${size}`,
    size, anchors, solution
  };
}

// ================= 2. VẬT CẢN (Rock / Wall / Push Rock) =================

function genVatCan(idx) {
  const tier = idx < 8 ? 'rock' : idx < 16 ? 'wall' : idx < 24 ? 'push' : 'mix';
  const size = idx < 10 ? 4 : idx < 22 ? 5 : 6;
  const chains = idx < 14 ? 2 : 3;

  if (tier === 'rock' || (tier === 'mix' && idx % 2 === 0)) {
    const rockCount = idx < 5 ? 1 : 2;
    for (let attempt = 0; attempt < 40; attempt++) {
      const cells = [];
      for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) cells.push([r, c]);
      // Xáo trộn rồi lấy rockCount ô ĐẦU — đảm bảo không trùng lặp (Math.random
      // độc lập từng lần dễ chọn trùng 1 ô, khiến `rocks` có 2 mục cùng toạ độ
      // và phá công thức phủ kín vì holeSet Set() sẽ tự khử trùng còn mảng thì
      // không).
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      const holes = cells.slice(0, rockCount);
      const holeSet = new Set(holes.map(([r, c]) => key(r, c)));
      const path = generatePath(size, holeSet);
      if (path) {
        const segs = cutPath(path, chains);
        const { anchors, solution } = segsToAnchorsAndSolution(segs);
        return {
          name: `Vật Cản ${idx + 1}: ${rockCount > 1 ? 'Nhiều Tảng Đá' : 'Tảng Đá Chặn Đường'}`,
          size, rocks: holes.map(([r, c]) => ({ r, c })), anchors, solution
        };
      }
    }
  }

  if (tier === 'wall' || tier === 'mix') {
    const path = generatePath(size, new Set());
    const inPath = new Set();
    for (let i = 0; i < path.length - 1; i++) inPath.add(path[i][0] + ',' + path[i][1] + '>' + path[i + 1][0] + ',' + path[i + 1][1]);
    const usedEdge = (r1, c1, r2, c2) => inPath.has(`${r1},${c1}>${r2},${c2}`) || inPath.has(`${r2},${c2}>${r1},${c1}`);
    const walls = [];
    const wallCount = idx < 12 ? 1 : 2;
    outer:
    for (let r = 0; r < size && walls.length < wallCount; r++) {
      for (let c = 0; c < size && walls.length < wallCount; c++) {
        for (const [dr, dc] of [[0, 1], [1, 0]]) {
          const r2 = r + dr, c2 = c + dc;
          if (r2 >= size || c2 >= size) continue;
          if (!usedEdge(r, c, r2, c2)) { walls.push({ r1: r, c1: c, r2, c2 }); if (walls.length >= wallCount) break outer; }
        }
      }
    }
    const segs = cutPath(path, chains);
    const { anchors, solution } = segsToAnchorsAndSolution(segs);
    return { name: `Vật Cản ${idx + 1}: Vách Ngăn Vô Hình`, size, walls, anchors, solution };
  }

  // push
  const built = buildWithPushIntoRobust(size, chains);
  if (built) {
    const segs = cutPath(built.path, built.chains);
    const { anchors, solution } = segsToAnchorsAndSolution(segs);
    return {
      name: `Vật Cản ${idx + 1}: Đẩy Đá Dọn Đường`,
      size: built.size, pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }], anchors, solution
    };
  }
  return genNhapMon(0); // fallback cực hiếm, không nên xảy ra
}

// ================= 3. ĐỊNH HƯỚNG & MÀU (Arrow / Prism / ColorGate) =================

const PRISM_COLORS = ['red', 'blue', 'green'];

function genDinhHuong(idx) {
  const size = idx < 10 ? 4 : idx < 22 ? 5 : 6;
  const chains = idx < 16 ? 2 : 3;
  const path = generatePath(size, new Set());
  const segs = cutPath(path, chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const arrows = [];
  const prisms = [];
  const colorGates = [];
  const color = PRISM_COLORS[idx % PRISM_COLORS.length];

  // Mũi tên: khoá 1 bước bất kỳ trong đoạn đầu của 1 xích theo ĐÚNG hướng
  // thật của lời giải (luôn nhất quán, không tạo ngã rẽ sai).
  const arrowChain = segs[0];
  if (arrowChain.length > 2) {
    const ai = 1;
    const [r, c] = arrowChain[ai];
    const [nr, nc] = arrowChain[ai + 1];
    arrows.push({ r, c, dir: DIR_NAME(nr - r, nc - c) });
  }

  // Lăng Kính + Cổng Màu trên 1 xích khác (hoặc cùng xích nếu chỉ có 1).
  const colorChain = segs[Math.min(1, segs.length - 1)];
  if (colorChain.length > 4) {
    const pi = 1, gi = colorChain.length - 2;
    if (gi > pi) {
      const [pr, pc] = colorChain[pi];
      const [gr, gc] = colorChain[gi];
      prisms.push({ r: pr, c: pc, color });
      colorGates.push({ r: gr, c: gc, color });
    }
  }

  if (idx >= 20 && segs.length > 2) {
    // Tier khó: thêm 1 mũi tên nữa trên xích thứ 3.
    const c3 = segs[2];
    if (c3.length > 2) {
      const [r, c] = c3[1]; const [nr, nc] = c3[2];
      arrows.push({ r, c, dir: DIR_NAME(nr - r, nc - c) });
    }
  }

  return {
    name: `Định Hướng ${idx + 1}: ${arrows.length && colorGates.length ? 'Mũi Tên + Cổng Màu' : arrows.length ? 'Mũi Tên Ép Lối' : 'Nhuộm Màu Qua Cổng'}`,
    size, arrows, prisms, colorGates, anchors, solution
  };
}

// ================= 4. MẬT MÃ SỐ (Waypoints) =================

function genMatMa(idx) {
  const size = idx < 8 ? 4 : idx < 18 ? 5 : idx < 26 ? 6 : 7;
  const chains = 1; // Mật Mã Số cổ điển dùng 1 xích dài phủ toàn bàn cờ.
  const path = generatePath(size, new Set());
  const segs = cutPath(path, chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const wpCount = Math.min(3 + Math.floor(idx / 4), 8);
  const chain = segs[0];
  const wpIdxs = [];
  for (let i = 1; i <= wpCount; i++) {
    wpIdxs.push(Math.round((i / wpCount) * (chain.length - 1)));
  }
  wpIdxs[wpIdxs.length - 1] = chain.length - 1; // mốc cuối PHẢI là ô cuối
  const seen = new Set();
  const waypoints = { A: [] };
  wpIdxs.forEach(i => {
    if (seen.has(i)) return;
    seen.add(i);
    const [r, c] = chain[i];
    waypoints.A.push({ r, c });
  });

  return { name: `Mật Mã ${idx + 1}: ${waypoints.A.length} Mốc Số`, size, waypoints, anchors, solution };
}

// ================= 5. CÔNG TẮC (Switch -> Gate, ±Latch) =================

function genCongTac(idx) {
  const size = idx < 10 ? 4 : idx < 22 ? 5 : 6;
  const chains = 2;
  const path = generatePath(size, new Set());
  const segs = cutPath(path, chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const crossChain = idx % 2 === 1 && segs.length > 1;
  const swChain = segs[0];
  const gateChain = crossChain ? segs[1] : segs[0];
  const swIdx = 1;
  const gateIdx = crossChain ? Math.max(1, gateChain.length - 2) : Math.min(swChain.length - 2, swIdx + 2);

  const [swR, swC] = swChain[swIdx];
  const [gR, gC] = gateChain[gateIdx];
  const latch = idx % 3 === 2;

  return {
    name: `Công Tắc ${idx + 1}: ${latch ? 'Chốt Khoá Vĩnh Viễn' : crossChain ? 'Mở Khoá Chéo Xích' : 'Mở Khoá Cơ Bản'}`,
    size, switches: [{ r: swR, c: swC, gateR: gR, gateC: gC, latch }], anchors, solution
  };
}

// ================= 6. BOM TĨNH (Push Rock phá Bom) =================

function genBomTinh(idx) {
  const size = idx < 10 ? 4 : idx < 22 ? 5 : 6;
  const chains = idx < 16 ? 2 : 3;
  const built = buildWithPushIntoRobust(size, chains);
  if (!built) throw new Error(`genBomTinh(${idx}): không tìm được cấu trúc Push+Bomb hợp lệ`);
  const segs = cutPath(built.path, built.chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return {
    name: `Bom Tĩnh ${idx + 1}: Phá Bom`,
    size: built.size,
    pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
    bombs: [{ r: built.holeCell[0], c: built.holeCell[1] }],
    anchors, solution
  };
}

// ================= 7. TỔNG HỢP (kết hợp 2-3 cơ chế) =================

function genTongHop(idx) {
  const size = idx < 10 ? 4 : idx < 22 ? 5 : 6;
  const chains = 2;
  const mode = idx % 3;

  if (mode === 0) {
    // Công Tắc + Đẩy Đá: switch mở gate dẫn tới ô có push rock.
    const built = buildWithPushIntoRobust(size, chains);
    if (built) {
      const segs = cutPath(built.path, built.chains);
      const { anchors, solution } = segsToAnchorsAndSolution(segs);
      const swChain = segs[0];
      // Cổng KHÔNG được trùng ô Push Rock/Bom: nhánh xử lý Push Rock trong
      // engine luôn được kiểm tra TRƯỚC nhánh Cổng (xem ChainEngine.step()),
      // nên đặt Cổng đè lên đúng ô đó sẽ khiến điều kiện Cổng bị bỏ qua hoàn
      // toàn, vô hiệu hoá cơ chế Công Tắc một cách âm thầm.
      const pushIdx = swChain.findIndex(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]);
      const swIdx = pushIdx === 1 ? 0 : 1;
      let gateIdx = Math.min(swChain.length - 2, swIdx + 2);
      if (gateIdx === pushIdx) gateIdx = Math.min(swChain.length - 2, gateIdx + 1);
      if (gateIdx <= swIdx) gateIdx = swIdx + 1;
      const [swR, swC] = swChain[swIdx];
      const [gR, gC] = swChain[gateIdx];
      return {
        name: `Tổng Hợp ${idx + 1}: Công Tắc + Đẩy Đá`,
        size: built.size, switches: [{ r: swR, c: swC, gateR: gR, gateC: gC }],
        pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
        anchors, solution
      };
    }
  }

  if (mode === 1) {
    // Cổng Màu + Mật Mã Số trên 1 xích.
    const path = generatePath(size, new Set());
    const segs = cutPath(path, 1);
    const { anchors, solution } = segsToAnchorsAndSolution(segs);
    const chain = segs[0];
    const color = PRISM_COLORS[idx % PRISM_COLORS.length];
    const pIdx = 1, gIdx = 2;
    const wpCount = 3;
    const wpIdxs = [gIdx, Math.round(chain.length * 0.6), chain.length - 1];
    const waypoints = { A: wpIdxs.map(i => ({ r: chain[i][0], c: chain[i][1] })) };
    return {
      name: `Tổng Hợp ${idx + 1}: Cổng Màu + Mật Mã Số`,
      size,
      prisms: [{ r: chain[pIdx][0], c: chain[pIdx][1], color }],
      colorGates: [{ r: chain[gIdx][0], c: chain[gIdx][1], color }],
      waypoints, anchors, solution
    };
  }

  // mode 2: Công Tắc + Đẩy Đá + Bom
  const built = buildWithPushIntoRobust(size, chains);
  if (!built) throw new Error(`genTongHop(${idx}) mode2: không tìm được cấu trúc Push+Bomb hợp lệ`);
  const segs = cutPath(built.path, built.chains);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  const pushChainIdx = segs.findIndex(s => s.some(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]));
  // Đặt Cổng trên xích KHÔNG chứa Push Rock/Bom (an toàn tuyệt đối khỏi việc
  // Cổng bị nhánh xử lý Push Rock trong engine "che khuất" — xem ghi chú ở
  // mode 0). Công Tắc đặt ở đầu chính xích đó.
  const gateChainIdx = pushChainIdx === 0 && segs.length > 1 ? 1 : 0;
  const gateChain = segs[gateChainIdx];
  const gIdx = Math.min(gateChain.length - 2, 2);
  const [gR, gC] = gateChain[gIdx];
  const swChain = segs[pushChainIdx];
  const pushIdx = swChain.findIndex(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]);
  const swIdx = pushIdx === 0 ? Math.min(swChain.length - 1, 1) : 0;
  const [swR, swC] = swChain[swIdx];
  return {
    name: `Tổng Hợp ${idx + 1}: Công Tắc + Đẩy Đá + Bom`,
    size: built.size,
    switches: [{ r: swR, c: swC, gateR: gR, gateC: gC }],
    pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
    bombs: [{ r: built.holeCell[0], c: built.holeCell[1] }],
    anchors, solution
  };
}

// ================= Build & Verify =================

const CATEGORY_SPECS = [
  { id: 'nhap-mon', title: 'Nhập Môn', icon: '🧭', mechanic: 'CORE', desc: 'Chạm điểm neo và kéo phủ kín bàn cờ với nhiều xích cùng lúc — luật gốc trước khi học các cơ chế khác.', gen: genNhapMon },
  { id: 'vat-can', title: 'Vật Cản', icon: '🪨', mechanic: 'MEC-01', desc: 'Rock chặn cứng, Wall chặn theo cạnh, Push Rock đẩy được để mở đường.', gen: genVatCan },
  { id: 'dinh-huong-mau', title: 'Định Hướng & Màu', icon: '🎨', mechanic: 'MEC-02', desc: 'Mũi Tên ép hướng bước kế tiếp; Lăng Kính đổi màu dây; Cổng Màu chỉ cho qua đúng màu.', gen: genDinhHuong },
  { id: 'mat-ma-so', title: 'Mật Mã Số', icon: '🔢', mechanic: 'MEC-03', desc: 'Chạm các mốc số theo ĐÚNG thứ tự tăng dần, kết thúc đúng tại mốc cuối cùng.', gen: genMatMa },
  { id: 'cong-tac', title: 'Công Tắc', icon: '🔘', mechanic: 'MEC-04', desc: 'Giữ 1 dây trên Công Tắc để mở Cổng cho dây khác; Latch giữ Cổng mở vĩnh viễn sau 1 lần kích hoạt.', gen: genCongTac },
  { id: 'bom-tinh', title: 'Bom Tĩnh', icon: '💣', mechanic: 'MEC-05', desc: 'Chạm trực tiếp vào Bom = thua ngay. Chỉ phá được Bom bằng cách đẩy Push Rock va vào.', gen: genBomTinh },
  { id: 'tong-hop', title: 'Tổng Hợp', icon: '⚔️', mechanic: 'COMBO', desc: 'Thử thách khó nhất — kết hợp 2-3 cơ chế lõi trong cùng 1 màn.', gen: genTongHop }
];

const LEVELS_PER_CATEGORY = 30;

function verifyLevel(levelDef) {
  const engine = new ChainEngine(levelDef);
  const sol = levelDef.solution;
  for (const chainId of Object.keys(sol)) {
    const path = sol[chainId];
    const chain = engine.startDrag(path[0][0], path[0][1]);
    if (!chain || chain.id !== chainId) return `startDrag fail ${chainId}`;
    for (let i = 1; i < path.length; i++) {
      const res = engine.step(path[i][0], path[i][1]);
      if (res.result !== 'OK') return `step fail ${chainId}[${i}] (${path[i]}): ${res.result} ${res.reason || ''}`;
    }
    const end = engine.endDrag();
    if (!end.locked) return `endDrag not locked ${chainId}: ${JSON.stringify(end)}`;
  }
  if (!engine.isWon()) return 'not won after all chains';
  return null;
}

function tryGen(spec, i) {
  try { return { lvl: spec.gen(i), err: null }; }
  catch (e) { return { lvl: null, err: e.message }; }
}

const categories = [];
let totalFail = 0;
for (const spec of CATEGORY_SPECS) {
  const levels = [];
  for (let i = 0; i < LEVELS_PER_CATEGORY; i++) {
    let { lvl, err } = tryGen(spec, i);
    if (lvl && !err) err = verifyLevel(lvl);
    let tries = 0;
    while (err && tries < 5) {
      ({ lvl, err } = tryGen(spec, i));
      if (lvl && !err) err = verifyLevel(lvl);
      tries++;
    }
    if (err || !lvl) {
      totalFail++;
      console.error(`FAIL ${spec.id}[${i}]: ${err}`);
      continue;
    }
    levels.push(lvl);
  }
  categories.push({ id: spec.id, title: spec.title, icon: spec.icon, mechanic: spec.mechanic, desc: spec.desc, levels });
  console.log(`${spec.id}: generated ${levels.length} levels`);
}

console.log(totalFail ? `\n${totalFail} LEVELS FAILED VERIFICATION` : '\nALL LEVELS VERIFIED OK');

// ---------------- Ghi ra src/data/levels.js ----------------

let out = `// File này được sinh tự động bởi scripts/gen-levels.mjs — KHÔNG sửa tay.
// Mỗi màn được kiến tạo từ 1 đường đi Hamilton duy nhất qua toàn bộ ô khả
// dụng của bàn cờ rồi cắt thành N đoạn cho N xích, nên LUÔN phủ kín 100% ô
// (đúng Win Condition ở GDD 3.3) và LUÔN có lời giải (chính là đường đã sinh,
// lưu lại trong trường \`solution\` của từng màn để dùng cho Buff Gợi Ý).

export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
`;

writeFileSync(OUT_FILE, out, 'utf-8');
console.log(`\nĐã ghi ${OUT_FILE}`);
