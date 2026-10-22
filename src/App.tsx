import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth";
import { AppShell } from "./components/layout/AppShell";
import { ComingSoon } from "./components/layout/ComingSoon";
import { RolePreviewToggle } from "./components/layout/RolePreviewToggle";
import { NAV_BY_ROLE } from "./config/nav";
import AdminPage from "./pages/AdminPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";
import AdminTeachersPage from "./pages/admin/AdminTeachersPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import SignupPage from "./pages/SignupPage";
import QuizSessionPage from "./pages/student/QuizSessionPage";
import StudentAiTutorPage from "./pages/student/StudentAiTutorPage";
import StudentChatHubPage from "./pages/student/StudentChatHubPage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import StudentExamResultsPage from "./pages/student/StudentExamResultsPage";
import StudentGradebookPage from "./pages/student/StudentGradebookPage";
import QuizBuilderPage from "./pages/teacher/QuizBuilderPage";
import TeacherAttendancePage from "./pages/teacher/TeacherAttendancePage";
import TeacherDashboardPage from "./pages/teacher/TeacherDashboardPage";

function AuthGate() {
  const [mode, setMode] = useState<"home" | "login" | "signup">("home");

  if (mode === "home") {
    return <HomePage onLogin={() => setMode("login")} onSignup={() => setMode("signup")} />;
  }
  if (mode === "login") {
    return <LoginPage onSwitchToSignup={() => setMode("signup")} onBack={() => setMode("home")} />;
  }
  return <SignupPage onSwitchToLogin={() => setMode("login")} onBack={() => setMode("home")} />;
}

export default function App() {
  const { user, loading, logout } = useAuth();
  const [teacherPreview, setTeacherPreview] = useState(false);

  if (loading) {
    return <div className="empty">Loading…</div>;
  }

  if (!user) {
    return <AuthGate />;
  }

  if (user.status === "pending") {
    return (
      <div className="auth-page">
        <div className="card auth-form">
          <h2>Pending approval</h2>
          <p>Your account is waiting for an admin to approve it.</p>
          <button type="button" className="secondary" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  if (user.role === "admin" && teacherPreview) {
    return (
      <Routes>
        {/* Focus-mode screen — no sidebar, matches the original design's dedicated "Exit" flow */}
        <Route path="/teacher/quizzes" element={<QuizBuilderPage />} />
        <Route
          element={
            <AppShell
              navItems={NAV_BY_ROLE.teacher}
              headerExtra={<RolePreviewToggle active onToggle={() => setTeacherPreview(false)} />}
            />
          }
        >
          <Route path="/teacher/dashboard" element={<TeacherDashboardPage />} />
          <Route path="/teacher/attendance" element={<TeacherAttendancePage />} />
          <Route
            path="/teacher/messages"
            element={<ComingSoon title="Messages" screen="pending-backend-work.md" />}
          />
          <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
        </Route>
      </Routes>
    );
  }

  if (user.role === "admin") {
    return (
      <Routes>
        <Route
          element={
            <AppShell
              navItems={NAV_BY_ROLE.admin}
              headerExtra={<RolePreviewToggle active={false} onToggle={() => setTeacherPreview(true)} />}
            />
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/teachers" element={<AdminTeachersPage />} />
          <Route path="/admin/students" element={<AdminStudentsPage />} />
          <Route path="/admin/catalog" element={<AdminPage />} />
          <Route
            path="/admin/attendance"
            element={<ComingSoon title="Attendance" screen="pending-backend-work.md" />}
          />
          <Route
            path="/admin/quiz-bank"
            element={<ComingSoon title="Quiz bank" screen="pending-backend-work.md" />}
          />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Focus-mode screens — no sidebar, same pattern as the teacher quiz builder */}
      <Route path="/student/quiz/session" element={<QuizSessionPage />} />
      <Route path="/student/quiz/results" element={<StudentExamResultsPage />} />
      <Route element={<AppShell navItems={NAV_BY_ROLE.student} />}>
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/gradebook" element={<StudentGradebookPage />} />
        <Route path="/student/chat" element={<StudentChatHubPage />} />
        <Route path="/student/chat/ai-tutor" element={<StudentAiTutorPage />} />
        <Route path="/student/quiz/practice" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
