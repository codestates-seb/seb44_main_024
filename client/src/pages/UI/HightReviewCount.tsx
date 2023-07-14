import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import MoviePoster from './MoivePoster';
import { movies } from './datalist';

interface Movie {
  title: string;
  releaseDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const HighReviewCount: React.FC = () => {
  const [showAllMovies, setShowAllMovies] = useState(false);

  //영화 모음 데이터

  // const top5movies = movies.slice(0, 5);

  // 엔드포인트 제공시 쓸 코드
  // const [movies, setMovies] = useState<Movie[]>([]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await axios.get(''); //엔드포인트

  //       if (response.status === 200) {
  //         const data = response.data;
  //         const top5Movies = data.slice(0, 5);
  //         setMovies(top5Movies);
  //         console.log(data);
  //       } else {
  //         console.log('Failed to fetch movies:', response.data);
  //       }
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  const handleShowMoreMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  const renderMovies = () => {
    const moviesToRender = showAllMovies ? movies : movies.slice(0, 5);

    return (
      <div className="flex flex-col">
        <h2 className="ml-5 mt-5 text-3xl font-medium">
          리뷰 많은 순{' '}
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
              title={movie.title}
              releaseDate={movie.releaseDate}
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
export default HighReviewCount;
