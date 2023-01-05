import { Suspense, useRef, useEffect, useMemo, useCallback } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  CubicBezierLine,
} from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

const lightColor = new THREE.Color("#B434FF");
const darkColor = new THREE.Color("#832554");
const count = 100;
const PaintMaterial = shaderMaterial(
  {
    uTime: 0,
    uLightColor: lightColor,
    uDarkColor: darkColor,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ PaintMaterial });

function CurveLine({ points }) {
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
    //CurvesRef.current.rotation.y = state.clock.getElapsedTime() * 0.051;
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.09;
  });

  return (
    <line>
      <bufferGeometry attach="geometry" ref={pointsRef} />

      <paintMaterial ref={shaderRef} />
    </line>
  );
}

function CurveLines({ linesCount = 30 }) {
  const { width, height } = useThree((state) => state.size);

  const calcPoints = useCallback(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(
        (width / 10) * (Math.random() - 0.5),
        (width / 10) * (Math.random() - 0.5),
        (height / 10) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        (width / 10) * (Math.random() - 0.5),
        (width / 10) * (Math.random() - 0.5),
        (height / 10) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        (width / 10) * (Math.random() - 0.5),
        (width / 10) * (Math.random() - 0.5),
        (height / 10) * (Math.random() - 0.5)
      ),
      new THREE.Vector3(
        -(width / 10) * (Math.random() - 0.5),
        (width / 10) * (Math.random() - 0.5),
        -(height / 10) * (Math.random() - 0.5)
      )
    );

    return curve.getPoints(count);
  }, [width, height]);

  const lines = useMemo(() => {
    const linesArr = [...Array(linesCount)];

    // for(let i=0; i < linesCount; i++) {
    //   const line = calcPoints();
    //   linesArr.push(line);
    // }
    //
    // return linesArr

    return linesArr.map(() => calcPoints());
  }, [linesCount, calcPoints]);

  return (
    <group>
      {lines.map((linePoints, index) => {
        return <CurveLine key={index} points={linePoints} />;
      })}
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <color args={["#000000"]} attach="background" />
      <Suspense fallback={null}>
        <CurveLines />
      </Suspense>
      <Environment preset="night" />
    </>
  );
}
