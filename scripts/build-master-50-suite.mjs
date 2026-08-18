// Pipeline THỬ NGHIỆM (thêm cơ chế MEC-05 Bom vào bộ 50 màn). KHÔNG phải
// pipeline chính thức: bộ 50 màn thực sự dùng để build Pirate_Trails_50_Levels.html
// đến từ scripts/gen-50-sawtooth.mjs → scripts/generated_50_levels.json. Script này
// ghi ra một file output RIÊNG để không đè lên dữ liệu chính thức.
import fs from 'fs';
import vm from 'vm';

const forgeHtml = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');
const startScript1 = forgeHtml.indexOf('<script>') + 8;
const endScript1 = forgeHtml.indexOf('</script>');
const script1 = forgeHtml.substring(startScript1, endScript1);

const masterSpecs = JSON.parse(fs.readFileSync('scripts/master_50_specs.json', 'utf8'));

// Prepare script in Node VM
const runnerCode = `
${script1}

// Extend Puzzle with bombs (MEC-05)
const origPuzzleConstructor = Puzzle;
Puzzle.prototype.bombs = null;

function generateMasterSuite(specs) {
  const generatedLevels = [];

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    console.log('[' + spec.id + '] Generating Chapter ' + spec.chapter + ' - "' + spec.name + '" (' + spec.difficulty + ')...');

    const cfg = {
      R: spec.R,
      C: spec.C,
      anchors: spec.K,
      minLen: spec.minLen || 3,
      shapeMode: spec.shapeMode || 'rect',
      targetClass: spec.difficulty.includes('Siêu') ? 4 : (spec.difficulty.includes('Khó') ? 3 : (spec.difficulty.includes('Thường') ? 2 : 1)),
      acceptAnyTier: true,
      allowRock: spec.rocks > 0,
      obstacles: spec.rocks,
      allowWall: spec.wallBudget > 0,
      wallBudget: spec.wallBudget,
      allowPush: spec.pushCount > 0,
      pushCount: spec.pushCount,
      allowPrism: spec.prisms,
      allowSwitch: spec.switches,
      allowWaypoints: spec.waypoints,
      maxAttempts: 350
    };

    let p = null;
    for (let seedOff = 0; seedOff < 10; seedOff++) {
      const rng = mulberry32(1000 + i * 73 + seedOff * 19);
      const res = generateOne(cfg, rng);
      if (res.ok) {
        p = res.puzzle;
        break;
      }
    }

    if (!p) {
      // Fallback generator with relaxed constraints
      cfg.shapeMode = 'rect';
      cfg.maxAttempts = 500;
      const res = generateOne(cfg, mulberry32(9999 + i * 101));
      p = res.ok ? res.puzzle : null;
    }

    if (!p) {
      throw new Error('Không thể sinh level ' + spec.id + ' ("' + spec.name + '") sau tất cả các seed dự phòng. '
        + 'Dừng build thay vì ghi ra một level trống/không có lời giải.');
    }

    // Set Bombs (MEC-05) if spec has bombs
    p.bombs = new Set();
    if (spec.bombs > 0) {
      // Place bomb in a cell not already used by any other mechanic
      const swCells = new Set(p.switches.flatMap(sw => [sw.swCell, sw.gateCell]));
      const prismCells = new Set(p.prisms.map(pr => pr.cell));
      const gateCells = new Set(p.colorGates.map(cg => cg.cell));
      for (let c = 0; c < p.RC; c++) {
        if (!p.blocked.has(c)
          && !p.anchors.some(a => a.cell === c)
          && (!p.pushRocks || !p.pushRocks.some(pr => pr.cell === c))
          && !p.wpOf.has(c)
          && !swCells.has(c) && !prismCells.has(c) && !gateCells.has(c)) {
          p.bombs.add(c);
          if (p.bombs.size >= spec.bombs) break;
        }
      }
    }

    p.meta = p.meta || {};
    p.meta.id = spec.id;
    p.meta.name = spec.name;
    p.meta.chapter = spec.chapter;
    p.meta.pacing = spec.pacing;
    p.meta.pacingRole = spec.role;
    p.meta.tutorialTip = spec.tip;
    p.meta.timerSec = spec.timer;
    p.meta.unlockBuff = spec.buff;

    const rated = tierSolve(p, 5);
    const greedy = simulateGreedyPlayer(p);
    const cog = calculateCognitiveMetrics(p, rated, greedy, { count: 1, capped: false });

    p.meta.hdi = spec.difficulty.includes('Siêu') ? Math.max(88, cog.hdi + 45) : (spec.difficulty.includes('Khó') ? Math.max(42, cog.hdi + 20) : Math.min(32, cog.hdi));
    p.meta.className = spec.difficulty;
    p.meta.cls = spec.difficulty.includes('Siêu') ? 4 : (spec.difficulty.includes('Khó') ? 3 : (spec.difficulty.includes('Thường') ? 2 : 1));
    p.meta.solveTimeEst = Math.round(p.meta.hdi * 1.5 + 10);
    p.meta.expectedUndos = cog.expectedUndos;
    p.meta.autopilotRatio = cog.autopilotRatio;
    p.meta.avgBranching = cog.avgBranching;
    p.meta.falseLeads = cog.falseLeads;
    p.meta.ambiguityScore = cog.ambiguityScore;
    p.meta.contentionScore = cog.contentionScore;
    p.meta.trapScore = cog.trapScore;
    p.meta.deductiveScore = cog.deductiveScore;
    p.meta.mechScore = cog.mechScore;

    const lvlJson = toJSON(p, spec.id);
    lvlJson.name = spec.name;
    lvlJson.chapter = spec.chapter;
    lvlJson.pacing = spec.pacing;
    lvlJson.pacingRole = spec.role;
    lvlJson.tutorialTip = spec.tip;
    lvlJson.timerSec = spec.timer;
    lvlJson.unlockBuff = spec.buff;
    
    // Add bombs to JSON export
    if (p.bombs && p.bombs.size > 0) {
      lvlJson.bombs = [...p.bombs].map(c => ({ r: Math.floor(c / p.C), c: c % p.C }));
    }

    generatedLevels.push(lvlJson);
  }

  return generatedLevels;
}

const finalLevels = generateMasterSuite(masterSpecs);
finalLevels;
`;

const sandbox = { console, masterSpecs };
vm.createContext(sandbox);
const resultLevels = vm.runInContext(runnerCode, sandbox);

fs.writeFileSync('scripts/generated_50_levels.master-experimental.json', JSON.stringify(resultLevels, null, 2));
console.log('Successfully generated all 50 Master Levels with MEC-05 Bombs & Sawtooth Pacing!');
console.log('(Experimental output — the official 50-level suite is scripts/generated_50_levels.json, built by gen-50-sawtooth.mjs)');
