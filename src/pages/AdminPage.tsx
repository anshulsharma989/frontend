import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  approveUser,
  createGrade,
  createSubject,
  deleteDocument,
  deleteGrade,
  deleteSubject,
  getAnalytics,
  getGrades,
  getSubjects,
  listDocuments,
  listPendingUsers,
  rejectUser,
  uploadDocument,
} from "../api";
import type { Analytics, DocumentInfo, Grade, Subject, User } from "../types";

const STATUS_ICON: Record<DocumentInfo["status"], string> = {
  queued: "⏳",
  processing: "⚙️",
  ready: "✅",
  failed: "❌",
};

function PendingUsers() {
  const [pending, setPending] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    listPendingUsers()
      .then(setPending)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const act = async (fn: (id: number) => Promise<User>, id: number) => {
    await fn(id);
    refresh();
  };

  return (
    <>
      <h2>Pending users</h2>
      {error && <div className="error">⚠️ {error}</div>}
      <table className="pending-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pending.map((u) => (
            <tr key={u.id}>
              <td>{u.full_name}</td>
              <td>{u.email}</td>
              <td>{u.grade_name ?? "—"}</td>
              <td>
                <button onClick={() => act(approveUser, u.id)}>Approve</button>{" "}
                <button className="secondary" onClick={() => act(rejectUser, u.id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {pending.length === 0 && (
            <tr>
              <td colSpan={4} className="dim">
                No pending signups.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

function CatalogManager({
  grades,
  onGradesChanged,
}: {
  grades: Grade[];
  onGradesChanged: () => void;
}) {
  const [newGradeName, setNewGradeName] = useState("");
  const [subjectGradeId, setSubjectGradeId] = useState<number | "">("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refreshSubjects = useCallback(() => {
    getSubjects().then(setSubjects).catch(() => {});
  }, []);

  useEffect(() => {
    refreshSubjects();
  }, [refreshSubjects]);

  const addGrade = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createGrade(newGradeName.trim());
      setNewGradeName("");
      onGradesChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const addSubject = async (e: FormEvent) => {
    e.preventDefault();
    if (subjectGradeId === "") return;
    try {
      await createSubject(subjectGradeId, newSubjectName.trim());
      setNewSubjectName("");
      refreshSubjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const removeGrade = async (id: number) => {
    try {
      await deleteGrade(id);
      onGradesChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const removeSubject = async (id: number) => {
    try {
      await deleteSubject(id);
      refreshSubjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <>
      <h2>Grades &amp; subjects</h2>
      {error && <div className="error">⚠️ {error}</div>}
      <form className="catalog-form" onSubmit={addGrade}>
        <input
          className="small-input"
          placeholder="New grade, e.g. Grade 11"
          value={newGradeName}
          onChange={(e) => setNewGradeName(e.target.value)}
          required
        />
        <button type="submit">Add grade</button>
        {grades.map((g) => (
          <span key={g.id} className="chip">
            {g.name}{" "}
            <button type="button" className="link" onClick={() => removeGrade(g.id)}>
              ✕
            </button>
          </span>
        ))}
      </form>
      <form className="catalog-form" onSubmit={addSubject}>
        <select
          value={subjectGradeId}
          onChange={(e) => setSubjectGradeId(e.target.value ? Number(e.target.value) : "")}
          required
        >
          <option value="">Grade…</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <input
          className="small-input"
          placeholder="New subject, e.g. Chemistry"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          required
        />
        <button type="submit">Add subject</button>
      </form>
      <div className="catalog-form">
        {subjects.map((s) => (
          <span key={s.id} className="chip">
            {grades.find((g) => g.id === s.grade_id)?.name ?? "?"} · {s.name}{" "}
            <button type="button" className="link" onClick={() => removeSubject(s.id)}>
              ✕
            </button>
          </span>
        ))}
      </div>
    </>
  );
}

export default function AdminPage() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [uploadSubjects, setUploadSubjects] = useState<Subject[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [gradeId, setGradeId] = useState<number | "">("");
  const [subjectId, setSubjectId] = useState<number | "">("");
  const [language, setLanguage] = useState("en");

  const refreshGrades = useCallback(() => {
    getGrades().then(setGrades).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    try {
      setDocuments(await listDocuments());
      setAnalytics(await getAnalytics());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    refresh();
    refreshGrades();
  }, [refresh, refreshGrades]);

  useEffect(() => {
    if (gradeId === "") {
      setUploadSubjects([]);
      return;
    }
    getSubjects(gradeId).then(setUploadSubjects).catch(() => {});
  }, [gradeId]);

  // Refresh on mount, then poll while any document is still ingesting
  useEffect(() => {
    const ingesting = documents.some((d) => d.status === "queued" || d.status === "processing");
    if (!ingesting) return;
    const timer = setInterval(refresh, 3000);
    return () => clearInterval(timer);
  }, [documents, refresh]);

  const upload = async (e: FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || gradeId === "") return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", title || file.name);
      form.append("grade_id", String(gradeId));
      if (subjectId !== "") form.append("subject_id", String(subjectId));
      form.append("language", language);
      await uploadDocument(form);
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (doc: DocumentInfo) => {
    if (!confirm(`Delete "${doc.title}" and all its chunks?`)) return;
    await deleteDocument(doc.id);
    await refresh();
  };

  return (
    <div className="admin-page">
      <h2>Upload a book</h2>
      <form className="upload-form" onSubmit={upload}>
        <input ref={fileRef} type="file" accept=".pdf,.csv,.docx,.txt,.md" required />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value ? Number(e.target.value) : "")}
          required
        >
          <option value="">Grade…</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : "")}
          disabled={gradeId === ""}
        >
          <option value="">Subject (optional)</option>
          {uploadSubjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mixed">Mixed</option>
        </select>
        <button type="submit" disabled={busy || gradeId === ""}>
          {busy ? "Uploading…" : "Upload & ingest"}
        </button>
      </form>

      {error && <div className="error">⚠️ {error}</div>}

      <h2>Books</h2>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Lang</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr key={d.id}>
              <td title={d.error ?? d.status}>
                {STATUS_ICON[d.status]} {d.status}
              </td>
              <td>{d.title}</td>
              <td>{d.subject_name ?? "—"}</td>
              <td>{d.grade_name}</td>
              <td>{d.language}</td>
              <td>
                <button className="secondary" onClick={() => remove(d)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {documents.length === 0 && (
            <tr>
              <td colSpan={6} className="dim">
                No books yet — upload one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CatalogManager grades={grades} onGradesChanged={refreshGrades} />

      <PendingUsers />

      {analytics && (
        <>
          <h2>Analytics</h2>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-value">{analytics.total_questions}</div>
              <div className="stat-label">questions asked</div>
            </div>
            <div className="stat">
              <div className="stat-value">👍 {analytics.feedback.helpful}</div>
              <div className="stat-label">helpful</div>
            </div>
            <div className="stat">
              <div className="stat-value">👎 {analytics.feedback.not_helpful}</div>
              <div className="stat-label">not helpful</div>
            </div>
          </div>
          {analytics.recent_questions.length > 0 && (
            <>
              <h3>Recent questions</h3>
              <ul className="recent">
                {analytics.recent_questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
