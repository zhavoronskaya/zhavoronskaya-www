import useWindowBounds from "./useWindowBounds";

export default function useVisibilityPercentage(rect: DOMRect | undefined) {
  const windowBounds = useWindowBounds();

  if (!rect) return 0;

  const viewportHeight = windowBounds.height;

  if (rect.top > viewportHeight) {
    // If we haven't reached the elem yet

    return 0;
  } else if (rect.bottom < 0) {
    // If we've completely scrolled past the elem
    return 100;
  } else {
    // When the elem is in the viewport
    const distance = viewportHeight - rect.top;
    return distance / ((viewportHeight + rect.height) / 100);
  }
}
