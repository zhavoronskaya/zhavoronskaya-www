"use client";
import React from "react";
import cn from "classnames";
import { Canvas as FiberCanvas, CanvasProps } from "@react-three/fiber";

import styles from "./BaseCanvas.module.css";
import { ExpandIcon, RefreshIcon, ShrinkIcon } from "@/theme/icons";

type Props = CanvasProps & {
  className?: string;
  refreshTriggerId?: string;
  withActions?: boolean;
  actionsColor?: string;
};

export default function BaseCanvas({
  className,
  refreshTriggerId,
  actionsColor,
  withActions = true,
  ...props
}: Props) {
  const [key, setKey] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const canvasClassName = cn(styles.canvas, className, {
    [styles.canvasFullscreen]: isFullscreen,
  });

  return (
    <div className={canvasClassName} key={key}>
      {withActions && (
        <CanvasActions
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          setRefreshKey={setKey}
          iconsColor={actionsColor}
        />
      )}
      <FiberCanvas {...props} />
    </div>
  );
}

function CanvasActions(props: {
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  setRefreshKey: (v: number) => void;
  iconsColor?: string;
}) {
  return (
    <div className={styles.actions}>
      <RefreshIcon
        size="24px"
        color={props.iconsColor}
        onClick={() => props.setRefreshKey(Date.now())}
      />

      {props.isFullscreen ? (
        <ShrinkIcon
          size="24px"
          color={props.iconsColor}
          onClick={() => props.setIsFullscreen(false)}
        />
      ) : (
        <ExpandIcon
          size="24px"
          color={props.iconsColor}
          onClick={() => props.setIsFullscreen(true)}
        />
      )}
    </div>
  );
}
