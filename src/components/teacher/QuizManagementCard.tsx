import { Link } from "react-router-dom";
import { MOCK_QUIZZES, type MockQuiz, type QuizStatus } from "../../data/mockTeacherDashboard";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

const STATUS_TONE: Record<QuizStatus, "tertiary" | "neutral" | "secondary"> = {
  published: "tertiary",
  draft: "neutral",
  scheduled: "secondary",
};

function QuizRow({ quiz }: { quiz: MockQuiz }) {
  return (
    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
      <div className="flex items-start justify-between gap-space-xs">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone={STATUS_TONE[quiz.status]}>{quiz.status}</Badge>
            <span className="text-xs text-on-surface-variant">{quiz.meta}</span>
          </div>
          <h4 className="mt-1 truncate font-headline text-base text-on-surface">{quiz.title}</h4>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled
            title="Not implemented yet"
            className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg bg-surface-container text-on-surface-variant opacity-50"
          >
            <Icon name="content_copy" className="text-[16px]" />
          </button>
          <Link
            to="/teacher/quizzes"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <Icon name="edit" className="text-[16px]" />
          </Link>
        </div>
      </div>

      {quiz.progressPct !== undefined && (
        <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container-lowest/60 p-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">{quiz.submissions}</span>
            <span className="font-bold text-secondary">{quiz.avgScore}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary to-tertiary"
              style={{ width: `${quiz.progressPct}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className="font-code text-xs text-on-surface-variant">{quiz.dueOrSchedule}</span>
        {quiz.status === "published" && (
          <button
            type="button"
            disabled
            title="Not implemented yet"
            className="flex min-h-[36px] cursor-not-allowed items-center gap-1 rounded-lg bg-secondary-container/20 px-3 text-sm font-medium text-secondary opacity-60"
          >
            <Icon name="insights" className="text-[16px]" />
            Grade submissions
          </button>
        )}
        {quiz.status === "draft" && (
          <div className="flex items-center gap-2">
            <Link
              to="/teacher/quizzes"
              className="flex min-h-[36px] items-center gap-1 rounded-lg bg-surface-container-high px-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-bright"
            >
              <Icon name="edit_note" className="text-[16px]" />
              Edit draft
            </Link>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex min-h-[36px] cursor-not-allowed items-center gap-1 rounded-lg bg-primary-container px-3 text-sm font-medium text-on-primary opacity-60"
            >
              <Icon name="publish" className="text-[16px]" />
              Publish now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function QuizManagementCard() {
  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="auto_stories"
        title="AI Quiz Master & CRUD"
        trailing={<span className="text-xs text-on-surface-variant">Sample data</span>}
      />

      <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
        <div className="flex items-center justify-between gap-space-sm">
          <div>
            <h3 className="font-headline text-base font-semibold text-on-surface">Curate or generate assessment</h3>
            <p className="text-sm text-on-surface-variant">Synthesize questions from PDF curriculum or topic prompts.</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="psychology" className="text-[22px]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/teacher/quizzes"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-container px-3 py-2.5 text-sm font-semibold text-on-primary shadow-md transition-transform active:scale-95"
          >
            <Icon name="add_circle" className="text-[18px]" />
            Create new quiz
          </Link>
          <button
            type="button"
            disabled
            title="Not implemented yet"
            className="flex min-h-[44px] cursor-not-allowed items-center gap-1 rounded-lg bg-surface-container-lowest px-3.5 text-sm font-medium text-secondary opacity-60"
          >
            <Icon name="upload_file" className="text-[18px]" />
            Import
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {MOCK_QUIZZES.map((q) => (
          <QuizRow key={q.id} quiz={q} />
        ))}
      </div>
    </Card>
  );
}
