"use client";
import React from "react";

export default function useWindowBounds() {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const setWindowBounds = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    setWindowBounds();

    window.addEventListener("resize", setWindowBounds);
    return () => {
      window.removeEventListener("resize", setWindowBounds);
    };
  }, []);

  return { width, height };
}
