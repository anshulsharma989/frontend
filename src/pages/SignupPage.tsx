import { FormEvent, useEffect, useState } from "react";
import { getGrades } from "../api";
import { useAuth } from "../auth";
import type { Grade } from "../types";

export default function SignupPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { signup } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gradeId, setGradeId] = useState<number | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getGrades()
      .then(setGrades)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (gradeId === "") return;
    setBusy(true);
    setError(null);
    try {
      await signup({
        email: email.trim(),
        password,
        full_name: fullName.trim(),
        grade_id: gradeId,
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="auth-page">
        <div className="card auth-form">
          <h2>Account created</h2>
          <p>Your account is waiting for admin approval. You'll be able to log in once it's approved.</p>
          <button type="button" onClick={onSwitchToLogin}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <form className="card auth-form" onSubmit={submit}>
        <h2>Sign up</h2>
        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoFocus
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <select
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value ? Number(e.target.value) : "")}
          required
        >
          <option value="">Select your grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {error && <div className="error">⚠️ {error}</div>}
        <button type="submit" disabled={busy || gradeId === ""}>
          {busy ? "Signing up…" : "Sign up"}
        </button>
        <div className="auth-switch">
          Already have an account?{" "}
          <button type="button" className="link" onClick={onSwitchToLogin}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
