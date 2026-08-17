import fs from 'fs';
import vm from 'vm';

const forgeHtml = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');
const levelsJson = fs.readFileSync('scripts/generated_50_levels.json', 'utf8');

// Extract Script 1
const startScript1 = forgeHtml.indexOf('<script>') + 8;
const endScript1 = forgeHtml.indexOf('</script>');
const script1 = forgeHtml.substring(startScript1, endScript1);

// Extract boardSVG
const startSvg = forgeHtml.indexOf('function boardSVG(p, o) {');
const endSvg = forgeHtml.indexOf('/* ================= INTERACTIVE SHAPE PAINTER MODULE ================= */');
const boardSvgFunc = forgeHtml.substring(startSvg, endSvg);

console.log('Script 1 length:', script1.length);
console.log('boardSVG length:', boardSvgFunc.length);

const testCode = `
${script1}

const CHHEX = ['#2a78d6', '#eb6834', '#1baf7a', '#4a3aa7'];
const COLOR_HEX_MAP = { red: '#ef4444', blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6' };
const TCOL = ['', 'var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)', 'var(--t5)'];
const SCOL = ['', 'var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)'];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

${boardSvgFunc}

const rawLevels = ${levelsJson};
console.log('Loaded ' + rawLevels.length + ' levels.');
const p0 = new Puzzle(rawLevels[0].grid.rows, rawLevels[0].grid.cols, rawLevels[0].shape);
rawLevels[0].anchors.forEach(a => p0.anchors.push({ cell: a.row * p0.C + a.col, L: a.length, color: a.color }));
const svg = boardSVG(p0, { cs: 46 });
console.log('boardSVG generated length:', svg.length);
`;

const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(testCode, sandbox);
console.log('ALL VERIFIED IN VM!');
