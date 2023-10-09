import MovieInfoTop from './MovieInfoTop/MovieInfoTop';
import MovieInfoBottom from './MovieInfoBottom/MovieInfoBottom';

const MovieInfo = () => {
  return (
    <div className="">
      <div className="mx-auto my-0 max-w-[1320px] p-8">
        <MovieInfoTop />
        <MovieInfoBottom />
      </div>
    </div>
  );
};

export default MovieInfo;
