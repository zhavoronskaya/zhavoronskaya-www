import Link from "next/link";

import { IAlbum, IScenesGallery } from "@/interfaces";
import styles from "./Home.module.css";
import LogoImage from "../scenes/logoImage";
import { RightArrowIcon } from "../icons/Arrows";

type Props = {
  albums: IAlbum[];
  scenes: IScenesGallery;
};

export default function Home(props: Props) {
  return (
    <>
      <LogoImage />
      <div className="mt-lg mb-sm ">
        <h1>
          Hi! <br />
          My name is Lena Zhavoronskaya and I'm in love with music and digital
          art.
        </h1>
      </div>
      <div className="mt-lg mb-sm ">
        <h2 className="mb-sm">Let's work together 🙌 :</h2>
        <div className="items-space-between items-center">
          <p>
            🎼
            <br />
            Music Collaboration & Compilation
          </p>
          <p>
            🎨
            <br />
            Code & Digital art
          </p>
          <p>
            🎤
            <br />
            Live Sets & Performance
          </p>
        </div>
      </div>
      <div className="mt-lg mb-sm ">
        <h2 className="mb-sm">ALBUMS</h2>
        <p>
          I create music since 2017. Below present some of my featured music
          albums. If you want to see other albums, feel free to visit{" "}
          <Link href="/albums">MUSIC</Link> page.
        </p>
      </div>

      <div className="mt-lg mb-sm">
        {props.albums.map((album) => {
          return (
            <Link
              className="items-space-between items-center g-sm mt-lg mb-sm"
              key={album.slug}
              href={`/albums/${album.slug}`}
            >
              <div style={{ width: "20%" }}>
                <img src={album.cover} alt="Album" />
              </div>
              <div style={{ width: "30%" }}>
                <p className="op-04 fz-sm">{album.year}</p>
                <h3>{album.name}</h3>
              </div>
              <RightArrowIcon />
            </Link>
          );
        })}
      </div>

      <div className="mt-lg mb-sm ">
        <h2 className="mb-sm">ART</h2>
        <p>
          Now I'm getting deeper and deeper into a beautiful world of creative
          coding. Using technologies like WebGL, GLSL, and THREE.js I can
          finally create scenes from my fantasy. Here is a small gallery of my
          works. Please visit <Link href="/albums">GENERATIVE ART</Link> page to
          see all Art Works.
        </p>
      </div>

      <div>
        {props.scenes.map((row) => {
          return (
            <div className={styles.artcontainer}>
              {row.map(({ scene, size }) => {
                return (
                  <Link
                    style={{
                      flexGrow: size,
                    }}
                    key={scene.slug}
                    href={`/scenes/${scene.slug}`}
                  >
                    <img src={scene.cover} alt="Scene" />
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* <div className="items-space-between items-center mt-lg mb-sm">
        <h2>CONNECT</h2>
        <h2 className={styles.contact}>
          <Link href="/contact">CONTACT ME</Link>
        </h2>
      </div> */}
    </>
  );
}
