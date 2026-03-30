import { Question, JobCategory } from "@/types";

// ========================================
// 職種別Q21-Q24（8職種分）
// 正本: requirements_v2.md §7
// 営業・企画・エンジニア・事務・クリエイティブ: v1質問設計から踏襲
// 経営者・役員 / 個人事業主・フリーランス: v2新規
// その他: v1「その他・複合」から踏襲
// ========================================

// --- 営業・販売 ---
const SALES_QUESTIONS: Question[] = [
  {
    id: "Q21_sales", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "アポなし訪問。受付で「担当者は不在です」。これで3回目。受付の人の顔は「もう来るな」って言ってる。",
    options: [
      { label: "A", text: "「お手紙だけお渡しできますか？」と手書きの手紙を差し出す", scores: { I: 2, C: 2, G: 1 } },
      { label: "B", text: "「何時頃お戻りですか？」と聞いて、その時間にもう一回来る", scores: { G: 3, E: 1, C: -1 } },
      { label: "C", text: "この会社は脈なし。別のリストに切り替える", scores: { A: 2, E: 2, G: -1 } },
      { label: "D", text: "受付の人と雑談する。担当者より先にキーパーソンを作る", scores: { C: 3, I: 1, L: 1 } },
      { label: "E", text: "LinkedInやSNSで担当者を見つけてDMする", scores: { I: 2, E: 1, L: 1, C: -1 } },
    ],
  },
  {
    id: "Q22_sales", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: '商談終盤。お客さんが「検討します」。経験上、8割断りの合図。',
    options: [
      { label: "A", text: "「ぶっちゃけ、何が引っかかってますか？」とその場で聞く", scores: { L: 2, C: 1, G: 1 } },
      { label: "B", text: "「いつ頃までにご判断いただけますか？」と次のアクションだけ決めて帰る", scores: { E: 2, A: 1, C: 1 } },
      { label: "C", text: "「もし導入しなかった場合、今の課題はどう解決される予定ですか？」と逆質問", scores: { I: 2, A: 1, C: 1 } },
      { label: "D", text: "「判断材料として○○の資料も追加でお送りしますね」と次の接点を作る", scores: { C: 2, E: 1, G: 1 } },
      { label: "E", text: '「"検討します"って9割お断りの合図なんです。もしそうなら理由を教えてください」', scores: { L: 3, C: 1, A: 1, G: -1 } },
    ],
  },
  {
    id: "Q23_sales", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: "月末最終日。目標まであと1件。確度の高い案件はゼロ。時計は14時。",
    options: [
      { label: "A", text: "過去の失注リストを掘り起こす。3ヶ月前の案件が今なら刺さるかも", scores: { I: 2, A: 1, E: 1 } },
      { label: "B", text: "既存顧客に電話。「追加でお役に立てることないですか？」", scores: { C: 2, G: 1, E: 1 } },
      { label: "C", text: "未達を受け入れる。無理して質の低い契約は来月のクレームになる", scores: { A: 2, E: 1, G: -1, L: -1 } },
      { label: "D", text: "SNSに「今日中にお悩み相談乗ります」と投稿。手段を選ばない", scores: { I: 2, L: 1, G: 2, A: -1 } },
      { label: "E", text: "上司に「1件足りないです。チームで回せる案件ありませんか？」と相談", scores: { C: 2, A: 1, L: -1 } },
    ],
  },
  {
    id: "Q24_sales", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: "「営業で一番大事なスキルは？」一言で。",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「聞く力」", scores: { C: 3, A: 1 } },
      { label: "B", text: "「断られても折れないメンタル」", scores: { G: 3, L: 1 } },
      { label: "C", text: "「相手の課題を見つける力」", scores: { A: 2, I: 2 } },
      { label: "D", text: "「好かれる力」", scores: { C: 2, L: 1 } },
      { label: "E", text: "「行動量」", scores: { E: 2, G: 2 } },
    ],
  },
];

// --- 企画・マーケティング ---
const MARKETING_QUESTIONS: Question[] = [
  {
    id: "Q21_marketing", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "上司に「来週の会議でアイデア3つ持ってきて」。今のところゼロ。金曜17時。",
    options: [
      { label: "A", text: "とりあえず100個書き出す。量を出してから3つに絞る", scores: { I: 3, G: 1, A: -1 } },
      { label: "B", text: '社内の色んな部署の人に「最近何に困ってる？」と聞いて回る', scores: { C: 2, I: 1, A: 1 } },
      { label: "C", text: "競合と他業界の成功事例を30個調べる。パクれるものは全部パクる", scores: { A: 2, I: 2, L: -1 } },
      { label: "D", text: 'カフェに行って、制約を全部外して「何でもアリなら？」で考える', scores: { I: 3, E: 1, A: -1 } },
      { label: "E", text: "まず上司に「3つのアイデアに求める方向性を教えてください」と確認しにいく", scores: { C: 1, A: 2, E: 1, I: -1 } },
    ],
  },
  {
    id: "Q22_marketing", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: "自分が作ったキャンペーン。開始2週間でCVRが想定の半分。予算は残りあと半分。",
    options: [
      { label: "A", text: "LPのヒートマップとアクセスログを全部分析。離脱ポイントを特定", scores: { A: 3, E: 1, G: 1 } },
      { label: "B", text: 'ターゲットに直接聞く。「この広告見た？どう思った？」', scores: { C: 2, I: 1, A: 1 } },
      { label: "C", text: "予算を全部引き上げて、企画をゼロから作り直す", scores: { I: 2, L: 2, G: 1, A: -1 } },
      { label: "D", text: "「もう2週間待たせてください」と上司を説得する", scores: { C: 1, G: 1, A: 1, E: -1 } },
      { label: "E", text: "残り予算でA/Bテストを3パターン回す", scores: { A: 2, I: 1, E: 2 } },
    ],
  },
  {
    id: "Q23_marketing", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: '競合がバズった施策を打ってきた。社内が「うちもやろう」と盛り上がってる。',
    options: [
      { label: "A", text: "「なぜバズったのか」を構造分析。表面だけ真似ても二番煎じ", scores: { A: 3, I: 1 } },
      { label: "B", text: "「同じ土俵で戦わない。うちはこっちで攻める」と別の切り口を提案", scores: { I: 3, L: 1, A: -1 } },
      { label: "C", text: "素直に乗る。追随の速さも武器", scores: { E: 3, G: 1, I: -1 } },
      { label: "D", text: "まず「本当にバズってるのか？」をデータで検証", scores: { A: 3, E: 1, I: -1 } },
      { label: "E", text: '競合のバズに乗っかって「比較コンテンツ」を出す', scores: { I: 2, C: 1, L: 1 } },
    ],
  },
  {
    id: "Q24_marketing", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: "「マーケティングで最も過小評価されてるスキルは？」",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「言語化力」", scores: { C: 2, I: 2 } },
      { label: "B", text: "「観察力」", scores: { A: 2, I: 1 } },
      { label: "C", text: "「捨てる力」", scores: { L: 2, A: 1 } },
      { label: "D", text: "「スピード」", scores: { E: 3, G: 1 } },
      { label: "E", text: "「一貫性」", scores: { G: 2, E: 1 } },
    ],
  },
];

// --- エンジニア・技術職 ---
const ENGINEERING_QUESTIONS: Question[] = [
  {
    id: "Q21_engineering", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "プルリクエストのコードレビュー。先輩の書いたコードに明らかな設計ミスを見つけた。チーム全員が見えるスレッド。",
    options: [
      { label: "A", text: "事実だけ書く。「このパターンだと○○のケースでバグります」", scores: { A: 2, L: 2, C: -1 } },
      { label: "B", text: "DMで先に伝える。公開の場で指摘する前に直接言ったほうがいい", scores: { C: 3, A: 1, L: -1 } },
      { label: "C", text: '代替案のコードを書いてから提示する。「こっちのほうがどうですか？」', scores: { I: 2, E: 2, A: 1 } },
      { label: "D", text: "「ここの設計意図を教えてもらえますか？」と質問形式にする", scores: { C: 2, A: 1, I: 1 } },
      { label: "E", text: "スルーする。先輩のコードに口出して関係が悪くなるのは避けたい", scores: { C: 1, E: 1, L: -2, A: -1 } },
    ],
  },
  {
    id: "Q22_engineering", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: "本番環境で障害。原因は自分が先週マージしたコード。チームのSlackは騒然。",
    options: [
      { label: "A", text: "即座に「自分のコードかもしれません。調査します」と名乗り出る", scores: { L: 3, G: 1, E: 1 } },
      { label: "B", text: "まず障害の影響範囲を確認。原因調査は後。止血最優先", scores: { E: 3, A: 1, L: -1 } },
      { label: "C", text: "ロールバックして正常に戻す。原因調査はサービス復旧後", scores: { E: 2, A: 2, G: 1 } },
      { label: "D", text: "ログを確認して本当に自分のコードが原因か事実確認してから動く", scores: { A: 3, E: 1, L: -1 } },
      { label: "E", text: "「○○の変更が怪しいです。一旦リバートしてもいいですか？」とチームに提案", scores: { C: 2, E: 1, L: 1 } },
    ],
  },
  {
    id: "Q23_engineering", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: '使いたい新技術がある。でもチームに経験者がいない。上司は「リスク」と渋い顔。',
    options: [
      { label: "A", text: "個人の時間でプロトタイプを作る。動くものを見せれば上司の態度は変わる", scores: { G: 3, I: 1, E: 1 } },
      { label: "B", text: "「小さい非本番プロジェクトで試させてください」と交渉", scores: { I: 2, A: 2, C: 1 } },
      { label: "C", text: "「導入しない場合のリスク」を資料にまとめる。技術的負債のコストを可視化", scores: { A: 3, C: 1, L: 1 } },
      { label: "D", text: "外部の勉強会やカンファレンスで登壇者に直接聞く", scores: { C: 2, I: 1, A: 1 } },
      { label: "E", text: "上司の判断を尊重する。今のスタックで最高のものを作ることに集中", scores: { G: 2, E: 1, I: -2 } },
    ],
  },
  {
    id: "Q24_engineering", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: '「動くけど汚いコード」vs「美しいけど未完成のコード」。今日デプロイするなら？',
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "動くほう。動かないコードに価値はない", scores: { E: 3, G: 1 } },
      { label: "B", text: "美しいほうを出して「あと半日ください」と交渉", scores: { I: 2, C: 1, E: -1 } },
      { label: "C", text: '動くほうを出して「明日リファクタリングさせてください」と宣言', scores: { E: 2, C: 1, I: 1 } },
      { label: "D", text: "テストが通るほうを出す。テストだけが客観", scores: { A: 3, E: 1 } },
      { label: "E", text: "上司に判断を仰ぐ。「どっちが求められてますか？」", scores: { C: 2, E: 1, L: -1 } },
    ],
  },
];

// --- 事務・管理 ---
const ADMIN_QUESTIONS: Question[] = [
  {
    id: "Q21_admin", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "経費精算を提出してきた営業マン。レシートがぐちゃぐちゃ。金額も合ってない。これで3回目。",
    options: [
      { label: "A", text: "「次から整理して出してください」と注意書き付きで突き返す", scores: { L: 2, E: 1, C: -1 } },
      { label: "B", text: "黙って直す。注意しても直らないし、自分で直したほうが早い", scores: { E: 2, G: 1, L: -1, C: -1 } },
      { label: "C", text: "経費精算のフォーマットを改善して、そもそも間違えようがない仕組みを作る", scores: { I: 3, A: 1, E: 1 } },
      { label: "D", text: "その営業マンの上司に「部下の経費精算が毎回…」と伝える", scores: { C: 1, A: 1, L: 1, G: -1 } },
      { label: "E", text: "「一緒にやりましょうか」とその場で教える。仕組みより人", scores: { C: 3, L: 1, I: -1 } },
    ],
  },
  {
    id: "Q22_admin", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: '他部署の部長から「このデータ今日中に出せる？」と急な依頼。でも自分の締め作業もある。部長は社内で権力がある人。',
    options: [
      { label: "A", text: "「何時までに必要ですか？」と確認して、両方のスケジュールを組み直す", scores: { E: 3, A: 1, C: 1 } },
      { label: "B", text: "自分の締めを後回しにして対応する。社内政治的にこっちを優先すべき", scores: { C: 2, G: 1, E: -1, L: -1 } },
      { label: "C", text: "「今日は締め作業があるので明日でもいいですか？」と正直に断る", scores: { L: 2, E: 1, C: -1 } },
      { label: "D", text: "「このデータなら○○システムから自分で出せますよ」とセルフサービスの方法を教える", scores: { I: 2, E: 1, C: 1 } },
      { label: "E", text: "自分の上司に「どっち優先ですか？」と判断を仰ぐ", scores: { C: 1, A: 1, L: -1 } },
    ],
  },
  {
    id: "Q23_admin", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: '部署のルールブック。明らかに時代遅れの項目がある。「今どきFAXで報告って…」。でも誰も変えようとしない。',
    options: [
      { label: "A", text: "「なぜこのルールがあるのか」を調べる。背景がわからないまま変えると地雷を踏む", scores: { A: 3, I: 1 } },
      { label: "B", text: "「このルール変えませんか？」と会議で提案する。資料も用意して", scores: { L: 2, I: 1, C: 1, A: 1 } },
      { label: "C", text: "自分だけこっそり省略する。FAXなんて出しても誰も読んでない", scores: { I: 1, E: 1, L: -1, C: -1 } },
      { label: "D", text: "同じこと思ってる人を3人集めてから提案する", scores: { C: 2, L: 1, A: 1 } },
      { label: "E", text: "ルールはルール。守るのがプロ", scores: { G: 2, E: 1, I: -2 } },
    ],
  },
  {
    id: "Q24_admin", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: "「バックオフィスの価値を一言で」",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: '「会社が"壊れない"ようにしてる。インフラの守護者」', scores: { G: 2, E: 2 } },
      { label: "B", text: "「数字で経営を見える化する参謀」", scores: { A: 3, L: 1 } },
      { label: "C", text: "「現場が仕事に集中できる環境を作るプロ」", scores: { C: 2, E: 1 } },
      { label: "D", text: "「ルーティンの中からイノベーションを見つける人」", scores: { I: 2, A: 1 } },
      { label: "E", text: "「正直、過小評価されてると思う」", scores: { L: 1, G: 1 } },
    ],
  },
];

// --- クリエイティブ ---
const CREATIVE_QUESTIONS: Question[] = [
  {
    id: "Q21_creative", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: 'クライアントから3回目のリテイク。フィードバックは「もっとインパクトを」。前回も「インパクト」って言ってた。',
    options: [
      { label: "A", text: "「インパクトって具体的にどういう意味ですか？参考イメージを3つ見せてください」", scores: { A: 2, C: 2, I: -1 } },
      { label: "B", text: '方向性が全然違う案を5つ出す。「この中にありますか？」', scores: { I: 3, G: 1, E: -1 } },
      { label: "C", text: "「最初に出した案が一番良かったです。理由はこうです」と自分の案を通しにいく", scores: { L: 3, I: 1, C: -1 } },
      { label: "D", text: "クライアントの競合のクリエイティブを全部並べて競合視点で提案する", scores: { A: 2, I: 1, C: 1 } },
      { label: "E", text: "そもそも課題設定がズレてる。ブリーフからやり直しを提案する", scores: { L: 2, A: 1, I: 1, C: 1 } },
    ],
  },
  {
    id: "Q22_creative", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: '渾身のデザイン案。自分では最高傑作。でもチーム内レビューで「ターゲットに刺さらないかも」とフィードバック。',
    options: [
      { label: "A", text: "「なぜ刺さらないと思うのか」を具体的に聞いて、データで検証する", scores: { A: 2, C: 1, I: 1 } },
      { label: "B", text: "悔しいけど、チームの声を信じて修正する", scores: { C: 2, G: 1, L: -1 } },
      { label: "C", text: "ターゲット5人に実際に見せる。チームの感覚より、ユーザーの反応がすべて", scores: { A: 2, C: 1, I: 1, L: 1 } },
      { label: "D", text: '「刺さる版」と「自分版」の2つ出して、A/Bテストにかける', scores: { A: 2, I: 2, E: 1 } },
      { label: "E", text: "自分が最高だと思うものを出す。妥協したら最高のものは生まれない", scores: { G: 3, I: 1, C: -2 } },
    ],
  },
  {
    id: "Q23_creative", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: "AI画像生成が進化して、自分の仕事の一部が明らかに自動化できるようになった。",
    options: [
      { label: "A", text: "AIを道具として取り入れる。自分がディレクション、AIに作業させる", scores: { A: 2, E: 2, I: 1 } },
      { label: "B", text: "AIにはできない領域に自分の強みを特化させる", scores: { I: 2, G: 2, A: 1 } },
      { label: "C", text: "AIと共創する。AI×人間のハイブリッドが新しいクリエイティブの形", scores: { I: 3, C: 1 } },
      { label: "D", text: "危機感はあるけど今すぐ変わるわけじゃない。目の前の仕事に集中", scores: { G: 2, E: 1, I: -1 } },
      { label: "E", text: "「AIにできる仕事は最初からクリエイティブじゃなかった」と割り切る", scores: { L: 2, I: 1, A: -1 } },
    ],
  },
  {
    id: "Q24_creative", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: '「クリエイティブの仕事で、"才能"ってどのくらい重要？」',
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「1割。残り9割は鍛錬と知識」", scores: { G: 3, A: 1 } },
      { label: "B", text: "「3割。才能がないと超えられない壁はある」", scores: { I: 2, G: 1 } },
      { label: "C", text: "「才能って言葉が嫌い。全部スキルに分解できる」", scores: { A: 2, I: 1 } },
      { label: "D", text: '「才能より"好き"のほうが大事」', scores: { G: 2, C: 1 } },
      { label: "E", text: "「才能がなくても、見る目があればディレクションで勝てる」", scores: { L: 2, A: 1 } },
    ],
  },
];

// --- 経営者・役員 (v2新規) ---
const EXECUTIVE_QUESTIONS: Question[] = [
  {
    id: "Q21_executive", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "創業メンバーだった右腕が、明らかにパフォーマンスが落ちている。会社のフェーズが変わって、求められるスキルセットと合わなくなってきた。",
    options: [
      { label: "A", text: "本人と1on1で率直に話す。「今の会社に必要なことと、君の強みがズレてきてる」と伝える", scores: { L: 3, C: 1, G: -1 } },
      { label: "B", text: "新しいポジションを作る。その人が活きる役割を社内に見つける", scores: { C: 2, I: 2, L: -1 } },
      { label: "C", text: "外部のコーチやメンターをつけて、本人の成長に賭ける", scores: { C: 3, G: 1, A: -1 } },
      { label: "D", text: "事業の成長が最優先。感情を切り離して、役割を変えるか退場してもらう", scores: { A: 2, E: 2, C: -2 } },
      { label: "E", text: "しばらく様子を見る。恩がある人に今すぐ決断を下す必要はない", scores: { G: 1, C: 1, L: -2 } },
    ],
  },
  {
    id: "Q22_executive", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: '資金調達の場面。投資家から「このビジネスモデル、3年で黒字化できる根拠は？」と詰められた。正直、根拠は弱い。',
    options: [
      { label: "A", text: "「根拠はこれです」と、ある数字を強気に出す。細かい穴は後で埋める", scores: { L: 3, G: 1, A: -1 } },
      { label: "B", text: "「正直、確実な根拠はまだありません。ただ、こういう検証を今進めています」と誠実に答える", scores: { C: 2, A: 2, L: -1 } },
      { label: "C", text: "黒字化の話から、ビジョンと市場の可能性の話に切り替える。数字じゃなく物語で引き込む", scores: { I: 2, C: 2, L: 1 } },
      { label: "D", text: "「3年黒字化」の前提自体に疑問を投げる。「このモデルは5年で見てください。その理由は」", scores: { A: 3, L: 1, I: 1 } },
      { label: "E", text: '具体的な顧客の声と実績数字を並べて「市場が答えを出してます」と現場で語る', scores: { E: 2, A: 1, G: 1 } },
    ],
  },
  {
    id: "Q23_executive", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: '社員50人。最近、社内の雰囲気が悪い。「経営陣は現場を分かってない」という声がSlackの裏チャンネルで飛び交ってるらしい。',
    options: [
      { label: "A", text: "全社ミーティングを開いて、経営の意思決定の背景を全部オープンにする", scores: { L: 3, C: 1, A: -1 } },
      { label: "B", text: "不満の中心人物を特定して、直接1on1する。まず聞く", scores: { C: 3, A: 1, L: -1 } },
      { label: "C", text: "組織設計の問題。マネージャー層を入れて、経営と現場の間にブリッジを作る", scores: { I: 2, A: 2, C: 1 } },
      { label: "D", text: "裏チャンネルの存在自体に介入しない。不満は組織に必ずある。成果が出れば空気は変わる", scores: { G: 2, E: 1, C: -1, L: -1 } },
      { label: "E", text: '自分が現場に入る。1週間、社員と同じ仕事をして「分かってない」を潰す', scores: { E: 3, C: 1, L: 1 } },
    ],
  },
  {
    id: "Q24_executive", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: "経営者にとって一番大事な能力は？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「決断力。迷ってる時間が一番のコスト」", scores: { L: 3, E: 1 } },
      { label: "B", text: "「人を見る目。誰をバスに乗せるかで全部決まる」", scores: { C: 2, A: 2 } },
      { label: "C", text: "「撤退する勇気。やめる判断ができるかどうか」", scores: { A: 2, G: 2 } },
      { label: "D", text: "「ビジョンを語る力。人が集まる旗を立てられるか」", scores: { I: 2, C: 2 } },
      { label: "E", text: "「しぶとさ。結局、生き残った奴が勝つ」", scores: { G: 3, E: 1 } },
    ],
  },
];

// --- 個人事業主・フリーランス (v2新規) ---
const FREELANCE_QUESTIONS: Question[] = [
  {
    id: "Q21_freelance", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: "月収が安定しない。先月は良かったけど、今月の見込みがほぼゼロ。貯金はあと3ヶ月分。朝起きて最初に考えることは？",
    options: [
      { label: "A", text: "「今日中にアポを3件入れる」。とにかく動く。止まったら終わり", scores: { E: 3, G: 1, A: -1 } },
      { label: "B", text: "「月額制のサービスを作ろう」。毎月ゼロからのスタートを構造的に変える", scores: { I: 2, A: 2, E: 1 } },
      { label: "C", text: "「前の取引先に連絡してみよう」。一番確度が高いのは既存の関係", scores: { C: 3, E: 1, L: -1 } },
      { label: "D", text: "「支出を見直そう」。攻める前に守りを固める", scores: { A: 2, G: 2, I: -1 } },
      { label: "E", text: "「3ヶ月あるなら、今こそ自分のコンテンツを作る」。種まきに時間を使う", scores: { I: 2, L: 1, G: 1 } },
    ],
  },
  {
    id: "Q22_freelance", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: '知り合いの経営者から仕事の依頼。「いつもの半額でやってくれない？ 今後たくさん発注するから」。今月の売上はこの案件がないとキツい。',
    options: [
      { label: "A", text: "「今回だけ特別価格で」と受ける。まず実績と関係性を作ることが優先", scores: { C: 2, G: 1, E: 1 } },
      { label: "B", text: "「この金額の内訳と価値はこうです」と正規料金の根拠を説明して断る", scores: { A: 2, L: 2, C: -1 } },
      { label: "C", text: "「半額は厳しいですが、スコープを絞ってこの金額なら」と落としどころを探る", scores: { C: 2, A: 1, I: 1 } },
      { label: "D", text: '「"今後たくさん"の具体的な数字を教えてください」と条件を詰める', scores: { A: 3, L: 1, C: -1 } },
      { label: "E", text: "断る。「安売りしたら自分の市場価値が下がる。一回でも下げたら戻せない」", scores: { L: 3, G: 1, C: -2 } },
    ],
  },
  {
    id: "Q23_freelance", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: 'SNSのフォロワーが伸びてきた。でも、フォロワー数と売上が全然比例してない。「見てくれてるけど買ってくれない」状態。',
    options: [
      { label: "A", text: '発信の内容を変える。「役立つ情報」から「自分にしかできない提案」に切り替える', scores: { I: 3, L: 1, C: -1 } },
      { label: "B", text: '「何に困ってますか？」のアンケートをフォロワーに直接取る', scores: { C: 2, A: 2, I: 1 } },
      { label: "C", text: "SNSは認知の入口。売上はDMやメルマガの導線で作るものだから、ファネルを設計する", scores: { A: 3, E: 1, I: 1 } },
      { label: "D", text: "フォロワー数は追わない。100人の濃いファンを作るほうが売上に直結する", scores: { G: 2, C: 1, A: 1 } },
      { label: "E", text: "「見てくれてるなら、あとは行動量。毎日投稿を倍にする」", scores: { E: 3, G: 1, I: -1 } },
    ],
  },
  {
    id: "Q24_freelance", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: "フリーランスで一番キツい瞬間は？",
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「断られた時。でもすぐ次に行く」", scores: { G: 3, E: 1 } },
      { label: "B", text: "「一人で全部決めないといけない時」", scores: { L: 2, A: 1 } },
      { label: "C", text: "「お金の不安で夜眠れない時」", scores: { G: 2, C: 1 } },
      { label: "D", text: "「自分の価値が分からなくなった時」", scores: { I: 1, C: 2 } },
      { label: "E", text: "「暇な時。何もすることがない日が一番怖い」", scores: { E: 2, I: 1 } },
    ],
  },
];

// --- その他・複合 ---
const OTHER_QUESTIONS: Question[] = [
  {
    id: "Q21_other", number: 21, type: "choice", category: "job_specific", progressWeight: 4,
    text: 'フリーランスor副業で初めて仕事を取る。実績ゼロ。「なぜあなたに頼む必要があるの？」と聞かれた。',
    options: [
      { label: "A", text: "「まずお試しで1件やらせてください。結果が出なければ無料で」", scores: { G: 2, L: 1, C: 1 } },
      { label: "B", text: "「御社の○○という課題に対して、こういうアプローチが有効だと考えています」", scores: { I: 2, A: 1, L: 1 } },
      { label: "C", text: "「前職で○○の経験があります。スキルセットは証明できます」", scores: { A: 2, C: 1, G: 1 } },
      { label: "D", text: "「実績はこれからです。ただ、その分、全力でやります」", scores: { G: 3, L: 1, A: -1 } },
      { label: "E", text: "「まず小さい仕事を1つください。結果で判断してください」", scores: { E: 2, C: 1, G: 1 } },
    ],
  },
  {
    id: "Q22_other", number: 22, type: "choice", category: "job_specific", progressWeight: 4,
    text: 'クライアントから「この見積もり高くない？ 相場の1.5倍だけど」と値下げ交渉。',
    options: [
      { label: "A", text: "「この金額の内訳と根拠はこうです」と明細を見せて説明", scores: { A: 2, C: 1, L: 1 } },
      { label: "B", text: "「何を削れば予算に合いますか？」とスコープ調整を提案", scores: { C: 2, A: 1, E: 1 } },
      { label: "C", text: "今回だけ値引き。最初の1件は実績づくり", scores: { G: 1, C: 1, L: -1, A: -1 } },
      { label: "D", text: "「この金額で受けるかは、このプロジェクトの魅力次第です」と対等な関係を示す", scores: { L: 3, I: 1, C: -1 } },
      { label: "E", text: "「相場の1.5倍の理由は、相場の3倍の結果を出すからです」", scores: { L: 2, G: 2, C: -1 } },
    ],
  },
  {
    id: "Q23_other", number: 23, type: "choice", category: "job_specific", progressWeight: 4,
    text: "独立して半年。月収が不安定。今月は良かったけど来月の見込みがゼロ。",
    options: [
      { label: "A", text: "「営業が足りてない」と自分を叩いて、今日から毎日1件アポを入れる", scores: { G: 3, E: 1, C: -1 } },
      { label: "B", text: "月額制のサービスや顧問契約を作る。ストック収入がないと精神が削られる", scores: { A: 2, I: 2, E: 1 } },
      { label: "C", text: "不安だけど、この不安がないと緊張感を保てない。フリーランスの宿命", scores: { G: 2, L: 1, A: -1 } },
      { label: "D", text: '前職の同僚に連絡する。「仕事ない？」で意外と繋がる', scores: { C: 3, E: 1, L: -1 } },
      { label: "E", text: "コンテンツを作って発信する。今月の仕事は来月の種まきで決まる", scores: { I: 2, E: 1, L: 1 } },
    ],
  },
  {
    id: "Q24_other", number: 24, type: "choice", category: "intuition", progressWeight: 2,
    text: '「"成功する起業家"と"失敗する起業家"の一番の違いは？」',
    subtext: "⚡ 直感2秒で答えて",
    options: [
      { label: "A", text: "「やめなかったかどうか」", scores: { G: 3, E: 1 } },
      { label: "B", text: "「人を巻き込めたかどうか」", scores: { C: 2, L: 2 } },
      { label: "C", text: "「市場を読めたかどうか」", scores: { A: 3, I: 1 } },
      { label: "D", text: "「タイミング」", scores: { I: 2, A: 1 } },
      { label: "E", text: "「正直、運」", scores: { C: 1, I: 1 } },
    ],
  },
];

// ===== 職種→質問マッピング =====

export const JOB_QUESTIONS: Record<string, Question[]> = {
  sales: SALES_QUESTIONS,
  marketing: MARKETING_QUESTIONS,
  engineering: ENGINEERING_QUESTIONS,
  admin: ADMIN_QUESTIONS,
  creative: CREATIVE_QUESTIONS,
  executive: EXECUTIVE_QUESTIONS,
  freelance: FREELANCE_QUESTIONS,
  other: OTHER_QUESTIONS,
};
