import { QUESTION_TYPES, type AnswerOption, type BuilderQuestion, type QuestionType } from "../../data/mockQuizBuilder";
import { Icon } from "../ui/Icon";

function nextOptionId(options: AnswerOption[]): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  for (const letter of letters) {
    if (!options.some((o) => o.id === letter)) return letter;
  }
  return `opt-${options.length}`;
}

interface QuestionEditorCardProps {
  index: number;
  question: BuilderQuestion;
  onChange: (next: BuilderQuestion) => void;
}

export function QuestionEditorCard({ index, question, onChange }: QuestionEditorCardProps) {
  const isChoiceType = question.type === "mcq" || question.type === "multi";

  const setOption = (id: string, text: string) =>
    onChange({ ...question, options: question.options.map((o) => (o.id === id ? { ...o, text } : o)) });

  const removeOption = (id: string) =>
    onChange({
      ...question,
      options: question.options.filter((o) => o.id !== id),
      correctOptionId: question.correctOptionId === id ? undefined : question.correctOptionId,
    });

  const addOption = () =>
    onChange({ ...question, options: [...question.options, { id: nextOptionId(question.options), text: "" }] });

  return (
    <section className="relative flex flex-col gap-space-md rounded-xl bg-surface-container-low p-space-md shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-space-xs pb-1">
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary-container px-2 py-0.5 font-code text-xs font-semibold text-on-primary-container">
            Q{index + 1}
          </span>
          <span className="font-headline text-lg text-on-surface">{question.typeLabel}</span>
        </div>
        <div className="flex items-center gap-space-xs">
          {question.difficulty && (
            <span className="flex items-center gap-1 rounded-full bg-secondary-container/20 px-2 py-1 text-xs text-secondary">
              <Icon name="psychology" className="text-[14px]" />
              {question.difficulty}
            </span>
          )}
          <div className="flex items-center gap-1 rounded-lg bg-surface-container-highest px-2 py-1">
            <label className="text-xs text-on-surface-variant" htmlFor="q-points">
              Pts:
            </label>
            <input
              id="q-points"
              type="number"
              value={question.points}
              onChange={(e) => onChange({ ...question, points: Number(e.target.value) || 0 })}
              className="w-8 bg-transparent text-center font-code text-sm font-bold text-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {QUESTION_TYPES.map((t) => {
          const active = t.id === question.type;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ ...question, type: t.id as QuestionType, typeLabel: shortLabel(t.id) })}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
                active ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon name={t.icon} className="text-[14px]" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-on-surface-variant" htmlFor="prompt-area">
            Question stem &amp; variables
          </label>
          <button
            type="button"
            disabled
            title="AI stem refinement isn't implemented yet"
            className="flex cursor-not-allowed items-center gap-1 text-xs text-secondary opacity-50"
          >
            <Icon name="auto_fix_high" className="text-[14px]" />
            Refine with AI
          </button>
        </div>
        <div className="overflow-hidden rounded-lg bg-surface-container-lowest transition-all focus-within:ring-2 focus-within:ring-primary">
          <div className="flex items-center justify-between gap-1 overflow-x-auto bg-surface-container-high/60 px-2.5 py-1.5">
            <div className="flex items-center gap-1">
              {["format_bold", "format_italic", "code"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  disabled
                  title="Rich text formatting isn't implemented yet — stem stays plain text"
                  className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded text-on-surface-variant opacity-40"
                >
                  <Icon name={icon} className="text-[16px]" />
                </button>
              ))}
              <button
                type="button"
                disabled
                title="Not implemented yet"
                className="flex h-7 cursor-not-allowed items-center justify-center rounded bg-primary/10 px-2 font-code text-xs text-primary-fixed opacity-40"
              >
                f(x)
              </button>
              <button
                type="button"
                disabled
                title="Not implemented yet"
                className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded text-on-surface-variant opacity-40"
              >
                <Icon name="image" className="text-[16px]" />
              </button>
            </div>
            <span className="font-code text-[11px] text-outline">Plain text for now</span>
          </div>
          <textarea
            id="prompt-area"
            rows={4}
            value={question.stem}
            onChange={(e) => onChange({ ...question, stem: e.target.value })}
            className="w-full resize-none bg-transparent p-3 text-sm leading-relaxed text-on-surface focus:outline-none"
          />
        </div>
      </div>

      {question.latexPreview && (
        <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container p-space-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs font-medium text-secondary">
              <Icon name="calculate" className="text-[14px]" />
              Interactive equation output
            </span>
          </div>
          <div className="flex items-center justify-center overflow-x-auto rounded bg-surface-container-lowest p-2.5 text-center font-code text-sm text-on-surface">
            {question.latexPreview}
          </div>
        </div>
      )}

      {question.mediaFilename && (
        <div className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-surface-container-highest text-on-surface-variant">
              <Icon name="image" className="text-[22px]" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm text-on-surface">{question.mediaFilename}</span>
              <span className="font-code text-[11px] text-outline">Diagram attached</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="cursor-not-allowed rounded bg-surface-container-high px-2.5 py-1.5 text-xs text-on-surface-variant opacity-50"
            >
              Preview
            </button>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="cursor-not-allowed rounded bg-surface-container-high px-2.5 py-1.5 text-xs text-primary opacity-50"
            >
              Replace
            </button>
          </div>
        </div>
      )}

      {isChoiceType ? (
        <div className="mt-1 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-on-surface">Answer choices &amp; distractors</span>
              <span className="font-code text-[11px] text-on-surface-variant">Tap a marker to designate the correct key</span>
            </div>
          </div>
          {question.options.map((opt) => {
            const isCorrect = opt.id === question.correctOptionId;
            return (
              <div
                key={opt.id}
                className={`flex flex-col gap-1 rounded-lg p-3 transition-colors ${
                  isCorrect
                    ? "relative overflow-hidden bg-surface-container-high shadow-[0_0_15px_-3px_rgba(78,222,163,0.3)]"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                {isCorrect && <div className="absolute inset-y-0 left-0 w-1 bg-tertiary" />}
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onChange({ ...question, correctOptionId: opt.id })}
                      title="Mark as correct"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isCorrect ? "bg-tertiary text-on-tertiary" : "bg-surface-container-highest text-outline"
                      }`}
                    >
                      {isCorrect ? "✓" : opt.id.toUpperCase()}
                    </button>
                    <input
                      value={opt.text}
                      onChange={(e) => setOption(opt.id, e.target.value)}
                      className={`flex-1 bg-transparent text-sm focus:outline-none ${isCorrect ? "font-semibold text-on-surface" : "text-on-surface"}`}
                    />
                  </div>
                  {isCorrect ? (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-tertiary/20 px-2 py-0.5 text-xs font-semibold text-tertiary">
                      <Icon name="check" className="text-[12px]" />
                      Correct key
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeOption(opt.id)}
                      className="shrink-0 text-outline transition-colors hover:text-error"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  )}
                </div>
                {opt.rationale && !isCorrect && (
                  <div className="flex items-center gap-1 pl-7 font-code text-[11px] text-on-surface-variant">
                    <Icon name="info" className="text-[12px] text-outline" />
                    {opt.rationale}
                  </div>
                )}
                {isCorrect && question.correctRationale && (
                  <div className="ml-7 flex flex-col gap-1 rounded bg-surface-container-lowest p-2">
                    <div className="flex items-center gap-1 text-[11px] text-tertiary">
                      <Icon name="psychology_alt" className="text-[12px]" />
                      AI-verified solution rationale
                    </div>
                    <p className="text-xs leading-relaxed text-on-surface-variant">{question.correctRationale}</p>
                  </div>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={addOption}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-surface-container py-2.5 text-sm text-primary transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="add_circle_outline" className="text-[18px]" />
            Add answer option
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-on-surface-variant" htmlFor="accepted-answer">
            {question.type === "numerical" ? "Accepted answer" : "Model answer / grading note"}
          </label>
          <textarea
            id="accepted-answer"
            rows={3}
            value={question.acceptedAnswer ?? ""}
            onChange={(e) => onChange({ ...question, acceptedAnswer: e.target.value })}
            className="w-full resize-none rounded-lg bg-surface-container-lowest p-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
    </section>
  );
}

function shortLabel(type: QuestionType): string {
  switch (type) {
    case "mcq":
      return "MCQ";
    case "multi":
      return "Multi-Select";
    case "numerical":
      return "Numerical";
    case "short":
      return "Short Ans";
    case "latex":
      return "LaTeX";
  }
}
