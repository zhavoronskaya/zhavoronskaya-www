import Triangle from "./Triangle.js";
import * as THREE from "three";
import React from "react";
import { useFrame } from "@react-three/fiber";

const wing = [
  new THREE.Vector3(0, 0.9, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(3, 0.75, 0),
];
const body = [
  new THREE.Vector3(-0.5, -0.25, 0),
  new THREE.Vector3(-0.5, 0.25, 0),
  new THREE.Vector3(2, 0, 0),
];

const Bird = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const wingLeftRef = React.useRef();
  const wingRightRef = React.useRef();
  const offset = Math.random();
  useFrame((state, delta) => {
    wingLeftRef.current.rotation.x = Math.sin(
      state.clock.getElapsedTime() * 10 + offset
    );
    wingRightRef.current.rotation.x = -Math.sin(
      state.clock.getElapsedTime() * 10 + offset
    );
  });

  const scaleArr = React.useMemo(() => {
    return [scale, scale, scale];
  }, [scale]);

  return (
    <group position={position} rotation={rotation} scale={scaleArr}>
      <Triangle vertices={body} />
      <Triangle
        ref={wingLeftRef}
        vertices={wing}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <Triangle
        ref={wingRightRef}
        vertices={wing}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
    </group>
  );
};

export default Bird;
