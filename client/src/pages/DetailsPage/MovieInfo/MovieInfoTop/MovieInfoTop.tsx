import { useAppSelector } from '../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../redux-toolkit/slices/movieDetailSlice';
import Person from '../../UI/Person';
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

const MovieInfoTop = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  return (
    <div className="mb-14 flex">
      <div className="mr-7 shrink-0">
        <img className=" mb-4 h-[28rem]" src={movieDetail?.movie.posterUrl} alt="Poster Img" />
        <a
          href={`https://www.youtube.com/results?search_query=${
            movieDetail?.movie.title + ' ' + 'trailer'
          }`}
          target="_blank"
          className="flex h-14 w-full items-center justify-center rounded-xl bg-theme1 hover:bg-yellow-200"
          rel="noreferrer"
        >
          <FaPlay className=" text-2xl text-white" />
        </a>
      </div>

      <div>
        <div className="mb-4 flex items-center">
          <p className="mr-3 text-2xl font-bold">평점</p>
          <AiFillStar className="mr-1 text-4xl text-theme1" />
          <p className="mr-2 text-3xl font-bold text-theme1">{movieDetail?.movie.score}</p>
          <p className="text-sm font-medium text-theme3">({movieDetail?.movie.review_count}명)</p>
        </div>
        <p className="mb-5 font-semibold text-theme3">{movieDetail?.movie.description}</p>
        <p className="mb-4 text-2xl font-bold">감독</p>
        <Person name={movieDetail?.movie.directorNm} />
        <p className="mb-4 mt-5 text-2xl font-bold">출연</p>
        <div className="flex flex-wrap">
          {movieDetail?.movie.actors.map((actor, index) => {
            return <Person key={index} name={actor.actor} role={actor.role} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieInfoTop;
