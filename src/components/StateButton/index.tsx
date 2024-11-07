"use client";

import useScene from "@/hooks/useScene";
import { useState } from "react";
import { PingHeartHome } from "../UI/decor";
import useAudio from "@/hooks/useAudio";

type Props = {};

const StateButtom = ({}: Props) => {
  const scene = useScene({
    watch: ["notesGroupPosition", "notesPlayingStatus"],
  });

  const { notesGroupPosition } = scene.getState();

  const [isActive, setIsActive] = useState(false);

  const { audio } = useAudio("/sound/birds.mp3", {
    startTime: 0,
    autoplay: false,
    loop: false,
  });
  if (!audio) return;
  const handleNotesPlay = () => {
    setIsActive(true);
    if (scene.getState().notesPlayingStatus != "ON") {
      scene.setState(() => ({ notesPlayingStatus: "ON" }));
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play();
    }
  };
  audio.onended = function () {
    setIsActive(false);
    scene.setState(() => ({ notesPlayingStatus: "OFF" }));
  };

  const animation = isActive ? "  opacity-0" : "animate-ping opacity-50";

  if (!notesGroupPosition) return;
  return (
    <>
      <button
        className={`pointer fixed w-[60px] h-[60px] z-20 ${animation} bg-blue-300 rounded-full `}
        style={{
          left: `${notesGroupPosition.x - 30}px`,
          top: `${notesGroupPosition.y - 30}px`,
        }}
        onClick={handleNotesPlay}
      />

      <PingHeartHome
        className={`pointer fixed w-[14px]  ${animation} z-20  pointer-events-none`}
        style={{
          left: `${notesGroupPosition.x - 7}px`,
          top: `${notesGroupPosition.y - 7}px`,
        }}
      />
    </>
  );
};

export default StateButtom;
