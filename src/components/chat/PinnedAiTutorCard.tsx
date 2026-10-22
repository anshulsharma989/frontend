import { useNavigate } from "react-router-dom";
import { AI_QUICK_ACTIONS } from "../../data/mockChatHub";
import { Icon } from "../ui/Icon";

export function PinnedAiTutorCard() {
  const navigate = useNavigate();

  const openTutor = (prompt: string) => navigate("/student/chat/ai-tutor", { state: { initialQuestion: prompt } });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-secondary/10 blur-xl" />
      <div className="relative flex flex-col gap-space-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary-container text-on-primary shadow-sm">
                <Icon name="psychology" className="text-[24px]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-tertiary ring-2 ring-surface-container-low" />
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate font-headline text-base font-bold text-on-surface">Socratic AI Tutor</h2>
                <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Real
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                Online · Instant responses
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-surface-container p-3 text-on-surface">
          <div className="flex items-start gap-2">
            <Icon name="lightbulb" className="mt-0.5 shrink-0 text-[18px] text-primary" />
            <p className="text-sm leading-relaxed text-on-surface">
              Based on your recent <strong className="font-semibold text-primary">Phys-402 Wave Quiz</strong>, would
              you like a walkthrough on <em className="font-semibold not-italic text-secondary">boundary phase
              inversions</em>?
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {AI_QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => openTutor(action.prompt)}
              className="flex items-center gap-1 rounded-lg bg-surface-container px-3 py-1.5 text-sm font-semibold text-primary shadow-sm transition-all hover:bg-surface-container-high active:scale-95"
            >
              <Icon name={action.icon} className="text-[14px]" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
