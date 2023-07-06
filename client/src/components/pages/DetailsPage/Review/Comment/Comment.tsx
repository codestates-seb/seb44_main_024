import UserForPost from '../../UI/UserForPost.tsx';

const Comment = () => {
  return (
    <div className="flex items-center border-b border-solid border-slate-300 p-2">
      <UserForPost />
      <p className="ml-5 text-sm">공감합니다!</p>
    </div>
  );
};

export default Comment;
