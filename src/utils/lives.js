// Real Lives system — hearts used to be a fixed decorative "5/5" everywhere
// (Home, Shop, GameScene) because nothing ever spent one. Now Quit and the
// "Restart Level" action (moved into Settings, see GameScene) actually cost
// a life, refilled over real time like the genre-standard energy system.
// Losing a level to a bomb stays free-retry (unchanged) — only *voluntarily*
// abandoning an in-progress attempt (quitting or restarting) costs one.

export const LIVES_MAX = 5;
export const LIVES_REFILL_MS = 20 * 60 * 1000; // 1 life every 20 minutes while below max

// Applies any refills owed since the last check, based on wall-clock time.
// Call before reading save.lives anywhere it's displayed or spent.
export function resolveLives(save) {
  if (!save.lives) save.lives = { count: LIVES_MAX, max: LIVES_MAX, nextRefillAt: null };
  const lives = save.lives;
  if (lives.count >= lives.max) { lives.nextRefillAt = null; return lives; }
  if (!lives.nextRefillAt) { lives.nextRefillAt = Date.now() + LIVES_REFILL_MS; return lives; }
  const now = Date.now();
  while (lives.count < lives.max && now >= lives.nextRefillAt) {
    lives.count += 1;
    lives.nextRefillAt = lives.count < lives.max ? lives.nextRefillAt + LIVES_REFILL_MS : null;
  }
  return lives;
}

// Returns how many lives were actually deducted (0 if already at 0 — never
// goes negative, and the caller can still let the action proceed for free
// once the player is out).
export function loseLife(save) {
  resolveLives(save);
  if (save.lives.count <= 0) return 0;
  save.lives.count -= 1;
  if (!save.lives.nextRefillAt) save.lives.nextRefillAt = Date.now() + LIVES_REFILL_MS;
  return 1;
}

export function msUntilNextLife(save) {
  resolveLives(save);
  return save.lives.nextRefillAt ? Math.max(0, save.lives.nextRefillAt - Date.now()) : 0;
}

export function formatMs(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const m = Math.floor(totalSec / 60), s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
