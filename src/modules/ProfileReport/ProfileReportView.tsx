import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Printer, 
  Download, 
  Upload, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Flame, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { 
  UserState, 
  ACHIEVEMENTS_LIST, 
  getRankInfo 
} from '../../store/gameStore';
import { LABS_DATA } from '../../data/labData';

interface ProfileReportViewProps {
  state: UserState;
  onUpdateProfile: (name: string, group: string) => void;
  onResetProgress: () => void;
}

export const ProfileReportView: React.FC<ProfileReportViewProps> = ({
  state,
  onUpdateProfile,
  onResetProgress,
}) => {
  const [nameInput, setNameInput] = useState(state.name);
  const [groupInput, setGroupInput] = useState(state.group);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { rank, nextRank, progress } = getRankInfo(state.xp);

  const handleSaveProfile = () => {
    onUpdateProfile(nameInput.trim() || "Talaba", groupInput.trim() || "611-22");
    setIsEditingProfile(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hisobot_${state.name}_${state.group}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* ---------------- SCREEN VIEW (Hidden on Print) ---------------- */}
      <div className="no-print space-y-8">
        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-indigo-600/30">
                👨‍💻
              </div>

              <div>
                {isEditingProfile ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1 text-sm font-bold text-white w-40"
                    />
                    <input
                      type="text"
                      value={groupInput}
                      onChange={(e) => setGroupInput(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1 text-sm font-bold text-white w-24"
                    />
                    <button
                      onClick={handleSaveProfile}
                      className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                    >
                      Saqlash
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl md:text-2xl font-black text-white">{state.name}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                        {state.group}
                      </span>
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 ml-2"
                      >
                        (Tahrirlash)
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Fan: <strong>Kompyuterni tashkil etish</strong> · Toshkent
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rank & XP */}
            <div className="text-right flex flex-col items-start md:items-end">
              <div className="text-lg font-bold text-white">{rank.title}</div>
              <div className="text-sm font-black text-amber-400 flex items-center mt-0.5">
                <Sparkles className="w-4 h-4 mr-1" />
                {state.xp} XP to‘plandi
              </div>

              {nextRank && (
                <div className="w-44 bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (Print Report & JSON Backup) */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/20"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etishga tayyor hisobot (PDF)</span>
              </button>

              <button
                onClick={handleExportJson}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>JSON eksport</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (confirm("Rostdan ham barcha progress va natijalarni tozalashni xohlaysizmi?")) {
                  onResetProgress();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Progressni tozalash</span>
            </button>
          </div>
        </div>

        {/* 14 Labs Mastery Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>14 ta Amaliy Mashg‘ulot bo‘yicha O‘zlashtirish Ko‘rsatkichlari</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LABS_DATA.map((lab) => {
              const stat = state.topicStats[lab.id] || { correct: 0, total: 0 };
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;

              return (
                <div key={lab.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">
                      {lab.id}-amaliy: <strong className="text-white">{lab.shortName}</strong>
                    </span>
                    <span className="font-mono text-cyan-400">
                      {stat.correct}/{stat.total} ({pct}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements Gallery */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Yutuqlar (Achievements): {Object.keys(state.achievements).length} / {ACHIEVEMENTS_LIST.length}</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ACHIEVEMENTS_LIST.map((ach) => {
              const isUnlocked = !!state.achievements[ach.id]?.unlocked;
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                    isUnlocked
                      ? 'bg-slate-950 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-40'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 mb-2 text-xl">
                    {isUnlocked ? "⭐" : "🔒"}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white leading-tight">{ach.title}</h5>
                    <p className="text-[9px] text-slate-400 mt-1 line-clamp-2">{ach.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------- OFFICIAL ACADEMIC REPORT (Print View) ---------------- */}
      <div className="print-only hidden print-page bg-white text-black p-8 font-serif leading-relaxed">
        {/* Official Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-xs font-bold uppercase tracking-wider">
            O‘zbekiston Respublikasi Oliy Ta’lim, Fan va Innovatsiyalar Vazirligi
          </h1>
          <h2 className="text-base font-black uppercase mt-1">
            "Kompyuterni tashkil etish" fani bo‘yicha 14 ta amaliy mashg‘ulot laboratoriya hisoboti
          </h2>
        </div>

        {/* Student Details */}
        <div className="grid grid-cols-2 gap-4 text-xs mb-6 border p-3">
          <div>
            <p><strong>Talaba:</strong> {state.name}</p>
            <p><strong>Guruh:</strong> {state.group}</p>
            <p><strong>Hosil qilingan unvon:</strong> {rank.title}</p>
          </div>
          <div>
            <p><strong>Jami to‘plangan ball (XP):</strong> {state.xp}</p>
            <p><strong>Sana:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Tizim:</strong> Kompyuter Arxitektori: Pro Lab</p>
          </div>
        </div>

        {/* 14 Labs Table */}
        <h3 className="text-xs font-bold uppercase mb-2">14 ta amaliy mashg‘ulot natijalari:</h3>
        <table className="w-full text-left text-[11px] border-collapse border border-black mb-6">
          <thead>
            <tr className="bg-gray-100 border-b border-black font-bold">
              <th className="p-1.5 border border-black">№</th>
              <th className="p-1.5 border border-black">Mavzu nomi</th>
              <th className="p-1.5 border border-black">Yo‘nalish</th>
              <th className="p-1.5 border border-black">Savollar</th>
              <th className="p-1.5 border border-black">To‘g‘ri</th>
              <th className="p-1.5 border border-black">O‘zlashtirish</th>
            </tr>
          </thead>
          <tbody>
            {LABS_DATA.map((lab) => {
              const stat = state.topicStats[lab.id] || { correct: 0, total: 0 };
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <tr key={lab.id} className="border-b border-gray-300">
                  <td className="p-1.5 border border-black font-mono">{lab.id}</td>
                  <td className="p-1.5 border border-black font-medium">{lab.title}</td>
                  <td className="p-1.5 border border-black">{lab.category}</td>
                  <td className="p-1.5 border border-black font-mono">{stat.total}</td>
                  <td className="p-1.5 border border-black font-mono">{stat.correct}</td>
                  <td className="p-1.5 border border-black font-mono font-bold">{pct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Exam History */}
        {state.examHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase mb-2">So‘nggi imtihon sinovlari:</h3>
            <table className="w-full text-left text-[11px] border border-black border-collapse">
              <thead>
                <tr className="bg-gray-100 font-bold border-b border-black">
                  <th className="p-1 border border-black">Sana</th>
                  <th className="p-1 border border-black">Ball</th>
                  <th className="p-1 border border-black">To‘g‘ri javoblar</th>
                  <th className="p-1 border border-black">Unvon</th>
                </tr>
              </thead>
              <tbody>
                {state.examHistory.slice(0, 5).map(rec => (
                  <tr key={rec.id} className="border-b border-gray-300">
                    <td className="p-1 border border-black">{rec.date}</td>
                    <td className="p-1 border border-black font-bold">{rec.score}</td>
                    <td className="p-1 border border-black">{rec.correct} / {rec.total}</td>
                    <td className="p-1 border border-black">{rec.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-black text-xs">
          <div>
            <p>Talaba imzosi: _____________________</p>
          </div>
          <div className="text-right">
            <p>O‘qituvchi bahosi va imzosi: _____________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};
