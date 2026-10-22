import type { SubjectGradebook } from "../../data/mockGradebook";
import { Icon } from "../ui/Icon";

interface SubjectTabsProps {
  subjects: SubjectGradebook[];
  activeId: string;
  onChange: (id: string) => void;
}

export function SubjectTabs({ subjects, activeId, onChange }: SubjectTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
      {subjects.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-on-primary shadow-[0_0_14px_rgba(208,188,255,0.4)]"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <Icon name={s.icon} className={`text-[18px] ${active ? "" : "text-outline"}`} />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
