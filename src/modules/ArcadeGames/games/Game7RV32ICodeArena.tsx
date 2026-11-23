import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  Coins, 
  Code2,
  Cpu,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';
import { RiscvSimulator, PRESET_PROGRAMS } from '../../../engines/riscvEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export const Game7RV32ICodeArena: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(0);
  const [simulator] = useState(() => new RiscvSimulator());
  const [code, setCode] = useState(PRESET_PROGRAMS[0].code);
  const [cpuState, setCpuState] = useState(simulator.state);
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleSelectPreset = (idx: number) => {
    sound.playClick();
    setSelectedTaskIdx(idx);
    const newCode = PRESET_PROGRAMS[idx].code;
    setCode(newCode);
    simulator.parseAssembly(newCode);
    setCpuState({ ...simulator.state });
    setValidationResult(null);
  };

  const handleStep = () => {
    sound.playClick();
    simulator.step();
    setCpuState({ ...simulator.state });
  };

  const handleRun = () => {
    sound.playClick();
    simulator.run();
    setCpuState({ ...simulator.state });

    // Validate result based on task
    let isSuccess = false;
    let msg = "";

    if (selectedTaskIdx === 0) {
      // Array sum: RAM 0x10010008 should be 30
      const ramVal = simulator.state.memory[0x10010008] || 0;
      if (ramVal === 30) {
        isSuccess = true;
        msg = "Ajoyib! 0x10010008 manziliga 10 + 20 = 30 to‘g‘ri yozildi!";
      } else {
        msg = `Natija xato! Kutilgan RAM[0x10010008] = 30, lekin ${ramVal} topildi.`;
      }
    } else if (selectedTaskIdx === 1) {
      // Loop counter: x7 should be 5
      const count = simulator.state.registers[7] || 0;
      if (count === 5) {
        isSuccess = true;
        msg = "Qoyilmaqom! Sikl 5 marta to‘liq aylanib, x7=5 bo‘ldi!";
      } else {
        msg = `Sikl to‘liq aylanmadi! x7 kutilgan: 5, mavjud: ${count}.`;
      }
    } else {
      // Max of two: x7 should be 40
      const maxVal = simulator.state.registers[7] || 0;
      if (maxVal === 40) {
        isSuccess = true;
        msg = "To‘g‘ri! x7 registrida ikkita sonning kattasi (40) saqlandi!";
      } else {
        msg = `Maksimum xato! x7 kutilgan: 40, mavjud: ${maxVal}.`;
      }
    }

    setValidationResult(msg);

    if (isSuccess) {
      sound.playLevelUp();
      confetti({ particleCount: 60, spread: 70 });
      onFinish(100, 30, 80);
    } else {
      sound.playError();
    }
  };

  const handleReset = () => {
    sound.playClick();
    simulator.parseAssembly(code);
    setCpuState({ ...simulator.state });
    setValidationResult(null);
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-5xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              10-Amaliy · RV32I Assembly
            </span>
            <span className="text-xs font-mono text-slate-400">Mini-Ripes Emulyatori</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">RV32I Kod Maydoni (Assembly Challenge)</h2>
        </div>

        {/* Task Tabs */}
        <div className="flex items-center space-x-2">
          {PRESET_PROGRAMS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTaskIdx === idx 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-[#070B14] text-slate-400 hover:text-white'
              }`}
            >
              {idx + 1}-Topshiriq
            </button>
          ))}
        </div>
      </div>

      {/* Task Description */}
      <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-1">
        <h4 className="text-sm font-black text-white">{PRESET_PROGRAMS[selectedTaskIdx].name}</h4>
        <p className="text-xs text-slate-400">{PRESET_PROGRAMS[selectedTaskIdx].description}</p>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center">
              <Code2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              RV32I Assembly Kod Muharriri:
            </span>
            <span className="text-[10px] text-slate-500 font-mono">PC: 0x{cpuState.pc.toString(16).toUpperCase()}</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              simulator.parseAssembly(e.target.value);
              setCpuState({ ...simulator.state });
            }}
            rows={10}
            className="w-full bg-[#070B14] border border-[#1A2642] rounded-2xl p-4 font-mono text-xs text-emerald-400 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none shadow-inner"
            spellCheck={false}
          />

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRun}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Kodni Bajarish (Run & Test)</span>
            </button>

            <button
              onClick={handleStep}
              disabled={cpuState.isHalted}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center space-x-1.5 disabled:opacity-40"
            >
              <span>1 Qadam (Step)</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2.5 rounded-xl bg-[#070B14] hover:bg-slate-800 text-slate-400 font-semibold text-xs flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Qaytarish</span>
            </button>
          </div>
        </div>

        {/* Registers & RAM Inspector */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-indigo-400 flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1" />
              Asosiy Registrlar (x0..x10):
            </span>

            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 5, 6, 7, 8].map(regIdx => (
                <div key={regIdx} className="p-2 rounded-xl bg-[#0D1424] border border-[#1A2642] text-center">
                  <div className="text-[10px] text-slate-500">x{regIdx}</div>
                  <div className="font-bold text-white mt-0.5">
                    {cpuState.registers[regIdx] ?? 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-cyan-400 flex items-center">
              <Database className="w-3.5 h-3.5 mr-1" />
              RAM Xotirasi (0x10010000 dan):
            </span>

            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {[0x10010000, 0x10010004, 0x10010008].map(addr => (
                <div key={addr} className="p-2 rounded-xl bg-[#0D1424] border border-[#1A2642] text-center">
                  <div className="text-[9px] text-slate-500 truncate">0x{addr.toString(16).toUpperCase()}</div>
                  <div className="font-bold text-cyan-300 mt-0.5">
                    {cpuState.memory[addr] ?? 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Validation Result */}
      {validationResult && (
        <div className="p-4 rounded-2xl bg-[#070B14] border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center space-x-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{validationResult}</span>
        </div>
      )}
    </div>
  );
};
