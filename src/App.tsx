import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import ChatPage from "./pages/ChatPage";
import QuizPage from "./pages/QuizPage";

type Tab = "chat" | "quiz" | "admin";

export default function App() {
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          📚 <strong>Educator</strong>
          <span className="tagline">ask your books</span>
        </div>
        <nav className="tabs">
          {(["chat", "quiz", "admin"] as Tab[]).map((t) => (
            <button
              key={t}
              className={tab === t ? "tab active" : "tab"}
              onClick={() => setTab(t)}
            >
              {t === "chat" ? "Chat" : t === "quiz" ? "Quiz" : "Admin"}
            </button>
          ))}
        </nav>
      </header>
      <main className="main">
        {tab === "chat" && <ChatPage />}
        {tab === "quiz" && <QuizPage />}
        {tab === "admin" && <AdminPage />}
      </main>
    </div>
  );
}
