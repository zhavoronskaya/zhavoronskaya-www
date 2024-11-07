"use client";
import React, { act, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  useGLTF,
  useAnimations,
  Lightformer,
  Environment,
  Float,
} from "@react-three/drei";
import {
  Box3,
  BoxGeometry,
  Camera,
  Group,
  Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Quaternion,
  Vector3,
} from "three";
import { invalidate, useFrame, useThree } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import BaseCanvas from "..";
import {
  getSkeletonGeometry,
  getSkeleton,
  getGeometry,
  toScreenPosition,
} from "@/helpers/Object3d";
import Particles from "./Particles";
import Animations from "./Animations";

import { CAMERA_POSITIONINGS_MAP } from "./CameraSettings";
import { createPortal } from "react-dom";
import useScene from "@/hooks/useScene";
import { Vector2Like } from "@/interfaces";
import { isMaterial } from "@/helpers/Material";

type Props = {};

function getInitialCamera() {
  if (typeof window !== "undefined") {
    const cameraPos = CAMERA_POSITIONINGS_MAP["default"].position;
    const cameraTarget = CAMERA_POSITIONINGS_MAP["default"].target;
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

const getRandomSign = () => {
  return Math.random() > 0.5 ? 1 : -1;
  // return (Math.round(Math.random()) * 2 - 1)
};

const camera = getInitialCamera();

const BirdsScene = () => {
  return (
    <>
      <Loader
        containerStyles={{
          backgroundColor: "rgba(255, 255, 252, 1)",
          zIndex: 100,
        }}
        innerStyles={{ backgroundColor: "rgba(255, 255, 252, 1)" }}
        barStyles={{
          backgroundColor: "rgba(240, 140, 174, 0.75)",
        }}
        // dataStyles={{ color: "rgba(11, 0, 20, 1)", fontFamily: "Satoshi" }}
        // dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      />

      <BaseCanvas gl={{ antialias: true }} camera={camera} dpr={[1, 1.5]}>
        <ambientLight />
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

          <Float
            rotation={[0, -Math.PI / 8, 0]}
            floatIntensity={4}
            rotationIntensity={2}
          >
            <Birds />
          </Float>
        </Suspense>
        <Animations />
      </BaseCanvas>
    </>
  );
};

const boxHelper = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ visible: false })
);
const boundingBoxHelper = new Box3();
const ZERO = new Vector3(0);
const INITIAL_OPACITY = 0.4;
const INITIAL_STRENGHT = 0.4;

export const Birds = ({}: Props) => {
  const group = useRef<Group | null>(null);
  const notesRef = useRef<Group | null>(null);

  const noteA = useRef<Mesh | null>(null);
  const noteB = useRef<Mesh | null>(null);
  const noteC = useRef<Mesh | null>(null);
  const cloneA = useRef<Mesh | null>(new Mesh());
  const cloneB = useRef<Mesh | null>(new Mesh());
  const cloneC = useRef<Mesh | null>(new Mesh());
  const notes2dPositionRef = useRef<Vector2Like>({ x: 0, y: 0 });
  const { nodes, materials, animations } = useGLTF("/model/zhav1.glb");
  const { camera, size, scene } = useThree();
  const { actions } = useAnimations(animations, group);
  const targetRef = useRef<Vector3>(new Vector3(0));
  const sceneState = useScene({
    watch: ["notesGroupPosition", "notesPlayingStatus"],
  });
  const { notesPlayingStatus } = sceneState.getState();

  const handleNotesPosition = () => {
    if (!notesRef.current) return;
    boundingBoxHelper.setFromObject(notesRef.current);
    targetRef.current = boundingBoxHelper.getCenter(ZERO);
    boxHelper.position.set(
      targetRef.current.x,
      targetRef.current.y,
      targetRef.current.z
    );
    notes2dPositionRef.current = toScreenPosition(boxHelper, camera, size);
    sceneState.setState(() => ({
      notesGroupPosition: notes2dPositionRef.current,
    }));
  };
  useEffect(() => {
    for (const actionName in actions) {
      const action = actions[actionName]!;
      action.setDuration(2);
      action.play();
    }
    if (
      !noteA.current ||
      !noteB.current ||
      !noteC.current ||
      !cloneA.current ||
      !cloneB.current ||
      !cloneC.current
    )
      return;
    cloneA.current = noteA.current.clone();
    cloneA.current.visible = false;
    cloneB.current = noteB.current.clone();
    cloneB.current.visible = false;
    cloneC.current = noteC.current.clone();
    cloneC.current.visible = false;
    if (!noteA.current) return;
    const material = noteA.current.material;
    if (!isMaterial(material)) return;
    material.transparent = true;
    material.needsUpdate = true;

    const cloneMatarial = material.clone();
    cloneMatarial.transparent = true;
    cloneMatarial.opacity = INITIAL_OPACITY;
    cloneA.current.material = cloneMatarial;
    cloneB.current.material = cloneMatarial;
    cloneC.current.material = cloneMatarial;
    cloneA.current.material.needsUpdate = true;
    cloneB.current.material.needsUpdate = true;
    cloneC.current.material.needsUpdate = true;

    scene.add(cloneA.current, cloneB.current, cloneC.current);

    // document.addEventListener("wheel", handleNotesPosition);
    // return () => {
    //   document.removeEventListener("wheel", handleNotesPosition);
    // };
  }, []);

  const animateNote = (note: Mesh, cloneMesh: Mesh) => {
    cloneMesh.visible = true;
    note.getWorldPosition(cloneMesh.position);
    note.getWorldQuaternion(cloneMesh.quaternion);
    cloneMesh.updateMatrix();

    const { x, y, z } = cloneMesh.position;

    const tl = gsap.timeline({
      onComplete: () => {
        cloneMesh.visible = false;
      },
    });

    for (let i = 0; i <= 16; i++) {
      tl.to(
        cloneMesh.position,
        {
          x: x + getRandomSign() * Math.random() * INITIAL_STRENGHT,
          y: y + getRandomSign() * Math.random() * INITIAL_STRENGHT,
          z: z + getRandomSign() * Math.random() * INITIAL_STRENGHT,
          ease: "sine.inOut",
          duration: 0.3,
          immediateRender: false,
          onComplete: () => {
            note.getWorldPosition(cloneMesh.position);
            note.getWorldQuaternion(cloneMesh.quaternion);
            cloneMesh.updateMatrix();
          },
        },
        ">"
      ).to(
        cloneMesh.material,
        {
          opacity: 0,
          ease: "sine.inOut",
          duration: 0.3,

          onComplete: () => {
            if (!isMaterial(cloneMesh.material)) return;
            cloneMesh.material.opacity = INITIAL_OPACITY;
          },
        },
        "<"
      );
    }

    // tl.to(cloneMesh.position, {
    //   x: Math.round(Math.random()) * 2 - 1,
    //   y: Math.round(Math.random()) * 2 - 1,
    //   z: Math.round(Math.random()) * 2 - 1,
    //   ease: "sine.inOut",
    //   duration: 0.5,
    //   repeat: 9,
    //   // repeatRefresh: true,
    //   onComplete: () => {
    //     cloneMesh.visible = false;
    //     note.getWorldPosition(cloneMesh.position);
    //     cloneMesh.updateMatrix();
    //     const pos = note.getWorldPosition(cloneMesh.position);
    //     console.log(pos, cloneMesh.position);
    //   },

    //   onRepeat: () => {
    //     console.log("repeat");
    //     const pos = note.getWorldPosition(cloneMesh.position);
    //     note.getWorldPosition(cloneMesh.position);
    //     note.getWorldQuaternion(cloneMesh.quaternion);
    //     cloneMesh.updateMatrix();
    //     cloneMesh.matrixWorldNeedsUpdate = true;

    //     // console.log(pos, cloneMesh.position);
    //   },
    // });
    // tl.to(
    //   cloneMesh.material,
    //   {
    //     opacity: 0,
    //     ease: "sine.inOut",
    //     duration: 0.5,

    //     onComplete: () => {
    //       if (!isMaterial(cloneMesh.material)) return;
    //       cloneMesh.material.opacity = 1;
    //     },
    //   },
    //   "<"
    // );
  };

  useEffect(() => {
    if (notesPlayingStatus === "ON") {
      if (
        !noteA.current ||
        !noteB.current ||
        !noteC.current ||
        !cloneA.current ||
        !cloneB.current ||
        !cloneC.current
      )
        return;
      animateNote(noteA.current, cloneA.current);
      animateNote(noteB.current, cloneB.current);
      animateNote(noteC.current, cloneC.current);

      actions.Bird1?.setDuration(0.8);
    } else {
      actions.Bird1?.setDuration(2);
    }
  }, [actions, notesPlayingStatus]);

  useFrame(() => {
    handleNotesPosition();
  });

  return (
    <>
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
                material={materials.Eyes}
                skeleton={getSkeleton(nodes.Bird2_6)}
              />
            </group>
            <primitive object={nodes.Bone} />
          </group>

          <group ref={notesRef}>
            <mesh
              ref={noteB}
              name="NoteB"
              castShadow
              receiveShadow
              geometry={getGeometry(nodes.NoteB)}
              material={materials.Notes}
              // position={[0.001, 2.863, 3.701]}
              // position={[10, 10, 10]}
            />
            <mesh
              ref={noteC}
              name="NoteC"
              castShadow
              receiveShadow
              geometry={getGeometry(nodes.NoteC)}
              material={materials.Notes}
              position={[0.032, 3.288, 3.544]}
            />
            <mesh
              ref={noteA}
              name="NoteA"
              castShadow
              receiveShadow
              geometry={getGeometry(nodes.NoteA)}
              material={materials.Notes}
              position={[0.001, 3.59, 3.938]}
            />
          </group>
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
                material={materials.Eyes}
                skeleton={getSkeleton(nodes.Bird1_6)}
              />
            </group>
            <primitive object={nodes.Bone_1} />
          </group>
        </group>
      </group>
    </>
  );
};

useGLTF.preload("/model/zhav.glb");

export default BirdsScene;
