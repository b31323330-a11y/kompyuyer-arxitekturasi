import React, { useState } from 'react';
import { 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Sparkles, 
  Calculator,
  Sliders,
  HelpCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface MemoryTier {
  id: string;
  rank: number; // 1 = highest/fastest, 8 = lowest/slowest
  name: string;
  speed: string; // latency
  capacity: string;
  cost: string;
  tech: string;
}

const MEMORY_TIERS: MemoryTier[] = [
  { id: 't1', rank: 1, name: "CPU Registrlari (Registers)", speed: "< 1 ns (0.5 takt)", capacity: "< 1 KB", cost: "O'ta qimmat", tech: "SRAM flip-floplar CPU yadrosida" },
  { id: 't2', rank: 2, name: "L1 Kesh (Level 1 Cache)", speed: "1 - 2 ns (2-4 takt)", capacity: "32 - 64 KB", cost: "O'ta yuqori", tech: "SRAM yadroning eng ichki qismi" },
  { id: 't3', rank: 3, name: "L2 Kesh (Level 2 Cache)", speed: "3 - 7 ns (10-14 takt)", capacity: "512 KB - 1 MB", cost: "Juda yuqori", tech: "Har bir yadro uchun maxsus SRAM" },
  { id: 't4', rank: 4, name: "L3 Kesh (Level 3 Shared)", speed: "10 - 20 ns (40-60 takt)", capacity: "16 - 96 MB", cost: "Yuqori", tech: "Barcha yadrolar o'rtasida umumiy SRAM" },
  { id: 't5', rank: 5, name: "Operativ Xotira (DRAM / DDR4/DDR5)", speed: "50 - 80 ns", capacity: "16 - 64 GB", cost: "O'rtacha", tech: "Dinamik kondensatorli matritsa (Refresh talab)" },
  { id: 't6', rank: 6, name: "NVMe M.2 PCIe SSD", speed: "10 - 50 µs (mikrosekund)", capacity: "512 GB - 4 TB", cost: "Hamyonbop", tech: "3D TLC/QLC NAND Flash (PCIe interfeysi)" },
  { id: 't7', rank: 7, name: "SATA III SSD", speed: "50 - 150 µs", capacity: "256 GB - 2 TB", cost: "Arzon", tech: "SATA III (600 MB/s chegara) Flash" },
  { id: 't8', rank: 8, name: "Qattiq Disk (HDD / Magnit disk)", speed: "5 - 15 ms (millisekund)", capacity: "2 - 20 TB", cost: "Eng arzon", tech: "Mexanik aylanuvchi disk va magnit boshcha" },
];

export const Game9MemoryPyramid: React.FC<GameProps> = ({ onFinish, highScore }) => {
  // Shuffle tiers for placement puzzle
  const [placedTiers, setPlacedTiers] = useState<MemoryTier[]>(() => {
    return [...MEMORY_TIERS].sort(() => Math.random() - 0.5);
  });
  
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState(0);

  // EAT Interactive Simulator State
  const [hitRate, setHitRate] = useState(0.95); // 95%
  const [cacheTime, setCacheTime] = useState(2); // 2 ns
  const [memTime, setMemTime] = useState(60); // 60 ns
  const [activeTab, setActiveTab] = useState<'pyramid' | 'eat'>('pyramid');

  // EAT Calculation: EAT = h * Tc + (1 - h) * Tm
  const calculatedEAT = (hitRate * cacheTime + (1 - hitRate) * memTime).toFixed(2);

  const handleSwap = (idx1: number, idx2: number) => {
    if (idx1 < 0 || idx1 >= placedTiers.length || idx2 < 0 || idx2 >= placedTiers.length) return;
    sound.playClick();
    const updated = [...placedTiers];
    const temp = updated[idx1];
    updated[idx1] = updated[idx2];
    updated[idx2] = temp;
    setPlacedTiers(updated);
    setSelectedIdx(null);
    setIsVerified(false);
  };

  const handleVerifyPyramid = () => {
    let correctCount = 0;
    placedTiers.forEach((tier, idx) => {
      if (tier.rank === idx + 1) correctCount++;
    });

    const calculatedScore = correctCount * 25;
    setAccuracyScore(calculatedScore);
    setIsVerified(true);

    if (correctCount === 8) {
      sound.playLevelUp();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      onFinish(200, 40, 220);
    } else {
      sound.playWrong();
    }
  };

  const handleReset = () => {
    setPlacedTiers([...MEMORY_TIERS].sort(() => Math.random() - 0.5));
    setSelectedIdx(null);
    setIsVerified(false);
    setAccuracyScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-amber-600 to-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Xotira Piramidasi Quruvchisi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-400 border border-amber-800">
                12-amaliy
              </span>
            </h2>
            <p className="text-xs text-slate-400">8 qavatli xotira iyerarxiyasi & EAT Kalkulyatori</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pyramid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pyramid'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Piramida Boshqotirmasi
          </button>
          <button
            onClick={() => setActiveTab('eat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'eat'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            EAT Simulyatori
          </button>
        </div>
      </div>

      {activeTab === 'pyramid' ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Qavatlarni Tezlik & Narx Bo'yicha Tartiblang
              </h3>
              <p className="text-xs text-slate-400">
                Eng tezkor va qimmat qatlam eng tepada (1-o'rinda), eng sekin va arzoni eng pastda bo'lishi shart!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Aralashtirish
              </button>
              <button
                onClick={handleVerifyPyramid}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Tekshirish
              </button>
            </div>
          </div>

          {/* Hierarchy Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2 py-1 bg-slate-950/60 rounded-lg border border-slate-800">
            <span className="flex items-center gap-1 text-emerald-400">
              <ArrowUp className="w-3.5 h-3.5" /> Yuqori tezlik, Kichik hajm, Yuqori narx
            </span>
            <span className="flex items-center gap-1 text-blue-400">
              Katta sig'im, Arzon narx, Sekin <ArrowDown className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Pyramid Slots */}
          <div className="space-y-2">
            {placedTiers.map((tier, idx) => {
              const isCorrect = isVerified && tier.rank === idx + 1;
              const isWrong = isVerified && tier.rank !== idx + 1;
              const isSelected = selectedIdx === idx;

              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    if (selectedIdx === null) {
                      setSelectedIdx(idx);
                    } else if (selectedIdx === idx) {
                      setSelectedIdx(null);
                    } else {
                      handleSwap(selectedIdx, idx);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-500/50'
                      : isCorrect
                      ? 'border-emerald-500/60 bg-emerald-950/30'
                      : isWrong
                      ? 'border-red-500/60 bg-red-950/30'
                      : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      isCorrect ? 'bg-emerald-500 text-slate-950' : isWrong ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {tier.name}
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                        <span>Tezlik: <strong className="text-cyan-400">{tier.speed}</strong></span>
                        <span>Sig'im: <strong className="text-amber-400">{tier.capacity}</strong></span>
                        <span>Narxi: <strong className="text-slate-300">{tier.cost}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Up / Down Controls */}
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <button
                      disabled={idx === 0}
                      onClick={() => handleSwap(idx, idx - 1)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                      title="Yuqoriga surish"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={idx === placedTiers.length - 1}
                      onClick={() => handleSwap(idx, idx + 1)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                      title="Pastga surish"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {isVerified && (
            <div className={`p-4 rounded-xl text-center font-bold text-sm border ${
              accuracyScore === 200 
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' 
                : 'bg-amber-950/40 border-amber-500 text-amber-300'
            }`}>
              {accuracyScore === 200 
                ? "Mukammal! Barcha 8 ta qatlam xotira iyerarxiyasiga to'g'ri joylashtirildi (+200 Ball, +40 Tanga)!"
                : `Natija: ${accuracyScore} / 200 ball. Qizil rangdagi qatlamlar o'rnini almashtiring!`}
            </div>
          )}
        </div>
      ) : (
        /* EAT Interactive Simulator */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              O'rtacha Murojaat Vaqti (EAT — Effective Access Time)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Formula: <code className="px-2 py-0.5 bg-slate-950 rounded text-amber-400 font-mono">EAT = h * Tc + (1 - h) * Tm</code> (h: Hit rate, Tc: Kesh vaqti, Tm: Asosiy xotira vaqti)
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Keshda Topish (Hit Rate):</span>
                <span className="text-amber-400 font-mono">{(hitRate * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.99"
                step="0.01"
                value={hitRate}
                onChange={e => setHitRate(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Hit Rate qancha yuqori bo'lsa, EAT shuncha kamayadi.</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">Keshga Murojaat (Tc):</span>
                <span className="text-cyan-400 font-mono">{cacheTime} ns</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={cacheTime}
                onChange={e => setCacheTime(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">L1 kesh odatda 1 - 2 ns ichida javob beradi.</p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">RAM Murojaat (Tm):</span>
                <span className="text-purple-400 font-mono">{memTime} ns</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="5"
                value={memTime}
                onChange={e => setMemTime(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">DRAM kechikishi keshdan 30-50 barobar sekin.</p>
            </div>
          </div>

          {/* Live Result Display */}
          <div className="bg-gradient-to-r from-amber-950/40 to-orange-950/40 border border-amber-500/40 rounded-2xl p-6 text-center space-y-2 shadow-2xl">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400">Hisoblangan Natija</span>
            <div className="text-5xl font-black text-white font-mono tracking-tight">
              {calculatedEAT} <span className="text-2xl text-amber-400 font-normal">ns</span>
            </div>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Agar Hit Rate {(hitRate * 100).toFixed(0)}% bo'lsa, protsessor xotiraga o'rtacha {calculatedEAT} nanosekundda murojaat qiladi (sof RAM ga qaraganda {(memTime / parseFloat(calculatedEAT)).toFixed(1)}x marta tezroq)!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
