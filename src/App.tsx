import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { TopHUD } from './components/TopHUD';
import { Sidebar } from './components/Sidebar';
import { CheatSheetModal } from './components/CheatSheetModal';
import { SettingsModal } from './components/SettingsModal';
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
  ShieldAlert
} from 'lucide-react';

// Modules
import { DashboardView } from './modules/Dashboard/DashboardView';
import { ArcadeGamesView } from './modules/ArcadeGames/ArcadeGamesView';
import { QACenterView } from './modules/QACenter/QACenterView';
import { CampaignView } from './modules/CampaignArena/CampaignView';
import { ExamArenaView } from './modules/CampaignArena/ExamArenaView';
import { ProfileReportView } from './modules/ProfileReport/ProfileReportView';

// 7 Simulation Labs
import { SignalDeviceView } from './modules/SignalDeviceLab/SignalDeviceView';
import { NumberALUView } from './modules/NumberALULab/NumberALUView';
import { MiniLogisimView } from './modules/MiniLogisimLab/MiniLogisimView';
import { MiniRipesView } from './modules/MiniRipesLab/MiniRipesView';
import { MemoryCacheView } from './modules/MemoryCacheLab/MemoryCacheView';
import { StorageBenchmarkView } from './modules/StorageBenchmarkLab/StorageBenchmarkView';
import { RaidBusView } from './modules/RaidBusLab/RaidBusView';

export function App() {
  const store = useGameStore();
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (store.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [store.theme]);

  const mobileNavItems = [
    { id: 'dashboard', label: "Asosiy", icon: LayoutDashboard },
    { id: 'qa_center', label: "Savol-Javob", icon: BookOpenCheck },
    { id: 'arcade', label: "12 O'yin", icon: Gamepad2 },
    { id: 'lab1_signal', label: "Signal", icon: Radio },
    { id: 'lab2_number_alu', label: "ALU", icon: Binary },
    { id: 'lab3_logisim', label: "Logika", icon: GitBranch },
    { id: 'lab4_ripes', label: "RV32I", icon: Terminal },
    { id: 'lab5_cache', label: "Kesh", icon: Layers },
    { id: 'lab6_storage', label: "Saqlash", icon: HardDrive },
    { id: 'lab7_raid_bus', label: "RAID/Bus", icon: ShieldAlert },
    { id: 'profile', label: "Profil", icon: UserCheck },
  ];

  return (
    <div className={`min-h-screen ${store.theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-[#070B14] text-slate-100'} flex flex-col font-sans transition-colors duration-200`}>
      {/* Silicon Cyber-Lab Top HUD */}
      <TopHUD 
        onOpenCheatSheet={() => setCheatSheetOpen(true)} 
        onOpenSettings={() => setSettingsOpen(true)} 
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Interactive Stage / Module */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {store.activeTab === 'dashboard' && <DashboardView />}
          {store.activeTab === 'arcade' && <ArcadeGamesView />}
          {store.activeTab === 'qa_center' && <QACenterView />}

          {store.activeTab === 'campaign' && (
            <CampaignView
              unlockedStages={store.unlockedChapters}
              bossVictories={store.bossDefeated}
              stageStars={store.chapterStars}
              onBossDefeated={(stage, stars) => store.defeatBoss(stage, stars)}
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onRecordTopic={(labId, isCorrect) => store.recordAnswer(labId, `q_topic_${Date.now()}`, isCorrect)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {store.activeTab === 'exam' && (
            <ExamArenaView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onRecordExam={(record) => store.recordExam({ ...record, mode: 'Imtihon Arena' })}
              onRecordTopic={(labId, isCorrect) => store.recordAnswer(labId, `q_topic_${Date.now()}`, isCorrect)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 1. SIGNAL & DEVICES LAB */}
          {(store.activeTab === 'lab1_signal' || store.activeTab === 'signal' || store.activeTab === 'sim_signal') && (
            <SignalDeviceView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 2. NUMBER SYSTEMS & ALU LAB */}
          {(store.activeTab === 'lab2_number_alu' || store.activeTab === 'alu' || store.activeTab === 'sim_number_alu') && (
            <NumberALUView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 3. MINI-LOGISIM & K-MAP LAB */}
          {(store.activeTab === 'lab3_logisim' || store.activeTab === 'logisim' || store.activeTab === 'sim_logic_kmap') && (
            <MiniLogisimView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 4. MINI-RIPES RV32I LAB */}
          {(store.activeTab === 'lab4_ripes' || store.activeTab === 'ripes' || store.activeTab === 'sim_ripes') && (
            <MiniRipesView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 5. MEMORY & CACHE HIERARCHY LAB */}
          {(store.activeTab === 'lab5_cache' || store.activeTab === 'cache' || store.activeTab === 'memory' || store.activeTab === 'sim_memory_cache') && (
            <MemoryCacheView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 6. STORAGE BENCHMARK LAB */}
          {(store.activeTab === 'lab6_storage' || store.activeTab === 'storage' || store.activeTab === 'sim_storage') && (
            <StorageBenchmarkView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {/* 7. RAID & PCIE/CXL BUS LAB */}
          {(store.activeTab === 'lab7_raid_bus' || store.activeTab === 'raid' || store.activeTab === 'pc_raid' || store.activeTab === 'bus' || store.activeTab === 'sim_raid' || store.activeTab === 'sim_bus_pcie') && (
            <RaidBusView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {store.activeTab === 'profile' && (
            <ProfileReportView
              state={{
                name: store.name,
                group: store.group,
                xp: store.xp,
                unlockedStages: store.unlockedChapters,
                bossVictories: store.bossDefeated,
                stageStars: store.chapterStars,
                topicStats: store.topicStats,
                achievements: store.achievements,
                examHistory: store.examHistory as any,
                soundEnabled: store.soundEnabled,
              }}
              onUpdateProfile={(name, group) => store.updateProfile(name, group)}
              onResetProgress={() => store.resetAll()}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#070B14]/95 border-t border-[#1A2642] px-2 py-2 flex justify-around items-center z-40 backdrop-blur-lg overflow-x-auto no-print">
        {mobileNavItems.map(item => {
          const Icon = item.icon;
          const isActive = store.activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => store.setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] min-w-[50px] transition-colors ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="truncate max-w-[55px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Floating Cheat Sheet (Nazariy Qo'llanma) Modal */}
      <CheatSheetModal 
        isOpen={cheatSheetOpen} 
        onClose={() => setCheatSheetOpen(false)} 
      />

      {/* Testlar va Tizim Sozlamalari Modal */}
      <SettingsModal 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </div>
  );
}

export default App;
