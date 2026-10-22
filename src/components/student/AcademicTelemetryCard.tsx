import { useState } from "react";
import { MARKS_HISTORY, TELEMETRY, type MarkRecord } from "../../data/mockStudentHub";
import { Badge } from "../ui/Badge";
import { FilterChips } from "../ui/FilterChips";
import { Icon } from "../ui/Icon";
import { ProgressRing } from "../ui/ProgressRing";
import { SectionHeader } from "../ui/SectionHeader";

const SUBJECT_FILTERS = [
  { id: "all", label: "All subjects" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "mathematics", label: "Mathematics" },
];

const RANK_TONE: Record<MarkRecord["rankTone"], "secondary" | "tertiary" | "neutral"> = {
  secondary: "secondary",
  tertiary: "tertiary",
  neutral: "neutral",
};

const SCORE_TONE: Record<"high" | "mid", string> = {
  high: "bg-tertiary-container/20 text-tertiary",
  mid: "bg-primary/10 text-primary",
};

export function AcademicTelemetryCard() {
  const [subject, setSubject] = useState("all");

  const records = subject === "all" ? MARKS_HISTORY : MARKS_HISTORY.filter((m) => m.subject === subject);

  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="monitoring"
        title="Academic Telemetry"
        tone="tertiary"
        trailing={
          <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs font-semibold text-on-surface-variant">
            Sample data
          </span>
        }
      />

      <FilterChips chips={SUBJECT_FILTERS} activeId={subject} onChange={setSubject} />

      <div className="flex items-center justify-between gap-space-md rounded-2xl bg-surface-container p-space-md shadow-md">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Composite average</span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
              {TELEMETRY.compositeAvgPct}%
            </span>
            <span className="flex items-center font-code text-xs font-bold text-tertiary">
              <Icon name="trending_up" className="text-[14px]" />
              {TELEMETRY.trend}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1 text-xs text-on-surface-variant">
            <span>{TELEMETRY.completed} completed</span>
            <span className="text-outline">·</span>
            <span className="font-semibold text-tertiary">{TELEMETRY.overdue} overdue</span>
          </div>
        </div>
        <ProgressRing percent={TELEMETRY.compositeAvgPct} indicatorClassName="text-primary-container">
          <span className="font-code text-sm font-bold text-on-surface">{TELEMETRY.tier}</span>
          <span className="text-[9px] text-on-surface-variant">TIER</span>
        </ProgressRing>
      </div>

      <div className="flex flex-col gap-2">
        {records.map((m) => (
          <div key={m.id} className="flex items-center justify-between gap-space-sm rounded-xl bg-surface-container-low p-3.5 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-code text-sm font-extrabold ${
                  m.scorePct >= 95 ? SCORE_TONE.high : SCORE_TONE.mid
                }`}
              >
                {m.scorePct}%
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-on-surface">{m.title}</span>
                <div className="flex items-center gap-2">
                  <Badge tone={RANK_TONE[m.rankTone]}>{m.rank}</Badge>
                  <span className="text-xs text-on-surface-variant">{m.date}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled
              title="Detailed breakdown screen isn't built yet"
              className="flex shrink-0 cursor-not-allowed items-center gap-1 text-xs text-on-surface-variant opacity-50"
            >
              Breakdown
              <Icon name="chevron_right" className="text-[16px]" />
            </button>
          </div>
        ))}
        {records.length === 0 && <p className="text-sm text-on-surface-variant">No sample records for this subject.</p>}
      </div>
    </section>
  );
}
