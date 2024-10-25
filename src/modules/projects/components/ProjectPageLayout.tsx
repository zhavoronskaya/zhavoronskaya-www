import React, { Fragment } from "react";
import ProjectHeader from "./ProjectHeader";
import { IProject } from "@/interfaces";
import DecorativeList from "@/components/DecorativeList/DecorativeList";

type Props = {
  project: IProject;
  children: React.ReactNode;
};

const ProjectPageLayout = ({ project, children }: Props) => {
  return (
    <div className="px-8">
      <ProjectHeader />
      <div className="mt-16 sm:mt-36 sm:grid sm:grid-cols-12">
        <div className="sm:col-start-1 sm:col-span-9 ">
          <h1 className=" text-hxlm sm:text-hxlt lg:text-hxl font-bold ">
            {project.name.map((part, idx) => {
              return (
                <Fragment key={idx}>
                  {part}
                  <br />
                </Fragment>
              );
            })}
          </h1>
          <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
            {project.label}
          </span>
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
              Main technologies used in the development of this project &#8212;
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

      <div className="mt-28 mb-12 sm:mb-20 sm:mt-36 grid grid-cols-3 sm:grid-cols-12">
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
      </div>
    </div>
  );
};

export default ProjectPageLayout;
