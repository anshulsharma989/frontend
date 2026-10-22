import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalculatorPanel } from "../../components/quizsession/CalculatorPanel";
import { FormulaSheetPanel } from "../../components/quizsession/FormulaSheetPanel";
import { QuestionCard } from "../../components/quizsession/QuestionCard";
import { QuestionPalette } from "../../components/quizsession/QuestionPalette";
import { QuizSessionHeader } from "../../components/quizsession/QuizSessionHeader";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Icon } from "../../components/ui/Icon";
import { SESSION_META, SESSION_QUESTIONS } from "../../data/mockQuizSession";

type ToolTab = "calculator" | "formula";

export default function QuizSessionPage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(SESSION_QUESTIONS[0].id);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [paletteFilter, setPaletteFilter] = useState("all");
  const [toolTab, setToolTab] = useState<ToolTab>("calculator");
  const [pendingInsert, setPendingInsert] = useState<{ value: string; nonce: number } | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeQuestion = useMemo(() => SESSION_QUESTIONS.find((q) => q.id === activeId)!, [activeId]);
  const activeIndex = SESSION_QUESTIONS.findIndex((q) => q.id === activeId);
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = SESSION_QUESTIONS.length - answeredCount;

  const goTo = (id: number) => setActiveId(id);
  const goPrev = () => {
    const prev = SESSION_QUESTIONS[activeIndex - 1];
    if (prev) setActiveId(prev.id);
  };
  const goNext = () => {
    const next = SESSION_QUESTIONS[activeIndex + 1];
    if (next) setActiveId(next.id);
  };

  const selectOption = (optionId: string) => setAnswers((a) => ({ ...a, [activeId]: optionId }));
  const clearOption = () =>
    setAnswers((a) => {
      const next = { ...a };
      delete next[activeId];
      return next;
    });
  const toggleFlag = () =>
    setFlagged((f) => {
      const next = new Set(f);
      if (next.has(activeId)) next.delete(activeId);
      else next.add(activeId);
      return next;
    });

  const confirmSubmit = () => {
    setSubmitOpen(false);
    setSubmitted(true);
    setTimeout(() => navigate("/student/quiz/results"), 1800);
  };

  return (
    <div className="flex h-screen flex-col bg-background text-on-background">
      <QuizSessionHeader
        courseCode={SESSION_META.courseCode}
        title={SESSION_META.title}
        durationSeconds={SESSION_META.durationSeconds}
        solvedCount={answeredCount}
        totalCount={SESSION_QUESTIONS.length}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-space-md overflow-y-auto p-space-lg">
          <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
            <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
            <span>
              There's no quiz-attempt backend yet — timing, flags, and answers live only in this browser tab (see{" "}
              <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). The
              calculator is fully real; proctoring badges are preview only.
            </span>
          </div>

          <QuestionPalette
            questions={SESSION_QUESTIONS}
            answers={answers}
            flagged={flagged}
            activeId={activeId}
            onSelect={goTo}
            filter={paletteFilter}
            onFilterChange={setPaletteFilter}
          />

          <QuestionCard
            question={activeQuestion}
            selectedId={answers[activeId] ?? null}
            flagged={flagged.has(activeId)}
            onSelect={selectOption}
            onClear={clearOption}
            onToggleFlag={toggleFlag}
            onSendNumberToCalc={(value) => {
              setToolTab("calculator");
              setPendingInsert({ value, nonce: Date.now() });
            }}
          />

          <div className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-space-sm">
            <div className="flex items-center gap-space-xs text-outline">
              <Icon name="security" className="text-[16px] text-primary" />
              <span className="text-xs">Full-screen lock &amp; webcam checks are preview-only — nothing is enforced</span>
            </div>
            <button
              type="button"
              onClick={() => setSubmitOpen(true)}
              className="text-sm font-semibold text-error transition-colors hover:underline"
            >
              Submit exam
            </button>
          </div>
        </div>

        <aside className="hidden w-[380px] shrink-0 flex-col gap-space-md overflow-y-auto border-l border-outline-variant bg-surface-dim p-space-lg lg:flex">
          <div className="flex items-center gap-1 rounded-lg bg-surface-container-lowest p-1">
            <button
              type="button"
              onClick={() => setToolTab("calculator")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
                toolTab === "calculator" ? "bg-surface-container-high text-primary shadow-sm" : "text-on-surface-variant"
              }`}
            >
              Calculator
            </button>
            <button
              type="button"
              onClick={() => setToolTab("formula")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
                toolTab === "formula" ? "bg-surface-container-high text-primary shadow-sm" : "text-on-surface-variant"
              }`}
            >
              Formula sheet
            </button>
          </div>
          {toolTab === "calculator" ? <CalculatorPanel pendingInsert={pendingInsert} /> : <FormulaSheetPanel />}
        </aside>
      </div>

      <footer className="flex h-20 shrink-0 items-center justify-between gap-space-sm border-t border-outline-variant bg-surface-dim px-space-lg">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="flex h-12 items-center gap-space-xs rounded-xl bg-surface-container-high px-space-md text-sm font-medium text-on-surface transition-colors hover:bg-surface-variant disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="arrow_back" className="text-[18px]" />
          Prev
        </button>
        <span className="text-sm font-medium text-on-surface-variant">
          {activeIndex + 1} of {SESSION_QUESTIONS.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === SESSION_QUESTIONS.length - 1}
          className="flex h-12 items-center gap-space-xs rounded-xl bg-gradient-to-r from-primary-container to-secondary-container px-space-md text-sm font-semibold text-on-primary-container shadow-[0_0_15px_rgba(160,120,255,0.3)] transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </footer>

      <ConfirmDialog
        open={submitOpen}
        title={`Submit ${SESSION_META.title}?`}
        description={
          <>
            You have answered <span className="font-bold text-tertiary">{answeredCount}</span> of{" "}
            {SESSION_QUESTIONS.length} questions. There are <span className="font-bold text-error">{flagged.size}</span>{" "}
            flagged and <span className="font-bold text-outline">{unansweredCount}</span> unanswered questions
            remaining. This is a UI preview — nothing is actually graded or stored.
          </>
        }
        confirmLabel="Confirm submit"
        onConfirm={confirmSubmit}
        onCancel={() => setSubmitOpen(false)}
      />

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-space-md backdrop-blur-sm">
          <div className="flex flex-col items-center gap-space-sm rounded-2xl bg-surface-container-high p-space-lg text-center shadow-2xl">
            <Icon name="check_circle" className="text-4xl text-tertiary" />
            <h3 className="font-headline text-lg font-semibold text-on-surface">Exam submitted</h3>
            <p className="max-w-xs text-sm text-on-surface-variant">
              This was a local preview — nothing was graded or saved. Taking you to sample results…
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
