import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  HelpCircle,
  Settings,
  Coins,
  Cpu
} from 'lucide-react';
import { useGameStore, RANKS } from '../store/useGameStore';
import { sound } from '../utils/soundEngine';

interface TopHUDProps {
  onOpenCheatSheet: () => void;
  onOpenSettings: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({ onOpenCheatSheet, onOpenSettings }) => {
  const { 
    name, 
    group, 
    xp, 
    coins,
    dailyStreak, 
    powerUps,
    soundEnabled, 
    theme, 
    toggleSound, 
    toggleTheme, 
    getRankInfo,
    setActiveTab 
  } = useGameStore();

  const { rank, nextRank, progress } = getRankInfo();

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-xl border-b border-[#1A2642] px-4 sm:px-6 py-3 flex items-center justify-between no-print">
      {/* Brand & Title */}
      <div 
        className="flex items-center space-x-3 cursor-pointer group"
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow-indigo group-hover:scale-105 transition-transform">
          <Cpu className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
              KOMPYUTER ARXITEKTORI
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ULTRA LAB
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">14 ta amaliy mashg‘ulot virtual laboratoriyasi</p>
        </div>
      </div>

      {/* User Stats & Rank HUD */}
      <div className="hidden lg:flex items-center space-x-6">
        {/* Rank & XP */}
        <div className="flex items-center space-x-3 bg-[#0D1424] border border-[#1A2642] px-4 py-1.5 rounded-2xl">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 space-x-4">
              <span>{rank.title}</span>
              <span className="text-amber-400 flex items-center font-mono">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                {xp} XP
              </span>
            </div>
            {nextRank && (
              <div className="w-36 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1" title={`Keyingi darajagacha: ${nextRank.minXp - xp} XP`}>
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Coins Pill */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold font-mono">
          <Coins className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>{coins ?? 100} tanga</span>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Flame className="w-4 h-4 animate-bounce" />
          <span>{dailyStreak} kunlik seriya</span>
        </div>

        {/* Power-ups Inventory */}
        <div 
          onClick={() => setActiveTab('arcade')}
          className="cursor-pointer flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] hover:border-cyan-500/40 text-xs font-mono font-bold transition-colors"
          title="Mini-o'yinlar qurol-yarog'i (Power-uplar)"
        >
          <span title="Vaqtni to'xtatish (Freeze)">❄️ {powerUps?.freeze ?? 3}</span>
          <span className="text-slate-600">|</span>
          <span title="Maslahat (Hint)">💡 {powerUps?.hint ?? 3}</span>
          <span className="text-slate-600">|</span>
          <span title="50/50 tanlov">⚡ {powerUps?.fiftyFifty ?? 3}</span>
        </div>
      </div>

      {/* Right Controls (Cheat Sheet, Sound, Theme, User) */}
      <div className="flex items-center space-x-2">
        {/* Mobile Coins Pill */}
        <div className="flex lg:hidden items-center space-x-1 px-2 py-1 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[11px] font-bold font-mono">
          <Coins className="w-3.5 h-3.5 text-yellow-400" />
          <span>{coins ?? 100}</span>
        </div>
        <button
          onClick={() => { sound.playClick(); onOpenSettings(); }}
          className="p-2.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] text-slate-300 hover:text-white transition-colors"
          title="Testlar va Tizim Sozlamalari (Taymer, Ovoz, Rejimlar)"
        >
          <Settings className="w-4 h-4 text-cyan-400 hover:rotate-90 transition-transform" />
        </button>

        <button
          onClick={() => { sound.playClick(); onOpenCheatSheet(); }}
          className="p-2.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] text-slate-300 hover:text-white transition-colors"
          title="Tezkor Nazariy Ma’lumotnoma (Cheat Sheet)"
        >
          <HelpCircle className="w-4 h-4 text-indigo-400" />
        </button>

        <button
          onClick={toggleSound}
          className="p-2.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] text-slate-300 hover:text-white transition-colors"
          title={soundEnabled ? "Ovozni o‘chirish" : "Ovozni yoqish"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] text-slate-300 hover:text-white transition-colors"
          title="Kunduzgi / Tungi rejim"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* User Mini Badge */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] text-xs font-bold text-slate-200"
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs">
            👨‍💻
          </div>
          <span className="hidden sm:inline">{name}</span>
        </button>
      </div>
    </header>
  );
};
