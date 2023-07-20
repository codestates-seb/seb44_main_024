import { useAppSelector } from '../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../redux-toolkit/slices/movieDetailSlice';
// interface windowWidthProps {
//   windowWidth: number;
// }
const MovieTitle = () => {
  const movieDetail = useAppSelector(selectMovieDetails);

  // css 스크롤 효과(아래 스크롤바가 생길때, 뷰포트를 조정)
  // let scrollbarHeight = 0;
  // if (windowWidth <= 697) {
  //   scrollbarHeight = window.innerHeight - document.documentElement.clientHeight + 14;
  // }
  return (
    // h-movieTitle -> 스크롤 높이만큼 제거된 height
    <div className="relative h-[60vh] w-full">
      {/* 메인이미지 있을시, 사용 */}
      {/* <img className="h-full w-full" src={movieDetail?.movie.posterUrl} alt="Main Img" /> */}
      <div className="h-full w-full bg-theme1" />
      <div className="absolute left-0 top-[36%] h-full w-full">
        <div className="mx-auto my-0 max-w-[1320px] px-10">
          <p className="mb-1 text-6xl font-bold text-white">{movieDetail?.movie.title}</p>
          <p className="mb-4 ml-1 text-lg text-white">{movieDetail?.movie.titleEng}</p>
          <p className="text-xl font-medium text-white">
            {movieDetail?.movie.repRlsDate} ·{' '}
            {movieDetail?.movie.genre.length !== 0 ? movieDetail?.movie.genre : '(장르)'} ·{' '}
            {movieDetail?.movie.nation.length !== 0 ? movieDetail?.movie.nation : '(국가)'}
          </p>
          <p className="text-xl font-medium text-white">
            {movieDetail?.movie.runtime.length !== 0
              ? movieDetail?.movie.runtime + '분'
              : '(상영시간)'}{' '}
            · {movieDetail?.movie.rating.length !== 0 ? movieDetail?.movie.rating : '(연령)'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
