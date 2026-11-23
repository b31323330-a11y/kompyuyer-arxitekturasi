import React, { useState } from 'react';
import { 
  ShieldAlert, 
  HardDrive, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Sparkles, 
  RefreshCw,
  AlertTriangle,
  HelpCircle,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

type RaidType = 'RAID 0' | 'RAID 1' | 'RAID 5' | 'RAID 6' | 'RAID 10';

interface DiskState {
  id: number;
  healthy: boolean;
  dataVal: number; // e.g. 1 or 0 for XOR parity
}

export const Game11RaidCrisis: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [selectedRaid, setSelectedRaid] = useState<RaidType>('RAID 5');
  const [disks, setDisks] = useState<DiskState[]>([
    { id: 0, healthy: true, dataVal: 1 },
    { id: 1, healthy: true, dataVal: 0 },
    { id: 2, healthy: true, dataVal: 1 },
    { id: 3, healthy: true, dataVal: 0 }, // parity in raid 5
  ]);

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [rebuildProgress, setRebuildProgress] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Calculate Status of the Array
  const failedCount = disks.filter(d => !d.healthy).length;

  let arrayStatus: 'ONLINE' | 'DEGRADED' | 'FAILED' = 'ONLINE';
  let maxFailTolerance = 1;
  let usableCapacityRatio = "N - 1";

  if (selectedRaid === 'RAID 0') {
    maxFailTolerance = 0;
    usableCapacityRatio = "N (100%)";
    arrayStatus = failedCount === 0 ? 'ONLINE' : 'FAILED';
  } else if (selectedRaid === 'RAID 1') {
    maxFailTolerance = 1;
    usableCapacityRatio = "50% (Ko'zgu)";
    arrayStatus = failedCount === 0 ? 'ONLINE' : (failedCount === 1 ? 'DEGRADED' : 'FAILED');
  } else if (selectedRaid === 'RAID 5') {
    maxFailTolerance = 1;
    usableCapacityRatio = "(N - 1) disk";
    arrayStatus = failedCount === 0 ? 'ONLINE' : (failedCount === 1 ? 'DEGRADED' : 'FAILED');
  } else if (selectedRaid === 'RAID 6') {
    maxFailTolerance = 2;
    usableCapacityRatio = "(N - 2) disk";
    arrayStatus = failedCount === 0 ? 'ONLINE' : (failedCount <= 2 ? 'DEGRADED' : 'FAILED');
  } else if (selectedRaid === 'RAID 10') {
    maxFailTolerance = 1; // per mirror pair
    usableCapacityRatio = "50% (Stripe of mirrors)";
    arrayStatus = failedCount === 0 ? 'ONLINE' : (failedCount <= 2 ? 'DEGRADED' : 'FAILED');
  }

  const toggleDisk = (index: number) => {
    sound.playClick();
    setDisks(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], healthy: !updated[index].healthy };
      return updated;
    });
    setRebuildProgress(null);
    setFeedback(null);
  };

  const handleRebuild = () => {
    if (arrayStatus === 'FAILED') {
      sound.playWrong();
      setFeedback("XATO: Massiv butunlay buzilgan (FAILED)! Ma'lumotlarni faqat 3-2-1 zaxiradan (Backup) tiklash mumkin!");
      return;
    }
    if (failedCount === 0) {
      setFeedback("Barcha disklar sog'lom (ONLINE). Qayta qurish shart emas.");
      return;
    }

    sound.playClick();
    setRebuildProgress(10);
    const interval = setInterval(() => {
      setRebuildProgress(prev => {
        if (prev === null) {
          clearInterval(interval);
          return null;
        }
        if (prev >= 100) {
          clearInterval(interval);
          setDisks(d => d.map(item => ({ ...item, healthy: true })));
          sound.playCorrect();
          sound.playCoin();
          setScore(s => s + 50);
          setCoins(c => c + 10);
          setFeedback("MUVAFFAQIYATLI: XOR paritet hisoblanib, yangi disk to'liq tiklandi (+50 Ball, +10 Tanga)!");
          return null;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleTest321 = () => {
    sound.playLevelUp();
    confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
    setScore(s => s + 80);
    setCoins(c => c + 15);
    onFinish(score + 80, coins + 15, 180);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              RAID Inqirozi Boshqaruvchisi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-800">
                15-amaliy
              </span>
            </h2>
            <p className="text-xs text-slate-400">RAID 0/1/5/6/10 chidamliligi, XOR Paritet & Rebuild jarayoni</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-cyan-400 border border-slate-700">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-yellow-400 border border-slate-700">
            <Coins className="w-4 h-4" />
            <span>+{coins}</span>
          </div>
        </div>
      </div>

      {/* RAID Level Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'] as RaidType[]).map(raid => (
          <button
            key={raid}
            onClick={() => {
              setSelectedRaid(raid);
              setDisks([
                { id: 0, healthy: true, dataVal: 1 },
                { id: 1, healthy: true, dataVal: 0 },
                { id: 2, healthy: true, dataVal: 1 },
                { id: 3, healthy: true, dataVal: 0 },
              ]);
              setFeedback(null);
            }}
            className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
              selectedRaid === raid
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {raid}
          </button>
        ))}
      </div>

      {/* Main Crisis Workspace */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              {selectedRaid} Massivi
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                arrayStatus === 'ONLINE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                arrayStatus === 'DEGRADED' ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse' :
                'bg-red-950 text-red-400 border border-red-800 animate-bounce'
              }`}>
                HOLAT: {arrayStatus}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Foydali Sig'im: <strong className="text-emerald-400">{usableCapacityRatio}</strong> | Ruxsat etilgan nosozlik: <strong className="text-cyan-400">{maxFailTolerance} ta disk</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRebuild}
              disabled={rebuildProgress !== null || failedCount === 0 || arrayStatus === 'FAILED'}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${rebuildProgress !== null ? 'animate-spin' : ''}`} />
              Rebuild (Disklarni Tiklash)
            </button>
          </div>
        </div>

        {rebuildProgress !== null && (
          <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>XOR Paritet orqali ma'lumotlar qayta tiklanmoqda...</span>
              <span className="text-emerald-400">{rebuildProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${rebuildProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 rounded-xl text-xs font-semibold border ${
            feedback.includes('XATO') 
              ? 'bg-red-950/50 border-red-500/50 text-red-300' 
              : 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
          }`}>
            {feedback}
          </div>
        )}

        {/* Interactive Disks Rack */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {disks.map((disk, idx) => (
            <div
              key={disk.id}
              onClick={() => toggleDisk(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center gap-3 ${
                disk.healthy
                  ? 'bg-slate-950/70 border-emerald-500/40 hover:border-emerald-400 shadow-lg'
                  : 'bg-red-950/40 border-red-500/60 shadow-lg shadow-red-950/50'
              }`}
            >
              <div className={`p-3 rounded-xl ${disk.healthy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/20 text-red-400 animate-pulse'}`}>
                <HardDrive className="w-8 h-8" />
              </div>

              <div>
                <div className="text-sm font-bold text-white">Disk #{idx + 1}</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {selectedRaid === 'RAID 5' && idx === 3 ? "Taqsimlangan Paritet" : `Ma'lumot Bloki (${disk.dataVal})`}
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                disk.healthy 
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                  : 'bg-red-900 text-red-200 border-red-700'
              }`}>
                {disk.healthy ? "SOG'LOM (Active)" : "AVARIYA (Failed)"}
              </span>

              <span className="text-[10px] text-slate-500 mt-1">Holatni o'zgartirish uchun bosing</span>
            </div>
          ))}
        </div>

        {/* 3-2-1 Rule Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">3-2-1 Zaxiralash Qoidasi (Backup Rule)</div>
              <p className="text-xs text-slate-400">
                3 ta nusxa, 2 xil tashuvchi vosita (SSD + Lenta/NAS), 1 ta tashqi (offsite / cloud) saqlash joyi.
              </p>
            </div>
          </div>

          <button
            onClick={handleTest321}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Qoidani Tasdiqlash (+80 Ball)
          </button>
        </div>
      </div>
    </div>
  );
};
