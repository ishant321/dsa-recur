import DrButton from "../dr_button";
import DrText from "../dr_text";
import type { DrNoteViewProps } from "./types";
import "./index.scss";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

export default function DrNoteView({
  questionTitle,
  notes,
  onClose,
  className = "",
}: DrNoteViewProps) {
  return (
    <div className="dr-note-view-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className={`dr-note-view ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dr-note-view-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="dr-note-view__header">
          <div id="dr-note-view-title">
            <DrText variant="h3">{questionTitle}</DrText>
          </div>
          <DrButton variant="justText" size="m" ariaLabel="Close notes" onClick={onClose}>
            ×
          </DrButton>
        </header>

        <div className="dr-note-view__list">
          {notes.length === 0 ? (
            <DrText color="subdued">No notes available</DrText>
          ) : (
            notes.map((note) => (
              <article className="dr-note-view__note card" key={note.id}>
                <DrText>{note.content}</DrText>
                <DrText variant="small" color="subdued">
                  Created {formatDate(note.createdAt)}
                </DrText>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
