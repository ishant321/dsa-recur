
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
import type { ItemId } from "../../types";

export interface TopicFormData {
  name: string;
}

export interface QuestionFormData {
  title: string;
  link: string;
  difficulty: Difficulty;
  topicId: string;
}

export interface TheoryFormData {
  title: string;
  content: string;
  topicId?: string;
}

export interface NoteFormData {
  content: string;
  questionId: ItemId;
}

interface BaseProps {
  mode?: "create" | "update";
  onClose: () => void;
}

interface TopicProps extends BaseProps {
  itemType: "topic";
  initialValues?: Partial<TopicFormData>;
  onSubmit: (data: TopicFormData) => void | Promise<void>;
}

interface QuestionProps extends BaseProps {
  itemType: "question";
  topicId?: string;
  initialValues?: Partial<QuestionFormData>;
  onSubmit: (data: QuestionFormData) => void | Promise<void>;
}

interface TheoryProps extends BaseProps {
  itemType: "theory";
  topicId?: string;
  initialValues?: Partial<TheoryFormData>;
  onSubmit: (data: TheoryFormData) => void | Promise<void>;
}

interface NoteProps extends BaseProps {
  itemType: "note";
  questionId: ItemId;
  questionTitle: string;
  initialValues?: Partial<NoteFormData>;
  onSubmit: (data: NoteFormData) => void | Promise<void>;
}

export type Props = TopicProps | QuestionProps | TheoryProps | NoteProps;
