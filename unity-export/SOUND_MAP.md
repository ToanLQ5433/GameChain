# Sound Map — Pirate Trails

Bảng chi tiết từng âm thanh: đặc tính kỹ thuật gốc (Web Audio), ý nghĩa gameplay,
và toàn bộ vị trí gọi trong code hiện tại. File WAV tương ứng nằm trong
`unity-export/sounds/sfx_<tên>.wav`, được render bằng `scripts/render-sounds.mjs`
(xem mục "Cách render lại" ở cuối file).

> **Cập nhật (2026-08-21):** rà lại toàn bộ sau khi dev phản hồi âm thanh nghe
> "quá nhỏ/mỏng" khi build lên mobile, và thiếu một sound riêng cho lúc thanh
> toán thành công trong Shop. Đã: (1) dày hơn từng âm bằng cách thêm lớp
> harmonic/sub-bass và attack ramp mềm, (2) chuẩn hoá lại âm lượng tổng thể
> của **cả nhóm SFX** lên ngưỡng nghe rõ trên loa điện thoại (giữ đúng tỉ lệ
> to/nhỏ tương đối giữa các sound, không đổi "tính cách" từng cái), (3) thêm
> sound mới `purchase` riêng cho giao dịch mua hàng thành công, tách khỏi
> `win`. Xem "Đặc tính âm thanh" cột dưới để biết peak/RMS thực tế sau khi
> chuẩn hoá.

## Bảng tổng hợp

| Tên (`type`) | File WAV | Đặc tính âm thanh (sau chuẩn hoá) | Ý nghĩa / khi nào phát | Gọi tại (file:line) |
|---|---|---|---|---|
| `switch` | `sfx_switch.wav` | square 240Hz, 0.09s, peak 0.21 | Tap nút UI chung: mở Settings, back, chuyển tab, mở/đóng modal, bấm mua hàng (mở modal + cancel), cancel | `GameScene.js:217,551,688` · `HomeScene.js:138,152,156,209,222,454,506,700` · `ShopScene.js:105,487,490,527` · `settingsModal.js:48,85` |
| `error` | `sfx_error.wav` | sine 210Hz, 0.04s, peak 0.07 — **cố ý để rất nhỏ** | Hành động không hợp lệ: kéo/thả sai ô, level đang khóa, hết mạng (lives), Undo khi chưa lock chain nào | `GameScene.js:354,544,670,1341,1367,1734` · `HomeScene.js:421,427` (level khóa / hết mạng) · `livesModal.js:45` (không đủ Coin) |
| `lock` | `sfx_lock.wav` | triangle 540Hz + shimmer octave-up 1080Hz, 0.16s, peak 0.28 | Chain kéo đủ dài và khóa lại (giải 1 mối liên kết); cũng dùng khi bấm vào node level trên bản đồ để vào màn, và khi Hint vẽ xong đường gợi ý | `GameScene.js:470,1351` (lock) · `GameScene.js:470` (hint reveal, dùng chung) · `HomeScene.js:433` (tap vào level node để chơi) |
| `step` | `sfx_step.wav` | sine 320Hz, 0.09s, peak 0.18 | Mỗi bước kéo chain được chấp nhận (di theo lưới) | `GameScene.js:1264,1284,1321` |
| `freeze` | `sfx_freeze.wav` | 2 nốt sine cao (1400→1800Hz), 0.14/0.17s, peak 0.20 | Kích hoạt buff Đóng băng (Freeze) | `GameScene.js:483` |
| `timerTick` | `sfx_timerTick.wav` | sine 660Hz, 0.05s, peak 0.06 — **cố ý để rất nhỏ** | Tick đồng hồ đếm giờ mỗi giây, chỉ phát khi còn <20% thời gian | `GameScene.js:591` |
| `timeout` | `sfx_timeout.wav` | sub-thump 110Hz + 2 nốt square giảm (300→220Hz), peak 0.48 | Hết giờ trên Level Timer | `GameScene.js:607` |
| `explode` | `sfx_explode.wav` | sub-bass 26Hz + 3 nốt sawtooth/square nặng, giảm dần (92→55→36Hz), peak 0.92 (loudest SFX) | Người chơi chạm trực tiếp vào Bom → thua ngay | `GameScene.js:1391` |
| `crack` | `sfx_crack.wav` | sub-thump 90Hz + 2 nốt gọn (680Hz square + 150Hz sawtooth), peak 0.63 | Push Rock đẩy trúng và phá bom thành công (tích cực, không thua) | `GameScene.js:1401` |
| `win` | `sfx_win.wav` | Arpeggio 4 nốt trưởng (C5-E5-G5-C6) + shimmer octave-up mỗi nốt, peak 0.47 | Qua màn (level complete), dùng Skip buff để qua màn; cũng dùng cho các CTA thành công khác trên bản đồ Home và khi refill/nhận Life miễn phí | `GameScene.js:1470` · `HomeScene.js:162,216,514,565` · `livesModal.js:53,68` |
| **`purchase`** *(mới)* | `sfx_purchase.wav` | Bell triangle 880Hz + rung sine 1318Hz, 2 nốt sparkle bay lên (1760→2093Hz), khép lại bằng 3 tiếng coin lách cách, peak 0.54 | **Thanh toán/mua hàng thành công trong Shop** — mọi gói (Featured Pack, Item Bundle, Gold Shop, Remove Ads) sau khi bấm Buy và spinner "Processing purchase…" xong. Trước đây dùng chung `win`, giờ tách riêng vì đây là 1 giao dịch tiền thật, không phải "chiến thắng gameplay" | `ShopScene.js:514` |
| `lose` | `sfx_lose.wav` | 3 nốt triangle giảm (G4-F4-D4) + sub layer octave dưới, peak 0.45 | Modal thất bại hiện ra (sau khi đã phát `explode` hoặc `timeout` một nhịp trước) | `GameScene.js:1697` |
| `coin` | `sfx_coin.wav` | square 880Hz + shimmer 1760Hz, 0.06s, peak 0.21 | Mỗi tick khi số coin thưởng đang đếm chạy lên (lặp lại nhiều lần liên tiếp) | `GameScene.js:1615` (đếm coin thường) · `GameScene.js:1683` (đếm coin x2, delay 150+90ms/lần) |
| `push` | `sfx_push.wav` | triangle 200Hz, 0.13s, peak 0.26 | Định nghĩa cho hành động đẩy Push Rock, nhưng **hiện không có nơi nào gọi trực tiếp** trong code — có thể route qua `step`/`lock` thay thế | *(không có call site hiện tại)* |
| `bomb` | `sfx_bomb.wav` | sawtooth 110Hz, 0.32s, peak 0.38 | Tone bom chung ban đầu, đã bị thay bằng `crack`/`explode` chi tiết hơn — **hiện không có nơi nào gọi trực tiếp** | *(không có call site hiện tại)* |

## Chi tiết từng điểm gọi — cụ thể theo màn hình/nút

Bảng trên chỉ tóm tắt; đây là danh sách đầy đủ **từng nơi cụ thể** phát mỗi
sound, viết theo tên màn hình/nút thật trong game (không cần đọc code).

### `switch` — tap nút UI chung
- **GameScene** (đang chơi): mở Settings (icon ⚙️ trên HUD) — `GameScene.js:217`
- **GameScene**: dùng buff Undo thành công, mở lại chain vừa lock — `GameScene.js:551`
- **GameScene**: đóng overlay "Hết giờ" sau khi được cộng thêm giờ (xem Ad hoặc trả Coin), quay lại chơi tiếp — `GameScene.js:688`
- **HomeScene**: mở Settings (icon ⚙️ trên HUD) — `HomeScene.js:138`
- **HomeScene**: bấm thẻ nổi "No Ads" trên bản đồ (mở Shop, hoặc toast nếu đã mua rồi) — `HomeScene.js:454`
- **HomeScene**: bấm nút **Shop** ở thanh dock dưới cùng — `HomeScene.js:700`
- **ShopScene**: bấm nút ✕ đóng Shop, quay về Home — `ShopScene.js:105`
- **ShopScene**: bấm **Cancel** trong modal xác nhận mua hàng — `ShopScene.js:487`
- **ShopScene**: bấm nút **"Buy $x.xx"** (bắt đầu spinner "Processing purchase…") — `ShopScene.js:490`
- **ShopScene**: bấm nút **Home** ở thanh dock dưới cùng — `ShopScene.js:527`
- **Settings modal** (dùng chung Home + GameScene): gạt bất kỳ toggle Sound / Music / Haptic — `settingsModal.js:48`
- **Settings modal**: bấm nút ✕ đóng modal Settings — `settingsModal.js:85`

### `error` — hành động không hợp lệ
- **GameScene**: bấm buff ❄️ Freeze khi đã dùng Freeze trong lượt chơi này rồi — `GameScene.js:354`
- **GameScene**: ngón tay lướt qua ô không hợp lệ trong lúc đang kéo chain (phát rất thường xuyên) — `GameScene.js:1341`
- **GameScene**: thả tay kết thúc kéo chain ở vị trí không hợp lệ — `GameScene.js:1367`
- **GameScene**: bấm "🟡 Coins — Retry Free" trong màn Rescue Offer khi không đủ Coin — `GameScene.js:1734`

### `lock` — chain khóa lại / mở khóa level
- **GameScene**: Hint (💡) vừa vẽ xong đường gợi ý đầy đủ trên chain đang chọn — `GameScene.js:470`
- **GameScene**: một chain được kéo đủ dài và khóa lại (thả tay hợp lệ) — `GameScene.js:1351`

### `step` — mỗi bước kéo chain
- **GameScene**: đặt tay xuống, bắt đầu kéo 1 chain — `GameScene.js:1264`
- **GameScene**: kéo lùi lại 1 ô (backtrack) trong lúc đang vẽ chain — `GameScene.js:1284`
- **GameScene**: kéo tiến thêm 1 ô hợp lệ theo lưới — `GameScene.js:1321`

### `freeze`
- **GameScene**: bấm buff ❄️ Đóng băng — tường bị freeze cho cả lượt chơi — `GameScene.js:483`

### `timerTick`
- **GameScene**: mỗi giây trôi qua khi Level Timer còn dưới 20% thời gian — `GameScene.js:591`

### `timeout`
- **GameScene**: Level Timer chạy về 0, mở overlay "Hết giờ" — `GameScene.js:607`

### `explode`
- **GameScene**: chain chạm trực tiếp vào Bomb → thua ngay — `GameScene.js:1391`

### `crack`
- **GameScene**: Push Rock đẩy trúng, phá Bomb thành công (không thua) — `GameScene.js:1401`

### `win` — thành công (không phải giao dịch tiền)
- **GameScene**: qua màn (level complete) — `GameScene.js:1470`
- **HomeScene**: xem Ad giả để nhận thêm Coin — `HomeScene.js:565`

### `purchase` *(mới)* — thanh toán tiền thật thành công
- **ShopScene**: xác nhận mua thành công **bất kỳ gói nào** trong Shop — Featured Pack (Starter/Mega VIP), Item Bundle (Small/Jumbo), Gold Shop (mọi mốc Coin), hoặc Remove Ads — ngay sau khi spinner "Processing purchase…" chạy xong và hiện dấu ✓ "Purchase complete!" — `ShopScene.js:514`

### `lose`
- **GameScene**: mở màn Rescue Offer sau khi thua (bom nổ hoặc hết giờ — phát một nhịp sau `explode`/`timeout`) — `GameScene.js:1697`

### `coin`
- **GameScene**: mỗi tick khi số Coin thưởng đếm chạy lên ở màn ăn mừng qua level — `GameScene.js:1615`
- **GameScene**: mỗi tick khi đếm Coin x2 (double reward, delay 150+90ms/lần) — `GameScene.js:1683`

### `push` / `bomb` — chưa dùng
Không có nơi nào gọi trong code hiện tại (xem ghi chú ở bảng tổng hợp).

## Nhạc nền

| Tên | File | Đặc tính | Khi nào phát |
|---|---|---|---|
| Music loop (web) | `music_loop.wav` | Arpeggio êm 4 nốt (C4-E4-G4-E4), sine, lặp mỗi 1.4s, peak 0.45 (chuẩn hoá riêng, thấp hơn nhóm SFX vì chạy liên tục dưới gameplay) | Bật khi vào game nếu chưa tắt Music (`BootScene.js:14` gọi `startMusic()`); dừng/mở lại khi bật tắt toggle Music trong Settings (`settingsModal.js:106`) |
| Music loop (Unity export) | `music_loop.ogg` | ⚠️ KHÔNG còn là bản render của `music_loop.wav` — đã thay bằng 1 track nhạc thật ~1:43, stereo 44.1kHz (nguồn gốc: `New.mp3`, giữ lại trong cùng thư mục làm bản gốc), chỉ dùng riêng cho bản build Unity | Chỉ ảnh hưởng file xuất cho Unity — bản web vẫn phát đúng arpeggio tự sinh như trên, không đổi gì |

## Ghi chú cho dev

- Tất cả sound hiện tại **không phải file asset gốc** — được tự sinh runtime
  bằng Web Audio oscillator trong `src/utils/audio.js`. Các file `.wav` trong
  `unity-export/sounds/` là bản render lại đúng công thức đó để dùng ngoài
  web/Unity.
- Cờ `muted`/`soundMuted` được truyền theo `this.save.soundMuted` (toggle
  Sound riêng trong Settings) — tách biệt với Music.
- **Vì sao trước đây nghe "nhỏ/mỏng":** mỗi sound chỉ có 1 oscillator, gain
  0.03–0.22, và bật thẳng lên gain đích tại t=0 (tạo click số + cảm giác
  mỏng). Đã sửa bằng: attack ramp ngắn (2–6ms) trước decay, thêm lớp
  harmonic/sub-bass cho các sound quan trọng (`explode`, `crack`, `timeout`,
  `lock`, `win`, `lose`, `coin`, `purchase`), và **chuẩn hoá âm lượng theo
  nhóm** — đo peak lớn nhất trong toàn bộ SFX (`explode`) và nhân cùng một hệ
  số cho tất cả file để `explode` đạt peak ~0.92, giữ nguyên tỉ lệ to/nhỏ
  tương đối với các sound khác. Nhạc nền (`music_loop`) được chuẩn hoá riêng,
  thấp hơn (peak 0.45), vì chạy liên tục dưới gameplay không nên to bằng SFX
  phản hồi.
- `error` và `timerTick` **giữ nguyên mức gain rất nhỏ có chủ đích** (peak
  0.06–0.07) — không nằm trong đợt tăng âm lượng này. `error` phát rất
  thường xuyên trong lúc kéo chain (mỗi lần lướt qua ô sai) nên set nhỏ để
  không gây khó chịu; `timerTick` lặp mỗi giây nên cũng cần nhỏ. Giữ nguyên
  mức độ ưu tiên "nhỏ, không gắt" này nếu tái tạo bên Unity — đừng đẩy volume
  2 sound này lên bằng các sound khác trong AudioMixer.
- `coin` được bắn liên tiếp nhiều lần (không phải 1 lần) để giả lập tiếng đếm
  số — nên set áp lực polyphony (nhiều instance overlap) đủ cho AudioSource.
- `purchase` là sound **mới**, tách từ `win` — nếu bạn map SFX theo tên biến
  `type` cũ trong 1 bảng cứng bên Unity, nhớ thêm entry mới này, đừng để
  fallback về `win` (nghe sẽ giống lúc qua màn, gây nhầm "mua hàng" với
  "thắng game").

## Cách render lại

```
node scripts/render-sounds.mjs
```

Script tự viết oscillator (sine/square/triangle/sawtooth) + envelope bằng
tay (không cần Web Audio API), mirror đúng từng `case` trong `playSound()`
của `src/utils/audio.js`, ghi ra `.wav`. Sau đó script tự gọi `ffmpeg-static`
(devDependency, không cần cài ffmpeg hệ thống) để encode thêm bản `.ogg`
(Ogg Vorbis, `libvorbis -q:a 6`) cho mỗi file — **dùng bản `.ogg` khi kéo
vào Unity**, `.wav` chỉ để nghe thử/chỉnh sửa trên máy. Mỗi khi sửa
gain/duration/thêm sound mới trong `audio.js`, sửa tương ứng trong
`SOUNDS`/`MUSIC_NOTES` của script rồi chạy `npm install && node
scripts/render-sounds.mjs` — nếu không cả `.wav` và `.ogg` xuất ra sẽ lệch
khỏi bản web.

**Vì sao không dùng `afconvert` (macOS có sẵn):** đã thử — `afconvert -f
Oggf -d vorb` chỉ giải mã (đọc) được Ogg Vorbis, không thật sự mã hoá
(ghi) được, luôn lỗi `ExtAudioFileSetProperty ('cfmt') failed`. Unity chỉ
đọc đúng `.ogg` nếu bên trong là codec Vorbis thật (không phải Opus, dù
cùng đóng gói trong container Ogg) — nên bắt buộc dùng `libvorbis` qua
ffmpeg, không có cách nào né việc cần 1 encoder Vorbis thật.

**Lưu ý:** đây là các file synth tự render, không phải bản ghi âm thật —
nội dung đã được rà soát bằng phân tích waveform (peak/RMS, kiểm tra không
clip, không im lặng, đúng thời lượng dự kiến) chứ không phải nghe trực tiếp
qua tai người ở bước này. Trước khi đẩy build lên mobile, nên nghe thử thật
trên thiết bị (đặc biệt `purchase` mới và các sound đã tăng gain như
`explode`/`timeout`) để chỉnh lại Volume trong AudioMixer nếu cần — chuẩn
hoá theo peak chỉ đảm bảo không bị nhỏ/clip, không đảm bảo "độ to cảm nhận"
(loudness) là hoàn hảo trên mọi loa.
