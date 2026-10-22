import { EFFICIENCY } from "../../data/mockExamResults";
import { Icon } from "../ui/Icon";

export function EfficiencyStatsRow() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex flex-col justify-between rounded-xl bg-surface-container p-3 shadow-sm">
        <div className="flex items-center gap-1 text-xs text-secondary">
          <Icon name="speed" className="text-[16px]" />
          Pacing
        </div>
        <div className="my-1.5">
          <p className="font-headline text-lg font-bold text-on-surface">{EFFICIENCY.pacing.avgPerQuestion}</p>
          <p className="text-[10px] font-medium text-tertiary">{EFFICIENCY.pacing.label}</p>
        </div>
        <span className="text-[10px] text-outline">Cohort: {EFFICIENCY.pacing.cohortAvg}</span>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-surface-container p-3 shadow-sm">
        <div className="flex items-center gap-1 text-xs text-primary">
          <Icon name="calculate" className="text-[16px]" />
          Tools
        </div>
        <div className="my-1.5">
          <p className="font-headline text-lg font-bold text-on-surface">{EFFICIENCY.tools.calcInvocations}x</p>
          <p className="text-[10px] text-outline">Calc invocations</p>
        </div>
        <span className="text-[10px] text-outline">Sheet peeked: {EFFICIENCY.tools.sheetPeeks}x</span>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-surface-container p-3 shadow-sm">
        <div className="flex items-center gap-1 text-xs text-on-surface-variant">
          <Icon name="flag" className="text-[16px]" />
          Review
        </div>
        <div className="my-1.5">
          <p className="font-headline text-lg font-bold text-on-surface">{EFFICIENCY.review.flaggedCount}</p>
          <p className="text-[10px] font-medium text-tertiary">{EFFICIENCY.review.resolvedLabel}</p>
        </div>
        <span className="text-[10px] text-outline">{EFFICIENCY.review.flaggedCount} marked &amp; kept</span>
      </div>
    </div>
  );
}
