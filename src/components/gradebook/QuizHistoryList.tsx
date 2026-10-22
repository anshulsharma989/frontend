import { useMemo, useState } from "react";
import type { QuizRecord, SubjectGradebook } from "../../data/mockGradebook";
import { Icon } from "../ui/Icon";

function QuizCard({ quiz }: { quiz: QuizRecord }) {
  if (quiz.detailed) {
    return (
      <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl bg-surface-container p-space-md transition-all hover:bg-surface-container-high">
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-tertiary" />
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{quiz.label}</span>
            <h3 className="mt-1 truncate font-headline text-base text-on-surface">{quiz.title}</h3>
            <p className="mt-0.5 text-xs text-outline">{quiz.date}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-xl font-bold text-on-surface">{quiz.score}</span>
              <span className="text-xs text-outline">/{quiz.maxScore}</span>
            </div>
            <span className="rounded bg-tertiary/10 px-2 py-0.5 text-xs font-bold text-tertiary">Grade {quiz.grade}</span>
          </div>
        </div>

        {quiz.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {quiz.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-surface-container-high px-2.5 py-1 font-code text-xs text-on-surface">
                {tag}
              </span>
            ))}
          </div>
        )}

        {quiz.subtopics && (
          <div className="mt-1 flex flex-col gap-2 rounded-lg bg-surface-container-lowest/70 p-3">
            <span className="text-xs font-semibold text-on-surface-variant">Sub-Topic Mastery Breakdown</span>
            {quiz.subtopics.map((t) => (
              <div key={t.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface">{t.label}</span>
                  <span className="font-code text-xs font-bold text-secondary">
                    {t.pct}% ({t.fraction})
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div className="h-full rounded-full bg-secondary" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            disabled
            title="Detailed question breakdown isn't built yet"
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-surface-container-high px-3 py-2.5 text-sm text-on-surface opacity-60"
          >
            Question breakdown
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
          <button
            type="button"
            disabled
            title="Targeted retake generation isn't implemented yet"
            className="flex cursor-not-allowed items-center justify-center gap-1 rounded-lg bg-primary/10 px-3 py-2.5 text-sm text-primary opacity-60"
          >
            <Icon name="psychology" className="text-[18px]" />
            Retake weak topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-surface-container p-space-md transition-colors hover:bg-surface-container-high">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-outline">{quiz.label}</span>
          <h3 className="mt-0.5 font-headline text-base text-on-surface">{quiz.title}</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-base font-bold text-on-surface">{quiz.score}</span>
            <span className="text-xs text-outline">/{quiz.maxScore}</span>
          </div>
          <span className="rounded bg-secondary/10 px-1.5 py-0.5 text-xs font-bold text-secondary">{quiz.grade}</span>
        </div>
      </div>
      {quiz.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {quiz.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-container-high px-2 py-0.5 font-code text-xs text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function QuizHistoryList({ subject }: { subject: SubjectGradebook }) {
  const [sortDesc, setSortDesc] = useState(true);

  const sorted = useMemo(
    () => [...subject.quizHistory].sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score)),
    [subject, sortDesc],
  );

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="history_edu" className="text-[22px] text-primary" />
          <h2 className="font-headline text-lg font-semibold text-on-surface">Previous Quiz Marks</h2>
        </div>
        <button
          type="button"
          onClick={() => setSortDesc((v) => !v)}
          className="flex items-center gap-0.5 text-sm font-medium text-primary hover:underline"
        >
          Sort by marks ({sortDesc ? "high → low" : "low → high"})
          <Icon name="swap_vert" className="text-[16px]" />
        </button>
      </div>
      <div className="flex flex-col gap-space-sm">
        {sorted.map((q) => (
          <QuizCard key={q.id} quiz={q} />
        ))}
      </div>
    </section>
  );
}
