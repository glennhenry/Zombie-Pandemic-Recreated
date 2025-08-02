interface MapBlockProps {
  blockImagePath: string;
}

export const MapBlock = (props: MapBlockProps) => {
  return (
      <img
        src={props.blockImagePath}
        className={`h-[500px] w-[500px] border-1 border-black object-cover`}
        draggable={false}
        alt=""
      />
  );
};
