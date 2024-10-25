import Link from "next/link";

type Props = {};

const ShotHeader = ({}: Props) => {
  return (
    <div className="flex justify-between mt-6 sm:mt-12">
      <Link
        href="/shots"
        className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        Shots
      </Link>
    </div>
  );
};

export default ShotHeader;
