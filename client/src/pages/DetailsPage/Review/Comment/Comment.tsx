import UserForComment from '../../UI/UserForComment';

const Comment = () => {
  return (
    <div className="flex items-center border-b border-solid border-slate-300 p-2">
      <UserForComment />
      <p className="ml-5 text-sm">(댓글 내용)</p>
    </div>
  );
};

export default Comment;
