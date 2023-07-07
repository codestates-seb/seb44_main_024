import { useAppSelector, useAppDispatch } from '../../redux-toolkit/hooks';
import { fetchMovieSuccess, selectMovieDetails } from '../../redux-toolkit/slices/movieDetailSlice';
import { useEffect, useState } from 'react';
import { getMovies } from './assets/api/movieApi';
import MovieTitle from './MovieTitle/MovieTitle';
import MovieInfo from './MovieInfo/MovieInfo';
import Review from './Review/Review';
import CreateReviewModal from './UI/CreateReviewModal';

const DetailsPage = () => {
  const dispatch = useAppDispatch();
  const movieDetail = useAppSelector(selectMovieDetails);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovies();
        dispatch(fetchMovieSuccess(movieData));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(movieDetail);

  return (
    <>
      <MovieTitle />
      <MovieInfo />
      <div className="mx-auto my-0 max-w-[1320px] p-8">
        <div className="mb-6 flex justify-between">
          <p className="text-xl font-semibold">리뷰 {movieDetail?.movie.review_count}개</p>
          <button onClick={openModal} className="w-24 rounded-lg bg-theme1 text-white">
            리뷰작성
          </button>
        </div>

        {movieDetail?.review.rev.map((review, index) => {
          return <Review key={index} review={review} />;
        })}

        <p className="pt-5">비슷한 장르의 영화</p>

        {/* 컴포넌트로 들어갈 예정 */}
        <div className="flex justify-between">
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
          <div>영화</div>
        </div>
      </div>
      {isModalOpen && <CreateReviewModal />}
    </>
  );
};

export default DetailsPage;
