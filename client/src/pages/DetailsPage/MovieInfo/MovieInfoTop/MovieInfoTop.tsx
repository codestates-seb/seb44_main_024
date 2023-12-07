import { useAppSelector } from '../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../redux-toolkit/slices/movieDetailSlice';
import Person from '../../UI/Person';
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

const MovieInfoTop = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  return (
    <div className="mb-14 bp4:flex">
      <div className="shrink-0 bp4:mr-7">
        <img
          className="mb-4 h-[28rem] bp1:w-full"
          src={movieDetail?.movie.posterUrl}
          alt="Poster Img"
        />
        <a
          href={
            movieDetail?.movie.trailer
              ? movieDetail?.movie.trailer
              : `https://www.youtube.com/results?search_query=${
                  movieDetail?.movie.title + ' ' + 'trailer'
                }`
          }
          target="_blank"
          className="flex h-14 items-center justify-center rounded-xl bg-theme2 hover:bg-theme3 bp1:mb-7 bp1:w-full"
          rel="noreferrer"
        >
          <FaPlay className=" text-2xl text-theme4" />
        </a>
      </div>

      <div>
        <div className="mb-4 flex items-center">
          <p className="mr-3 text-2xl font-bold">평점</p>
          <AiFillStar className="mr-1 text-4xl text-theme1" />
          <p className="mr-2 text-3xl font-bold text-theme1">{movieDetail?.movie.score}</p>
          <p className="text-sm font-medium text-theme3">
            ({movieDetail?.pageInfo.totalElements}명)
          </p>
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
