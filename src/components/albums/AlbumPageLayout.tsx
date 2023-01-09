import React from "react";
import Link from "next/link";

import { IAlbum } from "../../interfaces";
import Layout from "../layout/Layout";
import styles from "./AlbumPageLayout.module.css";

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <Layout>
      <div className={styles.title + " " + "p20"}>
        {props.prevAlbumSlug && (
          <Link href={`/albums/${props.prevAlbumSlug}`}>{"<"} PREVIOUS</Link>
        )}

        <h2>{props.album.name}</h2>

        {props.nextAlbumSlug && (
          <Link href={`/albums/${props.nextAlbumSlug}`}>NEXT {">"}</Link>
        )}
      </div>

      <div className={styles.container + " " + "p20"}>
        {/* <h2 className="py20">{props.album.name}</h2> */}

        <img src={props.album.cover} alt="Album" />

        <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />

        <p
          className={styles.discription + " " + "py20"}
          dangerouslySetInnerHTML={{ __html: props.album.description }}
        ></p>
      </div>
    </Layout>
  );
}
