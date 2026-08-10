import { getFlatLevels } from './progression.js';

// No level in the generated data carries an explicit difficulty field, so we
// derive one: a complexity score from board size, anchor/color count, the
// board-shape cutout, and how many extra mechanic objects (rocks, switches,
// waypoints...) a level packs in. Levels are ranked by score across the
// WHOLE 210-level progression (not per category).
//
// Two consumers read this ranking differently:
//  - getDifficulty() -> 'hard' | 'superhard' | null, for the on-board ribbon
//    badge — only the levels that genuinely stand out get called out.
//  - getDifficultyTier() -> 'easy' | 'normal' | 'hard' | 'superhard', the
//    full 4-tier split used by the Level Timer System (GDD 3.8), which
//    needs an Easy/Normal boundary the badge never cared about. The
//    thresholds below approximate the target tier ratios from GDD 3.6
//    (Easy 30-35%, Normal 40-45%, Hard 15-20%, Super Hard 5-8%).

const EASY_PERCENTILE = 0.32; // bottom ~32% -> "easy" (no Level Timer at all)
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

let _tierByKey = null;

function buildTierMap() {
  const flat = getFlatLevels();
  const scored = flat.map(f => ({ key: `${f.categoryId}:${f.levelIndex}`, score: complexityScore(f.level) }));
  scored.sort((a, b) => a.score - b.score);

  const n = scored.length;
  const easyStart = Math.floor(n * EASY_PERCENTILE);
  const hardStart = Math.floor(n * HARD_PERCENTILE);
  const superhardStart = Math.floor(n * SUPERHARD_PERCENTILE);

  const map = new Map();
  scored.forEach((item, i) => {
    let tier;
    if (i >= superhardStart) tier = 'superhard';
    else if (i >= hardStart) tier = 'hard';
    else if (i >= easyStart) tier = 'normal';
    else tier = 'easy';
    map.set(item.key, tier);
  });
  return map;
}

// Returns 'easy' | 'normal' | 'hard' | 'superhard'.
export function getDifficultyTier(categoryId, levelIndex) {
  if (!_tierByKey) _tierByKey = buildTierMap();
  return _tierByKey.get(`${categoryId}:${levelIndex}`) || 'normal';
}

// Returns 'hard' | 'superhard' | null — unchanged behavior/thresholds from
// before getDifficultyTier() existed, just re-derived from the same map.
export function getDifficulty(categoryId, levelIndex) {
  const tier = getDifficultyTier(categoryId, levelIndex);
  return (tier === 'hard' || tier === 'superhard') ? tier : null;
}

export const DIFFICULTY_STYLE = {
  hard: { label: 'HARD', color: 0xf97316, icon: '🔥' },
  superhard: { label: 'SUPER HARD', color: 0x7c3aed, icon: '💀' }
};
