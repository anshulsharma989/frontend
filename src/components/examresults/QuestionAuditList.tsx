import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTION_AUDIT, type AuditStatus, type QuestionAudit } from "../../data/mockExamResults";
import { FilterChips } from "../ui/FilterChips";
import { Icon } from "../ui/Icon";
import { AiTutorMisconceptionModal } from "./AiTutorMisconceptionModal";

const STATUS_ICON: Record<AuditStatus, { icon: string; tone: string }> = {
  correct: { icon: "check", tone: "bg-tertiary-container/30 text-tertiary" },
  incorrect: { icon: "close", tone: "bg-error-container/30 text-error" },
  partial: { icon: "remove", tone: "bg-primary-container/20 text-primary" },
};

/** Only Q22 has a pre-authored misconception dialogue (see AiTutorMisconceptionModal) — everything else bridges to the real generic AI tutor chat. */
const MISCONCEPTION_OVERLAY_ID = "q22";

function QuestionAuditCard({ q, onOpenMisconception }: { q: QuestionAudit; onOpenMisconception: () => void }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_ICON[q.status];
  const pointsTone = q.status === "correct" ? "text-tertiary bg-tertiary-container/20" : q.status === "incorrect" ? "text-error bg-error-container/20" : "text-primary bg-primary-container/20";

  return (
    <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container p-space-md shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${status.tone}`}>
            <Icon name={status.icon} className="text-[16px]" />
          </span>
          <span className="text-sm font-bold text-on-surface">
            {q.id.toUpperCase()} · {q.topic}
          </span>
        </div>
        <span className={`rounded px-2 py-0.5 text-sm font-semibold ${pointsTone}`}>
          +{q.pointsEarned.toFixed(2)} / {q.pointsTotal.toFixed(2)} Pts
        </span>
      </div>

      <p className="text-sm text-on-surface-variant">&ldquo;{q.prompt}&rdquo;</p>

      <div
        className={`flex items-start gap-2 rounded-lg p-2.5 ${q.status === "incorrect" ? "bg-error-container/10" : "bg-surface-container-low"}`}
      >
        <Icon
          name={q.status === "correct" ? "task_alt" : q.status === "incorrect" ? "cancel" : "info"}
          className={`mt-0.5 shrink-0 text-[18px] ${q.status === "correct" ? "text-tertiary" : q.status === "incorrect" ? "text-error" : "text-primary"}`}
        />
        <div className="text-sm">
          <p className={q.status === "incorrect" ? "font-medium text-error" : "font-medium text-on-surface"}>{q.selectedLabel}</p>
          <p className="text-xs text-outline">{q.selectedNote}</p>
        </div>
      </div>

      {q.correctLabel && (
        <div className="flex items-start gap-2 rounded-lg bg-tertiary-container/10 p-2.5">
          <Icon name="check_circle" className="mt-0.5 shrink-0 text-[18px] text-tertiary" />
          <div className="text-sm">
            <p className="font-medium text-tertiary">{q.correctLabel}</p>
            <p className="text-xs text-on-surface-variant">{q.correctNote}</p>
          </div>
        </div>
      )}

      {q.derivation && (
        <>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center justify-between pt-1 text-sm font-medium text-secondary transition-colors hover:text-secondary-fixed"
          >
            <span>View step-by-step mathematical derivation</span>
            <Icon name={expanded ? "expand_less" : "expand_more"} className="text-[18px]" />
          </button>
          {expanded && (
            <div className="flex flex-col gap-1 border-t border-surface-variant/40 pt-2 text-sm text-on-surface-variant">
              {q.derivation.map((line, i) => (
                <p key={i} className="font-code text-xs text-on-surface">
                  {line}
                </p>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex items-center justify-between pt-1">
        {q.status !== "correct" ? (
          <button
            type="button"
            onClick={() => {
              if (q.id === MISCONCEPTION_OVERLAY_ID) {
                onOpenMisconception();
                return;
              }
              navigate("/student/chat/ai-tutor", {
                state: {
                  initialQuestion: `Can you explain question ${q.id.toUpperCase()} (${q.topic})? I answered "${q.selectedLabel}" but that was wrong — walk me through why.`,
                },
              });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-fixed"
          >
            <Icon name="auto_fix_high" className="text-[18px]" />
            Explain with AI Tutor
          </button>
        ) : (
          <span />
        )}
        <span className="text-xs text-outline">Spent {q.timeSpent}</span>
      </div>
    </div>
  );
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "correct", label: "Correct", tone: "tertiary" as const },
  { id: "incorrect", label: "Incorrect", tone: "error" as const },
  { id: "partial", label: "Partial" },
];

export function QuestionAuditList() {
  const [filter, setFilter] = useState("all");
  const [misconceptionOpen, setMisconceptionOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: QUESTION_AUDIT.length,
      correct: QUESTION_AUDIT.filter((q) => q.status === "correct").length,
      incorrect: QUESTION_AUDIT.filter((q) => q.status === "incorrect").length,
      partial: QUESTION_AUDIT.filter((q) => q.status === "partial").length,
    }),
    [],
  );

  const filtered = filter === "all" ? QUESTION_AUDIT : QUESTION_AUDIT.filter((q) => q.status === filter);

  return (
    <div className="flex flex-col gap-space-sm pt-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-headline text-lg font-semibold text-on-surface">Question Audit</h2>
        <span className="font-code text-xs text-secondary">{QUESTION_AUDIT.length} sample items</span>
      </div>

      <FilterChips
        chips={FILTERS.map((f) => ({ ...f, label: `${f.label} (${counts[f.id as keyof typeof counts]})` }))}
        activeId={filter}
        onChange={setFilter}
      />

      <div className="flex flex-col gap-space-sm">
        {filtered.map((q) => (
          <QuestionAuditCard key={q.id} q={q} onOpenMisconception={() => setMisconceptionOpen(true)} />
        ))}
      </div>

      <AiTutorMisconceptionModal open={misconceptionOpen} onClose={() => setMisconceptionOpen(false)} />
    </div>
  );
}
