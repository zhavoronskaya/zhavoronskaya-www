import { useAnimations, useGLTF, useTexture, Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

import * as THREE from "three";

import { CubeTextureLoader } from "three";

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
import pointsVertexShader from "./shaders/pointsVertex.js";
import pointsFragmentShader from "./shaders/pointsFragment.js";

import useAudio from "@/hooks/useAudio.ts";
import throttle from "@/utils/throttle.js";

const meshesSettings = {
  fluffy: { type: "fluffy", group: "head" },
  up: { type: "rough", group: "head" },
  screen: { type: "screen", group: "head" },
  screenBack: { type: "screenBack", group: "head" },
  head: { type: "metal", group: "head" },

  body: { type: "metal", group: "torso" },
  handsLUp: { type: "metal", group: "torso" },
  handsLDwn: { type: "metal", group: "torso" },
  handsRUp: { type: "metal", group: "torso" },
  handsRDwn: { type: "metal", group: "torso" },
  fingersL: { type: "metal", group: "torso" },
  fingersR: { type: "metal", group: "torso" },

  legL: { type: "metal", group: "legs" },
  legR: { type: "metal", group: "legs" },
  bowl: { type: "emission", group: "legs" },
  neck: { type: "emission", group: "legs" },
  shoulderR: { type: "emission", group: "torso" },
  shoulderL: { type: "emission", group: "torso" },
  wristR: { type: "emission", group: "torso" },
  wristL: { type: "emission", group: "torso" },
  DEFAULT: { type: "emission", group: "torso" },
};

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

  const gltf = useGLTF("../../model/robotAnimate.glb");
  // const gltf = null;
  const animations = useAnimations(gltf.animations, gltf.scene);
  console.log(animations);

  const screenMesh = useRef();
  const pointsGeometryRef = useRef();
  // const pointsRef = useRef();
  const fluffyMesh = useRef();
  const shaderRef = useRef();

  const [isReady, setIsReady] = useState(false);

  const headphonesMesh = useRef();
  const emissionMesh = useRef([]);

  // console.log("ray", ray.current);

  //Download textures
  const face = useTexture("/texture/robot/face.png");
  face.flipY = false;

  face.magFilter = THREE.NearestFilter;
  face.minFilter = THREE.NearestFilter;
  const faceTalk = useTexture("/texture/robot/face-talk.png");
  faceTalk.flipY = false;

  faceTalk.magFilter = THREE.NearestFilter;
  faceTalk.minFilter = THREE.NearestFilter;
  const faceSleep = useTexture("/texture/robot/face-sleep.png");
  faceSleep.flipY = false;

  faceSleep.magFilter = THREE.NearestFilter;
  faceSleep.minFilter = THREE.NearestFilter;
  const faceTuff = useTexture("/texture/robot/face-tuff.png");
  faceTuff.flipY = false;

  faceTuff.magFilter = THREE.NearestFilter;
  faceTuff.minFilter = THREE.NearestFilter;
  const faceIdle = useTexture("/texture/robot/face-idle.png");
  faceIdle.flipY = false;

  faceIdle.magFilter = THREE.NearestFilter;
  faceIdle.minFilter = THREE.NearestFilter;
  const faceBlink = useTexture("/texture/robot/face-blink.png");
  faceBlink.flipY = false;

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
    }, 500);
  }, [face, faceTalk, faceTuff, faceSleep, faceIdle, faceBlink]);

  useFrame((state, delta) => {
    if (!audio) return;

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
    // state.camera.fov = 45 - avg / 15;
    // state.camera.updateProjectionMatrix();

    updateFace(avg, delta);
    // console.log(avg);
    // if (avg > 110) screenMesh.current.material.uniforms.uTex.value = faceTuff;

    fluffyMesh.current.scale.set(1 + avg / 800, 1, 1);
    // fluffyMesh.current.material.uniforms.uTime += delta;

    headphonesMesh.current.scale.set(1 + avg / 800, 1, 1);

    // pointsRef.current.material.uniforms.uTime.value += delta;
    // pointsRef.current.material.uniforms.uAvg.value = avg;
    emissionMesh.current.forEach((child) => {
      child.material.uniforms.uColor.value = new THREE.Vector3(
        0.8 + avg / 300,
        0.3,
        0.796
      );
    });
  });

  useEffect(() => {
    if (!gltf || !gltf.scene) return;

    // screenMesh.current.material.uniforms.uTex = face;

    console.log("gltf", gltf);

    gltf.scene.traverse((child) => {
      // console.log("child", child.name, child);
      if (child.name === "Scene") return;
      if (child.name === "Armature") return;
      const meshSettings = meshesSettings[child.name];

      if (child.type != "SkinnedMesh" || !meshSettings) return;
      child.bindMode = "detached";

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
      } else if (meshSettings.type === "screen") {
        // const screenBack = child.clone();
        // screenBack.material = screenBackMaterial;
        // gltf.scene.add(screenBack);

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
      } else if (meshSettings.type === "screenBack") {
        child.material = screenBackMaterial;
      } else if (meshSettings.type === "fluffy") {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uImpulse: { value: new THREE.Vector2(0.0, 0.0) },
            uSpikeCount: { value: 100.0 },
            uSpikeLength: { value: 1.0 },
            uSceneRotationY: { value: 0.0 },
          },
          vertexShader: earsVertex,
          fragmentShader: earsFragment,
        });

        fluffyMesh.current = child;

        // detached option
        // fluffyMesh.current.bindMode = "detached";
        // fluffyMesh.current.position.set(0, 1.4, 1.3);

        // attached option
        // fluffyMesh.current.bindMatrix.scale(new THREE.Vector3(1.1, 1, 1));

        console.log("fluffyMesh.current.", fluffyMesh.current);
      } else if (meshSettings.type === "rough") {
        child.material = new THREE.ShaderMaterial({
          uniforms: { uTime: { value: 0 } },
          vertexShader: headphonesVertex,
          fragmentShader: headphonesFragment,
          // wireframe: true,
        });
        headphonesMesh.current = child;
        // headphonesMesh.current.scale.set(10, 1, 1);
      } else {
        child.material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Vector3(0.8, 0.3, 0.796) },
          },
          vertexShader: emissionVertex,
          fragmentShader: emissionFragment,
        });
        emissionMesh.current.push(child);
        // child.material = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
      }
    });

    // gltf.nodes.scale.set(2, 1, 1);
    // gltf.scene.position.set(0, , 0);
    // gltf.scene.rotateY(Math.PI);

    setIsReady(true);
  }, [gltf]);

  useEffect(() => {
    // animations.actions.HelloAction.time = 1.0;
    animations.actions.HelloAction.play();
    // console.log(animations.actions.HelloAction);
    // window.setTimeout(() => {
    //   animations.actions.HelloAction.play();
    //   animations.actions.HelloAction.crossFadeFrom(
    //     animations.actions.DanceAction,
    //     1
    //   );
    // }, 2000);
  }, []);

  // if (!isReady) return null;

  return (
    <group {...props} dispose={null}>
      <primitive object={gltf.scene} position={[0, -2, 0]} />

      {/* <points
        // ref={pointsRef}
        material={pointsMaterial}
        position={[-1.45, 7.5, 0.0]}
      >
        <bufferGeometry attach="geometry" ref={pointsGeometryRef} />
      </points> */}

      {/* 
        <mesh ref={rayRef} geometry={ray.current} material={rayMaterial} /> */}
    </group>
  );
}
