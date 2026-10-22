import { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { NavItem } from "../../config/nav";
import { brand } from "../../config/brand";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

export function AppShell({ navItems, headerExtra }: { navItems: NavItem[]; headerExtra?: ReactNode }) {
  const location = useLocation();
  const activeItem = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="flex h-screen bg-background text-on-background">
      <Sidebar items={navItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader title={activeItem?.label ?? brand.name} extra={headerExtra} />
        <main className="flex-1 overflow-y-auto p-space-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
