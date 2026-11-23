import React, { useState } from 'react';
import { 
  Layers, 
  Zap, 
  HardDrive, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  AlertCircle,
  TrendingDown,
  Sparkles,
  Server
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { 
  CacheSimulator, 
  HIERARCHY_LEVELS, 
  calculateEAT, 
  generateEATCurve 
} from '../../engines/cacheEngine';

interface MemoryCacheViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

export const MemoryCacheView: React.FC<MemoryCacheViewProps> = ({
  onAddXp,
  onUnlockAchievement,
}) => {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'eat' | 'storage'>('hierarchy');

  // ---------------- CACHE SIMULATOR STATE ----------------
  const [cacheSim] = useState(() => new CacheSimulator('write-back'));
  const [writePolicy, setWritePolicy] = useState<'write-back' | 'write-through'>('write-back');
  const [inputAddrHex, setInputAddrHex] = useState("0x1000");
  const [lastStep, setLastStep] = useState<any>(cacheSim.state.history[0] || null);
  const [syncState, setSyncState] = useState(cacheSim.state);

  const handleAccess = (addr: number, isWrite = false) => {
    sounds.playClick();
    cacheSim.state.writePolicy = writePolicy;
    const step = cacheSim.access(addr, isWrite);
    setLastStep(step);
    setSyncState({ ...cacheSim.state });

    if (step.isHit) {
      sounds.playSuccess();
      onAddXp(10, "Kesh Hit bo‘ldi");
    }
  };

  const handleResetCache = () => {
    sounds.playClick();
    cacheSim.reset();
    setLastStep(null);
    setSyncState({ ...cacheSim.state });
  };

  // ---------------- EAT CALCULATOR STATE ----------------
  const [l1HitRate, setL1HitRate] = useState(0.95); // 95%
  const [l1Latency, setL1Latency] = useState(1.5); // ns
  const [l2HitRate, setL2HitRate] = useState(0.80); // 80%
  const [l2Latency, setL2Latency] = useState(5.0); // ns
  const [ramLatency, setRamLatency] = useState(70.0); // ns

  const currentEat = calculateEAT(l1HitRate, l1Latency, l2HitRate, l2Latency, ramLatency);
  const chartPoints = generateEATCurve(l1Latency, l2Latency, ramLatency, l2HitRate);

  // ---------------- STORAGE DEVICE MATRIX STATE ----------------
  const storageDevices = [
    {
      name: "HDD (Mexanik)",
      interface: "SATA III (6 Gbps)",
      seqSpeed: "150–220 MB/s",
      random4k: "~100–200 IOPS",
      latency: "10–15 ms (juda yuqori)",
      durability: "Zarbaga sezgir",
      bestFor: "Arxiv, katta media va sovuq zaxira (Backup)",
    },
    {
      name: "SATA SSD (2.5\" / M.2)",
      interface: "SATA AHCI",
      seqSpeed: "500–550 MB/s",
      random4k: "~90 000 IOPS",
      latency: "~50–100 mks",
      durability: "300–600 TBW",
      bestFor: "Eski noutbuklarni tezlashtirish, ikkilamchi o‘yin diski",
    },
    {
      name: "NVMe Gen4 SSD",
      interface: "PCIe 4.0 x4",
      seqSpeed: "5000–7400 MB/s",
      random4k: "~1 000 000 IOPS",
      latency: "~15–30 mks",
      durability: "600–1200 TBW",
      bestFor: "Operatsion tizim, dasturlash va umumiy ishchi stansiya",
    },
    {
      name: "NVMe Gen5 SSD",
      interface: "PCIe 5.0 x4",
      seqSpeed: "10 000–14 500 MB/s",
      random4k: "~1 500 000+ IOPS",
      latency: "~10–15 mks",
      durability: "1200–2400 TBW",
      bestFor: "8K video montaj, AI/ML mahalliy modellar va og‘ir serverlar",
    },
  ];

  // Storage selection quiz
  const [selectedStorageQuiz, setSelectedStorageQuiz] = useState(0);
  const [storageAnswerGiven, setStorageAnswerGiven] = useState(false);
  const [storageSelectedOpt, setStorageSelectedOpt] = useState<number | null>(null);

  const storageQuizzes = [
    {
      scenario: "Katta media-serverda 40 TB hajmdagi arxiv filmlar va haftalik zaxira nusxalarni eng tejamkor saqlash kerak. Qaysi vosita maqsadga muvofiq?",
      options: ["HDD massivi (SATA)", "NVMe Gen5 SSD", "SATA SSD", "RAMDisk"],
      correct: 0,
      expl: "Katta hajm va eng arzon GB/narx nisbati uchun HDD eng to‘g‘ri tanlov.",
    },
    {
      scenario: "Dasturchi operatsion tizim, Docker konteynerlar va 4K fayllarni tezkor yuklash uchun eng muvozanatli zamonaviy disk tanlamoqda. Tavsiya?",
      options: ["NVMe Gen4 SSD (PCIe x4)", "SATA HDD", "USB fleshka", "Optik disk"],
      correct: 0,
      expl: "NVMe Gen4 SSD 1M IOPS va past kechikish evaziga tizim uchun ideal standart.",
    },
  ];

  const handleStorageChoice = (idx: number) => {
    if (storageAnswerGiven) return;
    setStorageSelectedOpt(idx);
    setStorageAnswerGiven(true);
    if (idx === storageQuizzes[selectedStorageQuiz].correct) {
      sounds.playSuccess();
      onAddXp(25, "Saqlash vositasi to‘g‘ri tanlandi");
      onUnlockAchievement("storage_expert");
    } else {
      sounds.playError();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>12, 13, 14-amaliy mashg‘ulotlar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Xotira Ierarxiyasi, Kesh & Virtual Xotira
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Hit/Miss lokalik zanjiri, EAT kalkulyatori va HDD vs SATA vs NVMe SSD taqqoslash markazi.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('hierarchy'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hierarchy' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kesh & Zanjir Simulyatori
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('eat'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'eat' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            EAT Hisoblagich & Grafik
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('storage'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'storage' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saqlash Vositalari Matritsasi
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: Hierarchy & Cache Simulator ---------------- */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-400">Yozish Siyosati:</span>
              <button
                onClick={() => setWritePolicy('write-back')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  writePolicy === 'write-back' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Write-Back (Keshda ushlab turish)
              </button>
              <button
                onClick={() => setWritePolicy('write-through')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  writePolicy === 'write-through' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Write-Through (Darhol RAM ga yozish)
              </button>
            </div>

            <button
              onClick={handleResetCache}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Keshni tozalash</span>
            </button>
          </div>

          {/* Interactive Memory Chain Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Xotira Zanjiri: Protsessordan SSD gacha murojaat oqimi:
              </span>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-emerald-400 font-bold">Hit: {syncState.hits}</span>
                <span className="text-rose-400 font-bold">Miss: {syncState.misses}</span>
                <span className="text-slate-400">
                  Hit Rate: {syncState.hits + syncState.misses > 0 ? Math.round((syncState.hits / (syncState.hits + syncState.misses)) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Visual Levels Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {HIERARCHY_LEVELS.map((lvl) => {
                const isCurrentHit = lastStep && lastStep.levelReached.includes(lvl.type);
                return (
                  <div
                    key={lvl.name}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isCurrentHit
                        ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{lvl.type}</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{lvl.name}</h4>
                      <span className="text-[10px] text-slate-400 block mt-1">{lvl.capacityStr}</span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Latency:</span>
                      <span className="text-indigo-400 font-bold">{lvl.latencyNs} ns</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Address Input & Preset Sequence */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Manzilga murojaat (HEX):</span>
                <input
                  type="text"
                  value={inputAddrHex}
                  onChange={(e) => setInputAddrHex(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 font-mono text-xs text-white w-32 outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAccess(parseInt(inputAddrHex, 16) || 0x1000, false)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                >
                  O‘qish (Read)
                </button>
                <button
                  onClick={() => handleAccess(parseInt(inputAddrHex, 16) || 0x1000, true)}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20"
                >
                  Yozish (Write)
                </button>
              </div>

              {/* Preset Addresses to demonstrate Spatial Locality */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">Fazoviy lokalik sinov manzillari:</span>
                {[0x1000, 0x1004, 0x1008, 0x1040, 0x2000, 0x30000].map(addr => (
                  <button
                    key={addr}
                    onClick={() => {
                      const hex = '0x' + addr.toString(16).toUpperCase();
                      setInputAddrHex(hex);
                      handleAccess(addr, false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {'0x' + addr.toString(16).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Last Step Explanation Card */}
            {lastStep && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400">
                    Murojaat qilingan: {lastStep.hexAddress} (Tag: {lastStep.cacheLineTag}, Set: {lastStep.cacheLineIndex})
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold ${lastStep.isHit ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {lastStep.isHit ? 'Hit' : 'Miss'} ({lastStep.latencyNs} ns)
                  </span>
                </div>
                <p className="text-slate-300 mt-1">{lastStep.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: EAT Calculator & Graph ---------------- */}
      {activeTab === 'eat' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Formulali Hisoblash (12-amaliy)
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-2">
              EAT (Effective Access Time) Jonli Kalkulyatori
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Formula: <code>EAT = t_L1 + (1 − H₁) × (t_L2 + (1 − H₂) × t_RAM)</code>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Sliders Inputs */}
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">L1 Kesh Hit Rate:</span>
                  <span className="text-cyan-400 font-mono">{(l1HitRate * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.70"
                  max="0.99"
                  step="0.01"
                  value={l1HitRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setL1HitRate(val);
                    if (val >= 0.95) onUnlockAchievement("cache_optimizer");
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">L1 Kechikish (t_L1):</span>
                  <span className="text-cyan-400 font-mono">{l1Latency} ns</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={l1Latency}
                  onChange={(e) => setL1Latency(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">L2 Kesh Hit Rate:</span>
                  <span className="text-amber-400 font-mono">{(l2HitRate * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.95"
                  step="0.05"
                  value={l2HitRate}
                  onChange={(e) => setL2HitRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">RAM Kechikish (t_RAM):</span>
                  <span className="text-purple-400 font-mono">{ramLatency} ns</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={ramLatency}
                  onChange={(e) => setRamLatency(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Result Card & SVG Chart */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-950 to-indigo-950/60 border border-indigo-500/40 text-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">O‘rtacha Kirish Vaqti:</span>
                <div className="text-5xl font-black text-cyan-300 font-mono mt-1">
                  {currentEat} <span className="text-xl text-slate-400 font-normal">ns</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">
                  {l1HitRate >= 0.95 ? "🚀 Zo‘r unumdorlik! Murojaatlarning 95%+ qismi bevosita L1 da bajarilmoqda." : "⚠️ Hit Rate pastligi sabab protsessor ko‘p vaqtini sekin RAM ni kutishga sarflaydi."}
                </span>
              </div>

              {/* Dynamic SVG Curve Chart */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-2 font-mono">
                  Grafik: L1 Hit Rate (70%..99%) va EAT (ns) bog‘liqligi:
                </span>
                <svg className="w-full h-32 overflow-visible">
                  {/* Grid lines */}
                  <line x1="0" y1="120" x2="100%" y2="120" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="20" x2="100%" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="4" />

                  {/* Polyline */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    points={chartPoints.map((p, idx) => {
                      const x = (idx / (chartPoints.length - 1)) * 300;
                      // map EAT from 1..25 to 120..20
                      const y = Math.max(20, Math.min(120, 120 - (p.eat / 25) * 100));
                      return `${x},${y}`;
                    }).join(' ')}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: Storage Comparison Matrix ---------------- */}
      {activeTab === 'storage' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              13-Amaliy: Saqlash Qurilmalarining Texnik Ko‘rsatkichlari:
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                    <th className="p-3">Qurilma turi</th>
                    <th className="p-3">Interfeys</th>
                    <th className="p-3">Ketma-ket tezlik</th>
                    <th className="p-3">4K Random IOPS</th>
                    <th className="p-3">Kechikish (Latency)</th>
                    <th className="p-3">Tavsiya etilgan vazifa</th>
                  </tr>
                </thead>
                <tbody>
                  {storageDevices.map((dev, i) => (
                    <tr key={i} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-white">{dev.name}</td>
                      <td className="p-3 text-slate-300 font-mono">{dev.interface}</td>
                      <td className="p-3 text-cyan-400 font-mono font-semibold">{dev.seqSpeed}</td>
                      <td className="p-3 text-amber-400 font-mono">{dev.random4k}</td>
                      <td className="p-3 text-slate-300">{dev.latency}</td>
                      <td className="p-3 text-emerald-300 text-[11px]">{dev.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Storage Scenario Quiz */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              Amaliy Muammo: Qurilma Tanlash Ssenariysi
            </span>
            <p className="text-sm text-slate-200 font-medium">
              {storageQuizzes[selectedStorageQuiz].scenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {storageQuizzes[selectedStorageQuiz].options.map((opt, oIdx) => {
                const isCorrect = oIdx === storageQuizzes[selectedStorageQuiz].correct;
                const isChosen = storageSelectedOpt === oIdx;

                let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-indigo-500";
                if (storageAnswerGiven) {
                  if (isCorrect) btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                  else if (isChosen) btnStyle = "bg-rose-950 border-rose-500 text-rose-200";
                  else btnStyle = "bg-slate-950 border-slate-900 text-slate-600";
                }

                return (
                  <button
                    key={oIdx}
                    disabled={storageAnswerGiven}
                    onClick={() => handleStorageChoice(oIdx)}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {storageAnswerGiven && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
                <p>
                  <strong className="text-indigo-400">Izoh: </strong>
                  {storageQuizzes[selectedStorageQuiz].expl}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedStorageQuiz(prev => (prev + 1) % storageQuizzes.length);
                      setStorageAnswerGiven(false);
                      setStorageSelectedOpt(null);
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500"
                  >
                    Keyingi ssenariy →
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
