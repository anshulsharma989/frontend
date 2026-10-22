import { Icon } from "../ui/Icon";

/** Illustrative UI mockup of the real admin content/approval panel — not a screenshot. */
export function AdminMockupCard() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-surface-container-low shadow-2xl">
      <div className="flex items-center justify-between border-b border-outline-variant/60 bg-surface-container px-4 py-3">
        <span className="text-xs font-medium text-on-surface-variant">Books</span>
        <span className="rounded-full bg-tertiary/10 px-2 py-0.5 text-xs font-medium text-tertiary">+ Upload</span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {[
          { title: "Physics — Part 1", status: "ready" as const },
          { title: "World History", status: "processing" as const },
          { title: "हिन्दी व्याकरण", status: "ready" as const },
        ].map((doc) => (
          <div key={doc.title} className="flex items-center justify-between rounded-xl bg-surface-container px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <Icon name="description" className="shrink-0 text-[18px] text-primary" />
              <span className="truncate text-sm text-on-surface">{doc.title}</span>
            </div>
            {doc.status === "ready" ? (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-tertiary/10 px-2 py-0.5 text-xs text-tertiary">
                <Icon name="check_circle" className="text-[12px]" />
                Ready
              </span>
            ) : (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
                Indexing
              </span>
            )}
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between rounded-xl bg-primary/10 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Icon name="person_add" className="text-[18px] text-primary" />
            <span className="text-sm text-on-surface">2 students awaiting approval</span>
          </div>
          <span className="rounded-full bg-primary-container px-2 py-0.5 text-xs font-medium text-on-primary-container">
            Review
          </span>
        </div>
      </div>
    </div>
  );
}
