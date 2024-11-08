import { Mesh } from "three";
import { disposeMaterial } from "./Material";

export function disposeMesh(mesh: Mesh) {
  mesh.geometry.dispose();
  disposeMaterial(mesh.material);
}
