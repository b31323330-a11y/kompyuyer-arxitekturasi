import React, { useState } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  Coins, 
  ArrowLeft, 
  Play, 
  Flame, 
  Search, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/soundEngine';

// Import all 12 mini-games matching exact specification
import { Game1DeviceSorter } from './games/Game1DeviceSorter';
import { Game2PCBuilder } from './games/Game2PCBuilder';
import { Game3BitRain } from './games/Game3BitRain';
import { Game4ALUArena } from './games/Game4ALUArena';
import { Game5SignalHunter } from './games/Game5SignalHunter';
import { Game5LogicWiring } from './games/Game5LogicWiring';
import { Game6KarnaughHunter } from './games/Game6KarnaughHunter';
import { Game7RV32ICodeArena } from './games/Game7RV32ICodeArena';
import { Game9MemoryPyramid } from './games/Game9MemoryPyramid';
import { Game10CacheTLB } from './games/Game10CacheTLB';
import { Game11RaidCrisis } from './games/Game11RaidCrisis';
import { Game12BusPcie } from './games/Game12BusPcie';

export interface ArcadeGameMeta {
  id: string;
  num: number;
  title: string;
  lab: string;
  category: 'devices' | 'number' | 'logic' | 'riscv' | 'memory' | 'raid';
  genre: string;
  icon: string;
  description: string;
  rewardXp: number;
  rewardCoins: number;
  color: string;
}

export const ARCADE_GAMES_CATALOG: ArcadeGameMeta[] = [
  {
    id: 'game1_sorter',
    num: 1,
    title: "Konveyer: Qurilmalar Saralash",
    lab: "2-amaliy",
    category: 'devices',
    genre: "Arcade Reflex",
    icon: "🖥️",
    description: "Harakatlanayotgan apparat qurilmalarini tezda Ichki, Kiritish, Chiqarish va I/O qutilariga saralang.",
    rewardXp: 120,
    rewardCoins: 25,
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 'game2_pcbuilder',
    num: 2,
    title: "PC Yig‘uvchi & Bottleneck Ovchisi",
    lab: "2 & 13-amaliy",
    category: 'devices',
    genre: "Strategy Builder",
    icon: "🛠️",
    description: "4 xil mijoz buyurtmasi va byudjetiga mos CPU, RAM, GPU va SSD tanlab, tizimdagi bottlenecklarni yo‘qoting.",
    rewardXp: 150,
    rewardCoins: 35,
    color: "from-cyan-600 to-blue-600",
  },
  {
    id: 'game3_bitrain',
    num: 3,
    title: "Bit Yomg‘iri / Bit-Panel",
    lab: "4 & 5-amaliy",
    category: 'number',
    genre: "Fast Puzzle",
    icon: "🔢",
    description: "Tushayotgan DEC, OCT va HEX sonlarni 8-bitli kalitlar orqali ikkilikda yig‘ing va tetradalarni tezkor toping.",
    rewardXp: 120,
    rewardCoins: 25,
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 'game4_alu',
    num: 4,
    title: "Overflow Qopqoni",
    lab: "6-amaliy",
    category: 'number',
    genre: "Fast Math",
    icon: "💥",
    description: "4-bit va 8-bit ikkilik qo‘shish/ayirishda ko‘chirish (Carry) va Unsigned Overflow bayrog‘ini xatosiz aniqlang.",
    rewardXp: 130,
    rewardCoins: 30,
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: 'game5_signal',
    num: 5,
    title: "Signal Ovchisi: Analog vs Raqamli",
    lab: "7-amaliy",
    category: 'logic',
    genre: "Interactive Quiz",
    icon: "📡",
    description: "Uzluksiz to'lqin vs diskret signallar, LOW/HIGH kuchlanish zonalari va kombinatsion vs ketma-ketlik sxemalari.",
    rewardXp: 130,
    rewardCoins: 25,
    color: "from-cyan-600 to-teal-600",
  },
  {
    id: 'game6_wiring',
    num: 6,
    title: "Mini-Logisim: Sxema Ustasi",
    lab: "8-amaliy",
    category: 'logic',
    genre: "Wiring Puzzle",
    icon: "⚡",
    description: "Kirish signallari (A, B), mantiqiy elementlar, Half Adder va universal NAND bazislarini avtomatik testlang.",
    rewardXp: 140,
    rewardCoins: 30,
    color: "from-purple-600 to-violet-600",
  },
  {
    id: 'game7_karnaugh',
    num: 7,
    title: "Karnaugh & De Morgan Boshqotirmasi",
    lab: "9-amaliy",
    category: 'logic',
    genre: "Grid Puzzle",
    icon: "🧩",
    description: "2x4 Gray code K-map kataklarida qirralararo o‘ralish (wrap-around) va De Morgan qoidalarini yeching.",
    rewardXp: 130,
    rewardCoins: 25,
    color: "from-violet-600 to-fuchsia-600",
  },
  {
    id: 'game8_riscv',
    num: 8,
    title: "Mini-Ripes: Protsessor Missiyasi",
    lab: "10 & 11-amaliy",
    category: 'riscv',
    genre: "Processor Simulator",
    icon: "⚙️",
    description: "RV32I registrlar (x0-x31), RAM, 32-bit format (R/I/S/B) va Samarali Manzil (EA) sinovlarini bajaring.",
    rewardXp: 160,
    rewardCoins: 40,
    color: "from-teal-600 to-emerald-600",
  },
  {
    id: 'game9_pyramid',
    num: 9,
    title: "Xotira Piramidasi Quruvchisi",
    lab: "12-amaliy",
    category: 'memory',
    genre: "Drag & Drop / Hierarchy",
    icon: "🏗️",
    description: "8 qavatli xotira iyerarxiyasini (Registr -> L1-L3 -> DRAM -> SSD -> HDD) tezlik/narx bo'yicha tering va EAT ni hisoblang.",
    rewardXp: 140,
    rewardCoins: 30,
    color: "from-amber-600 to-orange-600",
  },
  {
    id: 'game10_cache',
    num: 10,
    title: "Kesh & TLB Snayperi",
    lab: "14-amaliy",
    category: 'memory',
    genre: "Live Pipeline",
    icon: "🎯",
    description: "CPU so'rovi: TLB ➔ L1 Kesh ➔ RAM ➔ Disk Swap zanjirida Hit/Miss, Write-Back va Hard Fault larni boshqaring.",
    rewardXp: 140,
    rewardCoins: 30,
    color: "from-pink-600 to-rose-600",
  },
  {
    id: 'game11_raid',
    num: 11,
    title: "RAID Inqirozi Boshqaruvchisi",
    lab: "15-amaliy",
    category: 'raid',
    genre: "Crisis Simulator",
    icon: "🛡️",
    description: "RAID 0/1/5/6/10 da disklar avariyasi, Online/Degraded/Failed holatlar, XOR parity va Rebuild jarayonini boshqaring.",
    rewardXp: 150,
    rewardCoins: 35,
    color: "from-emerald-600 to-cyan-600",
  },
  {
    id: 'game12_pcie',
    num: 12,
    title: "Shina & PCIe/CXL Trafigi",
    lab: "16-amaliy",
    category: 'raid',
    genre: "Bandwidth Puzzle",
    icon: "🚀",
    description: "PCIe 3.0-7.0 (8..128 GT/s), x1-x16 liniyalar, PAM4 kodlash va CXL (io/cache/mem) kogerent protokollarini o'rganing.",
    rewardXp: 150,
    rewardCoins: 35,
    color: "from-indigo-600 to-blue-600",
  },
];

export const ArcadeGamesView: React.FC = () => {
  const { arcadeHighScores, updateArcadeScore, coins } = useGameStore();
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');

  const filteredGames = ARCADE_GAMES_CATALOG.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.lab.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCat === 'all' || game.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const handleFinishGame = (score: number, rewardCoins: number, rewardXp: number) => {
    if (!activeGameId) return;
    updateArcadeScore(activeGameId, score, rewardCoins, rewardXp);
  };

  const renderActiveGame = () => {
    const highScore = activeGameId ? (arcadeHighScores[activeGameId] || 0) : 0;

    switch (activeGameId) {
      case 'game1_sorter':
        return <Game1DeviceSorter onFinish={handleFinishGame} highScore={highScore} />;
      case 'game2_pcbuilder':
        return <Game2PCBuilder onFinish={handleFinishGame} highScore={highScore} />;
      case 'game3_bitrain':
        return <Game3BitRain onFinish={handleFinishGame} highScore={highScore} />;
      case 'game4_alu':
        return <Game4ALUArena onFinish={handleFinishGame} highScore={highScore} />;
      case 'game5_signal':
        return <Game5SignalHunter onFinish={handleFinishGame} highScore={highScore} />;
      case 'game6_wiring':
        return <Game5LogicWiring onFinish={handleFinishGame} highScore={highScore} />;
      case 'game7_karnaugh':
        return <Game6KarnaughHunter onFinish={handleFinishGame} highScore={highScore} />;
      case 'game8_riscv':
        return <Game7RV32ICodeArena onFinish={handleFinishGame} highScore={highScore} />;
      case 'game9_pyramid':
        return <Game9MemoryPyramid onFinish={handleFinishGame} highScore={highScore} />;
      case 'game10_cache':
        return <Game10CacheTLB onFinish={handleFinishGame} highScore={highScore} />;
      case 'game11_raid':
        return <Game11RaidCrisis onFinish={handleFinishGame} highScore={highScore} />;
      case 'game12_pcie':
        return <Game12BusPcie onFinish={handleFinishGame} highScore={highScore} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* If a game is active, show the game view with back button */}
      {activeGameId ? (
        <div className="space-y-4">
          <button
            onClick={() => {
              sound.playClick();
              setActiveGameId(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Barcha 12 Mini-O'yinlar Menyusiga Qaytish
          </button>

          {renderActiveGame()}
        </div>
      ) : (
        /* Arcade Hub Catalog View */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  14 Ta Amaliy Mashg'ulot Bo'yicha 12 Janrdagi Mini-O'yinlar
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  12 Ta Interaktiv Mini-O'yin Arkadasi
                </h1>
                <p className="text-sm text-slate-400">
                  Zerikarli nazariya emas! Har bir amaliy mashg'ulot uchun alohida geympley — saralash, PC yig'ish, bitlar jangi, simlar ulash, kesh snayperi va RAID inqirozi!
                </p>
              </div>

              {/* Total Coins & High Scores summary */}
              <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
                <div className="text-center px-3 border-r border-slate-800">
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-yellow-400" /> Tangalar
                  </div>
                  <div className="text-xl font-black text-yellow-400 mt-0.5">{coins}</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                    <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" /> Mini-O'yinlar
                  </div>
                  <div className="text-xl font-black text-cyan-400 mt-0.5">12 / 12</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Categories Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="O'yin yoki amaliy raqamini qidirish..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: "Barchasi (12)" },
                { id: 'devices', label: "Qurilmalar (2)" },
                { id: 'number', label: "Sanoq & ALU (2)" },
                { id: 'logic', label: "Mantiq (3)" },
                { id: 'riscv', label: "RISC-V (1)" },
                { id: 'memory', label: "Xotira (2)" },
                { id: 'raid', label: "RAID & PCIe (2)" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setFilterCat(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    filterCat === cat.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Games Grid (12 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map(game => {
              const personalRecord = arcadeHighScores[game.id] || 0;

              return (
                <div
                  key={game.id}
                  className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    {/* Top Tag & High Score */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-800 text-indigo-400 border border-slate-700">
                        {game.lab}
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        {personalRecord > 0 ? `${personalRecord} ball` : "O'ynalmagan"}
                      </span>
                    </div>

                    {/* Icon and Title */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className="text-3xl p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 group-hover:scale-110 transition-transform">
                        {game.icon}
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                          #{game.num} • {game.genre}
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {game.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Rewards and Launch Button */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="text-cyan-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> +{game.rewardXp} XP
                      </span>
                      <span className="text-yellow-400 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" /> +{game.rewardCoins}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveGameId(game.id);
                      }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      O'ynash
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
