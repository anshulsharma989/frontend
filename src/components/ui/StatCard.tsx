import { Icon } from "./Icon";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  tone?: "primary" | "secondary" | "tertiary";
}

const TONE_TEXT: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export function StatCard({ label, value, icon, tone = "primary" }: StatCardProps) {
  return (
    <Card className="flex items-center gap-space-md">
      {icon && (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container-high ${TONE_TEXT[tone]}`}>
          <Icon name={icon} className="text-[22px]" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-headline text-xl font-bold text-on-surface">{value}</span>
        <span className="text-sm text-on-surface-variant">{label}</span>
      </div>
    </Card>
  );
}
