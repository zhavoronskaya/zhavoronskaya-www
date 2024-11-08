"use client";
import React from "react";
import { ScrollingCtx } from "./useScrolling";

const Scrolling = ({
  children,
  targetId,
}: {
  children: React.ReactNode;
  targetId: string;
}) => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const scrolling = document.getElementById(targetId);
    if (!scrolling) return;

    const handleScroll = (evt: Event) => {
      const element = evt.target as HTMLElement;
      const elementRect = element.getBoundingClientRect();
      const scrollY = element.scrollTop;
      const scrollPct = scrollY / (element.scrollHeight - window.innerHeight);
      // console.log("scrollPct", scrollPct);
      const offset = Math.min(1, scrollPct);

      setOffset(offset);
    };

    scrolling.addEventListener("scroll", handleScroll);

    return () => {
      scrolling.removeEventListener("scroll", handleScroll);
    };
  }, [targetId]);

  return (
    <ScrollingCtx.Provider value={{ targetId, offset }}>
      {children}
    </ScrollingCtx.Provider>
  );
};

export default Scrolling;
