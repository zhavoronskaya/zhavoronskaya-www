"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  useGLTF,
  useAnimations,
  Lightformer,
  OrbitControls,
  Environment,
  Float,
} from "@react-three/drei";
import { Group, PerspectiveCamera, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import BaseCanvas from "..";
import {
  getSkeletonGeometry,
  getSkeleton,
  getGeometry,
} from "@/helpers/Object3d";
import Particles from "./Particles";
import Animations from "./Animations";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

type Props = {};

function getInitialCamera() {
  if (typeof window !== "undefined") {
    const cameraPos = new Vector3(-4.73, 10.49, 5.31);
    const cameraTarget = new Vector3(0, 10, 0);
    const camera = new PerspectiveCamera();
    camera.fov = 75;
    camera.near = 0.1;
    camera.far = 100;
    camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
    camera.lookAt(cameraTarget);
    camera.updateProjectionMatrix();
    return camera;
  }
}

const camera = getInitialCamera();

const BirdsScene = () => {
  return (
    <>
      <Loader
        containerStyles={{
          backgroundColor: "rgba(248, 244, 244, 1)",
        }}
        innerStyles={{ backgroundColor: "rgba(255, 255, 252, 1)" }}
        barStyles={{ backgroundColor: "rgba(240, 140, 174, 1)" }}
        // dataStyles={{ color: "rgba(11, 0, 20, 1)", fontFamily: "Satoshi" }}
        // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      />

      <BaseCanvas gl={{ antialias: true }} camera={camera} dpr={[1, 1.5]}>
        <ambientLight />

        {/* <OrbitControls /> */}
        <Particles />

        <Suspense>
          <Environment files="/textures/forest.jpg" environmentIntensity={2}>
            <Lightformer
              form="rect"
              intensity={3}
              position={[2, 6, 3]}
              scale={5}
            />
            <Lightformer
              form="rect"
              intensity={2}
              position={[-2, 4, -4]}
              scale={5}
            />
          </Environment>
          {/* <Lightformer position={[-4, 4, 2]} /> */}

          <Float
            rotation={[0, -Math.PI / 8, 0]}
            floatIntensity={4}
            rotationIntensity={2}
          >
            <Birds />
          </Float>
        </Suspense>
        <Animations />
        {/* <EffectComposer>
          <DepthOfField focusDistance={0.9} focalLength={0.2} bokehScale={4} />
        </EffectComposer> */}
      </BaseCanvas>
    </>
  );
};

export const Birds = ({}: Props) => {
  const group = useRef<Group | null>(null);
  const { nodes, materials, animations } = useGLTF("/model/zhav.glb");

  const { actions } = useAnimations(animations, group);
  const { camera, size } = useThree();

  useEffect(() => {
    for (const action in actions) {
      actions[action]?.play();
    }
  }, []);

  // useEffect(() => {
  //   // Update camera
  //   const cameraPerspective = camera as PerspectiveCamera;
  //   cameraPerspective.aspect = size.width / size.height;
  //   cameraPerspective.updateProjectionMatrix();
  // }, [size, camera]);

  return (
    <group
      ref={group}
      dispose={null}
      position={[-4, 0, 0]}
      scale={0.8}
      rotation={[0, (-3 * Math.PI) / 2, 0]}
    >
      <group name="Scene">
        <group name="SkinnedBird2" position={[-0.704, 0.055, 1.842]}>
          <group name="Bird2">
            <skinnedMesh
              name="Bird2_1"
              geometry={getSkeletonGeometry(nodes.Bird2_1)}
              material={materials.BirdBodyColor}
              skeleton={getSkeleton(nodes.Bird2_1)}
            />
            <skinnedMesh
              name="Bird2_2"
              geometry={getSkeletonGeometry(nodes.Bird2_2)}
              material={materials.BirdNeb}
              skeleton={getSkeleton(nodes.Bird2_2)}
            />
            <skinnedMesh
              name="Bird2_3"
              geometry={getSkeletonGeometry(nodes.Bird2_3)}
              material={materials.BirdWingsDark}
              skeleton={getSkeleton(nodes.Bird2_3)}
            />
            <skinnedMesh
              name="Bird2_4"
              geometry={getSkeletonGeometry(nodes.Bird2_4)}
              material={materials.BirdWingsLight}
              skeleton={getSkeleton(nodes.Bird2_4)}
            />
            <skinnedMesh
              name="Bird2_5"
              geometry={getSkeletonGeometry(nodes.Bird2_5)}
              material={materials.BirdClaws}
              skeleton={getSkeleton(nodes.Bird2_5)}
            />
            <skinnedMesh
              name="Bird2_6"
              geometry={getSkeletonGeometry(nodes.Bird2_6)}
              material={materials.Notes}
              skeleton={getSkeleton(nodes.Bird2_6)}
            />
          </group>
          <primitive object={nodes.Bone} />
        </group>
        <mesh
          name="NoteB"
          castShadow
          receiveShadow
          geometry={getGeometry(nodes.NoteB)}
          material={materials.Notes}
          position={[0.001, 2.863, 3.701]}
        />
        <mesh
          name="NoteC"
          castShadow
          receiveShadow
          geometry={getGeometry(nodes.NoteC)}
          material={materials.Notes}
          position={[0.032, 3.288, 3.544]}
        />
        <mesh
          name="NoteA"
          castShadow
          receiveShadow
          geometry={getGeometry(nodes.NoteA)}
          material={materials.Notes}
          position={[0.001, 3.59, 3.938]}
        />
        <group
          name="SkinnedBird1"
          position={[0, 1.695, 5.053]}
          rotation={[-0.167, 0, 0]}
        >
          <group name="Bird1">
            <skinnedMesh
              name="Bird1_1"
              geometry={getSkeletonGeometry(nodes.Bird1_1)}
              material={materials.BirdBodyColor}
              skeleton={getSkeleton(nodes.Bird1_1)}
            />
            <skinnedMesh
              name="Bird1_2"
              geometry={getSkeletonGeometry(nodes.Bird1_2)}
              material={materials.BirdNeb}
              skeleton={getSkeleton(nodes.Bird1_2)}
            />
            <skinnedMesh
              name="Bird1_3"
              geometry={getSkeletonGeometry(nodes.Bird1_3)}
              material={materials.BirdWingsDark}
              skeleton={getSkeleton(nodes.Bird1_3)}
            />
            <skinnedMesh
              name="Bird1_4"
              geometry={getSkeletonGeometry(nodes.Bird1_4)}
              material={materials.BirdWingsLight}
              skeleton={getSkeleton(nodes.Bird1_4)}
            />
            <skinnedMesh
              name="Bird1_5"
              geometry={getSkeletonGeometry(nodes.Bird1_5)}
              material={materials.BirdClaws}
              skeleton={getSkeleton(nodes.Bird1_5)}
            />
            <skinnedMesh
              name="Bird1_6"
              geometry={getSkeletonGeometry(nodes.Bird1_6)}
              material={materials.Notes}
              skeleton={getSkeleton(nodes.Bird1_6)}
            />
          </group>
          <primitive object={nodes.Bone_1} />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/model/zhav.glb");

export default BirdsScene;
