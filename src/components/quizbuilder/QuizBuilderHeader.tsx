import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";

/**
 * Focus-mode header (no sidebar) — matches how exam-taking/authoring screens
 * work in the original designs: a dedicated "Exit" affordance instead of
 * persistent nav.
 */
export function QuizBuilderHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-space-sm border-b border-outline-variant bg-surface px-space-lg py-space-sm">
      <button
        type="button"
        onClick={() => navigate("/teacher/dashboard")}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
      >
        <Icon name="arrow_back" className="text-[20px] text-primary" />
        Exit to portal
      </button>
      <div className="flex min-w-0 flex-col items-center text-center">
        <h1 className="truncate font-headline text-base font-semibold text-on-surface">
          Quiz Builder &amp; Authoring Studio
        </h1>
        <div className="flex items-center gap-1 font-code text-xs text-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
          <span className="text-on-surface-variant">Not saved — local preview only</span>
        </div>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
        <Icon name="person" className="text-[18px]" />
      </div>
    </header>
  );
}
