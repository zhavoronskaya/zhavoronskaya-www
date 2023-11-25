import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import PostEffect from "./PostEffect.js";

function Post(props) {
  const { width, height } = useThree((state) => state.size);

  const effect = React.useMemo(() => {
    return new PostEffect({
      uDiffuse: null,
      uResolution: new THREE.Vector2(1, height / width),
      blendFunction: BlendFunction.SCREEN,
      uMouse: new THREE.Vector2(0, 0),
    });
  }, []);

  useFrame(({ mouse }) => {
    const x = (mouse.x + 1) * 0.5;
    const y = (mouse.y + 1) * 0.5;
    const uMouse = new THREE.Vector2(x, y);

    effect.uniforms.get("uMouse").value = uMouse;
  });

  return <primitive object={effect} />;
}

export default Post;
