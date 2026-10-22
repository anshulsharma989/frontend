/**
 * Sample results for exam_results_analytics. There's no quiz-attempt
 * scoring/analytics backend yet (see pending-backend-work.md) — this is
 * independent sample data, not computed from what you actually answered in
 * `/student/quiz/session` (that session deliberately never stores correct
 * answers client-side, so there's nothing to grade against anyway).
 */

export const EXAM_META = {
  courseCode: "PHYS-402",
  title: "Wave Mechanics Midterm",
  submittedAt: "Oct 24, 2024 · 11:42 AM",
  durationUsed: "41m 38s",
  durationTotal: "60m",
  proctorClearedPct: 99.8,
};

export const SCORE = {
  pointsEarned: 112,
  pointsTotal: 120,
  pct: 93.3,
  tier: "A",
  percentileLabel: "Top 2%",
};

export const COHORT = {
  rankLabel: "Rank #2 of 48 students",
  classAvgPct: 76.4,
  classAvgPoints: 91.7,
  yourPct: 93.3,
  yourPoints: 112,
  peakPct: 96.7,
  peakPoints: 116,
};

export interface SubSkill {
  label: string;
  correct: number;
  total: number;
  status: "Mastered" | "Proficient" | "Good" | "Review";
  pct: number;
}

export const SUB_SKILLS: SubSkill[] = [
  { label: "Acoustic Doppler Kinematics", correct: 4, total: 4, status: "Mastered", pct: 100 },
  { label: "Standing Wave Harmonics", correct: 11, total: 12, status: "Proficient", pct: 92 },
  { label: "Resonance & Boundary Conditions", correct: 7, total: 8, status: "Good", pct: 88 },
  { label: "Superposition & Phase Delay", correct: 3, total: 4, status: "Review", pct: 75 },
];

export const EFFICIENCY = {
  pacing: { avgPerQuestion: "55.5s", label: "Fast & accurate", cohortAvg: "1m 20s" },
  tools: { calcInvocations: 8, sheetPeeks: 3 },
  review: { flaggedCount: 3, resolvedLabel: "100% resolved" },
};

export const AI_DIAGNOSTIC = {
  strongArea: "Doppler equations",
  strongDetail: "Q14 answered in under 45s",
  weakArea: "phase reversal edge cases",
  weakDetail: "open-pipe boundary reflection (Q22)",
};

export type AuditStatus = "correct" | "incorrect" | "partial";

export interface QuestionAudit {
  id: string;
  topic: string;
  status: AuditStatus;
  pointsEarned: number;
  pointsTotal: number;
  prompt: string;
  selectedLabel: string;
  selectedNote: string;
  correctLabel?: string;
  correctNote?: string;
  derivation?: string[];
  timeSpent: string;
}

export const QUESTION_AUDIT: QuestionAudit[] = [
  {
    id: "q14",
    topic: "Acoustic Doppler",
    status: "correct",
    pointsEarned: 4,
    pointsTotal: 4,
    prompt:
      "An observer moves directly toward a stationary sound source with speed v_o = 0.15v. Given emitted frequency f₀ = 650 Hz, calculate observed frequency.",
    selectedLabel: "B. 748 Hz (Selected · Correct)",
    selectedNote: "Computed via standard Doppler formulation in 42s.",
    derivation: ["f' = f₀ · (v + v_o) / v", "f' = 650 · (1 + 0.15) = 650 · 1.15 = 747.5 ≈ 748 Hz"],
    timeSpent: "42s",
  },
  {
    id: "q22",
    topic: "Open-Pipe Boundary",
    status: "incorrect",
    pointsEarned: 0,
    pointsTotal: 4,
    prompt:
      "When an acoustic pressure pulse encounters an open pipe termination, what phase change occurs upon reflection of the displacement wave?",
    selectedLabel: "Selected: Option C (λ/2 phase shift)",
    selectedNote: "Pressure node acts as a displacement antinode.",
    correctLabel: "Correct: Option A (No displacement phase shift)",
    correctNote: "Open boundary imposes pressure reversal, but displacement reflects without phase inversion.",
    timeSpent: "1m 45s",
  },
  {
    id: "q9",
    topic: "Standing Wave Harmonics",
    status: "partial",
    pointsEarned: 2,
    pointsTotal: 4,
    prompt: "A string fixed at both ends vibrates in its 4th harmonic. Sketch the node/antinode pattern and state the wavelength in terms of string length L.",
    selectedLabel: "Partial credit: correct node count, wavelength formula omitted",
    selectedNote: "Node/antinode diagram fully correct; final λ = L/2 expression missing.",
    timeSpent: "2m 10s",
  },
  {
    id: "q5",
    topic: "Wave Fundamentals",
    status: "correct",
    pointsEarned: 3,
    pointsTotal: 3,
    prompt: "A wave travels at 340 m/s with wavelength 0.85 m. What is its frequency?",
    selectedLabel: "A. 400 Hz (Selected · Correct)",
    selectedNote: "Direct application of v = fλ.",
    timeSpent: "28s",
  },
  {
    id: "q27",
    topic: "Superposition & Phase Delay",
    status: "incorrect",
    pointsEarned: 0,
    pointsTotal: 4,
    prompt: "Two coherent waves arrive at a point with a path difference of 1.5λ. Is the interference constructive or destructive?",
    selectedLabel: "Selected: Constructive",
    selectedNote: "Treated 1.5λ as an integer multiple of λ.",
    correctLabel: "Correct: Destructive",
    correctNote: "A path difference of (n + ½)λ produces destructive interference.",
    timeSpent: "1m 05s",
  },
];
