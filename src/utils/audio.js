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
    default: break;
  }
}
