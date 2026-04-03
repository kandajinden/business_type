import { Question } from "@/types";

// ========================================
// ぶっちゃけ質問 Q26-Q29
// 正本: requirements_v2.md 付録A（4択版・v2正本）
// ========================================

export const BUTSUCHAKE_QUESTIONS: Question[] = [
  {
    id: "Q26", number: 26, type: "choice", category: "butsuchake", progressWeight: 2.5,
    text: "ぶっちゃけ、10年後どうなっていたい？",
    options: [
      { label: "A", text: "自分の会社を持って、好きなことで稼いでいたい", scores: {} },
      { label: "B", text: "大きい組織で上のポジションにつきたい", scores: {} },
      { label: "C", text: "専門分野で「あの人に聞けば間違いない」と言われたい", scores: {} },
      { label: "D", text: "正直まだわからない。でも今より確実に上にいたい", scores: {} },
    ],
  },
  {
    id: "Q27", number: 27, type: "choice", category: "butsuchake", progressWeight: 2.5,
    noAxisScore: true,
    text: 'ぶっちゃけ、自分の「勝ち方」に一番近いのは？',
    options: [
      { label: "A", text: "圧倒的な量をこなして、数で突破する", scores: {} },
      { label: "B", text: "人を巻き込んで、チームの力で勝つ", scores: {} },
      { label: "C", text: "頭を使って、最短ルートで勝つ", scores: {} },
      { label: "D", text: "一つのことを極めて、専門性で圧倒する", scores: {} },
    ],
  },
  {
    id: "Q28", number: 28, type: "choice", category: "butsuchake", progressWeight: 2.5,
    noAxisScore: true,
    text: 'ぶっちゃけ、今の自分の"評価"に納得してる？',
    options: [
      { label: "A", text: "正直、もっと評価されていいと思ってる", scores: {} },
      { label: "B", text: "まあ妥当かな。実力相応だと思う", scores: {} },
      { label: "C", text: "評価より自分の成長のほうが大事", scores: {} },
      { label: "D", text: "考えたことない。目の前の仕事に集中してる", scores: {} },
    ],
  },
  {
    id: "Q29", number: 29, type: "choice", category: "butsuchake", progressWeight: 2.5,
    text: "この診断、ここまで正直に答えた？",
    options: [
      { label: "A", text: "全問、ガチで正直に答えた", scores: {} },
      { label: "B", text: '9割くらいは正直。ちょっとだけ「良く見せたい」が出た', scores: {} },
      { label: "C", text: '半分くらいは「こっちのほうがカッコいいかな」で選んだ', scores: {} },
      { label: "D", text: "この質問に正直に答えること自体が罠だと思ってる", scores: {} },
    ],
  },
];
