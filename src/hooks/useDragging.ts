import React from "react";

interface DraggingProps {
  onDragStart?: (evt: React.PointerEvent) => void;
  onDrag?: (evt: PointerEvent) => void;
  onDragEnd?: (evt: PointerEvent) => void;
}

export default function useDragging({
  onDrag,
  onDragEnd,
  onDragStart,
}: DraggingProps = {}) {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleStartDragging = React.useCallback(
    (evt: React.PointerEvent) => {
      setIsDragging(true);
      onDragStart?.(evt);
    },
    [onDragStart]
  );

  const handleDragging = React.useCallback(
    (evt: PointerEvent) => {
      if (!isDragging) return;
      onDrag?.(evt);
    },
    [onDrag, isDragging]
  );

  const handleStopDragging = React.useCallback(
    (evt: PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      onDragEnd?.(evt);
    },
    [onDragEnd, isDragging]
  );

  React.useEffect(() => {
    document.addEventListener("pointermove", handleDragging);
    return () => document.removeEventListener("pointermove", handleDragging);
  }, [handleDragging]);

  React.useEffect(() => {
    document.addEventListener("pointerup", handleStopDragging);
    return () => document.removeEventListener("pointerup", handleStopDragging);
  }, [handleStopDragging]);

  return {
    isDragging,
    startDragging: handleStartDragging,
    stopDragging: handleStopDragging,
  };
}
