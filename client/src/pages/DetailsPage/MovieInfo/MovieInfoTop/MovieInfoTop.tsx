import { useAppSelector } from '../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../redux-toolkit/slices/movieDetailSlice';
import Person from '../../UI/Person';
import directorImg from '../../assets/director-img.jpg';
import actress1Img from '../../assets/actress-1.jpg';
import actor1Img from '../../assets/actor-1.jpg';
import { AiFillStar } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

// 감독, 배우 이미지 api에 없어서 수동으로 넣음.
const people = [directorImg, actress1Img, actor1Img];

const MovieInfoTop = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  return (
    <div className="mb-5 flex">
      <div className="mr-7 shrink-0">
        <img className=" mb-4 h-[400px]" src={movieDetail?.movie.posterUrl} alt="Poster Img" />
        <a
          href="https://www.youtube.com/watch?v=ByXuk9QqQkk"
          className="flex h-14 w-full items-center justify-center rounded-xl bg-theme1"
        >
          <FaPlay className=" text-2xl text-white" />
        </a>
      </div>

      <div>
        <div className="mb-5 flex items-center">
          <p className="mr-3">평균 별점</p>
          <AiFillStar className="mr-1 text-4xl text-theme1" />
          <p className="mr-2">{movieDetail?.movie.score}</p>
          <p className="text-sm">({movieDetail?.movie.review_count}명)</p>
        </div>
        <p className="mb-5">{movieDetail?.movie.description}</p>
        <p className="mb-1">감독</p>
        <Person name={movieDetail?.movie.directorNm} img={people[0]} />
        <p className="mb-1 mt-5">출연</p>
        <div className="flex">
          {movieDetail?.movie.actors.map((actor, index) => {
            return <Person key={index} name={actor.actor} img={people[1]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieInfoTop;
