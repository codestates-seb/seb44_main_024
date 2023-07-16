// import api from './assets/api/axiosInstance'; // 백엔드서버로 보낼때 axios를 api로 바꾸기
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux-toolkit/hooks';
import { fetchMovieSuccess, selectMovieDetails } from '../../redux-toolkit/slices/movieDetailSlice';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'; // 로그인 기능 완성시 사용
// import { RootState } from '../../redux-toolkit/store'; // 로그인 기능 완성시 사용
import { useParams, useSearchParams } from 'react-router-dom';
import MovieTitle from './MovieTitle/MovieTitle';
import MovieInfo from './MovieInfo/MovieInfo';
import Review from './Review/Review';
import ReviewModal from './UI/ReviewModal/ReviewModal';
import Pagination from './UI/Pagination';

const DetailsPage = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  // const isLoggedIn = useSelector((state: RootState) => state.login.value); // 로그인 기능 완성시 사용
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  // 리액트 라우터 돔
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  // 페이지네이션
  const pageNumber = Number(page || 1); // 쿼리파라미터가 없는 경우에 default값 1
  const [totalReviews, setTotalReviews] = useState(0);

  // 해당 영화데이터 get 요청 // 예상 endpoint: `/movies/{movieId}/page={pageNumber}`
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`/mockupdata/moviedetails${pageNumber}.json`);
        dispatch(fetchMovieSuccess(response.data));
        setTotalReviews(response.data.movie.review_count);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetail();
  }, [dispatch, pageNumber]);

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

  // css 스크롤 효과
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <MovieTitle windowWidth={windowWidth} />
          <div
            className="absolute bottom-0 left-0 z-10 w-full bg-white" //  duration-500 ease-out 고민
            style={{ height: `${scrollPosition}px` }}
          >
            <MovieInfo />
            <div className="mx-auto my-0 max-w-[1320px] p-8">
              <div className="mb-6 flex justify-between">
                <p className="text-xl font-medium">리뷰 {movieDetail?.movie.review_count}개</p>
                <button
                  onClick={openModal}
                  className="w-24 rounded-lg bg-theme1 text-white hover:bg-yellow-200"
                >
                  리뷰등록
                </button>
              </div>
              {movieDetail?.movie.reviews.map((review, index) => {
                return <Review key={index} review={review} />;
              })}
              <div className="flex justify-center text-3xl">
                <Pagination totalReviews={totalReviews} movieId={movieId} pageNumber={pageNumber} />
              </div>
              {/* 컴포넌트로 들어갈 예정 */}
              <p className="pt-5">비슷한 장르의 영화</p>
              <div className="flex justify-between">
                <div>영화</div>
                <div>영화</div>
                <div>영화</div>
                <div>영화</div>
                <div>영화</div>
              </div>
            </div>
            {isModalOpen && <ReviewModal movieId={movieId} closeModal={closeModal} />}
          </div>
        </>
      )}
    </>
  );
};

export default DetailsPage;
