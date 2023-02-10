import React from "react";
import classNames from "classnames";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import LogoSideBar from "../scenes/logoSideBar";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  headerSlot?: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const wrapperClassname = classNames(styles.pagewrap, {
    withsidebar: props.sidebar,
  });

  return (
    <div className={wrapperClassname}>
      <header className={styles.header}>
        <Header centerSlot={props.headerSlot} />
      </header>

      {props.sidebar && (
        <aside className={styles.sidebar}>{props.sidebar}</aside>
      )}

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

type ContentLayoutProps = {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
  contentMaxWidth?: string;
  contentHeight?: string;
};

export const ContentLayout = ({
  children,
  contentMaxWidth = "700px",
  contentHeight = "100%",
  headerSlot,
}: ContentLayoutProps) => {
  return (
    <Layout sidebar={<LogoSideBar />} headerSlot={headerSlot}>
      <div
        className={styles.content}
        style={{ maxWidth: contentMaxWidth, height: contentHeight }}
      >
        {children}
      </div>
    </Layout>
  );
};
