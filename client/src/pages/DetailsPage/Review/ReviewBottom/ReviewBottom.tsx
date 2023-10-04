import api from '../../assets/api/axiosInstance';
// import { useState } from 'react';
import Tag from '../../UI/Tag';
import { MdOutlineThumbUp } from 'react-icons/md';
import { ReviewProps } from '../Review';
import { getCookie } from '../../../../utils/cookie'; // 로그인 기능 완성시 사용

const ReviewBottom = ({ review }: ReviewProps) => {
  const isLoggedIn = Boolean(getCookie('jwtToken')); // 로그인 기능 완성시 사용
  const token = getCookie('jwtToken');
  // const [likes, setLikes] = useState<number>(review.likes); // 좋아요 요청만 요청 성공시 상태 변경(페이지 리프레쉬 -> 사용자경험에 좋지않음)
  // 처음 likes가져와서 렌더링 하는 과정에서 상태가 변경되지 않는거같음 그래서 그냥 일단 refresh하는걸로

  // 좋아요 클릭 post 요청 // 예상 endpoint: `/review/{review-id}/likes`
  // 로그인 기능 완성시 사용
  // 같은 유저가 같은 리뷰 좋아요 두 번 눌렀을때의 로직 고민해봐야함.
  const likeClickHandler = async () => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요.');
    } else {
      try {
        const response = await api.post(
          `/review/${review.reviewId}/likes`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // 이걸 보내야하는지 안보내도 되는지 모르겠음
            },
          }
        );
        console.log(response);
        window.location.reload();
        // setLikes((prev) => prev + 1);
      } catch (err) {
        console.error(err);
        alert('에러가 발생했습니다. 다시 시도하거나 새로고침 해주세요: ' + err);
      }
    }
  };

  // const likeClickHandler = async () => {
  //   try {
  //     const response = await api.post(
  //       `/review/${review.reviewId}/likes`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setLikes((prev) => prev + 1);
  //   } catch (err) {
  //     console.error(err);
  //     alert('에러가 발생했습니다. 다시 시도해주세요: ' + err);
  //   }
  // };

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
          <div>{review.likes}</div>
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
