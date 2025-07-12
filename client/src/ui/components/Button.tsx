import classNames from "../../utils/ui/classNames";

interface ButtonProps {
  baseColor?: string;
  hoverColor?: string;
  activeColor?: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const baseColor = props.baseColor ?? "bg-primary";
  const hoverColor = props.hoverColor ?? "hover:bg-primary/80";
  const activeColor = props.activeColor ?? "active:bg-primary/70";

  return (
    <div
      onClick={props.onClick}
      className={`cursor-pointer ${baseColor} ${hoverColor} ${activeColor} ${classNames(props.className)}`}
    >
      {props.children}
    </div>
  );
};
