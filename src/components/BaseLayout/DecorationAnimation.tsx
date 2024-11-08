import { useEffect } from "react";
import { animatePageIn, animatePageOut } from "../TransitionLink/Animation";

type Props = {};

const DecorationAnimation = ({}: Props) => {
  useEffect(() => {
    animatePageIn("decoration-image");
  });
  return null;
};

export default DecorationAnimation;
