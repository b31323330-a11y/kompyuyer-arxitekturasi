import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cpu, 
  ArrowDown, 
  Heart, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

export interface DeviceItem {
  id: string;
  name: string;
  category: 'internal' | 'input' | 'output' | 'io';
  icon: string;
  desc: string;
}

export const DEVICES_DATA: DeviceItem[] = [
  { id: 'kb', name: "Mexanik Klaviatura", category: 'input', icon: '⌨️', desc: "Matn va buyruqlarni kiritish qurilmasi" },
  { id: 'mouse', name: "Optik Sichqoncha", category: 'input', icon: '🖱️', desc: "Grafik interfeysda ko‘rsatkichni boshqarish" },
  { id: 'scanner', name: "Planshetli Skaner", category: 'input', icon: '📠', desc: "Qog‘oz hujjatlarni raqamli tasvirga aylantiradi" },
  { id: 'barcode', name: "Shtrix-kod Skaneri", category: 'input', icon: '🏷️', desc: "Mahsulot kodlarini optik o‘quvchi qurilma" },
  { id: 'webcam', name: "HD Veb-kamera", category: 'input', icon: '📷', desc: "Jonli video tasvirni kompyuterga kiritish" },
  { id: 'mic', name: "Studiya Mikrofoni", category: 'input', icon: '🎙️', desc: "Ovoz to‘lqinlarini elektr signalga aylantiradi" },
  { id: 'monitor', name: "4K OLED Monitor", category: 'output', icon: '🖥️', desc: "Grafik va matnli axborotni vizual chiqarish" },
  { id: 'printer', name: "Lazerli Rangli Printer", category: 'output', icon: '🖨️', desc: "Elektron hujjatlarni qog‘ozga chop etish" },
  { id: 'projector', name: "Multimedia Proyektori", category: 'output', icon: '📽️', desc: "Tasvirni katta ekranga proyeksiyalash" },
  { id: 'speakers', name: "Akustik Kolonkalar", category: 'output', icon: '🔊', desc: "Tovush signallarini akustik to‘lqinga aylantirish" },
  { id: 'plotter', name: "Muhandislik Plotteri", category: 'output', icon: '📐', desc: "Katta formatli chizmalar va xaritalarni chizish" },
  { id: 'headphones', name: "Simsiz Quloqchin", category: 'output', icon: '🎧', desc: "Tovushni shaxsiy eshitish uchun chiqarish" },
  { id: 'ram', name: "DDR5 Operativ Xotira", category: 'internal', icon: '💾', desc: "Dasturlar ishlayotganda ma’lumotlarni tezkor saqlash" },
  { id: 'gpu', name: "GeForce RTX Videokarta", category: 'internal', icon: '🎮', desc: "Grafik va parallel hisob-kitoblar protsessori" },
  { id: 'cpu', name: "Markaziy Protsessor (CPU)", category: 'internal', icon: '🧠', desc: "Barcha mantiqiy va arifmetik amallarni boshqarish" },
  { id: 'mobo', name: "Ona Plata (Motherboard)", category: 'internal', icon: '🎛️', desc: "Barcha komponentlarni bog‘lovchi asosiy plata" },
  { id: 'nvme_int', name: "M.2 NVMe SSD (Ichki)", category: 'internal', icon: '⚡', desc: "Yuqori tezlikdagi ichki doimiy xotira" },
  { id: 'touch', name: "Sensorli Ekran (Touchscreen)", category: 'io', icon: '📱', desc: "Tasvir chiqaradi va barmoq bosilishini kiritadi" },
  { id: 'flash', name: "USB Fleshka (128 GB)", category: 'io', icon: '🔌', desc: "Ma’lumot yozish (chiqarish) va o‘qish (kiritish)" },
  { id: 'ext_ssd', name: "Tashqi Portativ SSD", category: 'io', icon: '💽', desc: "Katta hajmli fayllarni ikki tomonlama uzatish" },
  { id: 'vr', name: "VR Garnitura (Meta/Oculus)", category: 'io', icon: '🥽', desc: "3D tasvir chiqaradi va harakat datchiklaridan oladi" },
  { id: 'nic', name: "Wi-Fi 6E Tarmoq Kartasi", category: 'io', icon: '📡', desc: "Tarmoq paketlarini qabul qilish va yuborish" },
  { id: 'mfp', name: "MFP (Printer + Skaner)", category: 'io', icon: '📑', desc: "Qog‘ozga chiqaradi hamda tasvirni skanerlab kiritadi" },
];

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game1DeviceSorter: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [deck, setDeck] = useState<DeviceItem[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lastFeedback, setLastFeedback] = useState<'correct' | 'wrong' | null>(null);

  const shuffleDeck = () => {
    return [...DEVICES_DATA].sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    sound.playClick();
    setDeck(shuffleDeck());
    setCurrentIdx(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(3);
    setTimeLeft(60);
    setLastFeedback(null);
    setGameState('playing');
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0 || lives <= 0) {
      endGame();
      return;
    }

    if (timeLeft <= 5) {
      sound.playTimerWarning();
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, lives]);

  const endGame = useCallback(() => {
    setGameState('gameover');
    const earnedCoins = Math.floor(score / 15);
    const earnedXp = Math.floor(score / 8);

    if (score > highScore) {
      sound.playBossVictory();
      confetti({ particleCount: 80, spread: 80 });
    } else {
      sound.playLevelUp();
    }

    onFinish(score, earnedCoins, earnedXp);
  }, [score, highScore, onFinish]);

  const handleClassify = (cat: 'internal' | 'input' | 'output' | 'io') => {
    if (gameState !== 'playing') return;

    const currentItem = deck[currentIdx];
    if (!currentItem) return;

    if (currentItem.category === cat) {
      // Correct!
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const points = 100 + (newCombo > 1 ? newCombo * 25 : 0);
      setScore(prev => prev + points);
      setLastFeedback('correct');
      sound.playCombo(newCombo);

      // Next item
      if (currentIdx + 1 >= deck.length) {
        setDeck(shuffleDeck());
        setCurrentIdx(0);
      } else {
        setCurrentIdx(prev => prev + 1);
      }
    } else {
      // Wrong!
      setCombo(0);
      setLives(prev => prev - 1);
      setLastFeedback('wrong');
      sound.playError();

      // Show small shake then advance
      setTimeout(() => {
        if (currentIdx + 1 >= deck.length) {
          setDeck(shuffleDeck());
          setCurrentIdx(0);
        } else {
          setCurrentIdx(prev => prev + 1);
        }
      }, 300);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === '1') handleClassify('internal');
      if (e.key === '2') handleClassify('input');
      if (e.key === '3') handleClassify('output');
      if (e.key === '4') handleClassify('io');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentIdx, deck, combo]);

  const currentItem = deck[currentIdx];

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              2-Amaliy Mashg‘ulot · Arkada
            </span>
            <span className="text-xs font-mono text-slate-400">Tezkor Saralash</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Konveyer: Qurilmalar Saralash</h2>
        </div>

        {/* Live stats */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-sm font-bold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Eng yaxshi: {highScore}</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-sm">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{lives} ta jon</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-base font-black">
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="py-12 text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-5xl shadow-glow-indigo animate-bounce">
            🖥️
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-black text-white">Qurilmalar Konveyeriga Xush Kelibsiz!</h3>
            <p className="text-sm text-slate-400">
              Konveyerdan o‘tayotgan apparat qurilmalarini tezda to‘g‘ri qutiga ajrating: 
              <strong className="text-indigo-400"> Ichki</strong>, 
              <strong className="text-emerald-400"> Kiritish</strong>, 
              <strong className="text-cyan-400"> Chiqarish</strong> yoki 
              <strong className="text-amber-400"> Kiritish-Chiqarish (I/O)</strong>.
            </p>
            <p className="text-xs text-slate-500 font-mono">
              💡 Klaviaturadan tezkor tugmalar: [1] Ichki, [2] Kiritish, [3] Chiqarish, [4] I/O
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-black text-base shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all"
          >
            ▶️ O‘yinni Boshlash (60 soniya)
          </button>
        </div>
      )}

      {gameState === 'playing' && currentItem && (
        <div className="space-y-6">
          {/* Combo & Score Board */}
          <div className="flex items-center justify-between bg-[#070B14] p-4 rounded-2xl border border-[#1A2642]">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-400">Hozirgi Ball:</span>
              <span className="text-2xl font-black text-white font-mono">{score}</span>
            </div>

            {combo > 1 && (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black animate-pulse">
                <Flame className="w-4 h-4 fill-black" />
                <span>{combo}x KOMBO! (+{combo * 25} ball)</span>
              </div>
            )}
          </div>

          {/* Conveyor Belt & Active Card */}
          <div className="relative py-8 bg-[#070B14]/70 rounded-3xl border border-[#1A2642] flex flex-col items-center justify-center min-h-[220px]">
            {/* Visual conveyor markers */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-[#1A2642] to-transparent pointer-events-none" />

            <div className={`p-6 rounded-3xl bg-[#0D1424] border-2 transition-all duration-300 max-w-sm w-full text-center shadow-xl ${
              lastFeedback === 'correct' 
                ? 'border-emerald-500 shadow-emerald-500/20 scale-105' 
                : lastFeedback === 'wrong'
                  ? 'border-rose-500 shadow-rose-500/20 animate-shake'
                  : 'border-indigo-500/40 shadow-indigo-500/10'
            }`}>
              <div className="text-5xl mb-3">{currentItem.icon}</div>
              <h4 className="text-xl font-black text-white">{currentItem.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{currentItem.desc}</p>
            </div>
          </div>

          {/* 4 Sorting Bins */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => handleClassify('internal')}
              className="group p-4 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-700/50 hover:border-indigo-500 text-left transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-1">
                <span>[1] TUGMA</span>
                <span className="text-base">🧠</span>
              </div>
              <div className="font-black text-white text-sm group-hover:text-indigo-300">Ichki Qurilma</div>
              <div className="text-[10px] text-slate-400">RAM, GPU, CPU, SSD</div>
            </button>

            <button
              onClick={() => handleClassify('input')}
              className="group p-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/50 hover:border-emerald-500 text-left transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-1">
                <span>[2] TUGMA</span>
                <span className="text-base">📥</span>
              </div>
              <div className="font-black text-white text-sm group-hover:text-emerald-300">Kiritish (Input)</div>
              <div className="text-[10px] text-slate-400">Klaviatura, Skaner, Mic</div>
            </button>

            <button
              onClick={() => handleClassify('output')}
              className="group p-4 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/50 hover:border-cyan-500 text-left transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-1">
                <span>[3] TUGMA</span>
                <span className="text-base">📤</span>
              </div>
              <div className="font-black text-white text-sm group-hover:text-cyan-300">Chiqarish (Output)</div>
              <div className="text-[10px] text-slate-400">Monitor, Printer, Kolonka</div>
            </button>

            <button
              onClick={() => handleClassify('io')}
              className="group p-4 rounded-2xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-500 text-left transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                <span>[4] TUGMA</span>
                <span className="text-base">🔄</span>
              </div>
              <div className="font-black text-white text-sm group-hover:text-amber-300">Kiritish-Chiqarish</div>
              <div className="text-[10px] text-slate-400">Sensor ekran, USB, VR</div>
            </button>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="py-10 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center text-4xl">
            {score > highScore ? '🏆' : '🎮'}
          </div>

          <div>
            <h3 className="text-2xl font-black text-white">
              {score > highScore ? "Yangi Shaxsiy Rekord!" : "O‘yin Yakunlandi!"}
            </h3>
            <p className="text-sm text-slate-400 mt-1">Konveyer bo‘yicha to‘plangan umumiy natijangiz:</p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#070B14] border border-[#1A2642]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Jami Ball</div>
              <div className="text-2xl font-black text-indigo-400 font-mono mt-0.5">{score}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070B14] border border-[#1A2642]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Maks. Kombo</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">{maxCombo}x</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#070B14] border border-[#1A2642]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Yutilgan Tanga</div>
              <div className="text-2xl font-black text-yellow-400 font-mono mt-0.5">+{Math.floor(score / 15)}</div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
            >
              🔄 Qayta O‘ynash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
