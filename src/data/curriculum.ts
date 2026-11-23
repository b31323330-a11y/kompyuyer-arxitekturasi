// Curriculum Database & Quick Reference Cheat Sheets for all 14 Practical Sessions

export interface LabCheatSheet {
  title: string;
  summary: string;
  formulas: { name: string; expr: string; desc: string }[];
  keyRules: string[];
}

export interface CurriculumLab {
  id: number;
  chapter: number; // 1 to 5
  title: string;
  shortName: string;
  category: string;
  icon: string;
  objective: string;
  cheatSheet: LabCheatSheet;
}

export const CHAPTERS = [
  {
    id: 1,
    title: "1-Bob: Temir va Raqamlar",
    description: "Apparat ta'minoti, pozitsion sanoq tizimlari, o‘tkazish algoritmlari va ikkilik arifmetika asoslari.",
    labs: [2, 4, 5, 6],
    bossName: "Binary Silicon Boss",
    badge: "Apparat & Raqamlar Ustasi",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    title: "2-Bob: Mantiqiy Sxemalar",
    description: "Mantiqiy sathlar, universal NAND/NOR elementlari, rostlik jadvallari va Karnaugh (K-map) minimallashtiruvchi.",
    labs: [7, 8, 9],
    bossName: "Karnaugh Gatekeeper",
    badge: "Sxematexnik",
    color: "from-purple-600 to-violet-700",
  },
  {
    id: 3,
    title: "3-Bob: Protsessor va Buyruqlar",
    description: "Buyruqlar tizimi arxitekturasi (ISA), RISC-V RV32I formati, 32 ta registr va operandlarni adreslash usullari.",
    labs: [10, 11],
    bossName: "RV32I Core Overlord",
    badge: "Protsessor Arxitektori",
    color: "from-amber-600 to-orange-700",
  },
  {
    id: 4,
    title: "4-Bob: Xotira va Kesh",
    description: "Xotira ierarxiyasi piramidasi, EAT hisobi, saqlash qurilmalari (HDD/SATA/NVMe) va virtual xotira (TLB/MMU/Pagefile).",
    labs: [12, 13, 14],
    bossName: "Cache & TLB Sentinel",
    badge: "Xotira Tizimlari Magistri",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: 5,
    title: "5-Bob: Massivlar va Shinalar",
    description: "RAID 0, 1, 5, 6, 10 inqiroz tahlili, 3-2-1 zaxira qoidasi, PCIe 3.0–7.0 o‘tkazuvchanligi va CXL kogerent interkonnektlari.",
    labs: [15, 16],
    bossName: "PCIe & RAID Supreme Architect",
    badge: "Bosh Tizim Integratori",
    color: "from-rose-600 to-pink-700",
  },
];

export const CURRICULUM_DATA: CurriculumLab[] = [
  {
    id: 2,
    chapter: 1,
    title: "2-Amaliy: Kompyuterlarning asosiy va qo‘shimcha qurilmalarini o‘rganish",
    shortName: "Qurilmalar",
    category: "Temir va Raqamlar",
    icon: "Monitor",
    objective: "Kompyuter qurilmalarini ichki/tashqi, asosiy/qo‘shimcha, kiritish/chiqarish (K-Ch) guruhlariga ajratish.",
    cheatSheet: {
      title: "Kompyuter Qurilmalari Tasnifi",
      summary: "Kompyuterning axborot aylanish modeli: Kiritish → Qayta ishlash → Saqlash → Chiqarish (K-Q-S-Ch).",
      formulas: [
        { name: "K-Q-S-Ch zanjiri", expr: "Kiritish → CPU/GPU → RAM/SSD → Chiqarish", desc: "Axborot oqimi modeli" }
      ],
      keyRules: [
        "Ichki qurilmalar: korpus ichidagi ona plata, CPU, RAM, ichki SSD/HDD, quvvat bloki.",
        "Tashqi qurilmalar: portlar orqali ulanadigan monitor, printer, skaner, tashqi drayvlar.",
        "Kiritish-chiqarish (K-Ch): sensorli ekran (touchscreen), garnitura, tashqi fleshka."
      ]
    }
  },
  {
    id: 4,
    chapter: 1,
    title: "4-Amaliy: Kompyuterni tashkil etishning arifmetik asoslari",
    shortName: "Sanoq Tizimlari",
    category: "Temir va Raqamlar",
    icon: "Binary",
    objective: "Pozitsion sanoq tizimlari, sanoq tizimi asosi, razryad og‘irligi, bit va bayt tushunchalarini o‘rganish.",
    cheatSheet: {
      title: "Pozitsion Sanoq Tizimlari",
      summary: "Raqamning qiymati uning turgan o‘rniga (pozitsiyasiga) bog‘liq bo‘lgan tizimlar.",
      formulas: [
        { name: "Razryad og‘irligi", expr: "N = ∑ (d_i × b^i)", desc: "b — asos, d_i — razryad raqami" },
        { name: "Ishorasiz diapazon", expr: "0 ... 2^n - 1", desc: "n bitli ishorasiz butun son (8-bit: 0..255)" }
      ],
      keyRules: [
        "1 nibble = 4 bit = bitta HEX raqam (0..F).",
        "1 bayt = 8 bit = 256 ta turli holat (0..255).",
        "Sakkizlik tizimda faqat 0..7 raqamlari mavjud; 8 va 9 raqami bo‘lishi mumkin emas!"
      ]
    }
  },
  {
    id: 5,
    chapter: 1,
    title: "5-Amaliy: Turli xil sanoq tizimlarida sonlarni bir-biriga o‘tkazish",
    shortName: "O‘tkazish",
    category: "Temir va Raqamlar",
    icon: "ArrowRightLeft",
    objective: "Ikkilik, sakkizlik, o‘nlik va o‘n oltilik sanoq tizimlari orasida sonlarni o‘tkazish algoritmlari.",
    cheatSheet: {
      title: "Sanoq Tizimlarida O‘tkazish",
      summary: "Bo‘lish qoldiqlari orqali (DEC → boshqa) yoki razryad og‘irliklari yig‘indisi orqali (boshqa → DEC).",
      formulas: [
        { name: "Ketma-ket bo‘lish", expr: "Son / 2 → Qoldiqlar teskari", desc: "10-likdan 2-likka o‘tish" },
        { name: "Tetrada usuli", expr: "4 bit BIN ↔ 1 ta HEX", desc: "Masalan: 1011₂ = B₁₆, 1100₂ = C₁₆" },
        { name: "Triada usuli", expr: "3 bit BIN ↔ 1 ta OCT", desc: "Masalan: 111₂ = 7₈, 101₂ = 5₈" }
      ],
      keyRules: [
        "BIN dan HEX ga o‘tishda o‘ngdan chapga 4 tadan bit (tetrada) guruhlanadi.",
        "Qoldiqlar har doim eng oxirgisidan (MSB) boshlab teskari tartibda o‘qiladi."
      ]
    }
  },
  {
    id: 6,
    chapter: 1,
    title: "6-Amaliy: Turli xil sanoq tizimlarida arifmetik amallarni bajarish",
    shortName: "Arifmetika",
    category: "Temir va Raqamlar",
    icon: "Calculator",
    objective: "Ikkilik qo‘shish, ayirish, ko‘chirish (Carry), qarz olish (Borrow) va overflow hodisasini tushunish.",
    cheatSheet: {
      title: "Ikkilik Arifmetika & ALU",
      summary: "ALU ning elementar operatsiyalari va registr sig‘imidan toshish (overflow) bayrog‘i.",
      formulas: [
        { name: "Half Adder SUM", expr: "SUM = A ⊕ B (XOR)", desc: "Yig‘indi chiqishi" },
        { name: "Half Adder CARRY", expr: "CARRY = A · B (AND)", desc: "Ko‘chirish chiqishi" },
        { name: "Full Adder CARRY", expr: "Cout = (A·B) + Cin·(A⊕B)", desc: "Kiruvchi Carry hisobga olinganda" }
      ],
      keyRules: [
        "1 + 1 = 10₂ (yig‘indi 0, keyingi razryadga 1 ko‘chadi).",
        "0 − 1 amali chapdagi razryaddan 1 birlik (2 qiymat) qarz oladi, natija 1 bo‘ladi.",
        "Unsigned 8-bit qo‘shishda yig‘indi > 255 bo‘lsa, Carry/Overflow bayrog‘i yoqiladi."
      ]
    }
  },
  {
    id: 7,
    chapter: 2,
    title: "7-Amaliy: Kompyuterlarni tashkil qilishning raqamli-mantiqiy asoslari",
    shortName: "Raqamli Mantiq",
    category: "Mantiqiy Sxemalar",
    icon: "Activity",
    objective: "Analog vs raqamli signallar, mantiqiy sathlar, kombinatsion va ketma-ket (sequential) sxemalar.",
    cheatSheet: {
      title: "Raqamli Signallar va Mantiqiy Sathlar",
      summary: "Fizik kuchlanishlarni diskret 0 va 1 mantiqiy sathlarga akslantirish.",
      formulas: [
        { name: "Kombinatsion funksiya", expr: "Y = f(X_1, X_2 ... X_n)", desc: "Chiqish faqat joriy kirishlarga bog‘liq" },
        { name: "Ketma-ket funksiya", expr: "Q(t+1) = f(kirishlar, Q(t))", desc: "Chiqish kirishlarga va avvalgi xotiraga bog‘liq" }
      ],
      keyRules: [
        "Analog signal vaqt bo‘yicha uzluksiz, raqamli signal esa diskret sathlarga ega.",
        "Ketma-ket sxemalar (sequential): trigger, registr, sanagich — avvalgi holatni eslab qoladi.",
        "Kombinatsion sxemalar: yarim qo‘shgich, mantiqiy darvozalar — xotiraga ega emas."
      ]
    }
  },
  {
    id: 8,
    chapter: 2,
    title: "8-Amaliy: Asosiy mantiqiy elementlar va sxemalarni loyihalash",
    shortName: "Mantiqiy Darvozalar",
    category: "Mantiqiy Sxemalar",
    icon: "GitBranch",
    objective: "AND, OR, NOT, NAND, NOR, XOR, XNOR rostlik jadvallari va universal elementlar.",
    cheatSheet: {
      title: "Mantiqiy Darvozalar va Rostlik Jadvallari",
      summary: "Barcha raqamli sxemalar elementar mantiqiy amallar ustiga quriladi.",
      formulas: [
        { name: "XOR (Inkorli Yoki)", expr: "Y = A ⊕ B = A·B̄ + Ā·B", desc: "Kirishlar har xil bo‘lganda 1" },
        { name: "XNOR (Tenglik)", expr: "Y = ¬(A ⊕ B)", desc: "Kirishlar teng bo‘lganda 1" },
        { name: "NAND Universal", expr: "NOT(A) = NAND(A, A)", desc: "Faqat NAND dan ixtiyoriy element tuziladi" }
      ],
      keyRules: [
        "NAND va NOR universal elementlar hisoblanadi (faqat ulardan NOT, AND, OR, XOR yig‘iladi).",
        "n ta kirishli sxemaning to‘liq rostlik jadvalida 2^n ta qator bo‘ladi (3 kirishda 8 ta)."
      ]
    }
  },
  {
    id: 9,
    chapter: 2,
    title: "9-Amaliy: Mantiqiy funksiyalarni Bul algebrasi yordamida ifodalash va soddalashtirish",
    shortName: "Bul Algebrasi & K-map",
    category: "Mantiqiy Sxemalar",
    icon: "Layers",
    objective: "Bul algebrasi qonunlari, De Morgan qoidalari va Karnaugh (K-map) minimallashtirish.",
    cheatSheet: {
      title: "Bul Qonunlari va Karnaugh Xaritasi",
      summary: "Sxemalarni soddalashtirish orqali tranzistorlar soni, kechikish va energiya sarfi kamaytiriladi.",
      formulas: [
        { name: "De Morgan 1", expr: "¬(A · B) = ¬A + ¬B", desc: "Ko‘paytmaning inkori inkorlar yig‘indisi" },
        { name: "De Morgan 2", expr: "¬(A + B) = ¬A · ¬B", desc: "Yig‘indining inkori inkorlar ko‘paytmasi" },
        { name: "Yutilish qonuni", expr: "A · (A + B) = A", desc: "A + A·B = A" },
        { name: "Komplement qonuni", expr: "A · Ā = 0   va   A + Ā = 1", desc: "O‘zgaruvchi va uning teskarisi" }
      ],
      keyRules: [
        "K-map da kataklar Gray kodi (00, 01, 11, 10) bo‘yicha joylashadi (qo‘shnilar faqat 1 bit farqlanadi).",
        "Guruhlar soni 2 ning darajasi bo‘lishi shart (1, 2, 4, 8 ta katak)."
      ]
    }
  },
  {
    id: 10,
    chapter: 3,
    title: "10-Amaliy: Buyruqlar tizimi arxitekturasi va buyruq formatlarini o‘rganish",
    shortName: "ISA & RISC-V",
    category: "Protsessor va Buyruqlar",
    icon: "Terminal",
    objective: "ISA tushunchasi, RISC vs CISC, RISC-V 32 ta registri va RV32I 32-bitli formatlari.",
    cheatSheet: {
      title: "Buyruqlar Tizimi Arxitekturasi (ISA)",
      summary: "ISA apparat va dasturiy ta’minot o‘rtasidagi rasmiy shartnomadir.",
      formulas: [
        { name: "R-format", expr: "[funct7(7) | rs2(5) | rs1(5) | funct3(3) | rd(5) | opcode(7)]", desc: "add, sub, and, or, xor" },
        { name: "I-format", expr: "[imm[11:0](12) | rs1(5) | funct3(3) | rd(5) | opcode(7)]", desc: "addi, andi, lw" },
        { name: "S-format", expr: "[imm[11:5](7) | rs2(5) | rs1(5) | funct3(3) | imm[4:0](5) | opcode(7)]", desc: "sw (store word)" }
      ],
      keyRules: [
        "RISC xususiyati: barcha buyruqlar 32-bit standart uzunlikda, load-store modeli.",
        "x0 (zero) registri doimo 0 qiymatini beradi, unga yozilgan natija bekor qilinadi."
      ]
    }
  },
  {
    id: 11,
    chapter: 3,
    title: "11-Amaliy: Operandlarni adreslash usullarini o‘rganish va masalalar yechish",
    shortName: "Adreslash Usullari",
    category: "Protsessor va Buyruqlar",
    icon: "Cpu",
    objective: "Registrli, bevosita (immediate), baza+siljish (base+offset) va PC-relative adreslash.",
    cheatSheet: {
      title: "Adreslash Usullari va Effective Address",
      summary: "Operand qayerda joylashganini va manzil qanday hisoblanishini belgilaydi.",
      formulas: [
        { name: "Effective Address (EA)", expr: "EA = Baza_Registri + Immediate_Offset", desc: "lw/sw da aniq xotira manzili" },
        { name: "Massiv offseti", expr: "Offset = Indeks × 4 bayt", desc: "32-bitli so‘zli massivlar uchun" },
        { name: "PC-relative", expr: "Target_PC = Joriy_PC + Offset", desc: "beq, bne tarmoqlanish manzili" }
      ],
      keyRules: [
        "Load-store: arifmetik amallar faqat registrlarda bajariladi, xotira bilan to‘g‘ridan-to‘g‘ri hisoblash bo‘lmaydi.",
        "add x5, x6, x7 — registrli adreslash; addi x5, x6, 10 — bevosita (immediate) adreslash."
      ]
    }
  },
  {
    id: 12,
    chapter: 4,
    title: "12-Amaliy: Kompyuter xotirasining turlari va xotira ierarxiyasini o‘rganish",
    shortName: "Xotira Ierarxiyasi",
    category: "Xotira va Kesh",
    icon: "TrendingDown",
    objective: "Tezlik, sig‘im va narx piramidasi, EAT formulasi va xotira uchuvchanligi (volatility).",
    cheatSheet: {
      title: "Xotira Ierarxiyasi va EAT",
      summary: "Protsessor tezligi va xotira kechikishi orasidagi farqni muvozanatlashtirish piramidasi.",
      formulas: [
        { name: "EAT formulasi", expr: "EAT = t_L1 + (1 - H1) × (t_L2 + (1 - H2) × t_RAM)", desc: "O‘rtacha kirish vaqti" },
        { name: "GiB hisobi", expr: "Sig‘im_GiB = Baytlar / 2^30", desc: "Aniq ikkilik sig‘im o‘lchovi" }
      ],
      keyRules: [
        "Tezlik ketma-ketligi: Registr → L1 → L2 → L3 → DRAM (RAM) → NVMe SSD → SATA SSD → HDD.",
        "Uchuvchanlik: DRAM elektr o‘chganda ma’lumotni yo‘qotadi; SSD va HDD doimiy saqlaydi."
      ]
    }
  },
  {
    id: 13,
    chapter: 4,
    title: "13-Amaliy: Xotira qurilmalarining xususiyatlari va ko‘rsatkichlarini taqqoslash",
    shortName: "Saqlash Qurilmalari",
    category: "Xotira va Kesh",
    icon: "HardDrive",
    objective: "HDD, SATA SSD, NVMe SSD ko‘rsatkichlari: Throughput, Latency, IOPS va TBW chidamliligi.",
    cheatSheet: {
      title: "Saqlash Qurilmalari Matritsasi",
      summary: "“Tezlik” bitta son emas: sequential MB/s, 4K random IOPS va latency farqlanadi.",
      formulas: [
        { name: "Ko‘chirish vaqti", expr: "Vaqt = Hajm_MB / Tezlik_MBps", desc: "Masalan: 20 GB 500 MB/s da = 40 s" }
      ],
      keyRules: [
        "Reklamadagi 7000 MB/s faqat ketma-ket (sequential) o‘qish maksimumidir.",
        "Operatsion tizim va mayda fayllar uchun 4K Random IOPS va past latency eng muhim ko‘rsatkich.",
        "M.2 — form-faktor (shakl), NVMe esa PCIe orqali ishlovchi yuqori tezlikli protokol."
      ]
    }
  },
  {
    id: 14,
    chapter: 4,
    title: "14-Amaliy: Kesh va virtual xotiraning ishlash prinsipini o‘rganish",
    shortName: "Kesh & Virtual Xotira",
    category: "Xotira va Kesh",
    icon: "Zap",
    objective: "Cache line, vaqtinchalik va fazoviy lokalik, Write-back vs Write-through, MMU, TLB va Pagefile.",
    cheatSheet: {
      title: "Kesh va Virtual Xotira Mexanizmlari",
      summary: "Lokalik tamoyillari va virtual manzilni fizik manzilga apparatli tarjima qilish.",
      formulas: [
        { name: "Hit Rate", expr: "Hit Rate = Topilganlar / Jami_Murojaatlar", desc: "Foizda (90%–99%)" }
      ],
      keyRules: [
        "Cache line — keshga bitta so‘z emas, odatda 64 baytlik yaxlit blok bo‘lib keladigan birlik (fazoviy lokalik).",
        "Write-back: yozuv avval keshda qoladi (dirty), faqat keshdan chiqarilganda RAM ga o‘tadi.",
        "Write-through: yozuv keshga ham, RAM ga ham bir vaqtda yoziladi (shina band bo‘ladi).",
        "Hard Fault — kerakli sahifa RAM da topilmay, sekin diskdagi pagefile dan o‘qilishi."
      ]
    }
  },
  {
    id: 15,
    chapter: 5,
    title: "15-Amaliy: RAID massivlari va ma’lumotlarni saqlash texnologiyalarini o‘rganish",
    shortName: "RAID & 3-2-1 Zaxira",
    category: "Massivlar va Shinalar",
    icon: "ShieldAlert",
    objective: "RAID 0, 1, 5, 6, 10 bloklari, foydali sig‘im, nosozlikka chidamlilik, write penalty va 3-2-1 backup.",
    cheatSheet: {
      title: "RAID Massivlari va Zaxiralash",
      summary: "Bir nechta diskni striping, mirroring va parity orqali birlashtirish.",
      formulas: [
        { name: "RAID 0", expr: "Sig‘im = N × S", desc: "0 ta disk nosozligiga chidaydi (himoya yo‘q)" },
        { name: "RAID 1", expr: "Sig‘im = S", desc: "Ko‘zgu, 1 ta nosozlikka chidaydi" },
        { name: "RAID 5", expr: "Sig‘im = (N - 1) × S", desc: "Taqsimlangan paritet, 1 ta disk nosozligiga chidaydi" },
        { name: "RAID 6", expr: "Sig‘im = (N - 2) × S", desc: "Ikkitalik paritet, 2 ta disk bir vaqtda sinishiga chidaydi" },
        { name: "RAID 10", expr: "Sig‘im = (N / 2) × S", desc: "Mirror + Stripe, yuqori tezlik va har juftlikdan 1 tadan nosozlik" }
      ],
      keyRules: [
        "RAID zaxira (backup) emas! Tasodifan o‘chirilgan faylni barcha disklardan bir zumda o‘chiradi.",
        "3-2-1 qoidasi: 3 ta nusxa, 2 xil tashuvchi vositada, kamida 1 ta nusxa boshqa hududda (off-site)."
      ]
    }
  },
  {
    id: 16,
    chapter: 5,
    title: "16-Amaliy: Kompyuter shinalari va ularning ishlash prinsipini o‘rganish",
    shortName: "Shinalar & CXL",
    category: "Massivlar va Shinalar",
    icon: "Gauge",
    objective: "Parallel shinalardan point-to-point ga o‘tish, PCIe 3.0–7.0 lane va link width, CXL 4.0 protokollari.",
    cheatSheet: {
      title: "PCI Express va CXL Interkonnektlari",
      summary: "Zamonaviy kompyuterlar yuqori tezlikdagi ketma-ket differensial liniyalar orqali bog‘lanadi.",
      formulas: [
        { name: "Nazariy o‘tkazuvchanlik", expr: "Throughput = Lane × Rate_GT × Kodlash_Samaradorligi", desc: "GB/s da" }
      ],
      keyRules: [
        "PCIe lane: mustaqil uzatish (TX) va qabul (RX) differensial juftliklaridan iborat.",
        "PCIe 3.0: 8 GT/s (128b/130b); PCIe 4.0: 16 GT/s; PCIe 5.0: 32 GT/s; PCIe 6.0/7.0: 64/128 GT/s (PAM4 + FLIT).",
        "CXL.io (I/O aloqa), CXL.cache (akselerator CPU keshini kogerent qiladi), CXL.mem (umumiy xotira hovuzi)."
      ]
    }
  }
];
