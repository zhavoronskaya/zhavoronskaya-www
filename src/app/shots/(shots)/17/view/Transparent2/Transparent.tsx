import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/transparent/vertex";
import fragmentShader from "./shaders/transparent/fragment";

import {
  MeshTransmissionMaterial,
  Point,
  Points,
  useGLTF,
} from "@react-three/drei";

const size = 20;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

function Transparent() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const transmissionRef =
    useRef<JSX.IntrinsicElements["meshTransmissionMaterial"]>(null);
  const transmissionShaderRef =
    useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const { nodes } = useGLTF("/shots/transparent/model/shell.glb");
  const shell = nodes.shell as THREE.Mesh;
  const length = shell.geometry.attributes.position.count ?? 0;

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.4;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.6;
    }
    if (transmissionShaderRef.current) {
      transmissionShaderRef.current.uniforms.uTime.value += delta;
    }
  });

  useEffect(() => {
    if (!transmissionRef.current) return;
    const material = transmissionRef.current;
    const onCompile = material.onBeforeCompile;

    material.onBeforeCompile = (webglProgram, renderer) => {
      transmissionShaderRef.current = webglProgram;

      webglProgram.uniforms.uTime = { value: 1.0 };

      webglProgram.vertexShader = webglProgram.vertexShader.replace(
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
      webglProgram.vertexShader = webglProgram.vertexShader.replace(
        "#include <beginnormal_vertex>",
        `
        #include <beginnormal_vertex>

        float vDisplacement =10.0*turbulenceFBM(vec3(objectNormal.xy*2.0, uTime*0.5), 8, 0.5,2.0);
        // float vDisplacement =10.0*turbulenceFBM(vec3(objectNormal.xyz), 8, 0.5,2.0);
        vDisplacement = remap(vDisplacement, -10.0, 10.0, 0.0, .006);

        `
      );
      webglProgram.vertexShader = webglProgram.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>

         //transformed.xyz =  transformed.xyz + vDisplacement * objectNormal.xyz ;
        //  float angle = (position.y + uTime*0.5) * 0.5;
        //  mat2 rotateMatrix = get2dRotateMatrix(angle);
 
        //  transformed.xz = rotateMatrix * transformed.xz;
        // transformed.xyz =  transformed.xyz;
        // objectNormal.xyz = normalize(transformed.xyz);
        `
      );

      onCompile?.(webglProgram, renderer);
    };
  }, []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8, 128, 128]} />
        <MeshTransmissionMaterial
          distortion={0.5}
          distortionScale={0.9}
          thickness={1.08}
          ior={1.0}
          roughness={0.2}
          transmission={1.0}
          chromaticAberration={5.0}
          anisotropicBlur={10.0}
        />
      </mesh>

      <Points limit={100000} ref={pointsRef} scale={0.05}>
        <shaderMaterial
          ref={shaderRef}
          transparent={true}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors
        />

        {Array.from({
          length,
        }).map((_, i) => {
          const i1 = i * 3;
          const position = [
            shell.geometry.attributes.position.array[i1],
            shell.geometry.attributes.position.array[i1 + 1],
            shell.geometry.attributes.position.array[i1 + 2],
          ] as const;
          const scale = Math.random() * size;

          return <Point key={i} position={position} size={scale} />;
        })}
      </Points>
    </group>
  );
}

export default Transparent;
