import { Icon } from "../ui/Icon";

interface BuilderActionBarProps {
  activeIndex: number;
  totalQuestions: number;
  onSaveAndNext: () => void;
}

export function BuilderActionBar({ activeIndex, totalQuestions, onSaveAndNext }: BuilderActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 flex items-center justify-between gap-space-sm rounded-xl bg-surface-container-high/90 p-space-sm shadow-2xl backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-2">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-tertiary" />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-on-surface">
            Q{activeIndex + 1} / {totalQuestions}
          </span>
          <span className="font-code text-[10px] text-outline">Local preview — not saved to a backend</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-space-xs">
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex min-h-[44px] cursor-not-allowed items-center gap-1 rounded-lg bg-surface-container-highest px-3 text-sm text-on-surface opacity-50"
        >
          <Icon name="visibility" className="text-[16px]" />
          <span className="hidden sm:inline">Preview</span>
        </button>
        <button
          type="button"
          onClick={onSaveAndNext}
          disabled={activeIndex >= totalQuestions - 1}
          className="flex min-h-[44px] items-center gap-1 rounded-lg bg-gradient-to-r from-primary-container via-primary to-inverse-primary px-4 text-sm font-semibold text-on-primary shadow-[0_0_15px_-2px_rgba(160,120,255,0.45)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save &amp; next
          <Icon name="arrow_forward" className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
