import Link from "next/link";
import React from "react";

import { LogoIcon } from "@/theme/icons";
import Burger from "./Burger";
import NavClosingHandler from "./NavClosingHandler";
import Nav from "./Nav";

type Props = {
  centerSlot?: React.ReactNode;
};

export default function Header({ centerSlot }: Props) {
  return (
    <header id="base-layout-header" className="flex p-4">
      <Link href="/" className="block">
        <LogoIcon />
      </Link>

      <div className="flex-1 items-center">{centerSlot}</div>

      <Burger headerId="base-layout-header" />

      <Nav />
      <NavClosingHandler headerId="base-layout-header" />
    </header>
  );
}
