import Link from "next/link";
import React from "react";
import classNames from "classnames";

import styles from "./Header.module.css";
import IconMenu from "../../theme/Icon/iconMenu/IconMenu";
import IconLogo from "../../theme/Icon/iconLogo/IconLogo";

type Props = {
  centerSlotMaxWidth?: string;
  centerSlot?: React.ReactNode;
};
export default function Header({
  centerSlot,
  centerSlotMaxWidth = "700px",
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerClass = classNames(styles.header, {
    "js-menu-opened": isMenuOpen,
  });

  return (
    <div className={headerClass}>
      <div className={styles.left}>
        <Link href="/">
          <IconLogo />
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

      <div
        className={styles.burger}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>

      <nav className={styles.nav}>
        <IconMenu />
        <ul>
          <li>
            <Link href="/" className="text-ellipsis ">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/albums" className="text-ellipsis ">
              MUSIC
            </Link>
          </li>
          <li>
            <Link href="/scenes" className="text-ellipsis ">
              DIGITAL ART
            </Link>
          </li>
          <li>
            <Link href="/bio" className="text-ellipsis ">
              BIO
            </Link>
          </li>
          <li>
            <Link href="/cv" className="text-ellipsis ">
              CV
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-ellipsis ">
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
