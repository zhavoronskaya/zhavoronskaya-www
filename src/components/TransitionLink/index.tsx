"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { animatePageOut } from "./Animation";
import Link from "next/link";

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }
    if (pathname === href) return;
    animatePageOut(href, router);
  };

  // return (
  //   <button className={className} onClick={handleClick}>
  //     {children}
  //   </button>
  // );

  return (
    <a className={className} onClick={handleClick} href={href}>
      {children}
    </a>
  );
}
