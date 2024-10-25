"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import styles from "./Header.module.css";
import { Logo, Burger, Cross } from "@/components/UI/icons";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  bgRight?: string;
};

const Header = ({ bgRight }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuOpen = () => {
    setMenuOpen(true);
    document.body.style.backgroundColor = "#F7DAE2";
    document.body.style.overflow = "hidden";
  };

  const menuClose = () => {
    setMenuOpen(false);
    document.body.style.backgroundColor = "rgba(248, 244, 244, 1)";
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <header className="fixed h-[64px] left-0 top-0 w-full z-[21]">
        <div className="flex justify-between w-full px-4 sm:px-6 py-4">
          <Link href="/">
            <Logo />
          </Link>

          <div className="relative pointer" onClick={menuOpen}>
            <Burger />
          </div>
        </div>
        {/* <AnimatePresence>
          <motion.div
            key={Date.now()}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
          > */}
        {isMenuOpen && <Menu onClose={menuClose} />}
        {/* </motion.div>
        </AnimatePresence> */}
      </header>

      <HeaderBackground right={bgRight} />
    </>
  );
};

const HeaderBackground = ({ right = "0" }: { right?: string }) => {
  return (
    <div
      className="fixed h-[64px] left-0 top-0 bg-background-color z-[19]"
      style={{ right }}
    >
      <div className="absolute sm:left-6 left-4 top-16">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="#F8F4F4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58172 0 0 3.58172 0 8V0H8Z"
          />
        </svg>
      </div>
      <div className="absolute sm:right-6 right-4 top-16">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="#F8F4F4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 8C8 3.58172 4.41828 1.93129e-07 0 0L8 3.49691e-07L8 8Z"
          />
        </svg>
      </div>
    </div>
  );
};

const Menu = ({ onClose }: { onClose: () => void }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
  }, []);

  let className = `blur1 fixed w-full h-full left-0 top-0 px-4 sm:px-6 py-16 backdrop-blur-sm bg-accent-color-transparent`;
  // let className = `${styles.menu} blur1 fixed w-full h-full left-0 top-0 px-4 sm:px-6 py-16 backdrop-blur-sm bg-accent-color-transparent`;

  return (
    // <motion.div
    //   key={Date.now()}
    //   initial={{ opacity: 0 }}
    //   exit={{ opacity: 0, filter: "blur(0px)" }}
    //   animate={{ opacity: 1, filter: "blur(5px)" }}
    //   transition={{ ease: "easeInOut", duration: 0.75 }}
    // >
    // <AnimatePresence>
    <motion.div
      key={Date.now()}
      initial={{ filter: "blur(4px)", opacity: 0 }}
      exit={{ filter: "blur(4px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      onClick={onClose}
      className={className}
    >
      <div
        className="pointer absolute top-4 sm:right-6 right-4"
        onClick={onClose}
      >
        <Cross />
      </div>
      <div className="relative h-full w-full">
        <div
          // className={styles.menublock + " absolute h-full w-full"}
          className={"absolute h-full w-full"}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="bg-accent-purple h-full rounded-lg border border-border-color ">
            <ul className="flex flex-col items-center h-full justify-center gap-8 sm:gap-4 md:gap-0 text-menum sm:text-menut lg:text-menu font-bold">
              <li>
                <Link
                  href="/"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/shots"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  shots
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  projects
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  skills
                </Link>
              </li>
              <li>
                <Link
                  href="/music"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  music
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </motion.div>
    // </AnimatePresence>
  );
};

export default Header;
