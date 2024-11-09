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
  y?: number;
};

const JumpingText = ({ id, children, className, y = 18 }: Props) => {
  const words = children.split(" ");

  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.to(
        ".letter",
        {
          duration: 0.2,
          y: y,
          rotate: Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 20,
          repeat: 1,
          repeatDelay: 0.2,
          delay: 0.2,
          stagger: { each: 0.1, from: "random", grid: "auto" },
          yoyo: true,
          ease: "sine.out",
          scrollTrigger: {
            trigger: ".title",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
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
                  {/* {letter} */}
                  {isLast ? <>{letter}&nbsp;</> : letter}
                  {/* {widx !== words.length ? "" : " "} */}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default JumpingText;
