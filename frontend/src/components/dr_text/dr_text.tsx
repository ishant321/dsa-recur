import React from "react";
import "./index.scss";

type TextVariant = "h1" | "h2" | "h3" | "title" | "body" | "small" | "muted";
type TextColor = "success" | "error" | "warning" | "subdued" | "inverse" | "all";

interface Props {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function DrText({
  variant = "body",
  color = "all",
  children,
  className = "",
  onClick,
  style,
}: Props) {
  return (
    <p
      className={`dr-text dr-text--${variant} dr-text--${color} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </p>
  );
}
