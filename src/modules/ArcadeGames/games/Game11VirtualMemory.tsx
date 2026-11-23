import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  RotateCcw, 
  Heart, 
  Flame, 
  Trophy, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game11VirtualMemory: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(1);

  // 4 RAM Physical Frames holding Virtual Page IDs (or null)
  const [frames, setFrames] = useState<(number | null)[]>([null, null, null, null]);
  const [targetPage, setTargetPage] = useState(2);
  const [isPageFault, setIsPageFault] = useState(false);

  const generatePageRequest = (currentFrames: (number | null)[]) => {
    // 50% chance of requesting a page already in frames
    const filled = currentFrames.filter((f): f is number => f !== null);
    if (filled.length > 0 && Math.random() > 0.4) {
      return filled[Math.floor(Math.random() * filled.length)];
    } else {
      return Math.floor(Math.random() * 8); // Pages 0..7
    }
  };

  const nextRequest = (currentFrames: (number | null)[]) => {
    const nextP = generatePageRequest(currentFrames);
    setTargetPage(nextP);
    setIsPageFault(!currentFrames.includes(nextP));
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
    const initialFrames: (number | null)[] = [0, 1, null, null];
    setFrames(initialFrames);
    const firstTarget = 2;
    setTargetPage(firstTarget);
    setIsPageFault(!initialFrames.includes(firstTarget));
  };

  // User claims RAM Hit
  const handleClaimHit = () => {
    if (frames.includes(targetPage)) {
      // Correct!
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const pts = 80 + (newCombo > 1 ? newCombo * 20 : 0);
      setScore(prev => prev + pts);
      sound.playCombo(newCombo);

      if (round >= 15) {
        handleGameOver(score + pts);
      } else {
        setRound(prev => prev + 1);
        nextRequest(frames);
      }
    } else {
      // Wrong! It's actually a page fault!
      setCombo(0);
      const newLives = lives - 1;
      setLives(newLives);
      sound.playError();
      if (newLives <= 0) handleGameOver(score);
    }
  };

  // User handles Page Fault by selecting which frame to evict
  const handleSwapIntoFrame = (frameIdx: number) => {
    if (!frames.includes(targetPage)) {
      // Correct page fault handling!
      const newFrames = [...frames];
      newFrames[frameIdx] = targetPage;
      setFrames(newFrames);

      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const pts = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore(prev => prev + pts);
      sound.playCombo(newCombo);

      if (round >= 15) {
        handleGameOver(score + pts);
      } else {
        setRound(prev => prev + 1);
        nextRequest(newFrames);
      }
    } else {
      // It was already in RAM, no need to swap!
      setCombo(0);
      const newLives = lives - 1;
      setLives(newLives);
      sound.playError();
      if (newLives <= 0) handleGameOver(score);
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
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              14-Amaliy · Virtual Xotira
            </span>
            <span className="text-xs font-mono text-slate-400">Paging & Swap Himoyasi</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Virtual Xotira & Page Fault Himoyasi</h2>
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
              So‘rov: {round}/15
            </div>
          </div>
        )}
      </div>

      {!isPlaying && !isGameOver && (
        <div className="py-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-4xl shadow-glow-cyan animate-pulse">
            📄
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">MMU Sahifalash Himoyachisi!</h3>
            <p className="text-sm text-slate-400">
              CPU virtual sahifalarga murojaat qiladi (Page 0..7). Agar sahifa RAM da bo‘lsa — 
              <strong className="text-emerald-400"> RAM HIT</strong> bosing. Agar yo‘q bo‘lsa — 
              <strong className="text-amber-400"> Page Fault</strong> ro‘y beradi, qaysi freymga Swap qilishni tanlang!
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 text-white font-black text-sm shadow-lg shadow-teal-500/30 hover:scale-105 transition-all"
          >
            ▶️ Xotira Boshqaruvini Boshlash (15 ta So‘rov)
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="space-y-6">
          {/* Target Request Card */}
          <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] text-center space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              CPU Murojaat Qilayotgan Virtual Sahifa (Virtual Page):
            </span>

            <div className="text-4xl font-black text-white font-mono bg-[#0D1424] py-3 px-8 rounded-2xl border border-[#1A2642] inline-block shadow-inner">
              Sahifa #{targetPage} (Page {targetPage})
            </div>

            <p className="text-xs text-slate-400">
              Quyidagi 4 ta fizik freymga (RAM Frames) qarang: sahifa RAM da bormi?
            </p>
          </div>

          {/* 4 Physical RAM Frames */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400">
              Fizik Xotira Freymlari (RAM — 4 ta Freym):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {frames.map((pageId, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    pageId === targetPage
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-glow-indigo'
                      : 'bg-[#070B14] border-[#1A2642] text-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-sans">Freym #{idx}</div>
                  <div className="text-lg font-black mt-1">
                    {pageId !== null ? `Page ${pageId}` : 'Bo‘sh (Empty)'}
                  </div>

                  {/* Swap Button if Page Fault */}
                  <button
                    onClick={() => handleSwapIntoFrame(idx)}
                    className="mt-3 w-full py-1.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-sans font-bold transition-colors"
                  >
                    Shu Freymga Swap 📥
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RAM Hit Action */}
          <div className="text-center pt-2">
            <button
              onClick={handleClaimHit}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-black text-sm shadow-glow-indigo hover:scale-105 transition-all"
            >
              🟢 RAM HIT (Sahifa Allaqachon RAM da Bor!)
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="py-8 text-center space-y-6">
          <div className="text-4xl">🏆</div>
          <h3 className="text-2xl font-black text-white">Virtual Xotira Natijasi: {score} Ball!</h3>
          <p className="text-sm text-slate-400">
            Maks. Kombo: <strong className="text-amber-400">{maxCombo}x</strong> · Yutilgan tangalar: <strong className="text-yellow-400">+{Math.floor(score / 15)}</strong>
          </p>

          <button
            onClick={startGame}
            className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md"
          >
            🔄 Qayta O‘ynash
          </button>
        </div>
      )}
    </div>
  );
};
