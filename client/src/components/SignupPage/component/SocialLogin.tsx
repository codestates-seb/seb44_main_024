import kakao from '../../../ui/login-button/kakao.svg';
import naver from '../../../ui/login-button/naver.svg';
import facebook from '../../../ui/login-button/facebook.svg';
import apple from '../../../ui/login-button/apple.svg';

const SocialLogin = () => {
  return (
    <>
      <div className="mb-4 mt-6 text-center text-xl">SNS 계정으로 로그인하기</div>
      <div className="flex justify-center gap-5">
        <img className="cursor-pointer" src={kakao} alt="kakao_icon" />
        <img className="cursor-pointer" src={naver} alt="naver_icon" />
        <img className="cursor-pointer" src={facebook} alt="facebook_icon" />
        <img className="cursor-pointer" src={apple} alt="apple_icon" />
      </div>
    </>
  );
};

export default SocialLogin;
