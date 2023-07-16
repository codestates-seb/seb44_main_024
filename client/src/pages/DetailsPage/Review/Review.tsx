import axios from 'axios';
// import api from '../assets/api/axiosInstance'; // 백엔드 서버로 보낼때 바꾸기
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

  //리뷰 삭제(DELETE 요청) // reviewId 이용
  const handleReviewDelete = async () => {
    try {
      const response = await axios.delete(
        'https://7824fe4c-db17-4a35-8a83-3480e0f32f69.mock.pstmn.io',
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(response);
      alert('삭제되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mb-10">
        <div className="mb-0.5 w-full border-4 border-solid border-theme4 p-4">
          <ReviewTop review={review} />
          <div className="flex justify-between py-7 pl-4 pr-2.5">
            <p className="font-medium">{review.content}</p>
            <div>
              <button onClick={openModal} className="mr-2">
                수정
              </button>
              <button onClick={handleReviewDelete} className=" p-1 text-red-500 hover:bg-red-50">
                삭제
              </button>
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
