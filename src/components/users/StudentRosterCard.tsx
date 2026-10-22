import type { StudentRosterEntry } from "../../data/mockDirectory";
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

interface StudentRosterCardProps {
  entry: StudentRosterEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export function StudentRosterCard({ entry, onEdit, onDelete }: StudentRosterCardProps) {
  const flagged = Boolean(entry.alert);

  return (
    <div className="flex flex-col rounded-2xl bg-surface-container p-space-md shadow-md transition-colors hover:bg-surface-container-high">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex min-w-0 items-center gap-space-sm">
          <div className="relative shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-highest font-headline text-sm font-bold text-primary">
              {initials(entry.name)}
            </div>
            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full shadow-sm ${flagged ? "bg-error" : "bg-tertiary"}`}
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="truncate font-headline text-base text-on-surface">{entry.name}</h3>
              <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-code text-xs text-secondary">
                {entry.id}
              </span>
            </div>
            {flagged ? (
              <p className="flex items-center gap-1 truncate text-sm font-medium text-error">
                <Icon name="notification_important" className="text-[14px]" />
                {entry.alert}
              </p>
            ) : (
              <p className="truncate text-sm text-on-surface-variant">{entry.gradeSection}</p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            title="Edit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant transition-colors hover:text-primary"
          >
            <Icon name="edit" className="text-[18px]" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Revoke & delete"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant transition-colors hover:text-error"
          >
            <Icon name="delete" className="text-[18px]" />
          </button>
        </div>
      </div>

      {flagged ? (
        <div className="mt-space-sm flex items-center justify-between rounded-xl bg-error-container/20 p-2.5">
          <div className="flex flex-col">
            <span className="text-sm text-on-surface-variant">{entry.absenceStreak}</span>
            <span className="font-code text-sm font-bold text-error">Attendance: {entry.attendancePct}</span>
          </div>
          <button
            type="button"
            className="flex min-h-[36px] items-center gap-1 rounded-lg bg-surface-container-highest px-space-sm text-sm font-semibold text-primary transition-transform active:scale-95"
          >
            <Icon name="contact_phone" className="text-[14px]" />
            Contact parent
          </button>
        </div>
      ) : (
        <div className="mt-space-sm grid grid-cols-2 gap-space-xs">
          <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-2">
            <span className="text-sm text-on-surface-variant">Weighted GPA</span>
            <span className="font-code text-sm font-bold text-tertiary">{entry.gpa}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-2">
            <span className="text-sm text-on-surface-variant">Attendance</span>
            <span className="font-code text-sm font-bold text-on-surface">{entry.attendancePct}</span>
          </div>
        </div>
      )}
    </div>
  );
}
