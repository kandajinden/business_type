"use client";

import { useState } from "react";
import { Question } from "@/types";

interface Props {
  question: Question;
  totalQuestions: number;
  progress: number;
  isLast: boolean;
  onAnswer: (value: number, timeMs: number, dragCount: number) => void;
}

export default function SliderQuestion({ question, totalQuestions, progress, isLast, onAnswer }: Props) {
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

  // SL3 特殊表示（リスク選好度・期待値）
  const isSL3 = question.number === 15;
  const expectedSalary = isSL3
    ? Math.round(400 + (value / 100) * 1200)
    : null;

  return (
    <div className="min-h-[80vh] flex flex-col px-4 pt-4 pb-24">
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

        {/* 数値表示 */}
        <p className="text-center text-2xl font-bold text-[#1A1A1A] power-number mb-4">
          {value}
        </p>

        {/* SL3 特殊表示 */}
        {isSL3 && hasDragged && (
          <div className="text-center space-y-1 mb-4">
            <p className="text-sm text-[#E84715]">
              リスク選好度：{value}%
            </p>
            <p className="text-sm font-bold text-[#1A1A1A]">
              期待値：{expectedSalary}万円
            </p>
          </div>
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
