import mainImg from '../assets/mockup-main-img.jpg';
import { useAppSelector } from '../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../redux-toolkit/slices/movieDetailSlice';

const MovieTitle = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  return (
    <div className="relative h-[500px] w-full">
      <img className="h-full w-full object-cover" src={mainImg} alt="Main Img" />
      <div className="absolute left-0 top-2/3 z-10 h-full w-full">
        <div className="z-20 mx-auto my-0 max-w-[1320px] px-10">
          <p className="text-4xl font-bold text-white">{movieDetail?.movie.title}</p>
          <p className="mb-4 font-semibold text-white">(영어제목)</p>
          <p className="font-medium text-white">(개봉년도) · {movieDetail?.movie.genre} · (국가)</p>
          <p className="font-medium text-white">{movieDetail?.movie.running_time} · (연령)</p>
        </div>
      </div>
    </div>
  );
};

export default MovieTitle;
