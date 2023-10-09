import MovieRecommend from '../UI/MovieRecommend';
import CategorymostReview from './components/CategoryMostReview';
import CategoryTopScore from './components/CategoryTopScore';

const CategoryPage = () => {
  return (
    <div>
      <CategoryTopScore />
      <CategorymostReview />
      <MovieRecommend />
    </div>
  );
};

export default CategoryPage;
