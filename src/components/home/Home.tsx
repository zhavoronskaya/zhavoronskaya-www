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
      <div className="mt-xl mb-sm">
        <h1 className="fz-xl">Hello, I'm Lena 🙌</h1>
        <p className="fz-lg">
          I'm in love with music and digital art. Let's work together:
        </p>
      </div>

      <div className="mb-sm">
        <div className="d-f g-md">
          <div className={styles.card}>
            <div className="mb-lg fz-xl">🎼</div>
            Music Collabs & <br /> Compilation
          </div>
          <div className={styles.card}>
            <div className="mb-lg fz-xl">🎨</div>
            Code & <br /> Digital art
          </div>
          <div className={styles.card}>
            <div className="mb-lg fz-xl">🎤</div>
            Live Sets & <br /> Performance
          </div>
        </div>
      </div>

      <div className="mt-xl mb-sm ">
        <h2 className="fz-sm op-02">ALBUMS</h2>
        <p className="fz-lgr fw-b">
          I create music since 2017. Here are some of my featured music{" "}
          <Link href="/albums">albums</Link>.
        </p>
      </div>

      <div className="mt-lg mb-sm">
        {props.albums.map((album) => {
          return (
            <Link
              className="items-center g-xl mt-lg mb-sm"
              key={album.slug}
              href={`/albums/${album.slug}`}
            >
              <div style={{ width: "20%" }}>
                <img src={album.cover} alt="Album" />
              </div>

              <div className="fx-1">
                <p className="op-04 fz-sm">{album.year}</p>
                <h3 className="fz-lg">{album.name}</h3>
              </div>

              <RightArrowIcon width={30} color={"var(--clr-link)"} />
            </Link>
          );
        })}
      </div>

      {/* <Link href="/albums" className="mt-lg fz-lg fw-b g-md items-end">
        <RightArrowIcon color={"var(--clr-link)"} /> View all
      </Link> */}

      <div className="mt-xl mb-sm ">
        <h2 className="fz-sm op-02">ART</h2>
        <p className="fz-lgr fw-b">
          Using technologies like WebGL, GLSL, and Three.js I can finally create{" "}
          <Link href="/scenes">scenes</Link> from my fantasy.
        </p>
      </div>

      <div className="mt-lg mb-sm">
        {props.scenes.map((row, idx) => {
          return (
            <div key={idx} className={styles.artcontainer}>
              {row.map(({ scene, size }) => {
                return (
                  <Link
                    key={scene.slug}
                    style={{ flexGrow: size }}
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
      {/* <Link href="/scenes" className="mt-lg fz-lg fw-b d-f g-md items-end">
        <RightArrowIcon color={"var(--clr-link)"} /> View all
      </Link> */}

      {/* <div className="items-space-between items-center mt-lg mb-sm">
        <h2>CONNECT</h2>
        <h2 className={styles.contact}>
          <Link href="/contact">CONTACT ME</Link>
        </h2>
      </div> */}
    </>
  );
}
