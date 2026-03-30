# BUSINESS SCOUTER — 技術設計書（Design）

> **正本**: `specs/requirements.md` v2.0 に基づく

---

## 技術スタック

| レイヤー | 技術 | バージョン |
|---|---|---|
| フレームワーク | Next.js (App Router) | 15 |
| 言語 | TypeScript | 5.x |
| ORM | Prisma | 6.x |
| スタイリング | Tailwind CSS | 4.x |
| DB | PostgreSQL | 16 |
| 本番環境 | Google Cloud (Cloud Run + Cloud SQL) | - |
| 画像生成 | satori + @resvg/resvg-js | - |
| チャート | recharts | - |
| アニメーション | framer-motion | - |
| 状態管理 | zustand | - |

---

## 1. ディレクトリ構成

```
business_type/
├── specs/
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # LP
│   │   ├── globals.css
│   │   ├── diagnosis/
│   │   │   └── page.tsx                  # 基本情報入力 → 診断フロー（SPA）
│   │   ├── result/
│   │   │   └── [sessionId]/
│   │   │       └── page.tsx              # 結果画面（本人用）
│   │   ├── s/
│   │   │   └── [shareToken]/
│   │   │       └── page.tsx              # シェア用公開結果画面
│   │   └── api/
│   │       ├── diagnosis/
│   │       │   ├── start/route.ts
│   │       │   ├── answer/route.ts
│   │       │   └── calculate/route.ts
│   │       └── share/
│   │           └── image/route.tsx       # OG画像生成
│   ├── components/
│   │   ├── lp/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── OutputPreview.tsx
│   │   │   ├── WarriorCards.tsx
│   │   │   ├── StepsSection.tsx
│   │   │   └── FloatingCTA.tsx
│   │   ├── diagnosis/
│   │   │   ├── InfoForm.tsx              # 基本情報入力フォーム
│   │   │   ├── QuestionCard.tsx          # 5択質問
│   │   │   ├── SliderQuestion.tsx        # スライダー
│   │   │   ├── GridQuestion.tsx          # 6択グリッド(Q27)
│   │   │   ├── PowerGauge.tsx            # 戦闘力ゲージ
│   │   │   ├── InterimFeedback.tsx       # 中間フィードバック
│   │   │   ├── BridgeText.tsx            # 職種別ブリッジ
│   │   │   └── CompletionAnimation.tsx   # 完了演出
│   │   ├── result/
│   │   │   ├── PowerScore.tsx
│   │   │   ├── WarriorCard.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── ReliabilityBadge.tsx
│   │   │   ├── PercentileBar.tsx
│   │   │   ├── BonusStatus.tsx
│   │   │   ├── SalaryRange.tsx
│   │   │   ├── CareerFit.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── LineCTA.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── ScouterFrame.tsx
│   │       └── ScanLine.tsx
│   ├── lib/
│   │   ├── scoring/
│   │   │   ├── calculateAxisScores.ts
│   │   │   ├── normalizeScores.ts
│   │   │   ├── calculatePowerScore.ts
│   │   │   ├── calculateReliability.ts
│   │   │   ├── determineWarriorType.ts
│   │   │   ├── determineAttribute.ts
│   │   │   ├── calculateSalary.ts
│   │   │   ├── calculatePercentile.ts
│   │   │   ├── calculateCareerFit.ts
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── questions.ts              # 全質問データ（共通+職種別+ぶっちゃけ+スライダー）
│   │   │   ├── warriors.ts              # 武将データ
│   │   │   ├── attributes.ts            # 属性データ
│   │   │   ├── rangeMessages.ts         # レンジ別メッセージ
│   │   │   ├── careerCategories.ts      # 適職カテゴリマスタ
│   │   │   └── contradictionPairs.ts    # 矛盾ペア定義
│   │   ├── db.ts                         # Prismaクライアント
│   │   └── utils.ts
│   ├── stores/
│   │   └── diagnosisStore.ts             # zustand
│   └── types/
│       └── index.ts                      # 全型定義
├── public/
│   └── fonts/
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 2. DBスキーマ

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model DiagnosisSession {
  id            String    @id @default(cuid())
  age           Int
  gender        String
  jobCategory   String
  startedAt     DateTime  @default(now())
  completedAt   DateTime?
  totalDuration Int?
  expired       Boolean   @default(false)

  utmSource     String?
  utmMedium     String?
  utmCampaign   String?
  userAgent     String?
  deviceType    String?

  answers       Answer[]
  result        DiagnosisResult?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Answer {
  id              String   @id @default(cuid())
  sessionId       String
  questionNumber  Int
  questionType    String
  selectedOption  String?
  sliderValue     Int?
  responseTimeMs  Int

  session         DiagnosisSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)

  @@unique([sessionId, questionNumber])
}

model DiagnosisResult {
  id              String   @id @default(cuid())
  sessionId       String   @unique
  shareToken      String   @unique @default(cuid())

  scoreL          Float
  scoreC          Float
  scoreG          Float
  scoreA          Float
  scoreI          Float
  scoreE          Float

  basePower       Int
  totalPower      Int

  warriorType     String
  attributeType   String
  powerRange      String

  contradictions  Int
  reliability     Int
  q27Match        Boolean

  salaryMin       Int
  salaryMax       Int
  careerTypes     String[]
  percentileRank  Float

  reliabilityBonus  Boolean
  allRounderLevel   String?
  legendBonus       Boolean

  lineLinked      Boolean   @default(false)

  session         DiagnosisSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  createdAt       DateTime  @default(now())
}

model AggregateStats {
  id              String   @id @default(cuid())
  ageGroup        String   @unique
  sampleCount     Int
  meanPower       Float
  stdDevPower     Float
  warriorDist     Json
  updatedAt       DateTime @updatedAt
}
```

---

## 3. API

### POST /api/diagnosis/start
```
入力: { age, gender, jobCategory, utm* }
出力: { sessionId, questions[] }
処理: Session作成 → 職種に応じた30問を構築して返却
```

### POST /api/diagnosis/answer
```
入力: { sessionId, questionNumber, selectedOption?, sliderValue?, responseTimeMs }
出力: { saved, gaugePercent }
処理: Answer upsert → ゲージ%計算
```

### POST /api/diagnosis/calculate
```
入力: { sessionId }
出力: { sessionId, shareToken }
処理: 全回答取得 → スコアリング全計算 → Result保存 → Session完了
```

### GET /api/share/image?token=xxx&size=og|instagram
```
出力: PNG画像
処理: Result取得 → satori で画像生成
```

---

## 4. 状態管理（zustand）

```typescript
interface DiagnosisStore {
  sessionId: string | null;
  currentIndex: number;          // 0-based (0〜29)
  answers: Record<number, { option?: string; slider?: number; timeMs: number }>;
  gaugePercent: number;
  phase: 'info' | 'questions' | 'interim' | 'complete' | 'result';
  interimPower: number | null;
  questions: Question[];

  startSession: (sessionId: string, questions: Question[]) => void;
  submitAnswer: (qNum: number, data: AnswerData) => void;
  nextQuestion: () => void;
  setPhase: (phase: string) => void;
}
```

- localStorageで `sessionId` + `currentIndex` を永続化（リロード復帰用）
- 1問回答ごとにAPIにも保存（REQ-2.9）

---

## 5. ページ遷移

```
/ (LP)
  → /diagnosis (SPA: InfoForm → Q1〜Q15 → Interim → Q16〜Q30 → Complete)
  → /result/[sessionId] (本人用結果)
  → /s/[shareToken] (公開用結果)
```

診断フローは `/diagnosis` 内でSPA遷移（ページリロードなし）。
zustandで状態管理し、URL変更なし（ブラウザバック防止）。

---

## 6. レスポンシブ

| BP | 幅 | 用途 |
|---|---|---|
| mobile | < 640px | メイン対象。全コンポーネントモバイルファースト |
| tablet | 640-1024px | 2カラムレイアウト（LP） |
| desktop | > 1024px | max-w-4xl。スライダー幅60% |

---

## 7. カラーパレット

| 用途 | カラー | コード |
|---|---|---|
| 背景 | ダークネイビー | #0A0E1A |
| 背景グラデ | ダークブラック | #000000 |
| アクセント | スカウターグリーン | #00FF41 |
| テキスト | ホワイト | #FFFFFF |
| サブテキスト | グレー | #9CA3AF |
| 覚醒前 | グレー | #666666 |
| 潜在戦力 | ライトブルー | #4FC3F7 |
| 精鋭/トップランナー | ゴールド | #FFD700 |
| 伝説 | レインボー | gradient |
| ボタン | グリーン発光 | #00FF41 + glow |
| 危険 | レッド | #EF4444 |
