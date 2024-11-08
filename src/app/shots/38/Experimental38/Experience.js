import { OrbitControls, useTexture } from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

function initDisplacement({ sizeRatio }) {
  console.log("UBNUI");
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = Math.floor(128 / sizeRatio);
  canvas.style.position = "fixed";
  canvas.style.width = "128px";
  canvas.style.height = "256px";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 10;
  // document.body.append(canvas);

  // 2D canvas

  // Context
  const context = canvas.getContext("2d");
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

let logged = 0;

function Particles({ isMouseMoved }) {
  const shaderRef = useRef();
  const pointsRef = useRef();
  const planeRef = useRef();
  const texture = useTexture("/image/kai.png");

  // texture.colorSpace = THREE.sRGBEncoding;
  // texture.flipY = true;

  const image = texture.image;
  const width = texture.source.data.naturalWidth;
  const height = texture.source.data.naturalHeight;
  const sizeRatio = width / height;
  console.log("RATIO", sizeRatio);

  const init = () => initDisplacement({ sizeRatio });
  const [displacement] = useState(init);
  const [data, setData] = useState(null);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  const { raycaster, camera } = useThree();

  useEffect(() => {
    if (data) return;

    pointsRef.current.setIndex(null);
    pointsRef.current.deleteAttribute("normal");
    const count = pointsRef.current.attributes.position.count;
    const intensitiesArray = new Float32Array(count);
    const anglesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      intensitiesArray[i] = Math.random();
      anglesArray[i] = Math.random() * Math.PI * 2;
    }

    setData({ intensitiesArray, anglesArray });
  }, [data]);

  useFrame((state, delts) => {
    if (logged < 5) {
      console.log("POIN", state.pointer.x, state.pointer.y);
      console.log("state", state);
      logged++;
    }
    if (!isMouseMoved) return;

    displacement.screenCursor.x = state.pointer.x;
    displacement.screenCursor.y = state.pointer.y;
    raycaster.setFromCamera(displacement.screenCursor, camera);
    const intersections = raycaster.intersectObject(planeRef.current);

    // console.log(displacement.screenCursor);
    if (intersections.length) {
      const uv = intersections[0].uv;
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
    console.log("");
    displacement.context.drawImage(
      displacement.glowImage,
      displacement.canvasCursor.x - glowSize * 0.5,
      displacement.canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    );

    // Texture
    displacement.texture.needsUpdate = true;
    // console.log(displacement.texture);
  });

  const uniforms = useRef({
    uResolution: new THREE.Uniform(
      new THREE.Vector2(
        sizes.width * sizes.pixelRatio,
        sizes.height * sizes.pixelRatio
      )
    ),
    uPictureTexture: new THREE.Uniform(texture),
    uDisplacementTexture: new THREE.Uniform(displacement.texture),
  });

  return (
    <>
      <points>
        <planeGeometry
          args={[5, 5 / sizeRatio, 128, Math.floor(128 / sizeRatio)]}
          ref={pointsRef}
        >
          {data && (
            <>
              <bufferAttribute
                attach="attributes-aIntensity"
                array={data.intensitiesArray}
                count={data.intensitiesArray.length}
                itemSize={1}
              />
              <bufferAttribute
                attach="attributes-aAngle"
                array={data.anglesArray}
                count={data.anglesArray.length}
                itemSize={1}
              />
            </>
          )}
        </planeGeometry>

        <shaderMaterial
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms.current}
          blending={THREE.AdditiveBlending}
          // vertexColors
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
        />
      </points>

      <mesh ref={planeRef}>
        <planeGeometry args={[5, 5 / sizeRatio, 1, 1]} />
        <meshBasicMaterial
          color={"pink"}
          side={THREE.DoubleSide}
          visible={false}
        />
      </mesh>
    </>
  );
}

export default function Experience({ isMouseMoved }) {
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
      <Particles isMouseMoved={isMouseMoved} />

      {/* </Suspense> */}
    </>
  );
}
