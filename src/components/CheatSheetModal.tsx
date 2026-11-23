import React, { useState } from 'react';
import { CURRICULUM_DATA, CurriculumLab } from '../data/curriculum';
import { BookOpen, X, Sparkles, ChevronRight } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLabId?: number;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
  initialLabId = 2,
}) => {
  const [selectedLabId, setSelectedLabId] = useState<number>(initialLabId);

  if (!isOpen) return null;

  const currentLab = CURRICULUM_DATA.find(l => l.id === selectedLabId) || CURRICULUM_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn no-print">
      <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A2642] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Tezkor Nazariy Konspekt & Cheat Sheet
              </h3>
              <p className="text-xs text-slate-400">14 ta amaliy mashg‘ulot bo‘yicha formulalar va asosiy qoidalar</p>
            </div>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Left: Lab List | Right: Content) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Labs tabs */}
          <div className="w-full md:w-64 border-r border-[#1A2642] p-3 overflow-y-auto space-y-1 bg-[#070B14]">
            {CURRICULUM_DATA.map(lab => (
              <button
                key={lab.id}
                onClick={() => { sound.playClick(); setSelectedLabId(lab.id); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  selectedLabId === lab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#0D1424]'
                }`}
              >
                <span>{lab.id}-amaliy: {lab.shortName}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Detailed Lab Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                {currentLab.category}
              </span>
              <h2 className="text-xl font-bold text-white mt-2">{currentLab.title}</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentLab.objective}</p>
            </div>

            {/* Cheat Sheet Summary */}
            <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                💡 {currentLab.cheatSheet.title}
              </h4>
              <p className="text-xs text-slate-300">{currentLab.cheatSheet.summary}</p>
            </div>

            {/* Formulas Box */}
            {currentLab.cheatSheet.formulas.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Asosiy Formulalar & Yozuvlar:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLab.cheatSheet.formulas.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#070B14] border border-[#1A2642] space-y-1">
                      <span className="text-[11px] font-bold text-slate-400">{f.name}</span>
                      <div className="text-sm font-mono font-bold text-emerald-400">{f.expr}</div>
                      <span className="text-[10px] text-slate-500 block">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Rules list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                📌 Mustahkamlash uchun muhim qoidalar:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentLab.cheatSheet.keyRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
