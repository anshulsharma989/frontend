import { useAuth } from "../../auth";
import { CUMULATIVE_GPA, TERM_INFO, type SubjectGradebook } from "../../data/mockGradebook";
import { Icon } from "../ui/Icon";

export function GradebookOverviewCard({ subject }: { subject: SubjectGradebook }) {
  const { user } = useAuth();

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate font-headline text-xl font-semibold text-on-surface">{user?.full_name}</h1>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-on-surface-variant">
            <span>{user?.grade_name ?? "—"}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-container/20 px-3 py-1.5 text-primary shadow-[0_0_16px_rgba(160,120,255,0.25)]">
          <Icon name="stars" className="text-[16px]" />
          <span className="text-xs font-semibold uppercase tracking-wider">Honors distinction</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-xl">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />
        <div className="relative z-10 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Cumulative weighted GPA
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-headline text-3xl font-bold tracking-tight text-on-surface">
                {CUMULATIVE_GPA.value.toFixed(2)}
              </span>
              <span className="text-sm text-outline">/ {CUMULATIVE_GPA.max.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 rounded-full bg-tertiary-container/30 px-2.5 py-1 text-tertiary shadow-[0_0_12px_rgba(78,222,163,0.2)]">
              <Icon name="trending_up" className="text-[16px]" />
              <span className="font-code text-xs font-semibold">{CUMULATIVE_GPA.trendVsMidterm} vs midterm</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
            style={{ width: `${CUMULATIVE_GPA.progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-surface-container-low px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Icon name="calendar_clock" className="text-[20px] text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-on-surface">{TERM_INFO.label}</span>
            <span className="font-code text-xs text-outline">{TERM_INFO.week}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-secondary">{TERM_INFO.progressPct}% term progress</span>
          <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full rounded-full bg-secondary" style={{ width: `${TERM_INFO.progressPct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-space-sm">
        <div className="flex flex-col rounded-xl bg-surface-container-low p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Course Average</span>
            <Icon name="verified" className="text-[18px] text-tertiary" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline text-lg text-on-surface">{subject.courseAveragePct}%</span>
            <span className="rounded bg-tertiary/10 px-1.5 py-0.5 text-xs font-bold text-tertiary">{subject.courseGrade}</span>
          </div>
          <span className="mt-1 font-code text-xs text-outline">{subject.courseTrend}</span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Quizzes Cleared</span>
            <Icon name="task_alt" className="text-[18px] text-secondary" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline text-lg text-on-surface">{subject.quizzesCleared}</span>
            <span className="text-xs text-outline">of {subject.quizzesTotal}</span>
          </div>
          <span className="mt-1 font-code text-xs text-secondary">
            {subject.quizzesTotal - subject.quizzesCleared} pending
          </span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Percentile</span>
            <Icon name="leaderboard" className="text-[18px] text-primary" />
          </div>
          <span className="font-headline text-lg text-on-surface">{subject.percentileLabel}</span>
          <span className="mt-1 font-code text-xs text-outline">{subject.rankLabel}</span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">AI Mastery</span>
            <Icon name="psychology" className="text-[18px] text-primary-container" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-headline text-lg text-on-surface">{subject.aiMasteryPct}%</span>
            <span className="text-xs font-medium text-primary">{subject.aiMasteryLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
