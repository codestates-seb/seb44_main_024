import api from '../../../assets/api/axiosInstance';
import RatingStars from 'react-rating-stars-component';
import { useState } from 'react';
import { useAppSelector } from '../../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../../redux-toolkit/slices/movieDetailSlice';
import { ModalProps } from '../ReviewModal';
import { getCookie } from '../../../../../utils/cookie'; // 로그인 기능 완성시 사용
import { useNavigate } from 'react-router-dom';
import ModalTag from './ModalTag/ModalTag';

const tags: string[] = [
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

const ModalForm = ({ closeModal, movieId, review, pageNumber }: ModalProps) => {
  const token = getCookie('jwtToken');
  console.log(token);
  const navigate = useNavigate();
  const movieDetail = useAppSelector(selectMovieDetails);
  const [selectedTags, setSelectedTags] = useState<string[]>(review ? review.tags : []);
  const [reviewContent, setReviewContent] = useState<string>(review ? review.content : '');
  const [score, setScore] = useState<number>(review ? review.score : 0);

  // 폼에서 태그 추가
  const addTagHandler = (tag: string) => {
    const updatedTags = [...selectedTags];
    if (updatedTags.includes(tag)) {
      const index = updatedTags.indexOf(tag);
      updatedTags.splice(index, 1);
    } else {
      updatedTags.push(tag);
    }
    setSelectedTags(updatedTags);
  };

  // 폼에서 리뷰내용 추가
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(event.target.value);
  };

  // 폼에서 별점 추가
  const handleStarClick = (newRating: number) => {
    setScore(newRating);
  };

  // 리뷰 등록 및 수정(조건부 POST, PATCH 요청) // 예상 endpoint: `/movies/{movie-id}/reviews`(POST) // PATCH는 `/reviews/${review.reviewId}`
  const handleReviewFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // patch, post 둘다 리뷰 전체데이터 전송 (새 리뷰, 수정된 리뷰)
    const reviewData = {
      score: score,
      content: reviewContent,
      tags: selectedTags,
      genre: movieDetail?.movie.genre,
    };
    if (reviewData.content && reviewData.score !== 0) {
      if (review) {
        try {
          const response = await api.patch(`/reviews/${review.reviewId}`, reviewData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          closeModal();
          console.log(response);
          alert('수정되었습니다.');
          window.location.reload();
        } catch (err) {
          console.error(err);
          alert('에러가 발생했습니다. 다시 시도해주세요: ' + err);
        }
      } else {
        try {
          const response = await api.post(`/movies/${movieId}/reviews`, reviewData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          closeModal();
          console.log(response);
          alert('등록되었습니다.');
          if (pageNumber === '1' || pageNumber === 1) {
            window.location.reload();
          } else {
            navigate(`/movies/${movieId}?page=1`);
          }
          window.location.reload();
          // 해당 페이지 리뷰5개일땐, 다음페이지로 넘겨줌. 5개 미만일땐 해당페이지 새로고침 (나중에 적용)
        } catch (err) {
          console.error(err);
          alert('에러가 발생했습니다. 다시 시도해주세요: ' + err);
        }
      }
    } else {
      alert('리뷰내용 또는 별점을 추가해주세요!');
    }
  };

  return (
    <form onSubmit={handleReviewFormSubmit} className="h-full w-full">
      <div className="mb-1.5 flex items-center justify-between">
        <div>
          <RatingStars
            count={5}
            size={50}
            activeColor="#000000"
            isHalf={true}
            onChange={handleStarClick}
            value={score}
          />
        </div>
        <button className="bg-theme2 px-7 py-1.5 text-white hover:bg-theme3">
          {review ? '리뷰수정' : '리뷰등록'}
        </button>
      </div>
      <textarea
        onChange={handleContentChange}
        value={reviewContent}
        className="mb-3 h-[250px] w-full resize-none pl-1"
        placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
      ></textarea>
      <div>
        {tags.map((tag, index) => (
          <ModalTag
            tag={tag}
            key={index}
            addTagHandler={addTagHandler}
            isSelected={selectedTags.includes(tag)}
          />
        ))}
      </div>
    </form>
  );
};

export default ModalForm;
