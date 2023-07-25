import { useAppSelector } from '../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../redux-toolkit/slices/movieDetailSlice';

const MovieTitle = () => {
  const movieDetail = useAppSelector(selectMovieDetails);

  return (
    // background img사용해서, absolute 사용할 필요 없어짐
    <div
      className={`flex w-full items-center ${movieDetail?.movie.backdrop ? '' : 'bg-theme1'} ${
        movieDetail?.movie.backdrop ? 'custom-height' : 'h-[50vh]'
      }`}
      style={{
        backgroundImage: movieDetail?.movie.backdrop
          ? `url(${movieDetail?.movie.backdrop})`
          : undefined,
        backgroundSize: movieDetail?.movie.backdrop ? 'cover' : undefined,
        backgroundPosition: movieDetail?.movie.backdrop ? 'center' : undefined,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className={`mx-auto drop-shadow-lg ${
          movieDetail?.movie.backdrop ? 'mt-60' : 'mt-32'
        }  w-[1320px] px-8 text-white`}
      >
        <p className="mb-1 text-7xl font-bold">{movieDetail?.movie.title}</p>
        <p className="mb-4 ml-1 text-xl">{movieDetail?.movie.titleEng}</p>
        <p className="text-2xl font-medium">
          {movieDetail?.movie.repRlsDate} ·{' '}
          {movieDetail?.movie.genre.length !== 0 ? movieDetail?.movie.genre : '(장르)'} ·{' '}
          {movieDetail?.movie.nation.length !== 0 ? movieDetail?.movie.nation : '(국가)'}
        </p>
        <p className="text-2xl font-medium">
          {movieDetail?.movie.runtime.length !== 0
            ? movieDetail?.movie.runtime + '분'
            : '(상영시간)'}{' '}
          · {movieDetail?.movie.rating.length !== 0 ? movieDetail?.movie.rating : '(연령)'}
        </p>
      </div>
    </div>
  );
};

export default MovieTitle;
