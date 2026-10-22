import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { Modal } from "../ui/Modal";

/**
 * Canned, pre-authored Socratic dialogue for Q22's specific misconception
 * (pressure vs. displacement phase at an open boundary). This is the one
 * screen in the export with a fully scripted "misconception-aware" AI
 * conversation — there's no backend that can generate this dynamically for
 * an arbitrary question yet (see pending-backend-work.md). It's shown as
 * sample content; the composer bridges to the real AI tutor chat instead of
 * pretending to continue this specific scripted conversation.
 */

function AcousticBoundaryDiagram() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 340 145" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanWave" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4cd7f6" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="purpleWave" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#d0bcff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d0bcff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect fill="#181c24" height="42" rx="4" width="220" x="15" y="15" />
      <line stroke="#494454" strokeWidth="2" x1="15" x2="235" y1="15" y2="15" />
      <line stroke="#494454" strokeWidth="2" x1="15" x2="235" y1="57" y2="57" />
      <line stroke="#4cd7f6" strokeDasharray="3 3" strokeWidth="1.5" x1="235" x2="235" y1="10" y2="62" />
      <text fill="#4cd7f6" fontFamily="Inter" fontSize="9" fontWeight="600" x="242" y="32">
        Open Boundary
      </text>
      <text fill="#958ea0" fontFamily="Inter" fontSize="8" x="242" y="44">
        P = P_atm
      </text>
      <path d="M 25 36 Q 75 18 125 36 T 225 36" fill="none" stroke="url(#purpleWave)" strokeWidth="2" />
      <circle cx="235" cy="36" fill="#ffb4ab" r="3.5" />
      <text fill="#d0bcff" fontFamily="JetBrains Mono" fontSize="8" x="25" y="52">
        Pressure Wave: Node (Inverts, π)
      </text>
      <rect fill="#181c24" height="42" rx="4" width="220" x="15" y="80" />
      <line stroke="#494454" strokeWidth="2" x1="15" x2="235" y1="80" y2="80" />
      <line stroke="#494454" strokeWidth="2" x1="15" x2="235" y1="122" y2="122" />
      <line stroke="#4cd7f6" strokeDasharray="3 3" strokeWidth="1.5" x1="235" x2="235" y1="75" y2="127" />
      <path d="M 25 101 Q 80 120 135 101 T 235 84" fill="none" stroke="url(#cyanWave)" strokeWidth="2.5" />
      <circle cx="235" cy="84" fill="#4edea3" r="4" />
      <line stroke="#4edea3" strokeWidth="2" x1="235" x2="255" y1="84" y2="84" />
      <polygon fill="#4edea3" points="257,84 252,81 252,87" />
      <text fill="#4cd7f6" fontFamily="JetBrains Mono" fontSize="8" x="25" y="117">
        Displacement: Max Amplitude (0° Shift)
      </text>
      <text fill="#4edea3" fontFamily="Inter" fontSize="8" fontWeight="600" x="262" y="87">
        Free Air
      </text>
    </svg>
  );
}

function MicroQuiz() {
  const [answered, setAnswered] = useState<"correct" | "incorrect" | null>(null);

  return (
    <div className="mt-space-sm flex flex-col gap-space-sm rounded-xl bg-surface-container-high p-space-md">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-tertiary">
          <Icon name="bolt" className="text-[16px]" />
          Instant intuition check
        </span>
        <span className="font-code text-xs text-outline">10-sec test</span>
      </div>
      <p className="text-sm font-medium text-on-surface">
        Suppose a wave hits a <span className="text-primary underline">rigid closed wall</span>. What happens to the
        displacement wave?
      </p>
      <div className="flex flex-col gap-space-xs pt-1">
        {[
          { id: "a", label: "A. Reflects in-phase (0° shift)", correct: false },
          { id: "b", label: "B. Reflects out-of-phase (180° / π shift)", correct: true },
        ].map((opt) => {
          const picked = answered !== null;
          const isThisCorrect = opt.correct;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={picked}
              onClick={() => setAnswered(opt.correct ? "correct" : "incorrect")}
              className={`flex w-full items-center justify-between rounded-lg p-2.5 text-left text-sm transition-all ${
                picked
                  ? isThisCorrect
                    ? "bg-tertiary-container/20 font-semibold text-tertiary"
                    : "bg-surface-container-low text-on-surface opacity-50"
                  : "bg-surface-container-low hover:bg-surface-variant active:scale-[0.99]"
              }`}
            >
              <span>{opt.label}</span>
              <Icon
                name={picked && isThisCorrect ? "check_circle" : "radio_button_unchecked"}
                className={`text-[18px] ${picked && isThisCorrect ? "text-tertiary" : "text-outline opacity-40"}`}
              />
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`rounded-lg p-2.5 text-sm ${answered === "correct" ? "bg-tertiary-container/20 text-tertiary" : "bg-error-container/20 text-error"}`}>
          {answered === "correct" ? (
            <>
              <strong>Brilliant!</strong> A rigid wall stops particle displacement completely (displacement node),
              causing the pulse to invert (180° shift) while pressure reflects constructively.
            </>
          ) : (
            <>Not quite! At a rigid wall, air can't move forward, enforcing ξ = 0 (node) — reflection requires a 180° displacement reversal.</>
          )}
        </div>
      )}
    </div>
  );
}

export function AiTutorMisconceptionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  const continueInLiveChat = () => {
    onClose();
    navigate("/student/chat/ai-tutor", {
      state: {
        initialQuestion:
          "Can you quiz me on a few more open-vs-closed acoustic boundary problems like Q22? I now understand pressure inverts at an open end but displacement doesn't.",
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} title="Socratic Dialogue · Q22 Analysis" icon="psychology" maxWidthClassName="max-w-2xl">
      <div className="flex items-start gap-space-sm rounded-lg bg-surface-container-high px-space-sm py-2 text-xs text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[16px] text-secondary" />
        <span>
          This is a pre-written sample dialogue — there's no backend yet that generates a misconception-aware
          conversation for an arbitrary question (see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>). The
          intuition check below is really interactive; the composer continues in the real AI tutor chat instead.
        </span>
      </div>

      <div className="flex flex-col gap-space-xs rounded-xl bg-surface-container p-space-md">
        <div className="flex items-center justify-between">
          <span className="font-code text-xs uppercase tracking-wide text-secondary">PHYS-402 · Wave Mechanics</span>
          <span className="rounded bg-surface-container-highest px-2 py-0.5 font-code text-xs text-on-surface-variant">
            Midterm #1
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-error-container/20 px-2.5 py-1 text-xs text-error">
          <span className="h-1.5 w-1.5 rounded-full bg-error" />
          Q22 · Incorrect (0.00 / 4.00 pts)
        </div>
      </div>

      <div className="flex flex-col gap-space-md rounded-xl bg-surface-container-low p-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <Icon name="help" className="text-[18px]" />
            Exam prompt context
          </div>
          <p className="text-sm font-medium leading-snug text-on-surface">
            "When an acoustic pressure pulse encounters an open pipe termination, what phase change occurs upon
            reflection of the <span className="font-semibold text-secondary">displacement wave</span>?"
          </p>
        </div>
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-start gap-space-sm rounded-lg bg-surface-container p-space-sm">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-error-container/30 text-error">
              <Icon name="close" className="text-[16px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-error">Your choice: Option C (λ/2 phase shift)</span>
                <span className="font-code text-xs text-outline">Selected</span>
              </div>
              <p className="mt-0.5 text-sm text-on-surface-variant">
                Misconception: confused the <span className="font-medium text-error">pressure node</span> with the
                particle <span className="font-medium text-on-surface">displacement antinode</span>.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-space-sm rounded-lg bg-tertiary-container/10 p-space-sm">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary">
              <Icon name="check" className="text-[16px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-tertiary">Correct: Option A (0° / in-phase)</span>
                <span className="font-code text-xs text-tertiary">Ideal</span>
              </div>
              <p className="mt-0.5 text-sm text-on-surface-variant">
                Molecules unconstrained at an open boundary reflect with zero phase inversion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-space-md">
        <div className="flex items-start gap-space-sm">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary-container to-secondary text-on-primary shadow-sm">
            <Icon name="neurology" className="text-[18px]" />
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm bg-surface-container p-space-md shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Tutor Ada</span>
              <span className="font-code text-xs text-outline">Sample</span>
            </div>
            <p className="mt-2 text-sm text-on-surface">
              Hey! You scored <span className="font-semibold text-secondary">93%</span> on the wave mechanics
              midterm — phenomenal mastery. Question 22 is just an acoustic boundary trap.
            </p>
            <p className="mt-2 text-sm text-on-surface-variant">
              Let's isolate the root intuition. Ask yourself:{" "}
              <strong className="text-primary-fixed">
                is the boundary restraining pressure, or is it restraining displacement?
              </strong>
            </p>
            <div className="mt-space-sm flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                  <Icon name="insights" className="text-[15px]" />
                  Acoustic dual mode
                </span>
                <span className="font-code text-xs text-outline">P(x,t) vs ξ(x,t)</span>
              </div>
              <AcousticBoundaryDiagram />
              <div className="grid grid-cols-2 gap-space-xs pt-1">
                <div className="rounded-lg bg-surface-container p-2">
                  <span className="block text-xs text-error">Pressure pulse</span>
                  <span className="text-xs leading-tight text-on-surface-variant">
                    Clamped to P_atm → reflects as rarefaction (180° shift).
                  </span>
                </div>
                <div className="rounded-lg bg-surface-container p-2">
                  <span className="block text-xs text-tertiary">Displacement pulse</span>
                  <span className="text-xs leading-tight text-on-surface-variant">
                    Molecules oscillate uninhibited → peak reflects in-phase (0°).
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-end gap-space-sm pl-8">
          <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-primary/10 p-space-md shadow-sm">
            <div className="flex items-center justify-between gap-space-md">
              <span className="text-sm font-semibold text-primary">You</span>
              <span className="font-code text-xs text-outline">Sample</span>
            </div>
            <p className="mt-1 text-sm text-on-surface">
              "Oh wow, got it! I instantly recalled that an open acoustic pipe end inverts the pressure pulse, so I
              automatically assumed displacement inverted along with it!"
            </p>
          </div>
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
            <Icon name="person" className="text-[18px]" />
          </div>
        </div>

        <div className="flex items-start gap-space-sm">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary-container to-secondary text-on-primary shadow-sm">
            <Icon name="neurology" className="text-[18px]" />
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm bg-surface-container p-space-md shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">Tutor Ada</span>
              <span className="font-code text-xs text-outline">Sample</span>
            </div>
            <p className="mt-2 text-sm text-on-surface">
              Spot-on diagnosis! That's precisely where these questions catch people. Pressure and particle
              displacement are mathematical duals — a derivative step apart:{" "}
              <span className="font-code text-secondary">ΔP = -ρv²(∂ξ/∂x)</span>.
            </p>
            <div className="mt-space-sm flex flex-col gap-1 rounded-xl bg-surface-container-lowest p-space-md">
              <div className="flex items-center gap-1.5 text-secondary">
                <Icon name="bookmark_heart" className="text-[18px]" />
                <span className="text-sm font-semibold">Canonical boundary invariance rule</span>
              </div>
              <div className="flex flex-col gap-1 pt-1 font-code text-xs">
                <div className="flex items-center justify-between rounded bg-surface-container-low p-1.5">
                  <span className="font-medium text-secondary">OPEN END</span>
                  <span className="text-on-surface">
                    Pressure inverts (π) | <strong className="text-tertiary">disp. intact (0)</strong>
                  </span>
                </div>
                <div className="flex items-center justify-between rounded bg-surface-container-low p-1.5">
                  <span className="font-medium text-primary">CLOSED END</span>
                  <span className="text-on-surface">
                    Pressure intact (0) | <strong className="text-error">disp. inverts (π)</strong>
                  </span>
                </div>
              </div>
            </div>

            <MicroQuiz />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-space-xs">
        <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-outline">
          <Icon name="auto_awesome" className="text-[14px]" />
          Suggested explorations
        </span>
        <div className="flex gap-space-xs overflow-x-auto pb-1">
          {["Why does P_atm enforce a node?", "Show standing wave animation", "Practice 3 boundary problems"].map((s) => (
            <button
              key={s}
              type="button"
              disabled
              title="Not implemented yet — use 'Continue in live AI tutor' below"
              className="shrink-0 cursor-not-allowed whitespace-nowrap rounded-full bg-surface-container px-3 py-1.5 text-sm text-on-surface-variant opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={continueInLiveChat}
        className="flex w-full items-center justify-center gap-space-sm rounded-xl bg-gradient-to-r from-primary to-secondary px-space-md py-3.5 font-semibold text-surface-container-lowest shadow-lg shadow-primary/20 transition-transform active:scale-[0.99]"
      >
        <span>Continue in live AI Tutor chat</span>
        <Icon name="arrow_forward" className="text-[20px]" />
      </button>
    </Modal>
  );
}
