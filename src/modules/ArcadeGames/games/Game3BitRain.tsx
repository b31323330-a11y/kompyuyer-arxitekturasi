import React, { useState, useEffect } from 'react';
import { 
  Binary, 
  RotateCcw, 
  Flame, 
  Heart, 
  Trophy, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game3BitRain: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [mode, setMode] = useState<'rain' | 'tetrad'>('rain');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Stats
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);

  // Mode 1: Bit Rain
  const [targetNum, setTargetNum] = useState(42);
  const [displayFormat, setDisplayFormat] = useState<'DEC' | 'HEX' | 'OCT'>('DEC');
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);

  // Mode 2: Tetrad / Triad Rush
  const [tetradHex, setTetradHex] = useState('A');
  const [tetradCorrectBin, setTetradCorrectBin] = useState('1010');
  const [tetradOptions, setTetradOptions] = useState<string[]>([]);

  const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];
  const currentSum = bits.reduce((acc, b, i) => acc + b * BIT_WEIGHTS[i], 0);

  const generateRainTarget = () => {
    const num = Math.floor(Math.random() * 250) + 5; // 5..255
    setTargetNum(num);
    const fmts: ('DEC' | 'HEX' | 'OCT')[] = ['DEC', 'HEX', 'OCT'];
    setDisplayFormat(fmts[Math.floor(Math.random() * fmts.length)]);
    setBits([0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const generateTetradTarget = () => {
    const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const digit = hexDigits[Math.floor(Math.random() * hexDigits.length)];
    const dec = parseInt(digit, 16);
    const correctBin = dec.toString(2).padStart(4, '0');

    // Create 3 distractors
    const distractors = new Set<string>();
    while (distractors.size < 3) {
      const r = Math.floor(Math.random() * 16);
      const bin = r.toString(2).padStart(4, '0');
      if (bin !== correctBin) distractors.add(bin);
    }

    const opts = [correctBin, ...Array.from(distractors)].sort(() => Math.random() - 0.5);
    setTetradHex(digit);
    setTetradCorrectBin(correctBin);
    setTetradOptions(opts);
  };

  const startGame = (selectedMode: 'rain' | 'tetrad') => {
    sound.playClick();
    setMode(selectedMode);
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setTimeLeft(60);

    if (selectedMode === 'rain') {
      generateRainTarget();
    } else {
      generateTetradTarget();
    }
  };

  // Timer
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

  // Toggle single bit
  const toggleBit = (idx: number) => {
    sound.playBitToggle(bits[idx] === 0);
    setBits(prev => {
      const copy = [...prev];
      copy[idx] = copy[idx] === 1 ? 0 : 1;
      return copy;
    });
  };

  // Submit Bit Rain solution
  const handleCheckBitRain = () => {
    if (currentSum === targetNum) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const points = 100 + (newCombo > 1 ? newCombo * 30 : 0);
      setScore(prev => prev + points);
      sound.playCombo(newCombo);
      generateRainTarget();
    } else {
      setCombo(0);
      setLives(prev => prev - 1);
      sound.playError();
    }
  };

  // Submit Tetrad option
  const handleSelectTetrad = (selected: string) => {
    if (selected === tetradCorrectBin) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const points = 80 + (newCombo > 1 ? newCombo * 20 : 0);
      setScore(prev => prev + points);
      sound.playCombo(newCombo);
      generateTetradTarget();
    } else {
      setCombo(0);
      setLives(prev => prev - 1);
      sound.playError();
    }
  };

  const getTargetFormatted = () => {
    if (displayFormat === 'HEX') return `0x${targetNum.toString(16).toUpperCase()} (HEX)`;
    if (displayFormat === 'OCT') return `${targetNum.toString(8)}₈ (OCT)`;
    return `${targetNum}₁₀ (DEC)`;
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              4 & 5-Amaliy · Refleks & Konvertatsiya
            </span>
            <span className="text-xs font-mono text-slate-400">Tezkor Bitlar O‘yini</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Bit Yomg‘iri & Tetrad Konverter</h2>
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
        <div className="py-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-4xl shadow-glow-cyan animate-pulse">
            🔢
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">O‘yin Rejimini Tanlang:</h3>
            <p className="text-sm text-slate-400">
              Sanoq tizimlari o‘rtasida tezkor ikkilik konvertatsiyani charxlang!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
            <button
              onClick={() => startGame('rain')}
              className="p-5 rounded-2xl bg-[#070B14] hover:bg-[#131D33] border border-[#1A2642] hover:border-cyan-500 text-left transition-all hover:scale-105 group"
            >
              <div className="text-2xl mb-2">🌧️</div>
              <h4 className="text-base font-black text-white group-hover:text-cyan-400">1. Bit Yomg‘iri</h4>
              <p className="text-xs text-slate-400 mt-1">DEC, OCT yoki HEX sonlarni 8-bit kalitlar orqali tezkor yig‘ish.</p>
            </button>

            <button
              onClick={() => startGame('tetrad')}
              className="p-5 rounded-2xl bg-[#070B14] hover:bg-[#131D33] border border-[#1A2642] hover:border-indigo-500 text-left transition-all hover:scale-105 group"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="text-base font-black text-white group-hover:text-indigo-400">2. Tetrad Rush</h4>
              <p className="text-xs text-slate-400 mt-1">16-lik raqamiga (0..F) mos 4-bitli ikkilik tetradani bir zumda topish.</p>
            </button>
          </div>
        </div>
      )}

      {isPlaying && mode === 'rain' && (
        <div className="space-y-6">
          {/* Target Number Display */}
          <div className="text-center p-6 bg-[#070B14] rounded-3xl border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Nishon Sonni Ikkilikda Yig‘ing:
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight animate-pulse">
              {getTargetFormatted()}
            </div>
            <div className="text-xs text-slate-400">
              Siz yig‘gan qiymat: <strong className="text-cyan-300 font-mono text-base">{currentSum}</strong>
            </div>
          </div>

          {/* 8-bit Switches */}
          <div className="space-y-2">
            <div className="grid grid-cols-8 gap-2">
              {BIT_WEIGHTS.map((weight, idx) => {
                const isOn = bits[idx] === 1;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={`py-5 rounded-2xl font-mono flex flex-col items-center justify-center transition-all ${
                      isOn 
                        ? 'bg-gradient-to-t from-cyan-600 to-blue-500 text-white shadow-glow-cyan scale-105' 
                        : 'bg-[#070B14] border border-[#1A2642] text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl font-black">{bits[idx]}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-sans">{weight}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Ikkilik kod:</span>
              <span className="font-mono text-white text-base font-bold bg-[#070B14] px-3 py-1 rounded-xl border border-[#1A2642]">
                {bits.join('')}₂
              </span>
            </div>

            <button
              onClick={handleCheckBitRain}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm shadow-glow-cyan transition-transform hover:scale-105"
            >
              🚀 Yuborish (Tekshirish)
            </button>
          </div>
        </div>
      )}

      {isPlaying && mode === 'tetrad' && (
        <div className="space-y-6">
          <div className="text-center p-6 bg-[#070B14] rounded-3xl border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              16-lik (Hex) Raqamining 4-bitli Tetradasi:
            </span>
            <div className="text-5xl font-black text-amber-400 font-mono">
              0x{tetradHex}
            </div>
            <p className="text-xs text-slate-400">Quyidagi 4 ta variantdan to‘g‘ri tetradani tanlang:</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {tetradOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectTetrad(opt)}
                className="p-5 rounded-2xl bg-[#070B14] hover:bg-indigo-950/40 border border-[#1A2642] hover:border-indigo-500 font-mono text-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                {opt}₂
              </button>
            ))}
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Natija: {score} Ball!</h3>
          <p className="text-sm text-slate-400">
            Maksimal kombo: <strong className="text-amber-400">{maxCombo}x</strong> · Yutilgan tangalar: <strong className="text-yellow-400">+{Math.floor(score / 15)}</strong>
          </p>

          <button
            onClick={() => startGame(mode)}
            className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta O‘ynash
          </button>
        </div>
      )}
    </div>
  );
};
