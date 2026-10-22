type Tone = "primary" | "tertiary" | "error" | "neutral";

interface Tab {
  id: string;
  label: string;
  count?: number;
  tone?: Tone;
}

interface SegmentedTabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

const COUNT_TONE: Record<Tone, string> = {
  primary: "bg-primary/20 text-primary",
  tertiary: "bg-tertiary/20 text-tertiary",
  error: "bg-error-container/40 text-error",
  neutral: "bg-surface-variant text-on-surface-variant",
};

export function SegmentedTabs({ tabs, activeId, onChange }: SegmentedTabsProps) {
  return (
    <div
      className="grid gap-1 rounded-xl bg-surface-container-low p-1"
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-all ${
              active ? "bg-surface-container-highest text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="truncate">{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.5 font-code text-xs ${
                  active ? COUNT_TONE[tab.tone ?? "neutral"] : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
