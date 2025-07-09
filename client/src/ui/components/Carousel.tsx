import { PiArrowFatLeftFill, PiArrowFatRightFill } from "react-icons/pi";
import classNames from "../../utils/ui/classNames";
import type { Image } from "../../utils/type";
import { useRef } from "react";
import { Overlay } from "./Overlay";
import { useDragScroll } from "../hooks/useDragScroll";

interface CarouselProps {
  images: Image[];
  selected: number;
  onSelect: (idx: number) => void;
  className?: string;
}

export const Carousel = (props: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null!);
  useDragScroll(scrollRef);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  const changePreview = (idx: number) => {
    props.onSelect(idx);

    const selectedThumbnail = thumbnailRefs.current[idx];
    selectedThumbnail?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div
      className={`flex h-25 w-full flex-row gap-2 ${classNames(props.className)}`}
    >
      <ArrowSwitch
        left={true}
        onClick={() => changePreview(Math.max(0, props.selected - 1))}
      />
      <div ref={scrollRef} className="flex flex-row gap-2 overflow-x-hidden">
        {props.images.map((image, idx) => (
          <div key={idx} className="flex-none">
            <Overlay
              hoverEnabled={idx !== props.selected}
              onClick={() => changePreview(idx)}
            >
              <img
                ref={(el: HTMLImageElement | null) => {
                  thumbnailRefs.current[idx] = el;
                }}
                src={image.path}
                alt={image.alt}
                className="noselect max-h-25 object-contain"
              />
            </Overlay>
          </div>
        ))}
      </div>
      <ArrowSwitch
        left={false}
        onClick={() =>
          changePreview(Math.min(props.images.length - 1, props.selected + 1))
        }
      />
    </div>
  );
};

const ArrowSwitch = ({
  left,
  onClick,
}: {
  left: boolean;
  onClick: () => void;
}) => {
  const IconComponent = left ? PiArrowFatLeftFill : PiArrowFatRightFill;
  return (
    <div
      onClick={onClick}
      className="flex h-25 w-10 cursor-pointer items-center justify-center bg-home-arrow-container hover:bg-home-arrow-container-hovered"
    >
      <IconComponent />
    </div>
  );
};
