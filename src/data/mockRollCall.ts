/**
 * Sample roster for daily_attendance_tracking_roll_call_logger. There is no
 * attendance backend at all yet (see pending-backend-work.md) — statuses are
 * interactive locally (click P/L/A/E) but nothing persists.
 */

export type RollCallStatus = "P" | "L" | "A" | "E";

export interface RollCallEntry {
  id: string;
  name: string;
  seat: string;
  status: RollCallStatus;
  checkinNote: string;
  checkinTone: "tertiary" | "secondary-container" | "error" | "secondary";
  badge?: { label: string; icon?: string; tone: "tertiary" | "secondary" | "error" };
  infoPanel?: { icon: string; text: string; trailing?: string };
  alert?: { message: string };
}

export const ROLL_CALL_ROSTER: RollCallEntry[] = [
  {
    id: "#SC-8921",
    name: "Alex Rivera",
    seat: "Seat A-12",
    status: "P",
    checkinNote: "09:12 AM (NFC gate)",
    checkinTone: "tertiary",
    badge: { label: "18d streak", icon: "local_fire_department", tone: "tertiary" },
  },
  {
    id: "#SC-8842",
    name: "Elena Rostova",
    seat: "Seat A-14",
    status: "L",
    checkinNote: "09:22 AM (+7m late)",
    checkinTone: "secondary-container",
    infoPanel: { icon: "info", text: "Transit notice received via parent app", trailing: "Edit" },
  },
  {
    id: "#SC-9014",
    name: "Marcus Vance",
    seat: "Seat B-04",
    status: "A",
    checkinNote: "Unverified / no badge",
    checkinTone: "error",
    badge: { label: "Unexcused", tone: "error" },
    alert: { message: "Consecutive absence — auto-SMS sent to guardian at 09:18 AM." },
  },
  {
    id: "#SC-9102",
    name: "Chloe Chen",
    seat: "Seat B-08",
    status: "E",
    checkinNote: "Authorized absence",
    checkinTone: "secondary",
    badge: { label: "Official duty", tone: "secondary" },
    infoPanel: { icon: "description", text: "📎 Olympiad_Permit.pdf", trailing: "Dean verified" },
  },
  {
    id: "#SC-8955",
    name: "David Kalu",
    seat: "Seat C-01",
    status: "P",
    checkinNote: "09:08 AM",
    checkinTone: "tertiary",
    badge: { label: "99.4% face match", icon: "face", tone: "tertiary" },
  },
];
