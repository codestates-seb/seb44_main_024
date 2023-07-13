import { ReviewProps } from '../Review/Review';

const UserForPost = ({ review }: ReviewProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <img className="h-12 w-12 rounded-full" src={review.user[0].profile_Img} alt="yoda" />
      </div>
      <div>{review.user[0].username}</div>
    </div>
  );
};

export default UserForPost;
