import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import HomeScene from './scenes/HomeScene.js';
import GameScene from './scenes/GameScene.js';

// Thiết kế chuẩn tỉ lệ 9:16 (mobile portrait). Phaser.Scale.FIT sẽ tự co giãn
// khung này để vừa khung #game-container (xem style.css) trên mọi kích thước
// màn hình, giữ đúng tỉ lệ khung hình như game mobile thật.
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 405,
  height: 720,
  backgroundColor: '#0f0b08',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  input: {
    activePointers: 1
  },
  scene: [BootScene, HomeScene, GameScene]
};

window.game = new Phaser.Game(config);
