import { useAuth } from "../../auth";
import { brand } from "../../config/brand";

export function WelcomeBanner() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-secondary/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-space-sm">
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-container/20 px-space-sm py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-code text-xs font-semibold uppercase tracking-wider text-primary">
            Admin Console
          </span>
        </div>
        <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
          Welcome back, <span className="text-primary">{user?.full_name}</span>
        </h1>
        <div className="mt-1 flex items-center justify-between rounded-lg bg-surface-container px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            <span className="text-sm font-medium text-on-surface">All systems nominal</span>
          </div>
          <span className="font-code text-xs text-secondary">{brand.name}</span>
        </div>
      </div>
    </div>
  );
}
