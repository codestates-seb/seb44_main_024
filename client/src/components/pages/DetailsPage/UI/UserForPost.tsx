import profileImg from '../assets/profile.jpg';

const UserForPost = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2 h-12 w-12">
        <img className="rounded-full" src={profileImg} alt="yoda" />
      </div>
      <div>dongbin420</div>
    </div>
  );
};

export default UserForPost;
