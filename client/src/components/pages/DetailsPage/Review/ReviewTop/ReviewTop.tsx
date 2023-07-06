import UserForPost from '../../UI/UserForPost.tsx';
import { AiFillStar } from 'react-icons/ai';

const ReviewTop = () => {
  return (
    <div className="flex items-center justify-between">
      <UserForPost />
      <div className="flex">
        <AiFillStar className="text-2xl text-theme1" />
        <AiFillStar className="text-2xl text-theme1" />
        <AiFillStar className="text-2xl text-theme1" />
        <AiFillStar className="text-2xl text-theme1" />
        <AiFillStar className="text-2xl text-theme1" />
      </div>
    </div>
  );
};

export default ReviewTop;
