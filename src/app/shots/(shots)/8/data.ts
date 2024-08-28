import { IShotData } from "@/interfaces";

const particles: IShotData = {
  name: "Experiments with particle systems",
  ref: [
    {
      name: "2D SDF Function",
      src: "https://iquilezles.org/articles/distfunctions2d/",
    },
    {
      name: "Codrops Particles",
      src: "https://tympanus.net/codrops/?s=particles&search-type=posts",
    },
    {
      name: "React Three Drei Points",
      src: "https://github.com/pmndrs/drei/blob/master/src/core/Points.tsx",
    },

    {
      name: "Three.js Particles Examples",
      src: "https://threejs.org/examples/?q=particles#webgl_buffergeometry_custom_attributes_particles",
    },
    // {
    //   name: "Simon Dev ",
    //   src: "https://blog.maximeheckel.com/",
    // },
  ],
  images: [
    {
      width: 600,
      height: 600,
      src: "/shots/particles/particles2.png",
      alt: "Particles Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/particles/particles1.png",
      alt: "Particles Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/particles/particles3.png",
      alt: "Particles Scene",
    },
  ],
  description: "",
  tags: ["particles", "shaders", "points"],
};

export default particles;
