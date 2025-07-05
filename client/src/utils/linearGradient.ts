function normalizeColor(color: string): string {
  return color.startsWith("--") ? `var(${color})` : color;
}

export function textLinearGradientStyle(
  direction: "top" | "bottom" | "left" | "right" = "right",
  fromColor: string,
  toColor: string,
  fromPercent: number = 0,
  toPercent: number = 100,
): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to ${direction}, ${normalizeColor(fromColor)} ${fromPercent}%, ${normalizeColor(toColor)} ${toPercent}%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
}

export function bglinearGradientStyle(
  direction: "top" | "bottom" | "left" | "right" = "right",
  fromColor: string,
  toColor: string,
  fromPercent: number = 0,
  toPercent: number = 100,
): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to ${direction}, ${normalizeColor(fromColor)} ${fromPercent}%, ${normalizeColor(toColor)} ${toPercent}%)`,
  };
}
