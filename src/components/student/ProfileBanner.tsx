import { useAuth } from "../../auth";
import { NEXT_ASSESSMENT } from "../../data/mockStudentHub";
import { Icon } from "../ui/Icon";

export function ProfileBanner() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-space-sm">
      <div className="relative flex flex-col gap-space-sm overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-xl">
        <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-primary-container/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-secondary/10 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between gap-space-sm">
          <div className="flex min-w-0 items-center gap-space-sm">
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest font-headline text-base font-bold text-primary">
                {(user?.full_name ?? "?")
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tertiary-container ring-2 ring-surface-container-low">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              <h2 className="truncate font-headline text-lg text-on-surface">{user?.full_name}</h2>
              <p className="truncate text-xs text-on-surface-variant">{user?.grade_name ?? "—"}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end">
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-container/20 to-secondary/20 px-2.5 py-1">
              <Icon name="military_tech" className="text-[14px] text-secondary" />
              <span className="font-code text-xs font-semibold text-on-surface">Rank 98%</span>
            </div>
            <span className="mt-1 font-code text-xs text-tertiary">GPA 3.92</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-space-sm rounded-xl bg-surface-container p-3 shadow-sm">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
              <Icon name="timer" className="text-[18px]" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Next assessment</span>
              <span className="truncate text-sm text-on-surface">{NEXT_ASSESSMENT.title}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-surface-container-highest px-3 py-1 shadow-inner">
            <span className="h-2 w-2 rounded-full bg-error" />
            <span className="font-code text-sm font-bold tracking-tight text-on-surface">{NEXT_ASSESSMENT.countdown}</span>
          </div>
        </div>
      </div>
      <p className="px-1 text-xs text-on-surface-variant">
        Rank, GPA, and the countdown above are sample data — there's no grading/scheduling backend yet. Grade is
        real, from your account.
      </p>
    </div>
  );
}
