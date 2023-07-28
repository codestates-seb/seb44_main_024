import { useState } from 'react';
import UserForComment from '../../UI/UserForComment';
import CommentForm from './CommentForm/CommentForm';

const Comment = () => {
  const [isEditExpandOpen, setIsEditExandOpen] = useState<boolean>(false);
  const prevCommentInput = '기존 댓글'; // 서버로부터 받아온 기존 댓글내용
  const expandEditOpenHandler: () => void = () => {
    setIsEditExandOpen(!isEditExpandOpen);
  };
  const handleCommentInputDelete = () => {
    // DELETE 요청 // 댓글 id 이용
  };
  return (
    <>
      <div className="flex items-center justify-between border-b border-solid border-slate-300 p-2">
        <div className="flex items-center">
          <UserForComment />
          <p className="ml-5 text-sm">(댓글 내용)</p>
        </div>
        {/* 수정 및 삭제버튼 쿠키의 유저정보(아마 id)와 해당 댓글의 유저id가 일치하는 경우에만 렌더링 */}
        <div className="flex">
          <button onClick={expandEditOpenHandler} className="mr-1.5 text-sm text-gray-400">
            수정
          </button>
          <button
            onClick={handleCommentInputDelete}
            className="p-1 text-sm text-red-500 hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      </div>
      {isEditExpandOpen && (
        <div className="mt-3">
          <CommentForm prevCommentInput={prevCommentInput} />
        </div>
      )}
    </>
  );
};

export default Comment;
