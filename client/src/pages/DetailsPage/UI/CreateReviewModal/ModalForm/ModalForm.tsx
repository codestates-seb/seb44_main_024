import { useState } from 'react';
import ModalTag from './ModalTag/ModalTag';
import RatingStars from 'react-rating-stars-component';
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
}

const ModalForm = ({ movieId }: ModalFormProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [score, setScore] = useState<number>(0);

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

  // const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const createdReviewData = {
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
      <div className="mb-1.5 flex justify-between">
        <div>
          <RatingStars
            count={5}
            size={50}
            activeColor="#000000"
            isHalf={true}
            onChange={handleStarClick}
          />
        </div>
        <button>리뷰 등록</button>
      </div>
      <textarea
        onChange={handleContentChange}
        value={reviewContent}
        className="mb-3 h-[250px] w-full"
        placeholder="이 작품에 대한 생각을 자유롭게 표현해주세요."
      ></textarea>
      <div>
        {tags.map((tag, index) => (
          <ModalTag tag={tag} key={index} addTagHandler={addTagHandler} />
        ))}
      </div>
    </form>
  );
};

export default ModalForm;
