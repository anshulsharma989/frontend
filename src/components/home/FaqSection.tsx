import { useState } from "react";
import { brand } from "../../config/brand";
import { Icon } from "../ui/Icon";

const FAQS = [
  {
    q: "What languages does it support?",
    a: "Questions and answers both work in English and Hindi — the AI tutor can mix languages in a single conversation if your books do too.",
  },
  {
    q: "How do I get an account?",
    a: "Sign up and pick your grade. A school admin reviews and approves new accounts before you can log in.",
  },
  {
    q: "Are the answers made up, or grounded in real material?",
    a: "Answers are generated from your school's actual uploaded books, with page citations — not generic internet knowledge.",
  },
  {
    q: "Is attendance, grading, or messaging available yet?",
    a: "Not yet — those are in active development. Today the platform covers AI Q&A, quiz generation, and admin content management.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-surface-container-low">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-space-sm px-space-md py-space-sm text-left"
      >
        <span className="text-sm font-medium text-on-surface">{q}</span>
        <Icon name={open ? "remove" : "add"} className="shrink-0 text-[20px] text-on-surface-variant" />
      </button>
      {open && <p className="px-space-md pb-space-sm text-sm text-on-surface-variant">{a}</p>}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-surface-container-lowest/40">
      <div className="mx-auto max-w-2xl px-space-lg py-space-xl">
        <div className="mb-space-lg text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">FAQ</span>
          <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface sm:text-3xl">Common questions</h2>
        </div>
        <div className="flex flex-col gap-space-xs">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
        <p className="mt-space-md text-center text-xs text-on-surface-variant">
          More questions? Ask your {brand.name} admin.
        </p>
      </div>
    </section>
  );
}
