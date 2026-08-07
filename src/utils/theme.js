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

// Nút viên thuốc — 2 biến thể đúng style guide:
//  'gold'  = CTA chính, nền vàng đặc + 2 chấm tròn hai bên nhãn ("• LABEL •")
//  'teal'  = hành động phụ, viền teal trong suốt
//  'ink'   = trung tính (mặc định cho nút tiện ích như "Chơi Lại")
export function makeButton(scene, x, y, label, opts = {}) {
  const {
    variant = 'ink', fontSize = '12px', paddingX = 18, paddingY = 9,
    originX = 0.5, onClick = null
  } = opts;

  const palette = {
    gold: { bg: COLORS.gold, border: COLORS.goldDim, text: '#2b1e16', hoverBg: 0xffe07a },
    teal: { bg: null, border: COLORS.teal, text: '#8fe8de', hoverBg: 0x0d2a28 },
    ink: { bg: COLORS.woodDark, border: COLORS.tealDim, text: '#f4e8cf', hoverBg: 0x4a3626 }
  }[variant];

  const txt = scene.add.text(0, 0, label, {
    fontFamily: 'Cinzel', fontSize, fontStyle: 'bold', color: palette.text
  }).setOrigin(0.5);

  const dotGap = variant === 'gold' ? 14 : 0;
  const w = txt.width + paddingX * 2 + dotGap * 2, h = txt.height + paddingY * 2;
  const container = scene.add.container(0, 0);
  const bg = scene.add.graphics();

  const drawBg = (fillColor, alpha) => {
    bg.clear();
    if (fillColor !== null) bg.fillStyle(fillColor, alpha !== undefined ? alpha : 1).fillRoundedRect(-w / 2, -h / 2, w, h, h / 2);
    bg.lineStyle(2, palette.border, 1).strokeRoundedRect(-w / 2, -h / 2, w, h, h / 2);
  };
  drawBg(palette.bg);
  container.add([bg, txt]);

  if (variant === 'gold') {
    const dotL = scene.add.circle(-w / 2 + paddingX * 0.7, 0, 2.4, 0x2b1e16, 0.7);
    const dotR = scene.add.circle(w / 2 - paddingX * 0.7, 0, 2.4, 0x2b1e16, 0.7);
    container.add([dotL, dotR]);
  }

  container.setPosition(x - (originX - 0.5) * w, y);
  container.setInteractive(new Phaser.Geom.Rectangle(-w / 2, -h / 2, w, h), Phaser.Geom.Rectangle.Contains);
  container.input.cursor = 'pointer';
  container.on('pointerover', () => drawBg(palette.hoverBg, variant === 'teal' ? 0.5 : 1));
  container.on('pointerout', () => drawBg(palette.bg));
  container.on('pointerdown', () => {
    scene.tweens.add({ targets: container, scale: 0.93, duration: 60, yoyo: true });
    if (onClick) onClick();
  });
  container.width = w;
  container.height = h;
  return container;
}

// Chip HUD 2 dòng (nhãn nhỏ phía trên + giá trị đậm) — dùng cho các số liệu
// trên cùng màn hình (điểm số, xu, lượt đi...), viền teal hoặc gold tuỳ vai trò.
export function makeHudChip(scene, x, y, label, value, opts = {}) {
  const { variant = 'teal', originX = 0.5, minWidth = 64 } = opts;
  const border = variant === 'gold' ? COLORS.gold : COLORS.teal;
  const valueColor = variant === 'gold' ? '#f3c64f' : '#7fe9de';

  const labelTxt = scene.add.text(0, -9, label, {
    fontFamily: 'Cinzel', fontSize: '7px', color: '#9fb8c9', letterSpacing: 1
  }).setOrigin(0.5);
  const valueTxt = scene.add.text(0, 6, value, {
    fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: valueColor
  }).setOrigin(0.5);

  const w = Math.max(minWidth, Math.max(labelTxt.width, valueTxt.width) + 20);
  const h = 38;
  const bg = scene.add.graphics();
  bg.fillStyle(COLORS.cardBg, 1).fillRoundedRect(-w / 2, -h / 2, w, h, 8);
  bg.lineStyle(1.5, border, 0.9).strokeRoundedRect(-w / 2, -h / 2, w, h, 8);

  const container = scene.add.container(x - (originX - 0.5) * w, y, [bg, labelTxt, valueTxt]);
  container.setValueText = (v) => valueTxt.setText(v);
  container._valueTxt = valueTxt;
  return container;
}
