import { useState } from 'react';
import Tag from '../../UI/Tag';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { ReviewProps } from '../Review';

const ReviewBottom = ({ review }: ReviewProps) => {
  // const [isLogin, setIsLogin] = useState<boolean>(false); // 나중에 실제 로그인 상태 이용
  const [likes, setLikes] = useState<number>(review.like); // 리다이렉트를 사용하면, 상태를 이렇게 수동으로 변경하지 않아도 될 수도..

  const handleLike: () => void = () => {
    setLikes((prev) => prev + 1);
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
