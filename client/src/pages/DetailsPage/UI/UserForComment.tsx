// 디폴트 프로필사진
const defaultProfile =
  'https://thebulletin.org/wp-content/themes/atomic-bulletin/resources/assets/images/person-dummy.jpg';

const UserForComment = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <img className="h-9 w-9 rounded-full" src={defaultProfile} alt="user" />
      </div>
      <div>(유저 이름)</div>
    </div>
  );
};

export default UserForComment;
