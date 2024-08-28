import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/transparent/vertex";
import fragmentShader from "./shaders/transparent/fragment";

import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

const backgroundColor = new THREE.Color("#0a0000");

function createSkyBox() {
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "/shots/transparent/texture/px.png",
    "/shots/transparent/texture/nx.png",
    "/shots/transparent/texture/py.png",
    "/shots/transparent/texture/ny.png",
    "/shots/transparent/texture/pz.png",
    "/shots/transparent/texture/nz.png",
  ]);
  console.log(texture);
  return texture;
}

function Transparent() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const mesh = useRef<THREE.Mesh | null>(null);
  const transmissionRef =
    useRef<JSX.IntrinsicElements["meshTransmissionMaterial"]>(null);
  const transmissionShaderRef =
    useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const { nodes } = useGLTF("/shots/transparent/model/abstract1compr.glb");
  const abstract = nodes.abstract as THREE.Mesh;

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    specMap: new THREE.Uniform(null),
  });

  useEffect(() => {
    if (shaderRef.current)
      shaderRef.current.uniforms.specMap.value = createSkyBox();
  }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
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

        float vDisplacement =10.0*turbulenceFBM(objectNormal, 8, 0.5,2.0)*10.0*sin(objectNormal.x *objectNormal.y*objectNormal.z *8.0 + uTime*4.0)*cos(objectNormal.x *objectNormal.y*objectNormal.z *20.0 + uTime*1.0) ;
        vDisplacement = remap(vDisplacement, -20.0, 20.0, 0.0, 2.0);

        `
      );
      webglProgram.vertexShader = webglProgram.vertexShader.replace(
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
      onCompile?.(webglProgram, renderer);
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
          background={backgroundColor}
          // anisotropy={1}
        />
      </mesh>
      <mesh geometry={abstract.geometry} ref={mesh}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          ref={shaderRef}
          wireframe={false}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}

export default Transparent;
