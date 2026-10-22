import { useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../types";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface PendingApprovalsCardProps {
  pending: User[];
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  /** Hide the "View full directory" link when already rendered inside the directory page. */
  hideDirectoryLink?: boolean;
}

export function PendingApprovalsCard({ pending, onApprove, onReject, hideDirectoryLink }: PendingApprovalsCardProps) {
  const [busyId, setBusyId] = useState<number | null>(null);

  const handle = async (fn: (id: number) => Promise<void>, id: number) => {
    setBusyId(id);
    try {
      await fn(id);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="person_add"
        title="Enrollment & Access"
        tone="secondary"
        trailing={
          <span className="rounded-full bg-primary-container/20 px-2 py-0.5 text-xs font-semibold text-primary">
            {pending.length} pending
          </span>
        }
      />
      {pending.length === 0 && <p className="text-sm text-on-surface-variant">No pending signups — you're all caught up.</p>}
      <div className="flex flex-col gap-2">
        {pending.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container p-3"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-highest font-headline text-sm font-bold text-primary">
                {initials(u.full_name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-on-surface">{u.full_name}</p>
                <p className="truncate text-xs text-on-surface-variant">
                  {u.email}
                  {u.grade_name ? ` · ${u.grade_name}` : ""}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                disabled={busyId === u.id}
                onClick={() => handle(onApprove, u.id)}
                className="flex items-center gap-1 rounded-lg bg-tertiary-container px-2.5 py-1.5 text-xs font-semibold text-on-tertiary transition-transform active:scale-95 disabled:opacity-50"
              >
                <Icon name="check" className="text-[16px]" /> Approve
              </button>
              <button
                type="button"
                disabled={busyId === u.id}
                onClick={() => handle(onReject, u.id)}
                className="flex items-center gap-1 rounded-lg bg-surface-container-highest px-2.5 py-1.5 text-xs font-semibold text-error transition-transform hover:bg-error/20 active:scale-95 disabled:opacity-50"
              >
                <Icon name="close" className="text-[16px]" /> Decline
              </button>
            </div>
          </div>
        ))}
      </div>
      {!hideDirectoryLink && (
        <Link to="/admin/students" className="self-start text-sm font-medium text-secondary hover:underline">
          View full directory →
        </Link>
      )}
    </Card>
  );
}
