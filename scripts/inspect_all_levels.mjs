import fs from 'fs';
import vm from 'vm';

const forgeHtml = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');
const startScript1 = forgeHtml.indexOf('<script>') + 8;
const endScript1 = forgeHtml.indexOf('</script>');
const script1 = forgeHtml.substring(startScript1, endScript1);

const levels = JSON.parse(fs.readFileSync('scripts/generated_50_levels.json', 'utf8'));

const inspectorCode = `
${script1}

function inspectSuite(levels) {
  let validCount = 0;

  levels.forEach((lvl, idx) => {
    const p = new Puzzle(lvl.grid.rows, lvl.grid.cols, lvl.shape);
    
    if (lvl.rocks) lvl.rocks.forEach(r => p.blocked.add(r.r * p.C + r.c));
    if (lvl.walls) lvl.walls.forEach(w => p.walls.add(ekey(w.r1 * p.C + w.c1, w.r2 * p.C + w.c2)));
    if (lvl.pushRocks) p.pushRocks = lvl.pushRocks.map(pr => ({ cell: pr.r * p.C + pr.c, initialCell: pr.r * p.C + pr.c }));
    if (lvl.switches) p.switches = lvl.switches.map(sw => ({ swCell: sw.r * p.C + sw.c, gateCell: sw.gateR * p.C + sw.gateC, latch: sw.latch }));
    if (lvl.prisms) p.prisms = lvl.prisms.map(pr => ({ cell: pr.r * p.C + pr.c, color: pr.color }));
    if (lvl.colorGates) p.colorGates = lvl.colorGates.map(cg => ({ cell: cg.r * p.C + cg.c, color: cg.color }));
    
    let totalAnchorCells = 0;
    if (lvl.anchors) {
      p.anchors = lvl.anchors.map(a => {
        const fullCellCount = (a.cells != null) ? a.cells : (a.length + 1);
        totalAnchorCells += fullCellCount;
        return { cell: a.row * p.C + a.col, L: fullCellCount, color: a.color };
      });
    }

    p.wpCount = p.anchors.map(() => 0);
    if (lvl.waypoints) {
      Object.entries(lvl.waypoints).forEach(([aid, wps], k) => {
        p.wpCount[k] = wps.length;
        wps.forEach((wp, jIdx) => {
          const num = wp.num || (jIdx + 1);
          p.wpOf.set(wp.r * p.C + wp.c, { k, j: num });
        });
      });
    }

    // Chỉ đếm ô CHƠI ĐƯỢC (không void theo shape, không bị block) — nếu không, màn có
    // hình dạng (heart/skull/ring/...) sẽ luôn báo "HỤT" sai vì các ô khoét rỗng bị
    // tính nhầm là ô cần dây phủ qua.
    const boardCells = p.validCells().length;

    const pushCount = p.pushRocks.length;
    const isFull = (totalAnchorCells + pushCount) === boardCells;

    const rated = tierSolve(p, 5);
    const uq = countSolutions(p, 2, 50000);
    const isSolvable = uq.count >= 1;

    console.log('[' + lvl.id + '] ' + (isSolvable ? '✓ SOLVABLE' : '❌ NO SOL') + 
      ' | Board Coverage: ' + (isFull ? '100% (' + totalAnchorCells + ' chain + ' + pushCount + ' push = ' + boardCells + ')' : '❌ HỤT') +
      ' | Tier ' + (rated.maxTier || 1) + ' · ' + lvl.cognitiveMetrics.difficultyClass + 
      ' | HDI ' + lvl.cognitiveMetrics.humanDifficultyIndex +
      ' | ' + lvl.name);

    if (isFull && isSolvable) validCount++;
  });

  return validCount;
}

const totalValid = inspectSuite(levels);
console.log('\\n========================================');
console.log('TOTAL 100% VALID & SOLVABLE LEVELS: ' + totalValid + ' / ' + levels.length);
console.log('========================================');
`;

const sandbox = { console, levels };
vm.createContext(sandbox);
vm.runInContext(inspectorCode, sandbox);
