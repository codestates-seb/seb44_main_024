// import api from '../DetailsPage/assets/api/axiosInstance'; // 백엔드서버로 보낼때 axios를 api로 바꾸기
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';
import MoviePoster from '../UI/MoivePoster';
import { Recommend } from '../DetailsPage/assets/types/movieTypes'; // 실제 데이터 들어오는거보고 수정 필요
import searchErrImg from './assets/searchErr.png';

const SearchPage = () => {
  const [searchData, setSearchData] = useState<Recommend[]>([]);
  const [highScoreData, setHighScoreData] = useState<Recommend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Header.tsx 컴포넌트에서 검색시, 유저가 입력한 검색키워드와 함께 Link를 걸어줘야함. => `/search?keyword=${keyword input}`
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  console.log(keyword);

  // 해당 검색데이터 get 요청 // 예상 endpoint: `/search/keyword={keyword}`
  // 검색데이터 없을 시(빈 배열), 추천영화(별점높은 순) get 요청 // 예상 endpoint: `/main` // '/main'은 데이터 여러개 들어오므로, 별점 높은순 데이터만 잘라서 사용해야함. (별점 높은순으로 5개만 사용)
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const searchResponse = await axios.get(`/mockupdata/searchdata.json`);
        const highScoreResponse = await axios.get(`/mockupdata/highscoredata.json`);

        setSearchData(searchResponse.data.data);
        setHighScoreData(highScoreResponse.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchSearchData();
  }, []);

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : isLoading ? (
        <></>
      ) : (
        <div className="p-10">
          <p className="mb-6 mt-2 text-center text-5xl font-semibold">&quot;{keyword}&quot;</p>
          {/* 검색결과가 없을때 */}
          {searchData.length === 0 ? (
            <>
              <div className="mb-20 flex items-center justify-center">
                <img src={searchErrImg} alt="search error" />
              </div>
              <p className="mb-2 text-3xl font-bold">이런영화는 어떠세요?</p>
              <div className="flex justify-between">
                {highScoreData.map((movie, index) => (
                  <MoviePoster
                    key={index}
                    title={movie.title}
                    releaseDate={movie.repRlsDate}
                    score={movie.score}
                    bookmarked={false}
                    posterUrl={movie.posterUrl}
                    // MoviePoster props에 movieId={movie.docId}도 들어가야함. link걸어줄라면
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* 검색결과가 있을때 */}
              <p className="mb-2 text-2xl font-bold">검색 결과</p>
              <div className="mb-20 flex flex-wrap justify-between">
                {searchData.map((movie, index) => (
                  <MoviePoster
                    key={index}
                    title={movie.title}
                    releaseDate={movie.repRlsDate}
                    score={movie.score}
                    bookmarked={false}
                    posterUrl={movie.posterUrl}
                    // MoviePoster props에 movieId={movie.docId}도 들어가야함. link걸어줄라면
                  />
                ))}
              </div>
              <p className="mb-2 text-3xl font-bold">이런영화는 어떠세요?</p>
              <div className="flex justify-between">
                {highScoreData.map((movie, index) => (
                  <MoviePoster
                    key={index}
                    title={movie.title}
                    releaseDate={movie.repRlsDate}
                    score={movie.score}
                    bookmarked={false}
                    posterUrl={movie.posterUrl}
                    // MoviePoster props에 movieId={movie.docId}도 들어가야함. link걸어줄라면
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
