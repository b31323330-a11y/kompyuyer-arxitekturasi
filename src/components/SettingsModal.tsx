import React from 'react';
import { 
  X, 
  Settings, 
  Clock, 
  Timer, 
  Zap, 
  Swords, 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  RotateCcw, 
  Check, 
  Infinity as InfinityIcon,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { sound } from '../utils/soundEngine';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { 
    timerSettings, 
    updateTimerSettings, 
    resetTimerSettings, 
    theme, 
    toggleTheme, 
    soundEnabled, 
    toggleSound 
  } = useGameStore();

  if (!isOpen) return null;

  const handleDisableToggle = () => {
    sound.playClick();
    updateTimerSettings({ disableTimers: !timerSettings.disableTimers });
  };

  const setMixedTimer = (sec: number) => {
    sound.playClick();
    updateTimerSettings({ mixedQuestionTimer: sec });
  };

  const setBlitzTimer = (sec: number) => {
    sound.playClick();
    updateTimerSettings({ blitzDuration: sec });
  };

  const setBossTimer = (sec: number) => {
    sound.playClick();
    updateTimerSettings({ bossBattleTimer: sec });
  };

  const setTfTimer = (sec: number) => {
    sound.playClick();
    updateTimerSettings({ trueFalseDuration: sec });
  };

  const setArcadeTimer = (sec: number) => {
    sound.playClick();
    updateTimerSettings({ arcadeDuration: sec });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#0B1120] border border-cyan-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Tizim va Test Sozlamalari
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                  Custom Timers
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Testlar, Boss janglari va mini-o'yinlar vaqtini o'zingizga qulay qilib sozlang
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-6 divide-y divide-slate-800/80">
          {/* MASTER SWITCH: Disable Timers (Free Mode) */}
          <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950/60 border border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl mt-0.5">
                <InfinityIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  Cheksiz Vaqt / Erkin O'rganish Rejimi
                  {timerSettings.disableTimers && (
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold">
                      FAOL
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Barcha taymerlarni to'xtatadi. Hech qanday vaqt cheklovisiz, shoshilmasdan tahlil qilib test va o'yinlarni yeching.
                </p>
              </div>
            </div>

            <button
              onClick={handleDisableToggle}
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                timerSettings.disableTimers ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  timerSettings.disableTimers ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* TIMER CONTROLS SECTION */}
          <div className={`space-y-5 pt-5 transition-opacity ${timerSettings.disableTimers ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-cyan-400" /> Test va O'yin Taymerlari
              </span>
              <span className="text-[11px] text-slate-500">Ixtiyoriy vaqtni tanlang</span>
            </div>

            {/* 1. Mixed Exam Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Aralash Imtihon (Savol boshiga vaqt):
                </span>
                <span className="text-cyan-400 font-mono font-bold">
                  {timerSettings.mixedQuestionTimer === 0 ? "Cheksiz" : `${timerSettings.mixedQuestionTimer} soniya`}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[15, 30, 45, 60, 90, 120].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setMixedTimer(sec)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      timerSettings.mixedQuestionTimer === sec
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s {sec === 45 && '★'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Blitz Exam Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Blitz Marafon (Umumiy test vaqti):
                </span>
                <span className="text-amber-400 font-mono font-bold">
                  {timerSettings.blitzDuration} soniya
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[30, 45, 60, 90, 120, 180].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setBlitzTimer(sec)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      timerSettings.blitzDuration === sec
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s {sec === 60 && '★'}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Boss Battle Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Swords className="w-4 h-4 text-rose-400" />
                  Bob Yakuni: Boss-Sinov Taymeri:
                </span>
                <span className="text-rose-400 font-mono font-bold">
                  {timerSettings.bossBattleTimer} soniya
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[30, 45, 60, 90, 120].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setBossTimer(sec)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      timerSettings.bossBattleTimer === sec
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s {sec === 45 && '★'}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. True/False Sprint Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  "Afsona yoki Haqiqat?" Sprinti:
                </span>
                <span className="text-emerald-400 font-mono font-bold">
                  {timerSettings.trueFalseDuration} soniya
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[30, 45, 60, 90, 120].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setTfTimer(sec)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      timerSettings.trueFalseDuration === sec
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s {sec === 60 && '★'}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Arcade Games Timer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  Mini-O'yinlar Arkadasi Taymeri:
                </span>
                <span className="text-purple-400 font-mono font-bold">
                  {timerSettings.arcadeDuration} soniya
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[45, 60, 90, 120, 180].map(sec => (
                  <button
                    key={sec}
                    onClick={() => setArcadeTimer(sec)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                      timerSettings.arcadeDuration === sec
                        ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s {sec === 60 && '★'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AUDIO & THEME CONTROLS */}
          <div className="pt-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Tizim Muhiti
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${soundEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Audio Effektlar</div>
                    <div className="text-[10px] text-slate-400">{soundEnabled ? "Ovoz yoqilgan" : "Ovoz o'chirilgan (Muted)"}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${soundEnabled ? 'bg-cyan-950 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                  {soundEnabled ? "ON" : "OFF"}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Vizual Tema</div>
                    <div className="text-[10px] text-slate-400">{theme === 'dark' ? "Tungi (Cyber Dark)" : "Kunduzgi (Light)"}</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-amber-400 font-mono">
                  {theme === 'dark' ? "DARK" : "LIGHT"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 md:p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              resetTimerSettings();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Standartga Qaytarish
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            Saqlash va Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
