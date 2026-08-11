// Shared bottom "candy dock" — a single continuous 3-panel nav bar (Shop/Lock
// cream side panels + a taller gold-accented podium for whichever tab is
// active) used identically by Home and Shop, so switching between them never
// reads as leaving one app and landing in a different one.
import { COLORS } from './theme.js';

// Panel heights: the icon+label content is ~62-66px tall. The old
// sideH=76/homeH=92 combined with a `topY+size/2+4` icon offset put the
// label only ~8px from the panel's own bottom edge (the phone's bottom
// corner) and, on the side buttons, the icon's top edge slightly ABOVE the
// panel's own top edge — poking out over the rounded corner instead of
// sitting inside it. Grew both panels and moved to a plain `topY + margin`
// offset so icon+label always have clear, even margin on every side.
const SIDE_H = 84;
export const DOCK_HOME_H = 104;

export function buildBottomDock(scene, width, height, { active, onShop, onHome, onLock }) {
  const sideH = SIDE_H, homeH = DOCK_HOME_H, bleed = 30, R = 28;
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

  // isCenter (which slot sits in the tall podium panel) is a FIXED layout
  // fact — always the Home slot — independent of `active` (which tab is
  // the current screen). Conflating the two used to size the Shop button
  // as if it were the tall center button while ShopScene's own dock still
  // drew it inside the short side panel: an oversized 58px icon + 90px
  // hit-rect crammed into a 76px panel, overflowing its own slot.
  buildDockButton(scene, sideW / 2, sideY + 10, '🏪', 'SHOP', onShop, false, active === 'shop');
  buildDockButton(scene, homeX + homeW / 2, homeY + 10, '🏠', 'HOME', onHome, true, active === 'home');
  buildDockButton(scene, width - sideW / 2, sideY + 10, '🔒', 'SOON', onLock, false, active === 'lock');
}

function buildDockButton(scene, cx, topY, icon, label, onClick, isCenter, isActiveTab) {
  const size = isCenter ? 58 : 46;
  const iconY = topY + size / 2;
  const iconBg = scene.add.graphics();
  const bgColor = isCenter ? COLORS.gold : (isActiveTab ? 0xffe9b0 : 0xffffff);
  const borderColor = !isCenter && isActiveTab ? COLORS.gold : COLORS.woodDark;
  iconBg.fillStyle(bgColor, 1).fillRoundedRect(cx - size / 2, iconY - size / 2, size, size, 14);
  iconBg.lineStyle(3, borderColor, 1).strokeRoundedRect(cx - size / 2, iconY - size / 2, size, size, 14);
  scene.add.text(cx, iconY, icon, { fontSize: (isCenter ? 26 : 20) + 'px' }).setOrigin(0.5);
  scene.add.text(cx, iconY + size / 2 + 10, label, {
    fontFamily: 'Cinzel', fontSize: '9px', fontStyle: '900', color: '#36324c'
  }).setOrigin(0.5);

  const hit = scene.add.rectangle(cx, topY + 34, size + 22, 84, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
  hit.on('pointerdown', () => {
    scene.tweens.add({ targets: iconBg, scale: 0.9, duration: 60, yoyo: true });
    if (onClick) onClick();
  });
}
