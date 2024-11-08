import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import geometryVertexShader from "./shaders/geometry/vertex";
import geometryFragmentShader from "./shaders/geometry/fragment";

import { isShaderMaterial } from "@/helpers/Material";

function Geometry() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const mesh = useRef<THREE.Mesh | null>(null);
  const gl = useThree();
  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uIterration: new THREE.Uniform(4),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
  });

  useEffect(() => {
    if (!mesh.current) return;
    // baseGeomertyRef.current = mergeVertices(baseGeomertyRef.current);
    // console.log("AFTER", baseGeomertyRef.current);
    // mesh.current.geometry = mergeVertices(mesh.current.geometry);
    mesh.current.geometry.computeTangents();
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    if (!isShaderMaterial(mesh.current.material)) return;
    mesh.current.material.uniforms.uTime.value += delta * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2, 512, 512]} />
      <shaderMaterial
        vertexShader={geometryVertexShader}
        fragmentShader={geometryFragmentShader}
        uniforms={uniforms.current}
        // side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default Geometry;
