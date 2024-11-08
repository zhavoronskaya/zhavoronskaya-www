"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  id?: string;
  delay?: number;
  className?: string;
};

const FillingSvg = ({ id, className }: Props) => {
  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.to(
        ".heart-svg",
        {
          duration: 0.5,
          fill: "#6883BA",
          stagger: 0.8,
          // stagger: { each: 0.8, from: "random", grid: "auto" },
          yoyo: true,
          ease: "sine.out",
          scrollTrigger: {
            trigger: ".trigger",
            scrub: true,
            pin: ".trigger",
          },
        },
        "<"
      );
    },

    { dependencies: [] }
  );

  return null;
};

export default FillingSvg;
