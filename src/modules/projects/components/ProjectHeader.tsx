import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";

const ProjectHeader = () => {
  return (
    <div className="mt-6 sm:mt-12 relative z-20">
      <TransitionLink
        href="/projects"
        className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        projects
      </TransitionLink>
    </div>
  );
};

export default ProjectHeader;
