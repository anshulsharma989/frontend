import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";

function formatTime(totalSeconds: number): string {
  const m = Math.max(0, Math.floor(totalSeconds / 60));
  const s = Math.max(0, totalSeconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface QuizSessionHeaderProps {
  courseCode: string;
  title: string;
  durationSeconds: number;
  solvedCount: number;
  totalCount: number;
}

export function QuizSessionHeader({ courseCode, title, durationSeconds, solvedCount, totalCount }: QuizSessionHeaderProps) {
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    const timer = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const pct = totalCount === 0 ? 0 : Math.round((solvedCount / totalCount) * 100);

  return (
    <header className="flex shrink-0 flex-col gap-1.5 border-b border-outline-variant bg-surface-dim px-space-lg py-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => navigate("/student/dashboard")}
            className="flex h-11 items-center gap-space-xs rounded-xl bg-surface-container-high px-space-sm text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-variant"
          >
            <Icon name="pause_circle" className="text-[18px] text-error" />
            Pause
          </button>
          <div className="flex items-center gap-space-xs rounded-full bg-surface-container-low px-space-sm py-space-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
            <span className="text-xs font-medium tracking-tight text-tertiary">Proctoring preview</span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-xs rounded-xl bg-surface-container-high px-space-sm py-1.5">
            <Icon name="timer" className="text-[16px] text-secondary" />
            <span className="font-code text-sm font-semibold tracking-wider text-secondary">{formatTime(remaining)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs text-xs text-on-surface-variant">
          <span className="font-medium text-on-surface">
            {courseCode} · {title}
          </span>
          <span className="text-outline">·</span>
          <span className="font-code text-outline">
            {solvedCount}/{totalCount} solved
          </span>
        </div>
        <div className="h-1.5 w-full max-w-[160px] overflow-hidden rounded-full bg-surface-container-lowest">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </header>
  );
}
