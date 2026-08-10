// One-time, learn-by-doing mechanic tutorials — shown the first time a
// player reaches level 0 of a category that introduces a new core
// mechanic (each category maps 1:1 to one `mechanic` value in levels.js).
// GameScene forces the player to trace that level's own solution for one
// chain — the exact one whose path actually touches the new mechanic —
// before handing back normal free play. Nothing here ever touches
// ChainEngine; it only reads levelDef/solution data GameScene already has.

export const TUTORIAL_CONTENT = {
  CORE: { title: 'Drag to Connect', body: 'Drag from an anchor to link every cell of its color.' },
  'MEC-01': { title: 'Push Crates', body: 'Drag into a Crate to shove it one cell further.' },
  'MEC-02': { title: 'Arrows & Prisms', body: 'Arrows force your next step. A Prism recolors your chain to match its Gate.' },
  'MEC-03': { title: 'Number Code', body: 'Touch the numbered cells in order, ending on the last one.' },
  'MEC-04': { title: 'Switches & Gates', body: 'Hold a chain on the Switch to open its Gate.' },
  'MEC-05': { title: 'Static Bombs', body: 'Touching a Bomb loses instantly — push a Crate into it to clear it safely.' }
};

// Picks the chain whose OWN solution actually passes through the cell(s)
// that demonstrate this mechanic — gating the wrong chain (e.g. one that
// never touches the switch) would force a drag that teaches nothing.
export function pickDemoChainId(mechanic, levelDef) {
  const ids = Object.keys(levelDef.solution || {});
  const pathHits = (id, cells) => levelDef.solution[id].some(([r, c]) => cells.has(`${r},${c}`));

  if (mechanic === 'MEC-03') {
    const id = ids.find(cid => levelDef.waypoints && levelDef.waypoints[cid] && levelDef.waypoints[cid].length);
    if (id) return id;
  }
  if (mechanic === 'MEC-04' && levelDef.switches && levelDef.switches.length) {
    const cells = new Set(levelDef.switches.map(s => `${s.r},${s.c}`));
    const id = ids.find(cid => pathHits(cid, cells));
    if (id) return id;
  }
  if (mechanic === 'MEC-02' && levelDef.prisms && levelDef.prisms.length) {
    const cells = new Set(levelDef.prisms.map(p => `${p.r},${p.c}`));
    const id = ids.find(cid => pathHits(cid, cells));
    if (id) return id;
  }
  if ((mechanic === 'MEC-01' || mechanic === 'MEC-05') && levelDef.pushRocks && levelDef.pushRocks.length) {
    const cells = new Set(levelDef.pushRocks.map(p => `${p.r},${p.c}`));
    const id = ids.find(cid => pathHits(cid, cells));
    if (id) return id;
  }
  return ids[0];
}

// Cell-pairs to glow-connect before the forced practice starts — only for
// mechanics whose whole point is a relationship between two cells you
// can't see just by looking at either one alone.
export function getRelationshipHighlights(mechanic, levelDef) {
  if (mechanic === 'MEC-04' && levelDef.switches) {
    return levelDef.switches.map(sw => ({ from: { r: sw.r, c: sw.c }, to: { r: sw.gateR, c: sw.gateC } }));
  }
  if (mechanic === 'MEC-02' && levelDef.prisms && levelDef.colorGates) {
    const pairs = [];
    levelDef.prisms.forEach(p => {
      levelDef.colorGates.filter(g => g.color === p.color).forEach(g => {
        pairs.push({ from: { r: p.r, c: p.c }, to: { r: g.r, c: g.c } });
      });
    });
    return pairs;
  }
  return [];
}
