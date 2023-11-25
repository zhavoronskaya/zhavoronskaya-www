import React, { useMemo } from "react";
import * as THREE from "three";

const Triangle = React.forwardRef(
  ({ vertices, position = [0, 0, 0], rotation = [0, 0, 0] }, ref) => {
    const f32array = useMemo(
      () =>
        Float32Array.from(
          new Array(vertices.length)
            .fill()
            .flatMap((item, index) => vertices[index].toArray())
        ),
      [vertices]
    );

    return (
      <group ref={ref}>
        <mesh position={position} rotation={rotation}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              itemSize={3}
              array={f32array}
              count={f32array.length / 3}
            />
          </bufferGeometry>
          <meshBasicMaterial color="#0D1117" side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }
);

export default Triangle;
