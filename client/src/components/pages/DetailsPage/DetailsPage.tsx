import MovieTitle from './MovieTitle/MovieTitle.tsx';
import MovieInfo from './MovieInfo/MovieInfo.tsx';
import Review from './Review/Review.tsx';

const DetailsPage = () => {
  return (
    <>
      <MovieTitle />
      <MovieInfo />
      <div className="mx-auto my-0 max-w-[1320px] p-8">
        <div className="mb-6 flex justify-between">
          <p className="text-xl font-semibold">리뷰 6개</p>
          <button className="w-24 rounded-lg bg-theme1 text-white">리뷰작성</button>
        </div>
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <p className="pt-5">비슷한 장르의 영화</p>

        {/* 컴포넌트로 들어갈 예정 */}
        <div className="flex justify-between">
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
