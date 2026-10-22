import { brand } from "../../config/brand";
import { Icon } from "../ui/Icon";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HomeNavProps {
  onLogin: () => void;
  onSignup: () => void;
}

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#students", label: "For students" },
  { href: "#admins", label: "For admins" },
  { href: "#faq", label: "FAQ" },
];

export function HomeNav({ onLogin, onSignup }: HomeNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/60 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-space-lg py-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary text-on-primary">
            <Icon name={brand.logoIcon} className="text-[20px]" />
          </div>
          <span className="font-headline text-lg font-bold text-on-surface">{brand.name}</span>
        </div>

        <nav className="hidden items-center gap-space-md md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <ThemeToggle />
          <button
            type="button"
            onClick={onLogin}
            className="rounded-full px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onSignup}
            className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary-container shadow-md transition-transform active:scale-95"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
