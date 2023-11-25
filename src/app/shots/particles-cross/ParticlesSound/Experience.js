import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
} from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import React from "react";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

const size = 200;

const CrossMaterial = new shaderMaterial(
  { uSize: 300, uTime: 0, uColor: new THREE.Color("#A23E48") },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ CrossMaterial });

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

function CrossTrack({ url, ...props }) {
  const shaderRef = useRef();
  const pointRef = useRef();
  const ref = useRef();

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
      shaderRef.current.uTime += delta * 0.5;
    }

    if (shaderRef.current && audio) {
      let avg = audio.update();

      // Set the hue according to the frequency average
      shaderRef.current.uColor = new THREE.Color(0.86, 0.0, avg / 100);

      state.camera.fov = 45 - audio.data.avg / 25;
      state.camera.updateProjectionMatrix();
    }
  });

  // console.log(audio);
  const { viewport } = useThree();
  return (
    <mesh ref={ref} {...props}>
      <Points limit={10000}>
        <crossMaterial
          ref={shaderRef}
          transparent={true}
          uSize={size}
          depthWrite={false}
          // blending={THREE.AdditiveBlending}
          vertexColors
        />
        {Array.from({ length: 500 }).map((_, i) => {
          const position = [
            (Math.random() - 0.5) * viewport.width,
            0,
            (Math.random() - 0.5) * viewport.height,
          ];
          const scale = Math.random() * size;

          return (
            <Point ref={pointRef} key={i} position={position} size={scale} />
          );
        })}
      </Points>
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}

      {/* <color args={["#0D1117"]} attach="background" /> */}
      <Suspense fallback={null}>
        <CrossTrack url="/music/track5.mp3" />
      </Suspense>
    </>
  );
}
