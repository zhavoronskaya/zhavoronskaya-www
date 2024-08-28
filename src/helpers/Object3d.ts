import { Mesh, Object3D } from "three";

export function isMesh(obj: Object3D): obj is Mesh {
  return obj?.type === "Mesh";
}
