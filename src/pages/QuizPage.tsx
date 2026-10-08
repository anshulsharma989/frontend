import { useEffect, useState } from "react";
import { generateQuiz, getGrades, getSubjects } from "../api";
import { useAuth } from "../auth";
import type { Grade, QuizQuestion, Subject } from "../types";

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
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) getGrades().then(setGrades).catch(() => {});
  }, [isAdmin]);

  useEffect(() => {
    const scopeGradeId = isAdmin ? gradeId ?? undefined : undefined;
    getSubjects(scopeGradeId).then(setSubjects).catch(() => {});
  }, [isAdmin, gradeId]);

  const generate = async () => {
    setBusy(true);
    setError(null);
    setQuestions(null);
    try {
      setQuestions(
        await generateQuiz({
          grade_id: isAdmin && gradeId ? gradeId : undefined,
          subject_id: subjectId ?? undefined,
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
        {isAdmin ? (
          <select
            className="small-input"
            value={gradeId ?? ""}
            onChange={(e) => setGradeId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All grades</option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="dim">{user?.grade_name}</span>
        )}
        <select
          className="small-input"
          value={subjectId ?? ""}
          onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
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
