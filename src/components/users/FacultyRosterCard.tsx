import type { FacultyRosterEntry } from "../../data/mockDirectory";
import { Icon } from "../ui/Icon";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function FacultyRosterCard({ entry }: { entry: FacultyRosterEntry }) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface-container p-space-md shadow-md">
      <div className="mb-2 flex items-center justify-between pb-2">
        <span className="flex items-center gap-1 font-label text-xs font-semibold uppercase tracking-wider text-secondary">
          <Icon name="military_tech" className="text-[14px]" />
          Faculty
        </span>
        <span className="rounded-full bg-tertiary-container/30 px-2 py-0.5 font-code text-xs text-tertiary">
          {entry.status}
        </span>
      </div>
      <div className="flex items-center gap-space-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-headline text-sm font-bold text-secondary">
          {initials(entry.name)}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="truncate font-headline text-base text-on-surface">{entry.name}</h3>
            <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-code text-xs text-secondary">
              {entry.id}
            </span>
          </div>
          <p className="truncate text-sm text-on-surface-variant">{entry.title}</p>
        </div>
      </div>
      <div className="mt-space-sm flex items-center justify-between gap-space-xs">
        <div className="flex items-center gap-1.5 text-on-surface-variant">
          <Icon name="menu_book" className="text-[16px] text-secondary" />
          <span className="text-sm">{entry.sectionsSummary}</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            className="flex min-h-[36px] items-center gap-1 rounded-lg bg-surface-container-high px-2.5 text-sm text-on-surface hover:text-primary"
          >
            <Icon name="shield" className="text-[14px]" />
            Perms
          </button>
          <button
            type="button"
            className="flex min-h-[36px] items-center gap-1 rounded-lg bg-surface-container-high px-2.5 text-sm text-on-surface hover:text-primary"
          >
            <Icon name="edit" className="text-[14px]" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
