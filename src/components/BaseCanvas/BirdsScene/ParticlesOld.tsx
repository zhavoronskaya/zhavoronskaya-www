import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/particles/vertex";
import fragmentShader from "./shaders/particles/fragment";
import { view } from "framer-motion/client";

function initDisplacement(sizeRatio: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256 / sizeRatio;
  canvas.style.position = "fixed";
  canvas.style.width = "256px";
  canvas.style.height = `${256 / sizeRatio}px`;
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "10";
  document.body.append(canvas);

  // 2D canvas

  // Context
  const context = canvas.getContext("2d");
  if (!context) return;
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

export default function Particles() {
  const particlesRef = useRef<THREE.Points | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const { size, gl, viewport, raycaster, camera } = useThree();
  const sizeRatio = size.width / size.height;
  const init = () => initDisplacement(sizeRatio);
  const [displacement] = useState(init);

  const particlesGeometry = useMemo(() => {
    // const count = particlesCount;
    const geometry = new THREE.PlaneGeometry(
      10,
      10 / sizeRatio,
      Math.floor(128 / sizeRatio)
    );
    geometry.setIndex(null);
    geometry.deleteAttribute("normal");
    console.log(geometry);
    const count = geometry.attributes.position.count;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const intensitiesArray = new Float32Array(count);
    const anglesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20.5;

      speeds[i] = 1.25 + Math.random() * 10.2;
      intensitiesArray[i] = Math.random();
      anglesArray[i] = Math.random() * Math.PI * 2;
    }
    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("angle", new THREE.BufferAttribute(anglesArray, 1));
    geometry.setAttribute(
      "intensity",
      new THREE.BufferAttribute(intensitiesArray, 1)
    );
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!planeRef.current) return;

    // planeRef.current.quaternion.rotateTowards(
    //   state.camera.quaternion,
    //   60 * delta
    // );

    // planeRef.current.position.set(
    //   camera.position.x,
    //   camera.position.y,
    //   camera.position.z - 4
    // );

    if (!displacement) return;

    displacement.screenCursor.x = state.pointer.x;
    displacement.screenCursor.y = state.pointer.y;
    raycaster.setFromCamera(displacement.screenCursor, camera);
    const intersections = raycaster.intersectObject(planeRef.current);

    // console.log(intersections);
    if (intersections.length) {
      const uv = intersections[0].uv;
      if (!uv) return;
      // console.log(uv);
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
      displacement.canvasCursor.x - glowSize,
      displacement.canvasCursor.y - glowSize,
      glowSize,
      glowSize
    );

    // const texture = new THREE.CanvasTexture(displacement.canvas);

    // Texture
    displacement.texture.needsUpdate = true;
    if (particlesRef.current) {
      // particlesRef.current.quaternion.rotateTowards(
      //   state.camera.quaternion,
      //   60 * delta
      // );

      const material = particlesRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value += delta * 0.4;
      material.uniforms.resolution.value.set(
        size.width * gl.getPixelRatio(),
        size.height * gl.getPixelRatio()
      );
      displacement.texture.needsUpdate = true;

      material.uniforms.displacementTexture.value = displacement.texture;
      material.needsUpdate = true;

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    // console.log(displacement.texture);
  });

  const particlesMaterial = useMemo(() => {
    if (!displacement) return undefined;
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      // blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        size: { value: 0.4 },
        color: { value: new THREE.Color("hotpink") },
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(0, 0) },
        displacementTexture: { value: null },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }, [displacement]);

  return (
    <>
      <points
        ref={particlesRef}
        geometry={particlesGeometry}
        material={particlesMaterial}
      />

      <mesh ref={planeRef}>
        <planeGeometry args={[10, 10 / sizeRatio, 1, 1]} />
        <meshBasicMaterial
          color={"pink"}
          side={THREE.DoubleSide}
          visible={false}
        />
      </mesh>
    </>
  );
}
