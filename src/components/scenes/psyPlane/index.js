import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience";

export default function Background() {
  return (
    <Canvas className={styles.canvas} dpr={[1, 2]} orthographic>
      <Experience />
    </Canvas>
  );
}
