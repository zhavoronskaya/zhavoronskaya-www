"use client";
import React from "react";
import cn from "classnames";
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
      <span className={cn(styles.burgerLine, "w-1/2")} />
      <span className={cn(styles.burgerLine, "w-full")} />
      <span className={cn(styles.burgerLine, "w-3/4")} />
      <span className={cn(styles.burgerLine, "w-1")} />
    </div>
  );
}
