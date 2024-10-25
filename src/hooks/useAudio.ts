import React, { useEffect, useState, useRef } from "react";
import useAnimation from "./useAnimation";

function useAudio(
  url: string | null,
  settings?: { autoplay?: boolean; startTime?: number; canPlay: boolean }
) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [trigger, setTrigger] = useState<HTMLIFrameElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isVolumeAnimating, setVolumeAnimating] = useState(false);

  const volumeFadeIn = useAnimation({
    from: 0,
    to: 0.6,
    step: 0.01,
    onStart: () => setVolumeAnimating(true),
    onFinish: () => setVolumeAnimating(false),
  });

  const volumeFadeOut = useAnimation({
    from: 0.6,
    to: 0,
    step: 0.03,
    onStart: () => setVolumeAnimating(true),
    onFinish: () => setVolumeAnimating(false),
  });

  const autoPlay = Boolean(settings?.autoplay);
  const startTime = settings?.startTime ?? 0;

  useEffect(() => {
    const load = async () => {
      if (!url) return;

      // const trigger = document.createElement("iframe");
      // trigger.src =
      //   "https://github.com/anars/blank-audio/blob/master/250-milliseconds-of-silence.mp3";
      // trigger.allow = "autoplay";
      // console.log(trigger);
      // trigger.id = "audio"
      // trigger.style="display: none"

      // setTrigger(trigger);
      const audio = new Audio(url);
      audio.autoplay = autoPlay;
      audio.volume = 0.6;
      audio.currentTime = startTime;
      setAudio(audio);

      // return document.removeEventListener("pointermove", musicPlay);
    };

    load();
  }, [url, autoPlay, startTime]);

  useEffect(() => {
    if (!audio) return;
    if (settings && !settings.canPlay) return;

    //console.log(audio.play);
    function audioEndHandler() {
      if (!audio) return;
      audio.currentTime = startTime;
      audio.play();
    }

    function musicPlay() {
      if (!audio) return;
      audio.play();
      document.removeEventListener("pointerdown", musicPlay);
    }

    document.addEventListener("pointerdown", musicPlay, false);
    audio.addEventListener("ended", audioEndHandler, false);
  }, [audio, settings, startTime]);

  const start = React.useCallback(() => {
    if (!audio) return;
    if (isVolumeAnimating) return;

    volumeFadeIn.run({
      onStart: () => (audio.play(), setIsPlaying(true)),
      onChange: (v) => (audio.volume = Math.min(1, v)),
    });
  }, [audio, isVolumeAnimating, volumeFadeIn]);

  const stop = React.useCallback(() => {
    if (!audio) return;
    if (isVolumeAnimating) return;

    volumeFadeOut.run({
      onStart: () => setIsPlaying(false),
      onChange: (v) => (audio.volume = Math.max(0, v)),
      onFinish: () => audio.pause(),
    });
  }, [audio, isVolumeAnimating, volumeFadeOut]);

  const toggle = React.useCallback(() => {
    return isPlaying ? stop() : start();
  }, [isPlaying, start, stop]);

  useEffect(() => {
    return () => {
      if (!audio) return;
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return {
    audio,
    start,
    stop,
    toggle,
  };
}

export default useAudio;
