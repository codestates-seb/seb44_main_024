// import axios from 'axios';
import api from '../assets/api/axiosInstance'; // 백엔드 서버로 보낼때 바꾸기
import { useState } from 'react';
import ReviewTop from './ReviewTop/ReviewTop';
import ReviewBottom from './ReviewBottom/ReviewBottom';
import Comment from './Comment/Comment';
import ReviewModal from '../UI/ReviewModal/ReviewModal';
import CommentForm from './Comment/CommentForm/CommentForm';
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
  //포스트맨목서버 'https://7824fe4c-db17-4a35-8a83-3480e0f32f69.mock.pstmn.io'
  const handleReviewDelete = async () => {
    try {
      const response = await api.delete(`/reviews/${review.reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        },
      });
      console.log(response);
      alert('삭제되었습니다.');
    } catch (err) {
      console.error(err);
      alert('에러가 발생했습니다. 다시 시도해주세요: ' + err);
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
              {/* 수정 및 삭제버튼 쿠키의 유저정보(아마 id)와 해당 리뷰의 유저id가 일치하는 경우에만 렌더링 */}
              <button onClick={openModal} className="mr-2 text-gray-400">
                수정
              </button>
              <button onClick={handleReviewDelete} className=" p-1 text-red-500 hover:bg-red-50">
                삭제
              </button>
            </div>
          </div>
          <ReviewBottom review={review} />
        </div>
        <div className="mb-3 flex items-center">
          {isExpandOpen ? (
            <IoMdArrowDropup onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          ) : (
            <IoMdArrowDropdown onClick={expandOpenHandler} className="cursor-pointer text-2xl" />
          )}

          <p>댓글 (댓글 개수)개</p>
        </div>
        {isExpandOpen ? (
          <>
            <CommentForm />
            {/* Comment 데이터 받으면, map으로 뿌려줌 */}
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
