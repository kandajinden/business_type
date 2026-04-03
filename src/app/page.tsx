"use client";

import Link from "next/link";

// ランク分布データ（design.md §9 / requirements_v2.md §12-2b）
const RANK_DISTRIBUTION = [
  { name: "伝説", percent: 2, scoreRange: "100万〜" },
  { name: "覇者", percent: 11, scoreRange: "30万〜" },
  { name: "猛者", percent: 22, scoreRange: "10万〜" },
  { name: "実戦派", percent: 40, scoreRange: "3万〜" },
  { name: "挑戦者", percent: 20, scoreRange: "1万〜" },
  { name: "原石", percent: 5, scoreRange: "5,000〜" },
];

export default function LandingPage() {
  return (
    <div>
      {/* ===== ファーストビュー（スクロールなしでCTAまで見える設計） ===== */}
      <section className="min-h-[calc(100svh-56px)] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-[#E84715] mb-1">
          CAREER SCOUTER
        </p>
        <p className="text-[11px] text-[#555555] mb-5">
          ── 自分だけの勝ち筋を、知れ。──
        </p>

        <h1 className="text-[22px] font-bold text-[#1A1A1A] leading-[1.6] mb-2">
          30問の質問から、
          <br />
          あなたのキャリア戦闘力を計測。
        </h1>
        <p className="text-[13px] text-[#555555] leading-relaxed mb-6">
          戦闘力スコア × 勝ち筋タイプ
          <br />
          ── あなただけの結果を。
        </p>

        {/* CTAボタン（ファーストビュー内に配置） */}
        <Link
          href="/diagnosis"
          className="w-[85%] max-w-xs bg-[#E84715] hover:bg-[#D03D12] text-white text-center rounded-lg py-3.5 transition-colors shadow-lg block"
        >
          <span className="text-[11px] block mb-0.5">＼ 3分で完了 ／</span>
          <span className="text-[15px] font-bold">
            【無料】キャリア戦闘力を測定する
          </span>
        </Link>
      </section>

      {/* ===== ランク分布（スクロール後に見える） ===== */}
      <section className="px-6 py-10 border-t border-[#E0E0E0]">
        <div className="max-w-sm mx-auto">
          <p className="text-base font-bold text-[#1A1A1A] text-center mb-5">
            ── あなたはどのランク？ ──
          </p>

          {/* 棒グラフ */}
          <div className="space-y-2.5 mb-6">
            {RANK_DISTRIBUTION.map((rank) => (
              <div key={rank.name} className="flex items-center gap-1.5 text-[13px]">
                <span className="w-[4rem] text-right text-[#1A1A1A] font-bold flex-shrink-0">
                  {rank.name}
                </span>
                <div className="flex-1 flex items-center gap-1.5">
                  <div
                    className="rank-bar"
                    style={{ width: `${(rank.percent / 40) * 100}%` }}
                  />
                  <span className="text-[11px] text-[#555555]">
                    {rank.percent}%
                  </span>
                </div>
                <span className="text-[11px] text-[#999999] w-[3.5rem] text-right flex-shrink-0">
                  {rank.scoreRange}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-[#1A1A1A] font-bold leading-[1.8] mb-6">
            ビジネスパーソンの上位2%は
            <br />
            戦闘力が{" "}
            <span className="power-number text-base">100万</span>を超える。
            <br />
            あなたの戦闘力は？
          </p>

          {/* 2つ目のCTA（スクロール後用） */}
          <Link
            href="/diagnosis"
            className="block w-[85%] max-w-xs mx-auto bg-[#E84715] hover:bg-[#D03D12] text-white text-center rounded-lg py-3.5 transition-colors shadow-lg"
          >
            <span className="text-[15px] font-bold">
              キャリア戦闘力を測定する
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
