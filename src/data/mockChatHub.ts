/**
 * Sample data for student_chat_study_hub. The pinned AI tutor card and the
 * bottom composer are the one real feature here — they open the actual AI
 * Q&A chat (`/chat/ask`). Group chats and instructor DMs have no backend at
 * all yet (see pending-backend-work.md), so those threads are preview-only.
 */

export interface AiQuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

export const AI_QUICK_ACTIONS: AiQuickAction[] = [
  {
    id: "review",
    label: "Review Wave Concept",
    icon: "auto_stories",
    prompt: "Can you review the concept of boundary phase inversions in wave mechanics?",
  },
  {
    id: "solve",
    label: "Solve Practice Step",
    icon: "draw",
    prompt: "Walk me through solving a practice problem on wave boundary conditions, step by step.",
  },
  { id: "custom", label: "Ask Custom", icon: "mic", prompt: "" },
];

export type ThreadCategory = "groups" | "faculty";

export interface ChatThread {
  id: string;
  category: ThreadCategory;
  title: string;
  subtitle: string;
  badge?: string;
  time: string;
  unreadCount?: number;
  snippetAuthor?: string;
  snippet: string;
  attachment?: { icon: string; name: string; size: string };
}

export const CHAT_THREADS: ChatThread[] = [
  {
    id: "t1",
    category: "groups",
    title: "PHYS-402 Wave Mechanics",
    subtitle: "18 members · Next exam Thursday",
    badge: "Lab 402",
    time: "10:42 AM",
    unreadCount: 3,
    snippetAuthor: "Elena",
    snippet: "Does anyone have the formula sheet derivation Dr. Jenkins used on slide 14?",
  },
  {
    id: "t2",
    category: "faculty",
    title: "Dr. Sarah Jenkins",
    subtitle: "Office hours active: 3:00 – 4:30 PM",
    badge: "Dept Head",
    time: "09:15 AM",
    unreadCount: 1,
    snippet: "Your lab report score is posted. Office hours are open today 3:00 - 4:30 PM if you need feedback before submission.",
  },
  {
    id: "t3",
    category: "groups",
    title: "Math Olympiad Prep Squad",
    subtitle: "Marcus, Kevin, Sophia +4 others",
    badge: "Competition",
    time: "Yesterday",
    snippetAuthor: "Marcus",
    snippet: "Uploaded 3 sample integrals for practice tonight.",
    attachment: { icon: "picture_as_pdf", name: "Calculus_Set_4_Integrals.pdf", size: "1.4 MB" },
  },
  {
    id: "t4",
    category: "faculty",
    title: "Chemistry AP: Organic Synthesis",
    subtitle: "Prof. Vance · Lecture Hall B",
    time: "Oct 22",
    snippetAuthor: "Prof. Vance",
    snippet: "Reminder to submit prep questions before Wednesday's live seminar.",
  },
];
