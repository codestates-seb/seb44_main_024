// 실제 데이터 사용시 사용할 코드
// import api from './axiosInstance.ts';
// import { MovieDataResponse } from '../types/movieTypes.ts';

// export const getMovies = async (): Promise<MovieDataResponse> => {
//   const response = await api.get<MovieDataResponse>('/mockupdata/moviedetails.json');
//   return response.data;
// };

import axios from 'axios';
import { MovieDataResponse } from '../types/movieTypes';

export const getMovies = async (): Promise<MovieDataResponse> => {
  const response = await axios.get<MovieDataResponse>('/mockupdata/moviedetails.json');
  return response.data;
};
