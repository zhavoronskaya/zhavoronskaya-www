import { IShotData } from "@/interfaces";

const FBO1: IShotData = {
  name: "Frame Buffer Objects & Particles",
  ref: [
    {
      name: "React Three Drei useFBO",
      src: "https://github.com/pmndrs/drei/blob/master/src/core/Fbo.tsx",
    },
    {
      name: "Attractors Fuse Factory",
      src: "https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/",
    },
    {
      name: "Maxime Heckel Blog",
      src: "https://blog.maximeheckel.com/",
    },
    {
      name: "FBO Particles",
      src: "https://barradeau.com/blog/?p=621",
    },
  ],
  images: [
    {
      width: 600,
      height: 600,
      src: "/shots/fbo/fbo1.png",
      alt: "FBO Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/fbo/fbo2.png",
      alt: "FBO Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/fbo/fbo3.png",
      alt: "FBO Scene",
    },
  ],

  description: "",
  tags: ["FBO", "particles", "shaders"],
};

export default FBO1;
