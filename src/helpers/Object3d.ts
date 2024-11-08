import { SizeLike } from "@/interfaces";

import { Camera, Mesh, Object3D, SkinnedMesh, Vector3 } from "three";

export function isMesh(obj: Object3D): obj is Mesh {
  return obj?.type === "Mesh";
}

export function isSkinnedMesh(obj: Object3D): obj is SkinnedMesh {
  return obj?.type === "SkinnedMesh";
}

export function getGeometry(obj: Object3D) {
  return isMesh(obj) ? obj.geometry : undefined;
}
export function getSkeletonGeometry(obj: Object3D) {
  return isSkinnedMesh(obj) ? obj.geometry : undefined;
}

export function getSkeleton(obj: Object3D) {
  return isSkinnedMesh(obj) ? obj.skeleton : undefined;
}

export function toScreenPosition(
  obj: Object3D,
  camera: Camera,
  size: SizeLike
) {
  var vector = new Vector3();

  var widthHalf = 0.5 * size.width;
  var heightHalf = 0.5 * size.height;

  obj.updateMatrixWorld();
  vector.setFromMatrixPosition(obj.matrixWorld);
  vector.project(camera);

  vector.x = vector.x * widthHalf + widthHalf;
  vector.y = -(vector.y * heightHalf) + heightHalf;

  return {
    x: vector.x,
    y: vector.y,
  };
}
