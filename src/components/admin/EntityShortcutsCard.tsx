import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeader } from "../ui/SectionHeader";

type Tone = "primary" | "secondary" | "tertiary";

const TONE_TEXT: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

interface Shortcut {
  label: string;
  detail: string;
  icon: string;
  tone: Tone;
  /** Omit when the backing feature doesn't exist yet (see pending-backend-work.md). */
  to?: string;
}

export function EntityShortcutsCard({
  gradeCount,
  subjectCount,
  facultyCount,
  studentCount,
}: {
  gradeCount: number;
  subjectCount: number;
  facultyCount: number;
  studentCount: number;
}) {
  const shortcuts: Shortcut[] = [
    { label: "Grades & Streams", detail: `${gradeCount} active`, icon: "stairs", tone: "primary", to: "/admin/catalog" },
    { label: "Subject Matrix", detail: `${subjectCount} subjects`, icon: "account_tree", tone: "secondary", to: "/admin/catalog" },
    { label: "Faculty Roster", detail: `${facultyCount} sample rows`, icon: "groups", tone: "tertiary", to: "/admin/teachers" },
    { label: "Student Directory", detail: `${studentCount} sample rows`, icon: "folder_shared", tone: "primary", to: "/admin/students" },
  ];

  return (
    <Card className="flex flex-col gap-space-sm">
      <SectionHeader icon="hub" title="Master Entity Schemas" tone="secondary" />
      <div className="grid grid-cols-2 gap-2.5">
        {shortcuts.map((s) => {
          const body = (
            <>
              <div className="flex items-center justify-between">
                <Icon name={s.icon} className={`text-[20px] ${TONE_TEXT[s.tone]}`} />
                <span className="rounded bg-surface-container px-1.5 py-0.5 text-[10px] font-semibold text-on-surface-variant">
                  {s.to ? "Manage" : "Soon"}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">{s.label}</p>
                <p className="text-xs text-on-surface-variant">{s.detail}</p>
              </div>
            </>
          );
          const className = `flex min-h-[92px] flex-col justify-between rounded-xl bg-surface-container-low p-3 transition-colors ${
            s.to ? "cursor-pointer hover:bg-surface-container" : "cursor-not-allowed opacity-60"
          }`;
          return s.to ? (
            <Link key={s.label} to={s.to} className={className}>
              {body}
            </Link>
          ) : (
            <div key={s.label} className={className}>
              {body}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
