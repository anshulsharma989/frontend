import { useState } from "react";
import { useAuth } from "./auth";
import AdminPage from "./pages/AdminPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import SignupPage from "./pages/SignupPage";

type Tab = "chat" | "quiz" | "admin";

function AuthGate() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return mode === "login" ? (
    <LoginPage onSwitchToSignup={() => setMode("signup")} />
  ) : (
    <SignupPage onSwitchToLogin={() => setMode("login")} />
  );
}

export default function App() {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("chat");

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

  const tabs: Tab[] = user.role === "admin" ? ["chat", "quiz", "admin"] : ["chat", "quiz"];
  // A tab selected under a previous session's role (e.g. "admin") may no
  // longer be visible after logging in as a different user — fall back
  // rather than render nothing.
  const activeTab = tabs.includes(tab) ? tab : tabs[0];

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          📚 <strong>Educator</strong>
          <span className="tagline">ask your books</span>
        </div>
        <nav className="tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={activeTab === t ? "tab active" : "tab"}
              onClick={() => setTab(t)}
            >
              {t === "chat" ? "Chat" : t === "quiz" ? "Quiz" : "Admin"}
            </button>
          ))}
        </nav>
        <div className="user-chip">
          <span className="dim">
            {user.full_name}
            {user.grade_name ? ` · ${user.grade_name}` : ""}
          </span>
          <button className="secondary" onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      <main className="main">
        {activeTab === "chat" && <ChatPage />}
        {activeTab === "quiz" && <QuizPage />}
        {activeTab === "admin" && user.role === "admin" && <AdminPage />}
      </main>
    </div>
  );
}
