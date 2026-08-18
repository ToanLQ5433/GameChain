import fs from 'fs';
import vm from 'vm';

const html = fs.readFileSync('Trapline_Level_Forge.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
const script1 = scriptRegex.exec(html)[1];

const sandbox = {
  console, setTimeout, clearTimeout, performance, Math, Set, Map,
  Uint8Array, Int16Array, Array, Object, JSON,
  localStorage: { getItem: () => null, setItem: () => null }
};
vm.createContext(sandbox);
vm.runInContext(script1, sandbox);

console.log('Generating Levels with strictly paced Onboarding, Blockers & Boosters...');

const LEVEL_SPECS = [
  // ================= CHƯƠNG 1: VỊNH SAN HÔ (Onboarding Pure Geometry & Walls) =================
  // L01: Học mục tiêu cơ bản (1 Dây, 0 Rock, 0 Wall, 100% thoáng)
  { id: 'L01', ch: 1, name: 'Tập Luyện: Nối Dây Cơ Bản', R: 3, C: 3, K: 1, minLen: 8, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP', tut: 'Kéo dây từ mỏ neo để phủ kín 100% các ô cờ.' },
  // L02: Học 2 Dây không đè chéo nhau (2 Dây, 0 Rock, 0 Wall)
  { id: 'L02', ch: 1, name: 'Tập Luyện: Song Dây Không Cắt', R: 4, C: 4, K: 2, minLen: 4, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP', tut: '2 Dây không được đè chéo hoặc cắt qua đường của nhau.' },
  // L03: Giới thiệu Vách Ngăn đầu tiên (1 Wall, 0 Rock)
  { id: 'L03', ch: 1, name: 'Vách Ngăn Đầu Tiên', R: 4, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'ESCALATION', tut: 'Vách ngăn màu đen chặn đường đi giữa 2 ô.' },
  // L04: Tập uốn lượn qua vách ngăn
  { id: 'L04', ch: 1, name: 'Hành Lang Gập Ghềnh', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP', tut: 'Lên kế hoạch đường đi để không để thừa ô trống.' },
  // L05: Giới thiệu Đá Tảng (Rock Blocker) đầu tiên!
  { id: 'L05', ch: 1, name: 'Chướng Ngại Vật: Đá Tảng', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 1, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'ESCALATION', tut: 'Ô Đá tảng 🪨 là chướng ngại vật cố định, không cần phủ dây qua.' },
  // L06: Phối hợp Đá + Vách ngăn
  { id: 'L06', ch: 1, name: 'Rạn San Hô Đá Ngầm', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 1, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'ESCALATION' },
  // L07: Giới thiệu 3 Dây cùng tranh chấp không gian
  { id: 'L07', ch: 1, name: 'Tam Hải Trình Tranh Chấp', R: 5, C: 5, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'PEAK_TRAP' },
  // L08: Củng cố nhịp thở êm ái
  { id: 'L08', ch: 1, name: 'Bờ Cát Lặng Sóng', R: 6, C: 5, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP' },
  // L09: Mê cung đối xứng vách ngăn (Hard)
  { id: 'L09', ch: 1, name: 'Mê Cung Đối Xứng', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 4, rocks: 1, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'PEAK_TRAP' },
  // L10: Trùm Vịnh San Hô (Climax Chương 1 - Heart Shape)
  { id: 'L10', ch: 1, name: 'Trùm Vịnh Trái Tim', R: 6, C: 6, K: 4, minLen: 3, shape: 'heart', wallBudget: 8, rocks: 1, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'MASTERY' },

  // ================= CHƯƠNG 2: ĐẢO ĐẦU LÂU (Push Rocks - Sokoban) — 12 màn =================
  // L11: Giới thiệu Thùng Hàng Đẩy Được đầu tiên (0 Rock, 0 Wall)
  { id: 'L11', ch: 2, name: 'Cơ Chế Mới: Thùng Hàng Sokoban', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP', tut: 'Kéo dây đâm vào Thùng Hàng 📦 để đẩy thùng sang ô trống phía trước!' },
  // L12: Đẩy thùng né góc kẹt
  { id: 'L12', ch: 2, name: 'Đường Hầm Song Tuyến', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L13: BẪY #1 — Đẩy thùng vào góc chết = kẹt vĩnh viễn (Gợi ý dùng Buff Undo)
  { id: 'L13', ch: 2, name: 'Bẫy Bít Hẻm Cụt', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP', tut: 'Cẩn thận! Đẩy thùng vào góc chết sẽ làm kẹt đường vĩnh viễn. Kéo lùi dây KHÔNG trả thùng về chỗ cũ — lỡ tay thì bấm "Chơi Lại" để làm lại từ đầu.' },
  // L14: Xả hơi nhận thức
  { id: 'L14', ch: 2, name: 'Hành Lang Thông Suốt', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP' },
  // L15: Hai thùng hàng độc lập
  { id: 'L15', ch: 2, name: 'Song Thùng Chắn Lối', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L16 (MỚI): BẪY #2 — Đẩy thùng che mất đường của DÂY KHÁC (3 dây để tăng khả năng va chạm không gian)
  { id: 'L16', ch: 2, name: 'Bẫy Thùng Cản Đường Đồng Đội', R: 6, C: 5, K: 3, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP', tut: 'Cẩn thận: đẩy thùng có thể che mất đường của DÂY KHÁC! Quan sát toàn bộ bàn cờ trước khi đẩy, đừng chỉ nhìn dây của mình.' },
  // L17 (di chuyển từ L18 cũ): Xả hơi sau bẫy #2
  { id: 'L17', ch: 2, name: 'Gió Yên Sóng Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP' },
  // L18 (di chuyển từ L16 cũ): 3 Dây + 2 Thùng
  { id: 'L18', ch: 2, name: 'Tam Xích Đảo Hải Tặc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L19 (MỚI): BẪY #3 — Thứ tự đẩy 2 thùng: đẩy sai thùng trước sẽ tự bít đường thùng còn lại (0 Rock/Wall để bẫy không bị nhiễu bởi cơ chế khác)
  { id: 'L19', ch: 2, name: 'Bẫy Thứ Tự Đẩy Thùng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP', tut: '2 Thùng Hàng phải đẩy ĐÚNG THỨ TỰ — đẩy nhầm thùng trước sẽ tự bít mất đường của thùng còn lại!' },
  // L20 (di chuyển từ L17 cũ, đổi vai trò ESCALATION vì đã có đủ 3 bẫy riêng biệt ở trên)
  { id: 'L20', ch: 2, name: 'Bẫy Nghẽn Lối Thoát', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L21 (di chuyển từ L19 cũ): Cầu đảo đôi (Bridge) — bẫy tổng hợp trước climax
  { id: 'L21', ch: 2, name: 'Hải Trình Trước Đại Chiến', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP' },
  // L22: Climax Đảo Đầu Lâu (Skull)
  { id: 'L22', ch: 2, name: 'Đại Chiến Đảo Đầu Lâu', R: 7, C: 6, K: 4, minLen: 3, shape: 'skull', wallBudget: 4, rocks: 1, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'MASTERY' },

  // ================= CHƯƠNG 3: KHO BÁU THỦY TINH (Prisms & ColorGates) =================
  // L23: Giới thiệu Lăng Kính đổi màu đầu tiên
  { id: 'L23', ch: 3, name: 'Cơ Chế Mới: Lăng Kính Đổi Màu', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP', tut: 'Dây xích đi qua Lăng Kính 💎 sẽ được nhuộm thành màu sắc mới!' },
  // L24: Giới thiệu Cổng Màu (ColorGate)
  { id: 'L24', ch: 3, name: 'Cơ Chế Mới: Cổng Màu Một Chiều', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION', tut: 'Cổng Màu 🚪 chỉ cho phép dây xích CÙNG MÀU đi qua.' },
  // L25: Bẫy lạc sắc màu
  { id: 'L25', ch: 3, name: 'Bẫy Lạc Sắc Màu', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L26: Xả hơi nhận thức
  { id: 'L26', ch: 3, name: 'Suối Nước Trong', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP' },
  // L27: Hai luồng màu song song
  { id: 'L27', ch: 3, name: 'Nhị Sắc Đan Luồng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION' },
  // L28: 3 Dây đa sắc
  { id: 'L28', ch: 3, name: 'Tam Xích Biến Sắc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION' },
  // L29: Bẫy giao thoa đa sắc
  { id: 'L29', ch: 3, name: 'Bẫy Giao Thoa Đa Sắc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L30: Thư giãn nhịp thở
  { id: 'L30', ch: 3, name: 'Bờ Cát Tĩnh Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP' },
  // L31: Thập tự đa sắc (Cross)
  { id: 'L31', ch: 3, name: 'Thập Tự Đa Sắc', R: 7, C: 6, K: 3, minLen: 3, shape: 'cross', wallBudget: 7, rocks: 1, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L32: Climax Vành Đai Biển (Ring)
  { id: 'L32', ch: 3, name: 'Tuyệt Kỹ Vành Đai Biển', R: 7, C: 6, K: 4, minLen: 3, shape: 'ring', wallBudget: 8, rocks: 1, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'MASTERY' },

  // ================= CHƯƠNG 4: CƠ QUAN CỔ ĐẠI (Switches & Gates) — 11 màn =================
  // L33: Giới thiệu Công Tắc Dẫm Nút & Cổng Ngầm
  { id: 'L33', ch: 4, name: 'Cơ Chế Mới: Công Tắc & Cổng Ngầm', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP', tut: 'Dây xích đi qua Nút Bấm 🔘 sẽ mở Cổng Ngầm ⛩️ để dây khác đi qua!' },
  // L34: BẪY-KIẾN-THỨC #1 — Công Tắc Khóa Chốt (Latch). forceLatch:true ĐẢM BẢO đúng như tutorial nói
  // (trước đây latch random 50/50 nên có thể ra SAI với lời hứa "mở vĩnh viễn").
  { id: 'L34', ch: 4, name: 'Cổng Khóa Tự Động', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'ESCALATION', forceLatch: true, tut: 'Nút khóa 🔒 khi đã dẫm sẽ giữ Cổng Ngầm mở VĨNH VIỄN, kể cả khi dây rời khỏi nút.' },
  // L35: Bẫy dẫm nút mở lối
  { id: 'L35', ch: 4, name: 'Bẫy Dẫm Nút Mở Lối', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'PEAK_TRAP' },
  // L36: Xả hơi
  { id: 'L36', ch: 4, name: 'Bánh Răng Khớp Nối', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP' },
  // L37: 2 Cặp công tắc độc lập
  { id: 'L37', ch: 4, name: 'Hai Khoang Cơ Quan', R: 6, C: 5, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'ESCALATION' },
  // L38: BẪY-KIẾN-THỨC #2 — Công Tắc THƯỜNG (không Latch): rời khỏi nút là Cổng tự ĐÓNG lại,
  // khác hẳn L34. forceLatch:false ép đúng biến thể này để dạy tương phản rõ ràng với latch.
  { id: 'L38', ch: 4, name: 'Chốt Cổng Luân Phiên', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'ESCALATION', forceLatch: false, tut: 'Nút bấm 🔘 này KHÔNG khóa: hễ dây rời khỏi ô nút, Cổng Ngầm sẽ tự ĐÓNG LẠI ngay — phải giữ đúng thứ tự kéo dây.' },
  // L39 (MỚI): BẪY #3 — Phụ thuộc thứ tự giữa 2 dây: phải kéo dây có nút TRƯỚC để mở cổng kịp lúc
  // cho dây kia, nếu không sẽ bị chặn giữa chừng. forceLatch:false để bẫy không bị "cứu" bởi latch.
  { id: 'L39', ch: 4, name: 'Bẫy Bấm Nút Trễ', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'PEAK_TRAP', forceLatch: false, tut: 'Phải kéo dây có Nút Bấm 🔘 TRƯỚC để mở Cổng Ngầm ⛩️ kịp lúc — thứ tự chọn dây nào kéo trước quyết định thắng thua!' },
  // L40: Bẫy đảo chiều luồng
  { id: 'L40', ch: 4, name: 'Bẫy Đảo Chiều Luồng', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'PEAK_TRAP' },
  // L41: Xả hơi trước trận đấu lớn
  { id: 'L41', ch: 4, name: 'Gian Điện Tĩnh Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP' },
  // L42: Combo Thùng Đè Nút Công Tắc (Anchor)
  { id: 'L42', ch: 4, name: 'Mỏ Neo Đẩy Thùng Đè Nút', R: 7, C: 6, K: 3, minLen: 3, shape: 'anchor', wallBudget: 3, rocks: 0, push: 1, prism: 0, sw: 2, wp: 0, mode: 'auto', role: 'PEAK_TRAP' },
  // L43: Climax Đồng Hồ Cát Vô Cực (Hourglass)
  { id: 'L43', ch: 4, name: 'Trận Đồ Đồng Hồ Cát Vô Cực', R: 7, C: 6, K: 4, minLen: 3, shape: 'hourglass', wallBudget: 4, rocks: 1, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'MASTERY' },

  // ================= CHƯƠNG 5: MẬT MÃ HẢI VƯƠNG (Waypoints & Mega Combo) =================
  // L44: Giới thiệu Mật Mã Số Waypoint (1 -> 2)
  { id: 'L44', ch: 5, name: 'Cơ Chế Mới: Mật Mã Số Waypoint', R: 4, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'WARMUP', tut: 'Dây xích bắt buộc phải đi qua các phao số theo đúng thứ tự 1️⃣ ➔ 2️⃣ ➔ 3️⃣.' },
  // L45: Mốc số + Lăng kính
  { id: 'L45', ch: 5, name: 'Mốc Số Thủy Tinh', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L46: Bẫy mật mã uốn lượn
  { id: 'L46', ch: 5, name: 'Bẫy Mật Mã Uốn Lượn', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L47: Xả hơi (giữ đúng tinh thần "1 cơ chế/lúc" — bỏ bớt công tắc, chỉ còn mật mã số)
  { id: 'L47', ch: 5, name: 'Nhịp Điệu Đếm Số', R: 4, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'WARMUP' },
  // L48: Thùng hàng mở mốc
  { id: 'L48', ch: 5, name: 'Thùng Hàng Mở Mốc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 1, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L49: Chuỗi ép bước mật mã
  { id: 'L49', ch: 5, name: 'Chuỗi Ép Bước Mật Mã', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 0, sw: 2, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L50: Xả hơi trước chặng chung kết
  { id: 'L50', ch: 5, name: 'Biển Lặng Trước Bão', R: 4, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'WARMUP' },
  // L51: Tam đại cơ chế hội tụ
  { id: 'L51', ch: 5, name: 'Tam Đại Cơ Quan Hội Tụ', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L52: Tứ đại cơ chế cầu hẹp (Bridge)
  { id: 'L52', ch: 5, name: 'Tứ Đại Cơ Chế Cầu Hẹp', R: 7, C: 6, K: 4, minLen: 3, shape: 'bridge', wallBudget: 3, rocks: 0, push: 1, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L53: ĐẠI ĐỈNH CAO HẢI TRÌNH (GRAND FINALE)
  { id: 'L53', ch: 5, name: 'ĐẠI ĐỈNH CAO HẢI TRÌNH (GRAND FINALE)', R: 8, C: 6, K: 4, minLen: 3, shape: 'auto_gestalt', wallBudget: 4, rocks: 1, push: 1, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'MASTERY' }
];

// role -> hạng độ khó MỤC TIÊU. Bắt buộc phải truyền targetClass thật vào cfg (không phải
// null) vì decorateMechanics() chỉ bật nhánh trang trí khó hơn (mốc số lừa thị giác, chọn
// dây phức tạp hơn cho lăng kính/công tắc...) khi cfg.targetClass thực sự là 3/4. Trước đây
// truyền null cho MỌI spec khiến toàn bộ 50 màn dùng chung 1 mức trang trí "mặc định", nên
// độ khó đo được gần như phẳng bất kể role WARMUP hay MASTERY.
const ROLE_TARGET_CLASS = { WARMUP: 1, ESCALATION: 2, PEAK_TRAP: 3, MASTERY: 4 };
const MAX_ATTEMPTS_PER_SPEC = 400;

const generatedLevels = [];
let mismatchCount = 0;

for (let i = 0; i < LEVEL_SPECS.length; i++) {
  const spec = LEVEL_SPECS[i];
  const targetClass = ROLE_TARGET_CLASS[spec.role] || 1;
  let seed = 2026 + i * 29;
  let level = null;
  let bestPuzzle = null, bestGap = Infinity;
  let attempts = 0;

  while (!level && attempts < MAX_ATTEMPTS_PER_SPEC) {
    attempts++;
    seed += 3;
    const rng = sandbox.mulberry32(seed);
    const cfg = {
      R: spec.R, C: spec.C,
      anchors: spec.K, minLen: spec.minLen,
      shapeMode: spec.shape,
      targetClass,
      allowRock: spec.rocks > 0,
      obstacles: spec.rocks,
      allowWall: spec.wallBudget > 0,
      wallBudget: spec.wallBudget,
      allowPush: spec.push > 0,
      pushCount: spec.push,
      allowPrism: spec.prism > 0,
      allowSwitch: spec.sw > 0,
      allowWaypoints: spec.wp > 0,
      mode: spec.mode,
      forceLatch: spec.forceLatch,
      maxAttempts: 300
    };

    const res = sandbox.generateOne(cfg, rng);
    if (res.ok) {
      // decorateMechanics() có xác suất BỎ QUA lăng kính/công tắc ở 1 số hạng mục tiêu (xem
      // ghi chú trong Trapline_Level_Forge.html). Một màn "dạy cơ chế X" mà seed này lại thiếu
      // hẳn cơ chế X thì vô giá trị dù độ khó có khớp — loại ngay, không cho vào cả bestPuzzle.
      const mechanicOk = (!(spec.push > 0) || res.puzzle.pushRocks.length > 0)
        && (!(spec.prism > 0) || res.puzzle.prisms.length > 0)
        && (!(spec.sw > 0) || res.puzzle.switches.length > 0);

      if (mechanicOk) {
        const gap = Math.abs(res.puzzle.meta.cls - targetClass);
        if (gap < bestGap) { bestGap = gap; bestPuzzle = res.puzzle; }
        if (gap === 0) {
          const chosen = res.puzzle;
          chosen.meta.id = spec.id;
          chosen.meta.name = spec.name;
          chosen.meta.chapter = spec.ch;
          chosen.meta.pacingRole = spec.role;
          level = sandbox.toJSON(chosen, spec.id);
          level.name = spec.name;
          level.chapter = spec.ch;
          level.pacingRole = spec.role;
          level.tutorialTip = spec.tut || null;
        }
      }
    }

    // Hết lượt thử mà chưa khớp đúng hạng: dùng ứng viên GẦN NHẤT đã từng ghi nhận được (có
    // thể đến từ MỘT trong các lượt thử TRƯỚC, không nhất thiết lượt cuối cùng này) — trước
    // đây điều kiện này nằm SAU "if (!mechanicOk) continue;" nên nếu đúng lượt thử CUỐI CÙNG
    // lại trượt mechanicOk thì cả 1 bestPuzzle hợp lệ đã tìm được trước đó bị vứt bỏ oan,
    // khiến cả màn FAIL hẳn dù đã có ứng viên tốt trong tay.
    if (!level && attempts === MAX_ATTEMPTS_PER_SPEC && bestPuzzle) {
      const chosen = bestPuzzle;
      chosen.meta.id = spec.id;
      chosen.meta.name = spec.name;
      chosen.meta.chapter = spec.ch;
      chosen.meta.pacingRole = spec.role;
      level = sandbox.toJSON(chosen, spec.id);
      level.name = spec.name;
      level.chapter = spec.ch;
      level.pacingRole = spec.role;
      level.tutorialTip = spec.tut || null;
      level.pacingMismatch = true;
      mismatchCount++;
    }
  }

  if (level) {
    generatedLevels.push(level);
    const flag = level.pacingMismatch ? '  ⚠ LỆCH HẠNG (đã thử hết ' + attempts + ' seed)' : '';
    console.log(`[${spec.id}] Chapter ${spec.ch} - "${spec.name}" (${level.cognitiveMetrics.difficultyClass} / HDI ${level.cognitiveMetrics.humanDifficultyIndex}) - Rocks: ${level.rocks ? level.rocks.length : 0}, Walls: ${level.walls ? level.walls.length : 0}${flag}`);
  } else {
    console.error(`FATAL: Could not generate ${spec.id}`);
  }
}

if (mismatchCount > 0) {
  console.warn(`\n⚠ ${mismatchCount}/${LEVEL_SPECS.length} màn không đạt đúng hạng mục tiêu sau ${MAX_ATTEMPTS_PER_SPEC} lượt thử mỗi màn — xem các dòng "LỆCH HẠNG" ở trên.`);
}

if (generatedLevels.length !== LEVEL_SPECS.length) {
  console.error(`FATAL: only generated ${generatedLevels.length}/${LEVEL_SPECS.length} levels — refusing to overwrite `
    + `scripts/generated_50_levels.json with an incomplete suite. See the FATAL lines above for which spec(s) failed.`);
  process.exit(1);
}

fs.writeFileSync('scripts/generated_50_levels.json', JSON.stringify(generatedLevels, null, 2));
console.log(`Successfully saved ${generatedLevels.length}/${LEVEL_SPECS.length} levels to scripts/generated_50_levels.json`);
