// QA script: phát lại lời giải tay đã thiết kế cho từng level qua ChainEngine
// THẬT (chạy trong trình duyệt qua Playwright), xác nhận isWon() === true và
// không có lỗi console nào phát sinh. Không nằm trong bundle build.
import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';

// [categoryId, levelIndex, { chainId: [[r,c], ...] bao gồm cả ô anchor gốc }]
const SOLUTIONS = [
  ['vat-can', 0, { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1]], B: [[3,3],[3,2],[2,2],[2,3],[1,3],[0,3],[0,2],[0,1]] }],
  ['vat-can', 1, { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[1,0]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3]] }],
  ['vat-can', 2, { A: [[0,0],[1,0],[1,1],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2]], B: [[3,3],[3,2],[3,1],[3,0],[2,0]] }],

  ['dinh-huong-mau', 0, { A: [[0,0],[1,0],[1,1],[0,1],[0,2],[1,2]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3],[1,3],[0,3]] }],
  ['dinh-huong-mau', 1, { A: [[0,0],[1,0],[1,1],[2,1],[2,0],[3,0],[3,1],[3,2]], B: [[3,3],[2,3],[2,2],[1,2],[1,3],[0,3],[0,2],[0,1]] }],
  ['dinh-huong-mau', 2, { A: [[0,0],[1,0],[1,1],[2,1],[2,0],[3,0],[3,1],[3,2]], B: [[3,3],[2,3],[2,2],[1,2],[1,3],[0,3],[0,2],[0,1]] }],

  ['mat-ma-so', 0, { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[3,0]] }],
  ['mat-ma-so', 1, { A: [[2,2],[3,2],[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[3,3]] }],
  ['mat-ma-so', 2, { A: [[2,2],[2,1],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[4,5],[3,5],[2,5],[1,5],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[1,1],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[4,1],[3,1],[3,2],[3,3]] }],

  ['cong-tac', 0, { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[2,2]], B: [[3,0],[2,0],[1,0],[1,1],[2,1],[3,1],[3,2],[3,3],[2,3]] }],
  ['cong-tac', 1, { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1],[0,1]], B: [[3,3],[2,3],[1,3],[0,3],[0,2],[1,2],[2,2]] }],
  ['cong-tac', 2, { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1],[0,1]], B: [[3,3],[2,3],[1,3],[0,3],[0,2],[1,2],[2,2],[3,2]] }],

  ['bom-tinh', 0, { A: [[0,0],[1,0],[1,1],[1,2],[1,3],[0,3],[0,2],[0,1]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3]] }],
  ['bom-tinh', 1, { A: [[0,0],[0,1],[0,2],[1,2],[1,1],[1,0],[2,0],[3,0]], B: [[3,3],[3,2],[3,1],[2,1],[2,2],[2,3],[1,3],[0,3]] }],
  ['bom-tinh', 2, { A: [[0,0],[1,0],[1,1],[1,2],[2,2],[2,1],[2,0],[3,0]], B: [[3,3],[2,3],[1,3],[0,3],[0,2]] }],

  ['tong-hop', 0, { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[2,1],[2,2]], B: [[3,3],[2,3]] }],
  ['tong-hop', 1, { A: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[3,0]] }],
  ['tong-hop', 2, { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[2,1],[2,2],[2,3]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[1,0]] }]
];

async function run() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push('pageerror: ' + err.message));

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(400);

  const results = [];
  for (const [categoryId, levelIndex, chainPaths] of SOLUTIONS) {
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
  console.log(allOk ? '\nALL LEVELS SOLVABLE, NO CONSOLE ERRORS' : '\nSOME CHECKS FAILED');
  process.exit(allOk ? 0 : 1);
}

run();
