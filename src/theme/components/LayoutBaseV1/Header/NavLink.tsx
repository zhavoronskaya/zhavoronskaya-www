"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn("text-ellipsis", { ["opacity-30"]: isActive })}
    >
      {children}
    </Link>
  );
}
