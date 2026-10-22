import { CommunicationsCard } from "../../components/teacher/CommunicationsCard";
import { LiveAttendanceCard } from "../../components/teacher/LiveAttendanceCard";
import { QuizManagementCard } from "../../components/teacher/QuizManagementCard";
import { TeacherWelcomeBanner } from "../../components/teacher/TeacherWelcomeBanner";
import { Icon } from "../../components/ui/Icon";

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          There's no teacher role or backend yet (attendance, quiz persistence, grading, messaging — see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). Everything
          below is a UI preview with sample data; attendance toggles are interactive locally but don't persist.
        </span>
      </div>

      <TeacherWelcomeBanner />

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-2">
        <LiveAttendanceCard />
        <div className="flex flex-col gap-space-lg">
          <QuizManagementCard />
          <CommunicationsCard />
        </div>
      </div>
    </div>
  );
}
