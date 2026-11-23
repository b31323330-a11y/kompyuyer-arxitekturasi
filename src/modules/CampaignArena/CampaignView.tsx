import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Swords, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  Play, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { getBossQuestions, Question } from '../../data/questionsData';
import { LABS_DATA } from '../../data/labData';
import { useGameStore } from '../../store/useGameStore';

interface CampaignViewProps {
  unlockedStages: number;
  bossVictories: Record<number, boolean>;
  stageStars: Record<number, number>;
  onBossDefeated: (stage: number, stars: number) => void;
  onAddXp: (xp: number, reason?: string) => void;
  onRecordTopic: (labId: number, isCorrect: boolean) => void;
  onUnlockAchievement: (id: string) => void;
}

export const CAMPAIGN_STAGES = [
  {
    stage: 1,
    title: "1-Bosqich: Qurilmalar va Sanoq",
    subtitle: "2, 4, 5-amaliy mashg‘ulotlar",
    labs: [2, 4, 5],
    bossName: "Bit-Master Silicon Boss",
    description: "Kompyuterning apparat arxitekturasi, ichki/tashqi tasnifi, ikkilik, sakkizlik va o‘n oltilik tizimlar bo‘yicha poydevor sinovi.",
    color: "from-blue-600 to-indigo-700",
    badge: "Boshlang‘ich Pog‘ona",
  },
  {
    stage: 2,
    title: "2-Bosqich: Raqamli Mantiq va Bul Algebrasi",
    subtitle: "6, 7, 8, 9-amaliy mashg‘ulotlar",
    labs: [6, 7, 8, 9],
    bossName: "Karnaugh Gatekeeper",
    description: "Ikkilik qo‘shish/ayirish (Carry & Borrow), mantiqiy sathlar, universal NAND/NOR elementlari va Bul ifodalarini minimallashtirish.",
    color: "from-purple-600 to-violet-700",
    badge: "Sxematexnika",
  },
  {
    stage: 3,
    title: "3-Bosqich: RISC-V RV32I va Adreslash",
    subtitle: "10, 11-amaliy mashg‘ulotlar",
    labs: [10, 11],
    bossName: "RV32I Core Overlord",
    description: "Buyruqlar tizimi arxitekturasi (ISA), R/I/S/B formatlari, yuklash-saqlash (load-store) modeli va Effective Address hisobi.",
    color: "from-amber-600 to-orange-700",
    badge: "Protsessor Arxitekturasi",
  },
  {
    stage: 4,
    title: "4-Bosqich: Xotira Ierarxiyasi va Kesh",
    subtitle: "12, 13, 14-amaliy mashg‘ulotlar",
    labs: [12, 13, 14],
    bossName: "Cache & TLB Sentinel",
    description: "Kesh darajalari (L1-L3), EAT formulasi, HDD vs NVMe SSD texnik parametrlari, fazoviy lokalik va virtual xotira (Pagefile).",
    color: "from-emerald-600 to-teal-700",
    badge: "Xotira Tizimlari",
  },
  {
    stage: 5,
    title: "5-Bosqich: RAID va Zamonaviy Shinalar",
    subtitle: "15, 16-amaliy mashg‘ulotlar",
    labs: [15, 16],
    bossName: "PCIe & RAID Supreme Architect",
    description: "RAID 0, 1, 5, 6, 10 paritet va nosozlik tahlili, 3-2-1 zaxira qoidasi, PCIe 3.0–7.0 o‘tkazuvchanligi va CXL kogerentligi.",
    color: "from-rose-600 to-pink-700",
    badge: "Tizim Integratori",
  },
];

export const CampaignView: React.FC<CampaignViewProps> = ({
  unlockedStages,
  bossVictories,
  stageStars,
  onBossDefeated,
  onAddXp,
  onRecordTopic,
  onUnlockAchievement,
}) => {
  const { timerSettings, updateTimerSettings } = useGameStore();

  // Boss Battle state
  const [activeBossStage, setActiveBossStage] = useState<number | null>(null);
  const [bossQuestions, setBossQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerSettings.bossBattleTimer);
  const [battleFinished, setBattleFinished] = useState(false);

  // Selected Stage details modal
  const [inspectedStage, setInspectedStage] = useState<typeof CAMPAIGN_STAGES[0] | null>(null);

  // Boss Battle Timer
  useEffect(() => {
    if (activeBossStage === null || battleFinished) return;
    if (timerSettings.disableTimers) return; // Infinite time!

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeBossStage, timeLeft, battleFinished, timerSettings.disableTimers]);

  const startBossBattle = (stageNum: number) => {
    sounds.playBossAlarm();
    setActiveBossStage(stageNum);
    setBossQuestions(getBossQuestions(stageNum, 5));
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setTimeLeft(timerSettings.disableTimers ? 999999 : timerSettings.bossBattleTimer);
    setBattleFinished(false);
  };

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    sounds.playError();
    // Auto advance after 2 seconds
    setTimeout(() => {
      handleNextQuestion(false);
    }, 1500);
  };

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIndex);
    setIsAnswered(true);

    const currentQ = bossQuestions[currentQIndex];
    const isCorrect = optIndex === currentQ.correctIndex;
    onRecordTopic(currentQ.labId, isCorrect);

    if (isCorrect) {
      sounds.playSuccess();
      setCorrectCount(prev => prev + 1);
      onAddXp(20, "Boss savoli to‘g‘ri");
      onUnlockAchievement("first_step");
    } else {
      sounds.playError();
    }
  };

  const handleNextQuestion = (fromClick = true) => {
    if (currentQIndex < bossQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimeLeft(45); // Reset 45s for next question
    } else {
      // Battle finished
      finishBattle();
    }
  };

  const finishBattle = () => {
    setBattleFinished(true);
    const win = (correctCount / bossQuestions.length) >= 0.7; // 70% required (at least 4 out of 5)
    
    if (win && activeBossStage !== null) {
      sounds.playLevelUp();
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      const stars = correctCount === 5 ? 3 : 2;
      onBossDefeated(activeBossStage, stars);
      onAddXp(150, "Boss mag‘lub etildi!");
    } else {
      sounds.playError();
    }
  };

  const closeBattle = () => {
    setActiveBossStage(null);
    setBattleFinished(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Swords className="w-3.5 h-3.5" />
            <span>Asosiy Kampaniya Rejimi</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Arxitektor Yo‘li: 5 Bosqichli Missiya
          </h1>
          <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">
            14 ta amaliy mashg‘ulotni bosqichma-bosqich o‘zlashtiring, apparatdan shinalargacha 
            bo‘lgan zanjirni o‘rganing va har bir bosqich oxiridagi Boss-sinovini topshirib keyingi qatlamni oching.
          </p>
        </div>
      </div>

      {/* 5 Stages Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAMPAIGN_STAGES.map((st) => {
          const isUnlocked = unlockedStages >= st.stage;
          const isCompleted = !!bossVictories[st.stage];
          const stars = stageStars[st.stage] || 0;

          return (
            <div
              key={st.stage}
              className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 ${
                isCompleted
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : isUnlocked
                  ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-500/10 hover:border-indigo-400'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-60'
              }`}
            >
              <div>
                {/* Header status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    {st.badge}
                  </span>
                  
                  {isCompleted ? (
                    <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{stars} ⭐ O‘tildi</span>
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-xs font-semibold text-cyan-400 animate-pulse">
                      ⚡ Faol
                    </span>
                  ) : (
                    <div className="flex items-center space-x-1 text-slate-500 text-xs">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Qulflangan</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{st.title}</h3>
                <p className="text-xs font-semibold text-indigo-400 mt-0.5">{st.subtitle}</p>
                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {st.description}
                </p>

                {/* Labs badges list */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {st.labs.map(lid => {
                    const labItem = LABS_DATA.find(l => l.id === lid);
                    return (
                      <span 
                        key={lid} 
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {lid}-amaliy ({labItem?.shortName})
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => { sounds.playClick(); setInspectedStage(st); }}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mavzular</span>
                </button>

                {isUnlocked ? (
                  <button
                    onClick={() => startBossBattle(st.stage)}
                    className={`flex-1 px-4 py-2 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 text-white shadow-md transition-all ${
                      isCompleted 
                        ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700' 
                        : 'bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 shadow-indigo-600/30'
                    }`}
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>{isCompleted ? "Qayta Sinov" : "Boss Sinovi (45s)"}</span>
                  </button>
                ) : (
                  <div className="flex-1 px-4 py-2 text-xs font-semibold text-center text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
                    Avvalgi bosqich talab etiladi
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Labs Overview Modal */}
      {inspectedStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{inspectedStage.title}</h3>
                <p className="text-xs text-indigo-400">{inspectedStage.subtitle}</p>
              </div>
              <button 
                onClick={() => setInspectedStage(null)} 
                className="text-slate-400 hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300">{inspectedStage.description}</p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Qamrab olingan amaliy mashg‘ulotlar:</h4>
              {inspectedStage.labs.map(lid => {
                const lab = LABS_DATA.find(l => l.id === lid);
                if (!lab) return null;
                return (
                  <div key={lid} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-cyan-300">{lab.id}-amaliy: {lab.shortName}</span>
                      <span className="text-[10px] text-slate-400">{lab.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{lab.objective}</p>
                    {lab.keyFormulas.length > 0 && (
                      <div className="mt-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                        📐 {lab.keyFormulas[0].label}: {lab.keyFormulas[0].formula}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedStage(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Boss Battle Modal */}
      {activeBossStage !== null && bossQuestions.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
            {/* Header / Timer */}
            {!battleFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center">
                      <Swords className="w-3.5 h-3.5 mr-1" />
                      Boss: {CAMPAIGN_STAGES.find(s => s.stage === activeBossStage)?.bossName}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {currentQIndex + 1} / {bossQuestions.length}
                    </span>
                  </div>

                  <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-mono font-bold text-sm ${
                    !timerSettings.disableTimers && timeLeft <= 10 ? 'bg-rose-500/20 text-rose-400 animate-bounce' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{timerSettings.disableTimers ? "♾️ Cheksiz" : `${timeLeft} s`}</span>
                  </div>
                </div>

                {/* Progress bar */}
                {!timerSettings.disableTimers && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${(timeLeft / timerSettings.bossBattleTimer) * 100}%` }}
                    />
                  </div>
                )}

                {/* Question */}
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-indigo-400">
                    {bossQuestions[currentQIndex].labId}-amaliy mashg‘ulot savoli
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                    {bossQuestions[currentQIndex].text}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {bossQuestions[currentQIndex].options.map((opt, oIdx) => {
                      const isCorrect = oIdx === bossQuestions[currentQIndex].correctIndex;
                      const isChosen = selectedOpt === oIdx;

                      let btnStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500";
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                        } else if (isChosen) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-900 border-slate-800 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation upon answer */}
                  {isAnswered && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 animate-fadeIn">
                      <span className="font-bold text-indigo-400">Tushuntirish: </span>
                      {bossQuestions[currentQIndex].explanation}
                    </div>
                  )}

                  {/* Next button */}
                  {isAnswered && (
                    <div className="pt-3 flex justify-end">
                      <button
                        onClick={() => handleNextQuestion(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform"
                      >
                        <span>{currentQIndex < bossQuestions.length - 1 ? "Keyingi Savol" : "Natijani Ko‘rish"}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Battle Result Screen */
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex p-4 rounded-3xl bg-slate-800 text-4xl shadow-inner">
                  {(correctCount / bossQuestions.length) >= 0.7 ? "🏆" : "💀"}
                </div>

                <h3 className="text-2xl font-black text-white">
                  {(correctCount / bossQuestions.length) >= 0.7 
                    ? "BOSS MAG‘LUB ETILDI!" 
                    : "BOSS SINOVIDAN O‘TOLMADINGIZ"}
                </h3>

                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  {(correctCount / bossQuestions.length) >= 0.7 
                    ? `Ajoyib g‘alaba! Siz ${correctCount} / ${bossQuestions.length} to‘g‘ri javob berdingiz (${Math.round((correctCount/bossQuestions.length)*100)}%). Keyingi bosqich ochildi!`
                    : `Siz ${correctCount} / ${bossQuestions.length} to‘g‘ri javob berdingiz. Bosqichni ochish uchun kamida 70% (4 ta to‘g‘ri) kerak. Mavzularni takrorlab, yana urinib ko‘ring.`}
                </p>

                <div className="flex items-center justify-center space-x-3 pt-4">
                  <button
                    onClick={() => startBossBattle(activeBossStage)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Qayta urinish</span>
                  </button>

                  <button
                    onClick={closeBattle}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
                  >
                    Kampaniyaga qaytish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
