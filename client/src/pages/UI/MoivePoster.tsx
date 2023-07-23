import React, { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface MoviePosterProps {
  movieId: string;
  title: string;
  releaseDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({
  movieId,
  title,
  releaseDate,
  score,
  bookmarked,
  posterUrl,
}) => {
  // const year = releaseDate.substring(0, 4); // 연도만 추출(releaseDate.length - 4, releaseDate.length);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prevBookmarked) => !prevBookmarked);
  };

  const [hoverscore, setHoverscore] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverscore(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverscore(null);
  };

  const renderscoreStars = () => {
    const roundedscore = Math.floor(score); // 9 => 9 /2 => 4.5
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < roundedscore) {
        //roundedscore = 8
        stars.push(
          <BsStarFill
            key={i}
            className="inline text-yellow-400"
            size={16}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else if (i === roundedscore && score % 1 >= 0.5) {
        //0.5 있으니 반별추가...
        stars.push(
          <BsStarHalf
            key={i}
            className="inline text-yellow-400"
            size={16}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else {
        stars.push(
          <BsStarFill
            key={i}
            className="inline text-gray-200"
            size={16}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      }
    }

    return stars;
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex w-1/5 overflow-hidden " key={movieId}>
      <div className=" relative m-5 h-3/4 w-10/12 ">
        <Link to={`/movies/${movieId}`} onClick={handleClick}>
          <img src={posterUrl} alt={title} className="h-full w-full" />
        </Link>

        <button className="absolute right-2 top-2 cursor-pointer" onClick={handleBookmarkToggle}>
          {isBookmarked ? (
            <BsStarFill className="mr-0.5 mt-0.5 h-6 w-6 text-yellow-400" />
          ) : (
            <BsStar className="mr-0.5 mt-0.5 h-6 w-6 text-gray-400" />
          )}
        </button>

        <div className="flex flex-row  ">
          <h2 className="mt-2 truncate text-left text-lg font-bold">{title}</h2>
          <p className="ml-1 mt-4 text-sm  text-gray-700">{releaseDate}</p>
        </div>
        <div className="mb-10 flex">
          {renderscoreStars()}
          {hoverscore && <span className="ml-2 text-sm text-gray-600">{score}</span>}
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
