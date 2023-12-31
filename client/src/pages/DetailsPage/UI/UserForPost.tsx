import { ReviewProps } from '../Review/Review';

// 디폴트 프로필사진
const defaultProfile =
  'https://thebulletin.org/wp-content/themes/atomic-bulletin/resources/assets/images/person-dummy.jpg';

const UserForPost = ({ review }: ReviewProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-3">
        <img
          className="h-12 w-12 rounded-full"
          // src={defaultProfile}
          // 유저관련 정보 아직 서버로부터 안들어옴
          src={review.user.profile_img ? review.user.profile_img : defaultProfile}
          alt="user"
        />
      </div>
      {/* 유저관련 정보 아직 서버로부터 안들어옴 */}
      <div>{review.user.username ? review.user.username : 'user'}</div>
    </div>
  );
};

export default UserForPost;
