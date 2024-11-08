import { Canvas, CanvasProps } from "@react-three/fiber";
import { forwardRef } from "react";

const BaseCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  function BaseCanvas({ camera, ...props }, ref) {
    return <Canvas ref={ref} camera={camera} {...props} />;
  }
);

export default BaseCanvas;
