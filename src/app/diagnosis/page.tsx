"use client";

import { useDiagnosis } from "@/lib/diagnosisContext";
import { buildQuestionSet } from "@/data/questions";
import { calculateFullResult, calculateInterimPower } from "@/lib/engine";
import ProfileForm from "@/components/ProfileForm";
import ChoiceQuestion from "@/components/ChoiceQuestion";
import SliderQuestion from "@/components/SliderQuestion";
import InterimFeedback from "@/components/InterimFeedback";
import AnalyzingAnimation from "@/components/AnalyzingAnimation";
import ResultPage from "@/components/ResultPage";
import { UserProfile, Question, Answer } from "@/types";
import { useState, useMemo, useCallback } from "react";

export default function DiagnosisPage() {
  const {
    phase, profile, answers, currentQuestion, result, sessionId,
    setPhase, setProfile, addAnswer, setCurrentQuestion, setResult,
  } = useDiagnosis();

  const [showInterim, setShowInterim] = useState(false);

  const questions = useMemo(() => {
    if (!profile) return [];
    return buildQuestionSet(profile.job);
  }, [profile]);

  const currentQ = questions[currentQuestion - 1];

  // プログレス計算
  const progress = useMemo(() => {
    let total = 0;
    for (let i = 0; i < currentQuestion - 1 && i < questions.length; i++) {
      total += questions[i].progressWeight;
    }
    return total;
  }, [currentQuestion, questions]);

  // プロフィール送信
  const handleProfileSubmit = useCallback((p: UserProfile) => {
    setProfile(p);
    setPhase("questions");
    setCurrentQuestion(1);
  }, [setProfile, setPhase, setCurrentQuestion]);

  // 回答処理
  const handleAnswer = useCallback(
    (q: Question, optionOrValue: string | number, timeMs: number, dragCount?: number) => {
      const answer: Answer = {
        questionId: q.id,
        answerTimeMs: timeMs,
        dragCount,
      };

      if (typeof optionOrValue === "string") {
        answer.selectedOption = optionOrValue;
      } else {
        answer.sliderValue = optionOrValue;
      }

      addAnswer(answer);

      const updatedAnswers = [...answers, answer];

      // Q15の後に中間フィードバック
      if (q.number === 15) {
        setShowInterim(true);
        return;
      }

      // 最終問 → 分析画面へ
      if (currentQuestion >= questions.length) {
        const fullResult = calculateFullResult(updatedAnswers, profile!, questions);
        setResult(fullResult);
        setPhase("analyzing");
        return;
      }

      setCurrentQuestion(currentQuestion + 1);
    },
    [addAnswer, currentQuestion, questions, answers, profile, setResult, setPhase, setCurrentQuestion]
  );

  // ===== 画面分岐 =====

  // 1. プロフィール入力
  if (phase === "profile") {
    return <ProfileForm onSubmit={handleProfileSubmit} />;
  }

  // 2. 中間フィードバック
  if (showInterim && phase === "questions") {
    const interimPower = calculateInterimPower(answers, questions, sessionId);
    return (
      <InterimFeedback
        interimPower={interimPower}
        onContinue={() => {
          setShowInterim(false);
          setCurrentQuestion(currentQuestion + 1);
        }}
      />
    );
  }

  // 3. 質問画面
  if (phase === "questions" && currentQ) {
    if (currentQ.type === "slider") {
      return (
        <SliderQuestion
          key={currentQ.id}
          question={currentQ}
          totalQuestions={questions.length}
          progress={progress}
          isLast={currentQuestion >= questions.length}
          onAnswer={(value, timeMs, dragCount) =>
            handleAnswer(currentQ, value, timeMs, dragCount)
          }
        />
      );
    }

    return (
      <ChoiceQuestion
        key={currentQ.id}
        question={currentQ}
        totalQuestions={questions.length}
        progress={progress}
        onAnswer={(label, timeMs) => handleAnswer(currentQ, label, timeMs)}
      />
    );
  }

  // 4. 分析演出
  if (phase === "analyzing" && result) {
    return (
      <AnalyzingAnimation
        battlePower={result.battlePower}
        onComplete={() => setPhase("result")}
      />
    );
  }

  // 5. 結果画面
  if (phase === "result" && result && profile) {
    return (
      <ResultPage
        result={result}
      />
    );
  }

  return null;
}
