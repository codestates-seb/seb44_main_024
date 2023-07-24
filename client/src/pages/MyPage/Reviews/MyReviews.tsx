import { useEffect, useState } from 'react';
import ShortMovieList from '../UI/ShortMovieList';
import axios from 'axios';
import { getCookie } from '../../../utils/cookie';
// import { movies } from '../../UI/datalist';

interface MyReviewProps {
  reviewCounter: number;
  setReviewCount: any;
}

const MyReviews = ({ reviewCounter, setReviewCount }: MyReviewProps) => {
  // TODO: 페이지네이션 컴포넌트 만들고 페이지네이션으로 변경
  const token = getCookie('jwtToken');
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/members/reviews?page=1',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const data = res.data;
          setReview(data);
          setReviewCount(reviews.length);
        } else {
          console.log('Failed to fetch review data:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, []);

  const moviesToRender = reviews;
  // api 연결시 수정 예정 코드
  // const temp: string[] = [];
  // const reviewList = [...temp];

  return (
    <div>
      <div className="text-2xl font-semibold"> 내가 작성한 리뷰 </div>
      <div className="flex items-center justify-center">
        {reviewCounter > 0 ? (
          <ShortMovieList movies={moviesToRender} />
        ) : (
          <div className="pb-28 pt-24 text-xl opacity-80">아직 작성한 리뷰가 없어요.</div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
