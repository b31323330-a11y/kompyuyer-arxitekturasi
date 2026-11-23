// Memory Hierarchy, Cache & Virtual Memory Engine (Ultra Edition)

export type MappingPolicy = 'direct' | '2way';
export type WritePolicy = 'write-back' | 'write-through';

export interface CacheEntry {
  tag: number;
  valid: boolean;
  dirty: boolean;
  lastUsedTime: number;
}

export interface MemoryAccessTrace {
  address: number;
  hex: string;
  isWrite: boolean;
  tlbHit: boolean;
  l1Hit: boolean;
  l2Hit: boolean;
  l3Hit: boolean;
  isHardFault: boolean;
  latencyNs: number;
  finalLevel: 'L1' | 'L2' | 'L3' | 'RAM' | 'Pagefile';
  explanation: string;
}

export class UltraMemorySimulator {
  public l1Sets: CacheEntry[][]; // sets for L1 (e.g. 8 sets, 1 or 2 ways)
  public l2Sets: CacheEntry[][];
  public tlbEntries: Record<number, number>; // virtual page -> physical frame
  public mapping: MappingPolicy = '2way';
  public writePolicy: WritePolicy = 'write-back';
  public lineSizeBytes: number = 64;
  public history: MemoryAccessTrace[] = [];
  public stats = {
    totalAccesses: 0,
    l1Hits: 0,
    l2Hits: 0,
    l3Hits: 0,
    ramAccesses: 0,
    hardFaults: 0,
    totalLatencyNs: 0,
  };

  constructor(mapping: MappingPolicy = '2way', writePolicy: WritePolicy = 'write-back') {
    this.mapping = mapping;
    this.writePolicy = writePolicy;
    const ways = mapping === '2way' ? 2 : 1;
    this.l1Sets = Array.from({ length: 8 }, () => 
      Array.from({ length: ways }, () => ({ tag: -1, valid: false, dirty: false, lastUsedTime: 0 }))
    );
    this.l2Sets = Array.from({ length: 16 }, () => 
      Array.from({ length: ways }, () => ({ tag: -1, valid: false, dirty: false, lastUsedTime: 0 }))
    );
    this.tlbEntries = {};
  }

  public reset() {
    const ways = this.mapping === '2way' ? 2 : 1;
    this.l1Sets = Array.from({ length: 8 }, () => 
      Array.from({ length: ways }, () => ({ tag: -1, valid: false, dirty: false, lastUsedTime: 0 }))
    );
    this.l2Sets = Array.from({ length: 16 }, () => 
      Array.from({ length: ways }, () => ({ tag: -1, valid: false, dirty: false, lastUsedTime: 0 }))
    );
    this.tlbEntries = {};
    this.history = [];
    this.stats = {
      totalAccesses: 0,
      l1Hits: 0,
      l2Hits: 0,
      l3Hits: 0,
      ramAccesses: 0,
      hardFaults: 0,
      totalLatencyNs: 0,
    };
  }

  public access(address: number, isWrite = false): MemoryAccessTrace {
    this.stats.totalAccesses++;
    const now = Date.now();
    const hex = '0x' + address.toString(16).toUpperCase();

    // TLB Virtual Memory Check (Page size 4KB)
    const virtualPage = Math.floor(address / 4096);
    const tlbHit = this.tlbEntries[virtualPage] !== undefined;
    if (!tlbHit) {
      this.tlbEntries[virtualPage] = (virtualPage * 3 + 1) % 64; // Map page
    }

    // Cache line indexing
    const lineTag = Math.floor(address / this.lineSizeBytes);
    const l1SetIdx = lineTag % this.l1Sets.length;
    const l2SetIdx = lineTag % this.l2Sets.length;

    let l1Hit = false;
    let l2Hit = false;
    let l3Hit = false;
    let isHardFault = false;
    let latencyNs = 1.2;
    let finalLevel: 'L1' | 'L2' | 'L3' | 'RAM' | 'Pagefile' = 'L1';
    let expl = "";

    // Check L1
    const l1WayIdx = this.l1Sets[l1SetIdx].findIndex(w => w.valid && w.tag === lineTag);
    if (l1WayIdx !== -1) {
      l1Hit = true;
      finalLevel = 'L1';
      latencyNs = 1.2;
      this.stats.l1Hits++;
      this.l1Sets[l1SetIdx][l1WayIdx].lastUsedTime = now;
      if (isWrite) {
        if (this.writePolicy === 'write-back') {
          this.l1Sets[l1SetIdx][l1WayIdx].dirty = true;
          expl = `L1 Hit! 64-baytlik cache line keshda topildi. Write-Back: qator 'Dirty' qilindi.`;
        } else {
          expl = `L1 Hit! Write-Through: ma’lumot L1 ga va darhol RAM ga yozildi (+15 ns).`;
          latencyNs += 15;
        }
      } else {
        expl = `L1 Hit! Kerakli so‘z eng tez L1 keshda topildi (1.2 ns).`;
      }
    } else {
      // L1 Miss -> Check L2
      const l2WayIdx = this.l2Sets[l2SetIdx].findIndex(w => w.valid && w.tag === lineTag);
      if (l2WayIdx !== -1) {
        l2Hit = true;
        finalLevel = 'L2';
        latencyNs = 5.7; // 1.2 + 4.5
        this.stats.l2Hits++;
        this.l2Sets[l2SetIdx][l2WayIdx].lastUsedTime = now;
        this.installL1Line(l1SetIdx, lineTag, isWrite);
        expl = `L1 Miss, lekin L2 Hit! Cache line L2 dan L1 ga ko‘chirildi (5.7 ns).`;
      } else {
        // L2 Miss -> Check L3 / RAM
        if (address < 0x20000) {
          finalLevel = 'RAM';
          latencyNs = 75.7; // 1.2 + 4.5 + 70
          this.stats.ramAccesses++;
          this.installL2Line(l2SetIdx, lineTag);
          this.installL1Line(l1SetIdx, lineTag, isWrite);
          expl = `L1 va L2 Miss! 64 baytlik blok asosiy operativ xotiradan (DRAM) olib kelindi (75.7 ns).`;
        } else {
          // Virtual Hard Page Fault (SSD Pagefile)
          isHardFault = true;
          finalLevel = 'Pagefile';
          latencyNs = 25075; // ~25 mks
          this.stats.hardFaults++;
          this.installL2Line(l2SetIdx, lineTag);
          this.installL1Line(l1SetIdx, lineTag, isWrite);
          expl = `Hard Page Fault! Sahifa RAM da yo‘q, NVMe dagi Pagefile dan o‘qildi (~25 mikrosekund).`;
        }
      }
    }

    this.stats.totalLatencyNs += latencyNs;

    const trace: MemoryAccessTrace = {
      address,
      hex,
      isWrite,
      tlbHit,
      l1Hit,
      l2Hit,
      l3Hit,
      isHardFault,
      latencyNs,
      finalLevel,
      explanation: expl,
    };

    this.history.unshift(trace);
    if (this.history.length > 25) this.history.pop();
    return trace;
  }

  private installL1Line(setIdx: number, tag: number, isWrite: boolean) {
    const set = this.l1Sets[setIdx];
    // Find empty or LRU
    let targetIdx = set.findIndex(w => !w.valid);
    if (targetIdx === -1) {
      // LRU replacement
      let oldest = Infinity;
      set.forEach((w, i) => {
        if (w.lastUsedTime < oldest) {
          oldest = w.lastUsedTime;
          targetIdx = i;
        }
      });
    }
    set[targetIdx] = {
      tag,
      valid: true,
      dirty: isWrite && this.writePolicy === 'write-back',
      lastUsedTime: Date.now(),
    };
  }

  private installL2Line(setIdx: number, tag: number) {
    const set = this.l2Sets[setIdx];
    let targetIdx = set.findIndex(w => !w.valid);
    if (targetIdx === -1) {
      let oldest = Infinity;
      set.forEach((w, i) => {
        if (w.lastUsedTime < oldest) {
          oldest = w.lastUsedTime;
          targetIdx = i;
        }
      });
    }
    set[targetIdx] = {
      tag,
      valid: true,
      dirty: false,
      lastUsedTime: Date.now(),
    };
  }
}

// EAT Dynamic Calculation
export function calculateEffectiveAccessTime(
  l1Hr: number, // 0..1
  l1Lat: number, // ns
  l2Hr: number,
  l2Lat: number,
  ramLat: number
): number {
  // EAT = t_L1 + (1 - H1) * (t_L2 + (1 - H2) * t_RAM)
  const miss1 = 1 - l1Hr;
  const miss2 = 1 - l2Hr;
  return Number((l1Lat + miss1 * (l2Lat + miss2 * ramLat)).toFixed(2));
}
