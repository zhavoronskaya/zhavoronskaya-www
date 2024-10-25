"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import BaseLayout from "./BaseLayout";

type Props = {
  children: React.ReactNode;
};

const BaseLayoutWithDecoration = ({ children }: Props) => {
  const pathname = usePathname();

  let decoration: React.ReactNode = null;

  if (pathname === "/contact") {
    decoration = (
      <Image
        width="1648"
        height="2198"
        alt="contact"
        className="object-cover w-full h-full"
        src="/image/contact.png"
      />
    );
  }

  return <BaseLayout decoration={decoration}>{children}</BaseLayout>;
};

export default BaseLayoutWithDecoration;
