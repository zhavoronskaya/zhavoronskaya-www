"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import styles from "./Header.module.css";
import { Logo, Burger, Cross } from "@/components/UI/icons";
import TransitionLink from "@/components/TransitionLink";

type Props = {
  bgRight?: string;
};

const Header = ({ bgRight }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuOpen = () => {
    setMenuOpen(true);

    // // document.body.style.backgroundColor = "#F7DAE2";
    // document.body.style.overflow = "hidden";
    // const header = document.querySelector("header");
    // if (header) header.style.zIndex = "201";
  };

  const menuClose = () => {
    const tl = gsap.timeline();
    tl.to(".link", {
      duration: 0.2,
      y: -40,
      delay: 0.1,
      stagger: 0.1,
      opacity: 0,
      ease: "sine.out",
    }).to(
      ".menu",
      {
        duration: 0.5,
        ease: "power1.inOut",
        // y: "-100%",
        opacity: 0,
        onComplete: () => {
          setMenuOpen(false);
        },
      },
      ">"
    );
    //
    // document.body.style.backgroundColor = "rgba(248, 244, 244, 1)";
    // document.body.style.overflow = "auto";
    // const header = document.querySelector("header");
    // if (header) header.style.zIndex = "50";
  };

  return (
    <>
      <header className="fixed h-[64px] left-0 top-0 w-full z-[50]">
        <div className="flex justify-between w-full px-4 sm:px-6 py-4">
          <TransitionLink href="/">
            <Logo />
          </TransitionLink>

          <div className="relative pointer" onClick={menuOpen}>
            <Burger />
          </div>
        </div>

        {isMenuOpen && <Menu onClose={menuClose} />}
      </header>

      <HeaderBackground right={bgRight} />
    </>
  );
};

const HeaderBackground = ({ right = "0" }: { right?: string }) => {
  return (
    <div
      className="fixed h-[64px] left-0 top-0 bg-background-color z-[49]"
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
    // setIsActive(true);
    const tl = gsap.timeline();
    tl.to(".menu", {
      duration: 0.5,
      ease: "power1.inOut",
      // y: 0,
      opacity: 1,
    }).to(
      ".link",
      {
        duration: 0.2,
        y: 0,
        delay: 0.1,
        stagger: 0.1,
        opacity: 1,
        ease: "sine.out",
      },
      ">"
    );
  }, []);

  let className = `menu fixed w-full h-full left-0 top-0 px-4 sm:px-6 py-16 opacity-0 bg-background-color`;
  //let className = `menu fixed w-full h-full left-0 top-0 px-4 sm:px-6 py-16 opacity-1 translate-y-[-100%] bg-background-color`;

  return (
    <div onClick={onClose} className={className}>
      <div
        className="pointer absolute top-4 sm:right-6 right-4"
        onClick={onClose}
      >
        <Cross />
      </div>
      <div className="relative h-full w-full">
        <div
          // className={styles.menublock + " absolute h-full w-full"}
          className={" absolute h-full w-full"}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="h-full">
            <ul className="flex flex-col items-center h-full justify-center gap-8 sm:gap-4 md:gap-0 text-menum sm:text-menut lg:text-menu font-bold">
              <li className="link opacity-0 translate-y-[40px]">
                <TransitionLink
                  href="/"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  home
                </TransitionLink>
              </li>
              <li className="link opacity-0 translate-y-[40px]">
                <TransitionLink
                  href="/shots"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  shots
                </TransitionLink>
              </li>
              <li className="link opacity-0 translate-y-[40px]">
                <TransitionLink
                  href="/projects"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  projects
                </TransitionLink>
              </li>
              <li className="link opacity-0  translate-y-[40px]">
                <TransitionLink
                  href="/skills"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  skills
                </TransitionLink>
              </li>
              <li className="link opacity-0 translate-y-[40px]">
                <TransitionLink
                  href="/music"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  music
                </TransitionLink>
              </li>
              <li className="link opacity-0 translate-y-[40px]">
                <TransitionLink
                  href="/contact"
                  className="uppercase hover:text-accent-color-active"
                  onClick={onClose}
                >
                  contact
                </TransitionLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
