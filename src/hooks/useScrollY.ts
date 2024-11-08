import { useEffect, useState } from "react";
import { usePrevious } from "./usePrevious";

export default function useScrollY(selector: string) {
  const [scrollTop, setScrollTop] = useState(0);
  const prevScrollTop = usePrevious(scrollTop);
  const direction =
    scrollTop > prevScrollTop
      ? "down"
      : scrollTop < prevScrollTop
      ? "up"
      : "none";

  useEffect(() => {
    const elem = document.querySelector(selector);
    if (!elem) return;

    const handleScroll = () => {
      setScrollTop(elem.scrollTop);
    };

    elem.addEventListener("wheel", handleScroll);
    return () => {
      elem.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return { scrollTop, direction };
}
