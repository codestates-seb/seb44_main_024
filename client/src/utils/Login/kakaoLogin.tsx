const kakaoLoginRequestHandler = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173'; //나중에 변경
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return window.location.assign(KAKAO_AUTH_URL);
};

//const kakaoAuthCode = new URL(window.location.href).searchParams.get('code');

export default kakaoLoginRequestHandler;
