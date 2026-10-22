import { NavLink } from "react-router-dom";
import { brand } from "../../config/brand";
import type { NavItem } from "../../config/nav";
import { Icon } from "../ui/Icon";

export function Sidebar({ items }: { items: NavItem[] }) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-outline-variant bg-surface-container-low">
      <div className="flex items-center gap-space-sm px-space-md py-space-lg">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary text-on-primary">
          <Icon name={brand.logoIcon} className="text-[20px]" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-headline text-base font-bold text-on-surface">{brand.name}</span>
          <span className="text-xs text-on-surface-variant">{brand.tagline}</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-space-sm">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-space-sm rounded-lg px-space-sm py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`
            }
          >
            <Icon name={item.icon} className="text-[20px]" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
