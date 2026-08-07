import Phaser from 'phaser';
import { loadSave } from '../utils/storage.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    // Nạp save game vào registry để mọi scene khác dùng chung 1 nguồn state.
    this.registry.set('save', loadSave());
    this.scene.start('Home');
  }
}
