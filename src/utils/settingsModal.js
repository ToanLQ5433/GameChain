// Shared Settings modal — used by both Home and GameScene so the toggle
// list (Sound/Music/Haptic), Privacy Policy, and Restore Purchase rows only
// exist in one place. GameScene additionally passes onRestartLevel /
// onQuitToHome to get the two level-specific rows; Home omits both.
//
// Callers own the container/visibility (GameScene reuses its existing
// overlayContainer pattern; Home has its own dedicated container) — this
// module only returns the array of game objects to add, plus a `refresh()`
// to re-sync toggle visuals after a save-state change made elsewhere.
import { saveState } from './storage.js';
import { setHapticsEnabled } from './haptics.js';
import { startMusic, stopMusic, playSound } from './audio.js';
import { COLORS, makeButton, drawPanel } from './theme.js';

const APP_VERSION = '0.1.0';

function buildToggleRow(scene, x, y, w, icon, label, getValue, onToggle) {
  const h = 40;
  const iconTxt = scene.add.text(x, y, icon, { fontSize: '16px' }).setOrigin(0, 0.5);
  const labelTxt = scene.add.text(x + 26, y, label, {
    fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#42281d'
  }).setOrigin(0, 0.5);

  const pillW = 54, pillH = 26, pillX = x + w - pillW;
  const pill = scene.add.graphics();
  const knob = scene.add.circle(0, y, pillH / 2 - 3, 0xffffff).setStrokeStyle(2, COLORS.woodDark);
  const drawPill = (on) => {
    pill.clear();
    pill.fillStyle(on ? 0x22c55e : 0x9ca3af, 1).fillRoundedRect(pillX, y - pillH / 2, pillW, pillH, pillH / 2);
    pill.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(pillX, y - pillH / 2, pillW, pillH, pillH / 2);
    knob.setPosition(on ? pillX + pillW - pillH / 2 : pillX + pillH / 2, y);
  };
  drawPill(getValue());

  const hit = scene.add.rectangle(pillX + pillW / 2, y, pillW + 10, pillH + 14, 0xffffff, 0.001)
    .setInteractive({ useHandCursor: true });
  hit.on('pointerdown', () => {
    const next = !getValue();
    onToggle(next);
    drawPill(next);
    playSound('switch', false);
  });

  return [iconTxt, labelTxt, pill, knob, hit];
}

// Returns { items, panelBounds, refresh }. `items` is ready to hand to
// container.add(items) / overlayContainer.add(items).
export function buildSettingsModal(scene, width, height, opts = {}) {
  const save = scene.registry.get('save');
  const { onRestartLevel, onQuitToHome, onClose } = opts;

  const rows = 3; // Sound, Music, Haptic
  const extraButtons = 2 + (onRestartLevel ? 1 : 0) + (onQuitToHome ? 1 : 0); // Privacy, Restore, +optional
  const panelH = 130 + rows * 42 + extraButtons * 44 + 30;
  const panelW = Math.min(width - 48, 340);
  const panelX = width / 2 - panelW / 2, panelY = Math.max(20, height / 2 - panelH / 2);

  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);
  const panel = drawPanel(scene, panelX, panelY, panelW, panelH, { radius: 20, fill: COLORS.parchment, border: COLORS.gold, borderWidth: 3 });

  const bannerW = panelW - 40, bannerH = 34, bannerX = width / 2 - bannerW / 2, bannerY = panelY + 16;
  const banner = scene.add.graphics();
  banner.fillStyle(COLORS.gold, 1).fillRoundedRect(bannerX, bannerY, bannerW, bannerH, 14);
  banner.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(bannerX, bannerY, bannerW, bannerH, 14);
  const title = scene.add.text(width / 2, bannerY + bannerH / 2, 'SETTINGS', {
    fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#2b1e16'
  }).setOrigin(0.5);

  const closeSize = 32, closeX = panelX + panelW - closeSize / 2, closeY = panelY;
  const closeBg = scene.add.circle(closeX, closeY, closeSize / 2, 0xe0605a).setStrokeStyle(3, COLORS.woodDark);
  const closeIcon = scene.add.text(closeX, closeY, '✕', { fontSize: '14px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
  const closeHit = scene.add.rectangle(closeX, closeY, closeSize + 8, closeSize + 8, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
  closeHit.on('pointerdown', () => { playSound('switch', save.soundMuted); if (onClose) onClose(); });

  const cardX = panelX + 16, cardW = panelW - 32;
  const cardY = bannerY + bannerH + 14, cardH = rows * 42 + 14;
  const card = scene.add.graphics();
  card.fillStyle(0xe9d6ac, 1).fillRoundedRect(cardX, cardY, cardW, cardH, 14);
  card.lineStyle(2, COLORS.woodDark, 0.5).strokeRoundedRect(cardX, cardY, cardW, cardH, 14);

  const rowX = cardX + 14, rowW = cardW - 28;
  let rowY = cardY + 12 + 21 / 2 + 8;
  const toggleItems = [];
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '🔊', 'Sound', () => !save.soundMuted, (on) => {
    save.soundMuted = !on;
    saveState(save);
  }));
  rowY += 42;
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '🎵', 'Music', () => !save.musicMuted, (on) => {
    save.musicMuted = !on;
    saveState(save);
    if (on) startMusic(); else stopMusic();
  }));
  rowY += 42;
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '📳', 'Haptic', () => save.hapticsEnabled, (on) => {
    save.hapticsEnabled = on;
    saveState(save);
    setHapticsEnabled(on);
  }));

  let btnY = cardY + cardH + 30;
  const btnW = panelW - 48;
  const items = [bg, panel, banner, title, closeBg, closeIcon, closeHit, card, ...toggleItems];

  const privacyBtn = makeButton(scene, width / 2, btnY, '📄 Privacy Policy', { variant: 'ink', fontSize: '11px', width: btnW });
  privacyBtn.on('pointerdown', () => {
    scene.showToast
      ? scene.showToast('📄 Demo build — no personal data is collected, no hosted Privacy Policy yet.')
      : null;
  });
  items.push(privacyBtn);
  btnY += 46;

  const restoreBtn = makeButton(scene, width / 2, btnY, '🔁 Restore Purchase', { variant: 'tealSolid', fontSize: '11px', width: btnW });
  restoreBtn.on('pointerdown', () => {
    if (scene.showToast) scene.showToast('🔁 Demo build — there are no real purchases to restore.');
  });
  items.push(restoreBtn);
  btnY += 46;

  if (onRestartLevel) {
    const restartBtn = makeButton(scene, width / 2, btnY, '🔄 Restart Level', { variant: 'gold', fontSize: '11px', width: btnW, shadow: true });
    restartBtn.on('pointerdown', onRestartLevel);
    items.push(restartBtn);
    btnY += 46;
  }

  if (onQuitToHome) {
    const quitBtn = makeButton(scene, width / 2, btnY, '🚩 Quit', { variant: 'ruby', fontSize: '11px', width: btnW });
    quitBtn.on('pointerdown', onQuitToHome);
    items.push(quitBtn);
    btnY += 46;
  }

  const versionTxt = scene.add.text(width / 2, panelY + panelH - 16, `Version ${APP_VERSION}`, {
    fontFamily: 'Crimson Pro', fontSize: '9px', color: '#8a7550'
  }).setOrigin(0.5);
  items.push(versionTxt);

  return { items };
}

// Shared "-1 Life" confirmation — used before both Quit and Restart, per
// the reference design: a broken-heart icon, the exact life cost, and a
// single confirm action (plus Cancel, since trapping the player with only
// one way forward is bad UX even when the reference screenshot didn't
// show a cancel button).
export function buildLifeCostConfirm(scene, width, height, { icon, title, message, actionLabel, actionVariant, cost, onConfirm, onCancel }) {
  const panelW = Math.min(width - 70, 300), panelH = 300;
  const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);
  const panel = drawPanel(scene, panelX, panelY, panelW, panelH, { radius: 18, fill: COLORS.parchment, border: COLORS.ruby, borderWidth: 3 });

  const titleTxt = scene.add.text(width / 2, panelY + 32, title, {
    fontFamily: 'Cinzel', fontSize: '16px', fontStyle: '900', color: '#b91c1c'
  }).setOrigin(0.5);

  const heartY = panelY + 96;
  const heart = scene.add.text(width / 2, heartY, icon, { fontSize: '54px' }).setOrigin(0.5);
  if (cost > 0) {
    scene.add.text(width / 2, heartY, `-${cost}`, {
      fontFamily: 'Cinzel', fontSize: '18px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5).setDepth(1);
  }

  const msgTxt = scene.add.text(width / 2, panelY + 150, message, {
    fontFamily: 'Crimson Pro', fontSize: '11px', color: '#42281d', align: 'center', wordWrap: { width: panelW - 40 }
  }).setOrigin(0.5);

  const btnW = panelW - 48;
  const confirmBtn = makeButton(scene, width / 2, panelY + panelH - 74, actionLabel, {
    variant: actionVariant || 'ruby', fontSize: '13px', width: btnW, shadow: true
  });
  confirmBtn.on('pointerdown', onConfirm);

  const cancelBtn = makeButton(scene, width / 2, panelY + panelH - 28, 'Cancel', { variant: 'ink', fontSize: '11px', width: btnW });
  cancelBtn.on('pointerdown', onCancel);

  return { items: [bg, panel, titleTxt, heart, msgTxt, confirmBtn, cancelBtn] };
}
