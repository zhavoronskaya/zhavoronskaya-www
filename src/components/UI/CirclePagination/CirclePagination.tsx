"use client";

type Props = {
  totalCount: number;
  imageIdx: number;
  changeImage: (idx: number) => void;
};

const CirclePagination = ({ totalCount, imageIdx, changeImage }: Props) => {
  const circleArray = Array.from(Array(totalCount).keys());

  return (
    <div className="flex justify-center gap-2">
      {circleArray.map((i) => (
        <button
          key={i}
          className={`${
            imageIdx == i ? "bg-accent-color-active" : ""
          } w-4 h-4 rounded-full border border-accent-color-active`}
          onClick={() => changeImage(i)}
        ></button>
      ))}
    </div>
  );
};

export default CirclePagination;
