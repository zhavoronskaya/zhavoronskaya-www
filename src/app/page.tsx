import BirdsScene from "@/components/BaseCanvas/BirdsScene";
import ShotsGallery from "@/components/BaseCanvas/ShotsGallery";
import JumpingText from "@/components/JumpingText";
import { HomeSvgAnimation } from "@/components/SvgAnimation";
import TransitionLink from "@/components/TransitionLink";

import { DecorHome, FlowerHome, HeartHome } from "@/components/UI/decor";
import { TechnologyLinks } from "@/constants";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HomeSvgAnimation />
      <div className="canvas-wrapper fixed h-screen w-screen left-0 top-0">
        <BirdsScene />
      </div>

      <div className="relative px-8 select-none ">
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4 mt-16 sm:mt-32 relative">
          <div
            className="section-1 col-start-1 col-span-3 sm:col-start-1 sm:col-span-11 lg:col-start-1 lg:col-span-12 mb-64 sm:mb-72"
            // style={{ marginBottom: "500px" }}
          >
            <JumpingText className="title uppercase text-hxlm sm:text-hxlt lg:lg:text-[180px]/[162px] xl:text-hxl font-bold ">
              Digital Art
            </JumpingText>
            <span className="text-dissolve-color ">&</span>
            <br />
            <JumpingText className="title uppercase text-hxlm sm:text-hxlt lg:lg:text-[180px]/[162px] xl:text-hxl font-bold ">
              Creative Coding
            </JumpingText>
          </div>
          <div className="home-lines absolute left-[-60%] top-[-4%] sm:left-[-46%] sm:top-[4%] lg:left-[-46%] lg:top-[10%]  xl:left-[-38%] xl:top-[8%]  z-20 pointer-events-none">
            <DecorHome className="w-[280px] sm:w-[600px]  lg:w-[800px] xl:w-[920px]" />
          </div>
          <div className="home-flower absolute right-0 top-16 sm:right-0 sm:top-10 lg:right-0 lg:top-4  xl:right-16 xl:top-36 z-20 pointer-events-none">
            <FlowerHome className="w-[148px] sm:w-[320px] lg:w-[480px] " />
          </div>

          {/* <div className="col-start-1 col-span-1 sm:col-start-1 sm:col-span-7 lg:col-start-1 lg:col-span-8 ">
            <BirdsScene />
          </div> */}

          <div className="section-2 col-start-2 col-span-2 sm:col-start-8 sm:col-span-5 lg:col-start-9 lg:col-span-4 ">
            <h4 className="text-hsm sm:text-hst lg:text-hs font-medium">
              exploring the world of{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Shader"
                className="inline text-accent-color hover:text-accent-color-active"
              >
                shaders
              </a>{" "}
              and <br />{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/3D_modeling"
                className="inline text-accent-color hover:text-accent-color-active"
              >
                3D modeling
              </a>{" "}
              on the web
            </h4>
          </div>

          <div className="section-3 mt-64 sm:mt-72 col-start-1 col-span-1 sm:col-start-1 sm:col-span-4  ">
            <p className="text-hxsm sm:text-hxst lg:text-hs font-medium">
              Hello, <br />
              I&#39;m Lena
            </p>
          </div>
          <div className="section-3 mt-64 sm:mt-72 col-start-2 col-span-2 sm:col-start-5 sm:col-span-8 mb-16 sm:mb-32">
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              As a creative developer specializing in visual design and
              generative art, I merge creativity with code to create lovely
              digital art and design projects. My passion for the generative art
              drives each work.
            </p>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-12 gap-4 ">
          <div className="section-4 sm:col-start-2 sm:col-span-6 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              main technologies & libraries
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.THREEJS}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              Three.js
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.WEBGL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              webgl
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.GLSL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              glsl
            </a>
          </div>

          <div className="mt-20 sm:mt-36 lg:mt-44 col-start-1 col-span-3 sm:col-start-5 sm:col-span-7 lg:col-start-6 lg:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              works
            </span>
            <TransitionLink
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
              href="/shots"
            >
              short gallery
            </TransitionLink>
          </div>
        </div>
        <div className="section-5 mt-8 sm:mt-16 h-[480px] sm:h-[600px]">
          <ShotsGallery />
        </div>

        <div className="relative sm:grid sm:grid-cols-12 gap-4 mt-24 sm:mt-64">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <p className="text-hxsm sm:text-hxst lg:text-hxs font-medium">
              Let&#39;s Collaborate & Create something amazing together
            </p>
          </div>
          <div className="home-heart absolute left-16 sm:left-32 top-[50%] sm:top-[-40%] z-20 pointer-events-none">
            <HeartHome className="w-[192px] sm:w-[192px] lg:w-[390px]" />
          </div>
        </div>
        <div className=" sm:grid sm:grid-cols-12 gap-4 mt-44 sm:mt-16 mb-16">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              feel free to
            </span>
            <TransitionLink
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium pb-8 sm:pb-16"
              href="/contact"
            >
              reach me out
            </TransitionLink>
          </div>
        </div>
      </div>
    </>
  );
}
