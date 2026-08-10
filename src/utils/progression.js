import { CATEGORIES } from '../data/levels.js';
import { isLevelCompleted } from './storage.js';

// Single continuous progression across ALL categories — the categories still
// exist in the data (each level keeps its own mechanic) but the player no
// longer picks one explicitly; Home shows one long path through all 210
// levels in category order, and "next level" just walks off the end of one
// category straight into the start of the next.

let _flat = null;

export function getFlatLevels() {
  if (_flat) return _flat;
  const flat = [];
  CATEGORIES.forEach(cat => {
    cat.levels.forEach((level, levelIndex) => {
      flat.push({
        categoryId: cat.id,
        categoryTitle: cat.title,
        categoryIcon: cat.icon,
        levelIndex,
        level,
        globalIndex: flat.length
      });
    });
  });
  _flat = flat;
  return _flat;
}

export function findFlatIndex(categoryId, levelIndex) {
  return getFlatLevels().findIndex(f => f.categoryId === categoryId && f.levelIndex === levelIndex);
}

export function getNextLevel(categoryId, levelIndex) {
  const flat = getFlatLevels();
  const idx = findFlatIndex(categoryId, levelIndex);
  if (idx === -1 || idx + 1 >= flat.length) return null;
  const next = flat[idx + 1];
  return { categoryId: next.categoryId, levelIndex: next.levelIndex };
}

export function firstIncompleteGlobalIndex(save) {
  const flat = getFlatLevels();
  const idx = flat.findIndex(f => !isLevelCompleted(save, f.categoryId, f.levelIndex));
  return idx === -1 ? flat.length - 1 : idx;
}

export function totalLevelCount() {
  return getFlatLevels().length;
}
