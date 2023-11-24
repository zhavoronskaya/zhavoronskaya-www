import { Suspense, useEffect, useRef } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Environment,
  Text,
  Text3D,
  MeshTransmissionMaterial,
  useTexture,
} from "@react-three/drei";

import harlemVertexShader from "./shaders/vertex.js";
import harlemFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
  Noise,
  Glitch,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";

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

        float vDisplacement =10.0*turbulenceFBM(objectNormal*10.0, 8, 0.5,2.0)+10.0*sin(objectNormal.x *2.0 + uTime*3.0)*cos(objectNormal.y *3.0 + uTime*3.0) ;
        vDisplacement = remap(vDisplacement, -10.0, 10.0, 0.0, 2.0);

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
    <mesh ref={ref} scale={[1, 1, 1]}>
      {/* <sphereGeometry ref={geomertyRef} args={[2, 512, 512]} /> */}
      <torusKnotGeometry args={[3, 0.8, 128, 256]} />
      {/* <shaderMaterial
        ref={shaderRef}
        key="stable"
        vertexShader={mirrorVertex}
        fragmentShader={mirrorFragment}
        transparent
        uniforms={{
          uTime: { value: 0 },
          specMap: { value: null },
        }}
      /> */}

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
      />
    </mesh>
  );
}

function Logo() {
  const texture = useTexture("/image/harlem.png");
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = true;
  console.log(texture);
  // texture.minFilter = THREE.NearestFilter;
  // texture.magFilter = THREE.NearestFilter;
  // texture.generateMipmaps = false;
  const shaderRef = useRef();

  // useEffect(() => {
  //   shaderRef.current.uTex = texture;
  // }, []);

  // useFrame((state, delta) => {
  //   if (shaderRef.current) {
  //     //console.log("upd", Math.round(shaderRef.current.uniforms.uTime.value));
  //     shaderRef.current.uniforms.uTime.value += delta * 0.5;
  //   }
  // });
  const geomertyRef = useRef();
  const logo = useRef();
  // useEffect(() => {
  //   shaderRef.current.uTex = texture;
  // }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      //console.log("upd", Math.round(shaderRef.current.uniforms.uTime.value));
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
    }
    // state.camera.fov = Math.sin(state.clock.getElapsedTime() * 3.0) * 2 + 45;
    // state.camera.updateProjectionMatrix();
    // logo.current.rotation.y += delta;
  });
  return (
    <mesh ref={logo} key="stable">
      <planeGeometry ref={geomertyRef} args={[15, 10, 64, 32]} />
      <shaderMaterial
        ref={shaderRef}
        key="stable"
        side={THREE.DoubleSide}
        vertexShader={harlemVertexShader}
        fragmentShader={harlemFragmentShader}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uTex: { value: texture },
          // uResolution: {
          //   value: new THREE.Vector2(viewport.width, viewport.height),
          // },
        }}
      />
    </mesh>
  );
}

export default function Experience() {
  const fontUrl = "/fonts/Aktura-Regular.ttf";
  // const fontUrl = "/fonts/Aktura_Regular.json";

  return (
    <>
      <OrbitControls />
      <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0.0} />
        <Noise opacity={0.2} />
        {/* <Glitch
          delay={[0.7, 1]}
          duration={[0.1, 0.2]}
          strength={[0.1, 0.2]}
          mode={GlitchMode.SPORADIC}
        /> */}
      </EffectComposer>

      {/* <Environment preset="night" /> */}

      <color args={["#9e8295"]} attach="background" />
      {/* <Text3D font={fontUrl} smooth={1}>
        harlem
        <meshBasicMaterial color={"black"} />
      </Text3D> */}
      {/* <Text
        font={fontUrl}
        fontSize={4}
        color="#1d0a30"
        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
      >
        harlem
      </Text> */}
      <Suspense fallback={null}>
        <Object />
        <Logo />
      </Suspense>
    </>
  );
}
