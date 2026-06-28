import React from "react";
import "./index.scss";

type TextVariant = "h1" | "h2" | "h3" | "title" | "body" | "small" | "muted";

interface Props {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function DrText({
  variant = "body",
  children,
  className = "",
  onClick,
  style,
}: Props) {
  return (
    <p
      className={`dr-text dr-text--${variant} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </p>
  );
}
