import React from "react";

export function useCanvasKey(props: { targetId: string }) {
  const [key, setKey] = React.useState(1);

  React.useEffect(() => {
    const handleClick = () => setKey(Date.now());
    const title = document.getElementById(props.targetId);

    if (!title) return;

    title.addEventListener("click", handleClick);

    return () => {
      title.removeEventListener("click", handleClick);
    };
  }, [props.targetId]);

  return key;
}
