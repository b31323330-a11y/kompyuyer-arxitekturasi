// RAID Arrays & PCIe 3.0-7.0 / CXL Engine (Ultra Edition)

export type RaidTier = 0 | 1 | 5 | 6 | 10;
export type DiskState = 'online' | 'degraded' | 'failed' | 'rebuilding';

export interface UltraRaidDisk {
  id: number;
  label: string;
  sizeTb: number;
  state: DiskState;
  blocks: { text: string; isParity?: boolean }[];
}

export interface UltraRaidSystem {
  tier: RaidTier;
  disks: UltraRaidDisk[];
  health: 'OPTIMAL' | 'DEGRADED' | 'FAILED';
  rawCapacityTb: number;
  usableCapacityTb: number;
  faultToleranceCount: number;
  writePenaltyIO: number;
  explanation: string;
}

export function buildRaidSystem(tier: RaidTier, diskCount: number, sizeTb: number): UltraRaidSystem {
  let faultTolerance = 0;
  let usable = 0;
  let penalty = 1;
  let expl = "";

  switch (tier) {
    case 0:
      faultTolerance = 0;
      usable = diskCount * sizeTb;
      penalty = 1;
      expl = "RAID 0 (Striping): To‘liq sig‘im va yuqori tezlik, ammo nosozlikka chidamlilik 0.";
      break;
    case 1:
      faultTolerance = diskCount - 1;
      usable = sizeTb;
      penalty = 2;
      expl = "RAID 1 (Mirroring): Barcha disklar ko‘zgu nusxa, 1 ta disk nosozligiga chidaydi.";
      break;
    case 5:
      faultTolerance = 1;
      usable = (diskCount - 1) * sizeTb;
      penalty = 4; // Read old data, read old parity, write new data, write new parity
      expl = "RAID 5 (Distributed Parity): Taqsimlangan yagona paritet, 1 ta disk nosozligiga chidaydi.";
      break;
    case 6:
      faultTolerance = 2;
      usable = (diskCount - 2) * sizeTb;
      penalty = 6;
      expl = "RAID 6 (Dual Parity P+Q): Ikkitalik paritet, bir vaqtda 2 ta disk ishdan chiqishiga ham chidaydi.";
      break;
    case 10:
      faultTolerance = Math.floor(diskCount / 2);
      usable = (diskCount / 2) * sizeTb;
      penalty = 2;
      expl = "RAID 10 (1+0): Har bir ko‘zgu juftligidan 1 tadan disk nosozligiga chidaydi.";
      break;
  }

  const disks: UltraRaidDisk[] = [];
  for (let d = 0; d < diskCount; d++) {
    const blocks: { text: string; isParity?: boolean }[] = [];
    for (let stripe = 0; stripe < 4; stripe++) {
      if (tier === 0) {
        blocks.push({ text: `Blok ${stripe * diskCount + d + 1}` });
      } else if (tier === 1) {
        blocks.push({ text: `Nusxa ${stripe + 1}` });
      } else if (tier === 5) {
        const parityDisk = (3 - stripe + diskCount) % diskCount;
        if (d === parityDisk) blocks.push({ text: `P${stripe + 1}`, isParity: true });
        else blocks.push({ text: `D${stripe + 1}.${d > parityDisk ? d : d + 1}` });
      } else if (tier === 6) {
        const pDisk = stripe % diskCount;
        const qDisk = (stripe + 1) % diskCount;
        if (d === pDisk) blocks.push({ text: `P${stripe + 1}`, isParity: true });
        else if (d === qDisk) blocks.push({ text: `Q${stripe + 1}`, isParity: true });
        else blocks.push({ text: `D${stripe + 1}` });
      } else if (tier === 10) {
        const pair = Math.floor(d / 2);
        blocks.push({ text: `Juft${pair + 1}-B${stripe + 1}` });
      }
    }

    disks.push({
      id: d,
      label: `Disk ${d + 1}`,
      sizeTb,
      state: 'online',
      blocks,
    });
  }

  return {
    tier,
    disks,
    health: 'OPTIMAL',
    rawCapacityTb: diskCount * sizeTb,
    usableCapacityTb: usable,
    faultToleranceCount: faultTolerance,
    writePenaltyIO: penalty,
    explanation: expl,
  };
}

export function checkRaidStatus(sys: UltraRaidSystem): { health: 'OPTIMAL' | 'DEGRADED' | 'FAILED'; alert: string } {
  const failedCount = sys.disks.filter(d => d.state === 'failed').length;

  if (failedCount === 0) {
    return { health: 'OPTIMAL', alert: "Massiv to‘liq optimal holatda, barcha disklar sog‘lom." };
  }

  if (sys.tier === 0) {
    return { health: 'FAILED', alert: "HALOKAT! RAID 0 da disk sinishi natijasida barcha ma’lumotlar yo‘qoldi." };
  }

  if (sys.tier === 5) {
    if (failedCount === 1) {
      return { health: 'DEGRADED', alert: "OGOHLANTIRISH! 1 ta disk nosoz. Massiv ishlamoqda (Degraded), darhol Rebuild zarur!" };
    }
    return { health: 'FAILED', alert: "HALOKAT! RAID 5 da 2 ta disk bir vaqtda ishdan chiqdi. Ma’lumotlar barbod." };
  }

  if (sys.tier === 6) {
    if (failedCount <= 2) {
      return { health: 'DEGRADED', alert: `OGOHLANTIRISH! ${failedCount} ta disk ishdan chiqdi. RAID 6 ikki paritet (P+Q) evaziga ma’lumotni saqlab turibdi.` };
    }
    return { health: 'FAILED', alert: "HALOKAT! RAID 6 da 3 ta disk ishdan chiqdi." };
  }

  if (sys.tier === 1) {
    if (failedCount < sys.disks.length) {
      return { health: 'DEGRADED', alert: "Mirror ko‘zgulardan biri sinmadi, ikkinchisi orqali xizmat davom etmoqda." };
    }
    return { health: 'FAILED', alert: "Barcha ko‘zgu disklar sinishi oqibatida massiv o‘chdi." };
  }

  if (sys.tier === 10) {
    const failedSet = new Set(sys.disks.filter(d => d.state === 'failed').map(d => d.id));
    for (let p = 0; p < sys.disks.length; p += 2) {
      if (failedSet.has(p) && failedSet.has(p + 1)) {
        return { health: 'FAILED', alert: `Bitta ko‘zgu juftligidagi (Disk ${p + 1} va Disk ${p + 2}) har ikki disk sinishi massivni barbod qildi!` };
      }
    }
    return { health: 'DEGRADED', alert: "Degraded holat: Juftliklardagi bittadan disk orqali massiv ishlamoqda." };
  }

  return { health: 'OPTIMAL', alert: "Optimal" };
}

// ----------------- PCIE 3.0 TO 7.0 & CXL SPECIFICATIONS -----------------
export interface PcieSpec {
  gen: string;
  year: number;
  gtPerSec: number;
  encoding: string;
  efficiency: number;
  signaling: 'NRZ' | 'PAM4';
  bandwidthPerLaneSimplexGbps: number;
  keyFeatures: string;
}

export const PCIE_SPECS: Record<string, PcieSpec> = {
  '3.0': {
    gen: 'PCIe 3.0',
    year: 2010,
    gtPerSec: 8,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 0.985, // ~1 GB/s
    keyFeatures: "128b/130b kodlash yordamida uzatish samaradorligi 98.5% ga yetkazilgan.",
  },
  '4.0': {
    gen: 'PCIe 4.0',
    year: 2017,
    gtPerSec: 16,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 1.969, // ~2 GB/s
    keyFeatures: "Ommaviy NVMe Gen4 SSD lar va zamonaviy videokartalar standarti.",
  },
  '5.0': {
    gen: 'PCIe 5.0',
    year: 2019,
    gtPerSec: 32,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 3.938, // ~4 GB/s
    keyFeatures: "Serverlar va eng yangi NVMe Gen5 SSD lar. CXL 1.0/2.0 aynan PCIe 5.0 qatlamida ishlaydi.",
  },
  '6.0': {
    gen: 'PCIe 6.0',
    year: 2022,
    gtPerSec: 64,
    encoding: 'PAM4 + FLIT (FEC)',
    efficiency: 242 / 256,
    signaling: 'PAM4',
    bandwidthPerLaneSimplexGbps: 7.56, // ~8 GB/s
    keyFeatures: "4-sathli PAM4 modulyatsiyasi va xatolarni oldindan tuzatuvchi FEC paketi (FLIT).",
  },
  '7.0': {
    gen: 'PCIe 7.0',
    year: 2025,
    gtPerSec: 128,
    encoding: 'PAM4 + FLIT (FEC)',
    efficiency: 242 / 256,
    signaling: 'PAM4',
    bandwidthPerLaneSimplexGbps: 15.12, // ~16 GB/s
    keyFeatures: "PCI-SIG tasdiqlagan eng yuqori standart: x16 da 512 GB/s gacha ikki yo‘nalishli tezlik.",
  },
};

export function computePcieBandwidthUltra(
  genKey: string,
  lanes: number,
  isDuplex: boolean
): { throughputGBps: number; rawGTps: number; efficiencyPercent: number } {
  const spec = PCIE_SPECS[genKey] || PCIE_SPECS['4.0'];
  const rawGT = spec.gtPerSec * lanes;
  const mult = isDuplex ? 2 : 1;
  const bw = +(spec.bandwidthPerLaneSimplexGbps * lanes * mult).toFixed(2);
  const eff = +(spec.efficiency * 100).toFixed(1);

  return {
    throughputGBps: bw,
    rawGTps: rawGT,
    efficiencyPercent: eff,
  };
}
