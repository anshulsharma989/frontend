import type { QuizSessionQuestion } from "../../data/mockQuizSession";
import { FilterChips } from "../ui/FilterChips";

interface QuestionPaletteProps {
  questions: QuizSessionQuestion[];
  answers: Record<number, string>;
  flagged: Set<number>;
  activeId: number;
  onSelect: (id: number) => void;
  filter: string;
  onFilterChange: (id: string) => void;
}

export function QuestionPalette({ questions, answers, flagged, activeId, onSelect, filter, onFilterChange }: QuestionPaletteProps) {
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;
  const unansweredCount = questions.length - answeredCount;

  const filters = [
    { id: "all", label: `All (${questions.length})` },
    { id: "flagged", label: `Flagged (${flaggedCount})`, tone: "error" as const },
    { id: "unanswered", label: `Unanswered (${unansweredCount})` },
  ];

  const visible = questions.filter((q) => {
    if (filter === "flagged") return flagged.has(q.id);
    if (filter === "unanswered") return !answers[q.id];
    return true;
  });

  return (
    <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container-low p-space-sm shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-space-sm">
          <span className="font-semibold text-on-surface">
            Question {activeId} of {questions.length}
          </span>
          <span className="text-outline">·</span>
          <span className="text-tertiary">{answeredCount} saved</span>
        </div>
        <div className="flex items-center gap-space-xs text-xs text-outline">
          <span className="h-2 w-2 rounded-full bg-error" />
          <span>{flaggedCount} flagged</span>
        </div>
      </div>

      <FilterChips chips={filters} activeId={filter} onChange={onFilterChange} />

      <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
        {visible.map((q) => {
          const active = q.id === activeId;
          const answered = Boolean(answers[q.id]);
          const isFlagged = flagged.has(q.id);
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelect(q.id)}
              className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-code text-sm transition-colors ${
                active
                  ? "bg-primary font-bold text-on-primary shadow-[0_0_12px_rgba(208,188,255,0.45)]"
                  : answered
                    ? "bg-surface-container text-tertiary hover:bg-surface-variant"
                    : "bg-surface-container-lowest text-outline hover:bg-surface-container"
              }`}
            >
              {q.id}
              {isFlagged && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-error" />}
            </button>
          );
        })}
        {visible.length === 0 && <span className="px-1 text-sm text-on-surface-variant">No questions match this filter.</span>}
      </div>
    </div>
  );
}
