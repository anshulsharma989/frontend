import { ReactNode } from "react";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  warning?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  description,
  warning,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  busy,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} icon="gavel" maxWidthClassName="max-w-sm">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-on-surface-variant">{description}</p>
        {warning && (
          <div className="mt-2 rounded-xl bg-error-container/20 p-2.5 text-sm text-error">
            <p className="flex items-center gap-1">
              <Icon name="warning" className="text-[14px]" />
              {warning}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-space-xs">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl bg-surface-container-highest py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-bright"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onConfirm}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-error py-3 text-sm font-bold text-on-error shadow-md transition-transform active:scale-95 disabled:opacity-50"
        >
          <Icon name="delete_forever" className="text-[16px]" />
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
