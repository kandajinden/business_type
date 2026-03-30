"use client";

export default function LandingPage() {
  return (
    <div>
      {/* ===== セクション1: ファーストビュー (design.md §9) ===== */}
      <section className="section-white min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-bold tracking-widest text-[#1A1A1A] mb-1">
          BUSINESS SCOUTER
        </p>
        <p className="text-xs text-[#555555] mb-8">
          ── 自分だけの勝ち筋を、知れ。──
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-4">
          30問の質問から、
          <br />
          あなた固有の
          <br />
          「勝ちパターン」を特定。
        </h1>
        <p className="text-sm text-[#555555] mb-8">
          戦闘力スコア × 勝ち筋タイプ
          <br />
          ── あなただけの結果を。
        </p>
        <a
          href="/diagnosis"
          className="btn-primary w-[90%] max-w-md py-4 text-center block"
        >
          自分だけの勝ち筋を知る（無料・3分）
        </a>
        <p className="text-xs text-[#555555] mt-4">
          ※ 累計10,000人以上が診断済み
        </p>
      </section>

      {/* ===== フローティングCTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/90 backdrop-blur-sm border-t border-[#E0E0E0]">
        <a
          href="/diagnosis"
          className="btn-primary w-[90%] max-w-md py-3 text-center block mx-auto text-sm"
        >
          自分だけの勝ち筋を知る（無料・3分）
        </a>
      </div>
    </div>
  );
}
