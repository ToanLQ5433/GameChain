// Design tokens + UI helper cho concept "Soft Sky" — nền pastel sáng, thẻ
// trắng đổ bóng nhẹ, màu điểm nhấn bão hoà vừa phải (không neon gắt) — ngôn
// ngữ thị giác dễ nhìn/dễ tiếp cận của dòng game Two Dots/soft-UI casual,
// dùng chung cho mọi scene để toàn app nhất quán 1 phong cách sáng sủa.
import Phaser from 'phaser';

export const COLORS = {
  bgDeep: 0xeaf2ff,
  cardBg: 0xffffff,
  cardBgLight: 0xf4f8ff,
  cardBgHover: 0xe6eefd,
  gold: 0xffd166,
  goldDim: 0xe6ac2e,
  goldBorder: 0xffb020,
  teal: 0x3ec6d1,
  tealDim: 0x1f8a92,
  wood: 0xffffff,
  woodDark: 0xc3d3f2,
  ruby: 0xef5b6f,
  emerald: 0x34c774,
  ink: 0x33395c,
  parchment: 0xffffff
};

// Nền màn hình chuẩn: gradient trời pastel xanh-tím nhạt, không lưới toạ độ
// nặng nề — chỉ 1 dải màu êm, dùng lại ở mọi scene.
export function drawChartBackground(scene, width, height) {
  const g = scene.add.graphics();
  g.fillGradientStyle(0xeaf4ff, 0xeaf4ff, 0xe9e2ff, 0xe9e2ff, 1);
  g.fillRect(0, 0, width, height);
  return g;
}

// Panel/card trắng bo tròn, đổ bóng nhẹ phía dưới thay cho viền nổi — mọi
// khung nội dung dùng mẫu này (menu card, board frame, victory card, world-
// map frame).
export function drawPanel(scene, x, y, w, h, opts = {}) {
  const { radius = 22, fill = COLORS.cardBg, border = COLORS.woodDark, borderWidth = 2, alpha = 1, shadow = true } = opts;
  const g = scene.add.graphics();
  if (shadow) g.fillStyle(0x1b2340, 0.1).fillRoundedRect(x, y + 4, w, h, radius);
  g.fillStyle(fill, alpha).fillRoundedRect(x, y, w, h, radius);
  g.lineStyle(borderWidth, border, 1).strokeRoundedRect(x, y, w, h, radius);
  return g;
}

// Nút viên thuốc phẳng chuẩn mobile game Basic/Connect-Dots — bo tròn hết
// cỡ, không viền nổi 3D, chữ to rõ ràng (15px-18px) và diện tích bấm tối
// thiểu 44px-52px.
export function makeButton(scene, x, y, label, opts = {}) {
  const {
    variant = 'ink', fontSize = '15px', paddingX = 22, paddingY = 11,
    originX = 0.5, onClick = null, shadow = true, shadowOffset = 3, width: forcedWidth = null,
    minHeight = 46
  } = opts;

  const palette = {
    gold: { bg: COLORS.gold, border: COLORS.goldDim, text: '#33395c', hoverBg: 0xffdd94 },
    teal: { bg: null, border: COLORS.teal, text: '#1f8a92', hoverBg: 0xd7f5f2 },
    ink: { bg: COLORS.cardBg, border: COLORS.woodDark, text: '#33395c', hoverBg: COLORS.cardBgHover },
    tealSolid: { bg: COLORS.teal, border: COLORS.tealDim, text: '#ffffff', hoverBg: 0x5cdbe3 },
    ruby: { bg: 0xef5b6f, border: 0xc63b4e, text: '#ffffff', hoverBg: 0xf47a8a },
    blue: { bg: 0x4a90f2, border: 0x2f6fd6, text: '#ffffff', hoverBg: 0x6ba6ff },
    emerald: { bg: COLORS.emerald, border: 0x1f9d5c, text: '#ffffff', hoverBg: 0x4fe08c },
    parchment3D: { bg: COLORS.parchment, border: COLORS.woodDark, text: '#33395c', hoverBg: 0xffffff }
  }[variant] || { bg: COLORS.cardBg, border: COLORS.woodDark, text: '#33395c', hoverBg: COLORS.cardBgHover };

  const txt = scene.add.text(0, 0, label, {
    fontFamily: 'Baloo 2', fontSize, fontStyle: 'bold', color: palette.text
  }).setOrigin(0.5);

  const rawW = txt.width + paddingX * 2;
  const rawH = Math.max(minHeight, txt.height + paddingY * 2);
  const w = forcedWidth || rawW, h = rawH;
  const container = scene.add.container(0, 0);

  // Bóng đổ phẳng nhẹ — chỉ gợi ý độ nổi, không phải viền kẹo 3D.
  if (shadow) {
    const shadowG = scene.add.graphics();
    shadowG.fillStyle(0x1b2340, 0.16).fillRoundedRect(-w / 2, -h / 2 + shadowOffset, w, h, h / 2);
    container.add(shadowG);
  }

  const bg = scene.add.graphics();

  const drawBg = (fillColor, alpha) => {
    bg.clear();
    if (fillColor !== null) bg.fillStyle(fillColor, alpha !== undefined ? alpha : 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
    bg.lineStyle(2, palette.border, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
  };
  drawBg(palette.bg);
  container.add([bg, txt]);

  container.setPosition(x - (originX - 0.5) * w, y);
  container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
  container.input.cursor = 'pointer';
  container.on('pointerover', () => drawBg(palette.hoverBg, variant === 'teal' ? 0.5 : 1));
  container.on('pointerout', () => drawBg(palette.bg));
  container.on('pointerdown', () => {
    scene.tweens.add({ targets: container, scale: 0.92, duration: 60, yoyo: true });
    if (onClick) onClick();
  });
  container.width = w;
  container.height = h;
  return container;
}

// Nút Icon tròn phẳng chuẩn mobile (Settings ⚙️, Quay lại 🏠, Đóng ✕, Replay 🔄)
// Kích thước chuẩn 44x44px trở lên cho ngón tay bấm thoải mái.
export function makeIconButton(scene, x, y, icon, opts = {}) {
  const {
    size = 44, variant = 'wood', iconSize = '20px', onClick = null, shadow = true, shadowOffset = 3
  } = opts;

  const palette = {
    wood: { bg: COLORS.cardBg, border: COLORS.woodDark, iconColor: '#33395c', hoverBg: COLORS.cardBgHover },
    gold: { bg: COLORS.gold, border: COLORS.goldDim, iconColor: '#33395c', hoverBg: 0xffdd94 },
    teal: { bg: COLORS.teal, border: COLORS.tealDim, iconColor: '#ffffff', hoverBg: 0x5cdbe3 },
    ruby: { bg: COLORS.ruby, border: 0xc63b4e, iconColor: '#ffffff', hoverBg: 0xf47a8a },
    dark: { bg: COLORS.cardBg, border: COLORS.woodDark, iconColor: '#33395c', hoverBg: COLORS.cardBgHover }
  }[variant] || { bg: COLORS.cardBg, border: COLORS.woodDark, iconColor: '#33395c', hoverBg: COLORS.cardBgHover };

  const container = scene.add.container(x, y);

  if (shadow) {
    const shadowG = scene.add.graphics();
    shadowG.fillStyle(0x1b2340, 0.16).fillCircle(0, shadowOffset, size / 2);
    container.add(shadowG);
  }

  const bg = scene.add.graphics();
  const drawBg = (fillColor) => {
    bg.clear();
    bg.fillStyle(fillColor, 1).fillCircle(0, 0, size / 2);
    bg.lineStyle(2, palette.border, 1).strokeCircle(0, 0, size / 2);
  };
  drawBg(palette.bg);

  const txt = scene.add.text(0, 0, icon, {
    fontSize: iconSize, fontStyle: 'bold', color: palette.iconColor
  }).setOrigin(0.5);

  container.add([bg, txt]);
  container.setInteractive(new Phaser.Geom.Circle(0, 0, size / 2), Phaser.Geom.Circle.Contains);
  container.input.cursor = 'pointer';
  container.on('pointerover', () => drawBg(palette.hoverBg));
  container.on('pointerout', () => drawBg(palette.bg));
  container.on('pointerdown', () => {
    scene.tweens.add({ targets: container, scale: 0.90, duration: 60, yoyo: true });
    if (onClick) onClick();
  });
  return container;
}

// Chip HUD 2 dòng (nhãn nhỏ phía trên + giá trị đậm) — dùng cho các số liệu
// trên cùng màn hình (điểm số, xu, lượt đi...), viền teal hoặc gold tuỳ vai trò.
export function makeHudChip(scene, x, y, label, value, opts = {}) {
  const { variant = 'teal', originX = 0.5, minWidth = 72 } = opts;
  const border = variant === 'gold' ? COLORS.gold : COLORS.teal;
  const valueColor = variant === 'gold' ? '#e6ac2e' : '#1f8a92';

  const labelTxt = scene.add.text(0, -10, label, {
    fontFamily: 'Baloo 2', fontSize: '9px', color: '#8892ad', letterSpacing: 1
  }).setOrigin(0.5);
  const valueTxt = scene.add.text(0, 7, value, {
    fontFamily: 'Baloo 2', fontSize: '15px', fontStyle: '900', color: valueColor
  }).setOrigin(0.5);

  const w = Math.max(minWidth, Math.max(labelTxt.width, valueTxt.width) + 24);
  const h = 42;
  const bg = scene.add.graphics();
  bg.fillStyle(COLORS.cardBg, 1).fillRoundedRect(-w / 2, -h / 2, w, h, 10);
  bg.lineStyle(2, border, 0.9).strokeRoundedRect(-w / 2, -h / 2, w, h, 10);

  const container = scene.add.container(x - (originX - 0.5) * w, y, [bg, labelTxt, valueTxt]);
  container.setValueText = (v) => valueTxt.setText(v);
  container._valueTxt = valueTxt;
  return container;
}

// Icon-in-circle + cream pill (blue border, bold value) + optional green "+"
// quick-action button and/or a small red count `badge` riding on the icon
// itself (drawn AFTER the pill so it sits on top of the icon/pill seam
// instead of buried under it) — the big HUD stat cluster shared by Home and
// Shop's top bars, so both read as the same app instead of drifting apart.
// Icon and pill sit with a clean gap (no overlap) so nothing can ever visibly
// collide regardless of how long the pill's text gets.
// Returns rightEdge (to chain the next cluster's x off it) plus
// setValue/setBadge to keep both numbers live.
export function buildStatCluster(scene, x, y, { icon, iconBg, iconBorder, value, measureText, valueColor, onBuy, badge, badgeColor }) {
  const iconR = 18;
  const cx = x + iconR, cy = y + iconR;
  scene.add.circle(cx, cy, iconR, iconBg).setStrokeStyle(4, iconBorder);
  scene.add.text(cx, cy, icon, { fontSize: '16px' }).setOrigin(0.5);

  const pillH = 32, pillGap = 6, textPad = 10;
  const pillX = cx + iconR + pillGap;
  const measureTxt = scene.add.text(0, 0, measureText !== undefined ? measureText : String(value), {
    fontFamily: 'Baloo 2', fontSize: '13px', fontStyle: '900'
  });
  const textWidth = measureTxt.width;
  measureTxt.destroy();

  const pillW = Math.max(56, textWidth + textPad * 2);
  const pillG = scene.add.graphics();
  pillG.fillStyle(0xfff1de, 1).fillRoundedRect(pillX, cy - pillH / 2, pillW, pillH, pillH / 2);
  pillG.lineStyle(4, 0x16a5ff, 1).strokeRoundedRect(pillX, cy - pillH / 2, pillW, pillH, pillH / 2);

  const valueTxt = scene.add.text(pillX + textPad, cy, String(value), {
    fontFamily: 'Baloo 2', fontSize: '13px', fontStyle: '900', color: valueColor || '#3a4160'
  }).setOrigin(0, 0.5);

  let badgeTxt = null;
  if (badge !== undefined) {
    const badgeR = 9;
    const bx = cx + iconR * 0.68, by = cy - iconR * 0.68;
    scene.add.circle(bx, by, badgeR, badgeColor || 0xef4444).setStrokeStyle(2, 0xffffff);
    badgeTxt = scene.add.text(bx, by, String(badge), {
      fontFamily: 'Baloo 2', fontSize: '10px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5);
  }

  let rightEdge = pillX + pillW;
  if (onBuy) {
    const buyR = 12;
    const buyX = rightEdge + buyR + 2, buyY = cy;
    const buyBg = scene.add.circle(buyX, buyY, buyR, 0x67ee07).setStrokeStyle(3, 0x2f8c04);
    const plus = scene.add.graphics();
    plus.lineStyle(3, 0xd5ffb8, 1);
    plus.lineBetween(buyX - 5, buyY, buyX + 5, buyY);
    plus.lineBetween(buyX, buyY - 5, buyX, buyY + 5);
    const buyHit = scene.add.rectangle(buyX, buyY, buyR * 2 + 14, buyR * 2 + 14, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
    buyHit.on('pointerdown', () => {
      scene.tweens.add({ targets: [buyBg, plus], scale: 0.85, duration: 60, yoyo: true });
      onBuy();
    });
    rightEdge = buyX + buyR;
  }

  return {
    rightEdge,
    setValue: (v) => valueTxt.setText(String(v)),
    setBadge: (v) => { if (badgeTxt) badgeTxt.setText(String(v)); }
  };
}

// White pill chip (coloured icon circle + bold value) — dùng cho Coins/Lives
// trên mọi HUD (Home, Shop, Game top bar). `rightEdgeX` là mép phải của chip.
export function makeStatChip(scene, rightEdgeX, y, icon, value, accentColor) {
  const w = 78, h = 34;
  const xLeft = rightEdgeX - w;
  const g = scene.add.graphics();
  g.fillStyle(0xffffff, 1).fillRoundedRect(xLeft, y, w, h, 17);
  g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(xLeft, y, w, h, 17);
  scene.add.circle(xLeft + 17, y + h / 2, 13, accentColor).setStrokeStyle(2, COLORS.woodDark);
  scene.add.text(xLeft + 17, y + h / 2, icon, { fontSize: '13px' }).setOrigin(0.5);
  const valTxt = scene.add.text(xLeft + 36, y + h / 2, String(value), {
    fontFamily: 'Baloo 2', fontSize: '14px', fontStyle: '900', color: '#16213e'
  }).setOrigin(0, 0.5);
  return { setValue: (v) => valTxt.setText(String(v)), rightEdge: xLeft };
}
