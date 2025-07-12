import classNames from "../../utils/ui/classNames";

interface ButtonProps {
  baseColor?: string;
  hoverColor?: string;
  activeColor?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const baseColor = props.baseColor ?? "bg-primary";
  const hoverColor = props.hoverColor ?? "hover:bg-primary/80";
  const activeColor = props.activeColor ?? "active:bg-primary/70";
  const type = props.type ?? "button";

  return (
    <button
      onClick={props.onClick}
      type={type}
      className={`cursor-pointer ${baseColor} ${hoverColor} ${activeColor} ${classNames(props.className)}`}
      style={props.style}
    >
      {props.children}
    </button>
  );
};
