"use client";

import { usePathname } from "next/navigation";
import BaseLayout from "./BaseLayout";
import Image from "next/image";

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
        priority={true}
      />
    );
  }

  return <BaseLayout decoration={decoration}>{children}</BaseLayout>;
};

export default BaseLayoutWithDecoration;
