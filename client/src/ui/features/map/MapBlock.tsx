import { Overlay } from "../../components/Overlay";

interface MapBlockProps {
  currentBlock?: boolean;
  blockImagePath: string;
}

export const MapBlock = (props: MapBlockProps) => {
  return (
    <Overlay enabled={!props.currentBlock}>
      <img
        src={props.blockImagePath}
        className={`h-[500px] w-[500px] border-1 border-black object-cover`}
        draggable={false}
        alt=""
      />
    </Overlay>
  );
};
