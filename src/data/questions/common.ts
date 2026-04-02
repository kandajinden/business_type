import { Question } from "@/types";

// ========================================
// 共通20問 + スライダー6問
// 正本: requirements_v2.md 付録A（4択版・v2正本）
// ========================================

export const COMMON_QUESTIONS: Question[] = [
  // ===== 序盤ゾーン Q1-Q5 =====
  {
    id: "Q1", number: 1, type: "choice", category: "situation", progressWeight: 4,
    text: "友達4人でファミレス。メニューを決める制限時間は30秒。あなたは？",
    options: [
      { label: "A", text: "もう決めてる。店に入る前からだいたい決まってた", scores: { E: 3, A: 1, I: -1 } },
      { label: "B", text: "「おすすめ何？」って店員に聞く。プロの意見が最速", scores: { C: 2, E: 1, A: -1 } },
      { label: "C", text: "30秒？余裕。メニュー表の写真で一番うまそうなやつ即決", scores: { G: 1, E: 1, I: 1, A: -1 } },
      { label: "D", text: "「もうちょっと待って」って言う。30秒じゃ足りん", scores: { A: 2, I: 1, E: -2 } },
    ],
  },
  {
    id: "Q2", number: 2, type: "choice", category: "situation", progressWeight: 4,
    text: "入社して初日の夜。日記を書くとしたら、最初の一文は？",
    options: [
      { label: "A", text: "「明日からどう動くか、もう頭の中で組み立て始めてる」", scores: { E: 2, A: 1, G: 1 } },
      { label: "B", text: "「面白い人が何人かいた。まず仲良くなりたい」", scores: { C: 3, L: -1 } },
      { label: "C", text: "「この会社、ここ変えたら伸びるのに、って3個くらい思いついた」", scores: { I: 3, L: 1, C: -1 } },
      { label: "D", text: "「全体像が見えない。まず情報収集から」", scores: { A: 2, E: 1, I: -1 } },
    ],
  },
  {
    id: "Q3", number: 3, type: "choice", category: "intuition", progressWeight: 2,
    text: "鏡の前。今日の自分に点数をつけろ。何点？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "90点。毎日がベスト更新", scores: { L: 2, G: 1, C: -1 } },
      { label: "B", text: "70点。及第点。まだ伸びしろある", scores: { A: 1, G: 1, E: 1 } },
      { label: "C", text: "点数とかつけない。昨日の自分より前に進んでればOK", scores: { G: 2, I: 1, A: -1 } },
      { label: "D", text: "点数は他人がつけるもの。自分ではわからない", scores: { C: 2, A: 1, L: -2 } },
    ],
  },
  {
    id: "Q4", number: 4, type: "choice", category: "situation", progressWeight: 4,
    text: "毎朝使ってるカフェ。新人バイトが明らかにオペミスってて、行列が伸びてる。あなたの頭の中は？",
    options: [
      { label: "A", text: "「研修の仕組みが悪いんだろうな」とシステムの問題として見る", scores: { A: 2, I: 1, C: -1 } },
      { label: "B", text: "「頑張れ」と心の中で応援してる。自分も新人の頃そうだった", scores: { C: 2, G: 1, L: -1 } },
      { label: "C", text: "「俺がオペ回したほうが速いな」とうずうずしてる", scores: { E: 2, L: 1, C: -1 } },
      { label: "D", text: "「あのバイトの子、ちゃんとフォローされてるのか？」と店長の采配が気になる", scores: { L: 2, C: 1, I: 1 } },
    ],
  },
  {
    id: "Q5", number: 5, type: "slider", category: "slider", progressWeight: 3,
    text: "",
    sliderQuestion: "新しいことを始めるとき、あなたはどっちに近い？",
    sliderLeft: "じっくり調べてから動く",
    sliderRight: "とりあえずやってみる",
    sliderZones: [
      { min: 0, max: 25, scores: { A: 3, E: 2, I: -1 } },
      { min: 26, max: 50, scores: { A: 1, E: 1 } },
      { min: 51, max: 75, scores: { I: 1, G: 1 } },
      { min: 76, max: 100, scores: { I: 3, G: 2, A: -1 } },
    ],
  },
  // ===== 中盤ゾーンA Q6-Q10 =====
  {
    id: "Q6", number: 6, type: "choice", category: "situation", progressWeight: 4,
    text: "チーム全員が「A案でいこう」と言ってる。でもあなたの直感は「B案のほうがいい」。データはどっちも微妙。",
    options: [
      { label: "A", text: "空気読まずに言う。「ちょっと待って。B案も検討しない？」", scores: { L: 3, I: 1, C: -2 } },
      { label: "B", text: "言い方を工夫する。「A案いいね。ちなみにB案だとこうなるけど、どう思う？」", scores: { C: 3, I: 1, L: -1 } },
      { label: "C", text: "A案で進めつつ、こっそりB案の検証も自分だけで進めておく", scores: { I: 2, E: 1, G: 1, C: -1 } },
      { label: "D", text: "「データが微妙ならどっちでも同じ。なら早く動いたほうがいい」とA案で即実行", scores: { E: 3, G: 1, I: -2 } },
    ],
  },
  {
    id: "Q7", number: 7, type: "choice", category: "situation", progressWeight: 4,
    text: "後輩が嬉しそうに「この企画通りました！」と報告。でもあなたは、その企画にちょっとした落とし穴があることに気づいてる。",
    options: [
      { label: "A", text: "「おめでとう！…で、ここ大丈夫？」と即座に指摘する", scores: { L: 2, A: 1, C: -1 } },
      { label: "B", text: "今日は「おめでとう」だけ。指摘は明日。今潰すとモチベが死ぬ", scores: { C: 3, E: 1, L: -1 } },
      { label: "C", text: "落とし穴がどのくらい致命的か先に自分で検証する。大したことなければスルー", scores: { A: 3, E: 1, C: -1 } },
      { label: "D", text: "「実はここリスクあるから、一緒にリカバリ案だけ作っとこう」と巻き取る", scores: { E: 2, L: 1, G: 1, I: -1 } },
    ],
  },
  {
    id: "Q8", number: 8, type: "choice", category: "intuition", progressWeight: 2,
    text: "日曜22時。スマホに仕事のSlack通知。「至急確認お願いします」。親指はどっちに動く？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "即開く。「至急」って書いてるんだから至急だろ", scores: { E: 2, G: 2, I: -1 } },
      { label: "B", text: "開くけど返信は月曜にする。確認だけはしておきたい", scores: { A: 2, E: 1, G: -1 } },
      { label: "C", text: "「了解です。明日朝イチで対応します」とだけ返す", scores: { C: 2, E: 1, L: -1 } },
      { label: "D", text: "開いて、10分で解決できそうならその場で片付ける", scores: { E: 3, G: 1, C: -1 } },
    ],
  },
  {
    id: "Q9", number: 9, type: "choice", category: "situation", progressWeight: 4,
    text: "社内の新規事業コンペ。エントリー任意。賞金30万。ただし通常業務との両立必須。審査員は役員。",
    options: [
      { label: "A", text: "即エントリー。賞金はどうでもいい。役員の前でプレゼンできるチャンスが本番", scores: { L: 3, I: 1, E: -1 } },
      { label: "B", text: "エントリーする前に、過去の受賞作を全部調べる。傾向と対策を立ててからいく", scores: { A: 3, E: 1, L: -1 } },
      { label: "C", text: "面白いけど、今の仕事で数字出すほうが確実にキャリアになる。見送る", scores: { G: 2, E: 1, I: -1, L: -1 } },
      { label: "D", text: "1人じゃなくて、強い人を誘ってチームで出る。勝率を上げにいく", scores: { C: 2, I: 1, A: 1, L: -1 } },
    ],
  },
  {
    id: "Q10", number: 10, type: "slider", category: "slider", progressWeight: 3,
    text: "",
    sliderQuestion: "自分が一番力を発揮できるのは、どっちの環境？",
    sliderLeft: "1人で集中して取り組む環境",
    sliderRight: "チームで一緒に動く環境",
    sliderZones: [
      { min: 0, max: 25, scores: { A: 2, I: 2, G: 1, C: -1 } },
      { min: 26, max: 50, scores: { A: 1, I: 1 } },
      { min: 51, max: 75, scores: { C: 1, L: 1 } },
      { min: 76, max: 100, scores: { C: 2, L: 2, G: 1, I: -1 } },
    ],
  },
  // ===== 中盤ゾーンB Q11-Q15 =====
  {
    id: "Q11", number: 11, type: "choice", category: "situation", progressWeight: 4,
    text: "会議でプレゼン中。途中で上司が「その前提、間違ってない？」と割り込んできた。50人が見てる。",
    options: [
      { label: "A", text: "「いえ、この前提で合っています。理由はこうです」と即座に根拠を返す", scores: { L: 3, A: 1, C: -1 } },
      { label: "B", text: "「面白い視点ですね。前提を変えた場合のシナリオも次回お出しします」と攻めに変える", scores: { I: 2, L: 1, C: 1 } },
      { label: "C", text: "正直、頭が真っ白になる。でもプレゼンは最後までやり切る", scores: { G: 3, E: 1, L: -1 } },
      { label: "D", text: "「ご指摘ありがとうございます。確認して後ほど回答します」と流してプレゼン続行", scores: { E: 2, C: 2, L: -1 } },
    ],
  },
  {
    id: "Q12", number: 12, type: "choice", category: "situation", progressWeight: 4,
    text: "飲み会の帰り道。同僚が「ぶっちゃけ、うちの部長ってどう思う？」あなたは部長に不満がある。",
    options: [
      { label: "A", text: "「正直、○○なところは直してほしいと思ってる」と本音を言う", scores: { L: 2, G: 1, C: -2 } },
      { label: "B", text: "「まあ、色々あるけどな」とぼかす。酔ってる場で本音を言うのはリスク", scores: { A: 2, C: 1, L: -1 } },
      { label: "C", text: "「お前はどう思ってるの？」と先に相手の本音を聞き出す", scores: { C: 2, A: 1, L: -1 } },
      { label: "D", text: "「不満はあるけど、部長なりに考えてることもあるんじゃない」とフェアに答える", scores: { C: 2, I: 1, G: 1, L: -1 } },
    ],
  },
  {
    id: "Q13", number: 13, type: "choice", category: "intuition", progressWeight: 2,
    text: "合コンor飲み会。第一印象で「こいつデキるな」と思わせるのは？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "話の聞き方。相槌と質問がうまい", scores: { C: 3, L: -1 } },
      { label: "B", text: "話のテンポ。短くて面白い", scores: { I: 2, C: 1, A: -1 } },
      { label: "C", text: "知識の幅。何の話題にもついてこれる", scores: { A: 2, I: 1, G: 1 } },
      { label: "D", text: "余裕感。ガツガツしてない", scores: { L: 2, G: 1, C: -1 } },
    ],
  },
  {
    id: "Q14", number: 14, type: "choice", category: "situation", progressWeight: 4,
    text: "自分が主導したキャンペーン。初速は悪い。上司は「まだ1週間だから様子見」。でも直感では「このままだとダメ」。",
    options: [
      { label: "A", text: "データを追加で集めて「やっぱりダメそうです」と数字で上司を説得しにいく", scores: { A: 3, L: 1, E: 1 } },
      { label: "B", text: "上司には何も言わず、自分の裁量範囲で軌道修正を始める", scores: { E: 2, I: 1, G: 1, C: -2 } },
      { label: "C", text: "直感の根拠を言語化して「1週間待つのはリスク。今動くべき理由はこれです」と上申する", scores: { L: 3, A: 1, I: 1, C: -1 } },
      { label: "D", text: "「1週間待つ」と「今動く」のプランBを並行で準備しておく", scores: { E: 3, A: 1, I: 1 } },
    ],
  },
  {
    id: "Q15", number: 15, type: "slider", category: "slider", progressWeight: 3,
    text: "",
    sliderQuestion: "自分のキャリア、どっちの方向に伸ばしたい？",
    sliderLeft: "1つの武器を磨いて「この分野なら負けない」状態を作る",
    sliderRight: "複数の武器を持って「どこでも戦える」状態を作る",
    sliderZones: [
      { min: 0, max: 25, scores: { G: 2, E: 2, I: -1 } },
      { min: 26, max: 50, scores: { G: 1, A: 1 } },
      { min: 51, max: 75, scores: { I: 1, L: 1 } },
      { min: 76, max: 100, scores: { I: 2, L: 2, G: -1 } },
    ],
  },
  // ===== 後半ゾーン Q16-Q20 =====
  {
    id: "Q16", number: 16, type: "choice", category: "situation", progressWeight: 4,
    text: "取引先の担当者。メールの返信が毎回3日かかる。プロジェクトが遅れ始めてる。",
    options: [
      { label: "A", text: "「○日までにご回答いただけると助かります」と締切を明記したメールを送る", scores: { E: 3, A: 1, C: -1 } },
      { label: "B", text: "メールじゃなくて電話する。テキストより声のほうが動く", scores: { C: 2, L: 1, E: 1 } },
      { label: "C", text: "返信を待たずに進められるところを先に進める。相手に依存しない設計にする", scores: { E: 2, I: 2, C: -1 } },
      { label: "D", text: "「お忙しいところすみません」と前置きしつつ、対面でやんわり状況を伝える", scores: { C: 3, E: 1, L: -1 } },
    ],
  },
  {
    id: "Q17", number: 17, type: "choice", category: "situation", progressWeight: 4,
    text: "3ヶ月かけた自分の企画。最終プレゼンでボツ。帰りのエレベーターの中、1人。30秒間、頭の中で何が起きてる？",
    options: [
      { label: "A", text: "「くそ。…でも、どこがダメだった？」。もう分析が始まってる", scores: { A: 2, G: 2, I: -1 } },
      { label: "B", text: "「悔しい。でもあのメンバーでやれたのは良かった」。プロセスに納得してる", scores: { C: 2, G: 1, L: -1 } },
      { label: "C", text: "「次は絶対通す。何を変えるか、もう見えてる」。すでに次の打ち手が浮かんでる", scores: { G: 3, I: 1, A: -1 } },
      { label: "D", text: "「あの審査員の指摘、的外れだったけどな…」。正直、納得してない", scores: { L: 2, I: 1, C: -2, A: -1 } },
    ],
  },
  {
    id: "Q18", number: 18, type: "choice", category: "intuition", progressWeight: 2,
    text: "上司に「お前の弱点って何？」と面談で聞かれた。最初に浮かんだ答えは？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「スピードです。もうちょっと速く動けるようになりたい」", scores: { A: 2, C: 1, E: -1 } },
      { label: "B", text: "「人に頼るのが苦手なところです」", scores: { G: 2, L: 1, C: -2 } },
      { label: "C", text: "「正直、自分ではよくわかってないです」", scores: { C: 2, I: 1, A: -1, L: -1 } },
      { label: "D", text: "「弱点って考えたことないです」", scores: { L: 2, G: 1, A: -1, C: -1 } },
    ],
  },
  {
    id: "Q19", number: 19, type: "choice", category: "situation", progressWeight: 4,
    text: "チームの中で明らかに1人だけ浮いてるメンバー。仕事はできるけど、誰ともランチに行かない。会話も最低限。",
    options: [
      { label: "A", text: "そっとしておく。仕事ができてるなら問題ない", scores: { A: 1, E: 1, C: -1, L: -1 } },
      { label: "B", text: "「ランチ行かない？」と自分から声をかける", scores: { C: 3, L: 1, A: -1 } },
      { label: "C", text: "その人の得意領域を見つけて、仕事を振る。役割があると居場所ができる", scores: { L: 2, I: 1, E: 1 } },
      { label: "D", text: "上司に「あの人ちょっと心配です」と共有する", scores: { C: 1, A: 1, L: -1 } },
    ],
  },
  {
    id: "Q20", number: 20, type: "slider", category: "slider", progressWeight: 3,
    text: "",
    sliderQuestion: "自分の意見とチームの空気が違うとき、あなたはどっちに近い？",
    sliderLeft: "自分が正しいと思ったら空気を読まず言う",
    sliderRight: "空気を読んで意見を調整する",
    sliderZones: [
      { min: 0, max: 25, scores: { L: 3, G: 1, C: -2 } },
      { min: 26, max: 50, scores: { L: 1, G: 1 } },
      { min: 51, max: 75, scores: { C: 1, E: 1 } },
      { min: 76, max: 100, scores: { C: 3, E: 1, L: -2 } },
    ],
  },
  // ===== スライダー Q25 =====
  {
    id: "Q25", number: 25, type: "slider", category: "slider", progressWeight: 3,
    text: "",
    sliderQuestion: "3年後のキャリアを考えたとき、どっちの自分が理想に近い？",
    sliderLeft: "今の領域をとことん極めた自分",
    sliderRight: "まったく新しいことに挑戦してる自分",
    sliderZones: [
      { min: 0, max: 25, scores: { G: 3, E: 1, A: 1, I: -1 } },
      { min: 26, max: 50, scores: { G: 1, A: 1 } },
      { min: 51, max: 75, scores: { I: 1, L: 1 } },
      { min: 76, max: 100, scores: { I: 3, L: 1, G: -1 } },
    ],
  },
  // ===== スライダー Q30（最後） =====
  {
    id: "Q30", number: 30, type: "slider", category: "slider", progressWeight: 5,
    text: "",
    sliderQuestion: "あなたにとって「仕事」とは？",
    sliderLeft: '人生を豊かにするための"手段"',
    sliderRight: '仕事こそが人生"そのもの"',
    sliderZones: [
      { min: 0, max: 25, scores: { I: 1, C: 1, G: -1 } },
      { min: 26, max: 50, scores: { C: 1, I: 1 } },
      { min: 51, max: 75, scores: { G: 1, L: 1 } },
      { min: 76, max: 100, scores: { G: 3, L: 1, E: 1, C: -1 } },
    ],
  },
];
