import { Heart } from "@/components/UI/icons";
type Props = {
  items: string[];
};

const DecorativeList = ({ items }: Props) => {
  return (
    <ul className="list-none text-bodysm sm:text-bodyst lg:text-bodys">
      {items.map((item) => (
        <li key={item} className="flex gap-2 mb-2 sm:mb-4 items-center">
          <Heart className="h-[12px] sm:h-[20px] lg:h-[24px] shrink-0 align-baseline" />
          <span> {item}</span>
        </li>
      ))}
    </ul>
  );
};

export default DecorativeList;
