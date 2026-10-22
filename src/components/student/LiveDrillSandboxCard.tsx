import { useState } from "react";
import { DRILL_QUESTION } from "../../data/mockStudentHub";
import { Icon } from "../ui/Icon";

export function LiveDrillSandboxCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  return (
    <section className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="terminal" className="text-[20px] text-secondary" />
          <h3 className="font-headline text-lg font-semibold text-on-surface">Live Drill Preview</h3>
        </div>
        <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 font-code text-xs text-secondary">Interactive sandbox</span>
      </div>

      <div className="flex flex-col gap-space-md rounded-2xl bg-surface-container-high p-space-md shadow-xl">
        <div className="flex items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-surface-container-lowest px-2 py-0.5 font-code text-xs font-bold text-primary">
              {DRILL_QUESTION.index}
            </span>
            <span className="text-xs text-on-surface-variant">{DRILL_QUESTION.topic}</span>
          </div>
          <div className="flex items-center gap-1.5 font-code text-xs text-secondary">
            <Icon name="hourglass_top" className="text-[16px]" />
            {DRILL_QUESTION.timer}
          </div>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-lowest">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-container to-secondary"
            style={{ width: `${DRILL_QUESTION.progressPct}%` }}
          />
        </div>

        <div className="rounded-xl bg-surface-container-lowest/80 p-3">
          <p className="text-sm font-medium leading-relaxed text-on-surface">{DRILL_QUESTION.prompt}</p>
        </div>

        <div className="flex flex-col gap-2">
          {DRILL_QUESTION.options.map((opt) => {
            const active = selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors ${
                  active ? "bg-secondary-container/20 shadow-[0_0_12px_rgba(76,215,246,0.2)]" : "bg-surface-container hover:bg-surface-bright"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg font-code text-sm font-bold ${
                      active ? "bg-secondary text-surface-container-lowest shadow-sm" : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className={`text-sm text-on-surface ${active ? "font-semibold" : ""}`}>{opt.text}</span>
                </div>
                <input
                  type="radio"
                  name="drill-choice"
                  value={opt.id}
                  checked={active}
                  onChange={() => {
                    setSelected(opt.id);
                    setLocked(false);
                  }}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-space-sm pt-1">
          <button
            type="button"
            disabled
            title="Not implemented yet"
            className="flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-surface-container px-3 py-2 text-sm text-on-surface-variant opacity-50"
          >
            <Icon name="flag" className="text-[16px]" />
            Flag for review
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={() => setLocked(true)}
            className="flex items-center gap-2 rounded-xl bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary-container shadow-[0_0_15px_rgba(160,120,255,0.3)] transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {locked ? (
              <>
                <Icon name="check_circle" className="text-[16px] text-tertiary" />
                <span className="text-tertiary">Saved locally</span>
              </>
            ) : (
              <>
                Lock answer
                <Icon name="arrow_forward" className="text-[16px]" />
              </>
            )}
          </button>
        </div>
        {locked && (
          <p className="text-xs text-on-surface-variant">
            Sandbox only — nothing is graded or saved to a backend. See{" "}
            <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
          </p>
        )}
      </div>
    </section>
  );
}
