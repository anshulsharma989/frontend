import { Icon } from "./Icon";

export interface StatusOption {
  id: string;
  label: string;
  icon?: string;
  activeClassName: string;
}

interface StatusSwitcherProps {
  options: StatusOption[];
  value: string;
  onChange: (id: string) => void;
}

/** Generic segmented status switcher (P/L/A/E, or any small fixed set of mutually-exclusive states). */
export function StatusSwitcher({ options, value, onChange }: StatusSwitcherProps) {
  return (
    <div
      className="grid gap-1 rounded-lg bg-surface-container-lowest p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`flex items-center justify-center gap-1 rounded-md py-1.5 text-sm font-semibold transition-colors ${
              active ? opt.activeClassName : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {active && opt.icon && <Icon name={opt.icon} className="text-[16px]" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
