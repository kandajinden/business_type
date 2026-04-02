"use client";

import { useEffect, useState } from "react";

interface Props {
  battlePower: number;
  onComplete: () => void;
}

export default function AnalyzingAnimation({ battlePower, onComplete }: Props) {
  const [phase, setPhase] = useState<"whiteout" | "scanning" | "counting" | "done">("whiteout");
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    // Phase 1: ホワイトアウト (0.5s)
    const t1 = setTimeout(() => setPhase("scanning"), 500);
    // Phase 2: ANALYZING... (2s)
    const t2 = setTimeout(() => setPhase("counting"), 2500);
    // Phase 3: 数字カウントアップ (3s)
    const t3 = setTimeout(() => setPhase("done"), 5500);
    // Phase 4: 結果画面へ遷移 (0.5s)
    const t4 = setTimeout(onComplete, 6000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  // カウントアップアニメーション
  useEffect(() => {
    if (phase !== "counting") return;
    const duration = 3000;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // イージング: easeOutExpo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplayNumber(Math.round(battlePower * eased));
      if (progress >= 1) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [phase, battlePower]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* ホワイトアウト */}
      {phase === "whiteout" && (
        <div className="animate-pulse">
          <div className="w-16 h-1 bg-[#E84715] rounded-full" />
        </div>
      )}

      {/* スキャンライン + ANALYZING... */}
      {phase === "scanning" && (
        <div className="text-center">
          {/* オレンジスキャンライン */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E84715] animate-[scanDown_1.5s_ease-out_infinite]" />
          <p className="text-lg font-bold text-[#E84715] tracking-widest animate-pulse">
            ANALYZING...
          </p>
        </div>
      )}

      {/* 数字カウントアップ */}
      {(phase === "counting" || phase === "done") && (
        <div className="text-center">
          <p className="text-sm text-[#555555] mb-2">キャリア戦闘力</p>
          <p
            className={`power-number text-5xl md:text-7xl text-[#1A1A1A] transition-transform ${
              phase === "done" ? "scale-110" : ""
            }`}
          >
            {displayNumber.toLocaleString()}
          </p>
        </div>
      )}

      <style>{`
        @keyframes scanDown {
          0% { transform: translateY(-100vh); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
