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

console.log('Generating 50 Levels with strictly paced Onboarding, Blockers & Boosters...');

const LEVEL_SPECS = [
  // ================= CHƯƠNG 1: VỊNH SAN HÔ (Onboarding Pure Geometry & Walls) =================
  // L01: Học mục tiêu cơ bản (1 Dây, 0 Rock, 0 Wall, 100% thoáng)
  { id: 'L01', ch: 1, name: 'Tập Luyện: Nối Dây Cơ Bản', R: 3, C: 3, K: 1, minLen: 8, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP', tut: 'Kéo dây từ mỏ neo để phủ kín 100% các ô cờ.' },
  // L02: Học 2 Dây không đè chéo nhau (2 Dây, 0 Rock, 0 Wall)
  { id: 'L02', ch: 1, name: 'Tập Luyện: Song Dây Không Cắt', R: 4, C: 4, K: 2, minLen: 4, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'WARMUP', tut: '2 Dây không được đè chéo hoặc cắt qua đường của nhau.' },
  // L03: Giới thiệu Vách Ngăn đầu tiên (1 Wall, 0 Rock)
  { id: 'L03', ch: 1, name: 'Vách Ngăn Đầu Tiên', R: 4, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'ESCALATION', tut: 'Vách ngăn màu đen chặn đường đi giữa 2 ô.' },
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
  { id: 'L10', ch: 1, name: 'Trùm Vịnh Trái Tim', R: 6, C: 6, K: 3, minLen: 3, shape: 'heart', wallBudget: 4, rocks: 1, push: 0, prism: 0, sw: 0, wp: 0, mode: 'pure', role: 'MASTERY' },

  // ================= CHƯƠNG 2: ĐẢO ĐẦU LÂU (Push Rocks - Sokoban) =================
  // L11: Giới thiệu Thùng Hàng Đẩy Được đầu tiên (0 Rock, 0 Wall)
  { id: 'L11', ch: 2, name: 'Cơ Chế Mới: Thùng Hàng Sokoban', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP', tut: 'Kéo dây đâm vào Thùng Hàng 📦 để đẩy thùng sang ô trống phía trước!' },
  // L12: Đẩy thùng né góc kẹt
  { id: 'L12', ch: 2, name: 'Đường Hầm Song Tuyến', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L13: Bẫy đẩy thùng bít đường (Gợi ý dùng Buff Undo)
  { id: 'L13', ch: 2, name: 'Bẫy Bít Hẻm Cụt', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP', tut: 'Cẩn thận! Đẩy thùng vào góc chết sẽ làm kẹt đường. Hãy dùng nút Undo ↩️ nếu lỡ tay.' },
  // L14: Xả hơi nhận thức
  { id: 'L14', ch: 2, name: 'Hành Lang Thông Suốt', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP' },
  // L15: Hai thùng hàng độc lập
  { id: 'L15', ch: 2, name: 'Song Thùng Chắn Lối', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L16: 3 Dây + 2 Thùng
  { id: 'L16', ch: 2, name: 'Tam Xích Đảo Hải Tặc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'ESCALATION' },
  // L17: Bẫy nghẽn lối thoát
  { id: 'L17', ch: 2, name: 'Bẫy Nghẽn Lối Thoát', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP' },
  // L18: Giữ nhịp ổn định
  { id: 'L18', ch: 2, name: 'Gió Yên Sóng Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 1, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'WARMUP' },
  // L19: Cầu đảo đôi (Bridge)
  { id: 'L19', ch: 2, name: 'Cầu Đảo Đôi Cầu Hẹp', R: 7, C: 6, K: 3, minLen: 3, shape: 'bridge', wallBudget: 3, rocks: 0, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'PEAK_TRAP' },
  // L20: Climax Đảo Đầu Lâu (Skull)
  { id: 'L20', ch: 2, name: 'Đại Chiến Đảo Đầu Lâu', R: 7, C: 6, K: 4, minLen: 3, shape: 'skull', wallBudget: 4, rocks: 1, push: 2, prism: 0, sw: 0, wp: 0, mode: 'sokoban', role: 'MASTERY' },

  // ================= CHƯƠNG 3: KHO BÁU THỦY TINH (Prisms & ColorGates) =================
  // L21: Giới thiệu Lăng Kính đổi màu đầu tiên
  { id: 'L21', ch: 3, name: 'Cơ Chế Mới: Lăng Kính Đổi Màu', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP', tut: 'Dây xích đi qua Lăng Kính 💎 sẽ được nhuộm thành màu sắc mới!' },
  // L22: Giới thiệu Cổng Màu (ColorGate)
  { id: 'L22', ch: 3, name: 'Cơ Chế Mới: Cổng Màu Một Chiều', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION', tut: 'Cổng Màu 🚪 chỉ cho phép dây xích CÙNG MÀU đi qua.' },
  // L23: Bẫy lạc sắc màu
  { id: 'L23', ch: 3, name: 'Bẫy Lạc Sắc Màu', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L24: Xả hơi nhận thức
  { id: 'L24', ch: 3, name: 'Suối Nước Trong', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP' },
  // L25: Hai luồng màu song song
  { id: 'L25', ch: 3, name: 'Nhị Sắc Đan Luồng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION' },
  // L26: 3 Dây đa sắc
  { id: 'L26', ch: 3, name: 'Tam Xích Biến Sắc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'ESCALATION' },
  // L27: Bẫy giao thoa đa sắc
  { id: 'L27', ch: 3, name: 'Bẫy Giao Thoa Đa Sắc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L28: Thư giãn nhịp thở
  { id: 'L28', ch: 3, name: 'Bờ Cát Tĩnh Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 0, mode: 'color', role: 'WARMUP' },
  // L29: Thập tự đa sắc (Cross)
  { id: 'L29', ch: 3, name: 'Thập Tự Đa Sắc', R: 7, C: 6, K: 3, minLen: 3, shape: 'cross', wallBudget: 3, rocks: 0, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'PEAK_TRAP' },
  // L30: Climax Vành Đai Biển (Ring)
  { id: 'L30', ch: 3, name: 'Tuyệt Kỹ Vành Đai Biển', R: 7, C: 6, K: 4, minLen: 3, shape: 'ring', wallBudget: 4, rocks: 1, push: 0, prism: 2, sw: 0, wp: 0, mode: 'color', role: 'MASTERY' },

  // ================= CHƯƠNG 4: CƠ QUAN CỔ ĐẠI (Switches & Gates) =================
  // L31: Giới thiệu Công Tắc Dẫm Nút & Cổng Ngầm
  { id: 'L31', ch: 4, name: 'Cơ Chế Mới: Công Tắc & Cổng Ngầm', R: 5, C: 4, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP', tut: 'Dây xích đi qua Nút Bấm 🔘 sẽ mở Cổng Ngầm ⛩️ để dây khác đi qua!' },
  // L32: Giới thiệu Công Tắc Khóa Chốt (Latch)
  { id: 'L32', ch: 4, name: 'Cổng Khóa Tự Động', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'ESCALATION', tut: 'Nút khóa 🔒 khi đã dẫm sẽ giữ cổng mở vĩnh viễn.' },
  // L33: Bẫy dẫm nút mở lối
  { id: 'L33', ch: 4, name: 'Bẫy Dẫm Nút Mở Lối', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'PEAK_TRAP' },
  // L34: Xả hơi
  { id: 'L34', ch: 4, name: 'Bánh Răng Khớp Nối', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP' },
  // L35: 2 Cặp công tắc độc lập
  { id: 'L35', ch: 4, name: 'Hai Khoang Cơ Quan', R: 6, C: 5, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'ESCALATION' },
  // L36: Chốt cổng luân phiên
  { id: 'L36', ch: 4, name: 'Chốt Cổng Luân Phiên', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'ESCALATION' },
  // L37: Bẫy đảo chiều luồng
  { id: 'L37', ch: 4, name: 'Bẫy Đảo Chiều Luồng', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 1, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'PEAK_TRAP' },
  // L38: Xả hơi trước trận đấu lớn
  { id: 'L38', ch: 4, name: 'Gian Điện Tĩnh Lặng', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 0, mode: 'switch', role: 'WARMUP' },
  // L39: Combo Thùng Đè Nút Công Tắc (Anchor)
  { id: 'L39', ch: 4, name: 'Mỏ Neo Đẩy Thùng Đè Nút', R: 7, C: 6, K: 3, minLen: 3, shape: 'anchor', wallBudget: 3, rocks: 0, push: 1, prism: 0, sw: 2, wp: 0, mode: 'auto', role: 'PEAK_TRAP' },
  // L40: Climax Đồng Hồ Cát Vô Cực (Hourglass)
  { id: 'L40', ch: 4, name: 'Trận Đồ Đồng Hồ Cát Vô Cực', R: 7, C: 6, K: 4, minLen: 3, shape: 'hourglass', wallBudget: 4, rocks: 1, push: 0, prism: 0, sw: 2, wp: 0, mode: 'switch', role: 'MASTERY' },

  // ================= CHƯƠNG 5: MẬT MÃ HẢI VƯƠNG (Waypoints & Mega Combo) =================
  // L41: Giới thiệu Mật Mã Số Waypoint (1 -> 2)
  { id: 'L41', ch: 5, name: 'Cơ Chế Mới: Mật Mã Số Waypoint', R: 5, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 0, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'WARMUP', tut: 'Dây xích bắt buộc phải đi qua các phao số theo đúng thứ tự 1️⃣ ➔ 2️⃣ ➔ 3️⃣.' },
  // L42: Mốc số + Lăng kính
  { id: 'L42', ch: 5, name: 'Mốc Số Thủy Tinh', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 1, sw: 0, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L43: Bẫy mật mã uốn lượn
  { id: 'L43', ch: 5, name: 'Bẫy Mật Mã Uốn Lượn', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L44: Xả hơi
  { id: 'L44', ch: 5, name: 'Cổng Mở Theo Số', R: 6, C: 5, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 1, wp: 1, mode: 'auto', role: 'WARMUP' },
  // L45: Thùng hàng mở mốc
  { id: 'L45', ch: 5, name: 'Thùng Hàng Mở Mốc', R: 6, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 2, rocks: 0, push: 1, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L46: Chuỗi ép bước mật mã
  { id: 'L46', ch: 5, name: 'Chuỗi Ép Bước Mật Mã', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 0, sw: 2, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L47: Xả hơi trước chặng chung kết
  { id: 'L47', ch: 5, name: 'Biển Lặng Trước Bão', R: 6, C: 6, K: 2, minLen: 3, shape: 'rect', wallBudget: 1, rocks: 0, push: 0, prism: 0, sw: 0, wp: 1, mode: 'auto', role: 'WARMUP' },
  // L48: Tam đại cơ chế hội tụ
  { id: 'L48', ch: 5, name: 'Tam Đại Cơ Quan Hội Tụ', R: 7, C: 6, K: 3, minLen: 3, shape: 'rect', wallBudget: 3, rocks: 0, push: 0, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'ESCALATION' },
  // L49: Tứ đại cơ chế cầu hẹp (Bridge)
  { id: 'L49', ch: 5, name: 'Tứ Đại Cơ Chế Cầu Hẹp', R: 7, C: 6, K: 4, minLen: 3, shape: 'bridge', wallBudget: 3, rocks: 0, push: 1, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'PEAK_TRAP' },
  // L50: ĐẠI ĐỈNH CAO HẢI TRÌNH (GRAND FINALE)
  { id: 'L50', ch: 5, name: 'ĐẠI ĐỈNH CAO HẢI TRÌNH (GRAND FINALE)', R: 8, C: 6, K: 4, minLen: 3, shape: 'auto_gestalt', wallBudget: 4, rocks: 1, push: 1, prism: 1, sw: 1, wp: 1, mode: 'auto', role: 'MASTERY' }
];

const generatedLevels = [];

for (let i = 0; i < LEVEL_SPECS.length; i++) {
  const spec = LEVEL_SPECS[i];
  let seed = 2026 + i * 29;
  let level = null;
  let attempts = 0;

  while (!level && attempts < 120) {
    attempts++;
    seed += 3;
    const rng = sandbox.mulberry32(seed);
    const cfg = {
      R: spec.R, C: spec.C,
      anchors: spec.K, minLen: spec.minLen,
      shapeMode: spec.shape,
      targetClass: null,
      acceptAnyTier: true,
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
      maxAttempts: 300
    };

    const res = sandbox.generateOne(cfg, rng);
    if (res.ok) {
      const p = res.puzzle;
      p.meta.id = spec.id;
      p.meta.name = spec.name;
      p.meta.chapter = spec.ch;
      p.meta.pacingRole = spec.role;
      level = sandbox.toJSON(p, spec.id);
      level.name = spec.name;
      level.chapter = spec.ch;
      level.pacingRole = spec.role;
      level.tutorialTip = spec.tut || null;
    }
  }

  if (level) {
    generatedLevels.push(level);
    console.log(`[${spec.id}] Chapter ${spec.ch} - "${spec.name}" (${level.cognitiveMetrics.difficultyClass} / HDI ${level.cognitiveMetrics.humanDifficultyIndex}) - Rocks: ${level.rocks ? level.rocks.length : 0}, Walls: ${level.walls ? level.walls.length : 0}`);
  } else {
    console.error(`FATAL: Could not generate ${spec.id}`);
  }
}

fs.writeFileSync('scripts/generated_50_levels.json', JSON.stringify(generatedLevels, null, 2));
console.log(`Successfully saved ${generatedLevels.length}/50 levels to scripts/generated_50_levels.json`);
