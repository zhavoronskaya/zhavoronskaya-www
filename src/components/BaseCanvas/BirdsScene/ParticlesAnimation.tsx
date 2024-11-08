import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

type Props = {
  particles: THREE.Points;
};

export default function ParticlesAnimation({ particles }: Props) {
  const tl = gsap.timeline();
  useFrame((state, delta) => {
    // console.log(camera.position);
  });

  useGSAP(
    () => {
      tl.fromTo(
        particles.position,
        { x: -4.73, y: 2.49, z: 5.31 },
        {
          x: -4.73,
          y: 2.49,
          z: 5.31,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-2",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      ).fromTo(
        particles.position,
        { x: -4.73, y: 2.49, z: 5.31 },
        {
          x: 5.73,
          y: 4.49,
          z: 5.31,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-3",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5,
          },
        }
      );
    },
    { dependencies: [] }
  );

  return null;
}
