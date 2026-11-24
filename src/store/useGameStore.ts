import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sound } from '../utils/soundEngine';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sanoq' | 'mantiq' | 'riscv' | 'xotira' | 'raid' | 'master';
}

export const ACHIEVEMENTS: AchievementItem[] = [
  { id: 'first_step', title: "Ilk Qadam", description: "Birinchi savolga to‘g‘ri javob berildi", icon: "Flag", category: 'sanoq' },
  { id: 'bit_wizard', title: "Bit Sehrgari", description: "Bit panelida 5 ta son ketma-ket aniq yig‘ildi", icon: "Binary", category: 'sanoq' },
  { id: 'alu_master', title: "ALU Mash’ali", description: "Carry va Borrow amallari xatosiz bajarildi", icon: "Calculator", category: 'sanoq' },
  { id: 'overflow_detector', title: "Overflow Qalqoni", description: "Unsigned Overflow bayrog‘i to‘g‘ri aniqlandi", icon: "AlertTriangle", category: 'sanoq' },
  { id: 'signal_analyst', title: "Signal Tahlilchisi", description: "Analog va raqamli ossillograf shovqinini bartaraf etdi", icon: "Radio", category: 'sanoq' },
  { id: 'logic_artisan', title: "Mantiq Ustasi", description: "Mantiqiy sxemalar konstruktorida barcha kombinatsiyalar tekshirildi", icon: "GitBranch", category: 'mantiq' },
  { id: 'kmap_genius', title: "Karnaugh Dahosi", description: "3-o‘zgaruvchili K-map orqali minimal SOP topildi", icon: "Layers", category: 'mantiq' },
  { id: 'demorgan_pro', title: "De Morgan Fenomeni", description: "Bul algebrasi qonunlari bo‘yicha testlar to‘liq yechildi", icon: "Sparkles", category: 'mantiq' },
  { id: 'riscv_cadet', title: "RV32I Kursanti", description: "RISC-V assembly dasturi Step rejimida yakunlandi", icon: "Terminal", category: 'riscv' },
  { id: 'format_decoder', title: "ISA Shifroshunosi", description: "R, I, S, B buyruq formatlari to‘liq ajratildi", icon: "Cpu", category: 'riscv' },
  { id: 'cache_sniper', title: "Kesh Snayperi", description: "EAT kalkulyatorida 95%+ hit rate ga erishildi", icon: "Zap", category: 'xotira' },
  { id: 'storage_guru', title: "Saqlash Qurilmalari Guru", description: "HDD, SATA va NVMe SSD taqqoslash matritsasi o‘rganildi", icon: "HardDrive", category: 'xotira' },
  { id: 'raid_rescuer', title: "RAID Qutqaruvchisi", description: "RAID inqirozida disk ishdan chiqishi bartaraf etildi", icon: "ShieldAlert", category: 'raid' },
  { id: 'pcie_speedster', title: "PCIe 7.0 Poygachisi", description: "PCIe 7.0 va CXL o‘tkazuvchanlik topshirig‘i yechildi", icon: "Gauge", category: 'raid' },
  { id: 'cxl_master', title: "CXL Interkonnekt Ustasi", description: "PCIe 7.0 va CXL 4.0 xotira topologiyasi muvaffaqiyatli ulandi", icon: "Cpu", category: 'raid' },
  { id: 'boss_slayer', title: "Bosslar Kushandasi", description: "Kamida 3 ta kampaniya bossi mag‘lub etildi", icon: "Swords", category: 'master' },
  { id: 'streak_inferno', title: "Olovli Marafon", description: "Imtihon Arenada 7 ta savollik xatosiz seriya qayd etildi", icon: "Flame", category: 'master' },
  { id: 'grand_architect', title: "Bosh Arxitektor", description: "2500 XP to‘plab Afsonaviy Arxitektor maqomiga erishildi", icon: "Crown", category: 'master' },
  { id: 'arcade_champion', title: "Arkada Chempioni", description: "Barcha 12 ta mini-o‘yinda qatnashib rekord o‘rnatildi", icon: "Gamepad2", category: 'master' },
  { id: 'truth_seeker', title: "Haqiqat Qidiruvchisi", description: "'Afsona yoki Haqiqat' sprintida 15+ to‘g‘ri javob berildi", icon: "CheckCircle2", category: 'master' },
  { id: 'qa_scholar', title: "Imtihon Allomasi", description: "50 ta nazorat savollari to‘liq o‘zlashtirildi", icon: "BookOpen", category: 'master' },
  { id: 'simulation_pioneer', title: "Virtual Lab Kashfiyotchisi", description: "Barcha 8 ta apparat simulyatorida tajribalar o‘tkazildi", icon: "Activity", category: 'master' },
  { id: 'perfect_architect', title: "Mukammal Arxitektor", description: "Barcha 14 ta amaliyot bo‘yicha 100% o‘zlashtirishga erishildi", icon: "ShieldCheck", category: 'master' },
  { id: 'quantum_master', title: "Kvant Arxitektori", description: "3500 XP to‘plab eng oliy Kvant Pog‘onasiga erishildi", icon: "Sparkles", category: 'master' },
];

export const RANKS = [
  { minXp: 0, title: "🥉 Boshlovchi Arxitektor", badge: "Novice", color: "from-amber-600 to-amber-800" },
  { minXp: 400, title: "🥈 Tizim Texnigi", badge: "Technician", color: "from-slate-400 to-slate-600" },
  { minXp: 950, title: "🥇 Apparat Muhandisi", badge: "Engineer", color: "from-yellow-400 to-amber-600" },
  { minXp: 1650, title: "🏆 Yetakchi Arxitektor", badge: "Principal", color: "from-indigo-400 to-violet-600" },
  { minXp: 2500, title: "⚡ Afsonaviy Bosh Arxitektor", badge: "Grand Architect", color: "from-cyan-400 to-blue-600" },
  { minXp: 3500, title: "👑 Kvant Arxitektori", badge: "Quantum Architect", color: "from-fuchsia-400 to-purple-600" },
];

export interface TimerSettings {
  mixedQuestionTimer: number; // soniya (masalan: 30, 45, 60, 90, 120, 0 = cheksiz)
  blitzDuration: number; // soniya (masalan: 30, 45, 60, 90, 120, 180)
  bossBattleTimer: number; // soniya (masalan: 30, 45, 60, 90, 120)
  trueFalseDuration: number; // soniya (masalan: 30, 45, 60, 90, 120)
  arcadeDuration: number; // soniya (masalan: 45, 60, 90, 120)
  disableTimers: boolean; // boolean: barcha vaqt cheklovlarini o'chirish (erkin rejim)
}

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  mixedQuestionTimer: 45,
  blitzDuration: 60,
  bossBattleTimer: 45,
  trueFalseDuration: 60,
  arcadeDuration: 60,
  disableTimers: false,
};

export interface ExamHistoryRecord {
  id: string;
  date: string;
  mode: string;
  score: number;
  correct: number;
  total: number;
  rank: string;
}

export interface GameState {
  // Profile
  name: string;
  group: string;
  xp: number;
  coins: number;
  dailyStreak: number;
  lastPlayedDate: string;

  // Progression
  unlockedChapters: number;
  bossDefeated: Record<number, boolean>;
  chapterStars: Record<number, number>;

  // Arcade Mini-Games (12 ta)
  arcadeHighScores: Record<string, number>;
  selectedArcadeGame: string | null;
  arcadeDifficulty: Record<string, 'easy' | 'medium' | 'pro'>;
  powerUps: { freeze: number; hint: number; fiftyFifty: number };

  // Virtual Simulators (8 ta: Sandbox & Missions)
  simulatorProgress: Record<string, { completedMissions: string[]; sandboxExperiments: number }>;

  // Topic masteries (14 labs)
  topicStats: Record<number, { correct: number; total: number }>;
  wrongQuestionIds: string[];
  masteredQuestions: string[];
  reviewQuestions: string[];

  // Achievements
  achievements: Record<string, { unlocked: boolean; unlockedAt: string }>;
  examHistory: ExamHistoryRecord[];

  // Preferences & Timers
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  activeTab: string;
  timerSettings: TimerSettings;

  // Actions
  addXp: (amount: number, reason?: string) => void;
  addCoins: (amount: number) => void;
  recordArcadeScore: (gameId: string, score: number) => void;
  updateArcadeScore: (gameId: string, score: number, rewardCoins?: number, rewardXp?: number) => void;
  setSelectedArcadeGame: (gameId: string | null) => void;
  setArcadeDifficulty: (gameId: string, diff: 'easy' | 'medium' | 'pro') => void;
  usePowerUp: (type: 'freeze' | 'hint' | 'fiftyFifty') => boolean;
  addPowerUp: (type: 'freeze' | 'hint' | 'fiftyFifty', count?: number) => void;
  completeSimulatorMission: (simId: string, missionId: string) => void;
  recordSimulatorExperiment: (simId: string) => void;
  recordAnswer: (labId: number, questionId: string, isCorrect: boolean) => void;
  recordTopicScore: (labId: number, isCorrect: boolean) => void;
  toggleMasterQuestion: (qId: string) => void;
  toggleReviewQuestion: (qId: string) => void;
  defeatBoss: (chapter: number, stars?: number) => void;
  unlockAchievement: (id: string) => void;
  recordExam: (record: Omit<ExamHistoryRecord, 'id' | 'date'>) => void;
  updateProfile: (name: string, group: string) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  updateTimerSettings: (settings: Partial<TimerSettings>) => void;
  resetTimerSettings: () => void;
  setActiveTab: (tab: string) => void;
  clearWrongQuestions: () => void;
  resetAll: () => void;

  // Selectors / Helpers
  getRankInfo: () => { rank: typeof RANKS[0]; nextRank: typeof RANKS[0] | null; progress: number };
  getWeakestTopic: () => number;
  getRadarData: () => { subject: string; accuracy: number; fullMark: number }[];
}

const DEFAULT_TOPIC_STATS: Record<number, { correct: number; total: number }> = {
  2: { correct: 0, total: 0 },
  4: { correct: 0, total: 0 },
  5: { correct: 0, total: 0 },
  6: { correct: 0, total: 0 },
  7: { correct: 0, total: 0 },
  8: { correct: 0, total: 0 },
  9: { correct: 0, total: 0 },
  10: { correct: 0, total: 0 },
  11: { correct: 0, total: 0 },
  12: { correct: 0, total: 0 },
  13: { correct: 0, total: 0 },
  14: { correct: 0, total: 0 },
  15: { correct: 0, total: 0 },
  16: { correct: 0, total: 0 },
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      name: "Talaba",
      group: "611-22",
      xp: 0,
      coins: 100,
      dailyStreak: 1,
      lastPlayedDate: new Date().toISOString().slice(0, 10),
      unlockedChapters: 1,
      bossDefeated: {},
      chapterStars: {},
      arcadeHighScores: {},
      selectedArcadeGame: null,
      arcadeDifficulty: {},
      powerUps: { freeze: 3, hint: 3, fiftyFifty: 3 },
      simulatorProgress: {},
      topicStats: DEFAULT_TOPIC_STATS,
      wrongQuestionIds: [],
      masteredQuestions: [],
      reviewQuestions: [],
      achievements: {},
      examHistory: [],
      theme: 'dark',
      soundEnabled: true,
      activeTab: 'dashboard',
      timerSettings: DEFAULT_TIMER_SETTINGS,

      addXp: (amount, reason) => {
        set(state => {
          const newXp = state.xp + amount;
          const updatedAch = { ...state.achievements };

          if (newXp >= 2500 && !updatedAch['grand_architect']?.unlocked) {
            updatedAch['grand_architect'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }
          if (newXp >= 3500 && !updatedAch['quantum_master']?.unlocked) {
            updatedAch['quantum_master'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }

          return { xp: newXp, achievements: updatedAch };
        });
      },

      addCoins: (amount) => {
        sound.playCoin();
        set(state => ({ coins: Math.max(0, state.coins + amount) }));
      },

      recordArcadeScore: (gameId, score) => {
        set(state => {
          const currentBest = state.arcadeHighScores[gameId] || 0;
          if (score > currentBest) {
            return {
              arcadeHighScores: {
                ...state.arcadeHighScores,
                [gameId]: score,
              },
            };
          }
          return {};
        });
      },

      updateArcadeScore: (gameId, score, rewardCoins = 0, rewardXp = 0) => {
        set(state => {
          const currentBest = state.arcadeHighScores[gameId] || 0;
          const newHigh = Math.max(currentBest, score);
          const newScores = { ...state.arcadeHighScores, [gameId]: newHigh };
          const playedCount = Object.keys(newScores).length;

          const updatedAch = { ...state.achievements };
          if (playedCount >= 12 && !updatedAch['arcade_champion']?.unlocked) {
            updatedAch['arcade_champion'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }

          const addedXp = rewardXp > 0 ? rewardXp : (score > currentBest ? Math.floor(score * 1.2) : 0);
          const addedCoins = rewardCoins > 0 ? rewardCoins : (score > currentBest ? Math.floor(score / 20) : 0);

          return {
            arcadeHighScores: newScores,
            xp: state.xp + addedXp,
            coins: state.coins + addedCoins,
            achievements: updatedAch,
          };
        });
      },

      setSelectedArcadeGame: (gameId) => {
        set({ selectedArcadeGame: gameId });
      },

      setArcadeDifficulty: (gameId, diff) => {
        set(state => ({
          arcadeDifficulty: { ...state.arcadeDifficulty, [gameId]: diff },
        }));
      },

      usePowerUp: (type) => {
        const state = get();
        if (state.powerUps[type] > 0) {
          sound.playPowerUp();
          set({
            powerUps: {
              ...state.powerUps,
              [type]: state.powerUps[type] - 1,
            },
          });
          return true;
        }
        sound.playError();
        return false;
      },

      addPowerUp: (type, count = 1) => {
        set(state => ({
          powerUps: {
            ...state.powerUps,
            [type]: (state.powerUps[type] || 0) + count,
          },
        }));
      },

      completeSimulatorMission: (simId, missionId) => {
        set(state => {
          const current = state.simulatorProgress[simId] || { completedMissions: [], sandboxExperiments: 0 };
          if (!current.completedMissions.includes(missionId)) {
            sound.playUnlock();
            const updatedMissions = [...current.completedMissions, missionId];
            const updatedProgress = {
              ...state.simulatorProgress,
              [simId]: { ...current, completedMissions: updatedMissions },
            };
            const totalMissions = Object.values(updatedProgress).reduce((acc, p) => acc + p.completedMissions.length, 0);
            const updatedAch = { ...state.achievements };
            if (totalMissions >= 8 && !updatedAch['simulation_pioneer']?.unlocked) {
              updatedAch['simulation_pioneer'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
            }
            return {
              simulatorProgress: updatedProgress,
              xp: state.xp + 50,
              coins: state.coins + 15,
              achievements: updatedAch,
            };
          }
          return {};
        });
      },

      recordSimulatorExperiment: (simId) => {
        set(state => {
          const current = state.simulatorProgress[simId] || { completedMissions: [], sandboxExperiments: 0 };
          return {
            simulatorProgress: {
              ...state.simulatorProgress,
              [simId]: { ...current, sandboxExperiments: current.sandboxExperiments + 1 },
            },
            xp: state.xp + 5,
          };
        });
      },

      recordTopicScore: (labId, isCorrect) => {
        set(state => {
          const currentStat = state.topicStats[labId] || { correct: 0, total: 0 };
          return {
            topicStats: {
              ...state.topicStats,
              [labId]: {
                correct: currentStat.correct + (isCorrect ? 1 : 0),
                total: currentStat.total + 1,
              },
            },
          };
        });
      },

      recordAnswer: (labId, questionId, isCorrect) => {
        set(state => {
          const currentStat = state.topicStats[labId] || { correct: 0, total: 0 };
          const newStats = {
            ...state.topicStats,
            [labId]: {
              correct: currentStat.correct + (isCorrect ? 1 : 0),
              total: currentStat.total + 1,
            },
          };

          let newWrongs = state.wrongQuestionIds;
          if (!isCorrect) {
            if (!newWrongs.includes(questionId)) {
              newWrongs = [...newWrongs, questionId];
            }
          } else {
            newWrongs = newWrongs.filter(id => id !== questionId);
          }

          return {
            topicStats: newStats,
            wrongQuestionIds: newWrongs,
          };
        });
      },

      toggleMasterQuestion: (qId) => {
        set(state => {
          const isMastered = state.masteredQuestions.includes(qId);
          const newMastered = isMastered 
            ? state.masteredQuestions.filter(id => id !== qId)
            : [...state.masteredQuestions, qId];
          const newReview = state.reviewQuestions.filter(id => id !== qId);

          const updatedAch = { ...state.achievements };
          if (newMastered.length >= 50 && !updatedAch['qa_scholar']?.unlocked) {
            updatedAch['qa_scholar'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }

          return { masteredQuestions: newMastered, reviewQuestions: newReview, achievements: updatedAch };
        });
      },

      toggleReviewQuestion: (qId) => {
        set(state => {
          const isReview = state.reviewQuestions.includes(qId);
          const newReview = isReview
            ? state.reviewQuestions.filter(id => id !== qId)
            : [...state.reviewQuestions, qId];
          const newMastered = state.masteredQuestions.filter(id => id !== qId);
          return { reviewQuestions: newReview, masteredQuestions: newMastered };
        });
      },

      defeatBoss: (chapter, stars = 3) => {
        set(state => {
          const nextChapter = Math.min(5, Math.max(state.unlockedChapters, chapter + 1));
          const newBossDefeated = { ...state.bossDefeated, [chapter]: true };
          const newStars = { ...state.chapterStars, [chapter]: Math.max(state.chapterStars[chapter] || 0, stars) };
          const newAch = { ...state.achievements };

          if (Object.keys(newBossDefeated).length >= 3) {
            newAch['boss_slayer'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
          }

          return {
            unlockedChapters: nextChapter,
            bossDefeated: newBossDefeated,
            chapterStars: newStars,
            achievements: newAch,
          };
        });
      },

      unlockAchievement: (id) => {
        set(state => {
          if (state.achievements[id]?.unlocked) return state;
          sound.playSuccess();
          return {
            xp: state.xp + 60, // 60 XP bonus per achievement
            achievements: {
              ...state.achievements,
              [id]: { unlocked: true, unlockedAt: new Date().toLocaleDateString() },
            },
          };
        });
      },

      recordExam: (record) => {
        const fullRecord: ExamHistoryRecord = {
          ...record,
          id: `exam_${Date.now()}`,
          date: new Date().toLocaleString(),
        };

        set(state => ({
          examHistory: [fullRecord, ...state.examHistory].slice(0, 30),
        }));
      },

      updateProfile: (name, group) => {
        set({ name, group });
      },

      toggleTheme: () => {
        set(state => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          if (typeof document !== 'undefined') {
            if (next === 'light') {
              document.documentElement.classList.remove('dark');
              document.documentElement.classList.add('light');
            } else {
              document.documentElement.classList.remove('light');
              document.documentElement.classList.add('dark');
            }
          }
          return { theme: next };
        });
      },

      toggleSound: () => {
        const isMuted = sound.toggleMute();
        set({ soundEnabled: !isMuted });
      },

      updateTimerSettings: (newSettings) => {
        set(state => ({
          timerSettings: {
            ...state.timerSettings,
            ...newSettings,
          },
        }));
      },

      resetTimerSettings: () => {
        set({ timerSettings: DEFAULT_TIMER_SETTINGS });
      },

      setActiveTab: (tab) => {
        sound.playClick();
        set({ activeTab: tab });
      },

      clearWrongQuestions: () => {
        set({ wrongQuestionIds: [] });
      },

      resetAll: () => {
        set({
          xp: 0,
          unlockedChapters: 1,
          bossDefeated: {},
          chapterStars: {},
          topicStats: DEFAULT_TOPIC_STATS,
          wrongQuestionIds: [],
          achievements: {},
          examHistory: [],
        });
      },

      getRankInfo: () => {
        const xp = get().xp;
        for (let i = RANKS.length - 1; i >= 0; i--) {
          if (xp >= RANKS[i].minXp) {
            const current = RANKS[i];
            const next = RANKS[i + 1] || null;
            const progress = next 
              ? Math.min(100, Math.floor(((xp - current.minXp) / (next.minXp - current.minXp)) * 100))
              : 100;
            return { rank: current, nextRank: next, progress };
          }
        }
        return { rank: RANKS[0], nextRank: RANKS[1], progress: 0 };
      },

      getWeakestTopic: () => {
        const stats = get().topicStats;
        let lowestAcc = 101;
        let weakest = 2;

        const labIds = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        for (const lid of labIds) {
          const s = stats[lid];
          if (!s || s.total === 0) {
            return lid; // not yet practiced
          }
          const acc = (s.correct / s.total) * 100;
          if (acc < lowestAcc) {
            lowestAcc = acc;
            weakest = lid;
          }
        }
        return weakest;
      },

      getRadarData: () => {
        const stats = get().topicStats;
        const labels: Record<number, string> = {
          2: "Qurilmalar",
          4: "Sanoq",
          5: "O‘tkazish",
          6: "Arifmetika",
          7: "Raqamli Mantiq",
          8: "Darvozalar",
          9: "Bul & K-map",
          10: "ISA RISC-V",
          11: "Adreslash",
          12: "Ierarxiya",
          13: "Saqlash",
          14: "Kesh & VM",
          15: "RAID",
          16: "Shinalar",
        };

        return [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(lid => {
          const s = stats[lid] || { correct: 0, total: 0 };
          const acc = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 30; // base visual
          return {
            subject: labels[lid],
            accuracy: acc,
            fullMark: 100,
          };
        });
      },
    }),
    {
      name: 'kompyuter_arxitektori_ultra_store',
    }
  )
);
