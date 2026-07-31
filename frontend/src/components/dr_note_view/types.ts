export interface DrNoteViewItem {
  id: string | number;
  content: string;
  createdAt: string;
}

export interface DrNoteViewProps {
  questionTitle: string;
  notes: readonly DrNoteViewItem[];
  onClose: () => void;
  className?: string;
}
