import React from "react";
import Link from "next/link";

import { IAlbum } from "@/interfaces";
import styles from "./AlbumPageLayout.module.css";
import { LeftArrowIcon, RightArrowIcon } from "../theme/Icon/Arrows";

type Props = {
  albumName: string;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

const AlbumHeader = (props: Props) => {
  return (
    <div className="flex gap-2">
      {props.prevAlbumSlug && (
        <Link href={`/albums/${props.prevAlbumSlug}`}>
          <LeftArrowIcon />
        </Link>
      )}

      <h2 className="text-ellipsis">{props.albumName}</h2>

      {props.nextAlbumSlug && (
        <Link href={`/albums/${props.nextAlbumSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};

export default AlbumHeader;
