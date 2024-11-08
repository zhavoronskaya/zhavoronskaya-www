import { IShotData } from "@/interfaces";

const FBO1: IShotData = {
  name: "Frame Buffer Objects & Particles",
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
  tags: ["FBO", "particles", "shaders", "blender3D"],
};

export default FBO1;
