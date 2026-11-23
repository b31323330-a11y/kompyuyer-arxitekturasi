import React, { useState } from 'react';
import { 
  HardDrive, 
  RotateCcw, 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Coins,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface StorageScenario {
  id: number;
  workload: string;
  requirement: string;
  correctDevice: 'hdd' | 'sata' | 'nvme4' | 'nvme5';
  explanation: string;
}

export const STORAGE_SCENARIOS: StorageScenario[] = [
  {
    id: 1,
    workload: "Xavfsizlik Kameralari Arxiv Serveri",
    requirement: "24 TB hajmdagi video arxivni 24/7 rejimida minimal narxda uzoq muddat saqlash lozim.",
    correctDevice: 'hdd',
    explanation: "Ketma-ket yozish va katta sig‘im uchun HDD eng arzon narx/GB nisbatini beradi. Qimmat SSD bu yerda ortiqcha xarajat.",
  },
  {
    id: 2,
    workload: "Bank Ma’lumotlar Bazasi (OLTP)",
    requirement: "Har soniyada yuz minglab tasodifiy kichik so‘rovlar (4K Random IOPS) va minimal kechikish talab etiladi.",
    correctDevice: 'nvme4',
    explanation: "Ma’lumotlar bazasida ketma-ket tezlik emas, balki 1,000,000 IOPS tasodifiy tezlik va mikrosekundlik kechikish hal qiluvchi rol o‘ynaydi.",
  },
  {
    id: 3,
    workload: "Eski Ofis Noutbukini Yangilash",
    requirement: "Faqat 2.5 dyuymli SATA portiga ega bo‘lgan kompyuterni arzon narxda tezlashtirish.",
    correctDevice: 'sata',
    explanation: "Eski noutbukda M.2 PCIe uyasi yo‘q, 2.5\" SATA SSD (550 MB/s) HDD ga qaraganda tizimni 5 barobar tezlashtiradi.",
  },
  {
    id: 4,
    workload: "8K RAW Video Montaj & AI Trening",
    requirement: "Real vaqtda bir necha terabaytli ma’lumotlarni 14 GB/s tezlikda kechikishsiz o‘qish zarur.",
    correctDevice: 'nvme5',
    explanation: "PCIe 5.0 x4 shinasidagi NVMe Gen5 SSD 14,000 MB/s o‘tkazuvchanlik bilan og‘ir 8K video oqimlarini qotmasdan qayta ishlaydi.",
  },
];

export const Game10StorageDuel: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const scenario = STORAGE_SCENARIOS[currentIdx];

  const devices = [
    { id: 'hdd', name: "HDD 7200 RPM", speed: "160 MB/s", iops: "100 IOPS", cost: "Eng arzon / GB", icon: "📀" },
    { id: 'sata', name: "SATA SSD 2.5\"", speed: "550 MB/s", iops: "95k IOPS", cost: "O‘rtacha narx", icon: "💿" },
    { id: 'nvme4', name: "NVMe Gen4 SSD", speed: "7400 MB/s", iops: "1M IOPS", cost: "Yuqori unumdorlik", icon: "⚡" },
    { id: 'nvme5', name: "NVMe Gen5 SSD", speed: "14000 MB/s", iops: "2M IOPS", cost: "Ekstremal tezlik", icon: "🚀" },
  ];

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedDevice(id);
    setIsAnswered(true);

    if (id === scenario.correctDevice) {
      sound.playSuccess();
      setScore(prev => prev + 100);
    } else {
      sound.playError();
    }
  };

  const nextScenario = () => {
    sound.playClick();
    if (currentIdx + 1 >= STORAGE_SCENARIOS.length) {
      setIsGameOver(true);
      const earnedCoins = Math.floor((score + 50) / 10);
      const earnedXp = Math.floor((score + 50) / 4);
      sound.playBossVictory();
      confetti({ particleCount: 70, spread: 80 });
      onFinish(score + 100, earnedCoins, earnedXp);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedDevice(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              13-Amaliy · Saqlash Qurilmalari
            </span>
            <span className="text-xs font-mono text-slate-400">Benchmark Duel</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Disklar Dueli & Benchmark Tanlov</h2>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400 font-bold">
            Vazifa: <strong className="text-white">{currentIdx + 1}/{STORAGE_SCENARIOS.length}</strong>
          </div>
          <div className="text-sm font-black text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            {score} Ball
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Workload Brief */}
          <div className="p-5 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Muhandislik Ssenariysi:</div>
            <h3 className="text-xl font-black text-white">{scenario.workload}</h3>
            <p className="text-xs text-slate-300">{scenario.requirement}</p>
          </div>

          {/* 4 Storage Device Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {devices.map(dev => {
              const isSelected = selectedDevice === dev.id;
              const isCorrect = dev.id === scenario.correctDevice;

              return (
                <button
                  key={dev.id}
                  disabled={isAnswered}
                  onClick={() => handleSelect(dev.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 scale-105'
                        : isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                          : 'bg-[#070B14] border-[#1A2642] opacity-40'
                      : 'bg-[#070B14] hover:bg-[#131D33] border-[#1A2642] hover:border-indigo-500 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="text-3xl mb-2">{dev.icon}</div>
                  <h4 className="text-sm font-bold text-white mb-2">{dev.name}</h4>
                  <div className="space-y-1 font-mono text-[11px] text-slate-400">
                    <div>Tezlik: <strong className="text-slate-200">{dev.speed}</strong></div>
                    <div>IOPS: <strong className="text-slate-200">{dev.iops}</strong></div>
                    <div className="text-[10px] text-indigo-400 font-sans">{dev.cost}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-[#070B14] border border-[#1A2642] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase">Muhandis Xulosasi:</span>
                <p className="text-xs text-slate-300">{scenario.explanation}</p>
              </div>

              <button
                onClick={nextScenario}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 shadow-md"
              >
                Keyingi Vazifa ➔
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-10 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Disklar Dueli Yakunlandi!</h3>
          <p className="text-sm text-slate-400">
            Jami ball: <strong className="text-indigo-400 font-mono">{score}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
