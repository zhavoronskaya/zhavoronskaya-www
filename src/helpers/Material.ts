import { Material, ShaderMaterial } from "three";

export function isMaterial(
  material: Material | Material[]
): material is Material {
  return !Array.isArray(material);
}

export function isShaderMaterial(
  material: Material | Material[]
): material is ShaderMaterial {
  return material instanceof ShaderMaterial;
}

// export function shaderMaterial(material: Material) {
//   return material as ShaderMaterial;
// }

export function getMeterialUniforms(material: Material | Material[]) {
  if (!isMaterial(material)) return null;
  if (!(material instanceof ShaderMaterial)) return null;
  return material.uniforms;
}

export function disposeMaterial(material: Material | Material[]) {
  if (isMaterial(material)) {
    material.dispose();
  } else {
    material.forEach((m) => m.dispose());
  }
}
