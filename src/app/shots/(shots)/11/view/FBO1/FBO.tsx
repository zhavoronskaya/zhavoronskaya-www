import { useMemo, useRef } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import * as THREE from "three";
import { useFBO } from "@react-three/drei";
import pointsVertexShader from "./shaders/fbo/vertex";
import pointsFragmentShader from "./shaders/fbo/fragment";
import simulationVertexShader from "./shaders/fbo/simulationVertex";
import simulationFragmentShader from "./shaders/fbo/simulationFragment";
import { isShaderMaterial } from "@/helpers/Material";

const getRandomDataSphere = (width: number, height: number) => {
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const i1 = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[i1] = distance * Math.sin(theta) * Math.cos(phi);
    data[i1 + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[i1 + 2] = distance * Math.cos(theta);
    data[i1 + 3] = 1.0;
  }

  let dataTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

const SIZE = 512;
const positionTexture = getRandomDataSphere(SIZE, SIZE);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  1 / Math.pow(2, 53),
  1
);
const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
]);
const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

function FBO() {
  const points = useRef<THREE.Points | null>(null);
  const simulationMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // console.log(positionsTexture);

  const renderTarget = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const length = SIZE * SIZE;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % SIZE) / SIZE;
      particles[i3 + 1] = i / SIZE / SIZE;
    }
    return particles;
  }, []);

  const uniforms = useRef({
    uPositions: { value: null },
    uTime: { value: 0 },
  });

  const simUniforms = useRef({
    positions: { value: positionTexture },
    uFrequency: { value: 0.9 },
    uTime: { value: 0 },
  });

  useFrame((state, delta) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (points.current) {
      if (!isShaderMaterial(points.current.material)) return;
      points.current.material.uniforms.uPositions.value = renderTarget.texture;
    }

    if (simulationMaterialRef.current)
      simulationMaterialRef.current.uniforms.uTime.value =
        clock.elapsedTime * 0.4;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <shaderMaterial
            ref={simulationMaterialRef}
            fragmentShader={simulationFragmentShader}
            vertexShader={simulationVertexShader}
            uniforms={simUniforms.current}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          transparent={true}
          vertexColors
          depthWrite={false}
          fragmentShader={pointsFragmentShader}
          vertexShader={pointsVertexShader}
          uniforms={uniforms.current}
        />
      </points>
    </>
  );
}

export default FBO;
