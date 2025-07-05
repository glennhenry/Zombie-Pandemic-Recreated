import classNames from "../../utils/classNames";

interface HomeCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HomeCard = (props: HomeCardProps) => {
  return (
    <div className={`bg-base-container p-4 border-2 border-[#A1A1A1] ${classNames(props.className)}`}>
      {props.children}
    </div>
  );
};
