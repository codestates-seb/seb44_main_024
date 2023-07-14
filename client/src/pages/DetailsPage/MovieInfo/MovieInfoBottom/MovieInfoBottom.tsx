import { useAppSelector } from '../../../../redux-toolkit/hooks';
import { selectMovieDetails } from '../../../../redux-toolkit/slices/movieDetailSlice';

const MovieInfoBottom = () => {
  const movieDetail = useAppSelector(selectMovieDetails);

  return (
    <div>
      <p className="mb-4 text-2xl font-bold">갤러리</p>
      <div className="flex justify-between">
        {movieDetail?.movie.stills.map((still, index) => (
          <div key={index} className="w-[300px]">
            <img
              className="h-full w-full duration-300 ease-in-out hover:scale-110"
              src={still}
              alt="still"
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieInfoBottom;
