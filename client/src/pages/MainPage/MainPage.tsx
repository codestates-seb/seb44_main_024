import BoxOfficeMovies from '../UI/BoxOffice';
import HighRatings from '../UI/HighRatings';
import HighReviewCount from '../UI/HightReviewCount';

const MainPage: React.FC = () => {
  return (
    <div>
      <BoxOfficeMovies />
      <HighRatings />
      <HighReviewCount />
    </div>
  );
};

export default MainPage;
