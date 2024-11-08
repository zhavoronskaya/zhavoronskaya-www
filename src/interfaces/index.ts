import { Vector2 } from "three";

export interface IImageData {
  width: number;
  height: number;
  alt: string;
  src: string;
  className?: string;
}

export interface IImageLink {
  href: string;
  image: IImageData;
}

export interface IImageSlider {
  images: IImageData[];
}

export interface IIcon {
  fillColor?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  idx?: number;
}

export interface IProject {
  name: string[];
  separator?: string;
  thumbnailDIscription?: string;
  thumbnailVideoUrl: string;
  // thumbnailSize: ImageSizes;
  label: string;
  link: string;
  routing: string;
  projectImages?: string[];
  description?: string;
  role?: Role;
  technology?: Technolody[];
  challenges?: ChallengesStep[];
  linkToSource?: string;
  developmentSteps?: DevelopmentSteps[];
}

export interface IRefData {
  name: string;
  src: string;
}
export interface IShotData {
  ref: IRefData[];
  images: IImageData[];
  name: string;
  description?: string;
  tags: string[];
  href?: string;
}
export interface IAlbum {
  name: string;
  label: string;
  description?: string;
  tags: string[];
  images: IImageData[];
  info: Info;
}

export type Info = {
  mastered: string;
  artwork: string;
  released: string;
  date: string;
  href: string;
};

export type Technolody = {
  src: string;
  name: string;
};
export type DevelopmentSteps = {
  name: string;
  items: string[];
};
export type Role = {
  name: string;
  description: string;
};
export type ChallengesStep = {
  info: string;
  details: string[];
};

export type ImageSizes = {
  width: number;
  height: number;
};

// export type CanvasProps = {
//   children: React.ReactNode;
//   camera: Camera;
// };

export type SizeLike = {
  width: number;
  height: number;
};

export type Vector2Like = {
  x: number;
  y: number;
};

export type Scene = {
  notesGroupPosition: Vector2Like | null;
  notesPlayingStatus: "OFF" | "ON";
};
