// One-time, learn-by-doing mechanic tutorials — shown the first time a
// player reaches level 0 of a category that introduces a new core
// mechanic (each category maps 1:1 to one `mechanic` value in levels.js).
// GameScene forces the player to trace that level's own solution for one
// chain — the exact one whose path actually touches the new mechanic —
// before handing back normal free play. Nothing here ever touches
// ChainEngine; it only reads levelDef/solution data GameScene already has.

// One short imperative phrase each — the blinking cell highlight (see
// GameScene.updateTutorialPointer) carries most of the teaching now, this
// is just enough text to say WHAT to do, not why.
export const TUTORIAL_CONTENT = {
  CORE: 'Drag from the anchor',
  'MEC-01': 'Drag into the Crate',
  'MEC-02': 'Follow the glowing cells',
  'MEC-03': 'Tap the numbers in order',
  'MEC-04': 'Hold a chain on the Switch',
  'MEC-05': 'Push the Crate into the Bomb'
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
