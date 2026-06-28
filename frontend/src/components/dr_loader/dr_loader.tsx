import "./index.scss";

const SIZE_MAP = {
  s: "16px",
  m: "24px",
  l: "32px",
  xl: "48px",
} as const;

interface Props {
  size?: keyof typeof SIZE_MAP;
}

export default function DrLoader({ size = "m" }: Props) {
  return (
    <div
      className="dr-loader"
      style={{
        width: SIZE_MAP[size],
        height: SIZE_MAP[size],
      }}
    />
  );
}
