import React, { useEffect, useState } from "react";
import DrIcon from "../dr_icon";
import DrLoader from "../dr_loader";
import "./index.scss";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  // Change this value to stop the loader
  resetLoadingKey?: string;
}

export default function DrButton({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  disabled = false,
  style,
  className,
  resetLoadingKey,
}: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [resetLoadingKey]);

  const handleClick = () => {
    if (loading || disabled) return;

    setLoading(true);
    onClick?.();
  };

  const base = "btn";

  const variants: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    danger: "btn-danger",
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        ${base}
        ${variants[variant]}
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
