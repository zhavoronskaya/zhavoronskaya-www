import { useEffect, useState } from "react";

export default function useScrollY(selector: string) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const elem = document.querySelector(selector);
    if (!elem) return;

    const handleScroll = () => setValue(elem.scrollTop);

    elem.addEventListener("wheel", handleScroll);
    return () => {
      elem.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return value;
}
