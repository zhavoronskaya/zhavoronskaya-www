import { OrbitControls, useTexture } from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex";
import pointsFragmentShader from "./shaders/fragment";

function getResolutionVector() {
  if (typeof window === "undefined") return null;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  return new THREE.Vector2(width * pixelRatio, height * pixelRatio);
}

function initDisplacement(sizeRatio: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = Math.floor(128 / sizeRatio);
  canvas.style.position = "fixed";
  canvas.style.width = "128px";
  canvas.style.height = "256px";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "10";
  // document.body.append(canvas);

  // 2D canvas

  // Context
  const context = canvas.getContext("2d");
  if (!context) return null;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Glow image
  const glowImage = new Image();
  glowImage.src = "/image/glow.png";

  // Coordinates
  const screenCursor = new THREE.Vector2(9999, 9999);
  const canvasCursor = new THREE.Vector2(9999, 9999);
  const canvasCursorPrevious = new THREE.Vector2(9999, 9999);

  // Texture
  const texture = new THREE.CanvasTexture(canvas);

  return {
    canvas,
    context,
    glowImage,
    screenCursor,
    canvasCursor,
    canvasCursorPrevious,
    texture,
  };
}

type Data = {
  intensitiesArray: Float32Array | null;
  anglesArray: Float32Array | null;
  speedsArray: Float32Array | null;
  sizesArray: Float32Array | null;
};

function Particles() {
  const pointsRef = useRef<THREE.Points | null>(null);
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);

  const { size, viewport } = useThree();
  const sizeRatio = size.width / size.height;

  const init = () => initDisplacement(sizeRatio);
  const [displacement] = useState(init);

  const { raycaster, camera, scene } = useThree();

  useFrame((state, delta) => {
    if (!planeRef.current || !displacement || !pointsRef.current) return;
    planeRef.current.quaternion.rotateTowards(
      state.camera.quaternion,
      60 * delta
    );
    pointsRef.current.quaternion.rotateTowards(
      state.camera.quaternion,
      60 * delta
    );
    displacement.screenCursor.x = state.pointer.x;
    displacement.screenCursor.y = state.pointer.y;
    raycaster.setFromCamera(displacement.screenCursor, camera);
    const intersections = raycaster.intersectObject(planeRef.current);

    if (intersections.length) {
      const uv = intersections[0].uv;
      if (!uv) return null;
      displacement.canvasCursor.x = uv.x * displacement.canvas.width;
      displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
    }

    /**
     * Displacement
     */
    // Fade out
    displacement.context.globalCompositeOperation = "source-over";
    displacement.context.globalAlpha = 0.02;
    displacement.context.fillRect(
      0,
      0,
      displacement.canvas.width,
      displacement.canvas.height
    );

    // Speed alpha
    const cursorDistance = displacement.canvasCursorPrevious.distanceTo(
      displacement.canvasCursor
    );
    displacement.canvasCursorPrevious.copy(displacement.canvasCursor);
    const alpha = Math.min(cursorDistance * 0.05, 1);

    // Draw glow
    const glowSize = displacement.canvas.width * 0.15;
    displacement.context.globalCompositeOperation = "lighten";
    displacement.context.globalAlpha = alpha;
    displacement.context.drawImage(
      displacement.glowImage,
      displacement.canvasCursor.x - glowSize * 0.5,
      displacement.canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    );

    // Texture
    displacement.texture.needsUpdate = true;

    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta * 0.3;
  });

  return (
    <>
      <Points
        pointsRef={pointsRef}
        shaderRef={shaderRef}
        texture={displacement?.texture}
        geometryArgs={[
          2 * viewport.width,
          (2 * viewport.height) / sizeRatio,
          32,
          16,
        ]}
      />
      <mesh ref={planeRef}>
        <planeGeometry
          args={[2 * viewport.width, (2 * viewport.height) / sizeRatio, 1, 1]}
        />
        <meshBasicMaterial
          color={"pink"}
          side={THREE.DoubleSide}
          visible={false}
        />
      </mesh>
    </>
  );
}

type PointsProps = {
  geometryArgs: [
    width: number,
    height: number,
    wSegments: number,
    hSegments: number
  ];
  texture?: THREE.CanvasTexture;
  pointsRef: React.MutableRefObject<THREE.Points | null>;
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>;
};
const Points = React.memo(
  function Points({
    pointsRef,
    shaderRef,
    geometryArgs,
    texture,
  }: PointsProps) {
    const [data, setData] = useState<Data>({
      intensitiesArray: null,
      anglesArray: null,
      speedsArray: null,
      sizesArray: null,
    });

    const uniforms = useRef({
      uResolution: new THREE.Uniform(getResolutionVector()),
      uDisplacementTexture: new THREE.Uniform(texture),
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#ECB4E9")),
    });

    useEffect(() => {
      if (!pointsRef.current) return;
      pointsRef.current.geometry.setIndex(null);
      pointsRef.current.geometry.deleteAttribute("normal");
      const count = pointsRef.current.geometry.attributes.position.count;

      const intensitiesArray = new Float32Array(count);
      const anglesArray = new Float32Array(count);
      const speedsArray = new Float32Array(count);
      const sizesArray = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        intensitiesArray[i] = Math.random();
        speedsArray[i] = 1.25 + Math.random() * 1.2;
        anglesArray[i] = Math.random() * Math.PI * 2;
        sizesArray[i] = Math.random();
      }

      setData({ intensitiesArray, anglesArray, speedsArray, sizesArray });
    }, []);

    return (
      <points ref={pointsRef}>
        <planeGeometry args={geometryArgs}>
          {data.intensitiesArray && (
            <bufferAttribute
              attach="attributes-aIntensity"
              array={data.intensitiesArray}
              count={data.intensitiesArray.length}
              itemSize={1}
            />
          )}
          {data.anglesArray && (
            <bufferAttribute
              attach="attributes-aAngle"
              array={data.anglesArray}
              count={data.anglesArray.length}
              itemSize={1}
            />
          )}
          {data.speedsArray && (
            <bufferAttribute
              attach="attributes-aSpeed"
              array={data.speedsArray}
              count={data.speedsArray.length}
              itemSize={1}
            />
          )}
          {data.sizesArray && (
            <bufferAttribute
              attach="attributes-aSize"
              array={data.sizesArray}
              count={data.sizesArray.length}
              itemSize={1}
            />
          )}
        </planeGeometry>

        <shaderMaterial
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms.current}
          depthWrite={true}
          vertexColors
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
        />
      </points>
    );
  },
  () => true
);

export default Particles;
