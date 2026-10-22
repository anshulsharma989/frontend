/**
 * Sample roster data for admin_user_directory_management. There is no backend
 * for a full user directory yet (search/pagination/GPA/attendance per user —
 * see pending-backend-work.md), so this screen shows representative sample
 * rows, clearly labeled as such in the UI, carried over from the Stitch
 * design. Only the "Pending" tab (powered by `usePendingUsers`) is real.
 */

export interface StudentRosterEntry {
  id: string;
  name: string;
  gradeSection: string;
  gpa: string;
  attendancePct: string;
  alert?: string;
  absenceStreak?: string;
}

export interface FacultyRosterEntry {
  id: string;
  name: string;
  title: string;
  status: string;
  sectionsSummary: string;
}

export const MOCK_STUDENTS: StudentRosterEntry[] = [
  {
    id: "#SC-8921",
    name: "Alex Rivera",
    gradeSection: "Grade 12-A · Physics Honors",
    gpa: "3.92",
    attendancePct: "98.4%",
  },
  {
    id: "#SC-8842",
    name: "Elena Rostova",
    gradeSection: "Grade 11-B · Wave Mechanics",
    gpa: "3.78",
    attendancePct: "94.1%",
  },
  {
    id: "#SC-9014",
    name: "Marcus Vance",
    gradeSection: "Grade 11-A · Remedial Physics",
    gpa: "2.41",
    attendancePct: "81.2%",
    alert: "Attendance alert · Remedial Physics",
    absenceStreak: "Absence streak: 4 sessions",
  },
];

export const MOCK_FACULTY: FacultyRosterEntry[] = [
  {
    id: "#T-104",
    name: "Dr. Sarah Jenkins",
    title: "Dept Head: Physics & Acoustics",
    status: "Active Tenured",
    sectionsSummary: "3 active sections · 92 students",
  },
  {
    id: "#T-211",
    name: "Marcus Webb",
    title: "Mathematics · Grade 10-12",
    status: "Active Tenured",
    sectionsSummary: "4 active sections · 118 students",
  },
  {
    id: "#T-087",
    name: "Priya Nair",
    title: "English & Humanities",
    status: "Probationary",
    sectionsSummary: "2 active sections · 54 students",
  },
];
