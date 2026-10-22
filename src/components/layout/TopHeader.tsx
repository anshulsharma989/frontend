import { ReactNode } from "react";
import { useAuth } from "../../auth";
import { Icon } from "../ui/Icon";
import { ThemeToggle } from "../ui/ThemeToggle";

export function TopHeader({ title, extra }: { title: string; extra?: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface px-space-lg">
      <h1 className="font-headline text-lg font-semibold text-on-surface">{title}</h1>
      <div className="flex items-center gap-space-sm">
        {extra}
        <ThemeToggle />
        <div className="flex items-center gap-space-sm rounded-full border border-outline-variant py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary">
            <Icon name="person" className="text-[16px]" />
          </div>
          <span className="text-sm font-medium text-on-surface">{user?.full_name}</span>
        </div>
        <button
          type="button"
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <Icon name="logout" className="text-[18px]" />
        </button>
      </div>
    </header>
  );
}
