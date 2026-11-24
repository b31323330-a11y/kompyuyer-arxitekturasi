import React, { useState } from 'react';
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
  UserCheck,
  Radio,
  HardDrive,
  ShieldAlert,
  Cpu,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Sparkles
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useGameStore();
  const [simulatorsOpen, setSimulatorsOpen] = useState(true);

  // 1. Dashboard & Boshqaruv
  const generalItems = [
    { id: 'dashboard', label: "Boshqaruv Paneli", icon: LayoutDashboard },
    { id: 'qa_center', label: "Imtihon & Savol-Javob", icon: BookOpenCheck, badge: "200+ Savol", highlight: true },
    { id: 'arcade', label: "12 Mini-O'yin Arkadasi", icon: Gamepad2, badge: "12 O'yin" },
    { id: 'campaign', label: "Arxitektor Yo'li", icon: Swords, badge: "5 Bob" },
    { id: 'profile', label: "Profil & Hisobot", icon: UserCheck },
  ];

  // 2. 7 ta Real-Time Simulyatsiya Laboratoriyasi
  const simulatorItems = [
    { 
      id: 'lab1_signal', 
      aliases: ['signal', 'sim_signal'], 
      label: "1. Signal & Qurilmalar", 
      sub: "2 & 7-amaliy", 
      icon: Radio, 
      color: "text-cyan-400" 
    },
    { 
      id: 'lab2_number_alu', 
      aliases: ['alu', 'sim_number_alu'], 
      label: "2. Sanoq Tizimlari & ALU", 
      sub: "4, 5, 6-amaliy", 
      icon: Binary, 
      color: "text-blue-400" 
    },
    { 
      id: 'lab3_logisim', 
      aliases: ['logisim', 'sim_logic_kmap'], 
      label: "3. Mini-Logisim & K-map", 
      sub: "8 & 9-amaliy", 
      icon: GitBranch, 
      color: "text-emerald-400" 
    },
    { 
      id: 'lab4_ripes', 
      aliases: ['ripes', 'sim_ripes'], 
      label: "4. Mini-Ripes RV32I", 
      sub: "10 & 11-amaliy", 
      icon: Terminal, 
      color: "text-purple-400" 
    },
    { 
      id: 'lab5_cache', 
      aliases: ['cache', 'memory', 'sim_memory_cache'], 
      label: "5. Kesh, TLB & Xotira", 
      sub: "12 & 14-amaliy", 
      icon: Layers, 
      color: "text-amber-400" 
    },
    { 
      id: 'lab6_storage', 
      aliases: ['storage', 'sim_storage'], 
      label: "6. Saqlash Benchmark", 
      sub: "13-amaliy", 
      icon: HardDrive, 
      color: "text-pink-400" 
    },
    { 
      id: 'lab7_raid_bus', 
      aliases: ['raid', 'pc_raid', 'bus', 'pcie', 'sim_raid', 'sim_bus_pcie'], 
      label: "7. RAID & PCIe/CXL Shinalar", 
      sub: "15 & 16-amaliy", 
      icon: ShieldAlert, 
      color: "text-red-400" 
    },
  ];

  const isSimActive = (sim: typeof simulatorItems[0]) => {
    return activeTab === sim.id || (sim.aliases && sim.aliases.includes(activeTab));
  };

  return (
    <aside className="w-64 bg-[#070B14] border-r border-[#1A2642] flex flex-col justify-between p-3.5 shrink-0 no-print hidden md:flex min-h-[calc(100vh-65px)] overflow-y-auto">
      <div className="space-y-4">
        {/* BO'LIM 1: ASOSIY MARKAZ */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 py-1 block">
            Asosiy Bo'limlar
          </span>
          <div className="space-y-1 mt-1">
            {generalItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-glow-indigo'
                      : 'text-slate-400 hover:text-white hover:bg-[#0D1424]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#0F172A] text-slate-400 border border-[#1E293B]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* BO'LIM 2: 7 TA REAL-TIME SIMULYATSIYA LABORATORIYASI */}
        <div>
          <button
            onClick={() => setSimulatorsOpen(!simulatorsOpen)}
            className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <div className="flex items-center space-x-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>7 ta Apparat Laboratoriyasi</span>
            </div>
            {simulatorsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {simulatorsOpen && (
            <div className="space-y-1 mt-1.5 pl-1">
              {simulatorItems.map(sim => {
                const Icon = sim.icon;
                const isActive = isSimActive(sim);
                return (
                  <button
                    key={sim.id}
                    onClick={() => setActiveTab(sim.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[11px] font-medium transition-all text-left ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0B1220]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-300' : sim.color}`} />
                      <div className="truncate">
                        <div className="truncate leading-tight">{sim.label}</div>
                        <div className="text-[9px] text-slate-500">{sim.sub}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info Pill */}
      <div className="mt-4 p-3 bg-gradient-to-br from-[#0D1424] to-[#121B30] border border-[#1A2642] rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-white flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Ultra Sim Lab</span>
            </div>
            <div className="text-[9px] text-slate-400">14 ta amaliyot • 7 lab • 100% offline</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      </div>
    </aside>
  );
};
