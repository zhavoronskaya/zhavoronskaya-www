"use client";
import React from "react";
import Link from "next/link";
import { Canvas as FiberCanvas, CanvasProps } from "@react-three/fiber";

import { cn } from "@/helpers/ClassName";
import {
  BackArrow,
  ExpandIcon,
  RefreshIcon,
  ShrinkIcon,
} from "@/components/UI/icons";
import { PADDING_Y } from "@/components/BaseLayout/BaseLayout";
import styles from "./ViewShotPageLayout.module.css";
import TransitionLink from "@/components/TransitionLink";

type Props = CanvasProps & {
  className?: string;
  refreshTriggerId?: string;
  withActions: boolean;
  actionsColor?: string;
  hrefBackArrow: string;
};

type CanvasRect = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export default function ViewShotPageLayout({
  className,
  refreshTriggerId,
  actionsColor,
  withActions = true,
  hrefBackArrow,
  ...props
}: Props) {
  const canvasWrapperRef = React.useRef<HTMLDivElement>(null);
  const [key, setKey] = React.useState(1);
  const [canvasRect, setCanvasRect] = React.useState<CanvasRect>();
  const [canvasScale, setCanvasScale] = React.useState({ x: 1, y: 1 });
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const updateScreenMode = (v: boolean) => {
    setIsFullscreen(v);
    updateCanvasScale(v);
  };

  const updateCanvasScale = (full: boolean) => {
    if (!canvasRect) return;

    if (full) {
      const x = (canvasRect.width + 48) / canvasRect.width;
      const y = (canvasRect.height + 128) / canvasRect.height;
      setCanvasScale({ x, y });
      return;
    }

    setCanvasScale({ x: 1, y: 1 });
  };

  const updateCanvasRect = () => {
    const mainEl = document.getElementById("base-layout-main");
    const mainRect = mainEl?.getBoundingClientRect();
    if (!mainRect) return setCanvasRect(undefined);

    setCanvasRect({
      left: mainRect.x,
      top: mainRect.y + PADDING_Y,
      height: mainRect.height - PADDING_Y * 2,
      width: mainRect.width,
    });
  };

  React.useEffect(() => {
    updateCanvasRect();

    const canvasWrapper = canvasWrapperRef.current;
    const handleResize = () => updateCanvasRect();
    const handleScaleEnd = () => window.dispatchEvent(new Event("resize"));

    window.addEventListener("resize", handleResize);
    canvasWrapper?.addEventListener("transitionend", handleScaleEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvasWrapper?.removeEventListener("transitionend", handleScaleEnd);
    };
  }, []);

  const opacity = canvasRect ? 100 : 0;
  const transform = `scale(${canvasScale.x}, ${canvasScale.y})`;
  const zIndex = isFullscreen ? 100 : 50;
  const canvasWrapperClassname = cn(styles.canvas, className, {
    [styles.canvasFullscreen]: isFullscreen,
  });

  return (
    <div
      id="view-shot-page"
      className="relative"
      style={{ width: canvasRect?.width, height: canvasRect?.height }}
    >
      {withActions && canvasRect && (
        <CanvasActions
          isFullscreen={isFullscreen}
          setIsFullscreen={updateScreenMode}
          setRefreshKey={setKey}
          iconsColor={actionsColor}
        />
      )}

      <div className="absolute left-0 top-0 flex justify-start z-[51] p-4">
        <TransitionLink href={hrefBackArrow}>
          <BackArrow className="w-[20px] sm:w-[32px] lg:w-[32px]" />
        </TransitionLink>
      </div>

      <div
        key={key}
        ref={canvasWrapperRef}
        className={canvasWrapperClassname}
        style={{ ...canvasRect, opacity, transform, zIndex }}
      >
        <FiberCanvas {...props} className="" />
      </div>
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
        className="w-[20px] sm:w-[32px] lg:w-[32px]"
        onClick={() => props.setRefreshKey(Date.now())}
      />

      {props.isFullscreen ? (
        <ShrinkIcon
          className="w-[20px] sm:w-[32px] lg:w-[32px]"
          onClick={() => props.setIsFullscreen(false)}
        />
      ) : (
        <ExpandIcon
          className="w-[20px] sm:w-[32px] lg:w-[32px]"
          onClick={() => props.setIsFullscreen(true)}
        />
      )}
    </div>
  );
}
