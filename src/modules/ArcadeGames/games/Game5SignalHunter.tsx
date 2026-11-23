import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Activity, 
  Zap, 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  XCircle,
  Timer,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface VoltageTarget {
  id: string;
  voltage: number; // e.g. 0.2V, 1.4V, 3.1V, 5.0V
  standard: 'TTL (5V)' | 'CMOS (3.3V)';
  correctZone: 'LOW' | 'UNDEFINED' | 'HIGH';
  description: string;
}

interface CircuitClassifyItem {
  id: string;
  name: string;
  type: 'combinational' | 'sequential';
  feature: string;
}

const VOLTAGE_TARGETS: VoltageTarget[] = [
  { id: 'v1', voltage: 0.2, standard: 'TTL (5V)', correctZone: 'LOW', description: "0.2V — TTL mantiqiy 0 chegarasida (0 – 0.8V)" },
  { id: 'v2', voltage: 1.4, standard: 'TTL (5V)', correctZone: 'UNDEFINED', description: "1.4V — TTL taqiqlangan/sochilish sohasida (0.8V – 2.0V)" },
  { id: 'v3', voltage: 4.8, standard: 'TTL (5V)', correctZone: 'HIGH', description: "4.8V — TTL mantiqiy 1 zonasida (2.0V – 5.0V)" },
  { id: 'v4', voltage: 0.1, standard: 'CMOS (3.3V)', correctZone: 'LOW', description: "0.1V — CMOS mantiqiy 0 chegarasida (0 – 0.8V)" },
  { id: 'v5', voltage: 1.6, standard: 'CMOS (3.3V)', correctZone: 'UNDEFINED', description: "1.6V — 3.3V CMOS noaniqlik sohasida (0.8V – 2.0V)" },
  { id: 'v6', voltage: 3.2, standard: 'CMOS (3.3V)', correctZone: 'HIGH', description: "3.2V — CMOS mantiqiy 1 zonasida (2.0V – 3.3V)" },
  { id: 'v7', voltage: 0.6, standard: 'TTL (5V)', correctZone: 'LOW', description: "0.6V — Ishonchli LOW mantiqiy nol" },
  { id: 'v8', voltage: 1.1, standard: 'TTL (5V)', correctZone: 'UNDEFINED', description: "1.1V — Xavfli noaniqlik sohasi (metastabil)" },
  { id: 'v9', voltage: 2.7, standard: 'TTL (5V)', correctZone: 'HIGH', description: "2.7V — Mantiqiy 1 (HIGH)" },
];

const CIRCUITS_POOL: CircuitClassifyItem[] = [
  { id: 'c1', name: "Yarim Qo'shgich (Half Adder)", type: 'combinational', feature: "Xotirasiz, faqat joriy A va B ga bog'liq" },
  { id: 'c2', name: "D-Trigger (Data Flip-Flop)", type: 'sequential', feature: "Takt signali bo'yicha 1 bitni saqlaydi" },
  { id: 'c3', name: "Multipleksor 4:1 (MUX)", type: 'combinational', feature: "Tanlov manzili bo'yicha 1 ta kanalni uzatadi" },
  { id: 'c4', name: "Sinxron Hisoblagich (Counter)", type: 'sequential', feature: "Oldingi hisob holatini eslab qolib oshiradi" },
  { id: 'c5', name: "Dekoder 3:8 (Decoder)", type: 'combinational', feature: "3 bitli kodni 8 ta faol chiqishga ochadi" },
  { id: 'c6', name: "Surgich Registr (Shift Register)", type: 'sequential', feature: "Ketma-ket bitlarni takt bilan siljitadi" },
  { id: 'c7', name: "ALU Komparatori (Comparator)", type: 'combinational', feature: "Ikki sonni solishtirib A=B, A>B chiqaradi" },
  { id: 'c8', name: "RS-Trigger (Reset-Set Latch)", type: 'sequential', feature: "Qayta aloqa orqali holatni saqlab qoladi" },
];

export const Game5SignalHunter: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [stage, setStage] = useState<'voltage' | 'classify'>('voltage');
  const [voltageIndex, setVoltageIndex] = useState(0);
  const [circuitIndex, setCircuitIndex] = useState(0);
  
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [coins, setCoins] = useState(0);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer
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
    const earnedXp = Math.floor(score * 1.5) + 60;
    const earnedCoins = Math.floor(score / 25) + 15;
    onFinish(score, earnedCoins, earnedXp);
  };

  const handleVoltageChoice = (chosenZone: 'LOW' | 'UNDEFINED' | 'HIGH') => {
    if (isGameOver) return;
    const current = VOLTAGE_TARGETS[voltageIndex % VOLTAGE_TARGETS.length];
    if (chosenZone === current.correctZone) {
      sound.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      sound.playCombo(newCombo);
      const points = 30 + newCombo * 10;
      setScore(s => s + points);
      setCoins(c => c + 3);
      sound.playCoin();
      setFeedback({ msg: `To'g'ri! ${current.description}`, ok: true });
    } else {
      sound.playWrong();
      setCombo(0);
      setFeedback({ msg: `Xato! ${current.description}`, ok: false });
    }

    if (voltageIndex >= 4 && stage === 'voltage') {
      setStage('classify');
      setFeedback(null);
    } else {
      setVoltageIndex(prev => prev + 1);
    }
  };

  const handleClassifyChoice = (chosenType: 'combinational' | 'sequential') => {
    if (isGameOver) return;
    const current = CIRCUITS_POOL[circuitIndex % CIRCUITS_POOL.length];
    if (chosenType === current.type) {
      sound.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      sound.playCombo(newCombo);
      const points = 35 + newCombo * 10;
      setScore(s => s + points);
      setCoins(c => c + 4);
      sound.playCoin();
      setFeedback({ msg: `To'g'ri! ${current.name} — ${current.type === 'combinational' ? 'Kombinatsion' : 'Ketma-ketlik'} (${current.feature})`, ok: true });
    } else {
      sound.playWrong();
      setCombo(0);
      setFeedback({ msg: `Xato! ${current.name} — ${current.type === 'combinational' ? 'Kombinatsion' : 'Ketma-ketlik'} sxema!`, ok: false });
    }

    if (circuitIndex + 1 >= CIRCUITS_POOL.length) {
      handleEndGame();
    } else {
      setCircuitIndex(prev => prev + 1);
    }
  };

  const currentVolt = VOLTAGE_TARGETS[voltageIndex % VOLTAGE_TARGETS.length];
  const currentCircuit = CIRCUITS_POOL[circuitIndex % CIRCUITS_POOL.length];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* HUD Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Signal Ovchisi: Analog vs Raqamli
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-900/50 text-cyan-400 border border-cyan-800">
                7-amaliy
              </span>
            </h2>
            <p className="text-xs text-slate-400">Kuchlanish zonalari (LOW/HIGH) va Sxemalar tasnifi</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-amber-400 border border-slate-700">
            <Timer className="w-4 h-4 text-amber-400" />
            <span>{timeLeft}s</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-cyan-400 border border-slate-700">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <span>{score} ball</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg text-yellow-400 border border-slate-700">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>+{coins}</span>
          </div>

          {combo > 1 && (
            <div className="px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-bold animate-bounce shadow-md">
              {combo}x Kombo!
            </div>
          )}
        </div>
      </div>

      {isGameOver ? (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-cyan-500/30">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white">Missiya Yakunlandi!</h3>
            <p className="text-slate-400 mt-1">Siz signal zonalari va sxema turlarini ajoyib o'zlashtirdingiz!</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Yakuniy Ball</div>
              <div className="text-2xl font-bold text-cyan-400">{score}</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Tangalar</div>
              <div className="text-2xl font-bold text-yellow-400">+{coins}</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="text-xs text-slate-400">Eng Yaxshi</div>
              <div className="text-2xl font-bold text-purple-400">{Math.max(score, highScore)}</div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsGameOver(false);
              setScore(0);
              setCombo(0);
              setCoins(0);
              setTimeLeft(60);
              setStage('voltage');
              setVoltageIndex(0);
              setCircuitIndex(0);
              setFeedback(null);
            }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Qayta O'ynash
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stage Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setStage('voltage')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                stage === 'voltage' 
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20' 
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              1-Bosqich: Kuchlanish va Mantiqiy Zonalari
            </button>
            <button
              onClick={() => setStage('classify')}
              className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                stage === 'classify' 
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-950/20' 
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              2-Bosqich: Kombinatsion vs Ketma-ketlik Sxemalari
            </button>
          </div>

          {/* Feedback banner */}
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

          {stage === 'voltage' ? (
            /* Voltage Zone Challenge */
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-cyan-400 rounded-full border border-slate-700">
                  Standart: {currentVolt.standard}
                </span>
                <h3 className="text-4xl font-extrabold text-white tracking-wider font-mono">
                  {currentVolt.voltage.toFixed(1)} Volt
                </h3>
                <p className="text-slate-400 text-sm">
                  Ushbu kuchlanish signali qaysi mantiqiy darajaga tegishli?
                </p>
              </div>

              {/* Visual Voltage Meter Bar */}
              <div className="relative w-full h-12 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-1 flex">
                <div className="w-[25%] bg-blue-600/30 border-r border-blue-500/50 flex items-center justify-center text-xs text-blue-400 font-bold">
                  LOW (0 - 0.8V)
                </div>
                <div className="w-[35%] bg-red-600/30 border-r border-red-500/50 flex items-center justify-center text-xs text-red-400 font-bold">
                  NOANIQLIK (0.8V - 2.0V)
                </div>
                <div className="w-[40%] bg-emerald-600/30 flex items-center justify-center text-xs text-emerald-400 font-bold">
                  HIGH (2.0V - 5.0V)
                </div>

                {/* Voltage Indicator Needle */}
                <div 
                  className="absolute top-0 bottom-0 w-1.5 bg-yellow-400 shadow-[0_0_10px_#facc15] transition-all duration-300"
                  style={{ left: `${Math.min(100, Math.max(0, (currentVolt.voltage / 5.0) * 100))}%` }}
                />
              </div>

              {/* Selection Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <button
                  onClick={() => handleVoltageChoice('LOW')}
                  className="p-5 rounded-xl border border-blue-600/40 bg-blue-950/20 hover:bg-blue-600/30 text-blue-400 font-bold text-lg flex flex-col items-center gap-1 transition-all active:scale-95 shadow-lg"
                >
                  <span className="text-2xl font-mono">0 (LOW)</span>
                  <span className="text-xs text-slate-400">Past daraja (Mantiqiy Nol)</span>
                </button>

                <button
                  onClick={() => handleVoltageChoice('UNDEFINED')}
                  className="p-5 rounded-xl border border-red-600/40 bg-red-950/20 hover:bg-red-600/30 text-red-400 font-bold text-lg flex flex-col items-center gap-1 transition-all active:scale-95 shadow-lg"
                >
                  <span className="text-2xl font-mono">⚠️ TAQIQLANGAN</span>
                  <span className="text-xs text-slate-400">Noaniqlik / Sochilish sohasi</span>
                </button>

                <button
                  onClick={() => handleVoltageChoice('HIGH')}
                  className="p-5 rounded-xl border border-emerald-600/40 bg-emerald-950/20 hover:bg-emerald-600/30 text-emerald-400 font-bold text-lg flex flex-col items-center gap-1 transition-all active:scale-95 shadow-lg"
                >
                  <span className="text-2xl font-mono">1 (HIGH)</span>
                  <span className="text-xs text-slate-400">Yuqori daraja (Mantiqiy Bir)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Circuit Classification Challenge */
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-purple-400 rounded-full border border-slate-700">
                  Sxema #{circuitIndex + 1} / {CIRCUITS_POOL.length}
                </span>
                <h3 className="text-3xl font-extrabold text-white">
                  {currentCircuit.name}
                </h3>
                <p className="text-slate-400 text-sm">
                  Ushbu qurilma qaysi mantiqiy sxemalar toifasiga kiradi?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <button
                  onClick={() => handleClassifyChoice('combinational')}
                  className="p-6 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-600/20 text-cyan-300 font-bold text-xl flex flex-col items-center text-center gap-3 transition-all active:scale-95 shadow-xl group"
                >
                  <div className="p-3 bg-cyan-600/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Activity className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    Kombinatsion Sxema
                    <p className="text-xs text-slate-400 font-normal mt-1">
                      Xotirasiz, chiqish faqat hozirgi kirish signallariga bog'liq (masalan, Yarim qo'shgich, MUX, Shifrlovchi).
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleClassifyChoice('sequential')}
                  className="p-6 rounded-2xl border border-purple-500/40 bg-purple-950/20 hover:bg-purple-600/20 text-purple-300 font-bold text-xl flex flex-col items-center text-center gap-3 transition-all active:scale-95 shadow-xl group"
                >
                  <div className="p-3 bg-purple-600/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Layers className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    Ketma-ketlik (Sequential) Sxema
                    <p className="text-xs text-slate-400 font-normal mt-1">
                      Ichki xotiraga ega, qayta aloqa zanjirli, o'tmishdagi holatlarni eslab qoladi (masalan, Trigger, Registr).
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
