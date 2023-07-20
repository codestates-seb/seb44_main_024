import { ReviewProps } from '../Review/Review';

const UserForPost = ({ review }: ReviewProps) => {
  // 유저관련 정보 아직 서버로부터 안들어옴
  console.log(review);
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <img
          className="h-12 w-12 rounded-full"
          // src={review.user.profile_Img && review.user.profile_Img}
          alt="user"
        />
      </div>
      {/* <div>{review.user.username && review.user.username}</div> */}
    </div>
  );
};

export default UserForPost;
