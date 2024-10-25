import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
const cameraTarget = new THREE.Vector3(0, 10, 0);

const tl = gsap.timeline();

export default function Animations() {
  const camera = useThree((state) => state.camera);

  useFrame((state, delta) => {
    camera.lookAt(cameraTarget);
  });

  useGSAP(
    () => {
      // tl.fromTo(
      //   ".canvas-wrapper",
      //   { opacity: 0 },
      //   { opacity: 1.0, duration: 0.5, ease: "power2.inOut" }
      // );

      tl.fromTo(
        camera.position,
        { x: -4.73, y: 10.49, z: 5.31 },
        {
          x: -4.73,
          y: 2.49,
          z: 5.31,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-2",
            start: "clamp(top bottom)",
            end: "clamp(bottom bottom)",
            scrub: true,
          },
        }
      )
        .fromTo(
          camera.position,
          { x: -4.73, y: 2.49, z: 5.31 },
          {
            x: -1.5,
            y: 4,
            z: 6.31,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-3",
              start: "clamp(top bottom)",
              end: "clamp(bottom bottom)",
              scrub: true,
            },
          },
          ">"
        )
        .fromTo(
          camera.position,
          { x: -1.5, y: 4, z: 6.31 },
          {
            x: -12.5,
            y: -8,
            z: 8.31,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-4",
              start: "clamp(top bottom)",
              end: "clamp(bottom bottom)",
              scrub: true,
            },
          },
          ">"
        );
      tl.fromTo(
        cameraTarget,
        { x: 0, y: 10, z: 0 },
        {
          x: 0,
          y: 0.1,
          z: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".section-2",
            start: "clamp(top bottom)",
            end: "clamp(bottom bottom)",
            scrub: true,
          },
        }
      )
        .to(
          ".section-2",
          {
            opacity: 0,
            scrollTrigger: {
              trigger: ".section-3",
              start: "top bottom",
              end: "top 70%",
              scrub: 0.5,
            },
          },
          "<"
        )
        .fromTo(
          cameraTarget,
          { x: 0, y: 0.1, z: 0 },
          {
            x: -4,
            y: -0.5,
            z: 0,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-3",
              start: "clamp(top bottom)",
              end: "clamp(bottom bottom)",
              scrub: true,
            },
          },
          ">"
        )
        .fromTo(
          cameraTarget,
          {
            x: -4,
            y: -0.5,
            z: 0,
          },
          {
            x: -12,
            y: -8,
            z: 0,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-4",
              start: "clamp(top bottom)",
              end: "clamp(bottom bottom)",
              scrub: true,
            },
          },
          ">"
        );
    },
    { dependencies: [] }
  );

  return null;
}
