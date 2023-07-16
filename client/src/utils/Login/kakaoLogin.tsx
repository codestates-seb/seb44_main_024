import { KAKAO_AUTH_URL } from '../../constants/constants';

const kakaoLoginRequestHandler = () => {
  return window.location.assign(KAKAO_AUTH_URL);
};

export default kakaoLoginRequestHandler;
