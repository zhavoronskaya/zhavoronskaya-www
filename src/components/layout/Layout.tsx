import styles from "./Layout.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import React from "react";

type Props = { children: React.ReactNode; sidebar?: React.ReactNode };

export default function Layout(props: Props) {
  return (
    <div className={styles.pagewrap + `${props.sidebar ? " withsidebar" : ""}`}>
      <header className={styles.header}>
        <Header />
      </header>

      {props.sidebar && (
        <aside className={styles.sidebar}>{props.sidebar}</aside>
      )}

      {/* <aside className={styles.sidebar}>{props.sidebar}</aside> */}

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
