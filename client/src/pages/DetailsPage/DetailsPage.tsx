// import api from './assets/api/axiosInstance'; // 백엔드서버로 보낼때 axios를 api로 바꾸기
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux-toolkit/hooks';
import { fetchMovieSuccess, selectMovieDetails } from '../../redux-toolkit/slices/movieDetailSlice';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux-toolkit/store';
import { useParams } from 'react-router-dom';
import MovieTitle from './MovieTitle/MovieTitle';
import MovieInfo from './MovieInfo/MovieInfo';
import Review from './Review/Review';
import CreateReviewModal from './UI/CreateReviewModal/CreateReviewModal';

const DetailsPage = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  // const isLoggedIn = useSelector((state: RootState) => state.login.value); // 로그인 기능 완성시 사용
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { movieId } = useParams();

  // 해당 영화데이터 get 요청 // 예상 endpoint: `/movies/{movieId}/page={page}`
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get('/mockupdata/moviedetails.json');
        dispatch(fetchMovieSuccess(response.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetail();
  }, [dispatch]);

  // 모달 열기, 닫기
  // 로그인 기능 완성시, 아래 주석 사용
  // const openModal = () => {
  //   if (!isLoggedIn) {
  //     alert('로그인을 해주세요.');
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      {isModalOpen && <CreateReviewModal movieId={movieId} closeModal={closeModal} />}
    </>
  );
};

export default DetailsPage;
