// QA script: kiểm tra "full map coverage" — điều mà verify-levels.mjs và
// LevelAnalyzer.js KHÔNG kiểm tra (cả hai chỉ xác nhận màn giải được, không
// xác nhận lời giải có phủ kín toàn bộ ô khả dụng của bàn cờ hay không).
//
// Với mỗi màn, phát lại đúng `solution` qua ChainEngine THẬT (Node thuần,
// không cần trình duyệt), rồi tại trạng thái đã thắng, duyệt toàn bộ ô
// (r, c) không phải void (`isVoid`) và xác nhận mỗi ô đó có ít nhất 1 trong:
// một dây đã khoá đi qua, một Rock tĩnh, vị trí cuối cùng của 1 Push Rock,
// hoặc 1 quả Bom còn nguyên (chưa bị phá). Ô nào không rơi vào nhóm nào ở
// trên là "lỗ hổng" — người chơi thắng màn nhưng bàn cờ còn ô trống trơ.
//
// Chạy: node scripts/audit-coverage.mjs [đường dẫn tới file levels, mặc định
// cả src/data/levels.js lẫn src/data/levels.demo.js]
import { ChainEngine } from '../src/engine/ChainEngine.js';

async function auditFile(path) {
  const mod = await import(path);
  const CATEGORIES = mod.CATEGORIES;
  let broken = 0, simErrors = 0, total = 0;

  for (const cat of CATEGORIES) {
    for (const lvl of cat.levels) {
      total++;
      let eng;
      try {
        eng = new ChainEngine(lvl);
        if (!lvl.solution) throw new Error('no solution field to replay');
        for (const id in lvl.solution) {
          const path = lvl.solution[id];
          const start = path[0];
          const started = eng.startDrag(start[0], start[1]);
          if (!started) throw new Error(`startDrag failed for ${id}`);
          for (let i = 1; i < path.length; i++) {
            const [r, c] = path[i];
            const res = eng.step(r, c);
            if (res.result !== 'OK') {
              throw new Error(`step failed chain ${id} idx ${i} -> ${res.result} ${res.reason || ''}`);
            }
          }
          const end = eng.endDrag();
          if (!end.locked) throw new Error(`endDrag not locked for ${id} ${end.error || ''}`);
        }
        if (!eng.isWon()) throw new Error('not won at end');
      } catch (e) {
        simErrors++;
        console.log(`[SIM ERROR] ${cat.id} / ${lvl.name} -> ${e.message}`);
        continue;
      }

      const covered = new Set();
      for (const ch of eng.getAllChains()) for (const p of ch.path) covered.add(p.r + '_' + p.c);
      for (const rk of eng.rocks) covered.add(rk.r + '_' + rk.c);
      for (const rk of eng.pushRocks) covered.add(rk.r + '_' + rk.c);
      for (const b of eng.bombs) if (!b.destroyed) covered.add(b.r + '_' + b.c);

      const overlap = [];
      const seen = new Set();
      for (const ch of eng.getAllChains()) {
        for (const p of ch.path) {
          const k = p.r + '_' + p.c;
          if (seen.has(k)) overlap.push(k);
          seen.add(k);
        }
      }

      const missing = [];
      for (let r = 0; r < eng.rows; r++) {
        for (let c = 0; c < eng.cols; c++) {
          if (eng.isVoid(r, c)) continue;
          const k = r + '_' + c;
          if (!covered.has(k)) missing.push(k);
        }
      }

      if (missing.length || overlap.length) {
        broken++;
        console.log(`[COVERAGE] ${cat.id} / ${lvl.name} -> missing: [${missing.join(', ')}] overlap: [${overlap.join(', ')}]`);
      }
    }
  }

  console.log(`\n${path}: ${total} levels, ${simErrors} sim errors, ${broken} coverage gaps`);
  return simErrors === 0 && broken === 0;
}

async function main() {
  const files = process.argv.slice(2);
  const targets = files.length ? files : ['../src/data/levels.js', '../src/data/levels.demo.js'];
  let allOk = true;
  for (const f of targets) {
    const resolved = new URL(f, import.meta.url).href;
    const ok = await auditFile(resolved);
    allOk = allOk && ok;
  }
  process.exit(allOk ? 0 : 1);
}

main();
