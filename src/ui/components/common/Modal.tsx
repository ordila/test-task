import { createPortal } from "react-dom";

const modalRoot =
  typeof document !== "undefined"
    ? document.getElementById("modal-root") ?? document.body
    : null;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  container?: HTMLElement | null;
};

export function Modal({
  isOpen,
  onClose,
  children,
  container = modalRoot,
}: ModalProps) {
  if (!isOpen || !container) {
    return null;
  }

  return createPortal(
    <div className={`fixed inset-0`}>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="pointer-events-auto relative z-10">{children}</div>
    </div>,
    container
  );
}
