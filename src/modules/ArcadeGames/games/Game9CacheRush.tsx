import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCcw, 
  Heart, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Sparkles,
  Database,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game9CacheRush: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(1);

  // Cache state: 4 lines holding block tags
  // Block size = 16 bytes (addr >> 4)
  const [cacheLines, setCacheLines] = useState<number[]>([]);
  const [currentAddress, setCurrentAddress] = useState<number>(0x1000);

  const generateAddress = (currentCache: number[]) => {
    // 50% chance to generate an address in current cache (Hit), 50% fresh (Miss)
    const wantHit = currentCache.length > 0 && Math.random() > 0.45;
    if (wantHit) {
      const randomTag = currentCache[Math.floor(Math.random() * currentCache.length)];
      const offset = Math.floor(Math.random() * 16);
      return (randomTag << 4) + offset;
    } else {
      const freshTag = 0x100 + Math.floor(Math.random() * 30);
      const offset = Math.floor(Math.random() * 16);
      return (freshTag << 4) + offset;
    }
  };

  const nextAddress = (currentCache: number[]) => {
    const addr = generateAddress(currentCache);
    setCurrentAddress(addr);
  };

  const startGame = () => {
    sound.playClick();
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setRound(1);
    setCacheLines([]);
    const firstAddr = (0x100 << 4) + 4;
    setCurrentAddress(firstAddr);
  };

  const handleDecision = (claimedHit: boolean) => {
    const currentTag = currentAddress >> 4;
    const isActuallyHit = cacheLines.includes(currentTag);

    if (claimedHit === isActuallyHit) {
      // Correct!
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const pts = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore(prev => prev + pts);
      sound.playCombo(newCombo);

      // If it was a miss, load block into cache (max 4 lines FIFO)
      let newCache = [...cacheLines];
      if (!isActuallyHit) {
        if (newCache.length >= 4) newCache.shift();
        newCache.push(currentTag);
        setCacheLines(newCache);
      }

      if (round >= 20) {
        handleGameOver(score + pts);
      } else {
        setRound(prev => prev + 1);
        nextAddress(newCache);
      }
    } else {
      // Wrong!
      setCombo(0);
      const newLives = lives - 1;
      setLives(newLives);
      sound.playError();

      if (newLives <= 0) {
        handleGameOver(score);
      } else {
        let newCache = [...cacheLines];
        if (!isActuallyHit) {
          if (newCache.length >= 4) newCache.shift();
          newCache.push(currentTag);
          setCacheLines(newCache);
        }
        setRound(prev => prev + 1);
        nextAddress(newCache);
      }
    }
  };

  const handleGameOver = (finalScore: number) => {
    setIsGameOver(true);
    setIsPlaying(false);
    const earnedCoins = Math.floor(finalScore / 15);
    const earnedXp = Math.floor(finalScore / 8);

    if (finalScore > highScore) {
      sound.playBossVictory();
      confetti({ particleCount: 70, spread: 80 });
    } else {
      sound.playLevelUp();
    }

    onFinish(finalScore, earnedCoins, earnedXp);
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              12-Amaliy · Kesh Xotira
            </span>
            <span className="text-xs font-mono text-slate-400">Tezkor Hit yoki Miss</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Kesh Snayperi: Hit or Miss Rush</h2>
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

            <div className="px-3 py-1 rounded-xl bg-slate-800 text-xs font-bold text-white">
              Bosqich: {round}/20
            </div>
          </div>
        )}
      </div>

      {!isPlaying && !isGameOver && (
        <div className="py-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-4xl shadow-glow-indigo animate-pulse">
            ⚡
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">Kesh Tezkor Snayperi!</h3>
            <p className="text-sm text-slate-400">
              CPU dan kelayotgan xotira manzillarini kuzatib, kesh qatorlariga qarab manzil 
              <strong className="text-emerald-400"> HIT</strong> yoki <strong className="text-rose-400">MISS</strong> bo‘lishini darhol bashorat qiling!
            </p>
            <p className="text-xs text-slate-500 font-mono">
              (Kesh qatori = 16 bayt, sig‘im = 4 ta liniya)
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 text-white font-black text-sm shadow-lg shadow-pink-500/30 hover:scale-105 transition-all"
          >
            ▶️ Kesh Rushni Boshlash (20 ta So‘rov)
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-6">
          {/* Target Address Card */}
          <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] text-center space-y-3">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
              CPU Xotira Murojaati (Memory Address):
            </span>

            <div className="text-4xl sm:text-5xl font-black text-white font-mono bg-[#0D1424] py-4 px-8 rounded-2xl border border-[#1A2642] inline-block shadow-inner">
              0x{currentAddress.toString(16).toUpperCase()}
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Blok Tegi: <strong className="text-cyan-400">0x{(currentAddress >> 4).toString(16).toUpperCase()}</strong> · Ofset: {currentAddress & 0xF} bayt
            </div>
          </div>

          {/* Current 4 Cache Lines Inspector */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-slate-400 flex items-center">
              <Layers className="w-3.5 h-3.5 mr-1 text-pink-400" />
              Keshdagi Hozirgi Bloklar (L1 Kesh — 4 Qator):
            </span>

            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {[0, 1, 2, 3].map(slot => {
                const tag = cacheLines[slot];
                return (
                  <div key={slot} className="p-3 rounded-xl bg-[#0D1424] border border-[#1A2642] text-center">
                    <div className="text-[10px] text-slate-500">Liniya #{slot}</div>
                    <div className={`font-bold text-sm mt-0.5 ${tag !== undefined ? 'text-emerald-400' : 'text-slate-600'}`}>
                      {tag !== undefined ? `0x${tag.toString(16).toUpperCase()}` : 'Bo‘sh'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HIT or MISS Action Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <button
              onClick={() => handleDecision(true)}
              className="p-5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border-2 border-emerald-500/60 hover:border-emerald-400 font-black text-xl text-emerald-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10 flex flex-col items-center justify-center space-y-1"
            >
              <span>🟢 HIT!</span>
              <span className="text-[10px] font-normal text-emerald-400">Keshda Bor (Tezkor)</span>
            </button>

            <button
              onClick={() => handleDecision(false)}
              className="p-5 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 border-2 border-rose-500/60 hover:border-rose-400 font-black text-xl text-rose-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/10 flex flex-col items-center justify-center space-y-1"
            >
              <span>🔴 MISS!</span>
              <span className="text-[10px] font-normal text-rose-400">Keshda Yo‘q (RAM dan)</span>
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Kesh Snayperi Natijasi: {score} Ball!</h3>
          <p className="text-sm text-slate-400">
            Maks. Kombo: <strong className="text-amber-400">{maxCombo}x</strong> · Yutilgan tangalar: <strong className="text-yellow-400">+{Math.floor(score / 15)}</strong>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta O‘ynash
          </button>
        </div>
      )}
    </div>
  );
};
