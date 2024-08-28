"use client";
import Image from "next/image";
import { IImageData, IImageSlider } from "../../interfaces";
import CirclePagination from "../UI/CirclePagination/CirclePagination";
import { useCallback, useMemo, useRef, useState } from "react";
import BaseCanvas from "../BaseCanvas";
import CanvasImageSlider from "../BaseCanvas/ImageSlider";
import useTextures from "@/hooks/useTextures";

type Props = {
  images: IImageData[];
};
const ShotImageSlider = ({ images }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { textures, isLoaded } = useTextures(images.map((img) => img.src));
  const [activeImage, setActiveImage] = useState(0);

  const slideToNextImage = () => {
    setActiveImage((v) => {
      if (v >= images.length - 1) return 0;
      return v + 1;
    });
  };

  return (
    <div ref={containerRef}>
      <div className="relative rounded-lg overflow-hidden">
        <div className="flex aspect-square sm:rounded-lg border border-border-image-color">
          {isLoaded && (
            <div className="absolute h-full w-full top-0 left-[50%] translate-x-[-50%]">
              <BaseCanvas
                camera={{
                  fov: 25,
                  near: 4,
                  far: 10000,
                  position: [0, 0, 1000],
                }}
                className="h-full w-full"
                onPointerUp={slideToNextImage}
              >
                <CanvasImageSlider
                  sizes={[600, 600]}
                  textures={textures}
                  activeImageIdx={activeImage}
                />
              </BaseCanvas>
            </div>
          )}
        </div>
      </div>

      <div className="mt-1">
        <CirclePagination
          totalCount={images.length}
          changeImage={setActiveImage}
          imageIdx={activeImage}
        />
      </div>
    </div>
  );
};

export default ShotImageSlider;
