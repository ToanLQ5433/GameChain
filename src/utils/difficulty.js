import { getFlatLevels } from './progression.js';

// No level in the generated data carries an explicit difficulty field, so we
// derive one: a complexity score from board size, anchor/color count, the
// board-shape cutout, and how many extra mechanic objects (rocks, switches,
// waypoints...) a level packs in. Levels are ranked by score across the
// WHOLE 210-level progression (not per category) and only the toughest
// slice gets tagged — "hard"/"superhard" call out levels that genuinely
// stand out; everything else (easy/normal) shows no badge at all.

const HARD_PERCENTILE = 0.75; // top 25% overall -> at least "hard"
const SUPERHARD_PERCENTILE = 0.92; // top 8% overall -> "superhard"

function mechanicExtraCount(level) {
  const waypointCount = level.waypoints
    ? Object.values(level.waypoints).reduce((sum, list) => sum + list.length, 0)
    : 0;
  return (level.rocks?.length || 0) + (level.walls?.length || 0) + (level.pushRocks?.length || 0)
    + (level.bombs?.length || 0) + (level.switches?.length || 0) + (level.arrows?.length || 0)
    + (level.prisms?.length || 0) + (level.colorGates?.length || 0) + waypointCount;
}

function complexityScore(level) {
  const cells = level.rows * level.cols;
  const anchors = level.anchors.length;
  const colors = new Set(level.anchors.map(a => a.color)).size;
  const shapePenalty = level.shape ? 8 : 0;
  return cells + anchors * 4 + colors * 3 + shapePenalty + mechanicExtraCount(level) * 2;
}

let _difficultyByKey = null;

function buildDifficultyMap() {
  const flat = getFlatLevels();
  const scored = flat.map(f => ({ key: `${f.categoryId}:${f.levelIndex}`, score: complexityScore(f.level) }));
  scored.sort((a, b) => a.score - b.score);

  const n = scored.length;
  const hardStart = Math.floor(n * HARD_PERCENTILE);
  const superhardStart = Math.floor(n * SUPERHARD_PERCENTILE);

  const map = new Map();
  scored.forEach((item, i) => {
    if (i >= superhardStart) map.set(item.key, 'superhard');
    else if (i >= hardStart) map.set(item.key, 'hard');
  });
  return map;
}

// Returns 'hard' | 'superhard' | null.
export function getDifficulty(categoryId, levelIndex) {
  if (!_difficultyByKey) _difficultyByKey = buildDifficultyMap();
  return _difficultyByKey.get(`${categoryId}:${levelIndex}`) || null;
}

export const DIFFICULTY_STYLE = {
  hard: { label: 'HARD', color: 0xf97316, icon: '🔥' },
  superhard: { label: 'SUPER HARD', color: 0x7c3aed, icon: '💀' }
};
