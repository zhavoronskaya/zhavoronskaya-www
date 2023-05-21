import { useGLTF, useTexture, Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

import { handsTwistMaterial } from "./handsTwistMaterial.js";

import * as THREE from "three";

// import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { CubeTextureLoader } from "three";
import { LightningStrike } from "three/addons/geometries/LightningStrike.js";

import metalVertex from "./shaders/metalVertex.js";
import metalFragment from "./shaders/metalFragment.js";
import emissionVertex from "./shaders/emissionVertex.js";
import emissionFragment from "./shaders/emissionFragment.js";
import screenVertex from "./shaders/screenTexVertex.js";
import screenFragment from "./shaders/screenTexFragment.js";
import screenBackVertex from "./shaders/screenGridVertex.js";
import screenBackFragment from "./shaders/screenGridFragment.js";
import earsVertex from "./shaders/earsVertex.js";
import earsFragment from "./shaders/earsFragment.js";
import headphonesVertex from "./shaders/headphonesUpVertex.js";
import headphonesFragment from "./shaders/headphonesUpFragment.js";
import lightningVertexShader from "./shaders/lightningVertex.js";
import lightningFragmentShader from "./shaders/lightningFragment.js";
import pointsVertexShader from "./shaders/pointsVertex.js";
import pointsFragmentShader from "./shaders/pointsFragment.js";

import useAudio from "@/hooks/useAudio.ts";
import throttle from "@/utils/throttle.js";

const meshesSettings = {
  fluffy: { type: "fluffy", group: "head" },
  up: { type: "rough", group: "head" },
  screen: { type: "screen", group: "head" },
  body: { type: "metal", group: "torso" },
  handsLUp: { type: "metal", group: "torso" },
  handsLDwn: { type: "metal", group: "torso" },
  handsRUp: { type: "metal", group: "torso" },
  handsRDwn: { type: "metal", group: "torso" },
  fingersL: { type: "metal", group: "torso" },
  fingersR: { type: "metal", group: "torso" },
  head: { type: "metal", group: "head" },
  legL: { type: "metal", group: "legs" },
  legR: { type: "metal", group: "legs" },
  bowl: { type: "emission", group: "legs" },
  DEFAULT: { type: "emission", group: "torso" },
};

// const groups = {
//   head: new THREE.Group(),
//   legs: new THREE.Group(),
//   torso: new THREE.Group(),
// };

function createSkyBox() {
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/texture/robot/px.png",
    "/texture/robot/nx.png",
    "/texture/robot/py.png",
    "/texture/robot/ny.png",
    "/texture/robot/pz.png",
    "/texture/robot/nz.png",
  ]);
  // console.log(texture);
  return texture;
}

function createRayMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAvg: { value: 110 },
      // uResolution: {
      //   value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      // },
      // uResolution: {
      //   value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      // },
      // uAvg: { value: 110 },
    },
    vertexShader: lightningVertexShader,
    fragmentShader: lightningFragmentShader,
    transparent: true,
  });
}
function createPointsMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAvg: { value: 110 },
      uSize: { value: 80 },
    },
    vertexShader: pointsVertexShader,
    fragmentShader: pointsFragmentShader,
    transparent: true,
    depthWrite: false,
  });
}

function createScreenBackMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: screenBackVertex,
    fragmentShader: screenBackFragment,
  });
}

// const rayMaterial = createRayMaterial();
const screenBackMaterial = createScreenBackMaterial();
const pointsMaterial = createPointsMaterial();

function calculatePoints(arr, width) {
  const barWidth = width / arr.length;
  return [...arr].map((value, index) => {
    return new THREE.Vector3(index * barWidth, (value * 0.2) / 255.0, 0.0);
  });
}

export default function Model({ url, ...props }) {
  //Audio
  const audio = useAudio(url);

  //Model

  const gltf = useGLTF("../../model/robot.glb");
  // const { nodes } = useGLTF("../../model/rob.glb");
  const screenMesh = useRef();
  const pointsGeometryRef = useRef();
  const pointsRef = useRef();
  const fluffyMesh = useRef();

  const materialRef = useRef();
  const shaderRef = useRef();
  // const rayRef = useRef();

  const headphonesMesh = useRef();
  const emissionMesh = useRef([]);
  const groups = useRef({
    head: [],
    legs: [],
    torso: [],
  });

  const ray = React.useRef();
  const screenBack = React.useRef();

  // console.log("ray", ray.current);

  //Download textures
  const face = useTexture("/texture/robot/face.png");
  face.flipY = false;
  face.encoding = THREE.sRGBEncoding;
  face.magFilter = THREE.NearestFilter;
  face.minFilter = THREE.NearestFilter;
  const faceTalk = useTexture("/texture/robot/face-talk.png");
  faceTalk.flipY = false;
  faceTalk.encoding = THREE.sRGBEncoding;
  faceTalk.magFilter = THREE.NearestFilter;
  faceTalk.minFilter = THREE.NearestFilter;
  const faceSleep = useTexture("/texture/robot/face-sleep.png");
  faceSleep.flipY = false;
  faceSleep.encoding = THREE.sRGBEncoding;
  faceSleep.magFilter = THREE.NearestFilter;
  faceSleep.minFilter = THREE.NearestFilter;
  const faceTuff = useTexture("/texture/robot/face-tuff.png");
  faceTuff.flipY = false;
  faceTuff.encoding = THREE.sRGBEncoding;
  faceTuff.magFilter = THREE.NearestFilter;
  faceTuff.minFilter = THREE.NearestFilter;
  const faceIdle = useTexture("/texture/robot/face-idle.png");
  faceIdle.flipY = false;
  faceIdle.encoding = THREE.sRGBEncoding;
  faceIdle.magFilter = THREE.NearestFilter;
  faceIdle.minFilter = THREE.NearestFilter;
  const faceBlink = useTexture("/texture/robot/face-blink.png");
  faceBlink.flipY = false;
  faceBlink.encoding = THREE.sRGBEncoding;
  faceBlink.magFilter = THREE.NearestFilter;
  faceBlink.minFilter = THREE.NearestFilter;

  const updateFace = React.useMemo(() => {
    return throttle((avg, delta) => {
      screenMesh.current.material.uniforms.uAvg.value = avg;
      if (
        screenMesh.current.material.uniforms.uTime.value <
        screenMesh.current.material.uniforms.uDuration.value
      ) {
        if (avg > 115.0) {
          screenMesh.current.material.uniforms.uTex2.value = faceTuff;
        } else if (avg >= 110.0 && avg <= 115.0) {
          screenMesh.current.material.uniforms.uTex2.value = faceTalk;
        } else if (avg >= 90.0 && avg <= 110.0) {
          screenMesh.current.material.uniforms.uTex2.value = faceBlink;
        } else if (avg > 60.0 && avg < 90.0) {
          screenMesh.current.material.uniforms.uTex2.value = faceIdle;
        } else if (avg >= 30.0 && avg <= 60.0) {
          screenMesh.current.material.uniforms.uTex2.value = faceSleep;
        } else {
          screenMesh.current.material.uniforms.uTex2.value = face;
        }

        screenMesh.current.material.uniforms.uTime.value += delta;
      } else {
        screenMesh.current.material.uniforms.uTime.value = 0.0;
      }

      screenMesh.current.material.uniforms.uTex.value =
        screenMesh.current.material.uniforms.uTex2.value;
    }, 1000.0);
  }, [face, faceTalk, faceTuff, faceSleep, faceIdle, faceBlink]);

  useFrame((state, delta) => {
    if (!audio) return;
    // groups.current.head.rotation.y += 0.0 * delta;

    let avg = audio.update();
    let length = audio.data.length;
    // console.log(audio.data);

    if (shaderRef.current) shaderRef.current.uniforms.uTime.value += delta;

    if (pointsGeometryRef.current) {
      const points = calculatePoints(audio.data, 2.9);
      pointsGeometryRef.current.setFromPoints(points);
    }
    // console.log(length, avg);

    // console.log(avg);
    // state.camera.fov = 45 - audio.data.avg / 15;
    // state.camera.updateProjectionMatrix();

    updateFace(avg, delta);
    // console.log(avg);
    // if (avg > 110) screenMesh.current.material.uniforms.uTex.value = faceTuff;

    // ray.current.sourceOffset = new THREE.Vector3(1.5, 2.0, 0.0);
    // ray.current.destOffset = new THREE.Vector3(-1.5, 2.0, 0.0);

    // console.log(ray.current.destOffset.x);

    // screenBack.current.material.uniforms.uTime.value += delta;

    // rayRef.current.material.uniforms.uTime.value += delta;
    // rayRef.current.material.uniforms.uAvg.value = avg;

    // if (ray.current) {
    //   // console.log("stra", ray.current);
    //   ray.current.rayParameters.straightness = 1.0 - avg / 200;
    //   ray.current.update(state.clock.getElapsedTime());
    // }

    fluffyMesh.current.scale.set(1, 1 + avg / 800, 1);
    headphonesMesh.current.scale.set(1 + avg / 800, 1, 1);
    fluffyMesh.current.material.uniforms.uTime += delta;
    pointsRef.current.material.uniforms.uTime.value += delta;
    // pointsRef.current.material.uniforms.uAvg.value = avg;
    emissionMesh.current.forEach((child) => {
      child.material.uniforms.uColor.value = new THREE.Vector3(
        0.026 + avg / 300,
        0.32,
        0.338
      );
    });
    //rayParams.sourceOffset.x = headphonesMesh.current.position.z - 0.05;

    // console.log(headphonesMesh.current.position);

    // earsMesh.current.updateProjectionMatrix();
  });

  useEffect(() => {
    if (!gltf || !gltf.scene) return;
    // screenMesh.current.material.uniforms.uTex = face;
    // const groups = {
    //   head: new THREE.Group(),
    //   legs: new THREE.Group(),
    //   torso: new THREE.Group(),
    // };

    console.log("gltf.scene", gltf.scene);

    gltf.scene.traverse((child) => {
      const meshSettings = meshesSettings[child.name] || meshesSettings.DEFAULT;
      const group = groups.current[meshSettings.group];

      // console.log("child.name", child.name);
      // console.log("group", group.name);

      if (child.name === "Scene") return;

      if (meshSettings.type === "metal") {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            specMap: { value: createSkyBox() },
          },
          vertexShader: metalVertex,
          fragmentShader: metalFragment,
        });

        // materialRef.current = child.material;
        handsTwistMaterial(
          child.material,
          (shader) => (shaderRef.current = shader)
        );
      } else if (meshSettings.type === "screen") {
        console.log("screen", child);

        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uResolution: {
              value: new THREE.Vector2(2.3, 1.57),
            },
            uTex: { value: face },
            uTex2: { value: face },
            uAvg: { value: 110 },
            uDuration: { value: 2.0 },
          },
          vertexShader: screenVertex,
          fragmentShader: screenFragment,
          transparent: true,
        });

        screenMesh.current = child;
        screenBack.current = child.geometry;
      } else if (meshSettings.type === "fluffy") {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uImpulse: { value: new THREE.Vector2(0.0, 0.0) },
            uSpikeCount: { value: 200.0 },
            uSpikeLength: { value: 1.0 },
            uSceneRotationY: { value: 0.0 },
          },
          vertexShader: earsVertex,
          fragmentShader: earsFragment,
          // wireframe: true,
        });

        fluffyMesh.current = child;
        // child.material.blending = THREE.AdditiveBlending;
        // console.log("child", child);
      } else if (meshSettings.type === "rough") {
        child.material = new THREE.ShaderMaterial({
          uniforms: { uTime: { value: 0 } },
          vertexShader: headphonesVertex,
          fragmentShader: headphonesFragment,
          // wireframe: true,
        });
        headphonesMesh.current = child;

        // const sourceOffset = child.position.clone();
        // sourceOffset.x -= 1.4735;
        // sourceOffset.y += 0.86;

        // const destOffset = child.position.clone();
        // destOffset.x += 1.4735;
        // destOffset.y += 0.86;

        // ray.current = new LightningStrike({
        //   sourceOffset,
        //   destOffset,

        //   radius0: 0.03,
        //   radius1: 0.03,
        //   minRadius: 0.015,
        //   maxIterations: 7,

        //   isEternal: true,

        //   timeScale: 0.7,
        //   propagationTimeFactor: 0.05,
        //   vanishingTimeFactor: 0.95,
        //   subrayPeriod: 3.5,
        //   subrayDutyCycle: 0.6,
        //   maxSubrayRecursion: 3,
        //   ramification: 7,
        //   recursionProbability: 0.6,

        //   roughness: 0.85,
        //   straightness: 0.73,
        // });

        // ray.current.destOffset = headphonesMesh.current.position;
        // child.material.blending = THREE.AdditiveBlending;
        console.log("child", child);
      } else {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Vector3(0.026, 0.32, 0.338) },
          },
          vertexShader: emissionVertex,
          fragmentShader: emissionFragment,
        });
        emissionMesh.current.push(child);
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
      }

      // console.log("child", child);

      // group.add(child.clone());
    });
  }, [gltf, screenBack]);

  // const isReady = screenBack.current && ray.current;
  const isReady = screenBack.current;

  if (!isReady) return null;

  return (
    <Stage environment="sunset" preset="portrait" intensity={2}>
      <group {...props} dispose={null}>
        <primitive object={gltf.scene} rotation={[0, Math.PI, 0]} />
        {/* <primitive object={groups.current.head} />
      <primitive object={groups.current.torso} />
      <primitive object={groups.current.legs} /> */}

        <mesh
          geometry={screenBack.current}
          material={screenBackMaterial}
          position={[0.0111626535654068, 5.2866973876953125, 0.610754698608398]}
          rotation={[-Math.PI / 2.0, 0.0, 0.0]}
        />

        <points
          material={pointsMaterial}
          ref={pointsRef}
          position={[-1.45, 7.5, 0.0]}
        >
          <bufferGeometry attach="geometry" ref={pointsGeometryRef} />
        </points>
        {/* <Points ref={pointsGeometryRef} limit={10000} material={pointsMaterial}>
          {Array.from({ length: 500.0 }).map((_, i) => {
            const position = [
              (Math.random() - 0.5) * 3.0,
              7.56025,
              (Math.random() - 0.5) * 0.01,
            ];
            const scale = Math.random() * 300.0;

            return <Point key={i} position={position} size={scale} />;
          })}
        </Points> */}
        {/* 
        <mesh ref={rayRef} geometry={ray.current} material={rayMaterial} /> */}
      </group>
    </Stage>
  );
}
