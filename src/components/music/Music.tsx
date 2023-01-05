import styles from "./Music.module.css";

export default function Music() {
  return (
    <>
      <h2 className="p20">Albums</h2>
      <p className="p20">Bla bla bla bla</p>
      <div className={styles.albumscontainer}>
        <div className={styles.albumelement} onClick={() => {}}>
          <img src="/albums/dreams.png" alt="Album" />
          <p>i dream in dreams</p>
        </div>
        <div className={styles.albumelement}>
          <img src="/albums/crystal.png" alt="Album" />
          <p>twilight crystal</p>
        </div>
        <div className={styles.albumelement}>
          <img src="/albums/whitehalf.png" alt="Album" />
          <p>White Half Moon/Gone beyond</p>
        </div>
        <div className={styles.albumelement}>
          <img src="/albums/cxema.png" alt="Album" />
          <p>Split </p>
        </div>
        <div className={styles.albumelement}>
          <img src="/albums/reality.png" alt="Album" />
          <p>reality</p>
        </div>
        <div className={styles.albumelement}>
          <img src="/albums/pcp.png" alt="Album" />
          <p>pcp</p>
        </div>
      </div>
    </>
  );
}
