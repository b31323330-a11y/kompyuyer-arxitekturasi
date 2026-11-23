import React from 'react';
import { 
  Cpu, 
  Binary, 
  GitBranch, 
  Terminal, 
  Layers, 
  Server, 
  User, 
  Volume2, 
  VolumeX, 
  Award,
  Swords,
  Sparkles
} from 'lucide-react';
import { sounds } from '../engines/audioEngine';
import { getRankInfo } from '../store/gameStore';

export type NavTab = 
  | 'campaign' 
  | 'exam' 
  | 'alu' 
  | 'logisim' 
  | 'ripes' 
  | 'cache' 
  | 'pc_raid' 
  | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  xp: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  xp,
  soundEnabled,
  setSoundEnabled,
}) => {
  const { rank, nextRank, progress } = getRankInfo(xp);

  const handleSoundToggle = () => {
    const isMuted = sounds.toggleMute();
    setSoundEnabled(!isMuted);
    if (!isMuted) sounds.playClick();
  };

  const navItems = [
    { id: 'campaign' as NavTab, label: "Arxitektor Yo‘li", icon: Swords },
    { id: 'exam' as NavTab, label: "Imtihon Arena", icon: Award },
    { id: 'alu' as NavTab, label: "Sanoq & ALU", icon: Binary },
    { id: 'logisim' as NavTab, label: "Mini-Logisim", icon: GitBranch },
    { id: 'ripes' as NavTab, label: "Mini-Ripes RV32I", icon: Terminal },
    { id: 'cache' as NavTab, label: "Xotira & Kesh", icon: Layers },
    { id: 'pc_raid' as NavTab, label: "PC & RAID", icon: Server },
    { id: 'profile' as NavTab, label: "Profil & Hisobot", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { sounds.playClick(); setActiveTab('campaign'); }}
          >
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  Kompyuter Arxitektori
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Pro Lab
                </span>
              </div>
              <p className="text-xs text-slate-400">14 ta amaliy mashg‘ulot laboratoriyasi</p>
            </div>
          </div>

          {/* User Rank & XP */}
          <div className="hidden md:flex items-center space-x-4 bg-slate-950/60 border border-slate-800/80 px-3.5 py-1.5 rounded-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">{rank.title}</span>
              <span className="text-xs text-amber-400 flex items-center font-bold">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {xp} XP
              </span>
            </div>

            {nextRank && (
              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden" title={`Keyingi unvongacha: ${nextRank.minXp - xp} XP`}>
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-500" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? "Ovozni o‘chirish" : "Ovozni yoqish"}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
