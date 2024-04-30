import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
  useTexture,
  Instances,
} from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

// positions

const positions = new Float32Array([
  -0.5, 0.5, 0.0, 0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
]);

// uvs
const uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);

// index
const indexes = new Uint16Array([0, 2, 1, 2, 3, 1]);

const displacement = {};

function Particles() {
  const shaderRef = useRef();
  const pointsRef = useRef();
  const texture = useTexture("/image/kai.png");

  console.log("texture", texture);
  // texture.colorSpace = THREE.sRGBEncoding;
  // texture.flipY = true;

  const image = texture.image;
  const width = texture.source.data.naturalWidth;
  const height = texture.source.data.naturalHeight;
  // console.log("numPoints", numPoints);

  //displacement
  displacement.canvas = document.createElement("canvas");
  displacement.canvas.width = width;
  displacement.canvas.height = height;
  displacement.canvas.style.position = "fixed";
  displacement.canvas.style.width = "1856px";
  displacement.canvas.style.height = "3689px";
  displacement.canvas.style.top = 0;
  displacement.canvas.style.left = 0;
  displacement.canvas.style.zIndex = 10;
  // document.body.append(displacement.canvas);

  displacement.glowImage = new Image();
  displacement.glowImage.src = "/image/glow.png";

  displacement.context = displacement.canvas.getContext("2d");

  const uniforms = useRef({
    uTime: { value: 0 },
    uRandom: { value: 20.0 },
    uDepth: { value: 80.0 },
    uSize: { value: 1.0 },
    uTextureSize: { value: new THREE.Vector2(width, height) },
    uTexture: { value: texture },
    uTouch: { value: null },
    uMouse: new THREE.Vector2(0, 0),
  });

  const data = useMemo(() => {
    const discard = true;
    const numPoints = width * height;

    let numVisible = numPoints;
    let threshold = 0;
    let originalColors;

    if (discard) {
      // discard pixels darker than threshold #22
      numVisible = 0;
      threshold = 34;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      ctx.scale(1, -1);
      ctx.drawImage(image, 0, 0, width, height * -1);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalColors = Float32Array.from(imgData.data);

      for (let i = 0; i < numPoints; i++) {
        if (originalColors[i * 4 + 0] > threshold) numVisible++;
      }
    }

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < numPoints; i++) {
      if (discard && originalColors[i * 4 + 0] <= threshold) continue;

      offsets[j * 3 + 0] = i % width;
      offsets[j * 3 + 1] = Math.floor(i / width);

      indices[j] = i;

      angles[j] = Math.random() * Math.PI;

      j++;
    }

    return {
      indices,
      offsets,
      angles,
      numPoints,
      numVisible,
    };
  }, [width, height, image]);

  console.log("numVisible", data.numVisible);

  useFrame((state, delta) => {
    // if (shaderRef.current)
    //   shaderRef.current.uTime += state.clock.getElapsedTime() * 0.0051;
    // console.log("mouse", state.pointer);
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
      let x = (state.pointer.x + 1) / 2;
      let y = Math.abs((state.pointer.y + 1) / 2);
      // let y = (state.pointer.y + 1) / 2;
      shaderRef.current.uniforms.uMouse.value = new THREE.Vector2(x, y);
      // console.log("mouse", shaderRef.current.uniforms.uMouse.value);
    }
    // console.log("PP", pointsRef.current);
  });

  if (!data) return null;

  return (
    <>
      <mesh>
        <instancedBufferGeometry
          ref={pointsRef}
          // instanceCount={data.numVisible}
        >
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-uv"
            array={uvs}
            count={uvs.length / 2}
            itemSize={2}
          />
          <bufferAttribute
            attach="index"
            array={indexes}
            count={indexes.length}
            itemSize={1}
          />

          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-pindex"
            array={data.indices}
            count={data.indices.length}
            itemSize={1}
          />
          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-offset"
            array={data.offsets}
            count={data.offsets.length / 3}
            itemSize={3}
          />
          <instancedBufferAttribute
            needsUpdate={true}
            attach="attributes-angle"
            array={data.angles}
            count={data.angles.length}
            itemSize={1}
          />
        </instancedBufferGeometry>

        <rawShaderMaterial
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms.current}
          // depthWrite={false}
          depthTest={false}
          // blending={THREE.AdditiveBlending}
          // vertexColors
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
        />
      </mesh>
      {/* <mesh>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial />
      </mesh> */}
    </>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer multisampling={2}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer> */}
      {/* 
      <color args={["#0e0e2e"]} attach="background" /> */}
      {/* <Suspense fallback={null}> */}
      <Particles />
      {/* </Suspense> */}
    </>
  );
}
