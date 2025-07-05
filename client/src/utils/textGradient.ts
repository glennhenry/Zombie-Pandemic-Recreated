export default function textLinearGradientStyle(
  direction: "top" | "bottom" | "left" | "right" = "right",
  fromColor: string,
  toColor: string,
  fromPercent: number = 0,
  toPercent: number = 100,
): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to ${direction}, var(${fromColor}) ${fromPercent}%, var(${toColor}) ${toPercent}%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
}
