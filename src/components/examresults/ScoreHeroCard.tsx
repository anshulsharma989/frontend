import { COHORT, SCORE } from "../../data/mockExamResults";
import { Icon } from "../ui/Icon";
import { ProgressRing } from "../ui/ProgressRing";

export function ScoreHeroCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest p-space-lg shadow-xl">
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-secondary/15 blur-3xl" />
      <div className="relative flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-outline">Overall mastery result</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-headline text-3xl font-bold text-on-surface">{SCORE.pointsEarned}</span>
              <span className="font-headline text-lg text-outline">/ {SCORE.pointsTotal} pts</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-primary-container px-2.5 py-0.5 text-sm font-semibold text-on-primary-container shadow-sm">
                {SCORE.pct}%
              </span>
              <span className="flex items-center gap-0.5 text-sm font-medium text-tertiary">
                <Icon name="trending_up" className="text-[16px]" />
                {SCORE.percentileLabel}
              </span>
            </div>
          </div>
          <ProgressRing percent={SCORE.pct} size={96} strokeWidth={8} indicatorClassName="text-secondary">
            <span className="font-headline text-lg font-bold text-on-surface">{SCORE.tier}</span>
            <span className="text-[10px] font-semibold uppercase tracking-tight text-outline">Tier</span>
          </ProgressRing>
        </div>

        <div className="flex flex-col gap-2.5 rounded-lg bg-surface-container-low/80 p-space-sm backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-outline">Cohort standing</span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <Icon name="military_tech" className="text-[14px]" />
              {COHORT.rankLabel}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-variant">
            <div className="absolute inset-y-0 left-0 bg-outline/40" style={{ width: `${COHORT.classAvgPct}%` }} />
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${COHORT.yourPct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Class avg</span>
              <span className="text-sm font-semibold text-on-surface-variant">
                {COHORT.classAvgPct}% <span className="text-[10px] font-normal text-outline">({COHORT.classAvgPoints})</span>
              </span>
            </div>
            <div className="flex flex-col border-x border-outline-variant/30">
              <span className="text-[11px] font-medium text-secondary">Your score</span>
              <span className="text-sm font-bold text-on-surface">
                {COHORT.yourPct}% <span className="text-[10px] font-normal text-outline">({COHORT.yourPoints})</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-outline">Cohort peak</span>
              <span className="text-sm font-semibold text-on-surface-variant">
                {COHORT.peakPct}% <span className="text-[10px] font-normal text-outline">({COHORT.peakPoints})</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
