import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ExamRecord {
  id: string;
  date: string;
  score: number;
  correct: number;
  total: number;
  rank: string;
  badTopics: number[];
}

export interface UserState {
  name: string;
  group: string;
  xp: number;
  unlockedStages: number;
  bossVictories: Record<number, boolean>;
  stageStars: Record<number, number>;
  topicStats: Record<number, { correct: number; total: number }>;
  achievements: Record<string, { unlocked: boolean; unlockedAt?: string }>;
  examHistory: ExamRecord[];
  soundEnabled: boolean;
}

export const RANKS = [
  { minXp: 0, title: "🥉 Boshlovchi", badge: "Novice Architect", color: "from-amber-700 to-amber-900" },
  { minXp: 300, title: "🥈 Texnik", badge: "Hardware Technician", color: "from-slate-400 to-slate-600" },
  { minXp: 750, title: "🥇 Muhandis", badge: "Systems Engineer", color: "from-yellow-400 to-amber-600" },
  { minXp: 1400, title: "🏆 Arxitektor", badge: "Computer Architect", color: "from-indigo-400 to-violet-600" },
  { minXp: 2200, title: "⚡ Afsonaviy Arxitektor", badge: "Grand Architect", color: "from-cyan-400 to-blue-600" },
];

export const ACHIEVEMENTS_LIST: Omit<Achievement, 'unlocked'>[] = [
  { id: 'first_step', title: "Birinchi Qadam", description: "Birinchi savolga to‘g‘ri javob berildi", icon: "Flag" },
  { id: 'binary_master', title: "Ikkilik Ustasi", description: "Bit panelida 5 ta son ketma-ket yig‘ildi", icon: "Binary" },
  { id: 'alu_hero', title: "ALU Qahramoni", description: "Carry va Borrow amallari xatosiz bajarildi", icon: "Calculator" },
  { id: 'circuit_builder', title: "Sxematexnik", description: "Mantiqiy sxemalar konstruktorida 8 ta kombinatsiya tekshirildi", icon: "Cpu" },
  { id: 'kmap_genius', title: "Karnaugh Dahosi", description: "K-map da 1-lar guruhlanib SOP topildi", icon: "Layers" },
  { id: 'riscv_coder', title: "RV32I Muhandisi", description: "RISC-V assembly dasturi Step rejimida yakunlandi", icon: "Terminal" },
  { id: 'cache_optimizer', title: "Kesh Magistri", description: "EAT kalkulyatorida 95%+ hit rate ga erishildi", icon: "Zap" },
  { id: 'storage_expert', title: "Saqlash Eksperti", description: "Disklar parametrlarini vazifalarga mos tanlandi", icon: "HardDrive" },
  { id: 'raid_survivor', title: "RAID Qutqaruvchisi", description: "RAID inqirozida disk ishdan chiqishi bartaraf etildi", icon: "ShieldAlert" },
  { id: 'pcie_speeder', title: "PCIe Poygachisi", description: "PCIe 7.0 o‘tkazuvchanlik topshirig‘i yechildi", icon: "Gauge" },
  { id: 'boss_slayer', title: "Bosslar Kushandasi", description: "Kamida 3 ta kampaniya bossi mag‘lub etildi", icon: "Swords" },
  { id: 'perfect_exam', title: "A’lochi Arxitektor", description: "Aralash imtihonda 10/10 to‘g‘ri natija ko‘rsatildi", icon: "Award" },
  { id: 'streak_fire', title: "Olovli Seriya", description: "Ketma-ket 5 ta savolga xatosiz javob (Streak)", icon: "Flame" },
  { id: 'legendary_rank', title: "Afsonaviy Pog‘ona", description: "2200 XP to‘plab Afsonaviy Arxitektor unvoni olindi", icon: "Crown" },
];

const DEFAULT_STATE: UserState = {
  name: "Talaba",
  group: "611-22",
  xp: 0,
  unlockedStages: 1,
  bossVictories: {},
  stageStars: {},
  topicStats: {
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
  },
  achievements: {},
  examHistory: [],
  soundEnabled: true,
};

const STORAGE_KEY = 'kompyuter_arxitektori_state_v1';

export function loadGameState(): UserState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      topicStats: {
        ...DEFAULT_STATE.topicStats,
        ...(parsed.topicStats || {}),
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveGameState(state: UserState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save game state', err);
  }
}

export function getRankInfo(xp: number) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      const current = RANKS[i];
      const next = RANKS[i + 1] || null;
      const progress = next 
        ? Math.min(100, Math.floor(((xp - current.minXp) / (next.minXp - current.minXp)) * 100))
        : 100;
      return { rank: current, nextRank: next, progress, rankIndex: i };
    }
  }
  return { rank: RANKS[0], nextRank: RANKS[1], progress: 0, rankIndex: 0 };
}

// Hook for components
export function useGameState() {
  const [state, setState] = useState<UserState>(() => loadGameState());

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const addXp = (amount: number, reason?: string) => {
    setState(prev => {
      const newXp = prev.xp + amount;
      const updated = { ...prev, xp: newXp };

      // check legendary achievement
      if (newXp >= 2200 && !prev.achievements['legendary_rank']?.unlocked) {
        updated.achievements = {
          ...prev.achievements,
          legendary_rank: { unlocked: true, unlockedAt: new Date().toLocaleDateString() },
        };
      }
      return updated;
    });
  };

  const unlockAchievement = (id: string) => {
    setState(prev => {
      if (prev.achievements[id]?.unlocked) return prev;
      return {
        ...prev,
        xp: prev.xp + 50, // 50 XP per achievement bonus
        achievements: {
          ...prev.achievements,
          [id]: { unlocked: true, unlockedAt: new Date().toLocaleDateString() },
        },
      };
    });
  };

  const recordTopicAnswer = (labId: number, isCorrect: boolean) => {
    setState(prev => {
      const current = prev.topicStats[labId] || { correct: 0, total: 0 };
      return {
        ...prev,
        topicStats: {
          ...prev.topicStats,
          [labId]: {
            correct: current.correct + (isCorrect ? 1 : 0),
            total: current.total + 1,
          },
        },
      };
    });
  };

  const completeBoss = (stageNumber: number, stars = 3) => {
    setState(prev => {
      const nextUnlocked = Math.min(5, Math.max(prev.unlockedStages, stageNumber + 1));
      const bossVictories = { ...prev.bossVictories, [stageNumber]: true };
      const stageStars = { ...prev.stageStars, [stageNumber]: Math.max(prev.stageStars[stageNumber] || 0, stars) };
      
      const newAch = { ...prev.achievements };
      const defeatedCount = Object.keys(bossVictories).length;
      if (defeatedCount >= 3) {
        newAch['boss_slayer'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
      }

      return {
        ...prev,
        unlockedStages: nextUnlocked,
        bossVictories,
        stageStars,
        achievements: newAch,
      };
    });
  };

  const recordExamResult = (result: Omit<ExamRecord, 'id' | 'date'>) => {
    const record: ExamRecord = {
      ...result,
      id: `exam_${Date.now()}`,
      date: new Date().toLocaleString(),
    };

    setState(prev => {
      const newHistory = [record, ...prev.examHistory].slice(0, 30);
      const newAch = { ...prev.achievements };
      if (record.correct === 10) {
        newAch['perfect_exam'] = { unlocked: true, unlockedAt: new Date().toLocaleDateString() };
      }
      return {
        ...prev,
        examHistory: newHistory,
        achievements: newAch,
      };
    });
  };

  const updateProfile = (name: string, group: string) => {
    setState(prev => ({ ...prev, name, group }));
  };

  const resetAllProgress = () => {
    setState(DEFAULT_STATE);
    saveGameState(DEFAULT_STATE);
  };

  return {
    state,
    addXp,
    unlockAchievement,
    recordTopicAnswer,
    completeBoss,
    recordExamResult,
    updateProfile,
    resetAllProgress,
  };
}
