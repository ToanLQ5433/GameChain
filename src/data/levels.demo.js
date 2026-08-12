// Bộ 18 màn thiết kế riêng cho bản demo (nguồn: Levels/*.json, xuất từ Unity).
// Sinh tự động bởi scratchpad/convert-demo-levels.mjs — KHÔNG sửa tay,
// sửa ở Levels/*.json rồi chạy lại script để tránh lệch nguồn.
export const CATEGORIES = [
  {
    "id": "demo",
    "icon": "🏴‍☠️",
    "title": "Demo Levels",
    "tag": "DEMO",
    "desc": "18 màn được thiết kế riêng để giới thiệu bản demo Pirate Trails.",
    "levels": [
      {
        "tier": "demo",
        "rows": 3,
        "cols": 3,
        "name": "Demo 1: Level0",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#303fd1"
          }
        ],
        "shape": [
          "111",
          "111",
          "111"
        ]
      },
      {
        "tier": "demo",
        "rows": 3,
        "cols": 3,
        "name": "Demo 2: Level1",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 4,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 3,
            "color": "#ca2326"
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 3,
        "cols": 4,
        "name": "Demo 3: Level2",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 6,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 4,
            "color": "#ca2326"
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 4,
        "name": "Demo 4: Level 3",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 7,
            "color": "#ca2326"
          }
        ],
        "shape": [
          "1111",
          "1111",
          "1111",
          "1111"
        ],
        "walls": [
          {
            "r1": 1,
            "c1": 2,
            "r2": 1,
            "c2": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 4,
        "name": "Demo 5: Level 4",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 5,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 3,
            "color": "#f2e655"
          },
          {
            "id": "C",
            "row": 3,
            "col": 0,
            "length": 4,
            "color": "#ca2326"
          }
        ],
        "shape": [
          "1111",
          "1111",
          "1111",
          "1110"
        ],
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 0,
            "c2": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 5,
        "name": "Demo 6: Level 5",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 7,
            "color": "#ca2326"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 4,
            "color": "#f2e655"
          }
        ],
        "shape": [
          "11111",
          "11111",
          "11111",
          "11111"
        ],
        "walls": [
          {
            "r1": 0,
            "c1": 1,
            "r2": 0,
            "c2": 2
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 3,
        "cols": 3,
        "name": "Demo 7: Level 6",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#303fd1"
          }
        ],
        "shape": [
          "111",
          "111",
          "111"
        ],
        "rocks": [
          {
            "r": 1,
            "c": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 3,
        "cols": 4,
        "name": "Demo 8: Level 7",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 5,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 4,
            "color": "#ca2326"
          }
        ],
        "shape": [
          "1111",
          "1111",
          "1111"
        ],
        "rocks": [
          {
            "r": 1,
            "c": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 5,
        "cols": 4,
        "name": "Demo 9: Level 8",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 11,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 5,
            "color": "#ca2326"
          }
        ],
        "rocks": [
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 4,
            "c": 3
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 2,
        "cols": 4,
        "name": "Demo 10: Level 9",
        "note": "Cơ chế: Thùng Hàng.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 5,
            "color": "#303fd1"
          }
        ],
        "shape": [
          "1110",
          "1111"
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 4,
        "name": "Demo 11: Level 10",
        "note": "Cơ chế: Thùng Hàng.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 1,
            "length": 7,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 6,
            "color": "#ca2326"
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 1
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 5,
        "name": "Demo 12: Level 11",
        "note": "Cơ chế: Xác Tàu Đắm, Thùng Hàng.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 8,
            "color": "#ca2326"
          }
        ],
        "walls": [
          {
            "r1": 0,
            "c1": 1,
            "r2": 0,
            "c2": 2
          },
          {
            "r1": 1,
            "c1": 1,
            "r2": 1,
            "c2": 2
          }
        ],
        "pushRocks": [
          {
            "r": 2,
            "c": 4
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 3,
        "cols": 3,
        "name": "Demo 13: Level 12",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#303fd1"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 2
            }
          ]
        }
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 4,
        "name": "Demo 14: Level 13",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 15,
            "color": "#303fd1"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 1
            }
          ]
        }
      },
      {
        "tier": "demo",
        "rows": 4,
        "cols": 5,
        "name": "Demo 15: Level 14",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 19,
            "color": "#303fd1"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 3,
              "c": 4
            }
          ]
        }
      },
      {
        "tier": "demo",
        "rows": 2,
        "cols": 3,
        "name": "Demo 16: Level 15",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 5,
            "color": "#303fd1"
          }
        ],
        "switches": [
          {
            "r": 1,
            "c": 0,
            "gateR": 1,
            "gateC": 1,
            "latch": true
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 6,
        "cols": 4,
        "name": "Demo 17: Level 16",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 9,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 5,
            "col": 3,
            "length": 13,
            "color": "#ca2326"
          }
        ],
        "switches": [
          {
            "r": 4,
            "c": 3,
            "gateR": 4,
            "gateC": 1,
            "latch": true
          }
        ]
      },
      {
        "tier": "demo",
        "rows": 7,
        "cols": 7,
        "name": "Demo 18: Level 17",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 2,
            "length": 11,
            "color": "#303fd1"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 11,
            "color": "#ca2326"
          }
        ],
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "switches": [
          {
            "r": 2,
            "c": 3,
            "gateR": 2,
            "gateC": 1,
            "latch": true
          }
        ]
      }
    ]
  }
];

export function getCategory(id) {
  return CATEGORIES.find(c => c.id === id);
}

export function getLevel(catId, index) {
  const cat = getCategory(catId);
  return cat ? cat.levels[index] : null;
}
