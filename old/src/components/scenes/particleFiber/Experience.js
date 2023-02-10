import {
  shaderMaterial,
  Environment,
  OrbitControls,
  PresentationControls,
  CameraShake,
} from "@react-three/drei";

import { useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

function Rig() {
  const [vec] = useState(() => new THREE.Vector3());
  const { camera, mouse } = useThree();
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.1));
  return (
    <CameraShake
      yawFrequency={1}
      maxYaw={0.05}
      pitchFrequency={1}
      maxPitch={0.05}
      rollFrequency={0.5}
      maxRoll={1.5}
      intensity={0.2}
    />
  );
}

const count = 10000;
const size = 80;
const lightColor = new THREE.Color("#7ab9d8");
const darkColor = new THREE.Color("#7F34FF");

const PointsFlowMaterial = new shaderMaterial(
  { uSize: 100, uTime: 1 },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ PointsFlowMaterial });

function ParticleLine({ points }) {
  //const sizes = new Float32Array(count * 3);

  const shaderRef = useRef();
  const pointsRef = useRef();

  // const points = useRef()

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.setFromPoints(points);
    }
  }, [points]);

  useFrame((state, delta) => {
    //particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.051;
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.09;
  });

  return (
    <points>
      <bufferGeometry attach="geometry" ref={pointsRef} />

      <pointsFlowMaterial
        ref={shaderRef}
        transparent={true}
        uSize={size}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

function ParticleLines(props) {
  const { linesCount = 5 } = props;
  const { width, height } = useThree((state) => state.size);

  const calcPoints = useCallback(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(
        (width / 8) * (Math.random() - 0.5),
        (height / 8) * (Math.random() - 0.5),
        (-height / 8) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        (width / 8) * (Math.random() - 0.5),
        (-height / 8) * (Math.random() - 0.5),
        (height / 8) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        (-width / 8) * (Math.random() - 0.5),
        (-height / 8) * (Math.random() - 0.5),
        (-height / 8) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        (-width / 8) * (Math.random() - 0.5),
        (height / 8) * (Math.random() - 0.5),
        (height / 8) * (Math.random() - 0.5)
      )
    );

    return curve.getPoints(count);
  }, [width, height]);

  const lines = useMemo(() => {
    const linesArr = [...Array(linesCount)];

    return linesArr.map(() => calcPoints());
  }, [linesCount, calcPoints]);

  return (
    <group>
      {lines.map((linePoints, index) => {
        return <ParticleLine key={index} points={linePoints} />;
      })}
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls
      // makeDefault
      // autoRotate
      // autoRotateSpeed={1.5}
      // zoomSpeed={0.5}
      /> */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.25}
          focalLength={0.15}
          bokehScale={0.5}
        />
      </EffectComposer>
      {/* <PresentationControls
        enabled={true} // the controls can be disabled by setting this to false
        global={false} // Spin globally or by dragging the model
        cursor={true} // Whether to toggle cursor style on drag
        snap={false} // Snap-back to center (can also be a spring config)
        speed={1} // Speed factor
        zoom={1} // Zoom factor when half the polar-max is reached
        rotation={[0, 0, 0]} // Default rotation
        polar={[0, Math.PI / 2]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
        config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      ></PresentationControls> */}
      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <ParticleLines linesCount={20} />
        {/* <Rig /> */}
      </Suspense>
      <Environment preset="night" />
    </>
  );
}
