import { IShotData } from "@/interfaces";

const Geometry1: IShotData = {
  name: "Basic Geometry & Warping",
  ref: [
    {
      name: "Shader Toy",
      src: "https://www.shadertoy.com/results?query=fbm",
    },

    {
      name: "FBM Inigo Quilez",
      src: "https://iquilezles.org/articles/fbm/",
    },
    {
      name: "Three.js Matrial Noise",
      src: "https://threejs.org/examples/?q=noise#webgpu_materialx_noise",
    },
    {
      name: "FBM Book of Shaders",
      src: "https://thebookofshaders.com/13/",
    },
  ],
  images: [
    {
      width: 600,
      height: 600,
      src: "/shots/geometry/geo1.png",
      alt: "Geometry Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/geometry/geo2.png",
      alt: "Geometry Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/geometry/geo3.png",
      alt: "Geometry Scene",
    },
  ],

  description: "",
  tags: ["shaders", "fbm", "basic_geometry"],
};

export default Geometry1;
