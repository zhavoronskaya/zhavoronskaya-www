import React from "react";

import BirdSinging from "@/theme/illustrations/BirdSinging";
import NavLink from "./NavLink";
import styles from "./Nav.module.css";

type Props = {};

export default function Nav({}: Props) {
  return (
    <nav className={styles.nav}>
      <NavLink href="/">HOME</NavLink>
      <NavLink href="/projects">PROJECTS</NavLink>
      <NavLink href="/shots">SHOTS</NavLink>
      <NavLink href="/albums">MUSIC</NavLink>
      <NavLink href="/bio">BIOGRAPHY</NavLink>
      <NavLink href="/contact">CONTACT</NavLink>
      <NavLink href="/cv">CV</NavLink>
      <BirdSinging />
    </nav>
  );
}
