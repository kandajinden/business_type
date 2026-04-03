"use client";

import { DiagnosisResult } from "@/types";
import { RANKS } from "@/data/ranks";
import RadarChart from "./RadarChart";

interface Props {
  result: DiagnosisResult;
}

// ランク分布データ（LP / 結果画面共通）
const RANK_DISTRIBUTION = [
  { id: "legend", name: "伝説", percent: 2 },
  { id: "runner", name: "覇者", percent: 11 },
  { id: "elite", name: "猛者", percent: 22 },
  { id: "capable", name: "実戦派", percent: 40 },
  { id: "potential", name: "挑戦者", percent: 20 },
  { id: "awakening", name: "原石", percent: 5 },
];

// Q28回答別のポテンシャル戦闘力パーソナライズメッセージ
const Q28_MESSAGES: Record<string, string> = {
  A: "あなたの力はまだ正しく発揮されていない。勝ち筋を磨けば、評価は必ずついてくる。",
  B: "自分を客観的に見れている。ここからの伸びしろを活かせば、さらに上のステージへ。",
  C: "成長志向があるからこそ、正しい方向に努力すれば戦闘力は飛躍的に上がる。",
  D: "目の前に集中できる力は武器。そこに\"方向性\"が加われば、成果は加速する。",
};

const basePath = process.env.NODE_ENV === "production" ? "/business_type" : "";

export default function ResultPage({ result }: Props) {

  // ── セクション2: 勝ち筋タイプ ──
  const renderWinStyle = () => (
    <section className="section-dark py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm text-[#555555] mb-2">── あなたの勝ち筋 ──</p>
        <div className="bg-[#2A2A2A] rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {result.winStyle.name}
          </h2>
          <p className="text-sm text-[#E84715] mb-4">
            {result.winStyle.catchcopy}
          </p>
        </div>

        <p className="text-sm text-[#CCCCCC] leading-relaxed text-left mb-4">
          {result.winStyle.description}
        </p>
        <WinStyleWeapons weapons={result.winStyle.weapons} />
      </div>
    </section>
  );

  // ── セクション3: 成果加速マップ ──
  const renderChart = () => (
    <section className="section-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <p className="text-sm text-[#555555] text-center mb-4">
          ── 成果加速マップ ──
        </p>
        <RadarChart scores={result.normalizedScores} />
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🟠</span>
            <div>
              <p className="text-sm font-bold text-[#1A1A1A]">
                最強の武器：{result.strongestAxis.label}（
                {result.strongestAxis.score}）
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">──</span>
            <div>
              <p className="text-sm text-[#555555]">
                伸びしろ：{result.weakestAxis.label}（{result.weakestAxis.score}
                ）
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="pb-20">
      {/* ===== セクション1: 戦闘力スコア + ランク + パーセンタイル + 棒グラフ ===== */}
      <section className="section-white py-12 px-4 text-center">
        <p className="text-xs text-[#E84715] font-bold tracking-widest mb-1">
          CAREER SCOUTER
        </p>
        <p className="text-xs text-[#555555] mb-6">
          ── 自分だけの勝ち筋を知れ ──
        </p>

        <p className="text-sm text-[#555555] mb-1">キャリア戦闘力</p>
        <p
          className="power-number text-5xl md:text-6xl mb-3"
          style={{ color: result.rank.numberColor }}
        >
          {result.battlePower.toLocaleString()}
        </p>

        {/* ランクバッジ */}
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
          style={{
            backgroundColor: result.rank.badgeBg,
            color: result.rank.badgeText,
            border:
              result.rank.id === "capable" ? "1px solid #1A1A1A" : "none",
          }}
        >
          RANK：{result.rank.name}
        </span>

        {/* パーセンタイル: 50%以下のみ表示。50%超はDOM自体を出さない */}
        {result.showPercentile && (
          <p className="text-sm text-[#555555] mb-6">
            同年代の上位 {result.percentileRank}%
          </p>
        )}
        {!result.showPercentile && <div className="mb-6" />}

        {/* ランク分布棒グラフ（★←You付き） */}
        <div className="max-w-xs mx-auto text-left space-y-2">
          {RANK_DISTRIBUTION.map((r) => {
            const isYou = result.rank.id === r.id;
            return (
              <div key={r.id} className="flex items-center gap-2 text-xs">
                <span
                  className={`w-[5rem] text-right flex-shrink-0 ${
                    isYou ? "text-[#E84715] font-bold" : "text-[#999999]"
                  }`}
                >
                  {r.name}
                </span>
                <div className="flex-1 flex items-center gap-1">
                  <div
                    className={`rank-bar ${isYou ? "" : "opacity-40"}`}
                    style={{ width: `${(r.percent / 40) * 100}%` }}
                  />
                  <span className="text-[#555555]">{r.percent}%</span>
                </div>
                {isYou && (
                  <span className="text-[#E84715] font-bold flex-shrink-0">
                    ★←You
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#555555] mt-4 italic">
          {result.rank.message}
        </p>
      </section>

      {/* ===== セクション2 & 3: 勝ち筋 → チャート ===== */}
      {renderWinStyle()}
      {renderChart()}

      {/* ===== セクション4: この勝ち筋が活きる場面 ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-[#555555] text-center mb-6">
            ── この勝ち筋が活きる場面 ──
          </p>
          <div className="space-y-6">
            {result.bestScenes.map((scene, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#E84715] font-bold text-sm flex-shrink-0 mt-0.5">
                  {"①②③"[i]}
                </span>
                <div>
                  <p className="text-base font-bold text-[#1A1A1A] mb-1">
                    {scene.title}
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {scene.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== セクション5: ポテンシャル戦闘力 ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-[#555555] text-center mb-2">
            ── ポテンシャル戦闘力 ──
          </p>
          <h3 className="text-lg font-bold text-[#1A1A1A] text-center mb-2">
            あなたの戦闘力、まだ伸びる。
          </h3>
          <p className="text-sm text-[#E84715] text-center mb-6">
            {Q28_MESSAGES[result.q28Evaluation] || Q28_MESSAGES.C}
          </p>

          {/* 現在→ポテンシャル */}
          <div className="text-center mb-6">
            <p className="text-sm text-[#555555] mb-1">現在の戦闘力</p>
            <p className="power-number text-2xl text-[#1A1A1A] mb-2">
              {result.potentialBattlePower.current.toLocaleString()}
            </p>
            <p className="text-[#E84715] text-xl mb-2">↓</p>
            <p className="text-sm text-[#555555] mb-1">ポテンシャル戦闘力</p>
            <p className="power-number text-3xl text-[#E84715] mb-1">
              {result.potentialBattlePower.potential.toLocaleString()}
            </p>
            <p className="text-sm font-bold text-[#E84715]">
              （+{result.potentialBattlePower.growthPercent}%）
            </p>
          </div>

          <p className="text-sm text-[#555555] text-center mb-4">
            以下の3つのアクションを実行すると、
            <br />
            戦闘力は大きく上がる：
          </p>

          {/* 3つのアクション */}
          <div className="space-y-5">
            {result.potentialBattlePower.actions.map((action, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#E84715] font-bold text-sm flex-shrink-0 mt-0.5">
                  {"①②③"[i]}
                </span>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1">
                    {action.label}
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    → {action.description}
                  </p>
                  {action.before != null && action.after != null && (
                    <p className="text-xs text-[#999999] mt-1">
                      → 伸びしろ：{action.before} → {action.after}（推定）
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#999999] mt-4 text-center">
            ※
            ポテンシャル戦闘力は、伸びしろの軸を改善した場合の推定値。
            <br />
            診断で終わりではなく、行動で戦闘力は上がる。
          </p>
        </div>
      </section>

      {/* ===== セクション6: 信頼度 ===== */}
      <section className="section-white py-8 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-[#555555] text-center mb-3">
            ── 診断の信頼度 ──
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 progress-bar h-3">
              <div
                className="progress-bar-fill"
                style={{ width: `${result.reliability * 10}%` }}
              />
            </div>
            <span className="text-sm font-bold text-[#1A1A1A]">
              {result.reliability}/10
            </span>
          </div>
          <p className="text-xs text-[#555555]">{result.reliabilityMessage}</p>
        </div>
      </section>

      {/* ===== セクション7: シェアボタン ===== */}
      <section className="section-white py-8 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-[#555555] mb-4">── 結果をシェア ──</p>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <button className="btn-secondary py-3 rounded-lg text-sm">
              𝕏
            </button>
            <button className="btn-secondary py-3 rounded-lg text-sm">
              Insta
            </button>
            <button className="btn-secondary py-3 rounded-lg text-sm">
              LINE
            </button>
            <button className="btn-secondary py-3 rounded-lg text-sm">
              📷 保存
            </button>
          </div>
          <p className="text-xs text-[#999999]">
            シェア画像には年齢・性別・職種は含まれません
          </p>
        </div>
      </section>

      {/* ===== セクション8: LINE登録CTA ===== */}
      <section className="section-dark py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            あなたの勝ち筋、
            <br />
            ここからが本番。
          </h3>
          <p className="text-sm text-[#CCCCCC] leading-relaxed mb-4">
            診断で見えたのはまだ&quot;輪郭&quot;だけ。
            <br />
            本当の勝ち筋は、自分の中から引き出すもの。
          </p>
          <p className="text-sm text-white leading-relaxed mb-6">
            今回、あなただけの勝ち筋を見つける
            <br />
            <span className="text-[#E84715] font-bold">7つの質問ワークシート</span>を用意しました。
          </p>

          {/* ─── ワークシート冊子画像 ─── */}
          <div className="mb-6">
            <img
              src={`${basePath}/images/worksheet.png`}
              alt="「普通の人生」で終わらせない。本気で突き抜けるための7つの質問ワークシート"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── CTAボタン1 ─── */}
          <button className="btn-line w-full py-4 mb-8">
            【無料】自分だけの勝ち筋を見つける
            <br />
            7つの質問ワークを受け取る
          </button>

          {/* ─── 7つの質問ワーク詳細 ─── */}
          <div className="mb-8">
            <img
              src={`${basePath}/images/work-detail.png`}
              alt="本気で突き抜けるための7つの質問 ワークの一部を公開"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── 書籍の権威性 ─── */}
          <div className="mb-8">
            <img
              src={`${basePath}/images/book-authority.png`}
              alt="初書籍『自分の変え方』Amazon 総合1位 / 7冠達成"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── CTAバナー ─── */}
          <div className="mb-8">
            <img
              src={`${basePath}/images/cta-banner.png`}
              alt="今だけ 最短最速で人生を突き抜ける。無料でワークシートを受け取る"
              className="w-full rounded-lg cursor-pointer"
            />
          </div>

          {/* ─── ミズカラ紹介 + チーム写真 ─── */}
          <div className="mb-6">
            <img
              src={`${basePath}/images/team.png`}
              alt="このワークシートを開発した株式会社ミズカラとは"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── 会社情報テーブル ─── */}
          <div className="mb-8">
            <img
              src={`${basePath}/images/company-table.png`}
              alt="株式会社ミズカラ 会社概要"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── 導入企業 ─── */}
          <div className="mb-8">
            <img
              src={`${basePath}/images/clients.png`}
              alt="実際に変容を起こした企業様 docomo 埼玉西武ライオンズ ショップジャパン 西野亮廣"
              className="w-full rounded-lg"
            />
          </div>

          {/* ─── 最終CTA ─── */}
          <button className="btn-line w-full py-4 mb-3">
            無料でワークシートを受け取る →
          </button>
          <p className="text-[10px] text-[#555555]">
            ※1分で回答できるアンケートにご回答いただいた方に特典を配布しています。
          </p>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function WinStyleWeapons({ weapons }: { weapons: [string, string, string] }) {
  const icons = ["①", "②", "③"];
  return (
    <div className="text-left space-y-2 mt-4">
      <p className="text-xs text-[#E84715] font-bold">3つの武器</p>
      {weapons.map((w, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-xs text-[#E84715]">{icons[i]}</span>
          <p className="text-sm text-[#CCCCCC]">{w}</p>
        </div>
      ))}
    </div>
  );
}
