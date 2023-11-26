import React from "react";
import classNames from "classnames";

import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  heroSection?: React.ReactNode;
  contentHeader?: React.ReactNode;
  contentMaxWidth?: string;
  // contentHeight?: string;
};

export default function Layout({
  children,
  sidebar,
  heroSection,
  contentHeader,
  contentMaxWidth = "792px",
}: LayoutProps) {
  const layoutClassname = classNames(styles.layout, {
    "layout--with-sidebar": Boolean(sidebar),
  });

  return (
    <div className={layoutClassname}>
      <header className={styles.header}>
        <Header
          centerSlot={contentHeader}
          centerSlotMaxWidth={contentMaxWidth}
        />
      </header>

      {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}

      <main className={styles.main}>
        {heroSection}

        <div className={styles.content} style={{ maxWidth: contentMaxWidth }}>
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
