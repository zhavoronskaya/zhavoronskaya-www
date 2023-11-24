import React from "react";
import cn from "classnames";
import { Canvas as FiberCanvas, CanvasProps } from "@react-three/fiber";

import styles from "./Canvas.module.css";
import { useCanvasKey } from "./Canvas.hooks";
import { ExpandIcon, ShrinkIcon } from "./Canvas.icons";

type Props = CanvasProps & {
  iconsColor?: string;
};
export default function Canvas(props: Props) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const key = useCanvasKey({ targetId: "scenename" });

  const canvasClassName = cn(styles.canvas, {
    [styles.canvasFullscreen]: isFullscreen,
  });

  return (
    <div className={canvasClassName} key={key}>
      <CanvasActions
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        iconsColor={props.iconsColor}
      />

      <FiberCanvas {...props} />
    </div>
  );
}

function CanvasActions(props: {
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  iconsColor?: string;
}) {
  return (
    <div className={styles.actions}>
      {props.isFullscreen ? (
        <ShrinkIcon
          width={32}
          color={props.iconsColor}
          onClick={() => props.setIsFullscreen(false)}
        />
      ) : (
        <ExpandIcon
          width={32}
          color={props.iconsColor}
          onClick={() => props.setIsFullscreen(true)}
        />
      )}
    </div>
  );
}
