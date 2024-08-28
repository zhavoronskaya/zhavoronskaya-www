import { Heart } from "@/components/UI/icons";
type Props = {
  items: string[];
};

const DecorativeList = ({ items }: Props) => {
  return (
    <ul className="list-none text-bodysm sm:text-bodyst lg:text-bodys">
      {items.map((item) => (
        <li key={item} className="flex gap-2 mb-2 sm:mb-4 items-center">
          <Heart className="w-[24px] sm:w-[28px] lg:w-[32px] shrink-0" />
          <span> {item}</span>
        </li>
      ))}
    </ul>
  );
};

export default DecorativeList;
