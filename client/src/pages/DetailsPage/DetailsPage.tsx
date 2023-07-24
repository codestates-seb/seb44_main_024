import api from './assets/api/axiosInstance';
import { useAppSelector, useAppDispatch } from '../../redux-toolkit/hooks';
import { fetchMovieSuccess, selectMovieDetails } from '../../redux-toolkit/slices/movieDetailSlice';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MovieTitle from './MovieTitle/MovieTitle';
import MovieInfo from './MovieInfo/MovieInfo';
import Review from './Review/Review';
import ReviewModal from './UI/ReviewModal/ReviewModal';
import Pagination from './UI/Pagination';
import MoviePoster from '../UI/MoivePoster';
import ErrorPage from '../ErrorPage/ErrorPage';
import Spinner from '../../components/Spinner';
import { getCookie } from '../../utils/cookie'; // 로그인 기능 완성시 사용

const DetailsPage = () => {
  const isLoggedIn = Boolean(getCookie('jwtToken')); // 로그인 기능 완성시 사용
  const movieDetail = useAppSelector(selectMovieDetails);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  console.log(isLoggedIn);

  // 리액트 라우터 돔
  const { movieId } = useParams(); // 테스트용 임시 movieId: "F58480" (MoviePoster에서 링크 걸때까지)
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  // 페이지네이션
  const pageNumber = Number(page || 1); // 쿼리파라미터가 없는 경우에 default값 1
  const [totalReviews, setTotalReviews] = useState(0);

  // 해당 영화데이터 get 요청 // 예상 endpoint: `/movies/${movieId}?page=${pageNumber}`
  // `/mockupdata/moviedetails${pageNumber}.json` => 목업데이터
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await api.get(`/movies/${movieId}?page=${pageNumber}`);
        dispatch(fetchMovieSuccess(response.data));
        setTotalReviews(response.data.pageInfo.totalElements);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };
    fetchMovieDetail();
  }, [dispatch, pageNumber, movieId]);

  // 모달 열기, 닫기
  // 로그인 기능 완성시, 아래주석 삭제
  const openModal = () => {
    if (!isLoggedIn) {
      alert('로그인을 해주세요.');
    } else {
      setIsModalOpen(true);
    }
  };
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isError ? (
        <ErrorPage /> // (error메세지 상태 props로 넘기기? or not)
      ) : isLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <MovieTitle />
          {/* 영화정보 */}
          <MovieInfo />
          {/* 리뷰 */}
          <div className="mx-auto my-0 max-w-[1320px] p-8">
            <div className="mb-6 flex justify-between">
              <p className="text-xl font-medium">리뷰 {movieDetail?.pageInfo.totalElements}개</p>
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
          </div>
          {/* 추천영화 */}
          <div className="mx-auto my-0 max-w-[1320px] p-8">
            <p className="text-xl font-bold">비슷한 장르의 영화</p>
            <div className="flex justify-between">
              {movieDetail?.recommended_movies &&
                movieDetail?.recommended_movies.map((movie, index) => (
                  <MoviePoster
                    key={index}
                    title={movie.title}
                    releaseDate={movie.repRlsDate}
                    score={movie.score}
                    bookmarked={false}
                    posterUrl={movie.posterUrl}
                    movieId={movie.docId}
                  />
                ))}
            </div>
          </div>
          {/* 리뷰작성모달 */}
          {isModalOpen && <ReviewModal movieId={movieId} closeModal={closeModal} />}
        </>
      )}
    </>
  );
};

export default DetailsPage;
