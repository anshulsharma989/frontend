/** Types mirroring the backend API schemas. */

export interface Source {
  index: number;
  document_title: string;
  subject: string | null;
  page_number: number | null;
}

export type StreamEvent =
  | { type: "start"; conversation_id: number }
  | { type: "token"; text: string }
  | { type: "done"; message_id: number; sources: Source[] }
  | { type: "error"; detail: string };

export interface ChatRequest {
  question: string;
  conversation_id?: number | null;
  grade?: string | null;
  subject?: string | null;
}

export interface DocumentInfo {
  id: number;
  title: string;
  subject: string | null;
  grade: string | null;
  language: string;
  file_type: string;
  status: "queued" | "processing" | "ready" | "failed";
  error: string | null;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer_index: number;
  explanation?: string;
}

export interface Analytics {
  total_questions: number;
  feedback: { helpful: number; not_helpful: number };
  recent_questions: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  messageId?: number;
  sources?: Source[];
  rating?: 1 | -1 | null;
  streaming?: boolean;
  failed?: boolean;
}
