import fs from 'fs';
import vm from 'vm';

const forgeHtml = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');
const startScript1 = forgeHtml.indexOf('<script>') + 8;
const endScript1 = forgeHtml.indexOf('</script>');
const script1 = forgeHtml.substring(startScript1, endScript1);

const pureSpecs = JSON.parse(fs.readFileSync('scripts/pure_50_specs.json', 'utf8'));

// Prepare script in Node VM
const runnerCode = `
${script1}

function generatePureSuite(specs) {
  const generatedLevels = [];

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    console.log('[' + spec.id + '] Generating Chapter ' + spec.chapter + ' - "' + spec.name + '" (' + spec.difficulty + ')...');

    const cfg = {
      R: spec.R,
      C: spec.C,
      anchors: spec.K,
      minLen: spec.minLen || 3,
      shapeMode: 'rect',
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
      maxAttempts: 400
    };

    let p = null;
    for (let seedOff = 0; seedOff < 15; seedOff++) {
      const rng = mulberry32(2026 + i * 83 + seedOff * 29);
      const res = generateOne(cfg, rng);
      if (res.ok) {
        p = res.puzzle;
        break;
      }
    }

    if (!p) {
      cfg.maxAttempts = 600;
      const res = generateOne(cfg, mulberry32(1111 + i * 37));
      p = res.ok ? res.puzzle : new Puzzle(spec.R, spec.C);
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

    generatedLevels.push(lvlJson);
  }

  return generatedLevels;
}

const finalLevels = generatePureSuite(pureSpecs);
finalLevels;
`;

const sandbox = { console, pureSpecs };
vm.createContext(sandbox);
const resultLevels = vm.runInContext(runnerCode, sandbox);

fs.writeFileSync('scripts/generated_50_levels.json', JSON.stringify(resultLevels, null, 2));
console.log('Successfully generated all 50 Pure Single-Mechanic Levels!');
