import { useState } from "react";
import { Carousel } from "../../components/Carousel";
import type { Image } from "../../../ui/types/Image";

const previewImagePaths = [
  "/gameplays/gameplay-1.jpg",
  "/gameplays/gameplay-2.jpg",
  "/gameplays/gameplay-3.jpg",
  "/gameplays/gameplay-4.jpg",
  "/gameplays/gameplay-1.jpg",
  "/gameplays/gameplay-2.jpg",
];

const images = previewImagePaths.map((_path) => {
  const image: Image = { path: _path, alt: "ZP Recreated gameplay" };
  return image;
});

export default function Preview() {
  const [previewIndex, setPreviewIndex] = useState(0);

  return (
    <div className="flex w-120 max-w-full flex-col gap-2">
      <div>
        <img
          src={previewImagePaths[previewIndex]}
          alt="ZP Recreated gameplay"
          className="object-contain"
        />
      </div>
      <Carousel
        images={images}
        selected={previewIndex}
        onSelect={(idx) => setPreviewIndex(idx)}
      />
    </div>
  );
}
