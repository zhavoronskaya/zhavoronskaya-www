import React, { useEffect, useState, useRef } from "react";
import useAnimation from "./useAnimation";

function useAudio(
  url: string | null,
  settings?: { autoplay?: boolean; startTime?: number; loop?: boolean }
) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeAnimating, setVolumeAnimating] = useState(false);

  const volumeFadeIn = useAnimation({
    from: 0,
    to: 1,
    step: 0.05,
    onStart: () => setVolumeAnimating(true),
    onFinish: () => setVolumeAnimating(false),
  });

  const volumeFadeOut = useAnimation({
    from: 1,
    to: 0,
    step: 0.05,
    onStart: () => setVolumeAnimating(true),
    onFinish: () => setVolumeAnimating(false),
  });

  const autoPlay = Boolean(settings?.autoplay);
  const loop = Boolean(settings?.loop);
  const startTime = settings?.startTime ?? 0;

  useEffect(() => {
    const load = async () => {
      if (!url) return;

      const audio = new Audio(url);
      audio.autoplay = autoPlay;
      audio.loop = loop;
      audio.currentTime = startTime;
      setAudio(audio);
    };

    load();
  }, [url, autoPlay, startTime]);

  const start = React.useCallback(() => {
    if (!audio) return;
    if (isVolumeAnimating) return;

    volumeFadeIn.run({
      onStart: () => (audio.play(), setIsPlaying(true)),
      onChange: (v) => (audio.volume = Math.min(1, v)),
    });
  }, [audio, isVolumeAnimating]);

  const stop = React.useCallback(() => {
    if (!audio) return;
    if (isVolumeAnimating) return;

    volumeFadeOut.run({
      onStart: () => setIsPlaying(false),
      onChange: (v) => (audio.volume = Math.max(0, v)),
      onFinish: () => audio.pause(),
    });
  }, [audio, isVolumeAnimating]);

  const toggle = React.useCallback(() => {
    return isPlaying ? stop() : start();
  }, [isPlaying, start, stop]);

  useEffect(() => {
    return () => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return {
    audio,
    start,
    stop,
    toggle,
  };
}

export default useAudio;
