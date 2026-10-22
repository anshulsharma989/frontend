import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-outline-variant bg-surface-container-low p-space-md shadow-sm ${className}`}
      {...props}
    />
  );
}
