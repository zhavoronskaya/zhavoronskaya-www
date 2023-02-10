import React from "react";
import Link from "next/link";

import { IScene } from "../../interfaces";
import { LayoutWithSidebar } from "../layout/Layout";
import styles from "./ScenePageLayout.module.css";
import { LeftArrowIcon, RightArrowIcon } from "../icons/Arrows";

type Props = {
  children: React.ReactNode;
  scene: IScene;
  prevSceneSlug?: string;
  nextSceneSlug?: string;
};

export default function ScenePageLayout(props: Props) {
  return (
    <LayoutWithSidebar
      contentMaxWidth="100%"
      contentHeader={<ScenesNav {...props} />}
    >
      {/* <h2 className="py20">{props.scene.name}</h2> */}

      {/* <img src={props.scene.cover} alt="Scene" />

        <p className={styles.discription + " " + "py20"}>
          {props.scene.description}
        </p> */}

      {props.children}
    </LayoutWithSidebar>
  );
}

const ScenesNav = (props: Props) => {
  return (
    <div className={styles.nav}>
      {props.prevSceneSlug && (
        <Link href={`/scenes/${props.prevSceneSlug}`}>
          <LeftArrowIcon />
        </Link>
      )}

      <h2>{props.scene.name}</h2>

      {props.nextSceneSlug && (
        <Link href={`/scenes/${props.nextSceneSlug}`}>
          <RightArrowIcon />
        </Link>
      )}
    </div>
  );
};
