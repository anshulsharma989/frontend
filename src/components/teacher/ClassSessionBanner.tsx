import { Icon } from "../ui/Icon";

export function ClassSessionBanner() {
  return (
    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-high p-space-md shadow-lg">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex min-w-0 flex-col">
          <div className="mb-1 flex items-center gap-space-xs">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-code text-xs text-primary">PER-03</span>
            <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-xs text-on-surface-variant">
              Lab 402 · 09:15 – 10:45 AM
            </span>
          </div>
          <h2 className="truncate font-headline text-lg font-semibold text-on-surface">
            Grade 11-B · Wave Mechanics &amp; Acoustics
          </h2>
        </div>
        <button
          type="button"
          disabled
          title="Session settings aren't implemented yet"
          className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-surface-container text-on-surface-variant opacity-50"
        >
          <Icon name="tune" className="text-[20px]" />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-1.5">
        <button
          type="button"
          disabled
          title="Historical attendance isn't available yet"
          className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-on-surface-variant opacity-40"
        >
          <Icon name="chevron_left" className="text-[18px]" />
        </button>
        <div className="flex items-center gap-space-xs">
          <Icon name="event" className="text-[18px] text-primary" />
          <span className="text-sm font-semibold text-on-surface">Today</span>
          <span className="rounded-full bg-tertiary/15 px-1.5 py-0.5 text-xs text-tertiary">Live</span>
        </div>
        <button
          type="button"
          disabled
          title="Future attendance isn't available yet"
          className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-on-surface-variant opacity-40"
        >
          <Icon name="chevron_right" className="text-[18px]" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-space-xs rounded-lg bg-surface-container-lowest p-1">
        <button
          type="button"
          className="flex items-center justify-center gap-space-xs rounded-lg bg-primary py-2 text-sm font-medium text-on-primary shadow-md"
        >
          <Icon name="draw" className="text-[18px]" />
          Manual roll-call
        </button>
        <button
          type="button"
          disabled
          title="Kiosk/turnstile hardware isn't connected — UI preview only"
          className="flex cursor-not-allowed items-center justify-center gap-space-xs truncate rounded-lg py-2 text-sm text-on-surface-variant opacity-50"
        >
          <Icon name="sensors" className="text-[18px] text-secondary" />
          Kiosk sync
        </button>
      </div>
    </div>
  );
}
