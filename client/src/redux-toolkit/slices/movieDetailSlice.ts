import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import { MovieDataResponse } from '../../components/pages/DetailsPage/assets/types/movieTypes.ts';

interface MovieDetailState {
  data: MovieDataResponse | null;
}

const initialState: MovieDetailState = {
  data: null,
};

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    fetchMovieSuccess: (state, action: PayloadAction<MovieDataResponse>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchMovieSuccess } = movieDetailSlice.actions;

export const selectMovieDetails = (state: RootState) => state.movieDetail.data;

export default movieDetailSlice.reducer;
