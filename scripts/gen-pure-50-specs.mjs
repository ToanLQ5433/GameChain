import fs from 'fs';

// Professional Level Designer Master 50-Level Specs
// Principle: Pure single-mechanic progression per chapter. Continuous learning, no cognitive whiplash, no premature blocker mixing.
const PURE_50_SPECS = [
  // ================= CHƯƠNG 1 (L01–L10): VỊNH SAN HÔ — NỀN TẢNG KHÔNG GIAN & VÁCH NGĂN (WALLS) =================
  {
    id: "L01", chapter: 1, pacing: "Ki (Khởi động)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Tutorial · 1 Dây (3×3)", R: 3, C: 3, K: 1, minLen: 9,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: "Mở Replay (Free)", tip: "Kéo 1 nét qua tất cả các ô để hiểu luật phủ kín 100%."
  },
  {
    id: "L02", chapter: 1, pacing: "Shō (Phát triển)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "2 Dây Không Cắt (4×4)", R: 4, C: 4, K: 2, minLen: 8,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Dây A và B phân chia không gian, tuyệt đối không cắt chéo hoặc đè lên nhau."
  },
  {
    id: "L03", chapter: 1, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: 1 Vách Ngăn (4×4)", R: 4, C: 4, K: 2, minLen: 8,
    rocks: 0, wallBudget: 1, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Thanh Chặn (Vách ngăn) cản đường trực tiếp, buộc dây phải uốn lượn vòng qua."
  },
  {
    id: "L04", chapter: 1, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Hành Lang 1 Vách (5×4)", R: 5, C: 4, K: 2, minLen: 10,
    rocks: 0, wallBudget: 1, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Vách ngăn tạo hành lang chữ U thông suốt, vuốt nhẹ nhàng để làm quen."
  },
  {
    id: "L05", chapter: 1, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "2 Vách Ngăn Song Song (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 2, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "2 Vách ngăn tạo các ngách zíc-zắc, rèn thói quen bao quát toàn bộ góc chết."
  },
  {
    id: "L06", chapter: 1, pacing: "Ten (Thử thách 1)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Bẫy Ngã Rẽ Vách (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 2, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: "Mở Buff Hint (3 Lượt)", tip: "Bẫy trực giác: Rẽ sai nhánh sẽ sót lại 1 ô góc ở cuối đường."
  },
  {
    id: "L07", chapter: 1, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Vách Ngăn Đối Xứng (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 2, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Bố cục đối xứng hài hòa, giải tỏa căng thẳng sau màn thử thách."
  },
  {
    id: "L08", chapter: 1, pacing: "Ten (Thử thách 2)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "3 Vách Ngăn Hẹp (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 3, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "3 Vách chia bàn cờ thành các phòng hẹp, đòi hỏi tính toán thứ tự đi trước sau."
  },
  {
    id: "L09", chapter: 1, pacing: "Ten (Hard Setup)", difficulty: "3 · Khó (Insight/Trap)", role: "ESCALATION",
    name: "Mê Cung 3 Dây 3 Vách (6×5)", R: 6, C: 5, K: 3, minLen: 10,
    rocks: 0, wallBudget: 3, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "3 Dây cùng tranh chấp không gian luồn qua 3 vách ngăn."
  },
  {
    id: "L10", chapter: 1, pacing: "👑 CLIMAX CH1", difficulty: "4 · Siêu Khó (Mastery)", role: "MASTERY",
    name: "Đại Trận Vách Ngăn (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 4, pushCount: 0, switches: false, prisms: false, waypoints: false,
    timer: null, buff: "🎁 RƯƠNG CỤM 1 (2000 Vàng + 1 Hint + 1 Freeze)", tip: "Bậc thầy không gian: Phối hợp 3 dây phủ kín mê cung vách ngăn!"
  },

  // ================= CHƯƠNG 2 (L11–L20): ĐẢO ĐẦU LÂU — THÙNG HÀNG SOKOBAN (PUSH ROCKS) =================
  {
    id: "L11", chapter: 2, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: 1 Thùng Hàng (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 1, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Khối Trượt 📦: Đâm đầu dây vào khối để đẩy lùi 1 ô vào khoảng trống mở lối đi."
  },
  {
    id: "L12", chapter: 2, pacing: "Shō (Phát triển)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Đẩy Thùng Mở Ngách (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 1, switches: false, prisms: false, waypoints: false,
    timer: null, buff: null, tip: "Đẩy thùng sang bên hông để dây thứ 2 có đường tiến vào góc."
  },
  {
    id: "L13", chapter: 2, pacing: "Ten (Thử thách 1)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Bẫy Hướng Đẩy Thùng (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 1, switches: false, prisms: false, waypoints: false,
    timer: 75, buff: "⏱️ Kích Hoạt Timer & 🎁 Buff Freeze", tip: "Khối ở góc: Có 2 hướng đẩy nhưng chỉ 1 hướng đúng, đẩy sai sẽ tự bít đường."
  },
  {
    id: "L14", chapter: 2, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Đẩy Thùng Thông Suốt (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 1, switches: false, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "1 Cú đẩy trúng đích giải phóng toàn bộ hành lang rộng, vuốt êm tay."
  },
  {
    id: "L15", chapter: 2, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "2 Thùng Hàng Độc Lập (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 2, switches: false, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "2 Thùng hàng nằm ở 2 cánh bàn cờ, mỗi dây tự phụ trách xử lý 1 thùng."
  },
  {
    id: "L16", chapter: 2, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "2 Thùng & 3 Dây (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 2, switches: false, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Dây A đẩy thùng dọn đường cho Dây B, tạo lối đi thông suốt."
  },
  {
    id: "L17", chapter: 2, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Đẩy 2 Thùng Song Tuyến (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 2, switches: false, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Bố cục thoáng, đẩy 2 thùng theo đường thẳng nhẹ nhàng giải phóng áp lực."
  },
  {
    id: "L18", chapter: 2, pacing: "Ten (Thử thách 2)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Chuỗi Đẩy Thùng Nối Tiếp (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 2, switches: false, prisms: false, waypoints: false,
    timer: 100, buff: null, tip: "Phải đẩy Thùng 1 sang ô trung gian để lấy góc tiếp cận đẩy tiếp Thùng 2."
  },
  {
    id: "L19", chapter: 2, pacing: "Ten (Hard Setup)", difficulty: "3 · Khó (Insight/Trap)", role: "ESCALATION",
    name: "Thùng Hàng Góc Hẹp (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 2, switches: false, prisms: false, waypoints: false,
    timer: 100, buff: null, tip: "Không gian hẹp đòi hỏi tính toán chính xác số ô trống để thùng không bị kẹt."
  },
  {
    id: "L20", chapter: 2, pacing: "👑 CLIMAX CH2", difficulty: "4 · Siêu Khó (Mastery)", role: "MASTERY",
    name: "Đại Sư Sokoban (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 3, switches: false, prisms: false, waypoints: false,
    timer: 130, buff: "🎁 RƯƠNG CỤM 2", tip: "Xử lý chuẩn xác 3 Thùng hàng để mở toang toàn bộ bản đồ 7×6!"
  },

  // ================= CHƯƠNG 3 (L21–L30): THỦY TINH — LĂNG KÍNH & CỔNG MÀU (PRISMS & COLOR GATES) =================
  {
    id: "L21", chapter: 3, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: 1 Lăng Kính & Cổng (5×5)", R: 5, C: 5, K: 2, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "Dây đi qua Lăng Kính 💎 để đổi màu rồi mới có thể vượt qua Cổng cùng màu."
  },
  {
    id: "L22", chapter: 3, pacing: "Shō (Phát triển)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "2 Màu Độc Lập (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "Dây 1 đổi màu Đỏ, Dây 2 đổi màu Xanh để đi qua đúng cổng màu của mình."
  },
  {
    id: "L23", chapter: 3, pacing: "Ten (Thử thách 1)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Bẫy Nhầm Màu Cổng Chéo (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 100, buff: null, tip: "2 Cổng màu nằm đan chéo; đi nhầm lăng kính sẽ bị chặn cứng ở cổng."
  },
  {
    id: "L24", chapter: 3, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Đa Sắc Đối Xứng (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "Hiệu ứng chuyển màu rực rỡ, đường đi đối xứng êm ái giải tỏa căng thẳng."
  },
  {
    id: "L25", chapter: 3, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "1 Dây Qua 2 Cổng Màu (6×6)", R: 6, C: 6, K: 2, minLen: 18,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "Sau khi nhận màu, dây duy trì thuộc tính màu để vượt qua cả 2 cổng nối tiếp."
  },
  {
    id: "L26", chapter: 3, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "Phân Luồng 3 Dây Đa Sắc (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "3 Dây cùng tìm đường tiếp cận đúng lăng kính trên bàn cờ rộng."
  },
  {
    id: "L27", chapter: 3, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Vòng Xoáy Lăng Kính (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 75, buff: null, tip: "Các lăng kính xếp theo vòng tròn tự nhiên, kéo lướt nhẹ nhàng."
  },
  {
    id: "L28", chapter: 3, pacing: "Ten (Thử thách 2)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Đổi Màu 2 Lần Liên Tiếp (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 100, buff: null, tip: "1 Dây phải qua Lăng kính 1 lấy màu A qua Cổng A, rồi qua Lăng kính 2 lấy màu B qua Cổng B."
  },
  {
    id: "L29", chapter: 3, pacing: "Ten (Hard Setup)", difficulty: "3 · Khó (Insight/Trap)", role: "ESCALATION",
    name: "Ma Trận 3 Màu Đan Cài (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 100, buff: null, tip: "3 Màu Đỏ - Xanh - Tím đan xen đòi hỏi quy hoạch luồng đi chuẩn xác."
  },
  {
    id: "L30", chapter: 3, pacing: "👑 CLIMAX CH3", difficulty: "4 · Siêu Khó (Mastery)", role: "MASTERY",
    name: "Tuyệt Kỹ Thủy Tinh (7×6)", R: 7, C: 6, K: 4, minLen: 10,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: true, waypoints: false,
    timer: 130, buff: "🎁 RƯƠNG CỤM 3", tip: "4 Dây phối hợp hoàn hảo qua hệ thống lăng kính và cổng màu đa sắc!"
  },

  // ================= CHƯƠNG 4 (L31–L40): CƠ QUAN — CÔNG TẮC & CỔNG MỞ (SWITCHES & GATES) =================
  {
    id: "L31", chapter: 4, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: Nút Bấm & Cổng (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Dây A đè lên Nút Bấm 🔘 -> Cổng Mở ⛩️ -> Dây B đi xuyên qua Cổng."
  },
  {
    id: "L32", chapter: 4, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: Chốt Khóa Latch (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Chốt khóa tự động: Chỉ cần lướt qua Nút 1 lần là Cổng tự khóa mở vĩnh viễn."
  },
  {
    id: "L33", chapter: 4, pacing: "Ten (Thử thách 1)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Phụ Thuộc Chéo 2 Dây (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 100, buff: null, tip: "Dây A mở Cổng cho B; Dây B đi qua xong phải đè Nút mở tiếp Cổng cho Dây A."
  },
  {
    id: "L34", chapter: 4, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "1 Nút Mở Toang 2 Cổng (6×6)", R: 6, C: 6, K: 2, minLen: 18,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "1 Nút bấm kích hoạt mở toang cả 2 cổng, giải tỏa áp lực đếm bước."
  },
  {
    id: "L35", chapter: 4, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "2 Nút Mở 2 Cổng Riêng (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Mỗi cặp Dây - Nút vận hành độc lập để thông luồng toàn bàn cờ."
  },
  {
    id: "L36", chapter: 4, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "Chuỗi Mở Cổng Tuần Tự (6×6)", R: 6, C: 6, K: 3, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Mở Cổng 1 để tiếp cận Nút 2, mở tiếp Cổng 2 cho dây chủ lực về đích."
  },
  {
    id: "L37", chapter: 4, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Cơ Quan Đối Xứng (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 75, buff: null, tip: "Bố cục đối xứng hài hòa, dẫm nút mở cổng nhẹ nhàng êm ái."
  },
  {
    id: "L38", chapter: 4, pacing: "Ten (Thử thách 2)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "3 Nút Bấm × 2 Cổng Mở (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 100, buff: null, tip: "Phân bổ thứ tự dẫm nút: Sai thứ tự sẽ tự khóa nhốt 1 dây bên trong phòng kín."
  },
  {
    id: "L39", chapter: 4, pacing: "Ten (Hard Setup)", difficulty: "3 · Khó (Insight/Trap)", role: "ESCALATION",
    name: "Vòng Khóa Cơ Quan (7×6)", R: 7, C: 6, K: 4, minLen: 10,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 100, buff: null, tip: "4 Dây hỗ trợ lẫn nhau theo chu trình khép kín A->B->C->D."
  },
  {
    id: "L40", chapter: 4, pacing: "👑 CLIMAX CH4", difficulty: "4 · Siêu Khó (Mastery)", role: "MASTERY",
    name: "Trận Đồ Vô Cực Cơ Quan (7×6)", R: 7, C: 6, K: 4, minLen: 10,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: true, prisms: false, waypoints: false,
    timer: 130, buff: "🎁 RƯƠNG CỤM 4", tip: "Tuyệt đỉnh điều khiển cơ quan: 4 Dây phối hợp mở 3 cổng liên hoàn!"
  },

  // ================= CHƯƠNG 5 (L41–L50): MẬT MÃ & GRAND FINALE — MẬT MÃ SỐ & ĐẠI TRẬN KẾT HỢP =================
  {
    id: "L41", chapter: 5, pacing: "Ki (Block mới)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Intro: Mật Mã Số 1-2 (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "Mật mã số 🔢: Bắt buộc chạm Mốc 1 rồi mới đến Mốc 2 theo đúng thứ tự tăng dần."
  },
  {
    id: "L42", chapter: 5, pacing: "Shō (Phát triển)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Mật Mã Số 1-3 (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "Rèn thói quen quan sát toàn bộ vị trí mốc số trước khi đặt tay kéo dây."
  },
  {
    id: "L43", chapter: 5, pacing: "Ten (Thử thách 1)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Bẫy Nghịch Lý Đốt Bước (6×5)", R: 6, C: 5, K: 2, minLen: 15,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 100, buff: null, tip: "Mốc 2 sát Mốc 1: Nếu nối thẳng sẽ thiếu bước L, ép phải uốn dây ra ngoài trước."
  },
  {
    id: "L44", chapter: 5, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "3 Mốc Số Thông Suốt (6×6)", R: 6, C: 6, K: 2, minLen: 18,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "3 Mốc đặt theo đường cong tự nhiên, vuốt 1 nét thông suốt cực sướng tay."
  },
  {
    id: "L45", chapter: 5, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "2 Chuỗi Mốc Độc Lập (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "Dây A (1->3), Dây B (1->2). Mỗi dây tự quản lý chuỗi mốc số của mình."
  },
  {
    id: "L46", chapter: 5, pacing: "Shō (Phát triển)", difficulty: "2 · Thường (Flow)", role: "ESCALATION",
    name: "Mốc Số Chữ Z 1-4 (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "4 Mốc xếp zíc-zắc hình chữ Z, uốn lượn dây phủ kín các góc mép bàn cờ."
  },
  {
    id: "L47", chapter: 5, pacing: "Ketsu (Xả hơi)", difficulty: "1 · Dễ (Warm-up)", role: "WARMUP",
    name: "Gestalt 4 Mốc Xả Hơi (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 75, buff: null, tip: "Bố cục mở, các mốc liên kết tự nhiên, nạp lại năng lượng trước 3 màn cuối."
  },
  {
    id: "L48", chapter: 5, pacing: "Ten (Hard Setup)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "2 Chuỗi Mốc Đan Chéo (7×6)", R: 7, C: 6, K: 3, minLen: 14,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 100, buff: null, tip: "Hai chuỗi mốc cắt ngang nhau, tranh chấp diện tích và thứ tự đi gay gắt."
  },
  {
    id: "L49", chapter: 5, pacing: "Ten (Tiền Climax)", difficulty: "3 · Khó (Insight/Trap)", role: "PEAK_TRAP",
    name: "Chuỗi Mật Mã 1-5 (8×6)", R: 8, C: 6, K: 4, minLen: 12,
    rocks: 0, wallBudget: 0, pushCount: 0, switches: false, prisms: false, waypoints: true,
    timer: 120, buff: "Gợi ý dùng Freeze", tip: "Lập kế hoạch toàn tuyến cho chuỗi 5 mốc số trên bàn cờ 8×6!"
  },
  {
    id: "L50", chapter: 5, pacing: "👑 GRAND FINALE", difficulty: "4 · Siêu Khó (Mastery)", role: "MASTERY",
    name: "Grand Finale: Đại Trận Hải Trình (8×6)", R: 8, C: 6, K: 4, minLen: 12,
    rocks: 0, wallBudget: 2, pushCount: 1, switches: true, prisms: false, waypoints: true,
    timer: 150, buff: "🎁 RƯƠNG CỤM 5 (Vinh Danh Bậc Thầy Hải Trình)", tip: "Đại Trận Tổng Hợp: Phối hợp Vách + Đẩy Thùng + Công Tắc + Mật Mã Số để phủ kín 100%!"
  }
];

fs.writeFileSync('scripts/pure_50_specs.json', JSON.stringify(PURE_50_SPECS, null, 2));
console.log('Saved 50 Pure Single-Mechanic Specs to scripts/pure_50_specs.json!');
