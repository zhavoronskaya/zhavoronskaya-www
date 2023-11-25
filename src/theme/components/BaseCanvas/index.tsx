"use client";
import React from "react";
import cn from "classnames";
import { Canvas as FiberCanvas, CanvasProps } from "@react-three/fiber";

import styles from "./BaseCanvas.module.css";
import { useCanvasKey } from "./BaseCanvas.hooks";

type Props = CanvasProps & {
  className?: string;
  refreshTriggerId?: string;
};

export default function BaseCanvas(props: Props) {
  const key = useCanvasKey({ targetId: props.refreshTriggerId ?? "scenename" });
  const canvasClassName = cn(styles.canvas, props.className);

  return (
    <div className={canvasClassName} key={key}>
      <FiberCanvas {...props} />
    </div>
  );
}
