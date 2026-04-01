import { AxisKey, WinStyleType } from "@/types";
import { PotentialAction } from "@/types";

// ========================================
// ポテンシャル戦闘力 アクションテンプレート
// 正本: requirements_v2.md §11-2c
// ========================================

// ------------------------------------------
// 1. 軸ベースのアクション（伸びしろ上位2軸に連動）
// ------------------------------------------

export interface AxisActionTemplate {
  axisKey: AxisKey;
  label: string;
  description: string;
  estimatedImprovement: number; // +12 のブースト幅
}

export const AXIS_ACTION_TEMPLATES: Record<AxisKey, AxisActionTemplate> = {
  L: {
    axisKey: "L",
    label: "「決断力」を強化する",
    description: "週1回、重要な判断を1つ「即決」する練習をする。迷ったら10秒ルール：10秒考えて決まらなければ、直感で選ぶ。",
    estimatedImprovement: 12,
  },
  C: {
    axisKey: "C",
    label: "「巻き込み力」を強化する",
    description: "今週、1つの仕事を誰かに相談してから始める。「自分だけでやる」を「誰かと一緒にやる」に変えるだけで、巻き込み力は鍛えられる。",
    estimatedImprovement: 12,
  },
  G: {
    axisKey: "G",
    label: "「継続力」を強化する",
    description: "3ヶ月の目標を1つ決めて、毎日30秒だけ進捗を記録する。続ける技術は「ハードルを限界まで下げる」ことから始まる。",
    estimatedImprovement: 12,
  },
  A: {
    axisKey: "A",
    label: "「戦略思考」を強化する",
    description: "週1回、自分の仕事の「優先順位」を紙に書き出す。「何をやるか」より「何をやらないか」を決める訓練が戦略思考を鍛える。",
    estimatedImprovement: 12,
  },
  I: {
    axisKey: "I",
    label: "「突破力」を強化する",
    description: "今の仕事の中で「もっと良いやり方」を1つ提案してみる。現状を疑い、改善案を出す習慣が突破力の基盤になる。",
    estimatedImprovement: 12,
  },
  E: {
    axisKey: "E",
    label: "「実行スピード」を強化する",
    description: "タスクを受けたら、最初の5分で手をつける習慣をつける。「後でやろう」を「今5分だけやろう」に置き換えるだけで、実行スピードは劇的に上がる。",
    estimatedImprovement: 12,
  },
};

// ------------------------------------------
// 2. 勝ち筋タイプ固有アクション（3つ目のスロット用）
// ------------------------------------------

export interface WinStyleActionTemplate {
  winStyleType: WinStyleType;
  label: string;
  description: string;
}

export const WIN_STYLE_ACTION_TEMPLATES: Record<WinStyleType, WinStyleActionTemplate> = {
  charger: {
    winStyleType: "charger",
    label: "「猪突猛進」の武器を磨く",
    description: "毎朝「今日一番インパクトのある行動は何か？」を1つ決めてから動き出す。行動量という武器に「方向性」を加えることで、成果が倍増する。",
  },
  architect: {
    winStyleType: "architect",
    label: "「仕組み構築」の武器を磨く",
    description: "同じ作業を2回やったら「これ、自動化できない？」と自分に問いかける。60%の精度でいいから、まず仕組みを作って動かしてみる。",
  },
  attractor: {
    winStyleType: "attractor",
    label: "「求心力」の武器を磨く",
    description: "今週、1つの仕事を「自分より得意な人」に任せてみる。全部自分でやるリーダーから、任せるリーダーへ。それが求心力の最大化。",
  },
  strategist: {
    winStyleType: "strategist",
    label: "「黒子参謀」の武器を磨く",
    description: "今週やった「裏方の仕事」を1つ言語化して、チームに共有する。やったことを見える化する力が、黒子の評価を一気に上げる。",
  },
  breaker: {
    winStyleType: "breaker",
    label: "「攻略突破」の武器を磨く",
    description: "完璧な分析を待たずに、80%の精度で「十分に効果的な一撃」を放つ訓練をする。分析力 × スピードの掛け算が、攻略突破型の真価を発揮させる。",
  },
  fortress: {
    winStyleType: "fortress",
    label: "「鉄壁」の武器を磨く",
    description: "リスクを「致命的」と「許容可能」に仕分けし、致命的なものだけ先に潰す。あとは走りながら対処する。守りの優先順位づけが、鉄壁の進化形。",
  },
  blade: {
    winStyleType: "blade",
    label: "「一刀両断」の武器を磨く",
    description: "自分の専門性の価値を、専門外の人にも伝わる言葉で説明する練習をする。技術力 × 言語化力の掛け算が、一刀両断型を無双させる。",
  },
  dragon: {
    winStyleType: "dragon",
    label: "「伏龍」の武器を磨く",
    description: "70%の準備ができた段階で、あえて飛び出してみる。伏龍は飛び立ってこそ龍になる。「もう少し準備を」の壁を越える練習をする。",
  },
};
