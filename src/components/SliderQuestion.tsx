"use client";

import { useState } from "react";
import { Question } from "@/types";

interface Props {
  question: Question;
  totalQuestions: number;
  progress: number;
  isLast: boolean;
  estimatedPower: number | null;
  showMeasuring: boolean;
  onAnswer: (value: number, timeMs: number, dragCount: number) => void;
}

export default function SliderQuestion({ question, totalQuestions, progress, isLast, estimatedPower, showMeasuring, onAnswer }: Props) {
  const [value, setValue] = useState(50);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  const [startTime] = useState(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    setValue(newVal);
    if (!hasDragged) {
      setHasDragged(true);
    }
    setDragCount((c) => c + 1);
  };

  const handleNext = () => {
    if (!hasDragged) return;
    onAnswer(value, Date.now() - startTime, dragCount);
  };

  // 5段階ラベル（数値の代わりに表示）
  const getPositionLabel = (v: number): string => {
    if (v <= 15) return `完全に「${question.sliderLeft}」派`;
    if (v <= 35) return `どちらかといえば「${question.sliderLeft}」`;
    if (v <= 65) return "半々";
    if (v <= 85) return `どちらかといえば「${question.sliderRight}」`;
    return `完全に「${question.sliderRight}」派`;
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

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
        {/* 問番号 */}
        <p className="text-xs text-[#555555] mb-3">
          Q{question.number} / {totalQuestions}
        </p>

        {/* 質問文 */}
        <h2 className="text-base font-bold text-[#1A1A1A] leading-relaxed mb-8 text-center">
          {question.sliderQuestion}
        </h2>

        {/* 左右ラベル */}
        <div className="flex justify-between text-xs text-[#555555] mb-3 px-1">
          <span className="max-w-[40%]">{question.sliderLeft}</span>
          <span className="max-w-[40%] text-right">{question.sliderRight}</span>
        </div>

        {/* スライダー */}
        <div className="relative mb-2">
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={handleChange}
            role="slider"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #E84715 0%, #E84715 ${value}%, #E0E0E0 ${value}%, #E0E0E0 100%)`,
            }}
          />
        </div>

        {/* ポジションラベル（数値の代わりに5段階テキスト表示） */}
        {hasDragged && (
          <p className="text-center text-sm font-bold text-[#E84715] mb-4">
            {getPositionLabel(value)}
          </p>
        )}
      </div>

      {/* 次へ / 診断完了 ボタン */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-[#E0E0E0]">
        <button
          onClick={handleNext}
          disabled={!hasDragged}
          className={`w-[90%] max-w-md mx-auto py-3 rounded-lg text-base font-bold block transition-colors ${
            hasDragged
              ? "bg-[#E84715] text-white"
              : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
          }`}
        >
          {isLast ? "診断完了" : "次へ →"}
        </button>
      </div>
    </div>
  );
}
