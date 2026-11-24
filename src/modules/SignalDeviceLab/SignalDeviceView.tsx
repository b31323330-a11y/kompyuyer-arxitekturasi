import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Cpu,
  Monitor,
  HardDrive,
  Keyboard,
  Printer,
  Camera,
  Mic,
  Zap,
  ArrowRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEngine';

interface SignalDeviceViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

interface HardwareDevice {
  id: string;
  name: string;
  category: 'internal' | 'input' | 'output' | 'io';
  desc: string;
  icon: string;
}

const ALL_DEVICES: HardwareDevice[] = [
  { id: 'cpu', name: "Markaziy Protsessor (CPU)", category: 'internal', desc: "Barcha hisob-kitob va buyruqlarni bajaruvchi asosiy kristal", icon: "Cpu" },
  { id: 'ram', name: "Tezkor Xotira (RAM)", category: 'internal', desc: "Vaqtinchalik tezkor ma'lumotlar saqlanadigan uchuvchan xotira", icon: "Activity" },
  { id: 'nvme', name: "NVMe M.2 SSD", category: 'internal', desc: "PCIe shinasiga bevosita ulanuvchi o'ta tezkor doimiy saqlovchi", icon: "HardDrive" },
  { id: 'gpu', name: "Videokarta (GPU)", category: 'internal', desc: "Grafika va parallel massiv hisoblash tezlatgichi", icon: "Monitor" },
  { id: 'kb', name: "Mexanik Klaviatura", category: 'input', desc: "Matn, sonlar va boshqaruv signallarini kiritish qurilmasi", icon: "Keyboard" },
  { id: 'mouse', name: "Optik Sichqoncha", category: 'input', desc: "Grafik interfeysda ko'rsatkich koordinatalarini uzatuvchi", icon: "Activity" },
  { id: 'scanner', name: "Hujjat Skaneri", category: 'input', desc: "Qog'oz tasvirlarini raqamli optik oqimga aylantiruvchi", icon: "Camera" },
  { id: 'mic', name: "Kondensatorli Mikrofon", category: 'input', desc: "Tovush to'lqinlarini elektr signallariga aylantirib kirituvchi", icon: "Mic" },
  { id: 'monitor', name: "IPS 4K Monitor", category: 'output', desc: "Raqamli video signallarni vizual tasvir sifatida chiqaruvchi", icon: "Monitor" },
  { id: 'printer', name: "Lazerli Printer", category: 'output', desc: "Matn va tasvirlarni qog'ozga jismoniy chop etib chiqaruvchi", icon: "Printer" },
  { id: 'touch', name: "Sensorli Ekran (Touchscreen)", category: 'io', desc: "Ham tasvir chiqaradi, ham barmoq bosilishini kiritadi (I/O)", icon: "Monitor" },
  { id: 'ext_ssd', name: "Tashqi USB-C SSD", category: 'io', desc: "Ma'lumotlarni tashqaridan o'qiydi hamda yozadi (I/O)", icon: "HardDrive" },
];

export const SignalDeviceView: React.FC<SignalDeviceViewProps> = ({
  onAddXp,
  onUnlockAchievement
}) => {
  const [activeMode, setActiveMode] = useState<'sandbox' | 'missions'>('sandbox');

  // ==========================================
  // OSCILLOSCOPE & NOISE SIMULATOR STATE
  // ==========================================
  const [noiseLevel, setNoiseLevel] = useState<number>(15); // 0% to 100%
  const [signalFrequency, setSignalFrequency] = useState<number>(3); // Hz
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const [signalRunning, setSignalRunning] = useState<boolean>(true);

  // Animation frame loop for continuous signal scrolling
  useEffect(() => {
    let animId: number;
    const update = () => {
      if (signalRunning) {
        setTimeOffset(prev => (prev + 0.05) % 100);
      }
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [signalRunning]);

  // Combinational vs Sequential D-FlipFlop
  const [inputD, setInputD] = useState(false);
  const [clockTick, setClockTick] = useState(0);
  const [storedQ, setStoredQ] = useState(false);

  const handleClockPulse = () => {
    sound.playClockTick();
    setClockTick(prev => prev + 1);
    setStoredQ(inputD);
  };

  // ==========================================
  // DEVICE SORTER SANDBOX STATE
  // ==========================================
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'internal' | 'input' | 'output' | 'io'>('all');

  // ==========================================
  // MISSIONS STATE
  // ==========================================
  const [currentMission, setCurrentMission] = useState<number>(1);
  const [mission1Threshold, setMission1Threshold] = useState<number>(50);
  const [mission1Solved, setMission1Solved] = useState<boolean>(false);

  // Mission 2: Sorting Challenge
  const [sorterTargets, setSorterTargets] = useState<{ [id: string]: string }>({});
  const [sorterScore, setSorterScore] = useState<number>(0);
  const [mission2Solved, setMission2Solved] = useState<boolean>(false);

  // Mission 3: PC Spec Builder
  const [clientType, setClientType] = useState<'office' | 'gaming' | 'ai' | 'render'>('gaming');
  const [chosenCpu, setChosenCpu] = useState('mid');
  const [chosenGpu, setChosenGpu] = useState('high');
  const [chosenRam, setChosenRam] = useState('32gb');
  const [mission3Feedback, setMission3Feedback] = useState<string | null>(null);

  // Generate SVG path for Analog Wave with noise
  const generateAnalogPath = () => {
    const points: string[] = [];
    const width = 600;
    const height = 140;
    const midY = height / 2;
    const amp = 45;

    for (let x = 0; x <= width; x += 3) {
      const t = (x / width) * signalFrequency * Math.PI * 2 + timeOffset;
      const pure = Math.sin(t) * amp;
      // deterministic pseudo-noise
      const noise = ((Math.sin(x * 12.345 + timeOffset * 3) + Math.cos(x * 45.67)) / 2) * (noiseLevel / 100) * 40;
      const y = midY - (pure + noise);
      points.push(`${x === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(10, Math.min(height - 10, y)).toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Generate SVG path for Digital Wave (Clean & Thresholded)
  const generateDigitalPath = (withNoise: boolean) => {
    const points: string[] = [];
    const width = 600;
    const height = 140;
    const highY = 30;
    const lowY = 110;

    for (let x = 0; x <= width; x += 4) {
      const t = (x / width) * signalFrequency * Math.PI * 2 + timeOffset;
      const isHigh = Math.sin(t) >= 0;
      let y = isHigh ? highY : lowY;

      if (withNoise && noiseLevel > 0) {
        const noise = ((Math.sin(x * 9.87 + timeOffset * 2) + Math.cos(x * 21.1)) / 2) * (noiseLevel / 100) * 30;
        y += noise;
      }
      points.push(`${x === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Reconstructed Digital Wave (Clean 0/1 after thresholding)
  const generateReconstructedPath = () => {
    const points: string[] = [];
    const width = 600;
    const height = 140;
    const highY = 30;
    const lowY = 110;

    for (let x = 0; x <= width; x += 4) {
      const t = (x / width) * signalFrequency * Math.PI * 2 + timeOffset;
      const isHigh = Math.sin(t) >= 0;
      const y = isHigh ? highY : lowY;
      points.push(`${x === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const handleDeviceDrop = (devId: string, targetCat: string) => {
    sound.playWireConnect();
    const newTargets = { ...sorterTargets, [devId]: targetCat };
    setSorterTargets(newTargets);

    // Check accuracy
    let correct = 0;
    ALL_DEVICES.forEach(d => {
      if (newTargets[d.id] === d.category) correct++;
    });
    setSorterScore(correct);

    if (correct >= ALL_DEVICES.length && !mission2Solved) {
      sound.playSuccess();
      confetti({ particleCount: 70, spread: 60 });
      setMission2Solved(true);
      onAddXp(120, "Qurilmalar saralash missiyasi bajarildi");
      onUnlockAchievement('first_step');
    }
  };

  const handleVerifyMission1 = () => {
    if (mission1Threshold >= 45 && mission1Threshold <= 55) {
      sound.playSuccess();
      confetti({ particleCount: 60, spread: 60 });
      setMission1Solved(true);
      onAddXp(80, "Raqamli signal shovqindan tiklandi");
      onUnlockAchievement('signal_analyst');
    } else {
      sound.playError();
      alert("Chegara (Threshold) darajasi noaniq! 50% ga yaqinlashtiring.");
    }
  };

  const handleVerifyMission3 = () => {
    sound.playClick();
    let valid = false;
    let text = "";

    if (clientType === 'office') {
      if (chosenCpu === 'low' || chosenCpu === 'mid') {
        valid = true;
        text = "Muvaffaqiyatli! Ofis ishlari uchun arzon va energiya tejamkor konfiguratsiya to'g'ri tanlandi.";
      } else {
        text = "Ofis uchun haddan tashqari qimmat protsessor tanlandi (byudjet isrofi).";
      }
    } else if (clientType === 'gaming') {
      if (chosenGpu === 'high' && (chosenCpu === 'mid' || chosenCpu === 'high') && chosenRam !== '8gb') {
        valid = true;
        text = "A'lo darajada! Kuchli GPU va mos CPU bottleneck yaratmasdan 120+ FPS ta'minlaydi.";
      } else {
        text = "Videokarta yetarli emas yoki operativ xotira (RAM) hajmi past.";
      }
    } else if (clientType === 'ai') {
      if (chosenGpu === 'high' && chosenRam === '64gb') {
        valid = true;
        text = "Mukammal! Katta til modellari va chuqur o'rganish uchun 64 GB RAM va kuchli VRAM zarur.";
      } else {
        text = "AI trenirovkasi uchun 64 GB RAM va yuqori darajadagi GPU zarur.";
      }
    } else if (clientType === 'render') {
      if (chosenCpu === 'high' && chosenRam !== '8gb') {
        valid = true;
        text = "To'g'ri tanlov! Ko'p yadroli CPU va yetarli RAM 4K video render vaqtini qisqartiradi.";
      } else {
        text = "Video render uchun kuchli ko'p yadroli CPU kerak.";
      }
    }

    setMission3Feedback(text);
    if (valid) {
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 70 });
      onAddXp(100, "Mijozga mos PC konfiguratsiyasi yig'ildi");
    } else {
      sound.playError();
    }
  };

  const filteredDevices = ALL_DEVICES.filter(d => deviceFilter === 'all' || d.category === deviceFilter);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0C1528] via-[#0E1E3D] to-[#0A1224] border border-[#1E2E4E] p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  2 & 7-AMALIY MASHG‘ULOT
                </span>
                <span className="text-xs font-mono text-slate-400">HARDWARE & SIGNAL</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                Signal Ossillografi & Qurilmalar Laboratoriyasi
              </h2>
              <p className="text-xs text-slate-400">
                Analog vs Raqamli to‘lqinlar, shovqin tiklanishi, kombinatsion/ketma-ket mantiq va PC arxitekturasi
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 bg-[#080E1C] p-1.5 rounded-2xl border border-[#1A2642]">
            <button
              onClick={() => { sound.playClick(); setActiveMode('sandbox'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeMode === 'sandbox'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔬 Erkin Tajriba (Sandbox)</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveMode('missions'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeMode === 'missions'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🎯 O‘yin Missiyasi (Topshiriq)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SANDBOX (ERKIN TAJRIBA) */}
      {/* ========================================================================= */}
      {activeMode === 'sandbox' && (
        <div className="space-y-6">
          {/* 1. OSCILLOSCOPE PANEL */}
          <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span>Real-Vaqt To‘lqin Ossillografi (Analog vs Raqamli)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Shovqin darajasini o‘zgartiring va analog buzilish hamda raqamli signal tiklanishini kuzating
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSignalRunning(!signalRunning)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    signalRunning ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {signalRunning ? '⏸ To‘xtatish' : '▶ Davom ettirish'}
                </button>
                <button
                  onClick={() => { sound.playClick(); setNoiseLevel(0); setSignalFrequency(3); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Tiklash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#070B16] p-4 rounded-2xl border border-[#142036]">
              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-slate-300">⚡ Shovqin (Noise) Darajasi:</span>
                  <span className={noiseLevel > 40 ? 'text-rose-400' : 'text-cyan-400'}>{noiseLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0% (Ideal toza)</span>
                  <span>50% (Kuchli shovqin)</span>
                  <span>100% (Kritik buzilish)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
                  <span className="text-slate-300">📡 Takt Chastotasi (Frequency):</span>
                  <span className="text-indigo-400">{signalFrequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={signalFrequency}
                  onChange={(e) => setSignalFrequency(Number(e.target.value))}
                  className="w-full accent-indigo-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 Hz (Sekin)</span>
                  <span>3 Hz (Standart)</span>
                  <span>6 Hz (Yuqori tezlik)</span>
                </div>
              </div>
            </div>

            {/* Live Wave Canvas / SVG Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Screen 1: Analog Wave */}
              <div className="bg-[#050812] border border-[#15233E] rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    <span>1. ANALOG TO‘LQIN (Sinusoidal uzluksiz signal)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    {noiseLevel > 30 ? "⚠️ Buzilish mavjud" : "Toza"}
                  </span>
                </div>

                <div className="w-full h-36 bg-[#04060E] rounded-xl border border-slate-800/80 relative flex items-center justify-center overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
                  <svg className="w-full h-full relative z-10" viewBox="0 0 600 140" preserveAspectRatio="none">
                    <path
                      d={generateAnalogPath()}
                      fill="none"
                      stroke={noiseLevel > 40 ? "#F87171" : "#FBBF24"}
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  💡 <b>Xulosa:</b> Shovqin qo‘shilganda analog signal doimiy buziladi va dastlabki holatini to‘liq tiklab bo‘lmaydi.
                </p>
              </div>

              {/* Screen 2: Digital Wave & Threshold Reconstruction */}
              <div className="bg-[#050812] border border-[#15233E] rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>2. RAQAMLI SIGNAL (0/1 Chegarali tiklanish)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    100% Qayta tiklanuvchi
                  </span>
                </div>

                <div className="w-full h-36 bg-[#04060E] rounded-xl border border-slate-800/80 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A_1px,transparent_1px),linear-gradient(to_bottom,#0F172A_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
                  {/* Threshold Lines */}
                  <div className="absolute top-[30px] left-0 right-0 border-b border-dashed border-cyan-500/40 text-[9px] text-cyan-400 pl-2">
                    HIGH (Mantiqiy 1: &gt; 2.0V)
                  </div>
                  <div className="absolute bottom-[30px] left-0 right-0 border-b border-dashed border-rose-500/40 text-[9px] text-rose-400 pl-2">
                    LOW (Mantiqiy 0: &lt; 0.8V)
                  </div>

                  <svg className="w-full h-full relative z-10" viewBox="0 0 600 140" preserveAspectRatio="none">
                    {/* Raw with noise */}
                    <path
                      d={generateDigitalPath(true)}
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    {/* Reconstructed clean signal */}
                    <path
                      d={generateReconstructedPath()}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  ✅ <b>Afzalligi:</b> Raqamli sxemalarda <code>LOW/HIGH</code> chegaralari mavjud bo‘lgani uchun shovqin qanchalik ko‘p bo‘lsa ham toza 0 va 1 ga qaytariladi.
                </p>
              </div>
            </div>
          </div>

          {/* 2. COMBINATIONAL VS SEQUENTIAL (D-TRIGGER) LAB */}
          <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                7-AMALIY NAZARIYA
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Kombinatsion vs Ketma-ket (Xotirali Trigger) Mantiq
              </h3>
              <p className="text-xs text-slate-400">
                Kombinatsion sxemalarda chiqish zudlik bilan o‘zgaradi. Ketma-ket (xotirali) sxemalarda esa ma’lumot faqat Takt (Clock) signali kelganda saqlanadi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#070B16] p-5 rounded-2xl border border-[#142036]">
              {/* Combinational Logic */}
              <div className="space-y-3 border-r-0 md:border-r border-slate-800 pr-0 md:pr-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">1. Oddiy Kombinatsion Blok (Invertor NOT):</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Xotirasiz</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => { sound.playClick(); setInputD(!inputD); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      inputD ? 'bg-cyan-600 text-white shadow-glow-cyan' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Kirish D = {inputD ? '1 (HIGH)' : '0 (LOW)'}
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="text-xs font-mono bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-slate-300">
                    Chiqish (NOT) = <b className={!inputD ? 'text-emerald-400' : 'text-rose-400'}>{!inputD ? '1' : '0'}</b>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">D o‘zgarishi bilanoq chiqish ham bir lahzada o‘zgaradi.</p>
              </div>

              {/* Sequential Logic (D-FlipFlop) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">2. D-Trigger / Registr (Xotirali Element):</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Taktli Xotira</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClockPulse}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md flex items-center space-x-1.5 active:scale-95 transition-transform"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>CLOCK ⚡ (Takt: {clockTick})</span>
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="text-xs font-mono bg-purple-950/40 border border-purple-500/40 px-3 py-2 rounded-xl text-purple-200">
                    Saqlangan Q = <b className="text-amber-400 font-bold text-sm">{storedQ ? '1' : '0'}</b>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  D o‘zgarsa ham, Q o‘zgarmaydi! U faqat CLOCK tugmasi bosilganda D ning qiymatini xotirasiga yozib oladi.
                </p>
              </div>
            </div>
          </div>

          {/* 3. DEVICE MATRIX & PERIPHERALS SANDBOX */}
          <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  2-AMALIY MASHG‘ULOT
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Kompyuter Arxitekturasi Qurilmalari Matritsasi
                </h3>
                <p className="text-xs text-slate-400">
                  Ichki, Kiritish, Chiqarish va Ikki tomonlama (I/O) qurilmalar tahlili
                </p>
              </div>

              {/* Filter */}
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'internal', 'input', 'output', 'io'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setDeviceFilter(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                      deviceFilter === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' && 'Barchasi'}
                    {cat === 'internal' && 'Ichki'}
                    {cat === 'input' && 'Kiritish'}
                    {cat === 'output' && 'Chiqarish'}
                    {cat === 'io' && 'I/O'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredDevices.map(dev => (
                <div
                  key={dev.id}
                  className="bg-[#070B16] border border-[#142036] hover:border-cyan-500/40 p-4 rounded-2xl transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {dev.name}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                      dev.category === 'internal' ? 'bg-blue-500/20 text-blue-300' :
                      dev.category === 'input' ? 'bg-emerald-500/20 text-emerald-300' :
                      dev.category === 'output' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {dev.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{dev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MISSIONS (TOPSHIRIQLAR & XP) */}
      {/* ========================================================================= */}
      {activeMode === 'missions' && (
        <div className="space-y-6">
          {/* Mission Select Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 1, title: "1. Shovqinni Tiklash", icon: "📡", xp: 80, solved: mission1Solved },
              { id: 2, title: "2. Qurilmalar Saralash", icon: "📦", xp: 120, solved: mission2Solved },
              { id: 3, title: "3. PC Arxitektor", icon: "🛠️", xp: 100, solved: mission3Feedback?.includes("Muvaffaqiyatli") || mission3Feedback?.includes("A'lo") || mission3Feedback?.includes("To'g'ri") },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => { sound.playClick(); setCurrentMission(m.id); }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  currentMission === m.id
                    ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-lg'
                    : 'bg-[#0A1020] border-[#182642] text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-sm font-bold flex items-center space-x-2">
                    <span>{m.icon}</span>
                    <span>{m.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono mt-0.5 block">+{m.xp} XP Mukofot</span>
                </div>
                {m.solved && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            ))}
          </div>

          {/* MISSION 1: NOISE THRESHOLD TUNING */}
          {currentMission === 1 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>📡 Missiya 1: Shovqinli Raqamli Kanalni Tiklash</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kabeldagi shovqin kuchaygan (50%). LOW va HIGH chegarasini to‘g‘ri sozlab, 1 va 0 larni toza tiklang.
                  </p>
                </div>
                {mission1Solved && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Bajarildi (+80 XP)
                  </span>
                )}
              </div>

              <div className="bg-[#070B16] p-5 rounded-2xl border border-[#142036] space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono font-bold mb-1">
                    <span className="text-slate-300">Komparator chegara darajasi (Slicing Threshold):</span>
                    <span className="text-cyan-400">{mission1Threshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={mission1Threshold}
                    onChange={(e) => setMission1Threshold(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10% (Past)</span>
                    <span>50% (Ideal Balans)</span>
                    <span>90% (Juda yuqori)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleVerifyMission1}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Signalni Tekshirish & Tasdiqlash
                  </button>
                  <span className="text-xs text-slate-400">
                    Chegara 45% dan 55% gacha oraliqda bo‘lishi lozim.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MISSION 2: DEVICE SORTER CHALLENGE */}
          {currentMission === 2 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">
                    📦 Missiya 2: 12 ta Qurilmani Guruhlarga Saralash
                  </h3>
                  <p className="text-xs text-slate-400">
                    Har bir qurilma uchun to‘g‘ri guruhni tanlang (Natija: {sorterScore} / {ALL_DEVICES.length})
                  </p>
                </div>
                {mission2Solved && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Bajarildi (+120 XP)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_DEVICES.map(dev => {
                  const currentSelection = sorterTargets[dev.id] || '';
                  const isCorrect = currentSelection === dev.category;
                  return (
                    <div
                      key={dev.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        currentSelection
                          ? isCorrect ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-[#070B16] border-[#142036]'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-2">{dev.name}</div>
                      <div className="grid grid-cols-4 gap-1">
                        {(['internal', 'input', 'output', 'io'] as const).map(cat => (
                          <button
                            key={cat}
                            onClick={() => handleDeviceDrop(dev.id, cat)}
                            className={`py-1 text-[10px] font-bold rounded-lg transition-colors ${
                              currentSelection === cat
                                ? isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {cat === 'internal' && 'Ichki'}
                            {cat === 'input' && 'Kirit'}
                            {cat === 'output' && 'Chiq'}
                            {cat === 'io' && 'I/O'}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MISSION 3: PC SPEC BUILDER */}
          {currentMission === 3 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  🛠️ Missiya 3: Mijoz Vazifasiga Mos Kompyuter Yig‘ish
                </h3>
                <p className="text-xs text-slate-400">
                  Mijozning maqsadi va byudjetiga eng optimal komponentlar to‘plamini tanlang
                </p>
              </div>

              <div className="bg-[#070B16] p-5 rounded-2xl border border-[#142036] space-y-4">
                {/* Client Goal */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Mijoz Vazifasi (Profil):</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'office', label: "🏢 Ofis & Matn" },
                      { id: 'gaming', label: "🎮 Kiber-Sport (120+ FPS)" },
                      { id: 'ai', label: "🧠 AI & Deep Learning" },
                      { id: 'render', label: "🎬 4K Video Montaj" }
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setClientType(c.id as any); setMission3Feedback(null); }}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                          clientType === c.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specs Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">CPU Tanlovi:</label>
                    <select
                      value={chosenCpu}
                      onChange={(e) => setChosenCpu(e.target.value)}
                      className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                    >
                      <option value="low">Intel Core i3 / Ryzen 3 (4 yadro)</option>
                      <option value="mid">Intel Core i5 / Ryzen 5 (6-8 yadro)</option>
                      <option value="high">Intel Core i9 / Ryzen 9 (16-24 yadro)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">GPU Tanlovi:</label>
                    <select
                      value={chosenGpu}
                      onChange={(e) => setChosenGpu(e.target.value)}
                      className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                    >
                      <option value="integrated">Integratsiyalashgan (iGPU)</option>
                      <option value="mid">GeForce RTX 4060 (8 GB)</option>
                      <option value="high">GeForce RTX 4090 / A100 (24 GB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">RAM Tanlovi:</label>
                    <select
                      value={chosenRam}
                      onChange={(e) => setChosenRam(e.target.value)}
                      className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                    >
                      <option value="8gb">8 GB DDR4 (Minimal)</option>
                      <option value="16gb">16 GB DDR5 (Standart)</option>
                      <option value="32gb">32 GB DDR5 (Kuchli)</option>
                      <option value="64gb">64 GB DDR5 (Professional)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleVerifyMission3}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Konfiguratsiyani Baholash & Testlash
                </button>

                {mission3Feedback && (
                  <div className={`p-3 rounded-xl text-xs font-bold ${
                    mission3Feedback.includes("Muvaffaqiyatli") || mission3Feedback.includes("A'lo") || mission3Feedback.includes("To'g'ri") || mission3Feedback.includes("Mukammal")
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}>
                    {mission3Feedback}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
