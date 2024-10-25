import { Mesh, Object3D, SkinnedMesh } from "three";

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
