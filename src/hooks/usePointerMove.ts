import { useEffect, useRef } from "react";

type Coords = { x: number; y: number };

function remap(
  value: number,
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
) {
  // Perform the mapping calculation
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

const useWindowPointerFromCenter = () => {
  const ref = useRef<Coords>({ x: 0, y: 0 });

  useEffect(() => {
    const listener = (evt: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      ref.current.x = remap(evt.clientX, 0, innerWidth, -1, 1);
      ref.current.y = remap(evt.clientY, 0, innerHeight, 1, -1);
    };

    window.addEventListener("pointermove", listener);

    return () => {
      window.removeEventListener("pointermove", listener);
    };
  });

  return ref;
};

export default useWindowPointerFromCenter;
