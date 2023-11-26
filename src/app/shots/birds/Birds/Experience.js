import React from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Bird from "./components/Bird";

const BIRDS_COUNT = 100;

const Birds = React.forwardRef((props, ref) => {
  const birds = React.useMemo(() => {
    const birdsArr = [...Array(BIRDS_COUNT)];

    return birdsArr.map(() => {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const rotation = [0, 0, 0];

      return {
        position,
        rotation,
        scale: Math.random() * 0.08,
      };
    });
  }, []);

  return (
    <group ref={ref}>
      {birds.map((bird, idx) => {
        return (
          <Bird
            key={idx}
            scale={bird.scale}
            position={bird.position}
            rotation={bird.rotation}
          />
        );
      })}
    </group>
  );
});

export default function Experience() {
  const birdsRef = React.useRef();
  useFrame((state) => {
    if (!birdsRef.current) return;
    birdsRef.current.position.x = Math.sin(state.clock.getElapsedTime()) * 5;
    birdsRef.current.position.z = Math.cos(state.clock.getElapsedTime()) * 5;
    birdsRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    // birdsRef.current.position.y += Math.cos(state.clock.getElapsedTime()) * 0.1;
  });
  return (
    <>
      {/* <OrbitControls /> */}
      {/* <EffectComposer></EffectComposer>

      <color args={["#F3CBFE"]} attach="background" /> */}

      <React.Suspense fallback={null}>
        <Sparkles size={5} scale={[40, 40, 40]} speed={0.2} count={1000} />
        <Cloud position={[-4, -2, 9]} speed={0.2} opacity={0.1} />
        <Cloud position={[4, 2, -15]} speed={0.2} opacity={1} />
        <Cloud position={[-4, 2, -10]} speed={0.2} opacity={0.1} />
        <Cloud position={[4, -2, -5]} speed={0.2} opacity={0.1} />
        <Birds ref={birdsRef} />
      </React.Suspense>
    </>
  );
}
