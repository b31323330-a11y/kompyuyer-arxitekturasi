import React, { useState } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Coins, 
  Play, 
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../../utils/soundEngine';

interface GameProps {
  onFinish: (score: number, coins: number, xp: number) => void;
  highScore: number;
}

export type GateType = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR';

interface CircuitChallenge {
  id: string;
  title: string;
  description: string;
  inputs: string[]; // e.g. ['A', 'B'] or ['A', 'B', 'C']
  targetOutputs: string[]; // e.g. ['SUM', 'CARRY']
  solutionFn: (inputs: Record<string, boolean>) => Record<string, boolean>;
  hint: string;
}

export const CHALLENGES: CircuitChallenge[] = [
  {
    id: 'half_adder',
    title: "1. Yarim Qo‘shgich (Half Adder)",
    description: "Ikkita 1-bitli A va B sonlarini qo‘shuvchi sxema. Natijada SUM (yig‘indi) va CARRY (ko‘chirish) chiqishlarini hosil qiling.",
    inputs: ['A', 'B'],
    targetOutputs: ['SUM', 'CARRY'],
    solutionFn: (inp) => ({
      SUM: inp.A !== inp.B, // XOR
      CARRY: inp.A && inp.B, // AND
    }),
    hint: "SUM uchun ikkala kirish turlicha bo‘lganda 1 beruvchi XOR, CARRY uchun esa ikkalasi ham 1 bo‘lganda 1 beruvchi AND elementini tanlang.",
  },
  {
    id: 'universal_not',
    title: "2. Universal NAND bilan NOT Yasash",
    description: "NAND universal mantiqiy elementining kirishlarini birlashtirib, NOT A inkor elementini yasang.",
    inputs: ['A'],
    targetOutputs: ['NOT_A'],
    solutionFn: (inp) => ({
      NOT_A: !inp.A,
    }),
    hint: "NAND(A, A) = NOT(A AND A) = NOT(A). Demak, bitta A kirishini NAND elementiga ulasangiz kifoya.",
  },
  {
    id: 'majority_voter',
    title: "3. Ko‘pchilik Ovoz Sxemasi (Majority 3-Input)",
    description: "A, B, C signallaridan kamida 2 tasi 1 (Haqiqat) bo‘lsa, chiqish OUT = 1 bo‘lsin.",
    inputs: ['A', 'B', 'C'],
    targetOutputs: ['OUT'],
    solutionFn: (inp) => {
      const ones = [inp.A, inp.B, inp.C].filter(Boolean).length;
      return { OUT: ones >= 2 };
    },
    hint: "Bul ifodasi: (A·B) + (B·C) + (A·C). Kirishlar orasidagi juftliklarni tekshirish kerak.",
  },
];

export const Game5LogicWiring: React.FC<GameProps> = ({ onFinish, highScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const challenge = CHALLENGES[currentIdx];

  // User gate selections
  const [gate1, setGate1] = useState<GateType>('XOR');
  const [gate2, setGate2] = useState<GateType>('AND');

  // Test results
  const [testRows, setTestRows] = useState<{ inputs: Record<string, boolean>; outputs: Record<string, boolean>; passed: boolean }[] | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Evaluate user circuit
  const evalUserCircuit = (inputs: Record<string, boolean>): Record<string, boolean> => {
    if (challenge.id === 'half_adder') {
      const sum = evalGate(gate1, [inputs.A, inputs.B]);
      const carry = evalGate(gate2, [inputs.A, inputs.B]);
      return { SUM: sum, CARRY: carry };
    } else if (challenge.id === 'universal_not') {
      const notA = evalGate(gate1, [inputs.A, inputs.A]);
      return { NOT_A: notA };
    } else {
      // majority
      const ab = evalGate('AND', [inputs.A, inputs.B]);
      const bc = evalGate('AND', [inputs.B, inputs.C]);
      const ac = evalGate('AND', [inputs.A, inputs.C]);
      const out = evalGate(gate1, [ab, bc, ac]);
      return { OUT: out };
    }
  };

  const evalGate = (type: GateType, inps: boolean[]): boolean => {
    if (type === 'NOT') return !inps[0];
    if (type === 'AND') return inps.every(Boolean);
    if (type === 'OR') return inps.some(Boolean);
    if (type === 'NAND') return !inps.every(Boolean);
    if (type === 'NOR') return !inps.some(Boolean);
    if (type === 'XOR') return inps.reduce((acc, curr) => acc !== curr, false);
    return false;
  };

  const handleTestAll = () => {
    sound.playClick();
    const is3 = challenge.inputs.length === 3;
    const count = is3 ? 8 : (challenge.inputs.length === 1 ? 2 : 4);
    const rows = [];
    let allPassed = true;

    for (let i = 0; i < count; i++) {
      const inputObj: Record<string, boolean> = {};
      if (is3) {
        inputObj['A'] = (i & 4) !== 0;
        inputObj['B'] = (i & 2) !== 0;
        inputObj['C'] = (i & 1) !== 0;
      } else if (challenge.inputs.length === 2) {
        inputObj['A'] = (i & 2) !== 0;
        inputObj['B'] = (i & 1) !== 0;
      } else {
        inputObj['A'] = i === 1;
      }

      const expected = challenge.solutionFn(inputObj);
      const actual = evalUserCircuit(inputObj);

      const isRowMatch = challenge.targetOutputs.every(outKey => actual[outKey] === expected[outKey]);
      if (!isRowMatch) allPassed = false;

      rows.push({
        inputs: inputObj,
        outputs: actual,
        passed: isRowMatch,
      });
    }

    setTestRows(rows);

    if (allPassed) {
      sound.playLevelUp();
      confetti({ particleCount: 60, spread: 70 });
      setIsCompleted(true);
      onFinish(100, 30, 80);
    } else {
      sound.playError();
      setIsCompleted(false);
    }
  };

  const nextChallenge = () => {
    sound.playClick();
    setCurrentIdx(prev => (prev + 1) % CHALLENGES.length);
    setTestRows(null);
    setIsCompleted(false);
    setShowHint(false);
  };

  return (
    <div className="bg-[#0D1424] border border-[#1A2642] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl relative space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2642] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              7 & 8-Amaliy · Mantiqiy Sintez
            </span>
            <span className="text-xs font-mono text-slate-400">Sxema Konstruktori</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Kabelchi Muhandis (Gate Wiring)</h2>
        </div>

        <button
          onClick={nextChallenge}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
        >
          Keyingi Sxema ({currentIdx + 1}/{CHALLENGES.length}) ➔
        </button>
      </div>

      {/* Challenge Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Topshiriq:</span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? "Maslahatni yopish" : "Nazariy Maslahat"}</span>
          </button>
        </div>

        <h3 className="text-lg font-black text-white">{challenge.title}</h3>
        <p className="text-xs text-slate-300">{challenge.description}</p>

        {showHint && (
          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1A2642] text-xs text-amber-300 font-mono animate-fadeIn">
            💡 {challenge.hint}
          </div>
        )}
      </div>

      {/* Gate Selection Workbench */}
      <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] space-y-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Mantiqiy Elementlarni Tanlang & Ulang:
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Gate 1 */}
          <div className="p-4 rounded-2xl bg-[#0D1424] border border-[#1A2642] space-y-2">
            <span className="text-xs font-bold text-indigo-400">
              1-Element: {challenge.targetOutputs[0]} Chiqishi Uslubi
            </span>
            <select
              value={gate1}
              onChange={(e) => setGate1(e.target.value as GateType)}
              className="w-full bg-[#070B14] border border-indigo-500/40 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none"
            >
              {(['XOR', 'AND', 'OR', 'NOT', 'NAND', 'NOR'] as GateType[]).map(g => (
                <option key={g} value={g}>{g} Shlyuzi</option>
              ))}
            </select>
          </div>

          {/* Gate 2 (if half adder) */}
          {challenge.targetOutputs.length > 1 && (
            <div className="p-4 rounded-2xl bg-[#0D1424] border border-[#1A2642] space-y-2">
              <span className="text-xs font-bold text-cyan-400">
                2-Element: {challenge.targetOutputs[1]} Chiqishi Uslubi
              </span>
              <select
                value={gate2}
                onChange={(e) => setGate2(e.target.value as GateType)}
                className="w-full bg-[#070B14] border border-cyan-500/40 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none"
              >
                {(['AND', 'XOR', 'OR', 'NOT', 'NAND', 'NOR'] as GateType[]).map(g => (
                  <option key={g} value={g}>{g} Shlyuzi</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            onClick={handleTestAll}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-glow-indigo transition-transform hover:scale-105"
          >
            ⚡ Test All Combinations (Rostlik Jadvalini Sinash)
          </button>
        </div>
      </div>

      {/* Test Results Table */}
      {testRows && (
        <div className="p-6 rounded-3xl bg-[#070B14] border border-[#1A2642] space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Avtomatik Rostlik Jadvali Tekshiruvi:
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              {isCompleted ? "Barcha qatorlar to‘g‘ri! 🎉" : "Xatolik mavjud! Qayta sozlang"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#1A2642] text-slate-400">
                  {challenge.inputs.map(inp => (
                    <th key={inp} className="p-2">{inp}</th>
                  ))}
                  {challenge.targetOutputs.map(out => (
                    <th key={out} className="p-2 text-indigo-400">{out}</th>
                  ))}
                  <th className="p-2 text-right">Holat</th>
                </tr>
              </thead>
              <tbody>
                {testRows.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-900/50">
                    {challenge.inputs.map(inp => (
                      <td key={inp} className="p-2 text-slate-300">{row.inputs[inp] ? '1' : '0'}</td>
                    ))}
                    {challenge.targetOutputs.map(out => (
                      <td key={out} className="p-2 font-bold text-white">{row.outputs[out] ? '1' : '0'}</td>
                    ))}
                    <td className="p-2 text-right">
                      {row.passed ? (
                        <span className="text-emerald-400 font-bold">✅ TO‘G‘RI</span>
                      ) : (
                        <span className="text-rose-400 font-bold">❌ XATO</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
