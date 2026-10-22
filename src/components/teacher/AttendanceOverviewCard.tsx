import type { RollCallEntry, RollCallStatus } from "../../data/mockRollCall";
import { Card } from "../ui/Card";

const SEGMENT_COLOR: Record<RollCallStatus, string> = {
  P: "bg-tertiary",
  L: "bg-secondary-container",
  A: "bg-error",
  E: "bg-secondary",
};

const TILE: Record<RollCallStatus, { label: string; dot: string; text: string }> = {
  P: { label: "Present", dot: "bg-tertiary", text: "text-tertiary" },
  L: { label: "Late", dot: "bg-secondary-container", text: "text-secondary-container" },
  A: { label: "Absent", dot: "bg-error", text: "text-error" },
  E: { label: "Excused", dot: "bg-secondary", text: "text-secondary" },
};

const ORDER: RollCallStatus[] = ["P", "L", "A", "E"];

export function AttendanceOverviewCard({ roster }: { roster: RollCallEntry[] }) {
  const total = roster.length;
  const counts = ORDER.map((status) => roster.filter((r) => r.status === status).length);
  const presentLikeRate = total === 0 ? 0 : (((counts[0] ?? 0) + (counts[1] ?? 0)) / total) * 100;

  return (
    <Card className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="font-headline text-lg font-bold text-on-surface">{total}</span>
          <span className="text-sm text-on-surface-variant">Enrolled students</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-code text-sm font-bold text-tertiary">{presentLikeRate.toFixed(1)}%</span>
          <span className="text-xs text-on-surface-variant">Rate</span>
        </div>
      </div>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest">
        {ORDER.map((status, i) => {
          const pct = total === 0 ? 0 : ((counts[i] ?? 0) / total) * 100;
          if (pct === 0) return null;
          return <div key={status} className={`h-full ${SEGMENT_COLOR[status]}`} style={{ width: `${pct}%` }} />;
        })}
      </div>

      <div className="grid grid-cols-4 gap-space-xs pt-1">
        {ORDER.map((status, i) => {
          const tile = TILE[status];
          const count = counts[i] ?? 0;
          const pct = total === 0 ? 0 : ((count / total) * 100).toFixed(1);
          return (
            <div key={status} className="flex flex-col items-center justify-center rounded-lg bg-surface-container-low p-2">
              <div className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${tile.dot}`} />
                <span className={`text-xs ${tile.text}`}>{tile.label}</span>
              </div>
              <span className="mt-0.5 font-headline text-base font-semibold text-on-surface">{count}</span>
              <span className="font-code text-xs text-outline">{pct}%</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
