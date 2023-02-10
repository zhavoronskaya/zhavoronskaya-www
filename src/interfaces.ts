export interface IAlbum {
  name: string;
  slug: string;
  cover: string;
  coverAlt?: string;
  description: string;
  bandcamp: string; // iframe
}

export interface IScene {
  name: string;
  slug: string;
  cover: string;
  coverAlt?: string;
  description: string;
  // component: string | React.ReactNode;
}
