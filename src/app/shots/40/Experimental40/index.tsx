"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";
import { useRef, useState } from "react";

type Firework = {
  id: number;
  count: number;
  radius: number;
  position: [number, number, number];
};

export default function Background() {
  const nextFirevorId = useRef(1);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [idx, setMorphing] = useState(0);

  const onDestroy = (id: Firework["id"]) => {
    setFireworks((fireworks) =>
      fireworks.filter((firework) => firework.id !== id)
    );
  };

  const onClick = () => {
    const count = Math.floor(Math.random() * 100.0);
    const position: Firework["position"] = [
      (Math.random() - 0.5) * 2,
      Math.random(),
      (Math.random() - 0.5) * 2,
    ];
    const radius = Math.random() * 2.0;
    const id = nextFirevorId.current++;
    const firework: Firework = { id, count, radius, position };
    setFireworks((fireworks) => [...fireworks, firework]);
  };

  return (
    <BaseCanvas
      id="scene-40"
      onClick={onClick}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5],
      }}
    >
      <Experience onDectroy={onDestroy} fireworks={fireworks} />
    </BaseCanvas>
  );
}
