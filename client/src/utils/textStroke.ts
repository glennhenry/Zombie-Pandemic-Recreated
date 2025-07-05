function normalizeColor(color: string): string {
  return color.startsWith("--") ? `var(${color})` : color;
}

export default function textStroke(
  strokeWidth: number,
  color: string,
): React.CSSProperties {
  const shadows = [];
  for (let dx = -strokeWidth; dx <= strokeWidth; dx++) {
    for (let dy = -strokeWidth; dy <= strokeWidth; dy++) {
      if (dx === 0 && dy === 0) continue;
      shadows.push(`${dx}px ${dy}px 0 ${normalizeColor(color)}`);
    }
  }
  return {
    textShadow: shadows.join(",\n  "),
  };
}
