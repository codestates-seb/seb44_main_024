import MovieInfoTop from './MovieInfoTop/MovieInfoTop.tsx';
import MovieInfoBottom from './MovieInfoBottom/MovieInfoBottom.tsx';

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
