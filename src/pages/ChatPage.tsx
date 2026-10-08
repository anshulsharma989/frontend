import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { getGrades, getSubjects, sendFeedback, streamChat } from "../api";
import { useAuth } from "../auth";
import type { ChatMessage, Grade, Source, Subject } from "../types";

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again after some time.";

/** Renders **bold**, *italic*, and [n] citation markers backed by `sources`. */
function renderFormatted(text: string, sources: Source[]): ReactNode[] {
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(\d+)\]/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key++}>{match[2]}</em>);
    } else if (match[3] !== undefined) {
      const index = Number(match[3]);
      const source = sources.find((s) => s.index === index);
      const label = source
        ? `${source.document_title}${source.page_number ? ` · p.${source.page_number}` : ""}`
        : `Source ${index}`;
      nodes.push(
        <sup key={key++} className="citation" title={label}>
          {index}
        </sup>,
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function SourceChips({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  // De-duplicate identical book+page pairs
  const seen = new Set<string>();
  const unique = sources.filter((s) => {
    const key = `${s.document_title}|${s.page_number}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return (
    <div className="sources">
      {unique.map((s) => (
        <span key={s.index} className="chip" title={s.subject ?? undefined}>
          {s.document_title}
          {s.page_number ? ` · p.${s.page_number}` : ""}
        </span>
      ))}
    </div>
  );
}

function Feedback({
  messageId,
  rating,
  onRated,
}: {
  messageId: number;
  rating: 1 | -1 | null | undefined;
  onRated: (r: 1 | -1) => void;
}) {
  const rate = async (r: 1 | -1) => {
    try {
      await sendFeedback(messageId, r);
      onRated(r);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="feedback">
      <button
        className={rating === 1 ? "fb active" : "fb"}
        onClick={() => rate(1)}
        title="Helpful"
      >
        👍
      </button>
      <button
        className={rating === -1 ? "fb active" : "fb"}
        onClick={() => rate(-1)}
        title="Not helpful"
      >
        👎
      </button>
    </div>
  );
}

export default function ChatPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Admins pick a grade explicitly; students are scoped to their own grade server-side.
  useEffect(() => {
    if (isAdmin) getGrades().then(setGrades).catch(() => {});
  }, [isAdmin]);

  useEffect(() => {
    const scopeGradeId = isAdmin ? gradeId ?? undefined : undefined;
    getSubjects(scopeGradeId).then(setSubjects).catch(() => {});
  }, [isAdmin, gradeId]);

  const newChat = () => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || busy) return;
    setInput("");
    setError(null);
    setBusy(true);
    setMessages((m) => [
      ...m,
      { role: "user", content: question },
      { role: "assistant", content: "", streaming: true },
    ]);

    const updateLast = (patch: Partial<ChatMessage>) =>
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], ...patch };
        return copy;
      });

    try {
      let answer = "";
      for await (const event of streamChat({
        question,
        conversation_id: conversationId,
        grade_id: isAdmin ? gradeId : null,
        subject_id: subjectId,
      })) {
        if (event.type === "start") {
          setConversationId(event.conversation_id);
        } else if (event.type === "token") {
          answer += event.text;
          updateLast({ content: answer });
        } else if (event.type === "done") {
          updateLast({
            streaming: false,
            messageId: event.message_id,
            sources: event.sources,
          });
        } else if (event.type === "error") {
          throw new Error(event.detail);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = {
          ...last,
          streaming: false,
          failed: true,
          content: last.content || FALLBACK_ERROR_MESSAGE,
        };
        return copy;
      });
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-toolbar">
        {isAdmin ? (
          <select
            className="small-input"
            value={gradeId ?? ""}
            onChange={(e) => setGradeId(e.target.value ? Number(e.target.value) : null)}
            disabled={conversationId !== null}
            title={conversationId !== null ? "Filters are fixed per conversation" : ""}
          >
            <option value="">All grades</option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="dim">{user?.grade_name}</span>
        )}
        <select
          className="small-input"
          value={subjectId ?? ""}
          onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : null)}
          disabled={conversationId !== null}
        >
          <option value="">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button className="secondary" onClick={newChat}>
          + New chat
        </button>
      </div>

      <div className="messages">
        {messages.length === 0 && (
          <div className="empty">
            Ask anything from your books — in English or हिन्दी.
            <br />
            <span className="dim">Follow-up questions are understood in context.</span>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`bubble-row ${m.role}`}>
            <div className={`bubble ${m.role}${m.failed ? " failed" : ""}`}>
              <div className="bubble-text">
                {m.content
                  ? renderFormatted(m.content, m.sources ?? [])
                  : m.streaming
                    ? "…"
                    : ""}
                {m.streaming && m.content && <span className="cursor">▍</span>}
              </div>
              {m.role === "assistant" && !m.streaming && m.sources && (
                <SourceChips sources={m.sources} />
              )}
              {m.role === "assistant" && !m.streaming && m.messageId != null && (
                <Feedback
                  messageId={m.messageId}
                  rating={m.rating}
                  onRated={(r) =>
                    setMessages((all) =>
                      all.map((msg, j) => (j === i ? { ...msg, rating: r } : msg)),
                    )
                  }
                />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {error && <div className="error">⚠️ {error}</div>}

      <form className="composer" onSubmit={submit}>
        <input
          autoFocus
          placeholder={busy ? "Thinking…" : "Ask a question…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
