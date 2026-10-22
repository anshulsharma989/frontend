import { useAuth } from "../../auth";
import { CURRENT_CLASS, NEXT_PERIOD } from "../../data/mockTeacherDashboard";
import { Icon } from "../ui/Icon";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function TeacherWelcomeBanner() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-xl">
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-secondary/10 blur-2xl" />
      <div className="relative z-10 flex items-center justify-between gap-space-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/20 px-2.5 py-1 text-xs font-semibold text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          Faculty Workspace
        </span>
      </div>
      <div className="relative z-10 mt-space-xs flex items-start justify-between gap-space-sm">
        <div className="min-w-0">
          <h1 className="truncate font-headline text-lg font-semibold tracking-tight text-on-surface">
            {greeting()}, {user?.full_name}
          </h1>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Icon name="meeting_room" className="text-[18px] text-secondary" />
            <span className="text-sm font-medium text-secondary">
              {CURRENT_CLASS.subject} · {CURRENT_CLASS.room}
            </span>
          </div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-highest/60">
          <Icon name="electric_bolt" className="text-[28px] text-primary" />
        </div>
      </div>
      <div className="relative z-10 mt-space-md flex items-center justify-between rounded-lg bg-surface-container-lowest/70 p-space-sm">
        <div className="flex min-w-0 items-center gap-space-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-container/25">
            <Icon name="hourglass_top" className="text-[18px] text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-on-surface-variant">Next period</p>
            <p className="truncate text-sm font-semibold text-on-surface">{NEXT_PERIOD.label}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-secondary-container/20 px-2.5 py-1 text-xs font-medium text-secondary">
          in {NEXT_PERIOD.inMinutes} mins
        </span>
      </div>
    </div>
  );
}
