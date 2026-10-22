import { useState } from "react";
import { Link } from "react-router-dom";
import { ATTENDANCE_ROSTER, type AttendanceStatus, type RosterEntry } from "../../data/mockTeacherDashboard";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

const STATUS_PILL: Record<AttendanceStatus, string> = {
  P: "bg-tertiary-container text-on-tertiary",
  A: "bg-error-container text-on-error-container",
  L: "bg-primary-container text-on-primary-container",
};

const STATUS_NOTE_TONE: Record<AttendanceStatus, string> = {
  P: "text-on-surface-variant",
  A: "text-error",
  L: "text-primary",
};

const CURRENT_CLASS_LABEL = "Period 3 · Grade 10 Honors";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function LiveAttendanceCard() {
  const [roster, setRoster] = useState<RosterEntry[]>(ATTENDANCE_ROSTER);
  const [synced, setSynced] = useState(false);

  const setStatus = (id: string, status: AttendanceStatus) =>
    setRoster((r) => r.map((entry) => (entry.id === id ? { ...entry, status, note: undefined } : entry)));

  const present = roster.filter((r) => r.status === "P").length;
  const absent = roster.filter((r) => r.status === "A").length;
  const late = roster.filter((r) => r.status === "L").length;

  return (
    <Card className="flex flex-col gap-space-md">
      <SectionHeader
        icon="fact_check"
        title="Live Attendance"
        tone="secondary"
        trailing={<span className="text-sm text-on-surface-variant">{CURRENT_CLASS_LABEL}</span>}
      />

      <div className="grid grid-cols-3 gap-space-xs">
        <div className="flex flex-col items-center justify-center rounded-lg bg-surface-container-low p-2.5 text-center">
          <span className="font-headline text-lg font-bold text-tertiary">{present}</span>
          <span className="text-xs text-on-surface-variant">Present</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-surface-container-low p-2.5 text-center">
          <span className="font-headline text-lg font-bold text-error">{absent}</span>
          <span className="text-xs text-on-surface-variant">Absent</span>
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-surface-container-low p-2.5 text-center">
          <span className="font-headline text-lg font-bold text-primary">{late}</span>
          <span className="text-xs text-on-surface-variant">Late</span>
        </div>
      </div>

      <Link
        to="/teacher/attendance"
        className="flex min-h-[44px] items-center justify-between rounded-lg bg-surface-container-high px-space-md text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-highest"
      >
        <span className="flex items-center gap-2">
          <Icon name="play_circle" className="text-[20px] text-secondary" />
          Interactive AI voice roll-call
        </span>
        <span className="font-semibold text-secondary">Start →</span>
      </Link>

      <div className="flex flex-col gap-space-xs">
        <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          Fast roster action (this class only — sample data)
        </p>
        {roster.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-space-xs rounded-lg bg-surface-container-low p-2.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-sm font-medium text-on-surface">
                {initials(entry.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-on-surface">{entry.name}</p>
                <p className={`truncate text-xs ${STATUS_NOTE_TONE[entry.status]}`}>
                  {entry.note ?? `ID: ${entry.id}`}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-surface-container p-1">
              {(["P", "A", "L"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(entry.id, s)}
                  className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                    entry.status === s ? STATUS_PILL[s] : "text-on-surface-variant hover:bg-surface-bright"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSynced(true)}
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container py-3 text-sm font-semibold text-on-primary shadow-lg transition-transform active:scale-[0.98]"
      >
        <Icon name={synced ? "check_circle" : "cloud_sync"} className="text-[20px]" />
        {synced ? "Recorded for this preview session" : "Save & sync attendance"}
      </button>
      {synced && (
        <p className="text-xs text-on-surface-variant">
          This is a UI preview — there's no attendance backend yet, so nothing was actually synced. See{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
        </p>
      )}
    </Card>
  );
}
