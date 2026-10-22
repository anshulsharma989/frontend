import { SUB_SKILLS, type SubSkill } from "../../data/mockExamResults";

const STATUS_TONE: Record<SubSkill["status"], { bar: string; badge: string }> = {
  Mastered: { bar: "bg-tertiary", badge: "bg-tertiary-container/30 text-tertiary" },
  Proficient: { bar: "bg-secondary", badge: "bg-secondary-container/20 text-secondary" },
  Good: { bar: "bg-primary", badge: "bg-primary-container/20 text-primary" },
  Review: { bar: "bg-outline", badge: "bg-surface-container-highest text-on-surface-variant" },
};

export function SubSkillTelemetryCard() {
  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-headline text-lg font-semibold text-on-surface">Sub-Skill Telemetry</h2>
        <span className="text-xs text-outline">{SUB_SKILLS.length} focal domains</span>
      </div>
      <div className="flex flex-col gap-space-md rounded-xl bg-surface-container p-space-md shadow-sm">
        {SUB_SKILLS.map((skill) => {
          const tone = STATUS_TONE[skill.status];
          return (
            <div key={skill.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-on-surface">{skill.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-code text-xs text-outline">
                    {skill.correct}/{skill.total} Qs
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tone.badge}`}>{skill.status}</span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${skill.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
