# BUSINESS SCOUTER — 実装タスク（Tasks）

> α版スコープ: 診断フロー → スコア計算 → 結果画面 → シェア → LP
> 依存関係順に実装。各タスクはPR可能な単位。

---

## Phase 0: セットアップ

### T-0.1: Next.js プロジェクト初期化
- [ ] create-next-app (App Router, TypeScript, Tailwind, ESLint)
- [ ] framer-motion, recharts, zustand, satori, @resvg/resvg-js インストール
- [ ] Tailwind カスタムカラー設定 (#0A0E1A, #00FF41, #FFD700)
- [ ] グローバルCSS (ダークテーマ背景, フォント設定)
- [ ] src/ ディレクトリ構成作成

### T-0.2: Prisma + DB セットアップ
- [ ] prisma, @prisma/client インストール
- [ ] schema.prisma (design.md通り)
- [ ] ローカルPostgreSQL接続 (.env.local)
- [ ] migrate dev 実行
- [ ] src/lib/db.ts (Prismaシングルトン)

### T-0.3: 型定義
- [ ] src/types/index.ts (Question, Answer, Score, Result, Warrior, Attribute 等)

---

## Phase 1: データ + スコアリングエンジン

### T-1.1: 質問データ実装
- [ ] src/lib/data/questions.ts — 共通20問 + ぶっちゃけ4問 + スライダー6問 (requirements付録A通り)
- [ ] 職種別24問 (requirements付録B通り)
- [ ] 職種に応じた30問構築関数

### T-1.2: 結果データ実装
- [ ] warriors.ts (6人のコピー, requirements付録D-1通り)
- [ ] attributes.ts (5属性)
- [ ] rangeMessages.ts (6レンジ, requirements付録D-2通り)
- [ ] careerCategories.ts (10カテゴリ+重み, requirements付録E通り)
- [ ] contradictionPairs.ts (10ペア, requirements付録C通り)

### T-1.3: スコアリングエンジン
- [ ] calculateAxisScores.ts — 回答→6軸素点
- [ ] normalizeScores.ts — 正規化(最低15クランプ)
- [ ] calculatePowerScore.ts — 非線形変換+ボーナス(requirements REQ-3.2通り)
- [ ] calculateReliability.ts — 矛盾チェック+Q27+Q29補正
- [ ] determineWarriorType.ts — 最高軸→武将(タイブレイク含む)
- [ ] determineAttribute.ts — SL1,2,4,5,6→属性
- [ ] calculateSalary.ts — salary_min/max(requirements付録F通り)
- [ ] calculatePercentile.ts — 年齢別偏差値
- [ ] calculateCareerFit.ts — 適職TOP3(requirements付録E通り)
- [ ] index.ts — 全計算を1関数にまとめるオーケストレーター

### T-1.4: スコアリングテスト
- [ ] 境界値テスト (全軸最低/最高/同率)
- [ ] ボーナス条件テスト (信頼度10, オールラウンダー++, 伝説)
- [ ] 年収計算テスト (各年齢×Q26×SL3の組み合わせ)
- [ ] 矛盾判定テスト (各ペアの矛盾/非矛盾パターン)

---

## Phase 2: API

### T-2.1: POST /api/diagnosis/start
- [ ] バリデーション (年齢22-35, gender, jobCategory)
- [ ] Session作成
- [ ] 職種別30問を構築して返却

### T-2.2: POST /api/diagnosis/answer
- [ ] Answer upsert
- [ ] ゲージ%算出して返却

### T-2.3: POST /api/diagnosis/calculate
- [ ] 全30問の回答をDB取得
- [ ] スコアリングエンジン実行
- [ ] Result保存 (shareToken自動生成)
- [ ] Session完了フラグ

---

## Phase 3: 診断フロー（フロントエンド）

### T-3.1: 共通UIコンポーネント
- [ ] Button.tsx (primary/secondary, glow effect)
- [ ] ScouterFrame.tsx (ダークネイビー+グリーンボーダー)
- [ ] ScanLine.tsx (スキャンラインアニメーション)

### T-3.2: InfoForm（基本情報入力）
- [ ] 年齢/性別/職種フォーム
- [ ] データ利用同意チェックボックス (REQ-1.2, REQ-8.3)
- [ ] 「測定開始」ボタン → API start呼び出し

### T-3.3: QuestionCard（5択質問）
- [ ] 質問文 + 5選択肢カード表示
- [ ] 直感2秒問ラベル「⚡ 直感で。2秒で。」
- [ ] 選択→ハイライト→次問へスライドアニメーション
- [ ] 回答時間計測

### T-3.4: SliderQuestion（スライダー）
- [ ] 0-100スライダー、初期50、未操作で次へ非活性
- [ ] バー色変化 (青→緑→赤)
- [ ] ツマミ: スカウターレンズ風(40px, glow)
- [ ] フローティング数値表示
- [ ] SL3特殊: リスク選好度+期待値リアルタイム表示
- [ ] SL6特殊: 「診断完了」ボタン
- [ ] ハプティクス (0,25,50,75,100)
- [ ] アクセシビリティ (role=slider, aria-*, キーボード)

### T-3.5: GridQuestion（Q27用6択グリッド）
- [ ] 2列×3行グリッド
- [ ] アイコン+武将名+説明
- [ ] タップ領域48×48px以上

### T-3.6: PowerGauge（戦闘力ゲージ）
- [ ] 画面上部固定
- [ ] スカウターグリーンバー
- [ ] 問い種別別の増加量(+4%/+3%/+2%)
- [ ] スキャンラインエフェクト

### T-3.7: diagnosisStore（zustand）
- [ ] 状態管理 (sessionId, currentIndex, answers, phase等)
- [ ] localStorage永続化 (リロード復帰)
- [ ] 30分失効チェック

### T-3.8: 診断フロー統合
- [ ] /diagnosis ページにInfoForm→質問→結果の全フロー統合
- [ ] 1問ごとにAPI answer呼び出し
- [ ] Q20後ブリッジテキスト表示
- [ ] Q15後に中間フィードバック (暫定戦闘力計算)
- [ ] Q30後に完了演出 → API calculate → /result/[sessionId]へ遷移

### T-3.9: CompletionAnimation（完了演出）
- [ ] 全画面スカウタースキャン
- [ ] 「ANALYZING...」点滅 (2秒)
- [ ] 数字スロットマシン回転 (3秒)
- [ ] 確定「ドン！」

---

## Phase 4: 結果画面

### T-4.1: 結果画面（本人用 /result/[sessionId]）
- [ ] DB取得 (sessionId一致チェック)
- [ ] PowerScore (スカウター演出, レンジ名, レンジ色)
- [ ] WarriorCard (武将×属性, キャッチ, 解説, 注意点)
- [ ] RadarChart (recharts, 6軸, グリーン)
- [ ] ReliabilityBadge (10段階+メッセージ)
- [ ] PercentileBar (上位○%)
- [ ] BonusStatus (✅/❌)
- [ ] SalaryRange (○○○万〜○○○万)
- [ ] CareerFit (TOP3カテゴリ名)
- [ ] LineCTA (3段構え)
- [ ] 再診断ボタン (lineLinked時のみ表示)

### T-4.2: 公開結果画面（/s/[shareToken]）
- [ ] shareTokenでResult取得
- [ ] 公開範囲のみ表示 (REQ-8.4: 戦闘力,武将,属性,レーダー,信頼度,偏差値)
- [ ] 年収/適職/ボーナス/個人情報は非表示
- [ ] 「あなたも測定する」CTA

---

## Phase 5: シェア機能

### T-5.1: シェア画像生成API
- [ ] GET /api/share/image?token=xxx&size=og|instagram
- [ ] satori + resvg でPNG生成
- [ ] レンジ別カラー (グレー→ブルー→白→ゴールド→レインボー)
- [ ] 戦闘力, 武将×属性, レーダー(簡略), 信頼度, 偏差値, URL

### T-5.2: ShareButtons
- [ ] X (テキスト+OGP, #ビジネススカウター)
- [ ] LINE
- [ ] 画像保存
- [ ] Web Share API (モバイル)

---

## Phase 6: LP

### T-6.1: LP全セクション
- [ ] HeroSection (タイトル, CTA, 信頼の根拠)
- [ ] OutputPreview (6アウトプット)
- [ ] 所要時間表示
- [ ] 結果サンプル (モック画像)
- [ ] WarriorCards (6人)
- [ ] 差別化3点
- [ ] StepsSection (3ステップ)
- [ ] 結果ギャラリー (3パターン)
- [ ] 最終CTA
- [ ] FloatingCTA (スクロール追従)
- [ ] SEO/OGP設定

---

## Phase 7: 仕上げ

### T-7.1: α版チェック
- [ ] 通しテスト (LP→診断30問→結果→シェア)
- [ ] モバイル実機確認
- [ ] Lighthouse (LCP<2.5s, CLS<0.1)
- [ ] 同意チェックボックスの動作確認
- [ ] セッション再開の動作確認

---

## 実装順序

```
T-0.1 → T-0.2 → T-0.3
  → T-1.1 → T-1.2 → T-1.3 → T-1.4
  → T-2.1 → T-2.2 → T-2.3
  → T-3.1 → T-3.2〜T-3.6 → T-3.7 → T-3.8 → T-3.9
  → T-4.1 → T-4.2
  → T-5.1 → T-5.2
  → T-6.1
  → T-7.1
```
