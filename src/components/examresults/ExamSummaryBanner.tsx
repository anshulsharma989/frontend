import { EXAM_META } from "../../data/mockExamResults";
import { Icon } from "../ui/Icon";

export function ExamSummaryBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md">
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative flex flex-col gap-space-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-highest px-2.5 py-1 text-xs font-medium tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {EXAM_META.courseCode} · {EXAM_META.title}
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-tertiary-container/20 px-2.5 py-1 text-xs text-tertiary">
            <Icon name="verified_user" className="text-[14px]" />
            Proctor verified
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-1 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs text-outline">Submission cleared</p>
            <p className="text-sm font-medium text-on-surface">{EXAM_META.submittedAt}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-on-surface-variant">
            <div className="flex items-center gap-1">
              <Icon name="timer" className="text-[16px] text-secondary" />
              <span>
                <strong className="font-semibold text-on-surface">{EXAM_META.durationUsed}</strong> / {EXAM_META.durationTotal}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="security" className="text-[16px] text-tertiary" />
              <span className="font-medium text-tertiary">{EXAM_META.proctorClearedPct}% cleared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
