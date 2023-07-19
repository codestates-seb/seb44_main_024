import ShortMovieList from '../UI/ShortMovieList';
import { movies } from '../../UI/datalist';

const MyBookmarks = () => {
  // api 연결 후 수정할 부분
  const moviesToRender = movies.slice(0, 5);
  const bookmarksCounter = movies.length;

  return (
    <div>
      <div> 나의 북마크 </div>
      <div>
        {bookmarksCounter > 0 ? (
          <ShortMovieList movies={moviesToRender} />
        ) : (
          <div> 새로 리뷰를 작성해 보세요. </div>
        )}
      </div>
    </div>
  );
};

export default MyBookmarks;
