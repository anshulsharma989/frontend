import { useMemo, useState } from "react";
import { useAuth } from "../../auth";
import { AttendanceOverviewCard } from "../../components/teacher/AttendanceOverviewCard";
import { ClassSessionBanner } from "../../components/teacher/ClassSessionBanner";
import { RollCallRosterList } from "../../components/teacher/RollCallRosterList";
import { Card } from "../../components/ui/Card";
import { FilterChips } from "../../components/ui/FilterChips";
import { Icon } from "../../components/ui/Icon";
import { SearchInput } from "../../components/ui/SearchInput";
import { ROLL_CALL_ROSTER, type RollCallEntry, type RollCallStatus } from "../../data/mockRollCall";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "attention", label: "Late & absent", tone: "error" as const },
];

export default function TeacherAttendancePage() {
  const { user } = useAuth();
  const [roster, setRoster] = useState<RollCallEntry[]>(ROLL_CALL_ROSTER);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [submitted, setSubmitted] = useState(false);

  const setStatus = (id: string, status: RollCallStatus) =>
    setRoster((r) => r.map((entry) => (entry.id === id ? { ...entry, status } : entry)));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return roster.filter((entry) => {
      const matchesSearch = !q || entry.name.toLowerCase().includes(q) || entry.id.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || entry.status === "L" || entry.status === "A";
      return matchesSearch && matchesFilter;
    });
  }, [roster, search, filter]);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          There's no attendance backend yet (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). Roster
          and session details are sample data; P/L/A/E toggles are interactive locally but don't persist.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-3">
        <div className="flex flex-col gap-space-md lg:col-span-2">
          <ClassSessionBanner />

          <div className="flex flex-col gap-space-xs">
            <SearchInput value={search} onChange={setSearch} placeholder="Search roster or #SC-ID…" />
            <FilterChips chips={FILTERS} activeId={filter} onChange={setFilter} />
          </div>

          <RollCallRosterList roster={filtered} onStatusChange={setStatus} />
        </div>

        <div className="flex flex-col gap-space-md lg:sticky lg:top-space-lg lg:self-start">
          <AttendanceOverviewCard roster={roster} />

          <Card className="flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <Icon name="history_edu" className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-on-surface">Instructor signature</span>
                <span className="font-code text-xs text-outline">{user?.full_name ?? "—"}</span>
              </div>
            </div>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="cursor-not-allowed rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface opacity-50"
            >
              Add note
            </button>
          </Card>

          <Card className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-on-surface">
                <Icon name="check_circle" className="text-[18px] text-tertiary" />
                All {roster.length} students marked
              </span>
              <button
                type="button"
                disabled
                title="Not implemented yet"
                className="flex cursor-not-allowed items-center gap-1 text-xs text-on-surface-variant opacity-50"
              >
                <Icon name="picture_as_pdf" className="text-[16px]" />
                Export PDF
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary py-3 text-on-primary shadow-lg transition-transform active:scale-[0.99]"
            >
              <span className="flex items-center gap-1.5 font-headline text-sm font-semibold">
                Submit &amp; sync roll-call
                <Icon name="arrow_forward" className="text-[18px]" />
              </span>
              <span className="font-code text-[10px] tracking-wide opacity-80">Syncs to SIS, parent portal &amp; ledger</span>
            </button>
            {submitted && (
              <p className="text-xs text-on-surface-variant">
                This is a UI preview — there's no attendance backend yet, so nothing was actually synced.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
