import React from 'react';
import { 
  LayoutDashboard, 
  Gamepad2,
  BookOpenCheck,
  Swords, 
  Award, 
  Binary, 
  GitBranch, 
  Terminal, 
  Layers, 
  Server, 
  UserCheck
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGameStore();

  const menuItems = [
    { id: 'dashboard', label: "Boshqaruv Paneli", icon: LayoutDashboard },
    { id: 'arcade', label: "12 Mini-O'yin Arkadasi", icon: Gamepad2, badge: "12 O'yin", highlight: true },
    { id: 'qa_center', label: "Savol-Javob Markazi", icon: BookOpenCheck, badge: "200+ Savol", highlight: true },
    { id: 'campaign', label: "Arxitektor Yo'li", icon: Swords, badge: "5 Bob" },
    { id: 'exam', label: "Imtihon Arena", icon: Award, badge: "4 Rejim" },
    { id: 'alu', label: "Sanoq & ALU", icon: Binary },
    { id: 'logisim', label: "Mini-Logisim & K-map", icon: GitBranch },
    { id: 'ripes', label: "Mini-Ripes RV32I", icon: Terminal },
    { id: 'cache', label: "Xotira & Kesh", icon: Layers },
    { id: 'pc_raid', label: "PC, RAID & Shinalar", icon: Server },
    { id: 'profile', label: "Profil & Hisobot", icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-[#070B14] border-r border-[#1A2642] flex flex-col justify-between p-4 shrink-0 no-print hidden md:flex min-h-[calc(100vh-65px)]">
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1 block">
          Laboratoriyalar & Rejimlar
        </span>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'cache' && activeTab === 'memory');

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-glow-indigo'
                  : 'text-slate-400 hover:text-white hover:bg-[#0D1424]'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : item.highlight
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3.5 bg-gradient-to-br from-[#0D1424] to-[#121B30] border border-[#1A2642] rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Ultra Game Lab</div>
            <div className="text-[10px] text-slate-400">14 ta Amaliy Mashg'ulot</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-glow-emerald"></span>
        </div>
      </div>
    </aside>
  );
};
