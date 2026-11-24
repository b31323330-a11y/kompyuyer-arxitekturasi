import React, { useState, useEffect, useRef } from 'react';
import {
  HardDrive,
  Gauge,
  Thermometer,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown,
  Layers,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEngine';

interface StorageBenchmarkViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

interface StorageDeviceSpec {
  id: string;
  name: string;
  type: string;
  seqRead: number; // MB/s
  seqWrite: number; // MB/s
  randomIops: number; // IOPS
  latencyUs: number; // microsecond
  slcCacheGb: number;
  postSlcSpeed: number; // MB/s
  baseTemp: number; // Celsius
  maxTemp: number;
  throttleTemp: number;
  color: string;
}

const STORAGE_DEVICES: StorageDeviceSpec[] = [
  {
    id: 'hdd',
    name: "Mexanik HDD (7200 RPM)",
    type: "Magnit Plastinka (SATA III)",
    seqRead: 160,
    seqWrite: 140,
    randomIops: 120,
    latencyUs: 12000, // 12 ms
    slcCacheGb: 0,
    postSlcSpeed: 140,
    baseTemp: 35,
    maxTemp: 48,
    throttleTemp: 55,
    color: "from-amber-600 to-amber-700"
  },
  {
    id: 'sata_ssd',
    name: "SATA III SSD",
    type: "2.5 dyuymli TLC NAND",
    seqRead: 550,
    seqWrite: 520,
    randomIops: 95000,
    latencyUs: 60,
    slcCacheGb: 20,
    postSlcSpeed: 250,
    baseTemp: 32,
    maxTemp: 52,
    throttleTemp: 70,
    color: "from-blue-600 to-cyan-600"
  },
  {
    id: 'nvme_gen4',
    name: "NVMe SSD (PCIe 4.0 x4)",
    type: "M.2 2280 TLC PCIe 4.0",
    seqRead: 7400,
    seqWrite: 6800,
    randomIops: 1000000,
    latencyUs: 15,
    slcCacheGb: 40,
    postSlcSpeed: 1200,
    baseTemp: 42,
    maxTemp: 78,
    throttleTemp: 75,
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: 'nvme_gen5',
    name: "NVMe SSD (PCIe 5.0 x4)",
    type: "M.2 2280 E26 PCIe 5.0",
    seqRead: 14000,
    seqWrite: 12500,
    randomIops: 2400000,
    latencyUs: 8,
    slcCacheGb: 60,
    postSlcSpeed: 2500,
    baseTemp: 48,
    maxTemp: 86,
    throttleTemp: 75,
    color: "from-fuchsia-600 to-pink-600"
  },
  {
    id: 'usb_flash',
    name: "USB 3.2 Flash Drive",
    type: "Tashqi fleshka",
    seqRead: 200,
    seqWrite: 80,
    randomIops: 1500,
    latencyUs: 800,
    slcCacheGb: 2,
    postSlcSpeed: 25,
    baseTemp: 30,
    maxTemp: 55,
    throttleTemp: 65,
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 'ext_ssd',
    name: "Tashqi USB-C SSD",
    type: "USB 3.2 Gen2x2 (20 Gb/s)",
    seqRead: 2000,
    seqWrite: 1900,
    randomIops: 250000,
    latencyUs: 35,
    slcCacheGb: 25,
    postSlcSpeed: 600,
    baseTemp: 35,
    maxTemp: 62,
    throttleTemp: 70,
    color: "from-cyan-600 to-teal-600"
  }
];

export const StorageBenchmarkView: React.FC<StorageBenchmarkViewProps> = ({
  onAddXp,
  onUnlockAchievement
}) => {
  const [activeMode, setActiveMode] = useState<'sandbox' | 'missions'>('sandbox');

  // Comparison Devices
  const [deviceAId, setDeviceAId] = useState<string>('hdd');
  const [deviceBId, setDeviceBId] = useState<string>('nvme_gen4');

  // Workload selection
  const [workload, setWorkload] = useState<'video_50gb' | 'files_50k'>('video_50gb');

  // Benchmark State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progressA, setProgressA] = useState<number>(0);
  const [progressB, setProgressB] = useState<number>(0);
  const [speedA, setSpeedA] = useState<number>(0);
  const [speedB, setSpeedB] = useState<number>(0);
  const [tempA, setTempA] = useState<number>(35);
  const [tempB, setTempB] = useState<number>(42);
  const [isThrottlingB, setIsThrottlingB] = useState<boolean>(false);
  const [benchFinished, setBenchFinished] = useState<boolean>(false);

  // Radiator Cooling Toggle for NVMe
  const [hasHeatsink, setHasHeatsink] = useState<boolean>(false);

  // Missions State
  const [missionIndex, setMissionIndex] = useState<number>(1);
  const [mission1Solved, setMission1Solved] = useState<boolean>(false);
  const [mission2Solved, setMission2Solved] = useState<boolean>(false);
  const [mission3Solved, setMission3Solved] = useState<boolean>(false);

  const devA = STORAGE_DEVICES.find(d => d.id === deviceAId) || STORAGE_DEVICES[0];
  const devB = STORAGE_DEVICES.find(d => d.id === deviceBId) || STORAGE_DEVICES[2];

  const handleStartBenchmark = () => {
    sound.playClick();
    setIsRunning(true);
    setProgressA(0);
    setProgressB(0);
    setBenchFinished(false);
    setIsThrottlingB(false);
    setTempA(devA.baseTemp);
    setTempB(devB.baseTemp);
  };

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        // Increment progress based on speed
        setProgressA(prevA => {
          if (prevA >= 100) return 100;
          const delta = workload === 'video_50gb' ? (devA.seqWrite / 2000) * 1.5 : (devA.randomIops / 100000) * 2;
          return Math.min(100, prevA + Math.max(0.5, delta));
        });

        setProgressB(prevB => {
          if (prevB >= 100) return 100;

          // Temperature and throttling logic for DevB
          setTempB(currTemp => {
            const heatFactor = hasHeatsink ? 0.3 : 0.8;
            const newTemp = Math.min(devB.maxTemp, currTemp + heatFactor);
            if (newTemp >= devB.throttleTemp && !hasHeatsink) {
              setIsThrottlingB(true);
              sound.playWarningAlarm();
            }
            return newTemp;
          });

          // Check SLC exhaustion & throttling speed
          const isThrottled = !hasHeatsink && tempB >= devB.throttleTemp;
          const effSpeed = isThrottled 
            ? devB.postSlcSpeed * 0.5 
            : (prevB > 50 ? devB.postSlcSpeed : devB.seqWrite);

          setSpeedB(effSpeed);
          const delta = workload === 'video_50gb' ? (effSpeed / 2000) * 1.5 : (devB.randomIops / 100000) * 2;
          return Math.min(100, prevB + Math.max(1.5, delta));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isRunning, workload, devA, devB, hasHeatsink, tempB]);

  useEffect(() => {
    if (progressA >= 100 && progressB >= 100 && isRunning) {
      setIsRunning(false);
      setBenchFinished(true);
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 70 });
      onAddXp(60, "Saqlash benchmarki yakunlandi");
      onUnlockAchievement('storage_guru');
    }
  }, [progressA, progressB, isRunning]);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0C1528] via-[#0E1E3D] to-[#0A1224] border border-[#1E2E4E] p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  13-AMALIY MASHG‘ULOT
                </span>
                <span className="text-xs font-mono text-slate-400">STORAGE BENCHMARK</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                Saqlash Qurilmalari Benchmark & Fayl Ko‘chirish
              </h2>
              <p className="text-xs text-slate-400">
                HDD, SATA SSD, NVMe PCIe 4.0/5.0, Sequential MB/s vs 4K Random IOPS va Thermal Throttling
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-2 bg-[#080E1C] p-1.5 rounded-2xl border border-[#1A2642]">
            <button
              onClick={() => { sound.playClick(); setActiveMode('sandbox'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeMode === 'sandbox'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
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
      {/* MODE 1: SANDBOX BENCHMARK */}
      {/* ========================================================================= */}
      {activeMode === 'sandbox' && (
        <div className="space-y-6">
          {/* Workload & Settings Bar */}
          <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-pink-400" />
                  <span>Solishtirma Sinov Sozlamalari</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ikkita qurilma va yuklama turini tanlang, so‘ng jonli benchmarkni ishga tushiring
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  disabled={isRunning}
                  onClick={handleStartBenchmark}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isRunning ? "Sinov Ketmoqda..." : "Benchmarkni Boshlash"}</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsRunning(false);
                    setProgressA(0);
                    setProgressB(0);
                    setTempA(devA.baseTemp);
                    setTempB(devB.baseTemp);
                    setIsThrottlingB(false);
                    setBenchFinished(false);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Qayta tiklash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Workload Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => { sound.playClick(); setWorkload('video_50gb'); }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  workload === 'video_50gb'
                    ? 'bg-pink-500/10 border-pink-500/50 text-white shadow-md'
                    : 'bg-[#070B16] border-[#142036] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold flex items-center space-x-2">
                  <span>🎬 1 ta 50 GB Katta 4K Video Fayl</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                    Sequential Test
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Uzluksiz yirik fayl yozish. SLC kesh tugaganda haqiqiy NAND xotira tezligiga tushadi.
                </p>
              </button>

              <button
                onClick={() => { sound.playClick(); setWorkload('files_50k'); }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  workload === 'files_50k'
                    ? 'bg-indigo-500/10 border-indigo-500/50 text-white shadow-md'
                    : 'bg-[#070B16] border-[#142036] text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold flex items-center space-x-2">
                  <span>📁 50 000 ta Mayda 4 KiB Fayllar</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    Random 4K IOPS Test
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Kichik fayllar bilan ishlash (OS va ma’lumotlar bazasi). HDD da mexanik qidiruv kechikishi yaqqol ko‘rinadi.
                </p>
              </button>
            </div>
          </div>

          {/* DUAL COMPARISON LANES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DEVICE A */}
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">1-QURILMA (A):</span>
                <select
                  value={deviceAId}
                  onChange={(e) => setDeviceAId(e.target.value)}
                  className="bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2 text-xs font-mono"
                >
                  {STORAGE_DEVICES.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#070B16] p-4 rounded-2xl border border-[#142036] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{devA.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{devA.type}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {tempA}°C
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Nusxalash jarayoni:</span>
                    <span className="text-white font-bold">{progressA.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-200"
                      style={{ width: `${progressA}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Sequential</span>
                    <span className="text-xs font-mono font-bold text-white">{devA.seqWrite} MB/s</span>
                  </div>
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Random IOPS</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{devA.randomIops.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Kechikish</span>
                    <span className="text-xs font-mono font-bold text-pink-300">
                      {devA.latencyUs >= 1000 ? `${(devA.latencyUs / 1000).toFixed(1)} ms` : `${devA.latencyUs} µs`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DEVICE B */}
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">2-QURILMA (B):</span>
                <select
                  value={deviceBId}
                  onChange={(e) => setDeviceBId(e.target.value)}
                  className="bg-[#0E172C] border border-slate-700 text-white rounded-xl p-2 text-xs font-mono"
                >
                  {STORAGE_DEVICES.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-[#070B16] p-4 rounded-2xl border border-[#142036] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{devB.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{devB.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-mono font-bold ${tempB >= devB.throttleTemp ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                      {tempB.toFixed(1)}°C
                    </span>
                    {tempB >= devB.throttleTemp && (
                      <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/40">
                        🔥 THROTTLING
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Nusxalash jarayoni:</span>
                    <span className="text-white font-bold">{progressB.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 h-full transition-all duration-200"
                      style={{ width: `${progressB}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Joriy Tezlik</span>
                    <span className={`text-xs font-mono font-bold ${isThrottlingB ? 'text-rose-400' : 'text-white'}`}>
                      {speedB > 0 ? speedB : devB.seqWrite} MB/s
                    </span>
                  </div>
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Random IOPS</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{devB.randomIops.toLocaleString()}</span>
                  </div>
                  <div className="bg-[#0B1224] p-2 rounded-xl">
                    <span className="text-[9px] text-slate-400 block">Kechikish</span>
                    <span className="text-xs font-mono font-bold text-pink-300">
                      {devB.latencyUs >= 1000 ? `${(devB.latencyUs / 1000).toFixed(1)} ms` : `${devB.latencyUs} µs`}
                    </span>
                  </div>
                </div>

                {/* Heatsink Option */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>M.2 Sovutish Radiatori (Heatsink):</span>
                  </span>
                  <button
                    onClick={() => { sound.playClick(); setHasHeatsink(!hasHeatsink); }}
                    className={`px-3 py-1 rounded-xl font-bold font-mono transition-colors ${
                      hasHeatsink ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {hasHeatsink ? "O'rnatilgan ✅ (Salqin)" : "O'rnatilmagan ❌"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MISSIONS */}
      {/* ========================================================================= */}
      {activeMode === 'missions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: 1, title: "1. 4K Video Render Diskini Tanlash", xp: 90, solved: mission1Solved },
              { id: 2, title: "2. Kichik Fayllar (IOPS) Poygasi", xp: 110, solved: mission2Solved },
              { id: 3, title: "3. Thermal Throttling ni Yengish", xp: 130, solved: mission3Solved },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => { sound.playClick(); setMissionIndex(m.id); }}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  missionIndex === m.id
                    ? 'bg-pink-500/10 border-pink-500/50 text-white shadow-lg'
                    : 'bg-[#0A1020] border-[#182642] text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-sm font-bold">{m.title}</div>
                  <span className="text-[10px] text-pink-400 font-mono mt-0.5 block">+{m.xp} XP Mukofot</span>
                </div>
                {m.solved && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            ))}
          </div>

          {missionIndex === 1 && (
            <div className="bg-[#0A1020] border border-[#182642] rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">
                🎬 Topshiriq: Katta 4K video fayllar bilan ishlashda qaysi ko‘rsatkich eng muhim?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) Faqat diskning aylanish tezligi (RPM)", correct: false },
                  { text: "B) Ketma-ket o‘qish va yozish tezligi (Sequential MB/s) hamda SLC kesh hajmi", correct: true },
                  { text: "C) 4K Random IOPS ko‘rsatkichi", correct: false },
                  { text: "D) USB portining rangi", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission1Solved(true);
                        onAddXp(90, "Video disk vazifasi bajarildi");
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
                📁 Topshiriq: Operatsion tizim yuklanishi va ma’lumotlar bazasida HDD nega o‘ta sekin ishlaydi?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) Magnit kallak har bir kichik fayl uchun jismoniy siljishi (Kechikish 10-15 ms, IOPS ~100) tufayli", correct: true },
                  { text: "B) HDD xotirasi uchuvchan bo‘lgani uchun", correct: false },
                  { text: "C) HDD da elektr toki ko‘p sarflangani uchun", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission2Solved(true);
                        onAddXp(110, "IOPS vazifasi bajarildi");
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
                🔥 Topshiriq: PCIe 5.0 NVMe SSD qizib ketganda nima yuz beradi va buni qanday tuzatish kerak?
              </h3>
              <div className="space-y-2">
                {[
                  { text: "A) Kontroller Thermal Throttling yoqib tezlikni keskin tushiradi; radiator (heatsink) o‘rnatish shart", correct: true },
                  { text: "B) Kompyuter o‘chib qoladi va barcha fayllar o‘chib ketadi", correct: false },
                  { text: "C) SSD tezligi ikki baravarga oshib ketadi", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        sound.playSuccess();
                        setMission3Solved(true);
                        onAddXp(130, "Thermal throttling vazifasi bajarildi");
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
