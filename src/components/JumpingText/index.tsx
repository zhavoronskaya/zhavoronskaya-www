"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  id?: string;
  children: string;
  delay?: number;
  className: string;
};

const JumpingText = ({ id, children, className }: Props) => {
  const words = children.split(" ");
  const letters = children.split("");

  const tl = gsap.timeline();
  useGSAP(
    () => {
      tl.to(".letter", {
        duration: 0.2,
        y: 30,
        repeat: 1,
        delay: 0.2,
        stagger: { each: 0.1, from: "random", grid: "auto" },
        yoyo: true,
        ease: "sine.out",
        scrollTrigger: {
          trigger: ".title",
        },
      });
    },

    { dependencies: [] }
  );

  return (
    <span id={id} className={className}>
      {words.map((word, idx) => {
        return letters.map((letter, idx) => {
          return (
            <span
              key={letter + idx}
              className={`letter letter-${idx + 1} inline-block`}
            >
              {letter === " " ? <>&nbsp;</> : letter}
            </span>
          );
        });
      })}
    </span>
  );
};

export default JumpingText;
