import React from "react";
import styles from "./Header.module.css"
import Link from "next/link";
import IconHome from "../icons/iconHome/IconHome";

export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className={styles.menu + " " + `${isMenuOpen ? "js-menu-opened" : ""}`}>
            <div className={styles.menuBtn} onClick={() => setIsMenuOpen((value) => !value)}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className={styles.nav}>
                <IconHome />
                <ul >
                    <li>
                    <Link href="/">HOME</Link>
                    </li>
                    <li>
                    <Link href="/music">MUSIC</Link>
                    </li>
                    <li>
                    <Link href="/bio">BIO</Link>
                    </li>
                    <li>
                    <Link href="/art">GENERATIVE ART</Link>
                    </li>
                    <li>
                    <Link href="/cv">CV</Link>
                    </li>
                    <li>
                    <Link href="/contact">CONTACT</Link>
                    </li>
                </ul>
            </nav>
      </div>
    )
    
}