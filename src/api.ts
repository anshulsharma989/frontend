/** API client. All calls go through the Vite dev proxy (/api → backend). */

import type {
  Analytics,
  AuthResponse,
  ChatRequest,
  DocumentInfo,
  Grade,
  QuizQuestion,
  StreamEvent,
  Subject,
  User,
} from "./types";

const BASE = "/api";
const TOKEN_KEY = "educator_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function checkOk(res: Response): Promise<Response> {
  if (!res.ok) {
    if (res.status === 401) setToken(null); // session expired/revoked
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

function jsonRequest(path: string, method: string, body?: unknown): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  }).then(checkOk);
}

// --- Auth ---

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await jsonRequest("/auth/login", "POST", { email, password });
  return res.json();
}

export async function signup(payload: {
  email: string;
  password: string;
  full_name: string;
  grade_id: number;
}): Promise<{ id: number; email: string; status: string }> {
  const res = await jsonRequest("/auth/signup", "POST", payload);
  return res.json();
}

export async function getCurrentUser(): Promise<User> {
  const res = await fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then(checkOk);
  return res.json();
}

// --- Grades / subjects ---

export async function getGrades(): Promise<Grade[]> {
  const res = await fetch(`${BASE}/grades`).then(checkOk);
  return res.json();
}

export async function getSubjects(gradeId?: number): Promise<Subject[]> {
  const qs = gradeId != null ? `?grade_id=${gradeId}` : "";
  const res = await fetch(`${BASE}/subjects${qs}`, { headers: authHeaders() }).then(checkOk);
  return res.json();
}

export async function createGrade(name: string): Promise<Grade> {
  const res = await jsonRequest("/admin/grades", "POST", { name });
  return res.json();
}

export async function deleteGrade(id: number): Promise<void> {
  await jsonRequest(`/admin/grades/${id}`, "DELETE");
}

export async function createSubject(gradeId: number, name: string): Promise<Subject> {
  const res = await jsonRequest("/admin/subjects", "POST", { grade_id: gradeId, name });
  return res.json();
}

export async function deleteSubject(id: number): Promise<void> {
  await jsonRequest(`/admin/subjects/${id}`, "DELETE");
}

// --- Admin: pending user approvals ---

export async function listPendingUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/admin/users/pending`, { headers: authHeaders() }).then(checkOk);
  return res.json();
}

export async function approveUser(id: number): Promise<User> {
  const res = await jsonRequest(`/admin/users/${id}/approve`, "POST");
  return res.json();
}

export async function rejectUser(id: number): Promise<User> {
  const res = await jsonRequest(`/admin/users/${id}/reject`, "POST");
  return res.json();
}

/** POST /chat/ask/stream — yields parsed SSE events as they arrive. */
export async function* streamChat(request: ChatRequest): AsyncGenerator<StreamEvent> {
  const res = await checkOk(
    await fetch(`${BASE}/chat/ask/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
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
  await jsonRequest(`/chat/messages/${messageId}/feedback`, "POST", { rating });
}

export async function listDocuments(): Promise<DocumentInfo[]> {
  const res = await fetch(`${BASE}/admin/documents`, { headers: authHeaders() }).then(checkOk);
  return res.json();
}

export async function uploadDocument(form: FormData): Promise<DocumentInfo> {
  const res = await checkOk(
    await fetch(`${BASE}/admin/documents`, { method: "POST", body: form, headers: authHeaders() }),
  );
  return res.json();
}

export async function deleteDocument(id: number): Promise<void> {
  await jsonRequest(`/admin/documents/${id}`, "DELETE");
}

export async function generateQuiz(params: {
  grade_id?: number;
  subject_id?: number;
  num_questions?: number;
}): Promise<QuizQuestion[]> {
  const res = await jsonRequest("/quiz", "POST", params);
  const data = await res.json();
  return data.questions as QuizQuestion[];
}

export async function getAnalytics(): Promise<Analytics> {
  const res = await fetch(`${BASE}/admin/analytics`, { headers: authHeaders() }).then(checkOk);
  return res.json();
}
