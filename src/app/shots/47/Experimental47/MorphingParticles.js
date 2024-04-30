import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, use } from "react";
import * as THREE from "three";
import { useGLTF, useScroll } from "@react-three/drei";
import morphingVertexShader from "./shaders/morphing/vertex.js";
import morphingFragmentShader from "./shaders/morphing/fragment.js";

import gsap from "gsap";

function setData(model) {
  const particles = {};
  const positions = model.scene.children.map((child) => {
    // if (child.type == "Mesh")
    return child.geometry.attributes.position;
  });
  console.log(positions);
  particles.maxCount = 0;

  //calculate maxcount of particles
  for (const position of positions) {
    if (position.count > particles.maxCount)
      particles.maxCount = position.count;
  }
  console.log(particles.maxCount);
  particles.positions = [];

  const sizesArray = new Float32Array(particles.maxCount);
  particles.sizes = sizesArray;
  for (const position of positions) {
    const originalArray = position.array;
    const newArray = new Float32Array(particles.maxCount * 3);

    for (let i = 0; i < particles.maxCount; i++) {
      const i3 = i * 3;
      sizesArray[i] = Math.random();
      if (i3 < originalArray.length) {
        newArray[i3 + 0] = originalArray[i3 + 0];
        newArray[i3 + 1] = originalArray[i3 + 1];
        newArray[i3 + 2] = originalArray[i3 + 2];
      } else {
        const randomIndex = Math.floor(position.count * Math.random()) * 3;
        newArray[i3 + 0] = originalArray[randomIndex + 0];
        newArray[i3 + 1] = originalArray[randomIndex + 1];
        newArray[i3 + 2] = originalArray[randomIndex + 2];
      }
    }

    particles.positions.push(newArray);
  }

  console.log(particles.positions);

  return particles;
}

function MorphingParticles() {
  const gl = useThree();

  const geomRef = useRef();
  const pointsRef = useRef();
  const model = useGLTF("../../model/flowerBird1.glb");
  const [data] = useState(() => setData(model));

  const scroll = useScroll();
  // console.log("SCRLLLL", scroll);
  // const [currentIndex, setCurrent] = useState(1);
  // const [prevIndex, setPrev] = useState(0);
  const currentIndex = useRef(0);
  const prevIndex = useRef(1);
  // const [isVisible, setIsVisible] = useState(true);

  const uniforms = useRef({
    uSize: new THREE.Uniform(0.25),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
    uScroll: new THREE.Uniform(0.0),
    // uProgress: new THREE.Uniform(0),
  });

  // const runAnimation = () => {
  //   const destroy = () => {
  //     let newCurrentIndex = Math.floor(Math.random() * data.positions.length);
  //     while (newCurrentIndex === currentIndex.current) {
  //       newCurrentIndex = Math.floor(Math.random() * data.positions.length);
  //     }
  //     prevIndex.current = currentIndex.current;
  //     currentIndex.current = newCurrentIndex;
  //     runAnimation();
  //   };

  //   console.log("prevIndex", prevIndex.current);
  //   console.log("currentIndex", currentIndex.current);
  //   console.log("===============");
  //   console.log(geomRef.current);

  //   geomRef.current.attributes.position.array =
  //     data.positions[prevIndex.current];
  //   geomRef.current.attributes.aPositionTarget.array =
  //     data.positions[currentIndex.current];

  //   positionRef.current.needsUpdate = true;
  //   targetRef.current.needsUpdate = true;

  //   // geomRef.current.needsUpdate = true;
  //   // console.log("11", geomRef.current.attributes.position.array);
  //   // console.log("22", geomRef.current.attributes.aPositionTarget.array);

  //   gsap.fromTo(
  //     uniforms.current.uProgress,
  //     { value: 0 },
  //     {
  //       value: 1,
  //       duration: 3,
  //       ease: "linear",
  //       onComplete: destroy,
  //     }
  //   );
  // };

  // //animation
  // useEffect(() => {
  //   runAnimation();
  // }, []);

  useEffect(() => {
    uniforms.current.uResolution.value = new THREE.Vector2(
      gl.size.width,
      gl.size.height
    ).multiplyScalar(gl.viewport.dpr);
    //fix frustum bag
    // pointsRef.current.frustumCulled = false;
  }, [gl.size.width, gl.size.height, scroll.offset]);

  useFrame((state, delta) => {
    // uniforms.current.uResolution.value = new THREE.Vector2(
    //   state.size.width,
    //   state.size.height
    // );
    // let camPos = state.camera.position;
    geomRef.current.attributes.position.array =
      data.positions[prevIndex.current];
    geomRef.current.attributes.aPositionTarget.array =
      data.positions[currentIndex.current];

    positionRef.current.needsUpdate = true;
    targetRef.current.needsUpdate = true;
    uniforms.current.uScroll.value = scroll.offset;
    const offset = 1.0 - scroll.offset;

    state.camera.position.set(
      Math.sin(offset) * -18,
      Math.atan(offset * Math.PI * 2) * 4,
      Math.cos((offset * Math.PI) / 3) * -10
    );
    state.camera.lookAt(0, 0, 0);

    // console.log("11", geomRef.current.attributes.position.array);
    // console.log("22", geomRef.current.attributes.aPositionTarget.array);

    const x = state.pointer.x;
    const y = state.pointer.y;
    // console.log(x, y);

    gl.raycaster.setFromCamera(new THREE.Vector2(x, y), gl.camera);
    const intersections = gl.raycaster.intersectObject(pointsRef.current);
    console.log(intersections);
  });

  // if (!isVisible) return null;

  const positionRef = useRef();
  const targetRef = useRef();
  console.log("RENDER");

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          // key={prevIndex}
          ref={positionRef}
          attach="attributes-position"
          array={data.positions[1]}
          count={data.positions[1].length / 3}
          // array={data.positions[prevIndex]}
          // count={data.positions[prevIndex].length / 3}
          itemSize={3}
        />

        <bufferAttribute
          // key={currentIndex}
          ref={targetRef}
          attach="attributes-aPositionTarget"
          // array={data.positions[currentIndex]}
          // count={data.positions[currentIndex].length / 3}
          array={data.positions[0]}
          count={data.positions[0].length / 3}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-aSize"
          array={data.sizes}
          count={data.sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      {/* <sphereGeometry ref={geomRef} /> */}

      <shaderMaterial
        vertexShader={morphingVertexShader}
        fragmentShader={morphingFragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        depthWrite={false}
        // blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default MorphingParticles;
