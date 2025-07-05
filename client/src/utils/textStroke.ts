export default function textStroke(
  strokeWidth: number,
  color: string,
): React.CSSProperties {
  const shadows = [];
  for (let dx = -strokeWidth; dx <= strokeWidth; dx++) {
    for (let dy = -strokeWidth; dy <= strokeWidth; dy++) {
      if (dx === 0 && dy === 0) continue;
      shadows.push(`${dx}px ${dy}px 0 var(${color})`);
    }
  }
  return {
    textShadow: shadows.join(",\n  "),
  };
}
