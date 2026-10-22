import { INSTRUCTOR_MESSAGES } from "../../data/mockStudentHub";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function InstructorConnectCard() {
  const unread = INSTRUCTOR_MESSAGES.filter((m) => m.online).length;

  return (
    <section className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="forum"
        title="Instructor Connect"
        tone="secondary"
        trailing={
          <span className="flex items-center gap-1 rounded-full bg-secondary-container/20 px-2 py-0.5 font-code text-xs text-secondary">
            {unread} unread
          </span>
        }
      />

      <div className="flex flex-col gap-2">
        {INSTRUCTOR_MESSAGES.map((m) => (
          <div key={m.id} className="flex flex-col gap-2 rounded-2xl bg-surface-container p-space-md shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest font-headline text-sm font-bold text-on-surface">
                    {initials(m.name)}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-surface-container ${
                      m.online ? "bg-tertiary" : "bg-outline"
                    }`}
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold text-on-surface">{m.name}</span>
                  <span className={`truncate text-xs ${m.online ? "text-secondary" : "text-on-surface-variant"}`}>{m.role}</span>
                </div>
              </div>
              <span className="shrink-0 font-code text-xs text-on-surface-variant">{m.time}</span>
            </div>
            <p className="line-clamp-2 pl-12 text-sm text-on-surface-variant">&ldquo;{m.preview}&rdquo;</p>
            {m.hasQuickReply && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  disabled
                  title="Messaging isn't wired up yet"
                  className="flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-surface-container-high px-3 py-1 text-xs text-secondary opacity-50"
                >
                  <Icon name="reply" className="text-[14px]" />
                  Quick reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-surface-container-high p-2 shadow-lg">
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface-variant opacity-50"
        >
          <Icon name="attach_file" className="text-[20px]" />
        </button>
        <input
          disabled
          placeholder="Messaging isn't wired up yet"
          title="There's no messaging backend yet — see pending-backend-work.md"
          className="flex-1 cursor-not-allowed bg-transparent px-1 text-sm text-on-surface placeholder:text-outline focus:outline-none"
        />
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface-variant opacity-50"
        >
          <Icon name="arrow_upward" className="text-[20px]" />
        </button>
      </div>
    </section>
  );
}
