import { useState } from "react";
import DrButton from "../dr_button";
import DrText from "../dr_text";
import DrTextInput from "../dr_text_input";
import type { DrNote, DrNotesProps } from "./types";
import "./index.scss";

export default function DrNotes({
  questionName,
  notes,
  onAdd,
  onUpdate,
  onDelete,
  onClose,
  className = "",
}: DrNotesProps) {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<DrNote["id"] | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const save = async (action: () => void | Promise<void>, clear: () => void) => {
    setIsSaving(true);
    try {
      await action();
      clear();
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (note: DrNote) => {
    setEditingId(note.id);
    setEditValue(note.content);
  };

  return (
    <div className="dr-notes-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className={`dr-notes ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dr-notes-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dr-notes__header">
          <div>
            <div id="dr-notes-title"><DrText variant="h3">{questionName}</DrText></div>
            <DrText variant="small" color="subdued">Notes</DrText>
          </div>
          <DrButton variant="justText" size="m" ariaLabel="Close notes" onClick={onClose}>×</DrButton>
        </div>

      <div className="dr-notes__create">
        <DrTextInput type="textarea" value={newNote} onChange={setNewNote} placeholder="Add a note..." />
        <DrButton disabled={!newNote.trim() || isSaving} resetLoadingKey={isSaving ? "saving" : "idle"} onClick={() => save(() => onAdd(newNote.trim()), () => setNewNote(""))}>Add note</DrButton>
      </div>

        <div className="dr-notes__list">
        {notes.length === 0 ? (
          <DrText variant="small" color="subdued">No notes available</DrText>
        ) : notes.map((note) => {
          const isEditing = editingId === note.id;
          return (
            
            <article className="dr-notes__item" key={note.id}>
             
              {isEditing ? (
                <DrTextInput type="textarea" value={editValue} onChange={setEditValue} />
              ) : (
                <DrText>{note.content}</DrText>
              )}
              <div className="dr-notes__actions">
                {isEditing ? (
                  <>
                    <DrButton variant="justText" size="s" disabled={!editValue.trim() || isSaving} resetLoadingKey={isSaving ? "saving" : "idle"} onClick={() => save(() => onUpdate(note, editValue.trim()), () => setEditingId(null))}>Save</DrButton>
                    <DrButton variant="justText" size="s" disabled={isSaving} onClick={() => setEditingId(null)}>Cancel</DrButton>
                  </>
                ) : (
                  <>
                    <DrButton variant="justText" size="s" disabled={isSaving} onClick={() => startEditing(note)}>Edit</DrButton>
                    <DrButton variant="justText" size="s" disabled={isSaving} onClick={() => save(() => onDelete(note), () => undefined)}>Delete</DrButton>
                  </>
                )}
              </div>
            </article>
          );
        })}
        </div>
      </section>
    </div>
  );
}
