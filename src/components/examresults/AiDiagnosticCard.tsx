import { AI_DIAGNOSTIC } from "../../data/mockExamResults";
import { Icon } from "../ui/Icon";

export function AiDiagnosticCard() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high p-space-md shadow-lg">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-[0_0_12px_rgba(208,188,255,0.3)]">
          <Icon name="psychology" className="text-[20px]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">AI Diagnostic Insight</span>
            <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-xs text-on-surface-variant">
              Sample insight
            </span>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Near-flawless computational execution on <strong className="text-on-surface">{AI_DIAGNOSTIC.strongArea}</strong>{" "}
            ({AI_DIAGNOSTIC.strongDetail}). Missed points stemmed from{" "}
            <strong className="text-error">{AI_DIAGNOSTIC.weakArea}</strong> in {AI_DIAGNOSTIC.weakDetail}.
          </p>
          <button
            type="button"
            disabled
            title="Targeted AI drill generation isn't implemented yet"
            className="mt-1 flex w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container px-3 py-2.5 text-sm font-semibold text-on-surface opacity-60 shadow-md"
          >
            <Icon name="bolt" className="text-[18px]" />
            Launch 5-min target drill (boundary reflection)
          </button>
        </div>
      </div>
    </div>
  );
}
