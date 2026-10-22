import { useNavigate } from "react-router-dom";
import { AiDiagnosticCard } from "../../components/examresults/AiDiagnosticCard";
import { EfficiencyStatsRow } from "../../components/examresults/EfficiencyStatsRow";
import { ExamSummaryBanner } from "../../components/examresults/ExamSummaryBanner";
import { QuestionAuditList } from "../../components/examresults/QuestionAuditList";
import { ScoreHeroCard } from "../../components/examresults/ScoreHeroCard";
import { SubSkillTelemetryCard } from "../../components/examresults/SubSkillTelemetryCard";
import { Icon } from "../../components/ui/Icon";

export default function StudentExamResultsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col bg-background text-on-background">
      <header className="flex shrink-0 items-center justify-between border-b border-outline-variant bg-surface px-space-lg py-space-sm">
        <button
          type="button"
          onClick={() => navigate("/student/dashboard")}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-variant/40 hover:text-on-surface"
        >
          <Icon name="arrow_back" className="text-[22px]" />
        </button>
        <h1 className="font-headline text-base font-semibold text-on-surface">Exam Results &amp; Analytics</h1>
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-xl text-secondary opacity-50"
        >
          <Icon name="share" className="text-[20px]" />
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-space-md overflow-y-auto p-space-lg">
        <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
          <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
          <span>
            This is sample analytics, not computed from the quiz you just took — there's no scoring/analytics
            backend yet (see <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>).
            "Explain with AI Tutor" below opens the real AI chat with the question's context pre-filled.
          </span>
        </div>

        <ExamSummaryBanner />
        <ScoreHeroCard />
        <SubSkillTelemetryCard />
        <EfficiencyStatsRow />
        <AiDiagnosticCard />
        <QuestionAuditList />
      </div>

      <footer className="shrink-0 border-t border-outline-variant bg-surface/90 p-space-md">
        <div className="mx-auto flex max-w-md items-center gap-space-sm">
          <button
            type="button"
            disabled
            title="Not implemented yet"
            aria-label="Download PDF report"
            className="flex h-12 w-12 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface opacity-50"
          >
            <Icon name="download" className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/student/dashboard")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary-container to-secondary text-sm font-bold text-on-primary-container shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-transform active:scale-[0.98]"
          >
            Return to Student Hub
            <Icon name="arrow_forward" className="text-[20px]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
