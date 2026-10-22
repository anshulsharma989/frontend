import { useState } from "react";
import { GradebookOverviewCard } from "../../components/gradebook/GradebookOverviewCard";
import { KnowledgeGapCard } from "../../components/gradebook/KnowledgeGapCard";
import { QuizHistoryList } from "../../components/gradebook/QuizHistoryList";
import { QuizTrajectoryCard } from "../../components/gradebook/QuizTrajectoryCard";
import { ReportExportCard } from "../../components/gradebook/ReportExportCard";
import { SubjectTabs } from "../../components/gradebook/SubjectTabs";
import { Icon } from "../../components/ui/Icon";
import { GRADEBOOK_SUBJECTS } from "../../data/mockGradebook";

export default function StudentGradebookPage() {
  const [subjectId, setSubjectId] = useState(GRADEBOOK_SUBJECTS[0].id);
  const subject = GRADEBOOK_SUBJECTS.find((s) => s.id === subjectId) ?? GRADEBOOK_SUBJECTS[0];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-space-lg">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          GPA, quiz history, rank, and mastery breakdowns are all sample data — grading and analytics need quiz
          persistence on the backend first (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). Your
          name and grade above are real. Switching subjects and sorting marks both genuinely work.
        </span>
      </div>

      <GradebookOverviewCard subject={subject} />
      <SubjectTabs subjects={GRADEBOOK_SUBJECTS} activeId={subjectId} onChange={setSubjectId} />
      <QuizTrajectoryCard subject={subject} />
      <QuizHistoryList subject={subject} />
      <KnowledgeGapCard subject={subject} />
      <ReportExportCard />
    </div>
  );
}
