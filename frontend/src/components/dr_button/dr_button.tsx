import React, { useEffect, useState } from "react";
import DrIcon from "../dr_icon";
import DrLoader from "../dr_loader";
import "./index.scss";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "justText";
type ButtonSize = "xs" | "s" | "m" | "l";

interface Props {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
  className?: string;
  // Change this value to stop the loader
  resetLoadingKey?: string;
}

export default function DrButton({
  children,
  onClick,
  variant = "primary",
  size = "m",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  disabled = false,
  ariaLabel,
  style,
  className,
  resetLoadingKey,
}: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [resetLoadingKey]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;

    if (onClick) {
      setLoading(true);
      onClick(e);
    }
  };

  const base = "btn";

  const variants: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    danger: "btn-danger",
    justText: "btn-just-text",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        ${base}
        ${variants[variant]}
        btn-${size}
        ${fullWidth ? "w-full" : ""}
        ${className || ""}
      `}
      style={style}
    >
      {loading ? (
        <DrLoader size="s" />
      ) : (
        <>
          {leadingIcon && (
            <DrIcon
              name={leadingIcon}
              size="m"
              style={{ color: "currentColor" }}
              className="mr-2"
            />
          )}

          <span>{children}</span>

          {trailingIcon && (
            <DrIcon
              name={trailingIcon}
              size="s"
              style={{ color: "currentColor" }}
              className="ml-2"
            />
          )}
        </>
      )}
    </button>
  );
}
