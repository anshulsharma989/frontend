import { ReactNode } from "react";
import { brand } from "../../config/brand";
import { Icon } from "../ui/Icon";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, onBack, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-space-lg py-space-xl text-on-background">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-space-lg top-space-lg flex items-center gap-1.5 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
      >
        <Icon name="arrow_back" className="text-[18px]" />
        Back
      </button>

      <div className="mb-space-lg flex items-center gap-space-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary text-on-primary">
          <Icon name={brand.logoIcon} className="text-[20px]" />
        </div>
        <span className="font-headline text-lg font-bold text-on-surface">{brand.name}</span>
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-surface-container-low p-space-lg shadow-xl">
        <h1 className="font-headline text-xl font-semibold text-on-surface">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
        <div className="mt-space-md flex flex-col gap-space-sm">{children}</div>
      </div>
    </div>
  );
}
