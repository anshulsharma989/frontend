import { brand } from "../../config/brand";
import { Icon } from "../ui/Icon";

export function HomeFooter({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) {
  return (
    <footer className="border-t border-outline-variant/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-space-md px-space-lg py-space-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-secondary text-on-primary">
            <Icon name={brand.logoIcon} className="text-[16px]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-headline text-sm font-bold text-on-surface">{brand.name}</span>
            <span className="text-xs text-on-surface-variant">{brand.tagline}</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-space-md text-sm text-on-surface-variant">
          <a href="#how-it-works" className="hover:text-on-surface">
            How it works
          </a>
          <a href="#students" className="hover:text-on-surface">
            For students
          </a>
          <a href="#admins" className="hover:text-on-surface">
            For admins
          </a>
          <a href="#faq" className="hover:text-on-surface">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-space-sm">
          <button type="button" onClick={onLogin} className="text-sm font-medium text-on-surface-variant hover:text-on-surface">
            Log in
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary-container"
          >
            Get started
          </button>
        </div>
      </div>
      <p className="border-t border-outline-variant/40 px-space-lg py-space-sm text-center text-xs text-on-surface-variant">
        {brand.name} — {brand.tagline}
      </p>
    </footer>
  );
}
