import { useState } from 'react';
import Tag from '../../UI/Tag.tsx';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { ReviewProps } from '../Review.tsx';

const ReviewBottom = ({ review }: ReviewProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false); // 나중에 실제 로그인 상태 이용
  const [likes, setLikes] = useState<number>(review.like);

  const handleLike: () => void = () => {
    if (!isLogin) {
      alert('로그인을 해주세요');
    } else {
      setLikes((prev) => prev + 1);
    }
  };
  return (
    <div className="flex justify-between">
      <div className="flex">
        {review.tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </div>
      <div className="flex text-lg">
        <div className="mr-3.5 flex items-center ">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbUp onClick={handleLike} className="cursor-pointer" />
          </div>

          <div>{likes}</div>
        </div>
        <div className="flex items-center">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbDown className="cursor-pointer" />
          </div>
          <div>(싫어요 개수)</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBottom;
