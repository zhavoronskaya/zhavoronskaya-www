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

const FadingText = ({ id, children, className }: Props) => {
  const words = children.split(" ");

  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.to(
        ".letter",
        {
          duration: 0.2,
          opacity: 0,
          repeat: 1,
          repeatDelay: 0.15,
          delay: 0.05,
          stagger: { each: 0.05, from: "random", grid: "auto" },
          yoyo: true,
          ease: "sine.out",
          scrollTrigger: {
            trigger: ".subtitle",
          },
        },
        "<"
      );
    },

    { dependencies: [] }
  );

  return (
    <div id={id} className={className}>
      {words.map((word, widx) => {
        const letters = word.split("");

        return (
          <span className="inline-block" key={widx}>
            {letters.map((letter, idx) => {
              const isLast = idx === letters.length - 1;
              return (
                <span
                  key={`${widx}-${idx}`}
                  className={`letter letter-${idx + 1} inline-block`}
                >
                  {isLast ? <>{letter}&nbsp;</> : letter}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default FadingText;
