import { useMemo, useState } from "react";
import type { QuizSessionQuestion } from "../../data/mockQuizSession";
import { Icon } from "../ui/Icon";

interface QuestionCardProps {
  question: QuizSessionQuestion;
  selectedId: string | null;
  flagged: boolean;
  onSelect: (optionId: string) => void;
  onClear: () => void;
  onToggleFlag: () => void;
  onSendNumberToCalc: (value: string) => void;
}

export function QuestionCard({ question, selectedId, flagged, onSelect, onClear, onToggleFlag, onSendNumberToCalc }: QuestionCardProps) {
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());

  const numbers = useMemo(() => {
    const text = `${question.prompt} ${question.subPrompt ?? ""}`;
    const matches = text.match(/-?\d+(\.\d+)?/g) ?? [];
    return Array.from(new Set(matches));
  }, [question]);

  const toggleEliminate = () => {
    setEliminated((prev) => {
      if (prev.size > 0) return new Set();
      // Deterministically eliminate two non-selected options, skipping the selected one if any.
      const candidates = question.options.map((o) => o.id).filter((id) => id !== selectedId);
      return new Set(candidates.slice(0, 2));
    });
  };

  return (
    <div className="flex flex-col gap-space-md rounded-xl bg-surface-container p-space-md shadow-lg">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{question.section}</span>
          <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-code text-[11px] text-on-surface-variant">
            +{question.points.toFixed(2)} pts
          </span>
          <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-code text-[11px] text-secondary">{question.type}</span>
        </div>
        <button
          type="button"
          onClick={onToggleFlag}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm transition-colors ${
            flagged ? "bg-error-container/20 text-error" : "bg-surface-container-high text-outline hover:text-on-surface"
          }`}
        >
          <Icon name="bookmark" className="text-[18px]" />
          {flagged ? "Flagged" : "Review"}
        </button>
      </div>

      <div className="flex flex-col gap-space-sm">
        <p className="text-base leading-relaxed text-on-surface">{question.prompt}</p>
        {question.subPrompt && <p className="text-sm leading-relaxed text-on-surface-variant">{question.subPrompt}</p>}
      </div>

      {numbers.length > 0 && (
        <div className="flex items-center justify-between gap-space-xs rounded-lg bg-primary/5 px-space-sm py-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-on-surface-variant">
            <Icon name="auto_read_play" className="shrink-0 text-[16px] text-primary" />
            Parsed:
            {numbers.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onSendNumberToCalc(n)}
                className="rounded bg-surface-container-highest px-1.5 py-0.5 font-code font-semibold text-primary transition-colors hover:bg-surface-bright"
                title="Insert into calculator"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 text-sm">
        <span className="text-outline">Select one correct alternative:</span>
        <button
          type="button"
          onClick={toggleEliminate}
          className={`flex items-center gap-1 transition-colors ${eliminated.size > 0 ? "text-primary" : "text-outline hover:text-primary"}`}
        >
          <Icon name="flaky" className="text-[16px]" />
          50/50 eliminator
        </button>
      </div>

      <div className="flex flex-col gap-space-sm">
        {question.options.map((opt) => {
          const active = selectedId === opt.id;
          const isOut = eliminated.has(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={isOut}
              onClick={() => onSelect(opt.id)}
              className={`flex w-full items-center justify-between rounded-xl p-space-md text-left transition-all ${
                isOut
                  ? "cursor-not-allowed bg-surface-container-low opacity-30 line-through"
                  : active
                    ? "bg-surface-container-high ring-1 ring-secondary"
                    : "bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <div className="flex min-w-0 items-center gap-space-md">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-code font-bold ${
                    active ? "bg-primary-container text-on-primary-container" : "bg-surface-container-highest text-on-surface-variant"
                  }`}
                >
                  {opt.id}
                </div>
                <span className={`text-base ${active ? "font-semibold text-secondary" : "font-medium text-on-surface"}`}>
                  {opt.text}
                </span>
              </div>
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                  active ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-transparent"
                }`}
              >
                <Icon name="check" className="text-[16px]" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-space-xs text-sm">
        <button
          type="button"
          onClick={onClear}
          disabled={!selectedId}
          className="flex items-center gap-1 text-outline transition-colors hover:text-error disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="backspace" className="text-[16px]" />
          Clear selection
        </button>
        <div className="flex items-center gap-1 text-tertiary">
          <Icon name="cloud_done" className="text-[16px]" />
          <span className="font-code text-[11px]">Saved locally</span>
        </div>
      </div>
    </div>
  );
}
