// QA script: phát lại lời giải (trường `solution` sinh kèm mỗi màn trong
// src/data/levels.js) qua ChainEngine THẬT chạy trong trình duyệt, xác nhận
// isWon() === true và không có lỗi console nào phát sinh. Không nằm trong
// bundle build. Đây là lớp kiểm tra bổ sung ở tầng UI/Phaser thật — kiểm tra
// chính (toàn bộ 210 màn, không cần trình duyệt) nằm ngay trong
// scripts/gen-levels.mjs mỗi khi sinh lại level.
import { chromium } from 'playwright';
import { CATEGORIES } from '../src/data/levels.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
// Mặc định chỉ kiểm tra 1 màn đầu + 1 màn cuối mỗi thể loại (đủ để phát hiện
// lỗi tích hợp UI/Phaser thật mà không phải chạy hết 210 màn qua trình duyệt
// — việc đó đã làm nhanh hơn nhiều lần bằng Node thuần trong gen-levels.mjs).
// Đặt SAMPLE=all để chạy toàn bộ.
const SAMPLE = process.env.SAMPLE || 'edges';

function pickSamples() {
  const out = [];
  for (const cat of CATEGORIES) {
    const idxs = SAMPLE === 'all'
      ? cat.levels.map((_, i) => i)
      : [...new Set([0, Math.floor(cat.levels.length / 2), cat.levels.length - 1])];
    for (const i of idxs) out.push([cat.id, i, cat.levels[i].solution]);
  }
  return out;
}

async function run() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push('pageerror: ' + err.message));

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(400);

  const samples = pickSamples();
  const results = [];
  for (const [categoryId, levelIndex, chainPaths] of samples) {
    await page.evaluate(({ categoryId, levelIndex }) => {
      window.game.scene.start('Game', { categoryId, levelIndex });
    }, { categoryId, levelIndex });
    await page.waitForTimeout(150);

    const outcome = await page.evaluate((chainPaths) => {
      const engine = window.__engine;
      if (!engine) return { error: 'no-engine' };
      try {
        for (const chainId of Object.keys(chainPaths)) {
          const path = chainPaths[chainId];
          const [startR, startC] = path[0];
          const chain = engine.startDrag(startR, startC);
          if (!chain || chain.id !== chainId) {
            return { error: `startDrag failed for ${chainId} at ${startR},${startC}` };
          }
          for (let i = 1; i < path.length; i++) {
            const [r, c] = path[i];
            const res = engine.step(r, c);
            if (res.result !== 'OK') {
              return { error: `step failed chain ${chainId} at index ${i} -> (${r},${c}): ${res.result} ${res.reason || ''}` };
            }
          }
          const end = engine.endDrag();
          if (!end.locked) {
            return { error: `endDrag did not lock chain ${chainId}: ${JSON.stringify(end)}` };
          }
        }
        return { won: engine.isWon() };
      } catch (e) {
        return { error: 'exception: ' + e.message };
      }
    }, chainPaths);

    results.push({ categoryId, levelIndex, outcome });
  }

  await browser.close();

  let allOk = true;
  for (const r of results) {
    const ok = r.outcome.won === true;
    if (!ok) allOk = false;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.categoryId}[${r.levelIndex}]`, ok ? '' : JSON.stringify(r.outcome));
  }
  if (consoleErrors.length) {
    allOk = false;
    console.log('\nConsole errors captured:');
    consoleErrors.forEach(e => console.log(' -', e));
  }
  console.log(allOk ? '\nALL SAMPLED LEVELS SOLVABLE, NO CONSOLE ERRORS' : '\nSOME CHECKS FAILED');
  process.exit(allOk ? 0 : 1);
}

run();
