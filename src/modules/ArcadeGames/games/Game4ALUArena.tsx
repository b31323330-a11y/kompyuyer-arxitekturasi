import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  Heart, 
  Flame, 
  Trophy, 
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface ALUProblem {
  a: number; // 0..255
  b: number; // 0..255
  op: '+' | '-';
  isOverflow: boolean;
  expectedResult: number;
}

export const Game4ALUArena: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);

  const [currentProblem, setCurrentProblem] = useState<ALUProblem | null>(null);
  const [options, setOptions] = useState<{ result: number; overflow: boolean; label: string }[]>([]);

  const generateProblem = (): ALUProblem => {
    const isAdd = Math.random() > 0.35;
    if (isAdd) {
      const a = Math.floor(Math.random() * 200) + 20;
      const b = Math.floor(Math.random() * 150) + 20;
      const sum = a + b;
      const isOverflow = sum > 255;
      return {
        a,
        b,
        op: '+',
        isOverflow,
        expectedResult: sum & 0xFF,
      };
    } else {
      const a = Math.floor(Math.random() * 200) + 30;
      const b = Math.floor(Math.random() * 200) + 10;
      const diff = a - b;
      const isOverflow = diff < 0; // unsigned underflow/borrow
      return {
        a,
        b,
        op: '-',
        isOverflow,
        expectedResult: (diff + 256) & 0xFF,
      };
    }
  };

  const nextRound = () => {
    const p = generateProblem();
    setCurrentProblem(p);

    // 4 options: correct result with correct overflow, correct result with wrong overflow, and 2 distractors
    const correctOption = {
      result: p.expectedResult,
      overflow: p.isOverflow,
      label: `${(p.expectedResult).toString(2).padStart(8, '0')}₂ (${p.expectedResult}) ${p.isOverflow ? '⚠️ OVERFLOW' : '✅ NO OVERFLOW'}`,
    };

    const wrongOvOption = {
      result: p.expectedResult,
      overflow: !p.isOverflow,
      label: `${(p.expectedResult).toString(2).padStart(8, '0')}₂ (${p.expectedResult}) ${!p.isOverflow ? '⚠️ OVERFLOW' : '✅ NO OVERFLOW'}`,
    };

    const wrongRes1 = (p.expectedResult + 1) & 0xFF;
    const dist1 = {
      result: wrongRes1,
      overflow: p.isOverflow,
      label: `${wrongRes1.toString(2).padStart(8, '0')}₂ (${wrongRes1}) ${p.isOverflow ? '⚠️ OVERFLOW' : '✅ NO OVERFLOW'}`,
    };

    const wrongRes2 = (p.expectedResult ^ 2) & 0xFF;
    const dist2 = {
      result: wrongRes2,
      overflow: !p.isOverflow,
      label: `${wrongRes2.toString(2).padStart(8, '0')}₂ (${wrongRes2}) ${!p.isOverflow ? '⚠️ OVERFLOW' : '✅ NO OVERFLOW'}`,
    };

    const allOpts = [correctOption, wrongOvOption, dist1, dist2].sort(() => Math.random() - 0.5);
    setOptions(allOpts);
  };

  const startGame = () => {
    sound.playClick();
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setTimeLeft(60);
    nextRound();
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

  const handleSelectOption = (opt: { result: number; overflow: boolean }) => {
    if (!currentProblem) return;

    const isCorrect = opt.result === currentProblem.expectedResult && opt.overflow === currentProblem.isOverflow;

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const pts = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore(prev => prev + pts);
      sound.playCombo(newCombo);
      nextRound();
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
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              6-Amaliy · Fast Math & Flags
            </span>
            <span className="text-xs font-mono text-slate-400">ALU Arifmetika Arenasi</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Carry/Borrow & Overflow Arena</h2>
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
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-4xl shadow-glow-emerald animate-pulse">
            ➕
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">ALU Arifmetik Tezlik Sinovi!</h3>
            <p className="text-sm text-slate-400">
              8-bitli ishorasiz arifmetikada (0..255) ikkilik qo‘shish va ayirish amallarini bajaring hamda 
              <strong> Overflow (To‘lib ketish)</strong> bayrog‘ini to‘g‘ri aniqlang!
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
          >
            ▶️ Arenaga Kirish (60 soniya)
          </button>
        </div>
      )}

      {isPlaying && currentProblem && (
        <div className="space-y-6">
          {/* Problem Card */}
          <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] max-w-lg mx-auto text-center space-y-4">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              8-bitli Ishorasiz Arifmetika Masalasi:
            </div>

            <div className="font-mono text-3xl font-black text-white space-y-1">
              <div>{currentProblem.a.toString(2).padStart(8, '0')}₂ ({currentProblem.a})</div>
              <div className="text-emerald-400">{currentProblem.op} {currentProblem.b.toString(2).padStart(8, '0')}₂ ({currentProblem.b})</div>
              <div className="border-t border-slate-700 pt-1 text-slate-500">═════════════</div>
            </div>

            <p className="text-xs text-slate-400">
              To‘g‘ri 8-bitli natijani va Overflow bayrog‘i holatini tanlang:
            </p>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt)}
                className="p-4 rounded-2xl bg-[#070B14] hover:bg-emerald-950/40 border border-[#1A2642] hover:border-emerald-500 text-left transition-all hover:scale-105 active:scale-95 group font-mono"
              >
                <div className="text-sm font-bold text-white group-hover:text-emerald-300">
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">ALU Arena: {score} Ball!</h3>
          <p className="text-sm text-slate-400">
            Maks. Kombo: <strong className="text-amber-400">{maxCombo}x</strong> · Mukofot: <strong className="text-yellow-400">+{Math.floor(score / 15)} Tanga</strong>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta O‘ynash
          </button>
        </div>
      )}
    </div>
  );
};
