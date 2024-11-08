import { useRef, useMemo, useEffect } from "react";
import { useGLTF, useFBO } from "@react-three/drei";

import transparentVertexShader from "./shaders/transparent/vertex.js";
import transparentFragmentShader from "./shaders/transparent/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import LightingObject from "./Rose.js";
import { folder, useControls } from "leva";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import HalfToneShading from "./HalfToneShading.js";
import halftoneVertexShader from "./shaders/halftone/vertex.js";
import halftoneFragmentShader from "./shaders/halftone/fragment.js";

function Transparent() {
  const diam = useGLTF("../../model/diam.glb");
  const mesh = useRef();
  const groupRef = useRef();
  const star = useGLTF("../../model/star.glb");
  const shaderRef = useRef();
  const meshRef = useRef();
  const { state, viewport } = useThree();

  const uniformsStar = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
  });
  const geometryRef = useRef();
  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();
  const gl = useThree();

  const {
    light,
    shininess,
    diffuseness,
    fresnelPower,
    iorR,
    iorY,
    iorG,
    iorC,
    iorB,
    iorP,
    saturation,
    chromaticAberration,
    refraction,
  } = useControls({
    light: {
      value: new THREE.Vector3(-1.0, 1.0, 1.0),
    },
    diffuseness: {
      value: 0.2,
    },
    shininess: {
      value: 15.0,
    },
    fresnelPower: {
      value: 8.0,
    },
    ior: folder({
      iorR: { min: 1.0, max: 2.333, step: 0.001, value: 1.15 },
      iorY: { min: 1.0, max: 2.333, step: 0.001, value: 1.16 },
      iorG: { min: 1.0, max: 2.333, step: 0.001, value: 1.18 },
      iorC: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorB: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorP: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
    }),
    saturation: { value: 1.14, min: 1, max: 1.25, step: 0.01 },
    chromaticAberration: {
      value: 0.5,
      min: 0,
      max: 1.5,
      step: 0.01,
    },
    refraction: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.15 },
      uIorY: { value: 1.16 },
      uIorG: { value: 1.18 },
      uIorC: { value: 1.22 },
      uIorB: { value: 1.22 },
      uIorP: { value: 1.22 },
      uRefractPower: {
        value: 0.0,
      },
      uChromaticAberration: {
        value: 1.5,
      },
      uSaturation: { value: 1.4 },
      uShininess: { value: 40.0 },
      uDiffuseness: { value: 0.2 },
      uFresnelPower: { value: 8.0 },
      uLight: {
        value: new THREE.Vector3(0, 10.0, 2.0),
      },
      uTime: {
        value: 0.0,
      },
      uResolution: {
        value: new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
          gl.viewport.dpr
        ),

        // value: new THREE.Vector2(
        //   window.innerWidth,
        //   window.innerHeight
        // ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
      },
    }),
    []
  );

  useEffect(() => {
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      gl.size.width,
      gl.size.height
    ).multiplyScalar(gl.viewport.dpr);
    console.log(mesh.current.geometry);
    // geometryRef.current = mergeVertices(geometryRef.current);
    // geometryRef.current.computeTangents();
    // console.log(geometryRef.current);
  }, [gl.size.width, gl.size.height]);

  useFrame((state, delta) => {
    const { gl, scene, camera } = state;
    mesh.current.visible = false;

    shaderRef.current.uniforms.uTime.value += delta * 0.5;

    shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(
      state.size.width,
      state.size.height
    );

    mesh.current.material.uniforms.uTime.value += delta * 0.9;
    mesh.current.material.uniforms.uDiffuseness.value = diffuseness;
    mesh.current.material.uniforms.uShininess.value = shininess;
    mesh.current.material.uniforms.uLight.value = new THREE.Vector3(
      light.x,
      light.y,
      light.z
    );
    mesh.current.material.uniforms.uFresnelPower.value = fresnelPower;

    mesh.current.material.uniforms.uIorR.value = iorR;
    mesh.current.material.uniforms.uIorY.value = iorY;
    mesh.current.material.uniforms.uIorG.value = iorG;
    mesh.current.material.uniforms.uIorC.value = iorC;
    mesh.current.material.uniforms.uIorB.value = iorB;
    mesh.current.material.uniforms.uIorP.value = iorP;

    mesh.current.material.uniforms.uSaturation.value = saturation;
    mesh.current.material.uniforms.uChromaticAberration.value =
      chromaticAberration;
    mesh.current.material.uniforms.uRefractPower.value = refraction;

    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);
    mesh.current.visible = true;
    mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
    mesh.current.material.side = THREE.BackSide;

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    mesh.current.material.side = THREE.FrontSide;

    gl.setRenderTarget(null);
    groupRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group ref={groupRef}>
      {/* <LightingObject visible={true} /> */}
      {/* 
      <HalfToneShading /> */}
      <mesh
        ref={meshRef}
        visible={false}
        geometry={star.scene.children[0].geometry}
        position={[0, 4, 0]}
        scale={[2, 2, 2]}
      >
        <shaderMaterial
          ref={shaderRef}
          vertexShader={halftoneVertexShader}
          fragmentShader={halftoneFragmentShader}
          transparent={false}
          uniforms={uniformsStar.current}
          // blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh
        ref={mesh}
        scale={[12, 12, 12]}
        geometry={diam.scene.children[0].geometry}
      >
        {/* <octahedronGeometry args={[10, 1]} ref={geometryRef} /> */}
        {/* <icosahedronGeometry args={[10, 4]} ref={geometryRef} /> */}
        <shaderMaterial
          vertexShader={transparentVertexShader}
          fragmentShader={transparentFragmentShader}
          uniforms={uniforms}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

export default Transparent;
