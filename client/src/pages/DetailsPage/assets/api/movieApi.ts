// 실제 데이터 사용시 사용할 코드
import axios from 'axios';
// import api from './axiosInstance';
// import { Review } from '../types/reviewTypes';
import { MovieDataResponse } from '../types/movieTypes';

// export const getMovies = async (): Promise<MovieDataResponse> => {
//   const response = await api.get<MovieDataResponse>('');
//   return response.data;
// };

// export const postReview = async (review: Review, movieId: string | undefined): Promise<string> => {
//   const response = await api.post<string>(`/movies/${movieId}/reviews`, review);
//   const redirectLocation: string = response.headers.location;
//   return redirectLocation;
// };

export const getMovies = async (): Promise<MovieDataResponse> => {
  const response = await axios.get<MovieDataResponse>('/mockupdata/moviedetails.json');
  return response.data;
};
