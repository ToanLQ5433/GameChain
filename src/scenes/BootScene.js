import Phaser from 'phaser';
import { loadSave } from '../utils/storage.js';
import { setHapticsEnabled } from '../utils/haptics.js';
import { startMusic } from '../utils/audio.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    // Nạp save game vào registry để mọi scene khác dùng chung 1 nguồn state.
    const save = loadSave();
    this.registry.set('save', save);
    setHapticsEnabled(save.hapticsEnabled);
    if (!save.musicMuted) startMusic();
    this.scene.start('Home');
  }
}
