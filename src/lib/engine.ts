// ========================================
// ビジネス戦闘力診断 v2 - 診断エンジン
// 正本: requirements_v2.md §8, スコア計算ロジック_詳細.md
// ========================================

import {
  AxisKey,
  AxisScores,
  Answer,
  UserProfile,
  DiagnosisResult,
  WinStyleType,
  BasicType,
  Polarity,
  JOB_MAPPING,
  AXIS_LABELS,
} from "@/types";
import { getRank, calculatePercentileRank } from "@/data/ranks";
import { WIN_STYLES } from "@/data/winStyles";

// ------------------------------------------
// 1. 6軸素点集計 (requirements_v2.md §8)
// ------------------------------------------

export function calculateRawScores(
  answers: Answer[],
  questions: { id: string; options?: { label: string; scores: Partial<Record<AxisKey, number>> }[]; sliderZones?: { min: number; max: number; scores: Partial<Record<AxisKey, number>> }[]; noAxisScore?: boolean }[]
): AxisScores {
  const scores: AxisScores = { L: 0, C: 0, G: 0, A: 0, I: 0, E: 0 };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question || question.noAxisScore) continue;

    if (answer.selectedOption && question.options) {
      const option = question.options.find((o) => o.label === answer.selectedOption);
      if (option) {
        for (const [axis, value] of Object.entries(option.scores)) {
          scores[axis as AxisKey] += value;
        }
      }
    }

    if (answer.sliderValue !== undefined && question.sliderZones) {
      const zone = question.sliderZones.find(
        (z) => answer.sliderValue! >= z.min && answer.sliderValue! <= z.max
      );
      if (zone) {
        for (const [axis, value] of Object.entries(zone.scores)) {
          scores[axis as AxisKey] += value;
        }
      }
    }
  }

  return scores;
}

// ------------------------------------------
// 2. 正規化 0〜100 (最低15にクランプ)
// ------------------------------------------

export function normalizeScores(raw: AxisScores): AxisScores {
  const MIN = -15;
  const MAX = 45;
  const normalize = (v: number) =>
    Math.max(15, Math.round(((v - MIN) / (MAX - MIN)) * 100));

  return {
    L: normalize(raw.L),
    C: normalize(raw.C),
    G: normalize(raw.G),
    A: normalize(raw.A),
    I: normalize(raw.I),
    E: normalize(raw.E),
  };
}

// ------------------------------------------
// 3. 戦闘力スコア算出 (非線形変換 + ボーナス)
// ------------------------------------------

export function calculateBattlePower(
  normalized: AxisScores,
  reliability: number
): number {
  const rawTotal =
    normalized.L + normalized.C + normalized.G +
    normalized.A + normalized.I + normalized.E;

  // 非線形変換
  const basePower = 5000 * Math.pow(rawTotal / 100, 2.5);

  // 信頼度ボーナス
  const reliabilityBonus =
    reliability >= 10 ? 1.4 :
    reliability >= 9 ? 1.3 :
    reliability >= 8 ? 1.2 :
    reliability >= 7 ? 1.1 :
    reliability >= 6 ? 1.05 : 1.0;

  // オールラウンダーボーナス
  const allValues = [normalized.L, normalized.C, normalized.G, normalized.A, normalized.I, normalized.E];
  const minAxis = Math.min(...allValues);
  const allRounderBonus =
    minAxis >= 60 ? 1.35 :
    minAxis >= 50 ? 1.25 :
    minAxis >= 40 ? 1.15 : 1.0;

  let power = basePower * reliabilityBonus * allRounderBonus;

  // 伝説ボーナス (+200,000)
  const maxAxis = Math.max(...allValues);
  const isLegend =
    (reliability >= 10 && minAxis >= 60) ||
    (maxAxis >= 90 && reliability >= 8);
  if (isLegend) power += 200000;

  // レンジ制御
  return Math.round(Math.max(5000, Math.min(1500000, power)));
}

// ------------------------------------------
// 4. 信頼度スコア (矛盾チェック)
// ------------------------------------------

// 矛盾ペアの定義 (スコア計算ロジック_詳細.md §5)
const CONTRADICTION_PAIRS: [string, string][] = [
  ["Q1", "Q12"],
  ["Q2", "Q17"],
  ["Q3", "Q13"],
  ["Q4", "Q16"],
  ["Q6", "Q14"],
  ["Q7", "Q19"],
  ["Q8", "Q18"],
  ["Q9", "Q11"],
];

export function calculateReliability(
  answers: Answer[],
  questions: { id: string; options?: { label: string; scores: Partial<Record<AxisKey, number>> }[] }[],
  sliderAnswers: { sl2?: number; sl4?: number; sl5?: number },
  q27Match: boolean,
  q29Answer?: string
): { score: number; message: string } {
  let contradictions = 0;

  // 5択ペアの矛盾チェック
  for (const [qA, qB] of CONTRADICTION_PAIRS) {
    const ansA = answers.find((a) => a.questionId === qA);
    const ansB = answers.find((a) => a.questionId === qB);
    if (!ansA?.selectedOption || !ansB?.selectedOption) continue;

    const questionA = questions.find((q) => q.id === qA);
    const questionB = questions.find((q) => q.id === qB);
    if (!questionA?.options || !questionB?.options) continue;

    const optA = questionA.options.find((o) => o.label === ansA.selectedOption);
    const optB = questionB.options.find((o) => o.label === ansB.selectedOption);
    if (!optA || !optB) continue;

    // 主軸が逆方向に振れているかチェック
    for (const axis of ["L", "C", "G", "A", "I", "E"] as AxisKey[]) {
      const scoreA = optA.scores[axis] || 0;
      const scoreB = optB.scores[axis] || 0;
      if ((scoreA >= 2 && scoreB <= -1) || (scoreA <= -1 && scoreB >= 2)) {
        contradictions++;
        break;
      }
    }
  }

  // スライダーペアの矛盾チェック
  // ペア⑤: SL1 × SL4 (石橋←→飛ぶ × 空気読まない←→読む)
  // ペア⑩: SL2 × SL5 (1人←→チーム × 極める←→新しいこと)
  if (sliderAnswers.sl2 !== undefined && sliderAnswers.sl5 !== undefined) {
    if (
      (sliderAnswers.sl2 <= 25 && sliderAnswers.sl5 >= 76) ||
      (sliderAnswers.sl2 >= 76 && sliderAnswers.sl5 <= 25)
    ) {
      contradictions++;
    }
  }

  // 補正
  let score = Math.max(1, 10 - contradictions);
  if (q27Match) score = Math.min(10, score + 1);
  if (q29Answer === "B") score = Math.min(10, score + 1);
  if (q29Answer === "C") score = Math.max(1, score - 1);
  if (q29Answer === "D") score = Math.max(1, score - 2);
  if (q29Answer === "E") score = Math.min(10, score + 2);

  const messages: Record<number, string> = {
    10: "鉄壁の自己認識。あなたは自分が何者かを完全に理解している",
    9: "極めて高い一貫性。ブレない軸を持っている",
    8: "高い一貫性。わずかな揺らぎはあるが、軸はしっかりしている",
    7: "おおむね一貫性あり。状況によって判断基準が少し変わるタイプ",
    6: "柔軟性がある反面、自分のスタイルがまだ固まりきっていない",
    5: "器用貧乏の兆候。まだ\"本命の自分\"を選べていない",
    4: "自己認識の発展途上。伸びしろしかない",
    3: "直感と思考がまだ噛み合っていない",
    2: "要キャリブレーション",
    1: "要キャリブレーション",
  };

  return { score, message: messages[score] || "" };
}

// ------------------------------------------
// 5. 勝ち筋タイプ判定 (requirements_v2.md §9-3)
// ------------------------------------------

export function determineWinStyle(
  normalized: AxisScores,
  sl2: number,
  sl4: number,
  job: string,
  answers: Answer[],
  questions: { id: string; options?: { label: string; scores: Partial<Record<AxisKey, number>> }[] }[]
): WinStyleType {
  // STEP 1: 4基本型の判定
  const typeScores: Record<BasicType, number> = {
    action: normalized.E + normalized.G,
    relation: normalized.C + normalized.L,
    strategy: normalized.A + normalized.I,
    immersion: normalized.G + Math.max(normalized.A, normalized.I),
  };

  // 没入型のE条件チェック
  const axisValues = [
    { key: "L", val: normalized.L },
    { key: "C", val: normalized.C },
    { key: "G", val: normalized.G },
    { key: "A", val: normalized.A },
    { key: "I", val: normalized.I },
    { key: "E", val: normalized.E },
  ].sort((a, b) => b.val - a.val);

  const eRank = axisValues.findIndex((v) => v.key === "E") + 1;
  if (eRank <= 4) {
    // Eが4位以上→没入型は成立しない。除外して残り3つから選ぶ
    delete (typeScores as Record<string, number>)["immersion"];
  }

  // 最高スコアの基本型を選ぶ
  const sortedTypes = (Object.entries(typeScores) as [BasicType, number][])
    .sort((a, b) => b[1] - a[1]);

  let selectedType = sortedTypes[0][0];

  // 同率処理
  if (sortedTypes.length >= 2 && sortedTypes[0][1] === sortedTypes[1][1]) {
    const tied = sortedTypes.filter((t) => t[1] === sortedTypes[0][1]).map((t) => t[0]);

    // 第1段階: +2以上の加点回数で比較
    const countHighScores = (type: BasicType): number => {
      const axes: AxisKey[] =
        type === "action" ? ["E", "G"] :
        type === "relation" ? ["C", "L"] :
        type === "strategy" ? ["A", "I"] :
        ["G", "A", "I"];

      let count = 0;
      for (const answer of answers) {
        if (!answer.selectedOption) continue;
        const q = questions.find((qq) => qq.id === answer.questionId);
        if (!q?.options) continue;
        const opt = q.options.find((o) => o.label === answer.selectedOption);
        if (!opt) continue;
        for (const axis of axes) {
          if ((opt.scores[axis] || 0) >= 2) count++;
        }
      }
      return count;
    };

    const tiedWithCounts = tied.map((t) => ({ type: t, count: countHighScores(t) }));
    tiedWithCounts.sort((a, b) => b.count - a.count);

    if (tiedWithCounts[0].count > tiedWithCounts[1].count) {
      selectedType = tiedWithCounts[0].type;
    } else {
      // 第2段階: 職種親和性
      const jobMapping = JOB_MAPPING[job as keyof typeof JOB_MAPPING];
      if (jobMapping && tied.includes(jobMapping.winStyleAffinity)) {
        selectedType = jobMapping.winStyleAffinity;
      } else {
        // 第3段階: 固定順
        const fixedOrder: BasicType[] = ["relation", "strategy", "action", "immersion"];
        selectedType = fixedOrder.find((t) => tied.includes(t)) || tied[0];
      }
    }
  }

  // STEP 2: 表/裏の判定
  const polarityScore = (sl2 + (100 - sl4)) / 2;
  const polarity: Polarity = polarityScore > 50 ? "yang" : "yin";

  // STEP 3: マッチング
  const winStyle = WIN_STYLES.find(
    (s) => s.basicType === selectedType && s.polarity === polarity
  );

  return winStyle?.id || "charger";
}

// ------------------------------------------
// 6. ポテンシャル年収 (スコア計算ロジック_詳細.md §6)
// ------------------------------------------

export function calculatePotentialSalary(
  rawTotal: number,
  age: number,
  job: string,
  q26Answer?: string,
  sl3Value?: number
): { min: number; max: number } {
  // ベース年収
  const baseSalary = 300 + (rawTotal / 600) * 1200;

  // 年齢係数
  const ageCoef =
    age <= 24 ? 0.55 :
    age <= 27 ? 0.70 :
    age <= 30 ? 0.85 :
    age <= 33 ? 1.00 : 1.10;

  const ageAdjusted = baseSalary * ageCoef;

  // 職種係数
  const jobCoef = JOB_MAPPING[job as keyof typeof JOB_MAPPING]?.salaryCoefficient || 1.0;
  const jobAdjusted = ageAdjusted * jobCoef;

  // Q26補正
  const q26Coef =
    q26Answer === "A" ? 1.3 :
    q26Answer === "B" ? 1.1 :
    q26Answer === "D" ? 0.9 : 1.0;
  const q26Adjusted = jobAdjusted * q26Coef;

  // SL3補正（レンジ幅）
  const sl3 = sl3Value ?? 50;
  let salaryMin: number, salaryMax: number;

  if (sl3 <= 25) {
    salaryMin = q26Adjusted - 50;
    salaryMax = q26Adjusted + 50;
  } else if (sl3 <= 50) {
    salaryMin = q26Adjusted - 100;
    salaryMax = q26Adjusted + 100;
  } else if (sl3 <= 75) {
    salaryMin = q26Adjusted * 0.8;
    salaryMax = q26Adjusted * 1.3;
  } else {
    salaryMin = q26Adjusted * 0.6;
    salaryMax = q26Adjusted * 1.8;
  }

  // 10万円単位に丸める
  salaryMin = Math.round(Math.max(200, salaryMin) / 10) * 10;
  salaryMax = Math.round(Math.max(salaryMin + 50, salaryMax) / 10) * 10;

  return { min: salaryMin, max: salaryMax };
}

// ------------------------------------------
// 7. 中間フィードバック (requirements_v2.md §6-0c)
// ------------------------------------------

export function calculateInterimPower(partialAnswers: Answer[], questions: any[]): number {
  const raw = calculateRawScores(partialAnswers, questions);
  // ×2で30問分に外挿
  const extrapolated: AxisScores = {
    L: raw.L * 2, C: raw.C * 2, G: raw.G * 2,
    A: raw.A * 2, I: raw.I * 2, E: raw.E * 2,
  };
  const normalized = normalizeScores(extrapolated);
  const rawTotal =
    normalized.L + normalized.C + normalized.G +
    normalized.A + normalized.I + normalized.E;
  const basePower = 5000 * Math.pow(rawTotal / 100, 2.5);
  // ±20%のランダム揺らぎ
  const variation = 0.8 + Math.random() * 0.4;
  return Math.round(Math.max(5000, basePower * variation));
}

// ------------------------------------------
// 8. 総合結果算出
// ------------------------------------------

export function calculateFullResult(
  answers: Answer[],
  profile: UserProfile,
  questions: any[]
): DiagnosisResult {
  const raw = calculateRawScores(answers, questions);
  const normalized = normalizeScores(raw);

  // スライダー値取得
  const getSlider = (qId: string) =>
    answers.find((a) => a.questionId === qId)?.sliderValue;

  const sl2 = getSlider("Q10") ?? 50;
  const sl3 = getSlider("Q15") ?? 50;
  const sl4 = getSlider("Q20") ?? 50;

  // Q26, Q27, Q28, Q29 の回答取得
  const q26 = answers.find((a) => a.questionId === "Q26")?.selectedOption;
  const q27 = answers.find((a) => a.questionId === "Q27")?.selectedOption;
  const q28 = answers.find((a) => a.questionId === "Q28")?.selectedOption;
  const q29 = answers.find((a) => a.questionId === "Q29")?.selectedOption;

  // 勝ち筋タイプ判定
  const winStyleId = determineWinStyle(normalized, sl2, sl4, profile.job, answers, questions);
  const winStyle = WIN_STYLES.find((s) => s.id === winStyleId)!;

  // Q27自己認識チェック
  const q27BasicTypeMap: Record<string, BasicType> = {
    A: "action",
    B: "relation",
    C: "strategy",
    D: "immersion",
  };
  const q27Match = q27 ? q27BasicTypeMap[q27] === winStyle.basicType : false;

  // 信頼度
  const { score: reliability, message: reliabilityMessage } = calculateReliability(
    answers, questions,
    { sl2, sl4, sl5: getSlider("Q25") },
    q27Match, q29
  );

  // 戦闘力
  const battlePower = calculateBattlePower(normalized, reliability);

  // ランク
  const rank = getRank(battlePower);

  // 上位%
  const percentileRank = calculatePercentileRank(battlePower, profile.age);

  // ポテンシャル年収
  const rawTotal = normalized.L + normalized.C + normalized.G + normalized.A + normalized.I + normalized.E;
  const salary = calculatePotentialSalary(rawTotal, profile.age, profile.job, q26, sl3);

  // 最強の武器・伸びしろ
  const axisEntries = (Object.entries(normalized) as [AxisKey, number][])
    .sort((a, b) => b[1] - a[1]);
  const strongest = axisEntries[0];
  const weakest = axisEntries[axisEntries.length - 1];

  return {
    axisScores: raw,
    normalizedScores: normalized,
    battlePower,
    rank,
    winStyle,
    reliability,
    reliabilityMessage,
    percentileRank,
    potentialSalaryMin: salary.min,
    potentialSalaryMax: salary.max,
    strongestAxis: { key: strongest[0], label: AXIS_LABELS[strongest[0]], score: strongest[1] },
    weakestAxis: { key: weakest[0], label: AXIS_LABELS[weakest[0]], score: weakest[1] },
    barnumSensitivity: (q28 as "A" | "B" | "C" | "D" | "E") || "C",
  };
}
