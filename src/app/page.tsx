"use client";

import { WIN_STYLES } from "@/data/winStyles";

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

      {/* ===== セクション2: 何がわかるか ===== */}
      <section className="section-dark py-16 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            この診断でわかること
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🔢", label: "戦闘力スコア" },
              { icon: "📊", label: "6軸のレーダーチャート" },
              { icon: "🏆", label: "勝ち筋8タイプ" },
              { icon: "💰", label: "ポテンシャル年収" },
              { icon: "🎯", label: "信頼度スコア" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white text-base">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== セクション2.5: 所要時間 ===== */}
      <section className="section-white py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
            所要時間の目安
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <span className="text-[#1A1A1A]">サクサク派 → <strong>2分30秒</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🤔</span>
              <span className="text-[#1A1A1A]">じっくり派 → <strong>5分</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="text-[#1A1A1A]">平均 → <strong>3分20秒</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== セクション3: 結果サンプル ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
            診断結果のイメージ
          </h2>
          <div className="bg-[#1A1A1A] rounded-2xl p-6 text-left">
            <p className="text-xs text-[#E84715] font-bold tracking-widest mb-1">
              BUSINESS SCOUTER
            </p>
            <p className="power-number text-4xl text-white mb-1">119,000</p>
            <span className="inline-block bg-[#FFF3E0] text-[#E65100] text-xs font-bold px-2 py-1 rounded mb-2">
              RANK：精鋭
            </span>
            <p className="text-xs text-[#CCCCCC] mb-4">25歳男性の上位 5%</p>
            <div className="border-t border-[#333] pt-3">
              <p className="text-sm text-[#555555] mb-1">勝ち筋</p>
              <p className="text-xl text-white font-bold">求心力型</p>
              <p className="text-sm text-[#E84715]">
                ビジョンで人を動かし、大きな成果を生み出す
              </p>
            </div>
          </div>
          <p className="text-xs text-[#555555] mt-3">
            ※ 実際の結果はあなたの回答によって変わります
          </p>
          <a
            href="/diagnosis"
            className="btn-primary w-full max-w-md py-4 text-center block mt-6"
          >
            自分だけの勝ち筋を知る（無料・3分）
          </a>
        </div>
      </section>

      {/* ===== セクション4: 勝ち筋8タイプ紹介 ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
            あなたはどの勝ち筋？
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {WIN_STYLES.map((style) => (
              <div
                key={style.id}
                className="border border-[#E0E0E0] rounded-lg p-3 text-center"
              >
                <p className="text-sm font-bold text-[#1A1A1A]">
                  {style.name}
                </p>
                <p className="text-xs text-[#555555] mt-1 leading-snug">
                  {style.catchcopy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== セクション5: 差別化ポイント ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
            普通の診断とは、ここが違う。
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: "🔢",
                title: '戦闘力が"数字"で出る',
                desc: "「俺11万だった、お前は？」が生まれる",
              },
              {
                icon: "🏆",
                title: "勝ち筋が分かる",
                desc: "MBTIは性格。この診断は「成果の出し方」を分類する",
              },
              {
                icon: "🎯",
                title: "回答の一貫性まで測定",
                desc: "自分をどれだけ理解しているかが数字で分かる",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-[#E0E0E0] rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.icon}</span>
                  <p className="font-bold text-[#1A1A1A] text-sm">
                    {item.title}
                  </p>
                </div>
                <p className="text-xs text-[#555555]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== セクション6: 3ステップ ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
            かんたん3ステップ
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "STEP 1",
                title: "基本情報を入力",
                desc: "年齢・性別・職種を選ぶだけ",
              },
              {
                step: "STEP 2",
                title: "30問に回答",
                desc: "直感でサクサク答えるだけ。正解も不正解もない。",
              },
              {
                step: "STEP 3",
                title: "結果を受け取る",
                desc: "戦闘力、勝ち筋タイプ、レーダーチャートが即表示。",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="text-sm font-bold text-[#E84715]">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-sm">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#555555]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="/diagnosis"
            className="btn-primary w-full max-w-md py-4 text-center block mt-8"
          >
            自分だけの勝ち筋を知る（無料・3分）
          </a>
        </div>
      </section>

      {/* ===== セクション7: 結果サンプルギャラリー ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
            こんな結果が出ています
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { power: "35,000", type: "猪突猛進型", rank: "実力者", reliability: "6/10" },
              { power: "119,000", type: "求心力型", rank: "精鋭", reliability: "8/10" },
              { power: "280,000", type: "攻略突破型", rank: "精鋭", reliability: "9/10" },
            ].map((sample) => (
              <div
                key={sample.power}
                className="flex-shrink-0 w-40 bg-[#1A1A1A] rounded-xl p-4 text-center"
              >
                <p className="power-number text-2xl text-white mb-1">
                  {sample.power}
                </p>
                <p className="text-xs text-[#E84715] font-bold mb-1">
                  {sample.rank}
                </p>
                <p className="text-sm text-white font-bold">{sample.type}</p>
                <p className="text-xs text-[#555555] mt-2">
                  信頼度 {sample.reliability}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#555555] mt-4">
            あなたはどのタイプ？ どの戦闘力？
          </p>
        </div>
      </section>

      {/* ===== セクション8: 最終CTA ===== */}
      <section className="section-dark py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-6">
            お前の勝ち筋、
            <br />
            まだ知らないの？
          </h2>
          <a
            href="/diagnosis"
            className="btn-primary w-full max-w-md py-4 text-center block mb-6"
          >
            自分だけの勝ち筋を知る（無料・3分）
          </a>
          <div className="space-y-2 text-sm text-white">
            <p>・完全無料</p>
            <p>・メールアドレス登録不要</p>
            <p>・3分で完了</p>
          </div>
        </div>
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
