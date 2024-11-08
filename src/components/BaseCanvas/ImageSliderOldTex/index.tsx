import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IUniform, Texture, TextureLoader, Uniform, Vector2 } from "three";
import vertex from "@/shaders/imagetransfomation/vertex";
import fragment from "@/shaders/imagetransfomation/fragment";
import { useProgress } from "@react-three/drei";
import * as TWEEN from "@tweenjs/tween.js";

type Props = {
  urls: string[];
  activeImageIdx: number;
  slideToNextImage: () => void;
};

function useTextures(urls: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    async function load() {
      if (isLoaded) return;

      const promises: Promise<Texture | null>[] = [];
      const loader = new TextureLoader();

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const promise = new Promise<Texture | null>((res, rej) => {
          const onLoad = (image: Texture) => res(image);
          const onError = () => res(null);
          loader.load(url, onLoad, undefined, onError);
        });
        promises.push(promise);
      }

      const rawResults = await Promise.all(promises);
      const results = rawResults.filter((v) => v !== null);
      setTextures(results);
      setIsLoaded(true);
    }

    load();
  }, [isLoaded, urls]);

  return { textures, isLoaded };
}

const CanvasImageSlider = ({
  urls,
  activeImageIdx,
  slideToNextImage,
}: Props) => {
  const { size, pointer } = useThree();
  const { textures, isLoaded } = useTextures(urls);

  // console.log("images", urls, isLoaded, textures);

  const uniforms = useRef({
    uTime: new Uniform(0),
    uFirstImage: new Uniform<Texture | null>(null),
    uSecondImage: new Uniform<Texture | null>(null),
    uResolution: new Uniform(new Vector2(size.width, size.height)),
    uProgress: new Uniform(0),
    uMouse: new Uniform(new Vector2(0.0, 0.0)),
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (!textures[0]) return;
    uniforms.current.uFirstImage.value = textures[0];
    uniforms.current.uSecondImage.value = textures[0];
  }, [isLoaded, textures]);

  useEffect(() => {
    const nextTexture = textures[activeImageIdx];
    if (!nextTexture) return;
    // if (nextTexture === uniforms.current.uFirstImage.value) return;

    uniforms.current.uSecondImage.value = nextTexture;
    uniforms.current.uMouse.value = pointer;

    new TWEEN.Tween(uniforms.current.uProgress)
      .to({ value: 1 }, 1500)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onComplete(() => {
        uniforms.current.uProgress.value = 0;
        uniforms.current.uFirstImage.value = nextTexture;
      })
      .start();
  }, [activeImageIdx, pointer, textures]);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <mesh onPointerUp={slideToNextImage}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default CanvasImageSlider;
