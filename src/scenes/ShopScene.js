import Phaser from 'phaser';
import { playSound } from '../utils/audio.js';
import { saveState } from '../utils/storage.js';
import { COLORS } from '../utils/theme.js';

// Real Shop screen for the systems this demo actually has: Coins (spent on
// Buffs in-level) and a "Remove Ads" flag. No booster/lives inventory exists
// in the engine, so bundles only ever grant Coins (+ Remove Ads) — nothing
// promised here that the game doesn't actually track.
//
// There is no payment backend in this demo, so every purchase runs through
// showPurchaseModal(): a mocked confirm -> processing -> success flow that
// mirrors a real app-store purchase sheet, then grants the reward locally.
// No card/payment details are ever collected.

const REMOVE_ADS_PRICE = '$2.99';

const COIN_PACKS = [
  { coins: 500, price: '$0.99' },
  { coins: 1200, price: '$1.99' },
  { coins: 2500, price: '$3.99' },
  { coins: 6500, price: '$7.99', tag: 'POPULAR' },
  { coins: 15000, price: '$14.99' },
  { coins: 40000, price: '$29.99', tag: 'BEST VALUE' }
];

const BUNDLES = [
  { key: 'starter', title: 'Starter Bundle', coins: 800, price: '$2.99', tag: 'POPULAR', includeAdsRemoval: true },
  { key: 'mega', title: 'Mega Bundle', coins: 5000, price: '$6.99', tag: 'BEST VALUE', includeAdsRemoval: true }
];

export default class ShopScene extends Phaser.Scene {
  constructor() { super('Shop'); }

  create() {
    const { width, height } = this.scale;
    this.save = this.registry.get('save');
    this.hitAreas = [];
    this.modalOpen = false;

    this.drawBackground(width, height);
    this.buildTopBar(width);
    this.buildScrollArea(width, height);
    this.buildBottomNav(width, height);
  }

  drawBackground(width, height) {
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1c3a52, 0x1c3a52, 0x0a1d33, 0x0a1d33, 1);
    bg.fillRect(0, 0, width, height);
    // Faint canvas-tent stripes behind the header, echoing a market-stall shop front.
    const stripes = this.add.graphics();
    stripes.fillStyle(COLORS.gold, 0.06);
    for (let x = -40; x < width + 40; x += 44) stripes.fillRect(x, 0, 22, 92);
  }

  buildTopBar(width) {
    this.add.text(14, 20, 'SHOP', {
      fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0, 0.5);

    const closeSize = 34, closeX = width - 14 - closeSize, closeY = 12;
    this.add.circle(closeX + closeSize / 2, closeY + closeSize / 2, closeSize / 2, 0xe0605a).setStrokeStyle(3, COLORS.woodDark);
    this.add.text(closeX + closeSize / 2, closeY + closeSize / 2, '✕', { fontSize: '16px', fontStyle: 'bold', color: '#ffffff' }).setOrigin(0.5);
    this.add.rectangle(closeX + closeSize / 2, closeY + closeSize / 2, closeSize + 6, closeSize + 6, 0xffffff, 0.001)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => { playSound('switch', this.save.soundMuted); this.scene.start('Home'); });

    const gemRightEdge = closeX - 8;
    this.gemChip = this.makeStatChip(gemRightEdge, 12, '💎', this.save.gems, COLORS.teal);
    const coinRightEdge = this.gemChip.rightEdge - 8;
    this.coinChip = this.makeStatChip(coinRightEdge, 12, '🟡', this.save.coins, COLORS.gold);
  }

  makeStatChip(rightEdgeX, y, icon, value, accentColor) {
    const w = 64, h = 30;
    const xLeft = rightEdgeX - w;
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1).fillRoundedRect(xLeft, y, w, h, 15);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(xLeft, y, w, h, 15);
    this.add.circle(xLeft + 15, y + h / 2, 11, accentColor).setStrokeStyle(2, COLORS.woodDark);
    this.add.text(xLeft + 15, y + h / 2, icon, { fontSize: '11px' }).setOrigin(0.5);
    const valTxt = this.add.text(xLeft + 33, y + h / 2, String(value), {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0, 0.5);
    return { setValue: (v) => valTxt.setText(String(v)), rightEdge: xLeft };
  }

  // ---------------- Scrollable content ----------------
  // Same press/move/release + hit-list pattern as HomeScene's map: buttons
  // only fire on a clean tap (no movement), so starting a scroll drag on top
  // of a price button can never trigger an accidental purchase.

  buildScrollArea(width, height) {
    this.viewTop = 56;
    this.viewBottom = height - 76;

    this.maskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.maskShape.fillStyle(0xffffff).fillRect(0, this.viewTop, width, this.viewBottom - this.viewTop);
    this.content = this.add.container(0, this.viewTop);
    this.content.setMask(this.maskShape.createGeometryMask());

    let y = 10;
    y = this.drawRemoveAdsBanner(width, y) + 18;
    y = this.drawSectionLabel(width, y, 'Coin Bundles') + 10;
    y = this.drawCoinGrid(width, y) + 18;
    y = this.drawSectionLabel(width, y, 'Value Bundles') + 10;
    y = this.drawBundles(width, y) + 20;
    this.contentHeight = y;

    this.setupScroll(width);
  }

  drawSectionLabel(width, y, text) {
    const h = 28;
    const g = this.add.graphics();
    g.fillStyle(COLORS.parchment, 1).fillRoundedRect(14, y, width - 28, h, 10);
    g.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(14, y, width - 28, h, 10);
    const label = this.add.text(width / 2, y + h / 2, text, {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0.5);
    this.content.add([g, label]);
    return y + h;
  }

  drawRemoveAdsBanner(width, y) {
    const h = 92, x = 14, w = width - 28;
    const owned = !!this.save.adsRemoved;
    const g = this.add.graphics();
    g.fillStyle(owned ? COLORS.tealDim : 0x7a1f1f, 1).fillRoundedRect(x, y, w, h, 16);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(x, y, w, h, 16);
    this.content.add(g);

    const iconBg = this.add.circle(x + 44, y + h / 2, 28, 0xffffff).setStrokeStyle(3, COLORS.woodDark);
    this.content.add(iconBg);
    this.content.add(this.add.text(x + 44, y + h / 2, owned ? '✓' : '🚫', { fontSize: owned ? '24px' : '22px', color: '#e0605a' }).setOrigin(0.5));

    this.content.add(this.add.text(x + 86, y + 22, 'Remove Ads', {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0, 0.5));
    this.content.add(this.add.text(x + 86, y + 44, owned ? 'Thanks for your support, Captain!' : 'No interruptions. Ever.', {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f4e8cf', wordWrap: { width: w - 160 }
    }).setOrigin(0, 0.5));

    const btnW = 92, btnH = 34, btnX = x + w - 14 - btnW, btnY = y + h - 20 - btnH / 2;
    this.drawPriceButton(btnX, btnY - btnH / 2, btnW, btnH, owned ? 'OWNED' : REMOVE_ADS_PRICE, owned ? COLORS.goldDim : COLORS.gold, () => {
      if (owned) return;
      this.showPurchaseModal({
        icon: '🚫', title: 'Remove Ads', subtitle: 'Removes all ads from the game, forever.', price: REMOVE_ADS_PRICE,
        onConfirm: () => {
          this.save.adsRemoved = true;
          saveState(this.save);
          this.refreshRemoveAdsBanner();
        }
      });
    });

    return y + h;
  }

  refreshRemoveAdsBanner() {
    this.content.removeAll(true);
    this.hitAreas = [];
    let y = 10;
    y = this.drawRemoveAdsBanner(this.scale.width, y) + 18;
    y = this.drawSectionLabel(this.scale.width, y, 'Coin Bundles') + 10;
    y = this.drawCoinGrid(this.scale.width, y) + 18;
    y = this.drawSectionLabel(this.scale.width, y, 'Value Bundles') + 10;
    y = this.drawBundles(this.scale.width, y) + 20;
    this.contentHeight = y;
  }

  drawCoinGrid(width, y) {
    const gap = 12, x = 14, gridW = width - 28;
    const cw = (gridW - gap) / 2, ch = 108;
    COIN_PACKS.forEach((pack, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const cx = x + col * (cw + gap), cy = y + row * (ch + gap);
      this.drawCoinCard(cx, cy, cw, ch, pack);
    });
    const rows = Math.ceil(COIN_PACKS.length / 2);
    return y + rows * ch + (rows - 1) * gap;
  }

  drawCoinCard(x, y, w, h, pack) {
    const g = this.add.graphics();
    g.fillStyle(COLORS.cardBg, 1).fillRoundedRect(x, y, w, h, 14);
    g.lineStyle(2.5, COLORS.gold, 0.8).strokeRoundedRect(x, y, w, h, 14);
    this.content.add(g);

    if (pack.tag) {
      const tagW = pack.tag.length * 5.4 + 14;
      const tg = this.add.graphics();
      tg.fillStyle(0xf43f5e, 1).fillRoundedRect(x + w / 2 - tagW / 2, y - 8, tagW, 16, 8);
      this.content.add(tg);
      this.content.add(this.add.text(x + w / 2, y, pack.tag, {
        fontFamily: 'Cinzel', fontSize: '7px', fontStyle: '900', color: '#ffffff'
      }).setOrigin(0.5));
    }

    this.content.add(this.add.text(x + w / 2, y + 30, '🟡', { fontSize: '26px' }).setOrigin(0.5));
    this.content.add(this.add.text(x + w / 2, y + 58, pack.coins.toLocaleString('en-US'), {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0.5));

    const btnW = w - 20, btnH = 26;
    this.drawPriceButton(x + 10, y + h - 14 - btnH, btnW, btnH, pack.price, COLORS.gold, () => {
      this.showPurchaseModal({
        icon: '🟡', title: `${pack.coins.toLocaleString('en-US')} Coins`, subtitle: 'Coins are added to your balance instantly.', price: pack.price,
        onConfirm: () => {
          this.save.coins += pack.coins;
          saveState(this.save);
          this.coinChip.setValue(this.save.coins);
        }
      });
    });
  }

  drawBundles(width, y) {
    const x = 14, w = width - 28, h = 108, gap = 12;
    BUNDLES.forEach((bundle, i) => {
      const by = y + i * (h + gap);
      this.drawBundleCard(x, by, w, h, bundle);
    });
    return y + BUNDLES.length * h + (BUNDLES.length - 1) * gap;
  }

  drawBundleCard(x, y, w, h, bundle) {
    const g = this.add.graphics();
    g.fillStyle(COLORS.cardBg, 1).fillRoundedRect(x, y, w, h, 14);
    g.lineStyle(2.5, COLORS.gold, 0.8).strokeRoundedRect(x, y, w, h, 14);
    this.content.add(g);

    if (bundle.tag) {
      const tagW = bundle.tag.length * 5.6 + 16;
      const tg = this.add.graphics();
      tg.fillStyle(0xf43f5e, 1).fillRoundedRect(x + 10, y - 8, tagW, 16, 8);
      this.content.add(tg);
      this.content.add(this.add.text(x + 10 + tagW / 2, y, bundle.tag, {
        fontFamily: 'Cinzel', fontSize: '7px', fontStyle: '900', color: '#ffffff'
      }).setOrigin(0.5));
    }

    this.content.add(this.add.text(x + 20, y + 34, '🟡', { fontSize: '28px' }).setOrigin(0.5));
    this.content.add(this.add.text(x + 46, y + 24, bundle.title, {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#f4e8cf'
    }).setOrigin(0, 0.5));
    const owned = !!this.save.adsRemoved;
    const perkText = bundle.includeAdsRemoval && !owned
      ? `${bundle.coins.toLocaleString('en-US')} Coins + Remove Ads`
      : `${bundle.coins.toLocaleString('en-US')} Coins`;
    this.content.add(this.add.text(x + 46, y + 44, perkText, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f3c64f', wordWrap: { width: w - 140 }
    }).setOrigin(0, 0.5));

    const btnW = 92, btnH = 30;
    this.drawPriceButton(x + w - 14 - btnW, y + h - 16 - btnH, btnW, btnH, bundle.price, COLORS.gold, () => {
      this.showPurchaseModal({
        icon: '🟡', title: bundle.title, subtitle: perkText, price: bundle.price,
        onConfirm: () => {
          this.save.coins += bundle.coins;
          if (bundle.includeAdsRemoval) this.save.adsRemoved = true;
          saveState(this.save);
          this.coinChip.setValue(this.save.coins);
          this.refreshRemoveAdsBanner();
        }
      });
    });
  }

  // Draws a gold pill + registers a tap target in this.hitAreas (content-local
  // coordinates) — no native Phaser interactivity, so it never fires mid-drag.
  drawPriceButton(x, y, w, h, label, fillColor, onTap) {
    const g = this.add.graphics();
    g.fillStyle(COLORS.goldDim, 1).fillRoundedRect(x, y + 3, w, h, h / 2);
    g.fillStyle(fillColor, 1).fillRoundedRect(x, y, w, h, h / 2);
    g.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(x, y, w, h, h / 2);
    this.content.add(g);
    this.content.add(this.add.text(x + w / 2, y + h / 2 - 1, label, {
      fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0.5));
    this.hitAreas.push({ x, y, w, h: h + 3, onTap });
  }

  setupScroll(width) {
    let pressY = 0, pressContainerY = 0, moved = false, isPressed = false, pressedHit = null;
    const viewH = this.viewBottom - this.viewTop;

    this.input.on('pointerdown', (p) => {
      // The purchase modal draws its own buttons on top, but the price
      // buttons here are plain hit-tested rectangles (not native Phaser
      // interactive objects), so they don't automatically get blocked by
      // the modal's overlay — this guard is what actually stops taps from
      // reaching a card underneath while the modal is open.
      if (this.modalOpen) return;
      if (p.y < this.viewTop || p.y > this.viewBottom) return;
      isPressed = true; moved = false;
      pressY = p.y; pressContainerY = this.content.y;
      const localX = p.x, localY = p.y - this.content.y;
      pressedHit = this.hitAreas.find(h => localX >= h.x && localX <= h.x + h.w && localY >= h.y && localY <= h.y + h.h) || null;
    });
    this.input.on('pointermove', (p) => {
      if (!isPressed) return;
      const dy = p.y - pressY;
      if (Math.abs(dy) > 8) moved = true;
      if (moved && this.contentHeight > viewH) {
        const minY = Math.min(this.viewTop, this.viewTop + viewH - this.contentHeight);
        this.content.y = Phaser.Math.Clamp(pressContainerY + dy, minY, this.viewTop);
      }
    });
    const endPress = () => {
      isPressed = false;
      if (!this.modalOpen && !moved && pressedHit) pressedHit.onTap();
      pressedHit = null;
    };
    this.input.on('pointerup', endPress);
    this.input.on('pointerupoutside', endPress);
  }

  // ---------------- Mock purchase flow (no real payment backend) ----------------
  // Confirm -> Processing -> Success, mirroring a native store purchase sheet.
  // Never collects card/payment details — this demo has nothing to charge.

  showPurchaseModal({ icon, title, subtitle, price, onConfirm }) {
    this.modalOpen = true;
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, 0x04070d, 0.85).setOrigin(0).setInteractive().setDepth(100);
    const panelW = width - 70, panelH = 250, px = width / 2 - panelW / 2, py = height / 2 - panelH / 2;
    const panel = this.add.graphics().setDepth(101);
    panel.fillStyle(COLORS.cardBg, 1).fillRoundedRect(px, py, panelW, panelH, 18);
    panel.lineStyle(3, COLORS.gold, 1).strokeRoundedRect(px, py, panelW, panelH, 18);

    const iconBg = this.add.circle(width / 2, py + 46, 30, 0xffffff).setStrokeStyle(3, COLORS.woodDark).setDepth(101);
    const iconTxt = this.add.text(width / 2, py + 46, icon, { fontSize: '24px' }).setOrigin(0.5).setDepth(101);
    const titleTxt = this.add.text(width / 2, py + 92, title, {
      fontFamily: 'Cinzel', fontSize: '15px', fontStyle: '900', color: '#f4e8cf', align: 'center', wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5).setDepth(101);
    const subTxt = this.add.text(width / 2, py + 116, subtitle, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#9fb8c9', align: 'center', wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5).setDepth(101);
    const priceTxt = this.add.text(width / 2, py + 144, price, {
      fontFamily: 'Cinzel', fontSize: '20px', fontStyle: '900', color: '#f3c64f'
    }).setOrigin(0.5).setDepth(101);

    const group = this.add.container(0, 0, [bg, panel, iconBg, iconTxt, titleTxt, subTxt, priceTxt]).setDepth(100);

    const btnY = py + panelH - 40, btnW = 110, btnH = 38, gap = 10;
    const cancelG = this.add.graphics().setDepth(101);
    cancelG.fillStyle(COLORS.woodDark, 1).fillRoundedRect(width / 2 - gap / 2 - btnW, btnY - btnH / 2, btnW, btnH, btnH / 2);
    cancelG.lineStyle(2, COLORS.tealDim, 1).strokeRoundedRect(width / 2 - gap / 2 - btnW, btnY - btnH / 2, btnW, btnH, btnH / 2);
    const cancelTxt = this.add.text(width / 2 - gap / 2 - btnW / 2, btnY, 'Cancel', {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: 'bold', color: '#f4e8cf'
    }).setOrigin(0.5).setDepth(101);
    const cancelHit = this.add.rectangle(width / 2 - gap / 2 - btnW / 2, btnY, btnW, btnH, 0xffffff, 0.001).setDepth(101)
      .setInteractive({ useHandCursor: true });

    const buyG = this.add.graphics().setDepth(101);
    buyG.fillStyle(COLORS.gold, 1).fillRoundedRect(width / 2 + gap / 2, btnY - btnH / 2, btnW, btnH, btnH / 2);
    buyG.lineStyle(2, COLORS.goldDim, 1).strokeRoundedRect(width / 2 + gap / 2, btnY - btnH / 2, btnW, btnH, btnH / 2);
    const buyTxt = this.add.text(width / 2 + gap / 2 + btnW / 2, btnY, `Buy ${price}`, {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0.5).setDepth(101);
    const buyHit = this.add.rectangle(width / 2 + gap / 2 + btnW / 2, btnY, btnW, btnH, 0xffffff, 0.001).setDepth(101)
      .setInteractive({ useHandCursor: true });

    group.add([cancelG, cancelTxt, cancelHit, buyG, buyTxt, buyHit]);

    const close = () => { this.modalOpen = false; group.destroy(); };
    cancelHit.on('pointerdown', () => { playSound('switch', this.save.soundMuted); close(); });

    buyHit.on('pointerdown', () => {
      playSound('switch', this.save.soundMuted);
      [cancelG, cancelTxt, cancelHit, buyG, buyTxt, buyHit].forEach(o => o.destroy());

      const spinner = this.add.graphics().setDepth(101).setPosition(width / 2, btnY);
      spinner.lineStyle(4, COLORS.gold, 1);
      spinner.beginPath();
      spinner.arc(0, 0, 14, 0, Math.PI * 1.4, false);
      spinner.strokePath();
      this.tweens.add({ targets: spinner, angle: 360, duration: 700, repeat: -1 });
      const processingTxt = this.add.text(width / 2, btnY + 26, 'Processing purchase…', {
        fontFamily: 'Crimson Pro', fontSize: '10px', color: '#9fb8c9'
      }).setOrigin(0.5).setDepth(101);
      group.add([spinner, processingTxt]);

      this.time.delayedCall(750, () => {
        spinner.destroy(); processingTxt.destroy();
        const check = this.add.text(width / 2, btnY, '✓', {
          fontFamily: 'Cinzel', fontSize: '30px', fontStyle: '900', color: '#22c55e'
        }).setOrigin(0.5).setDepth(101).setScale(0);
        const doneTxt = this.add.text(width / 2, btnY + 26, 'Purchase complete!', {
          fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#22c55e'
        }).setOrigin(0.5).setDepth(101);
        group.add([check, doneTxt]);
        this.tweens.add({ targets: check, scale: 1, duration: 220, ease: 'Back.Out' });
        playSound('win', this.save.soundMuted);
        onConfirm();
        this.time.delayedCall(750, close);
      });
    });
  }

  // ---------------- Bottom nav (same look as Home, Shop is the active tab) ----------------

  buildBottomNav(width, height) {
    const barH = 60;
    const barY = height - barH - 6;
    const bar = this.add.graphics();
    bar.fillStyle(COLORS.teal, 1).fillRoundedRect(10, barY, width - 20, barH, 20);
    bar.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(10, barY, width - 20, barH, 20);

    const items = [
      { key: 'shop', icon: '🏪' },
      { key: 'journey', icon: '🧭' },
      { key: 'lock', icon: '🔒' }
    ];
    const step = (width - 20) / items.length;
    const baseY = barY + barH / 2;

    items.forEach((item, i) => {
      const cx = 10 + step * i + step / 2;
      const active = item.key === 'shop';
      const size = active ? 50 : 42;
      const cy = baseY - (active ? 10 : 0);

      const btnBg = this.add.graphics();
      btnBg.fillStyle(active ? COLORS.gold : 0xffffff, 1).fillRoundedRect(cx - size / 2, cy - size / 2, size, size, 12);
      btnBg.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(cx - size / 2, cy - size / 2, size, size, 12);
      this.add.text(cx, cy, item.icon, { fontSize: active ? '18px' : '15px' }).setOrigin(0.5);

      const hit = this.add.rectangle(cx, baseY, step - 6, barH, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => this.onNavTap(item.key));
    });
  }

  onNavTap(key) {
    if (key === 'shop') return;
    if (key === 'journey') { this.scene.start('Home'); return; }
    if (key === 'lock') { this.showToast('🔒 More content is coming soon!'); return; }
  }

  showToast(text) {
    if (this.toastText) this.toastText.destroy();
    const { width } = this.scale;
    this.toastText = this.add.text(width / 2, this.viewTop - 8, text, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#f3c64f',
      backgroundColor: '#2b1e16', padding: { x: 10, y: 5 }, align: 'center',
      wordWrap: { width: width - 60 }
    }).setOrigin(0.5, 1).setDepth(60);
    this.time.delayedCall(1800, () => { if (this.toastText) { this.toastText.destroy(); this.toastText = null; } });
  }
}
