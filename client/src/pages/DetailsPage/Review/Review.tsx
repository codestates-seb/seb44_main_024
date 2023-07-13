import { useState } from 'react';
import ReviewTop from './ReviewTop/ReviewTop';
import ReviewBottom from './ReviewBottom/ReviewBottom';
import Comment from './Comment/Comment';
import ReviewModal from '../UI/ReviewModal/ReviewModal';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { ReviewContent } from '../assets/types/movieTypes';

export interface ReviewProps {
  review: ReviewContent;
}

const Review = ({ review }: ReviewProps) => {
  const [isExpandOpen, setIsExandOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const expandOpenHandler: () => void = () => {
    setIsExandOpen(!isExpandOpen);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="mb-10">
        <div className="mb-0.5 w-full border-4 border-solid border-theme4 p-4">
          <ReviewTop review={review} />
          <div className="flex justify-between px-4 py-7">
            <p>{review.content}</p>
            <div>
              <button onClick={openModal} className="mr-3">
                수정
              </button>
              <button className="text-red-500">삭제</button>
            </div>
          </div>
          <ReviewBottom review={review} />
        </div>
        <div className="flex items-center">
          {isExpandOpen ? (
            <IoMdArrowDropup onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          ) : (
            <IoMdArrowDropdown onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          )}

          <p>댓글 (댓글 개수)개</p>
        </div>
        {isExpandOpen ? (
          <>
            <Comment />
            <Comment />
          </>
        ) : null}
      </div>
      {isModalOpen && <ReviewModal review={review} closeModal={closeModal} />}
    </>
  );
};

export default Review;
