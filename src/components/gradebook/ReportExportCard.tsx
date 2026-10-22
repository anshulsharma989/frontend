import { Icon } from "../ui/Icon";

export function ReportExportCard() {
  return (
    <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
      <div className="flex items-start gap-2.5">
        <Icon name="verified_user" className="mt-0.5 shrink-0 text-[22px] text-secondary" />
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-on-surface">Grade report export</span>
          <p className="mt-0.5 text-xs text-on-surface-variant">
            No PDF export or guardian sharing backend exists yet — see{" "}
            <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container-high px-4 py-2.5 text-sm text-on-surface opacity-50"
        >
          <Icon name="download" className="text-[18px]" />
          Download PDF report
        </button>
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-surface-container-high px-4 py-2.5 text-sm text-on-surface opacity-50"
        >
          <Icon name="share" className="text-[18px]" />
          Share with guardian
        </button>
      </div>
    </section>
  );
}
