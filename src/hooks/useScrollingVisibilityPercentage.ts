import { MutableRefObject, useRef } from "react";
import useVisibilityPercentage from "./useVisibilityPercentage";

const useScrollingVisibilityPercentage = (
  ref: MutableRefObject<HTMLElement | SVGSVGElement | null>
) => {
  const rect = ref.current?.getBoundingClientRect();
  const percentage = useVisibilityPercentage(rect);
  const isActive = percentage != 0 && percentage != 100;

  return {
    ref,
    rect,
    percentage,
    isActive,
  };
};

export default useScrollingVisibilityPercentage;
