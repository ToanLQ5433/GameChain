import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import HomeScene from './scenes/HomeScene.js';
import ShopScene from './scenes/ShopScene.js';
import GameScene from './scenes/GameScene.js';

// Dynamic Scaling — thay vì ép mọi máy vào đúng 405x720 (9:16), đo kích
// thước thật của thiết bị và dùng luôn đó làm độ phân giải logic. Điện
// thoại thật gần như không bao giờ đúng 9:16 (đa số ~19.5:9, tức hẹp/cao
// hơn) — ép cứng 9:16 trước đây khiến CSS aspect-ratio cắt bớt một phần
// chiều cao thật (letterbox), làm toàn bộ UI co lại nhỏ hơn cần thiết trên
// máy thật. Clamp về [320,480]x[560,960] để chữ/khoảng cách viết bằng px
// tuyệt đối trong code (đã giả định khung ~405 rộng) không bị méo tỉ lệ khi
// chạy trên khung desktop preview quá khổ (xem media query trong style.css).
function getGameSize() {
  const width = Math.round(Math.max(320, Math.min(window.innerWidth, 480)));
  const height = Math.round(Math.max(560, Math.min(window.innerHeight, 960)));
  return { width, height };
}

const { width, height } = getGameSize();

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width,
  height,
  backgroundColor: '#0f0b08',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  input: {
    activePointers: 1
  },
  scene: [BootScene, HomeScene, ShopScene, GameScene]
};

window.game = new Phaser.Game(config);

// Xoay máy / thanh địa chỉ trình duyệt thu-giãn đổi hẳn tỉ lệ khung nhìn —
// đo lại và resize Scale Manager, rồi restart scene đang mở để nó tự dựng
// lại layout theo kích thước mới (mọi scene đều đọc this.scale.width/height
// khi build UI, không có gì hard-code theo 405x720 cụ thể).
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const next = getGameSize();
    window.game.scale.resize(next.width, next.height);
    const active = window.game.scene.getScenes(true)[0];
    if (active) active.scene.restart();
  }, 200);
});
