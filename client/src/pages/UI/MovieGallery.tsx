import MoviePoster from './MoivePoster';

interface Category {
  name: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  releaseDate: string;
  rating: number;
  bookmarked: boolean;
  posterUrl: string;
}

interface MovieGalleryProps {
  categories: Category[];
}

const MovieGallery: React.FC<MovieGalleryProps> = ({ categories }) => {
  const sortByRatingDescending = (movies: Movie[]): Movie[] => {
    return movies.sort((a, b) => b.rating - a.rating);
  };

  return (
    <div>
      {categories.map((category) => {
        const sortedMovies = sortByRatingDescending(category.movies);

        return (
          <div key={category.name}>
            <h2 className="border p-2 text-3xl font-bold">{category.name}</h2>
            <div className="flex flex-row">
              {sortedMovies.slice(0, 5).map((movie) => (
                <MoviePoster
                  key={movie.title}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  rating={movie.rating}
                  bookmarked={movie.bookmarked}
                  posterUrl={movie.posterUrl}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieGallery;
