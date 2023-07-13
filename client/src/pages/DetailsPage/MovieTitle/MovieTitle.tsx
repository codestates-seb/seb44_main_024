import { useAppSelector } from '../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../redux-toolkit/slices/movieDetailSlice';

const MovieTitle = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  return (
    <div className="relative h-[500px] w-full">
      <img
        className="h-full w-full object-cover"
        src={movieDetail?.movie.stills[0]}
        alt="Main Img"
      />
      <div className="absolute left-0 top-2/3 z-10 h-full w-full">
        <div className="z-20 mx-auto my-0 max-w-[1320px] px-10">
          <p className="text-4xl font-bold text-white">{movieDetail?.movie.title}</p>
          <p className="mb-4 font-semibold text-white">{movieDetail?.movie.titleEng}</p>
          <p className="font-medium text-white">
            {movieDetail?.movie.repRlsDate} · {movieDetail?.movie.genre} ·{' '}
            {movieDetail?.movie.nation}
          </p>
          <p className="font-medium text-white">
            {movieDetail?.movie.runtime}분 · {movieDetail?.movie.rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
