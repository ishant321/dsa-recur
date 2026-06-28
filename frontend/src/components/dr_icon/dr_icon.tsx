import React, { useEffect, useState, type ComponentProps } from "react";

// 1. Define strict mappings for sizes and theme colors
const SIZE_MAP = {
  s: "16px",
  m: "20px",
  l: "24px",
  xl: "28px",
} as const;

const COLOR_MAP = {
  warning: "#EAB308", // Yellow
  informative: "#3B82F6", // Blue
  error: "#EF4444", // Red
  success: "#22C55E", // Green
} as const;

// 2. Define the Component Props
interface DrIconProps extends ComponentProps<"div"> {
  name: string;
  size?: keyof typeof SIZE_MAP;
  color?: keyof typeof COLOR_MAP;
  onClick?: () => void;
}

export const DrIcon: React.FC<DrIconProps> = ({
  name,
  size = "m",
  color = "informative",
  onClick,
  style,
  ...props
}) => {
  const [SvgContent, setSvgContent] = useState<React.FC<
    ComponentProps<"svg">
  > | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    import(`../../styles/icons/${name}.svg?react`)
      .then((module) => {
        if (isMounted) {
          setSvgContent(() => module.default);
          setError(false);
        }
      })
      .catch((err) => {
        console.error(`Failed to load icon: ${name}`, err);
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [name]);

  // Fallback if the SVG is loading or doesn't exist
  if (error) return <span style={{ color: COLOR_MAP.error }}>⚠️</span>;
  if (!SvgContent)
    return <div style={{ width: SIZE_MAP[size], height: SIZE_MAP[size] }} />;

  // 4. Render the SVG with forced color overrides using CSS currentColor
  return (
    <div
      {...props}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: SIZE_MAP[size],
        height: SIZE_MAP[size],
        color: COLOR_MAP[color], // Sets the "currentColor" context for the SVG
        ...style,
      }}
    >
      <SvgContent
        width="100%"
        height="100%"
        fill="currentColor"
        stroke="currentColor"
      />
    </div>
  );
};

export default DrIcon;
