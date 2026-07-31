export interface DrNote {
  id: string | number;
  questionId: string | number;
  content: string;
  createdAt: string;
}

export interface DrNotesProps {
  questionName: string;
  notes: readonly DrNote[];
  onClose: () => void;
  onAdd: (content: string) => void | Promise<void>;
  onUpdate: (note: DrNote, content: string) => void | Promise<void>;
  onDelete: (note: DrNote) => void | Promise<void>;
  className?: string;
}
