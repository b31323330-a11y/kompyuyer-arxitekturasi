// PCI Express & CXL Bus Throughput Engine

export interface PcieGeneration {
  gen: string;
  year: number;
  rawRateGt: number; // GT/s per lane
  encoding: string;
  efficiency: number; // multiplier e.g. 128/130 = 0.9846
  signaling: 'NRZ' | 'PAM4';
  bandwidthPerLaneSimplexGbps: number;
  description: string;
}

export const PCIE_GENERATIONS: Record<string, PcieGeneration> = {
  '3.0': {
    gen: 'PCIe 3.0',
    year: 2010,
    rawRateGt: 8,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 0.985, // ~1 GB/s
    description: "Keng tarqalgan klassik standart. 128b/130b kodlash yordamida uzatish samaradorligi 98.5% ga oshirilgan.",
  },
  '4.0': {
    gen: 'PCIe 4.0',
    year: 2017,
    rawRateGt: 16,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 1.969, // ~2 GB/s
    description: "Zamonaviy ommaviy SSD (NVMe Gen4) va videokartalar standarti. x16 da ~31.5 GB/s simplex.",
  },
  '5.0': {
    gen: 'PCIe 5.0',
    year: 2019,
    rawRateGt: 32,
    encoding: '128b/130b',
    efficiency: 128 / 130,
    signaling: 'NRZ',
    bandwidthPerLaneSimplexGbps: 3.938, // ~4 GB/s
    description: "Serverlar va eng yangi NVMe Gen5 SSD lar. CXL 1.0/2.0 aynan PCIe 5.0 fizik qatlamiga tayanadi.",
  },
  '6.0': {
    gen: 'PCIe 6.0',
    year: 2022,
    rawRateGt: 64,
    encoding: 'PAM4 + FLIT (FEC)',
    efficiency: 242 / 256, // FLIT packet payload efficiency
    signaling: 'PAM4',
    bandwidthPerLaneSimplexGbps: 7.56, // ~8 GB/s
    description: "4 sathli PAM4 signalizatsiyasi va xatolarni tuzatuvchi FEC (Forward Error Correction) bilan jihozlangan.",
  },
  '7.0': {
    gen: 'PCIe 7.0',
    year: 2025,
    rawRateGt: 128,
    encoding: 'PAM4 + FLIT (FEC)',
    efficiency: 242 / 256,
    signaling: 'PAM4',
    bandwidthPerLaneSimplexGbps: 15.12, // ~16 GB/s
    description: "PCI-SIG ning eng yangi standart spetsifikatsiyasi. x16 da 512 GB/s gacha ikki yo‘nalishli o‘tkazuvchanlik beradi.",
  },
};

export function calculatePcieBandwidth(
  genKey: string,
  laneCount: number, // 1, 2, 4, 8, 16
  duplex: 'simplex' | 'duplex' = 'simplex'
): { gbPerSec: number; rawGtPerSec: number; efficiencyPct: number } {
  const g = PCIE_GENERATIONS[genKey] || PCIE_GENERATIONS['4.0'];
  const rawGt = g.rawRateGt * laneCount;
  const multiplier = duplex === 'duplex' ? 2 : 1;
  const throughputGbPerSec = +(g.bandwidthPerLaneSimplexGbps * laneCount * multiplier).toFixed(2);
  const efficiencyPct = +(g.efficiency * 100).toFixed(1);

  return {
    gbPerSec: throughputGbPerSec,
    rawGtPerSec: rawGt,
    efficiencyPct,
  };
}

export interface CxlSubProtocol {
  name: string;
  role: string;
  latencyRequirement: string;
  useCase: string;
}

export const CXL_PROTOCOLS: CxlSubProtocol[] = [
  {
    name: "CXL.io",
    role: "Standart qurilmani aniqlash (discovery), konfiguratsiya va DMA uzatish",
    latencyRequirement: "O‘rtacha (~PCIe bilan bir xil)",
    useCase: "Barcha CXL qurilmalari uchun majburiy boshlang‘ich aloqa va drayver boshqaruvi.",
  },
  {
    name: "CXL.cache",
    role: "Akselerator (GPU/FPGA) ga protsessorning xotirasini kogerent kesh qilish imkoni",
    latencyRequirement: "O‘ta past (nanosekund darajasida)",
    useCase: "AI/ML modellari va katta ma’lumotlarni qayta ishlashda kogerentlikni apparatda saqlash.",
  },
  {
    name: "CXL.mem",
    role: "CPU ga uzoqdagi akselerator yoki tashqi CXL xotira hovuziga to‘g‘ridan-to‘g‘ri murojaat qilish imkoni",
    latencyRequirement: "Past (DRAM darajasiga yaqin)",
    useCase: "Memory pooling va server RAM hajmini terabaytlarga kengaytirish.",
  },
];
