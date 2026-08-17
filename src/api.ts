/** API client. All calls go through the Vite dev proxy (/api → backend). */

import type {
  Analytics,
  ChatRequest,
  DocumentInfo,
  QuizQuestion,
  StreamEvent,
} from "./types";

const BASE = "/api";

async function checkOk(res: Response): Promise<Response> {
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
    } catch {
      /* keep statusText */
    }
    throw new Error(detail);
  }
  return res;
}

/** POST /chat/ask/stream — yields parsed SSE events as they arrive. */
export async function* streamChat(request: ChatRequest): AsyncGenerator<StreamEvent> {
  const res = await checkOk(
    await fetch(`${BASE}/chat/ask/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    }),
  );
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    // SSE events are separated by a blank line
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";
    for (const raw of events) {
      const line = raw.trim();
      if (line.startsWith("data: ")) {
        yield JSON.parse(line.slice(6)) as StreamEvent;
      }
    }
  }
}

export async function sendFeedback(messageId: number, rating: 1 | -1): Promise<void> {
  await checkOk(
    await fetch(`${BASE}/chat/messages/${messageId}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    }),
  );
}

export async function listDocuments(): Promise<DocumentInfo[]> {
  const res = await checkOk(await fetch(`${BASE}/admin/documents`));
  return res.json();
}

export async function uploadDocument(form: FormData): Promise<DocumentInfo> {
  const res = await checkOk(
    await fetch(`${BASE}/admin/documents`, { method: "POST", body: form }),
  );
  return res.json();
}

export async function deleteDocument(id: number): Promise<void> {
  await checkOk(await fetch(`${BASE}/admin/documents/${id}`, { method: "DELETE" }));
}

export async function generateQuiz(params: {
  grade?: string;
  subject?: string;
  num_questions?: number;
}): Promise<QuizQuestion[]> {
  const res = await checkOk(
    await fetch(`${BASE}/quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }),
  );
  const data = await res.json();
  return data.questions as QuizQuestion[];
}

export async function getAnalytics(): Promise<Analytics> {
  const res = await checkOk(await fetch(`${BASE}/admin/analytics`));
  return res.json();
}
