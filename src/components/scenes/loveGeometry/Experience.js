import { Suspense, useEffect, useRef, useMemo } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Edges,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";

import planeVertexShader from "./shaders/planeVertex";
import planeFragmentShader from "./shaders/planeFragment";
import objectVertexShader from "./shaders/objectVertex";
import objectFragmentShader from "./shaders/objectFragment";
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { MeshStandardMaterial } from "three";

const PlaneMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(0, 0),
  },
  planeVertexShader,
  planeFragmentShader
);
extend({ PlaneMaterial });

const ObjectMaterial = shaderMaterial(
  {
    // uTime: 0,
  },
  objectVertexShader,
  objectFragmentShader
);
extend({ ObjectMaterial });

function RamdomObject() {
  const randomIndex = useRef();

  useEffect(() => {
    randomIndex.current = Math.round(Math.random() * 4);
  }, []);
  console.log(randomIndex.current);

  if (randomIndex.current == 0) {
    return <icosahedronGeometry />;
  }
  if (randomIndex.current == 1) {
    return <coneGeometry />;
  }
  if (randomIndex.current == 2) {
    return <torusGeometry />;
  }
  if (randomIndex.current == 3) {
    return <dodecahedronGeometry />;
  }
  if (randomIndex.current == 4) {
    return <torusKnotGeometry />;
  }
}

const EdgesObject = ({ position = [0, 0, 0], size = 3 }) => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.1;
    // ref.current.position.y += Math.sin(delta * 0.1);
    // ref.current.scale.setScalar(2 * Math.sin(delta) * 0.3 + 0.7);
  });

  const clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), size / 2 - position[0]),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), size / 2 + position[1]),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), size / 2 + position[0]),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), size / 2 - position[1]),
  ];
  const params = {
    clipIntersection: false,
    planeConstant: 0,
  };

  return (
    <group>
      {/* <group>
        <planeHelper args={[clipPlanes[0], 2, 0xff0000]} />
        <planeHelper args={[clipPlanes[1], 2, 0xff0000]} />
        <planeHelper args={[clipPlanes[2], 2, 0xff0000]} />
        <planeHelper args={[clipPlanes[3], 2, 0xff0000]} />
      </group> */}
      <group position={position}>
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges>
            <meshBasicMaterial
              transparent={true}
              color="#333"
              depthTest={true}
            ></meshBasicMaterial>
          </Edges>
        </mesh>
        <mesh castShadow ref={ref}>
          <RamdomObject />
          {/* <torusKnotGeometry /> */}
          <meshPhysicalMaterial
            roughness={0.8}
            transmission={0.02}
            side={THREE.DoubleSide}
            clippingPlanes={clipPlanes}
            clipIntersection={params.clipIntersection}
            clipShadows
            color={"#f5c8fe"}
          />
          {/* <meshBasicMaterial
            color={"red"}
            clippingPlanes={clipPlanes}
            clipIntersection={params.clipIntersection}
            planeConstant={params.planeConstant}
          /> */}
          {/* <objectMaterial
            clippingPlanes={clipPlanes}
            clipIntersection={params.clipIntersection}
            clipShadows
          /> */}
        </mesh>
      </group>
    </group>
  );
};

const EdgesGrid = React.forwardRef(
  ({ columns = 4, rows = 3, size = 3 }, ref) => {
    const width = columns * size;
    const height = rows * size;
    const offsetX = -width / 2 + size / 2;
    const offsetY = -height / 2 + size / 2;
    const grid = useMemo(() => {
      const gridArr = [];

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          gridArr.push([j * size + offsetX, i * size + offsetY, 0]);
        }
      }
      console.log(gridArr);
      return gridArr;
    }, []);

    return (
      <group ref={ref}>
        {grid.map((cell, idx) => {
          return <EdgesObject key={idx} position={cell} />;
        })}
      </group>
    );
  }
);

function LoveGeometry({ size = 3 }) {
  const planeRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();
  useFrame((state, delta) => {
    if (planeRef.current) {
      // planeRef.current.uTime += delta * 0.1;
      planeRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }
  });
  return (
    <group>
      <EdgesGrid ref={geomertyRef} />

      <mesh receiveShadow position={[0, 0, -size / 2 - 3.0]}>
        <planeGeometry
          ref={geomertyRef}
          args={[viewport.width * 1.5, viewport.height * 1.5, 64, 32]}
        />
        {/* <meshPhongMaterial color={"white"} /> */}
        <MeshReflectorMaterial
          color={"black"}
          blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={1} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={1} // Amount of distortion based on the distortionMap texture
          debug={
            0
          } /* Depending on the assigned value, one of the following channels is shown:
      0 = no debug
      1 = depth channel
      2 = base channel
      3 = distortion channel
      4 = lod channel (based on the roughness)
    */
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <EffectComposer>
        <DepthOfField focusDistance={0.05} focalLength={0.5} bokehScale={6} />
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
      </EffectComposer>
      <color args={["#B6E7E6"]} attach="background" />
      <spotLight
        angle={Math.PI / 2.5}
        penumbra={0.5}
        position={[-9, 9, 3]}
        castShadow
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <ambientLight color={"aqua"} />

      <Suspense fallback={null}>
        <LoveGeometry />
      </Suspense>

      <Environment preset="night" />
    </>
  );
}
