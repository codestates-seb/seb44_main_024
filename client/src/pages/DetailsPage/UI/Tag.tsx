interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return <button className="mr-2 w-20 bg-theme2 text-white hover:bg-theme3">#{tag}</button>;
};

export default Tag;
