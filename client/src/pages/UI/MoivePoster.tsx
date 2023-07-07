import React, { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface MoviePosterProps {
  title: string;
  releaseDate: string;
  rating: number;
  bookmarked: boolean;
  posterUrl: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({
  title,
  releaseDate,
  rating,
  bookmarked,
  posterUrl,
}) => {
  const year = releaseDate.substring(releaseDate.length - 4, releaseDate.length); // 연도만 추출
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prevBookmarked) => !prevBookmarked);
  };
  console.log(isBookmarked);

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const renderRatingStars = () => {
    const roundedRating = Math.floor(rating / 2); // 9 => 9 /2 => 4.5
    const stars = [];
    console.log(roundedRating);

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        //roundedrating = 8
        stars.push(
          <BsStarFill
            key={i}
            className="inline text-yellow-400"
            size={16}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      } else if (i === roundedRating && (rating / 2) % 1 >= 0.5) {
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
            className="inline text-gray-400"
            size={16}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className=" relative m-5 h-56 w-60 border">
      <img src={posterUrl} alt={title} className="h-full w-full" />
      <button className="absolute right-2 top-2 cursor-pointer" onClick={handleBookmarkToggle}>
        {isBookmarked ? (
          <BsStarFill className="h-6 w-6 text-yellow-400" />
        ) : (
          <BsStar className="h-6 w-6 text-gray-400" />
        )}
      </button>

      <div className="flex flex-row  ">
        <h2 className="mt-2  text-left text-lg font-bold">{title}</h2>
        <p className="ml-1 mt-4 text-sm  text-gray-700">{year}</p>
      </div>
      <div className="mb-10 flex items-center">
        {renderRatingStars()}
        {hoverRating && <span className="ml-2 text-sm text-gray-600">{rating}</span>}
      </div>
    </div>
  );
};

export default MoviePoster;
