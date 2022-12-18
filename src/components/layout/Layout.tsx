import styles from "./Layout.module.css"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import React from "react";
import Menu from "../menu/Menu"

type Props = {children: React.ReactNode}

export default function Layout (props: Props) {
    return (
        <div className={styles.pagewrap}>
            <header className={styles.header}>
                <Header />
            </header>

            <aside className={styles.sidebar}>
            
            </aside>

            <main className={styles.main}>
            {props.children}
            </main>

            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    )
}