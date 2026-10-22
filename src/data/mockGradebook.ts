/**
 * Sample data for student_gradebook_previous_quiz_marks. GPA calculation,
 * quiz history, rank/percentile, and sub-topic mastery all depend on quiz
 * persistence + a grading/analytics layer that doesn't exist yet (see
 * pending-backend-work.md) — this entire screen is sample data, clearly
 * labeled. Only the student's name/grade (from the account) is real.
 */

export const CUMULATIVE_GPA = {
  value: 3.94,
  max: 4.0,
  trendVsMidterm: "+0.12",
  progressPct: 98.5,
};

export const TERM_INFO = {
  label: "Fall Term 2024",
  week: "Week 12 of 14",
  progressPct: 88,
};

export interface SubtopicScore {
  label: string;
  pct: number;
  fraction: string;
}

export interface QuizRecord {
  id: string;
  label: string;
  title: string;
  date: string;
  score: number;
  maxScore: number;
  grade: string;
  tags: string[];
  subtopics?: SubtopicScore[];
  detailed?: boolean;
}

export interface SubjectGradebook {
  id: string;
  label: string;
  icon: string;
  courseAveragePct: number;
  courseGrade: string;
  courseTrend: string;
  quizzesCleared: number;
  quizzesTotal: number;
  percentileLabel: string;
  rankLabel: string;
  aiMasteryPct: number;
  aiMasteryLabel: string;
  trajectory: { label: string; pct: number }[];
  trajectoryTrend: string;
  cohortMedianPct: number;
  cohortMaxPct: number;
  masteredConcepts: string[];
  growthPoint: { title: string; description: string; masteryPct: number };
  quizHistory: QuizRecord[];
}

export const GRADEBOOK_SUBJECTS: SubjectGradebook[] = [
  {
    id: "phys-402",
    label: "PHYS-402 Wave Mechanics",
    icon: "waves",
    courseAveragePct: 94.2,
    courseGrade: "A",
    courseTrend: "+1.8% past 30d",
    quizzesCleared: 18,
    quizzesTotal: 20,
    percentileLabel: "Top 4%",
    rankLabel: "Rank #3 of 78",
    aiMasteryPct: 96,
    aiMasteryLabel: "Strong",
    trajectory: [
      { label: "Q1", pct: 92 },
      { label: "Q2", pct: 88 },
      { label: "Q3", pct: 95 },
      { label: "Q4", pct: 91 },
      { label: "Q5", pct: 96 },
      { label: "Q6", pct: 94 },
    ],
    trajectoryTrend: "+2.0% trend",
    cohortMedianPct: 81.6,
    cohortMaxPct: 98,
    masteredConcepts: ["Transverse Wave Equations", "Interference Patterns", "Resonant Cavities"],
    growthPoint: {
      title: "Open-Pipe Boundary Phase Reflections",
      description:
        "Identified slight hesitation in identifying 180° inversion under varying acoustic impedance.",
      masteryPct: 78,
    },
    quizHistory: [
      {
        id: "q6",
        label: "Quiz 6 · Midterm",
        title: "Wave Mechanics & Harmonic Oscillations",
        date: "Oct 22, 2024 · 14:00 EST",
        score: 94,
        maxScore: 100,
        grade: "A",
        tags: ["Proctored", "Top 5% cohort", "38m / 45m", "22/24 correct"],
        detailed: true,
        subtopics: [
          { label: "Boundary Conditions", pct: 100, fraction: "8/8" },
          { label: "Phase Velocity & Dispersion", pct: 95, fraction: "9/10" },
          { label: "Damping Factors & Q-Factor", pct: 85, fraction: "5/6" },
        ],
      },
      {
        id: "q5",
        label: "Quiz 5 · Oct 14, 2024",
        title: "Standing Waves & Resonance Frequencies",
        date: "Oct 14, 2024",
        score: 96,
        maxScore: 100,
        grade: "A+",
        tags: ["Class high score", "29m / 40m"],
      },
      {
        id: "q4",
        label: "Quiz 4 · Oct 02, 2024",
        title: "Superposition Principle & Interference",
        date: "Oct 02, 2024",
        score: 91,
        maxScore: 100,
        grade: "A-",
        tags: ["Reviewed with Socratic AI Tutor"],
      },
      {
        id: "q3",
        label: "Quiz 3 · Sep 21, 2024",
        title: "Doppler Effect & Acoustic Waves",
        date: "Sep 21, 2024",
        score: 95,
        maxScore: 100,
        grade: "A",
        tags: [],
      },
      {
        id: "q2",
        label: "Quiz 2 · Sep 11, 2024",
        title: "Simple Harmonic Motion & Restoring Forces",
        date: "Sep 11, 2024",
        score: 88,
        maxScore: 100,
        grade: "B+",
        tags: ["Formula derivation retry (+4 pts recovered)"],
      },
    ],
  },
  {
    id: "math-501",
    label: "MATH-501 Calculus",
    icon: "functions",
    courseAveragePct: 89.6,
    courseGrade: "A-",
    courseTrend: "+0.9% past 30d",
    quizzesCleared: 15,
    quizzesTotal: 16,
    percentileLabel: "Top 12%",
    rankLabel: "Rank #9 of 78",
    aiMasteryPct: 88,
    aiMasteryLabel: "Solid",
    trajectory: [
      { label: "Q1", pct: 84 },
      { label: "Q2", pct: 90 },
      { label: "Q3", pct: 87 },
      { label: "Q4", pct: 92 },
      { label: "Q5", pct: 89 },
    ],
    trajectoryTrend: "+1.1% trend",
    cohortMedianPct: 79.2,
    cohortMaxPct: 97,
    masteredConcepts: ["Chain Rule Applications", "Related Rates"],
    growthPoint: {
      title: "Implicit Differentiation",
      description: "Occasional sign errors when differentiating composite implicit terms.",
      masteryPct: 74,
    },
    quizHistory: [
      {
        id: "m5",
        label: "Quiz 5 · Oct 18, 2024",
        title: "Related Rates & Optimization",
        date: "Oct 18, 2024",
        score: 89,
        maxScore: 100,
        grade: "B+",
        tags: ["32m / 40m"],
      },
      {
        id: "m4",
        label: "Quiz 4 · Oct 05, 2024",
        title: "Implicit Differentiation",
        date: "Oct 05, 2024",
        score: 84,
        maxScore: 100,
        grade: "B",
        tags: [],
      },
      {
        id: "m3",
        label: "Quiz 3 · Sep 20, 2024",
        title: "Chain Rule Applications",
        date: "Sep 20, 2024",
        score: 93,
        maxScore: 100,
        grade: "A-",
        tags: ["Class high score"],
      },
    ],
  },
  {
    id: "chem-401",
    label: "CHEM-401 Organic Synth",
    icon: "science",
    courseAveragePct: 86.4,
    courseGrade: "B+",
    courseTrend: "-0.6% past 30d",
    quizzesCleared: 10,
    quizzesTotal: 12,
    percentileLabel: "Top 28%",
    rankLabel: "Rank #21 of 78",
    aiMasteryPct: 79,
    aiMasteryLabel: "Developing",
    trajectory: [
      { label: "Q1", pct: 90 },
      { label: "Q2", pct: 85 },
      { label: "Q3", pct: 80 },
      { label: "Q4", pct: 86 },
    ],
    trajectoryTrend: "-1.4% trend",
    cohortMedianPct: 77.8,
    cohortMaxPct: 95,
    masteredConcepts: ["Nomenclature Basics"],
    growthPoint: {
      title: "Reaction Mechanism Arrow Pushing",
      description: "Mixing up nucleophile/electrophile roles in SN2 mechanism diagrams.",
      masteryPct: 68,
    },
    quizHistory: [
      {
        id: "c4",
        label: "Quiz 4 · Oct 20, 2024",
        title: "SN1 vs SN2 Reaction Mechanisms",
        date: "Oct 20, 2024",
        score: 86,
        maxScore: 100,
        grade: "B+",
        tags: [],
      },
      {
        id: "c3",
        label: "Quiz 3 · Oct 08, 2024",
        title: "Functional Group Nomenclature",
        date: "Oct 08, 2024",
        score: 80,
        maxScore: 100,
        grade: "B-",
        tags: ["Reviewed with Socratic AI Tutor"],
      },
    ],
  },
];
