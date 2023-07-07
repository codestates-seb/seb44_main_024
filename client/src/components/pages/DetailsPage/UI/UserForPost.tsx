import profileImg from '../assets/profile.jpg';
import { ReviewProps } from '../Review/Review.tsx';

const UserForPost = ({ review }: ReviewProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 h-12 w-12">
        <img className="rounded-full" src={profileImg} alt="yoda" />
      </div>
      <div>{review.username}</div>
    </div>
  );
};

export default UserForPost;
