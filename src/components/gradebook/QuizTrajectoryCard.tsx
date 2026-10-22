import type { SubjectGradebook } from "../../data/mockGradebook";
import { Icon } from "../ui/Icon";

const WIDTH = 320;
const HEIGHT = 80;
const PAD_X = 10;

export function QuizTrajectoryCard({ subject }: { subject: SubjectGradebook }) {
  const values = subject.trajectory.map((t) => t.pct);
  const min = Math.min(...values) - 3;
  const max = Math.max(...values) + 3;
  const range = max - min || 1;
  const stepX = subject.trajectory.length > 1 ? (WIDTH - PAD_X * 2) / (subject.trajectory.length - 1) : 0;

  const points = subject.trajectory.map((t, i) => ({
    x: PAD_X + i * stepX,
    y: HEIGHT - ((t.pct - min) / range) * HEIGHT,
    label: t.label,
    pct: t.pct,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${PAD_X},${HEIGHT} ${polyline} ${points[points.length - 1]?.x ?? PAD_X},${HEIGHT}`;

  return (
    <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container p-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="ssid_chart" className="text-[22px] text-secondary" />
          <span className="font-headline text-base font-semibold text-on-surface">Quiz Trajectory</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-tertiary-container/20 px-2 py-0.5 font-code text-xs text-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
          {subject.trajectoryTrend}
        </span>
      </div>

      <div className="flex flex-col justify-between overflow-hidden rounded-lg bg-surface-container-lowest/60 p-2.5">
        <svg className="h-24 w-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <defs>
            <linearGradient id={`grad-${subject.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill={`url(#grad-${subject.id})`} points={area} />
          <polyline fill="none" points={polyline} stroke="#4cd7f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === points.length - 1 ? 4.5 : 3.5}
              className={i === points.length - 1 ? "fill-tertiary" : "fill-surface"}
              stroke={i === points.length - 1 ? "#ffffff" : "#d0bcff"}
              strokeWidth="2"
            />
          ))}
        </svg>
        <div className="flex justify-between px-1 font-code text-[11px] text-outline">
          {subject.trajectory.map((t, i) => (
            <span key={t.label} className={i === subject.trajectory.length - 1 ? "font-bold text-secondary" : ""}>
              {t.label} ({t.pct}%)
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-on-surface-variant">Class Cohort Benchmark</span>
          <span className="font-code text-xs text-secondary">Top Quartile</span>
        </div>
        <div className="flex h-8 items-center justify-between rounded-lg bg-surface-container-high px-3 text-sm">
          <div className="flex items-center gap-1 text-outline">
            <span className="h-3 w-1.5 rounded-full bg-outline" />
            <span className="font-code text-xs">Median: {subject.cohortMedianPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 rounded bg-secondary/20 px-2 py-0.5 text-secondary shadow-[0_0_10px_rgba(76,215,246,0.3)]">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="font-code text-xs font-bold">You: {subject.courseAveragePct}%</span>
          </div>
          <div className="flex items-center gap-1 text-tertiary">
            <span className="font-code text-xs">Max: {subject.cohortMaxPct}%</span>
            <span className="h-3 w-1.5 rounded-full bg-tertiary" />
          </div>
        </div>
      </div>
    </section>
  );
}
