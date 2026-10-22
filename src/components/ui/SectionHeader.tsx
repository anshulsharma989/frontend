import { ReactNode } from "react";
import { Icon } from "./Icon";

type Tone = "primary" | "secondary" | "tertiary";

const TONE_TEXT: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

interface SectionHeaderProps {
  icon: string;
  title: string;
  trailing?: ReactNode;
  tone?: Tone;
}

/** Recurring "icon + title + trailing badge/link" header used atop dashboard cards. */
export function SectionHeader({ icon, title, trailing, tone = "primary" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-space-sm">
      <div className="flex items-center gap-2">
        <Icon name={icon} className={`text-[20px] ${TONE_TEXT[tone]}`} />
        <h2 className="font-headline text-lg font-semibold text-on-surface">{title}</h2>
      </div>
      {trailing}
    </div>
  );
}
