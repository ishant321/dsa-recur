import { useState } from "react";
import DrButton from "../dr_button";
import DrText from "../dr_text";
import "./index.scss";
import { v4 } from "uuid";

type ItemId = string | number;

export interface TopicItem {
  id: ItemId;
  name: string;
  createdAt: string;
}

export interface QuestionItem {
  id: ItemId;
  title: string;
  link: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  visitedCount: number;
  lastVisitedAt?: string | null;
}

export interface TheoryItem {
  id: ItemId;
  title: string;
  content: string;
  createdAt: string;
}

interface TopicProps {
  itemType: "topic";
  item: TopicItem;
  onEdit: (item: TopicItem) => void;
  onDelete: (item: TopicItem) => void;
  onClick?: () => void;
}

interface QuestionProps {
  itemType: "question";
  item: QuestionItem;
  onEdit: (item: QuestionItem) => void;
  onDelete: (item: QuestionItem) => void;
  onAddNote?: (item: QuestionItem) => void;
  onViewNotes?: (item: QuestionItem) => void;
  onClick?: () => void;
  onNavigation?: (id: number | string) => void;
}

interface TheoryProps {
  itemType: "theory";
  item: TheoryItem;
  onEdit: (item: TheoryItem) => void;
  onDelete: (item: TheoryItem) => void;
  onView?: (item: TheoryItem) => void;
  onClick?: () => void;
  isViewable?: boolean;
}

type Props = TopicProps | QuestionProps | TheoryProps;

const formatDate = (value?: string | null) => {
  if (!value) return "Not visited yet";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

function CardActions({
  onEdit,
  onDelete,
  onView,
  onAddNote,
  onViewNotes,
  isViewable = false,
}: {
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onView?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddNote?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onViewNotes?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isViewable?: boolean;
}) {
  const [isEditBtn, setIsEditBtn] = useState("");
  const [isDeleteBtn, setIsDeleteBtn] = useState("");
  const [isViewBtn, setIsViewBtn] = useState("");
  const [isAddNoteBtn, setIsAddNoteBtn] = useState("");
  const [isViewNotesBtn, setIsViewNotesBtn] = useState("");

  return (
    <div className="dr-item-card__actions">
      {onAddNote && (
        <DrButton
          variant="justText"
          size="s"
          resetLoadingKey={isAddNoteBtn}
          onClick={(e) => {
            e.stopPropagation();
            onAddNote(e);
            setIsAddNoteBtn(v4());
          }}
        >
          Add Note
        </DrButton>
      )}
      {onViewNotes && (
        <DrButton
          variant="justText"
          size="s"
          resetLoadingKey={isViewNotesBtn}
          onClick={(e) => {
            e.stopPropagation();
            onViewNotes(e);
            setIsViewNotesBtn(v4());
          }}
        >
          View Notes
        </DrButton>
      )}
      {isViewable && (
        <DrButton
          variant="justText"
          size="s"
          resetLoadingKey={isViewBtn}
          onClick={(e) => {
            e.stopPropagation();
            onView?.(e);
            setIsViewBtn(v4());
          }}
        >
          View
        </DrButton>
      )}
      <DrButton
        variant="justText"
        size="s"
        resetLoadingKey={isEditBtn}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(e);
          setIsEditBtn(v4());
        }}
      >
        Edit
      </DrButton>
      <DrButton
        variant="justText"
        size="s"
        resetLoadingKey={isDeleteBtn}
        className="dr-item-card__delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e);
          setIsDeleteBtn(v4());
        }}
      >
        Delete
      </DrButton>
    </div>
  );
}

export default function DrItemCard(props: Props) {
  if (props.itemType === "topic") {
    const { item } = props;

    return (
      <article
        className="dr-item-card"
        style={{ width: "200px" }}
        onClick={props.onClick}
      >
        <div className="dr-item-card__content">
          <DrText variant="title">{item.name}</DrText>
          <DrText variant="small" color="subdued">
            Created {formatDate(item.createdAt)}
          </DrText>
        </div>
        <CardActions
          onEdit={(e) => {
            e.stopPropagation();
            props.onEdit(item);
          }}
          onDelete={(e) => {
            e.stopPropagation();
            props.onDelete(item);
          }}
        />
      </article>
    );
  }

  if (props.itemType === "question") {
    const { item } = props;

    return (
      <article
        className="dr-item-card dr-item-card--question"
        onClick={props.onClick}
      >
        <div className="dr-item-card__content">
          <div className="dr-item-card__title-row">
            <DrText variant="title">{item.title}</DrText>
            <span
              className={`dr-item-card__difficulty dr-item-card__difficulty--${item.difficulty.toLowerCase()}`}
            >
              {item.difficulty}
            </span>
          </div>
          <a
            className="dr-item-card__link"
            href={item.link}
            target="_blank"
            rel="noreferrer"
            onClick={() => {props.onNavigation?.(item.id)}}
          >
            {item.link}
          </a>
          <DrText variant="small" color="subdued">
            Visited {item.visitedCount} times · Last visited{" "}
            {formatDate(item.lastVisitedAt)}
          </DrText>
        </div>
        <CardActions
          onAddNote={(e) => {
            e.stopPropagation();
            props.onAddNote?.(item);
          }}
          onViewNotes={(e) => {
            e.stopPropagation();
            props.onViewNotes?.(item);
          }}
          onEdit={(e) => {
            e.stopPropagation();
            props.onEdit(item);
          }}
          onDelete={(e) => {
            e.stopPropagation();
            props.onDelete(item);
          }}
        />
      </article>
    );
  }

  const { item } = props;
  return (
    <article className="dr-item-card">
      <div className="dr-item-card__content">
        <DrText variant="title">{item.title}</DrText>
        <DrText className="dr-item-card__theory-content" color="subdued">
          {item.content}
        </DrText>
        <DrText variant="small" color="subdued">
          Created {formatDate(item.createdAt)}
        </DrText>
      </div>
      <CardActions
        onEdit={(e) => {
          e.stopPropagation();
          props.onEdit(item);
        }}
        onDelete={(e) => {
          e.stopPropagation();
          props.onDelete(item);
        }}
        onView={(e) => {
          e.stopPropagation();
          props.onView?.(item);
        }}
        isViewable={props.isViewable}
      />
    </article>
  );
}
