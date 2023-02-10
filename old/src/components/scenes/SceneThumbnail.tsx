import Link from "next/link";
import { IScene } from "../../interfaces";
import styles from "./SceneThumbnail.module.css";

export default function SceneThumbnail(props: { scene: IScene }) {
  return (
    <div className={styles.sceneelement}>
      <Link href={`/scenes/${props.scene.slug}`}>
        <img src={props.scene.cover} alt="Scene" />
        <p className="py10">{props.scene.name}</p>
      </Link>
    </div>
  );
}
