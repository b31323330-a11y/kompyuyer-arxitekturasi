import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Cpu,
  Layers,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  HardDrive
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEngine';

interface RaidBusViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

type RaidType = '0' | '1' | '5' | '6' | '10';

export const RaidBusView: React.FC<RaidBusViewProps> = ({
  onAddXp,
  onUnlockAchievement
}) => {
  const [activeMode, setActiveMode] = useState<'sandbox' | 'missions'>('sandbox');
  const [sandboxSubTab, setSandboxSubTab] = useState<'raid' | 'pcie'>('raid');

  // ==========================================
  // RAID SIMULATOR STATE
  // ==========================================
  const [raidLevel, setRaidLevel] = useState<RaidType>('5');
  const [diskCount, setDiskCount] = useState<number>(4);
  const [diskSizeTb, setDiskSizeTb] = useState<number>(4); // TB
  const [diskStatus, setDiskStatus] = useState<('online' | 'failed')[]>([
    'online', 'online', 'online', 'online'
  ]);
  const [isRebuilding, setIsRebuilding] = useState<boolean>(false);
  const [rebuildProgress, setRebuildProgress] = useState<number>(0);
  const [ransomwareActive, setRansomwareActive] = useState<boolean>(false);
  const [backupRestored, setBackupRestored] = useState<boolean>(false);

  // Sync disk count
  const handleDiskCountChange = (count: number) => {
    sound.playClick();
    setDiskCount(count);
    setDiskStatus(new Array(count).fill('online'));
    setIsRebuilding(false);
  };

  // Toggle individual disk failure
  const handleToggleDisk = (index: number) => {
    sound.playWarningAlarm();
    setDiskStatus(prev => {
      const next = [...prev];
      next[index] = next[index] === 'online' ? 'failed' : 'online';
      return next;
    });
  };

  // Calculate Capacity
  const getCapacityInfo = () => {
    const N = diskCount;
    const S = diskSizeTb;
    let usable = 0;
    let faultTolerance = "";
    let penalty = "";

    switch (raidLevel) {
      case '0':
        usable = N * S;
        faultTolerance = "0 ta disk (1 ta disk yonsa barcha ma’lumot yo‘qoladi)";
        penalty = "1 IO (Penalty yo‘q, eng tez)";
        break;
      case '1':
        usable = S;
        faultTolerance = `${N - 1} ta disk (Oyna nusxa)`;
        penalty = "2 IO (Har bir diskka yozish)";
        break;
      case '5':
        usable = Math.max(0, (N - 1) * S);
        faultTolerance = "1 ta disk nosozligiga chidaydi (Taqsimlangan Parity)";
        penalty = "4 IO (2 ta o‘qish + 2 ta yozish)";
        break;
      case '6':
        usable = Math.max(0, (N - 2) * S);
        faultTolerance = "2 ta disk nosozligiga chidaydi (Dual Parity P+Q)";
        penalty = "6 IO (3 ta o‘qish + 3 ta yozish)";
        break;
      case '10':
        usable = (N / 2) * S;
        faultTolerance = "Har bir mirror juftlikdan 1 tadan disk";
        penalty = "2 IO";
        break;
    }
    return { usable, faultTolerance, penalty };
  };

  const { usable, faultTolerance, penalty } = getCapacityInfo();
  const failedDisks = diskStatus.filter(s => s === 'failed').length;

  const getArrayHealth = () => {
    if (raidLevel === '0' && failedDisks > 0) return 'DEAD';
    if (raidLevel === '1' && failedDisks >= diskCount) return 'DEAD';
    if (raidLevel === '5') {
      if (failedDisks === 1) return 'DEGRADED';
      if (failedDisks > 1) return 'DEAD';
    }
    if (raidLevel === '6') {
      if (failedDisks <= 2 && failedDisks > 0) return 'DEGRADED';
      if (failedDisks > 2) return 'DEAD';
    }
    if (raidLevel === '10') {
      if (failedDisks === 1) return 'DEGRADED';
      if (failedDisks > 1) return 'DEGRADED / RISK';
    }
    return 'HEALTHY';
  };

  const arrayHealth = getArrayHealth();

  const handleStartRebuild = () => {
    sound.playClick();
    setIsRebuilding(true);
    setRebuildProgress(0);

    const interval = setInterval(() => {
      setRebuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRebuilding(false);
          setDiskStatus(new Array(diskCount).fill('online'));
          sound.playSuccess();
          confetti({ particleCount: 70, spread: 60 });
          onAddXp(80, "RAID massivi muvaffaqiyatli tiklandi");
          onUnlockAchievement('raid_rescuer');
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  // Ransomware simulation
  const handleRansomwareAttack = () => {
    sound.playWarningAlarm();
    setRansomwareActive(true);
    setBackupRestored(false);
  };

  const handleRestore321 = () => {
    sound.playSuccess();
    setRansomwareActive(false);
    setBackupRestored(true);
    confetti({ particleCount: 80, spread: 70 });
    onAddXp(100, "3-2-1 zaxira orqali ma'lumotlar qutqarildi");
  };

  // ==========================================
  // PCIE & CXL SIMULATOR STATE
  // ==========================================
  const [pcieGen, setPcieGen] = useState<number>(5); // 3, 4, 5, 6, 7
  const [laneCount, setLaneCount] = useState<number>(16); // 1, 4, 8, 16
  const [slotLimitGen, setSlotLimitGen] = useState<number>(5); // Backward compat slot
  const [activeCxlProtocol, setActiveCxlProtocol] = useState<'io' | 'cache' | 'mem'>('mem');

  const getPcieInfo = () => {
    // Effective Gen considering backward compatibility
    const effectiveGen = Math.min(pcieGen, slotLimitGen);
    let gtPerSec = 8;
    let encodingEfficiency = 128 / 130; // 98.46%

    if (effectiveGen === 3) gtPerSec = 8;
    else if (effectiveGen === 4) gtPerSec = 16;
    else if (effectiveGen === 5) gtPerSec = 32;
    else if (effectiveGen === 6) {
      gtPerSec = 64; // PAM4
      encodingEfficiency = 0.965; // FLIT / FEC
    } else if (effectiveGen === 7) {
      gtPerSec = 128; // PAM4 + FLIT
      encodingEfficiency = 0.965;
    }

    // Bandwidth calculation: (GT/s * efficiency * lanes) / 8 = GB/s (simplex)
    const simplexGbps = (gtPerSec * encodingEfficiency * laneCount) / 8;
    const duplexGbps = simplexGbps * 2;

    return { effectiveGen, gtPerSec, simplexGbps, duplexGbps, isThrottled: pcieGen > slotLimitGen };
  };

  const pcieMetrics = getPcieInfo();

  // ==========================================
  // MISSIONS STATE
  // ==========================================
  const [missionIndex, setMissionIndex] = useState<number>(1);
  const [mission1Solved, setMission1Solved] = useState<boolean>(false);
  const [mission2Solved, setMission2Solved] = useState<boolean>(false);
  const [mission3Solved, setMission3Solved] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0C1528] via-[#0E1E3D] to-[#0A1224] border border-[#1E2E4E] p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  15 & 16-AMALIY MASHG‘ULOT
                </span>
                <span className="text-xs font-mono text-slate-400">RAID & PCIE/CXL BUS</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                RAID Inqiroz & PCIe/CXL Shinalar Simulyatori
              </h2>
              <p className="text-xs text-slate-400">
                RAID 0/1/5/6/10 nosozligi, Parity va 3-2-1 backup qoidasi hamda PCIe 3.0–7.0 va CXL 4.0 topologiyasi
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 bg-[#080E1C] p-1.5 rounded-2xl border border-[#1A2642]">
            <button
              onClick={() => { sound.playClick(); setActiveMode('sandbox'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeMode === 'sandbox'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔬 Erkin Tajriba (Sandbox)</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveMode('missions'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeMode === 'missions'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🎯 O‘yin Missiyasi (Topshiriq)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SANDBOX */}
      {/* ========================================================================= */}
      {activeMode === 'sandbox' && (
        <div className="space-y-6">
          {/* Sub-tab selection (RAID vs PCIe) */}
          <div className="flex space-x-2 bg-[#0A1020] p-1.5 rounded-2xl border border-[#182642] w-fit">
            <button
              onClick={() => setSandboxSubTab('raid')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sandboxSubTab === 'raid' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🛡️ RAID Massiv & 3-2-1 Qutqaruv (15-amaliy)
            </button>
            <button
              onClick={() => setSandboxSubTab('pcie')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sandboxSubTab === 'pcie' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚀 PCIe 3.0–7.0 & CXL 4.0 Shinalari (16-amaliy)
            </button>
          </div>

          {/* 1. RAID SIMULATOR */}
          {sandboxSubTab === 'raid' && (
            <div className="space-y-6">
              <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <Server className="w-5 h-5 text-red-400" />
                      <span>RAID Massiv Konfiguratori & Disk Nosozligi Testi</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Disk ustiga bosib uni ishdan chiqaring va RAID massivining o‘zini tutishini kuzating
                    </p>
                  </div>

                  {/* Array Health Badge */}
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border ${
                      arrayHealth === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                      arrayHealth === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse' :
                      'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-bounce'
                    }`}>
                      Holat: {arrayHealth}
                    </span>
                  </div>
                </div>

                {/* RAID Level Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['0', '1', '5', '6', '10'] as RaidType[]).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => {
                        sound.playClick();
                        setRaidLevel(lvl);
                        if (lvl === '5' && diskCount < 3) handleDiskCountChange(3);
                        if (lvl === '6' && diskCount < 4) handleDiskCountChange(4);
                        if (lvl === '10' && diskCount % 2 !== 0) handleDiskCountChange(4);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        raidLevel === lvl
                          ? 'bg-red-500/20 border-red-500/50 text-white font-bold shadow-md'
                          : 'bg-[#070B16] border-[#142036] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">RAID {lvl}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {lvl === '0' && 'Stripe (Tezlik)'}
                        {lvl === '1' && 'Mirror (Oyna)'}
                        {lvl === '5' && 'Parity (1 ta disk)'}
                        {lvl === '6' && 'Dual Parity (2 disk)'}
                        {lvl === '10' && 'Stripe + Mirror'}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Sliders: N Disks & Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#070B16] p-4 rounded-2xl border border-[#142036]">
                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-slate-300">Disklar Soni (N):</span>
                      <span className="text-red-400">{diskCount} ta disk</span>
                    </div>
                    <input
                      type="range"
                      min={raidLevel === '6' ? 4 : (raidLevel === '5' ? 3 : 2)}
                      max="8"
                      step={raidLevel === '10' ? 2 : 1}
                      value={diskCount}
                      onChange={(e) => handleDiskCountChange(Number(e.target.value))}
                      className="w-full accent-red-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono font-bold mb-1">
                      <span className="text-slate-300">Har bir disk sig‘imi (S):</span>
                      <span className="text-indigo-400">{diskSizeTb} TB</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="16"
                      step="1"
                      value={diskSizeTb}
                      onChange={(e) => setDiskSizeTb(Number(e.target.value))}
                      className="w-full accent-indigo-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Interactive Disks Rack */}
                <div className="bg-[#070B16] p-5 rounded-2xl border border-[#142036] space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Fizik Disklar Javoni (Nosozlik sinovi uchun bosing):</span>
                    {failedDisks > 0 && arrayHealth !== 'DEAD' && !isRebuilding && (
                      <button
                        onClick={handleStartRebuild}
                        className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        🔄 Rebuild Qilishni Boshlash
                      </button>
                    )}
                  </div>

                  {isRebuilding && (
                    <div className="space-y-1 bg-amber-950/20 p-3 rounded-xl border border-amber-500/30">
                      <div className="flex justify-between text-xs font-mono text-amber-300">
                        <span>Rebuild jarayoni:</span>
                        <span>{rebuildProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full transition-all duration-300"
                          style={{ width: `${rebuildProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                    {diskStatus.map((status, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleToggleDisk(idx)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          status === 'online'
                            ? 'bg-[#0B1528] border-emerald-500/40 text-emerald-300 hover:border-red-500'
                            : 'bg-rose-950/40 border-rose-500 text-rose-300 animate-pulse'
                        }`}
                      >
                        <HardDrive className={`w-6 h-6 mx-auto mb-1 ${status === 'online' ? 'text-emerald-400' : 'text-rose-400'}`} />
                        <div className="text-xs font-bold">Disk #{idx + 1}</div>
                        <div className="text-[10px] font-mono mt-0.5">{status === 'online' ? `${diskSizeTb} TB` : 'FAILED ❌'}</div>
                      </button>
                    ))}
                  </div>

                  {/* Calculations Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs">
                    <div className="bg-[#0B1224] p-3 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Foydali Sig‘im:</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">{usable} TB</span>
                      <span className="text-[10px] text-slate-500 block">Jami {diskCount * diskSizeTb} TB dan</span>
                    </div>

                    <div className="bg-[#0B1224] p-3 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Chidamlilik (Fault Tolerance):</span>
                      <span className="text-xs font-bold text-amber-400">{faultTolerance}</span>
                    </div>

                    <div className="bg-[#0B1224] p-3 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Write Penalty (Yozish yuki):</span>
                      <span className="text-xs font-bold text-cyan-400">{penalty}</span>
                    </div>
                  </div>
                </div>

                {/* 3-2-1 BACKUP STRATEGY SECTION */}
                <div className="bg-[#070B16] p-5 rounded-2xl border border-red-500/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span>Nima uchun RAID Backup emas? (Ransomware Hujumi Sinovi)</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        RAID disk nosozligidan himoya qiladi, lekin fayllar o‘chirilsa yoki shifrlansa (ransomware), u barcha disklarda birdek yo‘qoladi!
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleRansomwareAttack}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        ☠️ Ransomware Hujumini Boshlash
                      </button>
                      {ransomwareActive && (
                        <button
                          onClick={handleRestore321}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                        >
                          🛡️ 3-2-1 Zaxiradan Tiklash
                        </button>
                      )}
                    </div>
                  </div>

                  {ransomwareActive && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-300 text-xs font-bold flex items-center justify-between">
                      <span>⚠️ Barcha fayllar shifrlab qo‘yildi! RAID 5 dagi barcha disklar birdek zararlangan.</span>
                    </div>
                  )}

                  {backupRestored && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500 text-emerald-300 text-xs font-bold">
                      ✅ 3-2-1 Qoidasi (3 ta nusxa, 2 xil tashuvchi, 1 ta tashqi Cloud zaxira) orqali barcha ma’lumotlar to‘liq qutqarildi!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. PCIE & CXL SIMULATOR */}
          {sandboxSubTab === 'pcie' && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <span>PCIe 3.0–7.0 & CXL 4.0 Interkonnekt Shinalari</span>
                </h3>
                <p className="text-xs text-slate-400">
                  PCIe avlodlari, lane soni, kodlash samaradorligi va CXL protokollari o‘tkazuvchanlik hisobi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#070B16] p-4 rounded-2xl border border-[#142036]">
                {/* PCIe Device Gen */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Qurilma Avlodi (Device Gen):</label>
                  <select
                    value={pcieGen}
                    onChange={(e) => setPcieGen(Number(e.target.value))}
                    className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                  >
                    <option value={3}>PCIe 3.0 (8 GT/s - 128b/130b)</option>
                    <option value={4}>PCIe 4.0 (16 GT/s - 128b/130b)</option>
                    <option value={5}>PCIe 5.0 (32 GT/s - 128b/130b)</option>
                    <option value={6}>PCIe 6.0 (64 GT/s - PAM4 + FLIT)</option>
                    <option value={7}>PCIe 7.0 (128 GT/s - PAM4 + FLIT)</option>
                  </select>
                </div>

                {/* Motherboard Slot Gen */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Ona Plata Sloti (Slot Gen):</label>
                  <select
                    value={slotLimitGen}
                    onChange={(e) => setSlotLimitGen(Number(e.target.value))}
                    className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                  >
                    <option value={3}>PCIe 3.0 Sloti</option>
                    <option value={4}>PCIe 4.0 Sloti</option>
                    <option value={5}>PCIe 5.0 Sloti</option>
                    <option value={6}>PCIe 6.0 Sloti</option>
                    <option value={7}>PCIe 7.0 Sloti</option>
                  </select>
                </div>

                {/* Lane Count */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Lane Kengligi (Lanes):</label>
                  <select
                    value={laneCount}
                    onChange={(e) => setLaneCount(Number(e.target.value))}
                    className="w-full bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2.5 text-xs font-mono"
                  >
                    <option value={1}>x1 (Wi-Fi karta, ovoz kartasi)</option>
                    <option value={4}>x4 (M.2 NVMe SSD)</option>
                    <option value={8}>x8 (Server tarmoq kartasi)</option>
                    <option value={16}>x16 (GPU, AI akselerator)</option>
                  </select>
                </div>
              </div>

              {/* Bandwidth Output Box */}
              <div className="bg-[#070B16] p-5 rounded-2xl border border-[#142036] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Amaldagi O‘tkazuvchanlik (Bandwidth):</span>
                    <div className="text-2xl font-black text-indigo-400 font-mono">
                      {pcieMetrics.simplexGbps.toFixed(2)} GB/s <span className="text-xs text-slate-400 font-normal">(Har bir yo‘nalishda)</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      To‘liq Dupleks (Ikki tomonlama): <b className="text-white">{pcieMetrics.duplexGbps.toFixed(2)} GB/s</b>
                    </div>
                  </div>

                  {pcieMetrics.isThrottled && (
                    <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                      ⚠️ Backward Compatibility: Qurilma PCIe {pcieGen} bo‘lsa-da, slot PCIe {slotLimitGen} bo‘lgani uchun tezlik pasaytirildi!
                    </span>
                  )}
                </div>

                {/* CXL Protocols */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">CXL 4.0 Sub-Protokollari (Kesh va Xotira Birgaligi):</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'io', name: "CXL.io", desc: "Qurilmalarni initsializatsiya qilish va I/O buyruqlarini boshqarish (standart PCIe ga o'xshash)" },
                      { id: 'cache', name: "CXL.cache", desc: "Akselerator va CPU keshlarining o'zaro kogerentligini ta'minlash" },
                      { id: 'mem', name: "CXL.mem", desc: "Tashqi CXL xotirasiga (DRAM/CXL SSD) bevosita xotira manzillari orqali kirish" }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveCxlProtocol(p.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeCxlProtocol === p.id
                            ? 'bg-indigo-500/20 border-indigo-500 text-white'
                            : 'bg-[#0B1224] border-[#182642] text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{p.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MISSIONS */}
      {/* ========================================================================= */}
      {activeMode === 'missions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 1, title: "1. RAID 5 Degraded Rebuild", xp: 100, solved: mission1Solved },
              { id: 2, title: "2. 3-2-1 Zaxira Qutqaruv", xp: 120, solved: mission2Solved },
              { id: 3, title: "3. PCIe 7.0 Bandwidth Hisobi", xp: 140, solved: mission3Solved },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => { sound.playClick(); setMissionIndex(m.id); }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  missionIndex === m.id
                    ? 'bg-red-500/10 border-red-500/50 text-white shadow-lg'
                    : 'bg-[#0A1020] border-[#182642] text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{m.title}</div>
                  <span className="text-[10px] text-red-400 font-mono mt-0.5 block">+{m.xp} XP Mukofot</span>
                </div>
                {m.solved && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            ))}
          </div>

          {missionIndex === 1 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">
                🛡️ Topshiriq: RAID 5 massivida 1 ta disk ishdan chiqsa (Degraded holatda) nima qilish kerak?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) Massivni zudlik bilan o‘chirib, barcha disklarni format qilish", correct: false },
                  { text: "B) Nosoz disk o‘rniga yangi disk qo‘yib Rebuild jarayonini ishga tushirish (Parity orqali tiklash)", correct: true },
                  { text: "C) Hech narsa qilmaslik, chunki qolgan disklar doimiy xavfsiz", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission1Solved(true);
                        onAddXp(100, "RAID 5 Rebuild vazifasi bajarildi");
                      } else {
                        sound.playError();
                      }
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#070B16] hover:bg-[#0E172C] border border-[#142036] text-xs font-semibold text-slate-300 transition-colors"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {missionIndex === 2 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">
                📦 Topshiriq: 3-2-1 Zaxiralash (Backup) qoidasi nimalarni anglatadi?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) 3 ta nusxa, 2 xil tashuvchi vosita (masalan, SSD va Lenta), 1 ta tashqi (off-site yoki bulut) nusxa", correct: true },
                  { text: "B) 3 ta RAID massivi, 2 ta kompyuter, 1 ta fleshka", correct: false },
                  { text: "C) 3 kunda 1 marta fayllarni ko‘chirib olish", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission2Solved(true);
                        onAddXp(120, "3-2-1 backup vazifasi bajarildi");
                      } else {
                        sound.playError();
                      }
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#070B16] hover:bg-[#0E172C] border border-[#142036] text-xs font-semibold text-slate-300 transition-colors"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {missionIndex === 3 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">
                🚀 Topshiriq: PCIe 7.0 x16 interfeysi nazariy jihatdan har bir yo‘nalishda taxminan qancha o‘tkazuvchanlik beradi?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) ~32 GB/s", correct: false },
                  { text: "B) ~64 GB/s", correct: false },
                  { text: "C) ~242 GB/s (128 GT/s x 16 lanes x PAM4 FLIT samaradorligi)", correct: true },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission3Solved(true);
                        onAddXp(140, "PCIe 7.0 bandwidth vazifasi bajarildi");
                        onUnlockAchievement('pcie_speedster');
                      } else {
                        sound.playError();
                      }
                    }}
                    className="w-full text-left p-3.5 rounded-xl bg-[#070B16] hover:bg-[#0E172C] border border-[#142036] text-xs font-semibold text-slate-300 transition-colors"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
