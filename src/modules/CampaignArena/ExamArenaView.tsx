import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Flame, 
  Heart, 
  Zap, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { getExamQuestions, Question } from '../../data/questionsData';
import { LABS_DATA } from '../../data/labData';
import { useGameStore } from '../../store/useGameStore';

interface ExamArenaViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onRecordExam: (result: { score: number; correct: number; total: number; rank: string; badTopics: number[] }) => void;
  onRecordTopic: (labId: number, isCorrect: boolean) => void;
  onUnlockAchievement: (id: string) => void;
}

type ExamMode = 'mixed' | 'blitz' | 'survival';

export const ExamArenaView: React.FC<ExamArenaViewProps> = ({
  onAddXp,
  onRecordExam,
  onRecordTopic,
  onUnlockAchievement,
}) => {
  const { timerSettings, updateTimerSettings } = useGameStore();

  const [selectedMode, setSelectedMode] = useState<ExamMode>('mixed');
  const [isPlaying, setIsPlaying] = useState(false);

  // Game questions & progress
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Scoring & Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [badTopics, setBadTopics] = useState<number[]>([]);

  // Timers
  const [questionTimer, setQuestionTimer] = useState(timerSettings.mixedQuestionTimer);
  const [blitzTimer, setBlitzTimer] = useState(timerSettings.blitzDuration);
  const [lives, setLives] = useState(3); // for survival mode
  const [isGameOver, setIsGameOver] = useState(false);

  // Seen questions for non-repeating mixed exam
  const [seenIds, setSeenIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('ka_seen_exam_ids') || '[]');
    } catch {
      return [];
    }
  });

  // Mixed Mode Timer (per question)
  useEffect(() => {
    if (!isPlaying || isGameOver || isAnswered || selectedMode !== 'mixed') return;
    if (timerSettings.disableTimers || timerSettings.mixedQuestionTimer === 0) return;

    if (questionTimer <= 0) {
      handleTimeout();
      return;
    }

    const t = setInterval(() => {
      setQuestionTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [isPlaying, isGameOver, isAnswered, questionTimer, selectedMode, timerSettings.disableTimers, timerSettings.mixedQuestionTimer]);

  // Blitz Mode Global Timer (countdown)
  useEffect(() => {
    if (!isPlaying || isGameOver || selectedMode !== 'blitz') return;
    if (timerSettings.disableTimers) return;

    if (blitzTimer <= 0) {
      endGame();
      return;
    }

    const t = setInterval(() => {
      setBlitzTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [isPlaying, isGameOver, blitzTimer, selectedMode, timerSettings.disableTimers]);

  const startExam = (mode: ExamMode) => {
    sounds.playClick();
    setSelectedMode(mode);
    setIsPlaying(true);
    setIsGameOver(false);
    setCurrentIndex(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setBadTopics([]);
    setQuestionTimer(timerSettings.disableTimers ? 0 : timerSettings.mixedQuestionTimer);
    setBlitzTimer(timerSettings.disableTimers ? 999999 : timerSettings.blitzDuration);
    setLives(3);

    const initialQs = getExamQuestions(seenIds);
    setQuestions(initialQs);

    // Save seen IDs
    const newSeen = Array.from(new Set([...seenIds, ...initialQs.map(q => q.id)]));
    setSeenIds(newSeen);
    try {
      localStorage.setItem('ka_seen_exam_ids', JSON.stringify(newSeen.slice(-100)));
    } catch {
      // ignore
    }
  };

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    sounds.playError();
    setStreak(0);
    const currQ = questions[currentIndex];
    setBadTopics(prev => [...prev, currQ.labId]);
    onRecordTopic(currQ.labId, false);

    if (selectedMode === 'survival') {
      const remaining = lives - 1;
      setLives(remaining);
      if (remaining <= 0) {
        setTimeout(endGame, 1000);
        return;
      }
    }
  };

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optIdx === currentQ.correctIndex;
    onRecordTopic(currentQ.labId, isCorrect);

    if (isCorrect) {
      sounds.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
      setCorrectCount(prev => prev + 1);

      // Streak achievement
      if (newStreak >= 5) {
        onUnlockAchievement("streak_fire");
      }

      // Calculate score points (base 10 + speed bonus + streak bonus)
      const speedBonus = selectedMode === 'mixed' ? Math.floor(questionTimer / 5) : 3;
      const streakBonus = Math.min(newStreak - 1, 4) * 2;
      const earned = 10 + speedBonus + streakBonus;
      setScore(prev => prev + earned);
      onAddXp(earned, "Savol to‘g‘ri");

      // Auto advance in blitz mode for fast action
      if (selectedMode === 'blitz') {
        setTimeout(() => handleNext(), 400);
      }
    } else {
      sounds.playError();
      setStreak(0);
      setBadTopics(prev => [...prev, currentQ.labId]);

      if (selectedMode === 'survival') {
        const remaining = lives - 1;
        setLives(remaining);
        if (remaining <= 0) {
          setTimeout(endGame, 800);
          return;
        }
      }

      if (selectedMode === 'blitz') {
        setTimeout(() => handleNext(), 600);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setQuestionTimer(timerSettings.disableTimers ? 0 : timerSettings.mixedQuestionTimer);
    } else {
      // In survival or blitz, fetch more questions dynamically if still running
      if (selectedMode === 'survival' || selectedMode === 'blitz') {
        const moreQs = getExamQuestions();
        setQuestions(prev => [...prev, ...moreQs]);
        setCurrentIndex(prev => prev + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
        setQuestionTimer(timerSettings.disableTimers ? 0 : timerSettings.mixedQuestionTimer);
      } else {
        endGame();
      }
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    setIsPlaying(false);

    // Rank designation based on score
    const rankTitle = correctCount >= 9 ? "🏆 Arxitektor" : correctCount >= 7 ? "🥇 Muhandis" : correctCount >= 5 ? "🥈 Texnik" : "🥉 Boshlovchi";

    if (correctCount >= 8) {
      sounds.playLevelUp();
      confetti({ particleCount: 100, spread: 60 });
    }

    onRecordExam({
      score,
      correct: correctCount,
      total: currentIndex + 1,
      rank: rankTitle,
      badTopics: Array.from(new Set(badTopics)),
    });
  };

  const resetExamMemory = () => {
    setSeenIds([]);
    try {
      localStorage.removeItem('ka_seen_exam_ids');
    } catch {
      // ignore
    }
    sounds.playClick();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Modes Navigation Cards (When not playing) */}
      {!isPlaying && !isGameOver && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Imtihon Arena</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              14 ta amaliy mashg‘ulot bo‘yicha bilimingizni sinang, seriya bonuslarini yig‘ing va unvoningizni mustahkamlang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Mixed Exam Mode */}
            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-400 transition-all hover:scale-[1.02] shadow-xl shadow-indigo-500/5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl w-fit">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {timerSettings.disableTimers ? "Cheksiz Vaqt" : `${timerSettings.mixedQuestionTimer}s / savol`}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Aralash Imtihon</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  14 ta amaliy mashg‘ulotdan 10 ta takrorlanmas savol. Har bir savolga vaqt va batafsil tahlil.
                </p>

                {/* Quick Timer Selector */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">Savol vaqtini tanlang:</span>
                  <div className="flex flex-wrap gap-1">
                    {[15, 30, 45, 60, 90, 120].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                          updateTimerSettings({ mixedQuestionTimer: s, disableTimers: false });
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
                          !timerSettings.disableTimers && timerSettings.mixedQuestionTimer === s
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}s
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        updateTimerSettings({ disableTimers: true });
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                        timerSettings.disableTimers
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      ♾️ Cheksiz
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => startExam('mixed')}
                className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all"
              >
                Boshlash (10 Savol)
              </button>
            </div>

            {/* Blitz Mode */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-400 transition-all hover:scale-[1.02] shadow-xl shadow-amber-500/5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl w-fit">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    {timerSettings.disableTimers ? "Cheksiz Vaqt" : `${timerSettings.blitzDuration}s marafon`}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Blitz Rejim</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Shiddatli marafon! Belgilangan vaqt ichida maksimal miqdorda to‘g‘ri javob bering.
                </p>

                {/* Quick Timer Selector */}
                <div className="pt-2">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">Marafon vaqtini tanlang:</span>
                  <div className="flex flex-wrap gap-1">
                    {[30, 45, 60, 90, 120, 180].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playClick();
                          updateTimerSettings({ blitzDuration: s, disableTimers: false });
                        }}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
                          !timerSettings.disableTimers && timerSettings.blitzDuration === s
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {s}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => startExam('blitz')}
                className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs shadow-lg shadow-amber-600/30 hover:opacity-95 transition-all"
              >
                Boshlash ({timerSettings.disableTimers ? "Erkin" : `${timerSettings.blitzDuration}s`})
              </button>
            </div>

            {/* Survival Mode */}
            <div className="bg-slate-900/90 border border-rose-500/30 rounded-3xl p-6 flex flex-col justify-between hover:border-rose-400 transition-all hover:scale-[1.02] shadow-xl shadow-rose-500/5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl w-fit">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    3 Jon (Har xato = -1)
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">Survival (Omon Qolish)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sizda faqat 3 ta jon bor! Xatosiz rekord o‘rnating. Har bir savolga ehtiyotkorlik bilan javob bering.
                </p>
                <div className="pt-2 text-[11px] text-slate-400">
                  Vaqt shoshilmasdan o'ylash uchun beriladi.
                </div>
              </div>
              <button
                onClick={() => startExam('survival')}
                className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30 hover:opacity-95 transition-all"
              >
                Boshlash (3 Jon bilan)
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={resetExamMemory}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ko‘rilgan savollar xotirasini tozalash ({seenIds.length} ta)</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Exam Play Screen */}
      {isPlaying && questions[currentIndex] && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Top Bar: Mode, Progress, Streak & Timer */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {selectedMode === 'mixed' ? `Savol ${currentIndex + 1} / 10` : `Savol ${currentIndex + 1}`}
              </span>

              {streak > 1 && (
                <span className="text-xs font-bold text-amber-400 flex items-center px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 animate-pulse">
                  <Flame className="w-3.5 h-3.5 mr-1" />
                  {streak}x Seriya!
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-xs font-bold text-cyan-400 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {score} ball
              </div>

              {selectedMode === 'survival' && (
                <div className="flex items-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-4 h-4 ${i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`}
                    />
                  ))}
                </div>
              )}

              {selectedMode === 'mixed' && (
                <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-xl">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{timerSettings.disableTimers || timerSettings.mixedQuestionTimer === 0 ? "♾️ Cheksiz" : `${questionTimer} s`}</span>
                </div>
              )}

              {selectedMode === 'blitz' && (
                <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timerSettings.disableTimers ? "♾️ Cheksiz" : `${blitzTimer} s`}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {selectedMode === 'mixed' && !timerSettings.disableTimers && timerSettings.mixedQuestionTimer > 0 && (
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${(questionTimer / timerSettings.mixedQuestionTimer) * 100}%` }}
              />
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold">
              <span>{questions[currentIndex].labId}-amaliy mashg‘ulot</span>
              <span>·</span>
              <span>{LABS_DATA.find(l => l.id === questions[currentIndex].labId)?.shortName}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">
              {questions[currentIndex].text}
            </h3>

            {/* Options list */}
            <div className="space-y-3 pt-3">
              {questions[currentIndex].options.map((opt, oIdx) => {
                const isCorrect = oIdx === questions[currentIndex].correctIndex;
                const isChosen = selectedOpt === oIdx;

                let btnStyle = "bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-indigo-500";
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
                    className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 animate-fadeIn">
                <span className="font-bold text-indigo-400">Batafsil izoh: </span>
                {questions[currentIndex].explanation}
              </div>
            )}

            {/* Next button */}
            {isAnswered && selectedMode !== 'blitz' && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform"
                >
                  <span>{currentIndex < 9 ? "Keyingi Savol" : "Natijani Ko‘rish"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Over / Results Screen */}
      {isGameOver && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-3xl bg-slate-800 text-5xl shadow-inner">
            {correctCount >= 9 ? "🏆" : correctCount >= 7 ? "🥇" : correctCount >= 5 ? "🥈" : "🥉"}
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {correctCount >= 9 ? "Mukammal Arxitektor!" : correctCount >= 7 ? "A’lo Natija!" : "Sinov Yakunlandi"}
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {correctCount} / {selectedMode === 'mixed' ? 10 : currentIndex + 1} to‘g‘ri javob · ⭐ {score} ball to‘plandi
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block">Eng uzun seriya</span>
              <span className="text-lg font-bold text-amber-400">🔥 {maxStreak}</span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block">Aniqlik foizi</span>
              <span className="text-lg font-bold text-emerald-400">
                {Math.round((correctCount / Math.max(1, selectedMode === 'mixed' ? 10 : currentIndex + 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Weak topics advice if any */}
          {badTopics.length > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Takrorlash tavsiya etiladigan mavzular:</span>
              </div>
              <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
                {Array.from(new Set(badTopics)).map(t => {
                  const lab = LABS_DATA.find(l => l.id === t);
                  return (
                    <li key={t}>
                      {t}-amaliy mashg‘ulot: <strong className="text-white">{lab?.shortName}</strong> ({lab?.category})
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 text-emerald-300 text-xs font-semibold max-w-lg mx-auto">
              🎉 Tabriklaymiz! Siz birorta ham xato qilmadingiz, barcha mavzular mustahkam o‘zlashtirilgan.
            </div>
          )}

          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              onClick={() => startExam(selectedMode)}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta topshirish</span>
            </button>

            <button
              onClick={() => { setIsGameOver(false); setIsPlaying(false); }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
            >
              Bosh menyuga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
