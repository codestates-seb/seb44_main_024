import api from '../assets/api/axiosInstance';
import { useState, useEffect } from 'react';
import ReviewTop from './ReviewTop/ReviewTop';
import ReviewBottom from './ReviewBottom/ReviewBottom';
import Comment from './Comment/Comment';
import ReviewModal from '../UI/ReviewModal/ReviewModal';
import CommentForm from './Comment/CommentForm/CommentForm';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { ReviewContent } from '../assets/types/movieTypes';
import { getCookie, removeCookie } from '../../../utils/cookie'; // 로그인 기능 완성시 사용
import { useNavigate } from 'react-router-dom';

export interface ReviewProps {
  review: ReviewContent;
  pageNumber?: string | number;
}

interface ErrorResponse {
  response?: {
    status?: number;
  };
}

const Review = ({ review, pageNumber }: ReviewProps) => {
  const token = getCookie('jwtToken'); // 로그인 기능 완성시 사용
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getCookie('jwtToken')));
  const [isExpandOpen, setIsExandOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  const expandOpenHandler: () => void = () => {
    setIsExandOpen(!isExpandOpen);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //리뷰 삭제(DELETE 요청) // 예상 endpoint: `/reviews/${review.reviewId}`
  const handleReviewDelete = async () => {
    try {
      const response = await api.delete(`/reviews/${review.reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      alert('삭제되었습니다.');
      if (pageNumber === '1' || pageNumber === 1) {
        window.location.reload();
      } else {
        navigate(`/movies/${review.docId}?page=1`);
      }
    } catch (err) {
      console.error(err);
      alert('에러가 발생했습니다. 다시 시도하거나 새로고침 해주세요: ' + err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const fetchUserData = async () => {
      try {
        const currentToken = getCookie('jwtToken');
        if (!currentToken) return;
        const response = await api.get(`/members/mypage`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.memberId);
      } catch (err) {
        const errorResponse = err as ErrorResponse;
        if (errorResponse.response && errorResponse.response.status === 401) {
          removeCookie('jwtToken');
          setIsLoggedIn(false);
          navigate('/');
          // alert('세션이 만료되었습니다. 다시 로그인 해주세요.')
        } else {
          console.error(err);
        }
      }
    };
    fetchUserData();
  }, [token, isLoggedIn, navigate]);

  return (
    <>
      <div className="mb-10">
        <div className="mb-0.5 w-full border-4 border-solid border-theme4 p-4">
          <ReviewTop review={review} />
          <div className="flex justify-between py-7 pl-4 pr-2.5">
            <p className="font-medium">{review.content}</p>
            <div>
              {/* 수정 및 삭제버튼 쿠키의 유저정보(아마 id)와 해당 리뷰의 유저id가 일치하는 경우에만 렌더링 */}
              {userId === review.user.memberId ? (
                <>
                  <button onClick={openModal} className="mr-2 text-gray-400">
                    수정
                  </button>
                  <button
                    onClick={handleReviewDelete}
                    className=" p-1 text-red-500 hover:bg-red-50"
                  >
                    삭제
                  </button>
                </>
              ) : null}
              {/* <button onClick={openModal} className="mr-2 text-gray-400">
                수정
              </button>
              <button onClick={handleReviewDelete} className=" p-1 text-red-500 hover:bg-red-50">
                삭제
              </button> */}
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

          <p>댓글 기능은 준비 중입니다..</p>
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
