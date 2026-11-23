// RAID Arrays & Storage Technologies Engine

export type RaidLevel = 0 | 1 | 5 | 6 | 10;
export type DiskHealth = 'online' | 'degraded' | 'failed' | 'rebuilding';

export interface RaidDisk {
  id: number;
  name: string;
  sizeTb: number;
  health: DiskHealth;
  blocks: { label: string; isParity?: boolean; dataVal?: string }[];
}

export interface RaidArrayState {
  level: RaidLevel;
  disks: RaidDisk[];
  status: 'OPTIMAL' | 'DEGRADED' | 'FAILED';
  totalRawTb: number;
  usableTb: number;
  faultToleranceDisks: number;
  writePenalty: number; // IO operations per write
  description: string;
}

export function createRaidArray(level: RaidLevel, numDisks: number, diskSizeTb: number): RaidArrayState {
  let faultTolerance = 0;
  let usable = 0;
  let penalty = 1;
  let desc = "";

  switch (level) {
    case 0:
      faultTolerance = 0;
      usable = numDisks * diskSizeTb;
      penalty = 1;
      desc = "Striping: Hech qanday zaxira yo‘q. Bitta disk nosozligi butun massivni yo‘qotadi.";
      break;
    case 1:
      faultTolerance = numDisks - 1;
      usable = diskSizeTb;
      penalty = 2; // write to both mirrors
      desc = "Mirroring: Barcha disklar bir-birining aynan nusxasi. Yuqori ishonchlilik.";
      break;
    case 5:
      faultTolerance = 1;
      usable = (numDisks - 1) * diskSizeTb;
      penalty = 4; // Read old data, read old parity, write new data, write new parity
      desc = "Distributed Parity: 1 ta disk nosozligiga chidaydi. Paritet bloklari barcha disklarga taqsimlangan.";
      break;
    case 6:
      faultTolerance = 2;
      usable = (numDisks - 2) * diskSizeTb;
      penalty = 6; // Dual parity calculation
      desc = "Dual Parity (P+Q): Bir vaqtda 2 ta disk ishdan chiqishiga ham bardosh beradi.";
      break;
    case 10:
      faultTolerance = Math.floor(numDisks / 2);
      usable = (numDisks / 2) * diskSizeTb;
      penalty = 2;
      desc = "Striping + Mirroring (1+0): Har bir ko‘zgu juftligidan 1 tadan disk sinishiga chidaydi. A’lo tezlik.";
      break;
  }

  // Generate stripe blocks visual representation
  const disks: RaidDisk[] = [];
  for (let d = 0; d < numDisks; d++) {
    const blocks: { label: string; isParity?: boolean; dataVal?: string }[] = [];
    for (let stripe = 0; stripe < 4; stripe++) {
      if (level === 0) {
        blocks.push({ label: `A${stripe * numDisks + d + 1}` });
      } else if (level === 1) {
        blocks.push({ label: `Blok ${stripe + 1}` });
      } else if (level === 5) {
        // Diagonal parity rotation
        const parityDisk = (3 - stripe + numDisks) % numDisks;
        if (d === parityDisk) {
          blocks.push({ label: `P${stripe + 1}`, isParity: true });
        } else {
          blocks.push({ label: `D${stripe + 1}.${d > parityDisk ? d : d + 1}` });
        }
      } else if (level === 6) {
        const pDisk = (stripe) % numDisks;
        const qDisk = (stripe + 1) % numDisks;
        if (d === pDisk) blocks.push({ label: `P${stripe + 1}`, isParity: true });
        else if (d === qDisk) blocks.push({ label: `Q${stripe + 1}`, isParity: true });
        else blocks.push({ label: `D${stripe + 1}` });
      } else if (level === 10) {
        const pair = Math.floor(d / 2);
        blocks.push({ label: `G${pair + 1}-B${stripe + 1}` });
      }
    }

    disks.push({
      id: d,
      name: `Disk ${d + 1}`,
      sizeTb: diskSizeTb,
      health: 'online',
      blocks,
    });
  }

  return {
    level,
    disks,
    status: 'OPTIMAL',
    totalRawTb: numDisks * diskSizeTb,
    usableTb: usable,
    faultToleranceDisks: faultTolerance,
    writePenalty: penalty,
    description: desc,
  };
}

export function evaluateRaidHealth(array: RaidArrayState): { status: 'OPTIMAL' | 'DEGRADED' | 'FAILED'; message: string } {
  const failedCount = array.disks.filter(d => d.health === 'failed').length;

  if (failedCount === 0) {
    return { status: 'OPTIMAL', message: "Massiv to‘liq optimal holatda, barcha disklar sog‘lom." };
  }

  if (array.level === 0) {
    return { status: 'FAILED', message: "HALOKAT! RAID 0 da 1 ta disk ishdan chiqdi, barcha ma’lumotlar yo‘qoldi." };
  }

  if (array.level === 5) {
    if (failedCount === 1) {
      return { status: 'DEGRADED', message: "OGOHLANTIRISH! 1 ta disk ishdan chiqdi. Massiv ishlamoqda (Degraded), ammo zudlik bilan diskni almashtirib Rebuild qilish zarur!" };
    } else {
      return { status: 'FAILED', message: "HALOKAT! RAID 5 da 2 ta disk ishdan chiqdi. Ma’lumotlar yo‘qoldi." };
    }
  }

  if (array.level === 6) {
    if (failedCount <= 2) {
      return { status: 'DEGRADED', message: `OGOHLANTIRISH! ${failedCount} ta disk ishdan chiqdi. RAID 6 ikki paritet (P+Q) evaziga ma’lumotlarni saqlab qoldi.` };
    } else {
      return { status: 'FAILED', message: "HALOKAT! RAID 6 da 3 ta disk ishdan chiqdi, massiv barbod bo‘ldi." };
    }
  }

  if (array.level === 1) {
    if (failedCount < array.disks.length) {
      return { status: 'DEGRADED', message: "Mirror disklardan biri sinmadi, ikkinchisi orqali xizmat davom etmoqda." };
    } else {
      return { status: 'FAILED', message: "Barcha ko‘zgu disklar sinishi oqibatida massiv o‘chdi." };
    }
  }

  if (array.level === 10) {
    // Check if both disks in same mirror pair failed
    const failedIds = new Set(array.disks.filter(d => d.health === 'failed').map(d => d.id));
    for (let p = 0; p < array.disks.length; p += 2) {
      if (failedIds.has(p) && failedIds.has(p + 1)) {
        return { status: 'FAILED', message: `Bitta juftlikdagi (Disk ${p + 1} va Disk ${p + 2}) har ikki ko‘zgu disk ishdan chiqdi! Massiv barbod.` };
      }
    }
    return { status: 'DEGRADED', message: "Degraded holat: Juftliklardagi bittadan disk orqali massiv ishlamoqda." };
  }

  return { status: 'OPTIMAL', message: "Optimal" };
}

// 3-2-1 Backup Rule Scenarios
export interface BackupScenario {
  id: string;
  name: string;
  question: string;
  copies: number;
  mediaTypes: string[];
  offsiteLocation: boolean;
  isValid321: boolean;
  feedback: string;
}

export const BACKUP_SCENARIOS: BackupScenario[] = [
  {
    id: "scen_1",
    name: "Kompaniya Serveri",
    question: "Kompaniyada asosiy fayllar RAID 5 serverida saqlanadi va har kecha ofisdagi ikkinchi NAS qurilmasiga to‘liq zaxiralanadi.",
    copies: 2,
    mediaTypes: ["Server RAID", "Office NAS"],
    offsiteLocation: false,
    isValid321: false,
    feedback: "3-2-1 qoidasi buzilgan! 3 ta nusxa emas (faqat 2 ta) va eng asosiysi off-site (boshqa binoda/bulutda) nusxa yo‘q. Ofisda yong‘in bo‘lsa har ikki nusxa yonib ketadi.",
  },
  {
    id: "scen_2",
    name: "Standart 3-2-1 Ishchi Oqimi",
    question: "1. Ishchi kompyuter SSD dagi original fayllar; 2. Mahalliy HDD tashqi drayvidagi haftalik zaxira; 3. AWS S3 / Google Cloud ga shifrlangan kundalik zaxira nusxa.",
    copies: 3,
    mediaTypes: ["Ichki NVMe SSD", "Tashqi HDD", "Cloud Object Storage"],
    offsiteLocation: true,
    isValid321: true,
    feedback: "A’lo! 3 ta nusxa mavjud, 2 xil tashuvchi vositada (SSD va HDD/Cloud), va kamida 1 ta nusxa butunlay boshqa geografik manzilda (off-site Cloud) saqlanmoqda.",
  },
];
