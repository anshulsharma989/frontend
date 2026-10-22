import { useEffect, useState } from "react";
import { getGrades, getSubjects, listDocuments } from "../../api";
import { AttendancePreviewCard } from "../../components/admin/AttendancePreviewCard";
import { DocumentChunkingCard } from "../../components/admin/DocumentChunkingCard";
import { EntityShortcutsCard } from "../../components/admin/EntityShortcutsCard";
import { PendingApprovalsCard } from "../../components/admin/PendingApprovalsCard";
import { WelcomeBanner } from "../../components/admin/WelcomeBanner";
import { StatCard } from "../../components/ui/StatCard";
import { MOCK_FACULTY, MOCK_STUDENTS } from "../../data/mockDirectory";
import { usePendingUsers } from "../../hooks/usePendingUsers";
import type { DocumentInfo, Grade, Subject } from "../../types";

export default function AdminDashboardPage() {
  const { pending, error, approve, reject } = usePendingUsers();
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    listDocuments().then(setDocuments).catch(() => {});
    getGrades().then(setGrades).catch(() => {});
    getSubjects().then(setSubjects).catch(() => {});
  }, []);

  const readyDocs = documents.filter((d) => d.status === "ready").length;

  return (
    <div className="flex flex-col gap-space-lg">
      <WelcomeBanner />

      <section className="grid grid-cols-2 gap-space-sm lg:grid-cols-4">
        <StatCard label="Pending signups" value={String(pending.length)} icon="person_add" tone="secondary" />
        <StatCard label="Grades" value={String(grades.length)} icon="stairs" tone="primary" />
        <StatCard label="Subjects" value={String(subjects.length)} icon="account_tree" tone="secondary" />
        <StatCard label="Documents ready" value={`${readyDocs}/${documents.length}`} icon="dataset" tone="tertiary" />
      </section>

      {error && <p className="text-sm text-error">{error}</p>}

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-3">
        <div className="flex flex-col gap-space-lg lg:col-span-2">
          <PendingApprovalsCard pending={pending} onApprove={approve} onReject={reject} />
          <DocumentChunkingCard documents={documents} />
        </div>
        <div className="flex flex-col gap-space-lg">
          <EntityShortcutsCard
            gradeCount={grades.length}
            subjectCount={subjects.length}
            facultyCount={MOCK_FACULTY.length}
            studentCount={MOCK_STUDENTS.length}
          />
          <AttendancePreviewCard />
        </div>
      </div>
    </div>
  );
}
