// 14 ta Amaliy Mashg‘ulot bo‘yicha 140+ Nazorat Savollari va Imtihonga Tayyor Javoblar
// docs/*.docx fayllari asosida 100% to‘liq shakllantirilgan

export interface ControlQuestionItem {
  id: string;
  labId: number;
  labTitle: string;
  questionNumber: number;
  question: string;
  answer: string;
  keyPoints?: string[];
}

export const CONTROL_QUESTIONS_DATA: ControlQuestionItem[] = [
  {
    "id": "cq_2_1",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Ichki va tashqi qurilmalar qanday farqlanadi?",
    "answer": "Ichki qurilmalar tizim bloki (korpus) ichida joylashib, ona plataga bevosita yoki ichki shinalar (PCIe, M.2) orqali ulanadi va kompyuterning ishlashi uchun asosiy arxitektura hisoblanadi (CPU, RAM, GPU, ichki SSD/HDD). Tashqi qurilmalar esa korpus tashqarisida bo‘lib, tashqi interfeyslar (USB, HDMI, audio) orqali ulanadi (klaviatura, sichqoncha, monitor, printer).",
    "keyPoints": [
      "Ichki: tizimli, korpus ichida (CPU, RAM, ichki SSD)",
      "Tashqi: periferiya, tashqi portlar orqali ulanadi (Monitor, Printer)"
    ]
  },
  {
    "id": "cq_2_2",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Asosiy va qo‘shimcha qurilma tushunchalari nimani bildiradi?",
    "answer": "Asosiy qurilmalar — kompyuterning ishga tushishi va foydalanuvchi minimal ishlay olishi uchun zarur bo‘lgan qurilmalar (tizim bloki, monitor, klaviatura). Qo‘shimcha qurilmalar esa asosiy tizim imkoniyatlarini kengaytirish va maxsus vazifalarni bajarish uchun xizmat qiladi (printer, skaner, veb-kamera, tashqi xotira).",
    "keyPoints": [
      "Asosiy: minimal tizim uchun shart",
      "Qo‘shimcha: qulaylik va ixtisoslashgan vazifalar uchun"
    ]
  },
  {
    "id": "cq_2_3",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Kiritish qurilmalariga misollar keltiring.",
    "answer": "Inson yoki tashqi muhitdan axborotni raqamli ko‘rinishga aylantirib kompyuterga kirituvchi qurilmalar: Klaviatura (matn va buyruqlar), Sichqoncha (ko‘rsatkich boshqaruvi), Skaner (qog‘oz tasvirlarini raqamlashtirish), Mikrofon (tovush signali), Veb-kamera (video oqim), Shtrix-kod skaneri va Grafik planshet.",
    "keyPoints": [
      "Matnli: klaviatura",
      "Grafik/ko‘rsatkich: sichqoncha, skaner",
      "Audio/video: mikrofon, veb-kamera"
    ]
  },
  {
    "id": "cq_2_4",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Chiqarish qurilmalarining vazifasi nimadan iborat?",
    "answer": "Kompyuter xotirasida qayta ishlangan ikkilik axborotni inson qabul qila oladigan vizual, audio yoki qog‘oz ko‘rinishida tashqi muhitga taqdim etish. Misollar: Monitor (ekrandagi tasvir), Printer (qog‘ozdagi matn va chizma), Akustik kolonka va quloqchin (ovoz), Proyektor (katta ekranga tasvir), Plotter (katta formatli chizmalar).",
    "keyPoints": [
      "Vazifasi: raqamli axborotni inson tushunadigan shaklga o‘girish",
      "Turlari: Vizual, Bosma, Ovozli"
    ]
  },
  {
    "id": "cq_2_5",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Kiritish-chiqarish qurilmasiga misol keltiring va izohlang.",
    "answer": "Ikkala yo‘nalishda ham ma’lumot almashuvchi qurilmalar: 1) Sensorli ekran (Touchscreen) — tasvirni chiqaradi va teginish koordinatalarini kiritadi; 2) Tashqi saqlash qurilmalari (USB fleshka, tashqi SSD) — ma’lumot yoziladi va o‘qiladi; 3) Tarmoq kartasi (NIC) — paketlarni uzatadi va qabul qiladi; 4) VR garnitura.",
    "keyPoints": [
      "Sensorli ekran (kiritish + chiqarish)",
      "Tashqi drayverlar (o‘qish + yozish)",
      "Tarmoq adapterlari"
    ]
  },
  {
    "id": "cq_2_6",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Printer va skanerning ma’lumot oqimidagi farqi nimada?",
    "answer": "Printer — axborotni kompyuterdan tashqi muhitga (qog‘ozga) uzatuvchi CHIQARISH qurilmasi. Skaner esa qog‘ozdagi hujjat yoki tasvirni optik datchiklar orqali raqamlashtirib kompyuterga yo‘naltiruvchi KIRITISH qurilmasi. Ular ma’lumot oqimi yo‘nalishi bo‘yicha bir-biriga qarama-qarshi ishlaydi.",
    "keyPoints": [
      "Printer: Kompyuter → Qog‘oz (Chiqarish)",
      "Skaner: Qog‘oz → Kompyuter (Kiritish)"
    ]
  },
  {
    "id": "cq_2_7",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Tashqi SSD va ichki SSD qaysi jihatdan bir xil va qaysi jihatdan farq qiladi?",
    "answer": "O‘xshashligi: Ikkalasi ham flesh-xotira (NAND flash) texnologiyasiga asoslangan, mexanik harakatlanuvchi qismlarsiz ishlaydi. Farqi: Ichki SSD to‘g‘ridan-to‘g‘ri ona plataga (M.2 NVMe PCIe yoki SATA) ulanib, 3500-14000 MB/s tezlik va minimal kechikish beradi; Tashqi SSD esa USB interfeysi orqali ulanadi, port tezligi (500-2000 MB/s) bilan cheklanadi, ammo portativ va harakatchan.",
    "keyPoints": [
      "O‘xshashlik: Ikkalasi ham NAND flesh saqlash",
      "Farq: Ichki (PCIe shinasida, 7000+ MB/s), Tashqi (USB shinasida, portativ)"
    ]
  },
  {
    "id": "cq_2_8",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Qurilma tanlashda foydalanuvchi vazifasi nima uchun hisobga olinadi?",
    "answer": "Har xil foydalanuvchi vazifalari mutlaqo turlicha resurslarni talab qiladi: masalan, ofis ishlariga kuchli GPU kerak emas, arzon CPU va 8GB RAM yetarli; 3D dizayn va render uchun esa kuchli GPU va 32GB+ RAM shart. Vazifani hisobga olmaslik byudjetning isrof bo‘lishiga yoki kompyuterning qotib ishlashiga olib keladi.",
    "keyPoints": [
      "Byudjetni optimal sarflash",
      "Bottleneck xatolaridan saqlanish",
      "Yetarli unumdorlikni ta’minlash"
    ]
  },
  {
    "id": "cq_2_9",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "GPU qaysi vazifalarda muhim ahamiyatga ega?",
    "answer": "GPU (Grafik protsessor) minglab kichik yadrolardan tashkil topgan bo‘lib, ommaviy parallel hisoblashlarda muhim: 1) 3D grafikani renderlash va o‘yinlar; 2) Video montaj va rang korreksiyasi; 3) Mashinaviy o‘rganish va Sun’iy intellekt (neyrotarmoqlar); 4) Ilmiy simulyatsiyalar.",
    "keyPoints": [
      "Parallel hisoblashlar",
      "3D render va o‘yinlar",
      "Sun’iy intellekt va video qayta ishlash"
    ]
  },
  {
    "id": "cq_2_10",
    "labId": 2,
    "labTitle": "2-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Noutbukda qaysi qurilmalar bitta korpusga birlashtirilgan?",
    "answer": "Noutbukda ixchamlik uchun bir korpusga birlashtirilgan: Monitor (matritsa), Klaviatura, Touchpad (sichqoncha o‘rnida), Akkumulyator batareyasi, Veb-kamera, Mikrofon, Stereo dinamiklar, Wi-Fi/Bluetooth antennalari hamda Ona plata (CPU, RAM, SSD bilan).",
    "keyPoints": [
      "Ekran, klaviatura, touchpad, akkumulyator bitta korpusda",
      "To‘liq avtonom va ko‘chma arxitektura"
    ]
  },
  {
    "id": "cq_4_1",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Sanoq tizimi nima?",
    "answer": "Sanoq tizimi — sonlarni ma’lum belgilar (raqamlar) to‘plami yordamida yozish va ifodalash qoidalari majmuasi. Asosiy turlari: pozitsion (raqam qiymati egallagan o‘rniga bog‘liq) va nopozitsion (o‘rniga bog‘liq emas, masalan, Rim raqamlari).",
    "keyPoints": [
      "Sonlarni belgilar bilan yozish usuli",
      "Pozitsion va nopozitsion turlari"
    ]
  },
  {
    "id": "cq_4_2",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Pozitsion sanoq tizimining asosiy xususiyati nimada?",
    "answer": "Pozitsion sanoq tizimida har bir raqamning son ifodasidagi qiymati uning turgan o‘rniga (razryadiga) bevosita bog‘liq. Razryad og‘irligi asosning darajasi (b^i) ko‘rinishida o‘ngdan chapga qarab o‘sib boradi.",
    "keyPoints": [
      "Raqam qiymati pozitsiyasiga bog‘liq",
      "O‘ngdan chapga asos darajasi bo‘yicha ortadi"
    ]
  },
  {
    "id": "cq_4_3",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Ikkilik sanoq tizimida qaysi raqamlar ishlatiladi?",
    "answer": "Ikkilik sanoq tizimida faqat ikkita raqam ishlatiladi: 0 va 1. Uning asosi 2 ga teng.",
    "keyPoints": [
      "Faqat 0 va 1",
      "Asosi = 2"
    ]
  },
  {
    "id": "cq_4_4",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "O‘n oltilik tizimda A–F belgilarining qiymati qanday?",
    "answer": "O‘n oltilik tizimda 10 dan 15 gacha bo‘lgan sonlar lotin harflari bilan belgilanadi: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.",
    "keyPoints": [
      "A=10, B=11, C=12",
      "D=13, E=14, F=15"
    ]
  },
  {
    "id": "cq_4_5",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Razryad og‘irligi deganda nima tushuniladi?",
    "answer": "Razryad og‘irligi — raqam turgan pozitsiyaning son umumiy qiymatiga qo‘shadigan ulushi. U asosning razryad indeksiga mos darajasiga teng: b^i. Masalan, o‘nlikda 10^0, 10^1, 10^2... Ikkilikda 2^0=1, 2^1=2, 2^2=4, 2^3=8...",
    "keyPoints": [
      "Pozitsiyaning son qiymatidagi ulushi",
      "Formula: b^i"
    ]
  },
  {
    "id": "cq_4_6",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Bit va bayt qanday farqlanadi?",
    "answer": "Bit — kompyuterda axborotning eng kichik o‘lchov birligi bo‘lib, faqat 0 yoki 1 qiymatni oladi. Bayt — 8 ta bitdan iborat guruh bo‘lib, bitta belgini (harf, belgi) kodlash uchun xizmat qiladi (1 Bayt = 8 Bit).",
    "keyPoints": [
      "Bit: eng kichik (0 yoki 1)",
      "Bayt: 8 ta bitdan iborat paket"
    ]
  },
  {
    "id": "cq_4_7",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Nima uchun kompyuterda ikkilik sanoq tizimi qulay?",
    "answer": "Elektronikada faqat ikkita barqaror fizik holatni (kuchlanish bor/yo‘q, ochiq/yopiq kalit) amalga oshirish juda oson, ishonchli va shovqinga chidamli. Ikki sathli mantiq elementlari (tranzistorlar) arzon va sodda ishlab chiqariladi.",
    "keyPoints": [
      "Ikki holatli barqarorlik (tok bor / yo‘q)",
      "Texnik jihatdan sodda va shovqinga chidamli"
    ]
  },
  {
    "id": "cq_4_8",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "8 bit bilan nechta kombinatsiya hosil qilinadi?",
    "answer": "8 ta bit yordamida jami 2^8 = 256 ta turli kombinatsiya (0 dan 255 gacha bo‘lgan ishorasiz sonlar) hosil qilinadi.",
    "keyPoints": [
      "2^8 = 256 ta kombinatsiya",
      "Oraliq: 0..255"
    ]
  },
  {
    "id": "cq_4_9",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "O‘n oltilik sanoq tizimining kompyuter texnikasidagi afzalligi nimada?",
    "answer": "O‘n oltilik tizim uzun ikkilik kodlarni juda ixcham va qisqa yozish imkonini beradi: aynan 4 ta ikkilik bit (tetrada) 1 ta o‘n oltilik raqamga teng bo‘ladi. Masalan, 11111111₂ o‘rniga FF₁₆ deb yozish qulay va xatolar kamayadi.",
    "keyPoints": [
      "Uzun bitlarni ixcham yozish",
      "Har 4 bit = 1 ta Hex raqam (tetrada)"
    ]
  },
  {
    "id": "cq_4_10",
    "labId": 4,
    "labTitle": "4-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "1011₂ sonini razryadlar orqali qanday tahlil qilish mumkin?",
    "answer": "1011₂ soni razryadlar bo‘yicha: (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = 11₁₀.",
    "keyPoints": [
      "1*8 + 0*4 + 1*2 + 1*1 = 11₁₀"
    ]
  },
  {
    "id": "cq_5_1",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "O‘nlikdan ikkilikka o‘tkazishda nima sababdan 2 ga bo‘linadi?",
    "answer": "Chunki ikkilik sanoq tizimining asosi 2 ga teng. O‘nlik sonni yangi sanoq tizimining asosiga ketma-ket bo‘lish orqali yangi tizimning har bir razryad qoldig‘i ajratib olinadi.",
    "keyPoints": [
      "Ikkilik tizim asosi 2 bo‘lgani uchun",
      "Har bo‘lishda bitta razryad qoldig‘i ajraladi"
    ]
  },
  {
    "id": "cq_5_2",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Qoldiqlar qanday tartibda o‘qiladi?",
    "answer": "Qoldiqlar oxirgi natijadan boshlab birinchisiga qarab, ya’ni PASTKASIDAN YUQORISIGA (teskari tartibda) o‘qiladi. Oxirgi qoldiq eng yuqori (chapdagi) razryad (MSB) bo‘ladi.",
    "keyPoints": [
      "Pastdan yuqoriga (teskari tartibda)",
      "Oxirgi qoldiq — yuqori razryad (MSB)"
    ]
  },
  {
    "id": "cq_5_3",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Ikkilikdan o‘nlikka o‘tkazishda qaysi usul qo‘llanadi?",
    "answer": "Razryadlar og‘irligi bo‘yicha yoyish usuli: har bir ikkilik raqam o‘zining pozitsiya og‘irligiga (2^i) ko‘paytirilib, natijalar o‘zaro qo‘shib chiqiladi.",
    "keyPoints": [
      "Ko‘p xadli yoyilma: Σ(d_i * 2^i)",
      "Har bir bitni o‘z 2^i vazniga ko‘paytirish"
    ]
  },
  {
    "id": "cq_5_4",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "2-likdan 8-likka o‘tkazishda necha bitdan guruhlanadi?",
    "answer": "Har 3 ta ikkilik bit (triada) guruhlanadi, chunki 2³ = 8. Guruhlarni ajratish butun sonlarda o‘ngdan chapga qarab bajariladi.",
    "keyPoints": [
      "3 bitdan (triada)",
      "Chunki 2³ = 8"
    ]
  },
  {
    "id": "cq_5_5",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "2-likdan 16-likka o‘tkazishda necha bitdan guruhlanadi?",
    "answer": "Har 4 ta ikkilik bit (tetrada yoki nibble) guruhlanadi, chunki 2⁴ = 16. Guruhlash o‘ngdan chapga qarab amalga oshiriladi.",
    "keyPoints": [
      "4 bitdan (tetrada)",
      "Chunki 2⁴ = 16"
    ]
  },
  {
    "id": "cq_5_6",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Sakkizlik raqamni ikkilikka o‘tkazish uchun nechta bit yetarli?",
    "answer": "Sakkizlik raqamni (0 dan 7 gacha) ikkilikka o‘tkazish uchun aynan 3 ta bit (triada) yetarli bo‘ladi (masalan, 7₈ = 111₂).",
    "keyPoints": [
      "Aynan 3 ta bit",
      "Oraliq: 000₂ dan 111₂ gacha"
    ]
  },
  {
    "id": "cq_5_7",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "O‘n oltilik belgini ikkilikka o‘tkazish uchun nechta bit kerak?",
    "answer": "O‘n oltilik belgini (0 dan F gacha) ikkilikka o‘tkazish uchun aynan 4 ta bit (tetrada) kerak bo‘ladi (masalan, F₁₆ = 1111₂).",
    "keyPoints": [
      "Aynan 4 ta bit",
      "Oraliq: 0000₂ dan 1111₂ gacha"
    ]
  },
  {
    "id": "cq_5_8",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "A–F belgilarining o‘nlik qiymatlari qanday?",
    "answer": "A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.",
    "keyPoints": [
      "A=10, B=11, C=12, D=13, E=14, F=15"
    ]
  },
  {
    "id": "cq_5_9",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Nima sababdan 2↔8 va 2↔16 o‘tkazishlari qulay?",
    "answer": "Chunki 8 va 16 sonlari 2 ning to‘g‘ridan-to‘g‘ri darajalaridir (2³ = 8, 2⁴ = 16). Bu murakkab ko‘paytirish yoki bo‘lish amallarini bajarmasdan, shunchaki 3 va 4 bitli bloklarni to‘g‘ridan-to‘g‘ri almashtirish orqali o‘tish imkonini beradi.",
    "keyPoints": [
      "2 ning karrali darajalari (2³ va 2⁴)",
      "Bo‘lishsiz, to‘g‘ridan-to‘g‘ri bloklarni almashtirish"
    ]
  },
  {
    "id": "cq_5_10",
    "labId": 5,
    "labTitle": "5-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Windows Calculator ning Programmer rejimi qanday vazifada yordam beradi?",
    "answer": "Programmer rejimi DEC, BIN, OCT va HEX sanoq tizimlari o‘rtasida sonlarni bir zumda sinxron ko‘rsatadi, bitli amallar (AND, OR, XOR, NOT, shift) va razryad o‘lchamlarini (Byte, Word, Dword, Qword) amaliy tekshirishda katta yordam beradi.",
    "keyPoints": [
      "DEC/BIN/OCT/HEX jonli sinxronizatsiya",
      "Bit amallari va Word o‘lchamlari"
    ]
  },
  {
    "id": "cq_6_1",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Ikkilik tizimda 1+1 natijasi nima?",
    "answer": "Ikkilik tizimda 1 + 1 natijasi 10₂ (o‘nlikda 2) ga teng bo‘ladi. Joriy razryadga 0 yoziladi va yuqori razryadga 1 ko‘chirish (Carry = 1) hosil bo‘ladi.",
    "keyPoints": [
      "Natija: 10₂",
      "Joriy razryad = 0, Carry = 1"
    ]
  },
  {
    "id": "cq_6_2",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Carry (ko‘chirish) nima?",
    "answer": "Carry (ko‘chirish) — joriy razryaddagi yig‘indi sanoq tizimi asosiga (ikkilikda 2 ga) yetganda yoki oshganda keyingi yuqori razryadga qo‘shiladigan 1 birlik.",
    "keyPoints": [
      "Yuqori razryadga uzatiladigan 1 birlik",
      "Yig‘indi asosdan oshganda hosil bo‘ladi"
    ]
  },
  {
    "id": "cq_6_3",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "0–1 amalida qarz olish qanday bajariladi?",
    "answer": "0 dan 1 ni ayirib bo‘lmagani uchun chapdagi qo‘shni yuqori razryaddan 1 birlik qarz olinadi. Olingan qarz joriy razryadga asos qiymatini (+2) olib keladi: 2 - 1 = 1 natija hosil bo‘ladi.",
    "keyPoints": [
      "Chapdagi razryaddan 1 qarz olinadi",
      "Qarz qiymati 2 bo‘lib keladi, natija 1"
    ]
  },
  {
    "id": "cq_6_4",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Ikkilik ko‘paytirishning asosiy qoidalari qanday?",
    "answer": "Ikkilik ko‘paytirish o‘nlikdagi kabi, lekin faqat 0 va 1 bilan: 0 × 0 = 0, 0 × 1 = 0, 1 × 0 = 0, 1 × 1 = 1. Aslida ko‘paytirish bu siljitish (shift) va qo‘shish amallari ketma-ketligidir.",
    "keyPoints": [
      "Faqat 1x1=1, qolgan barchasi 0",
      "Siljitish va qo‘shish orqali bajariladi"
    ]
  },
  {
    "id": "cq_6_5",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Sakkizlik tizimda 7+1 natijasi qanday yoziladi?",
    "answer": "Sakkizlik tizimda 7 + 1 = 10₈ (chunki 8 yo‘q, 7 dan keyin yangi razryad boshlanadi, o‘nlikdagi 8 ga teng).",
    "keyPoints": [
      "10₈",
      "Asos 8 ga yetgani uchun yangi razryad"
    ]
  },
  {
    "id": "cq_6_6",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "O‘n oltilik tizimda F+1 natijasi qanday yoziladi?",
    "answer": "O‘n oltilik tizimda F + 1 = 10₁₆ (chunki 15 + 1 = 16, o‘n oltilikda 16 soni 10₁₆ deb yoziladi).",
    "keyPoints": [
      "10₁₆",
      "15 + 1 = 16₁₀ = 10₁₆"
    ]
  },
  {
    "id": "cq_6_7",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Overflow nima?",
    "answer": "Overflow (To‘lib ketish) — arifmetik amal natijasi ajratilgan apparat razryadlar sig‘imiga (masalan, 8 bit) sig‘may qolib, natijaning noto‘g‘ri bo‘lib qolishi (masalan, 8-bitda 200 + 100 = 300 > 255).",
    "keyPoints": [
      "Natijaning razryad to‘riga sig‘may qolishi",
      "Apparat darajasida noto‘g‘ri natija hosil bo‘lishi"
    ]
  },
  {
    "id": "cq_6_8",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "4 bitli unsigned sonlarning qiymat oralig‘i qanday?",
    "answer": "4 bitli ishorasiz (unsigned) sonlar oralig‘i 0 dan 2⁴ - 1 gacha, ya’ni 0 dan 15 gacha bo‘ladi.",
    "keyPoints": [
      "0 dan 15 gacha (2⁴ - 1)"
    ]
  },
  {
    "id": "cq_6_9",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Yarim qo‘shgichda SUM va CARRY qaysi mantiqiy amallar orqali hosil qilinadi?",
    "answer": "Yarim qo‘shgichda (Half Adder): Yig‘indi (SUM) = A XOR B; Ko‘chirish (CARRY) = A AND B mantiqiy amallari orqali hosil qilinadi.",
    "keyPoints": [
      "SUM = A ⊕ B (XOR)",
      "CARRY = A · B (AND)"
    ]
  },
  {
    "id": "cq_6_10",
    "labId": 6,
    "labTitle": "6-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Arifmetik natijani boshqa sanoq tizimida tekshirish nima uchun foydali?",
    "answer": "Ikkilikdagi hisob-kitoblarni o‘nlik yoki o‘n oltilikda tekshirish inson ko‘zi bilan xatolarni darhol payqash, carry/borrow amallarining to‘g‘riligini tasdiqlash uchun juda qulay.",
    "keyPoints": [
      "Xatolarni tezkor aniqlash",
      "Hisob-kitob ishonchliligini tasdiqlash"
    ]
  },
  {
    "id": "cq_7_1",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Raqamli signal nima?",
    "answer": "Raqamli signal — vaqt bo‘yicha va qiymat bo‘yicha diskretlashgan, faqat cheklangan miqdordagi aniq sathlarni (odatda 0 va 1) qabul qiluvchi elektr signali.",
    "keyPoints": [
      "Faqat aniq sathlar (0 va 1)",
      "Diskret elektr signali"
    ]
  },
  {
    "id": "cq_7_2",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Analog va raqamli signalning asosiy farqi nimada?",
    "answer": "Analog signal vaqt bo‘yicha uzluksiz bo‘lib, cheksiz ko‘p oraliq qiymatlarni qabul qiladi va shovqinga sezgir. Raqamli signal esa faqat 2 ta aniq sathni (0 va 1) qabul qiladi, shovqinga juda chidamli va oson qayta ishlanadi.",
    "keyPoints": [
      "Analog: uzluksiz, shovqinga sezgir",
      "Raqamli: diskret (0 va 1), shovqinga chidamli"
    ]
  },
  {
    "id": "cq_7_3",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Mantiqiy 0 va mantiqiy 1 nima anglatadi?",
    "answer": "Mantiqiy 0 va 1 — ma’lumotning ikkita muqobil holati: Mantiqiy 0 = Yolg‘on (False), LOW sath; Mantiqiy 1 = Rost (True), HIGH sath.",
    "keyPoints": [
      "0 = Yolg‘on / LOW",
      "1 = Rost / HIGH"
    ]
  },
  {
    "id": "cq_7_4",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Nima uchun mantiqiy sathlarning volt qiymatlari barcha qurilmalarda bir xil emas?",
    "answer": "Chunki turli mantiqiy oilalar va mikrosxemalar turlicha ta’minot kuchlanishlarida ishlaydi (masalan, TTL: 5V, zamonaviy CMOS: 3.3V, 1.8V, 1.2V). Muhimi aniq volt emas, balki kuchlanishning chegara oralig‘idan past yoki yuqoriligidir.",
    "keyPoints": [
      "Mantiqiy oilalarning texnologik farqlari (TTL, CMOS)",
      "Energiya tejash va chastota talablari"
    ]
  },
  {
    "id": "cq_7_5",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Kombinatsion sxema deganda nima tushuniladi?",
    "answer": "Kombinatsion sxema — chiqish signallari faqat ayni paytdagi kirish signallarining qiymatiga bog‘liq bo‘lgan, ichki xotira elementlariga ega bo‘lmagan sxema (masalan, adder, multiplexer, decoder).",
    "keyPoints": [
      "Faqat ayni paytdagi kirishlarga bog‘liq",
      "Xotirasi yo‘q (oldingi holatni eslamaydi)"
    ]
  },
  {
    "id": "cq_7_6",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Ketma-ket sxema kombinatsion sxemadan qanday farq qiladi?",
    "answer": "Ketma-ket (sequential) sxema o‘z tarkibida xotira elementlariga (trigger, registr) ega bo‘lib, uning chiqishi nafaqat joriy kirishlarga, balki sxemaning oldingi holatiga ham bog‘liq bo‘ladi.",
    "keyPoints": [
      "Ichki xotiraga ega",
      "Chiqish = joriy kirish + oldingi holat"
    ]
  },
  {
    "id": "cq_7_7",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Registr qaysi turdagi raqamli qurilmaga kiradi?",
    "answer": "Registr — KETMA-KET (sequential) raqamli qurilmalar turiga kiradi, chunki u triggerlar asosida qurilgan va bitlarni saqlab turish xotirasiga ega.",
    "keyPoints": [
      "Ketma-ket (sequential) qurilma",
      "Triggerlar asosidagi xotira"
    ]
  },
  {
    "id": "cq_7_8",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Raqamli tizimda xotira nima uchun kerak?",
    "answer": "Kompyuter oraliq hisoblash natijalarini, dastur buyruqlarini va o‘zgaruvchilarni taktlar orasida saqlab turishi, ma’lumotlarni uzatishni sinxronlashtirishi uchun xotira shart.",
    "keyPoints": [
      "Oraliq natijalarni saqlash",
      "Taktlararo sinxronizatsiya"
    ]
  },
  {
    "id": "cq_7_9",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Kirish va chiqish signallari kompyuter tizimida qanday rol o‘ynaydi?",
    "answer": "Kirish signallari tashqi muhitdan yoki boshqa bloklardan boshqaruv va ma’lumotlarni olib kiradi; Chiqish signallari esa hisoblash natijasini keyingi bloklarga yoki periferiyaga uzatadi.",
    "keyPoints": [
      "Kirish: ma’lumot va buyruq qabul qilish",
      "Chiqish: natijani keyingi bosqichga uzatish"
    ]
  },
  {
    "id": "cq_7_10",
    "labId": 7,
    "labTitle": "7-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Raqamli mantiqni o‘rganish protsessor arxitekturasini tushunishga qanday yordam beradi?",
    "answer": "Protsessor millionlab mantiqiy elementlar (AND, OR, NOT), arifmetik bloklar (ALU), trigger va registrlardan iborat. Raqamli mantiqni bilish CPU ning taktma-takt qanday ishlashini tushunishning yagona yo‘lidir.",
    "keyPoints": [
      "CPU — bu yirik raqamli mantiqiy sxema",
      "Buyruqlarning apparatda bajarilish poydevori"
    ]
  },
  {
    "id": "cq_8_1",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Mantiqiy element nima?",
    "answer": "Mantiqiy element (gate) — bir yoki bir nechta mantiqiy kirish signallari ustida elementar Bul amallarini (va, yoki, emas) bajarib, bitta mantiqiy chiqish hosil qiluvchi elektron yarimo‘tkazgichli sxema.",
    "keyPoints": [
      "Elementar mantiqiy amalni bajaruvchi sxema",
      "Kirishlarni qabul qilib, bitta chiqish beradi"
    ]
  },
  {
    "id": "cq_8_2",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "AND elementi qachon 1 hosil qiladi?",
    "answer": "AND (Kon’yunksiya) elementi FAQAT va FAQAT barcha kirishlari 1 bo‘lgandagina chiqishda 1 hosil qiladi. Kamida bitta kirish 0 bo‘lsa, chiqish 0 bo‘ladi.",
    "keyPoints": [
      "Faqat barcha kirishlar 1 bo‘lganda 1 beradi",
      "Y = A · B"
    ]
  },
  {
    "id": "cq_8_3",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "OR va XOR o‘rtasidagi farq nimada?",
    "answer": "OR (Diz’yunksiya) kamida bitta kirish 1 bo‘lsa 1 beradi (ikkalasi 1 bo‘lsa ham 1). XOR (Istisno etuvchi YOKI) esa FAQAT kirishlar turlicha bo‘lganda 1 beradi; agar ikkala kirish ham 1 bo‘lsa, XOR 0 beradi.",
    "keyPoints": [
      "OR: 1 va 1 bo‘lsa natija 1",
      "XOR: 1 va 1 bo‘lsa natija 0 (faqat turlicha kirishlarda 1)"
    ]
  },
  {
    "id": "cq_8_4",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "NOT elementi nechta kirishga ega?",
    "answer": "NOT (Invertor) elementi FAQAT BITTA (1 ta) kirishga va bitta chiqishga ega bo‘ladi.",
    "keyPoints": [
      "Faqat 1 ta kirishga ega",
      "Signalni teskarisiga aylantiradi"
    ]
  },
  {
    "id": "cq_8_5",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "NAND elementi qanday hosil qilinadi?",
    "answer": "NAND elementi — AND amali ketidan NOT elementini ulash orqali hosil qilinadi: Y = NOT(A AND B). Ya’ni kirishlar faqat 1 va 1 bo‘lganda chiqish 0, qolgan barcha holatlarda 1 bo‘ladi.",
    "keyPoints": [
      "AND + NOT kombinatsiyasi",
      "Y = ¬(A · B)"
    ]
  },
  {
    "id": "cq_8_6",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Rostlik jadvali nima uchun kerak?",
    "answer": "Rostlik jadvali — mantiqiy sxemaning barcha mumkin bo‘lgan kirish kombinatsiyalarini va ularga mos chiqish natijalarini to‘liq jadval ko‘rinishida tasvirlash va sxemani sinash uchun kerak.",
    "keyPoints": [
      "Barcha kirish va chiqish holatlari jadvali",
      "Sxemaning to‘g‘riligini 100% tekshirish"
    ]
  },
  {
    "id": "cq_8_7",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Uchta kirish o‘zgaruvchisi uchun nechta kombinatsiya mavjud?",
    "answer": "Uchta kirish o‘zgaruvchisi (A, B, C) uchun jami 2³ = 8 ta turli kombinatsiya mavjud (000 dan 111 gacha).",
    "keyPoints": [
      "2³ = 8 ta kombinatsiya"
    ]
  },
  {
    "id": "cq_8_8",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Yarim qo‘shgichning SUM chiqishi qaysi element bilan hosil qilinadi?",
    "answer": "Yarim qo‘shgichning SUM (yig‘indi) chiqishi XOR (Istisno etuvchi YOKI) elementi orqali hosil qilinadi: SUM = A ⊕ B.",
    "keyPoints": [
      "XOR elementi bilan",
      "SUM = A ⊕ B"
    ]
  },
  {
    "id": "cq_8_9",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "CARRY chiqishining mantiqiy ifodasi qanday?",
    "answer": "CARRY (ko‘chirish) chiqishining mantiqiy ifodasi: CARRY = A AND B (A · B).",
    "keyPoints": [
      "CARRY = A · B (AND)"
    ]
  },
  {
    "id": "cq_8_10",
    "labId": 8,
    "labTitle": "8-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "NAND va NOR nega universal elementlar deyiladi?",
    "answer": "Chunki FAQAT NAND yoki FAQAT NOR elementlarining o‘zidan istalgan boshqa mantiqiy amallarni (NOT, AND, OR, XOR) to‘liq yasash mumkin. Bu chiplar ishlab chiqarishni arzonlashtiradi.",
    "keyPoints": [
      "Faqat NAND/NOR dan barcha amallarni yasash mumkin",
      "Ishlab chiqarishda universal va arzon"
    ]
  },
  {
    "id": "cq_9_1",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Boolean algebra nima?",
    "answer": "Boolean algebra (Bul algebrasi) — faqat ikkita qiymat (Rost/1 va Yolg‘on/0) ustida bajariladigan mantiqiy amallar (VA, YOKI, EMAS) va qoidalar tizimi.",
    "keyPoints": [
      "Ikki qiymatli (0 va 1) mantiq algebrasi",
      "Sxemalarni matematik ifodalash vositasi"
    ]
  },
  {
    "id": "cq_9_2",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "AND va OR amallari Boolean yozuvda qanday belgilanadi?",
    "answer": "AND amali nuqta yoki ko‘paytirish bilan belgilanadi: A · B (yoki AB). OR amali esa qo‘shish belgisi bilan belgilanadi: A + B.",
    "keyPoints": [
      "AND: A · B (ko‘paytirish)",
      "OR: A + B (qo‘shish)"
    ]
  },
  {
    "id": "cq_9_3",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Komplement qonuni nimani bildiradi?",
    "answer": "Komplement (to‘ldirish) qonunlari: A · Ā = 0 (o‘zgaruvchi va uning inkori ko‘paytmasi doim 0) va A + Ā = 1 (o‘zgaruvchi va uning inkori yig‘indisi doim 1).",
    "keyPoints": [
      "A · Ā = 0",
      "A + Ā = 1"
    ]
  },
  {
    "id": "cq_9_4",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Absorbsiya qonuniga misol keltiring.",
    "answer": "Absorbsiya (yutilish) qonuni: A + A · B = A yoki A · (A + B) = A. Bunda ikkinchi qo‘shiluvchi birinchisi tomonidan to‘liq yutib yuboriladi.",
    "keyPoints": [
      "A + A·B = A",
      "A · (A + B) = A"
    ]
  },
  {
    "id": "cq_9_5",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "De Morgan qonunlari qanday yoziladi?",
    "answer": "De Morgan qonunlari: 1) ¬(A · B) = ¬A + ¬B (Ko‘paytmaning inkori inkorlar yig‘indisiga teng); 2) ¬(A + B) = ¬A · ¬B (Yig‘indining inkori inkorlar ko‘paytmasiga teng).",
    "keyPoints": [
      "¬(A · B) = ¬A + ¬B",
      "¬(A + B) = ¬A · ¬B"
    ]
  },
  {
    "id": "cq_9_6",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Minterm nima?",
    "answer": "Minterm — barcha kirish o‘zgaruvchilarining (to‘g‘ridan-to‘g‘ri yoki inkor ko‘rinishida) kon’yunksiyasi (ko‘paytmasi) bo‘lib, u rostlik jadvalining aynan bitta satrida 1 qiymat beradi.",
    "keyPoints": [
      "Barcha o‘zgaruvchilarning ko‘paytmasi",
      "Faqat bitta satrda 1 beradi"
    ]
  },
  {
    "id": "cq_9_7",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Rostlik jadvalidan SOP ifoda qanday tuziladi?",
    "answer": "Rostlik jadvalida chiqish natijasi 1 bo‘lgan barcha satrlar tanlab olinadi, har bir satr uchun minterm yoziladi va bu mintermlar o‘zaro OR (+) orqali birlashtiriladi (Sum of Products).",
    "keyPoints": [
      "Chiqishi 1 bo‘lgan satrlar mintermlari yig‘indisi",
      "SOP = m_i + m_j + ..."
    ]
  },
  {
    "id": "cq_9_8",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Karnaugh xaritasining asosiy maqsadi nima?",
    "answer": "Karnaugh xaritasining asosiy maqsadi — Bul ifodalarini inson ko‘zi bilan geometrik shaklda (2, 4, 8 talik bloklarga birlashtirib) eng minimal ko‘rinishga keltirish (soddalashtirish).",
    "keyPoints": [
      "Grafik minimallashtirish",
      "Eng qisqa SOP formulani topish"
    ]
  },
  {
    "id": "cq_9_9",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "K-map da guruh o‘lchami qanday bo‘lishi kerak?",
    "answer": "K-map da guruh o‘lchami doimo 2 ning darajalari ko‘rinishida bo‘lishi shart: 1, 2, 4, 8 yoki 16 ta katak. 3 talik yoki 6 talik guruhlarga ruxsat berilmaydi.",
    "keyPoints": [
      "Doim 2^k o‘lchamda (1, 2, 4, 8)",
      "3 yoki 6 talik guruhlash mumkin emas"
    ]
  },
  {
    "id": "cq_9_10",
    "labId": 9,
    "labTitle": "9-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Mantiqiy ifodani soddalashtirish sxemaga qanday amaliy foyda beradi?",
    "answer": "Sxemada tranzistorlar va elementlar soni keskin kamayadi, signal kechikishi (latency) qisqaradi, chip maydoni tejaladi va elektr quvvati sarfi kamayadi.",
    "keyPoints": [
      "Kamroq element — arzonroq narx",
      "Yuqori tezlik va kamroq energiya sarfi"
    ]
  },
  {
    "id": "cq_10_1",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "ISA nima va uning vazifasi nimadan iborat?",
    "answer": "ISA (Instruction Set Architecture — Buyruqlar tizimi arxitekturasi) — dasturiy ta’minot bilan apparat ta’minoti o‘rtasidagi rasmiy shartnoma. U protsessor qanday buyruqlarni tushunishi, registrlari, xotira modeli va ma’lumotlar turlarini belgilaydi.",
    "keyPoints": [
      "Dastur va apparat o‘rtasidagi ko‘prik",
      "Registrlar, buyruqlar va xotira modelini belgilaydi"
    ]
  },
  {
    "id": "cq_10_2",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Mikroarxitektura bilan ISA o‘rtasidagi farq nima?",
    "answer": "ISA — bu protsessor NIMA qila olishi (mantiqiy ko‘rinishi, buyruqlar formati). Mikroarxitektura esa bu buyruqlar apparatda QANDAY amalga oshirilgani (konveyer bosqichlari, keshlar, takt chastotasi). Bir xil ISA da turli mikroarxitekturalar bo‘lishi mumkin.",
    "keyPoints": [
      "ISA: NIMA qiladi (spetsifikatsiya)",
      "Mikroarxitektura: QANDAY qurilgan (konveyer, kesh, tranzistorlar)"
    ]
  },
  {
    "id": "cq_10_3",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "RISC yondashuvining asosiy xususiyatlarini sanang.",
    "answer": "RISC (Reduced Instruction Set Computer): 1) Bir xil 32-bitli qat’iy uzunlikdagi buyruqlar; 2) Load/Store modeli (faqat lw/sw xotiraga murojaat qiladi); 3) Ko‘p sonli umumiy registrlar (32 ta); 4) Bir taktda bitta buyruq bajarishga intilish.",
    "keyPoints": [
      "Oddiy va bir xil uzunlikdagi buyruqlar",
      "Load/Store xotira modeli",
      "Keng registrlar fayli"
    ]
  },
  {
    "id": "cq_10_4",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "RV32I yozuvidagi 32 va I nimani anglatadi?",
    "answer": "RV32I: 'RV' — RISC-V, '32' — 32-bitli manzil va registrlar kengligi, 'I' — Integer (butun sonli asosiy buyruqlar to‘plami).",
    "keyPoints": [
      "RV = RISC-V",
      "32 = 32-bit registr va manzil",
      "I = Integer (butun sonli baza)"
    ]
  },
  {
    "id": "cq_10_5",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "x0 registrining o‘ziga xos xususiyati qanday?",
    "answer": "x0 (zero) registri apparat darajasida qat’iy ravishda 0 (nol) qiymatiga ulangan. Undan o‘qilganda doimo 0 qaytadi, unga yozilgan har qanday qiymat esa e’tiborsiz qoldiriladi.",
    "keyPoints": [
      "Doimiy nol (hardwired zero)",
      "Yozish amali natijasiz yo‘qoladi"
    ]
  },
  {
    "id": "cq_10_6",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "rd, rs1 va rs2 maydonlari nimani bildiradi?",
    "answer": "rd — qabul qiluvchi registr (destination register); rs1 — birinchi manba registri (source 1); rs2 — ikkinchi manba registri (source 2).",
    "keyPoints": [
      "rd: natija yoziladigan registr",
      "rs1, rs2: amalda qatnashuvchi manba registrlar"
    ]
  },
  {
    "id": "cq_10_7",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "opcode nima vazifa bajaradi?",
    "answer": "opcode (amallar kodi) — buyruqning qaysi turga tegishli ekanligini (R-type arifmetika, load, store, branch) boshqaruvchi apparat qurilmasiga bildiruvchi asosiy 7-bitli maydon.",
    "keyPoints": [
      "Buyruq turini aniqlovchi kod",
      "Boshqaruv signallarini hosil qiladi"
    ]
  },
  {
    "id": "cq_10_8",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "R-type va I-type formatlari qaysi jihatdan farq qiladi?",
    "answer": "R-type — amallarni faqat 3 ta registr o‘rtasida bajaradi (rs1, rs2 -> rd), uning tarkibida funct7 bor va bevosita son (imm) yo‘q. I-type esa bitta registr va 12-bitli bevosita son (immediate) ustida amal bajaradi (rs1, imm -> rd).",
    "keyPoints": [
      "R-type: registr-registr amallari (imm yo‘q)",
      "I-type: registr va bevosita son (imm) amallari"
    ]
  },
  {
    "id": "cq_10_9",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Load/store tamoyili deganda nima tushuniladi?",
    "answer": "Arifmetik va mantiqiy amallar faqat ichki registrlarda bajariladi. Xotira bilan registrlar o‘rtasida ma’lumot almashish FAQAT maxsus Load (lw) va Store (sw) buyruqlari orqali amalga oshiriladi.",
    "keyPoints": [
      "Hisoblash faqat registrlarda",
      "Xotiraga faqat load/store orqali kirish"
    ]
  },
  {
    "id": "cq_10_10",
    "labId": 10,
    "labTitle": "10-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Ripes dasturi buyruqlar tizimini o‘rganishda qanday yordam beradi?",
    "answer": "Ripes simulyatori protsessor ichidagi konveyer bosqichlarini (IF, ID, EX, MEM, WB), registrlar va RAM o‘zgarishini taktma-takt vizual ko‘rsatib beradi.",
    "keyPoints": [
      "Taktma-takt apparat vizualizatsiyasi",
      "Registr va xotirani real vaqtda kuzatish"
    ]
  },
  {
    "id": "cq_11_1",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Operand nima?",
    "answer": "Operand — buyruq tomonidan qayta ishlanadigan yoki hisoblashda qatnashadigan ma’lumot birligi (registr, xotiradagi son yoki bevosita berilgan son).",
    "keyPoints": [
      "Amalda qatnashuvchi ma’lumot",
      "Registr, xotira yoki bevosita son"
    ]
  },
  {
    "id": "cq_11_2",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Adreslash usuli nimani belgilaydi?",
    "answer": "Adreslash usuli — buyruq bajarilishi uchun zarur bo‘lgan operandning qayerda joylashganini va uning samarali manzilini (Effective Address) aniqlash qoidasi.",
    "keyPoints": [
      "Operand manzilini topish qoidasi",
      "Registrli, bevosita, nisbiy turlari"
    ]
  },
  {
    "id": "cq_11_3",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Immediate adreslashga misol keltiring.",
    "answer": "Immediate (bevosita) adreslashda sonning o‘zi to‘g‘ridan-to‘g‘ri buyruq kodining ichida joylashgan bo‘ladi. Misol: addi x5, x0, 15 (bu yerda 15 soni bevosita operand).",
    "keyPoints": [
      "Son buyruq kodining ichida bo‘ladi",
      "Misol: addi t0, zero, 42"
    ]
  },
  {
    "id": "cq_11_4",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Registrli adreslashda operand qayerda joylashadi?",
    "answer": "Registrli adreslashda operand protsessor ichidagi 32 ta umumiy registrlardan (x0..x31) birida joylashadi. Misol: add x3, x1, x2.",
    "keyPoints": [
      "Operand CPU registri ichida saqlanadi",
      "Xotiraga murojaat talab etilmaydi"
    ]
  },
  {
    "id": "cq_11_5",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Effective Address qanday hisoblanadi?",
    "answer": "Effective Address (samarali manzil) — bazaviy registr ichidagi manzilga buyruqdagi siljish (offset) qiymatini qo‘shish orqali hisoblanadi: EA = Base_Register + Sign_Extended_Offset.",
    "keyPoints": [
      "Formula: EA = Baza_Registri + Offset",
      "Misol: 16(s0) -> s0 + 16"
    ]
  },
  {
    "id": "cq_11_6",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "lw va sw buyruqlari o‘rtasidagi farq nima?",
    "answer": "lw (Load Word) — xotiradan (RAM) 4 baytli so‘zni o‘qib registrga yuklaydi; sw (Store Word) — aksincha, registrdagi 4 baytli qiymatni olib xotiraga (RAM) yozadi.",
    "keyPoints": [
      "lw: RAM → Registr (o‘qish)",
      "sw: Registr → RAM (yozish)"
    ]
  },
  {
    "id": "cq_11_7",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Nima uchun 32 bitli word massivda offsetlar 4 baytdan oshib boradi?",
    "answer": "Chunki 32-bitli arxitekturada xotira baytma-bayt adreslanadi, bitta 32-bitli word esa 4 ta baytdan iborat. Shu sababli keyingi elementga o‘tish uchun indeks 4 ga ko‘paytiriladi (offset = index × 4).",
    "keyPoints": [
      "1 Word = 4 Bayt (baytli adreslash)",
      "Indeks 4 ga ko‘paytiriladi (0, 4, 8, 12...)"
    ]
  },
  {
    "id": "cq_11_8",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Load/store arxitekturasi deganda nima tushuniladi?",
    "answer": "Bu protsessorda xotira va arifmetika qat’iy ajratilganini anglatadi: CPU xotira ustida to‘g‘ridan-to‘g‘ri qo‘shish yoki ayirish bajara olmaydi, avval lw bilan yuklaydi, registrlarda hisoblaydi, so‘ng sw bilan yozadi.",
    "keyPoints": [
      "Arifmetika faqat registrlarda",
      "Xotira bilan faqat load/store muloqot qiladi"
    ]
  },
  {
    "id": "cq_11_9",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "PC-relative adreslash qaysi turdagi buyruqlarda qo‘llanadi?",
    "answer": "PC-relative (Dastur hisoblagichiga nisbiy) adreslash shartli o‘tish (Branch: beq, bne) va sakrash (JAL) buyruqlarida yangi manzilni hisoblash uchun qo‘llanadi: Target = PC + Offset.",
    "keyPoints": [
      "Shartli o‘tish (Branch) va sakrashlarda",
      "Target = PC + (offset << 1)"
    ]
  },
  {
    "id": "cq_11_10",
    "labId": 11,
    "labTitle": "11-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Ripesda adreslash usulining to‘g‘ri bajarilganini qanday tekshirish mumkin?",
    "answer": "Ripes simulyatorining 'Processor' ko‘rinishida ALU chiqishidagi xotira manzilini, 'Memory' oynasida esa 0x10010000 manzilidagi kataklar o‘zgarganini tekshirish mumkin.",
    "keyPoints": [
      "Memory oynasida yozilgan katakni ko‘rish",
      "ALU chiqishida hisoblangan manzilni tekshirish"
    ]
  },
  {
    "id": "cq_12_1",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Xotira ierarxiyasi nima uchun kerak?",
    "answer": "Chunki eng tez xotira (SRAM) juda qimmat va fizik jihatdan katta hajmda ishlab chiqarib bo‘lmaydi. Katta sig‘imli xotira (DRAM, SSD) esa arzon, ammo sekin. Ierarxiya kichik tezkor xotira va katta arzon xotiraning optimal balansini beradi.",
    "keyPoints": [
      "Tezlik va narx o‘rtasidagi murosasizlik",
      "Arzon katta hajm + tezkor kichik kesh balansi"
    ]
  },
  {
    "id": "cq_12_2",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Temporal va fazoviy lokalik nima?",
    "answer": "Temporal (vaqtinchalik) lokalik — ayni paytda murojaat qilingan ma’lumotga yaqin orada yana murojaat qilinish ehtimoli yuqoriligi (masalan, sikl o‘zgaruvchisi). Fazoviy lokalik — ma’lumotga murojaat qilinganda, unga qo‘shni manzillardagi ma’lumotlarga ham murojaat qilinishi (masalan, massiv elementlari).",
    "keyPoints": [
      "Temporal: xuddi shu ma’lumotga qayta murojaat",
      "Fazoviy: qo‘shni manzillarga ketma-ket murojaat"
    ]
  },
  {
    "id": "cq_12_3",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "Registr va keshning asosiy farqi nimada?",
    "answer": "Registr — protsessor yadrosi ichida joylashgan, bitta taktda ishlaydigan eng tezkor xotira (0.2-0.5 ns), dastur tomonidan nomlari bilan boshqariladi. Kesh — kattaroq SRAM xotira bo‘lib (L1-L3), apparat nazoratchisi tomonidan avtomatik boshqariladi.",
    "keyPoints": [
      "Registr: eng tez, komandada nomi yoziladi (x1..x31)",
      "Kesh: apparat tomonidan shaffof avtomatik boshqariladi"
    ]
  },
  {
    "id": "cq_12_4",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "RAM nima sababdan SSD dan tez, lekin ma’lumotni doimiy saqlamaydi?",
    "answer": "RAM (DRAM) kondensator zaryadi asosida ishlaydi, shuning uchun juda tez (15-60 ns), lekin quvvat o‘chsa zaryad yo‘qoladi (uchuvchan). SSD esa NAND flesh suzuvchi zatvorlarida elektronlarni ushlab turadi, sekinroq ishlaydi, lekin o‘nlab yillar quvvatsiz saqlaydi.",
    "keyPoints": [
      "RAM: uchuvchan, kondensator zaryadi (juda tez)",
      "SSD: doimiy, NAND flesh hujayralari (sekinroq)"
    ]
  },
  {
    "id": "cq_12_5",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Kesh hit va miss tushunchalari nimani bildiradi?",
    "answer": "Kesh Hit — protsessor so‘ragan ma’lumot ayni paytda kesh xotirada mavjud bo‘lishi (tezkor javob). Kesh Miss — so‘ralgan ma’lumot keshda topilmay, sekinroq quyi darajadan (RAM yoki diskdan) olib kelinishi.",
    "keyPoints": [
      "Hit: keshda bor (tezkor murojaat)",
      "Miss: keshda yo‘q (RAM dan yuklash kechikishi)"
    ]
  },
  {
    "id": "cq_12_6",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "“Cached memory” ni “keraksiz egallangan RAM” deb hisoblash nima uchun noto‘g‘ri?",
    "answer": "Zamonaviy operatsion tizimlar bo‘sh turgan RAM ni disk keshiga (Cached memory) ajratadi. Agar boshqa dasturga RAM kerak bo‘lsa, u bir zumda bo‘shatib beriladi. Bo‘sh turgan RAM — bu behuda sarflangan resursdir.",
    "keyPoints": [
      "Kesh tezlikni oshiradi, kerak bo‘lganda darhol bo‘shaydi",
      "Ishlatilmagan bo‘sh RAM — befoyda RAM"
    ]
  },
  {
    "id": "cq_12_7",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "GiB va GB o‘rtasida qanday farq bor?",
    "answer": "GB (Gigabayt) — o‘nlik sanoq tizimiga asoslangan: 1 GB = 10⁹ bayt = 1,000,000,000 bayt (disk ishlab chiqaruvchilar ishlatadi). GiB (Gibibayt) — ikkilik tizimga asoslangan: 1 GiB = 2³⁰ bayt = 1,073,741,824 bayt (OS ishlatadi). Shu sababli 500 GB disk Windows da ~465 GiB bo‘lib ko‘rinadi.",
    "keyPoints": [
      "GB = 10⁹ (1,000,000,000 bayt)",
      "GiB = 2³⁰ (1,073,741,824 bayt, ~7.3% farq)"
    ]
  },
  {
    "id": "cq_12_8",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "CXL xotira ierarxiyasida qanday yangi imkoniyatlar yaratadi?",
    "answer": "CXL (Compute Express Link) PCIe shinasida kesh kogerentligini va xotira pulingini ta’minlaydi. CPU, GPU va serverlar bir-birining xotirasiga kogerent murojaat qila oladi va tashqi RAM modullarini xotira ierarxiyasiga muammosiz qo‘shadi.",
    "keyPoints": [
      "Kesh kogerentligi (CXL.cache)",
      "Xotirani umumiy pulga birlashtirish (CXL.mem)"
    ]
  },
  {
    "id": "cq_12_9",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Xotira tizimini faqat sig‘im bilan baholash nima uchun yetarli emas?",
    "answer": "Chunki tezlik va kechikish (latency) sig‘imdan kam bo‘lmagan darajada muhim. 64 GB sekin xotiradan ko‘ra 32 GB yuqori o‘tkazuvchanlikka ega va past kechikishli xotira tizimni bir necha barobar tezroq ishlatishi mumkin.",
    "keyPoints": [
      "Kechikish (latency) hal qiluvchi omil",
      "O‘tkazuvchanlik va IOPS balansi"
    ]
  },
  {
    "id": "cq_12_10",
    "labId": 12,
    "labTitle": "12-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Bir dastur uchun ko‘p RAM bo‘lishi har doim tezlikning ikki baravar oshishini anglatadimi?",
    "answer": "Yo‘q. Agar dasturga masalan 8 GB yetarli bo‘lsa, unga 64 GB berilsa ham tezlik oshmaydi. RAM faqat yetishmaganda (diskka swap bo‘layotganda) kompyuterni sekinlashtiradi; yetarli bo‘lgach esa tezlik CPU va keshga bog‘liq bo‘lib qoladi.",
    "keyPoints": [
      "Keragidan ortiq RAM tezlikni ikki barobar oshirmaydi",
      "Cheklovchi omil CPU va kesh hisoblanadi"
    ]
  },
  {
    "id": "cq_13_1",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Throughput va latency nimasi bilan farq qiladi?",
    "answer": "Throughput (o‘tkazuvchanlik) — vaqt birligida uzatilgan ma’lumotlar hajmi (MB/s yoki GB/s). Latency (kechikish) — bitta so‘rov yuborilgandan to uning birinchi bayti olinguncha ketgan vaqt (ms yoki mks).",
    "keyPoints": [
      "Throughput: hajmiy tezlik (MB/s)",
      "Latency: kutish vaqti (ms yoki mks)"
    ]
  },
  {
    "id": "cq_13_2",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "IOPS qanday ko‘rsatkich?",
    "answer": "IOPS (Input/Output Operations Per Second) — saqlash qurilmasi bir soniyada bajara oladigan kiritish-chiqarish operatsiyalari soni. Kichik 4 KiB tasodifiy fayllar bilan ishlashda eng muhim ko‘rsatkich.",
    "keyPoints": [
      "Soniyadagi I/O amallari soni",
      "Kichik tasodifiy fayllarda asosiy ko‘rsatkich"
    ]
  },
  {
    "id": "cq_13_3",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "SATA SSD va NVMe SSD o‘rtasidagi asosiy arxitektura farqi nimada?",
    "answer": "SATA SSD eski AHCI protokoli va sekin SATA III (6 Gb/s ~ 550 MB/s, bitta navbat, 32 buyruq) orqali ishlaydi. NVMe SSD esa zamonaviy PCIe shinasiga to‘g‘ridan-to‘g‘ri ulanadi, parallel ko‘p yadroli ishlaydi (64,000 navbat, har birida 64,000 buyruq, 7000-14000 MB/s).",
    "keyPoints": [
      "SATA: AHCI, 1 ta navbat, 550 MB/s limit",
      "NVMe: PCIe, 64k navbat, 7000+ MB/s parallelizm"
    ]
  },
  {
    "id": "cq_13_4",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "M.2 nima: protokolmi yoki form-faktormi?",
    "answer": "M.2 — bu faqatgina FORM-FAKTOR (fizik uya va ulagich o‘lchami: masalan, 2280). Uning ichida SATA protokoli ham, NVMe (PCIe) protokoli ham ishlashi mumkin.",
    "keyPoints": [
      "M.2 — bu form-faktor (shakl va slot)",
      "Protokol emas (ichida SATA yoki NVMe bo‘ladi)"
    ]
  },
  {
    "id": "cq_13_5",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Benchmarkni bir marta bajarish nima uchun yetarli emas?",
    "answer": "Chunki SSD drayverlari avval SLC-keshda tez ishlaydi, u to‘lgach sekinlashadi; bundan tashqari bir martalik testda tizimning boshqa jarayonlari yoki qizib ketish (thermal throttling) xatolik keltirib chiqarishi mumkin.",
    "keyPoints": [
      "SLC-kesh to‘lishi ta’siri",
      "Harorat va fon jarayonlari barqarorligi"
    ]
  },
  {
    "id": "cq_13_6",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "SSD da thermal throttling nima?",
    "answer": "Thermal throttling — SSD kontrolleri qizib ketganda (odatda 75-80°C dan oshganda), mikrosxemalarni kuyishdan saqlash uchun drayverning tezligini avtomatik ravishda keskin tushirishi.",
    "keyPoints": [
      "Qizib ketganda tezlikni himoya uchun tushirish",
      "Radiator va sovutish talab etiladi"
    ]
  },
  {
    "id": "cq_13_7",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "TBW nimani ifodalaydi?",
    "answer": "TBW (Terabytes Written) — SSD drayverining kafolatlangan xizmat muddati davomida unga yozish mumkin bo‘lgan jami ma’lumotlar hajmi (terabaytlarda).",
    "keyPoints": [
      "Flesh xotiraning yozish resursi",
      "Kafolatlangan jami yozish hajmi (TB)"
    ]
  },
  {
    "id": "cq_13_8",
    "labId": 13,
    "labTitle": "13-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "HDD qaysi vazifalarda hali ham maqsadga muvofiq?",
    "answer": "Katta hajmdagi ma’lumotlarni minimal narxda saqlashda: video arxivlar, zaxira nusxalar (backup), NAS saqlagichlar, CCTV xavfsizlik kamerasi yozuvlari.",
    "keyPoints": [
      "Arzon katta sig‘im (GB narxi juda past)",
      "Uzoq muddatli sovuq arxivlar va zaxiralar"
    ]
  },
  {
    "id": "cq_14_1",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Cache line nima?",
    "answer": "Cache line (kesh qatori) — kesh xotira bilan asosiy xotira (RAM) o‘rtasida bir vaqtning o‘zida blok sifatida uzatiladigan minimal ma’lumot birligi (odatda 64 bayt).",
    "keyPoints": [
      "Keshga blok sifatida yuklanadigan birlik (64 bayt)",
      "Fazoviy lokalik asosi"
    ]
  },
  {
    "id": "cq_14_2",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Hit rate nega muhim?",
    "answer": "Hit rate (keshda topilish foizi) qanchalik yuqori bo‘lsa, CPU shunchalik kam sekin RAM ga murojaat qiladi. Masalan, Hit rate 95% dan 99% ga chiqsa, protsessorning o‘rtacha kirish vaqti bir necha barobar tezlashadi.",
    "keyPoints": [
      "O‘rtacha kirish vaqtini (EAT) qisqartiradi",
      "RAM ga sekin murojaatlarni yo‘qotadi"
    ]
  },
  {
    "id": "cq_14_3",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "TLB qanday vazifa bajaradi?",
    "answer": "TLB (Translation Lookaside Buffer) — MMU ichidagi eng tezkor apparat keshi bo‘lib, virtual sahifa manzillarini jismoniy freym manzillariga tarjima qilish jadvallarini saqlaydi.",
    "keyPoints": [
      "Virtual manzilni fizik manzilga tezkor tarjima qilish",
      "Sahifa jadvaliga murojaatni qisqartiradi"
    ]
  },
  {
    "id": "cq_14_4",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "Virtual manzil bilan fizik manzil farqi nimada?",
    "answer": "Virtual manzil dastur tomonidan ko‘riladigan alohida shaxsiy mantiqiy xotira maydoni. Jismoniy manzil esa kompyuterning RAM modullaridagi haqiqiy apparat katakchalari manzilidir.",
    "keyPoints": [
      "Virtual: dastur ko‘radigan mantiqiy manzil",
      "Fizik: RAM chiplaridagi haqiqiy manzil"
    ]
  },
  {
    "id": "cq_14_5",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Page fault har doim xatomi?",
    "answer": "Yo‘q. Page fault — bu xato emas, balki virtual xotiraning oddiy normal ishlash mexanizmi. U dastur so‘ragan sahifa ayni paytda RAM da yo‘qligini bildiradi va OS uni diskdan (Pagefile) RAM ga yuklab beradi.",
    "keyPoints": [
      "Dastur xatosi emas, normal hodisa",
      "Sahifani diskdan RAM ga chaqirish signali"
    ]
  },
  {
    "id": "cq_14_6",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Pagefile virtual xotiraning o‘zimi?",
    "answer": "Yo‘q! Pagefile (yoki Swap) — bu faqatgina virtual xotira mexanizmini qo‘llab-quvvatlash uchun diskda ajratilgan vaqtinchalik zaxira fayldir. Virtual xotira esa butun manzil maydoni, MMU va sahifalash konsepsiyasidir.",
    "keyPoints": [
      "Pagefile — faqat diskdagi zaxira fayl",
      "Virtual xotira — butun arxitektura va mexanizm"
    ]
  },
  {
    "id": "cq_14_7",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "Working set nima?",
    "answer": "Working set (ishchi to‘plam) — dastur ma’lum bir vaqt oralig‘ida qotmasdan (thrashing bo‘lmasdan) tezkor ishlashi uchun zarur bo‘lgan sahifalarning minimal to‘plami.",
    "keyPoints": [
      "Dasturga ayni paytda zarur sahifalar to‘plami",
      "Thrashing holatining oldini oladi"
    ]
  },
  {
    "id": "cq_14_8",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "Temporal lokalik uchun misol keltiring.",
    "answer": "Sikl hisoblagichi o‘zgaruvchisi (for i = 0...): i o‘zgaruvchisiga sikl davomida millionlab marta qayta-qayta murojaat qilinadi va u L1 keshda saqlanadi.",
    "keyPoints": [
      "Sikl sanagichlari va stek ko‘rsatkichi",
      "Yaqinda ishlatilgan ma’lumotga tezda qaytish"
    ]
  },
  {
    "id": "cq_14_9",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Set-associative kesh nima uchun direct-mapped keshga nisbatan conflict misslarni kamaytirishi mumkin?",
    "answer": "Direct-mapped keshda bitta manzil faqat bitta aniq qatorga joylashishi mumkin va ikki manzil bir qator uchun to‘qnashadi (conflict miss). Set-associative keshda esa har bir setda bir nechta (masalan, 4 ta yoki 8 ta) yo‘l bo‘lgani uchun to‘qnashuvlar keskin kamayadi.",
    "keyPoints": [
      "Bitta to‘plamda bir nechta joy bo‘ladi",
      "Conflict miss to‘qnashuvlarini keskin kamaytiradi"
    ]
  },
  {
    "id": "cq_14_10",
    "labId": 14,
    "labTitle": "14-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Ko‘p RAM bo‘lsa pagefile ni o‘chirish umumiy qoida emasligini izohlang.",
    "answer": "Chunki ko‘plab tizim xizmatlari va dasturlar kam ishlatiladigan xotira bloklarini pagefile ga chiqarishni talab qiladi. Pagefile butunlay o‘chirilsa, xotira to‘lmagan taqdirda ham ba’zi dasturlar xatolik bilan yopilib qolishi va kutilmagan halokatlar (crash) yuz berishi mumkin.",
    "keyPoints": [
      "Pagefile ni butunlay o‘chirish xavfli",
      "Tizim barqarorligi va crash dump lar uchun shart"
    ]
  },
  {
    "id": "cq_15_1",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "RAID 0 da nima uchun himoya yo‘q?",
    "answer": "Chunki RAID 0 faqat Striping (ma’lumotlarni disklarga bo‘laklab yozish) usulini qo‘llaydi. Unda hech qanday nusxalash (mirror) yoki paritet (parity) nazorati yo‘q. Bitta disk ishdan chiqsa, butun massiv yo‘qoladi.",
    "keyPoints": [
      "Striping bor, ammo paritet yoki oyna yo‘q",
      "Bitta disk yo‘qolsa, barcha fayllar buziladi"
    ]
  },
  {
    "id": "cq_15_2",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "RAID 1 ning foydali sig‘imi qanday aniqlanadi?",
    "answer": "RAID 1 Mirroring (ko‘zgu) usulida ishlaydi. Jami disklarning yarmisi ikkinchi yarmiga to‘liq nusxa bo‘lib xizmat qiladi. Shuning uchun foydali sig‘im bitta disk hajmiga teng: Usable = (N / 2) × Disk_Size (2 ta diskda 50%).",
    "keyPoints": [
      "Foydali sig‘im = 50% (bitta disk hajmi)",
      "Formula: 1 ta disk sig‘imi"
    ]
  },
  {
    "id": "cq_15_3",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "RAID 5 va RAID 6 farqi nimada?",
    "answer": "RAID 5 bitta paritet bloki (P) ishlatadi va 1 ta disk nosozligiga chidaydi (kamida 3 disk). RAID 6 esa ikkita mustaqil paritet (P va Q) ishlatadi va bir vaqtning o‘zida 2 ta disk nosozligiga chidaydi (kamida 4 disk).",
    "keyPoints": [
      "RAID 5: 1 ta paritet, 1 disk xavfsizligi",
      "RAID 6: 2 ta paritet, 2 ta disk xavfsizligi"
    ]
  },
  {
    "id": "cq_15_4",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "RAID 10 qanday ikki g‘oyani birlashtiradi?",
    "answer": "RAID 10 (1+0) bir vaqtning o‘zida RAID 1 ning ishonchliligini (Mirroring) va RAID 0 ning yuqori tezligini (Striping) birlashtiradi. Kamida 4 ta disk talab qiladi.",
    "keyPoints": [
      "RAID 1 ko‘zgu + RAID 0 striping",
      "Yuqori tezlik va yuqori xavfsizlik"
    ]
  },
  {
    "id": "cq_15_5",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "Parity nima uchun kerak?",
    "answer": "Parity (paritet) — XOR mantiqiy amali yordamida hisoblanadigan nazorat bloki. Agar bitta disk ishdan chiqsa, qolgan disklardagi ma’lumotlar va paritet bloki yordamida yo‘qolgan diskdagi ma’lumot tiklab olinadi.",
    "keyPoints": [
      "XOR amali asosidagi tiklash ma’lumoti",
      "Yo‘qolgan diskni matematik hisoblab tiklaydi"
    ]
  },
  {
    "id": "cq_15_6",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "Rebuild nima?",
    "answer": "Rebuild — ishdan chiqqan disk o‘rniga yangi disk qo‘yilganda, massivdagi qolgan disklar va paritet ma’lumotlari asosida yangi diskka barcha ma’lumotlarni qayta tiklab yozish jarayoni.",
    "keyPoints": [
      "Yangi diskka ma’lumotlarni qayta tiklash",
      "Paritet va omon qolgan disklar orqali"
    ]
  },
  {
    "id": "cq_15_7",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "RAID nega backup o‘rnini bosmaydi?",
    "answer": "Chunki RAID faqat apparat disk nosozligidan himoya qiladi. Agar foydalanuvchi faylni tasodifan o‘chirsa, virus/ransomware tushsa yoki yong‘in/suv toshsa, RAID xuddi shu zararlangan holatni barcha disklarga yozadi. Zaxira nusxa (Backup) esa alohida saqlanadi.",
    "keyPoints": [
      "RAID tasodifiy o‘chirish va virusdan asramaydi",
      "Backup alohida, boshqa joyda saqlanadi"
    ]
  },
  {
    "id": "cq_15_8",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "3-2-1 qoidasini tushuntiring.",
    "answer": "3-2-1 zaxiralash qoidasi: Ma’lumotning kamida 3 ta nusxasi bo‘lishi, ular kamida 2 xil turdagi tashuvchida (masalan, SSD va bulut/lenta) saqlanishi va 1 ta nusxa majburiy ravishda boshqa binoda (off-site) bo‘lishi shart.",
    "keyPoints": [
      "3 ta nusxa",
      "2 xil media tashuvchi",
      "1 ta off-site (boshqa binoda) nusxa"
    ]
  },
  {
    "id": "cq_15_9",
    "labId": 15,
    "labTitle": "15-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Snapshot va backup bir xilmi?",
    "answer": "Yo‘q. Snapshot — bu ayni paytdagi fayl tizimi holatining tezkor surati (odatda xuddi shu disk massivida metadata o‘zgarishi bilan saqlanadi). Backup esa to‘liq mustaqil, boshqa saqlash tizimiga ko‘chirilgan ma’lumot nusxasidir.",
    "keyPoints": [
      "Snapshot: o‘sha diskdagi tezkor holat ko‘rsatkichi",
      "Backup: alohida mustaqil zaxira nusxasi"
    ]
  },
  {
    "id": "cq_16_1",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 1,
    "question": "Shina nima?",
    "answer": "Shina (Bus) — kompyuterning turli funksional bloklari (CPU, xotira, videokarta, periferiya) o‘rtasida ma’lumot, manzil va boshqaruv signallarini uzatishga mo‘ljallangan umumiy aloqa yo‘li.",
    "keyPoints": [
      "Kompyuter bloklarini bog‘lovchi aloqa yo‘li",
      "Ma’lumot, manzil va boshqaruv uzatadi"
    ]
  },
  {
    "id": "cq_16_2",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 2,
    "question": "Address, data va control bus klassik modelda qanday vazifa bajaradi?",
    "answer": "Address bus — xotira katakchalari yoki I/O portlari manzilini uzatadi; Data bus — haqiqiy ma’lumot baytlarini ikki tomonlama tashiydi; Control bus — o‘qish, yozish, takt va uzilish (interrupt) buyruqlarini boshqaradi.",
    "keyPoints": [
      "Address: manzilni ko‘rsatadi",
      "Data: ma’lumotni tashiydi",
      "Control: o‘qish/yozishni boshqaradi"
    ]
  },
  {
    "id": "cq_16_3",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 3,
    "question": "PCIe lane nima?",
    "answer": "PCIe lane — ikki juft differensial simlardan (bitta uzatish TX va bitta qabul qilish RX juftligi) tashkil topgan yuqori tezlikdagi ketma-ket (serial) to‘liq dupleks aloqa kanali.",
    "keyPoints": [
      "Serial differensial kanal (TX va RX)",
      "To‘liq dupleks (ikki tomonlama mustaqil)"
    ]
  },
  {
    "id": "cq_16_4",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 4,
    "question": "x16 nimani anglatadi?",
    "answer": "x16 — slotda bir vaqtning o‘zida parallel ishlaydigan 16 ta mustaqil PCIe lane (liniya) mavjudligini anglatadi. U x1 liniyaga qaraganda 16 barobar yuqori o‘tkazuvchanlik beradi.",
    "keyPoints": [
      "16 ta parallel PCIe liniyasi",
      "Videokartalar uchun standart ulanish"
    ]
  },
  {
    "id": "cq_16_5",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 5,
    "question": "GT/s va GB/s bir xil birlikmi?",
    "answer": "Yo‘q! GT/s (GigaTransfers per second) — bu jami uzatilayotgan xom signallar soni (kodlash bilan). GB/s (Gigabytes per second) esa foydali ma’lumot o‘tkazuvchanligi. Masalan, 128b/130b kodlashda xom GT/s ning ~98.5% qismi foydali GB/s ga aylanadi.",
    "keyPoints": [
      "GT/s: soniyadagi xom transferlar",
      "GB/s: foydali baytlar o‘tkazuvchanligi"
    ]
  },
  {
    "id": "cq_16_6",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 6,
    "question": "PCIe avlodlarida backward compatibility qanday ishlaydi?",
    "answer": "Orqaga moslik (Backward compatibility) shuni anglatadiki, yangi avlod slotiga (masalan, PCIe 5.0) eski avlod kartasini (PCIe 3.0) yoki aksincha ulash mumkin; tizim ikkala qurilma ham qo‘llab-quvvatlaydigan eng yuqori umumiy avlod tezligida avtomatik kelishib ishlaydi.",
    "keyPoints": [
      "Eski va yangi avlodlar o‘zaro mos",
      "Eng quyi umumiy tezlikda avtomatik kelishuv"
    ]
  },
  {
    "id": "cq_16_7",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 7,
    "question": "FLIT va FEC nima sababdan yuqori tezliklarda muhimlashadi?",
    "answer": "PCIe 6.0 va 7.0 da PAM4 modulyatsiyasi qo‘llangani sababli signallarda shovqin xavfi ortadi. FLIT (qayd qilingan uzunlikdagi paketlar) va FEC (xatolarni avtomatik tuzatish) xatoliklarni apparatda tuzatib, ma’lumotlar yaxlitligini ta’minlaydi.",
    "keyPoints": [
      "PAM4 shovqiniga qarshi himoya",
      "FEC orqali xatolarni apparatda tuzatish"
    ]
  },
  {
    "id": "cq_16_8",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 8,
    "question": "CXL nima uchun ayniqsa data-markazlarda muhim?",
    "answer": "Data-markazlarda sun’iy intellekt va serverlar terabaytlab xotirani talab qiladi. CXL orqali serverlar umumiy xotira puliga kogerent ulanadi, bu esa protsessorlar va GPU lar o‘rtasidagi ma’lumot ko‘chirish kechikishini keskin kamaytiradi.",
    "keyPoints": [
      "Xotirani umumlashtirish (pooling)",
      "AI va serverlarda minimal kechikish"
    ]
  },
  {
    "id": "cq_16_9",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 9,
    "question": "Slot uzunligi va elektr lane soni nega farq qilishi mumkin?",
    "answer": "Fizik slot o‘lchami (masalan, uzun x16 slot) faqat tashqi mexanik uya uzunligini bildiradi. Uning elektr kontaktlari esa ona platada atigi x4 yoki x8 ta elektr liniyaga ulangan bo‘lishi mumkin.",
    "keyPoints": [
      "Fizik slot uzunligi ≠ Elektr lane soni",
      "Masalan, x16 slot elektr jihatdan x4 bo‘lishi mumkin"
    ]
  },
  {
    "id": "cq_16_10",
    "labId": 16,
    "labTitle": "16-Amaliy Mashg‘ulot",
    "questionNumber": 10,
    "question": "Link maksimumi bilan real qurilma tezligi nega teng emas?",
    "answer": "Shina maksimumi — bu yo‘lning nazariy o‘tkazuvchanlik qobiliyati. Real qurilma tezligi esa uning kontrolleri, flesh xotira chiplari, harorat va protokollarning xizmat qo‘shimcha yuklamalariga bog‘liq bo‘lib, nazariy maksimumdan biroz past bo‘ladi.",
    "keyPoints": [
      "Protokol qo‘shimcha yuklamalari (overhead)",
      "Qurilmaning ichki apparat imkoniyatlari chegarasi"
    ]
  }
];
