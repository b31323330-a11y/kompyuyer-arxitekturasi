// "Aniq Javob Yozish" (Formula va Hisoblash Challenge) savollar bazasi
// Barcha 14 ta amaliy mashg'ulot bo'yicha raqamli va formulali vazifalar

export interface InputChallengeQuestion {
  id: string;
  labNumber: number;
  category: string;
  title: string;
  prompt: string;
  targetAnswer: string;
  acceptedVariants?: string[];
  unit?: string;
  hint: string;
  solutionFormula: string;
  explanation: string;
}

export const INPUT_CHALLENGE_QUESTIONS: InputChallengeQuestion[] = [
  {
    "id": "in-4-1",
    "labNumber": 4,
    "title": "Ikkilikdan O'nlikka O'tkazish",
    "prompt": "110101₂ ikkilik sonini o'nlik (DEC) sanoq sistemasiga o'tkazing.",
    "targetAnswer": "53",
    "acceptedVariants": [
      "53",
      "53_10",
      "53(10)"
    ],
    "unit": "",
    "hint": "Razryadlar og'irliklari: 32 + 16 + 0 + 4 + 0 + 1",
    "solutionFormula": "1*32 + 1*16 + 0*8 + 1*4 + 0*2 + 1*1 = 53",
    "explanation": "110101₂ = 32 + 16 + 4 + 1 = 53₁₀.",
    "category": "Sanoq Tizimlari"
  },
  {
    "id": "in-4-2",
    "labNumber": 4,
    "title": "HEX dan O'nlikka O'tkazish",
    "prompt": "2F₁₆ o'n oltilik sonining o'nlik (DEC) qiymatini toping.",
    "targetAnswer": "47",
    "acceptedVariants": [
      "47",
      "47_10"
    ],
    "unit": "",
    "hint": "F = 15, 2 ning og'irligi esa 16¹",
    "solutionFormula": "2 * 16 + 15 = 47",
    "explanation": "2*16 + 15 = 47₁₀.",
    "category": "Sanoq Tizimlari"
  },
  {
    "id": "in-5-1",
    "labNumber": 5,
    "title": "Ikkilikdan HEX ga O'tkazish",
    "prompt": "10111100₂ ikkilik baytini HEX formatiga o'tkazing (faqat prefikssiz bosh harflarda yozing, masalan: BC).",
    "targetAnswer": "BC",
    "acceptedVariants": [
      "BC",
      "0xBC",
      "bc",
      "0xbc"
    ],
    "unit": "",
    "hint": "1011 = B (11), 1100 = C (12)",
    "solutionFormula": "[1011] = B, [1100] = C => BC",
    "explanation": "1011₂ = 11₁₀ = B₁₆, 1100₂ = 12₁₀ = C₁₆. Natija: BC₁₆.",
    "category": "Sanoq Tizimlari"
  },
  {
    "id": "in-5-2",
    "labNumber": 5,
    "title": "Sakkizlikdan Ikkilikka",
    "prompt": "75₈ sakkizlik sonini ikkilik (BIN) ko'rinishida yozing (6 bitli triadalar).",
    "targetAnswer": "111101",
    "acceptedVariants": [
      "111101",
      "111101_2",
      "111 101"
    ],
    "unit": "",
    "hint": "7 = 111, 5 = 101",
    "solutionFormula": "7 -> 111; 5 -> 101 => 111101",
    "explanation": "Har bir sakkizlik raqam 3-bitli triadaga aylanadi: 7₈ = 111₂, 5₈ = 101₂. Birlashganda 111101₂.",
    "category": "Sanoq Tizimlari"
  },
  {
    "id": "in-6-1",
    "labNumber": 6,
    "title": "8-bit Unsigned Maksimal Qiymat",
    "prompt": "8-bitli unsigned (ishorasiz) butun sonlar diapazonining eng katta qiymati nechaga teng?",
    "targetAnswer": "255",
    "acceptedVariants": [
      "255",
      "0xFF",
      "255₁₀"
    ],
    "unit": "",
    "hint": "2^8 - 1",
    "solutionFormula": "2^8 - 1 = 256 - 1 = 255",
    "explanation": "8-bit unsigned sonlar 0 dan 255 gacha oraliqni ifodalaydi.",
    "category": "ALU va Arifmetika"
  },
  {
    "id": "in-6-2",
    "labNumber": 6,
    "title": "8-bitli Qo'shish va Overflow",
    "prompt": "8-bitli unsigned arifmetikada 200 + 70 amali bajarilganda 8-bitli registrda qanday son qoladi?",
    "targetAnswer": "14",
    "acceptedVariants": [
      "14"
    ],
    "unit": "",
    "hint": "200 + 70 = 270. 270 mod 256 ni toping (yoki 270 - 256).",
    "solutionFormula": "(200 + 70) mod 256 = 270 - 256 = 14",
    "explanation": "Natija 270 bo'lib, 8-bit chegarasidan (255) oshadi. 9-bit Carry ga chiqadi va registrda 14 (0x0E) qoladi.",
    "category": "ALU va Arifmetika"
  },
  {
    "id": "in-8-1",
    "labNumber": 8,
    "title": "Yarim Qo'shgich Chiqishi",
    "prompt": "Half Adder sxemasiga A=1 va B=1 signallari berilganda, Sum (Yig'indi) chiqishi nima bo'ladi (0 yoki 1)?",
    "targetAnswer": "0",
    "acceptedVariants": [
      "0"
    ],
    "unit": "",
    "hint": "Sum = A XOR B; 1 XOR 1 = ?",
    "solutionFormula": "Sum = 1 XOR 1 = 0; Carry = 1 AND 1 = 1",
    "explanation": "1 + 1 = 10₂. Sum quyi bit bo'lib 0 ga teng, Carry esa 1 bo'ladi.",
    "category": "Mantiqiy Elementlar"
  },
  {
    "id": "in-8-2",
    "labNumber": 8,
    "title": "Universal NAND miqdori",
    "prompt": "Faqat 2-kirishli NAND elementlari yordamida bitta 2-kirishli OR (Dis'yunktsiya) elementini yasash uchun kamida nechta NAND elementi kerak?",
    "targetAnswer": "3",
    "acceptedVariants": [
      "3",
      "uch"
    ],
    "unit": "ta",
    "hint": "A OR B = !(!A AND !B). De Morgan bo'yicha har bir kirishga bittadan NAND (inverter) va chiqishga bitta NAND kerak.",
    "solutionFormula": "NOT(A) [1 ta] + NOT(B) [1 ta] + NAND(chiqish) [1 ta] = 3 ta",
    "explanation": "A va B ni invert qilish uchun 2 ta NAND, so'ng ularning chiqishini 3-NAND ga ulash orqali OR yasaladi.",
    "category": "Mantiqiy Elementlar"
  },
  {
    "id": "in-9-1",
    "labNumber": 9,
    "title": "Karnaugh Guruhlash",
    "prompt": "4 o'zgaruvchili Karnaugh xaritasida barcha 16 ta katak ham 1 ga teng bo'lsa, minimallashtirilgan mantiqiy ifoda nimaga teng bo'ladi?",
    "targetAnswer": "1",
    "acceptedVariants": [
      "1",
      "true"
    ],
    "unit": "",
    "hint": "Barcha o'zgaruvchilar qisqarib ketadi",
    "solutionFormula": "16 ta katakli bitta guruh = 1",
    "explanation": "Barcha kombinatsiyalar 1 bo'lsa, natija o'zgaruvchilarga bog'liq bo'lmay, doimiy 1 (mantiqiy haqiqat) bo'ladi.",
    "category": "Karnaugh va Bul Algebrasi"
  },
  {
    "id": "in-10-1",
    "labNumber": 10,
    "title": "RV32I Registr Qiymati",
    "prompt": "Ushbu kod ketma-ketligi bajarilgach, x7 registrida qanday qiymat bo'ladi: \naddi x5, x0, 12 \naddi x6, x0, 8 \nadd x7, x5, x6",
    "targetAnswer": "20",
    "acceptedVariants": [
      "20"
    ],
    "unit": "",
    "hint": "x5 = 12, x6 = 8, x7 = x5 + x6",
    "solutionFormula": "12 + 8 = 20",
    "explanation": "x5=12, x6=8. add amali ularni qo'shib 20 qiymatini x7 ga yozadi.",
    "category": "RISC-V Protsessor"
  },
  {
    "id": "in-11-1",
    "labNumber": 11,
    "title": "RISC-V Samarali Manzil (EA)",
    "prompt": "Agar x10 registrida 0x2000 manzili bo'lsa, 'lw t0, 16(x10)' buyrug'i operativ xotiraning qaysi o'n oltilik manzilidan so'z o'qiydi? (Format: 0x2010)",
    "targetAnswer": "0x2010",
    "acceptedVariants": [
      "0x2010",
      "2010",
      "2010h"
    ],
    "unit": "",
    "hint": "0x2000 + 16 (16 o'nlikda = 0x10 HEX)",
    "solutionFormula": "0x2000 + 0x10 = 0x2010",
    "explanation": "16 o'nlik soni HEX da 0x10 ga teng. Baza (0x2000) + Offset (0x10) = 0x2010.",
    "category": "RISC-V Protsessor"
  },
  {
    "id": "in-12-1",
    "labNumber": 12,
    "title": "O'rtacha Murojaat Vaqti (EAT)",
    "prompt": "Keshga murojaat vaqti 2 ns, asosiy xotiraga (RAM) murojaat vaqti 50 ns, keshda topish ehtimoli (Hit Rate) 90% (0.9) bo'lsa, o'rtacha murojaat vaqti (EAT) necha ns bo'ladi?",
    "targetAnswer": "7",
    "acceptedVariants": [
      "7",
      "7 ns",
      "7.0"
    ],
    "unit": "ns",
    "hint": "EAT = Hit_time + Miss_rate * Miss_penalty = 2 + (1 - 0.9) * 50",
    "solutionFormula": "2 + 0.1 * 50 = 2 + 5 = 7 ns",
    "explanation": "EAT = 2 ns + (0.10 * 50 ns) = 2 + 5 = 7 ns.",
    "category": "Xotira Iyerarxiyasi"
  },
  {
    "id": "in-14-1",
    "labNumber": 14,
    "title": "Direct-Mapped Kesh Qatori",
    "prompt": "Direct-mapped keshda 8 ta qator (Index 0 dan 7 gacha) mavjud. 26-raqamli xotira bloki keshning nechanchi indeksli qatoriga joylashadi?",
    "targetAnswer": "2",
    "acceptedVariants": [
      "2",
      "qator 2",
      "index 2"
    ],
    "unit": "",
    "hint": "Kesh qatori = Blok_raqami mod Qatorlar_soni = 26 mod 8",
    "solutionFormula": "26 % 8 = 2 (chunki 8 * 3 = 24, qoldiq 2)",
    "explanation": "26 mod 8 amali 2 qoldiq beradi. Demak, blok 2-indeksli qatorga tushadi.",
    "category": "Kesh va Virtual Xotira"
  },
  {
    "id": "in-15-1",
    "labNumber": 15,
    "title": "RAID 5 Foydali Hajm",
    "prompt": "Har biri 4 TB bo'lgan 5 ta diskdan iborat RAID 5 massivining umumiy foydali hajmi necha TB bo'ladi?",
    "targetAnswer": "16",
    "acceptedVariants": [
      "16",
      "16 TB",
      "16TB"
    ],
    "unit": "TB",
    "hint": "RAID 5 sig'im formulasi: (N - 1) * Disk_hajmi",
    "solutionFormula": "(5 - 1) * 4 TB = 4 * 4 TB = 16 TB",
    "explanation": "RAID 5 da bitta disk ekvivalentidagi hajm paritet uchun taqsimlanadi: (5 - 1) * 4 = 16 TB.",
    "category": "RAID Texnologiyalari"
  },
  {
    "id": "in-15-2",
    "labNumber": 15,
    "title": "RAID 6 Foydali Hajm",
    "prompt": "Har biri 6 TB bo'lgan 6 ta diskdan iborat RAID 6 massivining umumiy foydali hajmi necha TB bo'ladi?",
    "targetAnswer": "24",
    "acceptedVariants": [
      "24",
      "24 TB",
      "24TB"
    ],
    "unit": "TB",
    "hint": "RAID 6 formulasi: (N - 2) * Disk_hajmi",
    "solutionFormula": "(6 - 2) * 6 TB = 4 * 6 TB = 24 TB",
    "explanation": "RAID 6 da 2 ta disk ekvivalentidagi hajm P va Q paritetlari uchun ishlatiladi: (6 - 2) * 6 = 24 TB.",
    "category": "RAID Texnologiyalari"
  },
  {
    "id": "in-15-3",
    "labNumber": 15,
    "title": "RAID 10 Disklari",
    "prompt": "RAID 10 (1+0) massivini yaratish uchun minimal nechta disk talab qilinadi?",
    "targetAnswer": "4",
    "acceptedVariants": [
      "4",
      "to'rtta",
      "4 ta"
    ],
    "unit": "ta",
    "hint": "Kamida ikkita RAID 1 ko'zguli juftligi kerak",
    "solutionFormula": "2 ta juftlik * 2 disk = 4 disk",
    "explanation": "RAID 10 ko'zgular chizig'i (stripe of mirrors) bo'lib, kamida 2 ta 2-diskli juftlik, ya'ni 4 ta disk kerak.",
    "category": "RAID Texnologiyalari"
  },
  {
    "id": "in-16-1",
    "labNumber": 16,
    "title": "PCIe 4.0 x16 O'tkazish Qobiliyati",
    "prompt": "PCIe 4.0 interfeysida x16 slotning nazariy bir tomonlama o'tkazish qobiliyati taxminan necha GB/s ni tashkil etadi?",
    "targetAnswer": "32",
    "acceptedVariants": [
      "32",
      "31.5",
      "31.51",
      "32 GB/s"
    ],
    "unit": "GB/s",
    "hint": "Bitta liniya (x1) = taxminan 2 GB/s (16 GT/s * 128/130 / 8)",
    "solutionFormula": "16 liniya * ~1.97 GB/s ≈ 31.5 - 32 GB/s",
    "explanation": "PCIe 4.0 x1 liniyasi ~1.969 GB/s beradi. x16 slot uchun bu taxminan 31.51 GB/s (~32 GB/s) ga to'g'ri keladi.",
    "category": "Shinalar va PCIe/CXL"
  },
  {
    "id": "in-16-2",
    "labNumber": 16,
    "title": "PCIe 5.0 x4 Tezligi",
    "prompt": "Zamonaviy PCIe 5.0 NVMe SSD drayveri x4 slotga ulanganda uning nazariy maksimal o'tkazish qobiliyati taxminan necha GB/s bo'ladi?",
    "targetAnswer": "16",
    "acceptedVariants": [
      "16",
      "15.75",
      "16 GB/s"
    ],
    "unit": "GB/s",
    "hint": "PCIe 5.0 x1 = ~3.94 GB/s. 4 ta liniya uchun: 4 * 3.94",
    "solutionFormula": "4 * 3.938 GB/s ≈ 15.75 - 16 GB/s",
    "explanation": "PCIe 5.0 (32 GT/s) x4 liniya orqali bir yo'nalishda taxminan 15.75 GB/s (yaxlitlanganda 16 GB/s) ma'lumot uzatadi.",
    "category": "Shinalar va PCIe/CXL"
  }
];
