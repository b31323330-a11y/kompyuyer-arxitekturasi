import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Play, 
  Gamepad2,
  Award, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Swords, 
  Binary, 
  GitBranch, 
  Terminal, 
  Layers, 
  Server, 
  AlertCircle,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useGameStore, RANKS } from '../../store/useGameStore';
import { CHAPTERS, CURRICULUM_DATA } from '../../data/curriculum';
import { sound } from '../../utils/soundEngine';

export const DashboardView: React.FC = () => {
  const { 
    name, 
    xp, 
    dailyStreak, 
    unlockedChapters, 
    bossDefeated, 
    achievements, 
    getRankInfo, 
    getWeakestTopic, 
    getRadarData, 
    setActiveTab 
  } = useGameStore();

  const { rank, nextRank, progress } = getRankInfo();
  const radarData = getRadarData();
  const weakestLabId = getWeakestTopic();
  const weakestLab = CURRICULUM_DATA.find(l => l.id === weakestLabId) || CURRICULUM_DATA[0];

  const currentChapter = CHAPTERS[Math.min(unlockedChapters - 1, CHAPTERS.length - 1)];
  const unlockedAchCount = Object.keys(achievements).length;

  const quickLabs = [
    { id: 'arcade', title: "12 Mini-O‘yin Arkadasi", desc: "12 xil janrdagi interaktiv o‘yinlar", icon: Gamepad2, color: "from-fuchsia-600 via-purple-600 to-indigo-600" },
    { id: 'campaign', title: "Arxitektor Yo‘li", desc: "5 ta bobli asosiy kampaniya", icon: Swords, color: "from-blue-600 to-indigo-600" },
    { id: 'exam', title: "Imtihon Arena", desc: "Aralash, Blitz va Survival", icon: Award, color: "from-amber-600 to-orange-600" },
    { id: 'alu', title: "Sanoq & ALU", desc: "Carry/Borrow & Overflow", icon: Binary, color: "from-cyan-600 to-blue-600" },
    { id: 'logisim', title: "Mini-Logisim & K-map", desc: "Sxemalar va Karnaugh", icon: GitBranch, color: "from-purple-600 to-violet-600" },
    { id: 'ripes', title: "Mini-Ripes RV32I", desc: "Assembly & 32 registr", icon: Terminal, color: "from-emerald-600 to-teal-600" },
    { id: 'memory', title: "Xotira & Kesh", desc: "EAT & Saqlash vositalari", icon: Layers, color: "from-pink-600 to-rose-600" },
    { id: 'pc_raid', title: "PC, RAID & Shinalar", desc: "RAID inqirozi & PCIe 7.0", icon: Server, color: "from-indigo-600 to-purple-600" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Welcome / Bento Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Mission Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#0D1424] via-[#10192F] to-[#070B14] border border-[#1A2642] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Joriy Asosiy Missiya</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {currentChapter.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed max-w-lg">
              {currentChapter.description}
            </p>

            <div className="mt-4 flex items-center space-x-2">
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                Boss: {currentChapter.bossName}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                {currentChapter.labs.length} ta amaliy mashg‘ulot
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1A2642]/80 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="text-xs text-slate-400">
                Bosqich ochilish ko‘rsatkichi: <strong className="text-white">{unlockedChapters} / 5</strong>
              </div>
            </div>

            <button
              onClick={() => { sound.playClick(); setActiveTab('campaign'); }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center space-x-2 shadow-glow-indigo hover:scale-105 transition-all"
            >
              <span>Kampaniyani Davom Ettirish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recommended Practice & Weak Topic AI (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0D1424] border border-[#1A2642] p-6 flex flex-col justify-between shadow-2xl relative">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Tavsiya Etilgan Mashq (Adaptiv Tahlil)</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {weakestLab.id}-amaliy: {weakestLab.shortName}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              O‘zlashtirish tahliliga ko‘ra, siz ushbu mavzu savollarida eng ko‘p xatolik qayd etgansiz yoki hali yetarlicha mashq qilmadingiz.
            </p>

            <div className="p-3 rounded-2xl bg-[#070B14] border border-[#1A2642] text-xs text-slate-300">
              <span className="text-indigo-400 font-bold block mb-1">Maqsad:</span>
              {weakestLab.objective}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1A2642] flex items-center justify-between">
            <button
              onClick={() => { sound.playClick(); setActiveTab('exam'); }}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all text-center"
            >
              Ushbu Mavzu Bo‘yicha Mashq Qilish →
            </button>
          </div>
        </div>
      </div>

      {/* Bento Row 2: Radar Chart & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts 14-Topic Radar Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0D1424] border border-[#1A2642] p-6 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>14 ta Mavzu Bo‘yicha Kompetensiya Radari</span>
              </h3>
              <p className="text-[11px] text-slate-400">Har bir amaliy mashg‘ulot bo‘yicha aniqlik balansi</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">0% – 100%</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                <Radar
                  name="O‘zlashtirish"
                  dataKey="accuracy"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics & Stats (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-[#0D1424] border border-[#1A2642] p-5 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Jami Ball</span>
            <div className="text-3xl font-black text-cyan-400 font-mono mt-1">{xp}</div>
            <span className="text-[10px] text-slate-400">{rank.title}</span>
          </div>

          <div className="rounded-3xl bg-[#0D1424] border border-[#1A2642] p-5 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Kunlik Seriya</span>
            <div className="text-3xl font-black text-amber-400 font-mono mt-1 flex items-center">
              <Flame className="w-6 h-6 mr-1" />
              {dailyStreak}
            </div>
            <span className="text-[10px] text-slate-400">Xatosiz uzluksiz</span>
          </div>

          <div className="rounded-3xl bg-[#0D1424] border border-[#1A2642] p-5 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ochilgan Yutuqlar</span>
            <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
              {unlockedAchCount} / 16
            </div>
            <span className="text-[10px] text-slate-400">Achievements</span>
          </div>

          <div className="rounded-3xl bg-[#0D1424] border border-[#1A2642] p-5 flex flex-col justify-between shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mag‘lub Bosslar</span>
            <div className="text-3xl font-black text-purple-400 font-mono mt-1">
              {Object.keys(bossDefeated).length} / 5
            </div>
            <span className="text-[10px] text-slate-400">G‘alabalar</span>
          </div>
        </div>
      </div>

      {/* Bento Row 3: Quick Access Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Laboratoriyalar & O‘yin Maydonchalari:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickLabs.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                onClick={() => { sound.playClick(); setActiveTab(lab.id); }}
                className="rounded-3xl bg-[#0D1424] hover:bg-[#131D33] border border-[#1A2642] hover:border-indigo-500/50 p-5 cursor-pointer transition-all hover:scale-[1.02] shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${lab.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{lab.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{lab.desc}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end text-xs font-bold text-indigo-400 space-x-1">
                  <span>Kirish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
