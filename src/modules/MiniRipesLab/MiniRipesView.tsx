import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  SkipForward, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Code2,
  Database,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { 
  RiscvSimulator, 
  PRESET_PROGRAMS, 
  ABI_NAMES 
} from '../../engines/riscvEngine';

interface MiniRipesViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

export const MiniRipesView: React.FC<MiniRipesViewProps> = ({
  onAddXp,
  onUnlockAchievement,
}) => {
  const [simulator] = useState<RiscvSimulator>(() => new RiscvSimulator());
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [code, setCode] = useState(PRESET_PROGRAMS[0].code);

  // Sync state for rendering
  const [cpuState, setCpuState] = useState(simulator.state);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [displayHex, setDisplayHex] = useState(false);

  // Effective address calculator tool
  const [eaBase, setEaBase] = useState<number>(0x10010000);
  const [eaOffset, setEaOffset] = useState<number>(8);

  const reloadCode = (newCode: string) => {
    setCode(newCode);
    simulator.parseAssembly(newCode);
    setCpuState({ ...simulator.state });
    setMissionCompleted(false);
  };

  useEffect(() => {
    reloadCode(PRESET_PROGRAMS[selectedPresetIndex].code);
  }, [selectedPresetIndex]);

  const handleStep = () => {
    sounds.playClick();
    simulator.step();
    setCpuState({ ...simulator.state });

    // Check mission check
    const currentPreset = PRESET_PROGRAMS[selectedPresetIndex];
    if (currentPreset.expectedCheck(simulator) && !missionCompleted) {
      sounds.playSuccess();
      confetti({ particleCount: 70, spread: 60 });
      setMissionCompleted(true);
      onAddXp(50, "RISC-V missiyasi yakunlandi");
      onUnlockAchievement("riscv_coder");
    }
  };

  const handleRun = () => {
    sounds.playClick();
    simulator.run(200);
    setCpuState({ ...simulator.state });

    const currentPreset = PRESET_PROGRAMS[selectedPresetIndex];
    if (currentPreset.expectedCheck(simulator) && !missionCompleted) {
      sounds.playSuccess();
      confetti({ particleCount: 70, spread: 60 });
      setMissionCompleted(true);
      onAddXp(50, "RISC-V dasturi to‘liq bajarildi");
      onUnlockAchievement("riscv_coder");
    }
  };

  const handleReset = () => {
    sounds.playClick();
    simulator.reset(true);
    setCpuState({ ...simulator.state });
    setMissionCompleted(false);
  };

  const currentInstIndex = Math.floor(cpuState.pc / 4);
  const currentInst = simulator.instructions[currentInstIndex];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>10, 11-amaliy mashg‘ulotlar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Mini-Ripes: RISC-V RV32I Simulyatori
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            RV32I buyruqlar to‘plami, 32 ta registr (`x0–x31`), 4 baytli so‘zli RAM va buyruq formatlari dekompozitsiyasi.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400">Amaliy Missiya:</span>
          <select
            value={selectedPresetIndex}
            onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-semibold outline-none focus:border-indigo-500"
          >
            {PRESET_PROGRAMS.map((p, idx) => (
              <option key={idx} value={idx}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mission Banner */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${missionCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
            {missionCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Missiya Maqsadi:</h4>
            <p className="text-xs text-slate-300">{PRESET_PROGRAMS[selectedPresetIndex].description}</p>
          </div>
        </div>

        {missionCompleted && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
            ✅ Missiya Bajarildi! (+50 XP)
          </span>
        )}
      </div>

      {/* Main Workspace: 3 Columns (Editor | Registers | RAM/Decoder) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Editor & Execution Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>RV32I Assembly Muharriri</span>
              </span>

              {/* Execution Status Message */}
              <span className="text-[11px] font-mono text-cyan-400 truncate max-w-[200px]">
                {cpuState.statusMessage}
              </span>
            </div>

            {/* Code Textarea with Line Pointer */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => reloadCode(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500 leading-relaxed resize-none"
                placeholder="# RV32I assembly kodingizni bu yerga yozing..."
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleStep}
                  disabled={cpuState.isHalted}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/20"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Step (Qadam)</span>
                </button>

                <button
                  onClick={handleRun}
                  disabled={cpuState.isHalted}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run (Ijro)</span>
                </button>
              </div>

              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Instruction Format Decoder Panel */}
          {currentInst && currentInst.formatInfo && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Buyruq Formati (32-bit Dekoder)</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                  {currentInst.formatInfo.type}-format
                </span>
              </div>

              <div className="text-xs text-slate-300">
                Joriy buyruq: <strong className="font-mono text-white text-sm">{currentInst.originalText}</strong>
              </div>

              {/* Bit fields graphical breakdown */}
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px] pt-1">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Opcode</span>
                  <span className="text-indigo-300 font-bold">{currentInst.formatInfo.opcode}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">rd / imm</span>
                  <span className="text-cyan-300 font-bold">{currentInst.formatInfo.rd || currentInst.formatInfo.imm || '—'}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">funct3</span>
                  <span className="text-amber-300 font-bold">{currentInst.formatInfo.funct3 || '—'}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">rs1</span>
                  <span className="text-emerald-300 font-bold">{currentInst.formatInfo.rs1 || '—'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Middle Column: Registers Table (x0-x31) (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>32 ta Registr (x0–x31)</span>
              </span>
              <span className="text-[10px] text-slate-500">x0 har doim 0 qiymatda</span>
            </div>

            <button
              onClick={() => setDisplayHex(!displayHex)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-mono"
            >
              {displayHex ? "HEX ↔ DEC" : "DEC ↔ HEX"}
            </button>
          </div>

          <div className="max-h-[500px] overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
            {cpuState.registers.map((val, regIdx) => {
              const isModified = cpuState.lastModifiedReg === regIdx;
              const hexVal = '0x' + (val >>> 0).toString(16).toUpperCase().padStart(8, '0');
              const abi = ABI_NAMES[regIdx];

              return (
                <div
                  key={regIdx}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl border transition-all ${
                    isModified
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20 text-cyan-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-400 w-8">x{regIdx}</span>
                    <span className="text-[11px] text-slate-500 w-10">({abi})</span>
                  </div>
                  <span className={`font-bold ${isModified ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {displayHex ? hexVal : val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: RAM Memory & Effective Address Tool (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>RAM (0x10010000)</span>
              </span>
              <span className="text-[10px] text-slate-500">4-bayt so‘zlar</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {[0x10010000, 0x10010004, 0x10010008, 0x1001000c, 0x10010010].map(addr => {
                const isModified = cpuState.lastModifiedMem === addr;
                const val = cpuState.memory[addr] || 0;
                const hexAddr = '0x' + addr.toString(16).toUpperCase();

                return (
                  <div
                    key={addr}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      isModified
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500">{hexAddr}</span>
                    <span className="font-bold text-emerald-400">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Effective Address (EA) Tool (11-amaliy) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              EA (Samarali Manzil) Hisoblagich
            </span>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Baza manzil (HEX):</label>
                <input
                  type="text"
                  value={'0x' + eaBase.toString(16).toUpperCase()}
                  onChange={(e) => setEaBase(parseInt(e.target.value, 16) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 font-mono text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Siljish / Offset (bayt):</label>
                <input
                  type="number"
                  value={eaOffset}
                  onChange={(e) => setEaOffset(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 font-mono text-white text-xs"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 block">Natijaviy manzil:</span>
                <span className="text-sm font-mono font-bold text-cyan-400">
                  {'0x' + (eaBase + eaOffset).toString(16).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
