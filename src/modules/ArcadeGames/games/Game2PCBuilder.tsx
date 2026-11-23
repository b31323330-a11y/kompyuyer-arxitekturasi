import React, { useState } from 'react';
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Trophy, 
  Coins, 
  Sparkles,
  Layers,
  Monitor
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

export interface CustomerScenario {
  id: string;
  title: string;
  client: string;
  budget: number;
  description: string;
  minRam: number;
  needsGpu: boolean;
  minCores: number;
  needsFastSsd: boolean;
  minPsu: number;
}

export const SCENARIOS: CustomerScenario[] = [
  {
    id: 'office',
    title: "1. Byudjetli Ofis Kompyuteri",
    client: "Buxgalteriya va Hujjatlar Bo‘limi",
    budget: 450,
    description: "Word, Excel, 1C dasturi va veb-brauzer uchun barqaror kompyuter. Qimmat video karta shart emas, lekin tezkor SSD bo‘lishi lozim.",
    minRam: 8,
    needsGpu: false,
    minCores: 4,
    needsFastSsd: false,
    minPsu: 350,
  },
  {
    id: 'developer',
    title: "2. Dasturchi Ish Stansiyasi",
    client: "Senior Backend / Fullstack Dasturchi",
    budget: 1300,
    description: "Docker konteynerlar, IDE (VS Code/IntelliJ), virtual mashinalar va katta loyihalarni tezkor kompilatsiya qilish uchun ko‘p yadroli CPU va 32GB RAM kerak.",
    minRam: 32,
    needsGpu: false,
    minCores: 8,
    needsFastSsd: true,
    minPsu: 550,
  },
  {
    id: 'design',
    title: "3. 3D Dizayn & Grafik Stansiya",
    client: "3D Motion Dizayner (Blender / Maya)",
    budget: 2200,
    description: "3D modellashtirish, viewport tezligi va GPU render (CUDA/OptiX). Kuchli grafik karta (RTX), 32GB RAM va tezkor M.2 SSD zarur.",
    minRam: 32,
    needsGpu: true,
    minCores: 8,
    needsFastSsd: true,
    minPsu: 750,
  },
  {
    id: 'video',
    title: "4. 4K Video Montaj & Post-Production",
    client: "Kino va Reklama Studiyasi",
    budget: 3100,
    description: "4K RAW video montaj (DaVinci Resolve, Premiere Pro), ko‘p qatlamli effektlar. 64GB RAM, eng yuqori IOPS NVMe SSD va katta arxiv uchun 4TB HDD.",
    minRam: 64,
    needsGpu: true,
    minCores: 12,
    needsFastSsd: true,
    minPsu: 850,
  },
];

export const CPU_OPTIONS = [
  { id: 'i3', name: "Intel Core i3-13100 (4 yadro, 4.5 GHz)", price: 95, cores: 4, power: 65, tier: 1 },
  { id: 'r5', name: "AMD Ryzen 5 7600 (6 yadro, 5.1 GHz)", price: 190, cores: 6, power: 65, tier: 2 },
  { id: 'i7', name: "Intel Core i7-14700K (20 yadro, 5.6 GHz)", price: 380, cores: 20, power: 250, tier: 4 },
  { id: 'r9', name: "AMD Ryzen 9 7950X (16 yadro, 5.7 GHz)", price: 540, cores: 16, power: 170, tier: 5 },
];

export const RAM_OPTIONS = [
  { id: 'ram8', name: "8 GB DDR4 3200 MHz", price: 25, gb: 8 },
  { id: 'ram16', name: "16 GB DDR4 3200 MHz", price: 45, gb: 16 },
  { id: 'ram32', name: "32 GB (2x16) DDR5 6000 MHz", price: 110, gb: 32 },
  { id: 'ram64', name: "64 GB (2x32) DDR5 6000 MHz", price: 210, gb: 64 },
];

export const GPU_OPTIONS = [
  { id: 'igpu', name: "Integratsiyalangan Intel/AMD Grafik", price: 0, power: 15, tier: 0 },
  { id: 'gtx1650', name: "GeForce GTX 1650 (4 GB GDDR6)", price: 140, power: 75, tier: 1 },
  { id: 'rtx4060', name: "GeForce RTX 4060 (8 GB GDDR6)", price: 310, power: 115, tier: 3 },
  { id: 'rtx4070ti', name: "GeForce RTX 4070 Ti Super (16 GB)", price: 790, power: 285, tier: 4 },
  { id: 'rtx4090', name: "GeForce RTX 4090 (24 GB GDDR6X)", price: 1750, power: 450, tier: 5 },
];

export const STORAGE_OPTIONS = [
  { id: 'hdd1tb', name: "1 TB HDD 7200 RPM (Arxiv uchun)", price: 45, isSsd: false, isFast: false, power: 10 },
  { id: 'sata512', name: "512 GB 2.5\" SATA SSD (550 MB/s)", price: 35, isSsd: true, isFast: false, power: 5 },
  { id: 'nvme1tb', name: "1 TB M.2 NVMe Gen4 SSD (7000 MB/s)", price: 85, isSsd: true, isFast: true, power: 7 },
  { id: 'nvme2tb_gen5', name: "2 TB M.2 NVMe Gen5 SSD (14000 MB/s)", price: 240, isSsd: true, isFast: true, power: 12 },
  { id: 'combo', name: "1 TB NVMe SSD (Tizim) + 4 TB HDD (Arxiv)", price: 165, isSsd: true, isFast: true, power: 18 },
];

export const PSU_OPTIONS = [
  { id: 'psu400', name: "400W Standart Quvvat Bloki", price: 35, watts: 400 },
  { id: 'psu600', name: "600W 80+ Bronze Quvvat Bloki", price: 60, watts: 600 },
  { id: 'psu750', name: "750W 80+ Gold Modulli Blok", price: 110, watts: 750 },
  { id: 'psu1000', name: "1000W 80+ Platinum Flagman Blok", price: 190, watts: 1000 },
];

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game2PCBuilder: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedCpu, setSelectedCpu] = useState(CPU_OPTIONS[0]);
  const [selectedRam, setSelectedRam] = useState(RAM_OPTIONS[0]);
  const [selectedGpu, setSelectedGpu] = useState(GPU_OPTIONS[0]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[1]);
  const [selectedPsu, setSelectedPsu] = useState(PSU_OPTIONS[0]);

  const [evaluation, setEvaluation] = useState<{
    score: number;
    grade: 'A+' | 'A' | 'B' | 'C' | 'F';
    feedback: string[];
    isSuccess: boolean;
  } | null>(null);

  const scenario = SCENARIOS[currentScenarioIdx];

  const totalCost = 
    selectedCpu.price + 
    selectedRam.price + 
    selectedGpu.price + 
    selectedStorage.price + 
    selectedPsu.price + 
    80; // Base case, cooling & motherboard

  const estimatedPower = 60 + selectedCpu.power + selectedGpu.power + selectedStorage.power + 20;

  const handleTestBuild = () => {
    sound.playClick();
    const feedback: string[] = [];
    let score = 100;

    // 1. Budget check
    if (totalCost > scenario.budget) {
      score -= 30;
      feedback.push(`Byudjet oshib ketdi! Belgilangan: $${scenario.budget}, sarflangan: $${totalCost} (Jarima: -30 ball).`);
    } else if (totalCost < scenario.budget * 0.65 && scenario.id !== 'office') {
      score -= 15;
      feedback.push(`Byudjet to‘liq ishlatilmadi, mijoz kuchliroq tizim kutgandi (Jarima: -15 ball).`);
    }

    // 2. RAM check
    if (selectedRam.gb < scenario.minRam) {
      score -= 30;
      feedback.push(`RAM yetarli emas! ${scenario.title} uchun kamida ${scenario.minRam} GB talab qilinadi (Jarima: -30 ball).`);
    }

    // 3. GPU check
    if (scenario.needsGpu && selectedGpu.tier < 3) {
      score -= 35;
      feedback.push(`Grafik karta kuchi kam! Ushbu vazifaga kamida RTX darajasidagi GPU kerak (Jarima: -35 ball).`);
    } else if (!scenario.needsGpu && selectedGpu.tier >= 4) {
      score -= 20;
      feedback.push(`Ortiqcha xarajat! Oddiy vazifaga qimmat videokarta tanlangan (Jarima: -20 ball).`);
    }

    // 4. CPU cores
    if (selectedCpu.cores < scenario.minCores) {
      score -= 25;
      feedback.push(`Protsessor yadrolari kam! Kamida ${scenario.minCores} yadroli CPU tanlang (Jarima: -25 ball).`);
    }

    // 5. Storage check
    if (!selectedStorage.isSsd) {
      score -= 40;
      feedback.push(`Operatsion tizim uchun faqat HDD tanlandi! Zamonaviy PC da tizim uchun SSD bo‘lishi shart (Jarima: -40 ball).`);
    } else if (scenario.needsFastSsd && !selectedStorage.isFast) {
      score -= 15;
      feedback.push(`SATA SSD ushbu vazifa uchun sekinlik qiladi, tezkor NVMe SSD tavsiya etiladi (Jarima: -15 ball).`);
    }

    // 6. Power Supply check
    if (selectedPsu.watts < estimatedPower * 1.2) {
      score -= 35;
      feedback.push(`Quvvat bloki xavfli darajada kichik! Tizim pik yuklamada o‘chib qolishi mumkin (${estimatedPower}W kerak, tanlangan: ${selectedPsu.watts}W) (Jarima: -35 ball).`);
    }

    // 7. Bottleneck detection
    if (selectedCpu.tier <= 1 && selectedGpu.tier >= 4) {
      score -= 20;
      feedback.push(`Kuchli Bottleneck! Zaif protsessor kuchli videokartani to‘liq ochib bera olmaydi.`);
    }

    const finalScore = Math.max(0, score);
    let grade: 'A+' | 'A' | 'B' | 'C' | 'F' = 'F';
    if (finalScore >= 95) grade = 'A+';
    else if (finalScore >= 80) grade = 'A';
    else if (finalScore >= 65) grade = 'B';
    else if (finalScore >= 50) grade = 'C';

    const isSuccess = finalScore >= 70;

    if (isSuccess) {
      sound.playLevelUp();
      confetti({ particleCount: 50, spread: 60 });
      const coins = grade === 'A+' ? 50 : 30;
      const xp = grade === 'A+' ? 150 : 100;
      onFinish(finalScore, coins, xp);
    } else {
      sound.playError();
    }

    setEvaluation({
      score: finalScore,
      grade,
      feedback: feedback.length > 0 ? feedback : ["Ajoyib muhandislik! Tizim to‘liq mos, optimal va muvozanatli yig‘ildi."],
      isSuccess,
    });
  };

  const nextScenario = () => {
    sound.playClick();
    setCurrentScenarioIdx(prev => (prev + 1) % SCENARIOS.length);
    setEvaluation(null);
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-5xl mx-auto shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              2 & 13-Amaliy · Strategiya
            </span>
            <span className="text-xs font-mono text-slate-400">PC Yig‘uvchi Simulyatori</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">PC Konfigurator & Bottleneck Ovchisi</h2>
        </div>

        <button
          onClick={nextScenario}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
        >
          Keyingi Buyurtma ({currentScenarioIdx + 1}/{SCENARIOS.length}) ➔
        </button>
      </div>

      {/* Scenario Brief Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-cyan-950/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Mijoz Vazifasi:</div>
          <h3 className="text-lg font-black text-white">{scenario.title}</h3>
          <p className="text-xs text-slate-300 max-w-2xl">{scenario.description}</p>
        </div>

        <div className="flex items-center space-x-4 shrink-0 bg-[#070B14] px-4 py-2.5 rounded-xl border border-[#1A2642]">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Maks. Byudjet</div>
            <div className="text-xl font-black text-emerald-400 font-mono">${scenario.budget}</div>
          </div>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CPU Selector */}
        <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center"><Cpu className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Protsessor (CPU)</span>
            <span className="font-mono text-cyan-400">${selectedCpu.price}</span>
          </label>
          <select
            value={selectedCpu.id}
            onChange={(e) => setSelectedCpu(CPU_OPTIONS.find(c => c.id === e.target.value)!)}
            className="w-full bg-[#0D1424] border border-[#1A2642] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {CPU_OPTIONS.map(c => (
              <option key={c.id} value={c.id}>{c.name} — ${c.price}</option>
            ))}
          </select>
        </div>

        {/* RAM Selector */}
        <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center"><Layers className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Operativ Xotira (RAM)</span>
            <span className="font-mono text-cyan-400">${selectedRam.price}</span>
          </label>
          <select
            value={selectedRam.id}
            onChange={(e) => setSelectedRam(RAM_OPTIONS.find(r => r.id === e.target.value)!)}
            className="w-full bg-[#0D1424] border border-[#1A2642] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {RAM_OPTIONS.map(r => (
              <option key={r.id} value={r.id}>{r.name} — ${r.price}</option>
            ))}
          </select>
        </div>

        {/* GPU Selector */}
        <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center"><Monitor className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Videokarta (GPU)</span>
            <span className="font-mono text-cyan-400">${selectedGpu.price}</span>
          </label>
          <select
            value={selectedGpu.id}
            onChange={(e) => setSelectedGpu(GPU_OPTIONS.find(g => g.id === e.target.value)!)}
            className="w-full bg-[#0D1424] border border-[#1A2642] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {GPU_OPTIONS.map(g => (
              <option key={g.id} value={g.id}>{g.name} — ${g.price}</option>
            ))}
          </select>
        </div>

        {/* Storage Selector */}
        <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center"><HardDrive className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Saqlash Xotirasi (SSD/HDD)</span>
            <span className="font-mono text-cyan-400">${selectedStorage.price}</span>
          </label>
          <select
            value={selectedStorage.id}
            onChange={(e) => setSelectedStorage(STORAGE_OPTIONS.find(s => s.id === e.target.value)!)}
            className="w-full bg-[#0D1424] border border-[#1A2642] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {STORAGE_OPTIONS.map(s => (
              <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
            ))}
          </select>
        </div>

        {/* PSU Selector */}
        <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2 md:col-span-2">
          <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <span className="flex items-center"><Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" /> Quvvat Bloki (PSU)</span>
            <span className="font-mono text-cyan-400">${selectedPsu.price}</span>
          </label>
          <select
            value={selectedPsu.id}
            onChange={(e) => setSelectedPsu(PSU_OPTIONS.find(p => p.id === e.target.value)!)}
            className="w-full bg-[#0D1424] border border-[#1A2642] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
          >
            {PSU_OPTIONS.map(p => (
              <option key={p.id} value={p.id}>{p.name} — ${p.price}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Financial & Power HUD */}
      <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Jami Xarajat (Plata va Kuler bilan)</div>
            <div className={`text-2xl font-black font-mono ${totalCost <= scenario.budget ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${totalCost} / ${scenario.budget}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Taxminiy Quvvat Iste’moli</div>
            <div className={`text-xl font-black font-mono ${selectedPsu.watts >= estimatedPower * 1.2 ? 'text-cyan-400' : 'text-amber-400'}`}>
              ~{estimatedPower}W (Blok: {selectedPsu.watts}W)
            </div>
          </div>
        </div>

        <button
          onClick={handleTestBuild}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-black text-sm shadow-glow-indigo transition-transform hover:scale-105"
        >
          🔍 Tizimni Tekshirish & Baholash
        </button>
      </div>

      {/* Evaluation Results */}
      {evaluation && (
        <div className={`p-6 rounded-3xl border-2 space-y-4 animate-fadeIn ${
          evaluation.isSuccess ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-rose-950/20 border-rose-500/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`text-3xl font-black px-3.5 py-1 rounded-2xl font-mono ${
                evaluation.grade === 'A+' ? 'bg-emerald-500 text-black' :
                evaluation.grade === 'A' ? 'bg-teal-500 text-black' :
                evaluation.grade === 'B' ? 'bg-amber-500 text-black' : 'bg-rose-500 text-white'
              }`}>
                {evaluation.grade}
              </span>
              <div>
                <h4 className="text-lg font-bold text-white">
                  {evaluation.isSuccess ? "Buyurtma Muvaffaqiyatli Qabul Qilindi!" : "Xatoliklar Bor! Tizimni Qayta Ko‘rib Chiqing"}
                </h4>
                <p className="text-xs text-slate-300">
                  Moslik balli: <strong className="font-mono">{evaluation.score} / 100</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Feedback points */}
          <div className="space-y-1.5 pt-2">
            {evaluation.feedback.map((f, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs">
                {evaluation.isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <span className="text-slate-300">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
