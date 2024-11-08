type Props = {
  text: string;
  height: number;
};

const Tag = ({ text, height }: Props) => {
  return (
    <div
      // className={` h-[${height}]px p-4 text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color rounded-full border border-border-tag-color `}
      className="text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color"
    >
      #{text}
    </div>
  );
};

export default Tag;
