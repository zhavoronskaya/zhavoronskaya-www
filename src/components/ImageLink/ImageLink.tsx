import Link from "next/link";
import Image from "next/image";
import { EyesIcon } from "../UI/icons";
import { IImageLink } from "../../interfaces";
import TransitionLink from "../TransitionLink";

const ImageLink = (props: IImageLink) => {
  return (
    <TransitionLink
      href={props.href}
      className="group relative rounded-lg overflow-hidden"
    >
      <div className="absolute flex flex-col inset-0 items-center justify-center opacity-0 bg-border-color group-hover:opacity-100 transition-opacity duration-300 ease-in">
        <EyesIcon
          fillColor="#F08CAE"
          className="w-[20px] sm:w-[32px] lg:w-[32px]"
        />
        <span className="text-main-container-color text-center text-hintm sm:text-hintt lg:text-hint">
          {props.image.alt}
        </span>
      </div>

      <Image
        width={props.image.width}
        height={props.image.height}
        alt={props.image.alt}
        className={`${props.image.className} object-cover w-full border border-border-image-color`}
        src={props.image.src}
      />
    </TransitionLink>
  );
};

export default ImageLink;
