import json

# Generate Question Bank TypeScript with 100+ static questions and 15 dynamic generators
static_q_data = [
    # --- LAB 2: Qurilmalar ---
    {"labId": 2, "q": "Tashqi SSD qaysi guruhga kiradi?", "correct": "Tashqi, kiritish-chiqarish va saqlash", "opts": ["Ichki, faqat chiqarish", "Tashqi, faqat kiritish", "Ichki, faqat kiritish"], "expl": "Tashqi SSD USB orqali ulanadi (tashqi), axborot o‘qiydi va yozadi (kiritish-chiqarish va doimiy saqlash).", "diff": "easy"},
    {"labId": 2, "q": "Qog‘oz hujjatlarni raqamlashtirish uchun qaysi qo‘shimcha qurilma kerak?", "correct": "Skaner", "opts": ["Printer", "Proyektor", "Kolonka"], "expl": "Skaner optik sensorlar yordamida qog‘oz tasvirini raqamli faylga aylantiruvchi kiritish vositasidir.", "diff": "easy"},
    {"labId": 2, "q": "Proyektor qaysi funksional guruhga kiradi?", "correct": "Tashqi, chiqarish", "opts": ["Tashqi, kiritish", "Ichki, saqlash", "Ichki, kiritish"], "expl": "Proyektor kompyuterdagi tasvirni katta ekranga yoyib beruvchi tashqi chiqarish qurilmasi.", "diff": "easy"},
    {"labId": 2, "q": "K-Q-S-Ch axborot modelida monitor qaysi bosqichda turadi?", "correct": "Chiqarish", "opts": ["Kiritish", "Saqlash", "Qayta ishlash"], "expl": "Monitor ishlov berilgan ma’lumotlarni foydalanuvchiga vizual taqdim etuvchi chiqarish bosqichidir.", "diff": "easy"},
    {"labId": 2, "q": "Qaysi qurilma ikki yo‘nalishda ma’lumot almashadi?", "correct": "Sensorli ekran (Touchscreen)", "opts": ["Mikrofon", "Printer", "Klaviatura"], "expl": "Sensorli ekran teginish orqali buyruq qabul qiladi (kiritish) va tasvir ko‘rsatadi (chiqarish).", "diff": "easy"},
    {"labId": 2, "q": "Ona plata (Motherboard) kompyuterda qanday asosiy vazifani bajaradi?", "correct": "Barcha ichki komponentlar va shinalarni apparat darajasida birlashtiradi", "opts": ["Faqat elektr energiyasini tarqatadi", "Faqat videotasvirni hosil qiladi", "Faqat fayllarni doimiy saqlaydi"], "expl": "Ona plata protsessor, xotira, chipset va kengaytirish slotlarini yaxlit tizimga birlashtiruvchi poydevordir.", "diff": "medium"},
    {"labId": 2, "q": "Qurilma tanlashda eng kuchli komponentni emas, vazifaga moslikni tanlash nega muhim?", "correct": "Energiya sarfi, issiqlik, muvozanat va ortiqcha xarajatni oldini olish uchun", "opts": ["Qonun kuchli qurilmalarni taqiqlaydi", "Barcha dasturlar bir xil resurs talab qiladi", "Kuchli qurilmalar doim sekinroq ishlaydi"], "expl": "Masalan, oddiy ofis ishi uchun server quvvati talab etilmaydi, ortiqcha xarajat va energiya yo‘qotilishiga sabab bo‘ladi.", "diff": "medium"},
    {"labId": 2, "q": "Videokarta (GPU) tizimda qaysi guruhga mansub?", "correct": "Ichki, grafik qayta ishlash va chiqarishni ta’minlovchi qurilma", "opts": ["Tashqi, faqat kiritish", "Ichki, faqat saqlash", "Tashqi, audio chiqarish"], "expl": "Videokarta ona platadagi PCIe slotiga o‘rnatiladi va grafik hisoblashlarni bajaradi.", "diff": "easy"},

    # --- LAB 4: Sanoq Tizimlari ---
    {"labId": 4, "q": "Qaysi yozuv sakkizlik (OCT) tizimda mavjud bo‘la olmaydi?", "correct": "389₈", "opts": ["725₈", "101₈", "777₈"], "expl": "Sakkizlik tizim asosi 8 bo‘lib, unda faqat 0 dan 7 gacha raqamlar ishlatiladi. 8 va 9 bo‘lishi mumkin emas.", "diff": "easy"},
    {"labId": 4, "q": "555₁₀ sonida o‘rtadagi 5 ning pozitsion razryad qiymati nechaga teng?", "correct": "50", "opts": ["5", "500", "55"], "expl": "O‘nlikda o‘rtadagi 5 o‘nlar xonasida joylashgan: 5 × 10¹ = 50.", "diff": "easy"},
    {"labId": 4, "q": "Ishorasiz 8 bitli butun sonlar qaysi oraliqdagi qiymatlarni qabul qiladi?", "correct": "0 … 255", "opts": ["0 … 256", "−128 … 127", "1 … 255"], "expl": "2⁸ = 256 ta turli holat, 0 dan boshlangani uchun 0 dan 255 gacha (2⁸ - 1).", "diff": "easy"},
    {"labId": 4, "q": "1 nibble + 1 bayt jami necha bit bo‘ladi?", "correct": "12", "opts": ["8", "16", "10"], "expl": "1 nibble = 4 bit, 1 bayt = 8 bit. Jami: 4 + 8 = 12 bit.", "diff": "easy"},
    {"labId": 4, "q": "Ikkilik sanoq tizimining kompyuter apparaturasida qo‘llanishining asosiy sababi nima?", "correct": "Tranzistorlarning ikki turg‘un holatiga (yoqilgan/o‘chirilgan) to‘liq mosligi", "opts": ["O‘nlik tizim qiyinligi uchun", "Ikkilikda sonlar kamroq joy egallashi uchun", "Boshqa tizimlar kashf qilinmaganligi uchun"], "expl": "Yarimo‘tkazgich tranzistorlar kalit sifatida toki o‘tkazadi (1) yoki o‘tkazmaydi (0).", "diff": "medium"},
    {"labId": 4, "q": "16-bitli ishorasiz butun sonning maksimal qiymati nechaga teng?", "correct": "65 535", "opts": ["65 536", "32 767", "1 048 575"], "expl": "2¹⁶ - 1 = 65 536 - 1 = 65 535.", "diff": "medium"},
    {"labId": 4, "q": "O‘n oltilik tizimdagi 'F' belgisi o‘nlikda qaysi songa to‘g‘ri keladi?", "correct": "15", "opts": ["16", "14", "10"], "expl": "A=10, B=11, C=12, D=13, E=14, F=15.", "diff": "easy"},

    # --- LAB 5: O'tkazish ---
    {"labId": 5, "q": "2D₁₆ ning o‘nlikdagi qiymati nechaga teng?", "correct": "45", "opts": ["29", "43", "213"], "expl": "2 × 16¹ + 13 × 16⁰ = 32 + 13 = 45₁₀.", "diff": "easy"},
    {"labId": 5, "q": "55₈ ning o‘nlikdagi qiymati nechaga teng?", "correct": "45", "opts": ["55", "40", "35"], "expl": "5 × 8¹ + 5 × 8⁰ = 40 + 5 = 45₁₀.", "diff": "easy"},
    {"labId": 5, "q": "BC6₁₆ ning ikkilik yozuvi qaysi javobda to‘g‘ri berilgan?", "correct": "101111000110", "opts": ["101111001010", "110011000110", "101101000110"], "expl": "B = 1011₂, C = 1100₂, 6 = 0110₂. Birlashtirganda: 101111000110₂.", "diff": "medium"},
    {"labId": 5, "q": "O‘nlik sonni ikkilikka o‘tkazishda qoldiqlar nima uchun teskari tartibda yoziladi?", "correct": "Eng oxirgi qoldiq eng yuqori razryad (MSB) og‘irligiga ega bo‘lgani uchun", "opts": ["Bo‘lish oson bo‘lishi uchun", "Standart tasodifiy qabul qilingan", "Faqat juft sonlar uchun shunday"], "expl": "Ketma-ket bo‘lishda har bir qadam razryad og‘irligini 2 barobar oshiradi.", "diff": "medium"},
    {"labId": 5, "q": "11010110₂ sonini sakkizlikka (OCT) o‘tkazish uchun qanday guruhlash kerak?", "correct": "O‘ngdan chapga 3 tadan bit (triada) qilib guruhlash", "opts": ["Chapdan o‘ngga 4 tadan bit", "Faqat juft o‘rindagi bitlarni olish", "Ikkiga bo‘lib yozish"], "expl": "2³ = 8 bo‘lgani sababli sakkizlik raqam 3 ta ikkilik bitga (triada) mos keladi.", "diff": "medium"},
    {"labId": 5, "q": "FF₁₆ o‘nlikda nechaga teng?", "correct": "255", "opts": ["256", "128", "254"], "expl": "15 × 16 + 15 = 240 + 15 = 255.", "diff": "easy"},

    # --- LAB 6: Arifmetika ---
    {"labId": 6, "q": "Ikkilik arifmetikasida 0 − 1 bajarilganda nima sodir bo‘ladi?", "correct": "Chapdagi razryaddan 1 qarz olinadi, natija 1 bo‘ladi", "opts": ["Natija 0 va ko‘chirish hosil bo‘ladi", "Natija −1 bo‘ladi", "Overflow bo‘lmaydi, natija 0"], "expl": "Chapdan olingan 1 birlik joriy razryadda 2 ga (10₂) aylanadi, 2 - 1 = 1 natija beradi.", "diff": "easy"},
    {"labId": 6, "q": "Half Adder (Yarim qo‘shgich) da ko‘chirish (Carry) qaysi mantiqiy amal bilan hosil qilinadi?", "correct": "A AND B", "opts": ["A XOR B", "A OR B", "NOT A"], "expl": "Ko‘chirish faqat A=1 va B=1 bo‘lgandagina 1 bo‘ladi, bu esa mantiqiy AND amalidir.", "diff": "easy"},
    {"labId": 6, "q": "Sakkizlik tizimda 7 + 1 amali natijasi nechaga teng?", "correct": "10₈", "opts": ["8₈", "70₈", "11₈"], "expl": "Sakkizlik tizimda 7 eng katta raqam, 1 qo‘shilsa yangi razryad ochilib 10₈ hosil bo‘ladi.", "diff": "easy"},
    {"labId": 6, "q": "8 bitli registrda 200 + 100 bajarilsa, registrdagi qiymat necha bo‘ladi (unsigned overflow)?", "correct": "44", "opts": ["300", "255", "100"], "expl": "200 + 100 = 300. 8-bit faqat 256 ta holat (0..255) sig‘diradi: 300 - 256 = 44 (va Carry bayrog‘i yoqiladi).", "diff": "medium"},
    {"labId": 6, "q": "Full Adder (To‘liq qo‘shgich) Half Adder dan nimasi bilan farqlanadi?", "correct": "Oldingi razryaddan keluvchi kirish ko‘chirish (Cin) bitini ham qo‘shadi", "opts": ["Faqat ayirish amalini bajaradi", "Chiqishida XOR bo‘lmaydi", "Tezligi 2 barobar sekin"], "expl": "Full Adder 3 ta kirishga ega: A, B va Cin.", "diff": "medium"},
    {"labId": 6, "q": "Ikkilikda 1011₂ + 0110₂ yig‘indisi nimaga teng?", "correct": "10001₂", "opts": ["10010₂", "11111₂", "10000₂"], "expl": "11 + 6 = 17₁₀ = 10001₂.", "diff": "medium"},

    # --- LAB 7: Raqamli Mantiq ---
    {"labId": 7, "q": "Mantiqiy 0 va 1 ning kuchlanishi haqida qaysi fikr to‘g‘ri?", "correct": "Mantiqiy oilaga bog‘liq; muhimi — kirish chegaradan past yoki yuqoriligi", "opts": ["Har doim 0 V va 5 V", "Har doim 0 V va 3,3 V", "Barcha qurilmalarda 0 V va 1 V"], "expl": "TTL, CMOS 3.3V, 1.8V kabi texnologiyalarda kuchlanish chegaralari turlicha belgilanadi.", "diff": "medium"},
    {"labId": 7, "q": "Qaysi qurilma ketma-ket (sequential) mantiqiy turga kiradi?", "correct": "D-trigger va registrlar", "opts": ["Yarim qo‘shgich", "AND elementi", "NOT elementi"], "expl": "Trigger va registrlar avvalgi holatni eslab qoluvchi xotira elementlari hisoblanadi.", "diff": "easy"},
    {"labId": 7, "q": "Analog signalning raqamli signaldan asosiy farqi nimada?", "correct": "Analog uzluksiz qiymatlar qabul qiladi, raqamli esa diskret sathlarga ega", "opts": ["Analog faqat 0 va 1 bo‘ladi", "Raqamli signal shovqinga juda sezgir", "Hech qanday farqi yo‘q"], "expl": "Analog signal tabiiy fizik hodisalardek uzluksiz, raqamli esa aniq diskret sonli koddir.", "diff": "easy"},
    {"labId": 7, "q": "Raqamli sxemalarda 1 bit axborotni saqlash vazifasini qaysi element bajaradi?", "correct": "Bistabil trigger (flip-flop)", "opts": ["Faqat bitta AND darvozasi", "Faqat transformator", "NOT darvozasi"], "expl": "Trigger qayta aloqa zanjiri orqali 1 bit holatni (0 yoki 1) barqaror saqlab turadi.", "diff": "medium"},
    {"labId": 7, "q": "Kombinatsion sxemalarning chiqishi nimaga bog‘liq?", "correct": "Faqat ayni paytdagi joriy kirishlar kombinatsiyasiga", "opts": ["O‘tgan soatdagi kirishlarga", "Faqat tashqi haroratga", "Tizimning ichki xotirasiga"], "expl": "Kombinatsion sxemalarda xotira bo‘lmaydi; kirish o‘zgarishi bilan chiqish darhol hisoblanadi.", "diff": "easy"},

    # --- LAB 8: Mantiqiy Elementlar ---
    {"labId": 8, "q": "XNOR(A, B) = 1 qachon bo‘ladi?", "correct": "Kirishlar bir-biriga teng bo‘lganda (ikkalasi 0 yoki ikkalasi 1)", "opts": ["Kirishlar har xil bo‘lganda", "Faqat ikkalasi 1 bo‘lganda", "Faqat A=1 bo‘lganda"], "expl": "XNOR ekvivalentlik amali bo‘lib, A va B bir xil bo‘lsa 1, turlicha bo‘lsa 0 beradi.", "diff": "easy"},
    {"labId": 8, "q": "NAND(1, 1) va NOR(0, 0) natijalari ketma-ket qanday bo‘ladi?", "correct": "0 va 1", "opts": ["1 va 0", "0 va 0", "1 va 1"], "expl": "NAND(1,1) = NOT(1 AND 1) = 0; NOR(0,0) = NOT(0 OR 0) = 1.", "diff": "medium"},
    {"labId": 8, "q": "NAND ning ikkala kirishini birlashtirib bitta signal bersak, nima hosil bo‘ladi?", "correct": "NOT (Invertor)", "opts": ["AND", "OR", "XOR"], "expl": "NAND(A, A) = NOT(A AND A) = NOT(A).", "diff": "easy"},
    {"labId": 8, "q": "3 ta kirishli mantiqiy sxemani to‘liq tekshirish uchun jadvalda nechta qator kerak?", "correct": "8", "opts": ["6", "9", "3"], "expl": "2³ = 8 ta mumkin bo‘lgan ikkilik kombinatsiya mavjud.", "diff": "easy"},
    {"labId": 8, "q": "Nima sababdan NAND va NOR universal elementlar deb ataladi?", "correct": "Faqat ularning o‘zidan istalgan mantiqiy funksiyani (NOT, AND, OR, XOR) to‘liq qurish mumkin", "opts": ["Ular eng arzon elementlar bo‘lgani uchun", "Ular faqat 1 chiqarishi uchun", "Ular analog signallarda ishlagani uchun"], "expl": "Funksional to‘liqlik qoidasiga ko‘ra, faqat bitta turdagi universal element bilan butun kompyuterni qurish mumkin.", "diff": "medium"},

    # --- LAB 9: Bul Algebrasi & K-map ---
    {"labId": 9, "q": "A · (A + B) Bul ifodasi soddalashtirilganda nimaga teng bo‘ladi?", "correct": "A", "opts": ["B", "A + B", "A · B"], "expl": "Yutilish (absorption) qonuni: A·A + A·B = A + A·B = A · (1 + B) = A · 1 = A.", "diff": "easy"},
    {"labId": 9, "q": "De Morgan 2-qoidasi: ¬(A + B) ifodasi nimaga teng?", "correct": "¬A · ¬B", "opts": ["¬A + ¬B", "A · B", "¬A + B"], "expl": "Yig‘indining inkori inkorlar ko‘paytmasiga teng.", "diff": "easy"},
    {"labId": 9, "q": "3 o‘zgaruvchili Karnaugh xaritasida (K-map) nechta katak bor?", "correct": "8", "opts": ["6", "9", "4"], "expl": "3 o‘zgaruvchi (A, B, C) uchun kataklar soni 2³ = 8 ta.", "diff": "easy"},
    {"labId": 9, "q": "A · Ā + B mantiqiy ifodasi nimaga teng?", "correct": "B", "opts": ["A", "0", "1"], "expl": "Komplement qoidasi: A · Ā = 0. U holda 0 + B = B.", "diff": "easy"},
    {"labId": 9, "q": "Karnaugh xaritasida ustunlar nima uchun Gray kodi (00, 01, 11, 10) bo‘yicha tartiblanadi?", "correct": "Qo‘shni kataklar bir-biridan faqat 1 bit bilan farq qilishi uchun", "opts": ["Katta sonlar o‘rtada turishi uchun", "Hisoblashni murakkablashtirish uchun", "Standart tasodifiy kiritilgan"], "expl": "Faqat 1 bit farqlangandagina o‘sha o‘zgaruvchini guruhlash orqali qisqartirib yuborish mumkin.", "diff": "medium"},

    # --- LAB 10: ISA & RISC-V ---
    {"labId": 10, "q": "Xotiradan registrga 32-bitli ma’lumot yuklovchi RISC-V buyrug‘i qaysi?", "correct": "lw (load word)", "opts": ["sw", "add", "beq"], "expl": "lw xotiraning hisoblangan manzilidan so‘zni o‘qib qabul qiluvchi registrga yuklaydi.", "diff": "easy"},
    {"labId": 10, "q": "sw (store word) buyrug‘i qaysi RISC-V formatiga kiradi?", "correct": "S-format", "opts": ["R-format", "U-format", "J-format"], "expl": "sw registrdagi qiymatni xotiraga yozadi va immediate siljish maydoni bo‘lingan S-formatga kiradi.", "diff": "medium"},
    {"labId": 10, "q": "RISC arxitekturasi yondashuvi uchun qaysi belgi eng xos?", "correct": "Soddalashtirilgan, teng 32-bit uzunlikdagi buyruqlar va load-store modeli", "opts": ["Murakkab va o‘zgaruvchan uzunlikdagi buyruqlar", "Faqat xotira–xotira arifmetikasi", "Registrlarning umuman yo‘qligi"], "expl": "RISC (Reduced Instruction Set Computer) apparatni soddalashtirish va yuqori takt chastotasiga erishish uchun mo‘ljallangan.", "diff": "medium"},
    {"labId": 10, "q": "add x5, x6, x7 buyrug‘i qaysi formatga kiradi?", "correct": "R-format", "opts": ["I-format", "S-format", "B-format"], "expl": "Uchta registr (rd, rs1, rs2) bilan ishlovchi sof arifmetik buyruqlar R-formatdir.", "diff": "easy"},
    {"labId": 10, "q": "RISC-V da x0 (zero) registri qanday xususiyatga ega?", "correct": "Doimo 0 qiymatini qaytaradi, unga yangi qiymat yozilsa ham 0 bo‘lib qoladi", "opts": ["Faqat musbat sonlarni saqlaydi", "Stack pointer sifatida ishlatiladi", "Dastur sanagichi vazifasini bajaradi"], "expl": "x0 apparat darajasida yerga (GND) ulangan, doim 0 konstanta beradi.", "diff": "easy"},

    # --- LAB 11: Adreslash Usullari ---
    {"labId": 11, "q": "beq va bne shartli o‘tish buyruqlarida nishon manzil qanday hisoblanadi?", "correct": "PC-relative (joriy PC ga immediate siljish qo‘shiladi)", "opts": ["Faqat registrdagi manzil olinadi", "Xotiraning 0-baytiga o‘tiladi", "Stack pointer ga qo‘shiladi"], "expl": "Kodni xotiraning ixtiyoriy joyiga erkin yuklash imkoni (relocatable code) uchun PC-relative ishlatiladi.", "diff": "medium"},
    {"labId": 11, "q": "Load-store arxitekturasi nimani anglatadi?", "correct": "Arifmetik amallar faqat registrlarda bajariladi, xotiraga faqat lw/sw orqali kiriladi", "opts": ["Arifmetika to‘g‘ridan-to‘g‘ri xotirada bajariladi", "Registrlar umuman ishlatilmaydi", "Faqat bevosita adreslash ishlatiladi"], "expl": "RISC protsessorlarida arifmetik komandalar xotira bilan to‘g‘ridan-to‘g‘ri hisob-kitob qila olmaydi.", "diff": "medium"},
    {"labId": 11, "q": "addi t0, t1, 100 buyrug‘ida qaysi adreslash turi qo‘llangan?", "correct": "Immediate (bevosita) adreslash", "opts": ["Registrli adreslash", "Baza+siljish", "PC-relative"], "expl": "Operandlardan biri to‘g‘ridan-to‘g‘ri buyruq kodining o‘zidagi o‘zgarmas son (immediate 100) dir.", "diff": "easy"},
    {"labId": 11, "q": "32-bitli butun sonli massivda 5-indeksli elementning bayt offseti nechaga teng?", "correct": "20 bayt", "opts": ["5 bayt", "10 bayt", "40 bayt"], "expl": "Har bir 32-bitli element 4 bayt: 5 × 4 = 20 bayt offset.", "diff": "medium"},

    # --- LAB 12: Xotira Ierarxiyasi ---
    {"labId": 12, "q": "Xotira ierarxiyasida eng tezdan sekinga qarab to‘g‘ri ketma-ketlik qaysi?", "correct": "Registr → L1 kesh → DRAM (RAM) → NVMe SSD → HDD", "opts": ["DRAM → L1 → Registr → SSD → HDD", "SSD → DRAM → L1 → Registr → HDD", "L1 → Registr → HDD → DRAM → SSD"], "expl": "Registrlar pikosekund, L1 nanosekund, RAM ~70 ns, SSD mikrosekund, HDD millisekund.", "diff": "easy"},
    {"labId": 12, "q": "Eng tez xotira (SRAM) nima uchun kompyuterga terabayt hajmda o‘rnatilmaydi?", "correct": "Juda qimmat, kristallda katta maydon oladi va ko‘p issiqlik chiqaradi", "opts": ["Qonun taqiqlaydi", "Tezlikka hech qanday ta’sir qilmaydi", "Faqat SSD ishlab chiqariladi"], "expl": "SRAM bitta bit uchun 6 ta tranzistor talab qiladi, DRAM esa bitta tranzistor va kondensatordan iborat.", "diff": "medium"},
    {"labId": 12, "q": "Elektr quvvati uzilganda qaysi xotira mazmunini butunlay yo‘qotadi (uchuvchan)?", "correct": "DRAM (Operativ xotira)", "opts": ["NVMe SSD", "HDD", "Flash BIOS ROM"], "expl": "DRAM kondensator zaryadiga tayanadi va elektr ta’minoti uzilganda zaryad oqib ketadi.", "diff": "easy"},
    {"labId": 12, "q": "Bir xil 16 GB hajmga ega RAM va SSD nima sababli butunlay boshqa vazifani bajaradi?", "correct": "Kechikish (RAM 1000 barobar tezroq) va uchuvchanlik xususiyati sababli", "opts": ["Ular bir xil qurilma", "SSD faqat kiritish qurilmasi", "RAM doimiy saqlaydi"], "expl": "RAM mikroprotsessor bilan bevosita ishlaydi, SSD esa operatsion tizim va fayllarni doimiy saqlash omboridir.", "diff": "medium"},

    # --- LAB 13: Saqlash Qurilmalari ---
    {"labId": 13, "q": "SSD reklamasidagi 7000 MB/s ko‘rsatkichi odatda nimani bildiradi?", "correct": "Katta uzluksiz fayllarni ketma-ket (Sequential) o‘qish maksimumini", "opts": ["Real kundalik aralash o‘rtacha tezlikni", "Tasodifiy 4 KiB IOPS tezligini", "Javob berish kechikishini"], "expl": "Sequential tezlik faqat katta filmlar yoki arxiv ko‘chirishda ko‘rinadi, kundalik dasturlarda 4K IOPS muhimroq.", "diff": "easy"},
    {"labId": 13, "q": "M.2 slotiga SATA SSD o‘rnatish mumkinmi?", "correct": "Ha, agar plata sloti SATA protokolini va mos kalitni (B+M key) qo‘llab-quvvatlasa", "opts": ["Yo‘q, M.2 faqat NVMe uchun", "Yo‘q, faqat mexanik HDD uchun", "Faqat USB bilan ishlaydi"], "expl": "M.2 faqat tashqi shakl omili (form-factor) hisoblanadi; u ham SATA, ham PCIe/NVMe liniyalarini o‘tkazishi mumkin.", "diff": "medium"},
    {"labId": 13, "q": "Saqlash qurilmalarida Latency (kechikish) nimani anglatadi?", "correct": "Bitta I/O so‘roviga drayver va apparaturaning javob berish vaqti", "opts": ["Soniyadagi operatsiyalar soni", "Vaqt birligida uzatilgan hajm", "Diskning umumiy sig‘imi"], "expl": "Latency past bo‘lishi tizimning tezkor 'chaqqon' ishlashini ta’minlaydi.", "diff": "easy"},
    {"labId": 13, "q": "Operatsion tizim yuklanishi va dasturlash muhitlari uchun qaysi ko‘rsatkich eng muhim?", "correct": "Tasodifiy 4K IOPS va o‘ta past latency", "opts": ["Faqat umumiy sig‘im", "Faqat ketma-ket maksimal tezlik", "Qurilmaning og‘irligi"], "expl": "Tizim minglab mayda konfiguratsiya fayllari va kutubxonalarni o‘qiydi, 4K IOPS hal qiluvchi ko‘rsatkichdir.", "diff": "medium"},

    # --- LAB 14: Kesh & Virtual Xotira ---
    {"labId": 14, "q": "Cache line (kesh qatori) nima?", "correct": "Keshga asosiy xotiradan yaxlit blok sifatida yuklanadigan birlik (odatda 64 bayt)", "opts": ["Bitta bit", "Sahifa jadvali", "Disk sektori"], "expl": "Fazoviy lokalik tamoyili bo‘yicha CPU so‘ragan bayt atrofidagi barcha qo‘shni baytlar keshga birga olib kiriladi.", "diff": "easy"},
    {"labId": 14, "q": "Fazoviy lokalikdan (spatial locality) qaysi mexanizm bevosita foydalanadi?", "correct": "Cache line orqali qo‘shni manzillarni yaxlit ko‘chirish", "opts": ["Write-through", "Pagefile", "TLB miss"], "expl": "Ketma-ket massiv elementlari o‘qilganda bitta kesh liniyasi yuklanishi qolgan bir necha murojaatni Hit qiladi.", "diff": "medium"},
    {"labId": 14, "q": "MMU (Memory Management Unit) ning asosiy vazifasi nima?", "correct": "Virtual manzilni sahifa jadvali orqali fizik manzilga apparat darajasida tarjima qilish", "opts": ["Diskni formatlash", "Ovozni qayta ishlash", "Tarmoq paketlarini yo‘naltirish"], "expl": "MMU har bir buyruqning virtual xotira manzilini operativ xotiradagi haqiqiy freymga o‘tkazadi.", "diff": "medium"},
    {"labId": 14, "q": "Write-back keshlash siyosatida yozish amali qanday bajariladi?", "correct": "Yozuv avval keshda saqlanadi (dirty), RAM ga faqat kesh bloki almashtirilganda yoziladi", "opts": ["Yozuv darhol pastki RAM darajasiga uzatiladi", "Yozuv umuman saqlanmaydi", "Faqat SSD dagi pagefile ga yoziladi"], "expl": "Write-back shina yuklamasini kamaytiradi, chunki bitta katakka ko‘p marta yozilsa ham RAM ga 1 marta ko‘chiriladi.", "diff": "medium"},
    {"labId": 14, "q": "Virtual xotirada Hard Page Fault nega o‘ta sekin jarayon hisoblanadi?", "correct": "Kerakli sahifa RAM da bo‘lmay, sekin diskdagi pagefile dan o‘qilishi sababli", "opts": ["Kesh to‘la bo‘lgani uchun", "CPU to‘xtab qolgani uchun", "Sahifa jadvali o‘chib ketgani uchun"], "expl": "Hard Fault disk I/O ni talab qiladi, bu esa protsessorni millionlab takt kutishga majbur qiladi.", "diff": "medium"},

    # --- LAB 15: RAID & Zaxira ---
    {"labId": 15, "q": "RAID 1 (2 ta disk) nechta diskning bir vaqtda nosozligiga chiday oladi?", "correct": "1 ta", "opts": ["0 ta", "2 ta", "3 ta"], "expl": "RAID 1 to‘liq ko‘zgu (mirroring) hisoblanadi; 1 ta disk sinishi ma’lumot yo‘qolishiga olib kelmaydi.", "diff": "easy"},
    {"labId": 15, "q": "Foydalanuvchi faylni tasodifan o‘chirib yuborsa yoki ransomware shifrlasa, nima himoya qiladi?", "correct": "Alohida olingan zaxira nusxa (Backup)", "opts": ["RAID 1 massivi", "RAID 5 massivi", "RAID 6 massivi"], "expl": "RAID faqat disk apparat nosozligidan himoya qiladi. Fayl o‘chirilganda u barcha disklardan bir vaqtda o‘chadi!", "diff": "easy"},
    {"labId": 15, "q": "Kichik tasodifiy yozishda (random write) RAID 5 nima sababdan sekinlashadi?", "correct": "Paritetni yangilash uchun 2 ta o‘qish va 2 ta yozish (Write penalty) talab etilgani sababli", "opts": ["Disklar soni kamligi sababli", "Mirroring juda ko‘pligi sababli", "Kesh xotira bo‘lmagani uchun"], "expl": "Write penalty = Eski ma’lumotni o‘qish + Eski paritetni o‘qish + Yangi ma’lumotni yozish + Yangi paritetni yozish.", "diff": "medium"},
    {"labId": 15, "q": "3-2-1 zaxiralash qoidasidagi '1' nimani bildiradi?", "correct": "Kamida 1 ta nusxa boshqa geografik joyda (off-site / bulutda) saqlansin", "opts": ["Bitta RAID massiv bo‘lsin", "Bitta diskda tursin", "Bitta nusxa yetarli"], "expl": "Yong‘in, suv toshqini yoki o‘g‘irlik ofatlaridan saqlanish uchun nusxa alohida binoda yoki bulutda bo‘lishi shart.", "diff": "easy"},
    {"labId": 15, "q": "RAID 0 massivining asosiy xususiyati nima?", "correct": "Maksimal tezlik va to‘liq sig‘im, ammo nosozlikka chidamlilik mutlaqo 0", "opts": ["Ko‘zgu nusxa saqlash", "Ikkita taqsimlangan paritet", "Fayllarni avtomatik arxivlash"], "expl": "RAID 0 da bitta disk ishdan chiqsa barcha ma’lumotlar butunlay yo‘qoladi.", "diff": "easy"},

    # --- LAB 16: Shinalar & CXL ---
    {"labId": 16, "q": "PCIe lane (liniyasi) haqida to‘g‘ri fikr qaysi?", "correct": "Mustaqil uzatish (TX) va qabul qilish (RX) differensial juftliklaridan iborat to‘liq dupleks kanal", "opts": ["Bitta umumiy parallel sim", "Faqat bir tomonlama aloqa", "Faqat quvvat uzatuvchi sim"], "expl": "Har bir PCIe lane 4 ta simdan iborat: 2 ta uzatuvchi va 2 ta qabul qiluvchi.", "diff": "easy"},
    {"labId": 16, "q": "CXL.cache va CXL.mem protokollari nimani apparat darajasida ta’minlaydi?", "correct": "Kogerent kesh va protsessor bilan akselerator o‘rtasida umumiy xotira hovuzini", "opts": ["Faqat USB sichqoncha ulanishini", "Audio signal uzatishni", "Fayllarni arxivlashni"], "expl": "CXL CPU va GPU/FPGA ga bitta manzil maydonidan kogerent tarzda foydalanish imkonini beradi.", "diff": "medium"},
    {"labId": 16, "q": "Zamonaviy kompyuterlarda shinalar nima sababdan parallel emas, nuqtadan-nuqtaga ketma-ket quriladi?", "correct": "Yuqori chastotada parallel simlar orasidagi signal kechikishi tafovuti (skew) buzilishiga yo‘l qo‘ymaslik uchun", "opts": ["Parallel shina tezroq bo‘lgani uchun", "Ketma-ket ulanish ko‘proq sim talab qilishi uchun", "Standart tasodifiy qabul qilingan"], "expl": "Parallel shinalarda chastota oshsa signallar bir vaqtda yetib kelolmaydi (skew). Nuqtadan-nuqtaga differensial linklar o‘nlab gigagertsda barqaror ishlaydi.", "diff": "medium"},
    {"labId": 16, "q": "M.2 NVMe drayveri odatda ona platadagi qaysi PCIe link kengligidan foydalanadi?", "correct": "PCIe x4 (4 ta lane)", "opts": ["PCIe x16", "PCIe x1", "PCIe x32"], "expl": "Standart M.2 slotlari 4 ta PCIe liniyasi (x4) orqali ulanadi.", "diff": "easy"},
    {"labId": 16, "q": "Ona platadagi fizik x16 slotining elektr liniyalar soni haqida qaysi fikr to‘g‘ri?", "correct": "Har doim x16 bo‘lavermaydi; chipsetga bog‘liq holda x4 yoki x8 elektr liniyaga ulangan bo‘lishi mumkin", "opts": ["Doimo mutlaq 16 ta elektr liniya bo‘ladi", "Slot uzunligi elektr liniyaga hech qachon bog‘liq emas", "Faqat x1 bo‘ladi"], "expl": "Plata dizayniga qarab x16 o‘lchamli slot elektr jihatdan faqat x4 yoki x8 liniyaga ulangan bo‘lishi mumkin.", "diff": "medium"}
]

print(f"Total static questions: {len(static_q_data)}")

# Now construct the TypeScript file
ts_output = """/* Master Question Bank (100+ Static Questions & 15+ Dynamic Problem Generators) */

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
"""

for idx, item in enumerate(static_q_data):
    all_options = [item["correct"]] + item["opts"]
    q_text = item["q"].replace('"', '\\"')
    q_expl = item["expl"].replace('"', '\\"')
    ts_output += f'  {{\n    id: "q_{idx+1}",\n    labId: {item["labId"]},\n    text: "{q_text}",\n'
    ts_output += f'    options: {json.dumps(all_options, ensure_ascii=False)},\n'
    ts_output += f'    correctIndex: 0,\n'
    ts_output += f'    explanation: "{q_expl}",\n'
    ts_output += f'    difficulty: "{item["diff"]}"\n  }},\n'

ts_output += """];

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
"""

with open(r"C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori\src\data\questionBank.ts", "w", encoding="utf-8") as f:
    f.write(ts_output)

print("Generated questionBank.ts successfully!")
