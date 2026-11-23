import React, { useState } from 'react';
import { 
  Server, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  Coins, 
  Sparkles,
  Gauge,
  HardDrive
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface CrisisQuestion {
  id: number;
  title: string;
  raidType: string;
  disksFailed: number;
  totalDisks: number;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export const CRISIS_QUESTIONS: CrisisQuestion[] = [
  {
    id: 1,
    title: "1-Inqiroz: RAID 5 da 1 ta Disk Ishdan Chiqdi",
    raidType: "RAID 5",
    disksFailed: 1,
    totalDisks: 4,
    question: "RAID 5 massivida 1 ta disk to‘xtab qoldi. Massivning hozirgi holati qanday?",
    correctAnswer: "Degraded (Ishlaydi, yangi disk bilan tiklash mumkin)",
    options: [
      "Degraded (Ishlaydi, yangi disk bilan tiklash mumkin)",
      "Failed (Barcha ma’lumotlar yo‘qoldi)",
      "Normal (Hech qanday o‘zgarish bo‘lmadi)",
      "Faqat o‘qish mumkin (Read-only)",
    ],
    explanation: "RAID 5 bitta disk nosozligiga chidaydi. Paritet (XOR) orqali ma’lumotlar o‘qiladi, yangi disk qo‘yilgach Rebuild qilinadi.",
  },
  {
    id: 2,
    title: "2-Inqiroz: RAID 5 da 2-disk ham Ishdan Chiqdi!",
    raidType: "RAID 5",
    disksFailed: 2,
    totalDisks: 4,
    question: "Rebuild jarayoni tugamasdan 2-disk ham ishdan chiqdi. Endi nima bo‘ladi?",
    correctAnswer: "Failed (Massiv halokatga uchradi, faqat tashqi Backup qutqaradi)",
    options: [
      "Failed (Massiv halokatga uchradi, faqat tashqi Backup qutqaradi)",
      "Degraded (Yana bitta disk kiritilsa tiklanadi)",
      "Paritet orqali avtomatik tiklanadi",
      "Ma’lumotlar yarmisi saqlanib qoladi",
    ],
    explanation: "RAID 5 faqat 1 ta disk nosozligini ko‘tara oladi. 2-disk ishdan chiqishi barcha ma’lumotlarning yo‘qolishiga (Failed) olib keladi. 3-2-1 zaxira nusxasi shart!",
  },
  {
    id: 3,
    title: "3-Inqiroz: RAID 6 da 2 ta Disk Nosozligi",
    raidType: "RAID 6",
    disksFailed: 2,
    totalDisks: 6,
    question: "RAID 6 massivida birdaniga 2 ta disk yonib ketdi. Tizim holati?",
    correctAnswer: "Degraded (Ishlashda davom etadi, chunki 2 ta paritet bor)",
    options: [
      "Degraded (Ishlashda davom etadi, chunki 2 ta paritet bor)",
      "Failed (Darhol to‘xtaydi)",
      "Barcha fayllar o‘chib ketadi",
      "Faqat bitta fayl saqlanadi",
    ],
    explanation: "RAID 6 ikkita mustaqil paritet (P va Q sindromlari) ishlatadi, shu sababli bir vaqtning o‘zida 2 ta disk ishdan chiqishiga to‘liq chidaydi.",
  },
  {
    id: 4,
    title: "4-Poyga: PCIe 5.0 x16 Shina Tezligi",
    raidType: "PCIe 5.0",
    disksFailed: 0,
    totalDisks: 16,
    question: "PCIe 5.0 x16 slotining bir tomonlama maksimal nazariy o‘tkazuvchanligi qancha?",
    correctAnswer: "~63-64 GB/s (har lane 32 GT/s ~ 4 GB/s)",
    options: [
      "~63-64 GB/s (har lane 32 GT/s ~ 4 GB/s)",
      "~16 GB/s",
      "~32 GB/s",
      "~128 GB/s",
    ],
    explanation: "PCIe 5.0 da har bir lane 32 GT/s (taxminan 3.94 GB/s) beradi. x16 shina uchun 16 × 3.94 ≈ 63-64 GB/s hosil bo‘ladi.",
  },
];

export const Game12RaidCrisis: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const crisis = CRISIS_QUESTIONS[currentIdx];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === crisis.correctAnswer) {
      sound.playSuccess();
      setScore(prev => prev + 100);
    } else {
      sound.playError();
    }
  };

  const nextCrisis = () => {
    sound.playClick();
    if (currentIdx + 1 >= CRISIS_QUESTIONS.length) {
      setIsGameOver(true);
      const earnedCoins = Math.floor((score + 50) / 10);
      const earnedXp = Math.floor((score + 50) / 4);
      sound.playBossVictory();
      confetti({ particleCount: 70, spread: 80 });
      onFinish(score + 100, earnedCoins, earnedXp);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              15 & 16-Amaliy · RAID & Shinalar
            </span>
            <span className="text-xs font-mono text-slate-400">Inqiroz Simulyatori</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">RAID Inqirozi & PCIe Trassa Poygasi</h2>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400 font-bold">
            Bosqich: <strong className="text-white">{currentIdx + 1}/{CRISIS_QUESTIONS.length}</strong>
          </div>
          <div className="text-sm font-black text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            {score} Ball
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Crisis Visual Alert */}
          <div className="p-6 rounded-3xl bg-[#070B14] border border-rose-500/40 text-center space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              <span>Inqirozli Vaziyat Aniqlondi!</span>
            </div>

            <h3 className="text-xl font-black text-white">{crisis.title}</h3>
            <p className="text-sm font-semibold text-slate-300 max-w-xl mx-auto">{crisis.question}</p>

            {/* Disk Cluster Visualization */}
            <div className="flex items-center justify-center space-x-3 pt-3">
              {Array.from({ length: crisis.totalDisks }).map((_, dIdx) => {
                const isFailed = dIdx < crisis.disksFailed;
                return (
                  <div
                    key={dIdx}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isFailed 
                        ? 'bg-rose-950/60 border-rose-500 text-rose-400 animate-shake' 
                        : 'bg-[#0D1424] border-emerald-500/40 text-emerald-400'
                    }`}
                  >
                    <HardDrive className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-[10px] font-mono font-bold">Disk {dIdx}</div>
                    <div className="text-[9px] uppercase font-bold">{isFailed ? '💥 XATO' : '🟢 OK'}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {crisis.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === crisis.correctAnswer;

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 scale-102'
                        : isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                          : 'bg-[#070B14] border-[#1A2642] opacity-40'
                      : 'bg-[#070B14] hover:bg-[#131D33] border-[#1A2642] hover:border-rose-500 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="text-xs font-bold">{opt}</div>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-[#070B14] border border-[#1A2642] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-400 uppercase">Tizim Tahlili:</span>
                <p className="text-xs text-slate-300">{crisis.explanation}</p>
              </div>

              <button
                onClick={nextCrisis}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 shadow-md"
              >
                Keyingi Bosqich ➔
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-10 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">RAID Inqirozi va Poyga Yakunlandi!</h3>
          <p className="text-sm text-slate-400">
            Jami ball: <strong className="text-rose-400 font-mono">{score}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
