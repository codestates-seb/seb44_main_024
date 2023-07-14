import Header from '../UI/Header';
import BoxOfficeMovies from '../UI/BoxOffice';
import HighRatings from '../UI/HighRatings';
import HighReviewCount from '../UI/HightReviewCount';

const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <BoxOfficeMovies />
      <HighRatings />
      <HighReviewCount />
    </div>
  );
};

export default Main;

/*     
별점 높은 순   - 영화 추천  data: { [title: string;
  releaseDate: string;
  rating: number;
  bookmarked: boolean;
  posterUrl: string;], }
리뷰 많은 순
장르
검색 결과(배우, 감독, 영화이름)
+(태그)




      */
