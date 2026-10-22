import { useMemo, useState } from "react";
import { Icon } from "../../components/ui/Icon";
import { SearchInput } from "../../components/ui/SearchInput";
import { AddUserWizardModal } from "../../components/users/AddUserWizardModal";
import { FacultyRosterCard } from "../../components/users/FacultyRosterCard";
import { MOCK_FACULTY } from "../../data/mockDirectory";

export default function AdminTeachersPage() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MOCK_FACULTY.filter((f) => !q || f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          Rows below are <strong className="text-on-surface">sample data</strong> — there's no teacher role or
          faculty directory backend yet (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>).
        </span>
      </div>

      <div className="flex items-start justify-between gap-space-sm">
        <div>
          <h1 className="font-headline text-xl font-semibold text-on-surface">Faculty Roster</h1>
          <p className="text-sm text-on-surface-variant">Manage teacher accounts, departments, and permissions.</p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-container px-space-md py-2.5 text-sm font-bold text-on-primary-container shadow-lg transition-transform active:scale-95"
        >
          <Icon name="person_add" className="text-[18px]" />
          Add teacher
        </button>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search by name or ID…" />

      <div className="flex flex-col gap-space-sm">
        {filtered.map((f) => (
          <FacultyRosterCard key={f.id} entry={f} />
        ))}
        {filtered.length === 0 && <p className="text-sm text-on-surface-variant">No matching faculty.</p>}
      </div>

      <AddUserWizardModal open={addOpen} onClose={() => setAddOpen(false)} defaultRole="faculty" />
    </div>
  );
}
