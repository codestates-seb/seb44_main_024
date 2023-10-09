import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/testSlice';
import movieDetailReducer from './slices/movieDetailSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    movieDetail: movieDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
