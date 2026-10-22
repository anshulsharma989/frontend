/**
 * Sample data for teacher_classroom_portal. There is no teacher role, quiz
 * persistence, attendance, or messaging backend yet (see
 * pending-backend-work.md) — this whole screen is a UI preview, reachable by
 * admins via the "Preview as Teacher" toggle until real teacher accounts
 * exist.
 */

export type AttendanceStatus = "P" | "A" | "L";

export interface RosterEntry {
  id: string;
  name: string;
  status: AttendanceStatus;
  note?: string;
}

export const NEXT_PERIOD = {
  label: "Grade 11-B Mechanics",
  inMinutes: 25,
};

export const CURRENT_CLASS = {
  subject: "AP Physics",
  room: "Room 304",
  period: "Period 3 · Grade 10 Honors",
};

export const ATTENDANCE_ROSTER: RosterEntry[] = [
  { id: "#4092", name: "Sophia Chen", status: "P" },
  { id: "#4108", name: "David Miller", status: "A", note: "Parent notified" },
  { id: "#4121", name: "Amara Patel", status: "L", note: "Permit verified" },
];

export type QuizStatus = "published" | "draft" | "scheduled";

export interface MockQuiz {
  id: string;
  title: string;
  status: QuizStatus;
  meta: string;
  submissions?: string;
  avgScore?: string;
  progressPct?: number;
  dueOrSchedule: string;
}

export const MOCK_QUIZZES: MockQuiz[] = [
  {
    id: "q1",
    title: "Kinematics & Force Test",
    status: "published",
    meta: "Grade 11 · Physics",
    submissions: "28/32 students",
    avgScore: "Avg. 88%",
    progressPct: 87.5,
    dueOrSchedule: "Due: Today, 4:00 PM",
  },
  {
    id: "q2",
    title: "Thermodynamics Pop Quiz",
    status: "draft",
    meta: "10 questions · Est. 20m",
    dueOrSchedule: "Not scheduled",
  },
  {
    id: "q3",
    title: "Wave Mechanics Midterm",
    status: "scheduled",
    meta: "45 multiple choice · 2 free response",
    dueOrSchedule: "Auto-launches Oct 24, 08:30 AM",
  },
];

export type MessageKind = "group" | "student" | "parent";

export interface MockMessage {
  id: string;
  kind: MessageKind;
  name: string;
  preview: string;
  time: string;
  highlighted?: boolean;
}

export const MOCK_MESSAGES: MockMessage[] = [
  {
    id: "m1",
    kind: "group",
    name: "Faculty Physics Dept",
    preview: "Updated lab equipment schedule posted for Friday.",
    time: "10m ago",
  },
  {
    id: "m2",
    kind: "student",
    name: "Sarah Jenkins (Student)",
    preview: "Can you explain question 4 on torque before class?",
    time: "18m ago",
    highlighted: true,
  },
  {
    id: "m3",
    kind: "parent",
    name: "Mrs. Miller (Parent)",
    preview: "David's orthodontic appointment confirmation for 2 PM.",
    time: "1h ago",
  },
];
