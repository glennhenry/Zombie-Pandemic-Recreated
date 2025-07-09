interface OverlayProps {
  color?: string;
  hoverEnabled?: boolean;
  onClick?: () => void;
  overlayContent?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Overlay = ({
  color = "bg-black/30",
  hoverEnabled = false,
  onClick,
  overlayContent,
  className = "",
  children,
}: OverlayProps) => {
  return (
    <div
      className={`relative overflow-hidden ${hoverEnabled ? "group" : ""} ${className}`}
    >
      {children}

      <div
        className={`absolute inset-0 flex items-center justify-center ${color} ${hoverEnabled ? "opacity-0 group-hover:opacity-100" : ""} ${hoverEnabled ? "cursor-pointer" : ""} `}
        onClick={onClick}
      >
        {overlayContent}
      </div>
    </div>
  );
};
