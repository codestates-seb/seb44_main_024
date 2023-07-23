import { useState } from 'react';

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
    const queryString = `?genre=${genre}`; // ?genre=장르
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
    <div className="fixed left-48 top-20  z-50 flex w-80 flex-row items-center justify-center gap-2 border bg-white p-1">
      <div className="mr-5 flex w-1/2 flex-col  text-center">
        장르별
        {genres.map((genre, index) => (
          <button
            key={index}
            onClick={() => {
              handleGenreClick(genre);
              closeModal();
            }}
            className="text-2xl hover:bg-mainyellow"
          >
            {genre}
            {/* <Link to={`/category/${genre}`}>{genre}</Link> */}
          </button>
        ))}
      </div>
      <div className="mr-5 flex w-1/2 flex-col  text-center">
        #태그별
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => {
              handleTagClick(tag);
              closeModal();
            }}
            className="text-2xl hover:bg-mainyellow"
          >
            {tag}
            {/* <Link to={`/category/${tag}`}>{tag}</Link> */}
          </button>
        ))}
      </div>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};

export default CategoryModal;
