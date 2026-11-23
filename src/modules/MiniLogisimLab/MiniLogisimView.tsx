import React, { useState } from 'react';
import { 
  GitBranch, 
  Layers, 
  Check, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Lightbulb,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';
import { evalGate, GateType, solveKMap2, solveKMap3 } from '../../engines/logicEngine';

interface MiniLogisimViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

export const MiniLogisimView: React.FC<MiniLogisimViewProps> = ({
  onAddXp,
  onUnlockAchievement,
}) => {
  const [activeTab, setActiveTab] = useState<'circuit' | 'kmap' | 'demorgan'>('circuit');

  // ---------------- CIRCUIT BUILDER STATE ----------------
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [inputC, setInputC] = useState(false);

  // Selected circuit preset
  const [circuitPreset, setCircuitPreset] = useState<'half_adder' | 'universal_nand' | 'three_input'>('half_adder');

  // Truth Table automated test results
  const [truthTableResults, setTruthTableResults] = useState<{ inputs: Record<string, boolean>; outputs: Record<string, boolean> }[] | null>(null);

  // Compute outputs based on current inputs & preset
  const computeOutputs = (a: boolean, b: boolean, c: boolean): Record<string, boolean> => {
    if (circuitPreset === 'half_adder') {
      const sum = evalGate('XOR', [a, b]);
      const carry = evalGate('AND', [a, b]);
      return { 'SUM (A ⊕ B)': sum, 'CARRY (A · B)': carry };
    } else if (circuitPreset === 'universal_nand') {
      // NOT using NAND: NAND(A, A)
      const notA = evalGate('NAND', [a, a]);
      // AND using 2 NANDs: NAND(NAND(A, B), NAND(A, B))
      const nandAB = evalGate('NAND', [a, b]);
      const andAB = evalGate('NAND', [nandAB, nandAB]);
      return { 'NOT A (NAND)': notA, 'A AND B (2×NAND)': andAB };
    } else {
      // (A AND B) OR C
      const andAB = evalGate('AND', [a, b]);
      const out = evalGate('OR', [andAB, c]);
      return { '(A · B) + C': out };
    }
  };

  const currentOutputs = computeOutputs(inputA, inputB, inputC);

  const testAllCombinations = () => {
    sounds.playLevelUp();
    confetti({ particleCount: 50, spread: 60 });
    onAddXp(30, "Barcha kombinatsiyalar tekshirildi");
    onUnlockAchievement("circuit_builder");

    const rows: { inputs: Record<string, boolean>; outputs: Record<string, boolean> }[] = [];
    const is3Input = circuitPreset === 'three_input';
    const limit = is3Input ? 8 : 4;

    for (let i = 0; i < limit; i++) {
      let a = false, b = false, c = false;
      if (is3Input) {
        a = (i & 4) !== 0;
        b = (i & 2) !== 0;
        c = (i & 1) !== 0;
      } else {
        a = (i & 2) !== 0;
        b = (i & 1) !== 0;
      }

      const out = computeOutputs(a, b, c);
      rows.push({
        inputs: is3Input ? { A: a, B: b, C: c } : { A: a, B: b },
        outputs: out,
      });
    }

    setTruthTableResults(rows);
  };

  // ---------------- K-MAP STATE ----------------
  const [kmapVarCount, setKmapVarCount] = useState<2 | 3>(2);
  const [kmap2Cells, setKmap2Cells] = useState<number[]>([1, 1, 0, 1]); // m0, m1, m2, m3
  const [kmap3Cells, setKmap3Cells] = useState<number[]>([1, 1, 0, 0, 1, 1, 0, 0]); // m0..m7

  const toggleKmap2Cell = (idx: number) => {
    sounds.playClick();
    setKmap2Cells(prev => {
      const copy = [...prev];
      copy[idx] = copy[idx] ? 0 : 1;
      return copy;
    });
  };

  const toggleKmap3Cell = (idx: number) => {
    sounds.playClick();
    setKmap3Cells(prev => {
      const copy = [...prev];
      copy[idx] = copy[idx] ? 0 : 1;
      return copy;
    });
  };

  const kmap2Result = solveKMap2(kmap2Cells);
  const kmap3Result = solveKMap3(kmap3Cells);

  // ---------------- DE MORGAN CHALLENGES ----------------
  const [deMorganQuizId, setDeMorganQuizId] = useState(0);
  const deMorganQuizzes = [
    {
      expr: "¬(A · B)",
      options: ["¬A + ¬B", "¬A · ¬B", "A + B", "¬(A + B)"],
      correct: 0,
      expl: "De Morgan 1-qoidasi: Ko‘paytmaning inkori inkorlar yig‘indisiga teng.",
    },
    {
      expr: "¬(A + B)",
      options: ["¬A · ¬B", "¬A + ¬B", "A · B", "¬A + B"],
      correct: 0,
      expl: "De Morgan 2-qoidasi: Yig‘indining inkori inkorlar ko‘paytmasiga teng.",
    },
    {
      expr: "A · (A + B)",
      options: ["A", "B", "A + B", "A · B"],
      correct: 0,
      expl: "Yutilish qonuni (Absorption): A·A + A·B = A + A·B = A.",
    },
    {
      expr: "A · Ā + B",
      options: ["B", "A", "0", "1"],
      correct: 0,
      expl: "Komplement qoidasi: A · Ā = 0, natijada 0 + B = B.",
    },
  ];

  const [selectedDeMorganOpt, setSelectedDeMorganOpt] = useState<number | null>(null);
  const [isDeMorganAnswered, setIsDeMorganAnswered] = useState(false);

  const handleDeMorganChoice = (idx: number) => {
    if (isDeMorganAnswered) return;
    setSelectedDeMorganOpt(idx);
    setIsDeMorganAnswered(true);

    if (idx === deMorganQuizzes[deMorganQuizId].correct) {
      sounds.playSuccess();
      onAddXp(20, "De Morgan mashqi yechildi");
      onUnlockAchievement("kmap_genius");
    } else {
      sounds.playError();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>7, 8, 9-amaliy mashg‘ulotlar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Mini-Logisim & Karnaugh Laboratoriyasi
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Raqamli mantiqiy darvozalar, yarim qo‘shgich sxemasi, universal NAND elementlari va K-map minimallashtiruvchi.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('circuit'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'circuit' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sxema Konstruktori
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('kmap'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'kmap' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Karnaugh Xaritasi (K-map)
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('demorgan'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'demorgan' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            De Morgan & Bul Qonunlari
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: Circuit Builder ---------------- */}
      {activeTab === 'circuit' && (
        <div className="space-y-6">
          {/* Preset selector bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400">Sxema turi:</span>
              <button
                onClick={() => { setCircuitPreset('half_adder'); setTruthTableResults(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  circuitPreset === 'half_adder' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Yarim Qo‘shgich (Half Adder)
              </button>
              <button
                onClick={() => { setCircuitPreset('universal_nand'); setTruthTableResults(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  circuitPreset === 'universal_nand' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Universal NAND dan NOT va AND
              </button>
              <button
                onClick={() => { setCircuitPreset('three_input'); setTruthTableResults(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  circuitPreset === 'three_input' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                3-Kirishli: (A · B) + C
              </button>
            </div>

            <button
              onClick={testAllCombinations}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 hover:scale-105 transition-transform"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Test All Combinations (Avtotekshirish)</span>
            </button>
          </div>

          {/* Interactive SVG Schematic Canvas */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                Kirish signallarini bosing (0 / 1) va simlar bo‘ylab signal tarqalishini kuzating:
              </span>
            </div>

            {/* Circuit Area */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 relative min-h-[260px] flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Inputs Pins */}
              <div className="flex flex-col space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kirish Pinlari</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => { sounds.playClick(); setInputA(!inputA); }}
                    className={`w-12 h-12 rounded-2xl font-mono text-lg font-bold flex items-center justify-center transition-all ${
                      inputA ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {inputA ? '1' : '0'}
                  </button>
                  <span className="text-xs font-bold text-white">Pin A</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => { sounds.playClick(); setInputB(!inputB); }}
                    className={`w-12 h-12 rounded-2xl font-mono text-lg font-bold flex items-center justify-center transition-all ${
                      inputB ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {inputB ? '1' : '0'}
                  </button>
                  <span className="text-xs font-bold text-white">Pin B</span>
                </div>

                {circuitPreset === 'three_input' && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => { sounds.playClick(); setInputC(!inputC); }}
                      className={`w-12 h-12 rounded-2xl font-mono text-lg font-bold flex items-center justify-center transition-all ${
                        inputC ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30' : 'bg-slate-900 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {inputC ? '1' : '0'}
                    </button>
                    <span className="text-xs font-bold text-white">Pin C</span>
                  </div>
                )}
              </div>

              {/* Schematic Middle Graphic Display */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-4">
                {circuitPreset === 'half_adder' && (
                  <div className="space-y-4 w-full max-w-sm">
                    {/* XOR Gate */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 flex items-center justify-between shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs">XOR</span>
                        <span className="text-xs text-slate-400">SUM = A ⊕ B</span>
                      </div>
                      <span className={`text-sm font-mono font-bold px-3 py-1 rounded-lg ${
                        currentOutputs['SUM (A ⊕ B)'] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-500'
                      }`}>
                        {currentOutputs['SUM (A ⊕ B)'] ? '1' : '0'}
                      </span>
                    </div>

                    {/* AND Gate */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 flex items-center justify-between shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs">AND</span>
                        <span className="text-xs text-slate-400">CARRY = A · B</span>
                      </div>
                      <span className={`text-sm font-mono font-bold px-3 py-1 rounded-lg ${
                        currentOutputs['CARRY (A · B)'] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-500'
                      }`}>
                        {currentOutputs['CARRY (A · B)'] ? '1' : '0'}
                      </span>
                    </div>
                  </div>
                )}

                {circuitPreset === 'universal_nand' && (
                  <div className="space-y-3 w-full max-w-sm">
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-between">
                      <span className="text-xs text-slate-300">NAND(A, A) = <strong>NOT A</strong></span>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {currentOutputs['NOT A (NAND)'] ? '1' : '0'}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/40 flex items-center justify-between">
                      <span className="text-xs text-slate-300">NAND(NAND(A,B), NAND(A,B)) = <strong>A AND B</strong></span>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {currentOutputs['A AND B (2×NAND)'] ? '1' : '0'}
                      </span>
                    </div>
                  </div>
                )}

                {circuitPreset === 'three_input' && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 w-full max-w-sm text-center">
                    <span className="text-xs text-slate-400 block mb-1">Mantiqiy ifoda qiymati:</span>
                    <div className="text-3xl font-black text-cyan-400 font-mono">
                      {currentOutputs['(A · B) + C'] ? '1' : '0'}
                    </div>
                  </div>
                )}
              </div>

              {/* Final Output Panel */}
              <div className="flex flex-col space-y-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chiqish Signal(lari)</span>
                {Object.entries(currentOutputs).map(([label, val]) => (
                  <div key={label} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold ${
                      val ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-950 text-slate-600'
                    }`}>
                      {val ? '1' : '0'}
                    </div>
                    <span className="text-xs font-semibold text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Truth Table Display */}
            {truthTableResults && (
              <div className="space-y-3 pt-4 border-t border-slate-800 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                    <Check className="w-4 h-4" />
                    <span>To‘liq Rostlik Jadvali (Barcha kombinatsiyalar tasdiqlandi):</span>
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                        {Object.keys(truthTableResults[0].inputs).map(k => (
                          <th key={k} className="p-2.5">Kirish {k}</th>
                        ))}
                        {Object.keys(truthTableResults[0].outputs).map(k => (
                          <th key={k} className="p-2.5 text-indigo-400">Chiqish {k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {truthTableResults.map((r, i) => (
                        <tr key={i} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                          {Object.values(r.inputs).map((v, idx) => (
                            <td key={idx} className="p-2.5 font-bold text-slate-300">{v ? '1' : '0'}</td>
                          ))}
                          {Object.values(r.outputs).map((v, idx) => (
                            <td key={idx} className={`p-2.5 font-black ${v ? 'text-emerald-400' : 'text-slate-600'}`}>
                              {v ? '1' : '0'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: Karnaugh Map (K-map) ---------------- */}
      {activeTab === 'kmap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400">O‘zgaruvchilar soni:</span>
              <button
                onClick={() => setKmapVarCount(2)}
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  kmapVarCount === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                2 o‘zgaruvchi (A, B)
              </button>
              <button
                onClick={() => setKmapVarCount(3)}
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  kmapVarCount === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                3 o‘zgaruvchi (A, B, C)
              </button>
            </div>

            <span className="text-xs text-slate-500">Katakchani bosib 0/1 almashtiring</span>
          </div>

          {/* 2-variable K-map */}
          {kmapVarCount === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white">2 o‘zgaruvchili K-map Jadvali (A, B):</h3>

              <div className="max-w-xs mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-center">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="text-xs text-indigo-400 font-bold">A \ B</div>
                  <div className="text-xs text-slate-400 font-bold">B = 0</div>
                  <div className="text-xs text-slate-400 font-bold">B = 1</div>

                  {/* Row A=0 */}
                  <div className="text-xs text-slate-400 font-bold">A = 0</div>
                  <button
                    onClick={() => toggleKmap2Cell(0)}
                    className={`py-4 rounded-xl text-xl font-bold transition-all ${
                      kmap2Cells[0] ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {kmap2Cells[0]}
                  </button>
                  <button
                    onClick={() => toggleKmap2Cell(1)}
                    className={`py-4 rounded-xl text-xl font-bold transition-all ${
                      kmap2Cells[1] ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {kmap2Cells[1]}
                  </button>

                  {/* Row A=1 */}
                  <div className="text-xs text-slate-400 font-bold">A = 1</div>
                  <button
                    onClick={() => toggleKmap2Cell(2)}
                    className={`py-4 rounded-xl text-xl font-bold transition-all ${
                      kmap2Cells[2] ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {kmap2Cells[2]}
                  </button>
                  <button
                    onClick={() => toggleKmap2Cell(3)}
                    className={`py-4 rounded-xl text-xl font-bold transition-all ${
                      kmap2Cells[3] ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {kmap2Cells[3]}
                  </button>
                </div>
              </div>

              {/* Minimization Result */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Soddalashtirilgan SOP (Sum of Products) Ifodasi:
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  Y = {kmap2Result.sopExpression}
                </div>
                <div className="text-xs text-slate-400 space-y-1 pt-1">
                  {kmap2Result.groups.map((g: string, i: number) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3-variable K-map */}
          {kmapVarCount === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-white">3 o‘zgaruvchili K-map Jadvali (A va BC Gray kodi):</h3>

              <div className="max-w-md mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-center overflow-x-auto">
                <div className="grid grid-cols-5 gap-2 items-center min-w-[320px]">
                  <div className="text-xs text-indigo-400 font-bold">A \ BC</div>
                  <div className="text-xs text-slate-400 font-bold">00</div>
                  <div className="text-xs text-slate-400 font-bold">01</div>
                  <div className="text-xs text-slate-400 font-bold">11 (Gray)</div>
                  <div className="text-xs text-slate-400 font-bold">10</div>

                  {/* Row A=0: m0, m1, m3, m2 */}
                  <div className="text-xs text-slate-400 font-bold">A = 0</div>
                  {[0, 1, 3, 2].map(m => (
                    <button
                      key={m}
                      onClick={() => toggleKmap3Cell(m)}
                      className={`py-3.5 rounded-xl text-lg font-bold transition-all ${
                        kmap3Cells[m] ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {kmap3Cells[m]}
                    </button>
                  ))}

                  {/* Row A=1: m4, m5, m7, m6 */}
                  <div className="text-xs text-slate-400 font-bold">A = 1</div>
                  {[4, 5, 7, 6].map(m => (
                    <button
                      key={m}
                      onClick={() => toggleKmap3Cell(m)}
                      className={`py-3.5 rounded-xl text-lg font-bold transition-all ${
                        kmap3Cells[m] ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-500'
                      }`}
                    >
                      {kmap3Cells[m]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimization Result */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Soddalashtirilgan Ifoda:
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  Y = {kmap3Result.expression}
                </div>
                <p className="text-xs text-slate-400">
                  Gray kodida (00, 01, 11, 10) qo‘shni ustunlar faqat 1 bit farq qilishi sababli 1-larni 2 talik va 4 talik bloklarga birlashtirish orqali o‘zgaruvchi yo‘qotiladi.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- TAB 3: De Morgan & Boolean ---------------- */}
      {activeTab === 'demorgan' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Bul Qonunlari & Soddalashtirish Mashqlari
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-2">
              De Morgan va Ekvivalentlik Sinovi
            </h3>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
            <span className="text-xs text-slate-500">Berilgan mantiqiy ifoda:</span>
            <div className="text-3xl font-black text-cyan-300 font-mono">
              {deMorganQuizzes[deMorganQuizId].expr} = ?
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deMorganQuizzes[deMorganQuizId].options.map((opt, oIdx) => {
              const isCorrect = oIdx === deMorganQuizzes[deMorganQuizId].correct;
              const isChosen = selectedDeMorganOpt === oIdx;

              let btnStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-500";
              if (isDeMorganAnswered) {
                if (isCorrect) btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                else if (isChosen) btnStyle = "bg-rose-950 border-rose-500 text-rose-200";
                else btnStyle = "bg-slate-950 border-slate-900 text-slate-600";
              }

              return (
                <button
                  key={oIdx}
                  disabled={isDeMorganAnswered}
                  onClick={() => handleDeMorganChoice(oIdx)}
                  className={`p-4 rounded-xl border text-base font-mono font-bold transition-all text-center ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isDeMorganAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 animate-fadeIn space-y-3">
              <p>
                <strong className="text-indigo-400">Izoh: </strong>
                {deMorganQuizzes[deMorganQuizId].expl}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setDeMorganQuizId((prev) => (prev + 1) % deMorganQuizzes.length);
                    setSelectedDeMorganOpt(null);
                    setIsDeMorganAnswered(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500"
                >
                  Keyingi Qonun →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
