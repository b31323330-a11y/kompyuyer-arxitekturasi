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
  UserCheck 
} from 'lucide-react';

// Modules
import { DashboardView } from './modules/Dashboard/DashboardView';
import { ArcadeGamesView } from './modules/ArcadeGames/ArcadeGamesView';
import { QACenterView } from './modules/QACenter/QACenterView';
import { CampaignView } from './modules/CampaignArena/CampaignView';
import { ExamArenaView } from './modules/CampaignArena/ExamArenaView';
import { NumberALUView } from './modules/NumberALULab/NumberALUView';
import { MiniLogisimView } from './modules/MiniLogisimLab/MiniLogisimView';
import { MiniRipesView } from './modules/MiniRipesLab/MiniRipesView';
import { MemoryCacheView } from './modules/MemoryCacheLab/MemoryCacheView';
import { PCBuilderRaidView } from './modules/PCBuilderRaidLab/PCBuilderRaidView';
import { ProfileReportView } from './modules/ProfileReport/ProfileReportView';

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
    { id: 'arcade', label: "Arkada", icon: Gamepad2 },
    { id: 'qa_center', label: "Savol-Javob", icon: BookOpenCheck },
    { id: 'campaign', label: "Kampaniya", icon: Swords },
    { id: 'exam', label: "Imtihon", icon: Award },
    { id: 'alu', label: "ALU", icon: Binary },
    { id: 'logisim', label: "Logika", icon: GitBranch },
    { id: 'ripes', label: "RV32I", icon: Terminal },
    { id: 'cache', label: "Kesh", icon: Layers },
    { id: 'pc_raid', label: "RAID", icon: Server },
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

          {store.activeTab === 'alu' && (
            <NumberALUView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {store.activeTab === 'logisim' && (
            <MiniLogisimView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {store.activeTab === 'ripes' && (
            <MiniRipesView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {(store.activeTab === 'cache' || store.activeTab === 'memory') && (
            <MemoryCacheView
              onAddXp={(amount, reason) => store.addXp(amount, reason)}
              onUnlockAchievement={(id) => store.unlockAchievement(id)}
            />
          )}

          {store.activeTab === 'pc_raid' && (
            <PCBuilderRaidView
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
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all min-w-[50px] ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Reference Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={cheatSheetOpen}
        onClose={() => setCheatSheetOpen(false)}
      />

      {/* Test & System Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
export default App;
