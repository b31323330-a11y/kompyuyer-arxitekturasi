import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Sparkles, 
  Calculator,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

interface BusGen {
  gen: string;
  transferRate: number; // GT/s
  encoding: string;
  efficiency: number; // e.g. 128/130
  modulation: string;
}

const PCIE_GENS: BusGen[] = [
  { gen: 'PCIe 3.0', transferRate: 8, encoding: '128b/130b', efficiency: 128 / 130, modulation: 'NRZ' },
  { gen: 'PCIe 4.0', transferRate: 16, encoding: '128b/130b', efficiency: 128 / 130, modulation: 'NRZ' },
  { gen: 'PCIe 5.0', transferRate: 32, encoding: '128b/130b', efficiency: 128 / 130, modulation: 'NRZ' },
  { gen: 'PCIe 6.0', transferRate: 64, encoding: 'FLIT (PAM4)', efficiency: 1.0, modulation: 'PAM4 (2 bit/takt)' },
  { gen: 'PCIe 7.0', transferRate: 128, encoding: 'FLIT (PAM4)', efficiency: 1.0, modulation: 'PAM4 (2 bit/takt)' },
];

const LANES = [1, 4, 8, 16];

export const Game12BusPcie: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [selectedGen, setSelectedGen] = useState<BusGen>(PCIE_GENS[1]); // default PCIe 4.0
  const [selectedLanes, setSelectedLanes] = useState<number>(16); // default x16
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);

  // CXL Matching Mini-Game State
  const [matchedCXL, setMatchedCXL] = useState<{ [key: string]: string }>({});
  const [cxlFeedback, setCxlFeedback] = useState<string | null>(null);

  // Bandwidth Formula = GT/s * Lanes * Efficiency / 8 (GB/s)
  const bandwidthGBs = ((selectedGen.transferRate * selectedLanes * selectedGen.efficiency) / 8).toFixed(2);
  const bidirectionalGBs = (parseFloat(bandwidthGBs) * 2).toFixed(2);

  const CXL_PROTOS = [
    { id: 'cxl_io', name: 'CXL.io', target: 'Standart I/O va konfiguratsiya' },
    { id: 'cxl_cache', name: 'CXL.cache', target: 'GPU/Tezlatgich kesh kogerentligi' },
    { id: 'cxl_mem', name: 'CXL.mem', target: 'Umumiy xotira maydoni (Host/Device)' },
  ];

  const handleCXLMatch = (protoId: string, targetName: string) => {
    sound.playClick();
    const updated = { ...matchedCXL, [protoId]: targetName };
    setMatchedCXL(updated);

    if (Object.keys(updated).length === 3) {
      sound.playLevelUp();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      setScore(s => s + 100);
      setCoins(c => c + 20);
      setCxlFeedback("Barcha CXL protokollari mukammal ulandi (+100 Ball, +20 Tanga)!");
      onFinish(score + 100, coins + 20, 190);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
            <Network className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Shina & PCIe/CXL Trafigi
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-900/50 text-cyan-400 border border-cyan-800">
                16-amaliy
              </span>
            </h2>
            <p className="text-xs text-slate-400">PCIe 3.0-7.0 o'tkazish qobiliyati & CXL kogerent protokollari</p>
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

      {/* Bandwidth Interactive Calculator */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            PCI Express O'tkazish Qobiliyati (Bandwidth) Kalkulyatori
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Formula: <code className="px-2 py-0.5 bg-slate-950 rounded text-cyan-400 font-mono">O'tkazish = GT/s × Liniyalar × Kodlash / 8</code>
          </p>
        </div>

        {/* Gen Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">PCIe Avlodi (Generation):</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PCIE_GENS.map(item => (
              <button
                key={item.gen}
                onClick={() => {
                  sound.playClick();
                  setSelectedGen(item);
                }}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedGen.gen === item.gen
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-sm font-mono">{item.gen}</div>
                <div className="text-[11px] opacity-80 mt-0.5">{item.transferRate} GT/s</div>
              </button>
            ))}
          </div>
        </div>

        {/* Lanes Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Liniyalar Soni (Lanes):</label>
          <div className="grid grid-cols-4 gap-3">
            {LANES.map(lane => (
              <button
                key={lane}
                onClick={() => {
                  sound.playClick();
                  setSelectedLanes(lane);
                }}
                className={`py-3 rounded-xl border font-mono font-bold text-base transition-all ${
                  selectedLanes === lane
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/30'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                x{lane}
              </button>
            ))}
          </div>
        </div>

        {/* Bandwidth Result Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 rounded-2xl p-5 text-center space-y-1 shadow-xl">
            <span className="text-xs uppercase font-bold text-cyan-400">Bir Tomonlama (Simplex)</span>
            <div className="text-4xl font-black text-white font-mono">
              {bandwidthGBs} <span className="text-xl text-cyan-400 font-normal">GB/s</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {selectedGen.gen} ({selectedGen.transferRate} GT/s) × {selectedLanes} liniya ({selectedGen.modulation})
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-5 text-center space-y-1 shadow-xl">
            <span className="text-xs uppercase font-bold text-indigo-400">Ikki Tomonlama (Full-Duplex)</span>
            <div className="text-4xl font-black text-white font-mono">
              {bidirectionalGBs} <span className="text-xl text-indigo-400 font-normal">GB/s</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Bir vaqtning o'zida ham uzatish (TX), ham qabul qilish (RX)
            </p>
          </div>
        </div>

        {/* CXL Interconnect Matching Challenge */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              CXL (Compute Express Link) Protokollarini Juftlang
            </h4>
            <p className="text-xs text-slate-400">Har bir CXL quyi protokolining maqsadli vazifasini tanlang.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CXL_PROTOS.map(proto => {
              const isMatched = matchedCXL[proto.id] !== undefined;

              return (
                <div
                  key={proto.id}
                  className={`p-4 rounded-xl border space-y-2 transition-all ${
                    isMatched ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-mono">{proto.name}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>

                  {isMatched ? (
                    <div className="text-xs text-emerald-300 font-medium">{matchedCXL[proto.id]}</div>
                  ) : (
                    <button
                      onClick={() => handleCXLMatch(proto.id, proto.target)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold rounded-lg transition-colors"
                    >
                      {proto.target}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {cxlFeedback && (
            <div className="p-3 bg-emerald-950/50 border border-emerald-500 text-emerald-300 text-xs font-semibold rounded-xl text-center">
              {cxlFeedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
