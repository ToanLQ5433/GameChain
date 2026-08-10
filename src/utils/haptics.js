// Thin wrapper over the Vibration API — desktop browsers and iOS Safari
// don't implement navigator.vibrate at all, so every call is a no-op there
// instead of throwing. Named patterns (not raw ms numbers) at call sites so
// the "feel" of each moment is defined once, here, not re-invented per call.
function fire(pattern) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  try { navigator.vibrate(pattern); } catch (e) { /* ignore unsupported/blocked */ }
}

// No on/off setting for this — real devices without vibration hardware (or
// with it disabled at the OS level) already no-op via `fire()` above, and
// haptics are a distinct channel from the sound-mute toggle in Settings.
export const haptics = {
  // Chain step accepted while dragging — tiny tick, fires often so it must
  // stay short or a long drag turns into one continuous buzz.
  step: () => fire(8),
  // A chain reaches its full length and locks in place.
  lock: () => fire(18),
  // Buff/UI button press acknowledgement.
  tap: () => fire(6),
  // Level cleared — a short-long-short pattern reads as "success" without
  // needing sound to land the feeling.
  win: () => fire([20, 40, 20, 40, 60]),
  // Bomb went off / level failed — one heavy buzz.
  fail: () => fire(90)
};
