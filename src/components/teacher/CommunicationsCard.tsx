import { Link } from "react-router-dom";
import { MOCK_MESSAGES, type MessageKind } from "../../data/mockTeacherDashboard";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

const KIND_ICON: Record<MessageKind, string> = {
  group: "groups",
  student: "school",
  parent: "family_restroom",
};

const KIND_TONE: Record<MessageKind, string> = {
  group: "bg-secondary-container/20 text-secondary",
  student: "bg-primary-container/20 text-primary",
  parent: "bg-surface-container-highest text-on-surface-variant",
};

export function CommunicationsCard() {
  const unread = MOCK_MESSAGES.filter((m) => m.highlighted).length;

  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader
        icon="forum"
        title="Communications"
        tone="secondary"
        trailing={
          <span className="flex items-center gap-1 rounded-full bg-primary-container/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {unread} unread
          </span>
        }
      />

      <div className="flex flex-col gap-2">
        {MOCK_MESSAGES.map((m) => (
          <div key={m.id} className="flex items-start gap-space-sm rounded-lg bg-surface-container-low p-space-sm">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${KIND_TONE[m.kind]}`}>
              <Icon name={KIND_ICON[m.kind]} className="text-[18px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-space-xs">
                <p className="truncate text-sm font-semibold text-on-surface">{m.name}</p>
                <span className={`shrink-0 text-xs ${m.highlighted ? "font-bold text-secondary" : "text-on-surface-variant"}`}>
                  {m.time}
                </span>
              </div>
              <p className={`truncate text-sm ${m.highlighted ? "font-medium text-secondary" : "text-on-surface-variant"}`}>
                {m.preview}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          disabled
          placeholder="Messaging isn't wired up yet"
          title="There's no messaging backend yet — see pending-backend-work.md"
          className="min-h-[44px] flex-1 cursor-not-allowed rounded-lg bg-surface-container-low px-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 opacity-60"
        />
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex min-h-[44px] min-w-[44px] cursor-not-allowed items-center justify-center rounded-lg bg-secondary text-on-secondary opacity-50"
        >
          <Icon name="send" className="text-[20px]" />
        </button>
      </div>

      <Link
        to="/teacher/messages"
        className="flex min-h-[40px] items-center justify-center gap-1 rounded-lg bg-surface-container-low text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
      >
        Open dedicated messages hub
        <Icon name="north_east" className="text-[16px]" />
      </Link>
    </Card>
  );
}
