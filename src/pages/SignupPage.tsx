import { FormEvent, useEffect, useState } from "react";
import { getGrades } from "../api";
import { useAuth } from "../auth";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Icon } from "../components/ui/Icon";
import type { Grade } from "../types";

const inputClass =
  "w-full rounded-lg bg-surface-container px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary";

interface SignupPageProps {
  onSwitchToLogin: () => void;
  onBack: () => void;
}

export default function SignupPage({ onSwitchToLogin, onBack }: SignupPageProps) {
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
      <AuthLayout title="Account created" onBack={onBack}>
        <div className="flex flex-col items-center gap-space-sm text-center">
          <Icon name="mark_email_unread" className="text-4xl text-secondary" />
          <p className="text-sm text-on-surface-variant">
            Your account is waiting for admin approval. You'll be able to log in once it's approved.
          </p>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="mt-1 w-full rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary-container shadow-md transition-transform active:scale-[0.98]"
          >
            Back to login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Sign up" onBack={onBack}>
      <form className="flex flex-col gap-space-sm" onSubmit={submit}>
        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoFocus
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className={inputClass}
        />
        <select
          value={gradeId}
          onChange={(e) => setGradeId(e.target.value ? Number(e.target.value) : "")}
          required
          className={inputClass}
        >
          <option value="">Select your grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {error && <div className="rounded-lg bg-error-container/20 px-3 py-2 text-sm text-error">⚠️ {error}</div>}
        <button
          type="submit"
          disabled={busy || gradeId === ""}
          className="mt-1 rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary-container shadow-md transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Signing up…" : "Sign up"}
        </button>
        <div className="pt-1 text-center text-sm text-on-surface-variant">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="font-medium text-primary hover:underline">
            Log in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
