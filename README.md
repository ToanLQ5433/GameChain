# Pirate Trails — Logic Chains (Demo Mobile 9:16)

Bản demo web dựng lại đúng 5 cơ chế lõi đã chốt trong GDD, chia theo Category
(mỗi cơ chế = 1 thể loại, cộng thêm 1 thể loại "Tổng Hợp" kết hợp nhiều cơ chế),
giao diện dọc 9:16 kiểu game mobile, tách nhiều file theo Phaser 3 + Vite.

## Cấu trúc thư mục

```
index.html                # Khung trang, div#game-container (9:16)
src/
  main.js                 # Khởi tạo Phaser.Game, đăng ký các scene
  style.css                # CSS khung điện thoại giả lập trên desktop
  scenes/
    BootScene.js           # Nạp save game rồi chuyển sang Home
    HomeScene.js            # MÀN HÌNH CHÍNH — lưới 6 category
    LevelSelectScene.js     # Danh sách level trong 1 category
    GameScene.js             # MÀN HÌNH CHƠI — board + input kéo dây + HUD
  engine/
    ChainEngine.js           # Logic thuần túy 5 cơ chế lõi (không đụng Phaser)
  data/
    levels.js                # 6 category x 3 level, đúng format engine cần
  utils/
    audio.js                 # Âm thanh tổng hợp (Web Audio API)
    storage.js                # Lưu/đọc localStorage (coin, level đã qua)
```

## 5 Cơ chế lõi ↔ 6 Category

| Category (id)     | Cơ chế (MEC)     | Nội dung |
|---|---|---|
| `vat-can`          | MEC-01           | Rock, Wall, Push Rock |
| `dinh-huong-mau`   | MEC-02           | Arrow, Prism, ColorGate |
| `mat-ma-so`        | MEC-03           | Waypoints theo thứ tự |
| `cong-tac`         | MEC-04           | Switch → Gate (± Latch) |
| `bom-tinh`         | MEC-05           | Bom tĩnh — chỉ phá bằng Push Rock |
| `tong-hop`         | COMBO            | Kết hợp 2-3 cơ chế trong 1 màn |

Thêm/sửa level: chỉnh trực tiếp `src/data/levels.js`, giữ đúng format field
(`rocks`, `walls`, `pushRocks`, `switches`, `arrows`, `prisms`, `colorGates`,
`waypoints`, `bombs`, `anchors`) — `ChainEngine` đọc đúng các field này.

## Chạy thử local

```bash
npm install
npm run dev
```

Mở URL Vite in ra (mặc định `http://localhost:5173`) — trên desktop sẽ thấy
khung điện thoại giả lập tỉ lệ 9:16; mở bằng điện thoại thật (cùng mạng LAN,
dùng `--host`) sẽ full màn hình.

## Build & Deploy lên Vercel

```bash
npm run build      # build ra thư mục dist/
```

Cách 1 — deploy qua Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

Cách 2 — deploy qua Git: push repo này lên GitHub rồi "Import Project" trên
vercel.com, Vercel tự nhận `vercel.json` (buildCommand `npm run build`,
outputDirectory `dist`), không cần cấu hình thêm.

## Việc còn để mở rộng sau (ngoài phạm vi demo này)

- Level Timer System (Mục 3.8 GDD) — chưa gắn vào GameScene, có thể thêm
  1 đồng hồ đếm ngược ở top bar + `onTimerReachZero()` tương tự pseudocode GDD.
- Reward/Progression đầy đủ theo Đảo (Mục 2.5 GDD) — bản demo chỉ có Coin
  cơ bản + đánh dấu hoàn thành theo category, chưa có Mảnh Bản Đồ/Rương Đảo.
- Buff Hint/Freeze — đã lược bỏ khỏi bản demo để giảm phạm vi; có thể thêm lại
  bằng cách lưu kèm `solution` cho từng level trong `levels.js`.
