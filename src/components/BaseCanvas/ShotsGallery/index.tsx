"use client";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Preload,
  useVideoTexture,
} from "@react-three/drei";

import { easing } from "maath";

import BaseCanvas from "..";

import vertex from "./shaders/vertex";
import fragment from "./shaders/fragment";
import isMobile, { hasTouchSupport } from "@/helpers/DeviceDefenition";
import useScrollLock from "@/hooks/useScrollLock";
import useScrollingVisibilityPercentage from "@/hooks/useScrollingVisibilityPercentage";
import useScrollY from "@/hooks/useScrollY";

const images = [
  {
    link: "2",
    href: "/gallery/1.png",
    video: "/video/ray2-compressed-720.mp4",
  },

  {
    link: "18",
    href: "/gallery/3.png",
    video: "/video/tr1-compressed-720.mp4",
  },
  {
    link: "4",
    href: "/gallery/2.png",
    video: "/video/object2-compressed-720.mp4",
  },
  {
    link: "1",
    href: "/gallery/4.png",
    video: "/video/ray1-compressed-720.mp4",
  },
  {
    link: "12",
    href: "/gallery/5.png",
    video: "/video/fbo1-compressed-720.mp4",
  },
  {
    link: "11",
    href: "/gallery/6.png",
    video: "/video/fbo2-compressed-720.mp4",
  },
  {
    link: "15",
    href: "/gallery/7.png",
    video: "/video/fbo3-compressed-720.mp4",
  },
  {
    link: "8",
    href: "/gallery/8.png",
    video: "/video/particles2-compressed-720.mp4",
  },
  {
    link: "21",
    href: "/gallery/9.png",
    video: "/video/grid-compressed-720.mp4",
  },
  // {
  //   link: "19",
  //   href: "/gallery/10.png",
  //   video: "/video/rose-compressed-720.mp4",
  // },
  {
    link: "3",
    href: "/gallery/11.png",
    video: "/video/object1-compressed-720.mp4",
  },
  {
    link: "19",
    href: "/gallery/10.png",
    video: "/video/rose-compressed-720.mp4",
  },

  //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
  //   (u) => `/gallery/${u}.png`
  // )
];

const SHOTS_CANVAS_ID = "shots-canvas";
const deltaOffset = 1 / images.length; // 0.1
const modile = isMobile().phone;
const cameraPositionZ = modile ? 4.8 : 5.8;

type ShotGalleryState = {
  hovered: number | null;
  clicked: number | null;
};

const ShotsGallery = () => {
  const [state, setState] = useState<ShotGalleryState>({
    hovered: null,
    clicked: null,
  });

  return (
    <BaseCanvas
      id={SHOTS_CANVAS_ID}
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      // onWheel={(e) => e.stopPropagation()}
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [0, 0, cameraPositionZ],
      }}
    >
      <Items state={state} setState={setState} />
    </BaseCanvas>
  );
};

type SetStateFn = (fn: (state: ShotGalleryState) => ShotGalleryState) => void;

const touchSupport = hasTouchSupport();
const touchScreen = modile || isMobile().tablet || touchSupport;

type ItemsProps = {
  state: ShotGalleryState;
  setState: SetStateFn;
};

const Items = ({ state, setState }: ItemsProps) => {
  // const htmlScrollLock = useScrollLock("html");
  const { viewport, size } = useThree();
  const xW = modile ? 4 : 5.5;
  const gap = modile ? 0.1 : 0.2;

  return (
    <Suspense fallback={null}>
      <ScrollControls
        horizontal
        damping={0.1}
        // enabled={htmlScrollLock.isLocked}
        pages={(images.length * (xW + gap) - gap) / viewport.width}
        distance={1}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Scroll>
          {!touchScreen && (
            <ItemsScrollTracker

            // htmlScrollLock={htmlScrollLock}
            />
          )}

          {images.map((url, i) => (
            <Item
              key={url.href}
              xW={xW}
              index={i}
              clicked={i === state.clicked}
              hovered={i === state.hovered}
              setState={setState}
              position={
                new THREE.Vector3(
                  -viewport.width / 2 + xW / 2 + i * (xW + gap),
                  0,
                  0
                )
              }
            />
          ))}
        </Scroll>
      </ScrollControls>
      <Preload />
    </Suspense>
  );
};

type ItemsScrollTrackerProps = {
  htmlScrollLock?: ReturnType<typeof useScrollLock>;
};

const ItemsScrollTracker = ({}: ItemsScrollTrackerProps) => {
  const htmlScrollLock = useScrollLock("html");
  const htmlScroll = useScrollY("html");
  const scroll = useScroll();

  const prevScrollOffset = useRef(0);
  const allowedLDirection = useRef<typeof htmlScroll.direction>("up");
  const shotsCanvasRef = useRef<HTMLElement | null>(null);
  const shotsCanvasVisibility =
    useScrollingVisibilityPercentage(shotsCanvasRef);

  useEffect(() => {
    const shotsCanvas = document.getElementById(SHOTS_CANVAS_ID);
    shotsCanvasRef.current = shotsCanvas;
  }, []);

  const handleScrolltoCenter = () => {
    if (!shotsCanvasRef.current) return;

    // margin top of scrolling
    const MARGIN_TOP = modile ? 64 : 128;

    //128 - header and footer height, margin - margin top of scrolling element
    const HEIGHT_HEADER_FOOTER = 128;

    const top =
      shotsCanvasRef.current.offsetTop -
      (window.innerHeight -
        HEIGHT_HEADER_FOOTER -
        shotsCanvasRef.current.offsetHeight) /
        2 +
      MARGIN_TOP;

    document.scrollingElement?.scrollTo({
      left: 0,
      top: top,
      behavior: "smooth",
      // behavior: "instant",
    });
  };

  useFrame(() => {
    const canvasScrollDIrection =
      scroll.offset > prevScrollOffset.current
        ? "down"
        : scroll.offset < prevScrollOffset.current
        ? "up"
        : "none";

    const direction = htmlScrollLock.isLocked
      ? canvasScrollDIrection
      : htmlScroll.direction;

    // console.log("htmlScroll.direction", direction);

    if (htmlScrollLock.isLocked) {
      if (scroll.offset <= 0.01 && direction === "up") {
        htmlScrollLock.disable();
        allowedLDirection.current = "up";
        console.log("UNLOCK UP");
      } else if (scroll.offset >= 0.99 && direction === "down") {
        htmlScrollLock.disable();
        allowedLDirection.current = "down";
        console.log("UNLOCK DOWN");
      }
    } else {
      if (
        shotsCanvasVisibility.percentage >= 48 &&
        shotsCanvasVisibility.percentage <= 52 &&
        direction !== allowedLDirection.current
      ) {
        console.log("LOCK");
        htmlScrollLock.enable();
        handleScrolltoCenter();
      }
    }

    prevScrollOffset.current = scroll.offset;
  });

  return null;
};

type Props = {
  index: number;
  position: THREE.Vector3;
  xW: number;
  color?: THREE.Color;
  clicked: boolean;
  hovered: boolean;
  setState: SetStateFn;
};

function Item({
  index,
  position,
  xW,
  color,
  clicked,
  hovered,
  setState,
}: Props) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<THREE.Mesh | null>(null);
  const group = useRef<THREE.Group | null>(null);
  const scroll = useScroll();

  const url = images[index].video;
  const texture = useVideoTexture(url, {
    start: false,
    playsInline: true,
    autoplay: true,
    loop: true,
  });
  const imgRatio = texture.image.videoWidth / texture.image.videoHeight;
  const height = 1.6;
  const planeRatio = 1 / height;
  const ratio = planeRatio / imgRatio;

  // texture.repeat.x = ratio;
  // texture.offset.x = 0.5 * (1 - ratio);

  const activeRange = [index * deltaOffset, (index + 1) * deltaOffset];
  const uniforms = useRef({
    uImage: new THREE.Uniform(texture),
    uRatio: new THREE.Uniform(ratio),
    uResolution: new THREE.Uniform(new THREE.Vector2(xW, xW * height)),
    uTime: new THREE.Uniform(0),
    uActive: new THREE.Uniform(1),
  });
  useEffect(() => {
    if (isActive || hovered) {
      texture.image.play();
    } else {
      texture.image.pause();
    }
  }, [isActive, texture]);

  useEffect(() => {
    if (!group.current) return;
    if (!ref.current) return;
    if (index % 2 === 0) group.current.position.z = 0;
    else group.current.position.z = -1;

    // if (index === 0 || index === images.length - 1)
    //   group.current.position.z = 0;
    // else
    //   group.current.position.z =
    //     Math.random() > 0.5 ? 1 * Math.random() : -1 * Math.random();
  }, []);

  const animateActiveUniform = () => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.ShaderMaterial;
    const data = { progress: hovered ? 0 : 1.0 };
    const to = { progress: hovered ? 1 : 0 };

    new TWEEN.Tween(data)
      .to(to, 400)
      .easing(TWEEN.Easing.Cubic.InOut)
      // .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate(() => {
        material.uniforms.uActive.value = data.progress;
        material.needsUpdate = true;
      })
      .start();
  };

  useEffect(() => {
    animateActiveUniform();
  }, [hovered]);

  useFrame((state, delta) => {
    TWEEN.update();
    if (!group.current) return;
    if (!ref.current) return;
    if (!(ref.current.material instanceof THREE.ShaderMaterial)) return;
    ref.current.material.uniforms.uTime.value += delta;
    ref.current.material.needsUpdate = true;

    setIsActive(
      scroll.offset >= activeRange[0] && scroll.offset <= activeRange[1]
    );

    // const y = scroll.curve(
    //   index / images.length - 1.5 / images.length,
    //   2 / images.length
    // );
    // easing.dampC(
    //   //@ts-ignore
    //   ref.current.material.color,
    //   hovered || isActive ? "white" : "#bbb",
    //   hovered ? 0.3 : 0.15,
    //   delta
    // );
    // ref.current.material.zoom = THREE.MathUtils.damp(
    //   ref.current.material.zoom,
    //   hovered ? 1.5 : 1,
    //   4,
    //   delta
    // );
    // group.current.position.z = THREE.MathUtils.damp(
    //   group.current.position.z,
    //   Math.max(0, data.delta * 50),
    //   4,
    //   delta
    // );
    // ref.current.material.grayscale = THREE.MathUtils.damp(
    //   ref.current.material.grayscale,
    //   Math.max(0, 1 - scroll.delta * 10),
    //   4,
    //   delta
    // );
  });

  return (
    <group
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setState((v) => ({ ...v, hovered: index }));
      }}
      onPointerOut={() => setState((v) => ({ ...v, hovered: null }))}
      onClick={() => {
        router.push(`/shots/${images[index].link}/view`);
      }}
    >
      <mesh ref={ref} position={position}>
        <planeGeometry args={[xW, xW * height]} />
        {/* <meshBasicMaterial map={texture} toneMapped={false} transparent /> */}
        <shaderMaterial
          uniforms={uniforms.current}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
        />
      </mesh>
    </group>
  );
}

export default ShotsGallery;
