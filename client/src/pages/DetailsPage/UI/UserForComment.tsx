import profileImg from '../assets/profile.jpg';

const UserForComment = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2 h-9 w-9">
        <img className="rounded-full" src={profileImg} alt="yoda" />
      </div>
      <div>(유저 이름)</div>
    </div>
  );
};

export default UserForComment;
