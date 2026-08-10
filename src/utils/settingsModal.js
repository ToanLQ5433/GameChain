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
  const iconTxt = scene.add.text(x, y, icon, { fontSize: '18px' }).setOrigin(0, 0.5);
  const labelTxt = scene.add.text(x + 30, y, label, {
    fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#8b5a2b'
  }).setOrigin(0, 0.5);

  const pillW = 68, pillH = 30, pillX = x + w - pillW;
  const pill = scene.add.graphics();
  const knob = scene.add.circle(0, y, pillH / 2 - 2, 0xffffff).setStrokeStyle(2, 0x4a2c11);
  const stateTxt = scene.add.text(0, y, '', {
    fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#ffffff'
  }).setOrigin(0.5);

  const drawPill = (on) => {
    pill.clear();
    const bgColor = on ? 0x22c55e : 0xef4444;
    pill.fillStyle(bgColor, 1).fillRoundedRect(pillX, y - pillH / 2, pillW, pillH, pillH / 2);
    pill.lineStyle(2.5, 0x3d2b1f, 1).strokeRoundedRect(pillX, y - pillH / 2, pillW, pillH, pillH / 2);
    
    knob.setPosition(on ? pillX + pillW - pillH / 2 : pillX + pillH / 2, y);
    stateTxt.setText(on ? 'On' : 'Off');
    stateTxt.setPosition(on ? pillX + pillH / 2 + 8 : pillX + pillW - pillH / 2 - 8, y);
  };
  drawPill(getValue());

  const hit = scene.add.rectangle(pillX + pillW / 2, y, pillW + 16, pillH + 16, 0xffffff, 0.001)
    .setInteractive({ useHandCursor: true });
  hit.on('pointerdown', () => {
    const next = !getValue();
    onToggle(next);
    drawPill(next);
    playSound('switch', false);
  });

  return [iconTxt, labelTxt, pill, knob, stateTxt, hit];
}

// Returns { items, panelBounds, refresh }. `items` is ready to hand to
// container.add(items) / overlayContainer.add(items).
export function buildSettingsModal(scene, width, height, opts = {}) {
  const save = scene.registry.get('save');
  const { onRestartLevel, onQuitToHome, onClose } = opts;

  const rows = 3; // Sound, Music, Haptic
  const hasQuit = !!onQuitToHome;
  const extraButtons = 2 + (onRestartLevel ? 1 : 0) + 1; // Privacy, Restore, Quit (Ingame) / Contact (Home)
  const panelH = 145 + rows * 46 + extraButtons * 50 + 20;
  const panelW = Math.min(width - 40, 350);
  const panelX = width / 2 - panelW / 2, panelY = Math.max(16, height / 2 - panelH / 2);

  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);

  // Ticket card frame with blue border
  const panel = scene.add.graphics();
  panel.fillStyle(0xfff8eb, 1).fillRoundedRect(panelX, panelY, panelW, panelH, 22);
  panel.lineStyle(4, 0x0284c7, 1).strokeRoundedRect(panelX, panelY, panelW, panelH, 22);
  panel.lineStyle(2, 0xffffff, 0.9).strokeRoundedRect(panelX + 3, panelY + 3, panelW - 6, panelH - 6, 19);

  // Blue 3D Title Banner ("Settings")
  const bannerW = panelW - 60, bannerH = 40, bannerX = width / 2 - bannerW / 2, bannerY = panelY + 12;
  const banner = makeButton(scene, width / 2, bannerY + bannerH / 2, 'Settings', {
    variant: 'blue', fontSize: '18px', shadow: true, width: bannerW, minHeight: bannerH
  });

  // Red Close Button at top-right
  const closeX = panelX + panelW - 12, closeY = panelY + 12;
  const closeBtn = makeIconButton(scene, closeX, closeY, '✕', {
    size: 40, variant: 'ruby', iconSize: '16px',
    onClick: () => { playSound('switch', save.soundMuted); if (onClose) onClose(); }
  });

  // Inner card background for toggles
  const cardX = panelX + 16, cardW = panelW - 32;
  const cardY = bannerY + bannerH + 16, cardH = rows * 46 + 14;
  const card = scene.add.graphics();
  card.fillStyle(0xf4e5cb, 1).fillRoundedRect(cardX, cardY, cardW, cardH, 16);
  card.lineStyle(2, 0xdfc49c, 1).strokeRoundedRect(cardX, cardY, cardW, cardH, 16);

  const rowX = cardX + 14, rowW = cardW - 28;
  let rowY = cardY + 14 + 21 / 2 + 6;
  const toggleItems = [];
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '🔊', 'Sound', () => !save.soundMuted, (on) => {
    save.soundMuted = !on;
    saveState(save);
  }));
  rowY += 46;
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '🎵', 'Music', () => !save.musicMuted, (on) => {
    save.musicMuted = !on;
    saveState(save);
    if (on) startMusic(); else stopMusic();
  }));
  rowY += 46;
  toggleItems.push(...buildToggleRow(scene, rowX, rowY, rowW, '📳', 'Haptic', () => save.hapticsEnabled, (on) => {
    save.hapticsEnabled = on;
    saveState(save);
    setHapticsEnabled(on);
  }));

  let btnY = cardY + cardH + 30;
  const btnW = panelW - 48;
  const items = [bg, panel, banner, closeBtn, card, ...toggleItems];

  // Privacy Policy button
  const privacyBtn = makeButton(scene, width / 2, btnY, 'Privacy Policy', { variant: 'parchment3D', fontSize: '14px', minHeight: 46, width: btnW });
  privacyBtn.on('pointerdown', () => {
    scene.showToast
      ? scene.showToast('📄 Demo build — no personal data is collected.')
      : null;
  });
  items.push(privacyBtn);
  btnY += 50;

  // Restore Purchase button
  const restoreBtn = makeButton(scene, width / 2, btnY, 'Restore Purchase', { variant: 'blue', fontSize: '14px', minHeight: 46, width: btnW });
  restoreBtn.on('pointerdown', () => {
    if (scene.showToast) scene.showToast('🔁 Demo build — no real purchases to restore.');
  });
  items.push(restoreBtn);
  btnY += 50;

  // Restart Level (Ingame optional action)
  if (onRestartLevel) {
    const restartBtn = makeButton(scene, width / 2, btnY, 'Restart Level', { variant: 'gold', fontSize: '14px', minHeight: 46, width: btnW, shadow: true });
    restartBtn.on('pointerdown', onRestartLevel);
    items.push(restartBtn);
    btnY += 50;
  }

  // Quit (Ingame) vs Contact Us (Home)
  if (hasQuit) {
    const quitBtn = makeButton(scene, width / 2, btnY, 'Quit', { variant: 'ruby', fontSize: '14px', minHeight: 46, width: btnW, shadow: true });
    quitBtn.on('pointerdown', onQuitToHome);
    items.push(quitBtn);
    btnY += 50;
  } else {
    const contactBtn = makeButton(scene, width / 2, btnY, 'Contact Us', { variant: 'emerald', fontSize: '14px', minHeight: 46, width: btnW, shadow: true });
    contactBtn.on('pointerdown', () => {
      if (scene.showToast) scene.showToast('📩 Contact: support@piratetrails.demo');
    });
    items.push(contactBtn);
    btnY += 50;
  }

  const versionTxt = scene.add.text(width / 2, panelY + panelH - 18, `Version: ${APP_VERSION}`, {
    fontFamily: 'Cinzel', fontSize: '12px', fontStyle: 'bold', color: '#2b1e16'
  }).setOrigin(0.5);
  items.push(versionTxt);

  return { items };
}

export function buildLifeCostConfirm(scene, width, height, { icon, title, message, actionLabel, actionVariant, cost, onConfirm, onCancel }) {
  const panelW = Math.min(width - 50, 310), panelH = 310;
  const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);
  const panel = drawPanel(scene, panelX, panelY, panelW, panelH, { radius: 18, fill: COLORS.parchment, border: COLORS.ruby, borderWidth: 3 });

  const titleTxt = scene.add.text(width / 2, panelY + 32, title, {
    fontFamily: 'Cinzel', fontSize: '18px', fontStyle: '900', color: '#b91c1c'
  }).setOrigin(0.5);

  const heartY = panelY + 98;
  const heart = scene.add.text(width / 2, heartY, icon, { fontSize: '56px' }).setOrigin(0.5);
  if (cost > 0) {
    scene.add.text(width / 2, heartY, `-${cost}`, {
      fontFamily: 'Cinzel', fontSize: '18px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0.5).setDepth(1);
  }

  const msgTxt = scene.add.text(width / 2, panelY + 154, message, {
    fontFamily: 'Crimson Pro', fontSize: '13px', color: '#42281d', align: 'center', wordWrap: { width: panelW - 40 }
  }).setOrigin(0.5);

  const btnW = panelW - 48;
  const confirmBtn = makeButton(scene, width / 2, panelY + panelH - 80, actionLabel, {
    variant: actionVariant || 'ruby', fontSize: '14px', minHeight: 46, width: btnW, shadow: true
  });
  confirmBtn.on('pointerdown', onConfirm);

  const cancelBtn = makeButton(scene, width / 2, panelY + panelH - 28, 'Hủy Bỏ', { variant: 'ink', fontSize: '13px', minHeight: 40, width: btnW });
  cancelBtn.on('pointerdown', onCancel);

  return { items: [bg, panel, titleTxt, heart, msgTxt, confirmBtn, cancelBtn] };
}
