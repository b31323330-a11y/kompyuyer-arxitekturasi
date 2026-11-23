/* Questions database and dynamic problem generators */

export interface Question {
  id: string;
  labId: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  isDynamic?: boolean;
}

export const STATIC_QUESTIONS: Question[] = [
  {
    id: "sq_1",
    labId: 2,
    text: "Tashqi SSD qaysi guruhga kiradi?",
    options: ["Tashqi, kiritish-chiqarish va saqlash", "Ichki, faqat chiqarish", "Tashqi, faqat kiritish", "Ichki, faqat kiritish"],
    correctIndex: 0,
    explanation: "Tashqi SSD USB orqali ulanadi (tashqi), ma'lumot o'qiydi va yozadi (kiritish-chiqarish va doimiy saqlash)."
  },
  {
    id: "sq_2",
    labId: 2,
    text: "Qog‘oz hujjatlarni raqamlashtirish uchun qaysi qo‘shimcha qurilma kerak?",
    options: ["Skaner", "Printer", "Proyektor", "Kolonka"],
    correctIndex: 0,
    explanation: "Skaner optik sensorlar orqali qog'ozdagi tasvirni raqamli faylga aylantiruvchi kiritish qurilmasidir."
  },
  {
    id: "sq_3",
    labId: 2,
    text: "Proyektor qaysi guruhga kiradi?",
    options: ["Tashqi, chiqarish", "Tashqi, kiritish", "Ichki, saqlash", "Ichki, kiritish"],
    correctIndex: 0,
    explanation: "Proyektor tasvirni katta ekranga uzatib beruvchi tashqi axborot chiqarish qurilmasi hisoblanadi."
  },
  {
    id: "sq_4",
    labId: 2,
    text: "Kiritish–qayta ishlash–saqlash–chiqarish modelida monitor qaysi bosqichda?",
    options: ["Chiqarish", "Kiritish", "Saqlash", "Qayta ishlash"],
    correctIndex: 0,
    explanation: "Monitor ishlov berilgan vizual natijalarni foydalanuvchiga taqdim etuvchi axborot chiqarish bosqichidir."
  },
  {
    id: "sq_5",
    labId: 2,
    text: "Qaysi qurilma ikki yo‘nalishda ma’lumot almashadi?",
    options: ["Sensorli ekran (Touchscreen)", "Mikrofon", "Printer", "Klaviatura"],
    correctIndex: 0,
    explanation: "Sensorli ekran teginish orqali buyruq kiritadi va shu bilan birga tasvir chiqaradi (K-Ch)."
  },
  {
    id: "sq_6",
    labId: 2,
    text: "Tizim blokining markaziy qismi bo'lib barcha ichki qismlarni birlashtiruvchi qurilma nima?",
    options: ["Ona plata (Motherboard)", "Quvvat bloki", "Videokarta", "Kuler"],
    correctIndex: 0,
    explanation: "Ona plata barcha asosiy mikrosxemalar, portlar va shinalarni apparat darajasida birlashtiradi."
  },
  {
    id: "sq_7",
    labId: 4,
    text: "Qaysi yozuv sakkizlik tizimda mavjud bo‘la olmaydi?",
    options: ["389₈", "725₈", "101₈", "777₈"],
    correctIndex: 0,
    explanation: "Sakkizlik tizimda faqat 0 dan 7 gacha raqamlar ishlatiladi, 8 va 9 raqamlari bo'lishi mumkin emas."
  },
  {
    id: "sq_8",
    labId: 4,
    text: "555₁₀ da o‘rtadagi 5 ning razryad qiymati nechaga teng?",
    options: ["50", "5", "500", "55"],
    correctIndex: 0,
    explanation: "O'nlik tizimda o'rtadagi 5 o'nlar xonasida joylashgan bo'lib, uning qiymati 5 × 10¹ = 50."
  },
  {
    id: "sq_9",
    labId: 4,
    text: "Ishorasiz 8 bitli butun sonlar diapazoni qaysi javobda to'g'ri berilgan?",
    options: ["0 … 255", "0 … 256", "−128 … 127", "1 … 255"],
    correctIndex: 0,
    explanation: "2⁸ = 256 ta son ifodalanadi, ishorasiz bo'lgani uchun 0 dan 255 gacha (2⁸ - 1)."
  },
  {
    id: "sq_10",
    labId: 4,
    text: "1 nibble + 1 bayt jami necha bit bo‘ladi?",
    options: ["12", "8", "16", "10"],
    correctIndex: 0,
    explanation: "1 nibble = 4 bit, 1 bayt = 8 bit. Jami: 4 + 8 = 12 bit."
  },
  {
    id: "sq_11",
    labId: 4,
    text: "Ikkilik sanoq tizimida pozitsion og'irlik asosi qaysi songa teng?",
    options: ["2", "8", "10", "16"],
    correctIndex: 0,
    explanation: "Ikkilik tizim asosi 2 bo'lib, har bir razryad og'irligi 2⁰, 2¹, 2², 2³... ko'rinishida o'sadi."
  },
  {
    id: "sq_12",
    labId: 5,
    text: "2D₁₆ ning o‘nlikdagi qiymati nechaga teng?",
    options: ["45", "29", "43", "213"],
    correctIndex: 0,
    explanation: "2 × 16¹ + 13 × 16⁰ = 32 + 13 = 45₁₀."
  },
  {
    id: "sq_13",
    labId: 5,
    text: "55₈ ning o‘nlikdagi qiymati nechaga teng?",
    options: ["45", "55", "40", "35"],
    correctIndex: 0,
    explanation: "5 × 8¹ + 5 × 8⁰ = 40 + 5 = 45₁₀."
  },
  {
    id: "sq_14",
    labId: 5,
    text: "BC6₁₆ ning ikkilik yozuvi qaysi javobda to‘g‘ri berilgan?",
    options: ["101111000110", "101111001010", "110011000110", "101101000110"],
    correctIndex: 0,
    explanation: "B = 1011₂, C = 1100₂, 6 = 0110₂. Birlashtirganda: 101111000110₂."
  },
  {
    id: "sq_15",
    labId: 5,
    text: "O'nlik sonni ikkilikka o'tkazishda qoldiqlar qaysi tartibda o'qiladi?",
    options: ["Oxirgi qoldiqdan birinchisiga qarab (teskari tartibda)", "Birinchi qoldiqdan boshlab to'g'ri tartibda", "Faqat juft qoldiqlar", "Tasodifiy tartibda"],
    correctIndex: 0,
    explanation: "Ketma-ket bo'lishda eng so'nggi qoldiq eng yuqori razryad (MSB) hisoblanadi."
  },
  {
    id: "sq_16",
    labId: 6,
    text: "Ikkilikda 0 − 1 bajarilganda nima sodir bo‘ladi?",
    options: ["Chapdagi razryaddan 1 qarz olinadi, natija 1", "Natija 0 va ko‘chirish hosil bo‘ladi", "Natija −1", "Overflow bo‘lmaydi, natija 0"],
    correctIndex: 0,
    explanation: "Qo'shni razryaddan 1 qarz olinsa u joriy razryadda 2 (10₂) bo'ladi, 2 - 1 = 1 natija beradi."
  },
  {
    id: "sq_17",
    labId: 6,
    text: "Half Adder (Yarim qo‘shgich) da ko‘chirish biti qaysi mantiqiy amal bilan olinadi?",
    options: ["A AND B", "A XOR B", "A OR B", "NOT A"],
    correctIndex: 0,
    explanation: "Ko'chirish (Carry) faqat A=1 va B=1 bo'lgandagina 1 bo'ladi, bu esa AND amalidir."
  },
  {
    id: "sq_18",
    labId: 6,
    text: "Sakkizlik tizimda 7 + 1 natijasi nimaga teng?",
    options: ["10₈", "8₈", "70₈", "11₈"],
    correctIndex: 0,
    explanation: "Sakkizlikda 7 dan keyin yangi razryad boshlanadi, ya'ni 10₈ (o'nlikdagi 8)."
  },
  {
    id: "sq_19",
    labId: 6,
    text: "8 bitli registrda 200 + 100 amali bajarilsa, natija necha bo'ladi (unsigned overflow)?",
    options: ["44", "300", "255", "100"],
    correctIndex: 0,
    explanation: "200 + 100 = 300. 8-bitga faqat 0...255 sig'adi: 300 - 256 = 44 (va Carry/Overflow bayrog'i yoqiladi)."
  },
  {
    id: "sq_20",
    labId: 7,
    text: "Mantiqiy 0 va 1 ning kuchlanishi haqida to‘g‘ri fikr?",
    options: ["Mantiqiy oilaga bog‘liq; muhimi — kirish chegaradan past yoki yuqoriligi", "Har doim 0 V va 5 V", "Har doim 0 V va 3,3 V", "Barcha qurilmada 0 V va 1 V"],
    correctIndex: 0,
    explanation: "Turli oilalarda (TTL, CMOS 3.3V, 1.8V) kuchlanish chegaralari turlicha, asosiysi chegaralar orqali diskret sathlar aniqlanadi."
  },
  {
    id: "sq_21",
    labId: 7,
    text: "Qaysi qurilma ketma-ket (sequential) turga kiradi?",
    options: ["D-trigger / registr", "Yarim qo‘shgich", "AND elementi", "NOT elementi"],
    correctIndex: 0,
    explanation: "Trigger va registrlar avvalgi holatni eslab qoluvchi xotira elementlari (sequential) hisoblanadi."
  },
  {
    id: "sq_22",
    labId: 7,
    text: "Analog signalning asosiy xususiyati nimada?",
    options: ["Uzluksiz qiymatlar qabul qiladi", "Faqat 0 va 1", "Faqat ikki sath", "Shovqinga sezgir emas"],
    correctIndex: 0,
    explanation: "Analog signal vaqt bo'yicha uzluksiz bo'lib, ixtiyoriy oraliq qiymatni qabul qila oladi."
  },
  {
    id: "sq_23",
    labId: 7,
    text: "Raqamli sxemada 1 bitni saqlash vazifasini nima bajaradi?",
    options: ["Xotira elementlari (trigger, flip-flop)", "Faqat AND elementlari", "Faqat kiritish qurilmasi", "NOT elementi"],
    correctIndex: 0,
    explanation: "Bistabil trigger sxemasi qayta aloqa zanjiri orqali 1 bit holatni doimiy saqlaydi."
  },
  {
    id: "sq_24",
    labId: 8,
    text: "XNOR(A,B) = 1 qachon bo‘ladi?",
    options: ["Kirishlar bir-biriga teng bo‘lganda", "Kirishlar turlicha bo‘lganda", "Faqat ikkalasi 1 bo‘lganda", "Faqat ikkalasi 0 bo‘lganda"],
    correctIndex: 0,
    explanation: "XNOR (ekvivalensiya) A va B teng bo'lganda (0 va 0 yoki 1 va 1) 1 beradi."
  },
  {
    id: "sq_25",
    labId: 8,
    text: "NAND(1,1) va NOR(0,0) natijalari ketma-ket qanday bo'ladi?",
    options: ["0 va 1", "1 va 0", "0 va 0", "1 va 1"],
    correctIndex: 0,
    explanation: "NAND(1,1) = NOT(1 AND 1) = 0; NOR(0,0) = NOT(0 OR 0) = 1."
  },
  {
    id: "sq_26",
    labId: 8,
    text: "NAND ning ikkala kirishini birlashtirsak, qaysi element hosil bo‘ladi?",
    options: ["NOT (Invertor)", "AND", "OR", "XOR"],
    correctIndex: 0,
    explanation: "NAND(A, A) = NOT(A AND A) = NOT(A)."
  },
  {
    id: "sq_27",
    labId: 8,
    text: "Yarim qo‘shgich (Half Adder) qaysi elementlardan tuziladi?",
    options: ["XOR va AND", "OR va NOT", "NOT va NOT", "NOR va OR"],
    correctIndex: 0,
    explanation: "SUM = A XOR B, CARRY = A AND B."
  },
  {
    id: "sq_28",
    labId: 8,
    text: "3 kirishli sxemani to‘liq tekshirish uchun rostlik jadvalida nechta kombinatsiya kerak?",
    options: ["8", "6", "9", "3"],
    correctIndex: 0,
    explanation: "Kirishlar soni n=3 bo'lsa, kombinatsiyalar 2³ = 8 ta bo'ladi."
  },
  {
    id: "sq_29",
    labId: 9,
    text: "A · (A + B) Bul ifodasi nimaga teng?",
    options: ["A", "B", "A+B", "A·B"],
    correctIndex: 0,
    explanation: "Yutilish qonuniga (Absorption law) binoan: A · (A + B) = A·A + A·B = A + A·B = A."
  },
  {
    id: "sq_30",
    labId: 9,
    text: "De Morgan qonuniga ko'ra: ¬(A + B) ifodasi nimaga teng?",
    options: ["¬A · ¬B", "¬A + ¬B", "A · B", "¬A + B"],
    correctIndex: 0,
    explanation: "Yig'indining inkori inkorlar ko'paytmasiga teng: ¬(A + B) = ¬A · ¬B."
  },
  {
    id: "sq_31",
    labId: 9,
    text: "3 o‘zgaruvchili Karnaugh xaritasida nechta katak bor?",
    options: ["8", "6", "9", "4"],
    correctIndex: 0,
    explanation: "3 o'zgaruvchi (A, B, C) uchun K-map kataklar soni 2³ = 8 ta bo'ladi."
  },
  {
    id: "sq_32",
    labId: 9,
    text: "A · Ā + B ifodasi nimaga teng?",
    options: ["B", "A", "0", "1"],
    correctIndex: 0,
    explanation: "Komplement qoidasi bo'yicha A · Ā = 0. U holda 0 + B = B."
  },
  {
    id: "sq_33",
    labId: 9,
    text: "Mantiqiy ifodani soddalashtirishning eng asosiy amaliy foydasi nima?",
    options: ["Kamroq element, arzonroq sxema va kamroq kechikish", "Rostlik jadvali o‘zgaradi", "Kirishlar soni ortadi", "Funksiya boshqa bo‘lib qoladi"],
    correctIndex: 0,
    explanation: "Minimal mantiqiy sxemalar kamroq tranzistor talab qiladi, tezroq ishlaydi va energiya tejaydi."
  },
  {
    id: "sq_34",
    labId: 10,
    text: "Xotiradan registrga ma’lumot yuklovchi RISC-V buyrug‘i qaysi?",
    options: ["lw (load word)", "sw", "add", "beq"],
    correctIndex: 0,
    explanation: "lw buyrug'i ko'rsatilgan xotira manzilidan 32-bitli ma'lumotni o'qib registrga yuklaydi."
  },
  {
    id: "sq_35",
    labId: 10,
    text: "sw (store word) buyrug‘i qaysi RISC-V formatiga kiradi?",
    options: ["S-format", "R-format", "U-format", "J-format"],
    correctIndex: 0,
    explanation: "sw buyrug'i registrdagi qiymatni xotiraga yozadi va immediate siljishni bo'lingan holda saqlovchi S-formatga kiradi."
  },
  {
    id: "sq_36",
    labId: 10,
    text: "RISC arxitekturasi yondashuvi uchun qaysi belgi xos?",
    options: ["Soddalashtirilgan, tartibli va teng uzunlikdagi buyruq formatlari", "Juda ko‘p murakkab, turli uzunlikdagi buyruqlar", "Faqat xotira–xotira amallari", "Registrlarning yo‘qligi"],
    correctIndex: 0,
    explanation: "RISC buyruqlari odatda 32-bit standart uzunlikda bo'ladi va yuklash-saqlash (load-store) modelida ishlaydi."
  },
  {
    id: "sq_37",
    labId: 10,
    text: "add x5, x6, x7 buyrug‘i qaysi formatga kiradi?",
    options: ["R-format", "I-format", "S-format", "B-format"],
    correctIndex: 0,
    explanation: "Ikki manba registri (rs1, rs2) va bitta qabul qiluvchi registr (rd) bilan ishlovchi buyruqlar R-formatdir."
  },
  {
    id: "sq_38",
    labId: 10,
    text: "Bir xil ISA ga mos, lekin mikroarxitekturasi turlicha ikki protsessor…",
    options: ["Bir xil mashina kodini bajara oladi", "Turli kod talab qiladi", "Faqat bitta kompilyatorda ishlaydi", "Bir-biriga mos kelmaydi"],
    correctIndex: 0,
    explanation: "ISA apparat va dasturiy ta'minot o'rtasidagi interfeysdir, ichki mikroarxitektura qanday bo'lishidan qat'i nazar dastur kodi bir xil ishlaydi."
  },
  {
    id: "sq_39",
    labId: 11,
    text: "beq / bne shartli o'tish buyruqlarida manzil qanday hisoblanadi?",
    options: ["PC-relative (PC + immediate offset)", "Faqat registrdan", "Absolute immediate xotira", "Faqat stack pointer orqali"],
    correctIndex: 0,
    explanation: "Shart bajarilsa joriy dastur hisoblagichi (PC) ga nisbatan offset qo'shiladi."
  },
  {
    id: "sq_40",
    labId: 11,
    text: "Load / store arxitekturasi nimani anglatadi?",
    options: ["Arifmetika registrlarda bajariladi, xotiraga faqat load/store orqali murojaat qilinadi", "Arifmetika to‘g‘ridan-to‘g‘ri xotirada bajariladi", "Registrlar umuman ishlatilmaydi", "Faqat bevosita adreslash ishlatiladi"],
    correctIndex: 0,
    explanation: "RISC protsessorlarida arifmetik amallar faqat ichki registrlar o'rtasida bo'ladi, xotira bilan to'g'ridan-to'g'ri hisoblash taqiqlanadi."
  },
  {
    id: "sq_41",
    labId: 11,
    text: "add t2, t0, t1 buyrug'ida qaysi adreslash turi qo'llangan?",
    options: ["Registrli adreslash", "Immediate (bevosita)", "Base + offset", "PC-relative"],
    correctIndex: 0,
    explanation: "Barcha operandlar (t0, t1, t2) protsessor registrlarida joylashgan."
  },
  {
    id: "sq_42",
    labId: 12,
    text: "Tezlik bo‘yicha tezdan sekinga qarab to‘g‘ri ketma-ketlik qaysi?",
    options: ["Registr → L1 kesh → DRAM (RAM) → NVMe SSD → HDD", "DRAM → L1 → Registr → SSD → HDD", "SSD → DRAM → L1 → Registr → HDD", "L1 → Registr → HDD → DRAM → SSD"],
    correctIndex: 0,
    explanation: "Registrlar CPU yadrosida bir necha pikosekundda ishlaydi, kesh nanosekund, RAM o'nlab ns, SSD mikrosekund, HDD millisekund."
  },
  {
    id: "sq_43",
    labId: 12,
    text: "Eng tez xotira nima uchun kompyuterga terabayt hajmda o‘rnatilmaydi?",
    options: ["Juda qimmat, katta maydon egallaydi va fizik issiqlik ajratadi", "Qonun taqiqlaydi", "Tezlikka ta’sir qilmaydi", "Faqat SSD ga ruxsat beriladi"],
    correctIndex: 0,
    explanation: "SRAM tranzistorlari (6 ta tranzistor har bit uchun) juda qimmat va kristallda ulkan maydon oladi."
  },
  {
    id: "sq_44",
    labId: 12,
    text: "Elektr quvvati o‘chganda qaysi biri o'z mazmunini butunlay yo‘qotadi?",
    options: ["DRAM (Operativ xotira)", "NVMe SSD", "HDD", "Firmware flash ROM"],
    correctIndex: 0,
    explanation: "DRAM kondensator zaryadiga tayanadi va elektr ta'minoti uzilganda uchuvchanligi (volatile) sabab ma'lumot o'chadi."
  },
  {
    id: "sq_45",
    labId: 12,
    text: "Bir xil 16 GB hajmdagi RAM va SSD nima sababli turlicha vazifa bajaradi?",
    options: ["Kechikish (latency) va uchuvchanlik tafovuti sababli", "Ular bir xil qurilma", "SSD faqat kiritish qurilmasi", "RAM doimiy saqlaydi"],
    correctIndex: 0,
    explanation: "RAM kechikishi ~50-80 ns, SSD kechikishi ~20-50 mks (1000 barobar sekin)."
  },
  {
    id: "sq_46",
    labId: 13,
    text: "SSD reklamasidagi 7000 MB/s ko‘rsatkichi odatda nimani bildiradi?",
    options: ["Ketma-ket (Sequential) katta blokli o‘qishning maksimumini", "Real aralash o‘rtacha tezlikni", "Tasodifiy 4 KiB IOPS ni", "Kechikish vaqtini"],
    correctIndex: 0,
    explanation: "Sequential tezlik faqat katta uzluksiz fayllar uchun erishiladi, kundalik dasturlarda 4KB random tezlik muhimroq."
  },
  {
    id: "sq_47",
    labId: 13,
    text: "M.2 slotiga SATA SSD o‘rnatish mumkinmi?",
    options: ["Ha, agar plata sloti SATA protokoli va B+M key ni qo‘llasa", "Yo‘q, M.2 faqat NVMe uchun", "Yo‘q, faqat HDD", "Faqat USB"],
    correctIndex: 0,
    explanation: "M.2 faqat shakl omili (form-factor) hisoblanadi; u ham SATA, ham PCIe/NVMe signallarini uzatishi mumkin."
  },
  {
    id: "sq_48",
    labId: 13,
    text: "Saqlash qurilmasida Latency (kechikish) nima?",
    options: ["Bitta I/O so‘roviga drayver va apparaturaning javob berish vaqti", "Soniyadagi operatsiyalar soni", "Vaqt birligida uzatilgan hajm", "Disk sig‘imi"],
    correctIndex: 0,
    explanation: "Latency so'rov jo'natilgan paytdan birinchi bayt kelguncha bo'lgan kechikish vaqtidir."
  },
  {
    id: "sq_49",
    labId: 13,
    text: "Operatsion tizim yuklanishi va ko‘plab kichik fayllar bilan ishlashda qaysi ko‘rsatkich eng muhim?",
    options: ["Tasodifiy 4K IOPS va past latency", "Faqat umumiy sig‘im", "Faqat ketma-ket maksimal tezlik", "Qurilmaning rangi va vazni"],
    correctIndex: 0,
    explanation: "OT mayda fayllar, kutubxonalar va registrlarni doimiy o'qiganligi uchun 4K random unumdorlik hal qiluvchi rol o'ynaydi."
  },
  {
    id: "sq_50",
    labId: 14,
    text: "Cache line nima?",
    options: ["Keshga RAM dan yaxlit blok sifatida olib kiriladigan ma’lumot birligi (odatda 64 bayt)", "Bitta bit", "Sahifa jadvali", "Disk sektori"],
    correctIndex: 0,
    explanation: "Fazoviy lokalik tamoyili bo'yicha CPU so'ragan so'z bilan birga uning atrofidagi butun 64 bayt keshga ko'chiriladi."
  },
  {
    id: "sq_51",
    labId: 14,
    text: "Fazoviy lokalikdan (spatial locality) qaysi mexanizm bevosita foydalanadi?",
    options: ["Cache line orqali qo'shni baytlarni yaxlit yuklash", "Write-through", "Pagefile", "TLB miss"],
    correctIndex: 0,
    explanation: "Massiv elementlari birin-ketin o'qilganda bitta kesh qatori yuklanishi keyingi elementlarni hit qiladi."
  },
  {
    id: "sq_52",
    labId: 14,
    text: "MMU (Memory Management Unit) ning asosiy vazifasi nima?",
    options: ["Virtual manzilni sahifa jadvali orqali fizik manzilga tarjima qilish", "Diskni formatlash", "Ovozni qayta ishlash", "Tarmoq paketlarini yo‘naltirish"],
    correctIndex: 0,
    explanation: "MMU apparat darajasida har bir xotira murojaatini virtual sahifadan fizik freymga o'tkazadi."
  },
  {
    id: "sq_53",
    labId: 14,
    text: "Write-back keshlash siyosati qanday ishlaydi?",
    options: ["Yozuv avval keshda saqlanadi (dirty), RAM ga faqat kesh bloki almashtirilganda uzatiladi", "Yozuv darhol pastki RAM darajasiga uzatiladi", "Yozuv umuman saqlanmaydi", "Faqat diskka yoziladi"],
    correctIndex: 0,
    explanation: "Write-back shina trafigini keskin kamaytiradi, chunki bitta qatorga bir necha bor yozilgach, RAM ga 1 marta ko'chiriladi."
  },
  {
    id: "sq_54",
    labId: 14,
    text: "Virtual xotirada Hard Fault nega Soft Fault ga qaraganda juda sekin?",
    options: ["Kerakli sahifa RAM da bo'lmay, sekin disk/SSD dagi pagefile dan o'qilishi sababli", "Kesh to‘la bo‘ladi", "CPU o‘chiq bo‘ladi", "Sahifa jadvali bo‘lmaydi"],
    correctIndex: 0,
    explanation: "Hard Fault disk I/O talab qiladi, bu esa protsessorni millionlab takt kutishga majbur qiladi."
  },
  {
    id: "sq_55",
    labId: 15,
    text: "RAID 1 (2 ta disk) nechta diskning bir vaqtda nosozligiga chidaydi?",
    options: ["1 ta", "0 ta", "2 ta", "3 ta"],
    correctIndex: 0,
    explanation: "RAID 1 ko'zgu bo'lib, 1 ta disk ishdan chiqsa ham ikkinchi disk to'liq ma'lumotni ushlab turadi."
  },
  {
    id: "sq_56",
    labId: 15,
    text: "Foydalanuvchi faylni tasodifan o‘chirib yuborsa yoki virus shifrlasa, nima himoya qiladi?",
    options: ["Alohida olingan zaxira nusxa (Backup)", "RAID 1", "RAID 5", "RAID 6"],
    correctIndex: 0,
    explanation: "RAID apparat buzilishidan saqlaydi, fayl o'chirilganda u barcha disklardan bir vaqtda o'chadi. Faqat Backup saqlaydi!"
  },
  {
    id: "sq_57",
    labId: 15,
    text: "Kichik tasodifiy yozishda (random write) RAID 5 nega sekinlashadi?",
    options: ["Paritetni yangilash uchun 2 ta o'qish va 2 ta yozish (Write penalty) sababli", "Disklar soni kamligi uchun", "Mirroring juda ko'pligi uchun", "Kesh xotira bo'lmagani uchun"],
    correctIndex: 0,
    explanation: "Write penalty = Read Old Data + Read Old Parity + Write New Data + Write New Parity."
  },
  {
    id: "sq_58",
    labId: 15,
    text: "3-2-1 zaxiralash qoidasidagi “1” nimani bildiradi?",
    options: ["Kamida bitta nusxa boshqa geografik joyda (off-site / cloud) saqlansin", "Bitta RAID massiv", "Bitta disk", "Bitta foydalanuvchi"],
    correctIndex: 0,
    explanation: "Yong'in, toshqin yoki o'g'irlik kabi ofatlardan saqlanish uchun kamida bitta nusxa boshqa binoda yoki bulutda bo'lishi shart."
  },
  {
    id: "sq_59",
    labId: 15,
    text: "RAID 0 massivining asosiy xususiyati nima?",
    options: ["Maksimal tezlik va to'liq sig'im, lekin nosozlikka chidamlilik 0", "Ko'zgu nusxa saqlash", "Ikkita taqsimlangan paritet", "Fayllarni avtomatik arxivlash"],
    correctIndex: 0,
    explanation: "RAID 0 da bitta disk ishdan chiqsa barcha ma'lumotlar butunlay yo'qoladi."
  },
  {
    id: "sq_60",
    labId: 16,
    text: "PCIe lane (liniyasi) haqida to‘g‘ri fikr qaysi?",
    options: ["Mustaqil uzatish (TX) va qabul qilish (RX) differensial juftliklaridan iborat", "Bitta umumiy parallel ma’lumot simi", "Faqat bir tomonlama aloqa", "Faqat xotira uchun mo'ljallangan"],
    correctIndex: 0,
    explanation: "Har bir lane 4 ta simdan (2 ta uzatuvchi va 2 ta qabul qiluvchi) iborat to'liq dupleks ketma-ket kanaldir."
  },
  {
    id: "sq_61",
    labId: 16,
    text: "CXL.cache va CXL.mem protokollari nimani apparat darajasida ta'minlaydi?",
    options: ["Kogerent kesh va protsessor bilan tezlatgich o'rtasidagi umumiy xotirani", "Faqat standart USB sichqoncha ulanishini", "Faqat audio signal uzatishni", "Fayllarni arxivlashni"],
    correctIndex: 0,
    explanation: "CXL CPU va GPU/FPGA ga bitta umumiy manzil maydonidan kogerent tarzda foydalanish imkonini beradi."
  },
  {
    id: "sq_62",
    labId: 16,
    text: "Zamonaviy kompyuterlarda komponentlararo bog‘lanishlar ko‘pincha qanday quriladi?",
    options: ["Yuqori tezlikdagi ketma-ket (serial) point-to-point interkonnektlar", "Barcha qurilmalar uchun umumiy bitta parallel shina", "Faqat analog kabellar", "Faqat radiochastotali kanallar"],
    correctIndex: 0,
    explanation: "Parallel shinalarda signal sinxronizatsiyasi (skew) yuqori chastotada buziladi, shuning uchun nuqtadan-nuqtaga ketma-ket linklar o'rnatilgan."
  },
  {
    id: "sq_63",
    labId: 16,
    text: "M.2 NVMe SSD drayveri odatda ona platadagi qaysi PCIe link kengligidan foydalanadi?",
    options: ["PCIe x4 (4 ta lane)", "PCIe x16", "PCIe x1", "PCIe x32"],
    correctIndex: 0,
    explanation: "Zamonaviy M.2 slotlari odatda 4 ta PCIe liniyasiga (x4) ega bo'lib, PCIe 4.0 da ~8 GB/s, PCIe 5.0 da ~16 GB/s nazariy o'tkazuvchanlik beradi."
  },
  {
    id: "sq_64",
    labId: 16,
    text: "Ona platadagi slotning fizik uzunligi va unga ulangan elektr liniyalar soni haqida nima deyish mumkin?",
    options: ["Har doim bir xil bo‘lavermaydi (masalan, x16 slot faqat x4 elektr liniyaga ulangan bo'lishi mumkin)", "Har doim mutlaq bir xil bo‘ladi", "Slot uzunligi ahamiyatsiz", "Faqat x1 bo'lishi mumkin"],
    correctIndex: 0,
    explanation: "Plata dizayniga qarab x16 o'lchamdagi fizik slot chipsetga faqat x4 yoki x8 liniya orqali bog'langan bo'lishi mumkin."
  },
];

// Dynamic Question Generators
export const DYNAMIC_GENERATORS: Record<number, () => Question> = {
  // 4 - Sanoq tizimlari
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
      text: `${binStr}₂ ikkilik sonining o‘nlik (DEC) tizimidagi qiymati nechaga teng?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Har bir razryad og'irligi: ${binStr.split('').map((b, i) => `${b}×2^${binStr.length - 1 - i}`).join(' + ')} = ${n}₁₀`,
      isDynamic: true,
    };
  },

  // 5 - O'tkazish
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
        id: `dyn_5_${Date.now()}_${Math.random()}`,
        labId: 5,
        text: `${n}₁₀ o‘nlik sonining ikkilik (BIN) shakli qaysi javobda to‘g‘ri berilgan?`,
        options: [correct, ...distractors.slice(0, 3)],
        correctIndex: 0,
        explanation: `${n} soni 2 ga ketma-ket bo'linganda qoldiqlar teskari tartibda o'qilganda: ${correct}₂ hosil bo'ladi.`,
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
        explanation: `To'rttadan guruhlash (tetrada): ${binStr.slice(0, 4)}₂ = 0x${parseInt(binStr.slice(0, 4), 2).toString(16).toUpperCase()} va ${binStr.slice(4)}₂ = 0x${parseInt(binStr.slice(4), 2).toString(16).toUpperCase()}. Jami: ${correct}.`,
        isDynamic: true,
      };
    }
  },

  // 6 - Arifmetika
  6: () => {
    const a = Math.floor(Math.random() * 11) + 5; // 5..15
    const b = Math.floor(Math.random() * 11) + 5; // 5..15
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
      id: `dyn_6_${Date.now()}_${Math.random()}`,
      labId: 6,
      text: `4-bitli ikkilik qo‘shish: ${aBin}₂ + ${bBin}₂ = ? (ikkilikda)`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `O'nlikda: ${a} + ${b} = ${sum}₁₀. Buni ikkilikka o'tkazsak: ${correct}₂ bo'ladi.`,
      isDynamic: true,
    };
  },

  // 11 - Adreslash
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
      text: `Agar t0 = ${hexBase} bo‘lsa, lw t1, ${offset}(t0) buyrug‘ining samarali manzili (Effective Address) qaysi?`,
      options: [hexEa, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Effective Address = Base + Offset = ${hexBase} + ${offset} (0x${offset.toString(16)}) = ${hexEa}.`,
      isDynamic: true,
    };
  },

  // 12 - Xotira ierarxiyasi
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
      text: `Kesh Hit Rate = ${hr}%, keshga kirish vaqti ${tHit} ns, miss bo‘lganda jami penalti ${tMiss} ns. O‘rtacha kirish vaqti (EAT) qancha?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `EAT = (HitRate × t_hit) + ((1 - HitRate) × t_miss) = (${hr/100} × ${tHit}) + (${(1-hr/100).toFixed(2)} × ${tMiss}) = ${eat} ns.`,
      isDynamic: true,
    };
  },

  // 13 - Saqlash qurilmalari
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
      text: `${sizeGb} GB hajmdagi fayl ${speed} MB/s ketma-ket tezlikda necha soniyada to‘liq ko‘chiriladi? (1 GB = 1000 MB)`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Vaqt = Hajm / Tezlik = (${sizeGb} × 1000 MB) / ${speed} MB/s = ${sizeGb * 1000 / speed} s = ${correct}.`,
      isDynamic: true,
    };
  },

  // 15 - RAID
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
      explanation: `${r.name} uchun formula: ${r.level === 0 ? 'N × S' : r.level === 1 ? 'S (mirror)' : r.level === 5 ? '(N - 1) × S' : '(N - 2) × S'}. Jami foydali sig'im: ${cap} TB.`,
      isDynamic: true,
    };
  },

  // 16 - Shinalar
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
      text: `PCIe ${g.gen} x${lane} linkining jami xom signal uzatish tezligi (har bir lane ${g.rate} GT/s bo‘lsa) qancha?`,
      options: [correct, ...distractors.slice(0, 3)],
      correctIndex: 0,
      explanation: `Jami signal tezligi = Lane_soni × Rate_per_lane = ${lane} × ${g.rate} GT/s = ${totalGt} GT/s.`,
      isDynamic: true,
    };
  },
};

// Shuffle array utility
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Prepare question with randomized options
export function prepareQuestion(q: Question): Question {
  const correctText = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(correctText);
  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
  };
}

// Get 10 non-repeating questions across 14 labs (Aralash Imtihon mode)
export function getExamQuestions(seenIds: string[] = []): Question[] {
  const allLabIds = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const selectedLabIds = shuffleArray(allLabIds).slice(0, 10);

  return selectedLabIds.map(labId => {
    if (DYNAMIC_GENERATORS[labId] && Math.random() < 0.45) {
      return prepareQuestion(DYNAMIC_GENERATORS[labId]());
    }

    const labStatics = STATIC_QUESTIONS.filter(q => q.labId === labId);
    const unseen = labStatics.filter(q => !seenIds.includes(q.id));
    const pool = unseen.length > 0 ? unseen : labStatics;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    return prepareQuestion(chosen);
  });
}

// Get questions for specific lab training
export function getLabPracticeQuestions(labId: number, count = 5): Question[] {
  const labStatics = STATIC_QUESTIONS.filter(q => q.labId === labId);
  const result: Question[] = [];

  for (let i = 0; i < count; i++) {
    if (DYNAMIC_GENERATORS[labId] && (Math.random() < 0.5 || labStatics.length === 0)) {
      result.push(prepareQuestion(DYNAMIC_GENERATORS[labId]()));
    } else if (labStatics.length > 0) {
      result.push(prepareQuestion(labStatics[i % labStatics.length]));
    }
  }

  return shuffleArray(result);
}

// Get Boss questions for a campaign stage
export function getBossQuestions(stage: number, count = 5): Question[] {
  const stageLabsMap: Record<number, number[]> = {
    1: [2, 4, 5],
    2: [6, 7, 8, 9],
    3: [10, 11],
    4: [12, 13, 14],
    5: [15, 16],
  };

  const labs = stageLabsMap[stage] || [2, 4, 5];
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const labId = labs[i % labs.length];
    if (DYNAMIC_GENERATORS[labId] && Math.random() < 0.5) {
      questions.push(prepareQuestion(DYNAMIC_GENERATORS[labId]()));
    } else {
      const pool = STATIC_QUESTIONS.filter(q => q.labId === labId);
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      questions.push(prepareQuestion(chosen));
    }
  }

  return shuffleArray(questions);
}
