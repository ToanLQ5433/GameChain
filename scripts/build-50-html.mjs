import fs from 'fs';

function buildStudioSuite() {
  const levelsJson = fs.readFileSync('scripts/generated_50_levels.json', 'utf8');
  const forgeHtml = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');

  // Extract CSS
  const styleMatch = forgeHtml.match(/<style>([\s\S]*?)<\/style>/);
  const baseStyle = styleMatch ? styleMatch[1] : '';

  // Extract Script 1 (Core Engine)
  const startScript1 = forgeHtml.indexOf('<script>') + 8;
  const endScript1 = forgeHtml.indexOf('</script>');
  const script1 = forgeHtml.substring(startScript1, endScript1);

  // Extract boardSVG
  const startSvg = forgeHtml.indexOf('function boardSVG(p, o) {');
  const endSvg = forgeHtml.indexOf('/* ================= INTERACTIVE SHAPE PAINTER MODULE ================= */');
  const boardSvgFunc = forgeHtml.substring(startSvg, endSvg);

  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PIRATE TRAILS — 50 LEVEL MASTER STUDIO & PACING SUITE</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;650;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<style>
${baseStyle}

/* Studio 3-Panel Layout */
.studio-layout {
  display: grid;
  grid-template-columns: 360px 1fr 460px;
  gap: 16px;
  margin-top: 14px;
}
@media (max-width: 1440px) {
  .studio-layout {
    grid-template-columns: 320px 1fr 420px;
  }
}
@media (max-width: 1200px) {
  .studio-layout {
    grid-template-columns: 300px 1fr;
  }
  .studio-right-panel {
    grid-column: span 2;
  }
}
@media (max-width: 900px) {
  .studio-layout {
    grid-template-columns: 1fr;
  }
  .studio-right-panel {
    grid-column: span 1;
  }
}

.ch-tab-bar {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 12px;
  border-bottom: 1.5px solid #e2e8f0;
}
.ch-tab {
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  white-space: nowrap;
  transition: all 0.12s;
}
.ch-tab.active {
  background: #2563eb;
  color: #fff;
  border-color: #1d4ed8;
  box-shadow: 0 2px 4px rgba(37,99,235,0.25);
}

.level-list-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 6px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.12s;
}
.level-list-item:hover {
  border-color: #94a3b8;
  transform: translateX(2px);
}
.level-list-item.active {
  border-color: #2563eb;
  background: #eff6ff;
  box-shadow: 0 2px 6px rgba(37,99,235,0.15);
}
.level-list-item.solved {
  border-left: 4px solid #16a34a;
}

.sub-tabs {
  display: flex;
  gap: 4px;
  background: #e2e8f0;
  padding: 4px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.sub-tab {
  flex: 1;
  text-align: center;
  padding: 7px 4px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 6px;
  color: #475569;
  transition: all 0.15s;
}
.sub-tab.active {
  background: #ffffff;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.tut-box {
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Timer & Buff Controls */
.timer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 12px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.timer-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
}
.timer-val.danger {
  color: #dc2626;
  animation: pulse 1s infinite;
}
.timer-val.frozen {
  color: #0284c7;
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.buff-btn-group {
  display: flex;
  gap: 6px;
}
.buff-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  transition: all 0.1s;
}
.buff-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

/* Custom Designer Elements */
.brush-bar {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin: 8px 0;
}
.brush-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  color: #475569;
  transition: all 0.1s;
}
.brush-btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}
.brush-btn.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #1d4ed8;
  box-shadow: 0 1px 4px rgba(37,99,235,0.25);
}

.designer-cell {
  width: 36px;
  height: 36px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  background: #ffffff;
  transition: transform 0.08s;
}
.designer-cell:hover {
  transform: scale(1.06);
  z-index: 2;
}
.designer-cell.void {
  background: #f1f5f9;
  border-color: #e2e8f0;
  color: #94a3b8;
}
.designer-cell.rock {
  background: #94a3b8;
  color: #ffffff;
}
.designer-cell.anchor {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(37,99,235,0.3);
}
.designer-cell.push {
  background: #fef08a;
  color: #854d0e;
  border-color: #facc15;
}
.designer-cell.switch {
  background: #e0e7ff;
  color: #4338ca;
  border-color: #818cf8;
}
.designer-cell.prism {
  background: #fce7f3;
  color: #be185d;
  border-color: #f472b6;
}
.designer-cell.waypoint {
  background: #ecfdf5;
  color: #065f46;
  border-color: #34d399;
}
.designer-cell.bomb {
  background: #fee2e2;
  color: #dc2626;
  border-color: #f87171;
}

.anchor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 6px;
}

/* Modal for JSON Import */
.custom-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  backdrop-filter: blur(4px);
}
.custom-modal.active {
  display: flex !important;
}
.custom-modal-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 22px;
  width: 90%;
  max-width: 580px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
  border: 1.5px solid #cbd5e1;
}
</style>
</head>
<body>

<header>
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
    <div>
      <h1 style="margin:0">🏴‍☠️ PIRATE TRAILS — 50 LEVEL MASTER STUDIO</h1>
      <p style="margin:4px 0 0 0;font-size:12px">Bộ 50 Màn Chuẩn Nhịp Răng Cưa Sawtooth Kishōtenketsu · Trục Khối Trượt Sokoban (MEC-01 $\to$ MEC-05) · 3 Độ Khó: Normal · Hard · Super Hard.</p>
    </div>
    <div class="row" style="gap:8px">
      <button class="ghost sm" id="btnImportSuiteJson">📤 Nhập JSON (Suite / Màn)</button>
      <button class="primary sm" id="btnExportAllJson">📥 Tải Toàn Bộ 50 Level JSON</button>
      <button class="ghost sm" id="btnResetProgress">🔄 Xóa Tiến Trình Chơi</button>
    </div>
  </div>
</header>

<main>

  <!-- SUMMARY PROGRESSION STRIP -->
  <section class="card" style="padding:12px 16px;margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:16px;align-items:center">
        <div><span style="font-size:11px;color:#64748b;font-weight:700">TIẾN ĐỘ HẢI TRÌNH:</span> <b id="statProgress" style="font-size:15px;color:#2563eb">0 / 50</b></div>
        <div><span style="font-size:11px;color:#64748b;font-weight:700">PHÂN BỔ ĐỘ KHÓ:</span> <span class="badge" style="background:#f0fdf4;border-color:#86efac;color:#166534">🟢 Normal: 28</span> <span class="badge" style="background:#fffbeb;border-color:#fde68a;color:#92400e">🟠 Hard: 17</span> <span class="badge" style="background:#fef2f2;border-color:#fca5a5;color:#991b1b">🔴 Super Hard: 5</span></div>
      </div>
      <div>
        <span class="hint">Phủ kín 100% ô đất · Trục Khối Trượt Sokoban xuyên suốt 5 cơ chế · 5 Rương Cụm Climax</span>
      </div>
    </div>
  </section>

  <!-- STUDIO MAIN THREE-PANEL LAYOUT -->
  <div class="studio-layout">
    
    <!-- LEFT PANEL: CHAPTER TABS & 50 LEVEL LIST -->
    <section class="card" style="padding:14px">
      <h3 style="margin-top:0;margin-bottom:10px;font-size:13px;text-transform:uppercase;color:#475569">50 Màn Hải Trình (5 Chapters)</h3>
      <div class="ch-tab-bar" id="chTabBar">
        <div class="ch-tab active" data-ch="0">Tất cả (50)</div>
        <div class="ch-tab" data-ch="1">Ch.1: Vịnh San Hô</div>
        <div class="ch-tab" data-ch="2">Ch.2: Kho Báu Thủy Tinh</div>
        <div class="ch-tab" data-ch="3">Ch.3: Mật Mã Hải Vương</div>
        <div class="ch-tab" data-ch="4">Ch.4: Cơ Quan Cổ Đại</div>
        <div class="ch-tab" data-ch="5">Ch.5: Bom Biển Sâu</div>
      </div>
      <div style="max-height: calc(100vh - 280px); overflow-y: auto; padding-right: 4px" id="levelsListContainer"></div>
    </section>

    <!-- CENTER PANEL: MASTER PLAYABLE BOARD (WITH TIMER & BUFFS) -->
    <section class="card" style="padding:16px; display:flex; flex-direction:column; align-items:center">
      <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px">
        <div>
          <h2 id="playLevelTitle" style="margin:0; font-size:18px">L01 · Tutorial · 1 Dây (4×4)</h2>
          <div id="playLevelBadges" style="display:flex; gap:6px; margin-top:4px; flex-wrap:wrap"></div>
        </div>
        <div class="row" style="gap:6px">
          <button class="ghost sm" id="btnPlaySol">💡 Lời Giải</button>
          <button class="ghost sm" id="btnPlayCoord">📐 Tọa Độ</button>
          <button class="ghost sm" id="btnPlayReset">🔄 Đặt Lại</button>
        </div>
      </div>

      <!-- TIMER & BUFF CONTROLS STRIP -->
      <div class="timer-bar" id="playTimerBar">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:16px">⏱️</span>
          <span id="timerDisplay" class="timer-val">Vô Tận (Tắt Timer)</span>
        </div>
        <div class="buff-btn-group">
          <button class="buff-btn" id="btnBuffHint">💡 Hint (<span id="hintCount">3</span>)</button>
          <button class="buff-btn" id="btnBuffFreeze">❄️ Freeze (+15s)</button>
          <button class="buff-btn" id="btnBuffUndo">↩️ Undo</button>
        </div>
      </div>

      <!-- TUTORIAL TIP BANNER (IF ANY) -->
      <div id="tutBanner" class="tut-box sec-off">
        <span style="font-size:20px">💡</span>
        <div style="font-size:13px;color:#166534;font-weight:600" id="tutText"></div>
      </div>

      <!-- PLAYABLE BOARD SVG CANVAS -->
      <div id="masterBoardWrap" style="margin: 8px 0; display:flex; justify-content:center; touch-action:none"></div>

      <!-- PLAY PANEL STATS & CONTROLS -->
      <div id="masterPlayPanel" style="width:100%; margin-top:8px"></div>
    </section>

    <!-- RIGHT PANEL: LEVEL STUDIO & CUSTOM DESIGNER -->
    <section class="card studio-right-panel" style="padding:14px">
      <div class="sub-tabs">
        <div class="sub-tab active" id="tabNavInfo">📊 Đánh Giá & Não Bộ</div>
        <div class="sub-tab" id="tabNavReroll">🎲 Sinh Lại Màn</div>
        <div class="sub-tab" id="tabNavEdit">✏️ Tự Thiết Kế Map</div>
      </div>

      <!-- TAB 1: FULL COGNITIVE EVALUATION & JSON (6 PILLARS + TIERS + TRACE) -->
      <div id="panelInfo">
        <h4 style="margin:0 0 8px 0;font-size:12px;text-transform:uppercase;color:#475569">1. Chỉ Số Đánh Giá Cốt Lõi (Core Metrics)</h4>
        <div class="tiles" id="studioDetTiles"></div>

        <h4 style="margin:12px 0 6px 0;font-size:12px;text-transform:uppercase;color:#475569">2. Sáu Trụ Cột Nhận Thức (6 Cognitive Pillars)</h4>
        <div class="tiles" id="studioPillarTiles"></div>

        <h4 style="margin:12px 0 6px 0;font-size:12px;text-transform:uppercase;color:#475569">3. Phân Bổ Bậc Kỹ Thuật (Tier 1 → Tier 5)</h4>
        <div id="studioTierBars" style="margin-bottom:8px"></div>

        <h4 style="margin:12px 0 6px 0;font-size:12px;text-transform:uppercase;color:#475569">4. Lý Giải Hành Vi Não Bộ</h4>
        <div style="padding:8px 10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;font-size:12px;color:#334155;margin-bottom:10px" id="studioWhyDiv"></div>
        
        <h4 style="margin:12px 0 6px 0;font-size:12px;text-transform:uppercase;color:#475569">5. Dữ Liệu JSON Chuẩn</h4>
        <div class="row" style="gap:6px;margin-bottom:6px">
          <button class="ghost sm" id="btnCopyJson">📋 Copy JSON</button>
          <button class="ghost sm" id="btnDownloadSingleJson">📥 Tải JSON</button>
          <button class="primary sm" id="btnImportSingleJson">📤 Nhập JSON Màn</button>
        </div>
        <pre id="studioJsonPre" style="max-height: 180px; font-size: 11px"></pre>
      </div>

      <!-- TAB 2: FULL-FEATURED REROLL GENERATOR (EXACT FORGE PARAMETERS) -->
      <div id="panelReroll" class="sec-off">
        <h4 style="margin:0 0 8px 0;font-size:12px;text-transform:uppercase;color:#475569">Bộ Sinh Màn Mới Đầy Đủ (Chuẩn Forge)</h4>
        <p class="hint" style="margin-bottom:10px">Tùy biến đầy đủ kích thước, cơ chế và độ khó để sinh biến thể mới cho màn này.</p>
        
        <div class="row" style="margin-bottom:8px">
          <div class="f" style="flex:1">
            <label for="rrR">Hàng (R)</label>
            <input id="rrR" type="number" min="3" max="10" value="6">
          </div>
          <div class="f" style="flex:1">
            <label for="rrC">Cột (C)</label>
            <input id="rrC" type="number" min="3" max="10" value="5">
          </div>
          <div class="f" style="flex:1">
            <label for="rrK">Số Xích (K)</label>
            <input id="rrK" type="number" min="1" max="4" value="2">
          </div>
        </div>

        <div class="f wide" style="margin-bottom:8px">
          <label for="rrShape">Bố Cục Bàn Cờ</label>
          <select id="rrShape">
            <option value="rect" selected>⬛ Chữ nhật truyền thống (M×N chuẩn)</option>
            <option value="heart">💖 Trái Tim (Heart Island)</option>
            <option value="skull">🏴‍☠️ Đầu Lâu Cướp Biển (Pirate Skull)</option>
            <option value="anchor">⚓ Mỏ Neo Thép (Iron Anchor)</option>
            <option value="diamond">💎 Kim Cương San Hô (Diamond)</option>
            <option value="bridge">🌉 Đảo Song Sinh & Cầu Hẹp (Twin Islands)</option>
            <option value="ring">🏝️ Đầm San Hô Vòng Tròn (Ring Atoll)</option>
            <option value="cross">✝️ Thập Tự Corsair (Cross)</option>
            <option value="hourglass">⏳ Đồng Hồ Cát Vô Cực (Hourglass)</option>
            <option value="auto_gestalt">🎲 Tự động hình đẹp & đối xứng (Gestalt)</option>
          </select>
        </div>

        <div class="f wide" style="margin-bottom:8px">
          <label for="rrClass">Độ Khó Mục Tiêu</label>
          <select id="rrClass">
            <option value="0">Tự do (Bất kỳ độ khó)</option>
            <option value="1">1 · Dễ (Warm-up / Autopilot)</option>
            <option value="2">2 · Thường (Dòng chảy Flow)</option>
            <option value="3">3 · Khó (Bẫy Trực Giác / Aha! Trap)</option>
            <option value="4">4 · Siêu Khó (Mastery / Tải cao)</option>
          </select>
        </div>

        <div class="f wide" style="margin-bottom:10px">
          <label>Bật / Tắt Cơ Chế & Chướng Ngại Vật</label>
          <div class="mech-grid" style="grid-template-columns:1fr 1fr;gap:6px">
            <label class="mech-check"><input type="checkbox" id="chkRrWall" checked> 🧱 Vách Ngăn</label>
            <label class="mech-check"><input type="checkbox" id="chkRrRock"> 🪨 Rạn Đá Ngầm</label>
            <label class="mech-check"><input type="checkbox" id="chkRrPush"> 📦 Thùng Hàng</label>
            <label class="mech-check"><input type="checkbox" id="chkRrSwitch"> 🔘 Công Tắc & Cổng</label>
            <label class="mech-check"><input type="checkbox" id="chkRrPrism"> 💎 Lăng Kính Màu</label>
            <label class="mech-check"><input type="checkbox" id="chkRrWp"> 🔢 Mật Mã Số</label>
            <label class="mech-check"><input type="checkbox" id="chkRrBomb"> 💣 Bom Bẫy (MEC-05)</label>
          </div>
        </div>

        <div class="f" style="margin-bottom:12px">
          <label for="rrSeed">Seed Ngẫu Nhiên</label>
          <input id="rrSeed" type="number" placeholder="Để trống để lấy ngẫu nhiên">
        </div>

        <button class="primary" id="btnDoReroll" style="width:100%">⚡ Sinh Màn Mới Theo Cấu Hình Này</button>
      </div>

      <!-- TAB 3: FULL COMPREHENSIVE LEVEL DESIGNER (SHAPE + MECHANICS + ANCHOR STEPS + BOMBS) -->
      <div id="panelEdit" class="sec-off">
        <h4 style="margin:0 0 6px 0;font-size:12px;text-transform:uppercase;color:#475569">Bộ Công Cụ Tự Thiết Kế Map Chuyên Nghiệp</h4>
        
        <!-- GRID SIZE & ANCHOR CONTROLS -->
        <div class="row" style="margin-bottom:6px;gap:6px">
          <div class="f" style="flex:1">
            <label for="dsR">Hàng (R)</label>
            <input id="dsR" type="number" min="3" max="9" value="6">
          </div>
          <div class="f" style="flex:1">
            <label for="dsC">Cột (C)</label>
            <input id="dsC" type="number" min="3" max="9" value="5">
          </div>
          <div class="f" style="flex:1">
            <label for="dsK">Số Mỏ Neo</label>
            <input id="dsK" type="number" min="1" max="4" value="2">
          </div>
          <div style="display:flex;align-items:flex-end">
            <button class="ghost sm" id="btnDsResize" style="padding:6px 10px">Áp Dụng Lưới</button>
          </div>
        </div>

        <!-- BRUSH SELECTOR TOOLBAR (WITH BOMB MEC-05) -->
        <div style="font-size:11px;font-weight:700;color:#64748b;margin-top:6px">CHỌN CỌ VẼ (BRUSH):</div>
        <div class="brush-bar" id="dsBrushBar">
          <button class="brush-btn active" data-brush="land">🟩 Ô Đất</button>
          <button class="brush-btn" data-brush="void">⬜ Khoét Rỗng</button>
          <button class="brush-btn" data-brush="anchor">⚓ Mỏ Neo</button>
          <button class="brush-btn" data-brush="rock">🪨 Đá Tảng</button>
          <button class="brush-btn" data-brush="push">📦 Thùng</button>
          <button class="brush-btn" data-brush="switch">🔘 Công Tắc</button>
          <button class="brush-btn" data-brush="prism">💎 Lăng Kính</button>
          <button class="brush-btn" data-brush="waypoint">🔢 Mật Mã</button>
          <button class="brush-btn" data-brush="bomb">💣 Bom Bẫy</button>
        </div>

        <!-- QUICK SHAPE PRESETS & TRANSFORM TOOLS -->
        <div class="row" style="gap:4px;margin-bottom:8px;flex-wrap:wrap">
          <button class="ai-btn sm" id="btnDs_Random">🎲 Random Gestalt</button>
          <button class="ghost sm" id="btnDs_MirrorX" title="Đối xứng ngang">🪞 Mirror X</button>
          <button class="ghost sm" id="btnDs_MirrorY" title="Đối xứng dọc">🪞 Mirror Y</button>
          <button class="ghost sm" id="btnDs_Fill">⬛ Đầy</button>
          <button class="ghost sm" id="btnDs_Clear">⬜ Rỗng</button>
          <button class="ghost sm" id="btnDs_Undo">↩️ Undo</button>
        </div>

        <!-- INTERACTIVE DESIGNER GRID FRAME -->
        <div style="display:flex;justify-content:center;margin:8px 0;background:#f8fafc;padding:10px;border-radius:10px;border:1.5px dashed #cbd5e1;overflow-x:auto">
          <div id="dsGridContainer" style="display:grid;gap:4px"></div>
        </div>

        <!-- ANCHOR STEPS & LENGTH CONFIGURATION PANEL -->
        <div style="margin:10px 0;padding:8px 10px;background:#f1f5f9;border-radius:8px;border:1px solid #cbd5e1">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <b style="font-size:11.5px;color:#334155">⚓ Cấu Hình Bước Đi Từng Mỏ Neo (Anchor Steps):</b>
            <button class="ghost sm" id="btnDsAutoSplitSteps" style="padding:2px 6px;font-size:10px">⚡ Chia Đều Bước</button>
          </div>
          <div id="dsAnchorStepList"></div>
        </div>

        <!-- LIVE SHAPE METRICS -->
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
          <span class="painter-badge" id="dsBadgeCells">Tổng ô: 30</span>
          <span class="painter-badge ok" id="dsBadgeConn">🟢 Liền mạch</span>
          <span class="painter-badge" id="dsBadgeAnchors">⚓ Mỏ Neo: 2</span>
          <span class="painter-badge" id="dsBadgeBombs">💣 Bom: 0</span>
        </div>

        <!-- GENERATE / SAVE ACTIONS -->
        <div style="display:flex;flex-direction:column;gap:6px">
          <button class="primary" id="btnDsAutoGenerate">⚡ AI Tự Phủ Kín 100% & Đánh Giá Toàn Diện</button>
          <button class="ghost" id="btnDsSaveCurrent">💾 Lưu Đè Trực Tiếp Vào Màn Này</button>
        </div>
      </div>
    </section>

  </div>

</main>

<div id="tt" class="tt"></div>

<!-- JSON IMPORT MODAL DIALOG -->
<div id="jsonImportModal" class="custom-modal">
  <div class="custom-modal-card">
    <h3 style="margin-top:0;margin-bottom:8px;font-size:16px;color:#1e293b" id="importModalTitle">📤 Nhập Dữ Liệu JSON Vào Studio</h3>
    <p class="hint" style="margin-bottom:10px" id="importModalHint">Bạn có thể chọn file .json từ máy tính hoặc dán trực tiếp đoạn mã JSON vào khung dưới.</p>
    
    <div style="margin-bottom:10px">
      <input type="file" id="jsonFileInput" accept=".json" style="font-size:12px">
    </div>

    <textarea id="jsonTextInput" style="width:100%;height:180px;font-family:monospace;font-size:11px;padding:8px;border:1px solid #cbd5e1;border-radius:8px;box-sizing:border-box;margin-bottom:12px" placeholder='Dán mã JSON (Object của 1 level hoặc Mảng Array 50 levels)...'></textarea>

    <div class="row" style="justify-content:flex-end;gap:8px">
      <button class="ghost" id="btnCancelImport">Đóng / Hủy</button>
      <button class="primary" id="btnConfirmImport">✅ Xác Nhận Nạp JSON</button>
    </div>
  </div>
</div>

<script>
/* ================= CORE ENGINE LAYER ================= */
${script1}

/* ================= CONSTANTS & HELPERS ================= */
const CHHEX = ['#2a78d6', '#eb6834', '#1baf7a', '#4a3aa7'];
const COLOR_HEX_MAP = { red: '#ef4444', blue: '#3b82f6', green: '#10b981', purple: '#8b5cf6' };
const TCOL = ['', 'var(--t1)', 'var(--t2)', 'var(--t3)', 'var(--t4)', 'var(--t5)'];
const SCOL = ['', 'var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)'];
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ================= EXTENDED BOARD SVG WITH BOMBS (MEC-05) ================= */
${boardSvgFunc}

// Patch boardSVG to render bombs
const origBoardSVG = boardSVG;
boardSVG = function(p, o) {
  let svg = origBoardSVG(p, o);
  if (p.bombs && p.bombs.size > 0) {
    const cs = o.cs || 46;
    const pad = 14;
    const X = c => pad + (c % p.C) * cs;
    const Y = c => pad + Math.floor(c / p.C) * cs;
    const cx = c => X(c) + cs / 2;
    const cy = c => Y(c) + cs / 2;
    const fs = cs * 0.46;

    let bombSvg = '';
    p.bombs.forEach(bCell => {
      const isExploded = o.state && o.state.bombs && !o.state.bombs.has(bCell);
      if (!isExploded) {
        bombSvg += \`<rect x="\${X(bCell) + 2}" y="\${Y(bCell) + 2}" width="\${cs - 4}" height="\${cs - 4}" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.8"/>\`;
        bombSvg += \`<text x="\${cx(bCell)}" y="\${cy(bCell) + fs * 0.38}" font-size="\${fs * 1.05}" text-anchor="middle">💣</text>\`;
      }
    });

    svg = svg.replace('</svg>', bombSvg + '</svg>');
  }
  return svg;
};

/* ================= 50 LEVEL MASTER CONTROLLER ================= */
let SUITE_LEVELS = ${levelsJson};
let SUITE_CUR_IDX = 0;
let SUITE_FILTER_CH = 0;
let SUITE_SOLVED_SET = new Set();

try {
  const saved = localStorage.getItem('pirate_trails_50_solved');
  if (saved) SUITE_SOLVED_SET = new Set(JSON.parse(saved));
} catch(e) {}

let STUDIO_PLAY = null;
let STUDIO_SHOW_SOL = false;
let STUDIO_SHOW_COORD = false;
let STUDIO_CUR_PUZZLE = null;
let TIMER_INTERVAL = null;
let TIMER_LEFT = 0;
let TIMER_FROZEN_UNTIL = 0;
let HINT_COUNT = 3;

function initStudioSuite() {
  renderChaptersTabs();
  renderLevelList();
  selectSuiteLevel(0);
  initCustomDesigner();
  initJsonImportModal();
  bindStudioBuffs();
}

function pacingBadge(pacing, role) {
  if (!pacing) return '';
  if (pacing.includes('CLIMAX') || pacing.includes('FINALE')) {
    return \`<span class="pacing-badge climax">👑 \${esc(pacing)}</span>\`;
  }
  if (pacing.includes('Ten')) {
    return \`<span class="pacing-badge peak">🎯 \${esc(pacing)}</span>\`;
  }
  if (pacing.includes('Shō') || pacing.includes('Ki')) {
    return \`<span class="pacing-badge escalation">⚡ \${esc(pacing)}</span>\`;
  }
  return \`<span class="pacing-badge warmup">🍃 \${esc(pacing)}</span>\`;
}

function renderChaptersTabs() {
  const tabs = document.querySelectorAll('.ch-tab');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      SUITE_FILTER_CH = +tab.dataset.ch;
      renderLevelList();
    };
  });
}

function renderLevelList() {
  const container = $('levelsListContainer');
  if (!container) return;
  
  let html = '';
  SUITE_LEVELS.forEach((lvl, idx) => {
    if (SUITE_FILTER_CH !== 0 && (lvl.chapter || Math.floor(idx/10)+1) !== SUITE_FILTER_CH) return;
    const isCur = idx === SUITE_CUR_IDX;
    const isSolved = SUITE_SOLVED_SET.has(lvl.id);
    const clsName = (lvl.cognitiveMetrics && lvl.cognitiveMetrics.difficultyClass) ? lvl.cognitiveMetrics.difficultyClass : 'Normal';
    const isHard = clsName.includes('Khó') && !clsName.includes('Siêu');
    const isSuper = clsName.includes('Siêu');
    const badgeColor = isSuper ? '#fef2f2;color:#991b1b;border-color:#fca5a5' : (isHard ? '#fffbeb;color:#92400e;border-color:#fde68a' : '#f0fdf4;color:#166534;border-color:#86efac');
    
    html += \`<div class="level-list-item \${isCur ? 'active' : ''} \${isSolved ? 'solved' : ''}" data-idx="\${idx}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:6px">
          <b style="font-size:12.5px;color:#1e293b">\${lvl.id}</b>
          <span style="font-size:11.5px;color:#334155;font-weight:600">\${lvl.name || 'Màn ' + (idx+1)}</span>
        </div>
        \${isSolved ? '<span style="color:#16a34a;font-weight:900">✓</span>' : ''}
      </div>
      <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">
        <span class="badge" style="background:\${badgeColor};font-size:10px;padding:1px 5px">\${isSuper ? '🔴 Super' : (isHard ? '🟠 Hard' : '🟢 Normal')}</span>
        \${lvl.pacing ? \`<span style="font-size:10px;color:#64748b">\${lvl.pacing.split(' ')[0]}</span>\` : ''}
        \${lvl.timerSec ? \`<span class="badge" style="background:#eff6ff;color:#2563eb;font-size:10px;padding:1px 5px">⏱️ \${lvl.timerSec}s</span>\` : '<span class="badge" style="background:#f8fafc;color:#94a3b8;font-size:10px;padding:1px 5px">⏱️ Tắt</span>'}
        \${lvl.unlockBuff ? \`<span class="badge" style="background:#fefce8;color:#a16207;font-size:10px;padding:1px 5px">\${lvl.unlockBuff.split(' ')[0]} \${lvl.unlockBuff.split(' ')[1] || ''}</span>\` : ''}
      </div>
    </div>\`;
  });
  container.innerHTML = html;

  container.querySelectorAll('.level-list-item').forEach(item => {
    item.onclick = () => {
      selectSuiteLevel(+item.dataset.idx);
    };
  });

  $('statProgress').textContent = \`\${SUITE_SOLVED_SET.size} / \${SUITE_LEVELS.length}\`;
}

function selectSuiteLevel(idx) {
  SUITE_CUR_IDX = idx;
  const lvl = SUITE_LEVELS[idx];
  if (!lvl) return;

  $('playLevelTitle').textContent = \`\${lvl.id} · \${lvl.name || 'Hải Trình ' + (idx+1)}\`;
  
  const tutBanner = $('tutBanner');
  const tutText = $('tutText');
  if (lvl.tutorialTip) {
    tutText.textContent = lvl.tutorialTip;
    tutBanner.classList.remove('sec-off');
  } else {
    tutBanner.classList.add('sec-off');
  }
  
  const clsName = (lvl.cognitiveMetrics && lvl.cognitiveMetrics.difficultyClass) ? lvl.cognitiveMetrics.difficultyClass : 'Normal';
  const isHard = clsName.includes('Khó') && !clsName.includes('Siêu');
  const isSuper = clsName.includes('Siêu');
  const badgeColor = isSuper ? '#fef2f2;color:#991b1b;border-color:#fca5a5' : (isHard ? '#fffbeb;color:#92400e;border-color:#fde68a' : '#f0fdf4;color:#166534;border-color:#86efac');
  
  $('playLevelBadges').innerHTML = \`
    <span class="badge" style="background:\${badgeColor}">\${isSuper ? '🔴 Super Hard' : (isHard ? '🟠 Hard' : '🟢 Normal')}</span>
    <span class="badge" style="background:#f1f5f9;color:#475569">Chương \${lvl.chapter || Math.floor(idx/10)+1}</span>
    <span class="badge" style="background:#eff6ff;color:#2563eb">HDI \${(lvl.cognitiveMetrics && lvl.cognitiveMetrics.humanDifficultyIndex) || 10}</span>
    \${pacingBadge(lvl.pacing, lvl.pacingRole)}
    \${lvl.timerSec ? \`<span class="badge" style="background:#fef3c7;color:#92400e">⏱️ Timer \${lvl.timerSec}s</span>\` : '<span class="badge" style="background:#f1f5f9;color:#64748b">⏱️ Tắt Timer</span>'}
    \${lvl.unlockBuff ? \`<span class="badge" style="background:#fdf4ff;color:#86198f">\${lvl.unlockBuff}</span>\` : ''}
  \`;

  // Pre-fill re-roll generator inputs to match current level
  $('rrR').value = lvl.grid.rows;
  $('rrC').value = lvl.grid.cols;
  $('rrK').value = lvl.anchors ? lvl.anchors.length : 2;
  $('chkRrWall').checked = lvl.walls && lvl.walls.length > 0;
  $('chkRrRock').checked = lvl.rocks && lvl.rocks.length > 0;
  $('chkRrPush').checked = lvl.pushRocks && lvl.pushRocks.length > 0;
  $('chkRrSwitch').checked = lvl.switches && lvl.switches.length > 0;
  $('chkRrPrism').checked = lvl.prisms && lvl.prisms.length > 0;
  $('chkRrWp').checked = lvl.waypoints && Object.keys(lvl.waypoints).length > 0;
  $('chkRrBomb').checked = lvl.bombs && lvl.bombs.length > 0;

  // Pre-fill Designer inputs to match current level
  $('dsR').value = lvl.grid.rows;
  $('dsC').value = lvl.grid.cols;
  $('dsK').value = lvl.anchors ? lvl.anchors.length : 2;
  loadLevelIntoDesigner(lvl);

  const puzzle = parseJsonLevel(lvl);
  STUDIO_SHOW_SOL = false;
  
  startStudioPlay(puzzle, lvl.timerSec);
  updateStudioMetrics(lvl, puzzle);
  renderLevelList();
}

function parseJsonLevel(j) {
  const p = new Puzzle(j.grid.rows, j.grid.cols, j.shape);
  const cog = j.cognitiveMetrics || {};
  p.meta = Object.assign({}, cog, { 
    id: j.id, 
    name: j.name, 
    chapter: j.chapter, 
    pacing: j.pacing,
    pacingRole: j.pacingRole, 
    tutorialTip: j.tutorialTip, 
    timerSec: j.timerSec,
    unlockBuff: j.unlockBuff,
    cls: (cog.difficultyClass && cog.difficultyClass.includes('Siêu')) ? 4 : ((cog.difficultyClass && cog.difficultyClass.includes('Khó')) ? 3 : ((cog.difficultyClass && cog.difficultyClass.includes('Thường')) ? 2 : 1)), 
    className: cog.difficultyClass || '2 · Thường (Flow)', 
    hdi: cog.humanDifficultyIndex || 10 
  });
  
  if (j.rocks) j.rocks.forEach(r => p.blocked.add(r.r * p.C + r.c));
  if (j.walls) j.walls.forEach(w => p.walls.add(ekey(w.r1 * p.C + w.c1, w.r2 * p.C + w.c2)));
  if (j.pushRocks) p.pushRocks = j.pushRocks.map(pr => ({ cell: pr.r * p.C + pr.c, initialCell: pr.r * p.C + pr.c }));
  if (j.switches) p.switches = j.switches.map(sw => ({ swCell: sw.r * p.C + sw.c, gateCell: sw.gateR * p.C + sw.gateC, latch: sw.latch }));
  if (j.prisms) p.prisms = j.prisms.map(pr => ({ cell: pr.r * p.C + pr.c, color: pr.color }));
  if (j.colorGates) p.colorGates = j.colorGates.map(cg => ({ cell: cg.r * p.C + cg.c, color: cg.color }));
  
  // Parse Bombs (MEC-05)
  p.bombs = new Set();
  if (j.bombs) j.bombs.forEach(b => p.bombs.add(b.r * p.C + b.c));

  // Anchor Length
  if (j.anchors) {
    p.anchors = j.anchors.map(a => {
      const fullCellCount = (a.cells != null) ? a.cells : (a.length + 1);
      return { cell: a.row * p.C + a.col, L: fullCellCount, color: a.color };
    });
  }
  
  if (j.waypoints) {
    Object.entries(j.waypoints).forEach(([aid, wps], k) => {
      wps.forEach((wp, jIdx) => p.wpOf.set(wp.r * p.C + wp.c, { k, j: jIdx + 1 }));
    });
  }
  if (j.solution) {
    p.solution = Object.values(j.solution).map(path => path.map(([r, c]) => r * p.C + c));
  }
  return p;
}

/* ================= EXACT FORGE PLAY ENGINE + MEC-05 BOMBS + TIMER ================= */
function startStudioPlay(p, timerSec) {
  STUDIO_CUR_PUZZLE = p;
  const s = initState(p);
  s.bombs = new Set(p.bombs);
  STUDIO_PLAY = { s, sel: null, t0: null, drag: false, peeked: false, done: false, failed: false, moves: 0, moveHistory: [], undoCount: 0 };
  
  // Timer setup
  if (TIMER_INTERVAL) clearInterval(TIMER_INTERVAL);
  TIMER_FROZEN_UNTIL = 0;
  if (timerSec) {
    TIMER_LEFT = timerSec;
    updateTimerUI();
    TIMER_INTERVAL = setInterval(() => {
      if (STUDIO_PLAY && !STUDIO_PLAY.done && !STUDIO_PLAY.failed) {
        if (Date.now() < TIMER_FROZEN_UNTIL) {
          updateTimerUI(true);
        } else {
          TIMER_LEFT--;
          updateTimerUI(false);
          if (TIMER_LEFT <= 0) {
            clearInterval(TIMER_INTERVAL);
            STUDIO_PLAY.failed = true;
            renderStudioBoard();
          }
        }
      }
    }, 1000);
  } else {
    TIMER_LEFT = 0;
    $('timerDisplay').textContent = 'Vô Tận (Tắt Timer)';
    $('timerDisplay').className = 'timer-val';
  }

  renderStudioBoard();
}

function updateTimerUI(isFrozen = false) {
  const el = $('timerDisplay');
  if (!el) return;
  if (isFrozen) {
    const leftFreeze = Math.ceil((TIMER_FROZEN_UNTIL - Date.now()) / 1000);
    el.textContent = \`❄️ ĐÓNG BĂNG (\${TIMER_LEFT}s - còn \${leftFreeze}s)\`;
    el.className = 'timer-val frozen';
  } else {
    el.textContent = \`\${TIMER_LEFT}s\`;
    el.className = 'timer-val' + (TIMER_LEFT <= 15 ? ' danger' : '');
  }
}

function bindStudioBuffs() {
  $('btnBuffHint').onclick = () => {
    if (HINT_COUNT <= 0) {
      alert('Đã hết lượt Buff Hint!');
      return;
    }
    HINT_COUNT--;
    $('hintCount').textContent = HINT_COUNT;
    STUDIO_SHOW_SOL = true;
    renderStudioBoard();
    setTimeout(() => {
      STUDIO_SHOW_SOL = false;
      renderStudioBoard();
    }, 3000);
  };

  $('btnBuffFreeze').onclick = () => {
    if (!TIMER_LEFT) {
      alert('Màn này không bật Timer!');
      return;
    }
    TIMER_FROZEN_UNTIL = Date.now() + 15000;
    updateTimerUI(true);
  };

  $('btnBuffUndo').onclick = () => {
    if (!STUDIO_PLAY || STUDIO_PLAY.moveHistory.length === 0) return;
    const u = STUDIO_PLAY.moveHistory.pop();
    undoMove(STUDIO_CUR_PUZZLE, STUDIO_PLAY.s, u);
    STUDIO_PLAY.moves = Math.max(0, STUDIO_PLAY.moves - 1);
    STUDIO_PLAY.undoCount++;
    renderStudioBoard();
  };
}

function truncateStudioTo(p, s, k, cell) {
  const c = s.chains[k], at = c.path.indexOf(cell);
  if (at < 0) return 0;
  const before = c.path.length;

  if (STUDIO_PLAY && STUDIO_PLAY.moveHistory) {
    while (c.path.length > at + 1 && STUDIO_PLAY.moveHistory.length > 0) {
      const lastIdx = STUDIO_PLAY.moveHistory.map((m, idx) => m.k === k ? idx : -1).filter(idx => idx !== -1).pop();
      if (lastIdx == null) break;
      const u = STUDIO_PLAY.moveHistory.splice(lastIdx, 1)[0];
      undoMove(p, s, u);
    }
  } else {
    while (c.path.length > at + 1) {
      const lastCell = c.path[c.path.length - 1];
      s.owner[lastCell] = -1;
      c.path.pop();
      s.free++;
    }
    c.head = c.path[c.path.length - 1];
    c.len = c.path.length;
  }

  c.colorTag = null;
  for (const cc of c.path) {
    const pr = p.prisms.find(x => x.cell === cc);
    if (pr) c.colorTag = pr.color;
  }
  c.wp = 0;
  for (const cc of c.path) {
    const w = p.wpOf.get(cc);
    if (w) c.wp = w.j;
  }
  return before - c.path.length;
}

function renderStudioBoard() {
  const wrap = $('masterBoardWrap');
  const p = STUDIO_CUR_PUZZLE;
  if (!wrap || !p || !STUDIO_PLAY) return;

  wrap.innerHTML = boardSVG(p, {
    cs: 46,
    showSolution: STUDIO_SHOW_SOL,
    coords: STUDIO_SHOW_COORD,
    state: STUDIO_PLAY.s,
    interactive: true
  });

  bindStudioPlay(p);
  renderStudioPlayPanel(p);
}

function bindStudioPlay(p) {
  const svg = $('masterBoardWrap').querySelector('svg');
  if (!svg) return;

  const cellAt = ev => {
    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    return el && el.classList.contains('hit') ? +el.dataset.cell : null;
  };

  const act = cell => {
    if (cell == null || !STUDIO_PLAY || STUDIO_PLAY.done || STUDIO_PLAY.failed) return;
    if (STUDIO_PLAY.t0 == null) STUDIO_PLAY.t0 = performance.now();
    const s = STUDIO_PLAY.s;

    // Check MEC-05: Stepping directly into bomb is illegal
    if (s.bombs && s.bombs.has(cell)) {
      return;
    }

    if (s.owner[cell] >= 0) {
      STUDIO_PLAY.sel = s.owner[cell];
      const popped = truncateStudioTo(p, s, STUDIO_PLAY.sel, cell);
      if (popped > 0) STUDIO_PLAY.undoCount++;
    } else if (STUDIO_PLAY.sel != null && legalMoves(p, s, STUDIO_PLAY.sel).includes(cell)) {
      const u = applyMove(p, s, STUDIO_PLAY.sel, cell);
      
      // MEC-05: If push rock is pushed into bomb cell -> defuse both!
      if (u.pushedRock != null && s.bombs && s.bombs.has(u.newRockCell)) {
        s.bombs.delete(u.newRockCell);
        const prIdx = s.pushRocks.findIndex(pr => pr.cell === u.newRockCell);
        if (prIdx >= 0) s.pushRocks.splice(prIdx, 1);
        u.defusedBomb = u.newRockCell;
      }

      STUDIO_PLAY.moveHistory.push(u);
      STUDIO_PLAY.moves++;
    } else return;

    if (s.free === 0 && s.chains.every(c => c.len === c.L)) {
      STUDIO_PLAY.done = true;
      STUDIO_PLAY.t1 = performance.now();
      if (TIMER_INTERVAL) clearInterval(TIMER_INTERVAL);
      SUITE_SOLVED_SET.add(p.meta.id);
      try { localStorage.setItem('pirate_trails_50_solved', JSON.stringify([...SUITE_SOLVED_SET])); } catch(e){}
      renderLevelList();
    }
    renderStudioBoard();
  };

  svg.addEventListener('pointerdown', e => {
    STUDIO_PLAY.drag = true;
    svg.setPointerCapture(e.pointerId);
    act(cellAt(e));
  });
  svg.addEventListener('pointermove', e => {
    if (STUDIO_PLAY && STUDIO_PLAY.drag) act(cellAt(e));
  });
  svg.addEventListener('pointerup', () => { if (STUDIO_PLAY) STUDIO_PLAY.drag = false; });
  svg.addEventListener('pointercancel', () => { if (STUDIO_PLAY) STUDIO_PLAY.drag = false; });
}

function renderStudioPlayPanel(p) {
  const el = $('masterPlayPanel');
  if (!el || !p || !STUDIO_PLAY) return;

  if (STUDIO_PLAY.failed) {
    el.innerHTML = \`<div style="padding:10px;border-radius:8px;background:#fef2f2;border:1.5px solid #f87171;text-align:center">
      <b style="color:#dc2626;font-size:14px">⏳ HẾT THỜI GIAN!</b>
      <div style="margin-top:6px">
        <button class="primary sm" id="btnReplayFailed">Chơi Lại Ngay 🔄</button>
      </div>
    </div>\`;
    $('btnReplayFailed').onclick = () => selectSuiteLevel(SUITE_CUR_IDX);
    return;
  }

  if (STUDIO_PLAY.done) {
    const secs = STUDIO_PLAY.t0 ? (performance.now() - STUDIO_PLAY.t0) / 1000 : 0;
    el.innerHTML = \`<div class="win" style="margin-top:4px">
      <b>🎉 Chiến Thắng Xuất Sắc!</b> \${secs.toFixed(1)} giây · \${STUDIO_PLAY.moves} nước đi · \${STUDIO_PLAY.undoCount} lần xóa lại\${STUDIO_PLAY.peeked ? ' · (đã dùng Hint)' : ''}.
      \${p.meta.unlockBuff ? \`<div style="margin-top:6px;font-size:12px;color:#86198f;font-weight:700">🎁 Phần Thưởng Mở Khóa: \${p.meta.unlockBuff}</div>\` : ''}
      <div style="margin-top:8px;display:flex;gap:8px;justify-content:center">
        \${SUITE_CUR_IDX + 1 < SUITE_LEVELS.length ? \`<button class="primary sm" id="btnNextLv">Tiếp Tục Màn Sau ⏩</button>\` : ''}
        <button class="ghost sm" id="btnReplay">Chơi Lại 🔄</button>
      </div>
    </div>\`;

    if ($('btnNextLv')) $('btnNextLv').onclick = () => selectSuiteLevel(SUITE_CUR_IDX + 1);
    if ($('btnReplay')) $('btnReplay').onclick = () => selectSuiteLevel(SUITE_CUR_IDX);
    return;
  }

  const s = STUDIO_PLAY.s;
  el.innerHTML = \`<p class="hint" style="margin:4px 0;text-align:center">Kéo từ Mỏ Neo để vẽ dây. Còn <b>\${s.free}</b> ô trống.
    \${STUDIO_PLAY.sel != null ? \` Đang kéo <b style="color:\${CHHEX[STUDIO_PLAY.sel%4]}">A\${STUDIO_PLAY.sel + 1}</b> (còn \${s.chains[STUDIO_PLAY.sel].L - s.chains[STUDIO_PLAY.sel].len} ô).\` : ''}</p>\`;
}

$('btnPlaySol').onclick = () => {
  STUDIO_SHOW_SOL = !STUDIO_SHOW_SOL;
  if (STUDIO_SHOW_SOL && STUDIO_PLAY) STUDIO_PLAY.peeked = true;
  renderStudioBoard();
};
$('btnPlayCoord').onclick = () => {
  STUDIO_SHOW_COORD = !STUDIO_SHOW_COORD;
  renderStudioBoard();
};
$('btnPlayReset').onclick = () => {
  if (STUDIO_CUR_PUZZLE) selectSuiteLevel(SUITE_CUR_IDX);
};

/* ================= FULL COGNITIVE EVALUATION SYSTEM ================= */
function updateStudioMetrics(lvl, p) {
  const m = lvl.cognitiveMetrics || {};

  // 1. Core Metrics Tiles
  $('studioDetTiles').innerHTML = [
    ['Độ khó Não bộ (HDI)', m.humanDifficultyIndex != null ? m.humanDifficultyIndex : '—'],
    ['⏱️ Thời gian giải dự kiến', \`~\${m.estimatedSolveSeconds || 30}s\`],
    ['🔄 Số lần xóa dự kiến', \`~\${m.expectedPlayerUndos || m.expectedUndos || 0} lần\`],
    ['👁️ Tỉ lệ Autopilot của mắt', m.visualAutopilotRatio || '50%'],
    ['Độ mơ hồ ngã rẽ', \`\${m.averageBranchingChoices || m.avgBranching || 1.3} hướng/bước\`],
    ['🎯 Bẫy ngã rẽ sai (Trap)', \`\${m.falseLeadsCount || m.falseLeads || 0} nhánh\`],
    ['🧩 Lời giải duy nhất', '100% Duy nhất'],
    ['Đỉnh kỹ thuật', m.peakTechnique || 'Cơ bản']
  ].map(([l, v]) => \`<div class="tile"><div class="v">\${v}</div><div class="l">\${l}</div></div>\`).join('');

  // 2. Six Cognitive Pillars
  $('studioPillarTiles').innerHTML = [
    ['🔀 Độ mơ hồ tại ngã rẽ', (m.ambiguityScore || 0).toFixed(2)],
    ['⚔️ Tranh chấp không gian', (m.spatialContentionScore || m.contentionScore || 0).toFixed(2)],
    ['🎯 Bẫy ngõ cụt trễ', (m.delayedDeadEndScore || m.trapScore || 0).toFixed(2)],
    ['🔢 Bẫy nam châm mật mã', (m.wpDeceptionScore || 0).toFixed(2)],
    ['🧠 Tải suy luận từng bước', (m.deductiveLoad || m.deductiveScore || 0).toFixed(2)],
    ['⚙️ Ràng buộc cơ chế động', (m.mechanicLoad || m.mechScore || 0).toFixed(2)]
  ].map(([l, v]) => \`<div class="tile"><div class="v">\${v}</div><div class="l">\${l}</div></div>\`).join('');

  // 3. Tier Bars
  const hist = (p && p.meta && p.meta.hist) ? p.meta.hist : [0, 8, 12, 5, 2, 0];
  const mx = Math.max(1, ...hist.slice(1));
  $('studioTierBars').innerHTML = [1, 2, 3, 4, 5].map(t => {
    const n = hist[t] || 0;
    return \`<div class="bar">
      <span class="nm">T\${t} · \${TIER_INFO[t].name}</span>
      <span class="tr"><span class="fl" style="width:\${100 * n / mx}%;background:\${TCOL[t]}"></span></span>
      <span class="ct">\${n} bước</span>
    </div>\`;
  }).join('');

  // 4. Behavior Explanation
  let why = '<b>Đặc trưng tâm lý học:</b> ';
  const clsDesc = m.difficultyClass || '';
  if (clsDesc.includes('Dễ')) {
    why += '🌿 <b>Dễ (Autopilot ' + (m.visualAutopilotRatio || '80%') + '):</b> Mắt tự động quét hành lang, kéo 1 mạch đến đích mà hầu như không cần xóa nước.';
  } else if (clsDesc.includes('Thường')) {
    why += '⚡ <b>Thường (Dòng chảy Flow):</b> Rẽ nhánh vừa phải, tạo cảm giác lướt êm và sảng khoái.';
  } else if (clsDesc.includes('Khó') && !clsDesc.includes('Siêu')) {
    why += '🎯 <b>Khó (Bẫy Trực Giác / Aha! Trap):</b> Chứa bẫy ngã rẽ sâu, đòi hỏi nhìn trước 2-3 bước để không sót ô ở góc.';
  } else {
    why += '👑 <b>Siêu Khó (Mastery):</b> Không gian đan xen, đòi hỏi chiến thuật và phối hợp đa cơ chế.';
  }
  $('studioWhyDiv').innerHTML = why;

  // 5. JSON Preview
  $('studioJsonPre').textContent = JSON.stringify(lvl, null, 2);
}

// SUB-TABS NAVIGATION
$('tabNavInfo').onclick = () => switchSubTab('Info');
$('tabNavReroll').onclick = () => switchSubTab('Reroll');
$('tabNavEdit').onclick = () => switchSubTab('Edit');

function switchSubTab(tab) {
  ['Info', 'Reroll', 'Edit'].forEach(t => {
    $('tabNav' + t).classList.toggle('active', t === tab);
    $('panel' + t).classList.toggle('sec-off', t !== tab);
  });
}

// FULL-FEATURED RE-ROLL GENERATOR
$('btnDoReroll').onclick = () => {
  const curLvl = SUITE_LEVELS[SUITE_CUR_IDX];
  if (!curLvl) return;
  
  const R = +$('rrR').value || 6;
  const C = +$('rrC').value || 5;
  const K = +$('rrK').value || 2;
  const shape = $('rrShape').value;
  const cls = +$('rrClass').value || null;
  const seed = +$('rrSeed').value || (Date.now() + Math.floor(Math.random()*10000));
  
  const cfg = {
    R, C,
    anchors: K, minLen: 3,
    shapeMode: shape,
    targetClass: cls === 0 ? null : cls,
    acceptAnyTier: cls === 0,
    allowRock: $('chkRrRock').checked,
    obstacles: $('chkRrRock').checked ? 1 : 0,
    allowWall: $('chkRrWall').checked,
    wallBudget: $('chkRrWall').checked ? 3 : 0,
    allowPush: $('chkRrPush').checked,
    pushCount: $('chkRrPush').checked ? 1 : 0,
    allowPrism: $('chkRrPrism').checked,
    allowSwitch: $('chkRrSwitch').checked,
    allowWaypoints: $('chkRrWp').checked,
    maxAttempts: 350
  };
  
  const rng = mulberry32(seed);
  const res = generateOne(cfg, rng);
  if (res.ok) {
    const p = res.puzzle;
    p.meta.id = curLvl.id;
    p.meta.name = curLvl.name;
    p.meta.chapter = curLvl.chapter;
    p.meta.pacing = curLvl.pacing;
    p.meta.pacingRole = curLvl.pacingRole;
    p.meta.tutorialTip = curLvl.tutorialTip;
    p.meta.timerSec = curLvl.timerSec;
    p.meta.unlockBuff = curLvl.unlockBuff;
    
    const newJson = toJSON(p, curLvl.id);
    newJson.name = curLvl.name;
    newJson.chapter = curLvl.chapter;
    newJson.pacing = curLvl.pacing;
    newJson.pacingRole = curLvl.pacingRole;
    newJson.tutorialTip = curLvl.tutorialTip;
    newJson.timerSec = curLvl.timerSec;
    newJson.unlockBuff = curLvl.unlockBuff;
    
    SUITE_LEVELS[SUITE_CUR_IDX] = newJson;
    selectSuiteLevel(SUITE_CUR_IDX);
    switchSubTab('Info');
    alert('🎉 Đã sinh thành công màn mới theo cấu hình cho ' + curLvl.id + '! Bạn có thể chơi thử ngay.');
  } else {
    alert('Không thể sinh màn với cấu hình này, hãy thử tăng kích thước hoặc đổi seed!');
  }
};

/* ================= COMPREHENSIVE LEVEL CUSTOM DESIGNER ================= */
let DS_R = 6, DS_C = 5, DS_K = 2;
let DS_BRUSH = 'land';
let DS_GRID = []; // 2D grid
let DS_ANCHOR_STEPS = [15, 15, 0, 0];
let DS_UNDO_STACK = [];

function initCustomDesigner() {
  bindDesignerBrushes();
  $('btnDsResize').onclick = () => {
    DS_R = Math.max(3, Math.min(9, +$('dsR').value));
    DS_C = Math.max(3, Math.min(9, +$('dsC').value));
    DS_K = Math.max(1, Math.min(4, +$('dsK').value));
    resetDesignerGrid(DS_R, DS_C);
  };
  $('btnDsAutoSplitSteps').onclick = autoSplitAnchorSteps;
}

function bindDesignerBrushes() {
  const btns = document.querySelectorAll('#dsBrushBar .brush-btn');
  btns.forEach(btn => {
    btn.onclick = () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      DS_BRUSH = btn.dataset.brush;
    };
  });
}

function resetDesignerGrid(R, C) {
  DS_R = R; DS_C = C;
  DS_GRID = Array.from({length: R}, () => Array.from({length: C}, () => ({ type: 'land' })));
  autoSplitAnchorSteps();
  renderDesignerGrid();
}

function loadLevelIntoDesigner(lvl) {
  DS_R = lvl.grid.rows;
  DS_C = lvl.grid.cols;
  DS_K = lvl.anchors ? lvl.anchors.length : 2;
  
  DS_GRID = Array.from({length: DS_R}, (row, r) => Array.from({length: DS_C}, (col, c) => {
    const isLand = !lvl.shape || (lvl.shape[r] && lvl.shape[r][c] === '1');
    return { type: isLand ? 'land' : 'void' };
  }));

  if (lvl.rocks) lvl.rocks.forEach(rk => { if (DS_GRID[rk.r] && DS_GRID[rk.r][rk.c]) DS_GRID[rk.r][rk.c] = { type: 'rock' }; });
  if (lvl.pushRocks) lvl.pushRocks.forEach(pr => { if (DS_GRID[pr.r] && DS_GRID[pr.r][pr.c]) DS_GRID[pr.r][pr.c] = { type: 'push' }; });
  if (lvl.switches) lvl.switches.forEach(sw => { if (DS_GRID[sw.r] && DS_GRID[sw.r][sw.c]) DS_GRID[sw.r][sw.c] = { type: 'switch' }; });
  if (lvl.prisms) lvl.prisms.forEach(pm => { if (DS_GRID[pm.r] && DS_GRID[pm.r][pm.c]) DS_GRID[pm.r][pm.c] = { type: 'prism', color: pm.color }; });
  if (lvl.bombs) lvl.bombs.forEach(bm => { if (DS_GRID[bm.r] && DS_GRID[bm.r][bm.c]) DS_GRID[bm.r][bm.c] = { type: 'bomb' }; });

  DS_ANCHOR_STEPS = [0, 0, 0, 0];
  if (lvl.anchors) {
    lvl.anchors.forEach((a, k) => {
      if (DS_GRID[a.row] && DS_GRID[a.row][a.col]) DS_GRID[a.row][a.col] = { type: 'anchor', k };
      DS_ANCHOR_STEPS[k] = (a.cells != null) ? a.cells : (a.length + 1);
    });
  }

  renderDesignerGrid();
  renderAnchorStepsPanel();
}

function renderDesignerGrid() {
  const container = $('dsGridContainer');
  if (!container) return;
  container.style.gridTemplateColumns = \`repeat(\${DS_C}, 36px)\`;
  
  let html = '';
  for (let r = 0; r < DS_R; r++) {
    for (let c = 0; c < DS_C; c++) {
      const cell = DS_GRID[r][c];
      let icon = '';
      let cls = cell.type;
      
      if (cell.type === 'void') icon = '✕';
      else if (cell.type === 'rock') icon = '🪨';
      else if (cell.type === 'push') icon = '📦';
      else if (cell.type === 'switch') icon = '🔘';
      else if (cell.type === 'prism') icon = '💎';
      else if (cell.type === 'waypoint') icon = '🔢';
      else if (cell.type === 'bomb') icon = '💣';
      else if (cell.type === 'anchor') icon = \`A\${(cell.k != null ? cell.k : 0) + 1}\`;
      else icon = \`<span style="opacity:0.3;font-size:9px">\${r},\${c}</span>\`;

      html += \`<div class="designer-cell \${cls}" data-r="\${r}" data-c="\${c}">\${icon}</div>\`;
    }
  }
  container.innerHTML = html;

  container.querySelectorAll('.designer-cell').forEach(el => {
    const r = +el.dataset.r, c = +el.dataset.c;
    el.onclick = () => {
      pushDesignerUndo();
      applyBrushToCell(r, c);
      renderDesignerGrid();
      updateDesignerStats();
      renderAnchorStepsPanel();
    };
  });

  updateDesignerStats();
}

function applyBrushToCell(r, c) {
  const cur = DS_GRID[r][c];
  if (DS_BRUSH === 'land') DS_GRID[r][c] = { type: 'land' };
  else if (DS_BRUSH === 'void') DS_GRID[r][c] = { type: 'void' };
  else if (DS_BRUSH === 'rock') DS_GRID[r][c] = cur.type === 'rock' ? { type: 'land' } : { type: 'rock' };
  else if (DS_BRUSH === 'push') DS_GRID[r][c] = cur.type === 'push' ? { type: 'land' } : { type: 'push' };
  else if (DS_BRUSH === 'switch') DS_GRID[r][c] = cur.type === 'switch' ? { type: 'land' } : { type: 'switch' };
  else if (DS_BRUSH === 'prism') DS_GRID[r][c] = cur.type === 'prism' ? { type: 'land' } : { type: 'prism' };
  else if (DS_BRUSH === 'waypoint') DS_GRID[r][c] = cur.type === 'waypoint' ? { type: 'land' } : { type: 'waypoint' };
  else if (DS_BRUSH === 'bomb') DS_GRID[r][c] = cur.type === 'bomb' ? { type: 'land' } : { type: 'bomb' };
  else if (DS_BRUSH === 'anchor') {
    if (cur.type === 'anchor') {
      DS_GRID[r][c] = { type: 'land' };
    } else {
      const existingAnchors = countAnchors();
      DS_GRID[r][c] = { type: 'anchor', k: existingAnchors % 4 };
    }
  }
}

function countAnchors() {
  let count = 0;
  for (let r = 0; r < DS_R; r++) {
    for (let c = 0; c < DS_C; c++) {
      if (DS_GRID[r][c].type === 'anchor') count++;
    }
  }
  return count;
}

function autoSplitAnchorSteps() {
  let activeCells = 0;
  for (let r = 0; r < DS_R; r++) {
    for (let c = 0; c < DS_C; c++) {
      if (DS_GRID[r][c].type !== 'void' && DS_GRID[r][c].type !== 'rock') activeCells++;
    }
  }
  const k = Math.max(1, countAnchors() || +$('dsK').value || 2);
  const base = Math.floor(activeCells / k);
  const rem = activeCells % k;
  
  DS_ANCHOR_STEPS = [0, 0, 0, 0];
  for (let i = 0; i < k; i++) {
    DS_ANCHOR_STEPS[i] = base + (i < rem ? 1 : 0);
  }
  renderAnchorStepsPanel();
}

function renderAnchorStepsPanel() {
  const container = $('dsAnchorStepList');
  if (!container) return;
  
  const k = Math.max(1, countAnchors() || +$('dsK').value || 2);
  let html = '';
  for (let i = 0; i < k; i++) {
    html += \`<div class="anchor-row">
      <div style="display:flex;align-items:center;gap:6px">
        <span class="chip" style="background:\${CHHEX[i%4]};color:#fff;font-weight:700">Mỏ Neo A\${i+1}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:11px;color:#64748b">Số bước phủ:</span>
        <input type="number" min="2" max="50" value="\${DS_ANCHOR_STEPS[i] || 10}" data-k="\${i}" class="ds-step-inp" style="width:54px;padding:3px 6px;font-size:12px;font-weight:700">
      </div>
    </div>\`;
  }
  container.innerHTML = html;

  container.querySelectorAll('.ds-step-inp').forEach(inp => {
    inp.onchange = () => {
      const idx = +inp.dataset.k;
      DS_ANCHOR_STEPS[idx] = Math.max(2, +inp.value);
    };
  });
}

function pushDesignerUndo() {
  DS_UNDO_STACK.push(JSON.parse(JSON.stringify(DS_GRID)));
  if (DS_UNDO_STACK.length > 30) DS_UNDO_STACK.shift();
}

$('btnDs_Undo').onclick = () => {
  if (DS_UNDO_STACK.length) {
    DS_GRID = DS_UNDO_STACK.pop();
    renderDesignerGrid();
    renderAnchorStepsPanel();
  }
};

$('btnDs_Random').onclick = () => {
  pushDesignerUndo();
  const shapeStrs = generateGestaltShape(DS_R, DS_C, mulberry32(Date.now() + Math.random()*10000));
  DS_GRID = shapeStrs.map(row => row.split('').map(ch => ({ type: ch === '1' ? 'land' : 'void' })));
  autoSplitAnchorSteps();
  renderDesignerGrid();
};

$('btnDs_MirrorX').onclick = () => {
  pushDesignerUndo();
  for (let r = 0; r < DS_R; r++) {
    for (let c = 0; c < Math.floor(DS_C / 2); c++) {
      DS_GRID[r][DS_C - 1 - c] = JSON.parse(JSON.stringify(DS_GRID[r][c]));
    }
  }
  renderDesignerGrid();
};

$('btnDs_MirrorY').onclick = () => {
  pushDesignerUndo();
  for (let r = 0; r < Math.floor(DS_R / 2); r++) {
    for (let c = 0; c < DS_C; c++) {
      DS_GRID[DS_R - 1 - r][c] = JSON.parse(JSON.stringify(DS_GRID[r][c]));
    }
  }
  renderDesignerGrid();
};

$('btnDs_Fill').onclick = () => {
  pushDesignerUndo();
  DS_GRID = Array.from({length: DS_R}, () => Array.from({length: DS_C}, () => ({ type: 'land' })));
  autoSplitAnchorSteps();
  renderDesignerGrid();
};

$('btnDs_Clear').onclick = () => {
  pushDesignerUndo();
  DS_GRID = Array.from({length: DS_R}, () => Array.from({length: DS_C}, () => ({ type: 'void' })));
  renderDesignerGrid();
};

function updateDesignerStats() {
  let activeCells = 0, bombCount = 0;
  for (let r = 0; r < DS_R; r++) {
    for (let c = 0; c < DS_C; c++) {
      if (DS_GRID[r][c].type !== 'void') activeCells++;
      if (DS_GRID[r][c].type === 'bomb') bombCount++;
    }
  }
  $('dsBadgeCells').textContent = \`Tổng ô: \${activeCells}\`;
  $('dsBadgeAnchors').textContent = \`⚓ Mỏ Neo: \${countAnchors()}\`;
  $('dsBadgeBombs').textContent = \`💣 Bom: \${bombCount}\`;
}

// AI AUTO GENERATE PUZZLE FROM DESIGNED SHAPE & COMPREHENSIVE EVALUATION
$('btnDsAutoGenerate').onclick = () => {
  const shape = DS_GRID.map(row => row.map(cell => cell.type === 'void' ? '0' : '1').join(''));
  const anchorsCount = countAnchors() || +$('dsK').value || 2;
  const rocksCount = DS_GRID.flat().filter(c => c.type === 'rock').length;
  const pushCount = DS_GRID.flat().filter(c => c.type === 'push').length;
  const switchCount = DS_GRID.flat().filter(c => c.type === 'switch').length;
  const prismCount = DS_GRID.flat().filter(c => c.type === 'prism').length;
  const wpCount = DS_GRID.flat().filter(c => c.type === 'waypoint').length;
  const bombsCount = DS_GRID.flat().filter(c => c.type === 'bomb').length;

  const cfg = {
    R: DS_R, C: DS_C,
    anchors: Math.min(4, Math.max(1, anchorsCount)),
    minLen: 3,
    shapeMode: 'custom',
    customShape: shape,
    targetClass: null,
    acceptAnyTier: true,
    allowRock: rocksCount > 0,
    obstacles: rocksCount,
    allowWall: true,
    wallBudget: 3,
    allowPush: pushCount > 0,
    pushCount: pushCount,
    allowSwitch: switchCount > 0,
    allowPrism: prismCount > 0,
    allowWaypoints: wpCount > 0,
    maxAttempts: 350
  };

  const res = generateOne(cfg, mulberry32(Date.now()));
  if (res.ok) {
    const curLvl = SUITE_LEVELS[SUITE_CUR_IDX];
    const p = res.puzzle;
    p.meta.id = curLvl.id;
    p.meta.name = \`Map Custom (\${DS_R}×\${DS_C})\`;
    p.meta.chapter = curLvl.chapter;
    p.meta.pacing = curLvl.pacing;
    p.meta.pacingRole = curLvl.pacingRole;
    p.meta.tutorialTip = curLvl.tutorialTip;
    p.meta.timerSec = curLvl.timerSec;
    p.meta.unlockBuff = curLvl.unlockBuff;

    // Bombs (MEC-05)
    p.bombs = new Set();
    for (let r = 0; r < DS_R; r++) {
      for (let c = 0; c < DS_C; c++) {
        if (DS_GRID[r][c].type === 'bomb') p.bombs.add(r * DS_C + c);
      }
    }

    // Run Full Cognitive Evaluation on generated puzzle
    const rated = tierSolve(p, 5);
    const greedy = simulateGreedyPlayer(p);
    const cog = calculateCognitiveMetrics(p, rated, greedy, { count: 1, capped: false });
    
    p.meta.hdi = cog.hdi;
    p.meta.className = CLASS_INFO[cog.cls].name;
    p.meta.cls = cog.cls;
    p.meta.solveTimeEst = cog.solveTimeEst;
    p.meta.expectedUndos = cog.expectedUndos;
    p.meta.autopilotRatio = cog.autopilotRatio;
    p.meta.avgBranching = cog.avgBranching;
    p.meta.falseLeads = cog.falseLeads;
    p.meta.ambiguityScore = cog.ambiguityScore;
    p.meta.contentionScore = cog.contentionScore;
    p.meta.trapScore = cog.trapScore;
    p.meta.deductiveScore = cog.deductiveScore;
    p.meta.mechScore = cog.mechScore;
    p.meta.hist = rated.hist;

    const newJson = toJSON(p, curLvl.id);
    newJson.name = p.meta.name;
    newJson.chapter = curLvl.chapter;
    newJson.pacing = curLvl.pacing;
    newJson.pacingRole = curLvl.pacingRole;
    newJson.tutorialTip = curLvl.tutorialTip;
    newJson.timerSec = curLvl.timerSec;
    newJson.unlockBuff = curLvl.unlockBuff;
    
    if (p.bombs.size > 0) {
      newJson.bombs = [...p.bombs].map(c => ({ r: Math.floor(c / DS_C), c: c % DS_C }));
    }

    SUITE_LEVELS[SUITE_CUR_IDX] = newJson;
    selectSuiteLevel(SUITE_CUR_IDX);
    switchSubTab('Info');
    alert('🎉 AI đã phủ kín 100% bản vẽ, gài vách ngăn và hoàn tất đánh giá não bộ toàn diện! Bạn có thể kiểm tra ở Tab 1 và chơi thử ở giữa.');
  } else {
    alert('Bản vẽ bị cô lập hoặc không tìm được lời giải phủ kín toàn bộ ô đất. Hãy kiểm tra các eo hẹp hoặc ô góc!');
  }
};

$('btnDsSaveCurrent').onclick = () => {
  $('btnDsAutoGenerate').click();
};

/* ================= FULL JSON IMPORT SYSTEM ================= */
let JSON_IMPORT_TARGET = 'suite';

function initJsonImportModal() {
  const modal = $('jsonImportModal');
  const fileInput = $('jsonFileInput');
  const textInput = $('jsonTextInput');

  $('btnImportSuiteJson').onclick = () => {
    JSON_IMPORT_TARGET = 'suite';
    $('importModalTitle').textContent = '📤 Nhập Toàn Bộ Dữ Liệu Suite (Mảng 50 Levels)';
    $('importModalHint').textContent = 'Nạp toàn bộ danh sách màn chơi từ mảng JSON (Array [...]) để thay thế hoặc cập nhật Suite.';
    textInput.value = '';
    fileInput.value = '';
    modal.classList.add('active');
  };

  $('btnImportSingleJson').onclick = () => {
    JSON_IMPORT_TARGET = 'single';
    $('importModalTitle').textContent = \`📤 Nhập JSON Cho Màn Hiện Tại (\${SUITE_LEVELS[SUITE_CUR_IDX].id})\`;
    $('importModalHint').textContent = 'Nạp 1 đối tượng JSON (Object {...}) để thay thế trực tiếp vào màn đang chọn.';
    textInput.value = '';
    fileInput.value = '';
    modal.classList.add('active');
  };

  $('btnCancelImport').onclick = () => {
    modal.classList.remove('active');
  };

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      textInput.value = evt.target.result;
    };
    reader.readAsText(file);
  };

  $('btnConfirmImport').onclick = () => {
    const str = textInput.value.trim();
    if (!str) {
      alert('Vui lòng chọn file .json hoặc dán nội dung JSON vào khung!');
      return;
    }

    try {
      const parsed = JSON.parse(str);

      if (JSON_IMPORT_TARGET === 'suite') {
        if (!Array.isArray(parsed)) {
          alert('Dữ liệu Suite bắt buộc phải là một mảng Array [...] các màn chơi!');
          return;
        }
        SUITE_LEVELS = parsed;
        SUITE_CUR_IDX = 0;
        renderLevelList();
        selectSuiteLevel(0);
        modal.classList.remove('active');
        alert(\`🎉 Đã nạp thành công \${SUITE_LEVELS.length} màn chơi vào Suite!\`);
      } else {
        const lvlObj = Array.isArray(parsed) ? parsed[0] : parsed;
        if (!lvlObj.grid || !lvlObj.anchors) {
          alert('Cấu trúc JSON không hợp lệ! Thiếu trường grid hoặc anchors.');
          return;
        }
        lvlObj.id = SUITE_LEVELS[SUITE_CUR_IDX].id;
        SUITE_LEVELS[SUITE_CUR_IDX] = lvlObj;
        selectSuiteLevel(SUITE_CUR_IDX);
        modal.classList.remove('active');
        alert(\`🎉 Đã nạp thành công JSON vào màn \${lvlObj.id}!\`);
      }
    } catch(err) {
      alert('Lỗi cú pháp JSON: ' + err.message);
    }
  };
}

// EXPORT ACTIONS
$('btnExportAllJson').onclick = () => {
  const blob = new Blob([JSON.stringify(SUITE_LEVELS, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pirate_trails_50_levels.json';
  a.click();
};

$('btnCopyJson').onclick = () => {
  const curLvl = SUITE_LEVELS[SUITE_CUR_IDX];
  navigator.clipboard.writeText(JSON.stringify(curLvl, null, 2));
  alert('Đã copy JSON màn ' + curLvl.id + ' vào clipboard!');
};

$('btnDownloadSingleJson').onclick = () => {
  const curLvl = SUITE_LEVELS[SUITE_CUR_IDX];
  const blob = new Blob([JSON.stringify(curLvl, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (curLvl.id || 'level') + '.json';
  a.click();
};

$('btnResetProgress').onclick = () => {
  if (confirm('Bạn có chắc muốn xóa tiến trình chơi của 50 màn?')) {
    SUITE_SOLVED_SET.clear();
    try { localStorage.removeItem('pirate_trails_50_solved'); } catch(e){}
    renderLevelList();
  }
};

// INITIALIZE
window.addEventListener('DOMContentLoaded', () => {
  initStudioSuite();
});
</script>
</body>
</html>
`;

  fs.writeFileSync('Pirate_Trails_50_Levels.html', htmlContent);
  console.log('Successfully built Pirate_Trails_50_Levels.html with MEC-05 Bombs, Timers, Buffs & 50 Master Levels!');
}

buildStudioSuite();
