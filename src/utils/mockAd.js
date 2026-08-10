// Ephemeral "watching a rewarded ad" overlay — shared by every mocked-ad
// flow in the game (Level Timer bonus, Bomb-loss Rescue Offer, Buff
// insufficient-funds fallback, Out-of-Lives, Win x2 claim). It creates and
// destroys its OWN container at depth 1000, so it can stack on top of
// whatever the caller's scene currently shows (a Win panel, a Lose panel,
// Timeout choices...) without ever needing to know about or clobber it —
// callers just get an onDone callback once the "ad" finishes.
import { COLORS, drawPanel } from './theme.js';

export function showMockedAdOverlay(scene, { label = '📺 Watching ad…', duration = 900, onDone } = {}) {
  const { width, height } = scene.scale;
  const container = scene.add.container(0, 0).setDepth(1000);

  const bg = scene.add.rectangle(0, 0, width, height, COLORS.bgDeep, 0.86).setOrigin(0);
  const panelW = width - 80, panelH = 150;
  const panelX = width / 2 - panelW / 2, panelY = height / 2 - panelH / 2;
  const panel = drawPanel(scene, panelX, panelY, panelW, panelH, { radius: 16, fill: COLORS.parchment, border: COLORS.gold, borderWidth: 3 });
  const text = scene.add.text(width / 2, panelY + panelH / 2 - 20, label, {
    fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#42281d'
  }).setOrigin(0.5);
  const spinner = scene.add.graphics().setPosition(width / 2, panelY + panelH / 2 + 20);
  spinner.lineStyle(4, COLORS.gold, 1);
  spinner.beginPath();
  spinner.arc(0, 0, 14, 0, Math.PI * 1.4, false);
  spinner.strokePath();
  scene.tweens.add({ targets: spinner, angle: 360, duration: 700, repeat: -1 });

  container.add([bg, panel, text, spinner]);
  scene.time.delayedCall(duration, () => { container.destroy(); if (onDone) onDone(); });
}
