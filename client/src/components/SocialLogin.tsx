import kakao from '../pages/UI/login-button/kakaoBtn.svg';
import naverIcon from '../pages/UI/login-button/naverBtn.svg';
import facebook from '../pages/UI/login-button/facebookBtn.svg';
import apple from '../pages/UI/login-button/appleBtn.svg';
import kakaoLoginRequestHandler from '../utils/Login/kakaoLogin';

const SocialLogin = () => {
  return (
    <aside>
      <div className="mb-4 mt-6 text-center text-xl">SNS 계정으로 로그인하기</div>
      <div className="flex justify-center gap-5">
        <button onClick={kakaoLoginRequestHandler}>
          <img className="cursor-pointer" src={kakao} alt="kakao_icon" />
        </button>
        <img className="cursor-pointer" src={naverIcon} alt="naver_icon" />
        <img className="cursor-pointer" src={facebook} alt="facebook_icon" />
        <img className="cursor-pointer" src={apple} alt="apple_icon" />
      </div>
      <p className="mt-4 text-sm text-mainblack">
        SNS 로그인은 준비 중인 기능입니다. 다음에 만나요!
      </p>
    </aside>
  );
};

export default SocialLogin;
