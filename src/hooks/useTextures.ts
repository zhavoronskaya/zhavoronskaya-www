import { useEffect, useState } from "react";
import { Texture, TextureLoader } from "three";

export default function useTextures(urls: string[]) {
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
