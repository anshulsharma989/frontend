export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

/**
 * One nav list per role. The Stitch export had 2-3 different bottom-nav item
 * sets per role across screens — this is the single, unified source each
 * role's sidebar renders from. `teacher` isn't reachable yet since the
 * backend has no teacher role (see pending-backend-work.md), but the nav is
 * defined now so wiring it up later is a one-line change.
 */
export const NAV_BY_ROLE: Record<"admin" | "teacher" | "student", NavItem[]> = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
    { label: "Teachers", path: "/admin/teachers", icon: "co_present" },
    { label: "Students", path: "/admin/students", icon: "school" },
    { label: "Catalog", path: "/admin/catalog", icon: "menu_book" },
    { label: "Attendance", path: "/admin/attendance", icon: "how_to_reg" },
    { label: "Quiz Bank", path: "/admin/quiz-bank", icon: "quiz" },
  ],
  teacher: [
    { label: "Dashboard", path: "/teacher/dashboard", icon: "dashboard" },
    { label: "Attendance", path: "/teacher/attendance", icon: "how_to_reg" },
    { label: "Quizzes", path: "/teacher/quizzes", icon: "quiz" },
    { label: "Messages", path: "/teacher/messages", icon: "forum" },
  ],
  student: [
    { label: "Dashboard", path: "/student/dashboard", icon: "dashboard" },
    { label: "Gradebook", path: "/student/gradebook", icon: "school" },
    { label: "Chat", path: "/student/chat", icon: "forum" },
    { label: "Practice Quiz", path: "/student/quiz/practice", icon: "quiz" },
  ],
};
