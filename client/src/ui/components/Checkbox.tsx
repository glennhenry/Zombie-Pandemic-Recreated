import classNames from "../../utils/ui/classNames";

interface CheckboxProps {
  isChecked: boolean;
  onChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={props.onChecked}
        className={`${classNames(props.className)}`}
      />
      {props.children}
    </div>
  );
};
