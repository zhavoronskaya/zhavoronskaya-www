import React from "react";
import Link from "next/link";
import { LeftArrowIcon, RightArrowIcon } from "@/theme/icons";

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

      <h2 className="fz-lg text-ellipsis">
        <Link href="/albums">Albums</Link> / {props.albumName}
      </h2>

      {props.nextAlbumSlug && (
        <Link href={`/albums/${props.nextAlbumSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};

export default AlbumHeader;
