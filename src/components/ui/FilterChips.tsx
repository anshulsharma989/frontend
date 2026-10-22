type Tone = "secondary" | "tertiary" | "error";

interface FilterChip {
  id: string;
  label: string;
  tone?: Tone;
}

interface FilterChipsProps {
  chips: FilterChip[];
  activeId: string;
  onChange: (id: string) => void;
}

const TONE_ACTIVE: Record<Tone, string> = {
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary/20 text-tertiary",
  error: "bg-error/20 text-error",
};

export function FilterChips({ chips, activeId, onChange }: FilterChipsProps) {
  return (
    <div className="flex items-center gap-space-xs overflow-x-auto pt-1">
      {chips.map((chip) => {
        const active = chip.id === activeId;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            className={`flex min-h-[36px] shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-space-sm text-sm font-medium shadow-sm transition-colors ${
              active ? TONE_ACTIVE[chip.tone ?? "secondary"] : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
