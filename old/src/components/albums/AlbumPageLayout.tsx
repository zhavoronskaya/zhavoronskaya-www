import React from "react";
import Link from "next/link";

import { IAlbum } from "../../interfaces";
import { ContentLayout } from "../layout/Layout";
import styles from "./AlbumPageLayout.module.css";
import { LeftArrowIcon, RightArrowIcon } from "../icons/Arrows";

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <ContentLayout headerSlot={<AlbumsNav {...props} />}>
      <div className={styles.container}>
        {/* <h2 className="py20">{props.album.name}</h2> */}

        <img src={props.album.cover} alt="Album" />

        <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />

        <p
          className={styles.discription + " " + "py20"}
          dangerouslySetInnerHTML={{ __html: props.album.description }}
        ></p>
      </div>
    </ContentLayout>
  );
}

const AlbumsNav = (props: Props) => {
  return (
    <div className={styles.nav}>
      {props.prevAlbumSlug && (
        <Link href={`/albums/${props.prevAlbumSlug}`}>
          <LeftArrowIcon />
        </Link>
      )}

      <h2>{props.album.name}</h2>

      {props.nextAlbumSlug && (
        <Link href={`/albums/${props.nextAlbumSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};
