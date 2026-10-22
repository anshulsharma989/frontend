import { useEffect, useState } from "react";
import { getGrades, getSubjects } from "../../api";
import type { Grade, Subject } from "../../types";
import { Icon } from "../ui/Icon";
import { Modal } from "../ui/Modal";
import { ToggleSwitch } from "../ui/ToggleSwitch";

type Role = "student" | "faculty";
type PasswordStrategy = "invite" | "temp";

const inputClass =
  "w-full rounded-lg bg-surface-container-high px-3 py-2.5 text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-highest focus:outline-none transition-colors";

function emptyState(role: Role) {
  return {
    role,
    elevatedAccess: false,
    firstName: "",
    lastName: "",
    email: "",
    gradeId: "" as number | "",
    subjectId: "" as number | "",
    guardianEmail: "",
    guardianPhone: "",
    pwdStrategy: "invite" as PasswordStrategy,
    enforce2fa: true,
    biometric: true,
  };
}

interface AddUserWizardModalProps {
  open: boolean;
  onClose: () => void;
  /** Which role the form opens pre-set to — the role selector can still override it. */
  defaultRole?: Role;
}

export function AddUserWizardModal({ open, onClose, defaultRole = "student" }: AddUserWizardModalProps) {
  const [form, setForm] = useState(() => emptyState(defaultRole));
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(emptyState(defaultRole));
      setSubmitted(false);
      getGrades().then(setGrades).catch(() => {});
      getSubjects().then(setAllSubjects).catch(() => {});
    }
  }, [open, defaultRole]);

  useEffect(() => {
    if (form.gradeId === "") {
      setSubjects([]);
      return;
    }
    getSubjects(form.gradeId).then(setSubjects).catch(() => {});
  }, [form.gradeId]);

  const set = <K extends keyof ReturnType<typeof emptyState>>(key: K, value: ReturnType<typeof emptyState>[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canSubmit = form.firstName.trim() !== "" && form.lastName.trim() !== "" && form.email.trim() !== "";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New User"
      icon="badge"
      maxWidthClassName="max-w-2xl"
      footer={
        submitted ? (
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-surface-container-highest py-3 text-sm font-semibold text-on-surface hover:bg-surface-bright"
          >
            Close
          </button>
        ) : (
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                disabled
                title="Drafts aren't supported yet"
                className="w-1/3 cursor-not-allowed rounded-xl bg-surface-container-high py-3 text-sm font-semibold text-on-surface opacity-50"
              >
                Save draft
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => setSubmitted(true)}
                className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-container via-primary to-secondary py-3 text-sm font-semibold text-on-primary-container shadow-lg transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Create &amp; issue credentials</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>
            </div>
            <button
              type="button"
              disabled
              title="Not implemented yet"
              className="flex cursor-not-allowed items-center justify-center gap-1.5 text-sm text-on-surface-variant opacity-50"
            >
              <Icon name="upload_file" className="text-[16px]" />
              Need to enroll a whole class? Import CSV / SIS roster instead
            </button>
          </div>
        )
      }
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-space-sm rounded-xl bg-surface-container py-space-xl text-center">
          <Icon name="info" className="text-4xl text-secondary" />
          <p className="max-w-sm text-sm text-on-surface-variant">
            This is a UI preview — no account was actually created. There's no backend endpoint yet for an admin to
            directly provision a user (photo upload, RFID, 2FA, and CSV import are all unimplemented too). See{" "}
            <code className="rounded bg-surface-container-highest px-1 py-0.5 text-xs">pending-backend-work.md</code>.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-on-surface-variant">Enroll a student or invite a faculty member to SchoolCore.</p>

          {/* Role */}
          <section className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-on-surface">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container/30 font-code text-xs text-primary">
                  1
                </span>
                Role archetype
              </span>
            </div>
            <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
              {(
                [
                  { id: "student", label: "Student", tag: "Learner tier", icon: "school", desc: "Enrolled learner with course dashboard and quiz access." },
                  { id: "faculty", label: "Teacher / Faculty", tag: "Educator tier", icon: "local_library", desc: "Educator with grading, attendance, and roster control." },
                ] as const
              ).map((opt) => {
                const active = form.role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => set("role", opt.id)}
                    className={`relative flex items-start gap-space-sm rounded-xl p-space-md text-left transition-colors ${
                      active ? "bg-primary/10 ring-1 ring-primary" : "bg-surface-container-low hover:bg-surface-container"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-primary-container/20 text-primary" : "bg-surface-container-highest text-on-surface-variant"
                      }`}
                    >
                      <Icon name={opt.icon} className="text-[22px]" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="font-headline text-sm font-semibold text-on-surface">{opt.label}</span>
                      <span className="text-xs text-on-surface-variant">{opt.desc}</span>
                    </div>
                    {active && (
                      <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-on-primary">
                        <Icon name="check" className="text-[14px]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <label className="flex items-center justify-between rounded-lg bg-surface-container-high p-space-sm">
              <span className="flex items-center gap-2 text-sm text-on-surface">
                <Icon name="admin_panel_settings" className="text-[18px] text-outline" />
                Teaching assistant / lab moderator elevated access
              </span>
              <input
                type="checkbox"
                checked={form.elevatedAccess}
                onChange={(e) => set("elevatedAccess", e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
            </label>
          </section>

          {/* Personal & identity */}
          <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
            <span className="flex items-center gap-1.5 text-sm font-medium text-on-surface">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container/30 font-code text-xs text-primary">
                2
              </span>
              Personal &amp; identity
            </span>

            <div className="flex items-center gap-space-md rounded-lg bg-surface-container p-space-sm">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-container-highest text-outline">
                <Icon name="account_circle" className="text-[36px]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled
                    title="Photo upload isn't wired to a backend yet"
                    className="flex cursor-not-allowed items-center gap-1 rounded-lg bg-surface-container-highest px-3 py-1.5 text-xs font-medium text-on-surface opacity-50"
                  >
                    <Icon name="upload_file" className="text-[16px]" />
                    Upload photo
                  </button>
                  <button
                    type="button"
                    disabled
                    title="Not implemented yet"
                    className="flex cursor-not-allowed items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary opacity-50"
                  >
                    <Icon name="auto_awesome" className="text-[16px]" />
                    AI ID synth
                  </button>
                </div>
                <span className="text-xs text-on-surface-variant">Min 600x600px PNG/JPG for the campus badge.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-on-surface-variant" htmlFor="first-name">
                  First name
                </label>
                <input
                  id="first-name"
                  className={inputClass}
                  placeholder="e.g. Maya"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-on-surface-variant" htmlFor="last-name">
                  Last name
                </label>
                <input
                  id="last-name"
                  className={inputClass}
                  placeholder="e.g. Lin"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-on-surface-variant" htmlFor="email">
                Institutional email
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                placeholder="student.name@schoolcore.edu"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </section>

          {/* Placement */}
          <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
            <span className="flex items-center gap-1.5 text-sm font-medium text-on-surface">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container/30 font-code text-xs text-primary">
                3
              </span>
              Placement
            </span>

            {form.role === "student" ? (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-on-surface-variant">Grade / cohort</label>
                  <div className="flex flex-wrap gap-2">
                    {grades.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => set("gradeId", g.id)}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          form.gradeId === g.id
                            ? "bg-primary-container text-on-primary-container shadow-sm"
                            : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        {g.name}
                      </button>
                    ))}
                    {grades.length === 0 && <p className="text-sm text-on-surface-variant">Loading grades…</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-on-surface-variant" htmlFor="subject">
                    Subject / curriculum track
                  </label>
                  <select
                    id="subject"
                    className={inputClass}
                    value={form.subjectId}
                    disabled={form.gradeId === ""}
                    onChange={(e) => set("subjectId", e.target.value ? Number(e.target.value) : "")}
                  >
                    <option value="">{form.gradeId === "" ? "Pick a grade first" : "Select a subject"}</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <input
                    type="email"
                    placeholder="Guardian email"
                    className={inputClass}
                    value={form.guardianEmail}
                    onChange={(e) => set("guardianEmail", e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Guardian phone"
                    className={inputClass}
                    value={form.guardianPhone}
                    onChange={(e) => set("guardianPhone", e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-surface-container p-space-sm">
                  <Icon name="contactless" className="text-[18px] text-secondary" />
                  <input
                    disabled
                    placeholder="NFC / RFID badge — no reader connected"
                    className={`${inputClass} cursor-not-allowed opacity-50`}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-on-surface-variant" htmlFor="dept-subject">
                    Primary subject / department
                  </label>
                  <select
                    id="dept-subject"
                    className={inputClass}
                    value={form.subjectId}
                    onChange={(e) => set("subjectId", e.target.value ? Number(e.target.value) : "")}
                  >
                    <option value="">Select a subject</option>
                    {allSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Guardian contact and RFID badge are student-only fields. Teacher-specific fields (department head,
                  certifications, sections taught) aren't designed yet — this form will grow those separately from
                  the student fields above.
                </p>
              </>
            )}
          </section>

          {/* Security */}
          <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low p-space-md">
            <span className="flex items-center gap-1.5 text-sm font-medium text-on-surface">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-container/30 font-code text-xs text-primary">
                4
              </span>
              Security &amp; credentials
            </span>

            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 rounded-lg bg-surface-container p-space-sm">
                <input
                  type="radio"
                  name="pwd-strategy"
                  checked={form.pwdStrategy === "invite"}
                  onChange={() => set("pwdStrategy", "invite")}
                  className="mt-1 accent-primary"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-on-surface">Send activation invite link via email</span>
                  <span className="text-xs text-on-surface-variant">Recommended. Token expires in 48 hours.</span>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-lg bg-surface-container p-space-sm">
                <input
                  type="radio"
                  name="pwd-strategy"
                  checked={form.pwdStrategy === "temp"}
                  onChange={() => set("pwdStrategy", "temp")}
                  className="mt-1 accent-primary"
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-on-surface">Generate temporary password</span>
                  <button
                    type="button"
                    disabled
                    title="Not implemented yet"
                    className="mt-1 w-fit cursor-not-allowed rounded bg-surface-container-highest px-2.5 py-1 text-xs text-on-surface-variant opacity-50"
                  >
                    Reveal &amp; copy
                  </button>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-surface-container p-space-sm">
              <div className="flex min-w-0 flex-col pr-2">
                <span className="text-sm font-medium text-on-surface">Enforce 2FA authenticator</span>
                <span className="text-xs text-on-surface-variant">Mandatory on first sign-in</span>
              </div>
              <ToggleSwitch checked={form.enforce2fa} onChange={(v) => set("enforce2fa", v)} label="Enforce 2FA" />
            </div>

            <label className="flex items-center gap-2.5 rounded-lg bg-surface-container p-space-sm">
              <input
                type="checkbox"
                checked={form.biometric}
                onChange={(e) => set("biometric", e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <div className="flex flex-col">
                <span className="text-sm text-on-surface">Biometric facial verification</span>
                <span className="text-xs text-on-surface-variant">Required before first proctored exam</span>
              </div>
            </label>
          </section>
        </>
      )}
    </Modal>
  );
}
