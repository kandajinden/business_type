"use client";

import { DiagnosisResult } from "@/types";
import { RANKS } from "@/data/ranks";
import RadarChart from "./RadarChart";

interface Props {
  result: DiagnosisResult;
  age: number;
  gender: string;
}

export default function ResultPage({ result, age, gender }: Props) {
  const genderLabel = gender === "male" ? "男性" : gender === "female" ? "女性" : "";
  const isHighSensitivity = result.barnumSensitivity === "A" || result.barnumSensitivity === "B";
  const isLowSensitivity = result.barnumSensitivity === "D" || result.barnumSensitivity === "E";

  // 低感受性: チャート→勝ち筋の順序入替
  const renderWinStyle = () => (
    <section className="section-dark py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <p className="text-sm text-[#555555] mb-2">── あなたの勝ち筋 ──</p>
        <div className="bg-[#2A2A2A] rounded-2xl p-6 mb-4">
          <h2
            className={`text-2xl font-bold text-white mb-2 ${
              isHighSensitivity ? "animate-[fadeIn_0.3s_0.3s_both]" : ""
            }`}
          >
            {result.winStyle.name}
          </h2>
          <p
            className={`text-sm text-[#E84715] mb-4 ${
              isHighSensitivity ? "animate-[fadeIn_0.3s_0.6s_both]" : ""
            }`}
          >
            {result.winStyle.catchcopy}
          </p>
        </div>

        {isLowSensitivity ? (
          <details className="text-left">
            <summary className="text-sm text-[#CCCCCC] cursor-pointer mb-2">
              詳細を見る ▼
            </summary>
            <div className="text-sm text-[#CCCCCC] leading-relaxed mb-4">
              {result.winStyle.description}
            </div>
            <WinStyleWeapons weapons={result.winStyle.weapons} />
          </details>
        ) : (
          <>
            <p className="text-sm text-[#CCCCCC] leading-relaxed text-left mb-4">
              {result.winStyle.description}
            </p>
            <WinStyleWeapons weapons={result.winStyle.weapons} />
          </>
        )}
      </div>
    </section>
  );

  const renderChart = () => (
    <section className="section-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <p className="text-sm text-[#555555] text-center mb-4">── 成果加速マップ ──</p>
        <RadarChart scores={result.normalizedScores} />
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm">🟠</span>
            <div>
              <p className="text-sm font-bold text-[#1A1A1A]">
                最強の武器：{result.strongestAxis.label}（{result.strongestAxis.score}）
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">──</span>
            <div>
              <p className="text-sm text-[#555555]">
                伸びしろ：{result.weakestAxis.label}（{result.weakestAxis.score}）
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="pb-20">
      {/* ===== セクション1: 戦闘力スコア ===== */}
      <section className="section-white py-12 px-4 text-center">
        <p className="text-xs text-[#E84715] font-bold tracking-widest mb-1">
          BUSINESS SCOUTER
        </p>
        <p className="text-xs text-[#555555] mb-6">
          ── 自分だけの勝ち筋を知れ ──
        </p>

        <p className="text-sm text-[#555555] mb-1">ビジネス戦闘力</p>
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
            border: result.rank.id === "capable" ? "1px solid #1A1A1A" : "none",
          }}
        >
          RANK：{result.rank.name}
        </span>

        <p className="text-sm text-[#555555] mb-6">
          {age}歳{genderLabel}の上位 {result.percentileRank}%
        </p>

        {/* 基準ゲージ */}
        <div className="max-w-xs mx-auto text-left space-y-1">
          {[...RANKS].reverse().map((r) => {
            const isActive = result.rank.id === r.id;
            return (
              <div
                key={r.id}
                className={`flex items-center gap-2 text-xs py-1 px-2 rounded ${
                  isActive ? "bg-[#FFF3E0] font-bold" : ""
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: isActive ? "#E84715" : "#E0E0E0" }}
                />
                <span className={isActive ? "text-[#E84715]" : "text-[#999999]"}>
                  {r.name}
                </span>
                <span className="flex-1" />
                {isActive && <span className="text-[#E84715]">★ You</span>}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#555555] mt-4 italic">
          {result.rank.message}
        </p>
      </section>

      {/* ===== セクション2 & 3: 勝ち筋 & チャート (低感受性は順序入替) ===== */}
      {isLowSensitivity ? (
        <>
          {renderChart()}
          {renderWinStyle()}
        </>
      ) : (
        <>
          {renderWinStyle()}
          {renderChart()}
        </>
      )}

      {/* ===== セクション4: ポテンシャル年収 ===== */}
      <section className="section-white py-12 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto text-center">
          <p className="text-sm text-[#555555] mb-2">── ポテンシャル年収 ──</p>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
            💰 {result.potentialSalaryMin}万 〜 {result.potentialSalaryMax}万円
          </p>
          <p className="text-xs text-[#555555]">
            あなたの勝ち筋を最大限活かした場合の推定年収レンジ
          </p>
        </div>
      </section>

      {/* ===== セクション5: 信頼度 ===== */}
      <section className="section-white py-8 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-[#555555] text-center mb-3">── 診断の信頼度 ──</p>
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
          {isLowSensitivity && (
            <p className="text-xs text-[#999999] mt-1">
              矛盾ペア数：{10 - result.reliability}/10
            </p>
          )}
        </div>
      </section>

      {/* ===== セクション6: シェア ===== */}
      <section className="section-white py-8 px-4 border-t border-[#E0E0E0]">
        <div className="max-w-md mx-auto text-center">
          <button className="btn-secondary w-full py-3 mb-3">
            📤 結果をシェアする
          </button>
          <p className="text-xs text-[#555555]">
            X ／ Instagram ／ LINE ／ 画像を保存
          </p>
        </div>
      </section>

      {/* ===== セクション7: LINE登録CTA ===== */}
      <section className="section-dark py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            あなたの勝ち筋、
            <br />
            ここからが本番。
          </h3>
          <p className="text-sm text-[#CCCCCC] leading-relaxed mb-6">
            診断で見えたのはまだ&quot;輪郭&quot;だけ。
            <br />
            本当の勝ち筋は、自分の中から引き出すもの。
          </p>

          <button className="btn-primary w-full py-4 mb-6">
            🟢 LINE登録で
            <br />
            「自分だけの勝ち筋を見つける
            <br />
            7つの質問ワーク」
            <br />
            を無料で受け取る →
          </button>

          <p className="text-sm text-white font-bold mb-4">
            こんな人が、変わり始めてる
          </p>
          <div className="text-left space-y-3 mb-6">
            {[
              "頑張ってるのに成果が空回りしている",
              "「向いてる仕事」がまだ見つかっていない",
              "自分の中に答えがある気がする。でも言葉にできない",
              "「本気出せばいける」──そう思い続けて何年経った？",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span className="text-[#555555]">□</span>
                <p className="text-sm text-[#CCCCCC]">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#555555] mb-4">
            7つの問いに、正直に向き合うだけ。
            <br />
            紙とペンがあれば、15分。
          </p>

          <button className="btn-primary w-full py-3">
            無料で受け取る →
          </button>
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
  return (
    <div className="text-left space-y-2 mt-4">
      <p className="text-xs text-[#E84715] font-bold">3つの武器</p>
      {weapons.map((w, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-xs text-[#E84715]">①②③".charAt(i)</span>
          <p className="text-sm text-[#CCCCCC]">{w}</p>
        </div>
      ))}
    </div>
  );
}
