import type { BuilderQuestion } from "../../data/mockQuizBuilder";
import { Icon } from "../ui/Icon";

interface QuestionNavStripProps {
  questions: BuilderQuestion[];
  activeId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export function QuestionNavStrip({ questions, activeId, onSelect, onAdd }: QuestionNavStripProps) {
  const activeIndex = questions.findIndex((q) => q.id === activeId);

  return (
    <section className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon name="format_list_numbered" className="text-[18px] text-primary" />
          <span className="text-sm font-medium text-on-surface">Question navigation</span>
        </div>
        <span className="font-code text-xs text-on-surface-variant">
          {activeIndex + 1} of {questions.length} selected
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
        {questions.map((q, i) => {
          const active = q.id === activeId;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelect(q.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                active
                  ? "bg-surface-container-highest shadow-[0_0_18px_-3px_rgba(160,120,255,0.5)]"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                  active ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex flex-col text-left">
                <span className={`text-sm ${active ? "font-semibold text-primary-fixed" : ""}`}>{q.typeLabel}</span>
                <span className={`font-code text-[10px] ${active ? "text-secondary" : "text-outline"}`}>
                  {q.points} pts{q.difficulty ? ` · ${q.difficulty}` : ""}
                </span>
              </div>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onAdd}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-surface-container-lowest px-3 py-2 text-sm text-primary transition-colors hover:bg-surface-container-low"
        >
          <Icon name="add" className="text-[16px]" />
          New
        </button>
      </div>
    </section>
  );
}
