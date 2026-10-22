import { Icon } from "../ui/Icon";

const RULES = [
  {
    icon: "calculate",
    tone: "text-tertiary",
    label: "Calculator policy",
    detail: "Scientific 10-digit virtual",
    badge: "Active",
    badgeTone: "bg-tertiary/20 text-tertiary",
  },
  {
    icon: "lock",
    tone: "text-secondary",
    label: "Lockdown fullscreen",
    detail: "Kiosk mode enforcement",
    badge: "Enforced",
    badgeTone: "bg-secondary/20 text-secondary",
  },
  {
    icon: "shuffle",
    tone: "text-primary",
    label: "Dynamic question pool",
    detail: "Draw 20 of 24 randomized",
    badge: "Enabled",
    badgeTone: "bg-primary/20 text-primary-fixed",
  },
];

export function ProctoringRulesCard() {
  return (
    <section className="flex flex-col gap-space-xs rounded-xl bg-surface-container-low p-space-md">
      <div className="flex items-center gap-2">
        <Icon name="admin_panel_settings" className="text-[20px] text-primary" />
        <span className="font-headline text-base font-semibold text-on-surface">Proctoring Rules</span>
      </div>
      <p className="text-sm text-on-surface-variant">
        Preview only — there's no backend to enforce these yet (webcam checks, biometric confirmation, and lockdown
        mode are all unimplemented; see <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>).
      </p>
      <div className="mt-1 grid grid-cols-1 gap-2">
        {RULES.map((rule) => (
          <div key={rule.label} className="flex items-center justify-between rounded-lg bg-surface-container p-2.5">
            <div className="flex items-center gap-2">
              <Icon name={rule.icon} className={`text-[18px] ${rule.tone}`} />
              <div className="flex flex-col">
                <span className="text-sm text-on-surface">{rule.label}</span>
                <span className="font-code text-[11px] text-outline">{rule.detail}</span>
              </div>
            </div>
            <span className={`rounded px-2 py-0.5 text-xs ${rule.badgeTone}`}>{rule.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
