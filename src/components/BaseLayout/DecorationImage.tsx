// import { useEffect } from "react";
// import { animatePageIn, animatePageOut } from "../TransitionLink/Animation";
import Image from "next/image";

type Props = {};

const DecorationImage = ({}: Props) => {
  return (
    <Image
      id="decoration-image"
      width="1648"
      height="2198"
      alt="contact"
      className="js-view-transition-element object-cover w-full h-full"
      src="/image/contact.png"
      priority={true}
      style={{ opacity: 0 }}
    />
  );
};

export default DecorationImage;
