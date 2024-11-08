import Tag from "../UI/Tag/Tag";

type Props = {
  tags: string[];
  height: number;
};

const TagsList = ({ tags, height }: Props) => {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Tag key={tag} text={tag} height={height} />
      ))}
    </div>
  );
};

export default TagsList;
