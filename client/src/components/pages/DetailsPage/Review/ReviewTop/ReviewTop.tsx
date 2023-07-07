import UserForPost from '../../UI/UserForPost.tsx';
import { AiFillStar } from 'react-icons/ai';
import { FaStarHalf } from 'react-icons/fa';
import { ReviewProps } from '../Review.tsx';

const ReviewTop = ({ review }: ReviewProps) => {
  return (
    <div className="flex items-center justify-between">
      <UserForPost review={review} />
      <div className="flex">
        {Array(Math.floor(review.score))
          .fill('')
          .map((_, index) => (
            <AiFillStar key={index} className="text-2xl text-theme1" />
          ))}
        {review.score - Math.floor(review.score) > 0 &&
          Array(review.score - Math.floor(review.score) + 0.5)
            .fill('')
            .map((_, index) => <FaStarHalf key={index} className="text-2xl text-theme1" />)}
      </div>
    </div>
  );
};

export default ReviewTop;
