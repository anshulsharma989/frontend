import { Card } from "../ui/Card";
import { SectionHeader } from "../ui/SectionHeader";

/** Attendance has no backend yet (see pending-backend-work.md) — shown as an honest preview, not fake live data. */
export function AttendancePreviewCard() {
  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="fact_check"
        title="Daily Attendance Matrix"
        tone="tertiary"
        trailing={
          <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs font-semibold text-on-surface-variant">
            Preview
          </span>
        }
      />
      <p className="text-sm text-on-surface-variant">
        Attendance tracking isn't wired up on the backend yet (see{" "}
        <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). This is
        what the matrix will look like once it is.
      </p>
      <div className="flex flex-col gap-3 opacity-50">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm font-medium">
            <span className="text-on-surface">Faculty quorum</span>
            <span className="font-bold text-tertiary">— %</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-0 rounded-full bg-tertiary" />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-sm font-medium">
            <span className="text-on-surface">Student population</span>
            <span className="font-bold text-secondary">— %</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
            <div className="h-full w-0 rounded-full bg-secondary" />
          </div>
        </div>
      </div>
    </Card>
  );
}
