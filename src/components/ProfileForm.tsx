"use client";

import { useState } from "react";
import { Gender, JobCategory, JOB_LABELS, UserProfile } from "@/types";

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

export default function ProfileForm({ onSubmit }: Props) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [job, setJob] = useState<JobCategory | "">("");

  const isValid = age && Number(age) >= 18 && Number(age) <= 65 && gender && job;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({ age: Number(age), gender: gender as Gender, job: job as JobCategory });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold text-[#1A1A1A] text-center mb-2">
          基本情報を入力
        </h1>
        <p className="text-sm text-[#555555] text-center mb-2">
          あなたに合った質問を出すために使います
        </p>
        <p className="text-xs text-[#999999] text-center mb-8">
          ※ あなたに合った結果を出すためだけに使います。個人情報として保存されることはありません。
        </p>

        {/* 年齢 */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1A1A1A] mb-2">
            年齢
          </label>
          <input
            type="number"
            min={18}
            max={65}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="例：25"
            className="w-full border border-[#E0E0E0] rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#E84715] transition-colors"
          />
        </div>

        {/* 性別 */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1A1A1A] mb-2">
            性別
          </label>
          <div className="flex gap-3">
            {(
              [
                { value: "male", label: "男性" },
                { value: "female", label: "女性" },
                { value: "other", label: "回答しない" },
              ] as { value: Gender; label: string }[]
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setGender(opt.value)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-colors ${
                  gender === opt.value
                    ? "bg-[#E84715] text-white"
                    : "bg-white border border-[#E0E0E0] text-[#1A1A1A]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 職種 */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-[#1A1A1A] mb-2">
            職種
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(JOB_LABELS) as [JobCategory, string][]).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setJob(key)}
                  className={`py-3 px-2 rounded-lg text-xs font-bold transition-colors ${
                    job === key
                      ? "bg-[#E84715] text-white"
                      : "bg-white border border-[#E0E0E0] text-[#1A1A1A]"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        {/* 開始ボタン */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-lg text-base font-bold transition-colors ${
            isValid
              ? "bg-[#E84715] text-white"
              : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
          }`}
        >
          診断を開始する
        </button>
      </div>
    </div>
  );
}
