interface OverlayProps {
  color?: string;
  enabled?: boolean;
  hoverEnabled?: boolean;
  onClick?: () => void;
  overlayContent?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Overlay = (props: OverlayProps) => {
  const color = props.color ?? "bg-black/30";
  const hoverEnabled = props.hoverEnabled ?? false;

  if (!props.enabled && !props.overlayContent) {
    return <>{props.children}</>;
  }

  return (
    <div
      className={`relative overflow-hidden ${hoverEnabled ? "group" : ""} ${props.className}`}
    >
      {props.children}

      <div
        className={`absolute inset-0 flex items-center justify-center ${props.enabled && !props.overlayContent ? color : ""} ${hoverEnabled ? "opacity-0 transition-opacity group-hover:opacity-100" : ""}`}
        onClick={props.onClick}
      >
        {props.overlayContent}
      </div>
    </div>
  );
};
