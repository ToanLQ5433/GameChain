// Bộ tổng hợp âm thanh nhỏ gọn bằng Web Audio API — không cần file asset,
// phù hợp cho bản demo nhẹ. Giữ nguyên tinh thần từ bản HTML gốc.
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function tone(freq, type, duration, gainVal) {
  try {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { /* ignore trên trình duyệt chặn audio tự động */ }
}

export function playSound(type, muted) {
  if (muted) return;
  switch (type) {
    case 'step': tone(320, 'sine', 0.06, 0.05); break;
    case 'lock': tone(540, 'triangle', 0.12, 0.08); break;
    case 'switch': tone(240, 'square', 0.08, 0.06); break;
    case 'push': tone(200, 'triangle', 0.1, 0.08); break;
    case 'bomb': tone(110, 'sawtooth', 0.3, 0.15); break;
    // 'crack' — phá bom thành công bằng Push Rock: gọn, giòn, tích cực.
    case 'crack':
      tone(680, 'square', 0.05, 0.12);
      setTimeout(() => tone(180, 'sawtooth', 0.18, 0.14), 30);
      break;
    // 'explode' — chạm trực tiếp Bom = thua: rền và nặng hơn 'bomb' thường.
    case 'explode':
      tone(90, 'sawtooth', 0.45, 0.22);
      setTimeout(() => tone(55, 'square', 0.3, 0.18), 40);
      setTimeout(() => tone(38, 'sawtooth', 0.35, 0.14), 90);
      break;
    // 'error' phát ra liên tục mỗi khi ngón tay lướt qua ô không hợp lệ TRONG
    // LÚC KÉO (rất thường xuyên) — sóng sawtooth gắt trước đây dồn dập thành
    // tiếng "rè" khó chịu. Đổi sang tiếng "tách" mềm, ngắn, nhỏ hơn nhiều.
    case 'error': tone(210, 'sine', 0.04, 0.035); break;
    case 'win':
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => tone(f, 'sine', 0.3, 0.12), i * 90);
      });
      break;
    // 'lose' — descending minor sting for the fail modal itself, distinct
    // from 'explode' (which plays for the bomb blast a beat earlier).
    case 'lose':
      [392, 349.23, 293.66].forEach((f, i) => {
        setTimeout(() => tone(f, 'triangle', 0.28, 0.1), i * 140);
      });
      break;
    // 'coin' — a single soft tick, meant to be fired several times in a
    // row for a reward count-up (Shop purchases, win-screen reward reveal).
    case 'coin': tone(880, 'square', 0.05, 0.05); break;
    // 'freeze' — icy chime when the Freeze buff activates.
    case 'freeze':
      tone(1400, 'sine', 0.12, 0.06);
      setTimeout(() => tone(1800, 'sine', 0.15, 0.05), 60);
      break;
    // 'timerTick' — Level Timer countdown, fires once per second once under
    // 20% time remaining (GDD 3.7: "tiếng tick nhẹ, tăng tần suất khi còn
    // <20% giờ"). Kept very quiet/short since it repeats.
    case 'timerTick': tone(660, 'sine', 0.05, 0.03); break;
    // 'timeout' — Level Timer hits 0, distinct from both 'lose' (bomb) and
    // 'error' so running out of time reads as its own kind of stop.
    case 'timeout':
      tone(300, 'square', 0.1, 0.08);
      setTimeout(() => tone(220, 'square', 0.18, 0.08), 110);
      break;
    default: break;
  }
}

// Real ambient background music loop (the Settings modal has a Music
// switch, distinct from Sound/SFX) — no music asset file in this demo, so
// it's a soft synthesized arpeggio instead of a fake toggle that does
// nothing. Global/module-level (not per-scene) so it keeps playing across
// scene transitions like real game music would.
let musicInterval = null;
const MUSIC_NOTES = [261.63, 329.63, 392.0, 329.63]; // soft C-E-G-E pad loop

export function startMusic() {
  if (musicInterval) return;
  let i = 0;
  const playNote = () => tone(MUSIC_NOTES[i++ % MUSIC_NOTES.length], 'sine', 1.6, 0.02);
  playNote();
  musicInterval = setInterval(playNote, 1400);
}

export function stopMusic() {
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
}
