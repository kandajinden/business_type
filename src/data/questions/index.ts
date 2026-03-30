import { Question, JobCategory } from "@/types";
import { COMMON_QUESTIONS } from "./common";
import { BUTSUCHAKE_QUESTIONS } from "./butsuchake";
import { JOB_QUESTIONS } from "./jobSpecific";

export function buildQuestionSet(job: JobCategory): Question[] {
  const commonBefore = COMMON_QUESTIONS.filter((q) => q.number <= 20);
  const jobSpecific = JOB_QUESTIONS[job] || JOB_QUESTIONS["other"];
  const slider25 = COMMON_QUESTIONS.find((q) => q.number === 25)!;
  const slider30 = COMMON_QUESTIONS.find((q) => q.number === 30)!;

  return [
    ...commonBefore,       // Q1-Q20 (共通20問)
    ...jobSpecific,        // Q21-Q24 (職種別4問)
    slider25,              // Q25 (スライダー)
    ...BUTSUCHAKE_QUESTIONS, // Q26-Q29 (ぶっちゃけ4問)
    slider30,              // Q30 (最終スライダー)
  ];
}

export { COMMON_QUESTIONS, BUTSUCHAKE_QUESTIONS, JOB_QUESTIONS };
