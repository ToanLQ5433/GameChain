// Out-of-Lives popup — shown whenever the player needs a Life they don't
// have (tapping Play at 0 Lives on Home, or declining a Bomb-loss Rescue
// Offer with 0 Lives left in GameScene). Same 3-choice shape as the
// reference flow: buy a full refill with Coins, watch a rewarded ad for +1,
// or close and wait for the real-time regen in lives.js.
import { COLORS, drawPanel, makeButton } from './theme.js';
import { resolveLives, msUntilNextLife, formatMs, LIVES_MAX } from './lives.js';
import { saveState } from './storage.js';
import { playSound } from './audio.js';
import { showMockedAdOverlay } from './mockAd.js';

export const LIVES_FULL_REFILL_COST = 500;

// `container` is the caller's own overlay container — this fully replaces
// whatever it currently shows (Out-of-Lives is always a dead-end/decision
// point, never something that needs to persist underneath an ad).
export function showOutOfLives(scene, container, { onGranted, onClose } = {}) {
  const save = scene.registry.get('save');
  resolveLives(save);
  container.removeAll(true);
  const { width, height } = scene.scale;

  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.82).setOrigin(0);
  const panelW = width - 56, panelH = 300;
  const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
  const panel = drawPanel(scene, panelX, panelY, panelW, panelH, { radius: 18, fill: 0xfff0ee, border: COLORS.ruby, borderWidth: 3 });

  const title = scene.add.text(width / 2, panelY + 34, '💔 Out of Lives!', {
    fontFamily: 'Cinzel', fontSize: '19px', fontStyle: '900', color: '#b91c1c'
  }).setOrigin(0.5);
  const remaining = msUntilNextLife(save);
  const sub = scene.add.text(width / 2, panelY + 64, remaining > 0 ? `Next free Life in ${formatMs(remaining)}` : 'A new Life is ready!', {
    fontFamily: 'Crimson Pro', fontSize: '12px', color: '#42281d'
  }).setOrigin(0.5);

  const items = [bg, panel, title, sub];
  const btnW = panelW - 40;
  let btnY = panelY + 122;

  const buyBtn = makeButton(scene, width / 2, btnY, `🟡 Refill 5 Lives — ${LIVES_FULL_REFILL_COST} Coins`, {
    variant: 'gold', fontSize: '12px', width: btnW, shadow: true
  });
  buyBtn.on('pointerdown', () => {
    if (save.coins < LIVES_FULL_REFILL_COST) {
      playSound('error', save.soundMuted);
      if (scene.showToast) scene.showToast('🟡 Not enough Coins!');
      return;
    }
    save.coins -= LIVES_FULL_REFILL_COST;
    save.lives.count = LIVES_MAX;
    save.lives.nextRefillAt = null;
    saveState(save);
    playSound('win', save.soundMuted);
    if (scene.coinChip) scene.coinChip.setValue(save.coins);
    container.setVisible(false);
    container.removeAll(true);
    if (onGranted) onGranted();
  });
  items.push(buyBtn);
  btnY += 54;

  const adBtn = makeButton(scene, width / 2, btnY, '📺 Watch Ad for +1 Life', { variant: 'blue', fontSize: '12px', width: btnW });
  adBtn.on('pointerdown', () => {
    showMockedAdOverlay(scene, {
      onDone: () => {
        save.lives.count = Math.min(LIVES_MAX, save.lives.count + 1);
        saveState(save);
        playSound('win', save.soundMuted);
        container.setVisible(false);
        container.removeAll(true);
        if (onGranted) onGranted();
      }
    });
  });
  items.push(adBtn);
  btnY += 54;

  const closeBtn = makeButton(scene, width / 2, btnY, remaining > 0 ? `⏳ Wait (${formatMs(remaining)})` : 'Close', { variant: 'ink', fontSize: '12px', width: btnW });
  closeBtn.on('pointerdown', () => {
    container.setVisible(false);
    container.removeAll(true);
    if (onClose) onClose();
  });
  items.push(closeBtn);

  container.add(items);
  container.setVisible(true);
}
