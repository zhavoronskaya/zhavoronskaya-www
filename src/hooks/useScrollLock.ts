import { useEffect, useRef } from "react";

const useScrollLock = (selector: string, initialOverflow = "") => {
  const elem = useRef<HTMLElement | null>(null);
  const isLocked = useRef(false);

  useEffect(() => {
    elem.current = document.querySelector(selector);
  }, [selector]);

  const enable = () => {
    if (!elem.current) return;
    // console.log("LOCK");
    isLocked.current = true;
    elem.current.style.overflow = "hidden";
  };

  const disable = () => {
    if (!elem.current) return;
    // console.log("UNLOCK");
    isLocked.current = false;
    elem.current.style.overflow = initialOverflow;
  };

  return {
    elem,
    enable,
    disable,
    isLocked: isLocked.current,
  };
};

export default useScrollLock;
