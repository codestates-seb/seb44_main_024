import { useEffect, useState } from 'react';
import ShortMovieList from '../UI/ShortMovieList';
import axios from 'axios';
import { getCookie } from '../../../utils/cookie';

interface MyReviewProps {
  reviews: any;
  setReview: any;
  reviewCounter: number;
  setReviewCount: any;
}

const MyReviews = ({ reviews, setReview, reviewCounter, setReviewCount }: MyReviewProps) => {
  // TODO: 페이지네이션 컴포넌트 만들고 페이지네이션으로 변경
  const token = getCookie('jwtToken');
  const [isLoading, setIsLoading] = useState(true);

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
          const response = res.data;
          const data = response.data;
          setReview(data);
          setReviewCount(reviews.length);
          console.log('data:', data);
          console.log('reviews: ', reviews);
          setIsLoading(false);
        } else {
          console.log('Failed to fetch review data:', res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, [reviewCounter]);

  if (isLoading) {
    return <div> Loading...</div>;
  }
  return (
    <div>
      <div className="text-2xl font-semibold"> 내가 작성한 리뷰 </div>
      <div className="flex items-center justify-center">
        {reviewCounter > 0 ? (
          <ShortMovieList movies={reviews} />
        ) : (
          <div className="pb-28 pt-24 text-xl opacity-80">아직 작성한 리뷰가 없어요.</div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
