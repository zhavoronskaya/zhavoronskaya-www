import { shaderMaterial, Environment } from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

const count = 10000;
const size = 80;

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

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.setFromPoints(points);
    }
  }, [points]);

  useFrame((state, delta) => {
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

      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <ParticleLines linesCount={20} />
      </Suspense>
      <Environment preset="night" />
    </>
  );
}
