import ShortMovieList from '../UI/ShortMovieList';
// import { movies } from '../../UI/datalist';

const MyReviews = () => {
  // TODO: 페이지네이션 컴포넌트 만들고 페이지네이션으로 변경
  // api 연결시 수정 예정 코드
  const temp: string[] = [];
  const reviewList = [...temp];
  const moviesToRender = reviewList.slice(0, 5);
  const reviewCounter = reviewList.length;

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
