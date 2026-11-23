# ⚡ Kompyuter Arxitektori: Pro Lab

> **"Kompyuterni tashkil etish"** fani bo‘yicha barcha **14 ta amaliy mashg‘ulotni** (2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) to‘liq qamrab oluvchi murakkab, interaktiv va zamonaviy veb-o‘yin hamda virtual laboratoriya platformasi.

---

## 🚀 Texnologik Stack va Arxitektura
- **Freyymvork:** React 19 + TypeScript + Vite + Tailwind CSS
- **Ikonkalar:** Lucide React
- **Animatsiya & Ovoz:** Web Audio API (100% offline, sintetik ovoz generatori) + Canvas Confetti
- **Saqlash:** To‘liq offline `localStorage` arxitekturasi — tashqi API yoki internet talab etilmaydi.
- **Hisobot:** Talabaning shaxsiy natijalarini chop etishga tayyor rasmiy PDF ko‘rinishida chiqarish (Print View) va JSON zaxiralash.

---

## 🎮 6 ta Asosiy O‘yin va Laboratoriya Modullari

### 1. Kampaniya ("Arxitektor Yo‘li") & Imtihon Arena
- **5 ta bosqichli missiya:**
  1. *Qurilmalar va Sanoq* (2, 4, 5-amaliy)
  2. *Raqamli Mantiq va Bul Algebrasi* (6, 7, 8, 9-amaliy)
  3. *RISC-V RV32I va Adreslash* (10, 11-amaliy)
  4. *Xotira Ierarxiyasi va Kesh* (12, 13, 14-amaliy)
  5. *RAID va Zamonaviy Shinalar* (15, 16-amaliy)
- **Boss Sinovi:** Har bir bosqich yakunida 45 soniyalik dinamik taymerli Boss jangi (kamida 70% to‘g‘ri javob bilan keyingi bosqich ochiladi).
- **Aralash Imtihon:** 14 mavzudan 10 ta takrorlanmas savol, seriya (streak) multiplikatori va tezlik bonusi.
- **Blitz Rejim:** 60 soniyada maksimal savollarga tezkor javob berish.
- **Survival Rejim:** 3 ta jon bilan xatosiz marafon.

### 2. Sanoq Tizimlari & ALU Laboratoriyasi (4, 5, 6-amaliy)
- **8-bit va 16-bit Bit-kalitlar Paneli:** `DEC ↔ BIN ↔ OCT ↔ HEX` jonli sinxronizatsiyasi, razryad og‘irliklari ($2^0, 2^1, ... 2^{15}$).
- **Carry / Borrow Vizualizatori:** 4-bit va 8-bit ikkilik qo‘shish va ayirishda har bir razryad bo‘yicha ko‘chirish (Carry), qarz olish (Borrow) hamda unsigned `Overflow` bayrog‘ini aniq ko‘rsatish.
- **🎮 Bit O‘yini:** Berilgan o‘nlik sonni ikkilik bitlarni yoqib yig‘ish marafoni.

### 3. Mini-Logisim & Karnaugh Laboratoriyasi (7, 8, 9-amaliy)
- **Mantiqiy Sxema Konstruktori:** Kirish pinlari ($A, B, C$), mantiqiy darvozalar ($AND, OR, NOT, NAND, NOR, XOR, XNOR$).
- **Test All Combinations:** 4 yoki 8 ta kombinatsiyani bir klikda avtomatik tekshirib, to‘liq rostlik jadvalini generatsiya qilish.
- **Interaktiv K-map:** 2 va 3 o‘zgaruvchili Karnaugh xaritasida 1-larni guruhlash va minimal SOP (Sum of Products) ifodasini topish.
- **De Morgan mashqlari:** $\neg(A \cdot B) = \bar{A} + \bar{B}$ va $\neg(A + B) = \bar{A} \cdot \bar{B}$ qonunlari.

### 4. Mini-Ripes: RISC-V RV32I Simulyatori (10, 11-amaliy)
- **RV32I Assembly Muharriri:** `addi`, `add`, `sub`, `and`, `or`, `xor`, `lw`, `sw`, `beq`, `bne` buyruqlari.
- **Step / Run / Reset boshqaruvi:** Har taktda o‘zgargan registrlar va RAM katakchalarini neon rangda yoritib ko‘rsatish.
- **Registrlar Jadvali:** $x0 - x31$ (ABI nomlari: `zero, ra, sp, t0-t6, s0-s11, a0-a7`), $x0$ o‘zgarmas 0.
- **32-bit Buyruq Formati Dekoderi:** R, I, S, B turlarini opcode, funct3, funct7, rd, rs1, rs2, imm maydonlariga ajratish.
- **Effective Address (EA):** Baza + Siljish bo‘yicha samarali manzil kalkulyatori.

### 5. Xotira Ierarxiyasi, Kesh va Virtual Xotira (12, 13, 14-amaliy)
- **Vizual Xotira Zanjiri:** $CPU \to TLB/MMU \to L1 \to L2 \to L3 \to RAM \to SSD (Pagefile)$.
- **Write-Back vs Write-Through:** Kesh siyosatlarini sinab ko‘rish.
- **EAT Kalkulyatori:** Hit rate va kechikishlar asosida o‘rtacha kirish vaqtini dinamik SVG grafigida kuzatish.
- **Saqlash Qurilmalari:** HDD, SATA SSD, NVMe Gen4, NVMe Gen5 parametrlarini real ish yuklariga mos tanlash.

### 6. PC Builder, RAID & Zamonaviy Shinalar (2, 15, 16-amaliy)
- **PC Konfigurator:** Ofis, Dasturlash, Grafik dizayn va 4K montaj uchun muvozanatli apparatura yig‘ish.
- **RAID Inqiroz Simulyatori:** RAID 0, 1, 5, 6, 10 da disklarni ishdan chiqarib `Optimal → Degraded → Failed` holatini ko‘rish va Rebuild qilish.
- **PCIe 3.0–7.0 & CXL:** 128b/130b vs PAM4 + FLIT kodlash va CXL.io / CXL.cache / CXL.mem o‘tkazuvchanligini hisoblash.

---

## 🛠️ Ishga tushirish yo‘riqnomasi

```bash
# Loyiha papkasiga o‘tish:
cd "C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori"

# Loyihani ishga tushirish:
npm run dev

# Yoki 'ishga-tushirish.bat' faylini ikki marta bosing!
```
Brauzerda `http://localhost:3000` manzilini oching.
