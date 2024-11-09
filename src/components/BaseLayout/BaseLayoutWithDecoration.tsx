"use client";

import { usePathname } from "next/navigation";
import BaseLayout from "./BaseLayout";
import Image from "next/image";
import DecorationImage from "./DecorationImage";

type Props = {
  children: React.ReactNode;
};

const BaseLayoutWithDecoration = ({ children }: Props) => {
  const pathname = usePathname();
  let decoration: React.ReactNode = null;

  if (pathname === "/contact") {
    decoration = <DecorationImage />;
  }

  return <BaseLayout decoration={decoration}>{children}</BaseLayout>;
};

export default BaseLayoutWithDecoration;
