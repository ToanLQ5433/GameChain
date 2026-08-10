const SAVE_KEY = 'PIRATE_TRAILS_DEMO_SAVE_V1';
const DAILY_QUEST_TARGET = 3;
const DAILY_QUEST_REWARD = 50;

const defaultState = {
  coins: 100,
  gems: 0, // Tiền tệ phụ (GDD 3.8: "dùng Coin/Gem mua thêm giờ") — hiện chỉ hiển thị, chưa có nguồn thu/tiêu trong bản demo.
  streak: 0,
  soundMuted: false,
  playerName: 'Captain',
  // completedLevels[categoryId] = Set-like array of levelIndex đã hoàn thành lần đầu
  completedLevels: {},
  // Màn chơi gần nhất — dùng để nút "Chơi Tiếp" ở Home resume đúng chỗ.
  lastCategoryId: null,
  lastLevelIndex: null,
  // Category đang xem trên bản đồ Hải Trình ở Home (độc lập với lastCategoryId
  // — cho phép lướt xem category khác mà không đổi điểm resume thật).
  viewedCategoryId: null,
  dailyQuest: { date: '', newClearsToday: 0, target: DAILY_QUEST_TARGET, claimed: false }
};

export function loadSave() {
  let state;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    state = raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState, completedLevels: {} };
  } catch (e) {
    state = { ...defaultState, completedLevels: {} };
  }
  return resolveDailyQuest(state);
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

// Nhiệm Vụ Ngày (GDD 2.5) — reset về 0 mỗi khi qua ngày mới (theo giờ máy người chơi).
export function resolveDailyQuest(state) {
  const today = new Date().toDateString();
  if (!state.dailyQuest || state.dailyQuest.date !== today) {
    state.dailyQuest = { date: today, newClearsToday: 0, target: DAILY_QUEST_TARGET, claimed: false };
  }
  return state;
}

export function registerNewLevelClear(state) {
  resolveDailyQuest(state);
  state.dailyQuest.newClearsToday += 1;
  return state;
}

export function claimDailyQuestReward(state) {
  resolveDailyQuest(state);
  const q = state.dailyQuest;
  if (q.claimed || q.newClearsToday < q.target) return false;
  q.claimed = true;
  state.coins += DAILY_QUEST_REWARD;
  return true;
}
