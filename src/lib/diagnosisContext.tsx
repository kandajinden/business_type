"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile, Answer, DiagnosisResult, Gender, JobCategory } from "@/types";

type DiagnosisPhase = "profile" | "questions" | "analyzing" | "result";

interface DiagnosisState {
  phase: DiagnosisPhase;
  profile: UserProfile | null;
  answers: Answer[];
  currentQuestion: number;
  result: DiagnosisResult | null;
  sessionId: string;
  setPhase: (phase: DiagnosisPhase) => void;
  setProfile: (profile: UserProfile) => void;
  addAnswer: (answer: Answer) => void;
  setCurrentQuestion: (n: number) => void;
  setResult: (result: DiagnosisResult) => void;
  reset: () => void;
}

const DiagnosisContext = createContext<DiagnosisState | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<DiagnosisPhase>("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [sessionId] = useState(() =>
    `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  );

  const addAnswer = (answer: Answer) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === answer.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = answer;
        return updated;
      }
      return [...prev, answer];
    });
  };

  const reset = () => {
    setPhase("profile");
    setProfile(null);
    setAnswers([]);
    setCurrentQuestion(1);
    setResult(null);
  };

  return (
    <DiagnosisContext.Provider
      value={{
        phase, profile, answers, currentQuestion, result, sessionId,
        setPhase, setProfile, addAnswer, setCurrentQuestion, setResult, reset,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error("useDiagnosis must be used within DiagnosisProvider");
  return ctx;
}
