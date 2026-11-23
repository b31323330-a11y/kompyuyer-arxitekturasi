import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Cpu, 
  Database, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Coins, 
  RotateCcw, 
  Timer,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface MemoryRequest {
  id: string;
  type: 'READ' | 'WRITE';
  address: string;
  vpn: string;
  offset: string;
  tlbHit: boolean;
  l1Hit: boolean;
  isHardFault: boolean; // Not in RAM at all!
  writePolicy?: 'Write-Back' | 'Write-Through';
  description: string;
}

const SAMPLE_REQUESTS: MemoryRequest[] = [
  {
    id: 'req1',
    type: 'READ',
    address: '0x00401020',
    vpn: '0x00401',
    offset: '0x020',
    tlbHit: true,
    l1Hit: true,
    isHardFault: false,
    writePolicy: 'Write-Back',
    description: "Sikl ichidagi lokal massiv o'qilmoqda (Temporal & Spatial locality yuqori)."
  },
  {
    id: 'req2',
    type: 'READ',
    address: '0x7FFF0040',
    vpn: '0x7FFF0',
    offset: '0x040',
    tlbHit: false,
    l1Hit: false,
    isHardFault: true,
    writePolicy: 'Write-Back',
    description: "Katta fayldan yangi sahifa so'raldi (RAM da mavjud emas, Diskdan yuklanishi shart)."
  },
  {
    id: 'req3',
    type: 'WRITE',
    address: '0x10010014',
    vpn: '0x10010',
    offset: '0x014',
    tlbHit: true,
    l1Hit: true,
    isHardFault: false,
    writePolicy: 'Write-Back',
    description: "Registrdagi qiymat L1 keshga yozildi. Kesh bloki Dirty (ifloslangan) bo'lib belgilanadi."
  },
  {
    id: 'req4',
    type: 'READ',
    address: '0x00401028',
    vpn: '0x00401',
    offset: '0x028',
    tlbHit: true,
    l1Hit: false,
    isHardFault: false,
    writePolicy: 'Write-Through',
    description: "TLB da manzil bor, biroq L1 keshda blok yo'q (L1 Miss -> L2 keshga murojaat)."
  },
  {
    id: 'req5',
    type: 'WRITE',
    address: '0x20005080',
    vpn: '0x20005',
    offset: '0x080',
    tlbHit: false,
    l1Hit: false,
    isHardFault: false,
    writePolicy: 'Write-Through',
    description: "Write-Through strategiyasida ma'lumot L1 kesh bilan bir vaqtda asosiy RAM ga ham yoziladi."
  }
];

export const Game10CacheTLB: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [reqIndex, setReqIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(50);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  // Active step in pipeline for current request: 'tlb' -> 'cache' -> 'resolved'
  const [step, setStep] = useState<'tlb' | 'cache'>('tlb');

  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEndGame();
          return 0;
        }
        if (prev <= 5) sound.playTimerWarning();
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, score]);

  const handleEndGame = () => {
    setIsGameOver(true);
    sound.playLevelUp();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    const earnedXp = Math.floor(score * 1.5) + 50;
    const earnedCoins = Math.floor(score / 30) + 10;
    onFinish(score, earnedCoins, earnedXp);
  };

  const handleTLBChoice = (choice: 'HIT' | 'MISS' | 'FAULT') => {
    if (isGameOver) return;
    const current = SAMPLE_REQUESTS[reqIndex % SAMPLE_REQUESTS.length];

    let correct = false;
    if (current.isHardFault && choice === 'FAULT') correct = true;
    else if (!current.isHardFault && current.tlbHit && choice === 'HIT') correct = true;
    else if (!current.isHardFault && !current.tlbHit && choice === 'MISS') correct = true;

    if (correct) {
      sound.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      sound.playCombo(newCombo);
      setScore(s => s + 30 + newCombo * 10);
      setCoins(c => c + 3);
      sound.playCoin();
      setFeedback({ msg: `To'g'ri! ${current.isHardFault ? "Hard Page Fault (Diskdan o'qish talab)" : (current.tlbHit ? "TLB Hit (Tarjima buferidan topildi)" : "TLB Miss (Page Table orqali qidirish)")}`, ok: true });
      
      if (current.isHardFault) {
        // Hard fault skips cache directly
        nextRequest();
      } else {
        setStep('cache');
      }
    } else {
      sound.playWrong();
      setCombo(0);
      setLives(l => {
        if (l <= 1) {
          handleEndGame();
          return 0;
        }
        return l - 1;
      });
      setFeedback({ msg: `Xato! Ushbu so'rov: ${current.isHardFault ? 'Hard Fault (sahifa RAM da yo\'q)' : (current.tlbHit ? 'TLB Hit' : 'TLB Miss')} edi!`, ok: false });
    }
  };

  const handleCacheChoice = (choice: 'HIT' | 'MISS') => {
    if (isGameOver) return;
    const current = SAMPLE_REQUESTS[reqIndex % SAMPLE_REQUESTS.length];
    const isCorrect = (choice === 'HIT' && current.l1Hit) || (choice === 'MISS' && !current.l1Hit);

    if (isCorrect) {
      sound.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      sound.playCombo(newCombo);
      setScore(s => s + 35 + newCombo * 10);
      setCoins(c => c + 4);
      sound.playCoin();
      setFeedback({ msg: `Ajoyib! L1 Kesh ${current.l1Hit ? 'HIT (1-2 taktda yetkazildi)' : 'MISS (L2 kesh/RAM ga so\'rov yuborildi)'}!`, ok: true });
      nextRequest();
    } else {
      sound.playWrong();
      setCombo(0);
      setLives(l => {
        if (l <= 1) {
          handleEndGame();
          return 0;
        }
        return l - 1;
      });
      setFeedback({ msg: `Xato tahlil! Bu so'rov L1 ${current.l1Hit ? 'HIT' : 'MISS'} edi!`, ok: false });
    }
  };

  const nextRequest = () => {
    setReqIndex(prev => prev + 1);
    setStep('tlb');
  };

  const current = SAMPLE_REQUESTS[reqIndex % SAMPLE_REQUESTS.length];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top HUD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-pink-600 to-rose-600 rounded-xl text-white shadow-lg shadow-rose-500/20">
            <Target className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Kesh & TLB Snayperi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-900/50 text-rose-400 border border-rose-800">
                14-amaliy
              </span>
            </h2>
            <p className="text-xs text-slate-400">Jonli xotira quvuri: MMU/TLB ➔ L1 Kesh ➔ RAM ➔ Disk Swap</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-amber-400 border border-slate-700">
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-rose-400 border border-slate-700">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-yellow-400 border border-slate-700">
            <Coins className="w-4 h-4" />
            <span>+{coins}</span>
          </div>

          <div className="flex items-center gap-1 text-red-400">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`text-base ${i < lives ? 'opacity-100' : 'opacity-20'}`}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {isGameOver ? (
        <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-rose-500/30">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white">Simulyatsiya Yakunlandi!</h3>
            <p className="text-slate-400 mt-1">Kesh va virtual xotira zanjirini boshqarish mahorati sinovdan o'tdi.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">To'plangan Ball</div>
              <div className="text-2xl font-bold text-rose-400">{score}</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Tangalar</div>
              <div className="text-2xl font-bold text-yellow-400">+{coins}</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Rekord</div>
              <div className="text-2xl font-bold text-cyan-400">{Math.max(score, highScore)}</div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsGameOver(false);
              setScore(0);
              setCombo(0);
              setCoins(0);
              setLives(3);
              setTimeLeft(50);
              setReqIndex(0);
              setStep('tlb');
              setFeedback(null);
            }}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Qayta O'ynash
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Visual Memory Pipeline */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-bold overflow-x-auto gap-2">
            <div className="px-3 py-2 bg-blue-950/80 border border-blue-500/50 rounded-lg text-blue-300 flex items-center gap-1.5 flex-shrink-0">
              <Cpu className="w-4 h-4" /> CPU So'rovi
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
            
            <div className={`px-3 py-2 rounded-lg flex items-center gap-1.5 flex-shrink-0 border transition-all ${
              step === 'tlb' ? 'bg-amber-950 border-amber-500 text-amber-300 ring-2 ring-amber-500/40' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <Layers className="w-4 h-4" /> MMU / TLB
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className={`px-3 py-2 rounded-lg flex items-center gap-1.5 flex-shrink-0 border transition-all ${
              step === 'cache' ? 'bg-rose-950 border-rose-500 text-rose-300 ring-2 ring-rose-500/40' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <Zap className="w-4 h-4" /> L1 Kesh
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 flex items-center gap-1.5 flex-shrink-0">
              <Database className="w-4 h-4" /> Asosiy RAM
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />

            <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 flex items-center gap-1.5 flex-shrink-0">
              <AlertTriangle className="w-4 h-4" /> Swap / SSD
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium border animate-fadeIn ${
              feedback.ok 
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300' 
                : 'bg-red-950/50 border-red-500/40 text-red-300'
            }`}>
              {feedback.ok ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
              <span>{feedback.msg}</span>
            </div>
          )}

          {/* Current Request Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                current.type === 'READ' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-orange-950 text-orange-400 border border-orange-800'
              }`}>
                {current.type === 'READ' ? "📖 O'qish So'rovi (READ)" : "✍️ Yozish So'rovi (WRITE)"}
              </span>
              <span className="text-xs text-slate-400">Strategiya: <strong>{current.writePolicy}</strong></span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400">Virtual Xotira Manzili:</div>
              <div className="text-3xl font-black text-white font-mono tracking-wider">
                {current.address}
              </div>
              <div className="flex gap-4 text-xs font-mono text-slate-300">
                <span>VPN (Virtual Page Number): <strong className="text-amber-400">{current.vpn}</strong></span>
                <span>Offset: <strong className="text-cyan-400">{current.offset}</strong></span>
              </div>
              <p className="text-xs text-slate-400 italic pt-2">{current.description}</p>
            </div>

            {/* Step 1: TLB Check */}
            {step === 'tlb' && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> 1-Qadam: TLB va Virtual Sahifa Holatini Aniqlang
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleTLBChoice('HIT')}
                    className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-600/20 text-emerald-300 font-bold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="text-lg">TLB HIT</span>
                    <span className="text-xs text-slate-400">Sahifa tarjimasi buferda bor</span>
                  </button>

                  <button
                    onClick={() => handleTLBChoice('MISS')}
                    className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 hover:bg-amber-600/20 text-amber-300 font-bold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="text-lg">TLB MISS</span>
                    <span className="text-xs text-slate-400">RAM Page Table dan izlash</span>
                  </button>

                  <button
                    onClick={() => handleTLBChoice('FAULT')}
                    className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 hover:bg-red-600/20 text-red-300 font-bold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="text-lg">HARD FAULT ⚠️</span>
                    <span className="text-xs text-slate-400">Sahifa RAM da yo'q (Diskdan yuklash)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Cache Check */}
            {step === 'cache' && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
                <div className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 2-Qadam: L1 Kesh Qatoridan So'ralgan Ma'lumot Topiladimi?
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleCacheChoice('HIT')}
                    className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-600/20 text-cyan-300 font-bold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="text-xl">L1 HIT 🎯</span>
                    <span className="text-xs text-slate-400">Blok Tag mos keldi (1-2 takt)</span>
                  </button>

                  <button
                    onClick={() => handleCacheChoice('MISS')}
                    className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 hover:bg-purple-600/20 text-purple-300 font-bold flex flex-col items-center gap-1 transition-all"
                  >
                    <span className="text-xl">L1 MISS ❌</span>
                    <span className="text-xs text-slate-400">L2 / L3 keshga yoki RAM ga so'rov</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
