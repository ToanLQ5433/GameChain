// File tự động cập nhật 42 màn chuẩn tâm lý học IQ cao
export const CATEGORIES = [
  {
    "id": "core",
    "icon": "🧭",
    "title": "Basics",
    "tag": "CORE",
    "desc": "Bàn cờ tinh gọn, tập trung vào tư duy quy hoạch không gian & bẫy trực giác (Shell vs Core).",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 3,
        "name": "Basics 1: S-Curve Flow 3x3",
        "note": "1 dây duy nhất: Uốn lượn chữ S phủ kín 9 ô cờ.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 8,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 4,
          "psychologyTag": "DELAYED TRAP",
          "mechanicDensity": "0%"
        },
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
              2
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 3,
        "cols": 3,
        "name": "Basics 2: Dual Split 3x3",
        "note": "Hai xích A (5 ô) và B (4 ô): Chia đôi lãnh thổ theo đường ziczac.",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 5,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 4,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 4,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 5,
          "psychologyTag": "DELAYED TRAP",
          "mechanicDensity": "0%"
        },
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 3,
        "cols": 4,
        "name": "Basics 3: Shell & Core 3x4",
        "note": "Bẫy tham lam: Đỏ sát góc trái nhưng nếu kéo sang trái sẽ cụt đường Xanh (7 ô). Xanh phải đi bao viền ngoài.",
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 5,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "0%"
        },
        "solution": {
          "A": [
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
              2,
              0
            ]
          ],
          "B": [
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
              2,
              2
            ],
            [
              2,
              3
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Basics 4: Spiral Trap 4x4",
        "note": "Bẫy xoắn ốc: Dây A đi bao viền 8 ô nhường trọn lõi trung tâm cho Dây B cuộn chữ U.",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 1,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 5,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 7.5,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "6%"
        },
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
            ],
            [
              2,
              2
            ],
            [
              1,
              2
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
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 4,
        "shape": [
          "1111",
          "1111",
          "1111",
          "1110"
        ],
        "name": "Basics 5: Tri-Shell Lock 4x4",
        "note": "Tam giác lệch trục U=2: 1 vách ngăn duy nhất chẻ đôi ngã ba trung tâm — độ dài 3 dây lệch nhau (6-5-4) buộc mỗi dây nhường đúng phần lãnh thổ của mình, chỉ còn 2 cách chia.",
        "walls": [
          {
            "r1": 0,
            "c1": 1,
            "r2": 1,
            "c2": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 3,
            "length": 4,
            "color": "#2a7b4c"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "6%"
        },
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
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
              3,
              1
            ],
            [
              3,
              2
            ]
          ],
          "C": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Basics 6: Triple Citadel 4x5",
        "note": "Thành lũy tam giác U=1: 1 vách ngăn mỏng ở hàng trên cùng khóa chết mọi lối vòng phụ — cả 3 dây (7-8-5) chỉ còn đúng 1 cách khớp nối vừa khít toàn bộ 20 ô.",
        "walls": [
          {
            "r1": 0,
            "c1": 1,
            "r2": 0,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 5,
            "color": "#2a7b4c"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "5%"
        },
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              1,
              3
            ],
            [
              1,
              2
            ],
            [
              0,
              2
            ]
          ],
          "C": [
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
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "vat-can",
    "icon": "🪨",
    "title": "Obstacles",
    "tag": "MEC-01",
    "desc": "Vật cản (Đá, Vách, Thùng Sokoban) nằm ở yết hầu — Ép buộc đẩy thùng mở đường độc đạo.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Obstacles 1: Center Rock 3x4",
        "note": "Đá cản trung tâm: Hai xích uốn vòng qua 2 phía cản.",
        "rocks": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 5,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 3,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 4,
          "psychologyTag": "INTUITIVE",
          "mechanicDensity": "8%"
        },
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 2: Mandatory Push 4x4",
        "note": "Vách ngăn chặn lối ngang + Thùng gỗ chặn lối xuống: Bắt buộc Dây A phải đẩy thùng xuống `[2,1]` mới mở ngã tư!",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 1,
            "c2": 2
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 1,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 10,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "13%"
        },
        "solution": {
          "A": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 3: Crate Shove 4x4",
        "note": "Golden Path #2: Dây A (Neo 10) phải dùng bước đầu đẩy thùng xuống `[2,1]` dọn đường cho Dây B (Neo 5) tiến vào góc.",
        "pushRocks": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 5,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 18,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "6%"
        },
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
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 4: Dual Crate Relay 4x4",
        "note": "Hai thùng Sokoban: Dây A đẩy thùng 1 mở đường cho B; Dây B đẩy thùng 2 mở đường ngược lại cho A.",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 2
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 1
          },
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 8,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 4,
          "psychologyTag": "DELAYED TRAP",
          "mechanicDensity": "19%"
        },
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
              3,
              2
            ],
            [
              2,
              2
            ]
          ],
          "B": [
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
              0,
              1
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Obstacles 5: Corridor Lock 4x5",
        "note": "Khóa hành lang U=2: Vách ngăn dọc cột phải buộc Dây B phải đẩy thùng lên trên trước khi vòng lại — chỉ còn 2 cách so găng phần lãnh thổ còn lại với Dây A.",
        "walls": [
          {
            "r1": 1,
            "c1": 3,
            "r2": 2,
            "c2": 3
          }
        ],
        "pushRocks": [
          {
            "r": 2,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "10%"
        },
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
              4
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Obstacles 6: Two-Phase Push 4x5",
        "note": "Đẩy thùng 2 nhịp U=1: Hai vách ngăn xếp chồng ở góc trên trái tạo 1 khe hẹp duy nhất — Dây A phải luồn qua khe rồi Dây B đẩy thùng dọn nốt góc chết, khớp vừa khít toàn bàn.",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 1,
            "c2": 2
          },
          {
            "r1": 0,
            "c1": 1,
            "r2": 0,
            "c2": 2
          }
        ],
        "pushRocks": [
          {
            "r": 2,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "15%"
        },
        "solution": {
          "A": [
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
              0,
              2
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
            ],
            [
              1,
              3
            ],
            [
              2,
              3
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "dinh-huong-mau",
    "icon": "🎨",
    "title": "Direction & Color",
    "tag": "MEC-02",
    "desc": "Mũi tên ép rẽ hướng, Lăng kính nhuộm màu xích, Cổng màu lọc điều kiện qua cửa.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Direction 1: Forced Turn 3x4",
        "note": "1 Mũi tên ép rẽ xuống: Khi Dây A bước vào `[0,1]`, mũi tên ép bước tiếp theo bắt buộc đi xuống `[1,1]`.",
        "arrows": [
          {
            "r": 0,
            "c": 1,
            "dir": "DOWN"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 10,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
            ]
          ],
          "B": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 4,
        "cols": 4,
        "name": "Direction 2: Prism Gate 4x4",
        "note": "Lăng kính & Cổng màu Đỏ: Dây A đổi từ Xanh sang Đỏ tại `[1,1]` rồi lọt qua Cổng Đỏ `[1,2]`.",
        "prisms": [
          {
            "r": 1,
            "c": 1,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 2,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 18,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "13%"
        },
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
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Direction 3: Distant Dye 4x4",
        "note": "Bẫy cổng ngay trước Neo: Cổng Đỏ ở `[0,1]` ngay cạnh Neo A. A phải đi xuống đáy map lấy màu rồi mới quay lại vào cổng!",
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 1,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 4,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 7.5,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "13%"
        },
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
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
              2,
              2
            ],
            [
              3,
              2
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 5,
        "name": "Direction 4: Dual Currents 4x5",
        "note": "Hai mũi tên đối đầu: Ép luồng di chuyển của 2 dây uốn thành 2 vòng xoáy đối ứng khép kín.",
        "arrows": [
          {
            "r": 0,
            "c": 1,
            "dir": "DOWN"
          },
          {
            "r": 3,
            "c": 3,
            "dir": "UP"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 20,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
            ],
            [
              3,
              2
            ],
            [
              3,
              3
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Direction 5: Color Intersect 4x5",
        "note": "Giao thoa 2 màu U=2: Lăng kính & Cổng đổi vị trí chéo góc — Dây A phải vòng xuống góc trái lấy màu Đỏ trước khi tới Cổng trên; Dây B tương tự với Lăng kính Lục ở đáy. Chỉ còn 2 cách bắt cặp.",
        "prisms": [
          {
            "r": 2,
            "c": 0,
            "color": "red"
          },
          {
            "r": 3,
            "c": 3,
            "color": "teal"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 3,
            "color": "red"
          },
          {
            "r": 3,
            "c": 2,
            "color": "teal"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "20%"
        },
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
              2
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Direction 6: Polar Transit 4x5",
        "note": "Hải trình xuyên cực U=1: Mũi tên ép hướng đặt ngay ô đích cuối cùng — chạm sớm là kẹt cứng, phải nhuộm màu qua Lăng kính rồi vượt Cổng ở giữa bàn mới an toàn. Chỉ đúng 1 lộ trình sống sót.",
        "arrows": [
          {
            "r": 0,
            "c": 2,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 1,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "10%"
        },
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
              2,
              1
            ]
          ],
          "B": [
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
              0,
              1
            ],
            [
              0,
              2
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "mat-ma-so",
    "icon": "🔢",
    "title": "Number Code",
    "tag": "MEC-03",
    "desc": "Chạm các mốc số theo thứ tự tăng dần (1 -> 2 -> 3), kết thúc đúng ở mốc cuối cùng và phủ kín bàn cờ.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 3,
        "name": "Code 1: Straight Sequence 3x3",
        "note": "Nối mốc 1 -> 2: Đường đi uốn chữ S từ Neo qua Mốc 1 rồi Mốc 2.",
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
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
              2
            ],
            [
              1,
              2
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Code 2: Triangle Path 3x4",
        "note": "Ba mốc thứ tự 1-2-3 tạo thành tam giác độc đạo U=1 trên bàn cờ 3x4.",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 12,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "0%"
        },
        "solution": {
          "A": [
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
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Code 3: Short Distance Trap 4x4",
        "note": "Golden Path #3 (Bẫy khoảng cách ngắn): Mốc 1 và Mốc 2 sát rạt nhau. Nếu đi trực tiếp sẽ bỏ rơi 13 ô! Phải đi vòng 14 ô trước.",
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
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 16,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 8,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Code 4: Four Corner Wave 4x4",
        "note": "4 mốc ở 4 góc: Buộc đường đi uốn lượn ziczac qua toàn bộ 16 ô cờ.",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 2,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 16,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 4,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 7.5,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Code 5: Triple Apex 4x5",
        "note": "3 mốc lệch tâm U=2: Mốc 1 nằm sâu trong lõi buộc phải quét trọn nửa trên bàn cờ trước khi chạm, chỉ còn 2 cách quy hoạch quỹ đạo phủ kín 20 ô.",
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
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 20,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "0%"
        },
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
              2,
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
              2,
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
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Code 6: Ultimate 2-Stop 4x5",
        "note": "Cực hạn 19 ô U=1: 1 tảng đá án ngữ ngay lối tắt giữa Mốc 1 và Mốc 2 — buộc phải đi vòng trọn vẹn hết nửa bàn cờ trước khi được chạm Mốc 2. Chỉ đúng 1 đường sống duy nhất.",
        "rocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 2,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 19,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "5%"
        },
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
              2,
              2
            ],
            [
              2,
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
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "cong-tac",
    "icon": "🔘",
    "title": "Switches",
    "tag": "MEC-04",
    "desc": "Đè công tắc mở cổng cho dây khác; Chìa Latch vàng giữ cổng mở vĩnh viễn sau 1 lần chạm.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Switches 1: Pressure Gate 3x4",
        "note": "Giữ công tắc: Dây A kéo đè lên Switch `[1,1]` mở Cổng `[1,2]` cho Dây B đi qua.",
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 1,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 10,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "17%"
        },
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
            ]
          ],
          "B": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 4,
        "cols": 4,
        "name": "Switches 2: Golden Latch 4x4",
        "note": "Latch vàng mở vĩnh viễn: Dây A lướt qua Chìa vàng `[1,1]` mở Cổng `[1,2]` rồi tự do đi tiếp.",
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 1,
            "gateC": 2,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 20,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "13%"
        },
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
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Switches 3: Anchor Hold 4x4",
        "note": "Nghịch lý hy sinh: Dây B phải uốn kéo đuôi nằm im trên Switch `[2,1]` để Dây A đi qua Cổng `[0,2]`.",
        "switches": [
          {
            "r": 2,
            "c": 1,
            "gateR": 0,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 6,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "13%"
        },
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
              2
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
              2,
              3
            ],
            [
              3,
              3
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 5,
        "name": "Switches 4: Dual Chambers 4x5",
        "note": "Hai phòng đối xứng: Dây A mở Cổng 1 cho B; Dây B đứng đè Switch 2 mở Cổng 2 cho A.",
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 1,
            "gateC": 3,
            "latch": true
          },
          {
            "r": 2,
            "c": 3,
            "gateR": 2,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 19,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "20%"
        },
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
              2,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Switches 5: Cascade Relays 4x5",
        "note": "Mở khóa dây chuyền U=2: Mỗi dây tự đè Chìa của chính mình ngay trên lộ trình để mở Cổng cho dây kế — thứ tự A rồi B rồi C chỉ còn 2 cách chia lãnh thổ hợp lệ.",
        "switches": [
          {
            "r": 1,
            "c": 4,
            "gateR": 0,
            "gateC": 2,
            "latch": true
          },
          {
            "r": 0,
            "c": 1,
            "gateR": 1,
            "gateC": 3,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 6,
            "color": "#2a7b4c"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "20%"
        },
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              1,
              3
            ],
            [
              1,
              2
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Switches 6: Chicken & Egg 4x5",
        "note": "Nghịch lý Con Gà & Quả Trứng U=1: Cả 2 Chìa vàng đều nằm trên chính lộ trình của dây sở hữu — nhưng Cổng lại khóa NGAY lối đi của dây còn lại, buộc thứ tự chạm-mở phải tuyệt đối chính xác. Chỉ đúng 1 cách.",
        "switches": [
          {
            "r": 2,
            "c": 4,
            "gateR": 0,
            "gateC": 1,
            "latch": true
          },
          {
            "r": 2,
            "c": 3,
            "gateR": 3,
            "gateC": 0,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "20%"
        },
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
            ]
          ],
          "B": [
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
              1,
              3
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
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "bom-tinh",
    "icon": "💣",
    "title": "Static Bombs",
    "tag": "MEC-05",
    "desc": "Chạm trực tiếp vào Bom là THUA NGAY. Cách duy nhất để phá Bom là đẩy thùng gỗ đâm nổ Bom.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Bombs 1: Straight Blast 3x4",
        "note": "Phá bom cơ bản: Dây A xuất phát đẩy thùng đâm nổ quả bom ở `[0,2]`.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 10,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 4,
          "psychologyTag": "DELAYED TRAP",
          "mechanicDensity": "17%"
        },
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 4,
        "cols": 4,
        "name": "Bombs 2: Dual Demolition 4x4",
        "note": "Dọn 2 quả bom: Hai dây độc lập đẩy 2 thùng phá 2 bom ở 2 góc.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          },
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 13,
          "isUnique": false,
          "greedyTrapped": false,
          "iqScore": 4,
          "psychologyTag": "DELAYED TRAP",
          "mechanicDensity": "25%"
        },
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              2,
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Bombs 3: Decoy Minefield 4x4",
        "note": "Bẫy bom mồi: 1 quả bom ở góc chết `[3,0]` không có thùng nào để phá. Phải nhận biết đây là vùng cấm để né xa ra.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 3,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 10,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "19%"
        },
        "solution": {
          "A": [
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
              3,
              1
            ],
            [
              3,
              2
            ]
          ],
          "B": [
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
              2,
              2
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 5,
        "name": "Bombs 4: Reverse Thrust 4x5",
        "note": "Đẩy thùng LÊN TRÊN: Bom ở phía trên `[1,1]`, Thùng ở `[2,1]`. Dây A xuất phát từ dưới đẩy thùng hướng lên trên đâm vào bom.",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 20,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "10%"
        },
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
            ]
          ],
          "B": [
            [
              0,
              4
            ],
            [
              1,
              4
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
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Bombs 5: Crossfire Mines 4x5",
        "note": "Giao lộ sinh tử U=2: 2 thùng ở 2 nửa bàn cờ, mỗi dây phá đúng 1 bom trên lộ trình riêng của mình — chỉ còn 2 cách bọc viền hợp lệ sau khi cả 2 bom đã bị dọn sạch.",
        "pushRocks": [
          {
            "r": 1,
            "c": 3
          },
          {
            "r": 2,
            "c": 4
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 1,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "20%"
        },
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
              2,
              3
            ],
            [
              1,
              3
            ],
            [
              1,
              2
            ]
          ],
          "B": [
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
              1,
              1
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Bombs 6: L-Curved Blast 4x5",
        "note": "Bãi mìn góc chết U=1: 1 vách ngăn mỏng cô lập góc trên trái — chỉ 1 dây duy nhất có thể luồn vào đẩy thùng phá bom, dây còn lại phải bọc trọn viền ngoài. Đúng 1 đường sống duy nhất.",
        "walls": [
          {
            "r1": 0,
            "c1": 0,
            "r2": 1,
            "c2": 0
          }
        ],
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "15%"
        },
        "solution": {
          "A": [
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
              3,
              2
            ],
            [
              3,
              3
            ]
          ],
          "B": [
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
            ],
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
              0,
              1
            ],
            [
              0,
              0
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "tong-hop",
    "icon": "⚔️",
    "title": "Combo",
    "tag": "COMBO",
    "desc": "Bản giao hưởng đỉnh cao — Phối hợp 2 đến 5 cơ chế lõi trong cùng một thế cờ hóc hại.",
    "levels": [
      {
        "tier": "easy",
        "rows": 3,
        "cols": 4,
        "name": "Combo 1: Rock & Arrow 3x4",
        "note": "Đá cản + Mũi tên: Mũi tên ép dây rẽ hướng uốn qua tảng đá.",
        "rocks": [
          {
            "r": 1,
            "c": 1
          }
        ],
        "arrows": [
          {
            "r": 0,
            "c": 1,
            "dir": "DOWN"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 5,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 8.5,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "8%"
        },
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "easy",
        "rows": 4,
        "cols": 4,
        "name": "Combo 2: Prism Wall 4x4",
        "note": "Vách ngăn + Lăng kính/Cổng màu: Vách ngăn chặn lối đi thẳng, ép dây đi vòng lấy màu vào Cổng.",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 1,
            "c2": 2
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 1,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 4,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 7.5,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "19%"
        },
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
            ],
            [
              1,
              1
            ],
            [
              0,
              1
            ]
          ],
          "B": [
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
              2,
              2
            ],
            [
              3,
              2
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 4,
        "name": "Combo 3: Crate Press Switch 4x4",
        "note": "Golden Path #4: Dây A đẩy thùng gỗ trượt đè lên Switch `[1,1]` -> Giữ Cổng `[1,2]` mở vĩnh viễn cho Dây B lọt qua!",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 1,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 14,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "19%"
        },
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
            ],
            [
              1,
              1
            ],
            [
              1,
              2
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "tier": "normal",
        "rows": 4,
        "cols": 5,
        "name": "Combo 4: Minefield Cipher 4x5",
        "note": "Phá bom trên lộ trình mật mã số: Nối mốc 1 -> Đẩy thùng phá Bom -> Nối mốc 2.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
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
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 19,
            "color": "#1b5e8a"
          }
        ],
        "metrics": {
          "u": 20,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 6,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "10%"
        },
        "solution": {
          "A": [
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
              4
            ],
            [
              2,
              4
            ]
          ]
        }
      },
      {
        "tier": "hard",
        "rows": 4,
        "cols": 5,
        "name": "Combo 5: Quad Mechanism 4x5",
        "note": "Tứ đại cơ chế U=2: Dây A đẩy thùng phá bom rồi tự đè Chìa của mình ở cuối lộ trình; Dây B nhuộm màu qua Lăng kính góc đáy rồi vượt Cổng vừa mở. Chỉ còn 2 cách chia lãnh thổ.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 2,
            "color": "red"
          }
        ],
        "switches": [
          {
            "r": 2,
            "c": 3,
            "gateR": 1,
            "gateC": 2,
            "latch": true
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 2,
          "isUnique": false,
          "greedyTrapped": true,
          "iqScore": 8.7,
          "psychologyTag": "GREEDY TRAP",
          "mechanicDensity": "30%"
        },
        "solution": {
          "A": [
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
            ],
            [
              2,
              4
            ],
            [
              2,
              3
            ]
          ],
          "B": [
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
              2,
              2
            ],
            [
              2,
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
            ]
          ]
        }
      },
      {
        "tier": "superhard",
        "rows": 4,
        "cols": 5,
        "name": "Combo 6: Ocean Symphony 4x5",
        "note": "Bản giao hưởng đại dương U=1: Dây A đẩy thùng phá bom rồi bị mũi tên ép rẽ xuống lõi; Dây C tự đè Chìa của mình; Dây B nhuộm màu qua Lăng kính rồi vượt Cổng vừa mở. Đúng 1 đường sống duy nhất cho cả 3 dây.",
        "pushRocks": [
          {
            "r": 0,
            "c": 1
          }
        ],
        "arrows": [
          {
            "r": 1,
            "c": 2,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 2,
            "color": "red"
          }
        ],
        "switches": [
          {
            "r": 2,
            "c": 1,
            "gateR": 3,
            "gateC": 2,
            "latch": true
          }
        ],
        "bombs": [
          {
            "r": 0,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "C",
            "row": 1,
            "col": 0,
            "length": 5,
            "color": "#2a7b4c"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
        "metrics": {
          "u": 1,
          "isUnique": true,
          "greedyTrapped": true,
          "iqScore": 10,
          "psychologyTag": "MASTERPIECE",
          "mechanicDensity": "30%"
        },
        "solution": {
          "A": [
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
            ]
          ],
          "C": [
            [
              1,
              0
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
          "B": [
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
            ]
          ]
        }
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
