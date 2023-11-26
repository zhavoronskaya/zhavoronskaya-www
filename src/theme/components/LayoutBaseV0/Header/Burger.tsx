"use client";
import React from "react";
import styles from "./Burger.module.css";

type BurgerProps = {
  headerId: string;
};

export default function Burger({ headerId }: BurgerProps) {
  const handleClick = () => {
    const header = document.getElementById(headerId);
    header?.classList.toggle("js-menu-opened");
  };

  return (
    <div className={styles.burger} onClick={handleClick}>
      <span className={styles.burgerLine} />
      <span className={styles.burgerLine} />
      <span className={styles.burgerLine} />
    </div>
  );
}
