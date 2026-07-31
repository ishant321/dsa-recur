import DrButton from "../dr_button";
import DrText from "../dr_text";
import "./index.scss";

interface Props {
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DrDeleteModal({
  title = "Delete item?",
  message = "This action cannot be undone.",
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className="dr-delete-modal-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="dr-delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dr-delete-modal-title"
        aria-describedby="dr-delete-modal-message"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dr-delete-modal__icon" aria-hidden="true">!</div>
        <DrText variant="h3" className="dr-delete-modal__title">
          <span id="dr-delete-modal-title">{title}</span>
        </DrText>
        <DrText color="subdued" className="dr-delete-modal__message">
          <span id="dr-delete-modal-message">{message}</span>
        </DrText>

        <div className="dr-delete-modal__actions">
          <button type="button" className="btn btn-just-text btn-m" onClick={onClose}>
            Cancel
          </button>
          <DrButton variant="danger" onClick={onConfirm}>
            Delete
          </DrButton>
        </div>
      </section>
    </div>
  );
}
