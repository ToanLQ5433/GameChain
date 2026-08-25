# Pirate Trails — Unity Asset Export

Game gốc (Phaser/web) **không có file âm thanh hay hình ảnh nào cả** — mọi âm
thanh được tự sinh bằng Web Audio API (oscillator), và mọi hiệu ứng hình ảnh
được vẽ bằng code (Phaser Graphics + Tween), không dùng sprite. Thư mục này
chứa các file **đã được render/tái tạo lại** từ đúng công thức trong code gốc
(`src/utils/audio.js` và các hiệu ứng trong `src/scenes/GameScene.js`), ở dạng
file thật (.wav / .png) để kéo thẳng vào Unity.

## 1. `sounds/` — 16 file, mỗi file có cả bản `.wav` VÀ `.ogg` (Ogg Vorbis)

> Cập nhật 2026-08-21: âm lượng toàn nhóm SFX đã được chuẩn hoá lại (dev
> phản hồi bản cũ nghe quá nhỏ trên mobile) và thêm `sfx_purchase.wav` cho
> lúc thanh toán thành công trong Shop (trước đó bị thiếu, dùng chung với
> `sfx_win.wav`). Chi tiết đầy đủ + cách render lại: xem `SOUND_MAP.md`.
>
> Cùng ngày: thêm bản `.ogg` (Ogg Vorbis, encode bằng `libvorbis` qua
> `ffmpeg-static`) cho mọi file — Unity import `.ogg` gọn hơn `.wav` nhiều
> lần (nén, không cần giữ PCM thô). **Dùng `.ogg` khi kéo vào Unity**, giữ
> `.wav` lại chỉ để nghe thử/chỉnh sửa trên máy tính.

| File | Sự kiện gốc trong game |
|---|---|
| `sfx_step.wav` / `.ogg` | Kéo chain từng bước |
| `sfx_lock.wav` / `.ogg` | Chain khóa/hoàn thành |
| `sfx_switch.wav` / `.ogg` | Tap nút UI chung |
| `sfx_push.wav` / `.ogg` | Đẩy Push Rock |
| `sfx_bomb.wav` / `.ogg` | Tone bom chung (dự phòng, ít dùng trực tiếp) |
| `sfx_crack.wav` / `.ogg` | Phá bom thành công bằng Push Rock |
| `sfx_explode.wav` / `.ogg` | Chạm bom trực tiếp = thua |
| `sfx_error.wav` / `.ogg` | Kéo/thả sai ô |
| `sfx_win.wav` / `.ogg` | Qua level |
| `sfx_purchase.wav` / `.ogg` | Thanh toán/mua hàng thành công trong Shop |
| `sfx_lose.wav` / `.ogg` | Modal thất bại |
| `sfx_coin.wav` / `.ogg` | Mỗi tick đếm coin thưởng |
| `sfx_freeze.wav` / `.ogg` | Kích hoạt buff đóng băng |
| `sfx_timerTick.wav` / `.ogg` | Tick đồng hồ đếm giờ (<20% thời gian) |
| `sfx_timeout.wav` / `.ogg` | Hết giờ |
| `music_loop.ogg` | Nhạc nền cho bản Unity — track thật ~1:43, stereo (⚠️ không còn khớp `music_loop.wav`, xem `SOUND_MAP.md`) |

**Cách import vào Unity:**
1. Kéo cả thư mục `sounds/` vào `Assets/Audio/` trong project Unity — **chỉ cần bản `.ogg`**,
   không cần kéo cả `.wav` vào Unity (giữ `.wav` ngoài project để nghe thử/chỉnh sửa thôi).
2. Chọn từng file `.ogg` → Inspector → SFX đã sẵn mono (không cần `Force To Mono`);
   riêng `music_loop.ogg` là stereo (track thật, không phải SFX tự sinh) — để nguyên stereo,
   không force mono. `Load Type` = `Decompress On Load` cho SFX ngắn, `Streaming` cho
   `music_loop.ogg`.
3. Gắn mỗi clip vào `AudioSource.clip` tương ứng với sự kiện, hoặc dùng chung
   một `AudioSource` + `PlayOneShot(clip)` cho SFX; `music_loop.ogg` gắn vào
   một `AudioSource` riêng với `Loop = true`.
4. Vì file được chuẩn hoá volume (normalize) khi render, hãy tự chỉnh lại
   `Volume` trong Inspector hoặc qua Mixer nếu thấy to/nhỏ hơn ý muốn — độ to
   tương đối giữa các sound đã được giữ đúng theo bản gốc.

## 2. `images/` — 11 sprite PNG (256×256, nền trong suốt), dùng cho Particle System

| File | Hiệu ứng gốc tương ứng |
|---|---|
| `fx_explosion_flash.png` | Flash trắng khi nổ bom |
| `fx_freeze_flash.png` | Flash xanh khi đóng băng |
| `fx_gold_ring.png` | Vòng vàng lan ra khi chain lock / nổ bom |
| `fx_spark_chip.png` | Mảnh chip bay ra khi nổ |
| `fx_wood_splinter.png` | Mảnh gỗ vỡ crate |
| `fx_confetti_rect.png` | Confetti màn ăn mừng (tự tint nhiều màu trong Unity) |
| `fx_coin.png` | Coin 🪙 bay trong màn ăn mừng / đếm thưởng |
| `fx_star.png` | Sao ✨ trong màn ăn mừng |
| `fx_snowflake.png` | Bông tuyết ❄️ khi đóng băng |
| `fx_soft_glow_white.png` / `fx_soft_glow_gold.png` | Glow nền dùng chung (halo, pulse) |

**Cách dùng trong Unity Particle System (Shuriken):**
1. Kéo PNG vào `Assets/Textures/FX/`. Trong Inspector đặt `Texture Type =
   Sprite (2D and UI)`, `Alpha Is Transparency = true`.
2. Tạo `Particle System` (GameObject → Effects → Particle System), gán texture
   vào module `Renderer → Material` (dùng shader `Particles/Standard
   Unlit`), hoặc dùng `Sprite Renderer` nếu chỉ cần 1 hình tĩnh (badge FROZEN,
   flash).
3. Gợi ý map nhanh 4 hiệu ứng chính trong game gốc:
   - **Nổ bom** (`triggerExplosion`): 1 `Sprite Renderer` flash
     `fx_explosion_flash` (fade alpha nhanh) + Particle System dùng
     `fx_spark_chip` (Emission burst ~7-12, Shape = Circle, tốc độ tỏa ra) +
     1 lượt `fx_gold_ring` phóng to dần rồi fade (animate Scale + Alpha).
   - **Vỡ Crate** (`spawnCrateBreak`): Particle System dùng `fx_wood_splinter`,
     Emission burst = 10, có Rotation over Lifetime.
   - **Đóng băng** (`spawnFreezeEffect`): Sprite Renderer `fx_freeze_flash`
     fade nhanh + Particle System `fx_snowflake` bay chậm rơi xuống (Gravity
     nhẹ), cộng 1 UI Image lặp pulse scale làm badge "FROZEN".
   - **Ăn mừng chiến thắng** (`spawnVictoryCelebration`): 3 Particle System
     riêng — `fx_confetti_rect` (Start Color = random nhiều màu, Rotation over
     Lifetime), `fx_coin`, `fx_star` — Emission burst lớn (30+/12/14), Shape =
     Box phía trên màn hình, hướng rơi xuống bằng Gravity Modifier.
4. Với các hiệu ứng "pulse"/"glow" tĩnh (halo level node, glow chain khóa,
   nút bấm nhấn), dùng `fx_soft_glow_white`/`fx_soft_glow_gold` trên
   `SpriteRenderer`/`Image`, rồi tween Scale/Alpha bằng `Animator` hoặc
   DOTween — logic gốc dùng Phaser Tween yoyo/repeat, tương đương
   `LeanTween`/`DOTween` loop `Yoyo`.

## 3. `images/icons/` — 60 icon PNG (256×256, nền trong suốt)

Toàn bộ icon/emoji dùng trực tiếp trong UI của game (nút, HUD, tutorial, toast,
category…) được liệt kê trong `src/scenes/*.js`, `src/utils/*.js`,
`src/data/levels.js`. 55/60 icon render lại đúng màu từ font Apple Color
Emoji (đã xoá nền, crop vuông sát viền). 5 icon không tồn tại bản màu trong
font emoji (hoặc không phải emoji) nên được vẽ lại bằng vector cho khớp game:
`check`, `close_x`, `star_filled`, `star_outline`, và **`icon_crate_push.png`**
— thùng gỗ đẩy được (Sokoban), vẽ tay theo đúng màu code vì tile này KHÔNG
dùng emoji mà vẽ bằng Phaser Graphics. Xem chi tiết phân biệt 3 loại "vật cản"
dễ nhầm (rock tĩnh / crate đẩy được / 📦 trang trí) trong `IMAGE_MAP.md`.

| File | Emoji gốc | Dùng ở đâu |
|---|---|---|
| `icon_coin.png` | 🪙 | Coin trong HUD, Shop, màn thưởng |
| `icon_check.png` | ✓ (vector) | Xác nhận / hoàn thành |
| `icon_check_box.png` | ✅ | Toast xác nhận tutorial |
| `icon_close_x.png` | ✕ (vector) | Nút đóng modal/Settings |
| `icon_lock.png` | 🔒 | Level bị khóa, ô khóa trên bản đồ |
| `icon_unlock.png` | 🔓 | Ô/level mở khóa |
| `icon_key.png` | 🔑 | Chìa khóa (mở khóa item trong grid) |
| `icon_gear_settings.png` | ⚙️ | Nút Settings |
| `icon_boat_sailboat.png` | ⛵ | Icon thuyền (biến thể) |
| `icon_boat_ship.png` | 🚢 | Icon thuyền (biến thể) |
| `icon_boat_canoe.png` | 🛶 | Icon thuyền (biến thể) |
| `icon_boat_speedboat.png` | 🛥️ | Icon thuyền (biến thể) |
| `icon_anchor.png` | ⚓ | Icon mỏ neo (biến thể thuyền) |
| `icon_lightbulb_hint.png` | 💡 | Nút Hint / gợi ý |
| `icon_snowflake_freeze.png` | ❄️ | Buff Freeze (Shop + HUD) |
| `icon_fast_forward.png` | ⏩ | Buff tăng tốc / nút tương tự |
| `icon_stopwatch.png` | ⏱️ | Level Timer |
| `icon_rock.png` | 🪨 | Tile Push Rock |
| `icon_category_paint.png` | 🎨 | Icon category "Art" |
| `icon_category_compass.png` | 🧭 | Icon category "Compass"/chủ đề |
| `icon_category_numbers.png` | 🔢 | Icon category "Numbers" |
| `icon_category_swords.png` | ⚔️ | Icon category "Combined/Combat" |
| `icon_radio_button.png` | 🔘 | Tile dạng nút bấm |
| `icon_bomb.png` | 💣 | Tile Bomb |
| `icon_explosion_big.png` | 💥 | Hiệu ứng nổ bom lớn |
| `icon_sparkle_small.png` | ✨ | Hiệu ứng nổ nhỏ / lấp lánh |
| `icon_heart_life.png` | ❤️ | Icon mạng (lives) HUD |
| `icon_heart_broken.png` | 💔 | Hết mạng |
| `icon_trophy.png` | 🏆 | Thành tích / leaderboard |
| `icon_calendar_checkin.png` | 📅 | Daily check-in |
| `icon_undo.png` | ↩️ | Nút Undo |
| `icon_finger_up.png` | 👆 | Tutorial — chỉ tay hướng lên |
| `icon_finger_down.png` | 👇 | Tutorial — chỉ tay hướng xuống |
| `icon_arrow_up/down/left/right.png` | ⬆️⬇️⬅️➡️ | Hướng đẩy Push Rock |
| `icon_star_filled.png` | ★ (vector) | Sao đạt được (rating màn) |
| `icon_star_outline.png` | ☆ (vector) | Sao chưa đạt |
| `icon_crate_box.png` | 📦 | Tile Crate |
| `icon_gem_diamond.png` | 💎 | Tiền tệ premium (gem) trong Shop |
| `icon_forbidden.png` | 🚫 | Trạng thái không thể mua/dùng |
| `icon_dot_yellow.png` | 🟡 | Bullet point trong Shop |
| `icon_fire_difficulty.png` | 🔥 | Mức độ khó "Hard" |
| `icon_skull_difficulty.png` | 💀 | Mức độ khó "Extreme" |
| `icon_shop_store.png` | 🏪 | Nút vào Shop (dock) |
| `icon_home.png` | 🏠 | Nút về Home (dock) |
| `icon_sound_speaker.png` | 🔊 | Toggle Sound trong Settings |
| `icon_music_note.png` | 🎵 | Toggle Music trong Settings |
| `icon_vibrate.png` | 📳 | Toggle Haptics trong Settings |
| `icon_watch_ad_tv.png` | 📺 | Nút Watch Ad |
| `icon_celebration_party.png` | 🎉 | Toast nhận quà x2 / daily reward |
| `icon_document_privacy.png` | 📄 | Link Privacy trong Settings |
| `icon_envelope_contact.png` | 📩 | Link Contact/support trong Settings |
| `icon_repeat_restore.png` | 🔁 | Nút Restore Purchases |
| `icon_refresh_retry.png` | 🔄 | Nút Retry |
| `icon_crate_push.png` | (vẽ tay) | **Thùng gỗ đẩy được** — tile Sokoban chính trên bàn chơi |
| `icon_alarm_clock.png` | ⏰ | Tiêu đề modal hết giờ "TIME OUT!" |
| `icon_lightning_speed_bonus.png` | ⚡ | Chỉ báo thưởng tốc độ trên màn thắng |
| `icon_hourglass_wait.png` | ⏳ | Đếm ngược "Wait" trên nút đóng Lives modal |

**Cách import:** kéo cả `icons/` vào `Assets/Textures/Icons/`, đặt `Texture
Type = Sprite (2D and UI)`, `Alpha Is Transparency = true`. Dùng trực tiếp
trên `UI Image` cho HUD/nút bấm, hoặc `SpriteRenderer` nếu đặt trong world
space (tile grid).

## 4. Về haptics (rung) — không có file, chỉ có code

Game gốc dùng `navigator.vibrate` với 5 pattern: `step` (8ms), `lock` (18ms),
`tap` (6ms), `win` ([20,40,20,40,60]ms), `fail` (90ms). Trong Unity, map trực
tiếp sang `Handheld.Vibrate()` (Android/iOS chỉ có rung đơn giản) hoặc dùng
plugin rung có pattern (ví dụ MoreMountains Feedbacks / Lofelt NiceVibrations)
với đúng các mốc thời gian trên.

## 5. Nguồn code gốc để đối chiếu

- Công thức âm thanh: `src/utils/audio.js`
- Công thức hiệu ứng hình ảnh: `src/scenes/GameScene.js` (tìm các hàm
  `triggerExplosion`, `spawnCrateBreak`, `spawnFreezeEffect`,
  `spawnVictoryCelebration`)
- Danh sách icon/emoji dùng trong UI: `src/scenes/*.js`, `src/utils/*.js`,
  `src/data/levels.js`
- Haptics: `src/utils/haptics.js`
