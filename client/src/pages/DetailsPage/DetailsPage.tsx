// import api from './assets/api/axiosInstance'; // 백엔드서버로 보낼때 axios를 api로 바꾸기
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux-toolkit/hooks';
import { fetchMovieSuccess, selectMovieDetails } from '../../redux-toolkit/slices/movieDetailSlice';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'; // 로그인 기능 완성시 사용
// import { RootState } from '../../redux-toolkit/store'; // 로그인 기능 완성시 사용
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import MovieTitle from './MovieTitle/MovieTitle';
import MovieInfo from './MovieInfo/MovieInfo';
import Review from './Review/Review';
import CreateReviewModal from './UI/CreateReviewModal/CreateReviewModal';

const DetailsPage = () => {
  const movieDetail = useAppSelector(selectMovieDetails);
  // const isLoggedIn = useSelector((state: RootState) => state.login.value); // 로그인 기능 완성시 사용
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  // 리액트 라우터 돔
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageNumber = Number(page || 1); // 쿼리파라미터가 없는 경우에 default값 1

  // 페이지네이션
  const [pageWindow, setPageWindow] = useState([1, 2, 3, 4, 5]);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewPerPage = 5;
  const totalPages = Math.ceil(totalReviews / reviewPerPage);
  const nextPages = () => {
    const newPageWindow = pageWindow.map((page) => page + 5);
    setPageWindow(newPageWindow);
    navigate(`/movies/${movieId}?page=${newPageWindow[0]}`);
  };
  const previousPages = () => {
    const newPageWindow = pageWindow.map((page) => page - 5);
    setPageWindow(newPageWindow);
    navigate(`/movies/${movieId}?page=${newPageWindow[4]}`);
  };

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

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
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

            <div className="flex justify-center text-3xl">
              {pageNumber > 5 && (
                <button className="mr-3 text-xl" onClick={previousPages}>
                  &lt;
                </button>
              )}
              {pageWindow.map(
                (page) =>
                  page <= totalPages && (
                    <Link
                      key={page}
                      to={`/movies/${movieId}?page=${page}`}
                      className={`px-2 ${pageNumber === page ? 'rounded-full bg-yellow-200' : ''}`}
                    >
                      {page}
                    </Link>
                  )
              )}
              {totalPages > 5 && totalPages > pageWindow[4] && (
                <button className="ml-3 text-xl" onClick={nextPages}>
                  &gt;
                </button>
              )}
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

          {isModalOpen && <CreateReviewModal movieId={movieId} closeModal={closeModal} />}
        </>
      )}
    </>
  );
};

export default DetailsPage;
