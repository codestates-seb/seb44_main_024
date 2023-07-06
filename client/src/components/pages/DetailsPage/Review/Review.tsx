import { useState } from 'react';
import ReviewTop from './ReviewTop/ReviewTop.tsx';
import ReviewBottom from './ReviewBottom/ReviewBottom.tsx';
import Comment from './Comment/Comment.tsx';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Review = () => {
  const [isExpandOpen, setIsExandOpen] = useState<boolean>(false);
  const expandOpenHandler: () => void = () => {
    setIsExandOpen(!isExpandOpen);
  };
  return (
    <>
      <div className="mb-10">
        <div className="mb-0.5 w-full border-4 border-solid border-theme4 p-4">
          <ReviewTop />
          <p className="p-7">아름다운 영화입니다..</p>
          <ReviewBottom />
        </div>
        <div className="flex items-center">
          {isExpandOpen ? (
            <IoMdArrowDropup onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          ) : (
            <IoMdArrowDropdown onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          )}

          <p>댓글 2개</p>
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
