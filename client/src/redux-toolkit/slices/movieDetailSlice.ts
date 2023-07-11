import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { MovieDetailData } from '../../pages/DetailsPage/assets/types/movieTypes';

interface MovieDetailState {
  data: MovieDetailData | null;
}

const initialState: MovieDetailState = {
  data: null,
};

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    fetchMovieSuccess: (state, action: PayloadAction<MovieDetailData>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchMovieSuccess } = movieDetailSlice.actions;

export const selectMovieDetails = (state: RootState) => state.movieDetail.data;

export default movieDetailSlice.reducer;
