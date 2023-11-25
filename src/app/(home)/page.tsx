import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { getGalleryShots, getSelectedAlbums } from "@/db";
import { RightArrowIcon } from "@/components/theme/Icon/Arrows";

export default async function HomePage() {
  const [albums, shots] = await Promise.all([
    getSelectedAlbums(),
    getGalleryShots(),
  ]);

  return (
    <>
      <div className="mt-xl mb-xxl">
        <h2 className="fw-b fz-xl mb-md">Hello, I'm Lena 🙌</h2>
        <p className="fz-lgr">
          I'm in love with music and digital art. Currently spending some time
          exploring shaders and 3d on the web. Feel free to reach me out if you
          some porject in mind or just to chat
        </p>
      </div>

      {/* <div className="mb-sm">
        <div className={styles.cardscontainer}>
          <div className={styles.card}>
            <div className="mb-lg fz-xl">🎼</div>
            Music Collabs & <br /> Compilation
          </div>
          <div className={styles.card}>
            <div className="mb-lg fz-xl">🎨</div>
            Code & <br /> Digital art
          </div>
          <div className={styles.card}>
            <div className="mb-lg fz-xl ">🎤</div>
            Live Sets & <br /> Performance
          </div>
        </div>
      </div> */}

      <div className="mt-xl mb-xl">
        <h2 className="fw-b fz-xl mb-md">Music</h2>
        <p className="fz-lgr">
          Since 2017 I've been lucky enough to produce a couple of releases with
          the help of many beatiful people I've met along the way. Here are some
          of my featured music <Link href="/albums">albums</Link>.
        </p>
      </div>

      <div className="mt-lg mb-xxl">
        {albums.map((album) => {
          return (
            <Link
              className="items-center desktop_g-xl g-lg mt-xl"
              key={album.slug}
              href={`/albums/${album.slug}`}
            >
              <div className={styles.yearcontainer}>
                <p>{album.year}</p>
              </div>

              <div style={{ width: "20%" }}>
                <img
                  src={album.cover}
                  alt="Album"
                  style={{ borderRadius: "4px" }}
                />
              </div>

              <div className="fx-1 ov-h">
                <p className="op-04 fz-sm">{album.genre}</p>
                <h3 className="fz-lg">{album.name}</h3>
              </div>

              <RightArrowIcon width={30} color={"var(--clr-link)"} />
            </Link>
          );
        })}
      </div>

      <div className="mt-xl mb-xl">
        <h2 className="fz-xl fw-b mb-md">Digital Art</h2>
        <p className="fz-lgr">
          Using technologies like WebGL, GLSL, and Three.js I can finally create{" "}
          <Link href="/shots">scenes</Link> from my fantasy.
        </p>
      </div>

      <div className="mt-lg mb-sm">
        {shots.map((row, idx) => {
          return (
            <div key={idx} className={styles.artcontainer}>
              {row.map(({ shot, size }) => {
                return (
                  <Link
                    key={shot.slug}
                    style={{ flexGrow: size }}
                    href={`/shots/${shot.slug}`}
                  >
                    <img
                      src={shot.cover}
                      alt="Scene"
                      style={{ borderRadius: "4px" }}
                    />
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
