import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";

type Props = {};

const ShotHeader = ({}: Props) => {
  return (
    <div className="flex justify-between mt-6 sm:mt-12 relative z-20">
      <TransitionLink
        href="/shots"
        className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        Shots
      </TransitionLink>
    </div>
  );
};

export default ShotHeader;
