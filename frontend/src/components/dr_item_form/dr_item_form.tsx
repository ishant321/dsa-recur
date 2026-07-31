import { useState } from "react";
import DrButton from "../dr_button";
import DrText from "../dr_text";
import DrTextInput from "../dr_text_input";
import "./index.scss";
import type { Props, Difficulty } from "./types";

export default function DrItemForm(props: Props) {
  const { mode = "create", onClose } = props;
  const [name, setName] = useState(
    props.itemType === "topic" ? (props.initialValues?.name ?? "") : "",
  );
  const [title, setTitle] = useState(
    props.itemType === "question" || props.itemType === "theory"
      ? (props.initialValues?.title ?? "")
      : "",
  );
  const [link, setLink] = useState(
    props.itemType === "question" ? (props.initialValues?.link ?? "") : "",
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(
    props.itemType === "question"
      ? (props.initialValues?.difficulty ?? "EASY")
      : "EASY",
  );
  const [content, setContent] = useState(
    props.itemType === "theory" || props.itemType === "note"
      ? (props.initialValues?.content ?? "")
      : "",
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const label = props.itemType[0].toUpperCase() + props.itemType.slice(1);
  const action = mode === "create" ? "Create" : "Update";

  const handleSubmit = async () => {
    setError("");

    if (props.itemType === "topic") {
      if (!name.trim()) {
        setError("Topic name is required.");
        return;
      }

      setIsSubmitting(true);
      try {
        await props.onSubmit({ name: name.trim() });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (
      (props.itemType === "question" || props.itemType === "theory") &&
      !title.trim()
    ) {
      setError("Title is required.");
      return;
    }

    if (props.itemType === "question") {
      if (!link.trim()) {
        setError("Question link is required.");
        return;
      }

      setIsSubmitting(true);
      try {
        await props.onSubmit({
          title: title.trim(),
          link: link.trim(),
          difficulty,
          topicId: props.topicId ?? "",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (props.itemType === "note") {
      if (!content.trim()) {
        setError("Note content is required.");
        return;
      }

      setIsSubmitting(true);
      try {
        await props.onSubmit({
          content: content.trim(),
          questionId: props.questionId,
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await props.onSubmit({
        title: title.trim(),
        content: content.trim(),
        ...(props.topicId ? { topicId: props.topicId } : {}),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="dr-item-form-overlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="dr-item-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dr-item-form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dr-item-form__header">
          <div id="dr-item-form-title">
            <DrText variant="h3">
              {action} {label}
            </DrText>
          </div>
          <DrButton
            className="dr-item-form__close"
            aria-label="Close form"
            onClick={onClose}
          >
            ×
          </DrButton>
        </div>

        <div className="dr-item-form__body">
          {props.itemType === "topic" && (
            <DrTextInput
              label="Topic name"
              value={name}
              onChange={setName}
              placeholder="e.g. Arrays"
              error={Boolean(error)}
              errorMessage={error}
            />
          )}

          {props.itemType === "question" && (
            <>
              <DrTextInput
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="e.g. Two Sum"
              />
              <DrTextInput
                label="Link"
                value={link}
                onChange={setLink}
                placeholder="https://..."
              />
              <label
                className="dr-item-form__label"
                htmlFor="question-difficulty"
              >
                Difficulty
              </label>
              <select
                id="question-difficulty"
                className="input dr-item-form__select"
                value={difficulty}
                onChange={(event) =>
                  setDifficulty(event.target.value as Difficulty)
                }
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
              <input type="hidden" name="topicId" value={props.topicId} />
            </>
          )}

          {props.itemType === "theory" && (
            <>
              <DrTextInput
                label="Title"
                value={title}
                onChange={setTitle}
                placeholder="e.g. Time complexity"
              />
              <DrTextInput
                label="Content"
                type="textarea"
                value={content}
                onChange={setContent}
                placeholder="Write the theory content..."
              />
              {props.topicId && (
                <input type="hidden" name="topicId" value={props.topicId} />
              )}
            </>
          )}

          {props.itemType === "note" && (
            <>
              <DrTextInput
                label="Question"
                value={props.questionTitle}
                onChange={() => undefined}
                readOnly
              />
              <DrTextInput
                label="Content"
                type="textarea"
                value={content}
                onChange={setContent}
                placeholder="Write your note..."
                error={Boolean(error)}
                errorMessage={error}
              />
              <input
                type="hidden"
                name="questionId"
                value={props.questionId}
              />
            </>
          )}

          {error && (
            <DrText color="error" variant="small">
              {error}
            </DrText>
          )}

          <div className="dr-item-form__actions">
            <DrButton className="btn btn-just-text btn-m" onClick={onClose}>
              Cancel
            </DrButton>
            <DrButton
              disabled={isSubmitting}
              resetLoadingKey={isSubmitting ? "submitting" : "idle"}
              onClick={handleSubmit}
            >
              {action} {label}
            </DrButton>
          </div>
        </div>
      </section>
    </div>
  );
}
