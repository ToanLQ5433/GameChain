// Dữ liệu level được tổ chức theo CATEGORY — mỗi category = 1 thể loại.
// 5 category đầu = đúng 5 cơ chế lõi (mỗi category chỉ dùng 1 MEC).
// Category cuối "Tổng Hợp" = kết hợp ≥2 cơ chế trong 1 màn (đúng yêu cầu đề bài).

export const CATEGORIES = [
  {
    id: 'vat-can',
    title: 'Vật Cản',
    icon: '🪨',
    mechanic: 'MEC-01',
    desc: 'Rock chặn cứng, Wall chặn theo cạnh, Push Rock đẩy được để mở đường.',
    levels: [
      {
        name: 'Vật Cản 1: Tảng Đá Chặn Đường',
        size: 4,
        rocks: [{ r: 1, c: 2 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 7, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1]], B: [[3,3],[3,2],[2,2],[2,3],[1,3],[0,3],[0,2],[0,1]] }
      },
      {
        name: 'Vật Cản 2: Vách Ngăn Vô Hình',
        size: 4,
        walls: [{ r1: 1, c1: 1, r2: 2, c2: 1 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#2a7b4c' }
        ],
        solution: { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[1,0]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3]] }
      },
      {
        name: 'Vật Cản 3: Đẩy Đá Dọn Đường',
        size: 4,
        rocks: [{ r: 1, c: 2 }],
        pushRocks: [{ r: 2, c: 2 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 9, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 5, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[0,1],[0,2],[0,3],[1,3],[2,3],[2,2]], B: [[3,3],[3,2],[3,1],[3,0],[2,0]] }
      }
    ]
  },
  {
    id: 'dinh-huong-mau',
    title: 'Định Hướng & Màu',
    icon: '🎨',
    mechanic: 'MEC-02',
    desc: 'Mũi Tên ép hướng bước kế tiếp; Lăng Kính đổi màu dây; Cổng Màu chỉ cho qua đúng màu.',
    levels: [
      {
        name: 'Định Hướng 1: Nhuộm Màu Qua Cổng',
        size: 4,
        prisms: [{ r: 1, c: 1, color: 'red' }],
        colorGates: [{ r: 1, c: 2, color: 'red' }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 6, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 10, color: '#2a7b4c' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[0,1],[0,2],[1,2]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3],[1,3],[0,3]] }
      },
      {
        name: 'Định Hướng 2: Mũi Tên Ép Lối',
        size: 4,
        arrows: [{ r: 1, c: 0, dir: 'RIGHT' }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[2,1],[2,0],[3,0],[3,1],[3,2]], B: [[3,3],[2,3],[2,2],[1,2],[1,3],[0,3],[0,2],[0,1]] }
      },
      {
        name: 'Định Hướng 3: Mũi Tên + Cổng Màu',
        size: 4,
        arrows: [{ r: 1, c: 0, dir: 'RIGHT' }],
        prisms: [{ r: 1, c: 1, color: 'green' }],
        colorGates: [{ r: 2, c: 1, color: 'green' }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[2,1],[2,0],[3,0],[3,1],[3,2]], B: [[3,3],[2,3],[2,2],[1,2],[1,3],[0,3],[0,2],[0,1]] }
      }
    ]
  },
  {
    id: 'mat-ma-so',
    title: 'Mật Mã Số',
    icon: '🔢',
    mechanic: 'MEC-03',
    desc: 'Chạm các mốc số theo ĐÚNG thứ tự tăng dần, kết thúc đúng tại mốc cuối cùng.',
    levels: [
      {
        name: 'Mật Mã 1: Ba Mốc Cơ Bản',
        size: 4,
        waypoints: { A: [{ r: 0, c: 3 }, { r: 3, c: 3 }, { r: 3, c: 0 }] },
        anchors: [{ id: 'A', row: 0, col: 0, length: 10, color: '#1b5e8a' }],
        solution: { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[2,3],[3,3],[3,2],[3,1],[3,0]] }
      },
      {
        name: 'Mật Mã 2: Vòng Xoáy Trung Tâm (1→5)',
        size: 5,
        waypoints: {
          A: [
            { r: 3, c: 4 }, { r: 0, c: 3 }, { r: 0, c: 0 }, { r: 4, c: 1 }, { r: 3, c: 3 }
          ]
        },
        anchors: [{ id: 'A', row: 2, col: 2, length: 25, color: '#1b5e8a' }],
        solution: { A: [[2,2],[3,2],[4,2],[4,3],[4,4],[3,4],[2,4],[1,4],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[3,1],[2,1],[1,1],[1,2],[1,3],[2,3],[3,3]] }
      },
      {
        name: 'Mật Mã 3: Huyền Thoại 6x6 (1→7)',
        size: 6,
        waypoints: {
          A: [
            { r: 5, c: 0 }, { r: 5, c: 5 }, { r: 0, c: 5 }, { r: 0, c: 0 },
            { r: 1, c: 4 }, { r: 4, c: 1 }, { r: 3, c: 3 }
          ]
        },
        anchors: [{ id: 'A', row: 2, col: 2, length: 35, color: '#2a7b4c' }],
        solution: { A: [[2,2],[2,1],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[4,5],[3,5],[2,5],[1,5],[0,5],[0,4],[0,3],[0,2],[0,1],[0,0],[1,0],[1,1],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[4,1],[3,1],[3,2],[3,3]] }
      }
    ]
  },
  {
    id: 'cong-tac',
    title: 'Công Tắc',
    icon: '🔘',
    mechanic: 'MEC-04',
    desc: 'Giữ 1 dây trên Công Tắc để mở Cổng cho dây khác; Latch giữ Cổng mở vĩnh viễn sau 1 lần kích hoạt.',
    levels: [
      {
        name: 'Công Tắc 1: Mở Khoá Cơ Bản',
        size: 4,
        switches: [{ r: 0, c: 3, gateR: 2, gateC: 2 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 7, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 0, length: 9, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[2,2]], B: [[3,0],[2,0],[1,0],[1,1],[2,1],[3,1],[3,2],[3,3],[2,3]] }
      },
      {
        name: 'Công Tắc 2: Chốt Khoá Vĩnh Viễn',
        size: 4,
        switches: [{ r: 1, c: 0, gateR: 2, gateC: 0, latch: true }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 7, color: '#2a7b4c' }
        ],
        solution: { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1],[0,1]], B: [[3,3],[2,3],[1,3],[0,3],[0,2],[1,2],[2,2]] }
      },
      {
        name: 'Công Tắc 3: Song Song Hai Cổng',
        size: 4,
        switches: [
          { r: 3, c: 0, gateR: 2, gateC: 1 },
          { r: 0, c: 3, gateR: 1, gateC: 2 }
        ],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[1,0],[2,0],[3,0],[3,1],[2,1],[1,1],[0,1]], B: [[3,3],[2,3],[1,3],[0,3],[0,2],[1,2],[2,2],[3,2]] }
      }
    ]
  },
  {
    id: 'bom-tinh',
    title: 'Bom Tĩnh',
    icon: '💣',
    mechanic: 'MEC-05',
    desc: 'Chạm trực tiếp vào Bom = thua ngay. Chỉ phá được Bom bằng cách đẩy Push Rock va vào.',
    levels: [
      {
        name: 'Bom Tĩnh 1: Phá Bom Đầu Tiên',
        size: 4,
        pushRocks: [{ r: 1, c: 2 }],
        bombs: [{ r: 1, c: 3 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#2a7b4c' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[1,2],[1,3],[0,3],[0,2],[0,1]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[2,1],[2,2],[2,3]] }
      },
      {
        name: 'Bom Tĩnh 2: Song Song Hai Quả Bom',
        size: 4,
        pushRocks: [{ r: 1, c: 1 }, { r: 2, c: 2 }],
        bombs: [{ r: 1, c: 0 }, { r: 2, c: 3 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 8, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[0,1],[0,2],[1,2],[1,1],[1,0],[2,0],[3,0]], B: [[3,3],[3,2],[3,1],[2,1],[2,2],[2,3],[1,3],[0,3]] }
      },
      {
        name: 'Bom Tĩnh 3: Đá Giả — Đá Thật',
        size: 4,
        rocks: [{ r: 0, c: 1 }],
        pushRocks: [{ r: 2, c: 1 }],
        bombs: [{ r: 2, c: 0 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 5, color: '#2a7b4c' }
        ],
        solution: { A: [[0,0],[1,0],[1,1],[1,2],[2,2],[2,1],[2,0],[3,0]], B: [[3,3],[2,3],[1,3],[0,3],[0,2]] }
      }
    ]
  },
  {
    id: 'tong-hop',
    title: 'Tổng Hợp',
    icon: '⚔️',
    mechanic: 'COMBO',
    desc: 'Thử thách khó nhất — kết hợp 2-3 cơ chế lõi trong cùng 1 màn.',
    levels: [
      {
        name: 'Tổng Hợp 1: Công Tắc + Đẩy Đá',
        size: 4,
        switches: [{ r: 0, c: 3, gateR: 1, gateC: 1 }],
        pushRocks: [{ r: 2, c: 1 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 9, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 2, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[2,1],[2,2]], B: [[3,3],[2,3]] }
      },
      {
        name: 'Tổng Hợp 2: Cổng Màu + Mật Mã Số',
        size: 4,
        prisms: [{ r: 0, c: 2, color: 'blue' }],
        colorGates: [{ r: 2, c: 2, color: 'blue' }],
        waypoints: { A: [{ r: 0, c: 2 }, { r: 2, c: 2 }, { r: 3, c: 0 }] },
        anchors: [{ id: 'A', row: 0, col: 0, length: 8, color: '#1b5e8a' }],
        solution: { A: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[3,0]] }
      },
      {
        name: 'Tổng Hợp 3: Công Tắc + Đẩy Đá + Bom',
        size: 4,
        switches: [{ r: 0, c: 3, gateR: 1, gateC: 2 }],
        pushRocks: [{ r: 2, c: 2 }],
        bombs: [{ r: 2, c: 3 }],
        anchors: [
          { id: 'A', row: 0, col: 0, length: 10, color: '#1b5e8a' },
          { id: 'B', row: 3, col: 3, length: 6, color: '#a82e2e' }
        ],
        solution: { A: [[0,0],[0,1],[0,2],[0,3],[1,3],[1,2],[1,1],[2,1],[2,2],[2,3]], B: [[3,3],[3,2],[3,1],[3,0],[2,0],[1,0]] }
      }
    ]
  }
];

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
