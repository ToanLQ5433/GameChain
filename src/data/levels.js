// File này được sinh tự động bởi scripts/gen-levels.mjs — KHÔNG sửa tay.
// Mỗi màn được kiến tạo từ 1 đường đi Hamilton duy nhất qua toàn bộ ô khả
// dụng của bàn cờ (rows x cols, có thể khoét theo `shape`) rồi cắt thành N
// đoạn cho N xích, nên LUÔN phủ kín 100% ô (đúng Win Condition ở GDD 3.3) và
// LUÔN có lời giải (chính là đường đã sinh, lưu ở trường `solution` — dùng
// cho Buff Gợi Ý). Mỗi màn dùng 1 seed riêng và đã đối chiếu để không trùng
// bàn cờ với màn khác trong cùng thể loại.

export const CATEGORIES = [
  {
    "id": "nhap-mon",
    "title": "Basics",
    "icon": "🧭",
    "mechanic": "CORE",
    "desc": "Tap an anchor and drag to cover the whole board with several chains at once — the core rule before learning any other mechanic.",
    "levels": [
      {
        "rows": 3,
        "cols": 4,
        "name": "Basics 1: Double Chain 3x4",
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
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
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
              0,
              1
            ]
          ]
        }
      },
      {
        "rows": 3,
        "cols": 4,
        "name": "Basics 2: Double Chain 3x4",
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
        "rows": 3,
        "cols": 4,
        "name": "Basics 3: Double Chain 3x4",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
          ],
          "B": [
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
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "000000",
          "001100",
          "011110",
          "011110",
          "001100",
          "000000"
        ],
        "name": "Basics 4: Double Chain diamond6",
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 2,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 4,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4,
              3
            ],
            [
              4,
              2
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
              2,
              1
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Basics 5: Double Chain 4x4",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
          ],
          "B": [
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
              2,
              2
            ],
            [
              2,
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
        "rows": 5,
        "cols": 3,
        "name": "Basics 6: Double Chain 5x3",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 5,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 10,
            "color": "#a82e2e"
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
              3,
              2
            ],
            [
              4,
              2
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
        "rows": 4,
        "cols": 4,
        "name": "Basics 7: Double Chain 4x4",
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
            "row": 0,
            "col": 1,
            "length": 5,
            "color": "#a82e2e"
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
              1,
              2
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Basics 8: Double Chain T7",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 6,
            "length": 15,
            "color": "#a82e2e"
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
              0,
              5
            ],
            [
              0,
              6
            ]
          ],
          "B": [
            [
              1,
              6
            ],
            [
              1,
              5
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Basics 9: Double Chain 4x5",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
        "rows": 5,
        "cols": 4,
        "name": "Basics 10: Triple Chain 5x4",
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
            "row": 4,
            "col": 2,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 3,
            "length": 6,
            "color": "#2a7b4c"
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
              4,
              1
            ]
          ],
          "B": [
            [
              4,
              2
            ],
            [
              4,
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
            ]
          ],
          "C": [
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
              0,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 6,
        "name": "Basics 11: Triple Chain 4x6",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 3,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 6,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              0,
              5
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
              1,
              1
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Basics 12: Triple Chain cross7",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 1,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 3,
            "length": 6,
            "color": "#2a7b4c"
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ]
          ],
          "B": [
            [
              6,
              3
            ],
            [
              5,
              3
            ],
            [
              4,
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
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
            ],
            [
              2,
              4
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 4,
        "name": "Basics 13: Triple Chain 6x4",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 3,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 1,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              2
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ],
            [
              3,
              0
            ]
          ],
          "B": [
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
          "C": [
            [
              4,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Basics 14: Triple Chain 5x5",
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 3,
            "length": 12,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ]
          ],
          "C": [
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
            ],
            [
              3,
              1
            ],
            [
              4,
              1
            ],
            [
              4,
              2
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 6,
        "name": "Basics 15: Triple Chain 4x6",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 4,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 4,
            "length": 10,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
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
            ]
          ],
          "B": [
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
              2,
              4
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Basics 16: Triple Chain cross7",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 3,
            "length": 8,
            "color": "#2a7b4c"
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
            ],
            [
              2,
              1
            ]
          ],
          "B": [
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ]
          ],
          "C": [
            [
              4,
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
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 6,
        "name": "Basics 17: Triple Chain 5x6",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 14,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 2,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              1,
              3
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              2,
              5
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
              4,
              2
            ],
            [
              4,
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
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              4,
              4
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 6,
        "name": "Basics 18: Triple Chain 5x6",
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 14,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 3,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              4,
              2
            ]
          ],
          "B": [
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
              5
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
              1,
              5
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
        "rows": 4,
        "cols": 7,
        "name": "Basics 19: Quad Chain 4x7",
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 5,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 5,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
            "length": 8,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 1,
            "col": 1,
            "length": 7,
            "color": "#8a6a10"
          }
        ],
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
            ]
          ],
          "B": [
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ]
          ],
          "C": [
            [
              2,
              4
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
            ]
          ],
          "D": [
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
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Basics 20: Quad Chain T7",
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
            "row": 1,
            "col": 2,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 6,
            "col": 2,
            "length": 6,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 1,
            "col": 3,
            "length": 8,
            "color": "#8a6a10"
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
          ],
          "B": [
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
              4,
              2
            ],
            [
              5,
              2
            ]
          ],
          "C": [
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ],
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
            ]
          ],
          "D": [
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
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Basics 21: Quad Chain 6x6",
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
            "row": 5,
            "col": 5,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 0,
            "length": 7,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 2,
            "col": 4,
            "length": 12,
            "color": "#8a6a10"
          }
        ],
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ]
          ],
          "B": [
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ]
          ],
          "C": [
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
            ],
            [
              1,
              4
            ]
          ],
          "D": [
            [
              2,
              4
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
            ],
            [
              3,
              1
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
              3,
              2
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
        "rows": 5,
        "cols": 7,
        "name": "Basics 22: Quad Chain 5x7",
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
            "row": 1,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 2,
            "length": 10,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 4,
            "col": 4,
            "length": 5,
            "color": "#8a6a10"
          }
        ],
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
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
            ],
            [
              1,
              4
            ]
          ],
          "B": [
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
              3,
              1
            ],
            [
              2,
              1
            ]
          ],
          "C": [
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
              2,
              5
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
              4,
              5
            ],
            [
              3,
              5
            ],
            [
              3,
              4
            ]
          ],
          "D": [
            [
              4,
              4
            ],
            [
              4,
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Basics 23: Quad Chain 7x5",
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 4,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 0,
            "length": 9,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 1,
            "col": 3,
            "length": 11,
            "color": "#8a6a10"
          }
        ],
        "solution": {
          "A": [
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
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
            ]
          ],
          "B": [
            [
              5,
              1
            ],
            [
              5,
              2
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
              4,
              1
            ],
            [
              4,
              0
            ]
          ],
          "C": [
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
          ],
          "D": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Basics 24: Quad Chain T7",
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
            "row": 0,
            "col": 5,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 3,
            "length": 5,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 3,
            "col": 2,
            "length": 7,
            "color": "#8a6a10"
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
            ]
          ],
          "B": [
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
            ],
            [
              1,
              4
            ]
          ],
          "C": [
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
            ]
          ],
          "D": [
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Basics 25: Quad Chain 6x6",
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
            "col": 5,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
            "length": 14,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 4,
            "col": 0,
            "length": 8,
            "color": "#8a6a10"
          }
        ],
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ]
          ],
          "B": [
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              4,
              4
            ],
            [
              3,
              4
            ]
          ],
          "C": [
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
            ]
          ],
          "D": [
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              4,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Basics 26: 5 Chains 7x6",
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 5,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 1,
            "length": 7,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 0,
            "col": 3,
            "length": 9,
            "color": "#8a6a10"
          },
          {
            "id": "E",
            "row": 4,
            "col": 4,
            "length": 9,
            "color": "#6a4fb3"
          }
        ],
        "solution": {
          "A": [
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
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
            ]
          ],
          "B": [
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
              3,
              1
            ],
            [
              4,
              1
            ]
          ],
          "C": [
            [
              5,
              1
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
              1,
              2
            ],
            [
              0,
              2
            ]
          ],
          "D": [
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
            ]
          ],
          "E": [
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
              5
            ],
            [
              1,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Basics 27: 5 Chains 7x6",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 1,
            "length": 5,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 0,
            "col": 2,
            "length": 10,
            "color": "#8a6a10"
          },
          {
            "id": "E",
            "row": 1,
            "col": 5,
            "length": 10,
            "color": "#6a4fb3"
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
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ]
          ],
          "B": [
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ]
          ],
          "C": [
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
              0,
              1
            ]
          ],
          "D": [
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
              4,
              5
            ],
            [
              3,
              5
            ],
            [
              2,
              5
            ]
          ],
          "E": [
            [
              1,
              5
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
              1,
              3
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
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "1100011",
          "1100011",
          "1100011",
          "1111111",
          "1111111"
        ],
        "name": "Basics 28: 5 Chains ring7",
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 5,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 6,
            "col": 3,
            "length": 7,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 5,
            "col": 1,
            "length": 7,
            "color": "#8a6a10"
          },
          {
            "id": "E",
            "row": 1,
            "col": 0,
            "length": 10,
            "color": "#6a4fb3"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
            ],
            [
              2,
              5
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
              3,
              5
            ]
          ],
          "B": [
            [
              4,
              5
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
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              6,
              4
            ]
          ],
          "C": [
            [
              6,
              3
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
            ]
          ],
          "D": [
            [
              5,
              1
            ],
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
            ]
          ],
          "E": [
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
        "rows": 7,
        "cols": 6,
        "name": "Basics 29: 5 Chains 7x6",
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
            "length": 9,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 0,
            "col": 3,
            "length": 7,
            "color": "#8a6a10"
          },
          {
            "id": "E",
            "row": 2,
            "col": 0,
            "length": 6,
            "color": "#6a4fb3"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              2
            ],
            [
              4,
              1
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
              5,
              2
            ],
            [
              6,
              2
            ]
          ],
          "B": [
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
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
              3,
              5
            ],
            [
              2,
              5
            ],
            [
              1,
              5
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
              1,
              4
            ]
          ],
          "C": [
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
              5,
              4
            ],
            [
              5,
              3
            ],
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
            ]
          ],
          "D": [
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
              3,
              0
            ]
          ],
          "E": [
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
        "rows": 7,
        "cols": 6,
        "name": "Basics 30: 5 Chains 7x6",
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 5,
            "length": 12,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 5,
            "col": 3,
            "length": 6,
            "color": "#8a6a10"
          },
          {
            "id": "E",
            "row": 4,
            "col": 2,
            "length": 8,
            "color": "#6a4fb3"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              5,
              0
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
            ]
          ],
          "B": [
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ]
          ],
          "C": [
            [
              5,
              5
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
              5,
              4
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
              4,
              3
            ]
          ],
          "D": [
            [
              5,
              3
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
              6,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ]
          ],
          "E": [
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
              1,
              1
            ],
            [
              1,
              2
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "vat-can",
    "title": "Obstacles",
    "icon": "🪨",
    "mechanic": "MEC-01",
    "desc": "Rocks block hard, Walls block by edge, Push Rocks can be pushed to clear the way.",
    "levels": [
      {
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 1: Rock Blocking the Path",
        "rocks": [
          {
            "r": 0,
            "c": 3
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
            "row": 2,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
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
              2,
              2
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 3,
        "name": "Obstacles 2: Rock Blocking the Path",
        "rocks": [
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
            "row": 2,
            "col": 1,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
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
            ]
          ],
          "B": [
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
            ],
            [
              4,
              2
            ],
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
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 3: Rock Blocking the Path",
        "rocks": [
          {
            "r": 3,
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
            "row": 2,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
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
            ]
          ],
          "B": [
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
        "rows": 4,
        "cols": 4,
        "name": "Obstacles 4: Rock Blocking the Path",
        "rocks": [
          {
            "r": 1,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 7,
            "color": "#a82e2e"
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
          ],
          "B": [
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
        "rows": 4,
        "cols": 5,
        "name": "Obstacles 5: Rock Blocking the Path",
        "rocks": [
          {
            "r": 1,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 11,
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
        "solution": {
          "A": [
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
              4
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
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Obstacles 6: Multiple Rocks",
        "rocks": [
          {
            "r": 2,
            "c": 0
          },
          {
            "r": 1,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
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
            ]
          ],
          "B": [
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
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Obstacles 7: Multiple Rocks",
        "rocks": [
          {
            "r": 1,
            "c": 1
          },
          {
            "r": 3,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 4,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              1
            ],
            [
              2,
              1
            ]
          ],
          "B": [
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
              3
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
        }
      },
      {
        "rows": 5,
        "cols": 4,
        "name": "Obstacles 8: Multiple Rocks",
        "rocks": [
          {
            "r": 4,
            "c": 3
          },
          {
            "r": 0,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              1,
              3
            ],
            [
              0,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 4,
        "name": "Obstacles 9: Invisible Wall",
        "walls": [
          {
            "r1": 4,
            "c1": 2,
            "r2": 5,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 11,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
        "rows": 6,
        "cols": 4,
        "name": "Obstacles 10: Invisible Wall",
        "walls": [
          {
            "r1": 3,
            "c1": 1,
            "r2": 3,
            "c2": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              0,
              2
            ]
          ],
          "B": [
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
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 11: Invisible Wall",
        "walls": [
          {
            "r1": 2,
            "c1": 4,
            "r2": 3,
            "c2": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Obstacles 12: Invisible Wall",
        "walls": [
          {
            "r1": 5,
            "c1": 2,
            "r2": 5,
            "c2": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
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
              4,
              2
            ]
          ],
          "B": [
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ],
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
              2,
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
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 13: Invisible Wall",
        "walls": [
          {
            "r1": 3,
            "c1": 1,
            "r2": 3,
            "c2": 2
          },
          {
            "r1": 1,
            "c1": 0,
            "r2": 1,
            "c2": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
            [
              2,
              1
            ],
            [
              3,
              1
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
              4,
              3
            ],
            [
              4,
              4
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 14: Invisible Wall",
        "walls": [
          {
            "r1": 1,
            "c1": 2,
            "r2": 1,
            "c2": 3
          },
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
            "row": 1,
            "col": 3,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 4,
            "length": 15,
            "color": "#a82e2e"
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
            ]
          ],
          "B": [
            [
              4,
              4
            ],
            [
              4,
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 4,
        "name": "Obstacles 15: Invisible Wall",
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 2,
            "c2": 1
          },
          {
            "r1": 0,
            "c1": 2,
            "r2": 1,
            "c2": 2
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
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
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
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              5,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Obstacles 16: Invisible Wall",
        "walls": [
          {
            "r1": 5,
            "c1": 2,
            "r2": 5,
            "c2": 3
          },
          {
            "r1": 1,
            "c1": 2,
            "r2": 1,
            "c2": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
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
              1,
              4
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Obstacles 17: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 4,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 15,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
            ],
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              4,
              3
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
              0,
              0
            ]
          ],
          "C": [
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
            ],
            [
              4,
              4
            ],
            [
              5,
              4
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
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 18: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
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
            "row": 3,
            "col": 0,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 1,
            "length": 8,
            "color": "#2a7b4c"
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
            ]
          ],
          "B": [
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
              3,
              3
            ],
            [
              3,
              2
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 19: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 10,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              2,
              2
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 20: Push Rock Clears the Way",
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 4,
            "length": 9,
            "color": "#2a7b4c"
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
              3
            ],
            [
              2,
              4
            ]
          ],
          "C": [
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
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 21: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 11,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              2
            ],
            [
              3,
              3
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Obstacles 22: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 2,
            "c": 5
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 6,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 17,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              6
            ],
            [
              2,
              5
            ],
            [
              3,
              5
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
              3
            ]
          ],
          "B": [
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
              1,
              5
            ],
            [
              1,
              6
            ],
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
            ]
          ],
          "C": [
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
              3,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Obstacles 23: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 4,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 1,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              3,
              1
            ],
            [
              3,
              0
            ],
            [
              4,
              0
            ]
          ],
          "C": [
            [
              4,
              1
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
              3,
              3
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Obstacles 24: Push Rock Clears the Way",
        "pushRocks": [
          {
            "r": 4,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 13,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 1,
            "length": 14,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
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
              2,
              3
            ],
            [
              1,
              3
            ]
          ],
          "B": [
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
              4,
              2
            ],
            [
              5,
              2
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
            ]
          ],
          "C": [
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
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Obstacles 25: Multiple Rocks",
        "rocks": [
          {
            "r": 4,
            "c": 2
          },
          {
            "r": 1,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 14,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 3,
            "length": 10,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              5,
              0
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
              1,
              1
            ]
          ],
          "B": [
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
              1
            ],
            [
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              6,
              1
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
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
            ],
            [
              4,
              4
            ]
          ],
          "C": [
            [
              4,
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Obstacles 26: Invisible Wall",
        "walls": [
          {
            "r1": 1,
            "c1": 4,
            "r2": 2,
            "c2": 4
          },
          {
            "r1": 2,
            "c1": 5,
            "r2": 3,
            "c2": 5
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 6,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 5,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 10,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              6
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
              4,
              3
            ],
            [
              4,
              2
            ],
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
            ]
          ],
          "B": [
            [
              0,
              5
            ],
            [
              0,
              6
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
              3,
              5
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
            ]
          ],
          "C": [
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
              1,
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
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Obstacles 27: Multiple Rocks",
        "rocks": [
          {
            "r": 6,
            "c": 1
          },
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 4,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 3,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              4
            ],
            [
              5,
              4
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
              4,
              1
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
            [
              4,
              3
            ],
            [
              5,
              3
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
              5,
              1
            ],
            [
              5,
              0
            ],
            [
              6,
              0
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Obstacles 28: Invisible Wall",
        "walls": [
          {
            "r1": 1,
            "c1": 3,
            "r2": 2,
            "c2": 3
          },
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
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 5,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 3,
            "length": 9,
            "color": "#2a7b4c"
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
            ]
          ],
          "B": [
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Obstacles 29: Multiple Rocks",
        "rocks": [
          {
            "r": 2,
            "c": 3
          },
          {
            "r": 4,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 13,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 2,
            "length": 15,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
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
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
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
              5,
              4
            ],
            [
              5,
              3
            ]
          ],
          "B": [
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
              4,
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
            ],
            [
              0,
              3
            ]
          ],
          "C": [
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
              4,
              1
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
              6,
              1
            ],
            [
              6,
              0
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 7,
        "name": "Obstacles 30: Invisible Wall",
        "walls": [
          {
            "r1": 4,
            "c1": 4,
            "r2": 5,
            "c2": 4
          },
          {
            "r1": 0,
            "c1": 3,
            "r2": 1,
            "c2": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 5,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 18,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 14,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
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
          ],
          "B": [
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
              5,
              1
            ],
            [
              5,
              2
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
              5,
              6
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              4,
              4
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
              4,
              3
            ],
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
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "dinh-huong-mau",
    "title": "Direction & Color",
    "icon": "🎨",
    "mechanic": "MEC-02",
    "desc": "Arrows force the direction of your next step; Prisms recolor the chain; Color Gates only let the matching color through.",
    "levels": [
      {
        "rows": 5,
        "cols": 3,
        "name": "Direction 1: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 0,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 2,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 2,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              2
            ],
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
            ]
          ],
          "B": [
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
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Direction 2: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 1,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
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
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Direction 3: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 0,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 2,
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
            "row": 3,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              1,
              1
            ],
            [
              2,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Direction 4: Arrow + Color Gate",
        "arrows": [
          {
            "r": 6,
            "c": 3,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 2,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 1,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 5,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
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
              4,
              3
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              2
            ]
          ],
          "B": [
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
          ]
        }
      },
      {
        "rows": 5,
        "cols": 4,
        "name": "Direction 5: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 1,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 2,
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
            "row": 4,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 11,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
        "rows": 4,
        "cols": 5,
        "name": "Direction 6: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 1,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 4,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 4,
            "color": "red"
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
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 11,
            "color": "#a82e2e"
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
          ],
          "B": [
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
        "rows": 5,
        "cols": 4,
        "name": "Direction 7: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 0,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 2,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 3,
            "color": "blue"
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
            "row": 1,
            "col": 2,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              2,
              2
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
              3,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Direction 8: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 0,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 2,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 3,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
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
              1,
              4
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 6,
        "name": "Direction 9: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 4,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 1,
            "color": "green"
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
            "row": 2,
            "col": 4,
            "length": 14,
            "color": "#a82e2e"
          }
        ],
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              3,
              4
            ]
          ],
          "B": [
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
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Direction 10: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 1,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 2,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 3,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
        "rows": 5,
        "cols": 5,
        "name": "Direction 11: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 3,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 3,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 0,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 16,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
        "rows": 6,
        "cols": 6,
        "shape": [
          "000000",
          "001100",
          "011110",
          "011110",
          "001100",
          "000000"
        ],
        "name": "Direction 12: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 1,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 4,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 8,
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
        "solution": {
          "A": [
            [
              4,
              2
            ],
            [
              4,
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
              2
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Direction 13: Arrow + Color Gate",
        "arrows": [
          {
            "r": 1,
            "c": 4,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 1,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              4,
              3
            ],
            [
              4,
              4
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Direction 14: Arrow + Color Gate",
        "arrows": [
          {
            "r": 2,
            "c": 1,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 1,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 2,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 8,
            "color": "#a82e2e"
          }
        ],
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
              2,
              2
            ],
            [
              3,
              2
            ],
            [
              4,
              2
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
              0
            ],
            [
              2,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Direction 15: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 3,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 4,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 4,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 16,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
          ],
          "B": [
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
              3,
              1
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
              4,
              4
            ],
            [
              3,
              4
            ],
            [
              3,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "000000",
          "001100",
          "011110",
          "011110",
          "001100",
          "000000"
        ],
        "name": "Direction 16: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 3,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 2,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 3,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 4,
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
        "solution": {
          "A": [
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
              3,
              1
            ]
          ],
          "B": [
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
              1,
              2
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 5,
        "name": "Direction 17: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 3,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 1,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 4,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 1,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 4,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 0,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              0
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
              3,
              1
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
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              5,
              4
            ]
          ],
          "B": [
            [
              4,
              4
            ],
            [
              4,
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
          "C": [
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
        "rows": 6,
        "cols": 5,
        "name": "Direction 18: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 1,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 5,
            "c": 4,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 4,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 2,
            "length": 11,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
            ],
            [
              5,
              4
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
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
            ],
            [
              4,
              3
            ],
            [
              4,
              2
            ]
          ],
          "C": [
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
        "rows": 6,
        "cols": 5,
        "name": "Direction 19: Arrow + Color Gate",
        "arrows": [
          {
            "r": 1,
            "c": 2,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 5,
            "c": 0,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 1,
            "color": "green"
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
            "row": 4,
            "col": 0,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 2,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
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
              3,
              0
            ]
          ],
          "B": [
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
              2,
              2
            ],
            [
              3,
              2
            ],
            [
              4,
              2
            ]
          ],
          "C": [
            [
              5,
              2
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
              4,
              4
            ],
            [
              4,
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
            ],
            [
              2,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "111000",
          "111000",
          "111000",
          "111111",
          "111111",
          "111111"
        ],
        "name": "Direction 20: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 1,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 5,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 2,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 0,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              5
            ],
            [
              4,
              5
            ],
            [
              3,
              5
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
            ]
          ],
          "B": [
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
              4,
              1
            ]
          ],
          "C": [
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
              5,
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
              4
            ],
            [
              4,
              4
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Direction 21: Arrow + Color Gate",
        "arrows": [
          {
            "r": 3,
            "c": 1,
            "dir": "RIGHT"
          },
          {
            "r": 4,
            "c": 2,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 0,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 0,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 14,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
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
              4,
              3
            ],
            [
              4,
              2
            ],
            [
              4,
              1
            ]
          ],
          "B": [
            [
              4,
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
            ],
            [
              2,
              3
            ],
            [
              2,
              2
            ]
          ],
          "C": [
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
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              0,
              5
            ],
            [
              0,
              4
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Direction 22: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 4,
            "dir": "UP"
          },
          {
            "r": 0,
            "c": 5,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 1,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 0,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 2,
            "length": 13,
            "color": "#2a7b4c"
          }
        ],
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ]
          ],
          "B": [
            [
              5,
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
              3,
              3
            ]
          ],
          "C": [
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
        "rows": 5,
        "cols": 7,
        "name": "Direction 23: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 5,
            "dir": "LEFT"
          },
          {
            "r": 2,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 6,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 5,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 6,
            "length": 12,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 0,
            "length": 8,
            "color": "#2a7b4c"
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
            ],
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
            ]
          ],
          "B": [
            [
              3,
              6
            ],
            [
              4,
              6
            ],
            [
              4,
              5
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
              4,
              1
            ],
            [
              4,
              0
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Direction 24: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 2,
            "dir": "RIGHT"
          },
          {
            "r": 2,
            "c": 4,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 3,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
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
              4,
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
          ],
          "B": [
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
          "C": [
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
              5
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              3,
              6
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Direction 25: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 3,
            "dir": "LEFT"
          },
          {
            "r": 4,
            "c": 1,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 0,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 4,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 0,
            "length": 17,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              4
            ],
            [
              5,
              4
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
            ]
          ],
          "B": [
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
              2,
              1
            ]
          ],
          "C": [
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
              3,
              2
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              2
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Direction 26: Arrow + Color Gate",
        "arrows": [
          {
            "r": 1,
            "c": 1,
            "dir": "RIGHT"
          },
          {
            "r": 3,
            "c": 4,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 5,
            "c": 2,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 1,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 2,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ],
            [
              5,
              4
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
              5,
              3
            ],
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
              0,
              1
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
            [
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
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
              4,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Direction 27: Arrow + Color Gate",
        "arrows": [
          {
            "r": 2,
            "c": 6,
            "dir": "LEFT"
          },
          {
            "r": 3,
            "c": 6,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 3,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 0,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 4,
            "length": 12,
            "color": "#2a7b4c"
          }
        ],
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
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              3,
              5
            ]
          ],
          "C": [
            [
              3,
              4
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
              5
            ],
            [
              0,
              6
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
              2,
              5
            ],
            [
              1,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Direction 28: Arrow + Color Gate",
        "arrows": [
          {
            "r": 0,
            "c": 3,
            "dir": "RIGHT"
          },
          {
            "r": 6,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 0,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 3,
            "length": 11,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
            ],
            [
              0,
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
              2
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
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ]
          ],
          "C": [
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
              4
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Direction 29: Arrow + Color Gate",
        "arrows": [
          {
            "r": 2,
            "c": 0,
            "dir": "DOWN"
          },
          {
            "r": 1,
            "c": 3,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 3,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 2,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 18,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 13,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 2,
            "length": 11,
            "color": "#2a7b4c"
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
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
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
              3,
              5
            ],
            [
              2,
              5
            ],
            [
              1,
              5
            ],
            [
              0,
              5
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
              2,
              1
            ],
            [
              3,
              1
            ],
            [
              4,
              1
            ],
            [
              5,
              1
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
            ]
          ],
          "C": [
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
              4
            ],
            [
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              4,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Direction 30: Arrow + Color Gate",
        "arrows": [
          {
            "r": 4,
            "c": 3,
            "dir": "LEFT"
          },
          {
            "r": 3,
            "c": 4,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 3,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 1,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 2,
            "length": 8,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
              5,
              4
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
            ]
          ],
          "C": [
            [
              5,
              2
            ],
            [
              5,
              3
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
              2,
              3
            ],
            [
              3,
              3
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "mat-ma-so",
    "title": "Number Code",
    "icon": "🔢",
    "mechanic": "MEC-03",
    "desc": "Touch the numbered waypoints in strictly increasing order, ending exactly on the last one.",
    "levels": [
      {
        "rows": 5,
        "cols": 3,
        "name": "Code 1: 3 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 4,
              "c": 2
            },
            {
              "r": 3,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              4,
              2
            ],
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
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 3,
        "name": "Code 2: 3 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 4,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          }
        ],
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
              4,
              0
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Code 3: 3 Waypoints",
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
              "r": 3,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 16,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
        "rows": 6,
        "cols": 6,
        "shape": [
          "111000",
          "111000",
          "111000",
          "111111",
          "111111",
          "111111"
        ],
        "name": "Code 4: 3 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 0
            },
            {
              "r": 3,
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
            "row": 5,
            "col": 5,
            "length": 27,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              5
            ],
            [
              4,
              5
            ],
            [
              3,
              5
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
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
              1,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Code 5: 4 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 1,
            "length": 20,
            "color": "#1b5e8a"
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 4,
        "name": "Code 6: 4 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 0,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 0,
            "length": 20,
            "color": "#1b5e8a"
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
              3,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 4,
        "name": "Code 7: 4 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 1,
              "c": 3
            },
            {
              "r": 3,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 1,
            "length": 20,
            "color": "#1b5e8a"
          }
        ],
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
              4,
              0
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
              3,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Code 8: 4 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 0,
              "c": 6
            },
            {
              "r": 0,
              "c": 3
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
            "row": 5,
            "col": 3,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
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
              4,
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
              1,
              5
            ],
            [
              1,
              6
            ],
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
        "rows": 6,
        "cols": 4,
        "name": "Code 9: 5 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 5,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              4,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Code 10: 5 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 4
            },
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 4,
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
            "row": 0,
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ],
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
        "rows": 5,
        "cols": 5,
        "name": "Code 11: 5 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 0,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ],
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
              2,
              2
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
        "rows": 6,
        "cols": 6,
        "shape": [
          "000000",
          "001100",
          "011110",
          "011110",
          "001100",
          "000000"
        ],
        "name": "Code 12: 5 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 3,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 12,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              2
            ],
            [
              4,
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
              2
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 6,
        "name": "Code 13: 6 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 2,
              "c": 5
            },
            {
              "r": 0,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 30,
            "color": "#1b5e8a"
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
              4,
              4
            ],
            [
              4,
              5
            ],
            [
              3,
              5
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
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              1,
              5
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
              1,
              4
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 5,
        "name": "Code 14: 6 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 2,
              "c": 3
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 1,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 3,
            "length": 30,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              3
            ],
            [
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
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
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              0
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
          ]
        }
      },
      {
        "rows": 7,
        "cols": 4,
        "name": "Code 15: 6 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 3,
              "c": 1
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 0,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 0,
            "length": 28,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Code 16: 6 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 0,
              "c": 4
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 0
            },
            {
              "r": 4,
              "c": 2
            },
            {
              "r": 5,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 3,
            "length": 24,
            "color": "#1b5e8a"
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
              1,
              4
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 5,
        "name": "Code 17: 7 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 4
            },
            {
              "r": 0,
              "c": 4
            },
            {
              "r": 2,
              "c": 3
            },
            {
              "r": 5,
              "c": 0
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 1,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 30,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
            ],
            [
              5,
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
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
        "rows": 7,
        "cols": 5,
        "name": "Code 18: 7 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 6,
              "c": 0
            },
            {
              "r": 6,
              "c": 3
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 4,
              "c": 2
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
            "length": 35,
            "color": "#1b5e8a"
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
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
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
              2,
              1
            ],
            [
              3,
              1
            ],
            [
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
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
              2,
              2
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Code 19: 7 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 4
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 6,
              "c": 2
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 3,
              "c": 1
            },
            {
              "r": 5,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 4,
            "length": 35,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              4
            ],
            [
              5,
              4
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
              4,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Code 20: 7 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 5
            },
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 5,
              "c": 3
            },
            {
              "r": 6,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
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
              1,
              4
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Code 21: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 1,
              "c": 5
            },
            {
              "r": 2,
              "c": 3
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 4,
              "c": 5
            },
            {
              "r": 4,
              "c": 6
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 35,
            "color": "#1b5e8a"
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
            ],
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
              2,
              5
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
              3,
              1
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
              3,
              3
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
              5
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              4,
              6
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Code 22: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 3,
              "c": 5
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 3,
              "c": 2
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
            "col": 5,
            "length": 36,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
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
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Code 23: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 6,
              "c": 4
            },
            {
              "r": 1,
              "c": 3
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 6,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 0,
            "length": 35,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              5,
              0
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
              5,
              4
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
              5,
              3
            ],
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
            ],
            [
              3,
              1
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
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Code 24: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 5
            },
            {
              "r": 1,
              "c": 3
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 0
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 6,
              "c": 3
            },
            {
              "r": 5,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 5,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              5
            ],
            [
              1,
              6
            ],
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
              1,
              4
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Code 25: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 4,
              "c": 4
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 1,
              "c": 6
            },
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 0,
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 35,
            "color": "#1b5e8a"
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
              4,
              4
            ],
            [
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              3,
              5
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
              2,
              3
            ],
            [
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
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
              0,
              3
            ],
            [
              0,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Code 26: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 6,
              "c": 0
            },
            {
              "r": 5,
              "c": 5
            },
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 1,
              "c": 5
            },
            {
              "r": 1,
              "c": 4
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
            "row": 2,
            "col": 0,
            "length": 42,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
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
              2,
              2
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
              4,
              4
            ],
            [
              4,
              5
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
              1,
              5
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
              1,
              3
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
            ],
            [
              3,
              3
            ],
            [
              3,
              4
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 7,
        "name": "Code 27: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 3,
              "c": 1
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 4,
              "c": 6
            },
            {
              "r": 4,
              "c": 5
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 42,
            "color": "#1b5e8a"
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
            ],
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
              2,
              5
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
              3,
              2
            ],
            [
              4,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              4,
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
              3,
              5
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
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              4,
              4
            ],
            [
              4,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Code 28: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 6
            },
            {
              "r": 1,
              "c": 3
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 6,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 5,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              1,
              5
            ],
            [
              1,
              6
            ],
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
              1,
              4
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Code 29: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 5
            },
            {
              "r": 5,
              "c": 0
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 0,
              "c": 4
            },
            {
              "r": 4,
              "c": 5
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 4,
              "c": 2
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
            "row": 6,
            "col": 0,
            "length": 42,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
              0
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
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Code 30: 8 Waypoints",
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 5
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 6,
              "c": 3
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 6,
              "c": 1
            },
            {
              "r": 3,
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
            "row": 6,
            "col": 5,
            "length": 42,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              5
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
              3,
              5
            ],
            [
              2,
              5
            ],
            [
              1,
              5
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
              4,
              4
            ],
            [
              5,
              4
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
              5,
              3
            ],
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
              6,
              2
            ],
            [
              5,
              2
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
              4,
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
      }
    ]
  },
  {
    "id": "cong-tac",
    "title": "Switches",
    "icon": "🔘",
    "mechanic": "MEC-04",
    "desc": "Hold one chain on a Switch to open a Gate for another chain; a Latch keeps the Gate open forever after one activation.",
    "levels": [
      {
        "rows": 5,
        "cols": 3,
        "name": "Switch 1: Basic Unlock",
        "switches": [
          {
            "r": 3,
            "c": 2,
            "gateR": 2,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 4,
        "name": "Switch 2: Cross-Chain Unlock",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 0,
            "gateC": 0,
            "latch": false
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
            "row": 2,
            "col": 1,
            "length": 6,
            "color": "#a82e2e"
          }
        ],
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
              1,
              2
            ],
            [
              2,
              2
            ]
          ],
          "B": [
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
              1,
              1
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 3,
        "name": "Switch 3: Permanent Latch",
        "switches": [
          {
            "r": 0,
            "c": 0,
            "gateR": 1,
            "gateC": 0,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 5,
            "color": "#a82e2e"
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
              3,
              2
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Switch 4: Cross-Chain Unlock",
        "switches": [
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
            "row": 1,
            "col": 2,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              2,
              4
            ],
            [
              2,
              5
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
              3,
              5
            ],
            [
              3,
              4
            ],
            [
              3,
              3
            ]
          ],
          "B": [
            [
              4,
              3
            ],
            [
              5,
              3
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
      },
      {
        "rows": 5,
        "cols": 4,
        "name": "Switch 5: Basic Unlock",
        "switches": [
          {
            "r": 4,
            "c": 1,
            "gateR": 4,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3,
              3
            ],
            [
              3,
              2
            ]
          ],
          "B": [
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
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Switch 6: Permanent Latch",
        "switches": [
          {
            "r": 0,
            "c": 1,
            "gateR": 1,
            "gateC": 1,
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
            "row": 1,
            "col": 2,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
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
              3,
              4
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
            ]
          ],
          "B": [
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
              2,
              1
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Switch 7: Basic Unlock",
        "switches": [
          {
            "r": 1,
            "c": 0,
            "gateR": 1,
            "gateC": 1,
            "latch": false
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
            "col": 2,
            "length": 9,
            "color": "#a82e2e"
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
          ],
          "B": [
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
            ],
            [
              1,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Switch 8: Cross-Chain Unlock",
        "switches": [
          {
            "r": 5,
            "c": 2,
            "gateR": 0,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              2
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
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ],
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
            ]
          ],
          "B": [
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
              5
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Switch 9: Permanent Latch",
        "switches": [
          {
            "r": 2,
            "c": 4,
            "gateR": 0,
            "gateC": 1,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 4,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 4,
        "name": "Switch 10: Cross-Chain Unlock",
        "switches": [
          {
            "r": 4,
            "c": 3,
            "gateR": 4,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
            ],
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
              2,
              2
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
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ]
          ],
          "B": [
            [
              4,
              0
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 4,
        "name": "Switch 11: Basic Unlock",
        "switches": [
          {
            "r": 4,
            "c": 0,
            "gateR": 5,
            "gateC": 2,
            "latch": false
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
            "row": 1,
            "col": 3,
            "length": 12,
            "color": "#a82e2e"
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
              5,
              2
            ],
            [
              5,
              3
            ],
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
            ]
          ],
          "B": [
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
              4,
              2
            ],
            [
              4,
              1
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "000000",
          "001100",
          "011110",
          "011110",
          "001100",
          "000000"
        ],
        "name": "Switch 12: Permanent Latch",
        "switches": [
          {
            "r": 3,
            "c": 4,
            "gateR": 2,
            "gateC": 2,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 4,
            "length": 5,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4,
              3
            ],
            [
              4,
              2
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 4,
        "name": "Switch 13: Basic Unlock",
        "switches": [
          {
            "r": 6,
            "c": 2,
            "gateR": 5,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 3,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              3
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
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
              5,
              2
            ],
            [
              5,
              3
            ],
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
              2,
              2
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Switch 14: Cross-Chain Unlock",
        "switches": [
          {
            "r": 1,
            "c": 4,
            "gateR": 4,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 15,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ],
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
            ]
          ],
          "B": [
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
              4,
              2
            ],
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
        "rows": 5,
        "cols": 5,
        "name": "Switch 15: Permanent Latch",
        "switches": [
          {
            "r": 0,
            "c": 1,
            "gateR": 2,
            "gateC": 0,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 14,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4,
              1
            ],
            [
              3,
              1
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
              1,
              3
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
              4,
              2
            ],
            [
              4,
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
              4,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "0011000",
          "0011000",
          "1111111",
          "1111111",
          "0011000",
          "0011000",
          "0011000"
        ],
        "name": "Switch 16: Cross-Chain Unlock",
        "switches": [
          {
            "r": 5,
            "c": 2,
            "gateR": 2,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 3,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 7,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              3
            ],
            [
              5,
              3
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
              3,
              3
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
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
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
              0,
              3
            ]
          ],
          "B": [
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
            ],
            [
              3,
              0
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 5,
        "name": "Switch 17: Basic Unlock",
        "switches": [
          {
            "r": 3,
            "c": 4,
            "gateR": 4,
            "gateC": 4,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 20,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ]
          ],
          "B": [
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
              4,
              3
            ],
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
              1,
              1
            ],
            [
              1,
              2
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 5,
        "name": "Switch 18: Permanent Latch",
        "switches": [
          {
            "r": 4,
            "c": 4,
            "gateR": 1,
            "gateC": 2,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 0,
            "length": 18,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              0
            ],
            [
              5,
              1
            ],
            [
              5,
              2
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
            ]
          ],
          "B": [
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
        "rows": 6,
        "cols": 5,
        "name": "Switch 19: Basic Unlock",
        "switches": [
          {
            "r": 2,
            "c": 3,
            "gateR": 0,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 18,
            "color": "#a82e2e"
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
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "1100011",
          "1100011",
          "1100011",
          "1111111",
          "1111111"
        ],
        "name": "Switch 20: Cross-Chain Unlock",
        "switches": [
          {
            "r": 1,
            "c": 6,
            "gateR": 4,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 23,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 17,
            "color": "#a82e2e"
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
              1,
              3
            ],
            [
              1,
              4
            ],
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
              2,
              5
            ],
            [
              3,
              5
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
              4,
              5
            ],
            [
              5,
              5
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
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              2
            ]
          ],
          "B": [
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
        "rows": 7,
        "cols": 5,
        "name": "Switch 21: Permanent Latch",
        "switches": [
          {
            "r": 6,
            "c": 0,
            "gateR": 3,
            "gateC": 2,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 23,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 4,
            "length": 12,
            "color": "#a82e2e"
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
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ]
          ],
          "B": [
            [
              5,
              4
            ],
            [
              5,
              3
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Switch 22: Cross-Chain Unlock",
        "switches": [
          {
            "r": 0,
            "c": 2,
            "gateR": 2,
            "gateC": 2,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 4,
            "length": 21,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              6,
              2
            ],
            [
              6,
              3
            ]
          ],
          "B": [
            [
              6,
              4
            ],
            [
              5,
              4
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
              4,
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
        "rows": 7,
        "cols": 5,
        "name": "Switch 23: Basic Unlock",
        "switches": [
          {
            "r": 1,
            "c": 0,
            "gateR": 6,
            "gateC": 0,
            "latch": false
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
            "row": 2,
            "col": 1,
            "length": 24,
            "color": "#a82e2e"
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
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
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
              1,
              4
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
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "shape": [
          "1111111",
          "1111111",
          "1100011",
          "1100011",
          "1100011",
          "1111111",
          "1111111"
        ],
        "name": "Switch 24: Permanent Latch",
        "switches": [
          {
            "r": 3,
            "c": 6,
            "gateR": 1,
            "gateC": 3,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 6,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 23,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              0,
              6
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
              2,
              5
            ],
            [
              3,
              5
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
              4,
              5
            ],
            [
              5,
              5
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
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              2
            ]
          ],
          "B": [
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
            ],
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              1,
              4
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Switch 25: Basic Unlock",
        "switches": [
          {
            "r": 2,
            "c": 5,
            "gateR": 5,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 4,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 20,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
            ]
          ],
          "B": [
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
        "rows": 6,
        "cols": 6,
        "name": "Switch 26: Cross-Chain Unlock",
        "switches": [
          {
            "r": 0,
            "c": 4,
            "gateR": 3,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 19,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 1,
            "length": 17,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ]
          ],
          "B": [
            [
              5,
              1
            ],
            [
              5,
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
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Switch 27: Permanent Latch",
        "switches": [
          {
            "r": 0,
            "c": 2,
            "gateR": 1,
            "gateC": 4,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 4,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 20,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              5,
              4
            ],
            [
              6,
              4
            ]
          ],
          "B": [
            [
              6,
              3
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              4,
              3
            ],
            [
              4,
              2
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "111000",
          "111000",
          "111000",
          "111111",
          "111111",
          "111111"
        ],
        "name": "Switch 28: Cross-Chain Unlock",
        "switches": [
          {
            "r": 3,
            "c": 4,
            "gateR": 0,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              5
            ],
            [
              4,
              5
            ],
            [
              3,
              5
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
              4,
              3
            ],
            [
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              5,
              3
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
              1,
              2
            ]
          ],
          "B": [
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
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 7,
        "name": "Switch 29: Basic Unlock",
        "switches": [
          {
            "r": 5,
            "c": 2,
            "gateR": 4,
            "gateC": 4,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 6,
            "length": 22,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 20,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              6
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              3,
              5
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
            ]
          ],
          "B": [
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
              2,
              4
            ],
            [
              2,
              5
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Switch 30: Permanent Latch",
        "switches": [
          {
            "r": 4,
            "c": 5,
            "gateR": 6,
            "gateC": 5,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 0,
            "length": 26,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              4
            ],
            [
              4,
              5
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
              1,
              5
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
            ]
          ],
          "B": [
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              6,
              5
            ],
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
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
              5,
              2
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
            ],
            [
              1,
              3
            ],
            [
              1,
              4
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "bom-tinh",
    "title": "Static Bombs",
    "icon": "💣",
    "mechanic": "MEC-05",
    "desc": "Touching a Bomb directly is an instant loss. The only way to destroy a Bomb is to push a Push Rock into it.",
    "levels": [
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 1: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 11,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3,
              2
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 2: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 15,
            "color": "#a82e2e"
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
            ]
          ],
          "B": [
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
            ],
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
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 3: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 11,
            "color": "#a82e2e"
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 4: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 16,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
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
              2,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 5: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 14,
            "color": "#a82e2e"
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
            ]
          ],
          "B": [
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
        "rows": 5,
        "cols": 5,
        "name": "Bomb 6: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 13,
            "color": "#a82e2e"
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
              4,
              2
            ],
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 7: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 8: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
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
              4
            ],
            [
              1,
              4
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 9: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
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
            "row": 1,
            "col": 3,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 11,
            "color": "#a82e2e"
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
              4,
              1
            ],
            [
              4,
              0
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 10: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3
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
              3,
              1
            ],
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Bomb 11: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 5,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 5,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 21,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
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
              3,
              3
            ]
          ],
          "B": [
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
              4,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 12: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 13,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3,
              2
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
              4,
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
        "rows": 7,
        "cols": 5,
        "name": "Bomb 13: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 19,
            "color": "#a82e2e"
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
              1,
              1
            ]
          ],
          "B": [
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
              5,
              1
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
              6,
              2
            ],
            [
              5,
              2
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
              6,
              4
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 14: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 8,
            "color": "#a82e2e"
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
            ],
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
            ]
          ],
          "B": [
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
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Bomb 15: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 5,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 4,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 2,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 1,
            "length": 18,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
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
              4,
              1
            ]
          ],
          "B": [
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Bomb 16: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 5
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 5
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 5,
            "length": 18,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 16,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              6
            ],
            [
              1,
              6
            ],
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
          ],
          "B": [
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
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 17: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
            "length": 6,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
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
              3
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
          ],
          "C": [
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
        "rows": 5,
        "cols": 5,
        "name": "Bomb 18: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 3,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
            ]
          ],
          "C": [
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
        "rows": 5,
        "cols": 5,
        "name": "Bomb 19: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
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
            "row": 1,
            "col": 3,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#2a7b4c"
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
            ]
          ],
          "B": [
            [
              4,
              3
            ],
            [
              4,
              2
            ],
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Bomb 20: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 15,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 4,
            "length": 12,
            "color": "#2a7b4c"
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
            ],
            [
              1,
              4
            ],
            [
              2,
              4
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
            ],
            [
              1,
              5
            ],
            [
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Bomb 21: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 4,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
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
          "C": [
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
        "rows": 5,
        "cols": 7,
        "name": "Bomb 22: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 6,
            "length": 14,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 4,
            "length": 9,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              4,
              5
            ],
            [
              4,
              6
            ]
          ],
          "B": [
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
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
              2,
              4
            ]
          ],
          "C": [
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
        "rows": 5,
        "cols": 5,
        "name": "Bomb 23: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 6,
            "color": "#2a7b4c"
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
              4,
              2
            ],
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
              2,
              1
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
              4,
              4
            ],
            [
              4,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Bomb 24: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 6,
            "col": 2,
            "length": 14,
            "color": "#2a7b4c"
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
            ]
          ],
          "B": [
            [
              2,
              1
            ],
            [
              3,
              1
            ],
            [
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              2
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
              6,
              4
            ],
            [
              6,
              3
            ]
          ],
          "C": [
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
        }
      },
      {
        "rows": 5,
        "cols": 7,
        "name": "Bomb 25: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 4
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 15,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 10,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              3
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
              3,
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
              1,
              5
            ],
            [
              2,
              5
            ],
            [
              3,
              5
            ],
            [
              4,
              5
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ]
          ],
          "C": [
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
              2,
              1
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "name": "Bomb 26: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 5,
            "length": 17,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 2,
            "length": 15,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
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
              0,
              5
            ],
            [
              0,
              6
            ],
            [
              1,
              6
            ],
            [
              1,
              5
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
          ],
          "B": [
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
            ]
          ],
          "C": [
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
        "rows": 7,
        "cols": 7,
        "name": "Bomb 27: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 4,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 3,
            "length": 19,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 16,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 5,
            "length": 13,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              3
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
              5,
              4
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
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ]
          ],
          "B": [
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
            ],
            [
              1,
              4
            ],
            [
              1,
              5
            ]
          ],
          "C": [
            [
              0,
              5
            ],
            [
              0,
              6
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
              2,
              5
            ],
            [
              3,
              5
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
              4,
              5
            ],
            [
              5,
              5
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              5,
              6
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "name": "Bomb 28: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 5,
            "c": 4
          }
        ],
        "bombs": [
          {
            "r": 5,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 5,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 24,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              6,
              4
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              5,
              6
            ],
            [
              4,
              6
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ],
            [
              1,
              5
            ],
            [
              2,
              5
            ]
          ],
          "B": [
            [
              3,
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
              4,
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
            ]
          ],
          "C": [
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
              4,
              2
            ],
            [
              5,
              2
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
              6,
              2
            ],
            [
              6,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Bomb 29: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 4,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 14,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 7,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
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
              5,
              3
            ],
            [
              5,
              4
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
            ]
          ],
          "B": [
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
            ]
          ],
          "C": [
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
      },
      {
        "rows": 7,
        "cols": 7,
        "name": "Bomb 30: Destroy the Bomb",
        "pushRocks": [
          {
            "r": 4,
            "c": 1
          }
        ],
        "bombs": [
          {
            "r": 4,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 18,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 15,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 4,
            "length": 15,
            "color": "#2a7b4c"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              0
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
              4,
              4
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
            ],
            [
              5,
              1
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
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ]
          ],
          "C": [
            [
              5,
              4
            ],
            [
              5,
              5
            ],
            [
              6,
              5
            ],
            [
              6,
              6
            ],
            [
              5,
              6
            ],
            [
              4,
              6
            ],
            [
              4,
              5
            ],
            [
              3,
              5
            ],
            [
              3,
              6
            ],
            [
              2,
              6
            ],
            [
              2,
              5
            ],
            [
              1,
              5
            ],
            [
              1,
              6
            ],
            [
              0,
              6
            ],
            [
              0,
              5
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "tong-hop",
    "title": "Combo",
    "icon": "⚔️",
    "mechanic": "COMBO",
    "desc": "The hardest challenge — combining 2-3 core mechanics in the same level.",
    "levels": [
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 1: Switch + Push Rock",
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 1,
            "gateC": 4
          }
        ],
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
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
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
          ],
          "B": [
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
              3,
              1
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
        "rows": 5,
        "cols": 3,
        "name": "Combo 2: Color Gate + Number Code",
        "prisms": [
          {
            "r": 0,
            "c": 1,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 2,
            "color": "blue"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 1,
              "c": 0
            },
            {
              "r": 4,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          }
        ],
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
              4,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 3: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 2,
            "c": 0,
            "gateR": 1,
            "gateC": 3
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
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 4,
            "length": 12,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              3,
              2
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
              4,
              4
            ],
            [
              3,
              4
            ]
          ],
          "B": [
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
        "rows": 5,
        "cols": 5,
        "name": "Combo 4: Switch + Push Rock",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 4,
            "gateC": 2
          }
        ],
        "pushRocks": [
          {
            "r": 3,
            "c": 2
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
            "col": 2,
            "length": 14,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
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
            ],
            [
              0,
              4
            ],
            [
              0,
              3
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 4,
        "cols": 5,
        "name": "Combo 5: Color Gate + Number Code",
        "prisms": [
          {
            "r": 3,
            "c": 1,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 2,
            "color": "green"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 0,
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 20,
            "color": "#1b5e8a"
          }
        ],
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
        "rows": 5,
        "cols": 5,
        "name": "Combo 6: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 1,
            "gateC": 3
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
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 11,
            "color": "#a82e2e"
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
            ]
          ],
          "B": [
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
              4,
              2
            ],
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 7: Switch + Push Rock",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 4,
            "gateC": 3
          }
        ],
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 10,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "111000",
          "111000",
          "111000",
          "111111",
          "111111",
          "111111"
        ],
        "name": "Combo 8: Color Gate + Number Code",
        "prisms": [
          {
            "r": 1,
            "c": 2,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 1,
            "color": "green"
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
              "c": 1
            },
            {
              "r": 3,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 27,
            "color": "#1b5e8a"
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
              5,
              2
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
              3,
              5
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
              1
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 9: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 3,
            "gateC": 2
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 16,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              2,
              1
            ]
          ],
          "B": [
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
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 10: Switch + Push Rock",
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 1,
            "gateC": 4
          }
        ],
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
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 13,
            "color": "#a82e2e"
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
          ],
          "B": [
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
              3,
              1
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
        "rows": 6,
        "cols": 4,
        "name": "Combo 11: Color Gate + Number Code",
        "prisms": [
          {
            "r": 0,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 2,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 4,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 3,
            "length": 24,
            "color": "#1b5e8a"
          }
        ],
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
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              4,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 12: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 2,
            "gateC": 4
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
            "r": 1,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 20,
            "color": "#a82e2e"
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
              5,
              4
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
              5,
              3
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
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
            ],
            [
              4,
              0
            ],
            [
              3,
              0
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 13: Switch + Push Rock",
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 1,
            "gateC": 4
          }
        ],
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 15,
            "color": "#a82e2e"
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
            ]
          ],
          "B": [
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
        "rows": 7,
        "cols": 4,
        "name": "Combo 14: Color Gate + Number Code",
        "prisms": [
          {
            "r": 6,
            "c": 1,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 6,
            "c": 2,
            "color": "blue"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 6,
              "c": 2
            },
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 1,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 0,
            "length": 28,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              0
            ],
            [
              6,
              1
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              5,
              3
            ],
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
              2,
              2
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
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
        "rows": 5,
        "cols": 5,
        "name": "Combo 15: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 2,
            "gateC": 2
          }
        ],
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 3,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 9,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
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
            ],
            [
              1,
              3
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 16: Switch + Push Rock",
        "switches": [
          {
            "r": 0,
            "c": 2,
            "gateR": 1,
            "gateC": 3
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
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
              4,
              4
            ],
            [
              4,
              3
            ]
          ],
          "B": [
            [
              4,
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
        "rows": 5,
        "cols": 6,
        "name": "Combo 17: Color Gate + Number Code",
        "prisms": [
          {
            "r": 1,
            "c": 5,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 5,
            "color": "green"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 5
            },
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 3,
              "c": 5
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 5,
            "length": 30,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              2,
              5
            ],
            [
              1,
              5
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
              3,
              1
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
              3,
              3
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
              5
            ],
            [
              3,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 18: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 3,
            "c": 3,
            "gateR": 4,
            "gateC": 0
          }
        ],
        "pushRocks": [
          {
            "r": 2,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 1,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 22,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 1,
            "length": 12,
            "color": "#a82e2e"
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
              5,
              4
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
              6,
              1
            ],
            [
              6,
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
              5,
              2
            ],
            [
              5,
              3
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
            ]
          ],
          "B": [
            [
              3,
              1
            ],
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
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 19: Switch + Push Rock",
        "switches": [
          {
            "r": 4,
            "c": 2,
            "gateR": 4,
            "gateC": 3
          }
        ],
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 11,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
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
            ]
          ],
          "B": [
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
              3,
              1
            ],
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "shape": [
          "111000",
          "111000",
          "111000",
          "111111",
          "111111",
          "111111"
        ],
        "name": "Combo 20: Color Gate + Number Code",
        "prisms": [
          {
            "r": 5,
            "c": 4,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 5,
            "c": 2,
            "color": "blue"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 5,
              "c": 0
            },
            {
              "r": 0,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 27,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              5
            ],
            [
              5,
              4
            ],
            [
              5,
              3
            ],
            [
              5,
              2
            ],
            [
              5,
              1
            ],
            [
              5,
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
              4,
              5
            ],
            [
              3,
              5
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 21: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 0,
            "c": 2,
            "gateR": 4,
            "gateC": 1
          }
        ],
        "pushRocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 12,
            "color": "#a82e2e"
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
              4,
              4
            ],
            [
              4,
              3
            ]
          ],
          "B": [
            [
              4,
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
            ]
          ]
        }
      },
      {
        "rows": 5,
        "cols": 5,
        "name": "Combo 22: Switch + Push Rock",
        "switches": [
          {
            "r": 3,
            "c": 3,
            "gateR": 4,
            "gateC": 2
          }
        ],
        "pushRocks": [
          {
            "r": 3,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 11,
            "color": "#a82e2e"
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
              4,
              2
            ],
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
              1,
              2
            ],
            [
              1,
              1
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "rows": 6,
        "cols": 6,
        "name": "Combo 23: Color Gate + Number Code",
        "prisms": [
          {
            "r": 4,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 0,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 3,
              "c": 2
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
            "row": 5,
            "col": 0,
            "length": 36,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              0
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
              0,
              5
            ],
            [
              1,
              5
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
            ],
            [
              4,
              1
            ],
            [
              5,
              1
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
      },
      {
        "rows": 7,
        "cols": 7,
        "name": "Combo 24: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 4,
            "c": 2,
            "gateR": 2,
            "gateC": 6
          }
        ],
        "pushRocks": [
          {
            "r": 4,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 4,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 24,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 6,
            "length": 24,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
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
              4
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
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
              0,
              5
            ]
          ],
          "B": [
            [
              0,
              6
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
              5,
              5
            ],
            [
              4,
              5
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
              1,
              5
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
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 25: Switch + Push Rock",
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 3,
            "gateC": 4
          }
        ],
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
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 21,
            "color": "#a82e2e"
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
              5,
              3
            ],
            [
              5,
              4
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
            ],
            [
              4,
              1
            ],
            [
              5,
              1
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 26: Color Gate + Number Code",
        "prisms": [
          {
            "r": 3,
            "c": 0,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 0,
            "color": "green"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 1,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 1,
            "length": 35,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              3,
              1
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
              4,
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
            ],
            [
              6,
              2
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
              4
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
            ],
            [
              1,
              3
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 7,
        "name": "Combo 27: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 4,
            "c": 2,
            "gateR": 6,
            "gateC": 0
          }
        ],
        "pushRocks": [
          {
            "r": 4,
            "c": 3
          }
        ],
        "bombs": [
          {
            "r": 4,
            "c": 4
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 2,
            "length": 27,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 6,
            "col": 3,
            "length": 21,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              2
            ],
            [
              4,
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
            ],
            [
              0,
              4
            ],
            [
              0,
              5
            ],
            [
              0,
              6
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
            ]
          ],
          "B": [
            [
              6,
              3
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
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
              5,
              1
            ],
            [
              5,
              2
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
              3,
              5
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
              1,
              5
            ],
            [
              2,
              5
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 28: Switch + Push Rock",
        "switches": [
          {
            "r": 4,
            "c": 0,
            "gateR": 5,
            "gateC": 1
          }
        ],
        "pushRocks": [
          {
            "r": 4,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 19,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              4,
              0
            ],
            [
              4,
              1
            ],
            [
              5,
              1
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
              6,
              2
            ],
            [
              5,
              2
            ],
            [
              5,
              3
            ],
            [
              6,
              3
            ],
            [
              6,
              4
            ],
            [
              5,
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
            ],
            [
              1,
              4
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 6,
        "name": "Combo 29: Color Gate + Number Code",
        "prisms": [
          {
            "r": 5,
            "c": 5,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 5,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 5
            },
            {
              "r": 3,
              "c": 5
            },
            {
              "r": 4,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 6,
            "col": 5,
            "length": 42,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
            [
              6,
              5
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
              3,
              5
            ],
            [
              2,
              5
            ],
            [
              1,
              5
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
              5,
              4
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
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
              3,
              2
            ],
            [
              4,
              2
            ]
          ]
        }
      },
      {
        "rows": 7,
        "cols": 5,
        "name": "Combo 30: Switch + Push Rock + Bomb",
        "switches": [
          {
            "r": 5,
            "c": 1,
            "gateR": 0,
            "gateC": 4
          }
        ],
        "pushRocks": [
          {
            "r": 5,
            "c": 2
          }
        ],
        "bombs": [
          {
            "r": 5,
            "c": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 1,
            "length": 20,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 14,
            "color": "#a82e2e"
          }
        ],
        "solution": {
          "A": [
            [
              5,
              1
            ],
            [
              5,
              2
            ],
            [
              6,
              2
            ],
            [
              6,
              1
            ],
            [
              6,
              0
            ],
            [
              5,
              0
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
              4,
              3
            ],
            [
              4,
              4
            ],
            [
              5,
              4
            ],
            [
              6,
              4
            ],
            [
              6,
              3
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
