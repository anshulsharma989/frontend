import { Icon } from "../ui/Icon";

/** Illustrative UI mockup of the real AI Q&A chat — not a screenshot, just a static preview visual. */
export function ChatMockupCard() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-surface-container-low shadow-2xl">
      <div className="flex items-center gap-2 border-b border-outline-variant/60 bg-surface-container px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-tertiary/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
        <span className="ml-2 text-xs font-medium text-on-surface-variant">Ask your books</span>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-on-primary">
          What causes a rainbow to form?
        </div>
        <div className="flex max-w-[85%] flex-col gap-1.5 rounded-2xl rounded-bl-sm bg-surface-container px-3.5 py-2.5 text-sm text-on-surface">
          <p>
            A rainbow forms when sunlight is refracted, reflected, and dispersed inside water droplets
            <sup className="ml-0.5 text-primary">[1]</sup>, splitting white light into its component colors.
          </p>
          <span className="w-fit rounded-full bg-surface-container-high px-2 py-0.5 text-xs text-on-surface-variant">
            Science Grade 7 · p. 42
          </span>
        </div>
        <div className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-sm bg-surface-container px-3.5 py-2.5 text-sm text-on-surface-variant">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary [animation-delay:300ms]" />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-outline-variant/60 px-4 py-3">
        <div className="flex-1 rounded-full bg-surface-container px-3.5 py-2 text-xs text-on-surface-variant">
          Ask a question…
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
          <Icon name="arrow_upward" className="text-[16px]" />
        </div>
      </div>
    </div>
  );
}
