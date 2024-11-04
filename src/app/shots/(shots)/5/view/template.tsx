"use client";

import { animatePageIn } from "@/components/TransitionLink/Animation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div id="transition-element" className="">
      {children}
    </div>
  );
}
