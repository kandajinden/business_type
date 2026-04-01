"use client";

import Link from "next/link";

// ランク分布データ（design.md §9 / requirements_v2.md §12-2b）
const RANK_DISTRIBUTION = [
  { name: "伝説", percent: 2, scoreRange: "1,000,000〜" },
  { name: "トップランナー", percent: 11, scoreRange: "300,000〜" },
  { name: "精鋭", percent: 22, scoreRange: "100,000〜" },
  { name: "実力者", percent: 40, scoreRange: "30,000〜" },
  { name: "潜在戦力", percent: 20, scoreRange: "10,000〜" },
  { name: "覚醒前", percent: 5, scoreRange: "5,000〜" },
];

// サンプルレーダーチャートの軸スコア
const SAMPLE_SCORES = [
  { label: "決断力", score: 82 },
  { label: "巻き込み", score: 71 },
  { label: "継続力", score: 55 },
  { label: "戦略思考", score: 48 },
  { label: "突破力", score: 60 },
  { label: "実行速度", score: 67 },
];

export default function LandingPage() {
  return (
    <div className="pb-24">
      {/* ===== セクション1: ファーストビュー (design.md §9) ===== */}
      <section className="section-white min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-bold tracking-widest text-[#1A1A1A] mb-1">
          CAREER SCOUTER
        </p>
        <p className="text-xs text-[#555555] mb-8">
          ── 自分だけの勝ち筋を、知れ。──
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-4">
          30問の質問から、
          <br />
          あなたのキャリア戦闘力を計測。
        </h1>
        <p className="text-sm text-[#555555]">
          戦闘力スコア × 勝ち筋タイプ
          <br />
          ── あなただけの結果を。
        </p>
      </section>

      {/* ===== セクション2: 2ndビュー - ランク分布 (design.md §9, requirements_v2.md §12-2b) ===== */}
      <section className="section-white py-12 px-4">
        <div className="max-w-md mx-auto">
          <p className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
            ── あなたはどのランク？ ──
          </p>

          {/* ランク分布棒グラフ */}
          <div className="space-y-3 mb-8">
            {RANK_DISTRIBUTION.map((rank) => (
              <div key={rank.name} className="flex items-center gap-2 text-sm">
                <span className="w-[5.5rem] text-right text-[#1A1A1A] font-bold flex-shrink-0">
                  {rank.name}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className="rank-bar"
                    style={{ width: `${(rank.percent / 40) * 100}%` }}
                  />
                  <span className="text-xs text-[#555555] whitespace-nowrap">
                    {rank.percent}%
                  </span>
                </div>
                <span className="text-xs text-[#999999] w-[5.5rem] text-right flex-shrink-0">
                  {rank.scoreRange}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#1A1A1A] font-bold leading-relaxed mb-10">
            ビジネスパーソンの上位2%は
            <br />
            戦闘力が{" "}
            <span className="power-number text-lg">1,000,000</span> を超える。
            <br />
            あなたの戦闘力は？
          </p>

          {/* 結果サンプルカード */}
          <p className="text-base font-bold text-[#1A1A1A] text-center mb-4">
            ── こんな結果が出る ──
          </p>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 text-white mb-6">
            <p className="text-xs text-[#E84715] font-bold mb-1">
              勝ち筋タイプ
            </p>
            <h3 className="text-xl font-bold mb-2">求心力型</h3>
            <p className="text-sm text-[#CCCCCC] mb-4">
              「ビジョンで人を動かし、
              <br />
              大きな成果を生み出す」
            </p>

            {/* ミニレーダーチャート代替: テキストでスコア表示 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SAMPLE_SCORES.map((s) => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-[#CCCCCC]">{s.label}</span>
                  <span className="text-[#E84715] font-bold">{s.score}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#555555] text-center leading-relaxed">
            あなたの「勝ち筋」と
            <br />
            「成果加速マップ」が
            <br />
            3分で分かる。
          </p>
        </div>
      </section>

      {/* ===== フローティングCTAバナー (design.md §9, requirements_v2.md §12-3) ===== */}
      <div className="floating-cta">
        <Link
          href="/diagnosis"
          className="block w-[90%] max-w-md mx-auto bg-[#E84715] hover:bg-[#D03D12] text-white text-center rounded-lg py-3 transition-colors"
        >
          <span className="text-xs block">＼ 3分で完了 ／</span>
          <span className="text-base font-bold">
            【無料】キャリア戦闘力を測定する
          </span>
        </Link>
      </div>
    </div>
  );
}
