import Phaser from 'phaser';
import { playSound } from '../utils/audio.js';
import { saveState } from '../utils/storage.js';
import { COLORS, makeIconButton, makeStatChip, makeButton } from '../utils/theme.js';

// Real Shop screen for the systems this demo actually tracks: Coins, the 3
// real Buffs (Hint/Freeze/Skip, same keys GameScene's buff bar already
// spends), and a "Remove Ads" flag. Every "×N" on a pack is a real grant to
// save.buffs — GameScene.spendBuff() consumes from that inventory before
// ever charging Coins — so a pack's contents are exactly what it says.
//
// There is no payment backend in this demo, so every purchase runs through
// showPurchaseModal(): a mocked confirm -> processing -> success flow that
// mirrors a real app-store purchase sheet, then grants the reward locally.
// No card/payment details are ever collected.

const REMOVE_ADS_PRICE = '$2.99';

const BUFF_ICONS = { hint: '💡', freeze: '⏸️', skip: '⏩' };
const BUFF_ORDER = ['hint', 'freeze', 'skip'];

// Two big, eye-catching packs — this is the "hot deals" shelf every mobile
// shop leads with.
// Bright, not the app's darkest tones — these are full-size cards, not small
// chips, so a dark fill here reads as a "dead" tile rather than an accent.
const PACK_ACCENT_WARM = 0xd98c3d;
const FEATURED_PACKS = [
  { key: 'starter', title: 'Starter Pack', coins: 2000, buffs: { hint: 3, freeze: 3, skip: 1 }, price: '$2.99', tag: 'POPULAR', accent: PACK_ACCENT_WARM },
  { key: 'mega', title: 'Mega VIP Combo', coins: 5000, buffs: { hint: 5, freeze: 5, skip: 3 }, price: '$4.99', tag: 'BEST VALUE', accent: COLORS.teal, includeAdsRemoval: true }
];

// Smaller, plainer packs beneath the featured shelf.
const ITEM_BUNDLES = [
  { key: 'small', title: 'Small Bundle', coins: 1200, buffs: { hint: 2, freeze: 2 }, price: '$1.99' },
  { key: 'jumbo', title: 'Jumbo Bundle', coins: 15000, buffs: { hint: 10, freeze: 10, skip: 5 }, price: '$9.99', tag: 'SUPER' }
];

// Coins-only, no buffs — the plain "top up" ladder, standard F2P price anchors.
const COIN_PACKS = [
  { coins: 1000, price: '$0.99' },
  { coins: 3000, price: '$2.99' },
  { coins: 6000, price: '$4.99', tag: 'POPULAR' },
  { coins: 14000, price: '$9.99' },
  { coins: 30000, price: '$19.99' },
  { coins: 100000, price: '$49.99', tag: 'BEST VALUE' }
];

function fmt(n) { return n.toLocaleString('en-US'); }

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

  // Same bright sky gradient as Home — the shop used to be a dark navy page
  // sitting oddly between two light screens; this keeps the whole app's
  // brightness consistent instead of the shop reading as a different, gloomier app.
  drawBackground(width, height) {
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x5fc4f0, 0x5fc4f0, 0x0b4f78, 0x0b4f78, 1);
    bg.fillRect(0, 0, width, height);
    // Diagonal gold/wood canopy stripe under the header, echoing a
    // market-stall awning without borrowing the reference's purple accent.
    const stripes = this.add.graphics();
    stripes.fillStyle(COLORS.gold, 1);
    stripes.fillRect(0, 46, width, 6);
    stripes.fillStyle(COLORS.woodDark, 1);
    for (let x = -20; x < width + 20; x += 34) {
      stripes.save();
      stripes.translateCanvas(x, 46);
      stripes.rotateCanvas(-0.6);
      stripes.fillRect(0, 0, 12, 10);
      stripes.restore();
    }
  }

  buildTopBar(width) {
    this.add.text(16, 24, 'SHOP 🏪', {
      fontFamily: 'Cinzel', fontSize: '18px', fontStyle: '900', color: '#f3c64f',
      stroke: '#4a2c11', strokeThickness: 3
    }).setOrigin(0, 0.5);

    const closeX = width - 26, closeY = 24;
    makeIconButton(this, closeX, closeY, '✕', {
      size: 42, variant: 'ruby', iconSize: '16px',
      onClick: () => { playSound('switch', this.save.soundMuted); this.scene.start('Home'); }
    });

    const gemRightEdge = closeX - 28;
    this.gemChip = makeStatChip(this, gemRightEdge, 7, '💎', this.save.gems, COLORS.teal);
    const coinRightEdge = this.gemChip.rightEdge - 8;
    this.coinChip = makeStatChip(this, coinRightEdge, 7, '🟡', this.save.coins, COLORS.gold);
  }

  // ---------------- Scrollable content ----------------
  // Same press/move/release + hit-list pattern as HomeScene's map: buttons
  // only fire on a clean tap (no movement), so starting a scroll drag on top
  // of a price button can never trigger an accidental purchase.

  buildScrollArea(width, height) {
    this.viewTop = 62;
    this.viewBottom = height - 76;

    this.maskShape = this.make.graphics({ x: 0, y: 0 }, false);
    this.maskShape.fillStyle(0xffffff).fillRect(0, this.viewTop, width, this.viewBottom - this.viewTop);
    this.content = this.add.container(0, this.viewTop);
    this.content.setMask(this.maskShape.createGeometryMask());

    this.rebuildContent(width);
    this.setupScroll();
  }

  rebuildContent(width) {
    this.content.removeAll(true);
    this.hitAreas = [];

    let y = 10;
    y = this.drawRemoveAdsBanner(width, y) + 18;
    y = this.drawSectionLabel(width, y, 'Hot Deals') + 10;
    y = this.drawFeaturedPacks(width, y) + 18;
    y = this.drawSectionLabel(width, y, 'Item Bundles') + 10;
    y = this.drawItemBundles(width, y) + 18;
    this.goldShopY = y;
    y = this.drawSectionLabel(width, y, 'Gold Shop') + 10;
    y = this.drawCoinGrid(width, y) + 20;
    this.contentHeight = y;
  }

  drawSectionLabel(width, y, text) {
    const h = 28;
    const g = this.add.graphics();
    g.fillStyle(COLORS.parchment, 1).fillRoundedRect(14, y, width - 28, h, 10);
    g.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(14, y, width - 28, h, 10);
    const label = this.add.text(width / 2, y + h / 2, text.toUpperCase(), {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16', letterSpacing: 1
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
          this.rebuildContent(this.scale.width);
        }
      });
    });

    return y + h;
  }

  // ---------------- Buff grid (shared by featured packs + item bundles) ----------------

  drawBuffRow(x, y, w, buffs) {
    const keys = BUFF_ORDER.filter(k => buffs[k]);
    const gap = 6, slotW = (w - gap * (keys.length - 1)) / keys.length, slotH = 40;
    keys.forEach((key, i) => {
      const sx = x + i * (slotW + gap);
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1).fillRoundedRect(sx, y, slotW, slotH, 8);
      g.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(sx, y, slotW, slotH, 8);
      this.content.add(g);
      this.content.add(this.add.text(sx + slotW / 2, y + 15, BUFF_ICONS[key], { fontSize: '16px' }).setOrigin(0.5));
      this.content.add(this.add.text(sx + slotW - 4, y + slotH - 3, `×${buffs[key]}`, {
        fontFamily: 'Cinzel', fontSize: '8px', fontStyle: '900', color: '#2b1e16'
      }).setOrigin(1, 1));
    });
    return slotH;
  }

  grantPack(pack) {
    this.save.coins += pack.coins;
    BUFF_ORDER.forEach(key => {
      if (pack.buffs && pack.buffs[key]) this.save.buffs[key] = (this.save.buffs[key] || 0) + pack.buffs[key];
    });
    if (pack.includeAdsRemoval) this.save.adsRemoved = true;
    saveState(this.save);
    this.coinChip.setValue(this.save.coins);
  }

  packPerkText(pack) {
    const buffBits = BUFF_ORDER.filter(k => pack.buffs && pack.buffs[k]).map(k => `${BUFF_ICONS[k]}×${pack.buffs[k]}`);
    const bits = [`${fmt(pack.coins)} Coins`, ...buffBits];
    if (pack.includeAdsRemoval && !this.save.adsRemoved) bits.push('Remove Ads');
    return bits.join('  ·  ');
  }

  // ---------------- Featured packs (big, ribboned) ----------------

  drawFeaturedPacks(width, y) {
    const x = 14, w = width - 28, gap = 14;
    let cy = y;
    FEATURED_PACKS.forEach(pack => { cy = this.drawFeaturedPack(x, cy, w, pack) + gap; });
    return cy - gap;
  }

  drawFeaturedPack(x, y, w, pack) {
    const h = 150;
    const g = this.add.graphics();
    g.fillStyle(pack.accent, 1).fillRoundedRect(x, y, w, h, 18);
    g.lineStyle(3, COLORS.woodDark, 1).strokeRoundedRect(x, y, w, h, 18);
    this.content.add(g);

    // Ribbon tag, tilted like a hand-stuck price sticker.
    const ribbon = this.add.container(x + 28, y + 4);
    const rw = pack.tag.length * 7 + 18;
    const rg = this.add.graphics();
    rg.fillStyle(0xf43f5e, 1).fillRoundedRect(-rw / 2, -10, rw, 20, 6);
    rg.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(-rw / 2, -10, rw, 20, 6);
    const rt = this.add.text(0, 0, pack.tag, { fontFamily: 'Cinzel', fontSize: '11px', fontStyle: '900', color: '#ffffff' }).setOrigin(0.5);
    ribbon.add([rg, rt]);
    ribbon.setRotation(-0.12);
    this.content.add(ribbon);

    if (pack.includeAdsRemoval && !this.save.adsRemoved) {
      const badgeW = 64;
      const bg2 = this.add.graphics();
      bg2.fillStyle(0x22c55e, 1).fillRoundedRect(x + w - 12 - badgeW, y + 8, badgeW, 18, 9);
      bg2.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(x + w - 12 - badgeW, y + 8, badgeW, 18, 9);
      this.content.add(bg2);
      this.content.add(this.add.text(x + w - 12 - badgeW / 2, y + 17, 'NO ADS', {
        fontFamily: 'Cinzel', fontSize: '10px', fontStyle: '900', color: '#ffffff'
      }).setOrigin(0.5));
    }

    // Inner parchment box: coin badge + buff row.
    const boxX = x + 12, boxY = y + 26, boxW = w - 24;
    const boxG = this.add.graphics();
    boxG.fillStyle(COLORS.parchment, 1).fillRoundedRect(boxX, boxY, boxW, 66, 12);
    boxG.lineStyle(2, COLORS.woodDark, 1).strokeRoundedRect(boxX, boxY, boxW, 66, 12);
    this.content.add(boxG);

    const coinW = 64;
    this.content.add(this.add.text(boxX + coinW / 2, boxY + 20, '🟡', { fontSize: '18px' }).setOrigin(0.5));
    this.content.add(this.add.text(boxX + coinW / 2, boxY + 42, fmt(pack.coins), {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#2b1e16'
    }).setOrigin(0.5));
    this.drawBuffRow(boxX + coinW + 8, boxY + 13, boxW - coinW - 16, pack.buffs);

    this.content.add(this.add.text(x + 16, y + h - 16, pack.title, {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#ffffff'
    }).setOrigin(0, 0.5));

    const btnW = 92, btnH = 32;
    this.drawPriceButton(x + w - 14 - btnW, y + h - 16 - btnH / 2, btnW, btnH, pack.price, COLORS.gold, () => {
      this.showPurchaseModal({
        icon: '🟡', title: pack.title, subtitle: this.packPerkText(pack), price: pack.price,
        onConfirm: () => { this.grantPack(pack); this.rebuildContent(this.scale.width); }
      });
    });

    return y + h;
  }

  // ---------------- Item bundles (smaller, plainer cards) ----------------

  drawItemBundles(width, y) {
    const x = 14, w = width - 28, gap = 12;
    let cy = y;
    ITEM_BUNDLES.forEach(bundle => { cy = this.drawBundleCard(x, cy, w, bundle) + gap; });
    return cy - gap;
  }

  drawBundleCard(x, y, w, bundle) {
    const h = 100;
    const g = this.add.graphics();
    g.fillStyle(0xfff8e7, 1).fillRoundedRect(x, y, w, h, 14);
    g.lineStyle(2.5, COLORS.gold, 1).strokeRoundedRect(x, y, w, h, 14);
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

    this.content.add(this.add.text(x + 14, y + 16, bundle.title, {
      fontFamily: 'Cinzel', fontSize: '13px', fontStyle: '900', color: '#42281d'
    }).setOrigin(0, 0.5));
    this.content.add(this.add.text(x + 14, y + 32, `${fmt(bundle.coins)} Coins`, {
      fontFamily: 'Crimson Pro', fontSize: '10px', color: '#b45309'
    }).setOrigin(0, 0.5));
    this.drawBuffRow(x + 14, y + 44, w - 28 - 100, bundle.buffs);

    const btnW = 84, btnH = 30;
    this.drawPriceButton(x + w - 14 - btnW, y + h / 2 - btnH / 2, btnW, btnH, bundle.price, COLORS.gold, () => {
      this.showPurchaseModal({
        icon: '🟡', title: bundle.title, subtitle: this.packPerkText(bundle), price: bundle.price,
        onConfirm: () => { this.grantPack(bundle); this.rebuildContent(this.scale.width); }
      });
    });

    return y + h;
  }

  // ---------------- Gold Shop (plain coin ladder) ----------------

  drawCoinGrid(width, y) {
    const gap = 10, x = 14, gridW = width - 28;
    const cols = 3;
    const cw = (gridW - gap * (cols - 1)) / cols, ch = 106;
    COIN_PACKS.forEach((pack, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const cx = x + col * (cw + gap), cy = y + row * (ch + gap);
      this.drawCoinCard(cx, cy, cw, ch, pack);
    });
    const rows = Math.ceil(COIN_PACKS.length / cols);
    return y + rows * ch + (rows - 1) * gap;
  }

  drawCoinCard(x, y, w, h, pack) {
    const g = this.add.graphics();
    g.fillStyle(0xfff8e7, 1).fillRoundedRect(x, y, w, h, 14);
    g.lineStyle(2.5, COLORS.gold, 1).strokeRoundedRect(x, y, w, h, 14);
    this.content.add(g);

    if (pack.tag) {
      const tagW = Math.min(w - 6, pack.tag.length * 4.6 + 12);
      const tg = this.add.graphics();
      tg.fillStyle(0xf43f5e, 1).fillRoundedRect(x + w / 2 - tagW / 2, y - 7, tagW, 14, 7);
      this.content.add(tg);
      this.content.add(this.add.text(x + w / 2, y, pack.tag, {
        fontFamily: 'Cinzel', fontSize: '6px', fontStyle: '900', color: '#ffffff'
      }).setOrigin(0.5));
    }

    this.content.add(this.add.text(x + w / 2, y + 26, '🟡', { fontSize: '22px' }).setOrigin(0.5));
    this.content.add(this.add.text(x + w / 2, y + 50, fmt(pack.coins), {
      fontFamily: 'Cinzel', fontSize: '12px', fontStyle: '900', color: '#42281d'
    }).setOrigin(0.5));

    const btnW = w - 16, btnH = 26;
    this.drawPriceButton(x + 8, y + h - 12 - btnH, btnW, btnH, pack.price, COLORS.gold, () => {
      this.showPurchaseModal({
        icon: '🟡', title: `${fmt(pack.coins)} Coins`, subtitle: 'Coins are added to your balance instantly.', price: pack.price,
        onConfirm: () => {
          this.save.coins += pack.coins;
          saveState(this.save);
          this.coinChip.setValue(this.save.coins);
        }
      });
    });

    return y + h;
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

  setupScroll() {
    let pressY = 0, pressContainerY = 0, moved = false, isPressed = false, pressedHit = null;

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
      const viewH = this.viewBottom - this.viewTop;
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
    const panelW = width - 70, panelH = 260, px = width / 2 - panelW / 2, py = height / 2 - panelH / 2;
    const panel = this.add.graphics().setDepth(101);
    panel.fillStyle(COLORS.parchment, 1).fillRoundedRect(px, py, panelW, panelH, 18);
    panel.lineStyle(3, COLORS.gold, 1).strokeRoundedRect(px, py, panelW, panelH, 18);

    const iconBg = this.add.circle(width / 2, py + 44, 30, 0xffffff).setStrokeStyle(3, COLORS.woodDark).setDepth(101);
    const iconTxt = this.add.text(width / 2, py + 44, icon, { fontSize: '24px' }).setOrigin(0.5).setDepth(101);
    const titleTxt = this.add.text(width / 2, py + 88, title, {
      fontFamily: 'Cinzel', fontSize: '14px', fontStyle: '900', color: '#42281d', align: 'center', wordWrap: { width: panelW - 40 }
    }).setOrigin(0.5).setDepth(101);
    const subTxt = this.add.text(width / 2, py + 116, subtitle, {
      fontFamily: 'Crimson Pro', fontSize: '9.5px', color: '#5c4a3e', align: 'center', wordWrap: { width: panelW - 30 }
    }).setOrigin(0.5).setDepth(101);
    const priceTxt = this.add.text(width / 2, py + 154, price, {
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
