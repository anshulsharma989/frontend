import { useMemo, useState } from "react";
import { PendingApprovalsCard } from "../../components/admin/PendingApprovalsCard";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { FilterChips } from "../../components/ui/FilterChips";
import { Icon } from "../../components/ui/Icon";
import { Pagination } from "../../components/ui/Pagination";
import { SearchInput } from "../../components/ui/SearchInput";
import { SegmentedTabs } from "../../components/ui/SegmentedTabs";
import { AddUserWizardModal } from "../../components/users/AddUserWizardModal";
import { StudentRosterCard } from "../../components/users/StudentRosterCard";
import { MOCK_STUDENTS } from "../../data/mockDirectory";
import { usePendingUsers } from "../../hooks/usePendingUsers";

const GRADE_FILTERS = [
  { id: "all", label: "All grades" },
  { id: "11-a", label: "Grade 11-A" },
  { id: "11-b", label: "Grade 11-B" },
  { id: "12-a", label: "Grade 12-A" },
];

type Tab = "roster" | "pending";

export default function AdminStudentsPage() {
  const { pending, error, approve, reject } = usePendingUsers();
  const [tab, setTab] = useState<Tab>("roster");
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_STUDENTS.filter((s) => {
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
      const matchesGrade = gradeFilter === "all" || s.gradeSection.toLowerCase().includes(`grade ${gradeFilter}`);
      return matchesSearch && matchesGrade;
    });
  }, [search, gradeFilter]);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          Roster rows below are <strong className="text-on-surface">sample data</strong> — there's no student
          directory/GPA/attendance backend yet (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). The
          Pending tab is real.
        </span>
      </div>

      <div className="flex items-start justify-between gap-space-sm">
        <div>
          <h1 className="font-headline text-xl font-semibold text-on-surface">Student Directory</h1>
          <p className="text-sm text-on-surface-variant">Manage student credentials, statuses, and academic profiles.</p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-container px-space-md py-2.5 text-sm font-bold text-on-primary-container shadow-lg transition-transform active:scale-95"
        >
          <Icon name="person_add" className="text-[18px]" />
          Add student
        </button>
      </div>

      <SegmentedTabs
        tabs={[
          { id: "roster", label: "Roster", count: MOCK_STUDENTS.length, tone: "primary" },
          { id: "pending", label: "Pending", count: pending.length, tone: "error" },
        ]}
        activeId={tab}
        onChange={(id) => setTab(id as Tab)}
      />

      {error && <p className="text-sm text-error">{error}</p>}

      {tab === "roster" && (
        <>
          <div className="flex flex-col gap-space-xs">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by name or ID…" />
            <FilterChips chips={GRADE_FILTERS} activeId={gradeFilter} onChange={setGradeFilter} />
          </div>
          <div className="flex flex-col gap-space-sm">
            {filteredStudents.map((s) => (
              <StudentRosterCard
                key={s.id}
                entry={s}
                onEdit={() => setAddOpen(true)}
                onDelete={() => setDeleteTarget({ id: s.id, name: s.name })}
              />
            ))}
            {filteredStudents.length === 0 && <p className="text-sm text-on-surface-variant">No matching students.</p>}
            <Pagination page={1} totalPages={1} onPrev={() => {}} onNext={() => {}} />
          </div>
        </>
      )}

      {tab === "pending" && (
        <PendingApprovalsCard pending={pending} onApprove={approve} onReject={reject} hideDirectoryLink />
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Revoke credentials?"
        description={
          <>
            Are you sure you want to revoke credentials and delete the record for{" "}
            <span className="font-semibold text-on-surface">{deleteTarget?.name}</span> (
            <span className="font-code text-secondary">{deleteTarget?.id}</span>)? This is a UI preview — deleting
            isn't wired to a backend yet.
          </>
        }
        warning="This action will archive exam logs and permanently disable RFID badges."
        confirmLabel="Confirm delete"
        onConfirm={() => setDeleteTarget(null)}
        onCancel={() => setDeleteTarget(null)}
      />

      <AddUserWizardModal open={addOpen} onClose={() => setAddOpen(false)} defaultRole="student" />
    </div>
  );
}
