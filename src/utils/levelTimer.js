// Level Timer System (GDD 3.8) — a layer bolted ON TOP of the 5 core
// mechanics, never touching ChainEngine. Pure functions only, so this stays
// trivially testable/tunable independent of rendering (per the "Engine
// logic thuần tuý tách khỏi Render" principle in GDD 6.2).
//
// Time Limit = T_giải_trung_bình (average solve time) + Biên an toàn (a
// FIXED additive safety margin, not a multiplier — GDD explains why: a
// multiplier would shrink the absolute margin exactly on the hardest
// levels, where solve-time variance is largest, turning failure into a
// disguised coin-flip). This demo has no real playtest/analytics backend
// yet, so `avgSolveTimeSec` always falls back to the difficulty default —
// exactly the `DifficultyDefaults.getFallbackAvgTime()` branch GDD 3.8's
// own pseudocode describes, using the GDD's own worked examples as the
// fallback constants (Normal 25s, Hard 60s, Super Hard 100s).

const FALLBACK_AVG_SOLVE_SEC = { normal: 25, hard: 60, superhard: 100 };
const SAFETY_MARGIN_SEC = { normal: 75, hard: 100, superhard: 130 };

export const MAX_TIMEOUT_AD_USES_PER_ATTEMPT = 2;
export const TIMEOUT_AD_BONUS_RATIO = 0.5; // +50% of the ORIGINAL time limit
// Demo stand-in for option (2) in the GDD's 3-choice Time-Out screen
// ("dùng Coin/Gem mua thêm giờ") — GDD leaves the exact price as [TBD];
// this is a placeholder cost, not a tuned economy value.
export const TIMEOUT_COIN_COST = 20;

// Coin Tốc Độ (GDD 2.5) reward caps — also undefined numbers in the GDD
// ([TBD]-adjacent `CONFIG.COIN_SPEED_MAX` / `CONFIG.COIN_SPEED_NO_BUFF_BONUS`),
// picked to be a meaningful bonus without dwarfing the flat 20-coin base clear reward.
export const COIN_SPEED_MAX = 30;
export const COIN_SPEED_NO_BUFF_BONUS = 15;

// Returns the countdown length in seconds, or null for "Unlimited" (Easy —
// GDD 3.8 is explicit that Easy never gets a timer at all, to protect the
// FTUE learning experience per Pillar P1).
export function getTimeLimit(tier) {
  const avg = FALLBACK_AVG_SOLVE_SEC[tier];
  const margin = SAFETY_MARGIN_SEC[tier];
  if (avg === undefined || margin === undefined) return null;
  return avg + margin;
}

// Green above 50% remaining, amber 20-50%, red below 20% — matches the
// GDD 3.7 juice spec ("đổi màu dần xanh→vàng→đỏ khi còn ít giờ"). Returned
// as a CSS hex string since the only consumer is Phaser Text.setColor().
export function getTimerColor(ratio) {
  if (ratio > 0.5) return '#15803d';
  if (ratio > 0.2) return '#b45309';
  return '#b91c1c';
}
