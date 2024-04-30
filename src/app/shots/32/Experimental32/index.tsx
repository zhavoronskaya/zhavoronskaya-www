"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";
import * as THREE from "three";

const CAMERA_POS = new THREE.Vector3(6, 0, 6);
const CAMERA_LOOK_AT = new THREE.Vector3(0, 0, 0);
const CAMERA_SETTINGS = { fov: 45, near: 0.1, far: 1000 };

const camera = new THREE.PerspectiveCamera();
camera.fov = CAMERA_SETTINGS.fov;
camera.near = CAMERA_SETTINGS.near;
camera.far = CAMERA_SETTINGS.far;
camera.position.set(CAMERA_POS.x, CAMERA_POS.y, CAMERA_POS.z);
camera.lookAt(CAMERA_LOOK_AT);
export default function Scene() {
  return (
    <BaseCanvas dpr={[1, 2]} camera={camera}>
      <Experience />
    </BaseCanvas>
  );
}
