import React from "react";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
};

export default function Container({ children, className, maxWidth }: Props) {
  return (
    <div className={cn("mx-auto", className)} style={{ maxWidth }}>
      {children}
    </div>
  );
}
