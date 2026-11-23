// RISC-V RV32I Processor Engine

export const ABI_NAMES = [
  "zero", "ra", "sp", "gp", "tp", "t0", "t1", "t2",
  "s0", "s1", "a0", "a1", "a2", "a3", "a4", "a5",
  "a6", "a7", "s2", "s3", "s4", "s5", "s6", "s7",
  "s8", "s9", "s10", "s11", "t3", "t4", "t5", "t6"
];

export interface InstructionFormatInfo {
  type: 'R' | 'I' | 'S' | 'B' | 'U' | 'J';
  opcode: string;
  rd?: string;
  rs1?: string;
  rs2?: string;
  funct3?: string;
  funct7?: string;
  imm?: number;
  rawBinary?: string;
}

export interface ParsedInstruction {
  lineIndex: number;
  originalText: string;
  mnemonic: string;
  args: string[];
  formatInfo?: InstructionFormatInfo;
}

export interface RiscvCpuState {
  pc: number;
  registers: number[]; // 32 registers
  memory: Record<number, number>; // address -> 32-bit word
  lastModifiedReg: number | null;
  lastModifiedMem: number | null;
  cycles: number;
  isHalted: boolean;
  statusMessage: string;
}

export function regNameToIndex(name: string): number {
  const clean = name.trim().toLowerCase().replace(',', '');
  if (clean.startsWith('x') && !isNaN(Number(clean.slice(1)))) {
    const idx = parseInt(clean.slice(1), 10);
    if (idx >= 0 && idx < 32) return idx;
  }
  const abiIdx = ABI_NAMES.indexOf(clean);
  if (abiIdx !== -1) return abiIdx;
  return -1;
}

// Format decoder for educational inspector
export function decodeInstructionFormat(mnemonic: string, args: string[]): InstructionFormatInfo {
  const m = mnemonic.toLowerCase();
  
  if (['add', 'sub', 'and', 'or', 'xor', 'sll', 'srl'].includes(m)) {
    const rd = args[0] || 'x0';
    const rs1 = args[1] || 'x0';
    const rs2 = args[2] || 'x0';
    return {
      type: 'R',
      opcode: '0110011 (0x33)',
      rd,
      rs1,
      rs2,
      funct3: m === 'add' || m === 'sub' ? '000' : m === 'and' ? '111' : m === 'or' ? '110' : '100',
      funct7: m === 'sub' ? '0100000' : '0000000',
    };
  }

  if (['addi', 'andi', 'ori', 'xori'].includes(m)) {
    return {
      type: 'I',
      opcode: '0010011 (0x13)',
      rd: args[0] || 'x0',
      rs1: args[1] || 'x0',
      imm: parseInt(args[2] || '0', 10),
      funct3: m === 'addi' ? '000' : m === 'andi' ? '111' : '110',
    };
  }

  if (m === 'lw') {
    // lw rd, offset(rs1)
    const rd = args[0] || 'x0';
    let imm = 0;
    let rs1 = 'x0';
    const match = (args[1] || '').match(/^(-?\d+)\(([^)]+)\)/);
    if (match) {
      imm = parseInt(match[1], 10);
      rs1 = match[2];
    }
    return {
      type: 'I',
      opcode: '0000011 (0x03)',
      rd,
      rs1,
      imm,
      funct3: '010 (Word)',
    };
  }

  if (m === 'sw') {
    // sw rs2, offset(rs1)
    const rs2 = args[0] || 'x0';
    let imm = 0;
    let rs1 = 'x0';
    const match = (args[1] || '').match(/^(-?\d+)\(([^)]+)\)/);
    if (match) {
      imm = parseInt(match[1], 10);
      rs1 = match[2];
    }
    return {
      type: 'S',
      opcode: '0100011 (0x23)',
      rs1,
      rs2,
      imm,
      funct3: '010 (Word)',
    };
  }

  if (['beq', 'bne', 'blt', 'bge'].includes(m)) {
    return {
      type: 'B',
      opcode: '1100011 (0x63)',
      rs1: args[0] || 'x0',
      rs2: args[1] || 'x0',
      imm: parseInt(args[2] || '0', 10) || 0,
      funct3: m === 'beq' ? '000' : m === 'bne' ? '001' : '100',
    };
  }

  return {
    type: 'U',
    opcode: '0110111 (0x37)',
    rd: args[0] || 'x0',
    imm: 0,
  };
}

export class RiscvSimulator {
  public state: RiscvCpuState;
  public instructions: ParsedInstruction[] = [];
  public labels: Record<string, number> = {}; // label -> instruction index
  public initialCode: string = "";

  constructor() {
    this.state = this.getInitialState();
  }

  public getInitialState(): RiscvCpuState {
    const regs = new Array(32).fill(0);
    // standard stack pointer sp (x2) = 0x7ffffff0
    regs[2] = 0x7ffffff0;

    // preset sample memory at 0x10010000
    const mem: Record<number, number> = {
      0x10010000: 15,
      0x10010004: 25,
      0x10010008: 0,
      0x1001000c: 100,
    };

    return {
      pc: 0,
      registers: regs,
      memory: mem,
      lastModifiedReg: null,
      lastModifiedMem: null,
      cycles: 0,
      isHalted: false,
      statusMessage: "Tayyor",
    };
  }

  public reset(preserveCode = true) {
    this.state = this.getInitialState();
    if (!preserveCode) {
      this.instructions = [];
      this.labels = {};
    }
  }

  public parseAssembly(sourceCode: string): { success: boolean; error?: string } {
    this.initialCode = sourceCode;
    this.instructions = [];
    this.labels = {};

    const lines = sourceCode.split('\n');
    let instIdx = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      // Remove comments
      const commentIdx = line.indexOf('#');
      if (commentIdx !== -1) {
        line = line.substring(0, commentIdx).trim();
      }
      if (!line) continue;

      // Check labels
      if (line.includes(':')) {
        const parts = line.split(':');
        const labelName = parts[0].trim();
        this.labels[labelName] = instIdx;
        line = parts[1] ? parts[1].trim() : '';
        if (!line) continue;
      }

      // Parse instruction mnemonic and args
      const tokens = line.split(/\s+/);
      const mnemonic = tokens[0].toLowerCase();
      const rawArgs = tokens.slice(1).join(' ').split(',').map(s => s.trim()).filter(Boolean);

      const parsed: ParsedInstruction = {
        lineIndex: i,
        originalText: lines[i].trim(),
        mnemonic,
        args: rawArgs,
        formatInfo: decodeInstructionFormat(mnemonic, rawArgs),
      };

      this.instructions.push(parsed);
      instIdx++;
    }

    this.reset(true);
    return { success: true };
  }

  public step(): boolean {
    if (this.state.isHalted) return false;

    const currentInstIndex = this.state.pc / 4;
    if (currentInstIndex >= this.instructions.length) {
      this.state.isHalted = true;
      this.state.statusMessage = "Dastur muvaffaqiyatli yakunlandi (EOP)";
      return false;
    }

    const inst = this.instructions[currentInstIndex];
    this.state.lastModifiedReg = null;
    this.state.lastModifiedMem = null;
    this.state.cycles++;

    const m = inst.mnemonic;
    const args = inst.args;

    // Helper write register (x0 always 0)
    const writeReg = (idx: number, val: number) => {
      if (idx > 0 && idx < 32) {
        // 32-bit signed integer
        this.state.registers[idx] = val | 0;
        this.state.lastModifiedReg = idx;
      }
    };

    let nextPc = this.state.pc + 4;

    switch (m) {
      case 'add': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const rs2 = regNameToIndex(args[2]);
        writeReg(rd, this.state.registers[rs1] + this.state.registers[rs2]);
        break;
      }
      case 'addi': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const imm = parseInt(args[2], 10) || 0;
        writeReg(rd, this.state.registers[rs1] + imm);
        break;
      }
      case 'sub': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const rs2 = regNameToIndex(args[2]);
        writeReg(rd, this.state.registers[rs1] - this.state.registers[rs2]);
        break;
      }
      case 'and': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const rs2 = regNameToIndex(args[2]);
        writeReg(rd, this.state.registers[rs1] & this.state.registers[rs2]);
        break;
      }
      case 'andi': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const imm = parseInt(args[2], 10) || 0;
        writeReg(rd, this.state.registers[rs1] & imm);
        break;
      }
      case 'or': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const rs2 = regNameToIndex(args[2]);
        writeReg(rd, this.state.registers[rs1] | this.state.registers[rs2]);
        break;
      }
      case 'ori': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const imm = parseInt(args[2], 10) || 0;
        writeReg(rd, this.state.registers[rs1] | imm);
        break;
      }
      case 'xor': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const rs2 = regNameToIndex(args[2]);
        writeReg(rd, this.state.registers[rs1] ^ this.state.registers[rs2]);
        break;
      }
      case 'xori': {
        const rd = regNameToIndex(args[0]);
        const rs1 = regNameToIndex(args[1]);
        const imm = parseInt(args[2], 10) || 0;
        writeReg(rd, this.state.registers[rs1] ^ imm);
        break;
      }
      case 'lw': {
        // lw rd, offset(rs1)
        const rd = regNameToIndex(args[0]);
        const match = (args[1] || '').match(/^(-?\d+)\(([^)]+)\)/);
        if (match) {
          const offset = parseInt(match[1], 10) || 0;
          const rs1 = regNameToIndex(match[2]);
          const addr = (this.state.registers[rs1] + offset) & ~3; // word align
          const val = this.state.memory[addr] || 0;
          writeReg(rd, val);
        }
        break;
      }
      case 'sw': {
        // sw rs2, offset(rs1)
        const rs2 = regNameToIndex(args[0]);
        const match = (args[1] || '').match(/^(-?\d+)\(([^)]+)\)/);
        if (match) {
          const offset = parseInt(match[1], 10) || 0;
          const rs1 = regNameToIndex(match[2]);
          const addr = (this.state.registers[rs1] + offset) & ~3;
          const val = this.state.registers[rs2];
          this.state.memory[addr] = val;
          this.state.lastModifiedMem = addr;
        }
        break;
      }
      case 'beq': {
        const rs1 = regNameToIndex(args[0]);
        const rs2 = regNameToIndex(args[1]);
        const targetLabel = args[2];
        if (this.state.registers[rs1] === this.state.registers[rs2]) {
          if (this.labels[targetLabel] !== undefined) {
            nextPc = this.labels[targetLabel] * 4;
          } else {
            const offset = parseInt(targetLabel, 10) || 0;
            nextPc = this.state.pc + offset;
          }
        }
        break;
      }
      case 'bne': {
        const rs1 = regNameToIndex(args[0]);
        const rs2 = regNameToIndex(args[1]);
        const targetLabel = args[2];
        if (this.state.registers[rs1] !== this.state.registers[rs2]) {
          if (this.labels[targetLabel] !== undefined) {
            nextPc = this.labels[targetLabel] * 4;
          } else {
            const offset = parseInt(targetLabel, 10) || 0;
            nextPc = this.state.pc + offset;
          }
        }
        break;
      }
      default:
        this.state.statusMessage = `Noma'lum buyruq: ${m}`;
        break;
    }

    this.state.pc = nextPc;
    this.state.statusMessage = `Bajarildi: ${inst.originalText} (Takt: ${this.state.cycles})`;
    return true;
  }

  public run(maxCycles = 500): number {
    let count = 0;
    while (!this.state.isHalted && count < maxCycles) {
      const ok = this.step();
      if (!ok) break;
      count++;
    }
    if (count >= maxCycles) {
      this.state.statusMessage = "Cheksiz tsikl aniqlandi (500 takt to'xtatildi)";
      this.state.isHalted = true;
    }
    return count;
  }
}

// Preset Assembly Programs for Missions
export const PRESET_PROGRAMS = [
  {
    name: "Massiv 0 va 1-elementini qo'shish (sw)",
    code: `# t0 ga massiv bazasi manzilini yuklash (0x10010000)
# (Bu yerda simulyator boshlang'ich RAM da 0x10010000=15, 0x10010004=25 tayyorlagan)
# 1. t0 registriga bevosita 0x10010000 bazani yozamiz
addi t0, zero, 0
# Baza adresini t0 ga qo'yamiz (offset sifatida ishlatish uchun)
# t1 = Memory[0x10010000 + 0]
lw t1, 0(t0)
# t2 = Memory[0x10010000 + 4]
lw t2, 4(t0)
# t3 = t1 + t2
add t3, t1, t2
# Natijani 2-elementga yozish (0x10010008)
sw t3, 8(t0)
`,
    expectedCheck: (sim: RiscvSimulator) => sim.state.memory[0x10010008] === 40,
    description: "Massivning 0- va 1-elementlarini o'qib, ularni qo'shing va natijani 8 bayt offsetga (2-element) yozing.",
  },
  {
    name: "1 dan 5 gacha sonlar yig'indisi (Tsikl beq)",
    code: `# x5 (t0) = hisoblagich i = 1
addi t0, zero, 1
# x6 (t1) = limit = 5
addi t1, zero, 5
# x7 (t2) = sum = 0
addi t2, zero, 0

loop:
# sum = sum + i
add t2, t2, t0
# agar i == limit bo'lsa exit ga o't
beq t0, t1, exit
# i = i + 1
addi t0, t0, 1
# tsikl boshiga
beq zero, zero, loop

exit:
# t2 da yakuniy 15 hosil bo'ladi
`,
    expectedCheck: (sim: RiscvSimulator) => sim.state.registers[regNameToIndex('t2')] === 15,
    description: "1 dan 5 gacha butun sonlar yig'indisini hisoblab t2 registrida 15 hosil qiling.",
  },
];
