"use client";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Image as DreiImage,
  ScrollControls,
  Scroll,
  useScroll,
  Preload,
  useVideoTexture,
  useTexture,
  useAspect,
} from "@react-three/drei";

import { easing } from "maath";

import BaseCanvas from "..";
import { useRouter } from "next/navigation";
import { stat } from "fs";

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

const deltaOffset = 1 / images.length; // 0.1

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

  texture.repeat.x = ratio;
  texture.offset.x = 0.5 * (1 - ratio);

  const activeRange = [index * deltaOffset, (index + 1) * deltaOffset];

  useEffect(() => {
    if (isActive || hovered) {
      texture.image.play();
    } else {
      texture.image.pause();
    }
  }, [isActive, texture]);

  useEffect(() => {
    if (!group.current) return;

    if (index % 2 === 0) group.current.position.z = 0;
    else group.current.position.z = -1;
    // if (index === 0 || index === images.length - 1)
    //   group.current.position.z = 0;
    // else
    //   group.current.position.z =
    //     Math.random() > 0.5 ? 1 * Math.random() : -1 * Math.random();
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (!group.current) return;
    // if (!isBasicMaterial(ref.current.material)) return null;

    setIsActive(
      scroll.offset >= activeRange[0] && scroll.offset <= activeRange[1]
    );

    const y = scroll.curve(
      index / images.length - 1.5 / images.length,
      2 / images.length
    );

    easing.dampC(
      //@ts-ignore
      ref.current.material.color,
      hovered || isActive ? "white" : "#bbb",
      hovered ? 0.3 : 0.15,
      delta
    );

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
      onPointerEnter={() => setState((v) => ({ ...v, hovered: index }))}
      onPointerOut={() => setState((v) => ({ ...v, hovered: null }))}
      onClick={() => {
        router.push(`/shots/${images[index].link}/view`);
      }}
    >
      <mesh
        ref={ref}
        position={position}
        // scale={[xW, xW, 1]}
      >
        <planeGeometry args={[xW, xW * height]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          // opacity={hovered ? 1 : 0.8}
          // opacity={0.5}
        />
      </mesh>
    </group>
  );
}

type ItemsProps = {
  state: ShotGalleryState;
  setState: SetStateFn;
};
const Items = ({ state, setState }: ItemsProps) => {
  const { width } = useThree((state) => state.viewport);

  const xW = width > 3.5 ? 5.5 : 1;
  const gap = width > 3.5 ? 0.2 : 0.1;

  return (
    <Suspense fallback={null}>
      <ScrollControls
        horizontal
        damping={0.1}
        pages={(images.length * (xW + gap) - gap) / width}
        distance={1}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <Scroll>
          {images.map((url, i) => (
            <Item
              key={url.href}
              xW={xW}
              index={i}
              clicked={i === state.clicked}
              hovered={i === state.hovered}
              setState={setState}
              position={
                new THREE.Vector3(-width / 2 + xW / 2 + i * (xW + gap), 0, 0)
              }
            />
          ))}
        </Scroll>
        {/* <Scroll html>
          <h1 style={{ position: "absolute", top: "20vh", left: "-75vw" }}>
            home
          </h1>
          <h1 style={{ position: "absolute", top: "20vh", left: "25vw" }}>
            to
          </h1>
          <h1 style={{ position: "absolute", top: "20vh", left: "125vw" }}>
            be
          </h1>
          <h1 style={{ position: "absolute", top: "20vh", left: "225vw" }}>
            home
          </h1>
          <h1 style={{ position: "absolute", top: "20vh", left: "325vw" }}>
            to
          </h1>
          <h1 style={{ position: "absolute", top: "20vh", left: "425vw" }}>
            be
          </h1>
        </Scroll> */}
      </ScrollControls>
      <Preload />
    </Suspense>
  );
};

type SetStateFn = (fn: (state: ShotGalleryState) => ShotGalleryState) => void;
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
    <BaseCanvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Items state={state} setState={setState} />
    </BaseCanvas>
  );
};
export default ShotsGallery;
