import { Icon } from "../ui/Icon";

/** Static sample insight — there's no analytics/AI backend for this yet, see pending-backend-work.md. */
export function AiCoPilotCard() {
  return (
    <section className="flex flex-col gap-space-xs rounded-xl bg-surface-container-low p-space-md shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon name="magic_button" className="text-[20px] text-secondary" />
          <span className="font-headline text-base font-semibold text-on-surface">AI Co-Pilot Insight</span>
        </div>
        <span className="rounded-full bg-secondary-container/20 px-2 py-0.5 font-code text-[10px] uppercase tracking-wider text-secondary">
          Sample insight
        </span>
      </div>
      <p className="text-sm leading-relaxed text-on-surface-variant">
        In Period 3 testing, <span className="font-medium text-error">34% of students</span> confused linear density
        with volumetric density. Would you like to introduce an authentic distractor?
      </p>
      <div className="flex items-center justify-between gap-space-xs rounded-lg bg-surface-container-lowest p-2.5">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm text-primary-fixed">Option E: λ = 1.12 m, v = 28.0 m/s</span>
          <span className="font-code text-[11px] text-outline">Catches μ = m/V misconceptions</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled
            title="There's no analytics backend behind this insight yet"
            className="cursor-not-allowed rounded-md bg-secondary px-2.5 py-1.5 text-xs font-semibold text-on-secondary opacity-50"
          >
            Add option
          </button>
          <button
            type="button"
            disabled
            title="Not implemented yet"
            className="cursor-not-allowed rounded-md bg-surface-container px-2 py-1.5 text-xs text-on-surface-variant opacity-50"
          >
            Dismiss
          </button>
        </div>
      </div>
    </section>
  );
}
