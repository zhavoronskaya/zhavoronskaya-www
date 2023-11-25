import React from "react";
import Link from "next/link";

import { IShot } from "../../interfaces";
import { LeftArrowIcon, RightArrowIcon } from "../theme/Icon/Arrows";

type Props = {
  shot: IShot;
  prevShotSlug?: string;
  nextShotSlug?: string;
};

const ShotHeader = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      {props.prevShotSlug && (
        <Link href={`/shots/${props.prevShotSlug}`}>
          <LeftArrowIcon />
        </Link>
      )}

      <h2 id="scenename" className="text-ellipsis">
        {props.shot.name}
      </h2>

      {props.nextShotSlug && (
        <Link href={`/shots/${props.nextShotSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};

export default ShotHeader;
