import { useState } from "react";
import DrIcon from "../dr_icon";
import "./index.scss";

type InputType = "text" | "number" | "password" | "textarea";

interface Props {
  label?: string;
  type?: InputType;
  leadingIcon?: string;
  trailingIcon?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function DrTextInput({
  label,
  type = "text",
  leadingIcon,
  trailingIcon,
  value,
  onChange,
  onBlur,
  placeholder,
  error = false,
  errorMessage,
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const inputClass = `
    input
    ${leadingIcon ? "has-leading" : ""}
    ${trailingIcon || type === "password" ? "has-trailing" : ""}
    ${error ? "input-error" : ""}
  `;

  return (
    <div className="flex flex-col items-start w-full">
      {label && <label className="input-label">{label}</label>}

      <div className="input-wrapper">
        {leadingIcon && (
          <div className="input-icon leading">
            <DrIcon
              name={leadingIcon}
              size="m"
              style={{ color: "var(--text-medium)" }}
            />
          </div>
        )}

        {type === "textarea" ? (
          <textarea
            className={inputClass}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
        ) : (
          <input
            className={inputClass}
            type={
              type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
        )}

        {type !== "password" && trailingIcon && (
          <div className="input-icon trailing">
            <DrIcon
              name={trailingIcon}
              size="m"
              style={{ color: "var(--text-medium)" }}
            />
          </div>
        )}

        {type === "password" && (
          <div
            className="input-icon trailing"
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            <DrIcon
              name={isPasswordVisible ? "eye_slash" : "eye"}
              size="s"
              style={{ color: "var(--text-medium)" }}
            />
          </div>
        )}
      </div>

      <span className={`input-error-text ${error ? "show" : ""}`}>
        {error ? errorMessage : ""}
      </span>
    </div>
  );
}
