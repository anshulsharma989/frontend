import { Icon } from "../ui/Icon";

interface RolePreviewToggleProps {
  active: boolean;
  onToggle: () => void;
}

/**
 * Lets an admin preview the Teacher workspace client-side — there's no
 * teacher role in the backend yet (see pending-backend-work.md), so this is
 * the only way to see those screens today. Mirrors the "Admin ↔ Teacher"
 * role-swap pill present in the original Stitch designs.
 */
export function RolePreviewToggle({ active, onToggle }: RolePreviewToggleProps) {
  if (active) {
    return (
      <button
        type="button"
        onClick={onToggle}
        title="No real teacher accounts exist yet — this is a preview using your admin session"
        className="flex min-h-[36px] items-center gap-1.5 rounded-full bg-tertiary/15 px-3 py-1.5 text-xs font-semibold text-tertiary transition-colors hover:bg-tertiary/25"
      >
        <Icon name="visibility" className="text-[16px]" />
        Previewing as Teacher
        <Icon name="close" className="text-[14px]" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex min-h-[36px] items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:text-on-surface"
    >
      <Icon name="co_present" className="text-[16px]" />
      Preview as Teacher
    </button>
  );
}
