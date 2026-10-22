import { Icon } from "./Icon";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex items-center justify-between py-space-sm text-on-surface-variant">
      <button
        type="button"
        onClick={onPrev}
        disabled={page <= 1}
        className="flex min-h-[40px] items-center gap-1 rounded-lg bg-surface-container-low px-space-sm text-sm font-medium hover:text-on-surface disabled:opacity-40"
      >
        <Icon name="chevron_left" className="text-[16px]" />
        Previous
      </button>
      <span className="font-code text-sm text-on-surface">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={page >= totalPages}
        className="flex min-h-[40px] items-center gap-1 rounded-lg bg-surface-container-low px-space-sm text-sm font-medium text-on-surface hover:text-primary disabled:opacity-40"
      >
        Next
        <Icon name="chevron_right" className="text-[16px]" />
      </button>
    </div>
  );
}
