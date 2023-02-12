import Link from "next/link";
import { IScene } from "../../interfaces";

export default function SceneThumbnail(props: { scene: IScene }) {
  return (
    <div className="mb-md">
      <Link href={`/scenes/${props.scene.slug}`}>
        <img src={props.scene.cover} alt="Scene" />
        <p className="mt-sm">{props.scene.name}</p>
      </Link>
    </div>
  );
}
