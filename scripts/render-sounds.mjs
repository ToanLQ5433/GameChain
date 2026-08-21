// Render lại toàn bộ file .wav trong unity-export/sounds/ đúng theo công thức
// tổng hợp âm hiện tại trong src/utils/audio.js (tone() + playSound()).
// Không có Web Audio API trong Node nên script tự viết oscillator (sine/
// square/triangle/sawtooth) + envelope attack/decay bằng tay, encode thẳng
// ra PCM 16-bit mono 44.1kHz — không phụ thuộc thư viện ngoài.
//
// Chạy: node scripts/render-sounds.mjs
// Mỗi khi sửa gain/duration/case nào trong audio.js, sửa tương ứng ở
// SOUNDS/MUSIC dưới đây rồi chạy lại để WAV không bị lệch so với code.

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'unity-export', 'sounds');

const SAMPLE_RATE = 44100;

function waveform(type, phase01) {
  // phase01 = frac(f*t), trong [0,1)
  const p = phase01 - Math.floor(phase01);
  switch (type) {
    case 'sine': return Math.sin(2 * Math.PI * p);
    case 'square': return p < 0.5 ? 1 : -1;
    case 'triangle': return p < 0.5 ? (4 * p - 1) : (3 - 4 * p);
    case 'sawtooth': return 2 * p - 1;
    default: return 0;
  }
}

// Envelope giống hệt tone() trong audio.js: ramp mũ từ 0.0001 lên gainVal
// trong `attack` giây, rồi ramp mũ xuống 0.0001 trong `duration` giây.
function envelope(t, attack, duration, gainVal) {
  const floor = 0.0001;
  if (t < 0) return 0;
  if (t <= attack) {
    if (attack <= 0) return gainVal;
    const ratio = t / attack;
    return floor * Math.pow(gainVal / floor, ratio);
  }
  const dt = t - attack;
  if (dt > duration) return 0;
  const ratio = dt / duration;
  return gainVal * Math.pow(floor / gainVal, ratio);
}

// hits: [{delay, freq, type, duration, gain, attack}]
function renderHits(hits) {
  const tailPad = 0.02;
  const totalDur = Math.max(...hits.map(h => h.delay + (h.attack ?? 0.005) + h.duration)) + tailPad;
  const n = Math.ceil(totalDur * SAMPLE_RATE);
  const buf = new Float64Array(n);
  for (const h of hits) {
    const attack = h.attack ?? 0.005;
    const startSample = Math.floor(h.delay * SAMPLE_RATE);
    const endT = attack + h.duration + tailPad;
    const hitSamples = Math.ceil(endT * SAMPLE_RATE);
    for (let i = 0; i < hitSamples; i++) {
      const idx = startSample + i;
      if (idx >= n) break;
      const t = i / SAMPLE_RATE;
      const g = envelope(t, attack, h.duration, h.gain);
      if (g <= 0.0001) continue;
      const phase = (h.freq * t);
      buf[idx] += g * waveform(h.type, phase);
    }
  }
  return buf;
}

function peakOf(samples) {
  let p = 0;
  for (let i = 0; i < samples.length; i++) p = Math.max(p, Math.abs(samples[i]));
  return p;
}

function floatToWavBuffer(samples) {
  // Soft-clip nhẹ để tránh clipping cứng khi nhiều lớp cộng dồn (ví dụ
  // 'purchase', 'win', 'explode' chồng nhiều oscillator).
  const header = Buffer.alloc(44);
  const dataSize = samples.length * 2;
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28); // byte rate (mono, 16-bit)
  header.writeUInt16LE(2, 32); // block align
  header.writeUInt16LE(16, 34); // bits per sample
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(dataSize, 40);

  const data = Buffer.alloc(dataSize);
  for (let i = 0; i < samples.length; i++) {
    let v = samples[i];
    // soft clip mềm (tanh) chỉ áp dụng khi vượt biên, giữ nguyên phần lớn
    // biên độ tuyến tính bên trong [-1, 1]
    if (v > 1 || v < -1) v = Math.tanh(v);
    const s = Math.max(-1, Math.min(1, v));
    data.writeInt16LE(Math.round(s * 32767), i * 2);
  }
  return Buffer.concat([header, data]);
}

function renderSfx(hits) {
  return floatToWavBuffer(renderHits(hits));
}

// ---- Định nghĩa từng SFX — PHẢI khớp với case tương ứng trong audio.js ----

const SOUNDS = {
  sfx_step: [
    { delay: 0, freq: 320, type: 'sine', duration: 0.09, gain: 0.085 },
  ],
  sfx_lock: [
    { delay: 0, freq: 540, type: 'triangle', duration: 0.16, gain: 0.13 },
    { delay: 0, freq: 1080, type: 'sine', duration: 0.1, gain: 0.045 },
  ],
  sfx_switch: [
    { delay: 0, freq: 240, type: 'square', duration: 0.09, gain: 0.095 },
  ],
  sfx_push: [
    { delay: 0, freq: 200, type: 'triangle', duration: 0.13, gain: 0.12 },
  ],
  sfx_bomb: [
    { delay: 0, freq: 110, type: 'sawtooth', duration: 0.32, gain: 0.19 },
  ],
  sfx_crack: [
    { delay: 0, freq: 90, type: 'sine', duration: 0.15, gain: 0.12, attack: 0.002 },
    { delay: 0, freq: 680, type: 'square', duration: 0.06, gain: 0.17, attack: 0.003 },
    { delay: 0.03, freq: 150, type: 'sawtooth', duration: 0.22, gain: 0.2 },
  ],
  sfx_explode: [
    { delay: 0, freq: 26, type: 'sine', duration: 0.55, gain: 0.16, attack: 0.006 },
    { delay: 0, freq: 92, type: 'sawtooth', duration: 0.5, gain: 0.3, attack: 0.004 },
    { delay: 0.04, freq: 55, type: 'square', duration: 0.38, gain: 0.24 },
    { delay: 0.09, freq: 36, type: 'sawtooth', duration: 0.42, gain: 0.2 },
  ],
  sfx_error: [
    { delay: 0, freq: 210, type: 'sine', duration: 0.04, gain: 0.035 },
  ],
  sfx_win: [523.25, 659.25, 783.99, 1046.5].flatMap((f, i) => [
    { delay: i * 0.09, freq: f, type: 'sine', duration: 0.34, gain: 0.17 },
    { delay: i * 0.09, freq: f * 2, type: 'sine', duration: 0.22, gain: 0.05 },
  ]),
  sfx_lose: [392, 349.23, 293.66].flatMap((f, i) => [
    { delay: i * 0.14, freq: f, type: 'triangle', duration: 0.32, gain: 0.15 },
    { delay: i * 0.14, freq: f / 2, type: 'sine', duration: 0.3, gain: 0.06 },
  ]),
  sfx_coin: [
    { delay: 0, freq: 880, type: 'square', duration: 0.06, gain: 0.075 },
    { delay: 0, freq: 1760, type: 'sine', duration: 0.04, gain: 0.025 },
  ],
  sfx_freeze: [
    { delay: 0, freq: 1400, type: 'sine', duration: 0.14, gain: 0.09 },
    { delay: 0.06, freq: 1800, type: 'sine', duration: 0.17, gain: 0.08 },
  ],
  sfx_timerTick: [
    { delay: 0, freq: 660, type: 'sine', duration: 0.05, gain: 0.03 },
  ],
  sfx_timeout: [
    { delay: 0, freq: 110, type: 'sine', duration: 0.2, gain: 0.1, attack: 0.006 },
    { delay: 0, freq: 300, type: 'square', duration: 0.12, gain: 0.13 },
    { delay: 0.11, freq: 220, type: 'square', duration: 0.22, gain: 0.13 },
  ],
  // MỚI — thanh toán/mua hàng thành công trong Shop (không còn dùng chung 'win').
  sfx_purchase: [
    { delay: 0, freq: 880, type: 'triangle', duration: 0.06, gain: 0.17, attack: 0.002 },
    { delay: 0, freq: 1318.51, type: 'sine', duration: 0.3, gain: 0.15 },
    { delay: 0.08, freq: 1760, type: 'sine', duration: 0.24, gain: 0.1 },
    { delay: 0.15, freq: 2093, type: 'sine', duration: 0.2, gain: 0.07 },
    { delay: 0.22, freq: 880, type: 'square', duration: 0.05, gain: 0.075 },
    { delay: 0.3, freq: 880, type: 'square', duration: 0.05, gain: 0.075 },
    { delay: 0.38, freq: 1046.5, type: 'square', duration: 0.07, gain: 0.07 },
  ],
};

// ---- Nhạc nền — khớp startMusic() trong audio.js ----
const MUSIC_NOTES = [261.63, 329.63, 392.0, 329.63];
const musicHits = MUSIC_NOTES.map((f, i) => ({
  delay: i * 1.4, freq: f, type: 'sine', duration: 1.6, gain: 0.026,
}));

mkdirSync(OUT_DIR, { recursive: true });

// Render tất cả SFX ra buffer thô trước, đo peak chung của toàn bộ nhóm, rồi
// nhân MỘT hệ số duy nhất cho tất cả — đây là cách README đã mô tả ("độ to
// tương đối giữa các sound đã được giữ đúng theo bản gốc"): scale cùng lúc,
// không normalize riêng từng file, để 'error'/'timerTick' vẫn nhỏ hơn hẳn
// 'explode' như đúng chủ đích thiết kế, nhưng cả nhóm đủ to trên loa mobile.
// Target 0.92 (không phải 1.0) để chừa headroom, tránh clip khi decode lại
// trên các thiết bị/engine khác nhau.
const SFX_TARGET_PEAK = 0.92;
const rawSfx = {};
for (const [name, hits] of Object.entries(SOUNDS)) rawSfx[name] = renderHits(hits);
const sfxPeak = Math.max(...Object.values(rawSfx).map(peakOf));
const sfxScale = SFX_TARGET_PEAK / sfxPeak;

for (const [name, buf] of Object.entries(rawSfx)) {
  const scaled = buf.map(v => v * sfxScale);
  const wav = floatToWavBuffer(scaled);
  writeFileSync(join(OUT_DIR, `${name}.wav`), wav);
  console.log(`wrote ${name}.wav (${wav.length} bytes, peak ${(peakOf(buf) * sfxScale).toFixed(3)})`);
}

// Nhạc nền chuẩn hoá riêng, thấp hơn nhóm SFX — nhạc nền chạy liên tục dưới
// gameplay nên không được to bằng SFX phản hồi, chỉ cần đủ "sống" hơn bản cũ.
const MUSIC_TARGET_PEAK = 0.45;
const rawMusic = renderHits(musicHits);
const musicScale = MUSIC_TARGET_PEAK / peakOf(rawMusic);
const musicWav = floatToWavBuffer(rawMusic.map(v => v * musicScale));
writeFileSync(join(OUT_DIR, 'music_loop.wav'), musicWav);
console.log(`wrote music_loop.wav (${musicWav.length} bytes, peak ${MUSIC_TARGET_PEAK})`);

// Xuất thêm bản .ogg (Ogg Vorbis) song song với .wav cho mỗi file — Unity's AudioClip importer
// đọc .ogg như Vorbis thật (không phải Opus dù cùng "container" Ogg), nên bắt buộc dùng đúng
// codec libvorbis, không phải afconvert của macOS (chỉ decode được vorb, không encode được).
// Giữ lại .wav (không xoá) — .wav để nghe thử/chỉnh sửa tại máy, .ogg để kéo thẳng vào Unity.
const allWavNames = [...Object.keys(SOUNDS), 'music_loop'];
for (const name of allWavNames) {
  const wavPath = join(OUT_DIR, `${name}.wav`);
  const oggPath = join(OUT_DIR, `${name}.ogg`);
  execFileSync(ffmpegPath, ['-y', '-loglevel', 'error', '-i', wavPath, '-c:a', 'libvorbis', '-q:a', '6', oggPath]);
  console.log(`wrote ${name}.ogg`);
}
