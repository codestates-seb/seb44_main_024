import MoviePoster from '../../UI/MoivePoster';

interface movieListProps {
  movies: any;
}

interface MoviePosterProps {
  title: string;
  releaseDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const shortMovieList: React.FC<movieListProps> = ({ movies }) => {
  return (
    <div className="flex flex-row pb-6">
      {movies.map((movie: MoviePosterProps, index: number) => (
        <MoviePoster
          key={index}
          title={movie.title}
          releaseDate={movie.releaseDate}
          score={movie.score}
          bookmarked={movie.bookmarked}
          posterUrl={movie.posterUrl}
        />
      ))}
    </div>
  );
};

export default shortMovieList;
