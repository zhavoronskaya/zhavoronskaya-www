import { Canvas, CanvasProps } from "@react-three/fiber";

const BaseCanvas = ({ camera, ...props }: CanvasProps) => {
  return <Canvas camera={camera} {...props} />;
};

export default BaseCanvas;
