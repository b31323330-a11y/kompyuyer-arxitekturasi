import React, { useState } from 'react';
import { 
  Server, 
  ShieldAlert, 
  Gauge, 
  Cpu, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle,
  Sparkles,
  Layers,
  HardDrive
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { 
  createRaidArray, 
  evaluateRaidHealth, 
  RaidLevel, 
  BACKUP_SCENARIOS 
} from '../../engines/raidEngine';
import { 
  PCIE_GENERATIONS, 
  calculatePcieBandwidth, 
  CXL_PROTOCOLS 
} from '../../engines/busEngine';

interface PCBuilderRaidViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

export const PCBuilderRaidView: React.FC<PCBuilderRaidViewProps> = ({
  onAddXp,
  onUnlockAchievement,
}) => {
  const [activeTab, setActiveTab] = useState<'pc' | 'raid' | 'bus'>('raid');

  // ---------------- RAID SIMULATOR STATE ----------------
  const [raidLevel, setRaidLevel] = useState<RaidLevel>(5);
  const [numDisks, setNumDisks] = useState(4);
  const [diskSize, setDiskSize] = useState(4); // 4 TB each
  const [raidArray, setRaidArray] = useState(() => createRaidArray(5, 4, 4));

  const updateRaidConfig = (level: RaidLevel, n: number, s: number) => {
    sounds.playClick();
    setRaidLevel(level);
    setNumDisks(n);
    setDiskSize(s);
    setRaidArray(createRaidArray(level, n, s));
  };

  const handleFailDisk = (diskId: number) => {
    sounds.playError();
    setRaidArray(prev => {
      const copy = { ...prev, disks: [...prev.disks] };
      copy.disks[diskId] = {
        ...copy.disks[diskId],
        health: copy.disks[diskId].health === 'failed' ? 'online' : 'failed',
      };
      return copy;
    });
  };

  const handleRebuild = () => {
    sounds.playSuccess();
    confetti({ particleCount: 60, spread: 50 });
    onAddXp(30, "RAID muvaffaqiyatli tiklandi");
    onUnlockAchievement("raid_survivor");

    setRaidArray(prev => ({
      ...prev,
      disks: prev.disks.map(d => ({ ...d, health: 'online' })),
    }));
  };

  const raidHealth = evaluateRaidHealth(raidArray);

  // ---------------- PC BUILDER STATE ----------------
  const [targetWorkload, setTargetWorkload] = useState<'office' | 'dev' | 'design' | 'video'>('dev');
  const [selectedCpu, setSelectedCpu] = useState('Intel Core i5 / Ryzen 5');
  const [selectedRam, setSelectedRam] = useState('16 GB DDR5');
  const [selectedStorage, setSelectedStorage] = useState('1 TB NVMe SSD');
  const [selectedGpu, setSelectedGpu] = useState('Integrated Graphics');

  const pcBuildValidations: Record<string, { ok: boolean; advice: string }> = {
    office: {
      ok: true,
      advice: "Ofis ishlari uchun energiya tejamkor protsessor va 8-16 GB RAM to‘liq yetarli.",
    },
    dev: {
      ok: selectedRam.includes('16') || selectedRam.includes('32'),
      advice: selectedRam.includes('8') ? "Dasturlash (Docker, IDE) uchun kamida 16 GB RAM tavsiya etiladi!" : "Ajoyib balanslangan dasturchi ish stansiyasi.",
    },
    video: {
      ok: selectedRam.includes('32') || selectedRam.includes('64'),
      advice: selectedRam.includes('8') || selectedRam.includes('16') ? "4K Video montaj uchun kamida 32 GB RAM va kuchli GPU kerak!" : "Kuchli 4K montaj konfiguratsiyasi.",
    },
  };

  // ---------------- PCIE & CXL STATE ----------------
  const [pcieGen, setPcieGen] = useState<string>('4.0');
  const [pcieLanes, setPcieLanes] = useState<number>(16);
  const [pcieDuplex, setPcieDuplex] = useState<'simplex' | 'duplex'>('simplex');

  const pcieBandwidth = calculatePcieBandwidth(pcieGen, pcieLanes, pcieDuplex);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
            <Server className="w-3.5 h-3.5" />
            <span>2, 13, 15, 16-amaliy mashg‘ulotlar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            PC Builder, RAID & Zamonaviy Shinalar
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Kompyuter konfiguratori, RAID 0..10 inqiroz simulyatori va PCIe 3.0–7.0 / CXL o‘tkazuvchanlik markazi.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('raid'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'raid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            RAID Inqiroz Simulyatori
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('bus'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bus' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            PCIe 7.0 & CXL Shinalari
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('pc'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pc' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            PC Konfigurator (2-amaliy)
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: RAID Simulator ---------------- */}
      {activeTab === 'raid' && (
        <div className="space-y-6">
          {/* RAID Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400">RAID darajasi:</span>
              {([0, 1, 5, 6, 10] as RaidLevel[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => updateRaidConfig(lvl, lvl === 1 ? 2 : lvl === 6 ? 4 : 4, diskSize)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    raidLevel === lvl ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                  }`}
                >
                  RAID {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-400">Disklar soni:</span>
              <select
                value={numDisks}
                onChange={(e) => updateRaidConfig(raidLevel, Number(e.target.value), diskSize)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-white font-mono"
              >
                {raidLevel === 1 ? (
                  <option value={2}>2 ta disk (Mirror)</option>
                ) : raidLevel === 6 ? (
                  <>
                    <option value={4}>4 ta disk</option>
                    <option value={6}>6 ta disk</option>
                    <option value={8}>8 ta disk</option>
                  </>
                ) : raidLevel === 10 ? (
                  <>
                    <option value={4}>4 ta disk (2 juftlik)</option>
                    <option value={6}>6 ta disk (3 juftlik)</option>
                  </>
                ) : (
                  <>
                    <option value={3}>3 ta disk</option>
                    <option value={4}>4 ta disk</option>
                    <option value={5}>5 ta disk</option>
                    <option value={6}>6 ta disk</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between flex-wrap gap-3 ${
            raidHealth.status === 'OPTIMAL'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
              : raidHealth.status === 'DEGRADED'
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 animate-pulse'
              : 'bg-rose-950/50 border-rose-500 text-rose-200'
          }`}>
            <div className="flex items-center space-x-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block">
                  Massiv Holati: {raidHealth.status}
                </span>
                <span className="text-xs">{raidHealth.message}</span>
              </div>
            </div>

            {raidHealth.status === 'DEGRADED' && (
              <button
                onClick={handleRebuild}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md"
              >
                Diskni almashtirish & Rebuild
              </button>
            )}
          </div>

          {/* RAID Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Foydali Sig‘im</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {raidArray.usableTb} TB
              </div>
              <span className="text-[10px] text-slate-400">Jami xom sig‘im: {raidArray.totalRawTb} TB</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Nosozlik Chidamliligi</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {raidArray.faultToleranceDisks} ta disk
              </div>
              <span className="text-[10px] text-slate-400">Bir vaqtda ruxsat etilgan limit</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Write Penalty</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {raidArray.writePenalty}x I/O
              </div>
              <span className="text-[10px] text-slate-400">Har bir yozishdagi amallar soni</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Paritet Himoyasi</span>
              <div className="text-sm font-bold text-white mt-2">
                {raidLevel === 0 ? "Yo‘q (Stripe)" : raidLevel === 1 ? "Mirror (Ko‘zgu)" : raidLevel === 5 ? "Yagona Paritet (P)" : raidLevel === 6 ? "Ikkitalik (P+Q)" : "Mirror + Stripe"}
              </div>
            </div>
          </div>

          {/* Interactive Disks & Blocks Visual */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                Disklar bloklari: Sinash uchun ixtiyoriy diskni "Ishdan chiqarish" tugmasini bosing:
              </span>
            </div>

            <div className={`grid gap-4 ${raidArray.disks.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-6'}`}>
              {raidArray.disks.map((disk) => {
                const isFailed = disk.health === 'failed';
                return (
                  <div
                    key={disk.id}
                    className={`rounded-2xl border p-4 space-y-3 transition-all ${
                      isFailed
                        ? 'bg-rose-950/40 border-rose-500/80'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <HardDrive className={`w-4 h-4 ${isFailed ? 'text-rose-400' : 'text-cyan-400'}`} />
                        <span className="text-xs font-bold text-white">{disk.name}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        isFailed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {disk.health}
                      </span>
                    </div>

                    {/* Stripe Blocks */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      {disk.blocks.map((blk, bIdx) => (
                        <div
                          key={bIdx}
                          className={`p-1.5 rounded-lg text-center font-bold border ${
                            isFailed
                              ? 'bg-slate-900 text-slate-600 border-slate-800'
                              : blk.isParity
                              ? 'bg-purple-950 text-purple-300 border-purple-800/60'
                              : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {isFailed ? "XATO" : blk.label}
                        </div>
                      ))}
                    </div>

                    {/* Break / Fix Button */}
                    <button
                      onClick={() => handleFailDisk(disk.id)}
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        isFailed
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-rose-600/80 hover:bg-rose-600 text-white'
                      }`}
                    >
                      {isFailed ? "Qayta ulash" : "Ishdan chiqarish"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3-2-1 Rule Card */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-indigo-400 text-sm block">⚠️ Muhim Eslatma (15-amaliy):</span>
            <p>
              <strong>RAID backup emas!</strong> Agar foydalanuvchi faylni tasodifan o‘chirsa yoki ransomware shifrlasa, RAID 1/5/6 bu o‘zgarishni bir zumda barcha disklarga aks ettiradi. Ma’lumotlarni faqatgina <strong>3-2-1 zaxira qoidasi</strong> (3 ta nusxa, 2 xil tashuvchi vosita, kamida 1 ta nusxa boshqa manzilda) himoya qila oladi.
            </p>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: PCIe & CXL Bus ---------------- */}
      {activeTab === 'bus' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                16-Amaliy: Nuqtadan-Nuqtaga Interkonnektlar
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-2">
                PCI Express 3.0–7.0 O‘tkazuvchanlik Kalkulyatori
              </h3>
            </div>

            {/* Generation & Lanes Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">PCIe Avlodi:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.keys(PCIE_GENERATIONS).map(g => (
                    <button
                      key={g}
                      onClick={() => setPcieGen(g)}
                      className={`py-2 rounded-xl text-xs font-bold ${
                        pcieGen === g ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      Gen {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Lane kengligi (Link width):</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 4, 8, 16].map(l => (
                    <button
                      key={l}
                      onClick={() => setPcieLanes(l)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold ${
                        pcieLanes === l ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      x{l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Yo‘nalish:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setPcieDuplex('simplex')}
                    className={`py-2 rounded-xl text-xs font-bold ${
                      pcieDuplex === 'simplex' ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}
                  >
                    Simplex (Bir)
                  </button>
                  <button
                    onClick={() => setPcieDuplex('duplex')}
                    className={`py-2 rounded-xl text-xs font-bold ${
                      pcieDuplex === 'duplex' ? 'bg-slate-800 text-white border border-slate-600' : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}
                  >
                    Full Duplex (Ikki)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-indigo-500/40 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  PCIe {pcieGen} x{pcieLanes} ({pcieDuplex}) O‘tkazuvchanligi:
                </span>
                <div className="text-4xl md:text-5xl font-black text-cyan-300 font-mono mt-1">
                  {pcieBandwidth.gbPerSec} <span className="text-2xl font-normal text-slate-400">GB/s</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Xom signal: {pcieBandwidth.rawGtPerSec} GT/s · Kodlash samaradorligi: ~{pcieBandwidth.efficiencyPct}%
                </span>
              </div>

              <div className="text-right text-xs text-slate-400 max-w-xs leading-relaxed">
                {PCIE_GENERATIONS[pcieGen].description}
              </div>
            </div>

            {/* CXL Protocols Reference */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                CXL (Compute Express Link) Protokol Qatlamlari:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CXL_PROTOCOLS.map(cxl => (
                  <div key={cxl.name} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-xs text-white font-mono">{cxl.name}</span>
                    <p className="text-[11px] text-slate-300">{cxl.role}</p>
                    <span className="text-[10px] text-cyan-400 block">Kechikish: {cxl.latencyRequirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: PC Configurator ---------------- */}
      {activeTab === 'pc' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                2-Amaliy Mashg‘ulot
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white mt-2">
                PC Konfiguratori: Vazifaga Mos Qurilmalar Tanlash
              </h3>
            </div>

            {/* Workload Profile selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Foydalanish maqsadi:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'office', label: "Ofis va Ta’lim" },
                  { id: 'dev', label: "Dasturlash / Server" },
                  { id: 'design', label: "Grafik Dizayn" },
                  { id: 'video', label: "4K Video Montaj" },
                ].map(w => (
                  <button
                    key={w.id}
                    onClick={() => setTargetWorkload(w.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-center ${
                      targetWorkload === w.id ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Components Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">RAM hajmi:</label>
                <select
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="8 GB DDR4">8 GB DDR4</option>
                  <option value="16 GB DDR5">16 GB DDR5</option>
                  <option value="32 GB DDR5">32 GB DDR5</option>
                  <option value="64 GB DDR5">64 GB DDR5</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Birlamchi Saqlash vositasi:</label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="1 TB SATA HDD (Sekin)">1 TB SATA HDD (Sekin)</option>
                  <option value="500 GB SATA SSD">500 GB SATA SSD</option>
                  <option value="1 TB NVMe SSD (PCIe 4.0)">1 TB NVMe SSD (PCIe 4.0)</option>
                  <option value="2 TB NVMe SSD (PCIe 5.0)">2 TB NVMe SSD (PCIe 5.0)</option>
                </select>
              </div>
            </div>

            {/* Validation Feedback */}
            <div className={`p-4 rounded-2xl border text-xs ${
              pcBuildValidations[targetWorkload]?.ok 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <strong className="block mb-1">{pcBuildValidations[targetWorkload]?.ok ? "✅ To‘g‘ri muvozanat:" : "⚠️ Tavsiya:"}</strong>
              {pcBuildValidations[targetWorkload]?.advice}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
