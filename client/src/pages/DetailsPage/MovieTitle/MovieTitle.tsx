import { useAppSelector } from '../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../redux-toolkit/slices/movieDetailSlice';
interface windowWidthProps {
  windowWidth: number;
}
const MovieTitle = ({ windowWidth }: windowWidthProps) => {
  const movieDetail = useAppSelector(selectMovieDetails);

  // css 스크롤 효과(아래 스크롤바가 생길때, 뷰포트를 조정)
  let scrollbarHeight = 0;
  if (windowWidth <= 697) {
    scrollbarHeight = window.innerHeight - document.documentElement.clientHeight + 14;
  }
  return (
    <div className="relative w-full" style={{ height: `calc(100vh - ${90}px)` }}>
      <img
        className="w-full object-cover"
        style={{ height: `calc(100% - ${scrollbarHeight}px)` }}
        src={movieDetail?.movie.stills[0]}
        alt="Main Img"
      />
      <div className="absolute left-0 top-[55%] h-full w-full">
        <div className="mx-auto my-0 max-w-[1320px] px-10">
          <p className="mb-1 text-6xl font-bold text-white">{movieDetail?.movie.title}</p>
          <p className="mb-4 ml-1 text-lg text-white">{movieDetail?.movie.titleEng}</p>
          <p className="text-xl font-medium text-white">
            {movieDetail?.movie.repRlsDate.slice(0, 4)} · {movieDetail?.movie.genre} ·{' '}
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
