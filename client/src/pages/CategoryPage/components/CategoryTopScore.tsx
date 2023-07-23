import { useState, useEffect } from 'react';
import axios from 'axios';
import MoviePoster from '../../UI/MoivePoster';
import { useLocation } from 'react-router-dom';

interface Movie {
  title: string;
  docId: string;
  repRlsDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const CategoryTopScore: React.FC = () => {
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setisLoading] = useState(true);
  // debugging 반복
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const genreFromQuery = queryString.get('genre');
  const tagFromQuery = queryString.get('tag');
  //console.log(movies);

  console.log('queryString', queryString);
  console.log('genreFromQuery', genreFromQuery);
  console.log('tagFromQuery', tagFromQuery);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let endpoint =
          'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/category';

        // 장르 또는 태그 정보가 쿼리스트링에 있다면, 해당 정보로 요청하는 엔드포인트를 변경
        if (genreFromQuery) {
          endpoint = `http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/movies/genre?genre=${genreFromQuery}`;
        } else if (tagFromQuery) {
          endpoint = `http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/movies/tag?tag=#${tagFromQuery}`;
        } //encodeURIComponent(

        const response = await axios.get(endpoint);
        setisLoading(false);

        if (response.status === 200) {
          const data = response.data;
          const topscore = data.topScore;
          setMovies(topscore);
          console.log(data);
        } else {
          console.log('Failed to fetch movies:', response.data);
        }
      } catch (error) {
        console.log('Error:', error);
        setisLoading(false);
      }
    };

    fetchMovies();
  }, [genreFromQuery, tagFromQuery]);

  const handleShowMoreMovies = () => {
    setShowAllMovies(!showAllMovies);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderMovies = () => {
    const moviesToRender = showAllMovies ? movies : movies.slice(0, 5);
    return (
      <div className="flex flex-col">
        <h2 className="ml-5 mt-5 text-3xl font-medium">
          {genreFromQuery ? `${genreFromQuery} Top Score` : `#${tagFromQuery} Top Score`}
          {showAllMovies ? (
            <button className="ml-5 text-xl hover:bg-mainyellow" onClick={handleShowMoreMovies}>
              더보기 접기
            </button>
          ) : (
            <></>
          )}
        </h2>
        <div className="mx-10 -mb-4 flex flex-row flex-wrap justify-between p-2">
          {moviesToRender.map((movie, index) => (
            <MoviePoster
              key={index}
              movieId={movie.docId}
              title={movie.title}
              releaseDate={movie.repRlsDate}
              score={movie.score}
              bookmarked={movie.bookmarked}
              posterUrl={movie.posterUrl}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2">
      {renderMovies()}
      {!showAllMovies && movies.length > 5 && (
        <button className="mb-10 ml-24 text-2xl hover:bg-mainyellow" onClick={handleShowMoreMovies}>
          관련 영화 더보기
        </button>
      )}
    </div>
  );
};
export default CategoryTopScore;
