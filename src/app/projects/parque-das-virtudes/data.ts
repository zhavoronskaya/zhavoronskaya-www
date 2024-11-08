import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const virtudes: IProject = {
  name: ["Parque das ", "Virtudes"],
  label: "Enjoy online experience of virtual visiting",
  thumbnailDIscription: "3D Web Project: A Park in Porto, Portugal",
  thumbnailVideoUrl: "/video/virtudes.mp4",
  routing: "/projects/parque-das-virtudes",
  link: `${TechnologyLinks.VIRTUDES}`,
  description:
    " Web project dedicated to park in Porto, Portugal, representing a low poly 3D map of a park.",
  technology: [
    { src: `${TechnologyLinks.BLENDER}`, name: "Blender" },
    { src: `${TechnologyLinks.THREEJS}`, name: "Three.js" },
    { src: `${TechnologyLinks.NEXT}`, name: "Next.js" },
  ],
  challenges: [
    {
      info: "The number of polygons in a model has a significant impact",
      details: [
        "Especially if you want the application to work on mobile devices. In the initial version, the tree models were extremely detailed. Given the number of trees in the park, this led to the app crashing on lower-end devices due to the high polygon count.",
      ],
    },
    {
      info: "Enhancing 3D graphics and performance through texture baking",
      details: [
        "Using built-in Three.js materials, light sources, and shadows can be very resource-intensive. By switching to baked textures, I achieved rich colors, realistic static lighting, and soft shadows, which significantly improved both performance and visual quality.",
      ],
    },
    {
      info: "How to implement camera animation on scroll without using external libraries",
      details: [
        "This involved creating a map of camera and target positions, then interpolating these values based on scroll offset.",
      ],
    },
    {
      info: "How to create CSS animations for text and images triggered by page scroll without external libraries",
      details: [
        "I developed a complex CSS animation that calculates the visible area of an element as a percentage and triggers the animation accordingly.",
      ],
    },
    {
      info: "Building a custom hook for audio control",
      details: [
        "An essential feature for me was adding smooth fade-in/fade-out effects for audio elements.",
      ],
    },
    {
      info: "Animating props in the scene’s environment to toggle between dark/light mode",
      details: [
        "This was aimed at providing a smoother visual transition when switching between park views in both modes.",
      ],
    },
  ],
  linkToSource: "https://github.com/zhavoronskaya/virtudes",
  role: {
    name: "Design, Modeling, Development",
    description:
      "I was responsible for designing, creating, and implementing both the visual and interactive elements of the project. This included conceptualizing the overall design, building 3D models, and developing the project to ensure an engaging user experience.",
  },
  developmentSteps: [
    {
      name: "3D Modeling in Blender",
      items: [
        "Creating a map from svg (walls, ground)",
        "Adding props (trees, sculptures, benches etc.)",
        "Material Shading for props and walls",
        "Model optimisation (decrease vertex amount)",
        "Baking textures",
      ],
    },
    {
      name: "Design",
      items: [
        "Content & Photo Selection",
        "Preparing a multimedia element (field recording sound of the park, mastering)",
        "Landing Page Design",
        "Responsive Layout",
      ],
    },
    {
      name: "Code",
      items: [
        "Skybox & Environment settings",
        "Scroll based animation (camera movement)",
        "Performance optimisation (level of detail)",
        "CSS animation",
        "Light & Dark Mode",
        "Background music toggle",
      ],
    },
  ],
};

export default virtudes;
