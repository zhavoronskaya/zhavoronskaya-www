"use client";
import { gsap } from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";

// import isMobile from "@/helpers/DeviceDefenition";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(useGSAP);

export function HomeSvgAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".home-flower", {
        duration: 0.2,
        ease: "power1.inOut",
        rotation: -20,
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: ".section-1",
          // start: "5% bottom",
        },
      });
      tl.to(
        ".home-heart",
        {
          duration: 0.5,
          ease: "elastic",
          scale: 1.1,
          repeat: -1,
          yoyo: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".home-heart",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function ShotsSvgAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".path-bird-heart", {
        duration: 0.2,
        ease: "sine.inOut",
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 86%",
        scrollTrigger: {
          trigger: ".shots-section-1",
          // scrub: true,
          // start: "5% bottom",
        },
      });
      tl.to(
        ".shots-heart",
        {
          duration: 0.2,
          ease: "sine.inOut",
          scale: 1.2,
          rotation: -10,
          x: 10,
          y: 20,
          repeat: -1,
          yoyo: true,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".shots-heart",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function ShotLayoutSvgAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".path-heart-shot", {
        duration: 1,
        opacity: 0,
        repeat: -1,
        delay: 0.5,
        stagger: 0.2,
        yoyo: true,
        ease: "sine.out",
        scrollTrigger: {
          trigger: ".short-heart-layout",
        },
      }).to(
        ".shot-flower-layout",
        {
          duration: 0.8,
          rotation: 2,
          repeat: -1,
          yoyo: true,
          transformOrigin: "50% 0%",
          immediateRender: false,
          ease: "sine.out",
          scrollTrigger: {
            trigger: ".shot-flower-layout",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function ProjectsSvgAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".projects-flower", {
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0, scale: 1 },
            { x: -300, y: 120, scale: 1.2 },
            { x: -600, y: -120, scale: 1.4 },
          ],
          curviness: 4,
          alignOrigin: [0.5, 0.5],
        },
        scrollTrigger: {
          trigger: ".projects-title",
        },
      }).to(
        ".projects-heart",
        {
          duration: 4,
          motionPath: {
            path: [
              { x: 0, y: 0, scale: 1, opacity: 0 },
              { x: -60, y: -80, scale: 1.1, opacity: 0.25 },
              { x: -120, y: -140, scale: 1.2, opacity: 0.5 },
              { x: 120, y: -220, scale: 1.3, opacity: 0.75 },
              { x: 0, y: -300, scale: 1.4, opacity: 1 },
            ],
            // autoRotate: true,
            alignOrigin: [0.5, 0.5],
            curviness: 2,
          },
          immediateRender: false,
          repeat: -1,
          yoyo: true,
          ease: "sine.out",
          scrollTrigger: {
            trigger: ".projects-heart",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function ProjectLayoutSvgAnimation() {
  const tl = gsap.timeline();

  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".project-bird", {
        duration: 1,
        rotation: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.out",
        scrollTrigger: {
          trigger: ".project-bird",
        },
      });
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function SkillsSvgAnimation() {
  const tl = gsap.timeline();
  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".path-flower-skiils", {
        duration: 0.2,
        ease: "sine.inOut",
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 86%",
        scrollTrigger: {
          trigger: ".skills-section-1",
          // scrub: true,
          // start: "5% bottom",
        },
      })
        .to(
          ".path-stars-skills",
          {
            duration: 1,
            opacity: 0,
            repeat: -1,
            delay: 0.5,
            stagger: 0.2,
            yoyo: true,
            immediateRender: false,
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".skills-stars",
            },
          },
          "<"
        )
        .to(
          ".skills-bird",
          {
            duration: 1,
            // rotation: 45,
            x: 30,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            immediateRender: false,
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".skills-bird",
            },
          },
          "<"
        )
        .to(
          ".skills-wings",
          {
            duration: 6,
            motionPath: {
              path: [
                { x: 0, y: 0 },
                { x: -80, y: -80 },
                { x: 0, y: -300 },
                { x: -80, y: 80 },
                { x: -160, y: 160 },
              ],
              alignOrigin: [0.5, 0.5],
              curviness: 2,
            },
            repeat: -1,
            immediateRender: false,
            yoyo: true,
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".skills-wings",
            },
          },
          "<"
        )
        .to(
          ".skills-flower",
          {
            duration: 8,
            motionPath: {
              path: [
                { rotation: 0, scale: 1 },
                { rotation: 360, scale: 0.8 },
                { rotation: 0, scale: 1 },
              ],

              curviness: 2,
            },

            repeat: -1,
            immediateRender: false,
            // yoyo: true,
            transformOrigin: "50% 26%",
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".skills-flower",
            },
          },
          "<"
        );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function MusicSvgAnimation() {
  const tl = gsap.timeline();

  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".music-flower", {
        duration: 0.5,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 86%",
        ease: "sine.out",
        scrollTrigger: {
          trigger: ".music-flower",
        },
      })
        .to(
          ".path-bird-music",
          {
            duration: 1,
            motionPath: {
              path: [
                { x: 0, y: 0, rotation: 0, opacity: 1 },
                { x: 0, y: 40, rotation: 20, opacity: 1 },
                { x: 0, y: 80, rotation: 80, opacity: 0 },
              ],

              curviness: 2,
            },
            repeat: -1,
            delay: 0.1,
            stagger: 0.2,
            // yoyo: true,
            immediateRender: false,
            transformOrigin: "50% 86%",
            ease: "linear",
            scrollTrigger: {
              trigger: ".music-bird",
            },
          },
          "<"
        )
        .to(
          ".path-eye-bird-music",
          {
            duration: 1,
            scale: 1.5,
            repeat: -1,
            yoyo: true,
            immediateRender: false,
            transformOrigin: "50% 86%",
            ease: "sine.out",
            scrollTrigger: {
              trigger: ".music-flower",
            },
          },
          "<"
        );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function AlbumSvgAnimation() {
  const tl = gsap.timeline();

  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".path-notes-album", {
        duration: 0.8,
        motionPath: {
          path: [
            { y: 0, opacity: 1 },
            { y: -10, opacity: 1 },
            { y: 10, opacity: 0 },
          ],

          curviness: 2,
        },
        repeat: -1,
        delay: 0.1,
        stagger: 0.2,
        yoyo: true,
        transformOrigin: "50% 86%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".album-notes",
        },
      });
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}

export function ContactSvgAnimation() {
  const tl = gsap.timeline();

  useGSAP(
    () => {
      console.log("ANIMATION");
      tl.to(".path-note-contact", {
        duration: 1.2,
        motionPath: {
          path: [
            { y: 0, opacity: 1 },
            { y: -10, opacity: 1 },
            { y: 10, opacity: 0 },
          ],

          curviness: 2,
        },
        repeat: -1,
        yoyo: true,
        transformOrigin: "50% 86%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".contact-bird",
        },
      }).to(
        ".contact-bird",
        {
          duration: 0.6,
          rotation: 5,
          repeat: -1,
          yoyo: true,
          transformOrigin: "50% 86%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".contact-bird",
          },
        },
        "<"
      );
      ScrollTrigger.refresh();
    },

    { dependencies: [] }
  );

  return null;
}
