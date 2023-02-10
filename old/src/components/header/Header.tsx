import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import IconMenu from "../icons/iconMenu/IconMenu";
import IconLogo from "../icons/iconLogo/IconLogo";
import classNames from "classnames";

type Props = {
  centerSlot?: React.ReactNode;
};
export default function Header({ centerSlot }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerClass = classNames(styles.header, {
    "js-menu-opened": isMenuOpen,
  });

  return (
    <div className={headerClass}>
      <IconLogo />

      {centerSlot}

      <div
        className={styles.menuBtn}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={styles.nav}>
        <IconMenu />
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/albums">MUSIC</Link>
          </li>
          <li>
            <Link href="/bio">BIO</Link>
          </li>
          <li>
            <Link href="/scenes">GENERATIVE ART</Link>
          </li>
          <li>
            <Link href="/cv">CV</Link>
          </li>
          <li>
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
