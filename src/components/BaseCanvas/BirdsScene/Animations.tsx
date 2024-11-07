import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import isMobile from "@/helpers/DeviceDefenition";
import {
  CAMERA_POSITIONINGS_MAP,
  CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN,
} from "./CameraSettings";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
const cameraTarget = new THREE.Vector3(0, 10, 0);

const tl = gsap.timeline();

export default function Animations() {
  // const camera = useThree((state) => state.camera);
  const { size, camera } = useThree();

  const touchScreen =
    isMobile().phone || (isMobile().tablet && size.width < 1024);

  // console.log(touchScreen);

  const trigger1 = touchScreen ? ".section-3" : ".section-2";
  const trigger2 = touchScreen ? ".section-5" : ".section-4";

  const cameraData = touchScreen
    ? CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN
    : CAMERA_POSITIONINGS_MAP;
  useFrame((state, delta) => {
    camera.lookAt(cameraTarget);
  });

  // useEffect(() => {
  //   setTimeout(() => {}, 0);
  // }, [size.width, size.height]);
  useGSAP(
    () => {
      tl.fromTo(
        camera.position,
        {
          x: cameraData["default"].position.x,
          y: cameraData["default"].position.y,
          z: cameraData["default"].position.z,
        },
        {
          x: cameraData["firsTurn"].position.x,
          y: cameraData["firsTurn"].position.y,
          z: cameraData["firsTurn"].position.z,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: trigger1,
            start: "clamp(top bottom)",
            end: "clamp(bottom bottom)",
            scrub: true,
          },
        }
      )
        .fromTo(
          camera.position,
          {
            x: cameraData["firsTurn"].position.x,
            y: cameraData["firsTurn"].position.y,
            z: cameraData["firsTurn"].position.z,
          },
          {
            x: cameraData["secondTurn"].position.x,
            y: cameraData["secondTurn"].position.y,
            z: cameraData["secondTurn"].position.z,
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
        )
        .fromTo(
          camera.position,
          {
            x: cameraData["secondTurn"].position.x,
            y: cameraData["secondTurn"].position.y,
            z: cameraData["secondTurn"].position.z,
          },
          {
            x: cameraData["lastTurn"].position.x,
            y: cameraData["lastTurn"].position.y,
            z: cameraData["lastTurn"].position.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-5",
              start: "clamp(center bottom)",
              end: "clamp(bottom bottom)",
              scrub: true,
            },
          },
          ">"
        );
      tl.fromTo(
        cameraTarget,
        {
          x: cameraData["default"].target.x,
          y: cameraData["default"].target.y,
          z: cameraData["default"].target.z,
        },
        {
          x: cameraData["firsTurn"].target.x,
          y: cameraData["firsTurn"].target.y,
          z: cameraData["firsTurn"].target.z,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: trigger1,
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
          {
            x: cameraData["firsTurn"].target.x,
            y: cameraData["firsTurn"].target.y,
            z: cameraData["firsTurn"].target.z,
          },
          {
            x: cameraData["secondTurn"].target.x,
            y: cameraData["secondTurn"].target.y,
            z: cameraData["secondTurn"].target.z,
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
        )
        .to(
          ".section-3",
          {
            opacity: 0,
            scrollTrigger: {
              trigger: trigger2,
              start: "top bottom",
              end: "top 70%",
              scrub: 0.5,
            },
          },
          "<"
        )
        .fromTo(
          cameraTarget,
          {
            x: cameraData["secondTurn"].target.x,
            y: cameraData["secondTurn"].target.y,
            z: cameraData["secondTurn"].target.z,
          },
          {
            x: cameraData["lastTurn"].target.x,
            y: cameraData["lastTurn"].target.y,
            z: cameraData["lastTurn"].target.z,
            ease: "power1.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: ".section-5",
              start: "clamp(center bottom)",
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
