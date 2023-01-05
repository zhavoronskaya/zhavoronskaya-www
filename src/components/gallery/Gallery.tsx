import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <>
      <h2 className="p20">Art</h2>
      <p className="p20">Bla bla bla bla</p>
      <div className={styles.artcontainer}>
        <div className={styles.artelement}>
          <img src="/art/4.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/5.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/6.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/2.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/1.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/3.png" alt="Art" />
          <p>Bla</p>
        </div>
        <div className={styles.artelement}>
          <img src="/art/7.png" alt="Art" />
          <p>Bla</p>
        </div>
      </div>
    </>
  );
}
