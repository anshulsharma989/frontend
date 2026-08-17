import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { deleteDocument, getAnalytics, listDocuments, uploadDocument } from "../api";
import type { Analytics, DocumentInfo } from "../types";

const STATUS_ICON: Record<DocumentInfo["status"], string> = {
  queued: "⏳",
  processing: "⚙️",
  ready: "✅",
  failed: "❌",
};

export default function AdminPage() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState("en");

  const refresh = useCallback(async () => {
    try {
      setDocuments(await listDocuments());
      setAnalytics(await getAnalytics());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  // Refresh on mount, then poll while any document is still ingesting
  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    const ingesting = documents.some((d) => d.status === "queued" || d.status === "processing");
    if (!ingesting) return;
    const timer = setInterval(refresh, 3000);
    return () => clearInterval(timer);
  }, [documents, refresh]);

  const upload = async (e: FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", title || file.name);
      if (subject) form.append("subject", subject);
      if (grade) form.append("grade", grade);
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
        <input
          className="small-input"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="small-input"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mixed">Mixed</option>
        </select>
        <button type="submit" disabled={busy}>
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
              <td>{d.subject ?? "—"}</td>
              <td>{d.grade ?? "—"}</td>
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
