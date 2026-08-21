# Image Map — Pirate Trails

Bảng chi tiết từng file ảnh trong `unity-export/images/`: ảnh gốc là gì (emoji
hay hiệu ứng code), đại diện cho cái gì trong game, và vị trí gọi trong code
hiện tại. Dùng file này song song với `SOUND_MAP.md` khi gửi cho dev.

## A. `images/icons/` — 56 icon PNG (256×256, nền trong suốt)

Đây là toàn bộ icon/emoji đang hiển thị trực tiếp trong UI (nút, HUD, tile,
toast, tutorial). 52/56 giữ đúng màu gốc từ font Apple Color Emoji; 4 icon
đánh dấu **(vector)** do font emoji không có bản màu nên được vẽ lại tay.

| File PNG | Emoji/ký tự gốc | Thể hiện gì | Vị trí trong code (file:line) |
|---|---|---|---|
| `icon_coin.png` | 🪙 | Coin — tiền trong game (HUD, Shop, màn thưởng) | `GameScene.js:143,1661` · `HomeScene.js:116` · `ShopScene.js:95` |
| `icon_check.png` | ✓ (vector) | Dấu tick xác nhận (nút Buy OK, hoàn thành) | `GameScene.js:1214` · `HomeScene.js:342,450` · `ShopScene.js:165,506` |
| `icon_check_box.png` | ✅ | Toast xác nhận đã hiểu tutorial | `GameScene.js:905` |
| `icon_close_x.png` | ✕ (vector) | Nút đóng modal/Settings/Shop | `ShopScene.js:103` · `settingsModal.js:83` |
| `icon_lock.png` | 🔒 | Ổ khóa — level/tile bị khóa | `GameScene.js:1105` · `HomeScene.js:348` · `dock.js:43` |
| `icon_unlock.png` | 🔓 | Ổ khóa mở — tile đã mở khóa | `GameScene.js:1105` |
| `icon_key.png` | 🔑 | Chìa khóa — item để mở tile khóa | `GameScene.js:1091` |
| `icon_gear_settings.png` | ⚙️ | Bánh răng — nút Settings | `GameScene.js:172` · `HomeScene.js:136` |
| `icon_boat_sailboat.png` | ⛵ | Thuyền buồm (1 trong 5 icon thuyền/avatar) | `GameScene.js:63,1222` · `HomeScene.js:369` |
| `icon_boat_ship.png` | 🚢 | Tàu lớn (biến thể thuyền) | `GameScene.js:63` |
| `icon_boat_canoe.png` | 🛶 | Xuồng (biến thể thuyền) | `GameScene.js:63` |
| `icon_boat_speedboat.png` | 🛥️ | Du thuyền nhỏ (biến thể thuyền) | `GameScene.js:63` |
| `icon_anchor.png` | ⚓ | Mỏ neo (biến thể thuyền) | `GameScene.js:63` |
| `icon_lightbulb_hint.png` | 💡 | Bóng đèn — nút Hint (gợi ý) | `GameScene.js:277` · `ShopScene.js:20` |
| `icon_snowflake_freeze.png` | ❄️ | Bông tuyết — buff Freeze (đóng băng thời gian) | `GameScene.js:278,507` · `ShopScene.js:20` |
| `icon_fast_forward.png` | ⏩ | Buff/nút tăng tốc | `GameScene.js:280` · `ShopScene.js:20` |
| `icon_stopwatch.png` | ⏱️ | Đồng hồ — Level Timer | `GameScene.js:184` |
| `icon_rock.png` | 🪨 | Tile "Push Rock" (đá đẩy được) | `levels.js:599` · `GameScene.js:989` |
| `icon_category_paint.png` | 🎨 | Dùng 2 vai trò: icon category "Direction & Color" trên bản đồ, VÀ icon tile Prism (Lăng Kính) trên bàn chơi | `levels.js:1279` · `GameScene.js:1014` |
| `icon_category_compass.png` | 🧭 | Icon category chủ đề "Compass" (đầu file levels) | `levels.js:5` |
| `icon_category_numbers.png` | 🔢 | Icon category chủ đề "Numbers" | `levels.js:2018` |
| `icon_category_swords.png` | ⚔️ | Icon category chủ đề "Combined/Kết hợp" | `levels.js:4127` |
| `icon_radio_button.png` | 🔘 | Tile dạng nút bấm/toggle trên bàn chơi | `levels.js:2657` · `GameScene.js:1091` |
| `icon_bomb.png` | 💣 | Tile Bomb (bom) trên bàn chơi | `levels.js:3388` · `GameScene.js:1149` |
| `icon_explosion_big.png` | 💥 | Hiệu ứng nổ bom lớn (khi thua) | `GameScene.js:1435` |
| `icon_sparkle_small.png` | ✨ | Hiệu ứng lấp lánh / nổ nhỏ (Push Rock phá bom) | `GameScene.js:1435,1677` |
| `icon_heart_life.png` | ❤️ | Trái tim — số mạng (lives) còn lại trong HUD | `HomeScene.js:125` |
| `icon_heart_broken.png` | 💔 | Trái tim vỡ — hết mạng / mất 1 mạng khi retry | `GameScene.js:242,260` |
| `icon_trophy.png` | 🏆 | Cúp — thành tích/leaderboard trên bản đồ Home | `HomeScene.js:175` |
| `icon_calendar_checkin.png` | 📅 | Lịch — Daily Check-in reward | `HomeScene.js:474` |
| `icon_undo.png` | ↩️ | Mũi tên quay lại — nút Undo trong game | `GameScene.js:279` |
| `icon_finger_up.png` | 👆 | Ngón tay chỉ lên — tutorial hướng kéo | `GameScene.js:875` |
| `icon_finger_down.png` | 👇 | Ngón tay chỉ xuống — tutorial hướng kéo | `GameScene.js:875` |
| `icon_arrow_up.png` | ⬆️ | Mũi tên hướng đẩy Push Rock lên | `GameScene.js:995` |
| `icon_arrow_down.png` | ⬇️ | Mũi tên hướng đẩy Push Rock xuống | `GameScene.js:995` |
| `icon_arrow_left.png` | ⬅️ | Mũi tên hướng đẩy Push Rock trái | `GameScene.js:995` |
| `icon_arrow_right.png` | ➡️ | Mũi tên hướng đẩy Push Rock phải | `GameScene.js:995` |
| `icon_star_filled.png` | ★ (vector) | Sao đã đạt được — rating kết quả màn | `GameScene.js:1560` |
| `icon_star_outline.png` | ☆ (vector) | Sao chưa đạt được — rating kết quả màn | `GameScene.js:1560` |
| `icon_crate_box.png` | 📦 | Tile Crate (hòm gỗ, có thể chứa bom) | `GameScene.js:1570` |
| `icon_gem_diamond.png` | 💎 | Kim cương — tiền tệ premium trong Shop | `ShopScene.js:98` |
| `icon_forbidden.png` | 🚫 | Cấm/không thể — trạng thái item hết hàng hoặc đã sở hữu trong Shop | `ShopScene.js:165,178` |
| `icon_dot_yellow.png` | 🟡 | Bullet point vàng — liệt kê mô tả item trong Shop | `ShopScene.js:272,285,330,369,377` |
| `icon_fire_difficulty.png` | 🔥 | Lửa — biểu thị độ khó "Hard" | `difficulty.js:77` |
| `icon_skull_difficulty.png` | 💀 | Đầu lâu — biểu thị độ khó "Extreme" | `difficulty.js:78` |
| `icon_shop_store.png` | 🏪 | Nút vào Shop trên dock điều hướng | `dock.js:41` |
| `icon_home.png` | 🏠 | Nút về Home trên dock điều hướng | `dock.js:42` |
| `icon_sound_speaker.png` | 🔊 | Toggle Sound (SFX) trong Settings | `settingsModal.js:98` |
| `icon_music_note.png` | 🎵 | Toggle Music (nhạc nền) trong Settings | `settingsModal.js:103` |
| `icon_vibrate.png` | 📳 | Toggle Haptics (rung) trong Settings | `settingsModal.js:109` |
| `icon_watch_ad_tv.png` | 📺 | TV — nút "Watch Ad" (xem quảng cáo đổi thưởng) | `GameScene.js:411,642,1606,1727` · `HomeScene.js:163,566` · `livesModal.js:62` · `mockAd.js:10` |
| `icon_celebration_party.png` | 🎉 | Pháo giấy — toast nhận quà x2 / daily reward | `GameScene.js:1619` · `HomeScene.js:219,515` |
| `icon_document_privacy.png` | 📄 | Tài liệu — link Privacy Policy trong Settings | `settingsModal.js:123` |
| `icon_envelope_contact.png` | 📩 | Thư — link liên hệ support trong Settings | `settingsModal.js:154` |
| `icon_repeat_restore.png` | 🔁 | Nút "Restore Purchases" trong Settings | `settingsModal.js:132` |
| `icon_refresh_retry.png` | 🔄 | Nút "Retry" khi thua/hết giờ | `GameScene.js:657,1814` · `theme.js:111` |
| `icon_crate_push.png` | *(không phải emoji — vẽ tay theo đúng màu code)* | **Thùng gỗ đẩy được** — tile Sokoban chính, đẩy vào bom sẽ phá bom. Đây là tile bị thiếu ở bản trước vì không dùng emoji mà vẽ bằng Phaser Graphics (gỗ + đai thép + đinh tán + thanh trượt đáy) | `GameScene.js:1109-1140` (vẽ), `ChainEngine.js:22,64,179-198` (logic đẩy) |
| `icon_alarm_clock.png` | ⏰ | Tiêu đề modal "TIME OUT!" khi hết giờ (khác với ⏱️ là đồng hồ đếm giờ trong HUD) | `GameScene.js:629` |
| `icon_lightning_speed_bonus.png` | ⚡ | Chỉ báo thưởng tốc độ (Speed Bonus) trên màn thắng, ví dụ `⚡+20` | `GameScene.js:1578` |
| `icon_hourglass_wait.png` | ⏳ | Trạng thái đếm ngược "Wait" trên nút đóng Lives modal | `livesModal.js:78` |

## B. `images/` (gốc) — 11 sprite PNG cho hiệu ứng particle

Đây không phải icon UI mà là hạt/texture để dựng lại hiệu ứng động (particle,
flash, glow) vốn được vẽ bằng code Phaser Graphics/Tween trong `GameScene.js`
— không có emoji/ảnh gốc 1-1, mà là texture khái quát hoá cho Particle System.

| File PNG | Thể hiện gì | Hiệu ứng gốc trong code (hàm) |
|---|---|---|
| `fx_explosion_flash.png` | Chớp sáng trắng lan toả khi nổ bom | `triggerExplosion()` |
| `fx_freeze_flash.png` | Chớp sáng xanh khi kích hoạt Freeze | `spawnFreezeEffect()` |
| `fx_gold_ring.png` | Vòng tròn vàng lan ra — khi chain khóa hoặc bom nổ | `triggerExplosion()`, chain lock trong `GameScene.js` |
| `fx_spark_chip.png` | Mảnh chip nhỏ bay tứ phía khi nổ | `triggerExplosion()` |
| `fx_wood_splinter.png` | Mảnh gỗ vỡ khi Crate bị phá | `spawnCrateBreak()` |
| `fx_confetti_rect.png` | Mảnh confetti (tự đổi màu trong Unity) — màn ăn mừng thắng | `spawnVictoryCelebration()` |
| `fx_coin.png` | Coin bay trong màn ăn mừng thắng | `spawnVictoryCelebration()` |
| `fx_star.png` | Sao bay trong màn ăn mừng thắng | `spawnVictoryCelebration()` |
| `fx_snowflake.png` | Bông tuyết rơi khi đóng băng | `spawnFreezeEffect()` |
| `fx_soft_glow_white.png` | Glow trắng dùng chung cho halo/pulse tĩnh | nhiều nơi (nút bấm, level node) |
| `fx_soft_glow_gold.png` | Glow vàng dùng chung cho halo/pulse tĩnh | nhiều nơi (level node đang chọn, chain khóa) |

## Ghi chú cho dev

- Tất cả file trong `icons/` là **ảnh tĩnh 1 khung hình**, dùng làm sprite/UI
  Image bình thường, không cần animation clip.
- File trong mục B là **texture cho Particle System / SpriteRenderer động**,
  không dùng trực tiếp làm icon UI.
- Nếu cần thêm icon nào chưa có trong bảng (ví dụ icon mới phát sinh khi dev
  thêm feature), tìm emoji tương ứng trong code rồi báo lại — quy trình render
  màu từ Apple Color Emoji font đã có sẵn script, thêm nhanh trong vài phút.

## Phân biệt 3 loại "vật cản dạng khối" — dễ nhầm khi làm lại trong Unity

Trong code có 3 thứ trông giống nhau nhưng khác hẳn về hành vi, cần làm rõ với
dev để tránh nhầm lẫn khi dựng lại:

| Tên trong code | Icon | Đẩy được? | Vai trò |
|---|---|---|---|
| `rocks` | `icon_rock.png` (🪨) | Không — vật cản cứng tĩnh, chỉ chặn đường | `ChainEngine.js:20,63` |
| `pushRocks` | `icon_crate_push.png` (vẽ tay, KHÔNG phải emoji) | **Có** — cơ chế Sokoban chính, đẩy vào bom sẽ phá bom (`'crack'` + hiệu ứng `spawnCrateBreak()`) | `ChainEngine.js:22,64,179-198` · `GameScene.js:1109-1140,1448` |
| 📦 (`icon_crate_box.png`) | 📦 | Không áp dụng — chỉ dùng cho các mục đích khác (icon trang trí/UI), không phải tile trên bàn chơi dùng để đẩy | `GameScene.js:1570` |

Nói cách khác: **thùng gỗ đẩy được (mà bạn thấy thiếu) không dùng emoji 📦 —
nó được vẽ bằng code Phaser Graphics riêng** (thân gỗ + 2 đai thép có đinh tán
+ thanh trượt đáy), nên bước quét emoji ban đầu không bắt được nó. File
`icon_crate_push.png` mới thêm đã vẽ lại đúng màu/chi tiết từ code
(`TILE.crateWood #b9814a`, `crateWoodDark #6b4423`, `crateSteel #b0b8bf`,
`crateSteelDark #5b6670`).

## Bổ sung: 2 sound đã export nhưng hiện chưa được game gọi tới

- `sfx_push.wav` — âm định nghĩa cho việc đẩy thùng, nhưng code hiện tại chưa
  gọi (`case 'push'` tồn tại trong `audio.js:34` nhưng không có call site) —
  lúc đẩy crate đang dùng lại âm `step` chung. Có thể gợi ý dev gắn `push` vào
  đúng hành động đẩy để phân biệt rõ hơn với bước kéo chain thường.
- `sfx_bomb.wav` — tone bom chung ban đầu, cũng không có call site — đã bị
  thay bằng `explode`/`crack` chi tiết hơn. Giữ lại file để dev tham khảo nếu
  muốn dùng cho một trạng thái khác (ví dụ bom "kích hoạt/cảnh báo").
