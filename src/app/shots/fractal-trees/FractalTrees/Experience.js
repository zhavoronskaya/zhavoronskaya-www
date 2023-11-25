import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
} from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

import treesVertexShader from "./shaders/vertex.js";
import treesFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const TreesMaterial = new shaderMaterial(
  { uTime: 0, uColor: new THREE.Vector3(0.3, 0.4, 0.8) },
  treesVertexShader,
  treesFragmentShader
);

extend({ TreesMaterial });

const BRANCH_GENERATION_LIMIT = 10;
const BRANCH_GROW_COEF = 0.8;
const BRANCH_WIDTH = 12;
const BRANCH_TIME_TO_GROW = 600;
const BRANCH_LEFT_ANGLE_DEG = -25;
const BRANCH_RIGHT_ANGLE_DEG = 25;
const getPointsCoordsDiff = (a, b) => {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
  };
};

const getDistanceBetweenPoints = (a, b) => {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
};

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const getRandom = (base) => {
  return (Math.random() - 0.5) * 5;
};

function Branch({
  type, // 'root' | 'left' | 'right'
  startPoint, // {x,y}
  endPoint, // {x,y}
  angle = degreesToRadians(0),
  timeToGrow = BRANCH_TIME_TO_GROW,
  depth = 1,
  startZ = 0,
  endZ = getRandom(5),
}) {
  const [createdAt] = useState(() => performance.now());
  const [leftChildBranch, setLeftChildBranch] = useState(null);
  const [rightChildBranch, setRightChildBranch] = useState(null);

  const branchRef = useRef();
  const shaderRef = useRef();
  const pointsDiff = useRef(getPointsCoordsDiff(startPoint, endPoint));
  const growProgress = useRef(0);

  useFrame((state, delta) => {
    if (!branchRef.current) return;
    if (growProgress.current >= 100) return;

    const timestamp = performance.now();
    const branchLifetime = timestamp - createdAt;
    const branchGrowProgress = (branchLifetime * 100) / timeToGrow;

    if (branchGrowProgress >= 100) {
      const parentLength = getDistanceBetweenPoints(startPoint, endPoint);
      const length = parentLength * BRANCH_GROW_COEF;
      const leftAngle = angle + degreesToRadians(BRANCH_LEFT_ANGLE_DEG);
      const rightAngle = angle + degreesToRadians(BRANCH_RIGHT_ANGLE_DEG);
      shaderRef.current.uColor = new THREE.Vector3(
        Math.random(),
        Math.random(),
        Math.random()
      );
      setLeftChildBranch({
        type: "left",
        angle: leftAngle,
        startPoint: endPoint,
        depth: depth + 1,
        endPoint: {
          x: endPoint.x + length * Math.sin(leftAngle),
          y: endPoint.y + length * Math.cos(leftAngle),
        },
        startZ: endZ,
        endZ: endZ + getRandom(5),
      });

      setRightChildBranch({
        type: "right",
        angle: rightAngle,
        depth: depth + 1,
        startPoint: endPoint,
        endPoint: {
          x: endPoint.x + length * Math.sin(rightAngle),
          y: endPoint.y + length * Math.cos(rightAngle),
        },
        startZ: endZ,
        endZ: endZ + getRandom(5),
      });
    }

    const currentEndPoint = {
      x: startPoint.x + (pointsDiff.current.x * branchGrowProgress) / 100,
      y: startPoint.y + (pointsDiff.current.y * branchGrowProgress) / 100,
    };

    const a = new THREE.Vector3(startPoint.x, startPoint.y, startZ);
    const b = new THREE.Vector3(currentEndPoint.x, currentEndPoint.y, endZ);

    growProgress.current = branchGrowProgress;
    branchRef.current.setFromPoints([a, b]);
  });

  if (depth > BRANCH_GENERATION_LIMIT) return null;

  return (
    <group>
      <line>
        <bufferGeometry attach="geometry" ref={branchRef} />
        <treesMaterial ref={shaderRef} />
      </line>

      {leftChildBranch && <Branch {...leftChildBranch} />}
      {rightChildBranch && <Branch {...rightChildBranch} />}
    </group>
  );
}

function Tree({ position }) {
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <Branch
        type="root"
        startPoint={{ x: 0, y: 0 }}
        endPoint={{ x: 0, y: 10 }}
        endZ={0}
      />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <EffectComposer>
        <DepthOfField focusDistance={0.025} focalLength={0.25} bokehScale={2} />
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
      </EffectComposer>
      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <Tree position={{ x: 0, y: -20, z: 0 }} />
        <Tree position={{ x: -25, y: -20, z: 37 }} />
        <Tree position={{ x: 27, y: -20, z: 20 }} />
      </Suspense>
    </>
  );
}
