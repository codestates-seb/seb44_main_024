import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  value: boolean;
}

const initialState: LoginState = {
  value: Boolean(localStorage.getItem('isLoggedIn')) || false,
}; //초기상태를 로컬 스토리지에서 가져옴 (새로고침시 로그아웃 방지)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginVerified: (state) => {
      state.value = true;
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태를 로컬 스토리지에 저장
    },
    logoutVerified: (state) => {
      state.value = false;
      localStorage.removeItem('isLoggedIn'); // 로그아웃 시 로컬 스토리지에서 상태 제거
    },
  },
});

export const { loginVerified, logoutVerified } = loginSlice.actions;

export default loginSlice.reducer;
