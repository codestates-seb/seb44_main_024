import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux-toolkit/store';
import Spinner from '../components/Spinner';

//카카오로그인 리다이렉트 페이지라고 가정, 인가코드 받아서 서버에 넘기고 엑세스 토큰 받아오는 부분
const RedirectPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login.value);

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
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Spinner />
      <div className="mt-5">카카오톡에서 로그인 중!</div>
    </div>
  );
};

export default RedirectPage;
