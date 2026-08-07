// File này được sinh tự động bởi scripts/gen-levels.mjs — KHÔNG sửa tay.
// Mỗi màn được kiến tạo từ 1 đường đi Hamilton duy nhất qua toàn bộ ô khả
// dụng của bàn cờ rồi cắt thành N đoạn cho N xích, nên LUÔN phủ kín 100% ô
// (đúng Win Condition ở GDD 3.3) và LUÔN có lời giải (chính là đường đã sinh,
// lưu lại trong trường `solution` của từng màn để dùng cho Buff Gợi Ý). Mỗi
// màn dùng 1 seed ngẫu nhiên riêng và đã được đối chiếu để không trùng bàn cờ
// với màn khác trong cùng thể loại.

export const CATEGORIES = [
  {
    "id": "nhap-mon",
    "title": "Nhập Môn",
    "icon": "🧭",
    "mechanic": "CORE",
    "desc": "Chạm điểm neo và kéo phủ kín bàn cờ với nhiều xích cùng lúc — luật gốc trước khi học các cơ chế khác.",
    "levels": [
      {
        "name": "Nhập Môn 1: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 5,
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
          ]
        }
      },
      {
        "name": "Nhập Môn 2: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 3,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 6,
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
        "name": "Nhập Môn 3: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 3,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 6,
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
          ]
        }
      },
      {
        "name": "Nhập Môn 4: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 1,
            "col": 1,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 0,
            "length": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 5: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 5,
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
        "name": "Nhập Môn 6: Song Xích 3x3",
        "size": 3,
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 2,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
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
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 7: Song Xích 4x4",
        "size": 4,
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
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 8: Song Xích 4x4",
        "size": 4,
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
            "col": 2,
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
              0
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 9: Song Xích 4x4",
        "size": 4,
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
            "row": 3,
            "col": 0,
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
        "name": "Nhập Môn 10: Song Xích 4x4",
        "size": 4,
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
            "col": 1,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 11: Song Xích 4x4",
        "size": 4,
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
            "row": 3,
            "col": 2,
            "length": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 12: Song Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 7,
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
              3,
              0
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 13: Tam Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 3,
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
            "row": 2,
            "col": 3,
            "length": 5,
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
              3,
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
            ]
          ],
          "C": [
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
        "name": "Nhập Môn 14: Tam Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 4,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 5,
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
        "name": "Nhập Môn 15: Tam Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 0,
            "length": 3,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 2,
            "length": 8,
            "color": "#2a7b4c"
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
        "name": "Nhập Môn 16: Tam Xích 4x4",
        "size": 4,
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
            "col": 2,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 1,
            "length": 4,
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
          "C": [
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
        "name": "Nhập Môn 17: Tam Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 3,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 5,
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
              0,
              3
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 18: Tam Xích 4x4",
        "size": 4,
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 1,
            "length": 3,
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
        "name": "Nhập Môn 19: Tam Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
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
            "row": 0,
            "col": 3,
            "length": 8,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 20: Tam Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 4,
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
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
            "length": 5,
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
        "name": "Nhập Môn 21: Tam Xích 5x5",
        "size": 5,
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
            "row": 3,
            "col": 1,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 9,
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
        "name": "Nhập Môn 22: Tam Xích 5x5",
        "size": 5,
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
            "col": 0,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 3,
            "length": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 23: Tam Xích 5x5",
        "size": 5,
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
            "row": 0,
            "col": 3,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 0,
            "length": 6,
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
            ],
            [
              3,
              1
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 24: Tam Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 7,
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
            "row": 0,
            "col": 4,
            "length": 9,
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 25: Tứ Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 3,
            "length": 6,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 2,
            "col": 2,
            "length": 7,
            "color": "#8a6a10"
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
            ]
          ],
          "D": [
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 26: Tứ Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 4,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 3,
            "length": 6,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 2,
            "col": 4,
            "length": 9,
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
          "D": [
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
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 27: Tứ Xích 5x5",
        "size": 5,
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
          },
          {
            "id": "D",
            "row": 2,
            "col": 2,
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
            ]
          ],
          "D": [
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 28: Tứ Xích 5x5",
        "size": 5,
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 4,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 4,
            "length": 7,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 2,
            "col": 0,
            "length": 7,
            "color": "#8a6a10"
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
          "D": [
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
        "name": "Nhập Môn 29: Tứ Xích 6x6",
        "size": 6,
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
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 5,
            "length": 9,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 5,
            "col": 5,
            "length": 10,
            "color": "#8a6a10"
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
            ]
          ],
          "C": [
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
          ],
          "D": [
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
            ]
          ]
        }
      },
      {
        "name": "Nhập Môn 30: Tứ Xích 6x6",
        "size": 6,
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
            "row": 4,
            "col": 1,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 5,
            "length": 11,
            "color": "#2a7b4c"
          },
          {
            "id": "D",
            "row": 5,
            "col": 5,
            "length": 10,
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
          "C": [
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
              3,
              5
            ],
            [
              4,
              5
            ]
          ],
          "D": [
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
      }
    ]
  },
  {
    "id": "vat-can",
    "title": "Vật Cản",
    "icon": "🪨",
    "mechanic": "MEC-01",
    "desc": "Rock chặn cứng, Wall chặn theo cạnh, Push Rock đẩy được để mở đường.",
    "levels": [
      {
        "name": "Vật Cản 1: Tảng Đá Chặn Đường",
        "size": 4,
        "rocks": [
          {
            "r": 1,
            "c": 0
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
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
        "name": "Vật Cản 2: Tảng Đá Chặn Đường",
        "size": 4,
        "rocks": [
          {
            "r": 3,
            "c": 1
          }
        ],
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
            "row": 0,
            "col": 0,
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 3: Tảng Đá Chặn Đường",
        "size": 4,
        "rocks": [
          {
            "r": 1,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 8,
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 4: Tảng Đá Chặn Đường",
        "size": 4,
        "rocks": [
          {
            "r": 2,
            "c": 3
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
            "row": 3,
            "col": 0,
            "length": 4,
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
          ]
        }
      },
      {
        "name": "Vật Cản 5: Tảng Đá Chặn Đường",
        "size": 4,
        "rocks": [
          {
            "r": 2,
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
            "row": 3,
            "col": 3,
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 6: Nhiều Tảng Đá",
        "size": 4,
        "rocks": [
          {
            "r": 3,
            "c": 1
          },
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
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 4,
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
        "name": "Vật Cản 7: Nhiều Tảng Đá",
        "size": 4,
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
            "length": 8,
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
        "name": "Vật Cản 8: Nhiều Tảng Đá",
        "size": 4,
        "rocks": [
          {
            "r": 1,
            "c": 2
          },
          {
            "r": 2,
            "c": 0
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
            "row": 3,
            "col": 2,
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
            ],
            [
              3,
              0
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 9: Vách Ngăn Vô Hình",
        "size": 4,
        "walls": [
          {
            "r1": 1,
            "c1": 3,
            "r2": 2,
            "c2": 3
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
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
        "name": "Vật Cản 10: Vách Ngăn Vô Hình",
        "size": 4,
        "walls": [
          {
            "r1": 1,
            "c1": 3,
            "r2": 2,
            "c2": 3
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
            "row": 3,
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 11: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 2,
            "c1": 0,
            "r2": 2,
            "c2": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 4,
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
          "B": [
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 12: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 2,
            "c2": 1
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
            "row": 0,
            "col": 1,
            "length": 10,
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
        "name": "Vật Cản 13: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 1,
            "c1": 2,
            "r2": 1,
            "c2": 3
          },
          {
            "r1": 2,
            "c1": 1,
            "r2": 3,
            "c2": 1
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
            "row": 0,
            "col": 0,
            "length": 9,
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
        "name": "Vật Cản 14: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 2,
            "c1": 3,
            "r2": 3,
            "c2": 3
          },
          {
            "r1": 1,
            "c1": 0,
            "r2": 2,
            "c2": 0
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
            "row": 4,
            "col": 0,
            "length": 9,
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
        "name": "Vật Cản 15: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 2,
            "c1": 1,
            "r2": 3,
            "c2": 1
          },
          {
            "r1": 3,
            "c1": 3,
            "r2": 4,
            "c2": 3
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
            "row": 3,
            "col": 0,
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 16: Vách Ngăn Vô Hình",
        "size": 5,
        "walls": [
          {
            "r1": 1,
            "c1": 1,
            "r2": 2,
            "c2": 1
          },
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
            "row": 0,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 4,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 4,
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
          "B": [
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
            ],
            [
              1,
              1
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 17: Đẩy Đá Dọn Đường",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 2,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 2,
            "length": 6,
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
            ]
          ],
          "C": [
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
        "name": "Vật Cản 18: Đẩy Đá Dọn Đường",
        "size": 5,
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
            "length": 6,
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
            "row": 3,
            "col": 4,
            "length": 7,
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 19: Đẩy Đá Dọn Đường",
        "size": 5,
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
            "length": 10,
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
            "row": 2,
            "col": 2,
            "length": 6,
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
        "name": "Vật Cản 20: Đẩy Đá Dọn Đường",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 7,
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
            "row": 2,
            "col": 4,
            "length": 12,
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
        "name": "Vật Cản 21: Đẩy Đá Dọn Đường",
        "size": 5,
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
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
          ]
        }
      },
      {
        "name": "Vật Cản 22: Đẩy Đá Dọn Đường",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 6,
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
            "row": 4,
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
            ]
          ],
          "C": [
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
        "name": "Vật Cản 23: Đẩy Đá Dọn Đường",
        "size": 5,
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 3,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 9,
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
              4,
              3
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 24: Đẩy Đá Dọn Đường",
        "size": 5,
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
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 3,
            "length": 7,
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
            ],
            [
              3,
              3
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
        "name": "Vật Cản 25: Nhiều Tảng Đá",
        "size": 6,
        "rocks": [
          {
            "r": 3,
            "c": 4
          },
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
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 15,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 2,
            "length": 8,
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
            ]
          ],
          "C": [
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
        "name": "Vật Cản 26: Vách Ngăn Vô Hình",
        "size": 6,
        "walls": [
          {
            "r1": 1,
            "c1": 2,
            "r2": 1,
            "c2": 3
          },
          {
            "r1": 2,
            "c1": 0,
            "r2": 3,
            "c2": 0
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
            "row": 5,
            "col": 5,
            "length": 17,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
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
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 27: Nhiều Tảng Đá",
        "size": 6,
        "rocks": [
          {
            "r": 3,
            "c": 1
          },
          {
            "r": 0,
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 0,
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 3,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 5,
            "length": 11,
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
              2,
              5
            ]
          ],
          "C": [
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
          ]
        }
      },
      {
        "name": "Vật Cản 28: Vách Ngăn Vô Hình",
        "size": 6,
        "walls": [
          {
            "r1": 2,
            "c1": 0,
            "r2": 2,
            "c2": 1
          },
          {
            "r1": 4,
            "c1": 3,
            "r2": 5,
            "c2": 3
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
            "row": 4,
            "col": 5,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 5,
            "length": 16,
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
            ]
          ],
          "B": [
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
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 29: Nhiều Tảng Đá",
        "size": 6,
        "rocks": [
          {
            "r": 5,
            "c": 2
          },
          {
            "r": 3,
            "c": 5
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 1,
            "length": 10,
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Vật Cản 30: Vách Ngăn Vô Hình",
        "size": 6,
        "walls": [
          {
            "r1": 4,
            "c1": 3,
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
            "row": 5,
            "col": 0,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 13,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 4,
            "length": 15,
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
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "dinh-huong-mau",
    "title": "Định Hướng & Màu",
    "icon": "🎨",
    "mechanic": "MEC-02",
    "desc": "Mũi Tên ép hướng bước kế tiếp; Lăng Kính đổi màu dây; Cổng Màu chỉ cho qua đúng màu.",
    "levels": [
      {
        "name": "Định Hướng 1: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 0,
            "c": 2,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 3,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 2,
            "color": "green"
          }
        ],
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
            "row": 1,
            "col": 3,
            "length": 9,
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
        "name": "Định Hướng 2: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 1,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 2,
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
            "row": 2,
            "col": 2,
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
        "solution": {
          "A": [
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
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 3: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 1,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 2,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 3,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 7,
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
              3,
              0
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 4: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 1,
            "c": 3,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 3,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 1,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 6,
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 5: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 3,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 1,
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
            "row": 2,
            "col": 2,
            "length": 7,
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
        "name": "Định Hướng 6: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 3,
            "dir": "UP"
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
            "r": 2,
            "c": 0,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 7: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 1,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 0,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 6,
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
        "name": "Định Hướng 8: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 1,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 2,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 1,
            "color": "red"
          }
        ],
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
            "row": 3,
            "col": 3,
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
        "name": "Định Hướng 9: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 2,
            "c": 2,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 3,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 3,
            "color": "blue"
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
            "row": 1,
            "col": 1,
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
        "name": "Định Hướng 10: Mũi Tên + Cổng Màu",
        "size": 4,
        "arrows": [
          {
            "r": 1,
            "c": 3,
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
            "r": 3,
            "c": 3,
            "color": "blue"
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
            "row": 1,
            "col": 0,
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 11: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 3,
            "c": 4,
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
            "c": 0,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
            "length": 14,
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
        "name": "Định Hướng 12: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 1,
            "c": 1,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 3,
            "c": 2,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 4,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 13: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 4,
            "c": 4,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 1,
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
            "row": 4,
            "col": 2,
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
        "name": "Định Hướng 14: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 4,
            "c": 1,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 4,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 1,
            "c": 1,
            "color": "blue"
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 15: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 1,
            "c": 4,
            "dir": "LEFT"
          }
        ],
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
            "c": 1,
            "color": "red"
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
            "row": 3,
            "col": 4,
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
        "name": "Định Hướng 16: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 1,
            "c": 0,
            "dir": "RIGHT"
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
            "r": 0,
            "c": 4,
            "color": "red"
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
            "row": 4,
            "col": 1,
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 17: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 0,
            "c": 1,
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
            "r": 2,
            "c": 3,
            "color": "blue"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 4,
            "length": 5,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 11,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 2,
            "length": 9,
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
          "C": [
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
        "name": "Định Hướng 18: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 1,
            "c": 4,
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
            "r": 0,
            "c": 1,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 5,
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
            "row": 4,
            "col": 2,
            "length": 11,
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
        "name": "Định Hướng 19: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 3,
            "c": 2,
            "dir": "LEFT"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 4,
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 0,
            "length": 11,
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
          ]
        }
      },
      {
        "name": "Định Hướng 20: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 3,
            "c": 2,
            "dir": "DOWN"
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
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 3,
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
        "name": "Định Hướng 21: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 1,
            "c": 3,
            "dir": "UP"
          },
          {
            "r": 2,
            "c": 2,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 3,
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
            "row": 1,
            "col": 1,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
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
        "name": "Định Hướng 22: Mũi Tên + Cổng Màu",
        "size": 5,
        "arrows": [
          {
            "r": 3,
            "c": 4,
            "dir": "DOWN"
          },
          {
            "r": 2,
            "c": 0,
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
            "r": 0,
            "c": 3,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 9,
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 23: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 2,
            "c": 2,
            "dir": "RIGHT"
          },
          {
            "r": 5,
            "c": 4,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 3,
            "color": "red"
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
            "row": 1,
            "col": 5,
            "length": 16,
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
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 24: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 0,
            "c": 4,
            "dir": "LEFT"
          },
          {
            "r": 2,
            "c": 2,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 2,
            "c": 5,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 4,
            "c": 5,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 5,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 3,
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
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
        "name": "Định Hướng 25: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 3,
            "c": 4,
            "dir": "RIGHT"
          },
          {
            "r": 3,
            "c": 1,
            "dir": "UP"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 4,
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
            "row": 3,
            "col": 3,
            "length": 8,
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
            "row": 4,
            "col": 5,
            "length": 13,
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
            ]
          ],
          "C": [
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
        "name": "Định Hướng 26: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 1,
            "c": 0,
            "dir": "UP"
          },
          {
            "r": 4,
            "c": 2,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 4,
            "c": 5,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 4,
            "color": "green"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 0,
            "length": 11,
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
            ]
          ],
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 27: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 0,
            "c": 4,
            "dir": "DOWN"
          },
          {
            "r": 5,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 0,
            "c": 2,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 1,
            "color": "red"
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
            "col": 3,
            "length": 12,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 5,
            "col": 0,
            "length": 11,
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
          "B": [
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
              5,
              5
            ],
            [
              5,
              4
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 28: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 3,
            "c": 0,
            "dir": "RIGHT"
          },
          {
            "r": 2,
            "c": 3,
            "dir": "DOWN"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 5,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 5,
            "c": 4,
            "color": "red"
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 11,
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
            "row": 1,
            "col": 0,
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
        "name": "Định Hướng 29: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 5,
            "c": 5,
            "dir": "LEFT"
          },
          {
            "r": 5,
            "c": 2,
            "dir": "RIGHT"
          }
        ],
        "prisms": [
          {
            "r": 1,
            "c": 0,
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
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 2,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 3,
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
          "C": [
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
              5,
              5
            ],
            [
              5,
              4
            ]
          ]
        }
      },
      {
        "name": "Định Hướng 30: Mũi Tên + Cổng Màu",
        "size": 6,
        "arrows": [
          {
            "r": 3,
            "c": 3,
            "dir": "DOWN"
          },
          {
            "r": 5,
            "c": 3,
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
            "c": 4,
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
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 5,
            "length": 14,
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
            ],
            [
              4,
              0
            ]
          ],
          "B": [
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
            ]
          ],
          "C": [
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
      }
    ]
  },
  {
    "id": "mat-ma-so",
    "title": "Mật Mã Số",
    "icon": "🔢",
    "mechanic": "MEC-03",
    "desc": "Chạm các mốc số theo ĐÚNG thứ tự tăng dần, kết thúc đúng tại mốc cuối cùng.",
    "levels": [
      {
        "name": "Mật Mã 1: 3 Mốc Số",
        "size": 4,
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
              "r": 1,
              "c": 2
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 2: 3 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 2
            },
            {
              "r": 1,
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
            "row": 3,
            "col": 3,
            "length": 16,
            "color": "#1b5e8a"
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
        "name": "Mật Mã 3: 3 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 3,
              "c": 3
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
        "name": "Mật Mã 4: 3 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 1,
              "c": 2
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
        "name": "Mật Mã 5: 4 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 3,
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
              "r": 2,
              "c": 2
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 6: 4 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 1
            },
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 1,
              "c": 2
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
            "row": 0,
            "col": 0,
            "length": 16,
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 7: 4 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 0
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
              "c": 2
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
        "name": "Mật Mã 8: 4 Mốc Số",
        "size": 4,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 1,
              "c": 2
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
            ],
            [
              0,
              2
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 9: 5 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 3,
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
            "length": 25,
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
        "name": "Mật Mã 10: 5 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 4
            },
            {
              "r": 4,
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
              "r": 0,
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 25,
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
        "name": "Mật Mã 11: 5 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 1,
              "c": 0
            },
            {
              "r": 4,
              "c": 0
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
            "length": 25,
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 12: 5 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 1,
              "c": 4
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
              "r": 4,
              "c": 0
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 25,
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 13: 6 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 0,
              "c": 4
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 4,
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 25,
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
        "name": "Mật Mã 14: 6 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 2,
              "c": 3
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 0,
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
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
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
        "name": "Mật Mã 15: 6 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 4
            },
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 1,
              "c": 4
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
            "row": 4,
            "col": 0,
            "length": 25,
            "color": "#1b5e8a"
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 16: 6 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 4
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
              "r": 4,
              "c": 0
            },
            {
              "r": 4,
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
            "row": 2,
            "col": 2,
            "length": 25,
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
        "name": "Mật Mã 17: 7 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 2
            },
            {
              "r": 1,
              "c": 3
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 4,
              "c": 1
            },
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
              "c": 2
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
        "name": "Mật Mã 18: 7 Mốc Số",
        "size": 5,
        "waypoints": {
          "A": [
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 2,
              "c": 3
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
              "r": 1,
              "c": 2
            },
            {
              "r": 2,
              "c": 0
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
            "row": 4,
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
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
        "name": "Mật Mã 19: 7 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 4,
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
              "r": 2,
              "c": 1
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
        "name": "Mật Mã 20: 7 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 5
            },
            {
              "r": 4,
              "c": 0
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
            },
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 1,
              "c": 5
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
        "name": "Mật Mã 21: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 5
            },
            {
              "r": 1,
              "c": 4
            },
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 3,
              "c": 0
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
              "r": 4,
              "c": 2
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
        "name": "Mật Mã 22: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 2
            },
            {
              "r": 4,
              "c": 0
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
              "r": 0,
              "c": 3
            },
            {
              "r": 0,
              "c": 5
            },
            {
              "r": 3,
              "c": 5
            },
            {
              "r": 5,
              "c": 4
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 36,
            "color": "#1b5e8a"
          }
        ],
        "solution": {
          "A": [
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
              5,
              5
            ],
            [
              5,
              4
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 23: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 0,
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
              "r": 1,
              "c": 0
            },
            {
              "r": 5,
              "c": 0
            },
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 3,
              "c": 1
            },
            {
              "r": 2,
              "c": 3
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 36,
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
              3,
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
        "name": "Mật Mã 24: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 5
            },
            {
              "r": 3,
              "c": 5
            },
            {
              "r": 4,
              "c": 4
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 1,
              "c": 1
            },
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 4,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 36,
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 25: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
            {
              "r": 5,
              "c": 0
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
              "r": 0,
              "c": 1
            },
            {
              "r": 3,
              "c": 0
            },
            {
              "r": 3,
              "c": 4
            },
            {
              "r": 1,
              "c": 3
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
            "row": 5,
            "col": 5,
            "length": 36,
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
        "name": "Mật Mã 26: 8 Mốc Số",
        "size": 6,
        "waypoints": {
          "A": [
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
              "c": 2
            },
            {
              "r": 4,
              "c": 5
            },
            {
              "r": 3,
              "c": 4
            },
            {
              "r": 2,
              "c": 1
            },
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 4,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 36,
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
            ],
            [
              4,
              1
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 27: 8 Mốc Số",
        "size": 7,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 1
            },
            {
              "r": 0,
              "c": 5
            },
            {
              "r": 1,
              "c": 2
            },
            {
              "r": 5,
              "c": 2
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 6,
              "c": 5
            },
            {
              "r": 3,
              "c": 6
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
            "row": 6,
            "col": 0,
            "length": 49,
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
              6,
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 28: 8 Mốc Số",
        "size": 7,
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 0
            },
            {
              "r": 6,
              "c": 5
            },
            {
              "r": 5,
              "c": 3
            },
            {
              "r": 4,
              "c": 3
            },
            {
              "r": 2,
              "c": 5
            },
            {
              "r": 1,
              "c": 5
            },
            {
              "r": 1,
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
            "row": 3,
            "col": 3,
            "length": 49,
            "color": "#1b5e8a"
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
              6,
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
        "name": "Mật Mã 29: 8 Mốc Số",
        "size": 7,
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 0
            },
            {
              "r": 5,
              "c": 1
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
              "r": 6,
              "c": 6
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 49,
            "color": "#1b5e8a"
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
              5,
              6
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
            ]
          ]
        }
      },
      {
        "name": "Mật Mã 30: 8 Mốc Số",
        "size": 7,
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 6
            },
            {
              "r": 1,
              "c": 0
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
              "r": 5,
              "c": 0
            },
            {
              "r": 4,
              "c": 6
            },
            {
              "r": 4,
              "c": 3
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
            "col": 0,
            "length": 49,
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
              4,
              1
            ],
            [
              5,
              1
            ]
          ]
        }
      }
    ]
  },
  {
    "id": "cong-tac",
    "title": "Công Tắc",
    "icon": "🔘",
    "mechanic": "MEC-04",
    "desc": "Giữ 1 dây trên Công Tắc để mở Cổng cho dây khác; Latch giữ Cổng mở vĩnh viễn sau 1 lần kích hoạt.",
    "levels": [
      {
        "name": "Công Tắc 1: Mở Khoá Cơ Bản",
        "size": 4,
        "switches": [
          {
            "r": 0,
            "c": 1,
            "gateR": 1,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 3,
            "length": 8,
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
        "name": "Công Tắc 2: Mở Khoá Chéo Xích",
        "size": 4,
        "switches": [
          {
            "r": 1,
            "c": 0,
            "gateR": 0,
            "gateC": 1,
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
            "row": 1,
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
        "name": "Công Tắc 3: Chốt Khoá Vĩnh Viễn",
        "size": 4,
        "switches": [
          {
            "r": 2,
            "c": 3,
            "gateR": 0,
            "gateC": 3,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 6,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 10,
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
        "name": "Công Tắc 4: Mở Khoá Chéo Xích",
        "size": 4,
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 1,
            "gateC": 1,
            "latch": false
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
            "row": 1,
            "col": 3,
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
        "name": "Công Tắc 5: Mở Khoá Cơ Bản",
        "size": 4,
        "switches": [
          {
            "r": 3,
            "c": 2,
            "gateR": 3,
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
            "row": 0,
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 6: Chốt Khoá Vĩnh Viễn",
        "size": 4,
        "switches": [
          {
            "r": 0,
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
            "col": 3,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 7: Mở Khoá Cơ Bản",
        "size": 4,
        "switches": [
          {
            "r": 0,
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
            "col": 3,
            "length": 9,
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
        "name": "Công Tắc 8: Mở Khoá Chéo Xích",
        "size": 4,
        "switches": [
          {
            "r": 2,
            "c": 0,
            "gateR": 3,
            "gateC": 1,
            "latch": false
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
            "row": 0,
            "col": 3,
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
        "name": "Công Tắc 9: Chốt Khoá Vĩnh Viễn",
        "size": 4,
        "switches": [
          {
            "r": 2,
            "c": 3,
            "gateR": 3,
            "gateC": 1,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 7,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 10: Mở Khoá Chéo Xích",
        "size": 4,
        "switches": [
          {
            "r": 0,
            "c": 0,
            "gateR": 1,
            "gateC": 3,
            "latch": false
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
            "row": 3,
            "col": 3,
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
        "name": "Công Tắc 11: Mở Khoá Cơ Bản",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 0,
            "gateR": 1,
            "gateC": 0,
            "latch": false
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
            "row": 4,
            "col": 3,
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
        "name": "Công Tắc 12: Chốt Khoá Vĩnh Viễn",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 4,
            "gateR": 0,
            "gateC": 0,
            "latch": true
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
            "row": 3,
            "col": 1,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 13: Mở Khoá Cơ Bản",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 0,
            "gateR": 0,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
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
          ]
        }
      },
      {
        "name": "Công Tắc 14: Mở Khoá Chéo Xích",
        "size": 5,
        "switches": [
          {
            "r": 0,
            "c": 3,
            "gateR": 4,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 11,
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
        "name": "Công Tắc 15: Chốt Khoá Vĩnh Viễn",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 0,
            "gateR": 4,
            "gateC": 1,
            "latch": true
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
            "row": 0,
            "col": 4,
            "length": 13,
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
              2,
              1
            ],
            [
              2,
              2
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 16: Mở Khoá Chéo Xích",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 3,
            "gateR": 1,
            "gateC": 2,
            "latch": false
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
            "row": 1,
            "col": 0,
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
        "name": "Công Tắc 17: Mở Khoá Cơ Bản",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 4,
            "gateR": 4,
            "gateC": 1,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 9,
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
        "name": "Công Tắc 18: Chốt Khoá Vĩnh Viễn",
        "size": 5,
        "switches": [
          {
            "r": 0,
            "c": 1,
            "gateR": 2,
            "gateC": 4,
            "latch": true
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
            "row": 3,
            "col": 4,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 19: Mở Khoá Cơ Bản",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 2,
            "gateR": 4,
            "gateC": 4,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 2,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 11,
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
        "name": "Công Tắc 20: Mở Khoá Chéo Xích",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 1,
            "gateR": 1,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
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
        "name": "Công Tắc 21: Chốt Khoá Vĩnh Viễn",
        "size": 5,
        "switches": [
          {
            "r": 0,
            "c": 0,
            "gateR": 1,
            "gateC": 2,
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
            "row": 3,
            "col": 0,
            "length": 10,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 22: Mở Khoá Chéo Xích",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 3,
            "gateR": 3,
            "gateC": 3,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 4,
            "col": 0,
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
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
        "name": "Công Tắc 23: Mở Khoá Cơ Bản",
        "size": 6,
        "switches": [
          {
            "r": 0,
            "c": 3,
            "gateR": 1,
            "gateC": 0,
            "latch": false
          }
        ],
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
            "row": 1,
            "col": 4,
            "length": 26,
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
            ]
          ],
          "B": [
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
        "name": "Công Tắc 24: Chốt Khoá Vĩnh Viễn",
        "size": 6,
        "switches": [
          {
            "r": 1,
            "c": 5,
            "gateR": 4,
            "gateC": 1,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 20,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 16,
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
              4
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
              5,
              5
            ],
            [
              5,
              4
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 25: Mở Khoá Cơ Bản",
        "size": 6,
        "switches": [
          {
            "r": 3,
            "c": 2,
            "gateR": 1,
            "gateC": 5,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 26: Mở Khoá Chéo Xích",
        "size": 6,
        "switches": [
          {
            "r": 0,
            "c": 5,
            "gateR": 3,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 18,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 2,
            "length": 18,
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
        "name": "Công Tắc 27: Chốt Khoá Vĩnh Viễn",
        "size": 6,
        "switches": [
          {
            "r": 0,
            "c": 0,
            "gateR": 4,
            "gateC": 0,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 20,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 2,
            "length": 16,
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
        "name": "Công Tắc 28: Mở Khoá Chéo Xích",
        "size": 6,
        "switches": [
          {
            "r": 2,
            "c": 4,
            "gateR": 4,
            "gateC": 0,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 5,
            "col": 0,
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
            ],
            [
              0,
              5
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 29: Mở Khoá Cơ Bản",
        "size": 6,
        "switches": [
          {
            "r": 0,
            "c": 4,
            "gateR": 5,
            "gateC": 4,
            "latch": false
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 0,
            "length": 20,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 4,
            "length": 16,
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
            ],
            [
              4,
              3
            ]
          ],
          "B": [
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
            ]
          ]
        }
      },
      {
        "name": "Công Tắc 30: Chốt Khoá Vĩnh Viễn",
        "size": 6,
        "switches": [
          {
            "r": 1,
            "c": 5,
            "gateR": 2,
            "gateC": 1,
            "latch": true
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 0,
            "col": 5,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 20,
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
      }
    ]
  },
  {
    "id": "bom-tinh",
    "title": "Bom Tĩnh",
    "icon": "💣",
    "mechanic": "MEC-05",
    "desc": "Chạm trực tiếp vào Bom = thua ngay. Chỉ phá được Bom bằng cách đẩy Push Rock va vào.",
    "levels": [
      {
        "name": "Bom Tĩnh 1: Phá Bom",
        "size": 5,
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
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 2,
            "length": 12,
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
          ]
        }
      },
      {
        "name": "Bom Tĩnh 2: Phá Bom",
        "size": 5,
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
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 8,
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
        "name": "Bom Tĩnh 3: Phá Bom",
        "size": 5,
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
        "name": "Bom Tĩnh 4: Phá Bom",
        "size": 5,
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
            "length": 12,
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
        "name": "Bom Tĩnh 5: Phá Bom",
        "size": 5,
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
        "name": "Bom Tĩnh 6: Phá Bom",
        "size": 5,
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
            "row": 1,
            "col": 3,
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
        "name": "Bom Tĩnh 7: Phá Bom",
        "size": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Bom Tĩnh 8: Phá Bom",
        "size": 5,
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
            "row": 1,
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
        "name": "Bom Tĩnh 9: Phá Bom",
        "size": 5,
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
            "length": 15,
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
        "name": "Bom Tĩnh 10: Phá Bom",
        "size": 5,
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
            "row": 1,
            "col": 2,
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
        "name": "Bom Tĩnh 11: Phá Bom",
        "size": 5,
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
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 4,
            "length": 11,
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
        "name": "Bom Tĩnh 12: Phá Bom",
        "size": 5,
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
        "name": "Bom Tĩnh 13: Phá Bom",
        "size": 5,
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
            "length": 13,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 4,
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
        "name": "Bom Tĩnh 14: Phá Bom",
        "size": 5,
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
            ],
            [
              0,
              1
            ]
          ]
        }
      },
      {
        "name": "Bom Tĩnh 15: Phá Bom",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 3
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
            "col": 4,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 14,
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
        "name": "Bom Tĩnh 16: Phá Bom",
        "size": 5,
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
          ]
        }
      },
      {
        "name": "Bom Tĩnh 17: Phá Bom",
        "size": 5,
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
            "row": 1,
            "col": 4,
            "length": 7,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 2,
            "length": 6,
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
              3,
              2
            ]
          ],
          "C": [
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
        "name": "Bom Tĩnh 18: Phá Bom",
        "size": 5,
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
            "length": 8,
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
            "length": 9,
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
        "name": "Bom Tĩnh 19: Phá Bom",
        "size": 5,
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
            "col": 1,
            "length": 9,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 2,
            "col": 2,
            "length": 6,
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
        "name": "Bom Tĩnh 20: Phá Bom",
        "size": 5,
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
            "row": 2,
            "col": 1,
            "length": 5,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 4,
            "length": 10,
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
          "C": [
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
        "name": "Bom Tĩnh 21: Phá Bom",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 3
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
            "col": 4,
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 6,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 3,
            "col": 1,
            "length": 10,
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
            ]
          ],
          "C": [
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
        "name": "Bom Tĩnh 22: Phá Bom",
        "size": 5,
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
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 12,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Bom Tĩnh 23: Phá Bom",
        "size": 5,
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
            "length": 5,
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
            "row": 0,
            "col": 0,
            "length": 10,
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
        "name": "Bom Tĩnh 24: Phá Bom",
        "size": 5,
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
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 6,
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
        "name": "Bom Tĩnh 25: Phá Bom",
        "size": 5,
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
            "col": 4,
            "length": 7,
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
        "name": "Bom Tĩnh 26: Phá Bom",
        "size": 5,
        "pushRocks": [
          {
            "r": 2,
            "c": 3
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
            "col": 4,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 1,
            "length": 7,
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
        "name": "Bom Tĩnh 27: Phá Bom",
        "size": 5,
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
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 0,
            "col": 1,
            "length": 5,
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
            ]
          ]
        }
      },
      {
        "name": "Bom Tĩnh 28: Phá Bom",
        "size": 5,
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
            "length": 8,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 0,
            "length": 10,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 1,
            "col": 1,
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
          "C": [
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
            ]
          ]
        }
      },
      {
        "name": "Bom Tĩnh 29: Phá Bom",
        "size": 5,
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
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 8,
            "color": "#a82e2e"
          },
          {
            "id": "C",
            "row": 4,
            "col": 4,
            "length": 6,
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
          ],
          "C": [
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
        "name": "Bom Tĩnh 30: Phá Bom",
        "size": 5,
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
            "length": 6,
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
            "row": 1,
            "col": 0,
            "length": 11,
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
            ]
          ],
          "B": [
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
          "C": [
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
      }
    ]
  },
  {
    "id": "tong-hop",
    "title": "Tổng Hợp",
    "icon": "⚔️",
    "mechanic": "COMBO",
    "desc": "Thử thách khó nhất — kết hợp 2-3 cơ chế lõi trong cùng 1 màn.",
    "levels": [
      {
        "name": "Tổng Hợp 1: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 2,
            "c": 4,
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
            "row": 2,
            "col": 4,
            "length": 8,
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
        "name": "Tổng Hợp 2: Cổng Màu + Mật Mã Số",
        "size": 4,
        "prisms": [
          {
            "r": 2,
            "c": 0,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 0,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 0
            },
            {
              "r": 3,
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
        "name": "Tổng Hợp 3: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 3,
            "gateR": 3,
            "gateC": 2
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
            "length": 17,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 4: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 2,
            "gateC": 0
          }
        ],
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
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 4,
            "length": 12,
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
        "name": "Tổng Hợp 5: Cổng Màu + Mật Mã Số",
        "size": 4,
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
            "c": 3,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 3
            },
            {
              "r": 1,
              "c": 1
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
            "row": 2,
            "col": 2,
            "length": 16,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 6: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 1,
            "gateC": 1
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
            "r": 3,
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
            "row": 3,
            "col": 1,
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
        "name": "Tổng Hợp 7: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 3,
            "gateC": 0
          }
        ],
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
            "length": 14,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 3,
            "length": 10,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 8: Cổng Màu + Mật Mã Số",
        "size": 4,
        "prisms": [
          {
            "r": 1,
            "c": 3,
            "color": "red"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 3,
            "color": "red"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 3
            },
            {
              "r": 1,
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
            "row": 0,
            "col": 3,
            "length": 16,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 9: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 2,
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
            "row": 2,
            "col": 2,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 10: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 3,
            "gateR": 2,
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
            "row": 3,
            "col": 3,
            "length": 11,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 2,
            "col": 1,
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
        "name": "Tổng Hợp 11: Cổng Màu + Mật Mã Số",
        "size": 5,
        "prisms": [
          {
            "r": 3,
            "c": 4,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 4,
            "color": "green"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 4
            },
            {
              "r": 2,
              "c": 0
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
            "row": 4,
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
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
          ]
        }
      },
      {
        "name": "Tổng Hợp 12: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 2,
            "c": 0,
            "gateR": 0,
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
            "length": 7,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 2,
            "length": 17,
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
        "name": "Tổng Hợp 13: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 1,
            "c": 3,
            "gateR": 2,
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
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 0,
            "length": 9,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 14: Cổng Màu + Mật Mã Số",
        "size": 5,
        "prisms": [
          {
            "r": 4,
            "c": 3,
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
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 1,
              "c": 4
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
            "row": 4,
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
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
        "name": "Tổng Hợp 15: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 2,
            "c": 0,
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
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 0,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 4,
            "col": 4,
            "length": 14,
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
            ]
          ],
          "B": [
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
        "name": "Tổng Hợp 16: Công Tắc + Đẩy Đá",
        "size": 5,
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
        "name": "Tổng Hợp 17: Cổng Màu + Mật Mã Số",
        "size": 5,
        "prisms": [
          {
            "r": 4,
            "c": 3,
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
        "waypoints": {
          "A": [
            {
              "r": 4,
              "c": 1
            },
            {
              "r": 4,
              "c": 0
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
            "col": 4,
            "length": 25,
            "color": "#1b5e8a"
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
        "name": "Tổng Hợp 18: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 1,
            "c": 1,
            "gateR": 4,
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
            "row": 3,
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
          ]
        }
      },
      {
        "name": "Tổng Hợp 19: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 4,
            "c": 2,
            "gateR": 4,
            "gateC": 1
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
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 3,
            "length": 9,
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
        "name": "Tổng Hợp 20: Cổng Màu + Mật Mã Số",
        "size": 5,
        "prisms": [
          {
            "r": 0,
            "c": 1,
            "color": "green"
          }
        ],
        "colorGates": [
          {
            "r": 0,
            "c": 3,
            "color": "green"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 0,
              "c": 3
            },
            {
              "r": 4,
              "c": 3
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
            "row": 0,
            "col": 0,
            "length": 25,
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
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 21: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 2,
            "c": 4,
            "gateR": 1,
            "gateC": 2
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
            "r": 2,
            "c": 2
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 2,
            "col": 4,
            "length": 16,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 0,
            "length": 8,
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
        "name": "Tổng Hợp 22: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 3,
            "gateR": 4,
            "gateC": 1
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
            "length": 15,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 9,
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
        "name": "Tổng Hợp 23: Cổng Màu + Mật Mã Số",
        "size": 6,
        "prisms": [
          {
            "r": 4,
            "c": 5,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 2,
            "c": 5,
            "color": "blue"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 2,
              "c": 5
            },
            {
              "r": 5,
              "c": 1
            },
            {
              "r": 4,
              "c": 1
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 36,
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
            ],
            [
              4,
              1
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 24: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
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
        "name": "Tổng Hợp 25: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 2,
            "c": 4,
            "gateR": 1,
            "gateC": 3
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
            "row": 2,
            "col": 4,
            "length": 9,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 0,
            "col": 1,
            "length": 15,
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
          ]
        }
      },
      {
        "name": "Tổng Hợp 26: Cổng Màu + Mật Mã Số",
        "size": 6,
        "prisms": [
          {
            "r": 4,
            "c": 5,
            "color": "blue"
          }
        ],
        "colorGates": [
          {
            "r": 3,
            "c": 5,
            "color": "blue"
          }
        ],
        "waypoints": {
          "A": [
            {
              "r": 3,
              "c": 5
            },
            {
              "r": 2,
              "c": 5
            },
            {
              "r": 1,
              "c": 2
            }
          ]
        },
        "anchors": [
          {
            "id": "A",
            "row": 5,
            "col": 5,
            "length": 36,
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
        "name": "Tổng Hợp 27: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 3,
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
            "c": 1
          }
        ],
        "anchors": [
          {
            "id": "A",
            "row": 3,
            "col": 3,
            "length": 10,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 1,
            "col": 1,
            "length": 14,
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
        "name": "Tổng Hợp 28: Công Tắc + Đẩy Đá",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 4,
            "gateC": 1
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
        "name": "Tổng Hợp 29: Cổng Màu + Mật Mã Số",
        "size": 6,
        "prisms": [
          {
            "r": 0,
            "c": 4,
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
              "c": 1
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
              5,
              2
            ],
            [
              5,
              3
            ]
          ]
        }
      },
      {
        "name": "Tổng Hợp 30: Công Tắc + Đẩy Đá + Bom",
        "size": 5,
        "switches": [
          {
            "r": 3,
            "c": 1,
            "gateR": 3,
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
            "length": 12,
            "color": "#1b5e8a"
          },
          {
            "id": "B",
            "row": 3,
            "col": 3,
            "length": 12,
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
          ]
        }
      }
    ]
  }
];

export function getCategory(categoryId) {
  return CATEGORIES.find(c => c.id === categoryId);
}
