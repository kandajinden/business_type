"use client";

import { useState } from "react";
import { Question } from "@/types";

interface Props {
  question: Question;
  totalQuestions: number;
  progress: number;
  estimatedPower: number | null;  // Q1-Q10: 推定戦闘力 / Q11-Q30: null
  showMeasuring: boolean;         // Q11以降は「計測中」表示
  onAnswer: (optionLabel: string, timeMs: number) => void;
}

export default function ChoiceQuestion({ question, totalQuestions, progress, estimatedPower, showMeasuring, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const handleSelect = (label: string) => {
    setSelected(label);
  };

  const handleNext = () => {
    if (!selected) return;
    onAnswer(selected, Date.now() - startTime);
  };

  return (
    <div className="min-h-[80vh] flex flex-col px-4 pt-4 pb-24">
      {/* 推定戦闘力表示 (requirements_v2.md §6-0c) */}
      <div className="w-full max-w-md mx-auto mb-2 text-center">
        <p className="text-xs text-[#555555]">現時点での推定キャリア戦闘力</p>
        {showMeasuring ? (
          <p className="text-sm font-bold text-[#E84715]">計測中</p>
        ) : estimatedPower ? (
          <p className="power-number text-base text-[#E84715]">
            {estimatedPower.toLocaleString()}
          </p>
        ) : (
          <p className="text-sm text-[#E0E0E0]">──</p>
        )}
      </div>

      {/* プログレスバー */}
      <div className="w-full max-w-md mx-auto mb-2">
        <div className="progress-bar h-2">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-md mx-auto flex-1">
        {/* 問番号 */}
        <p className="text-xs text-[#555555] mb-3">
          Q{question.number} / {totalQuestions}
        </p>

        {/* 直感2秒バッジ */}
        {question.subtext && (
          <div className="inline-block bg-[#FFF3E0] text-[#E84715] text-xs font-bold px-2 py-1 rounded mb-2">
            {question.subtext}
          </div>
        )}

        {/* 質問文 */}
        <h2 className="text-base font-bold text-[#1A1A1A] leading-relaxed mb-6">
          {question.text}
        </h2>

        {/* 選択肢 */}
        <div className="space-y-3">
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                selected === opt.label
                  ? "border-[#E84715] bg-[#FFF3E0]"
                  : "border-[#E0E0E0] bg-white"
              }`}
            >
              <span className="text-xs font-bold text-[#E84715] mr-2">
                {opt.label}.
              </span>
              <span className="text-sm text-[#1A1A1A]">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 次へボタン（固定） */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-[#E0E0E0]">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-[90%] max-w-md mx-auto py-3 rounded-lg text-base font-bold block transition-colors ${
            selected
              ? "bg-[#E84715] text-white"
              : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
          }`}
        >
          次へ →
        </button>
      </div>
    </div>
  );
}
