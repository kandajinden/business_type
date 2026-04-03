// ============================================================
// キャリア戦闘力診断 - 結果データ送信
// Google Apps Script 経由でスプレッドシートに記録
// ============================================================

import { DiagnosisResult, UserProfile, JOB_LABELS } from "@/types";

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || "";

export async function submitResultToSheet(
  result: DiagnosisResult,
  profile: UserProfile
): Promise<boolean> {
  if (!GAS_URL) {
    console.warn("GAS_URL が未設定。データ送信をスキップ");
    return false;
  }

  const genderLabel =
    profile.gender === "male" ? "男性" :
    profile.gender === "female" ? "女性" : "その他";

  const payload = {
    age: profile.age,
    gender: genderLabel,
    job: JOB_LABELS[profile.job],
    battlePower: result.battlePower,
    rank: result.rank.name,
    winStyle: result.winStyle.name,
    L: result.normalizedScores.L,
    C: result.normalizedScores.C,
    G: result.normalizedScores.G,
    A: result.normalizedScores.A,
    I: result.normalizedScores.I,
    E: result.normalizedScores.E,
    reliability: result.reliability,
    percentile: result.showPercentile ? result.percentileRank : "非表示",
    job1: result.bestScenes[0]?.title || "",
    job2: result.bestScenes[1]?.title || "",
    job3: result.bestScenes[2]?.title || "",
    potentialPower: result.potentialBattlePower.potential,
    q28Evaluation: result.q28Evaluation,
  };

  try {
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (err) {
    console.error("データ送信エラー:", err);
    return false;
  }
}
