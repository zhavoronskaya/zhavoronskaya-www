import React from "react";
import Link from "next/link";

import { IScene } from "../../interfaces";
import Layout from "../layout/Layout";
import styles from "./ScenePageLayout.module.css";

type Props = {
  children: React.ReactNode;
  scene: IScene;
  prevSceneSlug?: string;
  nextSceneSlug?: string;
};

export default function ScenePageLayout(props: Props) {
  return (
    <Layout>
      <div className={styles.title + " " + "p20"}>
        {props.prevSceneSlug && (
          <Link href={`/scenes/${props.prevSceneSlug}`}>{"< "}PREVIOUS</Link>
        )}

        <h2>{props.scene.name}</h2>

        {props.nextSceneSlug && (
          <Link href={`/scenes/${props.nextSceneSlug}`}>NEXT {" >"}</Link>
        )}
      </div>
      <div className={styles.container}>
        {/* <h2 className="py20">{props.scene.name}</h2> */}

        {/* <img src={props.scene.cover} alt="Scene" />

        <p className={styles.discription + " " + "py20"}>
          {props.scene.description}
        </p> */}

        {props.children}
      </div>
    </Layout>
  );
}
