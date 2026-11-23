// Number Systems & ALU Calculation Engine (Ultra Edition)

export interface NumberConversions {
  dec: number;
  bin: string;
  oct: string;
  hex: string;
}

export function convertFromDecimal(val: number, width: 8 | 16 = 8): NumberConversions {
  const max = Math.pow(2, width) - 1;
  const clamped = Math.max(0, Math.min(max, isNaN(val) ? 0 : val));
  return {
    dec: clamped,
    bin: clamped.toString(2).padStart(width, '0'),
    oct: clamped.toString(8),
    hex: '0x' + clamped.toString(16).toUpperCase().padStart(width / 4, '0'),
  };
}

export interface AluStepColumn {
  index: number;
  weight: number;
  bitA: number;
  bitB: number;
  carryIn: number;
  sumBit: number;
  carryOut: number;
  borrowIn: number;
  diffBit: number;
  borrowOut: number;
}

export interface AluResult {
  columns: AluStepColumn[];
  finalCarry: boolean;
  finalBorrow: boolean;
  rawSum: number;
  rawDiff: number;
  isOverflow: boolean;
  resultBinStr: string;
}

export function computeAlu(
  a: number,
  b: number,
  width: 4 | 8 = 4,
  mode: 'add' | 'sub' = 'add'
): AluResult {
  const maxVal = Math.pow(2, width) - 1;
  const clampedA = Math.max(0, Math.min(maxVal, a));
  const clampedB = Math.max(0, Math.min(maxVal, b));

  const aBits = clampedA.toString(2).padStart(width, '0').split('').map(Number);
  const bBits = clampedB.toString(2).padStart(width, '0').split('').map(Number);

  const columns: AluStepColumn[] = [];
  let currentCarry = 0;
  let currentBorrow = 0;

  for (let i = width - 1; i >= 0; i--) {
    const bitA = aBits[i];
    const bitB = bBits[i];

    // Addition
    const sum = bitA + bitB + currentCarry;
    const sumBit = sum % 2;
    const carryOut = sum >= 2 ? 1 : 0;

    // Subtraction
    let diff = bitA - bitB - currentBorrow;
    let borrowOut = 0;
    if (diff < 0) {
      diff += 2;
      borrowOut = 1;
    }

    columns.unshift({
      index: i,
      weight: Math.pow(2, width - 1 - i),
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

  const rawSum = clampedA + clampedB;
  const rawDiff = clampedA - clampedB;
  const isOverflow = mode === 'add' ? currentCarry === 1 : currentBorrow === 1;

  const resultBinStr = mode === 'add'
    ? (currentCarry ? '1' : '') + columns.map(c => c.sumBit).join('')
    : (currentBorrow ? '- ' : '') + columns.map(c => c.diffBit).join('');

  return {
    columns,
    finalCarry: currentCarry === 1,
    finalBorrow: currentBorrow === 1,
    rawSum,
    rawDiff,
    isOverflow,
    resultBinStr,
  };
}

// Grouping Trainer Helper (Triads & Tetrads)
export interface GroupingCluster {
  binaryGroup: string;
  convertedDigit: string;
  colorClass: string;
}

export function getBinaryGrouping(binStr: string, mode: 'octal' | 'hex'): GroupingCluster[] {
  const groupSize = mode === 'octal' ? 3 : 4;
  const padLength = Math.ceil(binStr.length / groupSize) * groupSize;
  const padded = binStr.padStart(padLength, '0');

  const colors = [
    'text-cyan-400 bg-cyan-950/40 border-cyan-500/40',
    'text-amber-400 bg-amber-950/40 border-amber-500/40',
    'text-purple-400 bg-purple-950/40 border-purple-500/40',
    'text-emerald-400 bg-emerald-950/40 border-emerald-500/40',
  ];

  const clusters: GroupingCluster[] = [];
  for (let i = 0; i < padded.length; i += groupSize) {
    const chunk = padded.slice(i, i + groupSize);
    const digit = parseInt(chunk, 2).toString(mode === 'octal' ? 8 : 16).toUpperCase();
    clusters.push({
      binaryGroup: chunk,
      convertedDigit: digit,
      colorClass: colors[(i / groupSize) % colors.length],
    });
  }

  return clusters;
}
