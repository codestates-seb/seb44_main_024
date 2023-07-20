import { useState } from 'react';
import { useAppSelector } from '../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../redux-toolkit/slices/movieDetailSlice';

const MovieInfoBottom = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stillUrl, setStillUrl] = useState('');

  const preventModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const openModal = (still: string) => {
    setIsModalOpen(true);
    setStillUrl(still);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <p className="mb-4 text-2xl font-bold">갤러리</p>
        <div className="flex justify-between">
          {movieDetail?.movie.stills.map((still, index) => (
            <div key={index} className="max-h-[170px] w-[300px]">
              {/* 버튼이 아니어도 onClick 이벤트 줄 수 있게, 아래 줄에 한해서 eslint 무시 */}
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
              <img
                onClick={() => openModal(still)}
                className="h-full w-full cursor-pointer duration-300 ease-in-out hover:scale-110"
                src={still}
                alt="still"
              />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div
          role="presentation"
          onClick={closeModal}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/70"
        >
          <div
            role="presentation"
            onClick={preventModalClick}
            className="h-[300px] w-[500px] bg-white"
          >
            <img className="h-full w-full" src={stillUrl} alt="modal still" />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfoBottom;
