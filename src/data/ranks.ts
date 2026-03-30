import { RankInfo, RankName } from "@/types";

// ========================================
// 戦闘力ランク データ
// 正本: requirements_v2.md §10-1, design.md §7
// ========================================

export const RANKS: RankInfo[] = [
  {
    id: "awakening",
    name: "覚醒前",
    min: 5000,
    max: 9999,
    message: "まだ眠っている力がある。ここからが本番。",
    badgeBg: "#E0E0E0",
    badgeText: "#555555",
    numberColor: "#999999",
  },
  {
    id: "potential",
    name: "潜在戦力",
    min: 10000,
    max: 29999,
    message: "力の片鱗が見えている。方向さえ定まれば一気に伸びる。",
    badgeBg: "#E3F2FD",
    badgeText: "#1976D2",
    numberColor: "#1A1A1A",
  },
  {
    id: "capable",
    name: "実力者",
    min: 30000,
    max: 99999,
    message: "着実に力をつけている。ここから先は「戦い方」で差がつく。",
    badgeBg: "#FFFFFF",
    badgeText: "#1A1A1A",
    numberColor: "#1A1A1A",
  },
  {
    id: "elite",
    name: "精鋭",
    min: 100000,
    max: 299999,
    message: "周りより一段上。勝ち筋を磨けば、突き抜ける。",
    badgeBg: "#FFF3E0",
    badgeText: "#E65100",
    numberColor: "#E84715",
  },
  {
    id: "runner",
    name: "トップランナー",
    min: 300000,
    max: 999999,
    message: "同世代で圧倒的な上位。すでに自分の武器を持っている。",
    badgeBg: "#E84715",
    badgeText: "#FFFFFF",
    numberColor: "#E84715",
  },
  {
    id: "legend",
    name: "伝説",
    min: 1000000,
    max: 1500000,
    message: "測定限界突破。もはやスカウターでは測れない領域。",
    badgeBg: "#1A1A1A",
    badgeText: "#FFFFFF",
    numberColor: "#1A1A1A",
  },
];

export function getRank(battlePower: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (battlePower >= RANKS[i].min) return RANKS[i];
  }
  return RANKS[0];
}

// 同年代上位%の計算 (requirements_v2.md §10-2)
interface AgeDistribution {
  mean: number;
  stdDev: number;
}

const AGE_DISTRIBUTIONS: Record<string, AgeDistribution> = {
  "22-24": { mean: 50000, stdDev: 25000 },
  "25-27": { mean: 70000, stdDev: 30000 },
  "28-30": { mean: 90000, stdDev: 35000 },
  "31-33": { mean: 110000, stdDev: 40000 },
  "34-35": { mean: 120000, stdDev: 40000 },
};

function getAgeRange(age: number): string {
  if (age <= 24) return "22-24";
  if (age <= 27) return "25-27";
  if (age <= 30) return "28-30";
  if (age <= 33) return "31-33";
  return "34-35";
}

// 正規分布の累積分布関数（近似）
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1.0 + sign * y);
}

export function calculatePercentileRank(battlePower: number, age: number): number {
  const range = getAgeRange(age);
  const dist = AGE_DISTRIBUTIONS[range];
  const zScore = (battlePower - dist.mean) / dist.stdDev;
  const percentile = (1 - normalCDF(zScore)) * 100;
  return Math.max(0.1, Math.min(99.9, Math.round(percentile * 10) / 10));
}
