import { Link } from "react-router-dom";
import { SECONDARY_ASSESSMENTS, URGENT_ASSESSMENT } from "../../data/mockStudentHub";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

const TONE_ICON_BG: Record<"secondary" | "tertiary", string> = {
  secondary: "bg-surface-container-high text-secondary",
  tertiary: "bg-surface-container-high text-tertiary",
};

export function ActiveAssessmentsCard() {
  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="assignment_turned_in"
        title="Active Assessments"
        trailing={<span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant">{SECONDARY_ASSESSMENTS.length + 1} tasks</span>}
      />

      {/* The one genuinely real action on this screen */}
      <Link
        to="/student/quiz/practice"
        className="flex items-center justify-between gap-space-sm rounded-2xl bg-primary/10 p-space-md shadow-sm transition-colors hover:bg-primary/15"
      >
        <div className="flex items-center gap-space-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Icon name="bolt" className="text-[22px]" />
          </div>
          <div>
            <p className="font-headline text-sm font-semibold text-on-surface">Generate a practice quiz</p>
            <p className="text-xs text-on-surface-variant">Real AI-generated questions from your ingested books</p>
          </div>
        </div>
        <Icon name="arrow_forward" className="text-[20px] text-primary" />
      </Link>

      {/* Sample/preview content below */}
      <div className="relative flex flex-col gap-space-md overflow-hidden rounded-2xl bg-surface-container-high p-space-md shadow-lg">
        <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-tr-2xl bg-gradient-to-bl from-primary-container/20 to-transparent" />
        <div className="relative z-10 flex items-start justify-between gap-space-sm">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 font-code text-xs text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Sample questions · try the real exam UI
              </span>
              <span className="font-code text-xs text-on-surface-variant">{URGENT_ASSESSMENT.code}</span>
            </div>
            <h4 className="font-headline text-base font-bold text-on-surface">{URGENT_ASSESSMENT.title}</h4>
            <p className="text-sm text-on-surface-variant">{URGENT_ASSESSMENT.description}</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest/80 text-primary">
            <Icon name="graphic_eq" className="text-[24px]" />
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-2 rounded-xl bg-surface-container-lowest/60 p-2.5 text-center">
          <div className="flex flex-col">
            <span className="font-code text-sm font-bold text-on-surface">{URGENT_ASSESSMENT.questions}</span>
            <span className="text-xs text-on-surface-variant">Length</span>
          </div>
          <div className="flex flex-col">
            <span className="font-code text-sm font-bold text-secondary">{URGENT_ASSESSMENT.duration}</span>
            <span className="text-xs text-on-surface-variant">Duration</span>
          </div>
          <div className="flex flex-col">
            <span className="font-code text-sm font-bold text-tertiary">{URGENT_ASSESSMENT.points}</span>
            <span className="text-xs text-on-surface-variant">Weight</span>
          </div>
        </div>
        <Link
          to="/student/quiz/session"
          title="The exam-taking UI is real and interactive — the questions themselves are sample content, not AI-generated"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container via-inverse-primary to-secondary text-sm font-bold text-surface-container-lowest shadow-[0_0_20px_rgba(160,120,255,0.4)] transition-transform active:scale-[0.98]"
        >
          Begin quiz now
          <Icon name="arrow_forward" className="text-[20px]" />
        </Link>
      </div>

      {SECONDARY_ASSESSMENTS.map((a) => (
        <div key={a.id} className="flex items-center justify-between gap-space-sm rounded-2xl bg-surface-container p-space-md shadow-md">
          <div className="flex min-w-0 items-center gap-space-sm">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONE_ICON_BG[a.tone]}`}>
              <Icon name={a.icon} className="text-[22px]" />
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-on-surface">{a.title}</span>
                <span className="shrink-0 rounded bg-surface-container-highest px-1.5 py-0.5 font-code text-xs text-on-surface-variant">
                  {a.badge}
                </span>
              </div>
              <span className="mt-0.5 truncate text-xs text-on-surface-variant">{a.detail}</span>
            </div>
          </div>
          <button
            type="button"
            disabled
            title="Sample data — not a real assignment yet"
            className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container-high text-on-surface opacity-50"
          >
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>
      ))}
    </section>
  );
}
