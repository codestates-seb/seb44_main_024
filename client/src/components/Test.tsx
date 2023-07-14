import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../redux-toolkit/hooks';
import { RootState } from '../redux-toolkit/store';
import { decrement, increment, selectTest } from '../redux-toolkit/slices/testSlice';
import { useEffect } from 'react';
import axios from 'axios';

const Test = (): JSX.Element => {
  const test = useAppSelector(selectTest);
  const isLoggedIn = useSelector((state: RootState) => state.login.value);
  const dispatch = useAppDispatch();

  //카카오로그인 리다이렉트 페이지라고 가정, 인가코드 받아서 서버에 넘기고 엑세스 토큰 받아오는 부분
  const getAccessToken = async (kakaoAuthCode: string): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:3000/login', { kakaoAuthCode }); //서버 아직 없음
      const accessToken = response.data.accessToken;
      // const user = response.data.user;
      // console.log(user);
      localStorage.setItem('AC_Token', accessToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const kakaoAuthCode = new URL(window.location.href).searchParams.get('code');
    // console.log('코드잘오니?:', kakaoAuthCode);
    if (kakaoAuthCode) {
      getAccessToken(kakaoAuthCode);
    }
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>빼기</button>
      <p>테스트: {test}</p>
      <button onClick={() => dispatch(increment())}>더하기</button>
      <div>
        {isLoggedIn ? (
          <div className="bg-blue-300">로그인상태</div>
        ) : (
          <div className="bg-red-300">로그아웃상태</div>
        )}
      </div>
    </div>
  );
};

export default Test;
