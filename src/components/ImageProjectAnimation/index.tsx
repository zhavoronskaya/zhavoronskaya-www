"use client";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

export function ImageProjectAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      tl.to(".image", {
        duration: 0.2,
        ease: "power2.inOut",
        y: -50,
        scale: 1.2,
        // yoyo: true,
        scrollTrigger: {
          trigger: ".gallery",
          scrub: true,
          // start: "5% bottom",
        },
      })
        .to(
          ".image-2",
          {
            duration: 0.2,
            ease: "power2.inOut",
            x: 0,
            // yoyo: true,
            immediateRender: false,
            scrollTrigger: {
              trigger: ".gallery",
              scrub: true,
              // start: "5% bottom",
            },
          },
          "<"
        )
        .to(
          ".image-3",
          {
            duration: 0.2,
            ease: "power2.inOut",
            // yPercent: -50,
            x: 0,
            yoyo: true,
            immediateRender: false,
            scrollTrigger: {
              trigger: ".gallery",
              scrub: true,
              // start: "5% bottom",
            },
          },
          "<"
        );
    },

    { dependencies: [] }
  );

  return null;
}
