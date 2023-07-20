import api from '../DetailsPage/assets/api/axiosInstance'; // 백엔드서버로 보낼때 axios를 api로 바꾸기
// import axios from 'axios';
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
  console.log(typeof keyword);

  // 해당 검색데이터 get 요청 // 예상 endpoint: `/search?keyword=${keyword}`
  // 목업 데이터 `/mockupdata/searchdata.json`
  // 위의 get요청 보내면 추천영화가 함께 들어옴.
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const searchResponse = await api.get(`/search?keyword=${keyword}`);

        setSearchData(searchResponse.data.movie);
        setHighScoreData(searchResponse.data.recommended_movies);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchSearchData();
  }, [keyword]);

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
