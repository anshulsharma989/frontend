import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: ReactNode;
  /** Rendered below the scrollable body, pinned to the bottom — for action buttons on tall forms. */
  footer?: ReactNode;
  maxWidthClassName?: string;
}

/** Generic centered dialog shell — base for confirm dialogs and form modals. */
export function Modal({ open, onClose, title, icon, children, footer, maxWidthClassName = "max-w-md" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-space-md backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`flex w-full ${maxWidthClassName} max-h-[90vh] flex-col rounded-2xl bg-surface-container-high shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between p-space-lg pb-space-sm">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Icon name={icon} className="text-[18px]" />
              </div>
            )}
            <h3 className="font-headline text-lg font-semibold text-on-surface">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant hover:text-on-surface"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-space-lg">
          <div className="flex flex-col gap-space-md pb-space-lg">{children}</div>
        </div>
        {footer && <div className="shrink-0 border-t border-outline-variant p-space-lg pt-space-sm">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
