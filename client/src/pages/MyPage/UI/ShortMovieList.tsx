import MoviePoster from '../../UI/MoivePoster';

interface movieListProps {
  movies: any;
}

interface MoviePosterProps {
  movie: {
    docId: string;
    title: string;
    releaseDate: string;
    score: number;
    bookmarked: boolean;
    posters: string;
  };
}

const shortMovieList: React.FC<movieListProps> = ({ movies }) => {
  return (
    <div className="flex flex-row pb-6">
      {movies.map((movie: MoviePosterProps, index: number) => (
        <MoviePoster
          key={index}
          movieId={movie.movie.docId}
          title={movie.movie.title}
          releaseDate={movie.movie.releaseDate}
          score={movie.movie.score}
          bookmarked={movie.movie.bookmarked}
          posterUrl={movie.movie.posters}
        />
      ))}
    </div>
  );
};

export default shortMovieList;
