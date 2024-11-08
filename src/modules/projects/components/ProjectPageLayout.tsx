import React, { Fragment } from "react";
import ProjectHeader from "./ProjectHeader";
import { IProject } from "@/interfaces";
import DecorativeList from "@/components/DecorativeList/DecorativeList";
import { BirdProject, HeartProject } from "@/components/UI/decor";
import { ProjectLayoutSvgAnimation } from "@/components/SvgAnimation";
import FadingText from "@/components/FadingText";
import { Heart } from "@/components/UI/icons";
import FillingSvg from "@/components/FadingElement";

type Props = {
  project: IProject;
  children: React.ReactNode;
};

const ProjectPageLayout = ({ project, children }: Props) => {
  return (
    <>
      <ProjectLayoutSvgAnimation />

      <div className="px-8">
        <ProjectHeader />
        <div className="mt-16 sm:mt-36 sm:grid sm:grid-cols-12 relative">
          <div className="sm:col-start-1 sm:col-span-11 ">
            <h1 className=" text-hxlm sm:text-hxlt lg:text-hxl font-bold ">
              {project.name.map((part, idx) => {
                return (
                  <Fragment key={idx}>
                    <FadingText className="subtitle">{part}</FadingText>
                  </Fragment>
                );
              })}
            </h1>
            <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
              {project.label}
            </span>
          </div>
          <div className="project-bird absolute right-[-52%] top-[132%] sm:right-[-20%] sm:top-[54%] lg:right-[-22%] lg:top-[64%] xl:right-[-16%] xl:top-[64%] z-20 pointer-events-none">
            <BirdProject className="w-[430px] sm:w-[720px] lg:w-[996px]" />
          </div>
        </div>

        <div className="mt-48 sm:mt-36 grid grid-cols-3 sm:grid-cols-12">
          <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              deeper immersion
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.link}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              take a look
            </a>
          </div>
        </div>
        <div className="mt-20 sm:mt-36 sm:grid sm:grid-cols-12">
          <div className="sm:col-start-1 sm:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              about
            </span>
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              {project.description}
            </p>
          </div>
        </div>

        {children}

        {project.technology && (
          <div className="mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12">
            <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                technologies
              </span>
              <p className="text-bodysm sm:text-bodyst lg:text-bodys">
                Main technologies used in the development of this project
                &#8212;
                {project.technology?.map((thnl, idx, arr) => (
                  <React.Fragment key={idx}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={thnl.src}
                      className="text-accent-color hover:text-accent-color-active uppercase"
                    >
                      {" "}
                      {thnl.name}
                    </a>
                    {idx != arr.length - 1 && ","}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        )}

        {project.role && (
          // <div className="mt-20 sm:mt-32 sm:grid sm:grid-cols-12">
          <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
            <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
              <div className="sm:col-start-1 sm:col-span-12 lg:col-span-12">
                <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                  project role
                </span>
                <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
                  {project.role.name}
                </p>
                <p className="mt-4 lg:mt-8 text-bodysm sm:text-bodyst lg:text-bodys ">
                  {project.role.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {project.challenges && (
          <>
            {/* <div className="mt-20 sm:mt-32"> */}
            <div className="mt-20 sm:mt-32 lg:mt-20 sm:grid sm:grid-cols-12">
              <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
                <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
                  challenges and achievement
                </span>
                <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
                  What I learned through this project:
                </p>
              </div>
            </div>
            <div className=" lg:mt-20 sm:grid sm:grid-cols-12">
              <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
                {project.challenges?.map((chlg, idx) => (
                  <div key={idx}>
                    <div className="flex gap-2 mt-4 lg:mt-8 mb-2 sm:mb-4 items-center">
                      <p className=" text-bodysm sm:text-bodyst lg:text-bodys font-medium ">
                        <Heart
                          className={`trigger ${idx} h-[12px] sm:h-[20px] lg:h-[24px] shrink-0 inline align-baseline`}
                          idx={idx}
                        />
                        &nbsp;
                        {chlg.info}
                      </p>
                    </div>
                    <div className="mb-8 sm:mb-12">
                      {/* <Heart className="w-[24px] sm:w-[28px] lg:w-[32px] shrink-0" /> */}
                      <span className="text-bodysm sm:text-bodyst lg:text-bodys">
                        {chlg.details}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {project.linkToSource && (
          <div className="mt-8 sm:mt-12 grid grid-cols-3 sm:grid-cols-12 relative">
            <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
              <p className="text-bodysm sm:text-bodyst lg:text-bodys">
                You can find the source code on
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.linkToSource}
                  className="text-accent-color hover:text-accent-color-active uppercase"
                >
                  {" "}
                  GITHUB
                </a>
              </p>
            </div>
          </div>
        )}

        {project.developmentSteps && (
          <>
            <div className="mt-20 sm:mt-32">
              <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
                steps of development
              </span>
            </div>
            {project.developmentSteps?.map((step, idx) => (
              <div key={idx}>
                <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
                  {step.name}
                </p>

                <div className="mt-4 lg:mt-8 mb-12 sm:mb-16 lg:mb-24">
                  <DecorativeList items={step.items} />
                </div>
              </div>
            ))}
          </>
        )}

        <div className="mt-28 mb-12 sm:mb-20 sm:mt-36 grid grid-cols-3 sm:grid-cols-12 relative">
          <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.link}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              Visit Project
            </a>
          </div>
          <div className="heart-project absolute right-0 bottom-[40%]  sm:right-0 sm:bottom-[60%] lg:right-0 lg:bottom-[80%] z-20 pointer-events-none">
            <HeartProject className="w-[100px] sm:w-[180px] lg:w-[340px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPageLayout;
