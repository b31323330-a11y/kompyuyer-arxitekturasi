/* Auto-generated comprehensive Lab metadata from docs/*.docx */

export interface LabTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface KeyFormula {
  label: string;
  formula: string;
  desc: string;
}

export interface KeyConcept {
  term: string;
  def: string;
}

export interface LabItem {
  id: number;
  index: number;
  title: string;
  shortName: string;
  category: string;
  campaignStage: number;
  icon: string;
  objective: string;
  keyFormulas: KeyFormula[];
  keyConcepts: KeyConcept[];
  tables: LabTable[];
}

export const LABS_DATA: LabItem[] = [
  {
    "id": 2,
    "index": 0,
    "title": "2-Amaliy mashg‘ulot: Kompyuterlarning asosiy va qo‘shimcha qurilmalarini o‘rganish",
    "shortName": "Qurilmalar",
    "category": "Qurilmalar va Sanoq",
    "campaignStage": 1,
    "icon": "Monitor",
    "objective": "kompyuter qurilmalarini ichki va tashqi, asosiy va qo‘shimcha, kiritish va chiqarish guruhlariga ajratish; qurilmalarning vazifasi va kompyuter tizimidagi o‘rnini amaliy misollar asosida tushuntirish ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "2.1-jadval",
        "headers": [
          "Qurilma",
          "Joylashuvi",
          "Funksional guruhi",
          "Vazifasi"
        ],
        "rows": [
          [
            "Klaviatura",
            "Tashqi",
            "Kiritish",
            "Matn va buyruqlarni kiritish"
          ],
          [
            "Sichqoncha",
            "Tashqi",
            "Kiritish",
            "Ko‘rsatkichni boshqarish va tanlash"
          ],
          [
            "Monitor",
            "Tashqi",
            "Chiqarish",
            "Tasvirni ko‘rsatish"
          ],
          [
            "Printer",
            "Tashqi",
            "Chiqarish",
            "Matn va grafikani qog‘ozga chiqarish"
          ],
          [
            "Mikrofon",
            "Tashqi",
            "Kiritish",
            "Ovoz signalini kiritish"
          ]
        ]
      },
      {
        "title": "2.2-jadval",
        "headers": [
          "Vazifa",
          "Ustuvor qurilmalar",
          "Izoh"
        ],
        "rows": [
          [
            "Ofis va ta’lim",
            "CPU, 8–16 GB RAM, SSD, monitor, klaviatura, sichqoncha",
            "Barqarorlik va tezkor SSD muhim."
          ],
          [
            "Dasturlash",
            "Ko‘p yadroli CPU, yetarli RAM, SSD, qulay monitor",
            "IDE, brauzer va virtual muhitlar bir vaqtda ishlashi mumkin."
          ],
          [
            "Grafik dizayn",
            "CPU, katta RAM, GPU, sifatli monitor, SSD",
            "Rang aniqligi va grafik tezlatish muhim."
          ],
          [
            "Video montaj",
            "Ko‘p yadroli CPU, katta RAM, GPU, tez SSD",
            "Katta hajmli media fayllar bilan ishlanadi."
          ],
          [
            "Oddiy multimedia",
            "Integratsiyalashgan GPU, SSD, audio qurilmalar",
            "Kundalik vazifalar uchun yetarli konfiguratsiya tanlanadi."
          ]
        ]
      },
      {
        "title": "2.3-jadval",
        "headers": [
          "№",
          "Qurilma nomi",
          "Ichki/Tashqi",
          "Kiritish/Chiqarish/K-Ch",
          "Vazifasi"
        ],
        "rows": [
          [
            "1",
            "________________",
            "__________",
            "________________",
            "________________________"
          ],
          [
            "2",
            "________________",
            "__________",
            "________________",
            "________________________"
          ],
          [
            "3",
            "________________",
            "__________",
            "________________",
            "________________________"
          ],
          [
            "4",
            "________________",
            "__________",
            "________________",
            "________________________"
          ],
          [
            "5",
            "________________",
            "__________",
            "________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "K-Q-S-Ch modeli",
        "formula": "Kiritish → Qayta ishlash → Saqlash → Chiqarish",
        "desc": "Kompyuterning axborot aylanish zanjiri"
      }
    ],
    "keyConcepts": [
      {
        "term": "Ichki qurilmalar",
        "def": "Tizim bloki (korpus) ichida, ona plataga bevosita o‘rnatiladigan qismlar: CPU, RAM, ona plata, ichki SSD/HDD, quvvat bloki."
      },
      {
        "term": "Tashqi qurilmalar (Periferiya)",
        "def": "Korpus tashqarisidan portlar (USB, HDMI, audio) orqali ulanadigan kiritish, chiqarish va saqlash vositalari."
      },
      {
        "term": "K-Ch qurilmalari",
        "def": "Ham ma’lumot kiritish, ham chiqarish imkonini beruvchi qurilmalar: sensorli monitor, naushnik-mikrofon garniturasi, tashqi drayvlar."
      }
    ]
  },
  {
    "id": 4,
    "index": 1,
    "title": "4-Amaliy mashg‘ulot: Kompyuterni tashkil etishning arifmetik asoslari",
    "shortName": "Sanoq tizimlari",
    "category": "Qurilmalar va Sanoq",
    "campaignStage": 1,
    "icon": "Binary",
    "objective": "pozitsion sanoq tizimlari, sanoq tizimi asosi, razryad og‘irligi, bit va bayt tushunchalarini o‘rganish; ikkilik, sakkizlik, o‘nlik va o‘n oltilik sanoq tizimlarining kompyuter texnikasidagi o‘rnini tushuntirish.",
    "tables": [
      {
        "title": "4.1-jadval",
        "headers": [
          "Sanoq tizimi",
          "Asosi",
          "Foydalaniladigan belgilar",
          "Misol"
        ],
        "rows": [
          [
            "Ikkilik",
            "2",
            "0, 1",
            "101101₂"
          ],
          [
            "Sakkizlik",
            "8",
            "0–7",
            "725₈"
          ],
          [
            "O‘nlik",
            "10",
            "0–9",
            "245₁₀"
          ],
          [
            "O‘n oltilik",
            "16",
            "0–9 va A–F",
            "3AF₁₆"
          ]
        ]
      },
      {
        "title": "4.2-jadval",
        "headers": [
          "Razryad",
          "2⁷",
          "2⁶",
          "2⁵",
          "2⁴",
          "2³",
          "2²",
          "2¹",
          "2⁰"
        ],
        "rows": [
          [
            "Qiymat",
            "128",
            "64",
            "32",
            "16",
            "8",
            "4",
            "2",
            "1"
          ]
        ]
      },
      {
        "title": "4.3-jadval",
        "headers": [
          "Tizim",
          "Raqamlar soni",
          "Eng katta bitta raqam",
          "Kompyuterda qo‘llanishiga misol"
        ],
        "rows": [
          [
            "2-lik",
            "2",
            "1",
            "Bitlar, mantiqiy holatlar"
          ],
          [
            "8-lik",
            "8",
            "7",
            "Ikkilik yozuvni 3 bitli guruhlar bilan ixchamlash"
          ],
          [
            "10-lik",
            "10",
            "9",
            "Kundalik hisob-kitob"
          ],
          [
            "16-lik",
            "16",
            "F",
            "Manzil, mashina kodi va ikkilik ma’lumotni ixcham yozish"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Pozitsion og‘irlik",
        "formula": "N = dₙ·bⁿ + ... + d₁·b¹ + d₀·b⁰",
        "desc": "b — sanoq tizimi asosi, dᵢ — tegishli razryad raqami"
      },
      {
        "label": "Diapazon (ishorasiz)",
        "formula": "0 ... 2ⁿ - 1",
        "desc": "n bitli ishorasiz butun son qabul qilishi mumkin bo‘lgan oraliq (8 bit uchun: 0...255)"
      }
    ],
    "keyConcepts": [
      {
        "term": "Bit",
        "def": "Axborotning eng kichik o‘lchov birligi, faqat 0 yoki 1 qiymatini oladi."
      },
      {
        "term": "Nibble",
        "def": "4 ta bitdan iborat guruh (yarim bayt). Bitta o‘n oltilik (HEX) raqam aynan 1 ta nibble ga teng."
      },
      {
        "term": "Bayt (Byte)",
        "def": "8 ta bitdan iborat guruh. 0 dan 255 gacha (2⁸ = 256 ta) turli qiymatni ifodalaydi."
      }
    ]
  },
  {
    "id": 5,
    "index": 2,
    "title": "5-Amaliy mashg‘ulot: Turli xil sanoq tizimlarida sonlarni bir sanoq tizimidan boshqasiga o‘tkazish",
    "shortName": "O‘tkazish",
    "category": "Qurilmalar va Sanoq",
    "campaignStage": 1,
    "icon": "ArrowRightLeft",
    "objective": "ikkilik, sakkizlik, o‘nlik va o‘n oltilik sanoq tizimlari orasida sonlarni o‘tkazish algoritmlarini o‘rganish, amaliy misollarni qo‘lda yechish va natijani dasturiy vosita yordamida tekshirish ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "5.1-jadval",
        "headers": [
          "O‘nlik",
          "Ikkilik",
          "Sakkizlik",
          "O‘n oltilik"
        ],
        "rows": [
          [
            "0",
            "0000",
            "0",
            "0"
          ],
          [
            "1",
            "0001",
            "1",
            "1"
          ],
          [
            "2",
            "0010",
            "2",
            "2"
          ],
          [
            "3",
            "0011",
            "3",
            "3"
          ],
          [
            "4",
            "0100",
            "4",
            "4"
          ]
        ]
      },
      {
        "title": "5.2-jadval",
        "headers": [
          "Boshlang‘ich tizim",
          "Yakuniy tizim",
          "Tavsiya etilgan usul"
        ],
        "rows": [
          [
            "10-lik",
            "2-lik",
            "2 ga ketma-ket bo‘lish"
          ],
          [
            "10-lik",
            "8-lik",
            "8 ga ketma-ket bo‘lish"
          ],
          [
            "10-lik",
            "16-lik",
            "16 ga ketma-ket bo‘lish"
          ],
          [
            "2-lik",
            "10-lik",
            "2 darajalari bo‘yicha yoyish"
          ],
          [
            "8-lik",
            "10-lik",
            "8 darajalari bo‘yicha yoyish"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Ketma-ket bo‘lish",
        "formula": "Son / 2 → Qoldiqlar teskari tartibda",
        "desc": "O‘nlik sonni ikkilikka o‘tkazish algoritmi"
      },
      {
        "label": "Razryad og‘irliklari yig‘indisi",
        "formula": "∑ (bitᵢ × 2ⁱ)",
        "desc": "Ikkilik sonni o‘nlikka o‘tkazish"
      }
    ],
    "keyConcepts": [
      {
        "term": "Ikkilikdan HEX ga o‘tish",
        "def": "Ikkilik son o‘ngdan chapga 4 tadan bit (tetrada/nibble) guruhlanadi va har bir guruh bitta HEX raqamga almashtiriladi."
      },
      {
        "term": "Ikkilikdan OCT ga o‘tish",
        "def": "Ikkilik son o‘ngdan chapga 3 tadan bit (triada) guruhlanadi va har bir guruh 0–7 oralig‘idagi raqamga almashtiriladi."
      }
    ]
  },
  {
    "id": 6,
    "index": 3,
    "title": "6-Amaliy mashg‘ulot: Turli xil sanoq tizimlarida arifmetik amallarni bajarish",
    "shortName": "Arifmetika",
    "category": "Raqamli mantiq va Bul",
    "campaignStage": 2,
    "icon": "Calculator",
    "objective": "ikkilik, sakkizlik va o‘n oltilik sanoq tizimlarida arifmetik amallarni bajarish qoidalarini o‘rganish; ikkilik qo‘shish, ayirish, ko‘paytirish jarayonlarida ko‘chirish va qarz olish hodisasini tushuntirish; natijani o‘nlik tizim va dasturiy vosita yordamida tekshirish.",
    "tables": [
      {
        "title": "6.1-jadval",
        "headers": [
          "A",
          "B",
          "Kirish carry",
          "Natija biti",
          "Chiqish carry"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "1"
          ]
        ]
      },
      {
        "title": "6.2-jadval",
        "headers": [
          "Amal",
          "Natija",
          "Izoh"
        ],
        "rows": [
          [
            "0 – 0",
            "0",
            "Qarz olinmaydi"
          ],
          [
            "1 – 0",
            "1",
            "Qarz olinmaydi"
          ],
          [
            "1 – 1",
            "0",
            "Qarz olinmaydi"
          ],
          [
            "0 – 1",
            "1",
            "Chap razryaddan 1 qarz olinadi: 10₂ – 1₂ = 1₂"
          ]
        ]
      },
      {
        "title": "6.3-jadval",
        "headers": [
          "Amal",
          "Natija",
          "O‘nlik tekshiruv"
        ],
        "rows": [
          [
            "1011₂ + 0110₂",
            "10001₂",
            "11 + 6 = 17"
          ],
          [
            "1101₂ – 0101₂",
            "1000₂",
            "13 – 5 = 8"
          ],
          [
            "101₂ × 11₂",
            "1111₂",
            "5 × 3 = 15"
          ],
          [
            "57₈ + 26₈",
            "105₈",
            "47 + 22 = 69"
          ],
          [
            "A7₁₆ + 1C₁₆",
            "C3₁₆",
            "167 + 28 = 195"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Half Adder SUM",
        "formula": "SUM = A ⊕ B (A XOR B)",
        "desc": "Yarim qo‘shgichning yig‘indi chiqishi"
      },
      {
        "label": "Half Adder CARRY",
        "formula": "CARRY = A · B (A AND B)",
        "desc": "Yarim qo‘shgichning keyingi razryadga ko‘chirish biti"
      }
    ],
    "keyConcepts": [
      {
        "term": "Carry (Ko‘chirish)",
        "def": "Razryaddagi yig‘indi sanoq tizimi asosidan oshganda yuqori razryadga o‘tadigan 1 biti."
      },
      {
        "term": "Borrow (Qarz olish)",
        "def": "Kichik razryaddan katta son ayirilganda (0 - 1) chapdagi qo‘shni razryaddan 1 birlik olinishi."
      },
      {
        "term": "Unsigned Overflow",
        "def": "Amal natijasi ajratilgan registr kengligiga (masalan, 8 bit: >255) sig‘may qolishi."
      }
    ]
  },
  {
    "id": 7,
    "index": 4,
    "title": "7-Amaliy mashg‘ulot: Kompyuterlarni tashkil qilishning raqamli-mantiqiy asoslari",
    "shortName": "Raqamli mantiq",
    "category": "Raqamli mantiq va Bul",
    "campaignStage": 2,
    "icon": "Activity",
    "objective": "talabalarda raqamli axborotni 0 va 1 mantiqiy holatlar orqali ifodalash, raqamli signallar, mantiqiy sathlar, kombinatsion va ketma-ket mantiqiy qurilmalar haqidagi boshlang‘ich tushunchalarni shakllantirish hamda ularni kompyuterning apparat tuzilishi bilan bog‘lash.",
    "tables": [
      {
        "title": "7.1-jadval",
        "headers": [
          "Mezon",
          "Analog signal",
          "Raqamli signal",
          "Kompyuterdagi misol"
        ],
        "rows": [
          [
            "Qiymatlar",
            "Uzluksiz oraliq",
            "Diskret holatlar",
            "0 va 1 bitlar"
          ],
          [
            "Shovqin ta’siri",
            "Nisbatan sezgir",
            "Chegaralar yordamida tiklanishi mumkin",
            "Raqamli shinalar"
          ],
          [
            "Qayta ishlash",
            "Analog sxemalar",
            "Mantiqiy sxemalar",
            "CPU, RAM, boshqaruv mantiqi"
          ],
          [
            "Saqlash",
            "Maxsus analog vositalar",
            "Bitlar ketma-ketligi",
            "SSD, RAM, registrlar"
          ]
        ]
      },
      {
        "title": "7.2-jadval",
        "headers": [
          "Xususiyat",
          "Kombinatsion",
          "Ketma-ket",
          "Misollar"
        ],
        "rows": [
          [
            "Chiqishga ta’sir",
            "Joriy kirish",
            "Joriy kirish + avvalgi holat",
            "—"
          ],
          [
            "Xotira elementi",
            "Talab qilinmaydi",
            "Mavjud",
            "Trigger, registr"
          ],
          [
            "Vaqt omili",
            "Mantiqiy kechikish",
            "Kechikish + takt/holat",
            "Hisoblagich"
          ],
          [
            "Oddiy misol",
            "AND/OR sxemasi",
            "Registr",
            "ALU va registrlar"
          ]
        ]
      },
      {
        "title": "7.4-jadval",
        "headers": [
          "Obyekt/holat",
          "Analog yoki raqamli",
          "0/1 bilan bog‘lanishi",
          "Izoh"
        ],
        "rows": [
          [
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            ""
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Kombinatsion chiqish",
        "formula": "Y = f(X₁, X₂, ... Xₙ)",
        "desc": "Chiqish faqat joriy kirishlar kombinatsiyasiga bog‘liq"
      },
      {
        "label": "Ketma-ket (Sequential)",
        "formula": "Q(t+1) = f(kirishlar, Q(t))",
        "desc": "Chiqish kirishlarga va avvalgi ichki xotira holatiga bog‘liq"
      }
    ],
    "keyConcepts": [
      {
        "term": "Mantiqiy sathlar",
        "def": "Elektr kuchlanishining ma’lum chegaralari (masalan, TTL da 0...0.8V = 0, 2.0...5V = 1)."
      },
      {
        "term": "D-trigger (Flip-Flop)",
        "def": "1 bit axborotni saqlovchi eng oddiy ketma-ket mantiqiy element. Registrlar triggerlar zanjiridan tuziladi."
      }
    ]
  },
  {
    "id": 8,
    "index": 5,
    "title": "8-Amaliy mashg‘ulot: Asosiy mantiqiy elementlar va mantiqiy sxemalarni loyihalash",
    "shortName": "Mantiqiy elementlar",
    "category": "Raqamli mantiq va Bul",
    "campaignStage": 2,
    "icon": "Cpu",
    "objective": "talabalarni AND, OR, NOT, NAND, NOR va XOR mantiqiy elementlarining belgilanishi, rostlik jadvallari va ishlash tamoyillari bilan amaliy tanishtirish; sodda kombinatsion sxemalarni bosqichma-bosqich loyihalash ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "8.1-jadval",
        "headers": [
          "Element",
          "Boolean ifoda",
          "Chiqish 1 bo‘lish sharti",
          "Oddiy izoh"
        ],
        "rows": [
          [
            "AND",
            "Y=A·B",
            "A=1 va B=1",
            "Ikkalasi ham 1"
          ],
          [
            "OR",
            "Y=A+B",
            "Kamida bittasi 1",
            "A yoki B 1"
          ],
          [
            "NOT",
            "Y=Ā",
            "A=0",
            "Kirishni teskarilaydi"
          ],
          [
            "XOR",
            "Y=A ⊕ B",
            "Kirishlar turlicha",
            "Faqat bittasi 1"
          ],
          [
            "NAND",
            "Y=¬(A·B)",
            "AND natijasining teskarisi",
            "AND + NOT"
          ]
        ]
      },
      {
        "title": "8.2-jadval",
        "headers": [
          "A",
          "B",
          "AND",
          "OR",
          "XOR",
          "NAND",
          "NOR",
          "XNOR"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "1"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "1",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "1",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "0",
            "0",
            "0",
            "1"
          ]
        ]
      },
      {
        "title": "8.4-jadval",
        "headers": [
          "A",
          "B",
          "SUM = A ⊕ B",
          "CARRY = A·B"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "1",
            "1",
            "0"
          ],
          [
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "1"
          ]
        ]
      },
      {
        "title": "8.5-jadval",
        "headers": [
          "A",
          "B",
          "AND",
          "OR",
          "XOR",
          "Izoh"
        ],
        "rows": [
          [
            "0",
            "0",
            "",
            "",
            "",
            ""
          ],
          [
            "0",
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "0",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            "",
            ""
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "De Morgan 1",
        "formula": "¬(A · B) = ¬A + ¬B",
        "desc": "NAND = inkor qilingan kirishlarning OR amali"
      },
      {
        "label": "De Morgan 2",
        "formula": "¬(A + B) = ¬A · ¬B",
        "desc": "NOR = inkor qilingan kirishlarning AND amali"
      }
    ],
    "keyConcepts": [
      {
        "term": "Universal elementlar",
        "def": "NAND yoki NOR elementlarining o‘zi yordamida ixtiyoriy mantiqiy funksiyani (NOT, AND, OR, XOR) to‘liq qurish mumkin."
      },
      {
        "term": "XOR (Inkorli Yoki)",
        "def": "Kirishlar bir xil bo‘lganda 0, har xil bo‘lganda 1 beruvchi mantiqiy amal."
      },
      {
        "term": "XNOR (Tenglik)",
        "def": "Kirishlar bir-biriga teng bo‘lganda 1, turli bo‘lganda 0 beruvchi mantiqiy amal."
      }
    ]
  },
  {
    "id": 9,
    "index": 6,
    "title": "9-Amaliy mashg‘ulot: Mantiqiy funksiyalarni Bul algebrasi yordamida ifodalash va soddalashtirish",
    "shortName": "Bul algebrasi",
    "category": "Raqamli mantiq va Bul",
    "campaignStage": 2,
    "icon": "Sigma",
    "objective": "talabalarga Boolean algebra ifodalari, asosiy qonunlar, rostlik jadvalidan mantiqiy ifoda tuzish hamda ifodani soddalashtirish usullarini o‘rgatish; soddalashtirishning mantiqiy sxema elementlari soni va murakkabligiga ta’sirini amaliy ko‘rsatish.",
    "tables": [
      {
        "title": "9.1-jadval",
        "headers": [
          "Qonun",
          "AND ko‘rinishi",
          "OR ko‘rinishi",
          "Amaliy ma’nosi"
        ],
        "rows": [
          [
            "Kommutativ",
            "A·B=B·A",
            "A+B=B+A",
            "Tartib natijani o‘zgartirmaydi"
          ],
          [
            "Assotsiativ",
            "(A·B)·C=A·(B·C)",
            "(A+B)+C=A+(B+C)",
            "Guruhlash o‘zgarishi mumkin"
          ],
          [
            "Identiklik",
            "A·1=A",
            "A+0=A",
            "Neytral qiymat"
          ],
          [
            "Nol/bir",
            "A·0=0",
            "A+1=1",
            "Majburiy natija"
          ],
          [
            "Idempotent",
            "A·A=A",
            "A+A=A",
            "Takrorlash ortiqcha"
          ]
        ]
      },
      {
        "title": "9.3-jadval",
        "headers": [
          "Qoida",
          "Mazmuni",
          "Eslatma"
        ],
        "rows": [
          [
            "Guruh o‘lchami",
            "1, 2, 4, 8 ... katak",
            "2 ning darajasi bo‘lishi kerak"
          ],
          [
            "Maqsad",
            "Eng katta guruhlarni tanlash",
            "Hadlar sonini kamaytiradi"
          ],
          [
            "Qirralar",
            "Chap–o‘ng va yuqori–past qirralar qo‘shni",
            "Xarita “o‘ralgan” deb qaraladi"
          ],
          [
            "Diagonal",
            "Diagonal kataklar qo‘shni emas",
            "Faqat yonma-yon"
          ],
          [
            "Qamrov",
            "Har bir 1 kamida bitta guruhga kirishi kerak",
            "Guruhlar ustma-ust tushishi mumkin"
          ]
        ]
      },
      {
        "title": "9.4-jadval",
        "headers": [
          "A",
          "B",
          "Y",
          "Y=1 bo‘lsa minterm"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "—"
          ],
          [
            "0",
            "1",
            "1",
            "Ā·B"
          ],
          [
            "1",
            "0",
            "1",
            "A·B̄"
          ],
          [
            "1",
            "1",
            "0",
            "—"
          ]
        ]
      },
      {
        "title": "9.5-jadval",
        "headers": [
          "Variant",
          "NOT soni",
          "AND soni",
          "OR soni",
          "Jami element"
        ],
        "rows": [
          [
            "Dastlabki",
            "",
            "",
            "",
            ""
          ],
          [
            "Soddalashtirilgan",
            "",
            "",
            "",
            ""
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Yutilish qonuni",
        "formula": "A · (A + B) = A   yoki   A + A·B = A",
        "desc": "Murakkab ifodalarni qisqartirish"
      },
      {
        "label": "Komplement qonuni",
        "formula": "A · Ā = 0   va   A + Ā = 1",
        "desc": "O‘zgaruvchi va uning inkori munosabati"
      }
    ],
    "keyConcepts": [
      {
        "term": "Karnaugh xaritasi (K-map)",
        "def": "Bul funksiyalarini vizual soddalashtirish jadvali. Qo‘shni kataklar bir-biridan faqat bitta bit bilan farqlanadi (Gray kodi)."
      },
      {
        "term": "SOP (Sum of Products)",
        "def": "Mintermlarning mantiqiy yig‘indisi (Disyunktiv normal shakl)."
      }
    ]
  },
  {
    "id": 10,
    "index": 7,
    "title": "10-Amaliy mashg‘ulot: Buyruqlar tizimi arxitekturasi va buyruq formatlarini o‘rganish",
    "shortName": "ISA (RISC-V)",
    "category": "RISC-V va Adreslash",
    "campaignStage": 3,
    "icon": "Terminal",
    "objective": "talabalarni buyruqlar tizimi arxitekturasi (Instruction Set Architecture — ISA) tushunchasi, protsessor buyruqlarining asosiy turlari, RISC va CISC yondashuvlari, RISC-V registrlari hamda 32 bitli buyruq formatlari bilan tanishtirish; Ripes simulyatori yordamida sodda RISC-V buyruqlarini yozish, bajarish va registrlar holatini kuzatish ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "10.1-jadval",
        "headers": [
          "Belgi",
          "RISC",
          "CISC"
        ],
        "rows": [
          [
            "Buyruqlar tuzilishi",
            "Nisbatan sodda va tartibli",
            "Murakkab buyruqlar ham mavjud"
          ],
          [
            "Buyruq uzunligi",
            "Ko‘pincha bir xil yoki cheklangan formatlar",
            "Turli uzunliklar bo‘lishi mumkin"
          ],
          [
            "Xotira bilan ishlash",
            "Load/store tamoyili kuchli",
            "Ko‘proq murakkab operand imkonlari"
          ],
          [
            "Dekodlash",
            "Nisbatan sodda",
            "Nisbatan murakkab"
          ],
          [
            "Misollar",
            "RISC-V, ARM oilalari",
            "x86 oilasi"
          ]
        ]
      },
      {
        "title": "10.2-jadval",
        "headers": [
          "Registr",
          "ABI nomi",
          "Amaliy izoh"
        ],
        "rows": [
          [
            "x0",
            "zero",
            "Doimo 0 qiymatini beradi"
          ],
          [
            "x1",
            "ra",
            "Funksiyadan qaytish manzili"
          ],
          [
            "x2",
            "sp",
            "Stek ko‘rsatkichi"
          ],
          [
            "x5–x7",
            "t0–t2",
            "Vaqtinchalik hisoblashlar"
          ],
          [
            "x10–x17",
            "a0–a7",
            "Argumentlar va natijalar"
          ]
        ]
      },
      {
        "title": "10.3-jadval",
        "headers": [
          "Buyruq",
          "Guruh",
          "Qisqacha vazifa",
          "Misol mazmuni"
        ],
        "rows": [
          [
            "add rd, rs1, rs2",
            "Arifmetik",
            "Ikki registrni qo‘shadi",
            "rd = rs1 + rs2"
          ],
          [
            "sub rd, rs1, rs2",
            "Arifmetik",
            "Ayirish",
            "rd = rs1 − rs2"
          ],
          [
            "and/or/xor",
            "Mantiqiy",
            "Bitlar bo‘yicha mantiqiy amal",
            "Maskalash va bitlarni qayta ishlash"
          ],
          [
            "addi rd, rs1, imm",
            "Immediate",
            "Registrga konstanta qo‘shadi",
            "rd = rs1 + imm"
          ],
          [
            "lw rd, offset(rs1)",
            "Load",
            "Xotiradan word yuklaydi",
            "rd = Mem[rs1+offset]"
          ]
        ]
      },
      {
        "title": "10.4-jadval",
        "headers": [
          "Format",
          "Asosiy qo‘llanish",
          "Misollar"
        ],
        "rows": [
          [
            "R-type",
            "Ikki registrli arifmetik/mantiqiy amallar",
            "add, sub, and, or, xor"
          ],
          [
            "I-type",
            "Immediate amallar va load",
            "addi, andi, lw, jalr"
          ],
          [
            "S-type",
            "Xotiraga yozish",
            "sw, sh, sb"
          ],
          [
            "B-type",
            "Shartli o‘tish",
            "beq, bne, blt, bge"
          ],
          [
            "U-type",
            "Yuqori immediate qiymatlarni yuklash",
            "lui, auipc"
          ]
        ]
      },
      {
        "title": "10.5-jadval",
        "headers": [
          "Maydon",
          "Qiymat",
          "Izoh"
        ],
        "rows": [
          [
            "opcode",
            "0110011",
            "R-type integer register-register guruhi"
          ],
          [
            "rd",
            "x5",
            "Natija yoziladigan registr"
          ],
          [
            "funct3",
            "000",
            "ADD/SUB guruhini tanlash qismi"
          ],
          [
            "rs1",
            "x6",
            "1-manba registr"
          ],
          [
            "rs2",
            "x7",
            "2-manba registr"
          ]
        ]
      },
      {
        "title": "10.7-jadval",
        "headers": [
          "Bosqich",
          "Bajarilgan buyruq",
          "t0",
          "t1",
          "t2"
        ],
        "rows": [
          [
            "Boshlanish",
            "—",
            "0",
            "0",
            "0"
          ],
          [
            "1",
            "addi t0, x0, 10",
            "10",
            "0",
            "0"
          ],
          [
            "2",
            "addi t1, x0, 20",
            "10",
            "20",
            "0"
          ],
          [
            "3",
            "add t2, t0, t1",
            "10",
            "20",
            "30"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "R-format",
        "formula": "[funct7(7) | rs2(5) | rs1(5) | funct3(3) | rd(5) | opcode(7)] = 32 bit",
        "desc": "Registr-registr amallari (add, sub, and, or, xor)"
      },
      {
        "label": "I-format",
        "formula": "[imm[11:0](12) | rs1(5) | funct3(3) | rd(5) | opcode(7)] = 32 bit",
        "desc": "Konstanta va xotiradan yuklash amallari (addi, lw)"
      }
    ],
    "keyConcepts": [
      {
        "term": "ISA (Instruction Set Architecture)",
        "def": "Protsessor apparaturasi va dasturiy ta’minot o‘rtasidagi rasmiy shartnoma (buyruqlar, registrlar, xotira modeli)."
      },
      {
        "term": "RISC vs CISC",
        "def": "RISC (kam va sodda buyruqlar, teng 32-bit uzunlik, load-store modeli); CISC (xilma-xil va o‘zgaruvchan uzunlikdagi murakkab buyruqlar)."
      },
      {
        "term": "x0 (zero) registri",
        "def": "Doimo 0 qiymatini saqlaydi, unga yozilgan qiymatlar bekor bo‘ladi."
      }
    ]
  },
  {
    "id": 11,
    "index": 8,
    "title": "11-Amaliy mashg‘ulot: Operandlarni adreslash usullarini o‘rganish va amaliy masalalarni yechish",
    "shortName": "Adreslash",
    "category": "RISC-V va Adreslash",
    "campaignStage": 3,
    "icon": "MapPin",
    "objective": "talabalarga operand va adres tushunchalarini, registrli, bevosita (immediate), baza+siljish (base+offset) va PC-relative adreslash usullarini sodda amaliy misollar orqali tushuntirish; RISC-V load/store buyruqlarida samarali manzilni (effective address) hisoblash va Ripesda registr hamda xotira holatini tekshirish ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "11.1-jadval",
        "headers": [
          "Buyruq",
          "Operand manbasi",
          "Natija"
        ],
        "rows": [
          [
            "add t2, t0, t1",
            "t0 va t1 registrlari",
            "t2"
          ],
          [
            "sub t3, t2, t0",
            "t2 va t0 registrlari",
            "t3"
          ],
          [
            "xor t4, t0, t1",
            "t0 va t1 registrlari",
            "t4"
          ]
        ]
      },
      {
        "title": "11.2-jadval",
        "headers": [
          "Baza (rs1)",
          "Offset",
          "EA",
          "Izoh"
        ],
        "rows": [
          [
            "0x10010000",
            "0",
            "0x10010000",
            "Birinchi word"
          ],
          [
            "0x10010000",
            "4",
            "0x10010004",
            "Ikkinchi word"
          ],
          [
            "0x10010000",
            "8",
            "0x10010008",
            "Uchinchi word"
          ],
          [
            "0x10010000",
            "12",
            "0x1001000C",
            "To‘rtinchi word"
          ]
        ]
      },
      {
        "title": "11.6-jadval",
        "headers": [
          "Buyruq",
          "Adreslash turi",
          "Operand qayerdan olinadi?",
          "Kutiladigan natija"
        ],
        "rows": [
          [
            "addi t0, x0, 10",
            "Immediate",
            "10 buyruq ichida",
            "t0=10"
          ],
          [
            "add t2, t0, t1",
            "Registrli",
            "t0 va t1 registrlari",
            "t2=t0+t1"
          ],
          [
            "lw t1, 8(t0)",
            "Base+offset",
            "Mem[t0+8]",
            "xotiradagi word t1 ga"
          ],
          [
            "sw t2, 12(t0)",
            "Base+offset",
            "t2 va Mem[t0+12]",
            "t2 qiymati xotiraga"
          ],
          [
            "beq t0, t1, label",
            "PC-relative",
            "registrlar + branch offset",
            "shart rost bo‘lsa label ga o‘tadi"
          ]
        ]
      },
      {
        "title": "11.7-jadval",
        "headers": [
          "Variant",
          "Baza qiymati",
          "Offset",
          "Topshiriq"
        ],
        "rows": [
          [
            "1",
            "1000",
            "12",
            "EA ni toping va lw uchun yozuv tuzing"
          ],
          [
            "2",
            "2048",
            "24",
            "EA ni toping va sw uchun yozuv tuzing"
          ],
          [
            "3",
            "0x10010000",
            "20",
            "Qaysi massiv indeksiga mosligini toping (word)"
          ],
          [
            "4",
            "0x20000000",
            "28",
            "EA ni toping"
          ],
          [
            "5",
            "4096",
            "36",
            "Word massivida indeksni toping"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Effective Address (EA)",
        "formula": "EA = Register_qiymati + Immediate_offset",
        "desc": "lw/sw da xotiraning aniq fizik/virtual murojaat manzili"
      },
      {
        "label": "Massiv offseti (32-bit)",
        "formula": "Offset = i × 4 bayt",
        "desc": "i-indeksdagi elementning boshlang‘ich bazadan siljishi"
      }
    ],
    "keyConcepts": [
      {
        "term": "Registrli adreslash",
        "def": "Operandlar to‘g‘ridan-to‘g‘ri protsessor registrlarida joylashadi (masalan, add x5, x6, x7)."
      },
      {
        "term": "Base + Offset",
        "def": "Bazaviy registrga doimiy son (immediate) qo‘shilib aniq manzil hosil qilinadi (masalan, lw x5, 8(x10))."
      },
      {
        "term": "PC-Relative",
        "def": "Tarmoqlanish manzili joriy dastur sanagichi (PC) ga siljish qo‘shish orqali hisoblanadi (beq, bne)."
      }
    ]
  },
  {
    "id": 12,
    "index": 9,
    "title": "12-Amaliy mashg‘ulot: Kompyuter xotirasining turlari va xotira ierarxiyasini o‘rganish",
    "shortName": "Xotira ierarxiyasi",
    "category": "Xotira, Kesh va Virtual xotira",
    "campaignStage": 4,
    "icon": "Layers",
    "objective": "talabalarda xotira tushunchasini faqat “RAM hajmi” bilan cheklamasdan, registrlardan boshlab kesh, operativ xotira, doimiy saqlash va arxiv qatlamigacha bo‘lgan yagona ierarxik tizim sifatida tushunish; kechikish, o‘tkazuvchanlik, sig‘im, narx va uchuvchanlik o‘rtasidagi muvozanatni amaliy tahlil qilish ko‘nikmasini shakllantirish.",
    "tables": [
      {
        "title": "12.1-jadval",
        "headers": [
          "Pog‘ona",
          "Asosiy vazifa",
          "Tipik sig‘im",
          "Kechikish darajasi",
          "Uchuvchanlik"
        ],
        "rows": [
          [
            "Registr",
            "Joriy operand va adreslar",
            "bayt–KB",
            "CPU sikllari",
            "Ha"
          ],
          [
            "L1 kesh",
            "Eng faol kod/ma’lumot",
            "o‘nlab–yuzlab KB/yadro",
            "juda past",
            "Ha"
          ],
          [
            "L2 kesh",
            "L1 dan kattaroq mahalliy kesh",
            "yuzlab KB–MB/yadro",
            "past",
            "Ha"
          ],
          [
            "L3/LLC",
            "Yadrolar orasida umumiy kesh",
            "MB–o‘nlab/100+ MB",
            "past–o‘rta",
            "Ha"
          ],
          [
            "DRAM",
            "Jarayonlarning ishchi xotirasi",
            "GB–TB",
            "o‘nlab–100+ ns",
            "Ha"
          ]
        ]
      },
      {
        "title": "12.4-jadval",
        "headers": [
          "№",
          "Holat",
          "In use",
          "Available",
          "Cached",
          "Committed"
        ],
        "rows": [
          [
            "1",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "2",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "3",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "4",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "EAT (Effective Access Time)",
        "formula": "EAT = t_hit + (1 - HitRate) × t_miss_penalty",
        "desc": "Kesh va asosiy xotiraga murojaatning o‘rtacha vaqti"
      }
    ],
    "keyConcepts": [
      {
        "term": "Xotira ierarxiyasi",
        "def": "Tezlik, sig‘im va narx o‘rtasidagi muvozanat piramidasi: Registrlar → L1 → L2 → L3 → DRAM (RAM) → NVMe/SSD → HDD."
      },
      {
        "term": "Uchuvchanlik (Volatility)",
        "def": "Elektr toki o‘chganda ma’lumotni yo‘qotish xususiyati (RAM uchuvchan, SSD va HDD uchuvchan emas)."
      }
    ]
  },
  {
    "id": 13,
    "index": 10,
    "title": "13-Amaliy mashg‘ulot: Xotira qurilmalarining xususiyatlari va texnik ko‘rsatkichlarini taqqoslash",
    "shortName": "Saqlash qurilmalari",
    "category": "Xotira, Kesh va Virtual xotira",
    "campaignStage": 4,
    "icon": "HardDrive",
    "objective": "HDD, SATA SSD, NVMe SSD, USB flesh-xotira va tashqi SSD kabi saqlash qurilmalarini faqat sig‘im bo‘yicha emas, interfeys, kechikish, IOPS, ketma-ket o‘qish/yozish, tasodifiy kirish, chidamlilik, energiya sarfi va narx/sig‘im mezonlari asosida taqqoslashni o‘rgatish.",
    "tables": [
      {
        "title": "13.1-jadval",
        "headers": [
          "Qurilma",
          "Interfeys / mexanizm",
          "Tipik kuchli tomoni",
          "Cheklovi",
          "Mos vazifa"
        ],
        "rows": [
          [
            "HDD",
            "SATA, magnit mexanika",
            "katta sig‘im va arzon GB",
            "mexanik kechikish, zarbaga sezgir",
            "arxiv, backup, media ombori"
          ],
          [
            "SATA SSD",
            "SATA + NAND flash",
            "HDD ga nisbatan juda past latency",
            "SATA interfeysi throughputni cheklaydi",
            "OS, ofis, universal PC"
          ],
          [
            "NVMe SSD",
            "PCIe + NVMe",
            "yuqori parallelizm, IOPS va bandwidth",
            "qizish va modelga qarab katta farq",
            "ishchi disk, montaj, kompilyatsiya"
          ],
          [
            "USB flash",
            "USB + flash controller",
            "portativlik",
            "kontroller va NAND sifati turlicha",
            "fayl ko‘chirish, o‘rnatish media"
          ],
          [
            "Tashqi SSD",
            "USB4/USB 3.x/TB + SSD",
            "tez va portativ",
            "kabel/protokol cheklovi",
            "media loyiha, mobil ish"
          ]
        ]
      },
      {
        "title": "13.5-jadval",
        "headers": [
          "Ko‘rsatkich",
          "Nimani bildiradi?",
          "Qaysi ishda muhim?",
          "Talqin qilishdagi xato"
        ],
        "rows": [
          [
            "Sequential read/write",
            "katta ketma-ket bloklar tezligi",
            "video, katta fayl ko‘chirish",
            "faqat shu son bilan “eng tez disk” deyish"
          ],
          [
            "4K random I/O",
            "kichik bloklarning tasodifiy ishlashi",
            "OS, IDE, kichik fayllar",
            "queue depthni e’tiborsiz qoldirish"
          ],
          [
            "Latency",
            "bir so‘rovga javob vaqti",
            "interaktiv ishlar",
            "faqat MB/s bilan baholash"
          ],
          [
            "IOPS",
            "sekundiga I/O operatsiya soni",
            "server, DB, VM",
            "blok hajmini ko‘rsatmaslik"
          ],
          [
            "TBW/DWPD",
            "yozish chidamliligi mezoni",
            "yozuv ko‘p ishlar",
            "kafolat sharti bilan aralashtirish"
          ]
        ]
      },
      {
        "title": "13.6-jadval",
        "headers": [
          "№",
          "Qurilma modeli",
          "MediaType",
          "BusType",
          "Sig‘im",
          "Kuzatilgan vazifa / natija"
        ],
        "rows": [
          [
            "1",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "2",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "3",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "4",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "5",
            "________________________",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Ko‘chirish vaqti",
        "formula": "Vaqt = Hajm / Tezlik",
        "desc": "Masalan, 20 GB fayl 500 MB/s tezlikda: 20 000 MB / 500 = 40 s"
      },
      {
        "label": "TBW (Terabytes Written)",
        "formula": "Kafolatlangan yozish hajmi",
        "desc": "SSD disklarning resursi va chidamlilik ko‘rsatkichi"
      }
    ],
    "keyConcepts": [
      {
        "term": "Latency (Kechikish)",
        "def": "Bitta I/O so‘roviga qurilmaning javob qaytarish vaqti (HDD da millisekundlar, NVMe da mikrosekundlar)."
      },
      {
        "term": "IOPS",
        "def": "Input/Output Operations Per Second — 1 soniyada bajariladigan 4KB kichik bloklar bilan amallar soni."
      },
      {
        "term": "NVMe vs SATA",
        "def": "SATA AHCI protokoli 1 ta navbat (queue) va 32 ta komandani qo‘llaydi; NVMe PCIe orqali 64 000 tagacha navbat va 64 000 tagacha komandani parallel bajaradi."
      }
    ]
  },
  {
    "id": 14,
    "index": 11,
    "title": "14-Amaliy mashg‘ulot: Kesh va virtual xotiraning ishlash prinsipini o‘rganish",
    "shortName": "Kesh va virtual xotira",
    "category": "Xotira, Kesh va Virtual xotira",
    "campaignStage": 4,
    "icon": "Zap",
    "objective": "keshning hit/miss, locality, cache line va darajalar bo‘yicha ishlashini; virtual xotiraning esa virtual manzil, sahifa, sahifa jadvali, TLB, working set va pagefile tushunchalari orqali qanday ishlashini bog‘liq holda tushuntirish.",
    "tables": [
      {
        "title": "14.1-jadval",
        "headers": [
          "Atama",
          "Mazmuni",
          "Natijaga ta’siri"
        ],
        "rows": [
          [
            "Hit",
            "kerakli line keshda topildi",
            "past latency"
          ],
          [
            "Miss",
            "line keshda topilmadi",
            "keyingi darajaga murojaat"
          ],
          [
            "Hit rate",
            "hitlar ulushi",
            "yuqori bo‘lsa o‘rtacha kirish vaqti pasayadi"
          ],
          [
            "Cache line",
            "ko‘chiriladigan blok",
            "fazoviy lokalikdan foydalanadi"
          ],
          [
            "Associativity",
            "blok joylashishi mumkin bo‘lgan yo‘llar soni",
            "conflict misslarni kamaytirishi mumkin"
          ]
        ]
      },
      {
        "title": "14.4-jadval",
        "headers": [
          "№",
          "Kuzatuv",
          "Tinch holat",
          "Ish yukida",
          "Izoh"
        ],
        "rows": [
          [
            "1",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "2",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "3",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "4",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "5",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "Hit Rate",
        "formula": "Hit Rate = Keshda_topilgan / Jami_murojaatlar",
        "desc": "Foizda ifodalanadi (odatda 90%–99%)"
      }
    ],
    "keyConcepts": [
      {
        "term": "Cache Line (Kesh qatori)",
        "def": "Keshga RAM dan bitta so‘z emas, odatda 64 baytlik yaxlit blok sifatida yuklanadigan birlik."
      },
      {
        "term": "Vaqtinchalik va Fazoviy lokalik",
        "def": "Vaqtinchalik: yaqinda ishlatilgan ma’lumot tez orada yana kerak bo‘ladi; Fazoviy: qo‘shni manzillardagi ma’lumotlar birga kerak bo‘ladi."
      },
      {
        "term": "Write-Back vs Write-Through",
        "def": "Write-Back: ma’lumot faqat keshga yoziladi, RAM ga faqat kesh bloki siqib chiqarilganda uzatiladi; Write-Through: keshga ham, RAM ga ham bir vaqtda yoziladi."
      },
      {
        "term": "MMU va TLB",
        "def": "MMU (Memory Management Unit) virtual manzilni sahifa jadvali orqali fizik manzilga tarjima qiladi. TLB (Translation Lookaside Buffer) esa bu tarjimalar keshidir."
      }
    ]
  },
  {
    "id": 15,
    "index": 12,
    "title": "15-Amaliy mashg‘ulot: RAID massivlari va ma’lumotlarni saqlash texnologiyalarini o‘rganish",
    "shortName": "RAID massivlari",
    "category": "RAID va Zamonaviy Shinalar",
    "campaignStage": 5,
    "icon": "Database",
    "objective": "RAID 0, 1, 5, 6 va 10 darajalarining bloklar joylashuvi, foydali sig‘im, o‘qish/yozish xususiyati va nosozlikka chidamliligini tushuntirish; RAID ni backup bilan adashtirmaslik; zamonaviy Storage Spaces, erasure coding, snapshot va 3-2-1 zaxiralash konsepsiyalarini bog‘liq holda tahlil qilish.",
    "tables": [
      {
        "title": "15.1-jadval",
        "headers": [
          "Daraja",
          "Min. disk",
          "Foydali sig‘im (bir xil disklar)",
          "Nosozlikka chidamlilik",
          "Asosiy xususiyat"
        ],
        "rows": [
          [
            "RAID 0",
            "2",
            "N × S",
            "0 disk",
            "tezlik/sig‘im, himoya yo‘q"
          ],
          [
            "RAID 1",
            "2",
            "taxminan S (2 diskda)",
            "mirror guruhida 1",
            "oddiy va ishonchli mirror"
          ],
          [
            "RAID 5",
            "3",
            "(N−1) × S",
            "1 disk",
            "parity, yozishda qo‘shimcha ish"
          ],
          [
            "RAID 6",
            "4",
            "(N−2) × S",
            "2 disk",
            "ko‘proq himoya, ko‘proq parity"
          ],
          [
            "RAID 10",
            "4",
            "N/2 × S",
            "juftliklarga bog‘liq",
            "mirror + stripe, yaxshi I/O"
          ]
        ]
      },
      {
        "title": "15.3-jadval",
        "headers": [
          "№",
          "Storage ssenariysi",
          "Talab",
          "Tavsiya etilgan yechim",
          "Asoslash"
        ],
        "rows": [
          [
            "1",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "2",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "3",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "4",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "5",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "RAID 0 Sig‘imi",
        "formula": "Sig‘im = N × S",
        "desc": "Barcha disklar birlashadi, zaxira yo‘q, 0 ta nosozlikka chidaydi"
      },
      {
        "label": "RAID 1 Sig‘imi",
        "formula": "Sig‘im = S (yoki N/2 × S)",
        "desc": "To‘liq ko‘zgu (mirroring), 1 ta nosozlikka chidaydi"
      },
      {
        "label": "RAID 5 Sig‘imi",
        "formula": "Sig‘im = (N - 1) × S",
        "desc": "1 ta disk hajmi taqsimlangan paritetga ketadi, 1 ta disk nosozligiga chidaydi"
      },
      {
        "label": "RAID 6 Sig‘imi",
        "formula": "Sig‘im = (N - 2) × S",
        "desc": "2 ta disk hajmi ikkitalik paritetga ketadi, 2 ta disk bir vaqtda ishdan chiqishiga chidaydi"
      },
      {
        "label": "RAID 10 Sig‘imi",
        "formula": "Sig‘im = (N / 2) × S",
        "desc": "Striping + Mirroring (RAID 1+0), yuqori tezlik va har bir juftlikdan 1 tadan nosozlikka chidaydi"
      }
    ],
    "keyConcepts": [
      {
        "term": "3-2-1 Zaxiralash qoidasi",
        "def": "3 ta nusxa saqlansin; 2 xil tashuvchi vositada (masalan, SSD va lenta/bulut); kamida 1 ta nusxa boshqa hududda (off-site) bo‘lsin."
      },
      {
        "term": "Write Penalty",
        "def": "RAID 5 da yangi blok yozish uchun eski ma’lumot va eski paritet o‘qilib, yangi paritet hisoblanib qayta yozilishi (2 ta o‘qish + 2 ta yozish)."
      },
      {
        "term": "Degraded holat",
        "def": "Massivda ruxsat etilgan limitdagi disk ishdan chiqqan, ma’lumot yo‘qolmagan, lekin unumdorlik pasaygan va zudlik bilan almashtirish talab qilinadi."
      }
    ]
  },
  {
    "id": 16,
    "index": 13,
    "title": "16-Amaliy mashg‘ulot: Kompyuter shinalari va ularning ishlash prinsipini o‘rganish",
    "shortName": "Zamonaviy shinalar",
    "category": "RAID va Zamonaviy Shinalar",
    "campaignStage": 5,
    "icon": "Cable",
    "objective": "klassik address/data/control bus tushunchalaridan zamonaviy point-to-point interkonnektlargacha bo‘lgan evolyutsiyani tushunish; PCI Express lane, link width, generation, bandwidth, chipset va CXL kabi kogerent interkonnektlarning vazifasini amaliy tahlil qilish.",
    "tables": [
      {
        "title": "16.1-jadval",
        "headers": [
          "Avlod",
          "Raw rate / lane",
          "x16 ikki yo‘nalishli nazariy bandwidth (tax.)",
          "Kodlash/uzatish yondashuvi",
          "Holat"
        ],
        "rows": [
          [
            "PCIe 3.0",
            "8 GT/s",
            "~32 GB/s",
            "128b/130b",
            "keng tarqalgan legacy"
          ],
          [
            "PCIe 4.0",
            "16 GT/s",
            "~64 GB/s",
            "128b/130b",
            "keng tarqalgan"
          ],
          [
            "PCIe 5.0",
            "32 GT/s",
            "~128 GB/s",
            "128b/130b",
            "zamonaviy desktop/server"
          ],
          [
            "PCIe 6.0",
            "64 GT/s",
            "~256 GB/s",
            "PAM4 + FLIT/FEC",
            "asosan yangi yuqori sinf/server"
          ],
          [
            "PCIe 7.0",
            "128 GT/s",
            "~512 GB/s",
            "PAM4 + FLIT/FEC",
            "2025 spetsifikatsiya; joriy ommaviy qurilmada hali bosqichma-bosqich"
          ]
        ]
      },
      {
        "title": "16.4-jadval",
        "headers": [
          "№",
          "Qurilma",
          "Shina/interfeys",
          "Kutilgan link width / xususiyat",
          "Aniqlash usuli"
        ],
        "rows": [
          [
            "1",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "2",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "3",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ],
          [
            "4",
            "________________________",
            "________________________",
            "________________________",
            "________________________"
          ]
        ]
      }
    ],
    "keyFormulas": [
      {
        "label": "PCIe Throughput",
        "formula": "Nazariy tezlik = Raw_GT/s × Lane_soni × Kodlash_samaradorligi",
        "desc": "Masalan: PCIe 4.0 x16: 16 GT/s × 16 × (128/130) ≈ 31.5 GB/s (bir yo‘nalishda)"
      }
    ],
    "keyConcepts": [
      {
        "term": "PCIe Lane",
        "def": "Bitta differensial uzatuvchi (TX) va bitta differensial qabul qiluvchi (RX) juftliklaridan iborat to‘liq dupleks ketma-ket aloqa yo‘li."
      },
      {
        "term": "Point-to-Point arxitektura",
        "def": "Har bir qurilma boshqa qurilmalar bilan umumiy parallel sim orqali emas, maxsus ajratilgan individual link (interkonnekt) orqali ulanadi."
      },
      {
        "term": "CXL (Compute Express Link)",
        "def": "PCIe 5.0/6.0 fizik qatlamida ishlovchi o‘ta past kechikishli kogerent protokol: CXL.io (standart I/O), CXL.cache (protsessor va tezlatgich kesh kogerentligi), CXL.mem (umumiy xotira hovuzi)."
      }
    ]
  }
];
