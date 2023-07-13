// import api from '../../assets/api/axiosInstance'; // 백엔드 서버로 보낼때 바꾸기
import axios from 'axios';
import { useState } from 'react';
// import { useSelector } from 'react-redux'; // 로그인 기능 완성시 사용
// import { RootState } from '../../../../redux-toolkit/store'; // 로그인 기능 완성시 사용
import Tag from '../../UI/Tag';
import { MdOutlineThumbUp } from 'react-icons/md';
import { ReviewProps } from '../Review';

const ReviewBottom = ({ review }: ReviewProps) => {
  // const isLoggedIn = useSelector((state: RootState) => state.login.value); // 로그인 기능 완성시 사용
  const [likes, setLikes] = useState<number>(review.like); // 리다이렉트를 사용하면, 상태를 이렇게 수동으로 변경하지 않아도 될 수도..

  // 좋아요 클릭 post 요청 // 예상 endpoint: `/review/{review-id}/likes`
  // 로그인 기능 완성시 아래주석 사용
  // const likeClickHandler = async () => {
  //   if (!isLoggedIn) {
  //     alert('로그인을 해주세요.');
  //   } else {
  //     try {
  //       const response = await axios.post(
  //         'https://032b9d6f-98f0-429c-ae1e-76363c379d20.mock.pstmn.io',
  //         {},
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             // Authorization: `Bearer ${token}`
  //           },
  //         }
  //       );
  //       console.log(response);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     setLikes((prev) => prev + 1);
  //   }
  // };

  const likeClickHandler = async () => {
    try {
      const response = await axios.post(
        'https://032b9d6f-98f0-429c-ae1e-76363c379d20.mock.pstmn.io',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setLikes((prev) => prev + 1);
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-wrap gap-1">
        {review.tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </div>
      <div className="flex text-lg">
        <div className="mr-3.5 flex items-center ">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbUp onClick={likeClickHandler} className="cursor-pointer" />
          </div>
          <div>{likes}</div>
        </div>

        {/* 싫어요 기능 제거 */}
        {/* <div className="flex items-center">
          <div className="rounded-full p-2 hover:bg-yellow-100">
            <MdOutlineThumbDown className="cursor-pointer" />
          </div>
          <div>(싫어요 개수)</div>
        </div> */}
      </div>
    </div>
  );
};

export default ReviewBottom;
