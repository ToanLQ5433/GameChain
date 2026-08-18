import fs from 'fs';

// Read generated 50 levels and update names to clean, basic mechanical notes.
// Các mốc số idx cố định bên dưới (1,2,3,4,5,11,21,22,31,41) khớp đúng ranh giới
// chương của scripts/gen-50-sawtooth.mjs (Chương 1 L01-10, Chương 2 từ L11...).
// Script này CHỈ nên chạy trên scripts/generated_50_levels.json — không chạy trên
// các file *-experimental.json (chương/thứ tự cơ chế khác).
const levels = JSON.parse(fs.readFileSync('scripts/generated_50_levels.json', 'utf8'));
if (levels.length !== 50) {
  console.error(`FATAL: expected 50 levels, got ${levels.length}. Refusing to rename — `
    + `this script assumes the gen-50-sawtooth.mjs chapter layout and would mislabel a different-sized suite.`);
  process.exit(1);
}

levels.forEach((lvl, idx) => {
  const num = idx + 1;
  const R = lvl.grid.rows, C = lvl.grid.cols;
  const K = lvl.anchors.length;
  const rocks = lvl.rocks ? lvl.rocks.length : 0;
  const walls = lvl.walls ? lvl.walls.length : 0;
  const push = lvl.pushRocks ? lvl.pushRocks.length : 0;
  const sw = lvl.switches ? lvl.switches.length : 0;
  const prism = lvl.prisms ? lvl.prisms.length : 0;
  const wp = lvl.waypoints ? Object.keys(lvl.waypoints).length : 0;

  let mechNote = `${K} Dây (${R}×${C})`;
  if (num === 1) mechNote = `Tutorial · 1 Dây (${R}×${C})`;
  else if (num === 2) mechNote = `2 Dây (${R}×${C})`;
  else if (num === 3) mechNote = `1 Vách ngăn (${R}×${C})`;
  else if (num === 4) mechNote = `2 Vách ngăn (${R}×${C})`;
  else if (num === 5) mechNote = `1 Đá tảng (${R}×${C})`;
  else if (num === 11) mechNote = `Intro: 1 Thùng hàng (${R}×${C})`;
  else if (num === 21) mechNote = `Intro: 1 Lăng kính (${R}×${C})`;
  else if (num === 22) mechNote = `Intro: 1 Cổng màu (${R}×${C})`;
  else if (num === 31) mechNote = `Intro: 1 Công tắc & Cổng (${R}×${C})`;
  else if (num === 41) mechNote = `Intro: Mật mã số 1-2 (${R}×${C})`;
  else {
    const parts = [`${K} Dây`];
    if (push > 0) parts.push(`${push} Thùng`);
    if (prism > 0) parts.push(`${prism} Lăng kính`);
    if (sw > 0) parts.push(`${sw} Công tắc`);
    if (wp > 0) parts.push(`Mật mã`);
    if (rocks > 0) parts.push(`${rocks} Đá`);
    if (walls > 0) parts.push(`${walls} Vách`);
    if (lvl.shape) parts.push(`Shape`);
    mechNote = `${parts.join(' + ')} (${R}×${C})`;
  }

  lvl.name = mechNote;
});

fs.writeFileSync('scripts/generated_50_levels.json', JSON.stringify(levels, null, 2));
console.log('Successfully updated 50 levels with clean basic descriptive names!');
