"use client";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  headerId: string;
};

export default function NavClosingHandler({ headerId }: Props) {
  const pathname = usePathname();

  React.useEffect(() => {
    const header = document.getElementById(headerId);
    header?.classList.remove("js-menu-opened");
  }, [headerId, pathname]);

  return null;
}
