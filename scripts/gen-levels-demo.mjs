// Sinh lại 18 màn demo (src/data/levels.demo.js — bộ level riêng cho build
// offline single-file, xem vite.offline.config.js) bằng ĐÚNG cơ chế Hamilton
// path đã kiểm chứng của scripts/gen-levels.mjs (đường đi Hamilton qua toàn
// bộ ô khả dụng rồi cắt thành N xích), thay cho bộ 18 màn cũ vốn không có
// trường `solution` (Hint/tutorial im lặng không hoạt động) và có 1-3 ô
// trống trên mỗi màn (xem scripts/audit-coverage.mjs).
//
// Giữ đúng lộ trình dạy cơ chế của bộ cũ: 3 màn trống -> 3 màn Vách Ngăn ->
// 3 màn Rạn Đá Ngầm -> 3 màn Thùng Hàng -> 3 màn Phao Tiêu -> 3 màn Công Tắc.
//
// Chạy: node scripts/gen-levels-demo.mjs (ghi thẳng đè lên src/data/levels.demo.js).

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { ChainEngine } from '../src/engine/ChainEngine.js';
import {
  hashSeed, mulberry32, generatePath, cutPath, segsToAnchorsAndSolution,
  randomHoles, buildWithPushIntoRobust
} from './gen-levels.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = join(__dirname, '../src/data/levels.demo.js');
const key = (r, c) => r + '_' + c;

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

// -------- Nhóm 1: Bàn cờ trống (chỉ luyện quy hoạch đường đi) --------

function genEmpty({ rows, cols, chains, rng }) {
  const path = generatePath(rows, cols, new Set(), null, rng);
  if (!path) throw new Error(`genEmpty: no path on ${rows}x${cols}`);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return { rows, cols, anchors, solution };
}

// -------- Nhóm 2: Vách Ngăn (walls) --------

function genWalls({ rows, cols, chains, wallCount, rng }) {
  const path = generatePath(rows, cols, new Set(), null, rng);
  if (!path) throw new Error(`genWalls: no path on ${rows}x${cols}`);
  const inPath = new Set();
  for (let i = 0; i < path.length - 1; i++) inPath.add(path[i][0] + ',' + path[i][1] + '>' + path[i + 1][0] + ',' + path[i + 1][1]);
  const usedEdge = (r1, c1, r2, c2) => inPath.has(`${r1},${c1}>${r2},${c2}`) || inPath.has(`${r2},${c2}>${r1},${c1}`);
  const candidateEdges = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const r2 = r + dr, c2 = c + dc;
        if (r2 >= rows || c2 >= cols) continue;
        if (!usedEdge(r, c, r2, c2)) candidateEdges.push({ r1: r, c1: c, r2, c2 });
      }
    }
  }
  const shuffled = candidateEdges.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const walls = shuffled.slice(0, wallCount);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  return { rows, cols, walls, anchors, solution };
}

// -------- Nhóm 3: Rạn Đá Ngầm (static rocks) --------

function genRocks({ rows, cols, chains, rockCount, rng }) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const holes = randomHoles(rows, cols, rockCount, rng);
    const holeSet = new Set(holes.map(([r, c]) => key(r, c)));
    const path = generatePath(rows, cols, holeSet, null, rng);
    if (path) {
      const segs = cutPath(path, chains, rng);
      const { anchors, solution } = segsToAnchorsAndSolution(segs);
      return { rows, cols, rocks: holes.map(([r, c]) => ({ r, c })), anchors, solution };
    }
  }
  throw new Error(`genRocks: no valid layout on ${rows}x${cols}`);
}

// -------- Nhóm 4: Thùng Hàng (push rocks, không có Bom) --------

function genPushRocks({ rows, cols, chains, extraWall, rng }) {
  const built = buildWithPushIntoRobust(rows, cols, chains, rng);
  if (!built) throw new Error(`genPushRocks: no valid structure on ${rows}x${cols}`);
  const segs = cutPath(built.path, built.chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  const lvl = {
    rows: built.rows, cols: built.cols,
    pushRocks: [{ r: built.pushSource[0], c: built.pushSource[1] }],
    anchors, solution
  };
  if (extraWall) {
    // Thêm 1 Vách Ngăn trên 1 cạnh KHÔNG thuộc đường đi đã sinh, để dạy kết
    // hợp Vách Ngăn + Thùng Hàng mà không phá lời giải đã có.
    const path = built.path;
    const inPath = new Set();
    for (let i = 0; i < path.length - 1; i++) inPath.add(path[i][0] + ',' + path[i][1] + '>' + path[i + 1][0] + ',' + path[i + 1][1]);
    const usedEdge = (r1, c1, r2, c2) => inPath.has(`${r1},${c1}>${r2},${c2}`) || inPath.has(`${r2},${c2}>${r1},${c1}`);
    const candidates = [];
    for (let r = 0; r < built.rows; r++) {
      for (let c = 0; c < built.cols; c++) {
        for (const [dr, dc] of [[0, 1], [1, 0]]) {
          const r2 = r + dr, c2 = c + dc;
          if (r2 >= built.rows || c2 >= built.cols) continue;
          if (r === built.holeCell[0] && c === built.holeCell[1]) continue;
          if (r2 === built.holeCell[0] && c2 === built.holeCell[1]) continue;
          if (!usedEdge(r, c, r2, c2)) candidates.push({ r1: r, c1: c, r2, c2 });
        }
      }
    }
    if (candidates.length) lvl.walls = [candidates[Math.floor(rng() * candidates.length)]];
  }
  return lvl;
}

// -------- Nhóm 5: Phao Tiêu Hải Trình (waypoints, 1 xích) --------

function genWaypoints({ rows, cols, wpCount, rng }) {
  const path = generatePath(rows, cols, new Set(), null, rng);
  if (!path) throw new Error(`genWaypoints: no path on ${rows}x${cols}`);
  const segs = cutPath(path, 1, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  const chain = segs[0];
  const wpIdxs = [];
  for (let i = 1; i <= wpCount; i++) {
    wpIdxs.push(Math.max(1, Math.min(chain.length - 1, Math.round((i / wpCount) * (chain.length - 1)))));
  }
  wpIdxs[wpIdxs.length - 1] = chain.length - 1;
  const seen = new Set();
  const waypoints = { A: [] };
  wpIdxs.forEach(i => {
    if (seen.has(i)) return;
    seen.add(i);
    const [r, c] = chain[i];
    waypoints.A.push({ r, c });
  });
  return { rows, cols, waypoints, anchors, solution };
}

// -------- Nhóm 6: Khóa Mỏ Neo (switch -> gate) --------

function genSwitches({ rows, cols, chains, rng }) {
  const path = generatePath(rows, cols, new Set(), null, rng);
  if (!path) throw new Error(`genSwitches: no path on ${rows}x${cols}`);
  const segs = cutPath(path, chains, rng);
  const { anchors, solution } = segsToAnchorsAndSolution(segs);
  const swChain = segs[0];
  const gateChain = segs.length > 1 ? segs[1] : segs[0];
  const swIdx = Math.max(1, Math.floor(swChain.length / 3));
  const gateMin = gateChain === swChain ? swIdx + 1 : 1;
  const gateMax = gateChain.length - 2;
  const gateIdx = Math.max(gateMin, Math.min(gateMax, gateMin + Math.floor(rng() * Math.max(1, gateMax - gateMin))));
  const [swR, swC] = swChain[swIdx];
  const [gR, gC] = gateChain[gateIdx];
  return { rows, cols, switches: [{ r: swR, c: swC, gateR: gR, gateC: gC, latch: false }], anchors, solution };
}

// ================= Kế hoạch 18 màn (giữ đúng lộ trình dạy cơ chế cũ) =================

const NOTE_EMPTY = 'Bàn cờ trống — chỉ luyện quy hoạch đường đi.';
const NOTE_WALL = 'Cơ chế: Xác Tàu Đắm.';
const NOTE_ROCK = 'Cơ chế: Rạn Đá Ngầm.';
const NOTE_PUSH = 'Cơ chế: Thùng Hàng.';
const NOTE_PUSH_WALL = 'Cơ chế: Xác Tàu Đắm, Thùng Hàng.';
const NOTE_WAYPOINT = 'Cơ chế: Phao Tiêu Hải Trình.';
const NOTE_SWITCH = 'Cơ chế: Khóa Mỏ Neo.';

const PLAN = [
  { name: 'Demo 1: Level0', note: NOTE_EMPTY, build: rng => genEmpty({ rows: 3, cols: 3, chains: 1, rng }) },
  { name: 'Demo 2: Level1', note: NOTE_EMPTY, build: rng => genEmpty({ rows: 3, cols: 3, chains: 2, rng }) },
  { name: 'Demo 3: Level2', note: NOTE_EMPTY, build: rng => genEmpty({ rows: 3, cols: 4, chains: 2, rng }) },

  { name: 'Demo 4: Level 3', note: NOTE_WALL, build: rng => genWalls({ rows: 4, cols: 4, chains: 2, wallCount: 1, rng }) },
  { name: 'Demo 5: Level 4', note: NOTE_WALL, build: rng => genWalls({ rows: 4, cols: 4, chains: 3, wallCount: 1, rng }) },
  { name: 'Demo 6: Level 5', note: NOTE_WALL, build: rng => genWalls({ rows: 4, cols: 5, chains: 3, wallCount: 2, rng }) },

  { name: 'Demo 7: Level 6', note: NOTE_ROCK, build: rng => genRocks({ rows: 3, cols: 3, chains: 1, rockCount: 1, rng }) },
  { name: 'Demo 8: Level 7', note: NOTE_ROCK, build: rng => genRocks({ rows: 3, cols: 4, chains: 2, rockCount: 1, rng }) },
  { name: 'Demo 9: Level 8', note: NOTE_ROCK, build: rng => genRocks({ rows: 5, cols: 4, chains: 2, rockCount: 2, rng }) },

  { name: 'Demo 10: Level 9', note: NOTE_PUSH, build: rng => genPushRocks({ rows: 4, cols: 4, chains: 1, rng }) },
  { name: 'Demo 11: Level 10', note: NOTE_PUSH, build: rng => genPushRocks({ rows: 4, cols: 5, chains: 2, rng }) },
  { name: 'Demo 12: Level 11', note: NOTE_PUSH_WALL, build: rng => genPushRocks({ rows: 4, cols: 5, chains: 2, extraWall: true, rng }) },

  { name: 'Demo 13: Level 12', note: NOTE_WAYPOINT, build: rng => genWaypoints({ rows: 3, cols: 3, wpCount: 3, rng }) },
  { name: 'Demo 14: Level 13', note: NOTE_WAYPOINT, build: rng => genWaypoints({ rows: 4, cols: 4, wpCount: 4, rng }) },
  { name: 'Demo 15: Level 14', note: NOTE_WAYPOINT, build: rng => genWaypoints({ rows: 4, cols: 5, wpCount: 5, rng }) },

  { name: 'Demo 16: Level 15', note: NOTE_SWITCH, build: rng => genSwitches({ rows: 2, cols: 3, chains: 1, rng }) },
  { name: 'Demo 17: Level 16', note: NOTE_SWITCH, build: rng => genSwitches({ rows: 6, cols: 4, chains: 2, rng }) },
  { name: 'Demo 18: Level 17', note: NOTE_SWITCH, build: rng => genSwitches({ rows: 7, cols: 7, chains: 2, rng }) }
];

const MAX_ATTEMPTS = 20;
const levels = [];
let totalFail = 0;

PLAN.forEach((plan, i) => {
  let lvl = null, err = null;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const rng = mulberry32(hashSeed(`demo:${i}:${attempt}`));
    try {
      const built = plan.build(rng);
      const candidate = { tier: 'demo', name: plan.name, note: plan.note, ...built };
      const vErr = verifyLevel(candidate);
      if (vErr) { err = vErr; continue; }
      lvl = candidate;
      break;
    } catch (e) {
      err = e.message;
    }
  }
  if (!lvl) {
    totalFail++;
    console.error(`FAIL demo[${i}] ${plan.name}: ${err}`);
    return;
  }
  levels.push(lvl);
  console.log(`OK demo[${i}] ${plan.name} (${lvl.rows}x${lvl.cols})`);
});

console.log(totalFail ? `\n${totalFail} DEMO LEVELS FAILED VERIFICATION` : '\nALL DEMO LEVELS VERIFIED OK');

const CATEGORIES = [{
  id: 'demo', title: 'Demo', icon: '🧭', mechanic: 'DEMO',
  desc: 'Offline single-file demo pack — teaches each core mechanic in a short sequence.',
  levels
}];

const out = `// File này được sinh tự động bởi scripts/gen-levels-demo.mjs — KHÔNG sửa
// tay. Dùng đúng cơ chế Hamiltonian path của scripts/gen-levels.mjs nên LUÔN
// phủ kín 100% ô khả dụng và LUÔN có trường \`solution\` hợp lệ (dùng cho Hint
// / tutorial auto-draw). Chỉ dùng cho build offline single-file (xem
// vite.offline.config.js) — \`npm run dev\`/\`npm run build\` vẫn dùng
// src/data/levels.js (42 màn đầy đủ) như bình thường.

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
`;

writeFileSync(OUT_FILE, out, 'utf-8');
console.log(`\nĐã ghi ${OUT_FILE}`);
