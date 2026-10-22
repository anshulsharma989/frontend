import { ReactNode } from "react";

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  trackClassName?: string;
  indicatorClassName?: string;
  children?: ReactNode;
}

const ARC = "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831";

/** Generic circular progress indicator (SVG, accessible size/colors via props). */
export function ProgressRing({
  percent,
  size = 80,
  strokeWidth = 3.5,
  trackClassName = "text-surface-container-highest",
  indicatorClassName = "text-primary-container",
  children,
}: ProgressRingProps) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <path className={trackClassName} d={ARC} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
        <path
          className={indicatorClassName}
          d={ARC}
          fill="none"
          stroke="currentColor"
          strokeDasharray={`${percent}, 100`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  );
}
