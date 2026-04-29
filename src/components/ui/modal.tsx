import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModal } from "./hooks/use-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { dialogRef, handleBackdropClick } = useModal(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      onClick={handleBackdropClick}
    >
      <div className="modal-header">
        <h2 className="modal-title">{title}</h2>
        <button onClick={onClose} className="btn-icon" aria-label="Close modal">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </dialog>,
    document.body,
  );
}
