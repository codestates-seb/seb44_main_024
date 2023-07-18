import UserForComment from '../../UI/UserForComment';

const Comment = () => {
  return (
    <div className="flex items-center justify-between border-b border-solid border-slate-300 p-2">
      <div className="flex items-center">
        <UserForComment />
        <p className="ml-5 text-sm">(댓글 내용)</p>
      </div>

      <div className="flex">
        <button className="mr-1.5 text-sm text-gray-400">수정</button>
        <button className="p-1 text-sm text-red-500 hover:bg-red-50">삭제</button>
      </div>
    </div>
  );
};

export default Comment;
