import { AcademicTelemetryCard } from "../../components/student/AcademicTelemetryCard";
import { ActiveAssessmentsCard } from "../../components/student/ActiveAssessmentsCard";
import { InstructorConnectCard } from "../../components/student/InstructorConnectCard";
import { LiveDrillSandboxCard } from "../../components/student/LiveDrillSandboxCard";
import { ProfileBanner } from "../../components/student/ProfileBanner";
import { Icon } from "../../components/ui/Icon";

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-space-lg">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          There's no grading, scheduling, or messaging backend yet (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). Most of
          this page is sample data — "Generate a practice quiz" below is the one real, working action.
        </span>
      </div>

      <ProfileBanner />
      <ActiveAssessmentsCard />
      <LiveDrillSandboxCard />
      <AcademicTelemetryCard />
      <InstructorConnectCard />
    </div>
  );
}
