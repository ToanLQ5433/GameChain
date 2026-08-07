# Pirate Trails — Logic Chains (Demo Mobile 9:16)

Bản demo web dựng lại đúng 5 cơ chế lõi đã chốt trong GDD, chia theo Category
(mỗi cơ chế = 1 thể loại, cộng thêm "Nhập Môn" — luật gốc không cơ chế — và
"Tổng Hợp" kết hợp nhiều cơ chế = 7 category), giao diện dọc 9:16 kiểu game
mobile, tách nhiều file theo Phaser 3 + Vite.

## Cấu trúc thư mục

```
index.html                # Khung trang, div#game-container (9:16)
src/
  main.js                 # Khởi tạo Phaser.Game, đăng ký các scene
  style.css                # CSS khung điện thoại giả lập trên desktop
  scenes/
    BootScene.js           # Nạp save game rồi chuyển sang Home
    HomeScene.js            # MÀN HÌNH CHÍNH — hải trình qua 7 category
    LevelSelectScene.js     # Lưới số màn trong 1 category (30 màn, cuộn dọc)
    GameScene.js             # MÀN HÌNH CHƠI — board + input kéo dây + HUD + Buff
  engine/
    ChainEngine.js           # Logic thuần túy 5 cơ chế lõi (không đụng Phaser)
  data/
    levels.js                # 7 category x 30 level — SINH TỰ ĐỘNG, xem bên dưới
  utils/
    audio.js                 # Âm thanh tổng hợp (Web Audio API)
    storage.js                # Lưu/đọc localStorage (coin, level đã qua)
    theme.js                  # Bảng màu + component UI dùng chung mọi scene
scripts/
  gen-levels.mjs               # Sinh + kiểm tra src/data/levels.js (xem mục riêng)
  verify-levels.mjs           # QA: phát lại lời giải tay qua Playwright, kiểm tra isWon()
```

## 5 Cơ chế lõi ↔ 7 Category

| Category (id)      | Cơ chế (MEC)     | Nội dung |
|---|---|---|
| `nhap-mon`         | CORE             | Luật gốc — nhiều xích cùng lúc, KHÔNG cơ chế phụ |
| `vat-can`          | MEC-01           | Rock, Wall, Push Rock |
| `dinh-huong-mau`   | MEC-02           | Arrow, Prism, ColorGate |
| `mat-ma-so`        | MEC-03           | Waypoints theo thứ tự |
| `cong-tac`         | MEC-04           | Switch → Gate (± Latch) |
| `bom-tinh`         | MEC-05           | Bom tĩnh — chỉ phá bằng Push Rock |
| `tong-hop`         | COMBO            | Kết hợp 2-3 cơ chế trong 1 màn |

Mỗi category có 30 màn (210 màn tổng). **Không sửa tay `src/data/levels.js`**
— file này do `scripts/gen-levels.mjs` sinh ra. Muốn thêm/đổi màn, sửa các
hàm `gen*` trong script đó rồi chạy lại (xem mục "Sinh level tự động" bên
dưới).

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

## Sinh level tự động (`scripts/gen-levels.mjs`)

`src/data/levels.js` (210 màn) được sinh bằng thuật toán, không viết tay:
mỗi màn xuất phát từ **1 đường đi Hamilton duy nhất** phủ toàn bộ ô khả dụng
của bàn cờ, sau đó **cắt** đường đó thành N đoạn liên tiếp cho N xích. Vì
đường Hamilton đi qua mỗi ô đúng 1 lần, việc cắt nó tự động đảm bảo:

- **Phủ kín 100%** — không dư ô nào (đúng Win Condition ở GDD 3.3).
- **Luôn giải được** — chính đường đã sinh ra LÀ lời giải, lưu lại ở trường
  `solution` của từng màn (dùng cho Buff Gợi Ý và để tự kiểm tra).

Các cơ chế (Mũi Tên, Waypoint, Công Tắc, Bom...) được gắn **lên trên** đường
đi đã biết đó nên luôn nhất quán với lời giải. Bom/Push Rock dùng kỹ thuật
ép đường đi xuất phát đúng 2 ô thẳng hàng với hố (bom) để hướng đẩy luôn khớp.

**Bàn cờ không bắt buộc hình vuông**: mỗi màn có `rows`/`cols` riêng (nhiều
tỉ lệ khung khác nhau, VD 4x7, 5x6...), và khoảng 1/4 số màn còn dùng thêm
`shape` — mặt nạ `'0'/'1'` khoét bàn cờ thành trái tim, ngôi sao, kim cương,
chữ thập, vòng nhẫn, chữ L, chữ T... (`ChainEngine.isVoid()` ẩn hẳn các ô
`'0'`). Không có 2 lớp đa dạng này, DFS xác định sẽ luôn tạo đúng 1 kiểu
đường "rắn bò" duy nhất cho mỗi kích thước — các màn cùng độ khó trông như
chỉ xoay/lật lại cùng 1 hình vuông (lỗi đã gặp và sửa qua 2 lần góp ý).
Mỗi màn còn dùng 1 seed riêng (`mulberry32`, xáo trộn điểm xuất phát + phá
hoà Warnsdorff + vị trí chướng ngại + cách chia độ dài xích) và được đối
chiếu chữ ký bàn cờ với mọi màn khác cùng thể loại — trùng thì tự sinh lại.

Chạy lại sau khi sửa hàm sinh:

```bash
node scripts/gen-levels.mjs
```

Script tự kiểm tra toàn bộ 210 màn qua `ChainEngine` thật ngay trong Node
(không cần trình duyệt) trước khi ghi đè `src/data/levels.js`, in ra
`ALL LEVELS VERIFIED OK` hoặc liệt kê màn nào lỗi.

## Kiểm tra tự động qua trình duyệt (QA script)

`scripts/verify-levels.mjs` phát lại **trường `solution` có sẵn trong từng
màn** (không hardcode toạ độ tay — sẽ lỗi thời ngay khi sinh lại level) qua
đúng `ChainEngine` thật chạy trong trình duyệt (Playwright), xác nhận
`isWon() === true` và không phát sinh lỗi console. Mặc định chỉ chạy mẫu
màn đầu/giữa/cuối mỗi thể loại (đủ để bắt lỗi tích hợp UI/Phaser thật); đặt
`SAMPLE=all` để chạy hết 210 màn qua trình duyệt (chậm hơn nhiều so với kiểm
tra bằng Node thuần trong `gen-levels.mjs` ở trên — dùng khi cần chắc chắn
tuyệt đối ở tầng Phaser thật). Script dùng Playwright nên cần cài thêm
(không có trong `devDependencies` vì không nằm trong bundle build):

```bash
npm i -D playwright
npx playwright install chromium   # nếu chưa có sẵn Chromium

npm run build && npm run preview  # mở server tại http://localhost:4173
node scripts/verify-levels.mjs    # ở terminal khác, khi preview đang chạy
```

Có thể đổi URL server bằng biến môi trường `BASE_URL` (mặc định
`http://localhost:4173`). Script exit code `0` nếu tất cả level giải được và
không có lỗi console, `1` nếu có level nào fail.

## Việc còn để mở rộng sau (ngoài phạm vi demo này)

- Level Timer System (Mục 3.8 GDD) — chưa gắn vào GameScene, có thể thêm
  1 đồng hồ đếm ngược ở top bar + `onTimerReachZero()` tương tự pseudocode GDD.
- Reward/Progression đầy đủ theo Đảo (Mục 2.5 GDD) — bản demo chỉ có Coin
  cơ bản + Nhiệm Vụ Ngày + đánh dấu hoàn thành theo category, chưa có Mảnh
  Bản Đồ/Rương Đảo thật hay khoá Đảo theo % hoàn thành (category hiện tại là
  nhóm theo cơ chế, không phải "Đảo" 8-10 màn tổng hợp như GDD 2.5 mô tả).
