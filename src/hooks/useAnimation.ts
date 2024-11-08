import React from "react";

type Props = {
  to?: number;
  from?: number;
  current?: number;
  step?: number;
  onStart?: () => void;
  onChange?: (value: number) => void;
  onFinish?: () => void;
};

const ANIMATION_STEP = 0.1;

export const useAnimation = (props: Props) => {
  // const animationFrameId = React.useRef<number>();

  const run = React.useCallback(
    (runProps: Props) => {
      const onStart = () => {
        props.onStart?.();
        runProps.onStart?.();
      };

      onStart();

      animate({
        ...props,
        ...runProps,
        onChange: (v) => {
          props.onChange?.(v);
          runProps.onChange?.(v);
        },
        onFinish: () => {
          props.onFinish?.();
          runProps.onFinish?.();
        },
      });
    },
    [props]
  );

  return {
    run,
  };
};

export function animate({
  to = 1,
  from = 0,
  step = ANIMATION_STEP,
  current = from,
  onChange,
  onFinish,
}: Props) {
  const direction = from < to ? 1 : -1;

  // console.log("bewval", step * direction);
  current += step * direction;

  onChange?.(current);

  if ((from < to && current >= to) || (from > to && current <= to)) {
    onFinish?.();
    return;
  }

  return window.requestAnimationFrame(() => {
    animate({ from, to, step, current, onChange, onFinish });
  });
}

export default useAnimation;
