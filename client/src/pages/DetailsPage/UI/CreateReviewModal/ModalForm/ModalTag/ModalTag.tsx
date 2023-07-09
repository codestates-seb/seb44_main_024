import { useState } from 'react';

interface TagProps {
  tag: string;
  addTagHandler: (tag: string) => void;
}

const ModalTag = ({ tag, addTagHandler }: TagProps) => {
  const [tagSelected, setTagSelected] = useState<boolean>(false);

  const handleTagClick = () => {
    setTagSelected(!tagSelected);
    addTagHandler(tag);
  };
  return (
    <button
      onClick={handleTagClick}
      type="button"
      className={
        tagSelected
          ? 'mb-2 mr-2 w-20 bg-theme3 text-white'
          : 'mb-2 mr-2 w-20 bg-theme2 text-white hover:bg-theme3'
      }
    >
      {tag}
    </button>
  );
};

export default ModalTag;
