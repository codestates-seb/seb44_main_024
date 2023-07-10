import { useState } from 'react';
import ModalTag from './ModalTag/ModalTag';
import RatingStars from 'react-rating-stars-component';
import { ReviewContent } from '../../../assets/types/movieTypes';
// import { postReview } from '../../../assets/api/movieApi';
// import { redirect } from 'react-router-dom';

const tags: string[] = [
  '#태그1',
  '#태그2',
  '#태그3',
  '#태그4',
  '#태그5',
  '#태그6',
  '#태그7',
  '#태그8',
  '#태그9',
  '#태그10',
];

interface ModalFormProps {
  movieId: string | undefined;
  review?: ReviewContent;
}

const ModalForm = ({ movieId, review }: ModalFormProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(review ? review.tags : []);
  const [reviewContent, setReviewContent] = useState<string>(review ? review.content : '');
  const [score, setScore] = useState<number>(review ? review.score : 0);

  console.log(selectedTags);

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

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(event.target.value);
  };

  const handleStarClick = (newRating: number) => {
    setScore(newRating);
  };

  // post 요청

  // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const createdReviewData = {
  //     movieId: 1,
  //     userId: 1,
  //     userImg: '',
  //     userName: '',
  //     score: score,
  //     content: reviewContent,
  //     tags: selectedTags,
  //     likes: 0,
  //     comments: [],
  //   };

  //   try {
  //     const redirectLocation = await postReview(createdReviewData, movieId);
  //     return redirect(redirectLocation);
  //   } catch (err) {
  //     console.error('Error submitting review:', err);
  //   }
  // };

  return (
    <form className="h-full w-full">
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
        <button className="bg-theme2 px-7 py-1.5 text-white hover:bg-theme3">리뷰 등록</button>
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
