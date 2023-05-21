import { useEffect, useState } from "react";

type AudioData = {
  context: AudioContext;
  source: AudioBufferSourceNode;
  gain: GainNode;
  data: Uint8Array;
  freq: { avg: number };
  update: () => number;
};

async function createAudio(url: string): Promise<AudioData> {
  // Fetch audio data and create a buffer source

  const res = await fetch(url);

  const buffer = await res.arrayBuffer();
  // @ts-ignore-next-line
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const source = context.createBufferSource();

  source.buffer = await context.decodeAudioData(buffer);
  source.loop = true;
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  source.start(0);
  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  source.connect(analyser);
  analyser.connect(gain);

  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);
  const freq = {
    avg: 0,
  };

  return {
    context,
    source,
    gain,
    data,
    freq,

    update: () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((prev, cur) => prev + cur / data.length, 0);
      freq.avg = avg;
      return avg;
    },
  };
}

function useAudio(url: string) {
  const [audio, setAudio] = useState<AudioData | null>(null);

  useEffect(() => {
    const load = async () => {
      const audio = await createAudio(url);
      setAudio(audio);
    };

    load();
  }, [url]);

  useEffect(() => {
    if (!audio) return;

    // Connect the gain node, which plays the audio
    audio.gain.connect(audio.context.destination);

    // Disconnect it on unmount
    return () => audio.gain.disconnect();
  }, [audio]);

  return audio;
}

export default useAudio;
