import { ChainEngine } from './ChainEngine.js';

/**
 * LevelAnalyzer — Evaluates puzzle difficulty and cognitive engagement using
 * the 3-Tier Heuristic Metrics Architecture:
 * 1. Uniqueness Score (U): Exact count of valid solutions via Backtracking DFS.
 * 2. Greedy Trap Simulation (G): Tests if intuitive greedy heuristics fail into a dead-end.
 * 3. Dead-End Depth (D): Measures delayed dead-end depth and branching factor.
 * 4. Cognitive IQ Rating: Composite 10-point scale evaluating puzzle elegance.
 */
export class LevelAnalyzer {
  constructor(levelDef) {
    this.levelDef = levelDef;
  }

  // Exhaustive Backtracking Search to find ALL valid solutions (capped at maxSolutions)
  findAllSolutions(maxSolutions = 50, maxNodes = 50000) {
    const allSolutions = [];
    let totalNodes = 0;
    let deadEnds = 0;
    let maxDeadEndDepth = 0;

    const initialEngine = new ChainEngine(this.levelDef);
    const chainIds = Object.keys(initialEngine.chains);
    const levelDef = this.levelDef;

    function cloneEngineState(e) {
      const cloned = new ChainEngine(levelDef);
      for (const id of chainIds) {
        const src = e.chains[id];
        const dst = cloned.chains[id];
        dst.path = src.path.map(p => ({ r: p.r, c: p.c }));
        dst.locked = src.locked;
        dst.colorTag = src.colorTag;
        dst.waypointProgress = src.waypointProgress;
      }
      cloned.pushRocks = (e.pushRocks || []).map(r => ({ ...r }));
      cloned.bombs = (e.bombs || []).map(b => ({ ...b }));
      cloned._latched = new Set(e._latched);
      cloned.activeId = e.activeId;
      return cloned;
    }

    function search(eng, currentChainIndex) {
      if (allSolutions.length >= maxSolutions || totalNodes >= maxNodes) return;
      totalNodes++;

      if (eng.isWon()) {
        const sol = {};
        for (const id of chainIds) {
          sol[id] = eng.chains[id].path.map(p => [p.r, p.c]);
        }
        allSolutions.push(sol);
        return;
      }

      if (currentChainIndex >= chainIds.length) return;

      const activeChainId = chainIds[currentChainIndex];
      const chain = eng.chains[activeChainId];

      if (chain.locked) {
        search(eng, currentChainIndex + 1);
        return;
      }

      eng.activeId = activeChainId;
      const last = chain.path[chain.path.length - 1];
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      let expanded = false;

      for (const [dr, dc] of dirs) {
        const nr = last.r + dr, nc = last.c + dc;
        const nextEng = cloneEngineState(eng);
        nextEng.activeId = activeChainId;

        const res = nextEng.step(nr, nc);
        if (res.result === 'OK') {
          expanded = true;
          if (nextEng.chains[activeChainId].path.length === nextEng.chains[activeChainId].length) {
            const endRes = nextEng.endDrag();
            if (endRes.locked) {
              search(nextEng, currentChainIndex + 1);
            }
          } else {
            search(nextEng, currentChainIndex);
          }
        }
      }

      if (!expanded && chain.path.length < chain.length) {
        deadEnds++;
        if (chain.path.length > maxDeadEndDepth) {
          maxDeadEndDepth = chain.path.length;
        }
      }
    }

    search(initialEngine, 0);

    return {
      allSolutions,
      solutionCount: allSolutions.length,
      totalNodes,
      deadEnds,
      maxDeadEndDepth
    };
  }

  // Simulates a Naive Greedy Player (picks direction that is immediately open and moving forward)
  simulateGreedyPlayer() {
    const eng = new ChainEngine(this.levelDef);
    const chainIds = Object.keys(eng.chains);
    let trapped = false;
    let trapStep = 0;

    for (let cIdx = 0; cIdx < chainIds.length; cIdx++) {
      const id = chainIds[cIdx];
      const chain = eng.chains[id];
      eng.activeId = id;

      while (chain.path.length < chain.length) {
        const last = chain.path[chain.path.length - 1];
        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        let bestMove = null;

        for (const [dr, dc] of dirs) {
          const nr = last.r + dr, nc = last.c + dc;
          const clone = new ChainEngine(this.levelDef);
          for (const k of chainIds) {
            clone.chains[k].path = eng.chains[k].path.map(p => ({ ...p }));
            clone.chains[k].locked = eng.chains[k].locked;
          }
          clone.pushRocks = (eng.pushRocks || []).map(r => ({ ...r }));
          clone.bombs = (eng.bombs || []).map(b => ({ ...b }));
          clone._latched = new Set(eng._latched);
          clone.activeId = id;

          const res = clone.step(nr, nc);
          if (res.result === 'OK') {
            bestMove = { r: nr, c: nc };
            break;
          }
        }

        if (!bestMove) {
          trapped = true;
          trapStep = chain.path.length;
          break;
        }

        eng.step(bestMove.r, bestMove.c);
      }

      if (trapped) break;
      const endRes = eng.endDrag();
      if (!endRes.locked) {
        trapped = true;
        trapStep = chain.path.length;
        break;
      }
    }

    const won = eng.isWon();
    return {
      greedyWon: won,
      greedyTrapped: !won,
      trapStep
    };
  }

  // Comprehensive Heuristic Quality Analysis
  analyze() {
    const solData = this.findAllSolutions(20, 25000);
    const greedy = this.simulateGreedyPlayer();

    const totalCells = (this.levelDef.rows || this.levelDef.size) * (this.levelDef.cols || this.levelDef.size);
    let interactiveCells = 0;
    if (this.levelDef.rocks) interactiveCells += this.levelDef.rocks.length;
    if (this.levelDef.walls) interactiveCells += this.levelDef.walls.length;
    if (this.levelDef.pushRocks) interactiveCells += this.levelDef.pushRocks.length;
    if (this.levelDef.switches) interactiveCells += this.levelDef.switches.length * 2;
    if (this.levelDef.prisms) interactiveCells += this.levelDef.prisms.length * 2;
    if (this.levelDef.bombs) interactiveCells += this.levelDef.bombs.length;

    const mechanicDensity = Math.round((interactiveCells / totalCells) * 100);

    let iq = 4.0;
    if (solData.solutionCount === 1) iq += 2.5;
    else if (solData.solutionCount <= 2) iq += 1.2;
    else if (solData.solutionCount > 5) iq -= 1.5;

    if (greedy.greedyTrapped) iq += 2.0;
    if (solData.deadEnds >= 3) iq += 1.0;
    if (solData.maxDeadEndDepth >= 4) iq += 0.5;

    iq = Math.max(1.0, Math.min(10.0, Math.round(iq * 10) / 10));

    let tag = 'INTUITIVE';
    if (solData.solutionCount === 1 && greedy.greedyTrapped && solData.maxDeadEndDepth >= 4) {
      tag = 'MASTERPIECE';
    } else if (greedy.greedyTrapped) {
      tag = 'GREEDY TRAP';
    } else if (solData.solutionCount === 1) {
      tag = 'UNIQUE LOGIC';
    } else if (solData.deadEnds > 4) {
      tag = 'DELAYED TRAP';
    }

    return {
      solvable: solData.solutionCount > 0,
      solutionCount: solData.solutionCount,
      isUnique: solData.solutionCount === 1,
      greedyTrapped: greedy.greedyTrapped,
      deadEnds: solData.deadEnds,
      maxDeadEndDepth: solData.maxDeadEndDepth,
      mechanicDensity: `${mechanicDensity}%`,
      iqScore: iq,
      psychologyTag: tag,
      primarySolution: solData.allSolutions[0] || null
    };
  }
}
