import { FormEvent, useState } from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { useAuth } from "../auth";

const inputClass =
  "w-full rounded-lg bg-surface-container px-3.5 py-2.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary";

interface LoginPageProps {
  onSwitchToSignup: () => void;
  onBack: () => void;
}

export default function LoginPage({ onSwitchToSignup, onBack }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Log in" onBack={onBack}>
      <form className="flex flex-col gap-space-sm" onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClass}
        />
        {error && <div className="rounded-lg bg-error-container/20 px-3 py-2 text-sm text-error">⚠️ {error}</div>}
        <button
          type="submit"
          disabled={busy}
          className="mt-1 rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-on-primary-container shadow-md transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Logging in…" : "Log in"}
        </button>
        <div className="pt-1 text-center text-sm text-on-surface-variant">
          New here?{" "}
          <button type="button" onClick={onSwitchToSignup} className="font-medium text-primary hover:underline">
            Create an account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
