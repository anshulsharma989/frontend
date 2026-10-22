import type { ChatThread } from "../../data/mockChatHub";
import { Icon } from "../ui/Icon";

const CATEGORY_ICON: Record<ChatThread["category"], string> = {
  groups: "groups",
  faculty: "school",
};

export function ChatThreadRow({ thread }: { thread: ChatThread }) {
  return (
    <div
      title="Group/instructor messaging isn't implemented yet — this thread is a preview"
      className="flex cursor-not-allowed flex-col gap-2 rounded-2xl bg-surface-container-lowest p-3.5 opacity-80 shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
    >
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant">
            <Icon name={CATEGORY_ICON[thread.category]} className="text-[22px]" />
          </div>
          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="truncate text-sm font-bold text-on-surface">{thread.title}</h3>
              {thread.badge && (
                <span className="rounded-full bg-surface-container-highest px-1.5 py-0.5 text-[10px] font-bold text-on-surface-variant">
                  {thread.badge}
                </span>
              )}
            </div>
            <span className="truncate text-xs text-on-surface-variant">{thread.subtitle}</span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-xs font-medium text-on-surface-variant">{thread.time}</span>
          {thread.unreadCount ? (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container text-[10px] font-extrabold text-on-primary-container">
              {thread.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-surface-container-low/60 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          {thread.snippetAuthor && <span className="shrink-0 text-xs font-bold text-primary">{thread.snippetAuthor}:</span>}
          <p className="truncate text-xs text-on-surface-variant">{thread.snippet}</p>
        </div>
      </div>
      {thread.attachment && (
        <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-surface-container px-2.5 py-1.5 text-xs text-on-surface">
          <Icon name={thread.attachment.icon} className="text-[16px] text-primary" />
          <span className="max-w-[180px] truncate font-semibold">{thread.attachment.name}</span>
          <span className="text-[10px] text-outline">{thread.attachment.size}</span>
        </div>
      )}
    </div>
  );
}
