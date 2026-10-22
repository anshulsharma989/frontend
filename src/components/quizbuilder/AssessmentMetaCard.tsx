import { Icon } from "../ui/Icon";

export type BuilderTab = "questions" | "rubric" | "rules" | "schedule";

const TABS: { id: BuilderTab; label: string }[] = [
  { id: "questions", label: "1. Questions" },
  { id: "rubric", label: "2. Rubric" },
  { id: "rules", label: "3. Rules" },
  { id: "schedule", label: "4. Schedule" },
];

interface AssessmentMetaCardProps {
  title: string;
  onTitleChange: (title: string) => void;
  questionCount: number;
  totalPoints: number;
  activeTab: BuilderTab;
  onTabChange: (tab: BuilderTab) => void;
}

export function AssessmentMetaCard({
  title,
  onTitleChange,
  questionCount,
  totalPoints,
  activeTab,
  onTabChange,
}: AssessmentMetaCardProps) {
  return (
    <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <div className="inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-2.5 py-1 font-code text-xs uppercase tracking-wider text-on-surface-variant">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Assessment authoring
          <span className="text-outline">/</span>
          <span className="font-medium text-secondary">PHYS-402</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-tertiary/10 px-2.5 py-1 text-xs font-medium text-tertiary">
          <Icon name="shield" className="text-[14px]" />
          Proctored AI guard
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-1">
        <label className="text-xs font-medium text-on-surface-variant" htmlFor="quiz-title">
          Quiz title
        </label>
        <input
          id="quiz-title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded-lg bg-surface-container-lowest px-3.5 py-2.5 font-headline text-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-space-xs pt-1">
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-xs text-on-surface">
          <Icon name="group" className="text-[14px] text-outline" />
          Grade 11-B &amp; 11-A
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-xs text-on-surface">
          <Icon name="timer" className="text-[14px] text-outline" />
          45 mins
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-xs text-on-surface">
          <Icon name="functions" className="text-[14px] text-outline" />
          {totalPoints} pts ({questionCount} questions)
        </span>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-1 rounded-lg bg-surface-container-lowest p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center rounded-md px-1 py-2 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary-container text-on-primary-container shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
