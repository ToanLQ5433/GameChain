// Bộ tổng hợp âm thanh nhỏ gọn bằng Web Audio API — không cần file asset,
// phù hợp cho bản demo nhẹ. Giữ nguyên tinh thần từ bản HTML gốc.
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

// `attack` (giây) là thời gian ramp tuyến tính từ im lặng lên gainVal trước
// khi decay — bản cũ bật thẳng lên gainVal ngay tại t=0, tạo tiếng "click"
// kỹ thuật số và khiến tổng thể nghe mỏng hơn thực tế trên loa điện thoại.
// Một attack rất ngắn (mặc định 5ms, gần như không cảm nhận được độ trễ)
// làm sóng đầy hơn mà không đổi "tính cách" của âm.
function tone(freq, type, duration, gainVal, attack = 0.005) {
  try {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainVal, t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + attack + duration + 0.02);
  } catch (e) { /* ignore trên trình duyệt chặn audio tự động */ }
}

export function playSound(type, muted) {
  if (muted) return;
  switch (type) {
    case 'step': tone(320, 'sine', 0.09, 0.085); break;
    // 'lock' — chain khóa lại: thân triangle + một lớp harmonic cao (octave
    // trên) rất nhỏ để có cảm giác "chuông chốt" đầy hơn, không chỉ 1 nốt trơ.
    case 'lock':
      tone(540, 'triangle', 0.16, 0.13);
      tone(1080, 'sine', 0.1, 0.045);
      break;
    case 'switch': tone(240, 'square', 0.09, 0.095); break;
    case 'push': tone(200, 'triangle', 0.13, 0.12); break;
    case 'bomb': tone(110, 'sawtooth', 0.32, 0.19); break;
    // 'crack' — phá bom thành công bằng Push Rock: thêm 1 lớp sub-thump ở
    // đáy để cú đập có trọng lượng, vẫn gọn/giòn/tích cực như thiết kế gốc.
    case 'crack':
      tone(90, 'sine', 0.15, 0.12, 0.002);
      tone(680, 'square', 0.06, 0.17, 0.003);
      setTimeout(() => tone(150, 'sawtooth', 0.22, 0.2), 30);
      break;
    // 'explode' — chạm trực tiếp Bom = thua: thêm 1 lớp sub-bass rất trầm
    // (26Hz) chạy suốt để có độ "rền" thật sự thay vì chỉ 3 nốt sawtooth mỏng.
    case 'explode':
      tone(26, 'sine', 0.55, 0.16, 0.006);
      tone(92, 'sawtooth', 0.5, 0.3, 0.004);
      setTimeout(() => tone(55, 'square', 0.38, 0.24), 40);
      setTimeout(() => tone(36, 'sawtooth', 0.42, 0.2), 90);
      break;
    // 'error' phát ra liên tục mỗi khi ngón tay lướt qua ô không hợp lệ TRONG
    // LÚC KÉO (rất thường xuyên) — sóng sawtooth gắt trước đây dồn dập thành
    // tiếng "rè" khó chịu. Đổi sang tiếng "tách" mềm, ngắn, nhỏ hơn nhiều.
    // GIỮ NGUYÊN mức gain nhỏ này — đây là chủ đích thiết kế, không phải bug.
    case 'error': tone(210, 'sine', 0.04, 0.035); break;
    // 'win' — qua màn / các CTA thành công khác. Thêm lớp shimmer 1 octave
    // trên mỗi nốt (gain thấp) để hợp âm nghe "đầy/sáng" hơn, không chỉ là
    // 1 sóng sine mảnh lặp 4 lần.
    case 'win':
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => {
          tone(f, 'sine', 0.34, 0.17);
          tone(f * 2, 'sine', 0.22, 0.05);
        }, i * 90);
      });
      break;
    // 'lose' — descending minor sting for the fail modal itself, distinct
    // from 'explode' (which plays for the bomb blast a beat earlier). Sub
    // layer one octave down on each note adds weight/finality.
    case 'lose':
      [392, 349.23, 293.66].forEach((f, i) => {
        setTimeout(() => {
          tone(f, 'triangle', 0.32, 0.15);
          tone(f / 2, 'sine', 0.3, 0.06);
        }, i * 140);
      });
      break;
    // 'coin' — a single soft tick, meant to be fired several times in a
    // row for a reward count-up (Shop purchases, win-screen reward reveal).
    // Tiny high shimmer layered on top keeps it feeling "metallic" even at
    // low gain/short duration.
    case 'coin':
      tone(880, 'square', 0.06, 0.075);
      tone(1760, 'sine', 0.04, 0.025);
      break;
    // 'freeze' — icy chime when the Freeze buff activates.
    case 'freeze':
      tone(1400, 'sine', 0.14, 0.09);
      setTimeout(() => tone(1800, 'sine', 0.17, 0.08), 60);
      break;
    // 'timerTick' — Level Timer countdown, fires once per second once under
    // 20% time remaining (GDD 3.7: "tiếng tick nhẹ, tăng tần suất khi còn
    // <20% giờ"). Kept very quiet/short since it repeats.
    case 'timerTick': tone(660, 'sine', 0.05, 0.03); break;
    // 'timeout' — Level Timer hits 0, distinct from both 'lose' (bomb) and
    // 'error' so running out of time reads as its own kind of stop. Sub
    // thump under both notes gives it a heavier "buzzer" weight.
    case 'timeout':
      tone(110, 'sine', 0.2, 0.1, 0.006);
      tone(300, 'square', 0.12, 0.13);
      setTimeout(() => tone(220, 'square', 0.22, 0.13), 110);
      break;
    // 'purchase' — thanh toán/mua hàng thành công trong Shop (tiền thật qua
    // showPurchaseModal). Trước đây dùng chung 'win' nên mua gói VIP và qua
    // màn nghe giống nhau — tách riêng thành tiếng "cha-ching": 1 chuông
    // bell chạm ngay (triangle) + rung sáng dài hơi (sine cao), theo sau
    // bởi 2 nốt sparkle bay lên rồi 3 tiếng coin rơi lách cách khép lại —
    // rõ ràng là một giao dịch tiền, khác hẳn cảm giác "chiến thắng" của win.
    case 'purchase':
      tone(880, 'triangle', 0.06, 0.17, 0.002);
      tone(1318.51, 'sine', 0.3, 0.15);
      setTimeout(() => tone(1760, 'sine', 0.24, 0.1), 80);
      setTimeout(() => tone(2093, 'sine', 0.2, 0.07), 150);
      setTimeout(() => tone(880, 'square', 0.05, 0.075), 220);
      setTimeout(() => tone(880, 'square', 0.05, 0.075), 300);
      setTimeout(() => tone(1046.5, 'square', 0.07, 0.07), 380);
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
  const playNote = () => tone(MUSIC_NOTES[i++ % MUSIC_NOTES.length], 'sine', 1.6, 0.026);
  playNote();
  musicInterval = setInterval(playNote, 1400);
}

export function stopMusic() {
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
}
