import { useState } from "react";
import { AiCoPilotCard } from "../../components/quizbuilder/AiCoPilotCard";
import { AssessmentMetaCard, type BuilderTab } from "../../components/quizbuilder/AssessmentMetaCard";
import { BuilderActionBar } from "../../components/quizbuilder/BuilderActionBar";
import { ProctoringRulesCard } from "../../components/quizbuilder/ProctoringRulesCard";
import { QuestionEditorCard } from "../../components/quizbuilder/QuestionEditorCard";
import { QuestionNavStrip } from "../../components/quizbuilder/QuestionNavStrip";
import { QuizBuilderHeader } from "../../components/quizbuilder/QuizBuilderHeader";
import { Icon } from "../../components/ui/Icon";
import { INITIAL_QUESTIONS, type BuilderQuestion } from "../../data/mockQuizBuilder";

function RubricTab() {
  return (
    <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
      <h2 className="font-headline text-base font-semibold text-on-surface">Grading rubric</h2>
      <p className="text-sm text-on-surface-variant">
        Not built out yet — a rubric editor (per-question weighting, partial-credit rules, tiered descriptors) needs a
        structured quiz model on the backend first. See <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
      </p>
    </section>
  );
}

function ScheduleTab() {
  return (
    <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
      <h2 className="font-headline text-base font-semibold text-on-surface">Schedule &amp; launch</h2>
      <p className="text-sm text-on-surface-variant">
        Not built out yet — scheduling (launch window, per-section availability, auto-close) needs quiz persistence
        on the backend first. See <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
      </p>
    </section>
  );
}

export default function QuizBuilderPage() {
  const [title, setTitle] = useState("Wave Mechanics & Harmonic Oscillations - Midterm");
  const [questions, setQuestions] = useState<BuilderQuestion[]>(INITIAL_QUESTIONS);
  const [activeId, setActiveId] = useState(questions[0].id);
  const [tab, setTab] = useState<BuilderTab>("questions");

  const activeIndex = questions.findIndex((q) => q.id === activeId);
  const activeQuestion = questions[activeIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const updateQuestion = (next: BuilderQuestion) =>
    setQuestions((qs) => qs.map((q) => (q.id === next.id ? next : q)));

  const addQuestion = () => {
    const id = `q${questions.length + 1}-${Date.now()}`;
    const fresh: BuilderQuestion = {
      id,
      type: "mcq",
      typeLabel: "MCQ",
      points: 1,
      stem: "",
      options: [
        { id: "a", text: "" },
        { id: "b", text: "" },
      ],
    };
    setQuestions((qs) => [...qs, fresh]);
    setActiveId(id);
  };

  const saveAndNext = () => {
    const next = questions[activeIndex + 1];
    if (next) setActiveId(next.id);
  };

  return (
    <div className="flex h-screen flex-col bg-background text-on-background">
      <QuizBuilderHeader />
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-space-lg overflow-y-auto p-space-lg">
        <AssessmentMetaCard
          title={title}
          onTitleChange={setTitle}
          questionCount={questions.length}
          totalPoints={totalPoints}
          activeTab={tab}
          onTabChange={setTab}
        />

        {tab === "questions" && (
          <>
            <section className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Authoring studio
                </span>
                <span className="font-code text-xs text-secondary">Local preview</span>
              </div>
              <div className="grid grid-cols-2 gap-space-xs">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex min-h-[48px] items-center justify-center gap-space-xs rounded-lg bg-primary-container px-space-sm text-sm font-medium text-on-primary-container shadow-[0_0_15px_-2px_rgba(160,120,255,0.4)] transition-transform active:scale-[0.98]"
                >
                  <Icon name="add_circle" className="text-[20px]" />
                  Add question
                </button>
                <button
                  type="button"
                  disabled
                  title="AI stem generation isn't implemented yet"
                  className="flex min-h-[48px] cursor-not-allowed items-center justify-center gap-space-xs rounded-lg bg-gradient-to-r from-secondary-container via-secondary to-secondary-fixed-dim px-space-sm text-sm font-medium text-on-secondary opacity-60"
                >
                  <Icon name="auto_awesome" className="text-[18px]" />
                  AI stem generator
                </button>
                <button
                  type="button"
                  disabled
                  title="Not implemented yet"
                  className="flex min-h-[44px] cursor-not-allowed items-center justify-center gap-space-xs rounded-lg bg-surface-container-high px-space-sm text-sm text-on-surface opacity-50"
                >
                  <Icon name="source" className="text-[18px] text-on-surface-variant" />
                  Item bank
                </button>
                <button
                  type="button"
                  disabled
                  title="Not implemented yet"
                  className="flex min-h-[44px] cursor-not-allowed items-center justify-center gap-space-xs rounded-lg bg-surface-container-high px-space-sm text-sm text-on-surface opacity-50"
                >
                  <Icon name="shuffle" className="text-[18px] text-on-surface-variant" />
                  Shuffle pool
                </button>
              </div>
            </section>

            <QuestionNavStrip questions={questions} activeId={activeId} onSelect={setActiveId} onAdd={addQuestion} />

            {activeQuestion && (
              <QuestionEditorCard index={activeIndex} question={activeQuestion} onChange={updateQuestion} />
            )}

            <AiCoPilotCard />
          </>
        )}

        {tab === "rubric" && <RubricTab />}
        {tab === "rules" && <ProctoringRulesCard />}
        {tab === "schedule" && <ScheduleTab />}

        <BuilderActionBar activeIndex={activeIndex} totalQuestions={questions.length} onSaveAndNext={saveAndNext} />
      </div>
    </div>
  );
}
