// ========================================
// キャリア戦闘力診断 v2 - 診断エンジン
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
  SuitableJob,
  PotentialAction,
  PotentialBattlePower,
  JOB_MAPPING,
  AXIS_LABELS,
  JobCategory,
} from "@/types";
import { getRank, calculatePercentileRank } from "@/data/ranks";
import { WIN_STYLES } from "@/data/winStyles";
import { JOB_MASTER, getInputJobBonus } from "@/data/jobMaster";
import { AXIS_ACTION_TEMPLATES, WIN_STYLE_ACTION_TEMPLATES } from "@/data/actionTemplates";

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
): { score: number; message: string; contradictionCount: number } {
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

  // Q29: v2 では 4択（A/B/C/D）。旧Eは廃止、旧Eの+2がDに移行
  // A = ボーナスなし, B = +1, C = -1, D = +2
  if (q29Answer === "B") score = Math.min(10, score + 1);
  if (q29Answer === "C") score = Math.max(1, score - 1);
  if (q29Answer === "D") score = Math.min(10, score + 2);

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

  return { score, message: messages[score] || "", contradictionCount: contradictions };
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
// 6. 向いている職種 (requirements_v2.md §11-2b)
// ------------------------------------------

export function calculateSuitableJobs(
  normalized: AxisScores,
  winStyleId: WinStyleType,
  inputJob: JobCategory
): [SuitableJob, SuitableJob, SuitableJob] {
  const axes: AxisKey[] = ["L", "C", "G", "A", "I", "E"];

  const scored = JOB_MASTER.map((job) => {
    // fit_score = Σ(正規化スコア × required_axes重み) + type_bonus + input_job_bonus
    let axisScore = 0;
    for (const axis of axes) {
      axisScore += normalized[axis] * job.requiredAxes[axis];
    }

    const typeBonus = job.typeBonuses[winStyleId] || 0;
    const inputJobBonus = getInputJobBonus(inputJob, job.category);
    const fitScore = axisScore + typeBonus + inputJobBonus;

    const reason = job.reasonTemplates[winStyleId] || "";

    return {
      name: job.name,
      reason,
      fitScore,
      typeBonus,
      inputJobBonus,
    };
  });

  // ソート: fitScore降順 → typeBonus降順 → inputJobBonus降順 → マスタ定義順
  scored.sort((a, b) => {
    if (b.fitScore !== a.fitScore) return b.fitScore - a.fitScore;
    if (b.typeBonus !== a.typeBonus) return b.typeBonus - a.typeBonus;
    if (b.inputJobBonus !== a.inputJobBonus) return b.inputJobBonus - a.inputJobBonus;
    return 0; // マスタ定義順を維持
  });

  // 上位3件を返す
  const top3 = scored.slice(0, 3).map((s) => ({
    name: s.name,
    reason: s.reason,
    fitScore: Math.round(s.fitScore),
  }));

  return top3 as [SuitableJob, SuitableJob, SuitableJob];
}

// ------------------------------------------
// 7. ポテンシャル戦闘力 (requirements_v2.md §11-2c)
// ------------------------------------------

export function calculatePotentialBattlePower(
  normalized: AxisScores,
  reliability: number,
  currentBattlePower: number,
  winStyleId: WinStyleType
): PotentialBattlePower {
  const axes: AxisKey[] = ["L", "C", "G", "A", "I", "E"];

  // 1. 伸びしろ上位2軸を抽出（スコアが低い上位2軸）
  const sortedByScore = axes
    .map((key) => ({ key, score: normalized[key] }))
    .sort((a, b) => a.score - b.score);

  const weakest1 = sortedByScore[0];
  const weakest2 = sortedByScore[1];

  // 2. +12 ブーストした正規化スコアを作成
  const boosted: AxisScores = { ...normalized };
  boosted[weakest1.key] = Math.min(100, boosted[weakest1.key] + 12);
  boosted[weakest2.key] = Math.min(100, boosted[weakest2.key] + 12);

  // 3. ブースト後の戦闘力を再計算
  const potentialPower = calculateBattlePower(boosted, reliability);

  // 4. 成長率
  const growthPercent = Math.round((potentialPower / currentBattlePower - 1) * 100);

  // 5. 3つのアクションを構築
  const action1: PotentialAction = {
    label: AXIS_ACTION_TEMPLATES[weakest1.key].label,
    description: AXIS_ACTION_TEMPLATES[weakest1.key].description,
    axisKey: weakest1.key,
    before: weakest1.score,
    after: Math.min(100, weakest1.score + 12),
  };

  const action2: PotentialAction = {
    label: AXIS_ACTION_TEMPLATES[weakest2.key].label,
    description: AXIS_ACTION_TEMPLATES[weakest2.key].description,
    axisKey: weakest2.key,
    before: weakest2.score,
    after: Math.min(100, weakest2.score + 12),
  };

  const winStyleAction = WIN_STYLE_ACTION_TEMPLATES[winStyleId];
  const action3: PotentialAction = {
    label: winStyleAction.label,
    description: winStyleAction.description,
  };

  return {
    current: currentBattlePower,
    potential: potentialPower,
    growthPercent,
    actions: [action1, action2, action3],
  };
}

// ------------------------------------------
// 8. 中間フィードバック (requirements_v2.md §6-0c)
// ------------------------------------------

/**
 * sessionId をシードとした簡易ハッシュベースの疑似乱数を生成する。
 * 同じ sessionId なら必ず同じ値を返す（決定的）。
 */
function seededRandom(sessionId: string): number {
  let hash = 0;
  for (let i = 0; i < sessionId.length; i++) {
    const char = sessionId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit整数に変換
  }
  // 0〜1 の範囲に正規化（符号を除去して割る）
  return (Math.abs(hash) % 10000) / 10000;
}

export function calculateInterimPower(
  partialAnswers: Answer[],
  questions: any[],
  sessionId: string
): number {
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
  // ±20%のシードベース揺らぎ（同じsessionIdなら同じ結果）
  const variation = 0.8 + seededRandom(sessionId) * 0.4;
  return Math.round(Math.max(5000, basePower * variation));
}

// ------------------------------------------
// 9. 総合結果算出
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
  const sl4 = getSlider("Q20") ?? 50;

  // Q27, Q28, Q29 の回答取得
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

  // 信頼度（v2: contradictionCount も返す）
  const { score: reliability, message: reliabilityMessage, contradictionCount } = calculateReliability(
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

  // 上位%の表示条件: 50%以下のみ表示 (requirements_v2.md §10-2)
  const showPercentile = percentileRank <= 50;

  // 向いている職種 (v2 正式実装)
  const suitableJobs = calculateSuitableJobs(normalized, winStyleId, profile.job as JobCategory);

  // ポテンシャル戦闘力 (v2 正式実装)
  const potentialBattlePower = calculatePotentialBattlePower(
    normalized, reliability, battlePower, winStyleId
  );

  // 最強の武器・伸びしろ
  const axisEntries = (Object.entries(normalized) as [AxisKey, number][])
    .sort((a, b) => b[1] - a[1]);
  const strongest = axisEntries[0];
  const weakest = axisEntries[axisEntries.length - 1];

  // barnumSensitivity: v2では4択 (A/B/C/D) のみ。Eは廃止
  const validBarnum = (q28 === "A" || q28 === "B" || q28 === "C" || q28 === "D") ? q28 : "C";

  return {
    axisScores: raw,
    normalizedScores: normalized,
    battlePower,
    rank,
    winStyle,
    reliability,
    reliabilityMessage,
    percentileRank,
    showPercentile,
    suitableJobs,
    potentialBattlePower,
    strongestAxis: { key: strongest[0], label: AXIS_LABELS[strongest[0]], score: strongest[1] },
    weakestAxis: { key: weakest[0], label: AXIS_LABELS[weakest[0]], score: weakest[1] },
    barnumSensitivity: validBarnum,
    contradictionCount,
  };
}
