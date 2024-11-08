import Link from "next/link";
import { IShot } from "../../interfaces";

export default function SceneThumbnail(props: { shot: IShot }) {
  return (
    <div className="">
      <Link href={`/shots/${props.shot.slug}`}>
        <img
          src={props.shot.cover}
          alt={props.shot.coverAlt ?? "Shot Cover"}
          className="rounded-md h-64 object-cover"
        />
        {/* <p className="mt-sm">{props.shot.name}</p> */}
      </Link>
    </div>
  );
}
