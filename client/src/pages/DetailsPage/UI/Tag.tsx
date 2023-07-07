interface Tag {
  tag: {
    tag: string;
  };
}

const Tag = ({ tag }: Tag) => {
  return <button className="mr-2 w-20 bg-theme2 text-white hover:bg-theme3">{tag.tag}</button>;
};

export default Tag;
