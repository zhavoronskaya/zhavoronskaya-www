import { shaderMaterial, Environment, OrbitControls } from "@react-three/drei";
// import { EffectComposer } from "@react-three/postprocessing";

import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  Suspense,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import * as THREE from "three";
//import PointsFlowMaterial from "./PointsFlowMaterial.js";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";

const count = 500;
const size = 100;
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

function ParticleLines(linesCount = 25) {
  const { width, height } = useThree((state) => state.size);

  const calcPoints = useCallback(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(
        (width / 100) * (Math.random() - 0.5),
        (width / 100) * (Math.random() - 0.5),
        0
      ),
      new THREE.Vector3(
        (width / 100) * (Math.random() - 0.5),
        (width / 100) * (Math.random() - 0.5),
        0
      ),
      new THREE.Vector3(
        (width / 100) * (Math.random() - 0.5),
        (width / 100) * (Math.random() - 0.5),
        0
      ),
      new THREE.Vector3(
        -(width / 100) * (Math.random() - 0.5),
        (width / 100) * (Math.random() - 0.5),
        0
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
      <OrbitControls />
      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <ParticleLines />
      </Suspense>
      <Environment preset="night" />
    </>
  );
}
