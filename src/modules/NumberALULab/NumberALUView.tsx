import React, { useState } from 'react';
import { 
  Binary, 
  Calculator, 
  ArrowRightLeft, 
  Check, 
  RotateCcw, 
  AlertTriangle,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../engines/audioEngine';

interface NumberALUViewProps {
  onAddXp: (amount: number, reason?: string) => void;
  onUnlockAchievement: (id: string) => void;
}

export const NumberALUView: React.FC<NumberALUViewProps> = ({
  onAddXp,
  onUnlockAchievement,
}) => {
  const [activeTab, setActiveTab] = useState<'bits' | 'alu' | 'game'>('bits');

  // Bit Switch Board State (8-bit or 16-bit)
  const [bitWidth, setBitWidth] = useState<8 | 16>(8);
  const [bits, setBits] = useState<number[]>(new Array(16).fill(0));

  // Current values calculated from bits
  const activeBits = bits.slice(16 - bitWidth);
  const decimalVal = activeBits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, bitWidth - 1 - idx), 0);
  const binaryStr = activeBits.join('');
  const octalStr = decimalVal.toString(8);
  const hexStr = '0x' + decimalVal.toString(16).toUpperCase().padStart(bitWidth / 4, '0');

  const toggleBit = (indexInActive: number) => {
    sounds.playClick();
    const globalIdx = 16 - bitWidth + indexInActive;
    setBits(prev => {
      const copy = [...prev];
      copy[globalIdx] = copy[globalIdx] ? 0 : 1;
      return copy;
    });
  };

  const setFromDecimal = (dec: number) => {
    const clamped = Math.max(0, Math.min(Math.pow(2, bitWidth) - 1, dec || 0));
    const binArr = clamped.toString(2).padStart(bitWidth, '0').split('').map(Number);
    const newBits = new Array(16).fill(0);
    for (let i = 0; i < bitWidth; i++) {
      newBits[16 - bitWidth + i] = binArr[i];
    }
    setBits(newBits);
  };

  // ----------------- Bit Game State -----------------
  const [targetNumber, setTargetNumber] = useState<number>(() => Math.floor(Math.random() * 254) + 1);
  const [gameBits, setGameBits] = useState<number[]>(new Array(8).fill(0));
  const [gameStreak, setGameStreak] = useState(0);

  const gameCurrentVal = gameBits.reduce((acc, b, i) => acc + b * (128 >> i), 0);

  const toggleGameBit = (i: number) => {
    sounds.playClick();
    setGameBits(prev => {
      const copy = [...prev];
      copy[i] = copy[i] ? 0 : 1;
      return copy;
    });
  };

  const checkGameTarget = () => {
    if (gameCurrentVal === targetNumber) {
      sounds.playSuccess();
      confetti({ particleCount: 60, spread: 50 });
      const newStreak = gameStreak + 1;
      setGameStreak(newStreak);
      onAddXp(25, "Bit o‘yini to‘g‘ri yig‘ildi");

      if (newStreak >= 5) {
        onUnlockAchievement("binary_master");
      }

      // Next target
      setTargetNumber(Math.floor(Math.random() * 254) + 1);
      setGameBits(new Array(8).fill(0));
    } else {
      sounds.playError();
    }
  };

  // ----------------- ALU Carry & Borrow Visualizer -----------------
  const [aluBitWidth, setAluBitWidth] = useState<4 | 8>(4);
  const [opMode, setOpMode] = useState<'add' | 'sub'>('add');
  const [valA, setValA] = useState<number>(11); // 1011 in 4-bit
  const [valB, setValB] = useState<number>(6);  // 0110 in 4-bit

  const maxVal = Math.pow(2, aluBitWidth) - 1;
  const clampedA = Math.max(0, Math.min(maxVal, valA));
  const clampedB = Math.max(0, Math.min(maxVal, valB));

  // Compute addition steps
  const aBin = clampedA.toString(2).padStart(aluBitWidth, '0').split('').map(Number);
  const bBin = clampedB.toString(2).padStart(aluBitWidth, '0').split('').map(Number);

  // Column calculations (from right to left)
  const columns: {
    bitIndex: number;
    weight: number;
    bitA: number;
    bitB: number;
    carryIn: number;
    sumBit: number;
    carryOut: number;
    borrowIn: number;
    diffBit: number;
    borrowOut: number;
  }[] = [];

  let currentCarry = 0;
  let currentBorrow = 0;

  for (let i = aluBitWidth - 1; i >= 0; i--) {
    const bitA = aBin[i];
    const bitB = bBin[i];

    // Addition
    const sum = bitA + bitB + currentCarry;
    const sumBit = sum % 2;
    const carryOut = sum >= 2 ? 1 : 0;

    // Subtraction (bitA - bitB - borrow)
    let diff = bitA - bitB - currentBorrow;
    let borrowOut = 0;
    if (diff < 0) {
      diff += 2;
      borrowOut = 1;
    }

    columns.unshift({
      bitIndex: i,
      weight: Math.pow(2, aluBitWidth - 1 - i),
      bitA,
      bitB,
      carryIn: currentCarry,
      sumBit,
      carryOut,
      borrowIn: currentBorrow,
      diffBit: diff,
      borrowOut,
    });

    currentCarry = carryOut;
    currentBorrow = borrowOut;
  }

  const finalCarryOverflow = opMode === 'add' ? currentCarry === 1 : false;
  const finalBorrowUnderflow = opMode === 'sub' ? currentBorrow === 1 : false;
  const rawSumDec = clampedA + clampedB;
  const rawDiffDec = clampedA - clampedB;

  const resultBinStr = opMode === 'add' 
    ? (finalCarryOverflow ? '1' : '') + columns.map(c => c.sumBit).join('')
    : (finalBorrowUnderflow ? '- ' : '') + columns.map(c => c.diffBit).join('');

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
            <Binary className="w-3.5 h-3.5" />
            <span>4, 5, 6-amaliy mashg‘ulotlar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Sanoq Tizimlari & ALU Laboratoriyasi
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Pozitsion sanoq tizimlari (DEC, BIN, OCT, HEX), Carry / Borrow uzatilishi va Overflow bayroqlari simulyatori.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('bits'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bits' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bit-Kalitlar Paneli
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('alu'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'alu' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Carry / Borrow ALU
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('game'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'game' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎮 Bit O‘yini
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: Bit Switch Board ---------------- */}
      {activeTab === 'bits' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-semibold">Razryadlik:</span>
              <button
                onClick={() => setBitWidth(8)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                  bitWidth === 8 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                8-bit (1 Bayt)
              </button>
              <button
                onClick={() => setBitWidth(16)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                  bitWidth === 16 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                16-bit (2 Bayt / Half-word)
              </button>
            </div>

            <button
              onClick={() => setBits(new Array(16).fill(0))}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tozalash (Reset)</span>
            </button>
          </div>

          {/* Live Converters Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">O‘nlik (DEC)</span>
              <div className="text-2xl font-black text-indigo-400 font-mono mt-1 truncate">{decimalVal}</div>
              <span className="text-[10px] text-slate-500">Asosi: 10 (0..9)</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ikkilik (BIN)</span>
              <div className="text-lg font-black text-cyan-400 font-mono mt-1.5 truncate tracking-widest">{binaryStr}₂</div>
              <span className="text-[10px] text-slate-500">Asosi: 2 (0, 1)</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">O‘n oltilik (HEX)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1 truncate">{hexStr}</div>
              <span className="text-[10px] text-slate-500">Asosi: 16 (0..F)</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sakkizlik (OCT)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1 truncate">{octalStr}₈</div>
              <span className="text-[10px] text-slate-500">Asosi: 8 (0..7)</span>
            </div>
          </div>

          {/* Interactive Bit Switches Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Bit-Kalitlar: Qiymatni bosib o‘zgartiring</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Ishorasiz diapazon: 0 … {Math.pow(2, bitWidth) - 1}
              </span>
            </div>

            <div className={`grid gap-2 text-center ${bitWidth === 8 ? 'grid-cols-4 sm:grid-cols-8' : 'grid-cols-4 sm:grid-cols-8 md:grid-cols-16'}`}>
              {activeBits.map((bit, idx) => {
                const weight = Math.pow(2, bitWidth - 1 - idx);
                return (
                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{weight}</span>
                    <button
                      onClick={() => toggleBit(idx)}
                      className={`w-full py-4 rounded-xl font-mono text-xl font-bold transition-all shadow-md ${
                        bit === 1
                          ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 text-white border-2 border-indigo-400 shadow-indigo-500/30 scale-105'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {bit}
                    </button>
                    <span className="text-[9px] text-slate-500 font-mono">2^{bitWidth - 1 - idx}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Input from Decimal */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-3">
              <span className="text-xs text-slate-400 whitespace-nowrap">O‘nlik son kiritish:</span>
              <input
                type="number"
                min="0"
                max={Math.pow(2, bitWidth) - 1}
                value={decimalVal}
                onChange={(e) => setFromDecimal(parseInt(e.target.value, 10))}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono w-32 focus:border-indigo-500 outline-none"
              />
              <span className="text-[11px] text-slate-500">
                (O‘nlik kiritilganda bitlar avtomatik bo‘linadi)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: Carry / Borrow Visualizer ---------------- */}
      {activeTab === 'alu' && (
        <div className="space-y-6">
          {/* Operation & Bit Width Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-300">Amal:</span>
              <button
                onClick={() => setOpMode('add')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  opMode === 'add' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Qo‘shish (A + B) [Carry]
              </button>
              <button
                onClick={() => setOpMode('sub')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  opMode === 'sub' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400'
                }`}
              >
                Ayirish (A − B) [Borrow]
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400">Razryad:</span>
              <button
                onClick={() => { setAluBitWidth(4); setValA(11); setValB(6); }}
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  aluBitWidth === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                4-bit
              </button>
              <button
                onClick={() => { setAluBitWidth(8); setValA(200); setValB(100); }}
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  aluBitWidth === 8 ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                }`}
              >
                8-bit
              </button>
            </div>
          </div>

          {/* Operands Input & Preset Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Operandlar (O‘nlik)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">A operandi (0..{maxVal}):</label>
                  <input
                    type="number"
                    min="0"
                    max={maxVal}
                    value={valA}
                    onChange={(e) => setValA(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">BIN: {aBin.join('')}₂</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">B operandi (0..{maxVal}):</label>
                  <input
                    type="number"
                    min="0"
                    max={maxVal}
                    value={valB}
                    onChange={(e) => setValB(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">BIN: {bBin.join('')}₂</span>
                </div>
              </div>
            </div>

            {/* Quick Practice Presets */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Namunaviy Misollar (6-amaliy)</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => { setAluBitWidth(4); setOpMode('add'); setValA(11); setValB(6); }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:border-indigo-500 font-mono"
                >
                  1011₂ + 0110₂ (11+6=17)
                </button>
                <button
                  onClick={() => { setAluBitWidth(4); setOpMode('sub'); setValA(12); setValB(5); }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 hover:border-indigo-500 font-mono"
                >
                  1100₂ − 0101₂ (12-5=7)
                </button>
                <button
                  onClick={() => { setAluBitWidth(8); setOpMode('add'); setValA(200); setValB(100); }}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-rose-900/40 text-[11px] text-rose-300 hover:border-rose-500 font-mono"
                >
                  200 + 100 (8-bit Overflow!)
                </button>
              </div>
            </div>
          </div>

          {/* Visual Column-by-Column ALU Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 overflow-x-auto">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Bosqichma-bosqich razryadlar bo‘yicha hisoblash:</span>
              {finalCarryOverflow && (
                <span className="text-xs font-bold text-rose-400 flex items-center bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  Unsigned Overflow! ({rawSumDec} &gt; {maxVal})
                </span>
              )}
            </h3>

            {/* Visual Math Grid */}
            <div className="min-w-[450px] p-4 bg-slate-950 rounded-2xl border border-slate-800/80 font-mono">
              {/* Carry / Borrow Row */}
              <div className="flex items-center text-xs text-amber-400 font-bold border-b border-slate-800/60 pb-2">
                <span className="w-24 text-slate-500 font-sans text-[11px]">{opMode === 'add' ? 'Ko‘chirish (Carry):' : 'Qarz (Borrow):'}</span>
                <div className="flex-1 flex justify-around">
                  {columns.map((c, idx) => (
                    <span 
                      key={idx} 
                      className={`w-8 text-center px-1 rounded ${
                        (opMode === 'add' ? c.carryIn : c.borrowIn) ? 'bg-amber-500/20 text-amber-300' : 'text-slate-700'
                      }`}
                    >
                      {opMode === 'add' ? c.carryIn : c.borrowIn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Operand A Row */}
              <div className="flex items-center text-base font-bold text-white py-2">
                <span className="w-24 text-slate-500 font-sans text-xs">Operand A:</span>
                <div className="flex-1 flex justify-around">
                  {columns.map((c, idx) => (
                    <span key={idx} className="w-8 text-center text-indigo-300">{c.bitA}</span>
                  ))}
                </div>
              </div>

              {/* Operand B Row */}
              <div className="flex items-center text-base font-bold text-white py-2 border-b-2 border-indigo-500/50">
                <span className="w-24 text-slate-500 font-sans text-xs">Operand B ({opMode === 'add' ? '+' : '−'}):</span>
                <div className="flex-1 flex justify-around">
                  {columns.map((c, idx) => (
                    <span key={idx} className="w-8 text-center text-cyan-300">{c.bitB}</span>
                  ))}
                </div>
              </div>

              {/* Result Row */}
              <div className="flex items-center text-lg font-black text-emerald-400 pt-3">
                <span className="w-24 text-slate-500 font-sans text-xs font-normal">Natija:</span>
                <div className="flex-1 flex justify-around">
                  {columns.map((c, idx) => (
                    <span key={idx} className="w-8 text-center">{opMode === 'add' ? c.sumBit : c.diffBit}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary explanation */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p>
                <strong>Ikkilik natija:</strong> <span className="font-mono text-emerald-400 font-bold">{resultBinStr}₂</span>
                &nbsp;·&nbsp;
                <strong>O‘nlikda:</strong> {clampedA} {opMode === 'add' ? '+' : '−'} {clampedB} = {opMode === 'add' ? rawSumDec : rawDiffDec}
              </p>
              <p className="text-slate-400">
                {opMode === 'add' 
                  ? "Half Adder formulasi: SUM = A ⊕ B, CARRY = A · B. Full Adder da esa kiruvchi Carry-In qo‘shiladi."
                  : "0 − 1 amali bajarilganda chapdagi navbatdagi razryaddan 1 birlik (2 qiymat) qarz olinadi."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 3: Bit Game ---------------- */}
      {activeTab === 'game' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              Interaktiv Mashq
            </span>
            <h3 className="text-2xl font-black text-white mt-2">Ikkilik Bit O‘yini</h3>
            <p className="text-xs text-slate-400 mt-1">
              Quyidagi o‘nlik sonni hosil qilish uchun kerakli bit-kalitlarni yoqing (1) yoki o‘chiring (0).
            </p>
          </div>

          {/* Target number display */}
          <div className="py-4">
            <span className="text-xs text-slate-500 uppercase block mb-1">Maqsad son (DEC):</span>
            <div className="text-6xl font-black text-indigo-400 font-mono tracking-tight animate-pulse">
              {targetNumber}
            </div>
          </div>

          {/* 8-bit switches */}
          <div className="grid grid-cols-8 gap-2 max-w-lg mx-auto">
            {gameBits.map((b, i) => (
              <div key={i} className="flex flex-col items-center space-y-1">
                <span className="text-[11px] font-mono text-slate-400">{128 >> i}</span>
                <button
                  onClick={() => toggleGameBit(i)}
                  className={`w-full py-4 rounded-xl font-mono text-xl font-bold transition-all ${
                    b === 1
                      ? 'bg-gradient-to-b from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {b}
                </button>
              </div>
            ))}
          </div>

          {/* Current sum */}
          <div className="text-sm font-semibold text-slate-300">
            Hozirgi yig‘indi: <strong className="font-mono text-white text-base">{gameCurrentVal}</strong>
            {gameCurrentVal === targetNumber && (
              <span className="text-emerald-400 ml-2 font-bold animate-bounce inline-block">✅ Teng!</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={checkGameTarget}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform"
            >
              Tekshirish & Keyingisi
            </button>
            <button
              onClick={() => {
                setTargetNumber(Math.floor(Math.random() * 254) + 1);
                setGameBits(new Array(8).fill(0));
              }}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Boshqa son
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
