import type { RollCallEntry, RollCallStatus } from "../../data/mockRollCall";
import { Icon } from "../ui/Icon";
import { StatusSwitcher, type StatusOption } from "../ui/StatusSwitcher";

const STATUS_OPTIONS: StatusOption[] = [
  { id: "P", label: "P", icon: "check", activeClassName: "bg-tertiary text-on-tertiary shadow-sm" },
  { id: "L", label: "L", icon: "schedule", activeClassName: "bg-secondary-container text-on-secondary-container shadow-sm" },
  { id: "A", label: "A", icon: "close", activeClassName: "bg-error text-on-error shadow-sm" },
  { id: "E", label: "E", icon: "verified", activeClassName: "bg-secondary text-on-secondary shadow-sm" },
];

const CHECKIN_TONE_TEXT: Record<RollCallEntry["checkinTone"], string> = {
  tertiary: "text-tertiary",
  "secondary-container": "text-secondary-container",
  error: "text-error",
  secondary: "text-secondary",
};

const BADGE_TONE: Record<"tertiary" | "secondary" | "error", string> = {
  tertiary: "bg-tertiary/15 text-tertiary",
  secondary: "bg-secondary/15 text-secondary",
  error: "bg-error-container text-on-error-container",
};

const DOT_TONE: Record<RollCallStatus, string> = {
  P: "bg-tertiary",
  L: "bg-secondary-container",
  A: "bg-error",
  E: "bg-secondary",
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function RollCallRow({ entry, onStatusChange }: { entry: RollCallEntry; onStatusChange: (status: RollCallStatus) => void }) {
  return (
    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container p-space-md shadow-md transition-colors hover:bg-surface-container-high">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex min-w-0 items-center gap-space-sm">
          <div className="relative shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest font-headline text-sm font-bold text-on-surface">
              {initials(entry.name)}
            </div>
            <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full ring-2 ring-surface-container ${DOT_TONE[entry.status]}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-headline text-base text-on-surface">{entry.name}</span>
              <span className="rounded bg-surface-container-lowest px-1.5 py-0.5 font-code text-xs text-outline">{entry.id}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-space-xs text-xs">
              <span className="text-on-surface-variant">{entry.seat}</span>
              <span className="text-outline">·</span>
              <span className={`font-code ${CHECKIN_TONE_TEXT[entry.checkinTone]}`}>{entry.checkinNote}</span>
            </div>
          </div>
        </div>
        {entry.badge && (
          <span
            className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_TONE[entry.badge.tone]}`}
          >
            {entry.badge.icon && <Icon name={entry.badge.icon} className="text-[14px]" />}
            {entry.badge.label}
          </span>
        )}
      </div>

      {entry.infoPanel && (
        <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-2 text-xs">
          <div className="flex min-w-0 items-center gap-1.5 text-on-surface-variant">
            <Icon name={entry.infoPanel.icon} className="text-[16px] text-secondary" />
            <span className="truncate">{entry.infoPanel.text}</span>
          </div>
          {entry.infoPanel.trailing && <span className="shrink-0 font-medium text-primary">{entry.infoPanel.trailing}</span>}
        </div>
      )}

      {entry.alert && (
        <div className="flex flex-col gap-1 rounded-lg bg-surface-container-lowest p-space-sm">
          <div className="flex items-center gap-space-xs text-xs font-semibold text-error">
            <Icon name="warning" className="text-[16px]" />
            {entry.alert.message}
          </div>
          <div className="mt-1 flex items-center gap-space-sm">
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex cursor-not-allowed items-center gap-1 rounded bg-surface-container-high px-2 py-1 text-xs text-primary opacity-60"
            >
              <Icon name="add_notes" className="text-[14px]" />
              Add excuse / note
            </button>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex cursor-not-allowed items-center gap-1 rounded bg-surface-container-high px-2 py-1 text-xs text-on-surface-variant opacity-60"
            >
              <Icon name="call" className="text-[14px]" />
              Call office
            </button>
          </div>
        </div>
      )}

      <StatusSwitcher options={STATUS_OPTIONS} value={entry.status} onChange={(id) => onStatusChange(id as RollCallStatus)} />
    </div>
  );
}

interface RollCallRosterListProps {
  roster: RollCallEntry[];
  onStatusChange: (id: string, status: RollCallStatus) => void;
}

export function RollCallRosterList({ roster, onStatusChange }: RollCallRosterListProps) {
  return (
    <div className="flex flex-col gap-space-sm">
      {roster.map((entry) => (
        <RollCallRow key={entry.id} entry={entry} onStatusChange={(status) => onStatusChange(entry.id, status)} />
      ))}
      {roster.length === 0 && <p className="text-sm text-on-surface-variant">No students match this filter.</p>}
    </div>
  );
}
