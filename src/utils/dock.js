// Shared bottom "candy dock" — a single continuous 3-panel nav bar (Shop/Lock
// cream side panels + a taller gold-accented podium for whichever tab is
// active) used identically by Home and Shop, so switching between them never
// reads as leaving one app and landing in a different one.
import { COLORS } from './theme.js';

export const DOCK_HOME_H = 92;

export function buildBottomDock(scene, width, height, { active, onShop, onHome, onLock }) {
  const sideH = 76, homeH = DOCK_HOME_H, bleed = 30, R = 28;
  const homeW = Math.min(width * 0.38, 150);
  const homeX = width / 2 - homeW / 2;
  const sideW = (width - homeW) / 2;
  const sideY = height - sideH;
  const homeY = height - homeH;

  const drawDockPanel = (x, y, w, h, fill, radii) => {
    const g = scene.add.graphics();
    g.fillStyle(fill, 1).fillRoundedRect(x, y, w, h + bleed, radii);
    g.lineStyle(5, 0xe7ccb1, 1).strokeRoundedRect(x, y, w, h + bleed, radii);
  };

  drawDockPanel(0, sideY, sideW, sideH, 0xfee1b9, { tl: R, tr: 0, bl: 0, br: 0 });
  drawDockPanel(width - sideW, sideY, sideW, sideH, 0xfee1b9, { tl: 0, tr: R, bl: 0, br: 0 });
  drawDockPanel(homeX, homeY, homeW, homeH, 0xfff1de, { tl: R, tr: R, bl: 0, br: 0 });

  buildDockButton(scene, sideW / 2, sideY + 6, '🏪', 'SHOP', onShop, active === 'shop');
  buildDockButton(scene, homeX + homeW / 2, homeY + 2, '🏠', 'HOME', onHome, active === 'home');
  buildDockButton(scene, width - sideW / 2, sideY + 6, '🔒', 'SOON', onLock, active === 'lock');
}

function buildDockButton(scene, cx, topY, icon, label, onClick, isActive) {
  const size = isActive ? 58 : 46;
  const iconY = topY + size / 2 + 4;
  const iconBg = scene.add.graphics();
  iconBg.fillStyle(isActive ? COLORS.gold : 0xffffff, 1).fillRoundedRect(cx - size / 2, iconY - size / 2, size, size, 14);
  iconBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(cx - size / 2, iconY - size / 2, size, size, 14);
  scene.add.text(cx, iconY, icon, { fontSize: (isActive ? 26 : 20) + 'px' }).setOrigin(0.5);
  scene.add.text(cx, iconY + size / 2 + 12, label, {
    fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#36324c'
  }).setOrigin(0.5);

  const hit = scene.add.rectangle(cx, topY + 40, size + 22, 90, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
  hit.on('pointerdown', () => {
    scene.tweens.add({ targets: iconBg, scale: 0.9, duration: 60, yoyo: true });
    if (onClick) onClick();
  });
}
