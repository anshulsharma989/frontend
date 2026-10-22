import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatThreadRow } from "../../components/chat/ChatThreadRow";
import { PinnedAiTutorCard } from "../../components/chat/PinnedAiTutorCard";
import { FilterChips } from "../../components/ui/FilterChips";
import { Icon } from "../../components/ui/Icon";
import { SearchInput } from "../../components/ui/SearchInput";
import { CHAT_THREADS } from "../../data/mockChatHub";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI Tutors" },
  { id: "groups", label: "Study Groups" },
  { id: "faculty", label: "Instructors" },
  { id: "unread", label: "Unread", tone: "error" as const },
];

export default function StudentChatHubPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [prompt, setPrompt] = useState("");

  const threads = useMemo(() => {
    if (filter === "ai") return [];
    const q = search.trim().toLowerCase();
    return CHAT_THREADS.filter((t) => {
      const matchesSearch = !q || `${t.title} ${t.subtitle} ${t.snippet}`.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || (filter === "unread" ? (t.unreadCount ?? 0) > 0 : t.category === filter);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const send = () => {
    const question = prompt.trim();
    if (!question) return;
    navigate("/student/chat/ai-tutor", { state: { initialQuestion: question } });
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-space-md pb-24">
      <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-high px-space-md py-2.5 text-sm text-on-surface-variant">
        <Icon name="visibility" className="mt-0.5 shrink-0 text-[18px] text-secondary" />
        <span>
          The AI Tutor card and composer below are real (they open the actual AI Q&amp;A chat). Study-group and
          instructor threads have no messaging backend yet — see{" "}
          <code className="rounded bg-surface-container px-1 py-0.5 text-xs">pending-backend-work.md</code>.
        </span>
      </div>

      <div>
        <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">Messages &amp; Hub</h1>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search chats, formulas, notes, or classmates…" />
      <FilterChips chips={FILTERS} activeId={filter} onChange={setFilter} />

      <PinnedAiTutorCard />

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="font-headline text-base font-bold text-on-surface">Recent Threads</span>
          <span className="rounded-full bg-surface-container px-2 py-0.5 text-xs font-bold text-on-surface-variant">
            {threads.length}
          </span>
        </div>
        <button
          type="button"
          disabled
          title="Not implemented yet"
          className="flex cursor-not-allowed items-center gap-0.5 text-sm font-bold text-primary opacity-50"
        >
          Mark all read
          <Icon name="done_all" className="text-[16px]" />
        </button>
      </div>

      {filter === "ai" ? (
        <p className="rounded-xl bg-surface-container-high p-space-md text-sm text-on-surface-variant">
          There's only one AI tutor chat right now — use the pinned card above.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {threads.map((t) => (
            <ChatThreadRow key={t.id} thread={t} />
          ))}
          {threads.length === 0 && <p className="text-sm text-on-surface-variant">No threads match this filter.</p>}
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-2xl px-space-lg pb-space-md lg:px-0">
        <div className="flex flex-col gap-2 rounded-2xl bg-surface-container-lowest p-2.5 shadow-[0_8px_24px_rgba(124,58,237,0.15)]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-primary">
              <Icon name="auto_awesome" className="text-[16px]" />
              <span className="text-sm font-bold">Ask AI Tutor anything</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-surface-container-low px-2 py-1.5">
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-on-surface-variant opacity-50"
            >
              <Icon name="document_scanner" className="text-[20px]" />
            </button>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-on-surface-variant opacity-50"
            >
              <Icon name="mic" className="text-[20px]" />
            </button>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="e.g. 'Summarize today's Physics lab derivations'…"
              className="min-w-0 flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
            />
            <button
              type="button"
              onClick={send}
              disabled={!prompt.trim()}
              aria-label="Send to AI tutor"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary shadow transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="send" className="text-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
