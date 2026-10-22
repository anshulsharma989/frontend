import type { SubjectGradebook } from "../../data/mockGradebook";
import { Icon } from "../ui/Icon";

export function KnowledgeGapCard({ subject }: { subject: SubjectGradebook }) {
  return (
    <section className="relative flex flex-col gap-space-md overflow-hidden rounded-xl bg-surface-container p-space-md shadow-lg">
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-[0_0_12px_rgba(208,188,255,0.3)]">
            <Icon name="cognition" className="text-[20px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-base font-semibold text-on-surface">Socratic Core 4.5</span>
            <span className="font-code text-xs text-outline">Adaptive knowledge graph</span>
          </div>
        </div>
        <span className="rounded-full bg-surface-container-high px-2 py-1 text-xs font-semibold text-on-surface-variant">
          Sample insight
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-tertiary">
          <Icon name="check_circle" className="text-[16px]" />
          Mastered concepts (100% retention)
        </div>
        <div className="flex flex-wrap gap-1.5">
          {subject.masteredConcepts.map((c) => (
            <span key={c} className="rounded-full bg-tertiary-container/20 px-3 py-1 font-code text-xs text-tertiary">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2 rounded-lg bg-surface-container-lowest p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
            <Icon name="priority_high" className="text-[16px]" />
            Needs focus / growth point
          </div>
          <span className="font-code text-xs font-bold text-secondary">{subject.growthPoint.masteryPct}% mastery</span>
        </div>
        <p className="text-sm text-on-surface">
          <strong className="font-semibold text-on-surface">{subject.growthPoint.title}:</strong>{" "}
          {subject.growthPoint.description}
        </p>
        <button
          type="button"
          disabled
          title="Targeted AI drill generation isn't implemented yet"
          className="mt-1 flex min-h-[48px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-4 text-sm font-bold text-on-primary opacity-60 shadow-[0_0_20px_rgba(208,188,255,0.35)]"
        >
          <Icon name="bolt" className="text-[20px]" />
          Generate 5-min targeted drill
        </button>
      </div>
    </section>
  );
}
