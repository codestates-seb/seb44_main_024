// import api from './assets/api/axiosInstance'; // 백엔드 서버로 보낼때 바꾸기
import axios from 'axios';
import RatingStars from 'react-rating-stars-component';
import { useState } from 'react';
import { ModalProps } from '../ReviewModal';
import ModalTag from './ModalTag/ModalTag';

const tags: string[] = [
  '#감동',
  '#음악',
  '#힐링',
  '#킬링타임',
  '#모험',
  '#창의적',
  '#영상미',
  '#영감',
  '#긴장감',
  '#반전',
];

const ModalForm = ({ closeModal, movieId, review }: ModalProps) => {
  console.log(movieId);
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

  // 리뷰 등록 및 수정(조건부 POST, PATCH 요청) // 예상 endpoint: `/movies/{movie-id}/reviews`(POST) // PATCH는 reviewId이용
  const handleReviewFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reviewData = {
      score: score,
      content: reviewContent,
      tags: selectedTags,
    };
    const url = review
      ? 'https://9eafe059-f15b-42b9-8571-1c6297da44fa.mock.pstmn.io'
      : 'https://032b9d6f-98f0-429c-ae1e-76363c379d20.mock.pstmn.io';
    const method = review ? 'PATCH' : 'POST';

    try {
      const response = await axios({
        method: method,
        url: url,
        data: reviewData,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
        },
      });
      closeModal();
      console.log(response);
      alert('등록되었습니다.');
    } catch (err) {
      console.error(err);
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
