import React, { useState } from 'react';
import { 
  Layers, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Coins, 
  Lightbulb 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface KMapPuzzle {
  id: number;
  title: string;
  cells: number[]; // 8 cells: [m0, m1, m2, m3, m4, m5, m6, m7]
  correctSop: string;
  options: string[];
  explanation: string;
}

export const KMAP_PUZZLES: KMapPuzzle[] = [
  {
    id: 1,
    title: "1-Jumboq: Qirralararo O‘ralish (Wrap-Around 4-talik)",
    cells: [1, 0, 1, 0, 1, 0, 1, 0], // m0, m2, m4, m6
    correctSop: "¬C",
    options: ["¬C", "¬A · ¬B", "A + B", "B · ¬C"],
    explanation: "00 va 10 ustunlaridagi barcha 4 ta katak (m0, m2, m4, m6) qirralararo o‘ralib 4-talik guruh hosil qiladi: A va B o‘zgaradi, faqat C=0 (¬C) qoladi.",
  },
  {
    id: 2,
    title: "2-Jumboq: Gorizontal Qator (A=1)",
    cells: [0, 0, 0, 0, 1, 1, 1, 1], // m4, m5, m6, m7
    correctSop: "A",
    options: ["A", "¬A", "B · C", "A + B"],
    explanation: "A=1 bo‘lgan butun ikkinchi qatordagi barcha 4 ta katak 1. BC o‘zgaruvchilar barcha holatlarni qamrab olib yo‘qoladi, faqat A qoladi.",
  },
  {
    id: 3,
    title: "3-Jumboq: Vertikal Ustun (BC=11)",
    cells: [0, 0, 0, 1, 0, 0, 0, 1], // m3, m7
    correctSop: "B · C",
    options: ["B · C", "¬B · C", "A · B", "¬A · C"],
    explanation: "BC=11 ustunidagi ikkala katak (m3 va m7) birlashadi: A o‘zgaradi (0 va 1), natija: B · C.",
  },
  {
    id: 4,
    title: "4-Jumboq: Yuqori Juftlik (m0 va m1)",
    cells: [1, 1, 0, 0, 0, 0, 0, 0], // m0, m1
    correctSop: "¬A · ¬B",
    options: ["¬A · ¬B", "¬A · B", "A · ¬B", "¬A · ¬C"],
    explanation: "A=0 qatorida BC=00 va 01 kataklari birlashadi. C o‘zgaradi (0 va 1), natijada: ¬A · ¬B.",
  },
];

export const Game6KarnaughHunter: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const puzzle = KMAP_PUZZLES[currentIdx];

  // Grid mapping for 3-variable K-map (Gray code: 00, 01, 11, 10)
  // Row A=0: m0, m1, m3, m2
  // Row A=1: m4, m5, m7, m6
  const row0 = [0, 1, 3, 2];
  const row1 = [4, 5, 7, 6];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);

    if (opt === puzzle.correctSop) {
      sound.playSuccess();
      setScore(prev => prev + 100);
    } else {
      sound.playError();
    }
  };

  const nextPuzzle = () => {
    sound.playClick();
    if (currentIdx + 1 >= KMAP_PUZZLES.length) {
      setIsGameOver(true);
      const earnedCoins = Math.floor((score + 50) / 10);
      const earnedXp = Math.floor((score + 50) / 4);
      sound.playBossVictory();
      confetti({ particleCount: 70, spread: 80 });
      onFinish(score + 100, earnedCoins, earnedXp);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              9-Amaliy · Bul Minimallashtirish
            </span>
            <span className="text-xs font-mono text-slate-400">Gray Kodi & Wrap-Around</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Karnaugh Ovi (K-Map Hunter)</h2>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400 font-bold">
            Jumboq: <strong className="text-white">{currentIdx + 1}/{KMAP_PUZZLES.length}</strong>
          </div>
          <div className="text-sm font-black text-amber-400 font-mono bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            {score} Ball
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642]">
            <h3 className="text-base font-bold text-white mb-1">{puzzle.title}</h3>
            <p className="text-xs text-slate-400">
              Quyidagi 3 o‘zgaruvchili Karnaugh xaritasidagi 1-lar guruhini tahlil qiling va unga mos keluvchi minimal SOP (Sum of Products) formulasini toping:
            </p>
          </div>

          {/* Interactive K-Map Grid */}
          <div className="max-w-md mx-auto bg-[#070B14] p-6 rounded-3xl border border-[#1A2642] font-mono text-center shadow-xl">
            <div className="grid grid-cols-5 gap-2 items-center">
              <div className="text-xs text-indigo-400 font-black">A \ BC</div>
              <div className="text-xs text-slate-400 font-bold">00</div>
              <div className="text-xs text-slate-400 font-bold">01</div>
              <div className="text-xs text-slate-400 font-bold">11</div>
              <div className="text-xs text-slate-400 font-bold">10</div>

              {/* Row A=0 */}
              <div className="text-xs text-slate-400 font-bold">A = 0</div>
              {row0.map(m => {
                const val = puzzle.cells[m];
                return (
                  <div
                    key={m}
                    className={`py-3.5 rounded-xl text-lg font-black transition-all ${
                      val === 1 
                        ? 'bg-gradient-to-t from-violet-600 to-indigo-500 text-white shadow-glow-indigo scale-105' 
                        : 'bg-[#0D1424] text-slate-600 border border-slate-800'
                    }`}
                  >
                    {val}
                  </div>
                );
              })}

              {/* Row A=1 */}
              <div className="text-xs text-slate-400 font-bold">A = 1</div>
              {row1.map(m => {
                const val = puzzle.cells[m];
                return (
                  <div
                    key={m}
                    className={`py-3.5 rounded-xl text-lg font-black transition-all ${
                      val === 1 
                        ? 'bg-gradient-to-t from-violet-600 to-indigo-500 text-white shadow-glow-indigo scale-105' 
                        : 'bg-[#0D1424] text-slate-600 border border-slate-800'
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {puzzle.options.map((opt, i) => {
              const isSelected = selectedOpt === opt;
              const isCorrect = opt === puzzle.correctSop;

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl border font-mono text-lg font-black transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                        : isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                          : 'bg-[#070B14] border-[#1A2642] text-slate-500'
                      : 'bg-[#070B14] hover:bg-[#131D33] border-[#1A2642] hover:border-violet-500 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  Y = {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-[#070B14] border border-[#1A2642] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold text-violet-400 uppercase">Nazariy Izoh:</span>
                <p className="text-xs text-slate-300">{puzzle.explanation}</p>
              </div>

              <button
                onClick={nextPuzzle}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shrink-0 shadow-md"
              >
                Keyingi Jumboq ➔
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="py-10 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Barcha K-Map Jumboqlari Yechildi!</h3>
          <p className="text-sm text-slate-400">
            To‘plangan umumiy ball: <strong className="text-violet-400 font-mono">{score}</strong>
          </p>

          <button
            onClick={resetGame}
            className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta Boshlash
          </button>
        </div>
      )}
    </div>
  );
};
