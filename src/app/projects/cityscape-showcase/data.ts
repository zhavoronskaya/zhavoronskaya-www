import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const cityscape: IProject = {
  name: ["Cityscape Showcase"],
  label: "Representation of Urban Design and Architecture",
  thumbnailDIscription:
    "Architectural 3D project blending functionality and aesthetics",
  thumbnailVideoUrl: "/video/mono1-compressed-720.mp4",
  routing: "/projects/cityscape-showcase",
  link: `${TechnologyLinks.MONO}`,
  description: " This page is currently under development",
  // technology: [
  //   { src: `${TechnologyLinks.BLENDER}`, name: "3Ds Max" },
  //   { src: `${TechnologyLinks.THREEJS}`, name: "Three.js" },
  //   { src: `${TechnologyLinks.NEXT}`, name: "Next.js" },
  // ],
  // developmentSteps: [
  //   {
  //     name: "",
  //     items: [],
  //   },
  // ],
};

export default cityscape;
