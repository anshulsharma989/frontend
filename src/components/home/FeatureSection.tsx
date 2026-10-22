import { ReactNode } from "react";
import { Icon } from "../ui/Icon";

interface FeatureSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visual: ReactNode;
  reverse?: boolean;
}

export function FeatureSection({ id, eyebrow, title, description, bullets, visual, reverse }: FeatureSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 bg-surface-container-lowest/40">
      <div
        className={`mx-auto flex max-w-5xl flex-col items-center gap-space-xl px-space-lg py-space-xl sm:flex-row ${
          reverse ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div className="flex flex-1 flex-col gap-space-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{eyebrow}</span>
          <h2 className="font-headline text-2xl font-bold text-on-surface sm:text-3xl">{title}</h2>
          <p className="text-base text-on-surface-variant">{description}</p>
          <ul className="mt-2 flex flex-col gap-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-on-surface">
                <Icon name="check_circle" className="mt-0.5 shrink-0 text-[18px] text-tertiary" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 items-center justify-center">{visual}</div>
      </div>
    </section>
  );
}
