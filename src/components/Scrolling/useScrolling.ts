import React from "react";

export type Scrolling = { offset: number; targetId?: string };

export const ScrollingCtx = React.createContext<Scrolling>({ offset: 0 });

const useScrolling = () => {
  const data = React.useContext(ScrollingCtx);
  return data;
};

export default useScrolling;
