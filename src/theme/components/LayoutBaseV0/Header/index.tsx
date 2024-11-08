import Link from "next/link";
import React from "react";

import { LogoIcon } from "@/theme/icons";
import BirdSinging from "@/theme/illustrations/BirdSinging";
import styles from "./Header.module.css";
import Burger from "./Burger";

type Props = {
  centerSlotMaxWidth?: string;
  centerSlot?: React.ReactNode;
};
export default function Header({
  centerSlot,
  centerSlotMaxWidth = "700px",
}: Props) {
  return (
    <div id="base-layout-header" className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className="block">
          <LogoIcon />
        </Link>
      </div>

      <div className={styles.main}>
        <div
          className={styles.centerSlot}
          style={{ maxWidth: centerSlotMaxWidth }}
        >
          {centerSlot}
        </div>
      </div>

      <Burger headerId="base-layout-header" />

      <nav className={styles.nav}>
        <BirdSinging />

        <ul>
          <li>
            <Link href="/" className="text-ellipsis">
              HOME
            </Link>
          </li>

          <li>
            <Link href="/projects" className="text-ellipsis ">
              PROJECTS
            </Link>
          </li>

          <li>
            <Link href="/shots" className="text-ellipsis ">
              SHOTS
            </Link>
          </li>

          <li>
            <Link href="/albums" className="text-ellipsis ">
              MUSIC
            </Link>
          </li>

          <li>
            <Link href="/bio" className="text-ellipsis ">
              BIOGRAPHY
            </Link>
          </li>

          <li>
            <Link href="/contact" className="text-ellipsis ">
              CONTACT
            </Link>
          </li>

          <li>
            <Link href="/cv" className="text-ellipsis ">
              CV
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
