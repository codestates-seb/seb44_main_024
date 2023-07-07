import MoviePoster from '../UI/MoivePoster';

const movie = {
  title: 'Avengers: Endgame',
  releaseDate: '2019',
  rating: 8.4,
  bookmarked: true,
  posterUrl: 'https://m.media-amazon.com/images/I/91zzAMkVCUL._AC_UF894,1000_QL80_.jpg',
};

const Main = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded bg-white p-8 shadow">
        <MoviePoster
          title={movie.title}
          releaseDate={movie.releaseDate}
          rating={movie.rating}
          bookmarked={movie.bookmarked}
          posterUrl={movie.posterUrl}
        />
      </div>
    </div>
  );
};

export default Main;
