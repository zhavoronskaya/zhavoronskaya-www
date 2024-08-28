"use client";
import { Scroll, useIntersect, Image, ScrollControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";
import BaseCanvas from "..";
import Link from "next/link";
import { IShotData } from "@/interfaces";
type Props = {
  urls: IShotData[];
};

const GridGallery = ({ urls }: Props) => {
  return (
    <Canvas>
      <Items urls={urls} />
    </Canvas>
  );
};

export default GridGallery;

function Item({
  url,
  scale,
  position,
}: {
  url: string;
  scale: [number, number];
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <Image scale={scale} url={url} />
    </group>
  );
}

function Items({ urls }: { urls: IShotData[] }) {
  const { width, height } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  const h = height < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group>
      {urls.map((url: IShotData) => (
        <Item
          key={url.url}
          url={url.url}
          scale={[2 * w, 2 * h]}
          position={[-width / 3, height / 2.5, 0]}
        />
      ))}
      {/* <Item url="/shots/1.png" scale={[1]} position={[0, 0, -2]} /> */}
      {/* <Item
        url="/shots/1.png"
        scale={[2 * w, 2 * h]}
        position={[-width / 3, height / 2.5, 0]}
      />
      <Item url="/shots/1.png" scale={[1, w]} position={[1, 1, 0]} /> */}
    </group>
  );
}
