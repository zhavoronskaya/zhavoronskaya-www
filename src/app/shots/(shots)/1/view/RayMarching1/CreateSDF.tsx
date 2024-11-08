import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import sdfVertexShader from "./shaders/sdf/vertex";
import sdfFragmentShader from "./shaders/sdf/fragment";

import { isShaderMaterial } from "@/helpers/Material";

function CreateSDF() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const geomertyRef = useRef();
  const mesh = useRef<THREE.Mesh | null>(null);
  const gl = useThree();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
  });
  //Resize
  useEffect(() => {
    if (!mesh.current) return;
    if (!isShaderMaterial(mesh.current.material)) return;
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      gl.size.width,
      gl.size.height
    ).multiplyScalar(gl.viewport.dpr);
  }, [gl.size.height, gl.size.width, gl.viewport.dpr]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    if (!isShaderMaterial(mesh.current.material)) return;
    mesh.current.material.uniforms.uTime.value += delta * 0.4;
  });

  return (
    <mesh ref={mesh} scale={[gl.viewport.width, gl.viewport.height, 1]}>
      <planeGeometry
        args={[
          uniforms.current.uResolution.value.x,
          uniforms.current.uResolution.value.y,
          32,
          16,
        ]}
      />
      <shaderMaterial
        vertexShader={sdfVertexShader}
        fragmentShader={sdfFragmentShader}
        uniforms={uniforms.current}
        // side={THREE.DoubleSide}
        // transparent={true}
        // depthWrite={false}
      />
    </mesh>
  );
}

export default CreateSDF;
