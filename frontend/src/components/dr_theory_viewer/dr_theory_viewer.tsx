import type { ReactNode } from "react";
import DrButton from "../dr_button";
import DrText from "../dr_text";
import type { DrTheoryViewerProps } from "./types";
import "./index.scss";

const inlinePattern =
  /(\[[^\]]+\]\([^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;

function isSafeHref(href: string) {
  return /^(https?:|mailto:)/i.test(href);
}

function renderInline(value: string): ReactNode[] {
  return value
    .split(inlinePattern)
    .filter(Boolean)
    .map((part, index) => {
      const key = `${part}-${index}`;
      const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);

      if (link) {
        return isSafeHref(link[2]) ? (
          <a key={key} href={link[2]} target="_blank" rel="noreferrer">
            {link[1]}
          </a>
        ) : (
          link[1]
        );
      }

      if (part.startsWith("`"))
        return <code key={key}>{part.slice(1, -1)}</code>;
      if (part.startsWith("**") || part.startsWith("__"))
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*") || part.startsWith("_"))
        return <em key={key}>{part.slice(1, -1)}</em>;

      return part;
    });
}

function MarkdownContent({ content }: Pick<DrTheoryViewerProps, "content">) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const unordered = line.match(/^[-*+]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);

    if (!line.trim()) continue;
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <pre key={`code-${index}`}>
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
    } else if (heading) {
      const Tag = `h${heading[1].length}` as "h1" | "h2" | "h3";
      blocks.push(
        <Tag key={`heading-${index}`}>{renderInline(heading[2])}</Tag>,
      );
    } else if (/^([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} />);
    } else if (unordered || ordered) {
      const isOrdered = Boolean(ordered);
      const items: ReactNode[] = [];
      do {
        const item = isOrdered
          ? lines[index].match(/^\d+\.\s+(.+)$/)
          : lines[index].match(/^[-*+]\s+(.+)$/);
        if (!item) break;
        items.push(<li key={`item-${index}`}>{renderInline(item[1])}</li>);
        index += 1;
      } while (index < lines.length);
      index -= 1;
      const List = isOrdered ? "ol" : "ul";
      blocks.push(<List key={`list-${index}`}>{items}</List>);
    } else if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={`quote-${index}`}>
          {renderInline(line.slice(2))}
        </blockquote>,
      );
    } else {
      const paragraph = [line];
      while (
        index + 1 < lines.length &&
        lines[index + 1].trim() &&
        !/^(#{1,3}\s+|[-*+]\s+|\d+\.\s+|> |```)/.test(lines[index + 1])
      ) {
        index += 1;
        paragraph.push(lines[index]);
      }
      blocks.push(
        <p key={`paragraph-${index}`}>{renderInline(paragraph.join(" "))}</p>,
      );
    }
  }

  return <div className="dr-theory-viewer__markdown">{blocks}</div>;
}

export default function DrTheoryViewer({
  title,
  content,
  onClose,
  className = "",
}: DrTheoryViewerProps) {
  return (
    <div
      className="dr-theory-viewer-overlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className={`dr-theory-viewer ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dr-theory-viewer-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dr-theory-viewer__header">
          <DrText variant="h3" className="dr-theory-viewer__title">
            <span id="dr-theory-viewer-title">{title}</span>
          </DrText>
          <DrButton
            variant="justText"
            size="m"
            ariaLabel="Close theory viewer"
            onClick={onClose}
          >
            ×
          </DrButton>
        </div>
        <div className="dr-theory-viewer__body">
          <MarkdownContent content={content} />
        </div>
      </section>
    </div>
  );
}
