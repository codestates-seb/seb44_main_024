import { useState } from 'react';
import ReviewTop from './ReviewTop/ReviewTop';
import ReviewBottom from './ReviewBottom/ReviewBottom';
import Comment from './Comment/Comment';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { ReviewContent } from '../assets/types/movieTypes';

export interface ReviewProps {
  review: ReviewContent;
}

const Review = ({ review }: ReviewProps) => {
  const [isExpandOpen, setIsExandOpen] = useState<boolean>(false);
  const expandOpenHandler: () => void = () => {
    setIsExandOpen(!isExpandOpen);
  };
  return (
    <>
      <div className="mb-10">
        <div className="mb-0.5 w-full border-4 border-solid border-theme4 p-4">
          <ReviewTop review={review} />
          <p className="p-7">{review.content}</p>
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
    </>
  );
};

export default Review;
