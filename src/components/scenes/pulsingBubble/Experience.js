import { Suspense, useEffect, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Stage } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const BubbleMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.35, 0.95),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ BubbleMaterial });

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

function Track({ url, ...props }) {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  const [audio, setAudio] = React.useState(null);

  // suspend-react is the library that r3f uses internally for useLoader. It caches promises and
  // integrates them with React suspense. You can use it as-is with or without r3f.
  // const { gain, context, update, data } = suspend(
  //   () => createAudio(url),
  //   [url]
  // );

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
      shaderRef.current.uTime += delta * 0.3;
    }

    if (shaderRef.current && audio) {
      let avg = audio.update();

      // Set the hue according to the frequency average
      shaderRef.current.uColor = new THREE.Color(avg / 100, 0.35, 0.95);

      state.camera.fov = 45 - audio.data.avg / 15;
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <icosahedronGeometry ref={geomertyRef} args={[2, 16, 8]} />
      <bubbleMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <EffectComposer>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={1} />
        <Bloom mipmapBlur intensity={0.3} luminanceThreshold={0} />
      </EffectComposer>

      <color args={["#132F44"]} attach="background" />

      <Suspense fallback={null}>
        <Track url="/music/track3.mp3" />
      </Suspense>
    </>
  );
}
