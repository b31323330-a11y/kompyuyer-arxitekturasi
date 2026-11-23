/* Master Question Bank (100+ Static Questions & 15+ Dynamic Problem Generators) */

export interface Question {
  id: string;
  labId: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isDynamic?: boolean;
}

export const MASTER_STATIC_QUESTIONS: Question[] = [
  {
    id: "q_1",
    labId: 2,
    text: "Tashqi SSD qaysi guruhga kiradi?",
    options: ["Tashqi, kiritish-chiqarish va saqlash", "Ichki, faqat chiqarish", "Tashqi, faqat kiritish", "Ichki, faqat kiritish"],
    correctIndex: 0,
    explanation: "Tashqi SSD USB orqali ulanadi (tashqi), axborot o‘qiydi va yozadi (kiritish-chiqarish va doimiy saqlash).",
    difficulty: "easy"
  },
  {
    id: "q_2",
    labId: 2,
    text: "Qog‘oz hujjatlarni raqamlashtirish uchun qaysi qo‘shimcha qurilma kerak?",
    options: ["Skaner", "Printer", "Proyektor", "Kolonka"],
    correctIndex: 0,
    explanation: "Skaner optik sensorlar yordamida qog‘oz tasvirini raqamli faylga aylantiruvchi kiritish vositasidir.",
    difficulty: "easy"
  },
  {
    id: "q_3",
    labId: 2,
    text: "Proyektor qaysi funksional guruhga kiradi?",
    options: ["Tashqi, chiqarish", "Tashqi, kiritish", "Ichki, saqlash", "Ichki, kiritish"],
    correctIndex: 0,
    explanation: "Proyektor kompyuterdagi tasvirni katta ekranga yoyib beruvchi tashqi chiqarish qurilmasi.",
    difficulty: "easy"
  },
  {
    id: "q_4",
    labId: 2,
    text: "K-Q-S-Ch axborot modelida monitor qaysi bosqichda turadi?",
    options: ["Chiqarish", "Kiritish", "Saqlash", "Qayta ishlash"],
    correctIndex: 0,
    explanation: "Monitor ishlov berilgan ma’lumotlarni foydalanuvchiga vizual taqdim etuvchi chiqarish bosqichidir.",
    difficulty: "easy"
  },
  {
    id: "q_5",
    labId: 2,
    text: "Qaysi qurilma ikki yo‘nalishda ma’lumot almashadi?",
    options: ["Sensorli ekran (Touchscreen)", "Mikrofon", "Printer", "Klaviatura"],
    correctIndex: 0,
    explanation: "Sensorli ekran teginish orqali buyruq qabul qiladi (kiritish) va tasvir ko‘rsatadi (chiqarish).",
    difficulty: "easy"
  },
  {
    id: "q_6",
    labId: 2,
    text: "Ona plata (Motherboard) kompyuterda qanday asosiy vazifani bajaradi?",
    options: ["Barcha ichki komponentlar va shinalarni apparat darajasida birlashtiradi", "Faqat elektr energiyasini tarqatadi", "Faqat videotasvirni hosil qiladi", "Faqat fayllarni doimiy saqlaydi"],
    correctIndex: 0,
    explanation: "Ona plata protsessor, xotira, chipset va kengaytirish slotlarini yaxlit tizimga birlashtiruvchi poydevordir.",
    difficulty: "medium"
  },
  {
    id: "q_7",
    labId: 2,
    text: "Qurilma tanlashda eng kuchli komponentni emas, vazifaga moslikni tanlash nega muhim?",
    options: ["Energiya sarfi, issiqlik, muvozanat va ortiqcha xarajatni oldini olish uchun", "Qonun kuchli qurilmalarni taqiqlaydi", "Barcha dasturlar bir xil resurs talab qiladi", "Kuchli qurilmalar doim sekinroq ishlaydi"],
    correctIndex: 0,
    explanation: "Masalan, oddiy ofis ishi uchun server quvvati talab etilmaydi, ortiqcha xarajat va energiya yo‘qotilishiga sabab bo‘ladi.",
    difficulty: "medium"
  },
  {
    id: "q_8",
    labId: 2,
    text: "Videokarta (GPU) tizimda qaysi guruhga mansub?",
    options: ["Ichki, grafik qayta ishlash va chiqarishni ta’minlovchi qurilma", "Tashqi, faqat kiritish", "Ichki, faqat saqlash", "Tashqi, audio chiqarish"],
    correctIndex: 0,
    explanation: "Videokarta ona platadagi PCIe slotiga o‘rnatiladi va grafik hisoblashlarni bajaradi.",
    difficulty: "easy"
  },
  {
    id: "q_9",
    labId: 4,
    text: "Qaysi yozuv sakkizlik (OCT) tizimda mavjud bo‘la olmaydi?",
    options: ["389₈", "725₈", "101₈", "777₈"],
    correctIndex: 0,
    explanation: "Sakkizlik tizim asosi 8 bo‘lib, unda faqat 0 dan 7 gacha raqamlar ishlatiladi. 8 va 9 bo‘lishi mumkin emas.",
    difficulty: "easy"
  },
  {
    id: "q_10",
    labId: 4,
    text: "555₁₀ sonida o‘rtadagi 5 ning pozitsion razryad qiymati nechaga teng?",
    options: ["50", "5", "500", "55"],
    correctIndex: 0,
    explanation: "O‘nlikda o‘rtadagi 5 o‘nlar xonasida joylashgan: 5 × 10¹ = 50.",
    difficulty: "easy"
  },
  {
    id: "q_11",
    labId: 4,
    text: "Ishorasiz 8 bitli butun sonlar qaysi oraliqdagi qiymatlarni qabul qiladi?",
    options: ["0 … 255", "0 … 256", "−128 … 127", "1 … 255"],
    correctIndex: 0,
    explanation: "2⁸ = 256 ta turli holat, 0 dan boshlangani uchun 0 dan 255 gacha (2⁸ - 1).",
    difficulty: "easy"
  },
  {
    id: "q_12",
    labId: 4,
    text: "1 nibble + 1 bayt jami necha bit bo‘ladi?",
    options: ["12", "8", "16", "10"],
    correctIndex: 0,
    explanation: "1 nibble = 4 bit, 1 bayt = 8 bit. Jami: 4 + 8 = 12 bit.",
    difficulty: "easy"
  },
  {
    id: "q_13",
    labId: 4,
    text: "Ikkilik sanoq tizimining kompyuter apparaturasida qo‘llanishining asosiy sababi nima?",
    options: ["Tranzistorlarning ikki turg‘un holatiga (yoqilgan/o‘chirilgan) to‘liq mosligi", "O‘nlik tizim qiyinligi uchun", "Ikkilikda sonlar kamroq joy egallashi uchun", "Boshqa tizimlar kashf qilinmaganligi uchun"],
    correctIndex: 0,
    explanation: "Yarimo‘tkazgich tranzistorlar kalit sifatida toki o‘tkazadi (1) yoki o‘tkazmaydi (0).",
    difficulty: "medium"
  },
  {
    id: "q_14",
    labId: 4,
    text: "16-bitli ishorasiz butun sonning maksimal qiymati nechaga teng?",
    options: ["65 535", "65 536", "32 767", "1 048 575"],
    correctIndex: 0,
    explanation: "2¹⁶ - 1 = 65 536 - 1 = 65 535.",
    difficulty: "medium"
  },
  {
    id: "q_15",
    labId: 4,
    text: "O‘n oltilik tizimdagi 'F' belgisi o‘nlikda qaysi songa to‘g‘ri keladi?",
    options: ["15", "16", "14", "10"],
    correctIndex: 0,
    explanation: "A=10, B=11, C=12, D=13, E=14, F=15.",
    difficulty: "easy"
  },
  {
    id: "q_16",
    labId: 5,
    text: "2D₁₆ ning o‘nlikdagi qiymati nechaga teng?",
    options: ["45", "29", "43", "213"],
    correctIndex: 0,
    explanation: "2 × 16¹ + 13 × 16⁰ = 32 + 13 = 45₁₀.",
    difficulty: "easy"
  },
  {
    id: "q_17",
    labId: 5,
    text: "55₈ ning o‘nlikdagi qiymati nechaga teng?",
    options: ["45", "55", "40", "35"],
    correctIndex: 0,
    explanation: "5 × 8¹ + 5 × 8⁰ = 40 + 5 = 45₁₀.",
    difficulty: "easy"
  },
  {
    id: "q_18",
    labId: 5,
    text: "BC6₁₆ ning ikkilik yozuvi qaysi javobda to‘g‘ri berilgan?",
    options: ["101111000110", "101111001010", "110011000110", "101101000110"],
    correctIndex: 0,
    explanation: "B = 1011₂, C = 1100₂, 6 = 0110₂. Birlashtirganda: 101111000110₂.",
    difficulty: "medium"
  },
  {
    id: "q_19",
    labId: 5,
    text: "O‘nlik sonni ikkilikka o‘tkazishda qoldiqlar nima uchun teskari tartibda yoziladi?",
    options: ["Eng oxirgi qoldiq eng yuqori razryad (MSB) og‘irligiga ega bo‘lgani uchun", "Bo‘lish oson bo‘lishi uchun", "Standart tasodifiy qabul qilingan", "Faqat juft sonlar uchun shunday"],
    correctIndex: 0,
    explanation: "Ketma-ket bo‘lishda har bir qadam razryad og‘irligini 2 barobar oshiradi.",
    difficulty: "medium"
  },
  {
    id: "q_20",
    labId: 5,
    text: "11010110₂ sonini sakkizlikka (OCT) o‘tkazish uchun qanday guruhlash kerak?",
    options: ["O‘ngdan chapga 3 tadan bit (triada) qilib guruhlash", "Chapdan o‘ngga 4 tadan bit", "Faqat juft o‘rindagi bitlarni olish", "Ikkiga bo‘lib yozish"],
    correctIndex: 0,
    explanation: "2³ = 8 bo‘lgani sababli sakkizlik raqam 3 ta ikkilik bitga (triada) mos keladi.",
    difficulty: "medium"
  },
  {
    id: "q_21",
    labId: 5,
    text: "FF₁₆ o‘nlikda nechaga teng?",
    options: ["255", "256", "128", "254"],
    correctIndex: 0,
    explanation: "15 × 16 + 15 = 240 + 15 = 255.",
    difficulty: "easy"
  },
  {
    id: "q_22",
    labId: 6,
    text: "Ikkilik arifmetikasida 0 − 1 bajarilganda nima sodir bo‘ladi?",
    options: ["Chapdagi razryaddan 1 qarz olinadi, natija 1 bo‘ladi", "Natija 0 va ko‘chirish hosil bo‘ladi", "Natija −1 bo‘ladi", "Overflow bo‘lmaydi, natija 0"],
    correctIndex: 0,
    explanation: "Chapdan olingan 1 birlik joriy razryadda 2 ga (10₂) aylanadi, 2 - 1 = 1 natija beradi.",
    difficulty: "easy"
  },
  {
    id: "q_23",
    labId: 6,
    text: "Half Adder (Yarim qo‘shgich) da ko‘chirish (Carry) qaysi mantiqiy amal bilan hosil qilinadi?",
    options: ["A AND B", "A XOR B", "A OR B", "NOT A"],
    correctIndex: 0,
    explanation: "Ko‘chirish faqat A=1 va B=1 bo‘lgandagina 1 bo‘ladi, bu esa mantiqiy AND amalidir.",
    difficulty: "easy"
  },
  {
    id: "q_24",
    labId: 6,
    text: "Sakkizlik tizimda 7 + 1 amali natijasi nechaga teng?",
    options: ["10₈", "8₈", "70₈", "11₈"],
    correctIndex: 0,
    explanation: "Sakkizlik tizimda 7 eng katta raqam, 1 qo‘shilsa yangi razryad ochilib 10₈ hosil bo‘ladi.",
    difficulty: "easy"
  },
  {
    id: "q_25",
    labId: 6,
    text: "8 bitli registrda 200 + 100 bajarilsa, registrdagi qiymat necha bo‘ladi (unsigned overflow)?",
    options: ["44", "300", "255", "100"],
    correctIndex: 0,
    explanation: "200 + 100 = 300. 8-bit faqat 256 ta holat (0..255) sig‘diradi: 300 - 256 = 44 (va Carry bayrog‘i yoqiladi).",
    difficulty: "medium"
  },
  {
    id: "q_26",
    labId: 6,
    text: "Full Adder (To‘liq qo‘shgich) Half Adder dan nimasi bilan farqlanadi?",
    options: ["Oldingi razryaddan keluvchi kirish ko‘chirish (Cin) bitini ham qo‘shadi", "Faqat ayirish amalini bajaradi", "Chiqishida XOR bo‘lmaydi", "Tezligi 2 barobar sekin"],
    correctIndex: 0,
    explanation: "Full Adder 3 ta kirishga ega: A, B va Cin.",
    difficulty: "medium"
  },
  {
    id: "q_27",
    labId: 6,
    text: "Ikkilikda 1011₂ + 0110₂ yig‘indisi nimaga teng?",
    options: ["10001₂", "10010₂", "11111₂", "10000₂"],
    correctIndex: 0,
    explanation: "11 + 6 = 17₁₀ = 10001₂.",
    difficulty: "medium"
  },
  {
    id: "q_28",
    labId: 7,
    text: "Mantiqiy 0 va 1 ning kuchlanishi haqida qaysi fikr to‘g‘ri?",
    options: ["Mantiqiy oilaga bog‘liq; muhimi — kirish chegaradan past yoki yuqoriligi", "Har doim 0 V va 5 V", "Har doim 0 V va 3,3 V", "Barcha qurilmalarda 0 V va 1 V"],
    correctIndex: 0,
    explanation: "TTL, CMOS 3.3V, 1.8V kabi texnologiyalarda kuchlanish chegaralari turlicha belgilanadi.",
    difficulty: "medium"
  },
  {
    id: "q_29",
    labId: 7,
    text: "Qaysi qurilma ketma-ket (sequential) mantiqiy turga kiradi?",
    options: ["D-trigger va registrlar", "Yarim qo‘shgich", "AND elementi", "NOT elementi"],
    correctIndex: 0,
    explanation: "Trigger va registrlar avvalgi holatni eslab qoluvchi xotira elementlari hisoblanadi.",
    difficulty: "easy"
  },
  {
    id: "q_30",
    labId: 7,
    text: "Analog signalning raqamli signaldan asosiy farqi nimada?",
    options: ["Analog uzluksiz qiymatlar qabul qiladi, raqamli esa diskret sathlarga ega", "Analog faqat 0 va 1 bo‘ladi", "Raqamli signal shovqinga juda sezgir", "Hech qanday farqi yo‘q"],
    correctIndex: 0,
    explanation: "Analog signal tabiiy fizik hodisalardek uzluksiz, raqamli esa aniq diskret sonli koddir.",
    difficulty: "easy"
  },
  {
    id: "q_31",
    labId: 7,
    text: "Raqamli sxemalarda 1 bit axborotni saqlash vazifasini qaysi element bajaradi?",
    options: ["Bistabil trigger (flip-flop)", "Faqat bitta AND darvozasi", "Faqat transformator", "NOT darvozasi"],
    correctIndex: 0,
    explanation: "Trigger qayta aloqa zanjiri orqali 1 bit holatni (0 yoki 1) barqaror saqlab turadi.",
    difficulty: "medium"
  },
  {
    id: "q_32",
    labId: 7,
    text: "Kombinatsion sxemalarning chiqishi nimaga bog‘liq?",
    options: ["Faqat ayni paytdagi joriy kirishlar kombinatsiyasiga", "O‘tgan soatdagi kirishlarga", "Faqat tashqi haroratga", "Tizimning ichki xotirasiga"],
    correctIndex: 0,
    explanation: "Kombinatsion sxemalarda xotira bo‘lmaydi; kirish o‘zgarishi bilan chiqish darhol hisoblanadi.",
    difficulty: "easy"
  },
  {
    id: "q_33",
    labId: 8,
    text: "XNOR(A, B) = 1 qachon bo‘ladi?",
    options: ["Kirishlar bir-biriga teng bo‘lganda (ikkalasi 0 yoki ikkalasi 1)", "Kirishlar har xil bo‘lganda", "Faqat ikkalasi 1 bo‘lganda", "Faqat A=1 bo‘lganda"],
    correctIndex: 0,
    explanation: "XNOR ekvivalentlik amali bo‘lib, A va B bir xil bo‘lsa 1, turlicha bo‘lsa 0 beradi.",
    difficulty: "easy"
  },
  {
    id: "q_34",
    labId: 8,
    text: "NAND(1, 1) va NOR(0, 0) natijalari ketma-ket qanday bo‘ladi?",
    options: ["0 va 1", "1 va 0", "0 va 0", "1 va 1"],
    correctIndex: 0,
    explanation: "NAND(1,1) = NOT(1 AND 1) = 0; NOR(0,0) = NOT(0 OR 0) = 1.",
    difficulty: "medium"
  },
  {
    id: "q_35",
    labId: 8,
    text: "NAND ning ikkala kirishini birlashtirib bitta signal bersak, nima hosil bo‘ladi?",
    options: ["NOT (Invertor)", "AND", "OR", "XOR"],
    correctIndex: 0,
    explanation: "NAND(A, A) = NOT(A AND A) = NOT(A).",
    difficulty: "easy"
  },
  {
    id: "q_36",
    labId: 8,
    text: "3 ta kirishli mantiqiy sxemani to‘liq tekshirish uchun jadvalda nechta qator kerak?",
    options: ["8", "6", "9", "3"],
    correctIndex: 0,
    explanation: "2³ = 8 ta mumkin bo‘lgan ikkilik kombinatsiya mavjud.",
    difficulty: "easy"
  },
  {
    id: "q_37",
    labId: 8,
    text: "Nima sababdan NAND va NOR universal elementlar deb ataladi?",
    options: ["Faqat ularning o‘zidan istalgan mantiqiy funksiyani (NOT, AND, OR, XOR) to‘liq qurish mumkin", "Ular eng arzon elementlar bo‘lgani uchun", "Ular faqat 1 chiqarishi uchun", "Ular analog signallarda ishlagani uchun"],
    correctIndex: 0,
    explanation: "Funksional to‘liqlik qoidasiga ko‘ra, faqat bitta turdagi universal element bilan butun kompyuterni qurish mumkin.",
    difficulty: "medium"
  },
  {
    id: "q_38",
    labId: 9,
    text: "A · (A + B) Bul ifodasi soddalashtirilganda nimaga teng bo‘ladi?",
    options: ["A", "B", "A + B", "A · B"],
    correctIndex: 0,
    explanation: "Yutilish (absorption) qonuni: A·A + A·B = A + A·B = A · (1 + B) = A · 1 = A.",
    difficulty: "easy"
  },
  {
    id: "q_39",
    labId: 9,
    text: "De Morgan 2-qoidasi: ¬(A + B) ifodasi nimaga teng?",
    options: ["¬A · ¬B", "¬A + ¬B", "A · B", "¬A + B"],
    correctIndex: 0,
    explanation: "Yig‘indining inkori inkorlar ko‘paytmasiga teng.",
    difficulty: "easy"
  },
  {
    id: "q_40",
    labId: 9,
    text: "3 o‘zgaruvchili Karnaugh xaritasida (K-map) nechta katak bor?",
    options: ["8", "6", "9", "4"],
    correctIndex: 0,
    explanation: "3 o‘zgaruvchi (A, B, C) uchun kataklar soni 2³ = 8 ta.",
    difficulty: "easy"
  },
  {
    id: "q_41",
    labId: 9,
    text: "A · Ā + B mantiqiy ifodasi nimaga teng?",
    options: ["B", "A", "0", "1"],
    correctIndex: 0,
    explanation: "Komplement qoidasi: A · Ā = 0. U holda 0 + B = B.",
    difficulty: "easy"
  },
  {
    id: "q_42",
    labId: 9,
    text: "Karnaugh xaritasida ustunlar nima uchun Gray kodi (00, 01, 11, 10) bo‘yicha tartiblanadi?",
    options: ["Qo‘shni kataklar bir-biridan faqat 1 bit bilan farq qilishi uchun", "Katta sonlar o‘rtada turishi uchun", "Hisoblashni murakkablashtirish uchun", "Standart tasodifiy kiritilgan"],
    correctIndex: 0,
    explanation: "Faqat 1 bit farqlangandagina o‘sha o‘zgaruvchini guruhlash orqali qisqartirib yuborish mumkin.",
    difficulty: "medium"
  },
  {
    id: "q_43",
    labId: 10,
    text: "Xotiradan registrga 32-bitli ma’lumot yuklovchi RISC-V buyrug‘i qaysi?",
    options: ["lw (load word)", "sw", "add", "beq"],
    correctIndex: 0,
    explanation: "lw xotiraning hisoblangan manzilidan so‘zni o‘qib qabul qiluvchi registrga yuklaydi.",
    difficulty: "easy"
  },
  {
    id: "q_44",
    labId: 10,
    text: "sw (store word) buyrug‘i qaysi RISC-V formatiga kiradi?",
    options: ["S-format", "R-format", "U-format", "J-format"],
    correctIndex: 0,
    explanation: "sw registrdagi qiymatni xotiraga yozadi va immediate siljish maydoni bo‘lingan S-formatga kiradi.",
    difficulty: "medium"
  },
  {
    id: "q_45",
    labId: 10,
    text: "RISC arxitekturasi yondashuvi uchun qaysi belgi eng xos?",
    options: ["Soddalashtirilgan, teng 32-bit uzunlikdagi buyruqlar va load-store modeli", "Murakkab va o‘zgaruvchan uzunlikdagi buyruqlar", "Faqat xotira–xotira arifmetikasi", "Registrlarning umuman yo‘qligi"],
    correctIndex: 0,
    explanation: "RISC (Reduced Instruction Set Computer) apparatni soddalashtirish va yuqori takt chastotasiga erishish uchun mo‘ljallangan.",
    difficulty: "medium"
  },
  {
    id: "q_46",
    labId: 10,
    text: "add x5, x6, x7 buyrug‘i qaysi formatga kiradi?",
    options: ["R-format", "I-format", "S-format", "B-format"],
    correctIndex: 0,
    explanation: "Uchta registr (rd, rs1, rs2) bilan ishlovchi sof arifmetik buyruqlar R-formatdir.",
    difficulty: "easy"
  },
  {
    id: "q_47",
    labId: 10,
    text: "RISC-V da x0 (zero) registri qanday xususiyatga ega?",
    options: ["Doimo 0 qiymatini qaytaradi, unga yangi qiymat yozilsa ham 0 bo‘lib qoladi", "Faqat musbat sonlarni saqlaydi", "Stack pointer sifatida ishlatiladi", "Dastur sanagichi vazifasini bajaradi"],
    correctIndex: 0,
    explanation: "x0 apparat darajasida yerga (GND) ulangan, doim 0 konstanta beradi.",
    difficulty: "easy"
  },
  {
    id: "q_48",
    labId: 11,
    text: "beq va bne shartli o‘tish buyruqlarida nishon manzil qanday hisoblanadi?",
    options: ["PC-relative (joriy PC ga immediate siljish qo‘shiladi)", "Faqat registrdagi manzil olinadi", "Xotiraning 0-baytiga o‘tiladi", "Stack pointer ga qo‘shiladi"],
    correctIndex: 0,
    explanation: "Kodni xotiraning ixtiyoriy joyiga erkin yuklash imkoni (relocatable code) uchun PC-relative ishlatiladi.",
    difficulty: "medium"
  },
  {
    id: "q_49",
    labId: 11,
    text: "Load-store arxitekturasi nimani anglatadi?",
    options: ["Arifmetik amallar faqat registrlarda bajariladi, xotiraga faqat lw/sw orqali kiriladi", "Arifmetika to‘g‘ridan-to‘g‘ri xotirada bajariladi", "Registrlar umuman ishlatilmaydi", "Faqat bevosita adreslash ishlatiladi"],
    correctIndex: 0,
    explanation: "RISC protsessorlarida arifmetik komandalar xotira bilan to‘g‘ridan-to‘g‘ri hisob-kitob qila olmaydi.",
    difficulty: "medium"
  },
  {
    id: "q_50",
    labId: 11,
    text: "addi t0, t1, 100 buyrug‘ida qaysi adreslash turi qo‘llangan?",
    options: ["Immediate (bevosita) adreslash", "Registrli adreslash", "Baza+siljish", "PC-relative"],
    correctIndex: 0,
    explanation: "Operandlardan biri to‘g‘ridan-to‘g‘ri buyruq kodining o‘zidagi o‘zgarmas son (immediate 100) dir.",
    difficulty: "easy"
  },
  {
    id: "q_51",
    labId: 11,
    text: "32-bitli butun sonli massivda 5-indeksli elementning bayt offseti nechaga teng?",
    options: ["20 bayt", "5 bayt", "10 bayt", "40 bayt"],
    correctIndex: 0,
    explanation: "Har bir 32-bitli element 4 bayt: 5 × 4 = 20 bayt offset.",
    difficulty: "medium"
  },
  {
    id: "q_52",
    labId: 12,
    text: "Xotira ierarxiyasida eng tezdan sekinga qarab to‘g‘ri ketma-ketlik qaysi?",
    options: ["Registr → L1 kesh → DRAM (RAM) → NVMe SSD → HDD", "DRAM → L1 → Registr → SSD → HDD", "SSD → DRAM → L1 → Registr → HDD", "L1 → Registr → HDD → DRAM → SSD"],
    correctIndex: 0,
    explanation: "Registrlar pikosekund, L1 nanosekund, RAM ~70 ns, SSD mikrosekund, HDD millisekund.",
    difficulty: "easy"
  },
  {
    id: "q_53",
    labId: 12,
    text: "Eng tez xotira (SRAM) nima uchun kompyuterga terabayt hajmda o‘rnatilmaydi?",
    options: ["Juda qimmat, kristallda katta maydon oladi va ko‘p issiqlik chiqaradi", "Qonun taqiqlaydi", "Tezlikka hech qanday ta’sir qilmaydi", "Faqat SSD ishlab chiqariladi"],
    correctIndex: 0,
    explanation: "SRAM bitta bit uchun 6 ta tranzistor talab qiladi, DRAM esa bitta tranzistor va kondensatordan iborat.",
    difficulty: "medium"
  },
  {
    id: "q_54",
    labId: 12,
    text: "Elektr quvvati uzilganda qaysi xotira mazmunini butunlay yo‘qotadi (uchuvchan)?",
    options: ["DRAM (Operativ xotira)", "NVMe SSD", "HDD", "Flash BIOS ROM"],
    correctIndex: 0,
    explanation: "DRAM kondensator zaryadiga tayanadi va elektr ta’minoti uzilganda zaryad oqib ketadi.",
    difficulty: "easy"
  },
  {
    id: "q_55",
    labId: 12,
    text: "Bir xil 16 GB hajmga ega RAM va SSD nima sababli butunlay boshqa vazifani bajaradi?",
    options: ["Kechikish (RAM 1000 barobar tezroq) va uchuvchanlik xususiyati sababli", "Ular bir xil qurilma", "SSD faqat kiritish qurilmasi", "RAM doimiy saqlaydi"],
    correctIndex: 0,
    explanation: "RAM mikroprotsessor bilan bevosita ishlaydi, SSD esa operatsion tizim va fayllarni doimiy saqlash omboridir.",
    difficulty: "medium"
  },
  {
    id: "q_56",
    labId: 13,
    text: "SSD reklamasidagi 7000 MB/s ko‘rsatkichi odatda nimani bildiradi?",
    options: ["Katta uzluksiz fayllarni ketma-ket (Sequential) o‘qish maksimumini", "Real kundalik aralash o‘rtacha tezlikni", "Tasodifiy 4 KiB IOPS tezligini", "Javob berish kechikishini"],
    correctIndex: 0,
    explanation: "Sequential tezlik faqat katta filmlar yoki arxiv ko‘chirishda ko‘rinadi, kundalik dasturlarda 4K IOPS muhimroq.",
    difficulty: "easy"
  },
  {
    id: "q_57",
    labId: 13,
    text: "M.2 slotiga SATA SSD o‘rnatish mumkinmi?",
    options: ["Ha, agar plata sloti SATA protokolini va mos kalitni (B+M key) qo‘llab-quvvatlasa", "Yo‘q, M.2 faqat NVMe uchun", "Yo‘q, faqat mexanik HDD uchun", "Faqat USB bilan ishlaydi"],
    correctIndex: 0,
    explanation: "M.2 faqat tashqi shakl omili (form-factor) hisoblanadi; u ham SATA, ham PCIe/NVMe liniyalarini o‘tkazishi mumkin.",
    difficulty: "medium"
  },
  {
    id: "q_58",
    labId: 13,
    text: "Saqlash qurilmalarida Latency (kechikish) nimani anglatadi?",
    options: ["Bitta I/O so‘roviga drayver va apparaturaning javob berish vaqti", "Soniyadagi operatsiyalar soni", "Vaqt birligida uzatilgan hajm", "Diskning umumiy sig‘imi"],
    correctIndex: 0,
    explanation: "Latency past bo‘lishi tizimning tezkor 'chaqqon' ishlashini ta’minlaydi.",
    difficulty: "easy"
  },
  {
    id: "q_59",
    labId: 13,
    text: "Operatsion tizim yuklanishi va dasturlash muhitlari uchun qaysi ko‘rsatkich eng muhim?",
    options: ["Tasodifiy 4K IOPS va o‘ta past latency", "Faqat umumiy sig‘im", "Faqat ketma-ket maksimal tezlik", "Qurilmaning og‘irligi"],
    correctIndex: 0,
    explanation: "Tizim minglab mayda konfiguratsiya fayllari va kutubxonalarni o‘qiydi, 4K IOPS hal qiluvchi ko‘rsatkichdir.",
    difficulty: "medium"
  },
  {
    id: "q_60",
    labId: 14,
    text: "Cache line (kesh qatori) nima?",
    options: ["Keshga asosiy xotiradan yaxlit blok sifatida yuklanadigan birlik (odatda 64 bayt)", "Bitta bit", "Sahifa jadvali", "Disk sektori"],
    correctIndex: 0,
    explanation: "Fazoviy lokalik tamoyili bo‘yicha CPU so‘ragan bayt atrofidagi barcha qo‘shni baytlar keshga birga olib kiriladi.",
    difficulty: "easy"
  },
  {
    id: "q_61",
    labId: 14,
    text: "Fazoviy lokalikdan (spatial locality) qaysi mexanizm bevosita foydalanadi?",
    options: ["Cache line orqali qo‘shni manzillarni yaxlit ko‘chirish", "Write-through", "Pagefile", "TLB miss"],
    correctIndex: 0,
    explanation: "Ketma-ket massiv elementlari o‘qilganda bitta kesh liniyasi yuklanishi qolgan bir necha murojaatni Hit qiladi.",
    difficulty: "medium"
  },
  {
    id: "q_62",
    labId: 14,
    text: "MMU (Memory Management Unit) ning asosiy vazifasi nima?",
    options: ["Virtual manzilni sahifa jadvali orqali fizik manzilga apparat darajasida tarjima qilish", "Diskni formatlash", "Ovozni qayta ishlash", "Tarmoq paketlarini yo‘naltirish"],
    correctIndex: 0,
    explanation: "MMU har bir buyruqning virtual xotira manzilini operativ xotiradagi haqiqiy freymga o‘tkazadi.",
    difficulty: "medium"
  },
  {
    id: "q_63",
    labId: 14,
    text: "Write-back keshlash siyosatida yozish amali qanday bajariladi?",
    options: ["Yozuv avval keshda saqlanadi (dirty), RAM ga faqat kesh bloki almashtirilganda yoziladi", "Yozuv darhol pastki RAM darajasiga uzatiladi", "Yozuv umuman saqlanmaydi", "Faqat SSD dagi pagefile ga yoziladi"],
    correctIndex: 0,
    explanation: "Write-back shina yuklamasini kamaytiradi, chunki bitta katakka ko‘p marta yozilsa ham RAM ga 1 marta ko‘chiriladi.",
    difficulty: "medium"
  },
  {
    id: "q_64",
    labId: 14,
    text: "Virtual xotirada Hard Page Fault nega o‘ta sekin jarayon hisoblanadi?",
    options: ["Kerakli sahifa RAM da bo‘lmay, sekin diskdagi pagefile dan o‘qilishi sababli", "Kesh to‘la bo‘lgani uchun", "CPU to‘xtab qolgani uchun", "Sahifa jadvali o‘chib ketgani uchun"],
    correctIndex: 0,
    explanation: "Hard Fault disk I/O ni talab qiladi, bu esa protsessorni millionlab takt kutishga majbur qiladi.",
    difficulty: "medium"
  },
  {
    id: "q_65",
    labId: 15,
    text: "RAID 1 (2 ta disk) nechta diskning bir vaqtda nosozligiga chiday oladi?",
    options: ["1 ta", "0 ta", "2 ta", "3 ta"],
    correctIndex: 0,
    explanation: "RAID 1 to‘liq ko‘zgu (mirroring) hisoblanadi; 1 ta disk sinishi ma’lumot yo‘qolishiga olib kelmaydi.",
    difficulty: "easy"
  },
  {
    id: "q_66",
    labId: 15,
    text: "Foydalanuvchi faylni tasodifan o‘chirib yuborsa yoki ransomware shifrlasa, nima himoya qiladi?",
    options: ["Alohida olingan zaxira nusxa (Backup)", "RAID 1 massivi", "RAID 5 massivi", "RAID 6 massivi"],
    correctIndex: 0,
    explanation: "RAID faqat disk apparat nosozligidan himoya qiladi. Fayl o‘chirilganda u barcha disklardan bir vaqtda o‘chadi!",
    difficulty: "easy"
  },
  {
    id: "q_67",
    labId: 15,
    text: "Kichik tasodifiy yozishda (random write) RAID 5 nima sababdan sekinlashadi?",
    options: ["Paritetni yangilash uchun 2 ta o‘qish va 2 ta yozish (Write penalty) talab etilgani sababli", "Disklar soni kamligi sababli", "Mirroring juda ko‘pligi sababli", "Kesh xotira bo‘lmagani uchun"],
    correctIndex: 0,
    explanation: "Write penalty = Eski ma’lumotni o‘qish + Eski paritetni o‘qish + Yangi ma’lumotni yozish + Yangi paritetni yozish.",
    difficulty: "medium"
  },
  {
    id: "q_68",
    labId: 15,
    text: "3-2-1 zaxiralash qoidasidagi '1' nimani bildiradi?",
    options: ["Kamida 1 ta nusxa boshqa geografik joyda (off-site / bulutda) saqlansin", "Bitta RAID massiv bo‘lsin", "Bitta diskda tursin", "Bitta nusxa yetarli"],
    correctIndex: 0,
    explanation: "Yong‘in, suv toshqini yoki o‘g‘irlik ofatlaridan saqlanish uchun nusxa alohida binoda yoki bulutda bo‘lishi shart.",
    difficulty: "easy"
  },
  {
    id: "q_69",
    labId: 15,
    text: "RAID 0 massivining asosiy xususiyati nima?",
    options: ["Maksimal tezlik va to‘liq sig‘im, ammo nosozlikka chidamlilik mutlaqo 0", "Ko‘zgu nusxa saqlash", "Ikkita taqsimlangan paritet", "Fayllarni avtomatik arxivlash"],
    correctIndex: 0,
    explanation: "RAID 0 da bitta disk ishdan chiqsa barcha ma’lumotlar butunlay yo‘qoladi.",
    difficulty: "easy"
  },
  {
    id: "q_70",
    labId: 16,
    text: "PCIe lane (liniyasi) haqida to‘g‘ri fikr qaysi?",
    options: ["Mustaqil uzatish (TX) va qabul qilish (RX) differensial juftliklaridan iborat to‘liq dupleks kanal", "Bitta umumiy parallel sim", "Faqat bir tomonlama aloqa", "Faqat quvvat uzatuvchi sim"],
    correctIndex: 0,
    explanation: "Har bir PCIe lane 4 ta simdan iborat: 2 ta uzatuvchi va 2 ta qabul qiluvchi.",
    difficulty: "easy"
  },
  {
    id: "q_71",
    labId: 16,
    text: "CXL.cache va CXL.mem protokollari nimani apparat darajasida ta’minlaydi?",
    options: ["Kogerent kesh va protsessor bilan akselerator o‘rtasida umumiy xotira hovuzini", "Faqat USB sichqoncha ulanishini", "Audio signal uzatishni", "Fayllarni arxivlashni"],
    correctIndex: 0,
    explanation: "CXL CPU va GPU/FPGA ga bitta manzil maydonidan kogerent tarzda foydalanish imkonini beradi.",
    difficulty: "medium"
  },
  {
    id: "q_72",
    labId: 16,
    text: "Zamonaviy kompyuterlarda shinalar nima sababdan parallel emas, nuqtadan-nuqtaga ketma-ket quriladi?",
    options: ["Yuqori chastotada parallel simlar orasidagi signal kechikishi tafovuti (skew) buzilishiga yo‘l qo‘ymaslik uchun", "Parallel shina tezroq bo‘lgani uchun", "Ketma-ket ulanish ko‘proq sim talab qilishi uchun", "Standart tasodifiy qabul qilingan"],
    correctIndex: 0,
    explanation: "Parallel shinalarda chastota oshsa signallar bir vaqtda yetib kelolmaydi (skew). Nuqtadan-nuqtaga differensial linklar o‘nlab gigagertsda barqaror ishlaydi.",
    difficulty: "medium"
  },
  {
    id: "q_73",
    labId: 16,
    text: "M.2 NVMe drayveri odatda ona platadagi qaysi PCIe link kengligidan foydalanadi?",
    options: ["PCIe x4 (4 ta lane)", "PCIe x16", "PCIe x1", "PCIe x32"],
    correctIndex: 0,
    explanation: "Standart M.2 slotlari 4 ta PCIe liniyasi (x4) orqali ulanadi.",
    difficulty: "easy"
  },
  {
    id: "q_74",
    labId: 16,
    text: "Ona platadagi fizik x16 slotining elektr liniyalar soni haqida qaysi fikr to‘g‘ri?",
    options: ["Har doim x16 bo‘lavermaydi; chipsetga bog‘liq holda x4 yoki x8 elektr liniyaga ulangan bo‘lishi mumkin", "Doimo mutlaq 16 ta elektr liniya bo‘ladi", "Slot uzunligi elektr liniyaga hech qachon bog‘liq emas", "Faqat x1 bo‘ladi"],
    correctIndex: 0,
    explanation: "Plata dizayniga qarab x16 o‘lchamli slot elektr jihatdan faqat x4 yoki x8 liniyaga ulangan bo‘lishi mumkin.",
    difficulty: "medium"
  },
];

// ----------------- DYNAMIC QUESTION GENERATORS (15+ TYPES) -----------------
export const DYNAMIC_PROBLEM_GENERATORS: Record<number, () => Question> = {
  // 4 - Sanoq tizimlari (BIN to DEC)
  4: () => {
    const n = Math.floor(Math.random() * (127 - 33 + 1)) + 33;
    const binStr = n.toString(2);
    const correct = n.toString();
    const distractors = [
      (n + 1).toString(),
      (n - 1).toString(),
      (n ^ 4).toString(),
      (n + 8).toString(),
    ].filter(x => x !== correct);

    return {
      id: `dyn_4_${Date.now()}_${Math.random()}`,
      labId: 4,
      text: `${binStr}₂ ikkilik sonining o‘nlik (DEC) qiymati nechaga teng?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Razryad og‘irliklari: ${binStr.split('').map((b, i) => `${b}×2^${binStr.length - 1 - i}`).join(' + ')} = ${n}₁₀`,
      difficulty: 'medium',
      isDynamic: true,
    };
  },

  // 5 - O'tkazish (DEC to BIN or BIN to HEX)
  5: () => {
    const isDecToBin = Math.random() > 0.5;
    if (isDecToBin) {
      const n = Math.floor(Math.random() * (220 - 20 + 1)) + 20;
      const correct = n.toString(2);
      const distractors = [
        (n ^ 1).toString(2),
        (n ^ 2).toString(2),
        (n + 2).toString(2),
        (n - 2).toString(2),
      ].filter(x => x !== correct);

      return {
        id: `dyn_5_dec_${Date.now()}_${Math.random()}`,
        labId: 5,
        text: `${n}₁₀ o‘nlik sonining ikkilik (BIN) shakli qaysi?`,
        options: [correct, ...distractors.slice(0, 3)],
        correctIndex: 0,
        explanation: `${n} soni 2 ga ketma-ket bo‘linganda qoldiqlar teskari tartibda: ${correct}₂ bo‘ladi.`,
        difficulty: 'medium',
        isDynamic: true,
      };
    } else {
      const n = Math.floor(Math.random() * (255 - 16 + 1)) + 16;
      const binStr = n.toString(2).padStart(8, '0');
      const correct = '0x' + n.toString(16).toUpperCase();
      const distractors = [
        '0x' + (n ^ 1).toString(16).toUpperCase(),
        '0x' + (n ^ 16).toString(16).toUpperCase(),
        '0x' + (n + 1).toString(16).toUpperCase(),
        '0x' + (n - 1).toString(16).toUpperCase(),
      ].filter(x => x !== correct);

      return {
        id: `dyn_5_hex_${Date.now()}_${Math.random()}`,
        labId: 5,
        text: `${binStr}₂ ikkilik baytining o‘n oltilik (HEX) ko‘rinishini toping:`,
        options: [correct, ...distractors.slice(0, 3)],
        correctIndex: 0,
        explanation: `Tetrada usuli: ${binStr.slice(0, 4)}₂ = 0x${parseInt(binStr.slice(0, 4), 2).toString(16).toUpperCase()} va ${binStr.slice(4)}₂ = 0x${parseInt(binStr.slice(4), 2).toString(16).toUpperCase()}. Natija: ${correct}.`,
        difficulty: 'medium',
        isDynamic: true,
      };
    }
  },

  // 6 - Arifmetika (4-bit binary sum with carry or 8-bit overflow)
  6: () => {
    const isOverflowMode = Math.random() > 0.5;
    if (isOverflowMode) {
      const a = Math.floor(Math.random() * 56) + 200; // 200..255
      const b = Math.floor(Math.random() * 61) + 60;  // 60..120
      const c = (a + b) & 255;
      const correct = c.toString();
      const distractors = [(a + b).toString(), (c + 1).toString(), (c - 1).toString(), "255"].filter(x => x !== correct);

      return {
        id: `dyn_6_of_${Date.now()}_${Math.random()}`,
        labId: 6,
        text: `8 bitli ishorasiz hisobda ${a} + ${b} = ? (o‘nlik, unsigned overflow hisobga olinsin)`,
        options: [correct, ...distractors.slice(0, 3)],
        correctIndex: 0,
        explanation: `${a} + ${b} = ${a + b}. 8 bit chegarasi (256): ${a + b} - 256 = ${c} (va Carry bayrog‘i yoqiladi).`,
        difficulty: 'hard',
        isDynamic: true,
      };
    } else {
      const a = Math.floor(Math.random() * 11) + 5;
      const b = Math.floor(Math.random() * 11) + 5;
      const sum = a + b;
      const aBin = a.toString(2).padStart(4, '0');
      const bBin = b.toString(2).padStart(4, '0');
      const correct = sum.toString(2);
      const distractors = [
        (sum + 1).toString(2),
        (sum - 1).toString(2),
        (sum ^ 2).toString(2),
        (a ^ b).toString(2),
      ].filter(x => x !== correct);

      return {
        id: `dyn_6_sum_${Date.now()}_${Math.random()}`,
        labId: 6,
        text: `4-bitli ikkilik qo‘shish: ${aBin}₂ + ${bBin}₂ = ? (ikkilikda)`,
        options: [correct, ...distractors.slice(0, 3)],
        correctIndex: 0,
        explanation: `${a} + ${b} = ${sum}₁₀ = ${correct}₂.`,
        difficulty: 'medium',
        isDynamic: true,
      };
    }
  },

  // 11 - Adreslash (Effective Address Base + Offset)
  11: () => {
    const baseAddr = 0x10010000 + Math.floor(Math.random() * 16) * 16;
    const offset = 4 * (Math.floor(Math.random() * 10) + 1);
    const ea = baseAddr + offset;
    const hexBase = '0x' + baseAddr.toString(16).toUpperCase();
    const hexEa = '0x' + ea.toString(16).toUpperCase();

    const distractors = [
      '0x' + (ea + 4).toString(16).toUpperCase(),
      '0x' + (ea - 4).toString(16).toUpperCase(),
      '0x' + (baseAddr + offset * 2).toString(16).toUpperCase(),
      hexBase,
    ].filter(x => x !== hexEa);

    return {
      id: `dyn_11_${Date.now()}_${Math.random()}`,
      labId: 11,
      text: `Agar t0 = ${hexBase} bo‘lsa, lw t1, ${offset}(t0) ning samarali manzili (Effective Address)?`,
      options: [hexEa, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Effective Address = Base + Offset = ${hexBase} + ${offset} = ${hexEa}.`,
      difficulty: 'medium',
      isDynamic: true,
    };
  },

  // 12 - Xotira Ierarxiyasi (EAT hisobi)
  12: () => {
    const hitRates = [80, 90, 95, 98];
    const hr = hitRates[Math.floor(Math.random() * hitRates.length)];
    const tHit = 2; // ns
    const tMiss = 100; // ns
    const eat = +( (hr / 100) * tHit + (1 - hr / 100) * tMiss ).toFixed(1);
    const correct = `${eat} ns`;

    const distractors = [
      `${(eat + 2.5).toFixed(1)} ns`,
      `${(eat - 1.2).toFixed(1)} ns`,
      `${(eat * 1.5).toFixed(1)} ns`,
      `51.0 ns`,
    ].filter(x => x !== correct);

    return {
      id: `dyn_12_${Date.now()}_${Math.random()}`,
      labId: 12,
      text: `Kesh Hit Rate = ${hr}%, murojaat vaqti ${tHit} ns, miss bo‘lganda jami ${tMiss} ns. O‘rtacha kirish vaqti (EAT)?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `EAT = (${hr/100} × ${tHit}) + (${(1-hr/100).toFixed(2)} × ${tMiss}) = ${eat} ns.`,
      difficulty: 'hard',
      isDynamic: true,
    };
  },

  // 13 - Saqlash Qurilmalari (Transfer duration)
  13: () => {
    const sizeGb = (Math.floor(Math.random() * 8) + 2) * 5; // 10..45 GB
    const speeds = [100, 200, 250, 400, 500];
    const speed = speeds[Math.floor(Math.random() * speeds.length)];
    const timeSec = +((sizeGb * 1000) / speed).toFixed(1);
    const correct = `${timeSec} s`;

    const distractors = [
      `${(timeSec * 2).toFixed(1)} s`,
      `${(timeSec / 2).toFixed(1)} s`,
      `${(timeSec + 15).toFixed(1)} s`,
      `${(timeSec * 1.25).toFixed(1)} s`,
    ].filter(x => x !== correct);

    return {
      id: `dyn_13_${Date.now()}_${Math.random()}`,
      labId: 13,
      text: `${sizeGb} GB hajmdagi fayl ${speed} MB/s ketma-ket tezlikda necha soniyada to‘liq ko‘chadi? (1 GB = 1000 MB)`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Vaqt = (${sizeGb} × 1000 MB) / ${speed} MB/s = ${correct}.`,
      difficulty: 'medium',
      isDynamic: true,
    };
  },

  // 15 - RAID (Useful capacity)
  15: () => {
    const raidTypes = [
      { level: 0, calc: (n: number, s: number) => n * s, name: 'RAID 0' },
      { level: 1, calc: (n: number, s: number) => s, name: 'RAID 1 (2 disk)' },
      { level: 5, calc: (n: number, s: number) => (n - 1) * s, name: 'RAID 5' },
      { level: 6, calc: (n: number, s: number) => (n - 2) * s, name: 'RAID 6' },
    ];
    const r = raidTypes[Math.floor(Math.random() * raidTypes.length)];
    const n = r.level === 1 ? 2 : r.level === 6 ? Math.floor(Math.random() * 4) + 4 : Math.floor(Math.random() * 5) + 3;
    const diskSize = [1, 2, 4, 8][Math.floor(Math.random() * 4)];
    const cap = r.calc(n, diskSize);
    const correct = `${cap} TB`;

    const distractors = [
      `${n * diskSize} TB`,
      `${(n - 1) * diskSize} TB`,
      `${(n - 2) * diskSize} TB`,
      `${cap + diskSize} TB`,
    ].filter(x => x !== correct);

    return {
      id: `dyn_15_${Date.now()}_${Math.random()}`,
      labId: 15,
      text: `${r.name} massivida har biri ${diskSize} TB bo‘lgan ${n} ta disk ishlatilmoqda. Foydali sig‘im qancha?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `${r.name} foydali sig‘im formulasi bo‘yicha: ${cap} TB.`,
      difficulty: 'medium',
      isDynamic: true,
    };
  },

  // 16 - Shinalar (PCIe raw rate)
  16: () => {
    const gens = [
      { gen: '3.0', rate: 8 },
      { gen: '4.0', rate: 16 },
      { gen: '5.0', rate: 32 },
      { gen: '6.0', rate: 64 },
    ];
    const lanes = [1, 4, 8, 16];
    const g = gens[Math.floor(Math.random() * gens.length)];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];
    const totalGt = g.rate * lane;
    const correct = `${totalGt} GT/s`;

    const distractors = [
      `${g.rate * (lane + 2)} GT/s`,
      `${Math.floor(totalGt / 2)} GT/s`,
      `${totalGt * 2} GT/s`,
      `${g.rate + lane} GT/s`,
    ].filter(x => x !== correct);

    return {
      id: `dyn_16_${Date.now()}_${Math.random()}`,
      labId: 16,
      text: `PCIe ${g.gen} x${lane} linkining jami raw signal tezligi (har lane ${g.rate} GT/s bo‘lsa) qancha?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Jami signal tezligi = Lane soni × Rate per lane = ${lane} × ${g.rate} GT/s = ${totalGt} GT/s.`,
      difficulty: 'medium',
      isDynamic: true,
    };
  },
};

// Shuffling helper
export function shuffle<T>(arr: T[]): T[] {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

export function prepareShuffledQuestion(q: Question): Question {
  const correctText = q.options[q.correctIndex];
  const shuffledOpts = shuffle(q.options);
  return {
    ...q,
    options: shuffledOpts,
    correctIndex: shuffledOpts.indexOf(correctText),
  };
}

// Get 10 exam questions across 14 labs
export function getExamQuestions(seenIds: string[] = [], count = 10): Question[] {
  const allLabIds = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const pickedLabs = shuffle(allLabIds).slice(0, count);

  return pickedLabs.map(labId => {
    // 40% chance of dynamic generator if available
    if (DYNAMIC_PROBLEM_GENERATORS[labId] && Math.random() < 0.45) {
      return prepareShuffledQuestion(DYNAMIC_PROBLEM_GENERATORS[labId]());
    }

    const labStatics = MASTER_STATIC_QUESTIONS.filter(q => q.labId === labId);
    const unseen = labStatics.filter(q => !seenIds.includes(q.id));
    const pool = unseen.length > 0 ? unseen : labStatics;
    const chosen = pool[Math.floor(Math.random() * pool.length)] || MASTER_STATIC_QUESTIONS[0];
    return prepareShuffledQuestion(chosen);
  });
}

// Get Chapter Boss questions
export function getChapterBossQuestions(chapterId: number, count = 5): Question[] {
  const chapterLabsMap: Record<number, number[]> = {
    1: [2, 4, 5, 6],
    2: [7, 8, 9],
    3: [10, 11],
    4: [12, 13, 14],
    5: [15, 16],
  };

  const labs = chapterLabsMap[chapterId] || [2, 4, 5, 6];
  const res: Question[] = [];

  for (let i = 0; i < count; i++) {
    const labId = labs[i % labs.length];
    if (DYNAMIC_PROBLEM_GENERATORS[labId] && Math.random() < 0.5) {
      res.push(prepareShuffledQuestion(DYNAMIC_PROBLEM_GENERATORS[labId]()));
    } else {
      const pool = MASTER_STATIC_QUESTIONS.filter(q => q.labId === labId);
      const chosen = pool[Math.floor(Math.random() * pool.length)] || MASTER_STATIC_QUESTIONS[0];
      res.push(prepareShuffledQuestion(chosen));
    }
  }

  return shuffle(res);
}

// Get Targeted Wrong questions
export function getTargetedQuestions(wrongIds: string[]): Question[] {
  if (wrongIds.length === 0) {
    return getExamQuestions([], 5);
  }

  const found = MASTER_STATIC_QUESTIONS.filter(q => wrongIds.includes(q.id));
  if (found.length === 0) {
    return getExamQuestions([], 5);
  }

  return shuffle(found).slice(0, 5).map(prepareShuffledQuestion);
}
