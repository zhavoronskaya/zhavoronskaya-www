import React from "react";
import {
  shaderMaterial,
  OrbitControls,
  useGLTF,
  MeshTransmissionMaterial,
  Stage,
  Caustics,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { RGBELoader } from "three-stdlib";
import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
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
import { CubeTextureLoader } from "three";
const ExperimentalNineteenMaterial = shaderMaterial(
  {
    uTime: 0,
    specMap: null,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalNineteenMaterial });

function createSkyBox() {
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "/texture/alonetogether/px.png",
    "/texture/alonetogether/nx.png",
    "/texture/alonetogether/py.png",
    "/texture/alonetogether/ny.png",
    "/texture/alonetogether/pz.png",
    "/texture/alonetogether/nz.png",
  ]);
  console.log(texture);
  return texture;
}

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const transmissionRef = useRef();
  const transmissionShaderRef = useRef();

  const { nodes } = useGLTF("../../model/abstract1compr.glb");

  useEffect(() => {
    shaderRef.current.specMap = createSkyBox();
  }, []);
  // useEffect(() => {
  //   shaderRef.current.uniforms.specMap.value = createSkyBox();
  // }, []);
  useFrame((state, delta) => {
    if (shaderRef.current) {
      //   // shaderRef.current.uniforms.uTime.value += delta * 0.3;
      // ref.current.rotation.y += delta * 0.4;
      shaderRef.current.uTime += delta * 0.5;
      // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
      // state.camera.updateProjectionMatrix();
    }

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

            mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }

        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        `
        #include <beginnormal_vertex>

        float vDisplacement =10.0*turbulenceFBM(objectNormal, 8, 0.5,2.0)*10.0*sin(objectNormal.x *objectNormal.y*objectNormal.z *8.0 + uTime*4.0)*cos(objectNormal.x *objectNormal.y*objectNormal.z *20.0 + uTime*1.0) ;
        vDisplacement = remap(vDisplacement, -20.0, 20.0, 0.0, 2.0);

        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>

        transformed.xyz =  transformed.xyz + vDisplacement * objectNormal.xyz ;
        // float angle = (position.y + uTime*0.5) * 0.5;
        // mat2 rotateMatrix = get2dRotateMatrix(angle);

        // transformed.xz = rotateMatrix * transformed.xz;
        objectNormal.xyz = normalize(transformed.xyz);
        `
      );
      console.log("shader", shader);
      onCompile?.(shader);
    };
  }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[10.0, 512, 512]} />
        <MeshTransmissionMaterial
          ref={transmissionRef}
          distortion={1.8}
          distortionScale={0.3}
          thickness={1.0}
          ior={3.0}
          roughness={0.0}
          transmission={1.01}
          chromaticAberration={8.0}
          anisotropicBlur={3.3}
          background={"#0a0000"}
          // anisotropy={1}
        />
      </mesh>

      <mesh geometry={nodes.abstract.geometry} ref={ref}>
        {/* <torusKnotGeometry args={[3, 0.8, 64, 128]} /> */}
        {/* 
        <MeshTransmissionMaterial
          distortion={1.0}
          distortionScale={0.1}
          thickness={1.0}
          ior={1.6}
          roughness={0.02}
          transmission={1.01}
          chromaticAberration={4.0}
          anisotropicBlur={2.3}
          background={"#839681"}
        /> */}

        <experimentalNineteenMaterial
          transparent={true}
          ref={shaderRef}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer multisampling={3}>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={0} />
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0.5} />

        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer> */}

      {/* <color args={["#02241a"]} attach="background" /> */}

      <color args={["#0a0000"]} attach="background" />
      <ambientLight intensity={4.0} color={"#fff"} />
      {/* <pointLight intensity={200} position={[40, 80, 0]} color={"#e3bbf0"} /> */}

      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
