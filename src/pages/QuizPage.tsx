import { useState } from "react";
import { generateQuiz } from "../api";
import type { QuizQuestion } from "../types";

const LETTERS = ["A", "B", "C", "D"];

function QuestionCard({ q, index }: { q: QuizQuestion; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="card">
      <div className="card-title">
        Q{index + 1}. {q.question}
      </div>
      <div className="options">
        {q.options.map((opt, i) => {
          let cls = "option";
          if (picked !== null) {
            if (i === q.answer_index) cls += " correct";
            else if (i === picked) cls += " wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
            >
              <strong>{LETTERS[i]}.</strong> {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={picked === q.answer_index ? "verdict good" : "verdict bad"}>
          {picked === q.answer_index ? "✅ Correct!" : `❌ Correct answer: ${LETTERS[q.answer_index]}`}
          {q.explanation && <div className="dim">{q.explanation}</div>}
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setBusy(true);
    setError(null);
    setQuestions(null);
    try {
      setQuestions(
        await generateQuiz({
          grade: grade.trim() || undefined,
          subject: subject.trim() || undefined,
          num_questions: count,
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="chat-toolbar">
        <input
          className="small-input"
          placeholder="Grade (e.g. 9)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          className="small-input"
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
          {[3, 5, 8, 10].map((n) => (
            <option key={n} value={n}>
              {n} questions
            </option>
          ))}
        </select>
        <button onClick={generate} disabled={busy}>
          {busy ? "Writing quiz…" : "Generate quiz"}
        </button>
      </div>

      {error && <div className="error">⚠️ {error}</div>}
      {busy && <div className="empty">The tutor is writing your quiz — this takes a moment…</div>}
      {questions?.map((q, i) => <QuestionCard key={i} q={q} index={i} />)}
    </div>
  );
}
