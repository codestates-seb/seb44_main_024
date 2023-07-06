import Tag from '../../UI/Tag.tsx';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';

const ReviewBottom = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <Tag />
        <Tag />
        <Tag />
      </div>
      <div className="flex text-lg">
        <div className="mr-3.5 flex items-center ">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbUp className="cursor-pointer" />
          </div>

          <div>20</div>
        </div>
        <div className="flex items-center">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbDown className="cursor-pointer" />
          </div>
          <div>1</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBottom;
