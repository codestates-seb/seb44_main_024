import ShortMovieList from '../UI/ShortMovieList';
import { movies } from '../../UI/datalist';

const MyReviews = () => {
  //더미데이터용. api 연결시 수정 예정
  const moviesToRender = movies.slice(0, 5);
  const reviewCounter = movies.length;

  return (
    <div>
      <div className="text-2xl font-semibold"> 내가 작성한 리뷰 </div>
      <div className="pb-12">
        {reviewCounter > 0 ? (
          <ShortMovieList movies={moviesToRender} />
        ) : (
          <div> 새로 리뷰를 작성해 보세요. </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
