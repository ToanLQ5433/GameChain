// Generator sinh 30 màn/thể loại (7 thể loại = 210 màn), đảm bảo BẰNG THUẬT
// TOÁN (không phải dò tay) rằng mỗi màn phủ kín 100% ô khả dụng: sinh 1 đường
// đi Hamilton duy nhất qua toàn bộ ô khả dụng của bàn cờ, rồi CẮT đường đó
// thành N đoạn liên tiếp cho N xích — vì đường Hamilton đi qua mỗi ô đúng 1
// lần, việc cắt nó tự động đảm bảo N xích phủ kín toàn bộ, không chồng lấn,
// không dư ô — và bản thân đường đi CHÍNH LÀ lời giải nên luôn giải được. Cơ
// chế (mũi tên, waypoint, công tắc, bom...) được gắn TRÊN đường đã biết.
//
// Bàn cờ KHÔNG bắt buộc là hình vuông: mỗi màn có `rows`/`cols` riêng (nhiều
// tỉ lệ khung khác nhau) và một phần dùng thêm `shape` (mặt nạ '0'/'1') để
// khoét thành trái tim, ngôi sao, kim cương, chữ thập, vòng nhẫn, chữ L, chữ
// T... — nếu không có bước này, mọi màn cùng kích thước chỉ là CÙNG 1 hình
// vuông được xoay/lật khác góc xuất phát, chơi cảm giác giống hệt nhau (lỗi
// người dùng phản ánh ở bản trước).
//
// Mỗi màn còn dùng 1 seed RIÊNG để xáo trộn điểm xuất phát, phá hoà giữa các
// bước Warnsdorff, chọn vị trí chướng ngại và cách chia độ dài xích. Sau khi
// sinh xong, script đối chiếu CHỮ KÝ toàn bộ màn trong cùng thể loại và sinh
// lại (đổi seed) bất kỳ màn nào trùng với màn khác.
//
// Chạy: node scripts/gen-levels.mjs (ghi thẳng đè lên src/data/levels.js).

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ChainEngine } from '../src/engine/ChainEngine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '../src/data/levels.js');

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const DIR_NAME = (dr, dc) => (dr === -1 ? 'UP' : dr === 1 ? 'DOWN' : dc === -1 ? 'LEFT' : 'RIGHT');
const key = (r, c) => r + '_' + c;

// ---------------- RNG có seed (mulberry32) ----------------

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

// ---------------- Thư viện hình dạng bàn cờ (mặt nạ '0'/'1') ----------------
// '1' = ô dùng được, '0' = ô khoét bỏ (void, ẩn hẳn khỏi bàn cờ).

function maskFromRows(rows) { return rows; }

const HEART_5 = maskFromRows(['01100', '11110', '11111', '01110', '00100']);
const STAR_5 = maskFromRows(['00100', '11111', '01110', '11011', '10001']);

function shapeDiamond(n) {
  const mid = (n - 1) / 2;
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) row += (Math.abs(r - mid) + Math.abs(c - mid) <= mid) ? '1' : '0';
    rows.push(row);
  }
  return rows;
}
function shapeCross(n) {
  const armW = Math.max(2, Math.floor(n / 3));
  const lo = Math.floor((n - armW) / 2), hi = lo + armW - 1;
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) row += ((c >= lo && c <= hi) || (r >= lo && r <= hi)) ? '1' : '0';
    rows.push(row);
  }
  return rows;
}
function shapeRing(n) {
  const hs = Math.max(1, n - 4);
  const lo = Math.floor((n - hs) / 2), hi = lo + hs - 1;
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) row += (r >= lo && r <= hi && c >= lo && c <= hi) ? '0' : '1';
    rows.push(row);
  }
  return rows;
}
function shapeL(n) {
  const arm = Math.max(2, Math.floor(n / 2));
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) row += (c < arm || r >= n - arm) ? '1' : '0';
    rows.push(row);
  }
  return rows;
}
function shapeT(n) {
  const armW = Math.max(2, Math.floor(n / 3));
  const lo = Math.floor((n - armW) / 2), hi = lo + armW - 1;
  const topH = Math.max(2, Math.floor(n / 3));
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) row += (r < topH || (c >= lo && c <= hi)) ? '1' : '0';
    rows.push(row);
  }
  return rows;
}
function shapeZigzag(n) {
  const bandW = Math.max(2, Math.floor(n / 2));
  const rows = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    const lo = r < n / 2 ? 0 : n - bandW;
    const hi = r < n / 2 ? bandW - 1 : n - 1;
    for (let c = 0; c < n; c++) row += (c >= lo && c <= hi) ? '1' : '0';
    rows.push(row);
  }
  return rows;
}

const SHAPE_LIB = [
  { name: 'heart', n: 5, mask: HEART_5 },
  { name: 'star', n: 5, mask: STAR_5 },
  { name: 'diamond6', n: 6, mask: shapeDiamond(6) },
  { name: 'diamond7', n: 7, mask: shapeDiamond(7) },
  { name: 'cross7', n: 7, mask: shapeCross(7) },
  { name: 'ring7', n: 7, mask: shapeRing(7) },
  { name: 'L6', n: 6, mask: shapeL(6) },
  { name: 'T7', n: 7, mask: shapeT(7) },
  { name: 'zigzag6', n: 6, mask: shapeZigzag(6) }
];

function maskToHoleSet(mask) {
  const s = new Set();
  mask.forEach((row, r) => { for (let c = 0; c < row.length; c++) if (row[c] === '0') s.add(key(r, c)); });
  return s;
}
function maskCellCount(mask) { return mask.reduce((s, row) => s + [...row].filter(ch => ch === '1').length, 0); }
function maskFirstUsableCells(mask) {
  const cells = [];
  mask.forEach((row, r) => { for (let c = 0; c < row.length; c++) if (row[c] === '1') cells.push([r, c]); });
  return cells;
}

// Kế hoạch khung bàn cờ cho 1 màn: luân phiên giữa CHỮ NHẬT (nhiều tỉ lệ
// khác nhau, không chỉ hình vuông) và HÌNH DẠNG ĐẶC BIỆT (mặt nạ) — nếu chỉ
// dùng 1 kiểu khung xuyên suốt, các màn cùng "độ khó" sẽ luôn là cùng 1 hình
// vuông xoay/lật khác góc, cảm giác như nhau dù toạ độ khác nhau.
function boardPlan(idx, rng, { allowShape = true, minCells = 12, maxCells = 64, minSide = 3 } = {}) {
  const targetCells = Math.round(minCells + (maxCells - minCells) * Math.min(1, idx / 27));
  const useShape = allowShape && idx % 4 === 3; // 1 trong 4 màn dùng hình đặc biệt
  if (useShape) {
    const candidates = SHAPE_LIB.filter(s => Math.abs(maskCellCount(s.mask) - targetCells) < targetCells * 0.6);
    const shape = pick(candidates.length ? candidates : SHAPE_LIB, rng);
    return { rows: shape.n, cols: shape.n, shape: shape.mask, label: shape.name };
  }
  // Chữ nhật: chọn (rows, cols) sao cho rows*cols gần targetCells, tỉ lệ dài
  // rộng đổi ngẫu nhiên (không luôn vuông). `minSide` chặn bàn cờ quá hẹp (VD
  // 3xN) — với cơ chế Đẩy Đá/Bom, bàn quá hẹp thường không đủ chỗ để đặt cặp
  // ô thẳng hàng O-N-Bom theo bất kỳ hướng nào, khiến việc kiến tạo thất bại.
  const aspect = 0.6 + rng() * 0.9; // rows/cols trong khoảng ~[0.6, 1.5]
  let cols = Math.max(minSide, Math.round(Math.sqrt(targetCells / aspect)));
  let rows = Math.max(minSide, Math.round(targetCells / cols));
  cols = Math.min(7, cols); rows = Math.min(7, rows);
  return { rows, cols, shape: null, label: `${rows}x${cols}` };
}

// ---------------- Hamiltonian path finder (DFS + Warnsdorff + rng tie-break) --

function findHamPath(rows, cols, holeSet, start, forcedPrefix, rng) {
  const total = rows * cols - holeSet.size;
  const visited = new Set();
  const path = [];

  function nbrs(r, c) {
    const out = [];
    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const k = key(nr, nc);
      if (holeSet.has(k) || visited.has(k)) continue;
      out.push([nr, nc]);
    }
    return out;
  }

  let steps = 0;
  const LIMIT = 90000;
  function dfs(r, c) {
    if (++steps > LIMIT) return false;
    if (path.length === total) return true;
    let options = nbrs(r, c).map(([nr, nc]) => [nr, nc, nbrs(nr, nc).length + rng() * 0.9]);
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

function boxCorners(rows, cols) { return [[0, 0], [0, cols - 1], [rows - 1, 0], [rows - 1, cols - 1]]; }

// Tìm 1 đường Hamilton hợp lệ trên khung rows x cols trừ các ô trong holeSet
// (chướng ngại + ô ngoài hình dạng). Thử các điểm xuất phát theo THỨ TỰ NGẪU
// NHIÊN (seed riêng/màn) để 2 màn cùng khung vẫn ra hình dạng đường đi khác.
function generatePath(rows, cols, holeSet, forcedPrefix, rng) {
  if (forcedPrefix) return findHamPath(rows, cols, holeSet, forcedPrefix[0], forcedPrefix.slice(1), rng);
  const allCorners = boxCorners(rows, cols).filter(([r, c]) => !holeSet.has(key(r, c)));
  const usable = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (!holeSet.has(key(r, c))) usable.push([r, c]);
  const starts = shuffle([...allCorners, ...shuffle(usable, rng).slice(0, 2)], rng);
  for (const start of starts) {
    const p = findHamPath(rows, cols, holeSet, start, null, rng);
    if (p) return p;
  }
  return null;
}

// ---------------- Cắt đường Hamilton thành N xích (độ dài ngẫu nhiên hợp lệ) -

function cutPath(path, chainCount, rng, minLen = 4) {
  const total = path.length;
  const safeMin = Math.min(minLen, Math.max(2, Math.floor(total / chainCount / 2)));
  const weights = Array.from({ length: chainCount }, () => 0.6 + rng());
  const wsum = weights.reduce((a, b) => a + b, 0);
  const lens = weights.map(w => Math.max(safeMin, Math.floor((w / wsum) * total)));
  let diff = total - lens.reduce((a, b) => a + b, 0);
  const order = shuffle([...Array(chainCount).keys()], rng);
  let guard = 0;
  while (diff !== 0 && guard++ < chainCount * 2000) {
    const i = order[guard % chainCount];
    if (diff > 0) { lens[i]++; diff--; }
    else if (lens[i] > safeMin) { lens[i]--; diff++; }
  }
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

function baseLevel(plan) {
  const lvl = { rows: plan.rows, cols: plan.cols };
  if (plan.shape) lvl.shape = plan.shape;
  return lvl;
}

// ---------------- Kiến tạo cặp Push Rock -> Bom/hố (ép hướng đẩy thẳng) -----

function planPushInto(rows, cols, holeSet, rng) {
  const hCells = [];
  for (let r = 1; r < rows - 1; r++) for (let c = 1; c < cols - 1; c++) if (!holeSet.has(key(r, c))) hCells.push([r, c]);
  const plans = [];
  for (const h of hCells) {
    for (const [dr, dc] of DIRS) {
      const n = [h[0] - dr, h[1] - dc];
      const o = [h[0] - 2 * dr, h[1] - 2 * dc];
      if (o[0] < 0 || o[0] >= rows || o[1] < 0 || o[1] >= cols) continue;
      if (n[0] < 0 || n[0] >= rows || n[1] < 0 || n[1] >= cols) continue;
      if (holeSet.has(key(...n)) || holeSet.has(key(...o))) continue;
      plans.push({ h, n, o });
    }
  }
  return shuffle(plans, rng);
}

function buildWithPushInto(rows, cols, chainCount, rng) {
  const plans = planPushInto(rows, cols, new Set(), rng);
  for (const plan of plans) {
    const holeSet = new Set([key(...plan.h)]);
    const path = generatePath(rows, cols, holeSet, [plan.o, plan.n], rng);
    if (path) return { path, pushSource: plan.n, holeCell: plan.h };
  }
  return null;
}

// Thử nhiều phương án (rows, cols, số xích) trước khi bỏ cuộc — để KHÔNG BAO
// GIỜ phải rơi vào cơ chế khác chỉ vì 1 tổ hợp cụ thể không tìm được đường ép
// đẩy. Ưu tiên giữ đúng kích thước đề nghị trước, rồi mới nới lỏng dần.
function buildWithPushIntoRobust(rows, cols, chains, rng) {
  const attempts = [
    [rows, cols, chains],
    [rows, cols, Math.max(2, chains - 1)],
    [rows - 1, cols, chains],
    [rows, cols - 1, chains],
    [rows + 1, cols, chains],
    [rows, cols + 1, chains],
    [rows + 1, cols + 1, chains],
    [4, 5, Math.max(2, chains - 1)],
    [5, 4, Math.max(2, chains - 1)],
    [4, 4, 2] // phương án cuối cùng luôn khả thi — chỉ 1 hướng đẩy cũng đủ trên 4x4
  ];
  for (const [r, c, ch] of attempts) {
    if (r < 4 || c < 4) continue;
    const built = buildWithPushInto(r, c, ch, rng);
    if (built) return { ...built, rows: r, cols: c, chains: ch };
  }
  return null;
}

function randomHoles(rows, cols, count, rng, exclude = new Set()) {
  const cells = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (!exclude.has(key(r, c))) cells.push([r, c]);
  return shuffle(cells, rng).slice(0, count);
}

// ---------------- Tên & mô tả tự sinh ----------------

function chainWord(n) { return n === 2 ? 'Song Xích' : n === 3 ? 'Tam Xích' : n === 4 ? 'Tứ Xích' : `${n} Xích`; }

// ================= 1. NHẬP MÔN (không cơ chế) =================

function genNhapMon(idx, rng) {
  const chainsPlan = [2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5][idx];
  const plan = boardPlan(idx, rng, { minCells: 9, maxCells: 42 });
  const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
  const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
  if (!path) throw new Error(`genNhapMon(${idx}): không tìm được đường trên khung ${plan.label}`);
  const segs = cutPath(path, chainsPlan, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return {
    ...baseLevel(plan),
    name: `Nhập Môn ${idx + 1}: ${chainWord(chainsPlan)} ${plan.label}`,
    anchors, solution
  };
}

// ================= 2. VẬT CẢN (Rock / Wall / Push Rock) =================

function genVatCan(idx, rng) {
  const tier = idx < 8 ? 'rock' : idx < 16 ? 'wall' : idx < 24 ? 'push' : 'mix';
  const chains = idx < 14 ? 2 : 3;

  if (tier === 'rock' || (tier === 'mix' && idx % 2 === 0)) {
    const plan = boardPlan(idx, rng, { allowShape: false, minCells: 14, maxCells: 40 });
    const rockCount = idx < 5 ? 1 : 2;
    for (let attempt = 0; attempt < 40; attempt++) {
      const holes = randomHoles(plan.rows, plan.cols, rockCount, rng);
      const holeSet = new Set(holes.map(([r, c]) => key(r, c)));
      const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
      if (path) {
        const segs = cutPath(path, chains, rng);
        const { anchors, solution } = segsToAnchorsAndSolution(segs);
        return {
          ...baseLevel(plan),
          name: `Vật Cản ${idx + 1}: ${rockCount > 1 ? 'Nhiều Tảng Đá' : 'Tảng Đá Chặn Đường'}`,
          rocks: holes.map(([r, c]) => ({ r, c })), anchors, solution
        };
      }
    }
  }

  if (tier === 'wall' || tier === 'mix') {
    const plan = boardPlan(idx, rng, { minCells: 14, maxCells: 40 });
    const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
    const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
    if (!path) throw new Error(`genVatCan(${idx}) wall: không tìm được đường trên khung ${plan.label}`);
    const inPath = new Set();
    for (let i = 0; i < path.length - 1; i++) inPath.add(path[i][0] + ',' + path[i][1] + '>' + path[i + 1][0] + ',' + path[i + 1][1]);
    const usedEdge = (r1, c1, r2, c2) => inPath.has(`${r1},${c1}>${r2},${c2}`) || inPath.has(`${r2},${c2}>${r1},${c1}`);
    const candidateEdges = [];
    for (let r = 0; r < plan.rows; r++) {
      for (let c = 0; c < plan.cols; c++) {
        if (holeSet.has(key(r, c))) continue;
        for (const [dr, dc] of [[0, 1], [1, 0]]) {
          const r2 = r + dr, c2 = c + dc;
          if (r2 >= plan.rows || c2 >= plan.cols || holeSet.has(key(r2, c2))) continue;
          if (!usedEdge(r, c, r2, c2)) candidateEdges.push({ r1: r, c1: c, r2, c2 });
        }
      }
    }
    const wallCount = idx < 12 ? 1 : 2;
    const walls = shuffle(candidateEdges, rng).slice(0, wallCount);
    const segs = cutPath(path, chains, rng);
    const { anchors, solution } = segsToAnchorsAndSolution(segs);
    return { ...baseLevel(plan), name: `Vật Cản ${idx + 1}: Vách Ngăn Vô Hình`, walls, anchors, solution };
  }

  // push
  const rectPlan = boardPlan(idx, rng, { allowShape: false, minCells: 14, maxCells: 36, minSide: 4 });
  const built = buildWithPushIntoRobust(rectPlan.rows, rectPlan.cols, chains, rng);
  if (built) {
    const segs = cutPath(built.path, built.chains, rng);
    const { anchors, solution } = segsToAnchorsAndSolution(segs);
    return {
      rows: built.rows, cols: built.cols,
      name: `Vật Cản ${idx + 1}: Đẩy Đá Dọn Đường`,
      pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }], anchors, solution
    };
  }
  throw new Error(`genVatCan(${idx}): không tìm được cấu trúc hợp lệ`);
}

// ================= 3. ĐỊNH HƯỚNG & MÀU (Arrow / Prism / ColorGate) =================

const PRISM_COLORS = ['red', 'blue', 'green'];

function genDinhHuong(idx, rng) {
  const chains = idx < 16 ? 2 : 3;
  const plan = boardPlan(idx, rng, { minCells: 14, maxCells: 40 });
  const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
  const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
  if (!path) throw new Error(`genDinhHuong(${idx}): không tìm được đường trên khung ${plan.label}`);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const arrows = [];
  const prisms = [];
  const colorGates = [];
  const color = pick(PRISM_COLORS, rng);

  const arrowChainIdx = Math.floor(rng() * segs.length);
  const arrowChain = segs[arrowChainIdx];
  if (arrowChain.length > 2) {
    const ai = 1 + Math.floor(rng() * (arrowChain.length - 2));
    const [r, c] = arrowChain[ai];
    const [nr, nc] = arrowChain[ai + 1];
    arrows.push({ r, c, dir: DIR_NAME(nr - r, nc - c) });
  }

  const colorChainIdx = segs.length > 1 ? (arrowChainIdx + 1) % segs.length : 0;
  const colorChain = segs[colorChainIdx];
  if (colorChain.length > 4) {
    const pi = 1;
    const gi = Math.min(colorChain.length - 2, pi + 2 + Math.floor(rng() * (colorChain.length - pi - 3)));
    if (gi > pi) {
      const [pr, pc] = colorChain[pi];
      const [gr, gc] = colorChain[gi];
      prisms.push({ r: pr, c: pc, color });
      colorGates.push({ r: gr, c: gc, color });
    }
  }

  if (idx >= 20 && segs.length > 2) {
    const c3idx = (colorChainIdx + 1) % segs.length;
    const c3 = segs[c3idx];
    if (c3.length > 2) {
      const ai2 = 1 + Math.floor(rng() * (c3.length - 2));
      const [r, c] = c3[ai2]; const [nr, nc] = c3[ai2 + 1];
      arrows.push({ r, c, dir: DIR_NAME(nr - r, nc - c) });
    }
  }

  return {
    ...baseLevel(plan),
    name: `Định Hướng ${idx + 1}: ${arrows.length && colorGates.length ? 'Mũi Tên + Cổng Màu' : arrows.length ? 'Mũi Tên Ép Lối' : 'Nhuộm Màu Qua Cổng'}`,
    arrows, prisms, colorGates, anchors, solution
  };
}

// ================= 4. MẬT MÃ SỐ (Waypoints) =================

function genMatMa(idx, rng) {
  const chains = 1; // Mật Mã Số cổ điển dùng 1 xích dài phủ toàn bàn cờ.
  const plan = boardPlan(idx, rng, { minCells: 14, maxCells: 44 });
  const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
  const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
  if (!path) throw new Error(`genMatMa(${idx}): không tìm được đường trên khung ${plan.label}`);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const wpCount = Math.min(3 + Math.floor(idx / 4), 8);
  const chain = segs[0];
  const wpIdxs = [];
  for (let i = 1; i <= wpCount; i++) {
    const jitter = Math.round((rng() - 0.5) * (chain.length / wpCount) * 0.6);
    wpIdxs.push(Math.max(1, Math.min(chain.length - 1, Math.round((i / wpCount) * (chain.length - 1)) + jitter)));
  }
  wpIdxs[wpIdxs.length - 1] = chain.length - 1;
  wpIdxs.sort((a, b) => a - b);
  const seen = new Set();
  const waypoints = { A: [] };
  wpIdxs.forEach(i => {
    if (seen.has(i)) return;
    seen.add(i);
    const [r, c] = chain[i];
    waypoints.A.push({ r, c });
  });

  return { ...baseLevel(plan), name: `Mật Mã ${idx + 1}: ${waypoints.A.length} Mốc Số`, waypoints, anchors, solution };
}

// ================= 5. CÔNG TẮC (Switch -> Gate, ±Latch) =================

function genCongTac(idx, rng) {
  const chains = 2;
  const plan = boardPlan(idx, rng, { minCells: 14, maxCells: 40 });
  const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
  const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
  if (!path) throw new Error(`genCongTac(${idx}): không tìm được đường trên khung ${plan.label}`);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);

  const crossChain = idx % 2 === 1 && segs.length > 1;
  const swChain = segs[0];
  const gateChain = crossChain ? segs[1] : segs[0];
  const swIdx = 1 + Math.floor(rng() * Math.max(1, Math.floor(swChain.length / 3)));
  const gateMin = crossChain ? 1 : swIdx + 1;
  const gateMax = gateChain.length - 2;
  const gateIdx = gateMax > gateMin ? gateMin + Math.floor(rng() * (gateMax - gateMin)) : gateMax;

  const [swR, swC] = swChain[swIdx];
  const [gR, gC] = gateChain[Math.max(gateMin, Math.min(gateMax, gateIdx))];
  const latch = idx % 3 === 2;

  return {
    ...baseLevel(plan),
    name: `Công Tắc ${idx + 1}: ${latch ? 'Chốt Khoá Vĩnh Viễn' : crossChain ? 'Mở Khoá Chéo Xích' : 'Mở Khoá Cơ Bản'}`,
    switches: [{ r: swR, c: swC, gateR: gR, gateC: gC, latch }], anchors, solution
  };
}

// ================= 6. BOM TĨNH (Push Rock phá Bom) =================

function genBomTinh(idx, rng) {
  const chains = idx < 16 ? 2 : 3;
  const plan = boardPlan(idx, rng, { allowShape: false, minCells: 14, maxCells: 36, minSide: 4 });
  const built = buildWithPushIntoRobust(plan.rows, plan.cols, chains, rng);
  if (!built) throw new Error(`genBomTinh(${idx}): không tìm được cấu trúc Push+Bomb hợp lệ`);
  const segs = cutPath(built.path, built.chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return {
    rows: built.rows, cols: built.cols,
    name: `Bom Tĩnh ${idx + 1}: Phá Bom`,
    pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
    bombs: [{ r: built.holeCell[0], c: built.holeCell[1] }],
    anchors, solution
  };
}

// ================= 7. TỔNG HỢP (kết hợp 2-3 cơ chế) =================

function genTongHop(idx, rng) {
  const chains = 2;
  const mode = idx % 3;

  if (mode === 0) {
    const plan = boardPlan(idx, rng, { allowShape: false, minCells: 14, maxCells: 36, minSide: 4 });
    const built = buildWithPushIntoRobust(plan.rows, plan.cols, chains, rng);
    if (built) {
      const segs = cutPath(built.path, built.chains, rng);
      const { anchors, solution } = segsToAnchorsAndSolution(segs);
      const swChain = segs[0];
      const pushIdx = swChain.findIndex(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]);
      const swIdx = pushIdx === 1 ? 0 : 1;
      let gateIdx = Math.min(swChain.length - 2, swIdx + 2 + Math.floor(rng() * 2));
      if (gateIdx === pushIdx) gateIdx = Math.min(swChain.length - 2, gateIdx + 1);
      if (gateIdx <= swIdx) gateIdx = swIdx + 1;
      const [swR, swC] = swChain[swIdx];
      const [gR, gC] = swChain[gateIdx];
      return {
        rows: built.rows, cols: built.cols,
        name: `Tổng Hợp ${idx + 1}: Công Tắc + Đẩy Đá`,
        switches: [{ r: swR, c: swC, gateR: gR, gateC: gC }],
        pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
        anchors, solution
      };
    }
  }

  if (mode === 1) {
    const plan = boardPlan(idx, rng, { minCells: 14, maxCells: 40 });
    const holeSet = plan.shape ? maskToHoleSet(plan.shape) : new Set();
    const path = generatePath(plan.rows, plan.cols, holeSet, null, rng);
    if (path) {
      const segs = cutPath(path, 1, rng);
      const { anchors, solution } = segsToAnchorsAndSolution(segs);
      const chain = segs[0];
      const color = pick(PRISM_COLORS, rng);
      const pIdx = 1, gIdx = 2 + Math.floor(rng() * 2);
      const wpIdxs = [gIdx, Math.min(chain.length - 2, gIdx + 1 + Math.floor(rng() * Math.max(1, chain.length - gIdx - 2))), chain.length - 1];
      const waypoints = { A: [...new Set(wpIdxs)].sort((a, b) => a - b).map(i => ({ r: chain[i][0], c: chain[i][1] })) };
      return {
        ...baseLevel(plan),
        name: `Tổng Hợp ${idx + 1}: Cổng Màu + Mật Mã Số`,
        prisms: [{ r: chain[pIdx][0], c: chain[pIdx][1], color }],
        colorGates: [{ r: chain[gIdx][0], c: chain[gIdx][1], color }],
        waypoints, anchors, solution
      };
    }
  }

  // mode 2: Công Tắc + Đẩy Đá + Bom
  const plan2 = boardPlan(idx, rng, { allowShape: false, minCells: 14, maxCells: 36, minSide: 4 });
  const built = buildWithPushIntoRobust(plan2.rows, plan2.cols, chains, rng);
  if (!built) throw new Error(`genTongHop(${idx}) mode2: không tìm được cấu trúc Push+Bomb hợp lệ`);
  const segs = cutPath(built.path, built.chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  const pushChainIdx = segs.findIndex(s => s.some(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]));
  const gateChainIdx = pushChainIdx === 0 && segs.length > 1 ? 1 : 0;
  const gateChain = segs[gateChainIdx];
  const gIdx = Math.min(gateChain.length - 2, 2 + Math.floor(rng() * 2));
  const [gR, gC] = gateChain[gIdx];
  const swChain = segs[pushChainIdx];
  const pushIdx = swChain.findIndex(([r, c]) => r === built.pushSource[0] && c === built.pushSource[1]);
  const swIdx = pushIdx === 0 ? Math.min(swChain.length - 1, 1) : 0;
  const [swR, swC] = swChain[swIdx];
  return {
    rows: built.rows, cols: built.cols,
    name: `Tổng Hợp ${idx + 1}: Công Tắc + Đẩy Đá + Bom`,
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
const MAX_ATTEMPTS = 10;

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

// Chữ ký "hình dạng bàn cờ" dùng để phát hiện trùng lặp.
function boardSignature(lvl) {
  const norm = (arr) => (arr || []).map(o => JSON.stringify(o)).sort();
  return JSON.stringify({
    rows: lvl.rows, cols: lvl.cols, shape: lvl.shape || null,
    anchors: norm((lvl.anchors || []).map(a => ({ row: a.row, col: a.col, length: a.length }))),
    rocks: norm(lvl.rocks), walls: norm(lvl.walls), pushRocks: norm(lvl.pushRocks),
    bombs: norm(lvl.bombs), switches: norm(lvl.switches), arrows: norm(lvl.arrows),
    prisms: norm(lvl.prisms), colorGates: norm(lvl.colorGates),
    waypoints: lvl.waypoints ? norm(Object.values(lvl.waypoints).flat()) : null
  });
}

function tryGen(spec, i, seedSalt) {
  const rng = mulberry32(hashSeed(`${spec.id}:${i}:${seedSalt}`));
  try { return { lvl: spec.gen(i, rng), err: null }; }
  catch (e) { return { lvl: null, err: e.message }; }
}

const categories = [];
let totalFail = 0;
for (const spec of CATEGORY_SPECS) {
  const levels = [];
  const usedSignatures = new Set();
  for (let i = 0; i < LEVELS_PER_CATEGORY; i++) {
    let lvl = null, err = null, sig = null;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const res = tryGen(spec, i, attempt);
      if (!res.lvl) { err = res.err; continue; }
      const vErr = verifyLevel(res.lvl);
      if (vErr) { err = vErr; continue; }
      const s = boardSignature(res.lvl);
      if (usedSignatures.has(s)) {
        if (attempt === MAX_ATTEMPTS - 1) { lvl = res.lvl; sig = s; }
        err = 'duplicate signature';
        continue;
      }
      lvl = res.lvl; sig = s; err = null;
      break;
    }
    if (!lvl) {
      totalFail++;
      console.error(`FAIL ${spec.id}[${i}]: ${err}`);
      continue;
    }
    usedSignatures.add(sig);
    levels.push(lvl);
  }
  categories.push({ id: spec.id, title: spec.title, icon: spec.icon, mechanic: spec.mechanic, desc: spec.desc, levels });
  console.log(`${spec.id}: generated ${levels.length} levels (${usedSignatures.size} unique boards)`);
}

console.log(totalFail ? `\n${totalFail} LEVELS FAILED VERIFICATION` : '\nALL LEVELS VERIFIED OK');

// ---------------- Ghi ra src/data/levels.js ----------------

let out = `// File này được sinh tự động bởi scripts/gen-levels.mjs — KHÔNG sửa tay.
// Mỗi màn được kiến tạo từ 1 đường đi Hamilton duy nhất qua toàn bộ ô khả
// dụng của bàn cờ (rows x cols, có thể khoét theo \`shape\`) rồi cắt thành N
// đoạn cho N xích, nên LUÔN phủ kín 100% ô (đúng Win Condition ở GDD 3.3) và
// LUÔN có lời giải (chính là đường đã sinh, lưu ở trường \`solution\` — dùng
// cho Buff Gợi Ý). Mỗi màn dùng 1 seed riêng và đã đối chiếu để không trùng
// bàn cờ với màn khác trong cùng thể loại.

export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
`;

writeFileSync(OUT_FILE, out, 'utf-8');
console.log(`\nĐã ghi ${OUT_FILE}`);
