// ========================================
// ビジネス戦闘力診断 v2 - 型定義
// 正本: requirements_v2.md
// ========================================

// --- 入力フォーム ---

export type Gender = "male" | "female" | "other";

export type JobCategory =
  | "sales"
  | "marketing"
  | "engineering"
  | "admin"
  | "creative"
  | "executive"
  | "freelance"
  | "other";

export const JOB_LABELS: Record<JobCategory, string> = {
  sales: "営業・販売",
  marketing: "企画・マーケティング",
  engineering: "エンジニア・技術職",
  admin: "事務・管理",
  creative: "クリエイティブ",
  executive: "経営者・役員",
  freelance: "個人事業主・フリーランス",
  other: "その他",
};

// --- 6軸 (requirements_v2.md §6-1) ---

export type AxisKey = "L" | "C" | "G" | "A" | "I" | "E";

export const AXIS_LABELS: Record<AxisKey, string> = {
  L: "決断力",
  C: "巻き込み力",
  G: "継続力",
  A: "戦略思考",
  I: "突破力",
  E: "実行スピード",
};

// --- 勝ち筋8タイプ (requirements_v2.md §9) ---

export type BasicType = "action" | "relation" | "strategy" | "immersion";
export type Polarity = "yang" | "yin";

export type WinStyleType =
  | "charger"       // 猪突猛進型
  | "architect"     // 仕組み構築型
  | "attractor"     // 求心力型
  | "strategist"    // 黒子参謀型
  | "breaker"       // 攻略突破型
  | "fortress"      // 鉄壁型
  | "blade"         // 一刀両断型
  | "dragon";       // 伏龍型

export interface WinStyleInfo {
  id: WinStyleType;
  name: string;
  catchcopy: string;
  description: string;
  weapons: [string, string, string];
  environment: string;
  accelerator: string;
  basicType: BasicType;
  polarity: Polarity;
}

// --- 戦闘力ランク (requirements_v2.md §10-1) ---

export type RankName =
  | "awakening"
  | "potential"
  | "capable"
  | "elite"
  | "runner"
  | "legend";

export interface RankInfo {
  id: RankName;
  name: string;
  min: number;
  max: number;
  message: string;
  badgeBg: string;
  badgeText: string;
  numberColor: string;
}

// --- 質問 ---

export type QuestionType = "choice" | "slider";

export interface ChoiceOption {
  label: string;
  text: string;
  scores: Partial<Record<AxisKey, number>>;
}

export interface Question {
  id: string;
  number: number;
  type: QuestionType;
  category: "situation" | "intuition" | "slider" | "butsuchake" | "job_specific";
  text: string;
  subtext?: string;
  options?: ChoiceOption[];
  sliderLeft?: string;
  sliderRight?: string;
  sliderQuestion?: string;
  sliderZones?: { min: number; max: number; scores: Partial<Record<AxisKey, number>> }[];
  progressWeight: number; // プログレス増加量 (%)
  noAxisScore?: boolean; // Q27: 6軸に加点しない
}

// --- 診断結果 ---

export interface AxisScores {
  L: number;
  C: number;
  G: number;
  A: number;
  I: number;
  E: number;
}

export interface DiagnosisResult {
  axisScores: AxisScores;
  normalizedScores: AxisScores;
  battlePower: number;
  rank: RankInfo;
  winStyle: WinStyleInfo;
  reliability: number;
  reliabilityMessage: string;
  percentileRank: number; // 同年代上位%
  potentialSalaryMin: number;
  potentialSalaryMax: number;
  strongestAxis: { key: AxisKey; label: string; score: number };
  weakestAxis: { key: AxisKey; label: string; score: number };
  barnumSensitivity: "A" | "B" | "C" | "D" | "E";
}

// --- ユーザー入力 ---

export interface UserProfile {
  age: number;
  gender: Gender;
  job: JobCategory;
}

export interface Answer {
  questionId: string;
  selectedOption?: string; // choice問の選択肢ラベル (A,B,C,D,E)
  sliderValue?: number;    // slider問の値 (0-100)
  answerTimeMs: number;
  dragCount?: number;      // slider問のドラッグ回数
}

// --- 職種マッピング (requirements_v2.md §6-0) ---

export interface JobMapping {
  questionSet: string;
  winStyleAffinity: BasicType;
  careerBonus: string;
  salaryCoefficient: number;
}

export const JOB_MAPPING: Record<JobCategory, JobMapping> = {
  sales:       { questionSet: "sales",      winStyleAffinity: "relation",  careerBonus: "sales",        salaryCoefficient: 1.00 },
  marketing:   { questionSet: "marketing",  winStyleAffinity: "strategy",  careerBonus: "marketing",    salaryCoefficient: 1.05 },
  engineering: { questionSet: "engineering", winStyleAffinity: "strategy",  careerBonus: "engineering",  salaryCoefficient: 1.10 },
  admin:       { questionSet: "admin",      winStyleAffinity: "action",    careerBonus: "pm",           salaryCoefficient: 0.90 },
  creative:    { questionSet: "creative",   winStyleAffinity: "immersion", careerBonus: "creative",     salaryCoefficient: 0.95 },
  executive:   { questionSet: "executive",  winStyleAffinity: "relation",  careerBonus: "management",   salaryCoefficient: 1.45 },
  freelance:   { questionSet: "freelance",  winStyleAffinity: "action",    careerBonus: "entrepreneur", salaryCoefficient: 1.00 },
  other:       { questionSet: "other",      winStyleAffinity: "relation",  careerBonus: "pm",           salaryCoefficient: 1.00 },
};
