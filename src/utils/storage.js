const SAVE_KEY = 'PIRATE_TRAILS_DEMO_SAVE_V1';

const defaultState = {
  coins: 100,
  streak: 0,
  soundMuted: false,
  // completedLevels[categoryId] = Set-like array of levelIndex đã hoàn thành lần đầu
  completedLevels: {}
};

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...defaultState, completedLevels: {} };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch (e) {
    return { ...defaultState, completedLevels: {} };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore quota errors trong demo */ }
}

export function isLevelCompleted(state, categoryId, levelIndex) {
  return !!(state.completedLevels[categoryId] && state.completedLevels[categoryId].includes(levelIndex));
}

export function markLevelCompleted(state, categoryId, levelIndex) {
  if (!state.completedLevels[categoryId]) state.completedLevels[categoryId] = [];
  if (!state.completedLevels[categoryId].includes(levelIndex)) {
    state.completedLevels[categoryId].push(levelIndex);
  }
  return state;
}
