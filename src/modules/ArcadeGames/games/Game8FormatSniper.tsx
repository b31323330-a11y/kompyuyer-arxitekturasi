import React, { useState, useEffect } from 'react';
import { 
  Target, 
  RotateCcw, 
  Heart, 
  Flame, 
  Trophy, 
  Sparkles,
  CheckCircle2,
  Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface SniperTarget {
  id: number;
  instruction: string;
  type: 'format' | 'ea' | 'offset';
  question: string;
  correctAnswer: string;
  options: string[];
}

export const SNIPER_TARGETS: SniperTarget[] = [
  {
    id: 1,
    instruction: "add x5, x6, x7",
    type: 'format',
    question: "Ushbu buyruq qaysi RV32I formatiga tegishli?",
    correctAnswer: "R-format",
    options: ["R-format", "I-format", "S-format", "B-format"],
  },
  {
    id: 2,
    instruction: "lw t0, 12(s1)",
    type: 'format',
    question: "Xotiradan yuklash (load) buyrug‘i qaysi formatda?",
    correctAnswer: "I-format",
    options: ["I-format", "S-format", "R-format", "U-format"],
  },
  {
    id: 3,
    instruction: "sw a0, 8(sp)",
    type: 'format',
    question: "Xotiraga yozish (store) buyrug‘ining formati qaysi?",
    correctAnswer: "S-format",
    options: ["S-format", "I-format", "B-format", "R-format"],
  },
  {
    id: 4,
    instruction: "beq t0, t1, loop",
    type: 'format',
    question: "Shartli o‘tish (branch) buyruqlari qaysi formatda?",
    correctAnswer: "B-format",
    options: ["B-format", "J-format", "I-format", "S-format"],
  },
  {
    id: 5,
    instruction: "s0 = 0x10010000 bo‘lsa, lw t1, 16(s0)",
    type: 'ea',
    question: "Ushbu buyruqning samarali manzili (Effective Address) qancha?",
    correctAnswer: "0x10010010",
    options: ["0x10010010", "0x10010016", "0x10010008", "0x10010020"],
  },
  {
    id: 6,
    instruction: "32-bitli butun sonli massiv (int array)",
    type: 'offset',
    question: "6-indeksli elementning bayt ofseti qancha bo‘ladi?",
    correctAnswer: "24 bayt",
    options: ["24 bayt", "6 bayt", "12 bayt", "32 bayt"],
  },
];

export const Game8FormatSniper: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45);

  const target = SNIPER_TARGETS[currentIdx % SNIPER_TARGETS.length];

  const startGame = () => {
    sound.playClick();
    setIsPlaying(true);
    setIsGameOver(false);
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setTimeLeft(45);
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    if (timeLeft <= 0 || lives <= 0) {
      handleGameOver();
      return;
    }

    if (timeLeft <= 5) sound.playTimerWarning();

    const t = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [isPlaying, isGameOver, timeLeft, lives]);

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPlaying(false);
    const earnedCoins = Math.floor(score / 15);
    const earnedXp = Math.floor(score / 8);

    if (score > highScore) {
      sound.playBossVictory();
      confetti({ particleCount: 70, spread: 80 });
    } else {
      sound.playLevelUp();
    }

    onFinish(score, earnedCoins, earnedXp);
  };

  const handleShoot = (selected: string) => {
    if (selected === target.correctAnswer) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const pts = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore(prev => prev + pts);
      sound.playCombo(newCombo);
      setCurrentIdx(prev => prev + 1);
    } else {
      setCombo(0);
      setLives(prev => prev - 1);
      sound.playError();
    }
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              11-Amaliy · Adreslash & ISA
            </span>
            <span className="text-xs font-mono text-slate-400">Tezkor Merganlik</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Format & Adres Mergani</h2>
        </div>

        {isPlaying && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-sm font-bold">
              <Trophy className="w-4 h-4" />
              <span>Eng yaxshi: {highScore}</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-sm">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>{lives}</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-base font-black">
              ⏱️ {timeLeft}s
            </div>
          </div>
        )}
      </div>

      {!isPlaying && !isGameOver && (
        <div className="py-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-4xl shadow-glow-amber animate-pulse">
            🎯
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">ISA Format va Adres Mergani!</h3>
            <p className="text-sm text-slate-400">
              32-bitli RISC-V buyruqlarini (R, I, S, B), Base+Offset samarali manzillari (EA) va massiv bayt ofsetlarini sekundlar ichida to‘g‘ri nishonga oling!
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 text-white font-black text-sm shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
          >
            ▶️ Merganlikni Boshlash (45 soniya)
          </button>
        </div>
      )}

      {isPlaying && target && (
        <div className="space-y-6">
          {/* Target Box */}
          <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] text-center space-y-3 relative overflow-hidden">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center">
              <Crosshair className="w-4 h-4 mr-1 text-amber-400 animate-spin" />
              Nishon Buyruq:
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white font-mono bg-[#0D1424] py-4 px-6 rounded-2xl border border-[#1A2642] inline-block shadow-inner">
              {target.instruction}
            </div>

            <p className="text-sm font-semibold text-slate-300">{target.question}</p>
          </div>

          {/* Options (Targets) */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {target.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleShoot(opt)}
                className="p-5 rounded-2xl bg-[#070B14] hover:bg-amber-950/40 border border-[#1A2642] hover:border-amber-500 font-mono text-lg font-black text-white transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center space-x-2 group"
              >
                <Crosshair className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Merganlik Natijasi: {score} Ball!</h3>
          <p className="text-sm text-slate-400">
            Maks. Kombo: <strong className="text-amber-400">{maxCombo}x</strong> · Tangalar: <strong className="text-yellow-400">+{Math.floor(score / 15)}</strong>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta O‘ynash
          </button>
        </div>
      )}
    </div>
  );
};
