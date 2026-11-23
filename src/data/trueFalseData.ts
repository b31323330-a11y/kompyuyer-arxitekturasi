// "Afsona yoki Haqiqat?" (True/False Sprint) savollar bazasi
// 14 ta amaliy mashg'ulot bo'yicha to'liq tekshirilgan ma'lumotlar

export interface TrueFalseQuestion {
  id: string;
  labNumber: number;
  category: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    "id": "tf-2-1",
    "labNumber": 2,
    "category": "Qurilmalar va Periferiya",
    "statement": "Skaner va raqamli kamera ma'lumotlarni kompyuterga kirituvchi (kirish) qurilmalar hisoblanadi.",
    "isTrue": true,
    "explanation": "To'g'ri. Skaner va kamera tashqi axborotni raqamli ko'rinishga o'tkazib, kompyuter xotirasiga kiritadi."
  },
  {
    "id": "tf-2-2",
    "labNumber": 2,
    "category": "Qurilmalar va Periferiya",
    "statement": "Tashqi qattiq disk (External HDD) faqat ma'lumot chiqarish qurilmasi bo'lib, unga ma'lumot yozib bo'lmaydi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Tashqi HDD kiritish-chiqarish (I/O) hamda axborotni saqlash qurilmasi bo'lib, undan ma'lumot o'qiladi ham, unga yoziladi ham."
  },
  {
    "id": "tf-2-3",
    "labNumber": 2,
    "category": "Qurilmalar va Periferiya",
    "statement": "Protsessor (CPU) va tezkor xotira (RAM) tizim blokining ichki apparat vositalariga kiradi.",
    "isTrue": true,
    "explanation": "To'g'ri. CPU, RAM, ona plata va quvvat bloki kompyuterning ichki tizim komponentlaridir."
  },
  {
    "id": "tf-2-4",
    "labNumber": 2,
    "category": "Qurilmalar va Periferiya",
    "statement": "Sensorli ekran (Touchscreen) bir vaqtning o'zida ham kiritish, ham chiqarish qurilmasi hisoblanadi.",
    "isTrue": true,
    "explanation": "To'g'ri. Sensorli ekran tasvirni ko'rsatadi (chiqarish) va teginish signallarini qabul qiladi (kiritish)."
  },
  {
    "id": "tf-2-5",
    "labNumber": 2,
    "category": "Qurilmalar va Periferiya",
    "statement": "Plotter — bu tovush signallarini kirituvchi qurilma.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Plotter (grafik chizgich) katta formatli chizmalar va grafiklarni qog'ozga chiqaruvchi qurilma."
  },
  {
    "id": "tf-4-1",
    "labNumber": 4,
    "category": "Sanoq Tizimlari",
    "statement": "Ikkilik sanoq tizimidagi 1011_2 soni o'nlik tizimda 11 ga teng.",
    "isTrue": true,
    "explanation": "To'g'ri. 1*8 + 0*4 + 1*2 + 1*1 = 8 + 2 + 1 = 11."
  },
  {
    "id": "tf-4-2",
    "labNumber": 4,
    "category": "Sanoq Tizimlari",
    "statement": "Sakkizlik sanoq tizimidagi bitta razryad ikkilikdagi to'rtta bitga (tetradaga) to'g'ri keladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Sakkizlik (2^3) bitta razryad ikkilikdagi 3 ta bitga (triadaga) to'g'ri keladi. 4 ta bit esa o'n oltilik (HEX) tetradadir."
  },
  {
    "id": "tf-4-3",
    "labNumber": 4,
    "category": "Sanoq Tizimlari",
    "statement": "O'n oltilik sanoq tizimidagi 'F' harfi o'nlikdagi 15 soniga mos keladi.",
    "isTrue": true,
    "explanation": "To'g'ri. A=10, B=11, C=12, D=13, E=14, F=15."
  },
  {
    "id": "tf-5-1",
    "labNumber": 5,
    "category": "Sanoq Tizimlari",
    "statement": "Ikkilik sonni o'n oltilikka o'tkazish uchun butun qismni o'ngdan chapga qarab 4 tadan (tetrada) guruhlash kerak.",
    "isTrue": true,
    "explanation": "To'g'ri. Butun sonlarda eng kichik razryaddan (o'ngdan) boshlab to'rttalik tetradalar ajratiladi."
  },
  {
    "id": "tf-5-2",
    "labNumber": 5,
    "category": "Sanoq Tizimlari",
    "statement": "0xFF soni 8-bitli unsigned tizimda maksimal qiymat — 255 ga teng.",
    "isTrue": true,
    "explanation": "To'g'ri. 0xFF = 15*16 + 15 = 255 (2^8 - 1)."
  },
  {
    "id": "tf-6-1",
    "labNumber": 6,
    "category": "ALU va Arifmetika",
    "statement": "8-bitli unsigned qo'shishda natija 255 dan oshsa, Carry (ko'chirish) bayrog'i 1 bo'ladi va to'lib ketish (overflow) sodir bo'ladi.",
    "isTrue": true,
    "explanation": "To'g'ri. 8-bit chegarasi 255 bo'lgani uchun 256 va undan katta natijalar 9-bitga (Carry Out) chiqadi."
  },
  {
    "id": "tf-6-2",
    "labNumber": 6,
    "category": "ALU va Arifmetika",
    "statement": "Ikkilik ayirish amalini kompyuter ALU'si qo'shimcha kod yordamida qo'shish amaliga keltirib bajaradi.",
    "isTrue": true,
    "explanation": "To'g'ri. A - B amali A + (-B ning qo'shimcha kodi) ko'rinishida qo'shgich orqali amalga oshiriladi."
  },
  {
    "id": "tf-6-3",
    "labNumber": 6,
    "category": "ALU va Arifmetika",
    "statement": "Sonning qo'shimcha kodini (Two's complement) topish uchun barcha bitlarni teskarilab, natijaga 2 qo'shiladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Barcha bitlar invert qilinadi (teskari kod olinadi) va natijaga aynan 1 qo'shiladi (+1)."
  },
  {
    "id": "tf-6-4",
    "labNumber": 6,
    "category": "ALU va Arifmetika",
    "statement": "4-bitli ikkilik tizimda 1010_2 va 0111_2 qo'shilganda Carry Out 1 bo'ladi.",
    "isTrue": true,
    "explanation": "To'g'ri. 10 + 7 = 17 (10001_2). 4-bit sig'imi 15 bo'lgani uchun 5-razryadga ko'chirish (Carry=1) hosil bo'ladi."
  },
  {
    "id": "tf-6-5",
    "labNumber": 6,
    "category": "ALU va Arifmetika",
    "statement": "Kichik sondan katta son ayirilganda Borrow (qarz olish) bayrog'i 0 bo'lib qoladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Kichik sondan katta son ayirilganda yuqori razryaddan qarz talab qilinadi, ya'ni Borrow = 1 bo'ladi."
  },
  {
    "id": "tf-7-1",
    "labNumber": 7,
    "category": "Analog va Raqamli Signallar",
    "statement": "Analog signal vaqt bo'yicha uzluksiz o'zgaruvchi signal hisoblanadi.",
    "isTrue": true,
    "explanation": "To'g'ri. Analog signal ixtiyoriy oraliqdagi cheksiz ko'p oraliq qiymatlarni qabul qila oladi."
  },
  {
    "id": "tf-7-2",
    "labNumber": 7,
    "category": "Analog va Raqamli Signallar",
    "statement": "Raqamli mantiqda LOW va HIGH oraliqlaridagi noaniq kuchlanish sohasi normal ishchi soha hisoblanadi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Noaniqlik (sochilish) sohasi taqiqlangan soha bo'lib, unda signalning 0 yoki 1 ekanligi kafolatlanmaydi."
  },
  {
    "id": "tf-7-3",
    "labNumber": 7,
    "category": "Analog va Raqamli Signallar",
    "statement": "Kombinatsion mantiqiy sxemalarda chiqish signali faqat ayni vaqtdagi kirish signallariga bog'liq (ichki xotiraga ega emas).",
    "isTrue": true,
    "explanation": "To'g'ri. Kombinatsion sxemalar (masalan, qo'shgich, multipleksor) o'tmishdagi holatlarni eslab qolmaydi."
  },
  {
    "id": "tf-7-4",
    "labNumber": 7,
    "category": "Analog va Raqamli Signallar",
    "statement": "Ketma-ketlik (sequential) sxemalarida qayta aloqa zanjiri va xotira elementlari (triggerlar) mavjud bo'ladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Ketma-ketlik sxemalari holatni saqlab qolish xususiyatiga ega."
  },
  {
    "id": "tf-8-1",
    "labNumber": 8,
    "category": "Mantiqiy Elementlar",
    "statement": "NAND elementi universal bo'lib, faqat NAND elementlari yordamida NOT, AND, OR va XOR mantiqiy sxemalarini qurish mumkin.",
    "isTrue": true,
    "explanation": "To'g'ri. NAND va NOR elementlari to'liq funksional bazis (universal mantiq) tashkil etadi."
  },
  {
    "id": "tf-8-2",
    "labNumber": 8,
    "category": "Mantiqiy Elementlar",
    "statement": "XOR elementi faqat ikkala kirish signali bir xil bo'lganda (0-0 yoki 1-1) 1 qiymat beradi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. XOR (istisno etuvchi YOKI) faqat kirishlar har xil bo'lganda 1 beradi. Bir xil bo'lganda 1 beradigan element — XNOR."
  },
  {
    "id": "tf-8-3",
    "labNumber": 8,
    "category": "Mantiqiy Elementlar",
    "statement": "Yarim qo'shgich (Half Adder) ikki bitni qo'shib, Sum (Yig'indi = A XOR B) va Carry (Ko'chirish = A AND B) signallarini hosil qiladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Half Adder kirishida quyi razryad ko'chirishi (Cin) bo'lmaydi, faqat 2 bitni qo'shadi."
  },
  {
    "id": "tf-8-4",
    "labNumber": 8,
    "category": "Mantiqiy Elementlar",
    "statement": "To'liq qo'shgich (Full Adder) bitta Half Adder va bitta NOT elementidan yasaladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Full Adder ikkita Half Adder va bitta OR elementidan (ko'chirishlarni birlashtirish uchun) tuziladi."
  },
  {
    "id": "tf-9-1",
    "labNumber": 9,
    "category": "Karnaugh va Bul Algebrasi",
    "statement": "Karnaugh xaritasida qo'shni kataklar orasidagi o'tishda faqat bitta bit o'zgaradi (Gray kodi printsipi).",
    "isTrue": true,
    "explanation": "To'g'ri. Gray kodi ketma-ketligi (00, 01, 11, 10) tufayli har qadamda faqat bir o'zgaruvchi invertlanadi."
  },
  {
    "id": "tf-9-2",
    "labNumber": 9,
    "category": "Karnaugh va Bul Algebrasi",
    "statement": "Karnaugh xaritasida guruhlash faqat 2 ning darajalari (1, 2, 4, 8, 16) miqdoridagi kataklar bo'yicha amalga oshiriladi.",
    "isTrue": true,
    "explanation": "To'g'ri. 3 yoki 5 ta katakni bitta guruh qilib birlashtirish mumkin emas."
  },
  {
    "id": "tf-9-3",
    "labNumber": 9,
    "category": "Karnaugh va Bul Algebrasi",
    "statement": "Karnaugh xaritasining chetki chap va o'ng kataklari bir-biriga tutash (qo'shni) hisoblanmaydi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. K-xarita toroid/silindr sirt kabi o'ralgan bo'lib, chetki chap va o'ng (shuningdek tepa va past) kataklar qo'shnidir."
  },
  {
    "id": "tf-9-4",
    "labNumber": 9,
    "category": "Karnaugh va Bul Algebrasi",
    "statement": "De Morgan qonuniga ko'ra: !(A AND B) = !A OR !B.",
    "isTrue": true,
    "explanation": "To'g'ri. Ko'paytmaning inkori qo'shiluvchilar inkorlarining yig'indisiga teng."
  },
  {
    "id": "tf-9-5",
    "labNumber": 9,
    "category": "Karnaugh va Bul Algebrasi",
    "statement": "A + A * B ifodasi yutish (absorption) qonuniga ko'ra B ga teng bo'ladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Yutish qonuni bo'yicha A + A*B = A*(1 + B) = A bo'ladi."
  },
  {
    "id": "tf-10-1",
    "labNumber": 10,
    "category": "RISC-V Arxitekturasi",
    "statement": "RISC-V RV32I arxitekturasida 32 ta umumiy maqsadli registr mavjud (x0 dan x31 gacha).",
    "isTrue": true,
    "explanation": "To'g'ri. RV32I da x0-x31 registrlar bo'lib, har biri 32 bit sig'imga ega."
  },
  {
    "id": "tf-10-2",
    "labNumber": 10,
    "category": "RISC-V Arxitekturasi",
    "statement": "RV32I da x0 registriga yangi son yozilsa, uning qiymati o'zgaradi va keyingi buyruqlar yangi qiymatni o'qiydi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. x0 doimiy nol (hardwired zero) registri bo'lib, unga har qanday yozish amali e'tiborsiz qoldiriladi va o'qiganda doim 0 qaytadi."
  },
  {
    "id": "tf-10-3",
    "labNumber": 10,
    "category": "RISC-V Arxitekturasi",
    "statement": "RISC arxitekturasi Load-Store modeliga asoslangan, ya'ni arifmetik buyruqlar to'g'ridan-to'g'ri operativ xotira (RAM) bilan ishlamaydi.",
    "isTrue": true,
    "explanation": "To'g'ri. Arifmetik amallar faqat registrlarda bajariladi. Xotira bilan faqat load (lw) va store (sw) ishlaydi."
  },
  {
    "id": "tf-10-4",
    "labNumber": 10,
    "category": "RISC-V Arxitekturasi",
    "statement": "addi x5, x0, 25 buyrug'i bajarilgach, x5 registrining qiymati 25 ga teng bo'ladi.",
    "isTrue": true,
    "explanation": "To'g'ri. x0=0 bo'lgani uchun 0 + 25 = 25 natijasi x5 ga yoziladi."
  },
  {
    "id": "tf-11-1",
    "labNumber": 11,
    "category": "RISC-V Buyruq Formatlari",
    "statement": "RV32I barcha buyruqlari qat'iy ravishda 32-bit (4 bayt) uzunlikka ega.",
    "isTrue": true,
    "explanation": "To'g'ri. RV32I asosiy bazasida barcha buyruqlar so'z (word, 32-bit) chegarasi bo'yicha tekislangan va 4 baytdan iborat."
  },
  {
    "id": "tf-11-2",
    "labNumber": 11,
    "category": "RISC-V Buyruq Formatlari",
    "statement": "lw va sw buyruqlari I-formatdagi buyruqlarga kiradi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. lw buyrug'i I-formatga, ammo sw (Store Word) buyrug'i S-formatga kiradi (chunki uning bevosita qiymati ikki qismga bo'lingan)."
  },
  {
    "id": "tf-11-3",
    "labNumber": 11,
    "category": "RISC-V Buyruq Formatlari",
    "statement": "Shartli o'tish (masalan beq, bne) buyruqlari B-formatda bo'lib, PC-relative (dastur hisoblagichiga nisbiy) adreslashdan foydalanadi.",
    "isTrue": true,
    "explanation": "To'g'ri. B-formatda sakrash manzili joriy PC qiymatiga offset qo'shish orqali hisoblanadi."
  },
  {
    "id": "tf-11-4",
    "labNumber": 11,
    "category": "RISC-V Buyruq Formatlari",
    "statement": "lw t1, 8(t0) buyrug'ida agar t0 = 0x1000 bo'lsa, ma'lumot o'qiladigan samarali manzil 0x1008 bo'ladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Samarali manzil = baza registri + offset = 0x1000 + 8 = 0x1008."
  },
  {
    "id": "tf-12-1",
    "labNumber": 12,
    "category": "Xotira Iyerarxiyasi",
    "statement": "Xotira iyerarxiyasida CPU ga qanchalik yaqinlashilsa, xotira tezligi ortadi, ammo 1 bayt narxi pasayadi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. CPU ga yaqinlashgan sari tezlik oshadi, biroq 1 baytning tannarxi juda qimmatlashadi va hajmi kichrayadi."
  },
  {
    "id": "tf-12-2",
    "labNumber": 12,
    "category": "Xotira Iyerarxiyasi",
    "statement": "Temporal locality (vaqtinchalik lokalizatsiya) hozirgina murojaat qilingan xotira katagiga yaqin orada yana murojaat qilinish ehtimoli yuqoriligini bildiradi.",
    "isTrue": true,
    "explanation": "To'g'ri. Masalan, sikl hisoblagichlari yoki lokal o'zgaruvchilarga qisqa vaqt ichida takroran murojaat qilinadi."
  },
  {
    "id": "tf-12-3",
    "labNumber": 12,
    "category": "Xotira Iyerarxiyasi",
    "statement": "L1 kesh xotirasi CPU kristalidan tashqarida joylashgan bo'lib, DDR5 RAM dan sekinroq ishlaydi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. L1 kesh to'g'ridan-to'g'ri protsessor yadrosi ichida joylashgan bo'lib, eng tezkor (1-4 takt) kesh hisoblanadi."
  },
  {
    "id": "tf-12-4",
    "labNumber": 12,
    "category": "Xotira Iyerarxiyasi",
    "statement": "Keshda ma'lumot topilishi Hit (muvaffaqiyat), topilmasdan quyi bosqichga murojaat qilish Miss (o'tkazib yuborish) deyiladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Hit rate qanchalik yuqori bo'lsa, o'rtacha murojaat vaqti (EAT) shunchalik qisqaradi."
  },
  {
    "id": "tf-13-1",
    "labNumber": 13,
    "category": "Ichki va Tashqi Xotira",
    "statement": "SRAM dinamik qayta zaryadlashni (refresh) talab qilmaydi, shu sababli DRAM ga qaraganda ancha tez ishlaydi.",
    "isTrue": true,
    "explanation": "To'g'ri. SRAM triggerlardan tashkil topgan bo'lib, kondensatorsiz ishlaydi va regeneratsiya talab qilmaydi."
  },
  {
    "id": "tf-13-2",
    "labNumber": 13,
    "category": "Ichki va Tashqi Xotira",
    "statement": "HDD qattiq diskida faylga tasodifiy murojaat vaqti SSD ga qaraganda tezroq bo'ladi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. HDD mexanik boshcha harakati (seek time) va disk aylanishini (rotational latency) kutadi (bir necha millisekund), SSD esa elektron ishlaydi (mikrosekundlar)."
  },
  {
    "id": "tf-13-3",
    "labNumber": 13,
    "category": "Ichki va Tashqi Xotira",
    "statement": "NVMe SSD drayverlari SATA III drayverlariga qaraganda ancha yuqori o'tkazish qobiliyatiga ega (PCIe shinasidan foydalanadi).",
    "isTrue": true,
    "explanation": "To'g'ri. SATA III maksimal 600 MB/s gacha bersa, PCIe 4.0/5.0 NVMe SSD lar 7000–14000 MB/s tezlikda ishlaydi."
  },
  {
    "id": "tf-13-4",
    "labNumber": 13,
    "category": "Ichki va Tashqi Xotira",
    "statement": "SLC (Single-Level Cell) flesh xotira QLC ga qaraganda kamroq yozish resursiga (TBW) ega.",
    "isTrue": false,
    "explanation": "Noto'g'ri. SLC bitta katakda faqat 1 bit saqlaydi va eng yuqori chidamlilikka (100 000 gacha sikl) ega. QLC esa eng past resursga ega."
  },
  {
    "id": "tf-14-1",
    "labNumber": 14,
    "category": "Kesh va Virtual Xotira",
    "statement": "Direct-Mapped keshda har bir xotira bloki keshning aniq bir qatoriga (Index bo'yicha) joylashtiriladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Direct Mapped keshda kesh qatori = Blok manzili mod Kesh qatorlari soni."
  },
  {
    "id": "tf-14-2",
    "labNumber": 14,
    "category": "Kesh va Virtual Xotira",
    "statement": "Write-Through strategiyasida ma'lumot keshga yozilishi bilan bir vaqtda asosiy operativ xotiraga ham yoziladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Bu xotira va kesh izchilligini ta'minlaydi, ammo yozish amallarini biroz sekinlashtiradi."
  },
  {
    "id": "tf-14-3",
    "labNumber": 14,
    "category": "Kesh va Virtual Xotira",
    "statement": "TLB (Translation Lookaside Buffer) sahifa manzillarini tezkor tarjima qilish uchun mo'ljallangan ixtisoslashgan keshdir.",
    "isTrue": true,
    "explanation": "To'g'ri. TLB virtual sahifa raqamini (VPN) fizik kadr raqamiga (PFN) aylantirishni tezlashtiradi."
  },
  {
    "id": "tf-14-4",
    "labNumber": 14,
    "category": "Kesh va Virtual Xotira",
    "statement": "Hard Page Fault sodir bo'lganda so'ralgan sahifa operativ xotiradan emas, balki qattiq disk / SSD (swap/pagefile) dan o'qiladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Sahifa RAM da umuman yo'q bo'lsa, qattiq diskdan o'qish (Hard Fault) kerak bo'lib, katta kechikish keltirib chiqaradi."
  },
  {
    "id": "tf-14-5",
    "labNumber": 14,
    "category": "Kesh va Virtual Xotira",
    "statement": "Write-Back keshda dirty bit (ifloslanish biti) blokka ma'lumot yozilganligini va u asosiy RAM ga hali saqlanmaganini bildiradi.",
    "isTrue": true,
    "explanation": "To'g'ri. Blok keshdan chiqarib yuborilayotganda (eviction) agar dirty bit 1 bo'lsa, u RAM ga saqlanadi."
  },
  {
    "id": "tf-15-1",
    "labNumber": 15,
    "category": "RAID Texnologiyalari",
    "statement": "RAID 0 massivida bitta disk ishdan chiqsa, barcha ma'lumotlar saqlanib qoladi va tizim normal ishlayveradi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. RAID 0 faqat tezlik uchun chiziqli taqsimlaydi (striping) va ortiqchalikka (redundancy) ega emas. Bitta disk ketsa, butun massiv yo'qotiladi."
  },
  {
    "id": "tf-15-2",
    "labNumber": 15,
    "category": "RAID Texnologiyalari",
    "statement": "RAID 1 massivi ma'lumotlarni ko'zguli nusxalaydi (mirroring) va 2 ta diskdan bittasi ishdan chiqishiga bardosh beradi.",
    "isTrue": true,
    "explanation": "To'g'ri. RAID 1 da ikkala diskda bir xil ma'lumot saqlanadi, shuning uchun foydali sig'im umumiy hajmning 50% ini tashkil qiladi."
  },
  {
    "id": "tf-15-3",
    "labNumber": 15,
    "category": "RAID Texnologiyalari",
    "statement": "RAID 5 massivini qurish uchun kamida 2 ta disk talab qilinadi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. RAID 5 taqsimlangan paritet bilan ishlashi uchun minimal disklar soni 3 ta bo'lishi shart."
  },
  {
    "id": "tf-15-4",
    "labNumber": 15,
    "category": "RAID Texnologiyalari",
    "statement": "RAID 6 massivi bir vaqtning o'zida ikkita diskning ishdan chiqishiga bardosh bera oladi.",
    "isTrue": true,
    "explanation": "To'g'ri. RAID 6 ikkita mustaqil paritet blokidan (P va Q) foydalanadi va 2 ta disk buzilsa ham ma'lumot yo'qolmaydi."
  },
  {
    "id": "tf-15-5",
    "labNumber": 15,
    "category": "RAID Texnologiyalari",
    "statement": "RAID massivi to'liq zaxira nusxalash (Backup) o'rnini to'liq bosa oladi, shuning uchun alohida backup shart emas.",
    "isTrue": false,
    "explanation": "Noto'g'ri. RAID apparat nosozligidan himoya qiladi, lekin tasodifiy o'chirish, viruslar yoki tizim buzilishidan saqlamaydi. 3-2-1 backup qoidasi doim zarur."
  },
  {
    "id": "tf-16-1",
    "labNumber": 16,
    "category": "Shinalar va PCIe/CXL",
    "statement": "PCI Express (PCIe) shinasida ma'lumotlar parallel emas, balki yuqori tezlikdagi nuqtadan-nuqtaga ketma-ket (serial) liniyalar orqali uzatiladi.",
    "isTrue": true,
    "explanation": "To'g'ri. Eski parallel PCI dan farqli ravishda, PCIe ketma-ket differensial liniyalar (lanes) bo'yicha ishlaydi."
  },
  {
    "id": "tf-16-2",
    "labNumber": 16,
    "category": "Shinalar va PCIe/CXL",
    "statement": "PCIe 4.0 interfeysi bitta liniyada (x1) soniyasiga 16 GT/s tezlikda ma'lumot almashadi.",
    "isTrue": true,
    "explanation": "To'g'ri. PCIe 3.0 = 8 GT/s, PCIe 4.0 = 16 GT/s, PCIe 5.0 = 32 GT/s, PCIe 6.0 = 64 GT/s."
  },
  {
    "id": "tf-16-3",
    "labNumber": 16,
    "category": "Shinalar va PCIe/CXL",
    "statement": "PCIe x16 mexanik slotiga o'rnatilgan har qanday karta avtomatik ravishda to'liq 16 ta elektr liniyada ishlaydi.",
    "isTrue": false,
    "explanation": "Noto'g'ri. Slot mexanik jihatdan x16 bo'lsa ham, ona plata yoki protsessor liniyalari cheklovi sabab elektr jihatdan x8 yoki x4 rejimda ishlashi mumkin."
  },
  {
    "id": "tf-16-4",
    "labNumber": 16,
    "category": "Shinalar va PCIe/CXL",
    "statement": "CXL (Compute Express Link) texnologiyasi CPU, GPU va maxsus tezlatgichlar o'rtasida kesh kogerentligini ta'minlaydi.",
    "isTrue": true,
    "explanation": "To'g'ri. CXL PCIe fizik qatlamida ishlab, umumiy xotira maydoni va past kechikishli kesh kogerentligini beradi."
  },
  {
    "id": "tf-16-5",
    "labNumber": 16,
    "category": "Shinalar va PCIe/CXL",
    "statement": "PCIe 6.0 va 7.0 da NRZ o'rniga ko'p sathli PAM4 modulyatsiyasi va FLIT paketlashidan foydalaniladi.",
    "isTrue": true,
    "explanation": "To'g'ri. PAM4 har bir taktda 2 bit uzatish imkonini beradi va xatolarni tuzatish uchun FEC/FLIT bilan birga keladi."
  }
];
