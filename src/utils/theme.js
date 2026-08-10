// Design tokens + UI helper lấy từ style guide Figma "Giải Mã Hải Hành"
// (navy sâu + gold + teal + khung gỗ), dùng chung cho mọi scene để toàn app
// nhất quán 1 phong cách thay vì mỗi scene tự bịa màu riêng.
import Phaser from 'phaser';

export const COLORS = {
  bgDeep: 0x04070d,
  cardBg: 0x0a1d33,
  cardBgLight: 0x0f2740,
  cardBgHover: 0x123049,
  gold: 0xf3c64f,
  goldDim: 0x8a6a10,
  goldBorder: 0xc9a13a,
  teal: 0x14b8a6,
  tealDim: 0x0a4c4f,
  wood: 0x5c3a21,
  woodDark: 0x3d2b1f,
  ruby: 0xa82e2e,
  emerald: 0x2a7b4c,
  ink: 0x2b1e16,
  parchment: 0xf4e8cf
};

// Nền hải đồ chuẩn: navy gần đen + lưới toạ độ mờ, dùng lại ở mọi scene.
export function drawChartBackground(scene, width, height) {
  scene.add.rectangle(0, 0, width, height, COLORS.bgDeep).setOrigin(0);
  const g = scene.add.graphics();
  g.lineStyle(1, COLORS.teal, 0.05);
  for (let x = 0; x < width; x += 32) g.lineBetween(x, 0, x, height);
  for (let y = 0; y < height; y += 32) g.lineBetween(0, y, width, y);
  return g;
}

// Panel/card viền vàng dày bo góc — mọi khung nội dung trong style guide đều
// dùng mẫu này (menu card, board frame, victory card, world-map frame).
export function drawPanel(scene, x, y, w, h, opts = {}) {
  const { radius = 18, fill = COLORS.cardBg, border = COLORS.gold, borderWidth = 3, alpha = 1 } = opts;
  const g = scene.add.graphics();
  g.fillStyle(fill, alpha).fillRoundedRect(x, y, w, h, radius);
  g.lineStyle(borderWidth, border, 1).strokeRoundedRect(x, y, w, h, radius);
  return g;
}

// Nút viên thuốc chuẩn mobile game (Candy/Wood/Gold style) — bo tròn, nổi 3D,
// chữ to rõ ràng (15px-18px) và diện tích bấm tối thiểu 44px-52px.
export function makeButton(scene, x, y, label, opts = {}) {
  const {
    variant = 'ink', fontSize = '15px', paddingX = 22, paddingY = 11,
    originX = 0.5, onClick = null, shadow = true, shadowOffset = 5, width: forcedWidth = null,
    minHeight = 46
  } = opts;

  const palette = {
    gold: { bg: COLORS.gold, border: COLORS.goldDim, text: '#2b1e16', hoverBg: 0xffe07a },
    teal: { bg: null, border: COLORS.teal, text: '#8fe8de', hoverBg: 0x0d2a28 },
    ink: { bg: COLORS.woodDark, border: COLORS.tealDim, text: '#f4e8cf', hoverBg: 0x4a3626 },
    tealSolid: { bg: COLORS.teal, border: COLORS.tealDim, text: '#ffffff', hoverBg: 0x18d4bd },
    ruby: { bg: 0xdd2d2d, border: 0x991b1b, text: '#ffffff', hoverBg: 0xef4444 },
    blue: { bg: 0x0284c7, border: 0x0369a1, text: '#ffffff', hoverBg: 0x38bdf8 },
    emerald: { bg: 0x65a30d, border: 0x3f6212, text: '#ffffff', hoverBg: 0x84cc16 },
    parchment3D: { bg: 0xdfc49c, border: 0x9e7b4f, text: '#42281d', hoverBg: 0xebd9bd }
  }[variant] || { bg: COLORS.woodDark, border: COLORS.tealDim, text: '#f4e8cf', hoverBg: 0x4a3626 };

  const txt = scene.add.text(0, 0, label, {
    fontFamily: 'Cinzel', fontSize, fontStyle: 'bold', color: palette.text
  }).setOrigin(0.5);

  const dotGap = variant === 'gold' ? 14 : 0;
  const rawW = txt.width + paddingX * 2 + dotGap * 2;
  const rawH = Math.max(minHeight, txt.height + paddingY * 2);
  const w = forcedWidth || rawW, h = rawH;
  const container = scene.add.container(0, 0);

  // Viền "kẹo 3D" — khối màu đậm lệch xuống dưới, tạo cảm giác nút nổi khối
  if (shadow) {
    const shadowG = scene.add.graphics();
    shadowG.fillStyle(palette.border, 1).fillRoundedRect(-w / 2, -h / 2 + shadowOffset, w, h, h / 2);
    container.add(shadowG);
  }

  const bg = scene.add.graphics();

  const drawBg = (fillColor, alpha) => {
    bg.clear();
    if (fillColor !== null) bg.fillStyle(fillColor, alpha !== undefined ? alpha : 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
    bg.lineStyle(3, palette.border, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
  };
  drawBg(palette.bg);
  container.add([bg, txt]);

  if (variant === 'gold') {
    const dotL = scene.add.circle(-w / 2 + paddingX * 0.7, 0, 3, 0x2b1e16, 0.7);
    const dotR = scene.add.circle(w / 2 - paddingX * 0.7, 0, 3, 0x2b1e16, 0.7);
    container.add([dotL, dotR]);
  }

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

// Nút Icon tròn/bo vuông nổi 3D chuẩn mobile (Settings ⚙️, Quay lại 🏠, Đóng ✕, Replay 🔄)
// Kích thước chuẩn 44x44px trở lên cho ngón tay bấm thoải mái.
export function makeIconButton(scene, x, y, icon, opts = {}) {
  const {
    size = 44, variant = 'wood', iconSize = '20px', onClick = null, shadow = true, shadowOffset = 4
  } = opts;

  const palette = {
    wood: { bg: COLORS.parchment, border: COLORS.woodDark, iconColor: '#2b1e16', hoverBg: 0xfff6e5 },
    gold: { bg: COLORS.gold, border: COLORS.goldDim, iconColor: '#2b1e16', hoverBg: 0xffe07a },
    teal: { bg: COLORS.teal, border: COLORS.tealDim, iconColor: '#ffffff', hoverBg: 0x18d4bd },
    ruby: { bg: 0xe0605a, border: COLORS.ruby, iconColor: '#ffffff', hoverBg: 0xf47a74 },
    dark: { bg: COLORS.cardBgLight, border: COLORS.goldBorder, iconColor: '#f3c64f', hoverBg: 0x183a5e }
  }[variant] || { bg: COLORS.parchment, border: COLORS.woodDark, iconColor: '#2b1e16', hoverBg: 0xfff6e5 };

  const container = scene.add.container(x, y);

  if (shadow) {
    const shadowG = scene.add.graphics();
    shadowG.fillStyle(palette.border, 1).fillCircle(0, shadowOffset, size / 2);
    container.add(shadowG);
  }

  const bg = scene.add.graphics();
  const drawBg = (fillColor) => {
    bg.clear();
    bg.fillStyle(fillColor, 1).fillCircle(0, 0, size / 2);
    bg.lineStyle(3, palette.border, 1).strokeCircle(0, 0, size / 2);
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
  const valueColor = variant === 'gold' ? '#f3c64f' : '#7fe9de';

  const labelTxt = scene.add.text(0, -10, label, {
    fontFamily: 'Cinzel', fontSize: '9px', color: '#9fb8c9', letterSpacing: 1
  }).setOrigin(0.5);
  const valueTxt = scene.add.text(0, 7, value, {
    fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: valueColor
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
    fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#2b1e16'
  }).setOrigin(0, 0.5);
  return { setValue: (v) => valTxt.setText(String(v)), rightEdge: xLeft };
}
