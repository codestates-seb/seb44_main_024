import kakao from '../pages/UI/login-button/kakaoBtn.svg';
import naver from '../pages/UI/login-button/naverBtn.svg';
import facebook from '../pages/UI/login-button/facebookBtn.svg';
import apple from '../pages/UI/login-button/appleBtn.svg';

const SocialLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:5173'; //나중에 변경
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const kakaoLoginRequestHandler = () => {
    return window.location.assign(KAKAO_AUTH_URL);
  };

  //const kakaoAuthCode = new URL(window.location.href).searchParams.get('code');

  return (
    <aside>
      <div className="mb-4 mt-6 text-center text-xl">SNS 계정으로 로그인하기</div>
      <div className="flex justify-center gap-5">
        <button onClick={kakaoLoginRequestHandler}>
          <img className="cursor-pointer" src={kakao} alt="kakao_icon" />
        </button>
        <img className="cursor-pointer" src={naver} alt="naver_icon" />
        <img className="cursor-pointer" src={facebook} alt="facebook_icon" />
        <img className="cursor-pointer" src={apple} alt="apple_icon" />
      </div>
    </aside>
  );
};

export default SocialLogin;
