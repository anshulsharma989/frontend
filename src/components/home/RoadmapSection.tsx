import { Icon } from "../ui/Icon";

const AVAILABLE = [
  { icon: "forum", label: "AI Q&A from your books (English + Hindi)" },
  { icon: "quiz", label: "Instant quiz generation from course material" },
  { icon: "admin_panel_settings", label: "Admin content & access management" },
];

const IN_PROGRESS = [
  { icon: "fact_check", label: "Attendance tracking" },
  { icon: "school", label: "Gradebook & exam analytics" },
  { icon: "co_present", label: "Teacher classroom tools" },
  { icon: "chat", label: "Class & instructor messaging" },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-space-lg py-space-xl">
        <div className="mb-space-lg text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Where we are today</span>
          <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface sm:text-3xl">
            Built for your whole school — honestly, in progress
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-space-sm rounded-2xl bg-tertiary/5 p-space-md">
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-tertiary/10 px-3 py-1 text-xs font-semibold text-tertiary">
              <Icon name="check_circle" className="text-[14px]" />
              Available now
            </span>
            <ul className="flex flex-col gap-2.5">
              {AVAILABLE.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm text-on-surface">
                  <Icon name={f.icon} className="text-[18px] text-tertiary" />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm rounded-2xl bg-surface-container-low p-space-md">
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold text-on-surface-variant">
              <Icon name="construction" className="text-[14px]" />
              In active development
            </span>
            <ul className="flex flex-col gap-2.5">
              {IN_PROGRESS.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                  <Icon name={f.icon} className="text-[18px] text-on-surface-variant" />
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
