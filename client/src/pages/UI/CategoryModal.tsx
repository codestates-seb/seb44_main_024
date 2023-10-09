import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalProps {
  onClose: () => void;
  genre: 'string';
  tag: 'string';
}

const CategoryModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const genres = [
    '액션',
    '범죄',
    '느와르',
    '드라마',
    '로맨스',
    '판타지',
    'SF',
    '재난',
    '코메디',
    '공포',
  ];
  const tags = [
    '감동',
    '음악',
    '힐링',
    '킬링타임',
    '모험',
    '창의적',
    '영상미',
    '영감',
    '긴장감',
    '반전',
  ];

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  const handleGenreClick = (genre: string) => {
    console.log(genre);
    const queryString = `?genre=${genre}`;
    console.log(queryString);

    window.location.href = `/category/genre${queryString}`;
  };

  const handleTagClick = (tag: string) => {
    console.log(tag);
    const queryString = `?tag=${tag}`;
    window.location.href = `/category/tag${queryString}`;
    console.log(queryString);
  };
  console.log('selectedTag : ');

  return (
    <div className="fixed left-48 top-20 z-50 flex w-80 gap-4 rounded border-4 border-mainblack bg-maingray shadow-2xl">
      <div className="flex w-1/2 flex-col p-6">
        <p className="mb-4">장르별</p>
        {genres.map((genre, index) => (
          <button
            key={index}
            onClick={() => {
              handleGenreClick(genre);
              closeModal();
            }}
            className="mb-2 flex py-1 text-xl font-semibold hover:bg-mainyellow"
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="flex w-1/2 flex-col p-6">
        <p className="mb-4">#태그별</p>
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => {
              handleTagClick(tag);
              closeModal();
            }}
            className="mb-2 flex py-1 text-xl font-semibold hover:bg-mainyellow"
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="mr-2 mt-6 h-full justify-start text-center text-3xl">
        <button className="hover:animate-spin" onClick={closeModal}>
          <AiFillCloseCircle />
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
