import React, { useState, useEffect } from 'react';
import { 
  BookOpenCheck, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Flame, 
  Search, 
  Filter, 
  Timer, 
  Calculator, 
  Zap, 
  Eye, 
  EyeOff, 
  BookmarkCheck, 
  Repeat, 
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../utils/soundEngine';

// Data imports
import { CONTROL_QUESTIONS_DATA, ControlQuestionItem } from '../../data/controlQuestionsData';
import { TRUE_FALSE_QUESTIONS, TrueFalseQuestion } from '../../data/trueFalseData';
import { INPUT_CHALLENGE_QUESTIONS, InputChallengeQuestion } from '../../data/inputChallengeData';
import { getExamQuestions, Question } from '../../data/questionBank';

type QAMode = 'mcq' | 'true_false' | 'input_challenge' | 'bank';

export const QACenterView: React.FC = () => {
  const { 
    addXp, 
    addCoins, 
    masteredQuestions, 
    reviewQuestions, 
    toggleMasterQuestion, 
    toggleReviewQuestion,
    recordTopicScore,
    timerSettings,
    updateTimerSettings
  } = useGameStore();

  const [activeMode, setActiveMode] = useState<QAMode>('bank');

  // ==========================================
  // MODE 1: MCQ ARENA STATE
  // ==========================================
  const [mcqLabFilter, setMcqLabFilter] = useState<number | 'all'>('all');
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>(() => getExamQuestions([], 10));
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqSelected, setMcqSelected] = useState<number | null>(null);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqFinished, setMcqFinished] = useState(false);

  const startMcqTest = (lab: number | 'all') => {
    setMcqLabFilter(lab);
    setMcqQuestions(getExamQuestions([], 10));
    setMcqIndex(0);
    setMcqSelected(null);
    setMcqScore(0);
    setMcqFinished(false);
  };

  const handleMcqAnswer = (idx: number) => {
    if (mcqSelected !== null || mcqFinished) return;
    setMcqSelected(idx);
    const q = mcqQuestions[mcqIndex];
    const isCorrect = idx === q.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      setMcqScore(s => s + 1);
      recordTopicScore(q.labId, true);
    } else {
      sound.playWrong();
      recordTopicScore(q.labId, false);
    }
  };

  const nextMcqQuestion = () => {
    if (mcqIndex + 1 < mcqQuestions.length) {
      setMcqIndex(i => i + 1);
      setMcqSelected(null);
    } else {
      setMcqFinished(true);
      sound.playLevelUp();
      confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
      const earnedXp = mcqScore * 20 + 50;
      const earnedCoins = mcqScore * 4 + 10;
      addXp(earnedXp, "Mavzuli Test Yakunlandi");
      addCoins(earnedCoins);
    }
  };

  // ==========================================
  // MODE 2: TRUE / FALSE SPRINT STATE
  // ==========================================
  const [tfIndex, setTfIndex] = useState(0);
  const [tfScore, setTfScore] = useState(0);
  const [tfCombo, setTfCombo] = useState(0);
  const [tfTimeLeft, setTfTimeLeft] = useState(timerSettings.trueFalseDuration);
  const [tfActive, setTfActive] = useState(false);
  const [tfFinished, setTfFinished] = useState(false);
  const [tfFeedback, setTfFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (!tfActive || tfFinished) return;
    if (timerSettings.disableTimers) return;

    const interval = setInterval(() => {
      setTfTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          finishTfSprint();
          return 0;
        }
        if (t <= 5) sound.playTimerWarning();
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tfActive, tfFinished, timerSettings.disableTimers]);

  const startTfSprint = () => {
    sound.playClick();
    setTfIndex(0);
    setTfScore(0);
    setTfCombo(0);
    setTfTimeLeft(timerSettings.disableTimers ? 999999 : timerSettings.trueFalseDuration);
    setTfFeedback(null);
    setTfFinished(false);
    setTfActive(true);
  };

  const finishTfSprint = () => {
    setTfActive(false);
    setTfFinished(true);
    sound.playLevelUp();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    const earnedXp = tfScore * 15 + 40;
    const earnedCoins = Math.floor(tfScore / 5) + 8;
    addXp(earnedXp, "Afsona yoki Haqiqat Sprinti");
    addCoins(earnedCoins);
  };

  const handleTfAnswer = (userChoice: boolean) => {
    if (!tfActive || tfFinished) return;
    const currentQ = TRUE_FALSE_QUESTIONS[tfIndex % TRUE_FALSE_QUESTIONS.length];
    const isCorrect = userChoice === currentQ.isTrue;

    if (isCorrect) {
      sound.playCorrect();
      const newCombo = tfCombo + 1;
      setTfCombo(newCombo);
      sound.playCombo(newCombo);
      const points = 20 + newCombo * 5;
      setTfScore(s => s + points);
      setTfFeedback({ msg: `To'g'ri! ${currentQ.explanation}`, ok: true });
    } else {
      sound.playWrong();
      setTfCombo(0);
      setTfFeedback({ msg: `Xato! ${currentQ.explanation}`, ok: false });
    }

    setTfIndex(i => i + 1);
  };

  // ==========================================
  // MODE 3: INPUT CHALLENGE STATE
  // ==========================================
  const [inIndex, setInIndex] = useState(0);
  const [userInputValue, setUserInputValue] = useState('');
  const [inputResult, setInputResult] = useState<{ isCorrect: boolean; checked: boolean } | null>(null);
  const [showFormula, setShowFormula] = useState(false);
  const [inputScore, setInputScore] = useState(0);

  const currentInputQ = INPUT_CHALLENGE_QUESTIONS[inIndex % INPUT_CHALLENGE_QUESTIONS.length];

  const handleCheckInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInputValue.trim()) return;

    const trimmed = userInputValue.trim().toLowerCase();
    const target = currentInputQ.targetAnswer.trim().toLowerCase();
    const variants = (currentInputQ.acceptedVariants || []).map(v => v.trim().toLowerCase());

    const isMatch = trimmed === target || variants.includes(trimmed);

    if (isMatch) {
      sound.playCorrect();
      setInputScore(s => s + 50);
      addCoins(10);
      sound.playCoin();
      setInputResult({ isCorrect: true, checked: true });
    } else {
      sound.playWrong();
      setInputResult({ isCorrect: false, checked: true });
    }
  };

  const nextInputQuestion = () => {
    setInIndex(i => i + 1);
    setUserInputValue('');
    setInputResult(null);
    setShowFormula(false);
  };

  // ==========================================
  // MODE 4: QUESTION BANK (137 QUESTIONS) STATE
  // ==========================================
  const [bankSearch, setBankSearch] = useState('');
  const [bankLab, setBankLab] = useState<number | 'all'>('all');
  const [bankStatusFilter, setBankStatusFilter] = useState<'all' | 'mastered' | 'review' | 'unseen'>('all');
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  const toggleExpandAnswer = (qId: string) => {
    sound.playClick();
    setExpandedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleExpandAll = (expand: boolean) => {
    sound.playClick();
    if (expand) {
      const allExpanded: Record<string, boolean> = {};
      CONTROL_QUESTIONS_DATA.forEach((q: ControlQuestionItem) => { allExpanded[q.id] = true; });
      setExpandedAnswers(allExpanded);
    } else {
      setExpandedAnswers({});
    }
  };

  const filteredBankQuestions = CONTROL_QUESTIONS_DATA.filter((q: ControlQuestionItem) => {
    const matchesLab = bankLab === 'all' || q.labId === bankLab;
    const matchesSearch = bankSearch === '' || 
      q.question.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.answer.toLowerCase().includes(bankSearch.toLowerCase());
    
    const isMastered = masteredQuestions.includes(q.id);
    const isReview = reviewQuestions.includes(q.id);

    let matchesStatus = true;
    if (bankStatusFilter === 'mastered') matchesStatus = isMastered;
    else if (bankStatusFilter === 'review') matchesStatus = isReview;
    else if (bankStatusFilter === 'unseen') matchesStatus = !isMastered && !isReview;

    return matchesLab && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 border border-purple-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              <BookOpenCheck className="w-3.5 h-3.5 text-purple-400" />
              14 Ta Amaliy Mashg'ulot Bo'yicha 200+ Savol & Aniq Javoblar
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Imtihon & Savol-Javob Markazi
            </h1>
            <p className="text-sm text-slate-400">
              Rasmiy amaliy nazorat savollari, tezkor Afsona/Haqiqat sprinti, formulali hisoblash va takrorlash (Spaced Repetition) tizimi.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> O'zlashtirildi
              </div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">{masteredQuestions.length}</div>
            </div>
            <div className="text-center px-3">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <Repeat className="w-3.5 h-3.5 text-amber-400" /> Takrorlash
              </div>
              <div className="text-xl font-black text-amber-400 mt-0.5">{reviewQuestions.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Navigation Modes Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('bank');
          }}
          className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
            activeMode === 'bank'
              ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold shadow-lg shadow-purple-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'bank' ? 'bg-purple-500 text-white' : 'bg-slate-800'}`}>
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">137+ Rasmiy Bank</div>
            <div className="text-[11px] text-slate-500">Nazorat savollari & javoblari</div>
          </div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('true_false');
          }}
          className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
            activeMode === 'true_false'
              ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'true_false' ? 'bg-emerald-500 text-white' : 'bg-slate-800'}`}>
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Afsona yoki Haqiqat?</div>
            <div className="text-[11px] text-slate-500">60s tezkor sprint</div>
          </div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('input_challenge');
          }}
          className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
            activeMode === 'input_challenge'
              ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300 font-bold shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'input_challenge' ? 'bg-cyan-500 text-white' : 'bg-slate-800'}`}>
            <Calculator className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Aniq Javob Yozish</div>
            <div className="text-[11px] text-slate-500">Formula va hisoblash</div>
          </div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('mcq');
          }}
          className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
            activeMode === 'mcq'
              ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold shadow-lg shadow-indigo-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-xl ${activeMode === 'mcq' ? 'bg-indigo-500 text-white' : 'bg-slate-800'}`}>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold">Mavzuli MCQ Test</div>
            <div className="text-[11px] text-slate-500">Variantli sinov & izoh</div>
          </div>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MODE 4: OFFICIAL CONTROL QUESTION BANK (DEFAULT & MAIN)   */}
      {/* ========================================================= */}
      {activeMode === 'bank' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={bankSearch}
                  onChange={e => setBankSearch(e.target.value)}
                  placeholder="Savol yoki kalit so'zni qidirish (masalan: RAID, Kesh, RV32I)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Expand / Collapse All */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleExpandAll(true)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Barchasini ochish
                </button>
                <button
                  onClick={() => toggleExpandAll(false)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Barchasini yopish
                </button>
              </div>
            </div>

            {/* Lab Filter Selector */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Amaliy Mashg'ulotlar:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setBankLab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    bankLab === 'all'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Barcha 14 Amaliy
                </button>
                {[2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(labNum => (
                  <button
                    key={labNum}
                    onClick={() => setBankLab(labNum)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                      bankLab === labNum
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {labNum}-amaliy
                  </button>
                ))}
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-semibold">Holat:</span>
              {(['all', 'mastered', 'review', 'unseen'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setBankStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    bankStatusFilter === st
                      ? 'bg-slate-700 text-white'
                      : 'bg-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st === 'all' && `Barchasi (${CONTROL_QUESTIONS_DATA.length})`}
                  {st === 'mastered' && `O'zlashtirildi (${masteredQuestions.length})`}
                  {st === 'review' && `Takrorlash kerak (${reviewQuestions.length})`}
                  {st === 'unseen' && `Hali o'rganilmagan`}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredBankQuestions.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                Ushbu parametrlar bo'yicha savol topilmadi.
              </div>
            ) : (
              filteredBankQuestions.map((q: ControlQuestionItem, idx: number) => {
                const isExpanded = expandedAnswers[q.id] || false;
                const isMastered = masteredQuestions.includes(q.id);
                const isReview = reviewQuestions.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800 font-mono font-bold">
                            {q.labId}-amaliy
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            #{idx + 1}
                          </span>
                          {isMastered && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> O'zlashtirildi
                            </span>
                          )}
                          {isReview && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 border border-amber-800 font-semibold flex items-center gap-1">
                              <Repeat className="w-3 h-3" /> Takrorlashda
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-white leading-snug">
                          {q.question}
                        </h3>
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpandAnswer(q.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0"
                        title={isExpanded ? "Javobni yashirish" : "Javobni ko'rish"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Answer Reveal Section */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> To'liq Ilmiy Javob:
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                            {q.answer}
                          </p>
                        </div>

                        {/* Spaced Repetition Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                          <span className="text-[11px] text-slate-400">O'zlashtirish holatini belgilang:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                sound.playClick();
                                toggleReviewQuestion(q.id);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                                isReview
                                  ? 'bg-amber-600 text-white border-amber-500'
                                  : 'bg-slate-800/80 text-amber-400 border-slate-700 hover:bg-amber-950/40'
                              }`}
                            >
                              <Repeat className="w-3.5 h-3.5" />
                              {isReview ? "Takrorlash ro'yxatida" : "Qayta takrorlash 🔁"}
                            </button>

                            <button
                              onClick={() => {
                                sound.playClick();
                                toggleMasterQuestion(q.id);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                                isMastered
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : 'bg-slate-800/80 text-emerald-400 border-slate-700 hover:bg-emerald-950/40'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isMastered ? "O'zlashtirildi ✅" : "O'zlashtirdim"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: TRUE / FALSE SPRINT                               */}
      {/* ========================================================= */}
      {activeMode === 'true_false' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!tfActive && !tfFinished ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">"Afsona yoki Haqiqat?" Sprinti</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Tezkor marafon! Kompyuter arxitekturasi bo'yicha tasdiqlarni "HAQIQAT" yoki "AFSONA" ekanligini belgilang.
                </p>
              </div>

              {/* Quick Timer Selector */}
              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-semibold text-slate-400 block">Sprint vaqtini tanlang:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {[30, 45, 60, 90, 120].map(sec => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        updateTimerSettings({ trueFalseDuration: sec, disableTimers: false });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                        !timerSettings.disableTimers && timerSettings.trueFalseDuration === sec
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sec}s {sec === 60 && '★'}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      updateTimerSettings({ disableTimers: true });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      timerSettings.disableTimers
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ♾️ Cheksiz
                  </button>
                </div>
              </div>

              <button
                onClick={startTfSprint}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                Sprintni Boshlash ({timerSettings.disableTimers ? "Erkin / Cheksiz" : `${timerSettings.trueFalseDuration}s`})
              </button>
            </div>
          ) : tfFinished ? (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-emerald-500/30">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">Sprint Yakunlandi!</h3>
                <p className="text-xs text-slate-400 mt-1">Siz juda ajoyib tezlik va bilim namoyon qildingiz!</p>
              </div>

              <div className="text-5xl font-black text-emerald-400 font-mono">
                {tfScore} <span className="text-lg text-slate-400 font-normal">ball</span>
              </div>

              <button
                onClick={startTfSprint}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
              >
                Qayta O'ynash
              </button>
            </div>
          ) : (
            /* Live Sprint Gameplay */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              {/* Sprint HUD */}
              <div className="flex items-center justify-between text-sm font-bold">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 rounded-xl text-amber-400 border border-slate-800">
                  <Timer className="w-4 h-4" />
                  <span>{timerSettings.disableTimers ? "♾️ Cheksiz" : `${tfTimeLeft}s`}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 rounded-xl text-emerald-400 border border-slate-800">
                  <Trophy className="w-4 h-4" />
                  <span>{tfScore} ball</span>
                </div>

                {tfCombo > 1 && (
                  <div className="px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-bold animate-bounce shadow-md">
                    {tfCombo}x Kombo!
                  </div>
                )}
              </div>

              {/* Feedback Alert */}
              {tfFeedback && (
                <div className={`p-3.5 rounded-xl text-xs font-semibold border animate-fadeIn ${
                  tfFeedback.ok ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-red-950/40 border-red-500 text-red-300'
                }`}>
                  {tfFeedback.msg}
                </div>
              )}

              {/* Statement Card */}
              {(() => {
                const q = TRUE_FALSE_QUESTIONS[tfIndex % TRUE_FALSE_QUESTIONS.length];
                return (
                  <div className="space-y-6 py-4">
                    <div className="text-center space-y-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 font-mono">
                        {q.labNumber}-amaliy • {q.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed pt-2">
                        "{q.statement}"
                      </h3>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <button
                        onClick={() => handleTfAnswer(false)}
                        className="py-5 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all flex flex-col items-center gap-1"
                      >
                        <XCircle className="w-7 h-7" />
                        AFSONA / XATO
                      </button>

                      <button
                        onClick={() => handleTfAnswer(true)}
                        className="py-5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xl shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex flex-col items-center gap-1"
                      >
                        <CheckCircle2 className="w-7 h-7" />
                        HAQIQAT
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: INPUT CHALLENGE (FORMULA & EXACT VALUE)           */}
      {/* ========================================================= */}
      {activeMode === 'input_challenge' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono font-bold">
                {currentInputQ.labNumber}-amaliy • {currentInputQ.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Savol #{inIndex + 1} / {INPUT_CHALLENGE_QUESTIONS.length}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{currentInputQ.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {currentInputQ.prompt}
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCheckInput} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInputValue}
                  onChange={e => setUserInputValue(e.target.value)}
                  placeholder="Javobni kiriting (masalan: 53, BC, 16)..."
                  disabled={inputResult?.checked && inputResult.isCorrect}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-base focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!userInputValue.trim() || (inputResult?.checked && inputResult.isCorrect)}
                  className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Tekshirish
                </button>
              </div>

              {/* Feedback */}
              {inputResult?.checked && (
                <div className={`p-4 rounded-xl border text-xs font-semibold animate-fadeIn ${
                  inputResult.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-red-950/40 border-red-500 text-red-300'
                }`}>
                  {inputResult.isCorrect ? (
                    <div>
                      🎉 To'g'ri javob! (+50 Ball, +10 Tanga)
                      <p className="mt-1 text-slate-300 font-normal">{currentInputQ.explanation}</p>
                    </div>
                  ) : (
                    <div>
                      ❌ Xato javob. Qayta urinib ko'ring yoki quyida formulani oching.
                    </div>
                  )}
                </div>
              )}

              {/* Hint & Formula toggles */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  {showFormula ? "Formulani yashirish" : "Yechim formulasini ko'rish"}
                </button>

                {inputResult?.checked && (
                  <button
                    type="button"
                    onClick={nextInputQuestion}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    Keyingi Vazifa <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {showFormula && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 animate-fadeIn">
                  <div className="text-xs font-bold text-amber-400">Yechish yo'li:</div>
                  <div className="text-xs text-slate-300 font-mono">{currentInputQ.solutionFormula}</div>
                  <div className="text-xs text-slate-400 mt-1">{currentInputQ.hint}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 1: MCQ ARENA TEST                                    */}
      {/* ========================================================= */}
      {activeMode === 'mcq' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {mcqFinished ? (
            <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-indigo-500/30">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">Test Yakunlandi!</h3>
                <p className="text-xs text-slate-400 mt-1">10 ta savoldan natijangiz:</p>
              </div>

              <div className="text-5xl font-black text-indigo-400 font-mono">
                {mcqScore} / {mcqQuestions.length}
              </div>

              <button
                onClick={() => startMcqTest(mcqLabFilter)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
              >
                Qayta Boshlash
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              {/* Question Card */}
              {(() => {
                const q = mcqQuestions[mcqIndex];
                return (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono font-bold">
                        {q.labId}-amaliy
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Savol #{mcqIndex + 1} / {mcqQuestions.length}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                      {q.text}
                    </h3>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = mcqSelected === oIdx;
                        const isCorrect = oIdx === q.correctIndex;
                        const showCorrectness = mcqSelected !== null;

                        return (
                          <button
                            key={oIdx}
                            disabled={mcqSelected !== null}
                            onClick={() => handleMcqAnswer(oIdx)}
                            className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                              showCorrectness
                                ? isCorrect
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                  : isSelected
                                  ? 'bg-red-950/60 border-red-500 text-red-300'
                                  : 'bg-slate-950/50 border-slate-800 text-slate-500'
                                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                            }`}
                          >
                            <span className="font-mono mr-2">{String.fromCharCode(65 + oIdx)})</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {mcqSelected !== null && (
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 animate-fadeIn">
                        <div className="text-xs font-bold text-cyan-400">Izoh:</div>
                        <p className="text-xs text-slate-300">{q.explanation}</p>
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={nextMcqQuestion}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            Keyingi Savol <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
