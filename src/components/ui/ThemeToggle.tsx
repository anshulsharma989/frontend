import { useTheme } from "../../theme/ThemeProvider";
import { Icon } from "./Icon";

export function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
    >
      <Icon name={isDark ? "light_mode" : "dark_mode"} className="text-[18px]" />
    </button>
  );
}
