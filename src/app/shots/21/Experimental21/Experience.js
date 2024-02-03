import React from "react";
import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
  useGLTF,
  MeshTransmissionMaterial,
  Stage,
} from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

const ExperimentalTwentyoneMaterial = shaderMaterial(
  {
    uTime: 0,
    uIterration: 4,
  },

  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalTwentyoneMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const transmissionRef = useRef();
  const transmissionShaderRef = useRef();

  const { nodes } = useGLTF("../../model//meduze1c.glb");

  // nodes.meduze.material.shading = THREE.SmoothShading;
  // nodes.meduze.geometry.computeVertexNormals(true);

  // useEffect(() => {
  //   shaderRef.current.uniforms.specMap.value = createSkyBox();
  // }, []);
  useFrame((state, delta) => {
    if (shaderRef.current) {
      //   // shaderRef.current.uniforms.uTime.value += delta * 0.3;
      ref.current.rotation.y += delta * 0.4;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime());
      shaderRef.current.uTime += delta * 1.5;
      // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
      // state.camera.updateProjectionMatrix();
    }

    if (transmissionShaderRef.current) {
      transmissionShaderRef.current.uniforms.uTime.value += delta;
    }
  });

  // React.useEffect(() => {
  //   const material = transmissionRef.current;
  //   const onCompile = material.onBeforeCompile;

  //   material.onBeforeCompile = (shader) => {
  //     transmissionShaderRef.current = shader;

  //     shader.uniforms.uTime = { value: 1.0 };

  //     shader.vertexShader = shader.vertexShader.replace(
  //       "#include <common>",
  //       `
  //           #include <common>

  //           uniform float uTime;

  //           float inverseLerp(float v, float minValue, float maxValue) {
  //             return (v - minValue) / (maxValue - minValue);
  //           }

  //           float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  //             float t = inverseLerp(v, inMin, inMax);
  //             return mix(outMin, outMax, t);
  //           }
  //           vec3 hash( vec3 p ) // replace this by something better
  //           {
  //             p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
  //                       dot(p,vec3(269.5,183.3,246.1)),
  //                       dot(p,vec3(113.5,271.9,124.6)));

  //             return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  //           }

  //           float noise( in vec3 p )
  //           {
  //             vec3 i = floor( p );
  //             vec3 f = fract( p );

  //             vec3 u = f*f*(3.0-2.0*f);

  //             return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
  //                                   dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
  //                              mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
  //                                   dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
  //                         mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
  //                                   dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
  //                              mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
  //                                   dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
  //           }

  //           float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
  //             float amplitude = 0.5;
  //             float frequency = 1.0;
  //             float total = 0.0;
  //             float normalization = 0.0;

  //             for (int i = 0; i < octaves; ++i) {
  //               float noiseValue = noise(p * frequency);
  //               total += noiseValue * amplitude;
  //               normalization += amplitude;
  //               amplitude *= persistence;
  //               frequency *= lacunarity;
  //             }

  //             total /= normalization;

  //             return total;
  //           }

  //           float turbulenceFBM(vec3 p, int octaves, float persistence, float lacunarity) {
  //             float amplitude = 0.5;
  //             float frequency = 1.0;
  //             float total = 0.0;
  //             float normalization = 0.0;

  //             for (int i = 0; i < octaves; ++i) {
  //               float noiseValue = noise(p * frequency);
  //               noiseValue = abs(noiseValue);

  //               total += noiseValue * amplitude;
  //               normalization += amplitude;
  //               amplitude *= persistence;
  //               frequency *= lacunarity;
  //             }

  //             total /= normalization;

  //             return total;
  //           }

  //           mat2 get2dRotateMatrix(float _angle)
  //           {
  //               return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
  //           }

  //       `
  //     );
  //     shader.vertexShader = shader.vertexShader.replace(
  //       "#include <beginnormal_vertex>",
  //       `
  //       #include <beginnormal_vertex>

  //       // float vDisplacement =10.0*turbulenceFBM(vec3(objectNormal.xy*2.0, uTime*0.5), 8, 0.5,2.0);
  //       float vDisplacement =10.0*turbulenceFBM(vec3(objectNormal.xyz), 8, 0.5,2.0);
  //       vDisplacement = remap(vDisplacement, -10.0, 10.0, 0.0, 3.0);

  //       `
  //     );
  //     shader.vertexShader = shader.vertexShader.replace(
  //       "#include <begin_vertex>",
  //       `
  //       #include <begin_vertex>

  //        transformed.xyz =  transformed.xyz + vDisplacement * objectNormal.xyz ;
  //       //  float angle = (position.y + uTime*0.5) * 0.5;
  //       //  mat2 rotateMatrix = get2dRotateMatrix(angle);

  //       //  transformed.xz = rotateMatrix * transformed.xz;
  //       // transformed.xyz =  transformed.xyz;
  //       objectNormal.xyz = normalize(transformed.xyz);
  //       `
  //     );
  //     console.log("shader", shader);
  //     onCompile?.(shader);
  //   };
  // }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[4.0, 512, 512]} />
        <MeshTransmissionMaterial
          ref={transmissionRef}
          distortion={0.1}
          distortionScale={0.3}
          thickness={1.0}
          ior={1.5}
          roughness={0.0}
          transmission={1.0}
          chromaticAberration={4.0}
          anisotropicBlur={2.3}
          background={"#010e17"}
        />
      </mesh>
      <mesh geometry={nodes.meduze.geometry} ref={ref}>
        <experimentalTwentyoneMaterial
          ref={shaderRef}
          wireframe={false}
          transparent={true}
        />
      </mesh>
    </group>
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

      {/* <color args={["#02241a"]} attach="background" /> */}
      <color args={["#010e17"]} attach="background" />
      <ambientLight intensity={1.0} color={"#d0edf2"} />

      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
