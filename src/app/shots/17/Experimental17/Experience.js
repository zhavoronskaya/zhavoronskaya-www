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

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

const count = 100000;
const size = 200;

const ParticlesMaterialSevenTeen = new shaderMaterial(
  { uSize: 200, uTime: 0 },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ ParticlesMaterialSevenTeen });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const transmissionRef = useRef();
  const transmissionShaderRef = useRef();

  // useEffect(() => {
  //   shaderRef.current.uniforms.specMap.value = createSkyBox();
  // }, []);
  useFrame((state, delta) => {
    // if (shaderRef.current) {
    //   // shaderRef.current.uniforms.uTime.value += delta * 0.3;
    ref.current.rotation.y += delta * 0.4;
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
    // state.camera.updateProjectionMatrix();
    // }

    if (transmissionShaderRef.current) {
      transmissionShaderRef.current.uniforms.uTime.value += delta;
    }
  });

  React.useEffect(() => {
    const material = transmissionRef.current;
    const onCompile = material.onBeforeCompile;

    material.onBeforeCompile = (shader) => {
      transmissionShaderRef.current = shader;

      shader.uniforms.uTime = { value: 1.0 };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
            #include <common>

            uniform float uTime;

            float inverseLerp(float v, float minValue, float maxValue) {
              return (v - minValue) / (maxValue - minValue);
            }

            float remap(float v, float inMin, float inMax, float outMin, float outMax) {
              float t = inverseLerp(v, inMin, inMax);
              return mix(outMin, outMax, t);
            }
            vec3 hash( vec3 p ) // replace this by something better
            {
              p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
                        dot(p,vec3(269.5,183.3,246.1)),
                        dot(p,vec3(113.5,271.9,124.6)));

              return -1.0 + 2.0*fract(sin(p)*43758.5453123);
            }

            float noise( in vec3 p )
            {
              vec3 i = floor( p );
              vec3 f = fract( p );

              vec3 u = f*f*(3.0-2.0*f);

              return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ),
                                    dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                               mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ),
                                    dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
                          mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ),
                                    dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                               mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ),
                                    dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
            }

            float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
              float amplitude = 0.5;
              float frequency = 1.0;
              float total = 0.0;
              float normalization = 0.0;

              for (int i = 0; i < octaves; ++i) {
                float noiseValue = noise(p * frequency);
                total += noiseValue * amplitude;
                normalization += amplitude;
                amplitude *= persistence;
                frequency *= lacunarity;
              }

              total /= normalization;

              return total;
            }

  

            float turbulenceFBM(vec3 p, int octaves, float persistence, float lacunarity) {
              float amplitude = 0.5;
              float frequency = 1.0;
              float total = 0.0;
              float normalization = 0.0;

              for (int i = 0; i < octaves; ++i) {
                float noiseValue = noise(p * frequency);
                noiseValue = abs(noiseValue);

                total += noiseValue * amplitude;
                normalization += amplitude;
                amplitude *= persistence;
                frequency *= lacunarity;
              }

              total /= normalization;

              return total;
            }

        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        `
        #include <beginnormal_vertex>

        float vDisplacement =10.0*turbulenceFBM(objectNormal, 8, 0.5,2.0)+10.0*sin(objectNormal.x *objectNormal.z *8.0 + uTime*1.0)*cos(objectNormal.y *20.0 + uTime*1.0) ;
        vDisplacement = remap(vDisplacement, -40.0, 40.0, 0.0, 10.0);

        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>

        transformed.xyz =  transformed.xyz + vDisplacement * objectNormal.xyz ;
        objectNormal.xyz = normalize(transformed.xyz);
        `
      );
      console.log("shader", shader);
      onCompile?.(shader);
    };
  }, []);

  return (
    <mesh
      ref={ref}
      scale={[1, 1.2, 1]}
      rotation={[0, 0, 0]}
      position={[0, 2.3, 0]}
    >
      <sphereGeometry args={[1, 512, 512]} />
      {/* <torusKnotGeometry args={[3, 0.8, 64, 128]} /> */}

      {/* 
      <MeshTransmissionMaterial
        ref={transmissionRef}
        distortion={2.5}
        distortionScale={0.39}
        thickness={1.4}
        ior={1.02}
        roughness={0.0}
        transmission={1.0}
        // background={env}
        chromaticAberration={5.0}
        anisotropicBlur={0.0}
      /> */}

      <MeshTransmissionMaterial
        ref={transmissionRef}
        distortion={1.2}
        distortionScale={0.09}
        thickness={3.03}
        ior={1.03}
        roughness={0.0}
        transmission={1.03}
        background={"aqua"}
        chromaticAberration={1.0}
        anisotropicBlur={0.3}
      />
    </mesh>
  );
}

function Particles() {
  const shaderRef = useRef();
  const pointsRef = useRef();
  const { nodes } = useGLTF("../../model//tree1.glb");
  console.log(
    // nodes.tree1.geometry.attributes.position.array,
    nodes.tree1.geometry.attributes.position.count
  );
  useFrame((state, delta) => {
    // if (shaderRef.current)
    //   shaderRef.current.uTime += state.clock.getElapsedTime() * 0.0051;

    if (shaderRef.current) shaderRef.current.uTime += delta * 0.5;
    // pointsRef.current.rotation.z += delta;
  });
  console.log(nodes.tree1.geometry.attributes.position);

  return (
    <Points limit={1000000} rotation={[0, 0, 0]} ref={pointsRef}>
      <particlesMaterialSevenTeen
        ref={shaderRef}
        transparent={true}
        uSize={size}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
      {Array.from({
        length: nodes.tree1.geometry.attributes.position.count,
      }).map((_, i) => {
        const tetha = Math.random();
        const phi = Math.random();
        const i1 = i * 3;
        const position = [
          nodes.tree1.geometry.attributes.position.array[i1],
          nodes.tree1.geometry.attributes.position.array[i1 + 1],
          nodes.tree1.geometry.attributes.position.array[i1 + 2],
        ];
        const scale = Math.random() * size;

        return <Point key={i} position={position} size={scale} />;
      })}
    </Points>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
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
      <color args={["#022623"]} attach="background" />
      <ambientLight intensity={10.0} color={"aqua"} />

      <Suspense fallback={null}>
        <Object />
        <Particles />
      </Suspense>
    </>
  );
}
