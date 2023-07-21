import ShortMovieList from '../UI/ShortMovieList';
import { movies } from '../../UI/datalist';

const MyBookmarks = () => {
  // 새로운 페이지로 분리하기?
  // api 연결 후 수정
  const bookmarkList = [...movies];
  const moviesToRender = bookmarkList.slice(0, 5);
  const bookmarksCounter = bookmarkList.length;

  return (
    <div>
      <div className="text-2xl font-semibold"> 나의 북마크 </div>
      <div className="flex items-center justify-center">
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
