import classNames from "../../utils/ui/classNames";

interface TextFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hide?: boolean;
  required?: boolean;
  className?: string;
  onToggleHide?: () => void;
  children?: React.ReactNode;
}

export const TextField = (props: TextFieldProps) => {
  return (
    <div className={`relative ${classNames(props.className)}`}>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.hide ? "password" : "text"}
        required={props.required}
        placeholder={props.placeholder}
        className="w-full rounded-sm bg-gray-100 p-2 pr-10 text-gray-700 placeholder-gray-400"
      />
      {props.children && (
        <div
          onClick={props.onToggleHide}
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
