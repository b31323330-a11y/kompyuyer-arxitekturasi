// Logic Gates & Karnaugh Minimization Engine (Ultra Edition)

export type LogicGateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
export type GateType = LogicGateType;

export function evaluateGate(type: LogicGateType, inputs: boolean[]): boolean {
  if (inputs.length === 0) return false;

  switch (type) {
    case 'NOT':
      return !inputs[0];
    case 'AND':
      return inputs.every(Boolean);
    case 'OR':
      return inputs.some(Boolean);
    case 'NAND':
      return !inputs.every(Boolean);
    case 'NOR':
      return !inputs.some(Boolean);
    case 'XOR':
      return inputs.reduce((acc, curr) => acc !== curr, false);
    case 'XNOR':
      return !inputs.reduce((acc, curr) => acc !== curr, false);
    default:
      return false;
  }
}

export const evalGate = evaluateGate;

export interface TruthTableRowData {
  inputs: Record<string, boolean>;
  outputs: Record<string, boolean>;
}

// Generate Truth Table for any boolean function
export function generateTruthTable(
  pinNames: string[],
  computeFn: (inputs: Record<string, boolean>) => Record<string, boolean>
): TruthTableRowData[] {
  const count = 1 << pinNames.length;
  const rows: TruthTableRowData[] = [];

  for (let i = 0; i < count; i++) {
    const inputRow: Record<string, boolean> = {};
    for (let j = 0; j < pinNames.length; j++) {
      const bitWeight = 1 << (pinNames.length - 1 - j);
      inputRow[pinNames[j]] = (i & bitWeight) !== 0;
    }
    const outputRow = computeFn(inputRow);
    rows.push({ inputs: inputRow, outputs: outputRow });
  }

  return rows;
}

// 3-variable Karnaugh Map Solver with Gray Code Wrap-Around
// A (0, 1), BC (00, 01, 11, 10)
// Indices: m0(000), m1(001), m3(011), m2(010), m4(100), m5(101), m7(111), m6(110)
export interface KMapSolution {
  expression: string;
  groups: string[];
  isTautology: boolean;
  isContradiction: boolean;
}

export function solveKMap3Ultra(cells: number[]): KMapSolution {
  // cells array length 8: [m0, m1, m2, m3, m4, m5, m6, m7]
  const ones = cells.map((v, i) => (v === 1 ? i : -1)).filter(i => i >= 0);

  if (ones.length === 0) {
    return { expression: "0", groups: ["Barcha kataklar 0 (Inkor)"], isTautology: false, isContradiction: true };
  }
  if (ones.length === 8) {
    return { expression: "1", groups: ["To‘liq 8-talik guruh (Tautologiya)"], isTautology: true, isContradiction: false };
  }

  const terms: string[] = [];
  const groups: string[] = [];
  const covered = new Set<number>();

  // Check 4-groups
  // Row A=0: m0, m1, m2, m3
  if ([0, 1, 2, 3].every(m => cells[m] === 1)) {
    terms.push("¬A");
    groups.push("Gorizontal 4-talik: m(0,1,2,3) → ¬A");
    [0, 1, 2, 3].forEach(m => covered.add(m));
  }
  // Row A=1: m4, m5, m6, m7
  if ([4, 5, 6, 7].every(m => cells[m] === 1)) {
    terms.push("A");
    groups.push("Gorizontal 4-talik: m(4,5,6,7) → A");
    [4, 5, 6, 7].forEach(m => covered.add(m));
  }
  // Cols B=0: m0, m1, m4, m5
  if ([0, 1, 4, 5].every(m => cells[m] === 1)) {
    if (!terms.includes("¬B")) {
      terms.push("¬B");
      groups.push("Vertikal 4-talik: m(0,1,4,5) → ¬B");
      [0, 1, 4, 5].forEach(m => covered.add(m));
    }
  }
  // Cols B=1: m2, m3, m6, m7
  if ([2, 3, 6, 7].every(m => cells[m] === 1)) {
    if (!terms.includes("B")) {
      terms.push("B");
      groups.push("Vertikal 4-talik: m(2,3,6,7) → B");
      [2, 3, 6, 7].forEach(m => covered.add(m));
    }
  }
  // Cols C=1: m1, m3, m5, m7
  if ([1, 3, 5, 7].every(m => cells[m] === 1)) {
    if (!terms.includes("C")) {
      terms.push("C");
      groups.push("Vertikal 4-talik: m(1,3,5,7) → C");
      [1, 3, 5, 7].forEach(m => covered.add(m));
    }
  }
  // Wrap-around Cols C=0 (edge wrap 00 and 10): m0, m2, m4, m6
  if ([0, 2, 4, 6].every(m => cells[m] === 1)) {
    if (!terms.includes("¬C")) {
      terms.push("¬C");
      groups.push("Qirralararo o‘ralish (Wrap-around 4-talik): m(0,2,4,6) → ¬C");
      [0, 2, 4, 6].forEach(m => covered.add(m));
    }
  }

  // Check 2-groups for uncovered
  // Wrap-around 2-groups: (m0, m2) and (m4, m6)
  if (!covered.has(0) && cells[0] === 1 && cells[2] === 1) {
    terms.push("¬A·¬C");
    groups.push("Qirralararo juftlik: m(0,2) → ¬A·¬C");
    covered.add(0);
    covered.add(2);
  }
  if (!covered.has(4) && cells[4] === 1 && cells[6] === 1) {
    terms.push("A·¬C");
    groups.push("Qirralararo juftlik: m(4,6) → A·¬C");
    covered.add(4);
    covered.add(6);
  }

  // Leftover minterms
  const mintermNames: Record<number, string> = {
    0: "¬A·¬B·¬C", 1: "¬A·¬B·C", 2: "¬A·B·¬C", 3: "¬A·B·C",
    4: "A·¬B·¬C", 5: "A·¬B·C", 6: "A·B·¬C", 7: "A·B·C",
  };

  ones.forEach(m => {
    if (!covered.has(m)) {
      terms.push(mintermNames[m]);
      groups.push(`Alohida 1-talik katak: m(${m}) → ${mintermNames[m]}`);
    }
  });

  return {
    expression: terms.length > 0 ? terms.join(" + ") : "0",
    groups,
    isTautology: false,
    isContradiction: false,
  };
}

export function solveKMap2(cells: number[]): { sopExpression: string; groups: string[] } {
  // cells: [m0, m1, m2, m3]
  // m0: A=0, B=0 | m1: A=0, B=1 | m2: A=1, B=0 | m3: A=1, B=1
  const ones = cells.map((v, i) => (v === 1 ? i : -1)).filter(i => i >= 0);
  if (ones.length === 0) return { sopExpression: "0", groups: ["Barcha kataklar 0"] };
  if (ones.length === 4) return { sopExpression: "1", groups: ["Barcha 4 katak 1 → 1 (Tautologiya)"] };

  const terms: string[] = [];
  const groups: string[] = [];
  const covered = new Set<number>();

  // Check rows
  if (cells[0] === 1 && cells[1] === 1) {
    terms.push("¬A");
    groups.push("Gorizontal juftlik m(0,1): A=0 → ¬A");
    covered.add(0);
    covered.add(1);
  }
  if (cells[2] === 1 && cells[3] === 1) {
    terms.push("A");
    groups.push("Gorizontal juftlik m(2,3): A=1 → A");
    covered.add(2);
    covered.add(3);
  }

  // Check cols
  if (cells[0] === 1 && cells[2] === 1) {
    if (!covered.has(0) || !covered.has(2)) {
      terms.push("¬B");
      groups.push("Vertikal juftlik m(0,2): B=0 → ¬B");
      covered.add(0);
      covered.add(2);
    }
  }
  if (cells[1] === 1 && cells[3] === 1) {
    if (!covered.has(1) || !covered.has(3)) {
      terms.push("B");
      groups.push("Vertikal juftlik m(1,3): B=1 → B");
      covered.add(1);
      covered.add(3);
    }
  }

  // Single cells
  const minterms: Record<number, string> = {
    0: "¬A·¬B",
    1: "¬A·B",
    2: "A·¬B",
    3: "A·B",
  };

  ones.forEach(m => {
    if (!covered.has(m)) {
      terms.push(minterms[m]);
      groups.push(`Alohida katak m(${m}): ${minterms[m]}`);
    }
  });

  return {
    sopExpression: terms.length > 0 ? terms.join(" + ") : "0",
    groups,
  };
}

export function solveKMap3(cells: number[]): { expression: string; sopExpression: string; groups: string[] } {
  const res = solveKMap3Ultra(cells);
  return {
    expression: res.expression,
    sopExpression: res.expression,
    groups: res.groups,
  };
}
