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
    // h-movieTitle
    <div className="relative h-[60vh] w-full">
      {/* <img className="h-full w-full" src={movieDetail?.movie.posterUrl} alt="Main Img" /> */}
      <div className="h-full w-full bg-theme1" />
      <div className="absolute left-0 top-[40%] h-full w-full">
        <div className="mx-auto my-0 max-w-[1320px] px-10">
          <p className="mb-1 text-6xl font-bold text-white">{movieDetail?.movie.title}</p>
          <p className="mb-4 ml-1 text-lg text-white">{movieDetail?.movie.titleEng}</p>
          <p className="text-xl font-medium text-white">
            {movieDetail?.movie.repRlsDate} · {movieDetail?.movie.genre} ·{' '}
            {movieDetail?.movie.nation}
          </p>
          <p className="text-xl font-medium text-white">
            {movieDetail?.movie.runtime}분 · {movieDetail?.movie.rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
