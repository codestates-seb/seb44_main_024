import { useState } from 'react';

interface PrevCommentInputProps {
  prevCommentInput?: string;
}

const CommentForm = ({ prevCommentInput }: PrevCommentInputProps) => {
  const [commentInput, setCommentInput] = useState(prevCommentInput ? prevCommentInput : '');

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  // 댓글작성 post 요청, 댓글수정 patch 요청
  const handleCommentInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prevCommentInput) {
      // PATCH 요청
    } else {
      // POST 요청
    }
  };
  console.log(commentInput);
  return (
    <form onSubmit={handleCommentInputSubmit} className="mb-3 flex w-full">
      <textarea
        value={commentInput}
        onChange={handleCommentInputChange}
        className="mr-3 grow resize-none border border-solid p-1 text-sm"
      ></textarea>
      <div className="flex items-center">
        <button type="submit" className="rounded-lg bg-theme1 px-5 py-1 text-white">
          {prevCommentInput ? '수정' : '등록'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
