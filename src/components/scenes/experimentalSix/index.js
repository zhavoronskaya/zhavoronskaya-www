import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience";
import React from "react";

function useSceneKey() {
  const [key, setKey] = React.useState(1);
  React.useEffect(() => {
    const title = document.getElementById("scenename");
    const handleClick = () => setKey(Date.now());
    title.addEventListener("click", handleClick);
    return () => {
      title.removeEventListener("click", handleClick);
    };
  }, []);
  return key;
}
export default function Background() {
  const key = useSceneKey();

  return (
    <Canvas
      className={styles.canvas}
      key={key}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 26, 0],
      }}
    >
      <Experience />
    </Canvas>
  );
}
