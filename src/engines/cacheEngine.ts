// Cache & Memory Hierarchy Simulation Engine

export interface HierarchyLevel {
  name: string;
  type: 'TLB' | 'L1' | 'L2' | 'L3' | 'RAM' | 'SSD';
  latencyNs: number;
  capacityStr: string;
  color: string;
}

export const HIERARCHY_LEVELS: HierarchyLevel[] = [
  { name: "TLB / MMU", type: 'TLB', latencyNs: 0.5, capacityStr: "64-128 ta sahifa", color: "from-blue-500 to-cyan-500" },
  { name: "L1 Kesh", type: 'L1', latencyNs: 1.2, capacityStr: "32-64 KB / yadro", color: "from-emerald-500 to-teal-500" },
  { name: "L2 Kesh", type: 'L2', latencyNs: 4.5, capacityStr: "512 KB-1 MB", color: "from-amber-500 to-yellow-500" },
  { name: "L3 Kesh (Shared)", type: 'L3', latencyNs: 15, capacityStr: "16-32 MB", color: "from-orange-500 to-red-500" },
  { name: "DRAM (Operativ)", type: 'RAM', latencyNs: 70, capacityStr: "16-64 GB", color: "from-purple-500 to-indigo-500" },
  { name: "NVMe SSD (Pagefile)", type: 'SSD', latencyNs: 25000, capacityStr: "512 GB-2 TB", color: "from-rose-500 to-pink-500" },
];

export interface CacheAccessStep {
  targetAddress: number;
  hexAddress: string;
  levelReached: string;
  isHit: boolean;
  cacheLineTag: number;
  cacheLineIndex: number;
  latencyNs: number;
  explanation: string;
}

export interface CacheSimState {
  l1Lines: Record<number, number>; // index -> tag
  l2Lines: Record<number, number>;
  tlbEntries: Record<number, number>; // virtual page -> physical frame
  history: CacheAccessStep[];
  hits: number;
  misses: number;
  totalLatencyNs: number;
  writePolicy: 'write-back' | 'write-through';
}

export class CacheSimulator {
  public state: CacheSimState;
  public lineSize: number = 64; // 64 bytes cache line

  constructor(writePolicy: 'write-back' | 'write-through' = 'write-back') {
    this.state = {
      l1Lines: {},
      l2Lines: {},
      tlbEntries: {},
      history: [],
      hits: 0,
      misses: 0,
      totalLatencyNs: 0,
      writePolicy,
    };
  }

  public reset() {
    this.state = {
      l1Lines: {},
      l2Lines: {},
      tlbEntries: {},
      history: [],
      hits: 0,
      misses: 0,
      totalLatencyNs: 0,
      writePolicy: this.state.writePolicy,
    };
  }

  public access(address: number, isWrite = false): CacheAccessStep {
    const hex = '0x' + address.toString(16).toUpperCase();
    const lineTag = Math.floor(address / this.lineSize);
    const lineIndex = lineTag % 16; // 16 cache line sets for educational demo

    const virtualPage = Math.floor(address / 4096);
    let tlbHit = this.state.tlbEntries[virtualPage] !== undefined;
    if (!tlbHit) {
      this.state.tlbEntries[virtualPage] = (virtualPage * 7 + 3) % 256; // simulate mapping
    }

    let level = "L1 Kesh";
    let hit = false;
    let latency = 1.2;
    let expl = "";

    // Check L1
    if (this.state.l1Lines[lineIndex] === lineTag) {
      hit = true;
      level = "L1 Kesh";
      latency = 1.2;
      expl = `L1 Hit! 64-baytlik cache line (${lineTag}) keshda mavjud edi. Kechikish: 1.2 ns.`;
      this.state.hits++;
    } else {
      // L1 Miss -> check L2
      this.state.misses++;
      if (this.state.l2Lines[lineIndex] === lineTag) {
        level = "L2 Kesh";
        latency = 5.7; // 1.2 + 4.5
        expl = `L1 Miss, ammo L2 Hit! Cache line L2 dan L1 ga yuklandi. Kechikish: 5.7 ns.`;
        this.state.l1Lines[lineIndex] = lineTag;
      } else {
        // L2 Miss -> check RAM
        if (address < 0x20000) {
          level = "DRAM (RAM)";
          latency = 75.7; // 1.2 + 4.5 + 70
          expl = `L1 va L2 Miss! Ma'lumot asosiy operativ xotiradan (DRAM) 64-bayt blok bo'lib olib kelindi.`;
          this.state.l2Lines[lineIndex] = lineTag;
          this.state.l1Lines[lineIndex] = lineTag;
        } else {
          // Virtual page fault to SSD
          level = "Pagefile (SSD)";
          latency = 25075;
          expl = `Hard Page Fault! Sahifa RAM da topilmadi, NVMe drayverdagi pagefile dan o'qildi (~25 mks).`;
          this.state.l2Lines[lineIndex] = lineTag;
          this.state.l1Lines[lineIndex] = lineTag;
        }
      }
    }

    if (isWrite && this.state.writePolicy === 'write-through') {
      expl += " [Write-Through: Ma'lumot darhol pastki qatlamlarga ham yozildi]";
      latency += 15;
    } else if (isWrite && this.state.writePolicy === 'write-back') {
      expl += " [Write-Back: Kesh qatori 'Dirty' deb belgilandi, faqat keshdan siqib chiqarilganda RAM ga yoziladi]";
    }

    this.state.totalLatencyNs += latency;

    const step: CacheAccessStep = {
      targetAddress: address,
      hexAddress: hex,
      levelReached: level,
      isHit: hit,
      cacheLineTag: lineTag,
      cacheLineIndex: lineIndex,
      latencyNs: latency,
      explanation: expl,
    };

    this.state.history.unshift(step);
    if (this.state.history.length > 20) {
      this.state.history.pop();
    }

    return step;
  }
}

// EAT (Effective Access Time) Calculation
export function calculateEAT(
  l1HitRate: number, // 0 to 1
  l1Latency: number, // e.g. 1.5 ns
  l2HitRate: number, // 0 to 1
  l2Latency: number, // e.g. 5 ns
  ramLatency: number // e.g. 70 ns
): number {
  // EAT = t_L1 + (1 - H1) * (t_L2 + (1 - H2) * t_RAM)
  const missL1 = 1 - l1HitRate;
  const missL2 = 1 - l2HitRate;
  const eat = l1Latency + missL1 * (l2Latency + missL2 * ramLatency);
  return Number(eat.toFixed(2));
}

// Generate data points for chart
export function generateEATCurve(
  l1Latency = 1.5,
  l2Latency = 5,
  ramLatency = 70,
  l2HitRate = 0.8
) {
  const points: { hitRate: number; eat: number }[] = [];
  for (let hr = 70; hr <= 99; hr += 2) {
    const rate = hr / 100;
    const eat = calculateEAT(rate, l1Latency, l2HitRate, l2Latency, ramLatency);
    points.push({ hitRate: hr, eat });
  }
  return points;
}
