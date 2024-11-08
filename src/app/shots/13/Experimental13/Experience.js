import { Suspense, useRef, useEffect } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import {
  OrbitControls,
  Sparkles,
  MeshTransmissionMaterial,
} from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

async function createAudio(url) {
  // Fetch audio data and create a buffer source

  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0);
  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);

  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);

  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data);
      // Calculate a frequency average
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ));
    },
  };
}

function Painting({ url, ...props }) {
  const shaderRef = useRef();

  const geomertyRef = useRef();
  const { viewport } = useThree();

  const materialInitialUnfiformsRef = useRef({
    uTime: { value: 0 },
    uIterration: { value: 4 },
    uResolution: { value: new THREE.Vector2(0, 0) },
    uAvg: { value: 0 },
    uGain: { value: 0 },
  });

  const [audio, setAudio] = React.useState(null);

  useEffect(() => {
    const load = async () => {
      const audio = await createAudio(url);
      setAudio(audio);
    };

    load();
  }, []);

  useEffect(() => {
    if (!audio) return;

    // Connect the gain node, which plays the audio
    audio.gain.connect(audio.context.destination);

    // Disconnect it on unmount
    return () => audio.gain.disconnect();
  }, [audio]);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
      shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );

      if (audio) {
        let avg = audio.update();

        shaderRef.current.uniforms.uAvg.value = avg;
        // materialRef.current.uniforms.uFreq.value =
        //   (Math.PI * audio.data.avg) / 8;
        // Set the hue according to the frequency average

        // state.camera.fov = 45 - audio.data.avg / 8;
        // state.camera.updateProjectionMatrix();
      }
    }

    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 10 + 45;
    // state.camera.updateProjectionMatrix();
    // geomertyRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group>
      <mesh ref={geomertyRef}>
        <planeGeometry
          ref={geomertyRef}
          args={[viewport.width, viewport.height, 32, 16]}
        />
        {/* <torusGeometry args={[4, 0.8, 128, 256]} /> */}
        {/* <sphereGeometry args={[2, 512, 512]} /> */}
        {/* <torusKnotGeometry args={[4, 0.8, 512, 256]} /> */}
        {/* <circleGeometry args={[2, 512]} /> */}
        <shaderMaterial
          vertexShader={paintingVertexShader}
          fragmentShader={paintingFragmentShader}
          ref={shaderRef}
          wireframe={false}
          transparent={true}
          uniforms={materialInitialUnfiformsRef.current}
        />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <EffectComposer multisampling={4}>
    
      </EffectComposer> */}
      {/* <color args={["#240b15"]} attach="background" /> */}
      {/* <OrbitControls /> */}
      {/* <Sparkles
        size={5}
        scale={[40, 40, 40]}
        speed={10}
        count={1000}
        color={"bc4fc2"}
      /> */}

      <Suspense fallback={null}>
        <Painting url="/music/track6.mp3/" />
      </Suspense>
    </>
  );
}
