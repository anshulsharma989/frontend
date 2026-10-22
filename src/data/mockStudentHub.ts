/**
 * Sample data for student_learning_hub. There's no quiz scheduling,
 * grading/rank, or teacher-messaging backend yet (see
 * pending-backend-work.md) — only the practice quiz generator
 * (`generateQuiz` / `/student/quiz/practice`) is real.
 */

export const NEXT_ASSESSMENT = {
  title: "Wave Mechanics Midterm",
  countdown: "44:18 left",
};

export const URGENT_ASSESSMENT = {
  code: "PHYS-402",
  title: "Wave Mechanics Midterm",
  description: "Oscillations, Doppler shifts, & resonance matrices",
  questions: "45 Qs",
  duration: "60 Mins",
  points: "120 Pts",
};

export interface SecondaryAssessment {
  id: string;
  icon: string;
  tone: "secondary" | "tertiary";
  title: string;
  badge: string;
  detail: string;
}

export const SECONDARY_ASSESSMENTS: SecondaryAssessment[] = [
  {
    id: "a1",
    icon: "science",
    tone: "secondary",
    title: "Organic Chemistry Ch. 4",
    badge: "20m",
    detail: "Due tomorrow, 5:00 PM · Study guide ready",
  },
  {
    id: "a2",
    icon: "history_edu",
    tone: "tertiary",
    title: "AP World: Industrial Era",
    badge: "Practice",
    detail: "15 mins · 10 quick drills",
  },
];

export const DRILL_QUESTION = {
  index: "Q 03/15",
  topic: "Wave Dynamics",
  timer: "18:42",
  progressPct: 20,
  prompt: "What is the frequency of a mechanical sound wave with a velocity of 300 m/s and a wavelength of 0.5 m?",
  options: [
    { id: "A", text: "150 Hz" },
    { id: "B", text: "600 Hz" },
    { id: "C", text: "75 Hz" },
    { id: "D", text: "300 Hz" },
  ],
  correctId: "B",
};

export const TELEMETRY = {
  compositeAvgPct: 94.2,
  trend: "+3.4%",
  tier: "A+",
  completed: 28,
  overdue: 0,
};

export interface MarkRecord {
  id: string;
  subject: "physics" | "chemistry" | "mathematics";
  title: string;
  scorePct: number;
  rank: string;
  rankTone: "secondary" | "tertiary" | "neutral";
  date: string;
}

export const MARKS_HISTORY: MarkRecord[] = [
  { id: "m1", subject: "physics", title: "Kinematics & Force Test", scorePct: 96, rank: "Class rank #2", rankTone: "secondary", date: "Yesterday" },
  { id: "m2", subject: "chemistry", title: "Thermodynamics Pop Quiz", scorePct: 88, rank: "Class rank #7", rankTone: "neutral", date: "Oct 18" },
  { id: "m3", subject: "mathematics", title: "Calculus Derivatives Speed Drill", scorePct: 100, rank: "Class rank #1", rankTone: "tertiary", date: "Oct 14" },
];

export interface InstructorMessage {
  id: string;
  name: string;
  role: string;
  time: string;
  preview: string;
  online?: boolean;
  hasQuickReply?: boolean;
}

export const INSTRUCTOR_MESSAGES: InstructorMessage[] = [
  {
    id: "i1",
    name: "Dr. Julian Vance",
    role: "AP Physics Instructor",
    time: "12m ago",
    preview: "Great work on the lab report, remember review session at 4 PM today in Room 304 or Zoom stream.",
    online: true,
    hasQuickReply: true,
  },
  {
    id: "i2",
    name: "Prof. Elena Rostova",
    role: "Calculus BC Dept",
    time: "2h ago",
    preview: "Your derivation on problem 4 was spot on! Feel free to review the proof repository anytime.",
  },
];
