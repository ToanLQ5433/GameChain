// File này được sinh tự động bởi scripts/gen-levels-demo.mjs — KHÔNG sửa
// tay. Dùng đúng cơ chế Hamiltonian path của scripts/gen-levels.mjs nên LUÔN
// phủ kín 100% ô khả dụng và LUÔN có trường `solution` hợp lệ (dùng cho Hint
// / tutorial auto-draw). Chỉ dùng cho build offline single-file (xem
// vite.offline.config.js) — `npm run dev`/`npm run build` vẫn dùng
// src/data/levels.js (42 màn đầy đủ) như bình thường.

export const CATEGORIES = [
  {
    "id": "demo",
    "title": "Demo",
    "icon": "🧭",
    "mechanic": "DEMO",
    "desc": "Offline single-file demo pack — teaches each core mechanic in a short sequence.",
    "levels": [
      {
        "tier": "demo",
        "name": "Demo 1: Level0",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "rows": 3,
        "cols": 3,
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 9,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              1,
              2
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 2: Level1",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "rows": 3,
        "cols": 3,
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 5,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 4,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              2
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              2,
              1
            ],
            [
              2,
              0
            ]
          ],
          "B": [
            [
              1,
              0
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 3: Level2",
        "note": "Bàn cờ trống — chỉ luyện quy hoạch đường đi.",
        "rows": 3,
        "cols": 4,
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 4,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 8,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ]
          ],
          "B": [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              2,
              3
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 4: Level 3",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "rows": 4,
        "cols": 4,
        "walls": [
          {
            "r1": 2,
            "c1": 2,
            "r2": 3,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 9,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              3
            ],
            [
              3,
              2
            ],
            [
              3,
              1
            ],
            [
              3,
              0
            ],
            [
              2,
              0
            ],
            [
              1,
              0
            ],
            [
              0,
              0
            ]
          ],
          "B": [
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              1,
              2
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 5: Level 4",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "rows": 4,
        "cols": 4,
        "walls": [
          {
            "r1": 2,
            "c1": 1,
            "r2": 2,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 0,
            "length": 3,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 8,
            "color": "#f2657f"
          },
          {
            "id": "C",
            "row": 3,
            "col": 1,
            "length": 5,
            "color": "#3ecf8e"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              1
            ]
          ],
          "B": [
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              1,
              3
            ],
            [
              1,
              2
            ],
            [
              1,
              1
            ],
            [
              2,
              1
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ]
          ],
          "C": [
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              2,
              3
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 6: Level 5",
        "note": "Cơ chế: Xác Tàu Đắm.",
        "rows": 4,
        "cols": 5,
        "walls": [
          {
            "r1": 3,
            "c1": 1,
            "r2": 3,
            "c2": 2
          },
          {
            "r1": 1,
            "c1": 4,
            "r2": 2,
            "c2": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 7,
            "color": "#f2657f"
          },
          {
            "id": "C",
            "row": 1,
            "col": 2,
            "length": 7,
            "color": "#3ecf8e"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              2,
              1
            ]
          ],
          "B": [
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              1,
              4
            ],
            [
              1,
              3
            ]
          ],
          "C": [
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ],
            [
              2,
              4
            ],
            [
              2,
              3
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 7: Level 6",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "rows": 3,
        "cols": 3,
        "rocks": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 8,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              2
            ],
            [
              1,
              2
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 8: Level 7",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "rows": 3,
        "cols": 4,
        "rocks": [
          {
            "r": 2,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 3,
            "length": 7,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 4,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              3
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ]
          ],
          "B": [
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              2,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 9: Level 8",
        "note": "Cơ chế: Rạn Đá Ngầm.",
        "rows": 5,
        "cols": 4,
        "rocks": [
          {
            "r": 4,
            "c": 0
          },
          {
            "r": 0,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 3,
            "length": 11,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 7,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              3
            ],
            [
              3,
              3
            ],
            [
              2,
              3
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              1,
              2
            ],
            [
              1,
              1
            ],
            [
              2,
              1
            ],
            [
              2,
              2
            ],
            [
              3,
              2
            ]
          ],
          "B": [
            [
              4,
              2
            ],
            [
              4,
              1
            ],
            [
              3,
              1
            ],
            [
              3,
              0
            ],
            [
              2,
              0
            ],
            [
              1,
              0
            ],
            [
              0,
              0
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 10: Level 9",
        "note": "Cơ chế: Thùng Hàng.",
        "rows": 5,
        "cols": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 24,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              3
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              1,
              4
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              3,
              2
            ],
            [
              3,
              1
            ],
            [
              2,
              1
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              4,
              2
            ],
            [
              4,
              3
            ],
            [
              4,
              4
            ],
            [
              3,
              4
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 11: Level 10",
        "note": "Cơ chế: Thùng Hàng.",
        "rows": 5,
        "cols": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 12,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 12,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
            ],
            [
              2,
              1
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              4,
              2
            ],
            [
              4,
              3
            ],
            [
              4,
              4
            ],
            [
              3,
              4
            ],
            [
              2,
              4
            ],
            [
              1,
              4
            ]
          ],
          "B": [
            [
              0,
              4
            ],
            [
              0,
              3
            ],
            [
              1,
              3
            ],
            [
              2,
              3
            ],
            [
              3,
              3
            ],
            [
              3,
              2
            ],
            [
              2,
              2
            ],
            [
              1,
              2
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 12: Level 11",
        "note": "Cơ chế: Xác Tàu Đắm, Thùng Hàng.",
        "rows": 5,
        "cols": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 13,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 11,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              3
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              3,
              4
            ],
            [
              4,
              4
            ],
            [
              4,
              3
            ],
            [
              4,
              2
            ],
            [
              3,
              2
            ],
            [
              2,
              2
            ],
            [
              1,
              2
            ],
            [
              1,
              1
            ],
            [
              2,
              1
            ],
            [
              3,
              1
            ]
          ],
          "B": [
            [
              4,
              1
            ],
            [
              4,
              0
            ],
            [
              3,
              0
            ],
            [
              2,
              0
            ],
            [
              1,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              0,
              4
            ],
            [
              1,
              4
            ]
          ]
        },
        "walls": [
          {
            "r1": 3,
            "c1": 3,
            "r2": 3,
            "c2": 4
          }
        ]
      },
      {
        "tier": "demo",
        "name": "Demo 13: Level 12",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "rows": 3,
        "cols": 3,
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 0
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 9,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              2
            ],
            [
              2,
              1
            ],
            [
              2,
              0
            ],
            [
              1,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              1,
              2
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 14: Level 13",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "rows": 4,
        "cols": 4,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 1,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 1,
            "length": 16,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              1
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ],
            [
              2,
              3
            ],
            [
              2,
              2
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 15: Level 14",
        "note": "Cơ chế: Phao Tiêu Hải Trình.",
        "rows": 4,
        "cols": 5,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 0,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 20,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              3
            ],
            [
              1,
              4
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              3,
              4
            ],
            [
              3,
              3
            ],
            [
              3,
              2
            ],
            [
              3,
              1
            ],
            [
              3,
              0
            ],
            [
              2,
              0
            ],
            [
              2,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              1
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 16: Level 15",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "rows": 2,
        "cols": 3,
        "switches": [
          {
            "r": 0,
            "c": 1,
            "gateR": 1,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 0,
            "length": 6,
            "color": "#4a90f2"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              0
            ],
            [
              0,
              0
            ],
            [
              0,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              0,
              2
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 17: Level 16",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "rows": 6,
        "cols": 4,
        "switches": [
          {
            "r": 3,
            "c": 0,
            "gateR": 2,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 11,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 13,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              4,
              0
            ],
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              4,
              1
            ],
            [
              3,
              1
            ],
            [
              2,
              1
            ],
            [
              1,
              1
            ]
          ],
          "B": [
            [
              0,
              1
            ],
            [
              0,
              2
            ],
            [
              0,
              3
            ],
            [
              1,
              3
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              3
            ],
            [
              3,
              2
            ],
            [
              4,
              2
            ],
            [
              4,
              3
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ]
          ]
        }
      },
      {
        "tier": "demo",
        "name": "Demo 18: Level 17",
        "note": "Cơ chế: Khóa Mỏ Neo.",
        "rows": 7,
        "cols": 7,
        "switches": [
          {
            "r": 1,
            "c": 0,
            "gateR": 3,
            "gateC": 5,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 22,
            "color": "#4a90f2"
          },
          {
            "id": "B",
            "row": 1,
            "col": 5,
            "length": 27,
            "color": "#f2657f"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ],
            [
              0,
              2
            ],
            [
              0,
              1
            ],
            [
              0,
              0
            ],
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              0
            ],
            [
              4,
              0
            ],
            [
              5,
              0
            ],
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              5,
              1
            ],
            [
              4,
              1
            ],
            [
              3,
              1
            ],
            [
              2,
              1
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ],
            [
              1,
              3
            ],
            [
              1,
              4
            ]
          ],
          "B": [
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              2,
              6
            ],
            [
              3,
              6
            ],
            [
              4,
              6
            ],
            [
              5,
              6
            ],
            [
              6,
              6
            ],
            [
              6,
              5
            ],
            [
              6,
              4
            ],
            [
              6,
              3
            ],
            [
              6,
              2
            ],
            [
              5,
              2
            ],
            [
              4,
              2
            ],
            [
              3,
              2
            ],
            [
              2,
              2
            ],
            [
              2,
              3
            ],
            [
              3,
              3
            ],
            [
              4,
              3
            ],
            [
              5,
              3
            ],
            [
              5,
              4
            ],
            [
              5,
              5
            ],
            [
              4,
              5
            ],
            [
              4,
              4
            ],
            [
              3,
              4
            ],
            [
              3,
              5
            ],
            [
              2,
              5
            ],
            [
              2,
              4
            ]
          ]
        }
      }
    ]
  }
];

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
