"use client";
import Image from "next/image";
import { IImageData, IImageSlider } from "../../interfaces";
import CirclePagination from "../UI/CirclePagination/CirclePagination";
import { useCallback, useMemo, useRef, useState } from "react";
import useDragging from "@/hooks/useDragging";

type Props = {
  images: IImageData[];
};
const ImageSlider = ({ images }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerXBeforeDrag = useRef<number>();
  const [activeImage, setActiveImage] = useState(0);

  const translateX = useMemo(() => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    return -activeImage * width;
  }, [activeImage]);

  console.log("translateX", translateX);

  const slideToNextImage = () => {
    setActiveImage((v) => {
      if (v >= images.length - 1) {
        return 0;
      } else {
        return v + 1;
      }
    });
  };

  const slideToPrevImage = () => {
    setActiveImage((v) => {
      if (v <= 0) {
        return images.length - 1;
      } else {
        return v - 1;
      }
    });
  };

  const onDragStart = useCallback((evt: React.PointerEvent) => {
    pointerXBeforeDrag.current = evt.clientX;
  }, []);

  const onDrag = useCallback((evt: PointerEvent) => {
    if (pointerXBeforeDrag.current === undefined) return;

    const pointerX = evt.clientX;
    const diff = pointerX - pointerXBeforeDrag.current;
    const diffAbs = Math.abs(diff);

    if (diffAbs > 100) {
      const direction = Math.sign(-diff);
      if (direction === 1) slideToNextImage();
      else if (direction === -1) slideToPrevImage();
      pointerXBeforeDrag.current = undefined;
    }
  }, []);

  const { startDragging, stopDragging } = useDragging({
    onDrag,
    onDragStart,
  });

  return (
    <div ref={containerRef}>
      <div
        className="relative rounded-lg overflow-hidden"
        onPointerDown={startDragging}
      >
        <div
          className="flex"
          style={{
            transition: "transform 0.3s ease",
            transform: `translate(${translateX}px, 0)`,
          }}
        >
          {images.map((img, i) => (
            <ImageSlide
              key={img.src}
              image={img}
              isActive={activeImage === i}
            />
          ))}
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

type ImageSlideProps = {
  image: IImageData;
  isActive: boolean;
};

const ImageSlide = ({ image, isActive }: ImageSlideProps) => {
  return (
    <Image
      width={image.width}
      height={image.height}
      alt={image.alt}
      src={image.src}
      className="object-cover w-full border border-border-image-color h-[480px]"
      style={{ transition: "opacity 0.3s ease", opacity: isActive ? 1 : 0.3 }}
      draggable="false"
    />
  );
};

export default ImageSlider;
